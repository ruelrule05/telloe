<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationAddMembersRequest;
use App\Http\Requests\OrganizationDestroyMemberRequest;
use App\Http\Requests\OrganizationServiceTimeslotsRequest;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\Organization;
use App\Services\OrgranizationsService;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function profile($organization, Request $request)
    {
        return OrgranizationsService::profile($organization, $request);
    }

    public function index()
    {
        return response(OrgranizationsService::index());
    }

    public function store(StoreOrganizationRequest $request)
    {
        return OrgranizationsService::store($request);
    }

    public function show(Organization $organization, Request $request)
    {
        return response(OrgranizationsService::show($organization, $request));
    }

    public function update(Organization $organization, UpdateOrganizationRequest $request)
    {
        return OrgranizationsService::update($organization, $request);
    }

    public function deleteMember($id, OrganizationDestroyMemberRequest $request)
    {
        return response(OrgranizationsService::deleteMember($id, $request));
    }

    public function addMembers($id, OrganizationAddMembersRequest $request)
    {
        return OrgranizationsService::addMembers($id, $request);
    }

    public function serviceTimeslots($organization, $service_id, OrganizationServiceTimeslotsRequest $request)
    {
        return response(OrgranizationsService::serviceTimeslots($organization, $service_id, $request));
    }

    public function destroy($id)
    {
        return response(OrgranizationsService::destroy($id));
    }
}
