<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\Service;

class ServiceController extends Controller
{
    //

    public function index() {
    	$services = Service::with('user')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
    	return response()->json($services);
    }

    public function store(Request $request)
    {
    	$this->validate($request, [
    		'name' => 'required',
    		'description' => 'required',
    		'duration' => 'required|integer',
    		'days' => 'required',
    	]);
    	$data = $request->all();
    	$data['user_id'] = Auth::user()->id;
    	$service = Service::create($data);

    	return response()->json($service);
    }

    public function show(Request $request, Service $service) {
        if($request->date) :
        endif;
        return response()->json($service);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'duration' => 'required|integer',
            'days' => 'required',
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
