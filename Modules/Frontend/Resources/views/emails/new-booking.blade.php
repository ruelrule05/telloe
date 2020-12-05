@extends('frontend::emails.layout')

@section('content')


<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
{!! $emailMessage !!}
</p>
<div style="text-align: xleft; margin-top: 30px; margin-bottom: 30px">
    <h1 style="font-size: 26px; margin-bottom: 0; margin-top: 0">{{ $bookings[0]->service->name }}</h1>
    {{ $bookings[0]->service->coach->full_name }}
</div>


@foreach($bookings as $booking) 
    <div style="border-radius: .5rem; background-color: #F0F2F5; padding: 10px 1rem; text-align-last: left; margin-top: 10px">
        <table style="width: 100%;">
            <tr>
                <td style="width: 25%">Date</td>
                <td><strong>{{ \Carbon\Carbon::parse($booking->date)->format('M d, Y') }}</strong></td>
            </tr>
            <tr>
                <td style="width: 25%">From</td>
                <td><strong>{{ \Carbon\Carbon::parse($booking->date . ' ' . $booking->start, $booking->service->user->timezone ?? null)->timezone($booking->user->timezone ?? null)->format('h:iA') }}</strong></td>
            </tr>
            <tr>
                <td style="width: 25%">To</td>
                <td><strong>{{ \Carbon\Carbon::parse($booking->date . ' ' . $booking->end, $booking->service->user->timezone ?? null)->timezone($booking->user->timezone ?? null)->format('h:iA') }}</strong></td>
            </tr>
            <tr>
                <td style="width: 25%">Timezone</td>
                <td><strong>{{ $booking->user->timezone ?? config('app.timezone') }}</strong></td>
            </tr>
            @if($booking->zoom_link)
            <tr>
                <td style="width: 25%; vertical-align: top">Zoom link</td>
                <td><u><a target="_blank" style="word-break: break-all" href="{{ $booking->zoom_link['join_url'] }}">Go to Zoom meeting</a></u></td>
            </tr>
            @endif
        </table>
        <div>
        Add calendar to: 
        <u><a target="_blank" href="{{ $booking->google_link}}">Google Calendar</a></u>
        &nbsp;|&nbsp;
        <u><a target="_blank" href="{{ $booking->outlook_link }}">Outlook</a></u>
        &nbsp;|&nbsp;
        <u><a target="_blank" href="{{ $booking->yahoo_link }}">Yahoo!</a></u>
        &nbsp;|&nbsp;
        <u><a target="_blank" href="{{ $booking->ical_link }}">iCal</a></u>
        </div>
    </div>
@endforeach

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
