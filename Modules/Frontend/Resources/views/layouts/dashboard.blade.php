<!doctype html>
<html lang="en">
	<head>
		@include('frontend::partials.meta_tags')
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
						<div class="sidebar border-right border-gray-200 align-self-stretch text-center bg-dark text-white" :class="{'sidebar-customer': auth.role.role == 'customer'}" id="sidebar">
							<div class="d-flex flex-column h-100">
								<div class="dropright profile-dropdown cursor-pointer">
									<div class="px-4 py-3" data-toggle="dropdown" data-offset="-10, 5">
										<div class="cursor-pointer dropdown-toggle d-flex align-items-center justify-content-center">
											<div class="user-profile user-profile-sm" :style="{backgroundImage: 'url('+auth.profile_image+')'}">
												<span v-if="!auth.profile_image">@{{ auth.initials }}</span>
												<exclamation-circle-icon v-if="auth.role.role == 'client' && !payoutComplete" class="fill-warning bg-white rounded-circle" height="14" width="14" transform="scale(1.2)"></exclamation-circle-icon>
											</div>
											<div class="pl-2 text-left line-height-sm overflow-hidden flex-1">
												<h6 class="font-heading mb-0 text-ellipsis text-white ">@{{ auth.full_name }}</h6>
												<small class="text-secondary d-block text-ellipsis">@{{ auth.role.role == 'client' ? '@' + auth.username : auth.email }}</small>
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
								    	<template v-if="auth.role.role == 'client'">
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
								    	<router-link :to="supportLink" class="dropdown-item d-flex align-items-center">
								    		<headphone-icon height="18" width="18" class="dropdown-item-icon"></headphone-icon>
								    		Support
								    	</router-link>

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

	  									<a target="_blank" v-if="auth.role.role == 'client'" :href="`/@${auth.username}`" class="dropdown-item d-flex align-items-center">
								    		<shortcut-icon height="18" width="18" class="dropdown-item-icon"></shortcut-icon>
								    		Booking Page
								    	</a>
								    	<form action="/logout" method="POST">
								    		@csrf
								    		<button type="submit" class="dropdown-item outline-0">Log Out</button>
								    	</form>
									</div>
								</div>

								<div class="list-group mt-3 font-heading sidebar-menu">
									<template v-if="auth.role.role == 'client'">
										<button class="outline-0 list-group-item border-0 rounded-0 align-items-center m-0 px-0" data-toggle="collapse" data-target="#item-bookings">
											<div class="d-flex align-items-center pl-4 pr-2">
												<monthview-icon height="18" width="18" class="sidebar-icon"></monthview-icon>
												<span class="ml-3 text-white">Bookings</span>
												<chevron-down-icon class="ml-auto" fill="white"></chevron-down-icon>
											</div>
										</button>
										<div class="collapse" data-parent="#sidebar" :class="{'show': ['calendar', 'services_index',  'services_show', 'booking-links', 'booking-links_show'].find((x) => x == $route.name) }" id="item-bookings">
											<router-link to="/dashboard/bookings/calendar" class="d-flex align-items-center list-group-item border-0 rounded-0 pl-5 m-0">
												<span class="pl-3">Calendar</span>
											</router-link>
											<router-link to="/dashboard/bookings/services" class="d-flex align-items-center list-group-item border-0 rounded-0 pl-5 m-0">
												<span class="pl-3">Types</span>
											</router-link>
											<router-link to="/dashboard/bookings/booking-links" class="d-flex align-items-center list-group-item border-0 rounded-0 pl-5 m-0">
												<span class="pl-3">Custom Links</span>
											</router-link>
										</div>
									</template>

									<router-link v-else to="/dashboard/bookings" class="d-flex align-items-center list-group-item border-0 rounded-0 m-0 px-4">
										<monthview-icon height="18" width="18" class="sidebar-icon"></monthview-icon>
										<span class="pl-3">Bookings</span>
									</router-link>

									<router-link data-position="right" :to="`/dashboard/conversations/${currentConversationID}`" class="list-group-item border-0 rounded-0 d-flex align-items-center m-0 px-4" data-toggle="collapse" data-target="#item-messages">
										<messages-icon height="18" width="18" transform="scale(1.3)" stroke-width="0.5" stroke="black" class="sidebar-icon sidebar-icon-stroke"></messages-icon>
										<span class="ml-3">Messages</span>
										<small class="badge badge-orange badge-pill text-white ml-auto message-count">@{{ newMessagesCount }}</small>
									</router-link>
									<div class="d-none" id="item-messages" data-parent="#sidebar"></div>

									<router-link to="/dashboard/contacts" class="d-flex align-items-center list-group-item border-0 rounded-0 m-0 px-4">
										<contact-alt-icon height="18" width="18" class="sidebar-icon"></contact-alt-icon>
										<span class="pl-3">Contacts</span>
									</router-link>
									

									<template v-if="auth.role.role == 'client'">
										<router-link to="/dashboard/integrations" class="d-flex align-items-center list-group-item border-0 rounded-0 m-0 px-4" exact>
											<tray-stack-icon height="18" width="18" transform="scale(1.2)" stroke-width="0.5" stroke="black" class="sidebar-icon sidebar-icon-stroke"></tray-stack-icon>
											<span class="pl-3">Integrations</span>
										</router-link>


										<div class="text-left border-0 mt-2 px-3 py-2 d-flex align-items-center">
											<span class="text-secondary">APPS</span>
											<button class="ml-auto btn btn-light p-1 badge-pill line-height-0 shadow-none" type="button" @click="$refs['addAppModal'].show()">
												<plus-icon width="12" height="12" transform="scale(2)"></plus-icon>
											</button>
										</div>

										
										<template xv-if="auth.has_packages">
											<router-link to="/dashboard/packages" class="outline-0 list-group-item border-0 rounded-0 align-items-center m-0 px-0">
												<div class="d-flex align-items-center pl-4 pr-2">
													<package-icon height="18" width="18" transform="scale(1.2)" stroke="black" stroke-width="0.5" class="sidebar-icon sidebar-icon-stroke"></package-icon>
													<span class="ml-3">Packages</span>
												</div>
											</router-link>
										</template>
										
										<template xv-if="auth.has_team">
											<button class="outline-0 list-group-item border-0 rounded-0 align-items-center m-0 px-0" data-toggle="collapse" data-target="#item-team">
												<div class="d-flex align-items-center pl-4 pr-2">
													<member-icon height="18" width="18" stroke="black" stroke-width="13" class="sidebar-icon sidebar-icon-stroke"></member-icon>
													<span class="ml-3">Team</span>
													<chevron-down-icon class="ml-auto" fill="white"></chevron-down-icon>
												</div>
											</button>
											<div class="collapse" data-parent="#sidebar" :class="{'show': ['members_index', 'members_show', 'organizations_index', 'organizations_show'].find((x) => x == $route.name) }" id="item-team">
												<router-link to="/dashboard/team/organizations" class="d-flex align-items-center list-group-item border-0 rounded-0 pl-5 m-0">
													<span class="pl-3">Organizations</span>
												</router-link>
												<router-link to="/dashboard/team/members" class="d-flex align-items-center list-group-item border-0 rounded-0 pl-5 m-0">
													<span class="pl-3">Members</span>
												</router-link>
											</div>
										</template>

										<template xv-if="auth.has_payments">
											<button class="outline-0 list-group-item border-0 rounded-0 align-items-center m-0 px-0" data-toggle="collapse" data-target="#item-payments">
												<div class="d-flex align-items-center pl-4 pr-2">
													<payments-icon height="18" width="18" class="sidebar-icon"></payments-icon>
													<span class="ml-3">Payments</span>
													<chevron-down-icon class="ml-auto" fill="white"></chevron-down-icon>
												</div>
											</button>
											<div class="collapse" data-parent="#sidebar" :class="{'show': ['invoices_index', 'subscriptions_index'].find((x) => x == $route.name) }" id="item-payments">
												<router-link to="/dashboard/payments/invoices" class="d-flex align-items-center list-group-item border-0 rounded-0 pl-5 m-0" exact>
													<span class="pl-3">Invoices</span>
												</router-link>
												<router-link to="/dashboard/payments/subscriptions" class="d-flex align-items-center list-group-item border-0 rounded-0 pl-5 m-0" exact>
													<span class="pl-3">Subscriptions</span>
												</router-link>
											</div>
										</template>
									</template>
									<div class="d-none" id="item-bookings" data-parent="#sidebar"></div>
								</div>


								<!-- Notifications -->
								<div class="mt-auto mb-2 sidebar-menu">
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
							<div class="dashboard-content position-relative h-100 overflow-hidden">
								<div class="contentloader position-absolute w-100 h-100 bg-light" v-if="$root.contentloading">
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

			<knowledge-base v-if="showHelpWidget"></knowledge-base>
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
