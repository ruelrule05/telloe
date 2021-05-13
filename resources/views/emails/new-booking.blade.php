@extends('emails.layout')

@section('content')


<div style="margin-bottom: 30px">
    <h1 style="font-size: 32px; margin-bottom: 0; margin-top: 0" class="text-primary">{{ $bookings[0]->service->name }} is booked!</h1>
   
</div>

<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
You successfully booked an event <strong>"{{ $bookings[0]->service->name }}"</strong> with <strong> {{ $bookings[0]->service->coach->full_name }}</strong>.
</p>

@foreach($bookings as $booking) 
    <div style="border-radius: 15px; background-color: #F8F8F9; padding: 20px; margin-top: 20px">
        <h3 style="margin-top: 0; margin-bottom: 0">
            {{ \Carbon\Carbon::parse($booking->date)->format('M d, Y') }} ({{ \Carbon\Carbon::parse($booking->date)->format('l') }})
        </h3>
        <div style="font-size: 16px">{{ \Carbon\Carbon::parse($booking->date . ' ' . $booking->start, $booking->service->user->timezone ?? null)->timezone($booking->user->timezone ?? null)->format('h:iA') }} -  {{ \Carbon\Carbon::parse($booking->date . ' ' . $booking->end, $booking->service->user->timezone ?? null)->timezone($booking->user->timezone ?? null)->format('h:iA') }}</div>

        @if($booking->recurring)
        <div style="margin-top: 10px; display: flex; align-items: cexnter; flex-wrap: nowrap; font-size: 14px; line-height: 18px" class="text-muted">
            <div>
                <img src="{{ config('app.url') }}/images/refresh.png" style="margin-top: 5px" />
            </div>
            <div style="margin-left: 10px;">
                Repeating booking every <strong>{{ implode(',', $booking->recurring_days) }}</strong> until <strong>{{ $booking->until }}</strong>.
            </div>
        </div>
        @endif
        <div style="margin-top: 10px">
            Add to:&nbsp;&nbsp;
            <a target="_blank" class="text-primary" href="{{ $booking->google_link}}"><strong>Google Calendar</strong></a>
            &nbsp;&nbsp;
            <a target="_blank" class="text-primary" href="{{ $booking->outlook_link }}"><strong>Outlook</strong></a>
            &nbsp;&nbsp;
            <a target="_blank" class="text-primary" href="{{ $booking->yahoo_link }}"><strong>Yahoo!</strong></a>
            &nbsp;&nbsp;
            <a target="_blank" class="text-primary" href="{{ $booking->ical_link }}"><strong>iCal</strong></a>
        </div>

        @if($booking->zoom_link)
        <div>
            Zoom link:&nbsp;&nbsp;
            <a target="_blank"  class="text-primary" style="word-break: break-all" href="{{ $booking->zoom_link }}"><strong>Go to Zoom meeting</strong></a>
        </div>
        @endif
    </div>
@endforeach

@if($actionUrl)
<a href="{{ $actionUrl }}"
    style="{{ $style['button'] }} margin-top: 20px; margin-bottom: 5px"
    class="button"
    target="_blank">
    {{ $actionText }}
</a>

<!-- @if($booking->user)
<small style="color: #888">Please <a href="{{ config('app.url') }}?auth=login" target="_blank" style="color: blue"><u>login</u></a> to your account to manage this booking.</small>
@endif -->

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
