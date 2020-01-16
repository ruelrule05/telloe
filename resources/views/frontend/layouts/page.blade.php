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
