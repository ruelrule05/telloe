<template>
	<div class="p-4 overflow-auto">
		<div class="pt-3 d-flex">
			<div class="text-center position-relative">
				<div class="position-relative coaches-container">
					<div class="active-user position-absolute w-100" :style="{ top: `${activeUserBgPosition}px` }"></div>

					<!-- Assigned Coaches -->
					<div v-for="coach in coaches" class="position-relative user-container pr-3 cursor-pointer" :class="{ active: selectedCoachId == coach.id }" :key="coach.id">
						<div class="d-flex member-container align-items-center py-1 pl-1">
							<div class="d-flex align-items-center py-2 pl-2" @click="selectedCoachId = coach.id">
								<div class="profile-image profile-image-sm cursor-pointer" :style="{ 'background-image': `url(${coach.profile_image})` }">
									<span v-if="!coach.profile_image">{{ coach.initials }}</span>
								</div>
								<div class="flex-1 text-left pl-2">
									<h6 class="font-heading text-nowrap mb-0">
										{{ coach.full_name }}
									</h6>
									<small class="text-secondary">{{ coach.timezone }}</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="p-3 flex-grow-1 bg-white timeslots-wrapper shadow-sm position-relative rounded">
				<table class="table table-sm table-borderless mb-0 table-layout-fixed">
					<thead>
						<tr>
							<th class="align-middle pb-2 pt-0 pl-2 " v-for="(tabDate, index) in tabDates" :key="index">
								<strong>{{ tabDate.name }}</strong>
								<span class="text-gray">{{ tabDate.label }}</span>
							</th>
						</tr>
					</thead>
					<tbody class="shadow-none bg-transparent text-center">
						<tr>
							<td v-for="(date, dateIndex) in tabDates" :key="dateIndex" class="px-2 py-0 rounded-0 position-relative">
								<template v-for="(booking, bookingIndex) in filteredBookings">
									<div v-if="booking.date == date.format" :key="booking.id" class="cursor-pointer py-2 position-relative rounded my-2 timeslot-button justify-content-center" :class="[booking.isPrevious ? 'bg-gray-400 disabled' : 'bg-primary text-white']" @click="viewTimeslotBookings(booking, date.dayName, bookingIndex)">
										<span class="text-nowrap d-block">{{ convertTime(booking.start, 'hh:mmA') }}</span>
										<div class="profile-image bg-white profile-image-xxs d-inline-block mt-2" :style="{ 'background-image': `url(${(booking.user || booking.contact).profile_image})` }"></div>
									</div>
								</template>
							</td>
						</tr>
					</tbody>
				</table>

				<transition name="fade">
					<div v-if="timeslotsLoading" class="timeslots-loader rounded position-absolute-center w-100 h-100 bg-white">
						<div class="position-absolute-center">
							<div class="spinner-border text-primary" role="status"></div>
						</div>
					</div>
				</transition>
			</div>
		</div>

		<modal ref="bookingModal" :close-button="(selectedBooking || {}).isPrevious" :scrollable="false">
			<div v-if="selectedBooking" class="text-center">
				<div class="profile-image profile-image-md d-inline-block mb-2" :style="{ 'background-image': `url(${selectedBooking.customer.profile_image})` }">
					<span v-if="!selectedBooking.customer.profile_image">{{ selectedBooking.customer.initials }}</span>
				</div>
				<h4 class="font-heading mb-4">
					{{ selectedBooking.customer.full_name }}
				</h4>
				<div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Service</div>
						<div class="h6 font-heading mb-0">{{ selectedBooking.service.name }}</div>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Coach</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ selectedBooking.service.user.full_name }}</div>
						<vue-select button_class="border-0 shadow-none btn btn-light bg-light" v-else v-model="selectedBooking.service_id" :options="serviceMembers" @input="getSelectedBookingNewTimeslots()"></vue-select>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Date</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ formatDate(selectedBooking.date) }}</div>
						<v-date-picker v-else :min-date="new Date()" :popover="{ placement: 'right', visibility: 'click' }" v-model="selectedBooking.date" @input="getSelectedBookingNewTimeslots">
							<template v-slot="slot">
								<button type="button" class="btn btn-light shadow-none" v-on="slot.inputEvents">{{ formatDate(selectedBooking.date) }}</button>
							</template>
						</v-date-picker>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Time</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ dayjs(selectedBooking.start).format('hh:mmA') }}</div>

						<div v-else class="d-flex align-items-center">
							<div class="dropright">
								<button class="btn btn-light shadow-none" data-toggle="dropdown">
									{{ dayjs(selectedBooking.start).format('hh:mmA') }}
								</button>
								<div class="dropdown-menu">
									<div class="text-center text-gray small px-2 py-1 text-nowrap" v-if="filterAvailableTimeslots(timeslots) == 0">No available timeslots</div>
									<template v-else v-for="(timeslot, index) in filterAvailableTimeslots(timeslots)">
										<button type="button" class="btn btn-primary btn-block mb-1" :key="index" xv-if="timeslot.is_available" @click="selectedBooking.start = dayjs(`${dayjs(selectedBooking.date).format('Y-m-d')} ${timeslot.time}`).toDate()">
											{{ timeslot.label }}
										</button>
									</template>
								</div>
							</div>
							&nbsp;&nbsp;to&nbsp;&nbsp;
							<div class="btn btn-light shadow-none disabled">
								{{
									dayjs(selectedBooking.start)
										.add(selectedBooking.service.duration, 'minute')
										.format('hh:mmA')
								}}
							</div>
						</div>
					</div>
					<div class="d-flex align-items-center text-left">
						<div class="font-weight-normal text-secondary w-25">Duration</div>
						<div class="h6 font-heading mb-0">{{ selectedBooking.service.duration }} minutes</div>
					</div>

					<div class="text-left mt-3 d-flex align-items-start">
						<div class="font-weight-normal text-secondary w-25 mb-2">Notes</div>
						<input v-if="!selectedBooking.isPrevious" type="text" class="form-control resize-none flex-1" v-model="selectedBooking.booking_note.note" placeholder="Write notes.." />
						<div v-else class="flex-1">{{ selectedBooking.booking_note.note }}</div>
					</div>

					<div v-if="!selectedBooking.isPrevious" class="mt-3 text-left">
						<template v-if="Object.keys(selectedBooking.zoom_link).length > 0">
							<div class="d-flex align-items-center text-left">
								<div class="font-weight-normal text-secondary w-25">Zoom Link</div>
								<a target="_blank" :href="selectedBooking.zoom_link.join_url" class="d-flex align-items-center">
									Go to Zoom meeting
									<shortcut-icon width="16" height="16" class="ml-1 fill-blue"></shortcut-icon>
								</a>
							</div>
						</template>
						<vue-button v-else-if="$root.auth.zoom_token" type="button" :loading="createZoomLoading" button_class="btn btn-light shadow-none" @click="createZoomLink()">
							<div class="d-flex align-items-center">
								<zoom-icon width="20" height="20" class="mr-2"></zoom-icon>
								Create Zoom link
							</div>
						</vue-button>
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
							deleteBooking(selectedBooking).then(() => getBookingsDateRange());
							$refs['deleteBookingModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./timetable.js"></script>
<style lang="scss" scoped src="./timetable.scss"></style>
