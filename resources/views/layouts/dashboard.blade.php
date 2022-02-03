<!doctype html>
<html lang="en">
	<head>
		@include('partials.meta_tags')
		@include('partials.styles')
		<link rel="stylesheet" href="{{ mix('css/dashboard.css') }}" crossorigin="anonymous">
	</head>
	<body class="overflow-hidden w-screen h-screen">
		<div id="app" class="flex overflow-hidden" v-cloak v-if="auth">
			<div :class="isSidebarOpen ? 'block' : 'hidden'" @click="isSidebarOpen = false"  class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"></div>
			
			<div :class="isSidebarOpen ? 'translate-x-0 ease-out w-full' : '-translate-x-full ease-in'" class="sidebar bg-secondary fixed z-40 inset-y-0 left-0 w-64 transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0  flex flex-col">
				<div class="p-8 flex justify-between border-bottom">
					<a href="/"><img src="/logo.svg" alt="{{ config('app.url') }}" class="h-6"></a>
					<button class="rounded-full transition-colors hover:bg-gray-200 hover:text-gray-500 focus:outline-none p-1" :class="{'bg-gray-200 text-gray-500': notificationsOpen}" type="button" @click="notificationsOpen = !notificationsOpen">
						<bell-icon class="fill-current"></bell-icon>
					</button>

					<!-- Notifications -->
					<div class="notifications" :class="{open: notificationsOpen}">
						<div class="lg:hidden text-black absolute top-5 right-5 z-20"  @click="notificationsOpen = false">
							<close-icon class="fill-current w-4 h-4"></close-icon>
						</div>
						<template v-if="notifications.filter(x => !x.is_read).length > 0">
							<div class="flex items-center text-sm p-3">
								<h6 class="font-bold">New Notifications</h6>
								{{-- <u class="text-blue-400 ml-auto cursor-pointer" @click="clearNotifications()">Clear all</u> --}}
							</div>
							<div v-for="(notification, index) in notifications.filter(x => !x.is_read)" class="cursor-pointer border-bottom hover:bg-gray-100 transition-colors" @click="notification.is_read = true; updateNotification(notification); goToNotifLink(notification);">
								<div class="text-sm p-3">
									<div v-html="notification.description" class="leading-tight text-xs"></div>
									<small class="text-muted">@{{ notification.created_at }}</small>
								</div>
							</div>
						</template>
						<div v-else class="text-muted absolute-center text-sm w-full text-center z-10">No new notifications.</div>
					</div>
				</div>

				<div class="flex flex-col p-8 flex-grow overflow-auto">
					<router-link custom to="/dashboard/account">
						<div @click="toggleSidebar('/dashboard/account')" class="cursor-pointer flex items-center justify-center">
							<div class="profile-image profile-image-sm" :style="{backgroundImage: 'url('+auth.profile_image+')'}">
								<span v-if="!auth.profile_image">@{{ auth.initials }}</span>
							</div>
							<div class="pl-2 overflow-hidden flex-1 leading-tight text-xs">
								<div class="text-ellipsis font-bold">@{{ auth.full_name }}</div>
								<div class="text-muted text-ellipsis">@{{ '@' + auth.username  }}</div>
							</div>
						</div>
					</router-link >
					
					{{-- <form action="/logout" method="POST">
						@csrf
						<button type="submit" class="dropdown-item outline-0">Log Out</button>
					</form> --}}

					
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
						<router-link custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/calendar">
							<div @click="toggleSidebar('/dashboard/calendar')" :class="{active: isActive}">Calendar</div>
						</router-link>
						<router-link custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/services">
							<div @click="toggleSidebar('/dashboard/services')" class="sidebar-menu-item" :class="{active: isActive}">Event Types</div>
						</router-link>
						<router-link v-if="$root.auth.match_up" custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/booking-links">
							<div @click="toggleSidebar('/dashboard/booking-links')" class="sidebar-menu-item" :class="{active: isActive}">Match Up</div>
						</router-link>


						<div class="sidebar-heading mt-7">COMMUNICATION</div>
						<router-link v-if="$root.auth.messages" custom v-slot="{ isActive }" class="sidebar-menu-item" :to="`/dashboard/conversations/${currentConversationID}`">
							<div @click="toggleSidebar(`/dashboard/conversations/${currentConversationID}`)" class="sidebar-menu-item" :class="{active: isActive}">Messages</div>
						</router-link>
						<router-link v-if="$root.auth.contacts" custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/contacts">
							<div @click="toggleSidebar('/dashboard/contacts')" class="sidebar-menu-item" :class="{active: isActive}">Contacts</div>
						</router-link>
						<router-link  custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/video-messages">
							<div @click="toggleSidebar('/dashboard/video-messages')" class="sidebar-menu-item" :class="{active: isActive}">Video Messages</div>
						</router-link>
						
						
						<div class="sidebar-heading mt-7">INTEGRATIONS</div>
						<router-link custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/integrations">
							<div @click="toggleSidebar('/dashboard/integrations')" class="sidebar-menu-item" :class="{active: isActive}">Add an Integration</div>
						</router-link>
						{{-- <router-link v-if="auth.xero_token" tag="div" class="sidebar-menu-item" to="/dashboard/integrations/xero">
							Xero Invoicing
						</router-link> --}}


						<template v-if="$root.auth.packages">
							<div class="sidebar-heading mt-7">APPS</div>
							<div class="sidebar-menu-item mt-2 cursor-pointer p-1 d-none" hidden @click="$refs['addAppModal'].show()">
							</div>
							<router-link custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/packages">
								<div @click="toggleSidebar('/dashboard/packages')" class="sidebar-menu-item" :class="{active: isActive}">Packages</div>
							</router-link>
						</template>


						
						<template v-if="$root.auth.team">
							<div class="sidebar-heading mt-7">TEAM</div>
							<router-link tag="div" custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/team/organizations">
								<div @click="toggleSidebar('/dashboard/team/organizations')" :class="{active: isActive}">Organizations</div>
							</router-link>
							<router-link tag="div" custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/team/members">
								<div @click="toggleSidebar('/dashboard/team/members')" :class="{active: isActive}">Members</div>
							</router-link>
						</template>



						<template v-if="$root.auth.payments">
							<div class="sidebar-heading mt-7">PAYMENTS</div>
							<router-link custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/payments/invoices">
								<div @click="toggleSidebar('/dashboard/payments/invoices')" class="sidebar-menu-item" :class="{active: isActive}">Invoices</div>
							</router-link>
							<router-link custom v-slot="{ isActive }" class="sidebar-menu-item" to="/dashboard/payments/subscriptions">
								<div @click="toggleSidebar('/dashboard/payments/subscriptions')" class="sidebar-menu-item" :class="{active: isActive}">Subscriptions</div>
							</router-link>
						</template>
					</div>


				</div>
			</div>

			<div class="flex flex-col flex-grow overflow-hidden">
				<div class="absolute h-20 ml-4 flex items-center z-30">
					<button @click="isSidebarOpen = true" class="text-gray-500 focus:outline-none lg:hidden" :class="{hidden: isChildPage}">
						<svg width="20" height="16" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 6C15.75 5.58579 15.4142 5.25 15 5.25H1C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75H15C15.4142 6.75 15.75 6.41421 15.75 6Z" fill="#282F3E"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 1C15.75 0.585786 15.4142 0.25 15 0.25H1C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H15C15.4142 1.75 15.75 1.41421 15.75 1Z" fill="#282F3E"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 11C15.75 10.5858 15.4142 10.25 15 10.25H1C0.585786 10.25 0.25 10.5858 0.25 11C0.25 11.4142 0.585786 11.75 1 11.75H15C15.4142 11.75 15.75 11.4142 15.75 11Z" fill="#282F3E"/>
						</svg>
							
					</button>
				</div>

				<div class="dashboard-content position-relative h-full overflow-auto flex flex-col" ref="dashboardContent">
					{{-- <div class="contentloader position-absolute w-full h-full bg-light" v-if="$root.contentloading">
						<div class="position-absolute-center">
							<div class="spinner-border text-primary" role="status"></div>
						</div> 
					</div> --}}

					<div class="flex-grow">
						<router-view></router-view>
					</div>
					
					<div v-if="$route.name != 'conversations' && $route.name != 'Video Messages'" class="border-top bg-white p-8 flex justify-between text-muted text-xs footer">
						<div class="flex flex-col md:flex-row">
							<a class="font-bold" target="_blank" href="/contact">Contact Us</a>
							<a class="font-bold ml-0 md:ml-6" target="_blank" href="https://docs.telloe.com">Knowledge Base</a>
						</div>
						<div class="flex flex-col md:flex-row">
							<a class="font-bold ml-0 md:ml-6" target="_blank" href="/privacy-policy">Privacy Policy</a>
							<a class="font-bold ml-0 md:ml-6" target="_blank" href="/terms-of-service">Terms of Service</a>
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

			<div v-if="$root.promptCookie" v-cloak class="cookie-prompt">
				<div>
					This website stores cookies on your computer. These cookies are used to collect information about how you interact with our website and allow us to remember you. We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors both on this website and other media. To find out more about the cookies we use, see our <u><a href="/privacy-policy" target="_blank">Privacy Policy</a></u>. <br /><br />
					If you decline, your information won’t be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be tracked.

					<div class="flex justify-between mt-4">
						<button class="btn btn-sm btn-outline-primary" type="button" @click="$root.clickPrompt()"><span>Disagree</span></button>
						<button class="btn btn-sm btn-primary" type="button" @click="$root.clickPrompt()"><span>Agree</span></button>
					</div>
				</div>
			</div>
		</div>
		<!-- <script src="/js/leader-line.min.js"></script> -->
		<script>
			window.APP_NAME = '{{ config("app.name") }}';
			window.APP_URL = '{{ config("app.url") }}';
			window.WS_URL = '{{ config("app.websocket_url") }}';
		</script>
		<script src="{{ mix('js/dashboard.js') }}"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
		<script  src="https://formbuilder.online/assets/js/form-builder.min.js"></script>
		<script src="https://sdk.amazonaws.com/js/aws-sdk-2.1058.0.min.js"></script>
		<script src="{{ mix('/js/formbuilder.js') }}"></script>
	</body>
	@include('partials.social_scripts')
</html>
