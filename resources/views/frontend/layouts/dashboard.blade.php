<!doctype html>
<html lang="en">
	<head>
		@include('frontend.partials.meta_tags')
		<link rel="stylesheet" href="{{ mix('css/dashboard.css') }}">
	</head>
	<body>
		<div id="app" class="dashboard h-100" v-cloak>
			<div class="dashboard" v-if="$root.auth">
				<div class="row m-0 h-100">
					<div v-if="$root.pageloading" class="pageloader position-fixed">
						<div class="position-absolute-center">
							<div class="spinner-border text-primary" role="status"></div>
						</div>
					</div>

					<div class="d-flex h-100vh maxh-100vh overflow-hidden align-items-stretch w-100">
						<div class="sidebar border-right align-self-stretch text-center bg-white d-flex flex-column" id="sidebar">
							<div class="py-3">
								<!-- <div class="mb-3">
									<div class="d-inline-block">
										<router-link to="/dashboard/notifications" exact><bell-icon height="26" width="26"></bell-icon></router-link>
									</div>
								</div> -->
								<div class="user-profile d-inline-block mb-2" :style="[$root.auth.profile_image ? {backgroundImage: 'url(' + $root.auth.profile_image + ')'} : '']"></div>
								<h1 class="h6 mb-4 font-heading text-ellipsis px-3">@{{ $root.auth.full_name }}</h1>

								<div class="list-group font-heading">
									<router-link to="/dashboard/messages" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact data-toggle="collapse" data-target="#item-messages">
										<chat-icon></chat-icon>
										<strong class="ml-3">Messages</strong>
									</router-link>
									<div class="d-none" id="item-messages" data-parent="#sidebar"></div>

									<template v-if="auth.role.role == 'client'">
										<button class="outline-0 list-group-item list-group-item-action border-0 rounded-0 align-items-center m-0 px-0" data-toggle="collapse" data-target="#item-bookings">
											<div class="d-flex align-items-center px-4">
												<calendar-day-icon></calendar-day-icon>
												<strong class="ml-3">Bookings</strong>
												<chevron-down-icon class="ml-2"></chevron-down-icon>
											</div>
										</button>
										<div class="collapse bg-light" data-parent="#sidebar" :class="{'show': ['calendar', 'services', 'customers'].find((x) => x == $route.name) }" id="item-bookings">
											<router-link to="/dashboard/bookings/calendar" class="d-flex align-items-center list-group-item list-group-item-action border-0 rounded-0 pl-5 m-0" exact>
												<strong class="text-body pl-3">Calendar</strong>
											</router-link>
											<router-link to="/dashboard/bookings/services" class="d-flex align-items-center list-group-item list-group-item-action border-0 rounded-0 pl-5 m-0" exact>
												<strong class="text-body pl-3">Services</strong>
											</router-link>
											<router-link to="/dashboard/bookings/customers" class="d-flex align-items-center list-group-item list-group-item-action border-0 rounded-0 pl-5 m-0" exact>
												<strong class="text-body pl-3">Customers</strong>
											</router-link>
										</div>
									</template>

									<router-link v-else-if="auth.role.role == 'customer'" to="/dashboard/bookings" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact data-toggle="collapse" data-target="#item-bookings">
										<calendar-day-icon></calendar-day-icon>
										<strong class="ml-3">Bookings</strong>
									</router-link>
									<div class="d-none" id="item-bookings" data-parent="#sidebar"></div>

									<!-- <router-link to="/dashboard/settings" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact data-toggle="collapse" data-target="#item-settings">
										<cog-icon></cog-icon>
										<strong class="ml-3">Settings</strong>
									</router-link>
									<div class="d-none" id="item-settings" data-parent="#sidebar"></div> -->
								</div>
							</div>
							<div class="mt-auto dropup position-relatixve border-top">
								<div class="cursor-pointer list-group-item list-group-item-action outline-0 border-0 dropdown-toggle d-flex align-items-center justify-content-center" data-toggle="dropdown" data-offset="0,4">
									<div class="user-profile user-profile-sm" :style="{backgroundImage: 'url('+auth.profile_image+')'}">
										<span v-if="!auth.profile_image">@{{ auth.initials }}</span>
									</div>
									<div class="pl-2 text-left line-height-sm overflow-hidden flex-1">
										<h6 class="font-heading mb-0 text-ellipsis">@{{ auth.full_name }}</h6>
										<span class="text-gray d-block text-ellipsis">@@{{ auth.username }}</span>
									</div>
								</div>

								<div class="dropdown-menu w-100 shadow-sm overflow-hidden">
							    	<a target="_blank" v-if="auth.role.role == 'client'" :href="`/@${auth.username}`" class="dropdown-item d-flex align-items-center">
							    		<shortcut-icon height="17" width="17" class="mr-2" fill="#888"></shortcut-icon>
							    		&nbsp;View Profile
							    	</a>
							    	<router-link to="/dashboard/account" class="dropdown-item d-flex align-items-center">
							    		<user-circle-icon height="18" width="18" class="mr-2" fill="#888"></user-circle-icon>
							    		&nbsp;Account
							    	</router-link>
							    	<router-link to="/dashboard/billing" class="dropdown-item d-flex align-items-center">
							    		<shopping-bag-icon height="18" width="18" class="mr-2" fill="#888"></shopping-bag-icon>
							    		&nbsp;Billing
							    	</router-link>
  									<div class="dropdown-divider"></div>
							    	<form action="/logout" method="POST">
							    		@csrf
							    		<button type="submit" class="dropdown-item outline-0">Log Out</button>
							    	</form>
								</div>
							</div>
						</div>

						<div class="d-flex flex-column flex-grow-1 w-100">
							<div class="bg-light position-relative h-100 overflow-hidden">
								<div class="contentloader position-absolute w-100 h-100" v-if="$root.contentloading">
									<div class="position-absolute-center">
										<div class="spinner-border text-primary" role="status"></div>
									</div>
								</div>
								<router-view></router-view>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="/js/leader-line.min.js"></script>
		<script src="/js/plain-draggable.min.js"></script>
		<script src="{{ mix('js/dashboard.js') }}"></script>
	</body>
</html>
