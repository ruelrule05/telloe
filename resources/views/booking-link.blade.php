<!doctype html>
<html lang="en">
<head>
	<title>Match Up Link | {{ config('app.name')}}</title>
	@include('partials.meta_tags')
	@include('partials.styles')
	<link rel="stylesheet" href="{{ mix('css/booking-link.css') }}">
</head>
<body class="h-100vh w-100vw">
	<div id="app" v-cloak>
		<booking-link></booking-link>
	</div>
	@include('partials.social_scripts')
	<script>
		const AUTH = {!! json_encode($user ?? ['email' => request()->input('email')]) !!};
		const BOOKING_LINK = {!! json_encode($bookingLink) !!};
		const AUTH_ACTION = '{{ $authAction }}';
	</script>
	<script src="{{ mix('js/booking-link.js') }}" async defer></script>
</body>
</html>
