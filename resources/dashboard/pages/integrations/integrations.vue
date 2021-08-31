<template>
	<div class="h-100">
		<div class="content-header border-bottom lg:static fixed w-full bg-white z-20">
			<span class="ml-7 lg:ml-0">
				INTEGRATIONS
			</span>
		</div>
		<div class="h-20 lg:hidden block" />
		<div class="page-integrations">
			<div class="mx-auto integration-container">
				<div class="flex flex-col justify-center h-full pt-16 pb-16">
					<p class="mb-6 text-lg tracking-tight text-body">Add an integration to power up your Telloe experience</p>

					<!-- <div class="flex w-full p-8 mb-4 rounded-lg pb-9  bg-secondary-light">
						<div class="w-16 image">
							<img src="/logos/zoom.png" alt="Zoom" height="80" />
						</div>
						<div class="flex-1 ml-8">
							<p class="mb-3 text-sm font-bold">Zoom</p>
							<p class="mb-4 text-sm text-muted">Create scheduled meeting for bookings</p>
							<button v-if="$root.auth.zoom_token" :disabled="zoomLoading" type="button" class="btn btn-md btn-outline-primary" @click="removeZoom"><span>Remove integration</span></button>
							<button v-else :disabled="zoomLoading" type="button" class="btn btn-md btn-outline-primary" @click="integrateZoom"><span>Add integration</span></button>
						</div>
					</div> -->

					<div class="flex flex-col md:flex-row md:items-start items-center w-full p-8 mb-4 rounded-lg pb-9 bg-secondary-light">
						<div class="w-16 image mb-5 md:mb-0">
							<img src="/logos/google-calendar.png" alt="Zoom" height="80" />
						</div>
						<div class="flex-1 ml-0 md:ml-6">
							<p class="mb-3 text-sm font-bold">Google Calendar</p>
							<p class="mb-4 text-sm text-muted">Sync bookings with your Google Calendar</p>
							<button v-if="$root.auth.google_calendar_token" :disabled="googleCalendarLoading" type="button" class="btn btn-md btn-outline-primary" @click="removeGoogleCalendar"><span>Remove integration</span></button>
							<button v-else :disabled="googleCalendarLoading" type="button" class="btn btn-md btn-outline-primary" @click="integrateGoogleCalendar">
								<span>{{ $root.auth.is_premium ? 'Add integration' : 'Upgrade Account' }}</span>
							</button>
						</div>
					</div>

					<div class="flex flex-col md:flex-row md:items-start items-center w-full p-8 mb-4 rounded-lg pb-9 bg-secondary-light">
						<div class="w-16 image mb-5 md:mb-0">
							<img src="/logos/outlook.png" alt="Zoom" height="80" />
						</div>
						<div class="flex-1 ml-0 md:ml-6">
							<p class="mb-3 text-sm font-bold">Outlook</p>
							<p class="mb-4 text-sm text-muted">Sync bookings with your Outlook Calendar</p>
							<button v-if="$root.auth.outlook_token" :disabled="outlookLoading" type="button" class="btn btn-md btn-outline-primary" @click="removeOutlook"><span>Remove integration</span></button>
							<button v-else :disabled="outlookLoading" type="button" class="btn btn-md btn-outline-primary" @click="integrateOutlook">
								<span>{{ $root.auth.is_premium ? 'Add integration' : 'Upgrade Account' }}</span>
							</button>
						</div>
					</div>

					<!-- <div class="flex w-full p-8 mb-4 rounded-lg pb-9 bg-secondary-light">
						<div class="w-16 image">
							<img src="/logos/xero.png" alt="Zoom" height="80" />
						</div>
						<div class="flex-1 ml-6">
							<p class="mb-3 text-sm font-bold">Xero</p>
							<p class="mb-4 text-sm text-muted">Manage your Xero Invoices</p>
							<button v-if="$root.auth.xero_token" :disabled="xeroLoading" type="button" class="btn btn-md btn-outline-primary" @click="removeXero"><span>Remove integration</span></button>
							<button v-else :disabled="xeroLoading" type="button" class="btn btn-md btn-outline-primary" @click="integrateXero"><span>Add integration</span></button>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./integrations.js"></script>

<style lang="scss" scoped src="./integrations.scss"></style>
