<!doctype html>
<html lang="en">
<head>
	<title>{{ $organization->name }} | {{ config('app.name')}}</title>
	@include('partials.meta_tags')
	@include('partials.styles')
	<link rel="stylesheet" href="{{ mix('css/organization.css') }}">
</head>
<body class="w-screen min-h-screen h-screen overflow-x-hidden">
	<div id="app" class="min-h-full h-full overflow-auto bg-secondary" v-cloak>
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
