<?php

namespace App\Services;

use App\Models\Member;
use App\Models\Service;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Mail;
use App\Http\Requests\MemberFromInviteTokenRequest;
use App\Http\Requests\StoreMemberRequest;
use App\Mail\SendMemberInvitation;

class MemberService
{
    public static function index(Request $request)
    {
        $authUser = Auth::user();
        $query = $request->get('query');
        $members = Member::with('memberUser', 'assignedServices')
            ->withCount('assignedServices')
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC')
            ->where('member_user_id', '!=', null);

        if ($query) {
            $members = $members->whereHas('memberUser', function ($memberUser) use ($query) {
                $memberUser->where('LIKE', '%' . $query . '%');
            });
        }
        $members = $members->get();

        return $members;
    }

    public static function show($id)
    {
        return ;
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
        return $member;
    }

    public static function getMemberFromInviteToken(MemberFromInviteTokenRequest $request)
    {
        $member = Member::where('invite_token', $request->invite_token)->where('user_id', Auth::user()->id)->first();
        return $member;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }
}
