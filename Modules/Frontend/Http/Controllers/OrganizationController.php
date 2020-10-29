<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Organization;
use App\Models\OrganizationMember;
use Auth;
use Illuminate\Http\Request;
use Modules\Frontend\Http\Slugify;

class OrganizationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Auth::user()->organizations()->withCount('members')->get());
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
        return response()->json($organization);
    }

    public function show(Organization $organization, Request $request)
    {
        if ($organization->user_id != Auth::user()->id) {
            return abort(403);
        }
        return response($organization->load('members.member.memberUser'));
    }
}
