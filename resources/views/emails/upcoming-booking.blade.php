@extends('emails.layout')

@section('content')


<div style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
    {!! $emailMessage !!}
    <div style="text-align-last: left; margin-top: 10px">
        <div style="margin-top: 20px;">
            <h1 style="font-size: 26px; margin-bottom: -5px; margin-top: 0">{{ $booking->name }}</h1>
            @if($booking->service)
            <div style="color: #838EA6">{{ $duration }} min event with <span style="font-weight: 600">{{ $booking->service->coach->full_name }}</span></div>
            @endif
            
            <label style="color: #838EA6; margin-top: 15px; display: block">Date</label>
            <div style="margin-bottom: 15px; margin-top: -2px">{{ $date }}</div>


            <label style="color: #838EA6">Time</label>
            <div style="margin-bottom: 15px; margin-top: -2px">{{ $start }} - {{ $end }} ({{ $timezone }})</div>
            @if($meta_timezone && $meta_start && $meta_end)
            <div style="margin-bottom: 15px; margin-top: -17px">{{ $meta_start }} - {{ $meta_end }} ({{ $meta_timezone }})</div>
            @endif
            

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
            @if( $booking->metadata)
                <div style="margin-top: -15px; margin-bottom: 15px">
                    @if( isset($booking->metadata['phone']))
                        <a target="_blank" href="tel:{{ $booking->metadata['phone'] }}" style="display: inline-block;border-radius: 5px; padding: 6px 10px; background-color: #f8f8f9; display: inline-block;  font-weight: 600; margin-top:5px; color: #555">{{ $booking->metadata['phone'] }}</a>
                    @endif
                    @if( isset($booking->metadata['skype']))
                        <a target="_blank" href="skype:{{ $booking->metadata['skype'] }}?chat" style="display: inline-block;border-radius: 5px; padding: 6px 10px; background-color: #f8f8f9; display: inline-block;  font-weight: 600; margin-top: 5px; color: #555">{{ $booking->metadata['skype'] }}</a>
                    @endif
                </div>
            @endif

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
        <a href="{{ $booking->url }}"
            style="{{ $style['button'] }} margin-top: 20px;"
            class="button"
            target="_blank">
            View Booking
        </a>
    </div>
</div>

@stop
