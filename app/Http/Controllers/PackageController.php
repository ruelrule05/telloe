<?php

namespace App\Http\Controllers;


use App\Models\Package;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Auth::user()->packages);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'services' => 'required|array',
            'expiration_date' => 'required|date',
            'price' => 'required|numeric'
        ]);

        $package = Package::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => Auth::user()->id,
            'services' => $request->services,
            'expiration_date' => Carbon::parse($request->expiration_date)->format('Y-m-d'),
            'price' => $request->price
        ]);

        return response($package);
    }

    public function show(Package $package, Request $request)
    {
        if ($package->user_id != Auth::user()->id) {
            return abort(403);
        }
        return response($package->load('orders.user'));
    }

    public function update(Package $package, Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'services' => 'required|array',
            'expiration_date' => 'required|date',
            'price' => 'required|numeric'
        ]);

        if ($package->user_id != Auth::user()->id) {
            return abort(403);
        }

        $package->update([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => Auth::user()->id,
            'services' => $request->services,
            'expiration_date' => Carbon::parse($request->expiration_date)->format('Y-m-d'),
            'price' => $request->price,
            'in_widget' => $request->in_widget,
            'is_available' => $request->is_available,
        ]);

        return response($package);
    }

    public function destroy($id)
    {
        $package = Package::findOrFail($id);
        if ($package->user_id != Auth::user()->id) {
            return abort(403);
        }
        $package->delete();

        return response()->json(['deleted' => true]);
    }
}
