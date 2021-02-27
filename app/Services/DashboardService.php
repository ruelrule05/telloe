<?php

namespace App\Services;

use App\Models\Conversation;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardService
{
    public static function searchTags(DashboardSearchTagsRequest $request)
    {
        $conversation = Conversation::find($request->conversation_id);

        $results = [];
        $query = $request->get('query');
        $auth = Auth::user();

        $messages = $conversation->messages()->with('user')->whereHas('conversation', function ($conversation) use ($auth) {
            $conversation->where('user_id', $auth->id);
        })
            ->where('tags', 'LIKE', '%' . $query . '%')
            ->get();
        foreach ($messages as $message) {
            $message = $message->toArray();
            if ($message['user_id'] == $auth->id) {
                $message['outgoing'] = true;
                $message['user']['full_name'] = 'You';
            }
            $results[] = [
                'type' => 'message',
                'data' => $message
            ];
        }

        $notes = $conversation->notes()->whereHas('conversation', function ($conversation) use ($auth) {
            $conversation->where('user_id', $auth->id);
        })
            ->where('tags', 'LIKE', '%' . $query . '%')
            ->get();
        foreach ($notes as $note) {
            $results[] = [
                'type' => 'note',
                'data' => $note
            ];
        }

        if (count($results) > 0) {
            usort($results, function ($a, $b) {
                return Carbon::parse($a['data']['created_at']) < Carbon::parse($b['data']['created_at']);
            });
        }

        return $results;
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
