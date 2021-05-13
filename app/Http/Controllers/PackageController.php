<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Services\PackageService;

class PackageController extends Controller
{
    public function index(Request $request)
    {
        return response(PackageService::index($request));
    }

    public function store(StorePackageRequest $request)
    {
        return response(PackageService::store($request));
    }

    public function show(Package $package, Request $request)
    {
        return response(PackageService::show($package, $request));
    }

    public function update(Package $package, UpdatePackageRequest $request)
    {
        return response(PackageService::update($package, $request));
    }

    public function destroy($id)
    {
        return response(PackageService::destroy($id));
    }
}
