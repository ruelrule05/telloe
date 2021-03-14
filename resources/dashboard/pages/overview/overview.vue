<template>
	<div class="min-h-full">
		<div class="content-header border-bottom">OVERVIEW</div>
		<div v-if="banner" class="p-6 border-bottom">
			<div class="bg-primary-ultralight justify-between rounded-xl flex p-6">
				<div class="font-serif w-1/4">
					SIMPLIFY YOUR MONDAY TO FRIDAY.
				</div>
				<div class="w-7/12">
					<p class="text-muted mb-4">
						Glad you joined Telloe. We created a 60 Minute Call event type to help start. The best way to start is by adding your event types.
					</p>
					<button class="btn btn-sm btn-outline-primary" translate="button"><span>Add Event Type</span></button>
				</div>
				<div class="font-serif">
					<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="banner = false"><CloseIcon transform="scale(2x.1)" width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
				</div>
			</div>
		</div>

		<div class="flex">
			<div class="flex-grow">
				<div class="p-6 py-8 border-bottom">
					<h6 class="font-serif text-sm font-semibold">UPCOMING EVENTS</h6>
				</div>
				<div>
					<UpcomingBookings :bookings="upcomingBookings"></UpcomingBookings>
				</div>
			</div>
			<div class="flex-grow px-6 py-8 border-left">
				<h6 class="font-serif text-sm font-semibold">RECENT EVENT TYPES</h6>
			</div>
		</div>
	</div>
</template>

<script src="./overview.js"></script>

<style lang="scss" scoped src="./overview.scss"></style>
