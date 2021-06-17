@extends('emails.layout')

@section('content')

<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
    {!! $emailMessage !!}
    <div style="border-radius: 15px; background-color: #F8F8F9; padding: 20px; margin-top: 20px">
        <h3 style="margin-top: 0; margin-bottom: 0">
            {{ \Carbon\Carbon::parse($booking->date)->format('M d, Y') }} ({{ \Carbon\Carbon::parse($booking->date)->format('l') }})
        </h3>
        <div style="font-size: 16px">{{ \Carbon\Carbon::parse($booking->date . ' ' . $booking->start, $booking->service->coach->timezone ?? null)->format('h:iA') }} -  {{ \Carbon\Carbon::parse($booking->date . ' ' . $booking->end, $booking->service->coach->timezone ?? null)->format('h:iA') }} ({{$booking->service->coach->timezone ?? ''}})</div>

        <div style="margin-top: 10px; color: #777; margin-bottom: 5px">Guests</div>
        @foreach($booking->bookingUsers as $bookingUser)
            <div style="border-radius: 5px; padding: 3px 8px; background-color: #ddd; display: inline-block;  font-weight: 600; margin-bottom: 5px">
                <div>{{ $bookingUser->user->full_name }}</div>
                <small style="font-weight: 400; display: block; margin-top: -4px; color: #555">{{ $bookingUser->user->email }}</small>
            </div>
        @endforeach

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
        <a href="{{ $booking->url }}"
            style="{{ $style['button'] }} margin-top: 20px; margin-bottom: 5px"
            class="button"
            target="_blank">
            View Booking
        </a>
    </div>
</p>
@stop
