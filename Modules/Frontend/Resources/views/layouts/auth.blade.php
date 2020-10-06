<!doctype html>
<html lang="en">
<head>
<meta property="fb:pages" content="337977626664873" />
<title>@yield('title') | {{ config('app.name')}}</title>
@include('frontend.partials.meta_tags')
@yield('metas')
<link rel="stylesheet" href="{{ mix('css/auth.css') }}">
</head>
<body>
<div id="app">
	<pageloader v-if="pageloading"></pageloader>
	<router-view></router-view>
</div>

@include('frontend.partials.social_scripts')
<script src="{{ mix('js/auth.js') }}"></script>
</body>
</html>
