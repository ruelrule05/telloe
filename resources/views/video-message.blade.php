<!doctype html>
<html lang="en">
<head>
	<title>{{ $videoMessage->title }} | {{ config('app.name')}}</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no" />
	<meta name="csrf-token" content="{{ csrf_token() }}" />
	<meta property="fb:app_id" content="149673835629240" /> 
	<meta property="og:type" content="website" /> 
	<meta property="og:url" content="{{ Request::url() }}" /> 
	<meta property="og:site_name" content="{{ config('app.name') }}" />
	<meta name="twitter:card" content="summary_large_image" />

	<meta property="og:title" content="Schedule a meeting time that works for you based on availability | Meet Telloe" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://telloe.com/" />
	<meta property="og:description" content="Organize meetings with people on different video calling platforms across multiple time zones; without needless back and forth." />
	<meta property="og:image" content="{{ $videoMessage->link_preview ?? config('app.url').'/images/og-image.png' }}" />
	<meta property="og:image:type" content="image/gif" />
	<meta property="og:image:alt" content="" />


	<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
	<link rel="canonical" href="{{ url()->current() }}" />
	<link rel="alternate" href="{{ url()->current() }}" hreflang="en" />
	@include('partials.styles')
</head>
<body class="h-100vh w-100vw bg-secondary">
	<div id="app" v-cloak>
        <video-message></video-message>
    </div>

	@include('partials.social_scripts')
	<script>
		const AUTH = {!! json_encode(Auth::user()) !!};
		const VIDEO_MESSAGE= {!! json_encode($videoMessage) !!};
	</script>
	<script src="{{ mix('js/video-message.js') }}" async defer></script>
</body>
</html>
