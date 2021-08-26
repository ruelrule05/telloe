<!doctype html>
<html lang="en">
<head>
	<title>@yield('title') | {{ config('app.name')}}</title>
	@include('partials.styles')
	@include('partials.meta_tags')
	@yield('metas')
	@yield('styles')
	<link rel="stylesheet" href="{{ mix('css/page.css') }}">
</head>
<body class="bg-transparent">
	<div id="app" class="overflow-hidden">
		<template v-if="!mobileApp">
			@if ($navbar ?? true)
				@include('partials.navbar')
			@endif

			@yield('content')

			@if ($footer ?? true)
				@include('partials.footer')
			@endif
		</template>
		
		<auth v-if="auth" ref="authForm"></auth>
		
	</div>


	<script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
	<div class="wistia_embed wistia_async_sbp1xbl4gp popover=true"></div>
	@include('partials.social_scripts')
	@include('partials.scripts')
	
	<script>
		window.CONTACT = {!! isset($contact) ? "JSON.parse('".json_encode($contact)."');" : 'null' !!};
		window.MEMBER = {!! isset($member) ? "JSON.parse('".json_encode($member)."');" : 'null' !!};
	</script>
	@yield('scripts')
</body>
</html>
