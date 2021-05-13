<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConversationMemberRequest;
use App\Services\ConversationMemberService;

class ConversationMemberController extends Controller
{
    //

    public function store(StoreConversationMemberRequest $request)
    {
        return ConversationMemberService::store($request);
    }

    public function destroy($id)
    {
        $conversationMember = new ConversationMemberService();
        return response($conversationMember->delete($id));
    }
}
