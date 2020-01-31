<!doctype html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no" />
		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
		<link rel="stylesheet" href="{{ mix('css/bootstrap.css') }}">
		<link rel="stylesheet" href="{{ mix('css/admin.css') }}">
	</head>
	<body>
		@auth
		<div id="app" class="dashboard" :class="{toggled: $root.sidebar_toggle}" v-if="auth">
			@include('admin.partials.sidebar')
			<div class="page-disabler" :class="{'show': $root.sidebar_toggle}" @click="$root.sidebar_toggle = false"></div>
			<div class="dashboard-content">
				@include('admin.partials.header')
				<div class="dashboard-content-body d-flex flex-column" ref="dashboard-content-body">
					@include('shared.contentloader')
					<div class="d-block d-md-none bg-light p-3 shadow-sm border-bottom" v-cloak>
						<h1 class="text-ellipsis font-circular h6 mb-0 font-weight-500">@{{ header_title }}</h1>
					</div>

					<div v-if="error" class="position-absolute w-100 h-100" style="z-index: 100">
						<div class="position-absolute-center text-center text-gray font-weight-lighter">
							<div class="font-size-50" v-cloak>@{{ error.status }}</div>
							<div class="font-size-18" v-cloak>@{{ error.message }}</div>
						</div>
					</div>
					<div v-else class="overflow-auto flex-grow-1">
						<router-view :key="$route.path"></router-view>
					</div>
				</div>
			</div>
		</div>
		@endauth
		<script>
			const frontend = '{{ config('app.url') }}';
		</script>
		<script src="{{ mix('js/admin.js') }}"></script>
	</body>
</html>
