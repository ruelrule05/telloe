<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberAssignServiceRequest;
use App\Http\Requests\MemberFromInviteTokenRequest;
use App\Http\Requests\StoreMemberRequest;
use App\Models\Member;
use App\Services\MemberService;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        return response(MemberService::index($request));
    }

    public function store(StoreMemberRequest $request)
    {
        return response(MemberService::store($request));
    }

    public function show(Member $member, Request $request)
    {
        $memberService = new MemberService();
        return response($memberService->show($member, $request));
    }

    public function update(Request $request, Member $member)
    {
        $memberService = new MemberService();
        return response()->json($memberService->update($request, $member));
    }

    public function destroy(Member $member)
    {
        $memberService = new MemberService();
        return response($memberService->destroy($member));
    }

    public function getMemberFromInviteToken(MemberFromInviteTokenRequest $request)
    {
        return response(MemberService::getMemberFromInviteToken($request));
    }

    public function resend($id)
    {
        $memberService = new MemberService();
        return response($memberService->resend($id));
    }

    public function assignService($id, MemberAssignServiceRequest $request)
    {
        $memberService = new MemberService();
        return $memberService->assignService($id, $request);
    }
}
