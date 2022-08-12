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

	<meta property="og:title" content="Play ➤ {{ $videoMessage->title }}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://telloe.com/" />
	<meta property="og:image" name="image" content="{{ $videoMessage->link_preview ? $videoMessage->link_preview.'?latest' : config('app.url').'/images/og-image.png' }}" />
	<meta property="og:image:type" content="image/gif" />
	<meta property="og:image:alt" content="" />


	<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
	<link rel="canonical" href="{{ url()->current() }}" />
	<link rel="alternate" href="{{ url()->current() }}" hreflang="en" />
	@include('partials.styles')
</head>
<body class="bg-secondary overflow-auto w-screen h-screen">
	<div id="app" class="w-full h-full relative" v-cloak>
        <video-message></video-message>
    </div>

	@include('partials.social_scripts')
	<style>
		#app {
			overflow: hidden;
		}
		@media only screen and (max-width: 991px) {
			#app {
				height: 100vh;
				height: calc(var(--vh, 1vh) * 100);
				overflow: auto !important;
				min-height: 680px;
			}
		}
	</style>
	<script>
		const AUTH = {!! json_encode(Auth::user()) !!};
		const VIDEO_MESSAGE= {!! json_encode($videoMessage) !!};
	</script>
	<script src="https://sdk.amazonaws.com/js/aws-sdk-2.1058.0.min.js"></script>
	<script src="{{ mix('js/video-message.js') }}" async defer></script>
</body>
</html>
