<!doctype html>
<html lang="en">
<head>
	<title>@yield('title') | {{ config('app.name')}}</title>
	<link rel="stylesheet" href="{{ mix('css/page.css') }}">
	@include('partials.meta_tags')
	@yield('metas')
	@yield('styles')
</head>
<body>
	<div id="app" class="overflow-hidden">
		@if ($navbar ?? true)
			@include('partials.navbar')
		@endif


		@yield('content')
		
		<auth v-if="auth" ref="authForm"></auth>
	</div>

	@if ($footer ?? true)
		@include('partials.footer')
	@endif

	@include('partials.social_scripts')
	@include('partials.scripts')
	
	<script>
		CONTACT = {!! isset($contact) ? "JSON.parse('".json_encode($contact)."');" : 'null' !!};
		MEMBER = {!! isset($member) ? "JSON.parse('".json_encode($member)."');" : 'null' !!};
	</script>
	@yield('scripts')
</body>
</html>
