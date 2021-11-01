@extends('emails.layout')

@section('content')

<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
{!! $emailMessage !!}
</p>

<div style="text-align-last: left; margin-top: 10px">
    <div style="margin-top: 20px;">
        <h1 style="font-size: 26px; margin-bottom: 2px; margin-top: 0">{{ $booking->customName ?? $booking->name }}</h1>
        @if($booking->service)
        <div style="color: #838EA6">{{ $duration }} min event with <span style="font-weight: 600">{{ $booking->service->coach->full_name }}</span></div>
        @endif
        
        <label style="color: #838EA6; margin-top: 15px; display: block">Date</label>
        <div style="margin-bottom: 15px; margin-top: -2px">{{ $formattedDate }}</div>


        <label style="color: #838EA6">Time</label>
        <div style="margin-bottom: 15px; margin-top: -2px">{{ $startFormat }} - {{ $endFormat }} ({{ $timezone }})</div>

        <label style="color: #838EA6">Guests</label>
        <div style="font-weight: 600; margin-bottom: 15px; margin-top: 5px">
            @foreach($booking->bookingUsers as $bookingUser)
            <div style="display: inline-block;border-radius: 5px; padding: 6px 10px; background-color: #f8f8f9; display: inline-block;  font-weight: 600; margin-bottom: 5px;">
                @if($bookingUser->user->first_name)
                <div style="line-height: 20px">{{ $bookingUser->user->full_name }}</div>
                @endif
                @if($bookingUser->user->email)
                <div style="font-weight: 400; line-height: 20px">{{ $bookingUser->user->email }}</div>
                @endif
            </div>
            @endforeach
        </div>

        <label style="color: #838EA6">Meeting Type</label>
        <div style="margin-bottom: 15px; margin-top: -2px">{{ $booking->meeting_type }}</div>

        @if($booking->notes)
        <label style="color: #838EA6">Notes</label>
        <div style="margin-bottom: 15px; margin-top: -2px">{{ $booking->notes }}</div>
        @endif


        @if($booking->zoom_link)
            <label style="color: #838EA6">Zoom link</label>
            <div style="margin-bottom: 15px; margin-top: -2px">
                <a href="{{ $booking->zoom_link }}" target="_blank" style="font-weight: 500; color: #0000EE"><u>Go to Zoom meeting</u></a>
            </div>
        @endif

        @if($booking->meet_link)
            <label style="color: #838EA6">Google Meet link</label>
            <div style="margin-bottom: 15px; margin-top: -2px">
               <a href="{{ $booking->meet_link }}" target="_blank" style="font-weight: 500; color: #0000EE"><u>Go to Meet conference</u></a>
            </div>
        @endif


        <label style="color: #838EA6">Add to Calendar</label>
        <div style="font-weight: 500; margin-bottom: 15px; margin-top: -2px">
            <a href="{{ $booking->google_link }}" target="_blank" style="font-weight: 500; color: #3167e3"><u>Google Calendar</u></a>
            &nbsp;&nbsp;
            <a href="{{ $booking->outlook_link }}" target="_blank" style="font-weight: 500; color: #3167e3"><u>Outlook</u></a>
            &nbsp;&nbsp;
            <a href="{{ $booking->yahoo_link }}" target="_blank" style="font-weight: 500; color: #3167e3"><u>Yahoo!</u></a>&nbsp;&nbsp;
            <a href="{{ $booking->ical_link }}" target="_blank" style="font-weight: 500; color: #3167e3"><u>iCal</u></a>
        </div>

    </div>
</div>

<div style="text-align: center">
    <a href="{{ $url }}"
        style="{{ $style['button'] }} margin-top: 20px;"
        class="button"
        target="_blank">
        View Booking
    </a>
</div>
@stop
