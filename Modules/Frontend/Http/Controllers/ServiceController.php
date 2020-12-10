<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Member;
use App\Models\Service;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //

    public function index()
    {
        $auth_user = Auth::user();
        $member_ids = Member::where('member_user_id', $auth_user->id)->get()->pluck('id')->toArray();
        $services = Service::with('user', 'assignedServices.member.memberUser')->where(function ($query) use ($auth_user, $member_ids) {
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
        $service->load('assignedServices', 'user');
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

    public function update($id, Request $request)
    {
        $validated = $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'duration' => 'required|integer',
            'days' => 'required',
            'default_rate' => 'nullable|numeric',
        ]);
        $service = Service::findOrFail($id);
        $this->authorize('update', $service);

        unset($service->user);
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

    public function contactsServices()
    {
        $contactUserIds = Contact::where('user_id', Auth::user()->id)->whereNotNull('contact_user_id')->pluck('contact_user_id')->toArray();
        return response(Service::with('user')->whereIn('user_id', $contactUserIds)->where('is_available', true)->get());
    }
}
