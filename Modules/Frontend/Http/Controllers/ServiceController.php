<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Service;
use Auth;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //

    public function index()
    {
        $auth_user = Auth::user();
        $member_ids = Member::where('member_user_id', $auth_user->id)->get()->pluck('id')->toArray();
        $services = Service::with('user')->where(function ($query) use ($auth_user, $member_ids) {
            $query->where('user_id', $auth_user->id)->orWhereIn('member_id', $member_ids);
        })->orderBy('created_at', 'DESC')->get();
        return response()->json($services);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'duration' => 'required|integer',
            'days' => 'required',
            'default_rate' => 'nullable|numeric'
        ]);
        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $service = Service::create($data);
        $service = $service->fresh();

        return response()->json($service);
    }

    public function show(Request $request, Service $service)
    {
        $this->authorize('show', $service);
        $service = $service->load('user', 'bookings.user', 'bookings.service.user', 'assignedServices.bookings');
        $service->append('allBookings');
        return response($service);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'duration' => 'required|integer',
            'days' => 'required',
            'default_rate' => 'nullable|numeric'
        ]);
        $service = Service::findOrFail($id);
        $this->authorize('update', $service);
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
}
