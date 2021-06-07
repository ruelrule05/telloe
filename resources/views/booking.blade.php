<!doctype html>
<html lang="en">
<head>
	<title>{{ $booking->service->name }} event | {{ config('app.name')}}</title>
	@include('partials.meta_tags')
	@include('partials.styles')
</head>
<body class="h-100vh w-100vw bg-secondary">
	<div id="app" v-cloak>
        <booking></booking>
    </div>

	@include('partials.social_scripts')
	<script>
		const BOOKING= {!! json_encode($booking) !!};
	</script>
	<script src="{{ mix('js/booking.js') }}" async defer></script>
</body>
</html>
