<!doctype html>
<html lang="en">
	<head>
		@include('partials.meta_tags')
		@include('partials.styles')
		<link rel="stylesheet" href="{{ mix('css/dashboard.css') }}" crossorigin="anonymous">
	</head>
	<body class="overflow-hidden w-screen h-screen">
		<div id="app" class="flex overflow-hidden" v-cloak v-if="auth">
			<div class="sidebar bg-secondary overflow-auto">
				<div class="p-6 flex justify-between border-bottom">
					<img src="/logo.svg" alt="{{ config('app.url') }}" class="h-6">
					<button class="rounded-full transition-colors hover:bg-gray-200 focus:outline-none p-1" type="button">
						<bell-icon class="fill-current text-gray-400"></bell-icon>
					</button>
				</div>

				<div class="flex flex-col p-6">
					<div class="cursor-pointer flex items-center justify-center">
						<div class="profile-image profile-image-sm" :style="{backgroundImage: 'url('+auth.profile_image+')'}">
							<span v-if="!auth.profile_image">@{{ auth.initials }}</span>
						</div>
						<div class="pl-2 overflow-hidden flex-1 leading-tight text-xs">
							<div class="text-ellipsis font-bold">@{{ auth.full_name }}</div>
							<div class="text-muted text-ellipsis">@{{ '@' + auth.username  }}</div>
						</div>
					</div>
					
					<form action="/logout" method="POST">
						@csrf
						<button type="submit" class="dropdown-item outline-0">Log Out</button>
					</form>

					
					<div class="dropright profile-dropdown cursor-pointer" hidden>
						<div class="p-3" data-toggle="dropdown" data-offset="-10, 5">
						</div>
						<div class="dropdown-menu overflow-hidden cursor-auto">
							<span class="dropdown-header">Account</span>
							<router-link exact to="/dashboard/account?tab=profile" class="dropdown-item d-flex align-items-center">
								Profile
							</router-link>
							<router-link exact to="/dashboard/account?tab=security" class="dropdown-item d-flex align-items-center">
								Security
							</router-link>
							<template>
								<router-link exact to="/dashboard/account?tab=payout" class="dropdown-item d-flex align-items-center">
									Payout
								</router-link>
								<router-link to="/dashboard/billing" class="dropdown-item d-flex align-items-center">
									Billing
								</router-link>
								<router-link to="/dashboard/widget" class="dropdown-item d-flex align-items-center">
									Widget
								</router-link>
							</template>

							  <div class="dropdown-divider mx-n2"></div>

							<span class="dropdown-header">Help & Feedback</span>
							<!-- <router-link to="#" class="dropdown-item d-flex align-items-center">
								<play-alt-icon height="18" width="18" class="dropdown-item-icon"></play-alt-icon>
								Watch a Demo
							</router-link>
							<router-link to="#" class="dropdown-item d-flex align-items-center">
								<info-circle-icon height="18" width="18" class="dropdown-item-icon"></info-circle-icon>
								Help Center
							</router-link> -->

							  <div class="dropdown-divider mx-n2"></div>

							<span class="dropdown-header">About</span>
							<a target="_blank" href="/privacy-policy" class="dropdown-item d-flex align-items-center">
								Privacy Policy
							</a>
							<a target="_blank" href="/terms-of-service" class="dropdown-item d-flex align-items-center">
								Terms of Service
							</a>

							  <div class="dropdown-divider mx-n2"></div>

							  <a target="_blank" :href="`/@${auth.username}`" class="dropdown-item d-flex align-items-center">
								Booking Page
							</a>
							<form action="/logout" method="POST">
								@csrf
								<button type="submit" class="dropdown-item outline-0">Log Out</button>
							</form>
						</div>
					</div>

					<div class="mt-12">
						<div class="sidebar-heading">BOOKINGS</div>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/overview">
							Overview
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/calendar">
							Calendar
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/services">
							Event Types
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/booking-links">
							Custom Links
						</router-link>


						<div class="sidebar-heading mt-9">COMMUNICATION</div>
						<router-link tag="div" class="sidebar-menu-item" :to="`/dashboard/conversations/${currentConversationID}`">
							Messages
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/contacts">
							Contacts
						</router-link>
						
						
						<div class="sidebar-heading mt-9">INTEGRATIONS</div>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/integrations">
							Add an Integration
						</router-link>



						<div class="sidebar-heading mt-9">APPS</div>
						<div class="sidebar-menu-item mt-2 cursor-pointer p-1 d-none" hidden @click="$refs['addAppModal'].show()">
						</div>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/team/packages">
							Packages
						</router-link>



						<div class="sidebar-heading mt-9">TEAM</div>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/team/organizations">
							Organizations
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/team/members">
							Members
						</router-link>



						<div class="text-xs opacity-40 font-serif mt-9">PAYMENTS</div>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/payments/invoices">
							Invoices
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/payments/subscriptions">
							Subscriptions
						</router-link>
					</div>


					<!-- Notifications -->
					<div class="d-none mt-auto mb-2 sidebar-menu " hidden>
						<div class="cursor-pointer d-flex align-items-center list-group-item border-0 rounded-0 m-0 px-4" @click="toggleIntros()">
							<span class="pl-3">Help Tool</span>
						</div>

						<div class="dropright">
							<div class="cursor-pointer d-flex align-items-center list-group-item border-0 rounded-0 m-0 px-4" data-toggle="dropdown" data-offset="10, 5" ref="notificationsDropdown">
								<bell-icon height="18" width="18" class="sidebar-icon" transform="scale(1.3)"></bell-icon>
								<span class="pl-3">Notifications</span>
								<small class="badge badge-danger text-white ml-auto message-count">@{{ notificationsCount }}</small>
							</div>
							<div class="dropdown-menu overflow-auto mh-100vh cursor-auto">
								<template v-if="notifications.length > 0">
									<div class="d-flex align-items-center pb-2 pt-1 position-sticky">
										<h6 class="mb-0 font-heading">New Notifications</h6>
										<u class="text-link ml-auto cursor-pointer" @click="clearNotifications()">Clear all</u>
									</div>
									<div v-for="(notification, index) in notifications" v-if="!notification.is_read" class="dropdown-item cursor-pointer mt-2" :class="{'bg-light': !notification.is_read}" @click="notification.is_read = true; updateNotification(notification); goToNotifLink(notification);">
										<div class="d-flex">
											<div>
												<div v-html="notification.description"></div>
												<small class="text-secondary">@{{ notification.created_at }}</small>
											</div>
											<div class="ml-auto">
												<button class="btn btn-light shadow-none p-0 badge-pill line-height-0 close mr-n1 mt-n1 float-none" @click.stop="notification.is_read = true; updateNotification(notification); notifications.splice(index, 1); jQuery($refs['notificationsDropdown']).dropdown('update')"><close-icon width="18" height="18" transform="scale(1.2)"></close-icon></button>
											</div>
										</div>
									</div>
								</template>
								<div v-else class="text-secondary dropdown-item disabled">No new notifications.</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col flex-grow overflow-hidden">
				<div class="dashboard-content position-relative h-full overflow-auto" ref="dashboardContent">
					{{-- <div class="contentloader position-absolute w-full h-full bg-light" v-if="$root.contentloading">
						<div class="position-absolute-center">
							<div class="spinner-border text-primary" role="status"></div>
						</div> 
					</div> --}}

					<router-view></router-view>
					
					<div v-if="$route.name != 'conversations'" class="border-top bg-white p-6 flex justify-between text-muted text-xs footer">
						<div>
							<button class="font-bold" type="button">Help Tool</button>
							<button class="ml-6 font-bold" type="button">Get Support</button>
						</div>
						<div>
							<button type="button">Privacy Policy</button>
							<button class="ml-6" type="button">Terms of Service</button>
						</div>
					</div>
				</div>
			</div>

			
			<video-call ref="videoCall"></video-call>
			<screen-recorder ref="screenRecorder" v-if="screenRecorder.conversation_id"></screen-recorder>
			{{-- <notification ref="notification"></notification> --}}
			{{-- <modal ref="addAppModal">
				<h5 class="font-heading mb-3">Add App</h5>
				<div class="d-flex border-bottom pt-3 pb-4">
					<package-icon height="35" width="35" transform="scale(1.4)" class="ml-2 mt-1"></package-icon>
					<div class="flex-grow-1 pl-4">
						<h5 class="font-heading mb-1">Packages</h5>
						<p class="text-muted">Group and offer your booking types into packages with service slots, price adn expiration date.</p>
						<button class="btn btn-primary" disabled type="button" @click="auth.has_payments = true">Installed</button>
					</div>
				</div>
				<div class="d-flex border-bottom pt-3 pb-4">
					<payments-icon height="35" width="35" transform="scale(1.4)" class="ml-2 mt-1"></payments-icon>
					<div class="flex-grow-1 pl-4">
						<h5 class="font-heading mb-1">Payment</h5>
						<p class="text-muted">Create invoices and subscriptions for your customers. Integrate and sync with your Xero account.</p>
						<button class="btn btn-primary" type="button" @click="auth.has_payments = true">Upgrade to Pro</button>
					</div>
				</div>
				<div class="d-flex pt-4 pb-3">
					<member-icon height="35" width="35" transform="scale(1.4)" class="ml-2 mt-1"></member-icon>
					<div class="flex-grow-1 pl-4">
						<h5 class="font-heading mb-1">Team</h5>
						<p class="text-muted">Manage and assign services to your members, and group them into organizations.</p>
						<button class="btn btn-primary" type="button" @click="auth.has_team = true">Upgrade to Enterprise</button>
					</div>
				</div>
			</modal> --}}

			
			<div v-if="$root.toggleKnowBase">
				<knowledge-base></knowledge-base>
			</div>
		</div>


		<!-- <script src="/js/leader-line.min.js"></script> -->
		<script>
			window.APP_NAME = '{{ config("app.name") }}';
			window.APP_URL = '{{ config("app.url") }}';
			window.WS_URL = '{{ config("app.websocket_url") }}';
		</script>
		<script src="{{ mix('js/dashboard.js') }}"></script>
	</body>
</html>
