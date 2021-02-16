<?php

namespace App\Services;

use App\Http\Requests\StoreServiceRequest;
use App\Models\Contact;
use App\Models\Member;
use App\Models\Service;
use Auth;
use Illuminate\Http\Request;

class ServiceService
{
    public static function index()
    {
        $auth_user = Auth::user();
        $member_ids = Member::where('member_user_id', $auth_user->id)->get()->pluck('id')->toArray();
        $services = Service::with('user', 'assignedServices.member.memberUser')->where(function ($query) use ($auth_user, $member_ids) {
            $query->where('user_id', $auth_user->id)->orWhereIn('member_id', $member_ids);
        })->orderBy('created_at', 'DESC')->get();
        return $services;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StoreServiceRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $service = Service::create($data);
        $service = $service->fresh();

        return $service;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }

    public static function contactServices()
    {
        $services = [];
        foreach (Contact::where('contact_user_id', Auth::user()->id)->get() as $contact) {
            foreach ($contact->user->services as $service) {
                if ($service->is_available && ! in_array($service->id, $contact->blacklisted_services)) {
                    $services[] = $service;
                }
            }
        }
        return $services;
    }
}
