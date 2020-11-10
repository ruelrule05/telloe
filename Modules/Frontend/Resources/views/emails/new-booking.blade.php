@extends('frontend::emails.layout')

@section('content')


<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
    {!! $emailMessage !!}
    <div style="border-radius: .5rem; background-color: #F0F2F5; padding: 0.02rem 1rem; text-align-last: left; margin-top: 10px">
        <h1 style="font-size: 26px; margin-bottom: 0">{{ $booking->service->user->full_name }}</h1>
        <ul style="list-style: none; padding: 0; text-align: left">
            <li>
                <span style="width: 100px; display: inline-block">Service</span> <strong>{{ $booking->service->name }}</strong>
            </li>
            <li>
                <span style="width: 100px; display: inline-block">Date</span> <strong>{{ \Carbon\Carbon::parse($booking->date)->format('M d, Y') }}</strong>
            </li>
            <li>
                <span style="width: 100px; display: inline-block">From</span> <strong>{{ \Carbon\Carbon::parse($booking->start)->format('h:iA') }}</strong>
            </li>
            <li>
                <span style="width: 100px; display: inline-block">To</span> <strong>{{ \Carbon\Carbon::parse($booking->end)->format('h:iA') }}</strong>
            </li>
        </ul>
    </div>
</p>

@if($actionUrl)
<a href="{{ $actionUrl }}"
    style="{{ $style['button'] }}{{ $style['display-block'] }} margin-top: 20px; margin-bottom: 5px"
    class="button"
    target="_blank">
    {{ $actionText }}
</a>

<!-- @if($booking->user)
<small style="color: #888">Please <a href="{{ config('app.url') }}?auth=login" target="_blank" style="color: blue"><u>login</u></a> to your account to manage this booking.</small>
@endif -->

<div style="margin-top: 20px;">
Add this booking to: <u><a target="_blank" href="{{ $link->google() }}">Google Calendar</a></u>&nbsp;&nbsp;|&nbsp;&nbsp;<u><a target="_blank" href="{{ str_replace(['&rru=addevent', '+'], ['', '%20'], $link->webOutlook()) }}">Outlook</a></u>&nbsp;&nbsp;|&nbsp;&nbsp;<u><a target="_blank" href="{{ $link->yahoo() }}">Yahoo!</a></u>&nbsp;&nbsp;|&nbsp;&nbsp;<u><a target="_blank" href="{{ url('/ics?name='.$booking->service->name.'&data=' . $link->ics()) }}">iCal</a></u>
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
@endif
@stop
