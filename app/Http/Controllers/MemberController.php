<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberAssignServiceRequest;
use App\Http\Requests\MemberFromInviteTokenRequest;
use App\Http\Requests\StoreMemberRequest;
use App\Mail\SendMemberInvitation;
use App\Models\Booking;
use App\Models\Member;
use App\Models\Service;
use App\Models\User;
use App\Services\MemberService;
use Auth;
use Illuminate\Http\Request;
use Mail;

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

        $bookings = Booking::with('bookingNote')->where(function ($query) {
            $query->whereHas('user');
        })->with('service.assignedServices', 'service.parentService.assignedServices', 'user')->whereIn('service_id', $serviceIds)->orderBy('date', 'DESC')->paginate(10);
        $member->bookings = $bookings;

        return response($member);
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
                $assignedService = Service::withTrashed()->whereNull('user_id')->where('member_id', $member->id)->where('parent_service_id', $service->id)->first();
                if ($assignedService && $assignedService->deleted_at) {
                    Service::withTrashed()->whereNull('user_id')->where('member_id', $member->id)->where('parent_service_id', $service->id)->restore();
                } elseif (! $assignedService) {
                    $assignedService = $service->replicate();
                    $assignedService->user_id = null;
                    $assignedService->member_id = $member->id;
                    $assignedService->parent_service_id = $service->id;
                    $assignedService->save();
                }
            }
        }
        $member->update($request->all());

        return response()->json($member->load('memberUser', 'assignedServices.bookings.user'));
    }

    public function destroy(Member $member)
    {
        $this->authorize('delete', $member);
        return response()->json(['deleted' => $member->delete()]);
    }

    public function getMemberFromInviteToken(MemberFromInviteTokenRequest $request)
    {
        return response(MemberService::getMemberFromInviteToken($request));
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

    public function assignService($id, MemberAssignServiceRequest $request)
    {
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
