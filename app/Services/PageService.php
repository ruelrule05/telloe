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
        if (Auth::check()) {
            // $invite_token = Session::pull('invite_token');
            // $member_invite_token = Session::pull('member_invite_token');
            // if ($invite_token) {
            // } elseif ($member_invite_token) {
            // }
            $authUser = Auth::user();
            if ($authUser->role_id == 2) {
                return redirect('/dashboard/bookings/calendar');
            } else {
                return redirect('/dashboard/bookings');
            }
        } else {
            // Set or forget invite tokens
            if ($request->invite_token) {
                $request->session()->put('invite_token', $request->invite_token);
            } else {
                $request->session()->forget('invite_token');
            }
            if ($request->member_invite_token) {
                $request->session()->put('member_invite_token', $request->member_invite_token);
            } else {
                $request->session()->forget('member_invite_token');
            }
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

    public static function index()
    {
        return ;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }
}
