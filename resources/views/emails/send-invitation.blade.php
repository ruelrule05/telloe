@extends('emails.layout')

@section('content')

<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
    <strong>{{ $userCustomer->user->full_name }}</strong> has invited you in Telloe.
     <a href="{{ $actionUrl }}"
        style="{{ $style['button'] }}{{ $style['display-block'] }} margin-top: 20px; margin-bottom: 30px"
        class="button"
        target="_blank">
        {{ $actionText }}
    </a>
</p>

<div style="text-align: left; margin-top: 20px; border-top: solid 1px #ddd; padding-top: 20px;">
     <p style="{{ $style['paragraph-sub'] }} margin-bottom: 0">
        If you’re having trouble clicking the "{{ $actionText }}" button,
        copy and paste the URL below into your web browser: <br />
        <a style="{{ $style['text-primary'] }} text-decoration: underline;" href="{{ $actionUrl }}" target="_blank">
            {{ $actionUrl }}
        </a>
    </p>

</div>
@stop
