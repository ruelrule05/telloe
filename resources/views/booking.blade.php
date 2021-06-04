<!doctype html>
<html lang="en">
<head>
	<title>{{ $booking->service->name }} event | {{ config('app.name')}}</title>
	@include('partials.meta_tags')
	@include('partials.styles')
</head>
<body class="h-100vh w-100vw bg-secondary">
    <div class="container py-6">
        <div class="flex justify-center">
            <div class="lg:w-5/12 bg-white rounded-xl p-4">
                <h1 class="font-bold text-2xl">{{ $booking->service->name }}</h1>
                <h3 class="text-muted text-sm mb-4">{{ $booking->service->duration }} min event with <strong>{{ $booking->service->coach->full_name }}</strong></h3>

                <label class="-mb-px">Date</label>
                <div class="text-sm mb-4">{{ date('M d, Y', strtotime($booking->date)) }}</div>

                <label class="-mb-px">Time</label>
                <div class="text-sm mb-4">{{ date('h:iA', strtotime($booking->date . ' '. $booking->start)) }} &mdash; {{ date('h:iA', strtotime($booking->date . ' '. $booking->end)) }}</div>

                <label>Guests</label>
                <div class="flex mb-4">
                    @foreach($booking->bookingUsers as $bookingUser)
                    <div class="text-sm py-1 px-2 rounded bg-gray-50 mr-1 font-bold">{{ $bookingUser->user->full_name ?? $bookingUser->guest['email'] }}</div>
                    @endforeach
                </div>

                <label class="-mb-px">Meeting Type</label>
                <div class="text-sm mb-4">{{ $booking->meeting_type }}</div>

                <label class="-mb-px">Notes</label>
                <div class="text-sm mb-4">{{ $booking->notes ?? '-' }}</div>

                <div class="text-sm">
                    <label class="-mb-px">Add to calendar</label>
                    <a target="_blank" class="text-primary" href="{{ $booking->google_link}}"><strong><u>Google Calendar</u></strong></a>
                    &nbsp;&nbsp;
                    <a target="_blank" class="text-primary" href="{{ $booking->outlook_link }}"><strong><u>Outlook</u></strong></a>
                    &nbsp;&nbsp;
                    <a target="_blank" class="text-primary" href="{{ $booking->yahoo_link }}"><strong><u>Yahoo!</u></strong></a>
                    &nbsp;&nbsp;
                    <a target="_blank" class="text-primary" href="{{ $booking->ical_link }}"><strong><u>iCal</u></strong></a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
