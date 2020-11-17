<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Service;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Mail;
use Modules\Frontend\Mail\SendMemberInvitation;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $authUser = Auth::user();
        $query = $request->get('query');
        $members = Member::with('memberUser', 'assignedServices')
            ->withCount('assignedServices')
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC');
        if ($query) {
            $members = $members->whereHas('memberUser', function ($memberUser) use ($query) {
                $memberUser->where('LIKE', '%' . $query . '%');
            });
        }
        $members = $members->get();

        return response()->json($members);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'invite_message' => 'nullable|string',
        ]);
        $authUser = Auth::user();

        if ($request->email == $authUser->email) {
            return abort(403, "Can't add your own email as member");
        }

        $authTab = 'login';
        $memberUser = User::where('email', $request->email)->first();
        if (! $memberUser) {
            $authTab = 'signup';
        }

        if ($memberUser && Member::where('user_id', $authUser->id)->where('member_user_id', $memberUser->id)->first()) {
            return abort(403, 'This member already exists.');
        }

        $invite_token = '';
        while (true) {
            $invite_token = Str::random(30);
            $exists = Member::where('invite_token', $invite_token)->first();
            if (! $exists) {
                break;
            }
        }
        if (Member::where('user_id', $authUser->id)->where('email', $request->email)->first()) {
            return abort(403, 'This member already exists.');
        }
        $member = Member::create([
            'user_id' => $authUser->id,
            'member_user_id' => $memberUser->id ?? null,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'is_pending' => true,
            'invite_token' => $invite_token,
        ]);

        foreach ($request->assigned_services as $assigned_service) {
            $service = Service::where('id', $assigned_service)->where('user_id', $authUser->id)->first();
            if ($service) {
                $assignedService = $service->replicate();
                $assignedService->user_id = null;
                $assignedService->member_id = $member->id;
                $assignedService->parent_service_id = $service->id;
                $assignedService->save();
            }
        }
        $member->load('memberUser', 'assignedServices');

        if ($request->sendToEmail) {
            Mail::to($member->email)->queue(new SendMemberInvitation($member, $authTab, $request->invite_message));
        }
        return response()->json($member);
    }

    public function show(Member $member)
    {
        $this->authorize('show', $member);
        $response = $member->load('memberUser')->toArray();
        $response['services'] = $member->services()->with('bookings.user')->withTrashed()->get()->toArray();
        return response($response);
    }

    public function update(Request $request, Member $member)
    {
        $this->authorize('update', $member);
        $authUser = Auth::user();
        foreach ($request->assigned_services as $assigned_service) {
            $service = Service::where('id', $assigned_service)->where('user_id', $authUser->id)->first();
            if ($service) {
                $assignedService = $service->replicate();
                $assignedService->user_id = null;
                $assignedService->member_id = $member->id;
                $assignedService->parent_service_id = $service->id;
                $assignedService->save();
            }
        }
        $member->update($request->all());

        return response()->json($member->load('memberUser', 'assignedServices'));
    }

    public function destroy(Member $member)
    {
        $this->authorize('delete', $member);
        return response()->json(['deleted' => $member->delete()]);
    }

    public function getMemberFromInviteToken(Request $request)
    {
        $this->validate($request, [
            'invite_token' => 'required'
        ]);
        $member = Member::where('invite_token', $request->invite_token)->where('user_id', Auth::user()->id)->first();
        return response()->json($member);
    }

    public function resend($id)
    {
        $member = Member::findOrFail($id);
        $this->authorize('show', $member);

        $authTab = 'login';
        $memberUser = User::where('email', $member->email)->first();
        if (! $memberUser) {
            $authTab = 'signup';
        }

        Mail::to($member->email)->queue(new SendMemberInvitation($member, $authTab));
        return response(['success' => true]);
    }

    public function assignService($id, Request $request)
    {
        $this->validate($request, [
            'service_id' => 'required|exists:services,id'
        ]);
        $member = Member::findOrFail($id);
        $this->authorize('assignService', $member);
        $service = Service::where('id', $request->service_id)->where('user_id', Auth::user()->id)->firstOrFail();

        $assignedService = Service::withTrashed()->whereNull('user_id')->where('member_id', $member->id)->where('parent_service_id', $service->id)->first();
        if ($assignedService) {
            // restore
            Service::withTrashed()->whereNull('user_id')->where('member_id', $member->id)->where('parent_service_id', $service->id)->restore();
            $assignedService->deleted_at = null;
        } else {
            $assignedService = $service->replicate();
            $assignedService->user_id = null;
            $assignedService->member_id = $member->id;
            $assignedService->parent_service_id = $service->id;
            $assignedService->save();
        }
        return response()->json($assignedService->refresh()->load('bookings.user'));
    }
}
