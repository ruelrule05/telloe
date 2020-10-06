<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\ConversationMember;
use App\Models\Service;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;
use Mail;
use Modules\Frontend\Mail\SendMemberInvitation;
use App\Http\StripeAPI;
use Carbon\Carbon;
use Illuminate\Support\Arr;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('query');
        $members = Member::with('memberUser')
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC');
        if($query):
            $members = $members->whereHas('memberUser', function($memberUser) use ($query) {
                $memberUser->where('LIKE', '%' . $query. '%');
            });
        endif;
        $members = $members->get();

        return response()->json($members);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'invite_message' => 'nullable|string',
        ]);

        if($request->email == Auth::user()->email) return abort(403, "Can't add your own email as member");

        $authUser = Auth::user();

        $authTab = 'login';
        $memberUser = User::where('email', $request->email)->first();
        if(!$memberUser) $authTab = 'signup';

        if($memberUser && Member::where('user_id', Auth::user()->id)->where('member_user_id', $memberUser->id)->first()) return abort(403, "This member already exists.");

        $invite_token = '';
        while(true) :
            $invite_token = Str::random(30);
            $exists = Member::where('invite_token', $invite_token)->first();
            if(!$exists) break;
        endwhile;
        if(Member::where('user_id', Auth::user()->id)->where('email', $request->email)->first()) return abort(403, 'This member already exists.');
        $member = Member::create([
            'user_id' => Auth::user()->id,
            'member_user_id' => $memberUser->id ?? null,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'is_pending' => true,
            'invite_token' => $invite_token,
        ]);
        $member->load('memberUser');
        
        foreach($request->assigned_services as $assigned_service) :
            $service = Service::where('id', $assigned_service)->where('user_id', $authUser->id)->first();
            if($service) :
                $assignedService = $service->replicate();
                $assignedService->user_id = null;
                $assignedService->member_id = $member->id;
                $assignedService->assigned_service_id = $service->id;
                $assignedService->save();
            endif;
        endforeach;


        if($request->sendToEmail) Mail::to($member->email)->queue(new SendMemberInvitation($member, $authTab, $request->invite_message));
        return response()->json($member);

    }


    public function update(Request $request, Member $member)
    {
    }


    public function destroy(Member $member)
    {
        $this->authorize('delete', $member);
        return response()->json(['deleted' => $member->delete()]);
    }


    public function getMemberFromInviteToken(Request $request)
    {
        $this->validate($request, [
            'invite_token' => 'required'
        ]);
        $member = Member::where('invite_token', $request->invite_token)->where('user_id', Auth::user()->id)->first();
        return response()->json($member);
    }

    public function resend($id)
    {
        $member = Member::findOrFail($id);
        $this->authorize('show', $member);

        $authTab = 'login';
        $memberUser = User::where('email', $member->email)->first();
        if(!$memberUser) $authTab = 'signup';

        Mail::to($member->email)->queue(new SendMemberInvitation($member, $authTab));
        return response(['success' => true]);
    }
    
}
