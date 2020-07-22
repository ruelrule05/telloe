<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{

    public function searchTags(Request $request)
    {
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id',
            'query' => 'required|string',
        ]);
        $conversation = Conversation::find($request->conversation_id);
        $this->authorize('show', $conversation);

        $results = [];
        $query = $request->get('query');
        $auth = Auth::user();

        $messages = $conversation->messages()->with('user')->whereHas('conversation', function($conversation) use ($auth) {
            $conversation->where('user_id', $auth->id);
        })
            ->where('tags', 'LIKE', '%' . $query . '%')
            ->get();
        foreach($messages as $message) :
            $message = $message->toArray();
            if($message['user_id'] == $auth->id) :
                $message['outgoing'] = true;
                $message['user']['full_name'] = 'You';
            endif;
            $results[] = [
                'type' => 'message',
                'data' => $message
            ];
        endforeach;


        $notes = $conversation->notes()->whereHas('conversation', function($conversation) use ($auth) {
            $conversation->where('user_id', $auth->id);
        })
            ->where('tags', 'LIKE', '%' . $query . '%')
            ->get();
        foreach($notes as $note) :
            $results[] = [
                'type' => 'note',
                'data' => $note
            ];
        endforeach;

        if(count($results) > 0) :
            usort($results, function($a, $b)
            {
                return Carbon::parse($a['data']['created_at']) <  Carbon::parse($b['data']['created_at']);
            });
        endif;

        return response()->json($results);
    }
}
