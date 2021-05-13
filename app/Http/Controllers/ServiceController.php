<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use App\Services\ServiceService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //

    public function index(Request $request)
    {
        return response(ServiceService::index($request));
    }

    public function store(StoreServiceRequest $request)
    {
        return response(ServiceService::store($request));
    }

    public function show(Request $request, Service $service)
    {
        $serviceService = new ServiceService();
        return response($serviceService->show($request, $service));
    }

    public function update($id, UpdateServiceRequest $request)
    {
        return response(ServiceService::update($id, $request));
    }

    public function destroy($id)
    {
        $serviceService = new ServiceService();
        return response($serviceService->destroy($id));
    }

    public function contactServices()
    {
        return response(ServiceService::contactServices());
    }
}
