<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\User;
use App\Models\Message;
use App\Models\Contact;
use App\Models\ConversationMember;
use Auth;
use File;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $conversations = Conversation::withTrashed()->with('user', 'members.user')
            ->where(function($query) {
                $query->where('user_id', Auth::user()->id)
                    ->orWhereHas('members', function($members) {
                        $members->where('user_id', Auth::user()->id);
                    });
            })
            ->where(function($query) {
                $query->has('members.user')->orHas('contact');
            })
            ->get();
    	return response()->json($conversations);
    }

    public function show($id, Request $request)
    {
        $conversation = Conversation::withTrashed()->where(function($query){
            $query->has('members.user')->orHas('contact');
        })->with('user.services', 'members.user')->findOrfail($id);
        $this->authorize('show', $conversation);

        //if ($request->is_read) :
            // set is_read of opposite sender
            $conversation->messages()
                ->where(function($query) {
                    $query->where('user_id', '<>', Auth::user()->id)
                        ->orWhereNull('user_id');
                })
                ->where('is_read', 0)
                ->update(['is_read' => 1]);
        //endif;

        $conversation->paginated_messages = $conversation->messages()->with('user')->paginate(20)->withPath('/dashboard/bookings/services/' . $conversation->id);

        return response()->json($conversation);
    }
    
    public function store(Request $request)
    {
        $this->validate($request, [
            'members' => 'required|array'
        ]);

        if(count($request->members) == 1) :
            $contact = Contact::findOrFail($request->members[0]);
            $conversation = Conversation::where('user_id', Auth::user()->id)->where(function($query) use ($contact) {
                $query->where('contact_id', $contact->id)
                    ->orWhereHas('members', function($members) use ($contact) {
                        $members->where('user_id', $contact->contactUser->id ?? 0);
                    });
            })->has('members', 1)->first();

            if($conversation) return response()->json($conversation->load('user', 'messages.user', 'members.user'));
        endif;

        $error = false;
        $members = [];
        foreach($request->members as $member_id) :
            $contact = Contact::where('id', $member_id)->where('user_id', Auth::user()->id)->first();
            if(!$contact || $contact->is_pending || !$contact->contactUser):
                $error = true;
                break;
            endif;
            if($contact && $contact->contactUser && $contact->contactUser->id != Auth::user()->id && !in_array($contact->contactUser->id, $members)) :
                $members[] = $contact->contactUser->id;
            endif;
        endforeach;

        if($error) return abort(403, 'Failed creating a conversation. One of the member IDs is invalid.');

        if (count($members) > 0) :
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
            ]);
            foreach($members as $member_id) :
                ConversationMember::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $member_id
                ]);
            endforeach;
        endif;

        if(!$conversation) return abort(403, 'Failed creating a conversation.');
        if(count($members) > 1) $conversation->update(['name' => 'New group chat']);
       
        return response()->json($conversation->load('members.user'));
    }

    public function update($id, Request $request)
    {
        $conversation = Conversation::findOrfail($id);
        $this->authorize('update', $conversation);

        $custom_fields = [];
        foreach($request->custom_fields as $custom_field) :
            if($custom_field['name'] && $custom_field['value'] && isset($custom_field['is_visible'])) $custom_fields[] = $custom_field;
        endforeach;

        $archive_users = $conversation->archive_users;
        if($request->archive) :
            if(!in_array(Auth::user()->id, $archive_users)) :
                $archive_users[] = Auth::user()->id;
            endif;
        else:
            $archive_users = array_values(array_diff($archive_users, [Auth::user()->id]));
        endif;

        $conversation->archive_users = $archive_users;
        $conversation->save();

        $conversation->update([
            'name' => $request->name,
            'tags' => $request->tags,
            'custom_fields' => $custom_fields,
        ]);


        return response()->json($conversation);
    }

    public function call($id)
    {
        $conversation = Conversation::findOrFail($id);
        $this->authorize('call', $conversation);

        return view('frontend::call', compact('conversation'));
    }

    public function files($id, Request $request)
    {
        $conversation = Conversation::withTrashed()->findOrFail($id);
        $this->authorize('show', $conversation);
        $files = $conversation->messages()->whereNotIn('type', ['text', 'emoji'])->paginate(100)->withPath('/dashboard/bookings/services/' . $conversation->id);
        return response()->json($files);
    }
}
