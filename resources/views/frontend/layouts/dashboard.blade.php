<!doctype html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no" />
		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
		@include('frontend.partials.styles')
	</head>
	<body>
		@auth
		<div v-if="auth" id="app" class="dashboard " v-cloak>
			<div v-if="pageloading" class="pageloader">
				<div class="position-absolute-center">
					<div class="spinner-border text-primary" role="status"></div>
				</div>
			</div>

			<div class="d-flex h-100vh maxh-100vh overflow-hidden align-items-stretch border">
				<div class="w-25 sidebar border-right py-3 align-self-stretch">
					<h1 class="h4 mb-3">{{ config('app.name') }}</h1>
					<div class="list-group">
					  	<router-link to="/dashboard" exact class="border-0 rounded-0 list-group-item list-group-item-action">Dashboard</router-link>
					  	<router-link to="/dashboard/inquiries" class="border-0 rounded-0 list-group-item list-group-item-action">Inquiries</router-link>
					  	<router-link to="/dashboard/bookings" class="border-0 rounded-0 list-group-item list-group-item-action">Bookings</router-link>
					  	<router-link to="/dashboard/integration" class="border-0 rounded-0 list-group-item list-group-item-action">Integration</router-link>
					  	<router-link to="/dashboard/settings" class="border-0 rounded-0 list-group-item list-group-item-action">Settings</router-link>
					</div>
				</div>
				<div class="w-75 d-flex flex-column">
					<div class="p-2 border-bottom shadow-sm d-flex align-items-center">
						<div class="pl-2"><strong>@{{ heading }}</strong></div>
						<div class="ml-auto">
							<div class="dropdown">
							  	<button class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">@{{ auth.full_name }}</button>
							  	<div class="dropdown-menu dropdown-menu-right">
							    	<a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
							  	</div>
							</div>
						</div>
					</div>
					<div class="bg-light position-relative h-100 overflow-hidden">
						<div class="contentloader position-absolute w-100 h-100" v-if="contentloading">
							<div class="position-absolute-center">
								<div class="spinner-border text-primary" role="status"></div>
							</div>
						</div>
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
		@endauth

		<script>
			const APP_NAME = "{{ config('app.name') }}";
			window.mixins = [];
			window.routes = [];
		</script>
		<script src="{{ mix('js/dashboard.js') }}"></script>
		@include('frontend.partials.scripts')
	</body>
</html>
