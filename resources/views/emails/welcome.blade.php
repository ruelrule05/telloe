@extends('emails.layout')

@section('content')

<div style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
    Hey <strong>{{ $user->first_name }}</strong> 👋
    <p style="text-align: left">
        Welcome to telloe - awesome to have you on board!
        <br />
        You are ready to get started, simply click the link below and login!
    </p>
    <a href="{{ $actionUrl }}"
        style="{{ $style['button'] }}{{ $style['display-block'] }} margin-top: 20px; margin-bottom: 30px"
        class="button"
        target="_blank">
        {{ $actionText }}
    </a>

    @include('emails.signature', ['name' => 'Roo Wright', 'title' => 'CEO,'.config('app.name')])
    <p>
        <i>P.S. While this email is automated, I'm a real person who is here to help you! Just hit reply at any time.</i>
    </p>
</div>

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
