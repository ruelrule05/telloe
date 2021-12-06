<?php

namespace App\Services;

use App\Http\Requests\MemberAssignServiceRequest;
use App\Http\Requests\MemberFromInviteTokenRequest;
use App\Http\Requests\StoreMemberRequest;
use App\Mail\SendMemberInvitation;
use App\Models\Booking;
use App\Models\Member;
use App\Models\Service;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Mail;

class MemberService
{
    use AuthorizesRequests;

    public static function index(Request $request)
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

        return $members;
    }

    public function show(Member $member, Request $request)
    {
        $this->authorize('show', $member);
        // $response = $member->load('memberUser')->toArray();
        // $response['assigned_services'] = $member->assignedServices()->with('bookings.user')->withTrashed()->get()->toArray();
        $member->load('memberUser', 'assignedServices');
        $serviceIds = $member->assignedServices()->pluck('id')->toArray();
        if ($request->services) {
            $serviceIdsCopy = $serviceIds;
            $serviceIds = [];
            $filterServiceIds = explode(',', $request->services);
            foreach ($filterServiceIds as $filterServiceId) {
                if (in_array($filterServiceId, $serviceIdsCopy)) {
                    $serviceIds[] = $filterServiceId;
                }
            }
        }

        $bookings = Booking::with('service.assignedServices', 'service.parentService.assignedServices', 'bookingUsers.user')->whereIn('service_id', $serviceIds)->latest()->paginate(10);
        $member->bookings = $bookings;

        return $member;
    }

    public static function store(StoreMemberRequest $request)
    {
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
                $assignedService->user_id = $memberUser->id;
                $assignedService->member_id = $member->id;
                $assignedService->parent_service_id = $service->id;
                $assignedService->save();
            }
        }
        $member->load('memberUser', 'assignedServices');

        if ($request->sendToEmail) {
            Mail::to($member->email)->queue(new SendMemberInvitation($member, $authTab, $request->invite_message));
        }
        return $member;
    }

    public static function getMemberFromInviteToken(MemberFromInviteTokenRequest $request)
    {
        $member = Member::where('invite_token', $request->invite_token)->where('user_id', Auth::user()->id)->first();
        return $member;
    }

    public function update(Request $request, Member $member)
    {
        $this->authorize('update', $member);
        $authUser = Auth::user();
        $existingAssignedServices = $member->assignedServices;
        foreach ($existingAssignedServices as $existingAssignedService) {
            if (! in_array($existingAssignedService->parent_service_id, $request->assigned_services)) {
                $existingAssignedService->delete();
            }
        }
        foreach ($request->assigned_services as $assigned_service) {
            $service = Service::where('id', $assigned_service)->where('user_id', $authUser->id)->first();
            if ($service) {
                $assignedService = Service::withTrashed()->where('member_id', $member->id)->where('parent_service_id', $service->id)->first();
                if ($assignedService && $assignedService->deleted_at) {
                    $assignedService->restore();
                } elseif (! $assignedService) {
                    $assignedService = $service->replicate();
                    $assignedService->user_id = $member->member_user_id;
                    $assignedService->member_id = $member->id;
                    $assignedService->parent_service_id = $service->id;
                    $assignedService->save();
                }
            }
        }
        $member->update([
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);
        $serviceIds = $member->assignedServices()->pluck('id')->toArray();
        $bookings = Booking::with('service.assignedServices', 'service.parentService.assignedServices', 'bookingUsers')->whereIn('service_id', $serviceIds)->orderBy('date', 'DESC')->paginate(10);
        $member->bookings = $bookings;

        return $member->load('memberUser', 'assignedServices');
    }

    public function destroy(Member $member)
    {
        $this->authorize('delete', $member);
        Service::where('member_id', $member->id)->delete();
        return ['deleted' => $member->delete()];
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
        return ['success' => true];
    }

    public function assignService($id, MemberAssignServiceRequest $request)
    {
        $member = Member::findOrFail($id);

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
