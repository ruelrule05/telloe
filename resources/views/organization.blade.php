<!doctype html>
<html lang="en">
<head>
	<title>{{ $organization->name }} | {{ config('app.name')}}</title>
	@include('partials.meta_tags')
	<link rel="stylesheet" href="{{ mix('css/organization.css') }}">
</head>
<body class="h-100vh w-100vw">
	<div id="app" class="py-md-5 bg-light w-100 h-100vh" v-cloak>
		<organization></organization>
	</div>
	@include('partials.social_scripts')
	<script>
		const ORGANIZATION = {!! json_encode($organization) !!};
		const AUTH = null;
	</script>
	<script src="{{ mix('js/organization.js') }}" async defer></script>
</body>
</html>
