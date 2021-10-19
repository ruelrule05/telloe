<?php

namespace App\Services;

use App\Models\Contact;
use App\Models\Member;
use App\Models\PasswordReset;
use App\Models\Plan;
use Auth;
use Illuminate\Http\Request;

class PageService
{
    public static function homepage(Request $request)
    {
        checkRequestInviteToken($request);
        if (Auth::check() && $request->mobile_app == 'true') {
            return redirect('/dashboard/calendar');
        }

        if ($request->auth == 'reset' && $request->token) {
            $passwordReset = PasswordReset::where('token', $request->token)->first();
            if (! $passwordReset) {
                return redirect('/');
            }
        }

        $plans = Plan::orderBy('id', 'ASC')->get();

        return view('pages.homepage', [
            'contact' => self::getContact($request),
            'member' => self::getMember($request),
            'plans' => $plans
        ]);
    }

    public static function privacyPolicy(Request $request)
    {
        return view('pages.privacy-policy', ['contact' => self::getContact($request)]);
    }

    public static function termsOfService(Request $request)
    {
        return view('pages.terms-of-service', ['contact' => self::getContact($request)]);
    }

    public static function getContact(Request $request)
    {
        $contact = null;
        if ($request->invite_token) {
            $contact = Contact::where('invite_token', $request->invite_token)->where('is_pending', true)->first();
        }

        return $contact;
    }

    public static function getMember(Request $request)
    {
        $member = null;
        if ($request->member_invite_token) {
            $member = Member::where('invite_token', $request->member_invite_token)->where('is_pending', true)->first();
        }

        return $member;
    }

    public static function contact()
    {
        return view('pages.contact');
    }

    public static function affiliates()
    {
        return view('pages.affiliates');
    }

    public static function affiliateTerms()
    {
        return view('pages.affiliate-terms');
    }
}
