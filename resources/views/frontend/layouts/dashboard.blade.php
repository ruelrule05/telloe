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

			<div class="d-flex h-100vh maxh-100vh overflow-hidden align-items-stretch">
				<div class="sidebar border-right py-3 align-self-stretch text-center bg-white">
					<div class="dropdown">
						<div class="user-profile d-inline-block mb-2 cursor-pointer" :style="{backgroundImage: 'url('+auth.profile_image+')'}" data-toggle="dropdown"></div>
						<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					    	<router-link to="/dashboard/account" class="dropdown-item">Account</router-link>
					    	<router-link to="/dashboard/billing" class="dropdown-item">Billing</router-link>
					    	<a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
						</div>
					</div>
					<h1 class="h6 mb-4">@{{ auth.full_name }}</h1>
					<div class="mb-2">
						<div class="d-inline-block" v-tooltip.right="'Notifications'">
							<router-link to="/dashboard/notifications" exact><bell-icon height="26" width="26"></bell-icon></router-link>
						</div>
					</div>

					<div class="py-2">
						<div class="d-inline-block" v-tooltip.right="'Dashboard'">
							<router-link to="/dashboard" exact><grid-icon height="26" width="26"></grid-icon></router-link>
						</div>
					</div>

					<div class="py-2">
						<div class="d-inline-block" v-tooltip.right="'Inquiries'">
							<router-link to="/dashboard/inquiries" exact><chat-icon height="26" width="26"></chat-icon></router-link>
						</div>
					</div>

					<div class="py-2">
						<div class="d-inline-block" v-tooltip.right="'Bookings'">
							<router-link to="/dashboard/bookings" exact><notebook-icon height="26" width="26"></notebook-icon></router-link>
						</div>
					</div>

					<div class="py-2">
						<div class="d-inline-block" v-tooltip.right="'Settings'">
							<router-link to="/dashboard/settings" exact><cog-icon height="26" width="26"></cog-icon></router-link>
						</div>
					</div>
				</div>


				<div class="d-flex flex-column flex-grow-1">
					<!-- <div class="p-2 border-bottom shadow-sm d-flex align-items-center">
						<div class="pl-2"><strong>@{{ heading }}</strong></div>
						<div class="ml-auto">
							<div class="dropdown">
							  	<button class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">@{{ auth.full_name }}</button>
							  	<div class="dropdown-menu dropdown-menu-right">
							    	<router-link to="/dashboard/account" class="dropdown-item">Account</router-link>
							    	<router-link to="/dashboard/billing" class="dropdown-item">Billing</router-link>
							    	<a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
							  	</div>
							</div>
						</div>
					</div> -->

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
