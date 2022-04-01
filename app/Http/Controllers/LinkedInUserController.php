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

use App\Models\LinkedinUser;
use Auth;
use Illuminate\Http\Request;

class LinkedInUserController extends Controller
{
    /**
     * This method will redirect the user to the Linkedin authentication page.
     *
     * @return Response
     */
    public function show(string $urn)
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

        return response()->json($linkedInUser);
    }

    public function update($id, Request $request)
    {
        $linkedInUser = LinkedinUser::where('user_id', Auth::user()->id)->where('id', $id)->firstOrFail();
        $linkedInUser->update([
            'custom_fields' => $request->custom_fields,
            'tags' => $request->tags,
        ]);

        return response()->json($linkedInUser);
    }
}
