@extends('emails.layout')

@section('content')

<img src="{{ $videoMessage->link_preview }}" style="width: 100%; height; auto;" /> 
<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0; text-align: center">
Your video message has new comments.
</p>


@if($actionUrl)
<a href="{{ $actionUrl }}"
    style="{{ $style['button'] }}{{ $style['display-block'] }} margin-top: 20px; margin-bottom: 5px"
    class="button"
    target="_blank">
    {{ $actionText }}
</a>


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
