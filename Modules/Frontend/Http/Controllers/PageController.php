<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Member;
use App\Models\PasswordReset;
use App\Models\Plan;
use Auth;
use Illuminate\Http\Request;

class PageController extends Controller
{
    //

    public function homepage(Request $request)
    {
        if (Auth::check()) {
            $params = '';
            $authUser = Auth::user();
            if ($request->invite_token) {
                $params = $request->invite_token ? "?invite_token={$request->invite_token}" : '';
                checkInviteToken($authUser, $request);
            } elseif ($request->member_invite_token) {
                $params = $request->member_invite_token ? "?member_invite_token={$request->member_invite_token}" : '';
                checkMemberInviteToken($authUser, $request);
            }
            return redirect('/dashboard/bookings/services' . $params);
        }

        if ($request->auth == 'reset' && $request->token) {
            $passwordReset = PasswordReset::where('token', $request->token)->first();
            if (! $passwordReset) {
                return redirect('/');
            }
        }

        $plans = Plan::orderBy('id', 'ASC')->get();

        return view('frontend::pages.homepage', [
            'contact' => $this->getContact($request),  
            'member' => $this->getMember($request),  
            'plans' => $plans
        ]);
    }

    public function privacyPolicy(Request $request)
    {
        return view('frontend::pages.privacy-policy', ['contact' => $this->getContact($request)]);
    }

    public function termsOfService(Request $request)
    {
        return view('frontend::pages.terms-of-service', ['contact' => $this->getContact($request)]);
    }

    public function getContact(Request $request)
    {
        $contact = null;
        if ($request->invite_token) {
            $contact = Contact::where('invite_token', $request->invite_token)->where('is_pending', true)->first();
        }

        return $contact;
    }

    public function getMember(Request $request)
    {
        $member = null;
        if ($request->member_invite_token) {
            $member = Member::where('invite_token', $request->member_invite_token)->where('is_pending', true)->first();
        }

        return $member;
    }
}
