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
						<div class="sidebar border-right py-3 align-self-stretch text-center bg-white">
							<div class="mb-3">
								<div class="d-inline-block">
									<router-link to="/dashboard/notifications" exact><bell-icon height="26" width="26"></bell-icon></router-link>
								</div>
							</div>
							<div class="dropdown">
								<div class="user-profile d-inline-block mb-2 cursor-pointer" :style="[$root.auth.profile_image ? {backgroundImage: 'url(' + $root.auth.profile_image + ')'} : '']" data-toggle="dropdown"></div>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							    	<router-link to="/dashboard/account" class="dropdown-item">Account</router-link>
							    	<router-link to="/dashboard/billing" class="dropdown-item">Billing</router-link>
							    	<a class="dropdown-item" href="#" @click.prevent="$root.logout">Logout</a>
								</div>
							</div>
							<h1 class="h6 mb-5 font-heading">@{{ $root.auth.full_name }}</h1>

							<div class="list-group font-heading">
								<!-- <router-link to="/dashboard" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact>
									<grid-icon></grid-icon>
									<strong class="ml-3">Dashboard</strong>
								</router-link> -->

								<router-link to="/dashboard/messages" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact>
									<chat-icon></chat-icon>
									<strong class="ml-3">Messages</strong>
								</router-link>

								<router-link to="/dashboard/bookings" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact>
									<calendar-day-icon></calendar-day-icon>
									<strong class="ml-3">Bookings</strong>
								</router-link>

								<router-link to="/dashboard/settings" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact>
									<cog-icon></cog-icon>
									<strong class="ml-3">Settings</strong>
								</router-link>
								
								<!-- <router-link to="/dashboard/chatbots" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact>
									<virtual-reality-icon></virtual-reality-icon>
									<strong class="ml-3">Chatbot</strong>
								</router-link>
								
								<router-link to="/dashboard/users" class="list-group-item list-group-item-action border-0 rounded-0 d-flex align-items-center m-0 px-4" exact>
									<users-icon></users-icon>
									<strong class="ml-3">Users</strong>
								</router-link> -->
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
