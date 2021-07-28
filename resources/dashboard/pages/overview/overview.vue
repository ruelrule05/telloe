<template>
	<div class="min-h-full">
		<div v-show="!serviceToEdit">
			<div class="content-header border-bottom">OVERVIEW</div>
			<div v-if="banner" class="p-8 border-bottom">
				<div class="bg-primary-ultralight justify-between rounded-xl flex p-8">
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
				<div class="w-6/12">
					<div class="p-8 py-8 border-bottom">
						<h6 class="font-serif text-sm font-semibold">UPCOMING EVENTS</h6>
					</div>
					<div>
						<UpcomingBookings :bookings="upcomingBookings"></UpcomingBookings>
					</div>
				</div>
				<div class="w-6/12 px-6 py-8 border-left">
					<h6 class="font-serif text-sm font-semibold mb-8">RECENT EVENT TYPES</h6>

					<div class="grid grid-cols-2 gap-8">
						<div v-for="service in services" :key="service.id">
							<ServiceCard :service="service" @click="serviceAction($event, service)"></ServiceCard>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Service v-show="serviceToEdit" :service="serviceToEdit" @close="serviceToEdit = null"></Service>

		<Modal ref="deleteServiceModal">
			<div v-if="serviceToDelete">
				<div class="text-center">
					<WarningIcon class="fill-current text-red-600 h-8 w-8 inline-block mb-4"></WarningIcon>
					<p>
						Are you sure you want to delete the event type <strong>{{ serviceToDelete.name }}</strong
						>?
					</p>
				</div>
				<div class="flex justify-between mt-6">
					<button class="btn btn-sm btn-outline-primary" type="button" @click="$refs.deleteServiceModal.hide()"><span>Cancel</span></button>
					<button class="btn btn-sm btn-red" type="button" @click="confirmDeleteService"><span>Delete</span></button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script src="./overview.js"></script>

<style lang="scss" scoped src="./overview.scss"></style>
