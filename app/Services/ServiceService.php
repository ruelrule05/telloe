<?php

namespace App\Services;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Contact;
use App\Models\Service;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ServiceService
{
    use AuthorizesRequests;

    public static function index(Request $request)
    {
        $auth_user = Auth::user();
        $services = Service::with(['user', 'assignedServices' => function ($assignedServices) {
            $assignedServices->whereHas('member', function ($member) {
                $member->where('is_pending', false);
            });
        }])
        ->with('assignedServices.member.memberUser')
        ->where('user_id', $auth_user->id)
        ->where('type', 'custom')
        ->latest();
        if ($request->paginate) {
            $services = $services->paginate(2);
        } else {
            $services = $services->get();
        }
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
        $authUser = Auth::user();
        if (! $authUser->is_premium && $authUser->services->count() > 0) {
            return abort(403, 'Please upgrade your account to add more event types');
        }
        $data = $request->all();
        $data['user_id'] = $authUser->id;
        $service = Service::create($data);
        $service = $service->fresh();

        return $service;
    }

    public static function update($id, UpdateServiceRequest $request)
    {
        $service = Service::findOrFail($id);

        // unset($service->user);
        $authUser = Auth::user();

        if ($request->in_widget) {
            Service::where('user_id', $authUser->id)->where('id', '<>', $service->id)->where('in_widget', true)->update([
                'in_widget' => false
            ]);
        }

        $service->update($request->all());

        // Service::where('parent_service_id', $service->id)->update([
        //     'form_builder' => $request->form_builder
        // ]);

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
