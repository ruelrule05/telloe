<!doctype html>
<html lang="en">
<head>
	<title>Booking Link | {{ config('app.name')}}</title>
	@include('frontend::partials.meta_tags')
	<link rel="stylesheet" href="{{ mix('css/booking-link.css') }}">
</head>
<body class="h-100vh w-100vw">
	<div id="app" v-cloak>
		<booking-link></booking-link>
	</div>
	@include('frontend::partials.social_scripts')
	<script>
		const AUTH = {!! json_encode($user) !!};
		const BOOKING_LINK = {!! json_encode($bookingLink) !!};
		const IN_EMAILS = {!! $inEmails ? 1 : 0 !!};
	</script>
	<script src="{{ mix('js/booking-link.js') }}" async defer></script>
</body>
</html>
