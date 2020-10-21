<!doctype html>
<html lang="en">
<head>
	<title>{{ $profile->full_name }} | {{ config('app.name')}}</title>
	@include('frontend::partials.meta_tags')
	<link rel="stylesheet" href="{{ mix('css/profile.css') }}">
</head>
<body class="h-100vh w-100vw">
	<div id="app" class="py-md-5 bg-light w-100 h-100vh" v-cloak>
		<profile></profile>
	</div>
	@include('frontend::partials.social_scripts')
	<script>
		const PROFILE = {!! json_encode($profile) !!};
		const AUTH = null;
	</script>
	<script src="{{ mix('js/profile.js') }}" async defer></script>
</body>
</html>
