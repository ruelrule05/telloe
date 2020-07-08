<!doctype html>
<html lang="en">
<head>
	<title>@yield('title') | {{ config('app.name')}}</title>
	<link rel="stylesheet" href="{{ mix('css/page.css') }}">
	@include('frontend::partials.meta_tags')
	@yield('metas')
	@yield('styles')
</head>
<body>
	<div id="app" class="overflow-hidden">
		@if ($navbar ?? true)
			@include('frontend::partials.navbar')
		@endif


		@yield('content')

		<auth v-if="auth" ref="authForm"></auth>
	</div>

	@include('frontend::partials.footer')

	@include('frontend::partials.social_scripts')
	@include('frontend::partials.scripts')
	
	<script>
		const CONTACT = {!! $contact ? "JSON.parse('".json_encode($contact)."');" : 'null' !!};
	</script>
	@yield('scripts')
</body>
</html>
