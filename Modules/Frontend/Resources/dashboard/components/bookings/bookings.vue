<template>
	<div class="h-100">
		<div class="p-4" v-if="$root.auth.role.role == 'customer'">
			<div v-if="ready">
				<h6 v-if="bookings.length == 0" class="text-center text-gray position-absolute-center font-weight-lighter">
					You don't have any bookings yet.
				</h6>
				<div v-else>
					<h1 class="font-heading h3 mb-3">Bookings</h1>
					<table class="table table-borderless mb-0">
						<thead>
							<tr>
								<th class="border-0">Service</th>
								<th class="border-0">Date</th>
								<th class="border-0">Start</th>
								<th class="border-0">End</th>
								<th class="border-0"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="booking in bookings" :key="booking.vue">
								<td class="align-middle">
									<strong class="d-block">{{ booking.service.name }}</strong>
									<small class="d-block text-muted">{{ booking.service.coach.full_name }}</small>
								</td>
								<td class="align-middle">{{ formatDate(booking.date) }}</td>
								<td class="align-middle">{{ formatTime(booking.start) }}</td>
								<td class="align-middle">{{ formatTime(booking.end) }}</td>
								<td class="text-right align-middle" style="width:50px">
									<div class="dropdown">
										<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
											<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
										</button>
										<div class="dropdown-menu dropdown-menu-right">
											<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="editBooking(booking)">
												Edit
											</span>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<modal ref="bookingModal" :close-button="(selectedBooking || {}).isPrevious" :scrollable="false">
					<div v-if="selectedBooking">
						<h5 class="font-heading mb-3">Edit Booking</h5>
						<div>
							<div class="d-flex align-items-center text-left mb-3">
								<div class="font-weight-normal text-secondary w-25">Service</div>
								<div class="h6 font-heading mb-0">{{ selectedBooking.service.name }}</div>
							</div>
							<div class="d-flex align-items-center text-left mb-3">
								<div class="font-weight-normal text-secondary w-25">Coach</div>
								<div class="h6 font-heading mb-0">{{ selectedBooking.service.coach.full_name }}</div>
							</div>
							<div class="d-flex align-items-center text-left mb-3">
								<div class="font-weight-normal text-secondary w-25">Date</div>
								<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ formatDate(selectedBooking.date) }}</div>
								<v-date-picker v-else :min-date="new Date()" :popover="{ placement: 'right', visibility: 'click' }" v-model="selectedBooking.date" @input="getSelectedBookingNewTimeslots(selectedBooking, $event)">
									<template v-slot="{ inputValue, inputEvents }">
										<button type="button" class="btn btn-light shadow-none" v-on="inputEvents">{{ formatDate(selectedBooking.date) }}</button>
									</template>
								</v-date-picker>
							</div>
							<div class="d-flex align-items-center text-left mb-3">
								<div class="font-weight-normal text-secondary w-25">Starts at</div>
								<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ dayjs(selectedBooking.start).format('hh:mmA') }}</div>
								<div v-else class="d-flex align-items-center">
									<div class="dropright">
										<button class="btn btn-light shadow-none" data-toggle="dropdown">
											{{ dayjs(selectedBooking.start).format('hh:mmA') }}
										</button>
										<div class="dropdown-menu timeslots-dropdown-menu overflow-y-auto">
											<div class="text-center text-gray small px-2 py-1 text-nowrap" v-if="availableTimeslots.length == 0">No available timeslots</div>
											<template v-else v-for="(timeslot, index) in availableTimeslots">
												<button type="button" class="btn btn-primary btn-block mb-1" :key="index" @click="selectedBooking.start = dayjs(`${dayjs(selectedBooking.date).format('Y-m-d')} ${timeslot.time}`).toDate()">
													{{ timeslot.label }}
												</button>
											</template>
										</div>
									</div>
									&nbsp;&nbsp;to&nbsp;&nbsp;
									{{
										dayjs(selectedBooking.start)
											.add(selectedBooking.service.duration, 'minute')
											.format('hh:mmA')
									}}
								</div>
							</div>
							<div class="d-flex align-items-center text-left">
								<div class="font-weight-normal text-secondary w-25">Duration</div>
								<div class="h6 font-heading mb-0">{{ selectedBooking.service.duration }} minutes</div>
							</div>
							<div v-if="selectedBooking.booking_note.note" class="d-flex align-items-center text-left mt-3">
								<div class="font-weight-normal text-secondary w-25 mb-2">Notes</div>
								<p class="mb-0 flex-1">{{ selectedBooking.booking_note.note }}</p>
							</div>
							<div v-if="!selectedBooking.isPrevious" class="text-left">
								<div class="mt-2" v-if="Object.keys(selectedBooking.zoom_link).length > 0">
									<div class="d-flex align-items-center text-left">
										<div class="font-weight-normal text-secondary w-25">Zoom Link</div>
										<a target="_blank" :href="selectedBooking.zoom_link.join_url" class="d-flex align-items-center">
											Go to Zoom meeting
											<shortcut-icon width="16" height="16" class="ml-1 fill-blue"></shortcut-icon>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div v-if="!selectedBooking.isPrevious" class="d-flex justify-content-between mt-4">
							<div class="d-flex align-items-center">
								<button type="button" class="btn btn-light shadow-none" data-dismiss="modal" :disabled="bookingModalLoading">Cancel</button>
								<button type="button" class="btn btn-link text-danger" data-dismiss="modal" @click="$refs['deleteBookingModal'].show()" :disabled="bookingModalLoading">Delete</button>
							</div>
							<vue-button type="button" button_class="btn btn-primary shadow-sm border" :loading="bookingModalLoading" @click.native="updateSelectedBooking(selectedBooking)">Update</vue-button>
						</div>
					</div>
				</modal>

				<modal ref="deleteBookingModal" :close-button="false">
					<template v-if="selectedBooking">
						<h5 class="font-heading text-center">Delete Booking</h5>
						<p class="text-center mt-3">
							Are you sure to delete this booking?
						</p>
						<div class="d-flex">
							<button class="btn btn-light shadow-none" type="button" @click="$refs['bookingModal'].show()" data-dismiss="modal">
								Cancel
							</button>
							<button
								class="btn btn-danger ml-auto"
								type="button"
								@click="
									confirmDeleteBooking(selectedBooking);
									$refs['deleteBookingModal'].hide();
								"
							>
								Delete
							</button>
						</div>
					</template>
				</modal>
			</div>
		</div>
		<router-view v-else></router-view>
	</div>
</template>

<style lang="scss" src="./bookings.scss"></style>
<script src="./bookings.js"></script>
