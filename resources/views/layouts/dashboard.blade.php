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
						<template v-if="notifications?.filter(x => !x.is_read).length > 0">
							<div class="flex items-center text-sm p-3">
								<h6 class="font-bold">New Notifications</h6>
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
					<router-link to="/dashboard/account" >
						<div  class="cursor-pointer flex items-center justify-center">
							<div class="profile-image profile-image-sm" :style="{backgroundImage: 'url('+auth.profile_image+')'}">
								<span v-if="!auth.profile_image">@{{ auth.initials }}</span>
							</div>
							<div class="pl-2 overflow-hidden flex-1 leading-tight text-xs">
								<div class="text-ellipsis font-bold">@{{ auth.full_name }}</div>
								<div class="text-muted text-ellipsis">@{{ '@' + auth.username  }}</div>
							</div>
						</div>
					</router-link >
					


					<div class="sidebar-heading mt-7">COMMUNICATION</div>
					<router-link tag="div" class="sidebar-menu-item" to="/dashboard/video-messages">
						Video Messages
					</router-link>
					<router-link tag="div" class="sidebar-menu-item" to="/dashboard/video-campaigns">
						Video Campaigns
					</router-link>
					<router-link tag="div" v-if="$root.auth.messages"class="sidebar-menu-item" :to="`/dashboard/conversations/${currentConversationID}`">
						Messages
					</router-link>
				
					

					<div class="mt-7">
						<div class="sidebar-heading">BOOKINGS</div>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/calendar">
							Calendar
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/services">
							Event Types
						</router-link>
						<router-link tag="div" class="sidebar-menu-item" to="/dashboard/booking-links">
							Match Up
						</router-link>


						<template>
							<div class="sidebar-heading mt-7">TOUCH POINT</div>
							<router-link tag="div" v-if="$root.auth.linkedin_username" class="sidebar-menu-item" to="/dashboard/integrations/linkedin">
								LinkedIn
							</router-link>
							<router-link tag="div" v-if="$root.auth.contacts" class="sidebar-menu-item" to="/dashboard/contacts">
								Contacts
							</router-link>
						</template>

						
						
						<div class="sidebar-heading mt-7">INTEGRATIONS</div>
						<router-link tag="div" exact class="sidebar-menu-item" to="/dashboard/integrations">
							Add an Integration
						</router-link>
						
						<template v-if="$root.auth.packages">
							<div class="sidebar-heading mt-7">APPS</div>
							<router-link tag="div" class="sidebar-menu-item" to="/dashboard/packages">
								Packages
							</router-link>
						</template>


						
						<template v-if="$root.auth.team">
							<div class="sidebar-heading mt-7">TEAM</div>
							<router-link tag="div" class="sidebar-menu-item" to="/dashboard/team/organizations">
								Organizations
							</router-link>
							<router-link tag="div" class="sidebar-menu-item" to="/dashboard/team/members">
								Members
							</router-link>
						</template>



						<template v-if="$root.auth.payments">
							<div class="sidebar-heading mt-7">PAYMENTS</div>
							<router-link  tag="div" class="sidebar-menu-item" to="/dashboard/payments/invoices">
								Invoices
							</router-link>
							<router-link  tag="div" class="sidebar-menu-item" to="/dashboard/payments/subscriptions">
								Subscriptions
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

					<div class="flex-grow relative">
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
		<script src="https://sdk.amazonaws.com/js/aws-sdk-2.1058.0.min.js"></script>
		<script src="{{ mix('js/dashboard.js') }}"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
		<script  src="https://formbuilder.online/assets/js/form-builder.min.js"></script>
		<script src="{{ mix('/js/formbuilder.js') }}"></script>
	</body>
	@include('partials.social_scripts')
</html>
