<?php

namespace App\Services;

use App\Http\Requests\StoreConversationRequest;
use App\Mail\NewConversation;
use App\Models\Contact;
use App\Models\Conversation;
use App\Models\ConversationMember;
use App\Models\Member;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Mail;

class ConversationService
{
    use AuthorizesRequests, ValidatesRequests;

    public static function index()
    {
        $conversations = Conversation::with('user', 'members.user')
            ->where(function ($query) {
                $query->where('user_id', Auth::user()->id)
                    ->orWhereHas('members', function ($members) {
                        $members->where('user_id', Auth::user()->id);
                    });
            })
            ->get();
        return $conversations;
    }

    public function show($id)
    {
        $conversation = Conversation::withTrashed()->with('contact', 'notes')->with('user.services', 'members.user')->findOrfail($id);
        $this->authorize('show', $conversation);

        //if ($request->is_read) :
        // set is_read of opposite sender
        $conversation->messages()
                ->where(function ($query) {
                    $query->where('user_id', '<>', Auth::user()->id)
                        ->orWhereNull('user_id');
                })
                ->where('is_read', 0)
                ->update(['is_read' => 1]);
        //endif;

        $conversation->paginated_messages = $conversation->messages()->with('user')->paginate(20)->withPath('/dashboard/bookings/services/' . $conversation->id);

        return $conversation;
    }

    public static function store(StoreConversationRequest $request)
    {
        $authUser = Auth::user();
        if (count($request->members ?? []) == 1) {
            $user = User::findOrFail($request->members[0]);
            $contact = Contact::where('user_id', $authUser->id)->where('contact_user_id', $user->id)->where('is_pending', false)->first();
            $member = Member::where('user_id', $authUser->id)->where('member_user_id', $user->id)->where('is_pending', false)->first();
            if (! $contact && ! $member) {
                return abort(403, 'No contact or member found.');
            }
            $conversation = Conversation::where('user_id', $authUser->id)->where(function ($query) use ($user) {
                $query->whereHas('members', function ($members) use ($user) {
                    $members->where('user_id', $user->id);
                });
            })->has('members', 1)->first();

            if ($conversation) {
                return response()->json($conversation->load('user', 'messages.user', 'members.user'));
            }
        }

        $error = false;
        $members = [];
        foreach ($request->members ?? [] as $user_id) {
            $user = User::findOrFail($user_id);
            $contact = Contact::where('user_id', $authUser->id)->where('contact_user_id', $user->id)->first();
            $member = Member::where('user_id', $authUser->id)->where('member_user_id', $user->id)->where('is_pending', false)->first();
            if (! $contact && ! $member) {
                $error = true;
                break;
            }
            if (! in_array($user->id, $members)) {
                $members[] = $user->id;
            }
        }

        if ($error) {
            return abort(403, 'Failed creating a conversation. One of the member IDs is invalid.');
        }

        if (count($members) > 0) {
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
            ]);
            foreach ($members as $user_id) {
                ConversationMember::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $user_id
                ]);
            }
        } else {
            if ($request->email) {
                $userExists = User::where('email', $request->email)->first();
                $conversation = Conversation::create([
                    'user_id' => Auth::user()->id,
                ]);
                ConversationMember::create([
                    'conversation_id' => $conversation->id,
                    'email' => $request->email,
                    'user_id' => $userExists->id ?? NULL
                ]);
                $emailToSend = NULL;
                if ($userExists && $userExists->email && $userExists->notify_message) {
                    $emailToSend = $userExists->email;
                } elseif (! $userExists) {
                    $emailToSend = $request->email;
                }
                if ($emailToSend) {
                    Mail::to($emailToSend)->queue(new NewConversation($conversation, $userExists ? false : true));
                }
            }
        }

        if (! $conversation) {
            return abort(403, 'Failed creating a conversation.');
        }
        if (count($members) > 1) {
            $conversation->update(['name' => 'New group chat']);
        }

        return $conversation->load('members.user');
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100'
        ]);
        $conversation = Conversation::findOrfail($id);
        $this->authorize('update', $conversation);

        // $custom_fields = [];
        // foreach ($request->custom_fields as $custom_field) {
        //     if ($custom_field['name'] && $custom_field['value'] && isset($custom_field['is_visible'])) {
        //         $custom_fields[] = $custom_field;
        //     }
        // }

        // $archive_users = $conversation->archive_users;
        // if ($request->archive) {
        //     if (! in_array(Auth::user()->id, $archive_users)) {
        //         $archive_users[] = Auth::user()->id;
        //     }
        // } else {
        //     $archive_users = array_values(array_diff($archive_users, [Auth::user()->id]));
        // }

        // $conversation->archive_users = $archive_users;
        // $conversation->save();

        $conversation->update([
            'name' => $request->name,
            'tags' => $request->tags,
        ]);

        return $conversation;
    }

    public function files($id)
    {
        $conversation = Conversation::withTrashed()->findOrFail($id);
        $this->authorize('show', $conversation);
        $files = $conversation->messages()->whereNotIn('type', ['text', 'emoji'])->paginate(100)->withPath('/dashboard/bookings/services/' . $conversation->id);
        return $files;
    }

    public static function delete($id)
    {
        return ;
    }
}
