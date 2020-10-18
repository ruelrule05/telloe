<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Auth;
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
            'expiration_date' => $request->expiration_date,
            'price' => $request->price
        ]);

        return response($package);
    }

    public function update($id, Request $request)
    {
    }

    public function destroy($id)
    {
    }
}
