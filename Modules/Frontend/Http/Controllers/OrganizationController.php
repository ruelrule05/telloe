<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Organization;
use App\Models\OrganizationMember;
use App\Models\Service;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Modules\Frontend\Http\Slugify;

class OrganizationController extends Controller
{
    public function profile($organization, Request $request)
    {
        $organization = Organization::where('slug', $organization)->firstOrfail();

        if ($request->ajax() || $request->wantsJson()) {
            $data = [];
            foreach ($organization->members as $member) {
                $services = $member->member->services()->whereHas('parentService', function ($parentService) use ($organization) {
                    $parentService->where('user_id', $organization->user_id);
                })->get();
                foreach ($services as $service) {
                    $data['services'][$service->parent_service_id]['id'] = $service->parentService->id;
                    $data['services'][$service->parent_service_id]['name'] = $service->parentService->name;
                    $data['services'][$service->parent_service_id]['description'] = $service->parentService->description;
                    $data['services'][$service->parent_service_id]['duration'] = $service->parentService->duration;
                    $data['services'][$service->parent_service_id]['default_rate'] = $service->parentService->default_rate;
                    $data['services'][$service->parent_service_id]['member_services'][] = $service;
                }
            }

            return response()->json($data);
        }

        return view('frontend::organization', compact('organization'));
    }

    public function index(Request $request)
    {
        return response()->json(Auth::user()->organizations()->with('members.member.memberUser')->get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
        ]);
        $authUser = Auth::user();

        $slug = Slugify::create(Organization::class, strtolower($request->name));
        $organization = Organization::create([
            'user_id' => $authUser->id,
            'name' => $request->name,
            'slug' => $slug
        ]);
        $members_count = 0;
        foreach ($request->members as $member) {
            $member = Member::where('id', $member['id'])->where('user_id', $authUser->id)->first();
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

    public function show(Organization $organization, Request $request)
    {
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }
        return response($organization->load('members.member.memberUser', 'members.member.assignedServices'));
    }

    public function update(Organization $organization, Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'slug' => 'required|string',
            'members' => 'array',
        ]);

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
            'slug' => $request->slug
        ]);

        return response($organization->load('members.member.memberUser', 'members.member.assignedServices'));
    }

    public function deleteMember($id, Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:organization_members,id',
        ]);
        $organization = Organization::findOrFail($id);
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }
        OrganizationMember::where('id', $request->id)->where('organization_id', $organization->id)->delete();

        return response(['deleted' => true]);
    }

    public function addMembers($id, Request $request)
    {
        $this->validate($request, [
            'member_ids' => 'required|array',
        ]);
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

    public function serviceTimeslots($organization, $service_id, Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date'
        ]);

        $organization = Organization::where('slug', $organization)->firstOrfail();
        $service = Service::where('id', $service_id)->where(function ($query) use ($organization) {
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

        return response()->json($timeslots);
    }

    public function destroy($id)
    {
        $organization = Organization::findOrFail($id);
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }
        $organization->delete();

        return response()->json(['deleted' => true]);
    }
}
