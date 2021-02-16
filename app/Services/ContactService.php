<?php

namespace App\Services;

use App\Models\Contact;
use App\Models\Conversation;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Mail;
use App\Http\Requests\StoreContactRequest;
use App\Mail\SendInvitation;

class ContactService
{
    public static function index(Request $request)
    {
        {
            $query = $request->get('query');
            $contacts = Contact::with('contactUser')
                // ->select(['bookings.*', 'contacts.*'])
                // ->join('bookings', 'contacts.contact_user_id', '=', 'bookings.user_id')
                ->where('contacts.user_id', Auth::user()->id);
            if ($query) {
                $contacts = $contacts->where(function ($q) use ($query) {
                    $q->whereHas('contactUser', function ($contactUser) use ($query) {
                        $contactUser->where('first_name', 'LIKE', '%' . $query . '%')
                            ->orWhere('last_name', 'LIKE', '%' . $query . '%')
                            ->orWhere(DB::raw("CONCAT(`first_name`, ' ', `last_name`)"), 'LIKE', '%' . $query . '%')
                            ->orWhere('email', 'LIKE', '%' . $query . '%');
                    })->orWhere(function ($q) use ($query) {
                        $q->where('first_name', 'LIKE', '%' . $query . '%')
                            ->orWhere('last_name', 'LIKE', '%' . $query . '%')
                            ->orWhere(DB::raw("CONCAT(`first_name`, ' ', `last_name`)"), 'LIKE', '%' . $query . '%')
                            ->orWhere('email', 'LIKE', '%' . $query . '%');
                    });
                });
            }
            $status = ['accepted', 'pending'];
            if (in_array($request->status, $status)) {
                switch ($request->status) {
                    case 'accepted':
                        $contacts = $contacts->where('is_pending', false);
                        break;

                    case 'pending':
                        $contacts = $contacts->where('is_pending', true);
                        break;
                }
            }

            $contacts = $contacts->orderBy('created_at', 'DESC');

            $contacts = $request->nopaginate ? $contacts->get() : $contacts->paginate(20);

            return $contacts ;
        }
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StoreContactRequest $request)
    {
        if ($request->email == Auth::user()->email) {
            return abort(403, "Can't add your own email as contact");
        }

        $authTab = 'login';
        $contactUser = User::where('email', $request->email)->first();
        if (! $contactUser) {
            $authTab = 'signup';
        }

        if ($contactUser && Contact::where('user_id', Auth::user()->id)->where('contact_user_id', $contactUser->id)->first()) {
            return abort(403, 'This contact already exists.');
        }

        $invite_token = '';
        while (true) {
            $invite_token = Str::random(30);
            $exists = Contact::where('invite_token', $invite_token)->first();
            if (! $exists) {
                break;
            }
        }
        if (Contact::where('user_id', Auth::user()->id)->where('email', $request->email)->first()) {
            return abort(403, 'This contact already exists.');
        }
        $contact = Contact::create([
            'user_id' => Auth::user()->id,
            'contact_user_id' => $contactUser->id ?? null,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'is_pending' => true,
            'invite_token' => $invite_token,
            'blacklisted_services' => $request->blacklisted_services
        ]);
        $contact->load('contactUser');

        $custom_fields = [];
        foreach ($request->custom_fields as $custom_field => $value) {
            if ($value) {
                $custom_fields[] = ['name' => $custom_field, 'value' => $value];
            }
        }

        $createMessage = false;
        if ($contactUser) {
            $conversation = Conversation::where('user_id', Auth::user()->id)->whereHas('members', function ($member) use ($contactUser) {
                $member->where('user_id', $contactUser->id);
            })->has('members', '=', 1)->first();
            if (! $conversation) {
                $createMessage = true;
                $conversation = Conversation::create([
                    'user_id' => Auth::user()->id,
                    'custom_fields' => $custom_fields,
                    'contact_id' => $contact->id,
                ]);
            }
        } else {
            $createMessage = true;
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
                'contact_id' => $contact->id,
                'custom_fields' => $custom_fields,
            ]);
        }

        if ($contactUser && ! in_array($contactUser->id, $conversation->members()->pluck('user_id')->toArray())) {
            ConversationMember::firstOrCreate([
                'conversation_id' => $conversation->id,
                'user_id' => $contactUser->id
            ]);
        }

        if ($conversation && $request->invite_message && $createMessage) {
            Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => Auth::user()->id,
                'message' => $request->invite_message,
                'type' => 'text'
            ]);
        }

        if ($request->sendToEmail) {
            Mail::to($contact->email)->queue(new SendInvitation($contact, $authTab, $request->invite_message));
        }
        $contact->conversation = $conversation;
        if ($createMessage) {
            $conversation->delete();
        }
        return response()->json($contact->load('contactUser'));
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
