<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Services\ServiceService;

class ServiceController extends Controller
{
    //

    public function index()
    {
        return response(ServiceService::index());
    }

    public function store(StoreServiceRequest $request)
    {
        return response(ServiceService::store($request));
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

        return response($service);
    }

    public function update($id, UpdateServiceRequest $request)
    {
        $service = Service::findOrFail($id);
        $this->authorize('update', $service);

        unset($service->user);

        if ($request->in_widget) {
            Service::where('id', '<>', $service->id)->where('in_widget', true)->update([
                'in_widget' => false
            ]);
        }

        $service->update($request->all());

        return response()->json($service);
    }

    public function destroy($id, Request $request)
    {
        $service = Service::findOrFail($id);
        $this->authorize('delete', $service);
        $service->delete();

        return response()->json(['deleted' => true]);
    }

    public function contactServices()
    {
        return response(ServiceService::contactServices());
    }
}
