<?php

namespace App\Jobs;

use App\Http\Data365;

class LinkedinMemberTask
{
    public function handle(string $username)
    {
        $data365 = new Data365($username);
        $data365->createTask();
    }
}