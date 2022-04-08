<?php
/**
 * Controller for LinkedIn Integration.
 *
 * PHP version 7.4.27
 *
 * @package    Telloe
 * @category   Controller
 *
 * @author     Welyelf Hisula<welyelf@telloe.com>
 * @copyright  2022 Telloe
 */

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\LinkedinUser;
use App\Models\Service;
use Auth;
use Illuminate\Http\Request;

class LinkedInUserController extends Controller
{
    /**
     * This method will redirect the user to the Linkedin authentication page.
     *
     * @return Response
     */

    public function index()
    {
        return response()->json(LinkedinUser::where('user_id', Auth::user()->id)->latest()->get());
    }

    public function show(string $urn, Request $request)
    {
        $linkedInUser = LinkedinUser::firstOrCreate(
            [
                'user_id' => Auth::user()->id,
                'urn' => $urn
            ],
            [
                'custom_fields' => [],
                'tags' => []
            ]
        );

        $authUser = Auth::user();
        $serviceIds = Service::where('user_id', $authUser->id)->orWhereHas('parentService', function ($parentService) use ($authUser) {
            $parentService->where('user_id', $authUser->id);
        })->get()->pluck('id')->toArray();
        if ($request->services) {
            $serviceIdsCopy = $serviceIds;
            $serviceIds = [];
            $filterServiceIds = explode(',', $request->services);
            foreach ($filterServiceIds as $filterServiceId) {
                if (in_array($filterServiceId, $serviceIdsCopy)) {
                    $serviceIds[] = $filterServiceId;
                }
            }
        }

        $order = $request->order ?? 'DESC';
        $linkedInUser->bookings = Booking::where('linkedin_user', $linkedInUser->urn)->orderBy('date', $order)->whereIn('service_id', $serviceIds)->paginate();

        return response()->json($linkedInUser);
    }

    public function update($id, Request $request)
    {
        $linkedInUser = LinkedinUser::where('user_id', Auth::user()->id)->where('id', $id)->firstOrFail();
        $linkedInUser->update([
            'custom_fields' => $request->custom_fields,
            'tags' => $request->tags,
            'label' => $request->label,
        ]);

        return response()->json($linkedInUser);
    }
}
