@extends('emails.layout')

@section('content')

<h2 style="text-align: left">Thanks for creating a Telloe account!</h2>
<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
    Please use the temporary password below to access your account.
</p>

<div style="text-align: left">
    <div style="border-radius: 4px; border: dashed 1px; padding: 5px 15px 6px; text-align: left; background-color: #eee; margin-top: 10px; line-height: 22px; display: inline-block">
        {{ $password }}
    </div>
</div>


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
