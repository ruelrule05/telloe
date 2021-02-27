<?php

namespace App\Services;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Contact;
use App\Models\Member;
use App\Models\Service;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ServiceService
{
    use AuthorizesRequests;

    public static function index()
    {
        $auth_user = Auth::user();
        $member_ids = Member::where('member_user_id', $auth_user->id)->get()->pluck('id')->toArray();
        $services = Service::with('user', 'assignedServices.member.memberUser')->where(function ($query) use ($auth_user, $member_ids) {
            $query->where('user_id', $auth_user->id)->orWhereIn('member_id', $member_ids);
        })->orderBy('created_at', 'DESC')->get();
        return $services;
    }

    public function show(Request $request, Service $service)
    {
        $this->authorize('show', $service);
        $service->load('assignedServices.user', 'user');
        if ($request->single) {
            return response($service->timeslots($request->date));
        }

        $timeslots = [];
        if ($request->date) {
            $i = 1;
            $startDate = Carbon::parse($request->date);
            while ($i <= 7) {
                $date = $startDate->format('Y-m-d');
                $dateLabel = $startDate->format('l');
                $timeslots[$dateLabel] = $service->timeslots($date);
                $startDate = $startDate->addDays(1);
                $i++;
                if ($request->single) {
                    break;
                }
            }
            $service = $service->toArray();
        }
        $service['timeslots'] = $timeslots;

        return $service;
    }

    public static function store(StoreServiceRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $service = Service::create($data);
        $service = $service->fresh();

        return $service;
    }

    public static function update($id, UpdateServiceRequest $request)
    {
        $service = Service::findOrFail($id);

        // unset($service->user);

        if ($request->in_widget) {
            Service::where('id', '<>', $service->id)->where('in_widget', true)->update([
                'in_widget' => false
            ]);
        }

        $service->update($request->all());

        return $service;
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $this->authorize('delete', $service);
        $service->delete();

        return ['deleted' => true];
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
