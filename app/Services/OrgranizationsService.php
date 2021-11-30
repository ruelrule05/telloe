<?php

namespace App\Services;

use App\Http\Requests\OrganizationAddMembersRequest;
use App\Http\Requests\OrganizationDestroyMemberRequest;
use App\Http\Requests\OrganizationServiceTimeslotsRequest;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\Member;
use App\Models\Organization;
use App\Models\OrganizationMember;
use App\Models\Service;
use Arr;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrgranizationsService
{
    public static function profile($organization, Request $request)
    {
        $organization = Organization::where('slug', $organization)->firstOrfail();
        $data = ['services' => []];
        $serviceIDs = $organization->services ?? [];
        $organizationServices = $organization->user->services()->where('is_available', true)->whereIn('id', $serviceIDs)->get();

        foreach ($organizationServices as $userService) {
            $data['services'][$userService->id]['id'] = $userService->id;
            $data['services'][$userService->id]['name'] = $userService->name;
            $data['services'][$userService->id]['description'] = $userService->description;
            $data['services'][$userService->id]['duration'] = $userService->duration;
            $data['services'][$userService->id]['default_rate'] = $userService->default_rate;
            $data['services'][$userService->id]['currency'] = $userService->currency;
            $data['services'][$userService->id]['assigned_services'][] = $userService;
        }
        if ($request->ajax() || $request->wantsJson()) {
            foreach ($organization->members as $member) {
                $services = $member->member->services()->whereHas('parentService', function ($parentService) use ($organization, $serviceIDs) {
                    $parentService->where('user_id', $organization->user_id)->whereIn('id', $serviceIDs);
                })->get();
                foreach ($services as $service) {
                    $data['services'][$service->parent_service_id]['id'] = $service->parentService->id;
                    $data['services'][$service->parent_service_id]['name'] = $service->parentService->name;
                    $data['services'][$service->parent_service_id]['description'] = $service->parentService->description;
                    $data['services'][$service->parent_service_id]['duration'] = $service->parentService->duration;
                    $data['services'][$service->parent_service_id]['default_rate'] = $service->parentService->default_rate;
                    $data['services'][$service->parent_service_id]['currency'] = $service->parentService->currency;
                    $data['services'][$service->parent_service_id]['assigned_services'][] = $service;
                }
            }

            return $data;
        }

        return view('organization', compact('organization'));
    }

    public static function index()
    {
        $authUser = Auth::user();
        $organizations = Organization::with('members.member.memberUser')->where(function ($query) use ($authUser) {
            $query->where('user_id', $authUser->id)->orWhereHas('members.member', function ($member) use ($authUser) {
                $member->where('member_user_id', $authUser->id);
            });
        })->get();
        return $organizations;
    }

    public static function show(Organization $organization, Request $request)
    {
        $authUser = Auth::user();
        $organization = Organization::where('id', $organization->id)->with('members.member.memberUser')->where(function ($query) use ($authUser) {
            $query->where('user_id', $authUser->id)->orWhereHas('members.member', function ($member) use ($authUser) {
                $member->where('member_user_id', $authUser->id);
            });
        })->firstOrfail();

        return $organization->load('members.member.memberUser', 'members.member.assignedServices');
    }

    public static function store(StoreOrganizationRequest $request)
    {
        $authUser = Auth::user();

        if (Organization::where('slug', $request->slug)->first()) {
            return abort(403, 'Slug is already associated to a different organization');
        }

        $organization = Organization::create([
            'user_id' => $authUser->id,
            'name' => $request->name,
            'slug' => $request->slug,
            'services' => $request->services,
        ]);
        $members_count = 0;
        foreach ($request->members as $member) {
            $member = Member::where('id', $member['id'])->where('user_id', $authUser->id)->where('is_pending', false)->first();
            if ($member) {
                OrganizationMember::create([
                    'organization_id' => $organization->id,
                    'member_id' => $member->id
                ]);
                $members_count++;
            }
        }
        $organization->members_count = $members_count;
        return response()->json($organization->load('members.member.memberUser'));
    }

    public static function update(Organization $organization, UpdateOrganizationRequest $request)
    {
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }

        if (Organization::where('id', '<>', $organization->id)->where('slug', $request->slug)->first()) {
            return abort(403, 'Slug is already associated to a different organization');
        }

        if (count($request->members) == 0) {
            OrganizationMember::where('organization_id', $organization->id)->delete();
        } else {
            $member_ids = Arr::pluck($request->members, 'id');
            foreach ($organization->members as $member) {
                if (! in_array($member->id, $member_ids)) {
                    $member->delete();
                }
            }

            foreach ($request->members as $member) {
                $member = Member::where('user_id', Auth::user()->id)->where('id', $member['id'])->first();
                if ($member) {
                    OrganizationMember::firstOrCreate([
                        'organization_id' => $organization->id,
                        'member_id' => $member->id
                    ]);
                }
            }
        }

        $organization->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'services' => $request->services,
        ]);

        return response($organization->load('members.member.memberUser', 'members.member.assignedServices'));
    }

    public static function deleteMember($id, OrganizationDestroyMemberRequest $request)
    {
        $organization = Organization::findOrFail($id);
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }
        OrganizationMember::where('id', $request->id)->where('organization_id', $organization->id)->delete();

        return ['deleted' => true];
    }

    public static function addMembers($id, OrganizationAddMembersRequest $request)
    {
        $organization = Organization::findOrFail($id);
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }

        foreach ($request->member_ids as $member_id) {
            $member = Member::where('user_id', Auth::user()->id)->where('id', $member_id)->first();
            if ($member) {
                OrganizationMember::firstOrCreate([
                    'organization_id' => $organization->id,
                    'member_id' => $member->id
                ]);
            }
        }

        return response($organization->members->load('member.memberUser'));
    }

    public static function serviceTimeslots($organization, $service_id, OrganizationServiceTimeslotsRequest $request)
    {
        $organization = Organization::where('slug', $organization)->firstOrfail();
        $service = Service::with('user')->where('id', $service_id)->where(function ($query) use ($organization) {
            $query->where('user_id', $organization->user_id)->orWhereHas('parentService', function ($query) use ($organization) {
                $query->where('user_id', $organization->user_id);
            });
        })->firstOrfail();

        $timeslots = [];
        $i = 1;
        $startDate = Carbon::parse($request->date);
        while ($i <= 7) {
            $date = $startDate->format('Y-m-d');
            $dateLabel = $startDate->format('l');
            $timeslots[$dateLabel] = $service->timeslots($date);
            $startDate = $startDate->addDays(1);
            $i++;
        }

        return $timeslots;
    }

    public static function destroy($id)
    {
        $organization = Organization::findOrFail($id);
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }
        $organization->delete();

        return ['deleted' => true];
    }
}
