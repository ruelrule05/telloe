<!doctype html>
<html lang="en">
<head>
	<title>Schedule a meeting time that works for you based on availability | Meet Telloe</title>
	@include('partials.meta_tags')
	@include('partials.styles')
	<link rel="stylesheet" href="{{ mix('css/profile.css') }}">
</head>
<body class="w-screen min-h-screen h-screen overflow-x-hidden">
	<div id="app" class="min-h-full h-full overflow-auto" :class="{'bg-secondary': !widget}" v-cloak>
		<profile></profile>
	</div>
	@include('partials.social_scripts')
	<script>
		const PROFILE = {!! json_encode($profile) !!};
		const SERVICE = {!! json_encode($service) !!};
		const TIMEZONE = {!! $timezone ? '"'.$timezone.'"' : 'null' !!};
	</script>
	<script src="{{ mix('js/profile.js') }}" async defer></script>
</body>
</html>
