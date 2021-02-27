<!doctype html>
<html lang="en">
	<head>
		@include('partials.meta_tags')
		<link rel="stylesheet" href="{{ mix('css/dashboard.css') }}" crossorigin="anonymous">
	</head>
	<body>
		<div id="app" class="d-flex flex-column overflow-hidden" v-cloak>
			<div class="flex-grow-1 overflow-hidden" v-if="$root.auth">
				<div class="row m-0 h-100">
					<div v-if="$root.pageloading" class="pageloader position-fixed">
						<div class="position-absolute-center">
							<div class="spinner-border text-primary" role="status"></div>
						</div>
					</div>

					<div class="d-flex h-100 overflow-hidden align-items-stretch w-100">
						<div class="sidebar align-self-stretch bg-secondary overflow-auto">
							<div class="nav-heading p-4 d-flex justify-content-between border-bottom">
								<img src="/logo.svg" alt="{{ config('app.url') }}" height="25">
								<button class="btn p-0" type="button">
									<bell-icon class="fill-light opacity-40"></bell-icon>
								</button>
							</div>

							<div class="d-flex flex-column h-100">
								<div class="dropright profile-dropdown cursor-pointer">
									<div class="p-3" data-toggle="dropdown" data-offset="-10, 5">
										<div class="cursor-pointer dropdown-toggle d-flex align-items-center justify-content-center">
											<div class="user-profile user-profile-sm" :style="{backgroundImage: 'url('+auth.profile_image+')'}">
												<span v-if="!auth.profile_image">@{{ auth.initials }}</span>
											</div>
											<div class="pl-2 overflow-hidden flex-1">
												<div class="text-ellipsis font-weight-bold">@{{ auth.full_name }}</div>
												<small class="d-block text-light text-ellipsis">@{{ '@' + auth.username  }}</small>
											</div>
										</div>
									</div>
									<div class="dropdown-menu overflow-hidden cursor-auto">
										<span class="dropdown-header">Account</span>
								    	<router-link exact to="/dashboard/account?tab=profile" class="dropdown-item d-flex align-items-center">
								    		<user-circle-icon height="18" width="18" class="dropdown-item-icon"></user-circle-icon>
								    		Profile
								    	</router-link>
								    	<router-link exact to="/dashboard/account?tab=security" class="dropdown-item d-flex align-items-center">
								    		<password-icon height="18" width="18" class="dropdown-item-icon"></password-icon>
								    		Security
								    	</router-link>
								    	<template>
								    		<router-link exact to="/dashboard/account?tab=payout" class="dropdown-item d-flex align-items-center">
									    		<credit-card-icon height="18" width="18" class="dropdown-item-icon"></credit-card-icon>
									    		Payout
								    			<exclamation-circle-icon v-if="!payoutComplete" class="fill-warning ml-auto" height="14" width="14" transform="scale(1.2)"></exclamation-circle-icon>
									    	</router-link>
									    	<router-link to="/dashboard/billing" class="dropdown-item d-flex align-items-center">
									    		<bill-icon height="18" width="18" class="dropdown-item-icon"></bill-icon>
									    		Billing
									    	</router-link>
									    	<router-link to="/dashboard/widget" class="dropdown-item d-flex align-items-center">
									    		<tray-icon height="18" width="18" class="dropdown-item-icon"></tray-icon>
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
								    		<lock-icon height="18" width="18" class="dropdown-item-icon"></lock-icon>
								    		Privacy Policy
								    	</a>
								    	<a target="_blank" href="/terms-of-service" class="dropdown-item d-flex align-items-center">
								    		<list-bullet-icon height="18" width="18" class="dropdown-item-icon"></list-bullet-icon>
								    		Terms of Service
								    	</a>

	  									<div class="dropdown-divider mx-n2"></div>

	  									<a target="_blank" :href="`/@${auth.username}`" class="dropdown-item d-flex align-items-center">
								    		<shortcut-icon height="18" width="18" class="dropdown-item-icon"></shortcut-icon>
								    		Booking Page
								    	</a>
								    	<form action="/logout" method="POST">
								    		@csrf
								    		<button type="submit" class="dropdown-item outline-0">Log Out</button>
								    	</form>
									</div>
								</div>

								<div class="list-group mt-4 px-4">
									<div class="font-heading small opacity-40 px-1">BOOKINGS</div>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/bookings/overview">
										Overview
									</router-link>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/bookings/calendar">
										Calendar
									</router-link>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/bookings/services">
										Event Types
									</router-link>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/bookings/booking-links">
										Custom Links
									</router-link>


									<div class="font-heading small opacity-40 px-1 mt-4">COMMUNICATION</div>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" :to="`/dashboard/conversations/${currentConversationID}`">
										Messages
									</router-link>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/contacts">
										Contacts
									</router-link>
									
									
									<div class="font-heading small opacity-40 px-1 mt-4">INTEGRATIONS</div>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/integrations">
										Add an Integration
									</router-link>



									<div class="font-heading small opacity-40 px-1 mt-4">APPS</div>
									<div class="sidebar-menu-item mt-2 cursor-pointer p-1 d-none" @click="$refs['addAppModal'].show()">
									</div>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/team/packages">
										Packages
									</router-link>



									<div class="font-heading small opacity-40 px-1 mt-4">TEAM</div>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/team/organizations">
										Organizations
									</router-link>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/team/members">
										Members
									</router-link>



									<div class="font-heading small opacity-40 px-1 mt-4">PAYMENTS</div>
									<router-link tag="div" class="sidebar-menu-item mt-2 cursor-pointer p-1" to="/dashboard/payments/invoices">
										Invoices
									</router-link>
									<router-link tag="div" class="sidebar-menu-item my-2 cursor-pointer p-1" to="/dashboard/payments/subscriptions">
										Subscriptions
									</router-link>
								</div>


								<!-- Notifications -->
								<div class="d-none mt-auto mb-2 sidebar-menu">
									<div class="cursor-pointer d-flex align-items-center list-group-item border-0 rounded-0 m-0 px-4" @click="toggleIntros()">
										<lighthouse-icon stroke="white" stroke-width="8" height="22" width="22" class="fill-white"></lighthouse-icon>
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

						<div class="d-flex flex-column flex-grow-1 w-100">
							<div class="dashboard-content position-relative h-100 overflow-auto">
								<div class="contentloader position-absolute w-100 h-100 bg-light" v-if="$root.contentloading">
									<div class="position-absolute-center">
										<div class="spinner-border text-primary" role="status"></div>
									</div> 
								</div>

								<router-view></router-view>
								<div class="border-top bg-white p-4">
									<button class="btn btn-sm text-light p-1 font-weight-bold" type="button">Help Tool</button>
									<button class="ml-3 btn btn-sm text-light p-1 font-weight-bold" type="button">Get Support</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<video-call ref="videoCall"></video-call>
			<screen-recorder ref="screenRecorder" v-if="screenRecorder.conversation_id"></screen-recorder>
			<notification ref="notification"></notification>
			<modal ref="addAppModal">
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
			</modal>

			
			<div v-if="$root.toggleKnowBase">
				<knowledge-base></knowledge-base>
			</div>
		</div>


		<!-- <script src="/js/leader-line.min.js"></script> -->
		<script>
			const APP_NAME = '{{ config("app.name") }}';
			const APP_URL = '{{ config("app.url") }}';
			const WS_URL = '{{ config("app.websocket_url") }}';
		</script>
		<script src="{{ mix('js/dashboard.js') }}"></script>
	</body>
</html>
