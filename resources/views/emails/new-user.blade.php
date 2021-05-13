@extends('emails.layout')

@section('content')

<div style="font-size: 16px; line-height: 1.7; text-align:left; margin: 0;">
    A new user has signed up with the following details:
    <div style="font-size: 15px; border-radius: .5rem; background-color: #F0F2F5; padding: 0.02rem 1rem; text-align-last: left; margin-top: 10px">
        <ul style="list-style: none; padding: 0; text-align: left">
            <li>
                <span style="width: 120px; display: inline-block">First Name</span> <strong>{{ $user->first_name }}</strong>
            </li>
            <li>
                <span style="width: 120px; display: inline-block">Last Name</span> <strong>{{ $user->last_name }}</strong>
            </li>
            <li>
                <span style="width: 120px; display: inline-block">Email</span> <strong>{{ $user->email }}</strong>
            </li>
            <li>
                <span style="width: 120px; display: inline-block">Timezone</span> <strong>{{ $user->timezone }}</strong>
            </li>
        </ul>
    </div>
</div>
@stop
