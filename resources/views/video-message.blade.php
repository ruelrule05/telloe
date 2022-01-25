<!doctype html>
<html lang="en">
<head>
	<title>{{ $videoMessage->title }} | {{ config('app.name')}}</title>
	@include('partials.meta_tags')
	@include('partials.styles')
</head>
<body class="h-100vh w-100vw bg-secondary">
	<div id="app" v-cloak>
        <video-message></video-message>
    </div>

	@include('partials.social_scripts')
	<script>
		const VIDEO_MESSAGE= {!! json_encode($videoMessage) !!};
	</script>
	<script src="{{ mix('js/video-message.js') }}" async defer></script>
</body>
</html>
