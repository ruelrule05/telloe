<!doctype html>
<html lang="en">
<head>
<meta property="fb:pages" content="337977626664873" />
<title>@yield('title') | {{ config('app.name')}}</title>
@include('frontend.partials.meta_tags')
@yield('metas')
@include('frontend.partials.styles')
@yield('styles')
</head>
<body class=@yield('body-class')>

<div id="app">
	<div v-if="pageloading" class="pageloader">
		<div class="position-absolute-center">
			<div class="spinner-border text-primary" role="status"></div>
		</div>
	</div>
	@if ($navbar ?? true)
		@include('frontend.partials.navbar')
	@endif
	@yield('content')
</div>

@if ($footer ?? true)
	@include('frontend.partials.footer')
@endif

<script>
	const APP_NAME = "{{ config('app.name') }}";
	const AUTH = {!! json_encode(Auth::user()) !!};
	window.mixins = [];
	window.routes = [];
</script>
@yield('scripts')
@include('frontend.partials.scripts')
</body>
</html>
