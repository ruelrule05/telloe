<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Auth;
use Illuminate\Http\Request;
use App\Http\Requests\StoreConversationRequest;
use App\Services\ConversationService;

class ConversationController extends Controller
{
    public function index()
    {
        return response(ConversationService::index());
    }

    public function show($id, Request $request)
    {
        $conversation = Conversation::withTrashed()->with('contact')->where(function ($query) {
            $query->has('members.user')->orHas('contact');
        })->with('user.services', 'members.user')->findOrfail($id);
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

        return response()->json($conversation);
    }

    public function store(StoreConversationRequest $request)
    {
        return ConversationService::store($request);
    }

    public function update($id, Request $request)
    {
        $conversation = Conversation::findOrfail($id);
        $this->authorize('update', $conversation);

        $custom_fields = [];
        foreach ($request->custom_fields as $custom_field) {
            if ($custom_field['name'] && $custom_field['value'] && isset($custom_field['is_visible'])) {
                $custom_fields[] = $custom_field;
            }
        }

        $archive_users = $conversation->archive_users;
        if ($request->archive) {
            if (! in_array(Auth::user()->id, $archive_users)) {
                $archive_users[] = Auth::user()->id;
            }
        } else {
            $archive_users = array_values(array_diff($archive_users, [Auth::user()->id]));
        }

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

        return view('call', compact('conversation'));
    }

    public function files($id, Request $request)
    {
        $conversation = Conversation::withTrashed()->findOrFail($id);
        $this->authorize('show', $conversation);
        $files = $conversation->messages()->whereNotIn('type', ['text', 'emoji'])->paginate(100)->withPath('/dashboard/bookings/services/' . $conversation->id);
        return response()->json($files);
    }
}
