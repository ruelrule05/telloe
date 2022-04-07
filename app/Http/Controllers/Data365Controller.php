<?php

namespace App\Http\Controllers;

use App\Http\Data365;
use App\Models\LinkedinActivity;
use App\Models\User;

class Data365Controller
{
    public function callback(string $username)
    {
        $user = User::where('linkedin_username', $username)->first();
        if ($user) {
            $data365 = new Data365($username);
            $sharedPosts = $data365->getActivities('created_post');
            $postComments = $data365->getActivities('created_comment_on_post');
            $postReactions = $data365->getActivities('reacted_to_post');
            $commentReactions = $data365->getActivities('reacted_to_comment_on_post');
            foreach ($sharedPosts as $sharedPost) {
                $sharedPost['type'] = 'shared_post';
                LinkedinActivity::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'activity_id' => $sharedPost['id'],
                        'type_id' => $sharedPost['type'] . '-' . $sharedPost['id'],
                    ], 
                    [
                        'data' => $sharedPost
                    ]
                );
            }
            foreach ($postComments as $postComment) {
                $postComment['type'] = 'post_comment';
                LinkedinActivity::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'activity_id' => $postComment['id'],
                        'type_id' => $postComment['type'] . '-' . $postComment['id'],
                    ], 
                    [
                        'data' => $postComment
                    ]
                );
            }
            foreach ($postReactions as $postReaction) {
                $postReaction['type'] = 'post_reaction';
                LinkedinActivity::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'activity_id' => $postReaction['id'],
                        'type_id' => $postReaction['type'] . '-' . $postReaction['id'],
                    ], 
                    [
                        'data' => $postReaction
                    ]
                );
            }
            foreach ($commentReactions as $commentReaction) {
                $commentReaction['type'] = 'comment_reaction';
                LinkedinActivity::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'activity_id' => $commentReaction['id'],
                        'type_id' => $commentReaction['type'] . '-' . $commentReaction['id'],
                    ], 
                    [
                        'data' => $commentReaction
                    ]
                );
            }
        }
    }
}