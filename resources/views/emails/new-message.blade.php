@extends('emails.layout')

@section('content')


<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
You received a new message from <strong>{{ $convoMessage->user->full_name }}</strong>
</p>

<div style="border-radius: 12px; padding: 6px 15px; text-align: left; background-color: #eee; margin-top: 10px; line-height: 22px">
    <div>
        @if($convoMessage->type == 'text')
            <p style="margin: 0">{{ $convoMessage->message }}</p>
        @elseif($convoMessage->type == 'emoji')
            <p style="margin: 12px 0; font-size: 40px">{{ $convoMessage->message }}</p>
        @elseif($convoMessage->type == 'image' || $convoMessage->type == 'video')
            <div style="margin-top: 10px; margin-bottom: 4px; border-radius: 5px; background-image: url('{{ $convoMessage->preview }}'); width: 150px; height: 150px; background-size: cover; background-position: center; background-repeat: no-repeat"></div>
        @elseif($convoMessage->type == 'file')
            <p style="margin: 0; font-weight: 500;">{{ $convoMessage->metadata['filename'] }}</p>
        @endif
        <small style="font-weight: 300; color: #777; display: block">{{ $convoMessage->created_at_format }}</small>
    </div>
</div>

@if($actionUrl)
<a href="{{ $actionUrl }}"
    style="{{ $style['button'] }}{{ $style['display-block'] }} margin-top: 20px; margin-bottom: 5px"
    class="button"
    target="_blank">
    {{ $actionText }}
</a>

<small style="color: #888">Please <a href="{{ config('app.url') }}?auth=login" target="_blank" style="color: blue"><u>login</u></a> to your account to manage this booking.</small>

<div style="text-align: left; margin-top: 20px; border-top: solid 1px #ddd; padding-top: 20px;">
     <p style="{{ $style['paragraph-sub'] }} margin-bottom: 0">
        If you’re having trouble clicking the "{{ $actionText }}" button,
        copy and paste the URL below into your web browser: <br />
        <a style="{{ $style['text-primary'] }} text-decoration: underline;" href="{{ $actionUrl }}" target="_blank">
            {{ $actionUrl }}
        </a>
    </p>
</div>
@endif
@stop
