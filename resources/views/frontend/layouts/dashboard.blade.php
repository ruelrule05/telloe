<!doctype html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no" />
		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
		@include('frontend.partials.styles')
	</head>
	<body>
		@auth
		<div id="app" class="dashboard">
			<router-view></router-view>
		</div>
		@endauth

		<script>
			const APP_NAME = "{{ config('app.name') }}";
			const AUTH = {!! json_encode(Auth::user()) !!};
			window.mixins = [];
			window.routes = [];
		</script>
		<script src="{{ mix('js/dashboard.js') }}"></script>
		@include('frontend.partials.scripts')
	</body>
</html>
