<?php

namespace App\Services;

use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\Package;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PackageService
{
    public static function index(Request $request)
    {
        return Auth::user()->packages()->get();
    }

    public static function show(Package $package, Request $request)
    {
        if ($package->user_id != Auth::user()->id) {
            return abort(403);
        }
        return $package->load('contactPackages.contact');
    }

    public static function store(StorePackageRequest $request)
    {
        $package = Package::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => Auth::user()->id,
            'services' => $request->services,
            'expiration_date' => Carbon::parse($request->expiration_date)->format('Y-m-d'),
            'price' => $request->price
        ]);

        return $package->refresh();
    }

    public static function update(Package $package, UpdatePackageRequest $request)
    {
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
            'in_widget' => $request->in_widget ?? false,
            'is_available' => $request->is_available,
        ]);

        return $package;
    }

    public static function destroy($id)
    {
        $package = Package::findOrFail($id);
        if ($package->user_id != Auth::user()->id) {
            return abort(403);
        }
        $package->delete();

        return ['deleted' => true];
    }
}
