<template>
	<div class="p-4 overflow-auto">
		<div class="d-flex align-items-center">
			<button class="btn p-1 btn-white badge-pill shadow-sm" type="button" @click="$router.push('/dashboard/bookings/calendar')">
				<arrow-left-icon width="30" height="30"></arrow-left-icon>
			</button>
			<div class="ml-auto d-flex align-items-center bg-white rounded shadow-sm">
				<button class="btn btn-sm btn-white p-1" type="button" @click="previousDay()">
					<chevron-left-icon height="25" width="25" transform="scale(1.4)"></chevron-left-icon>
				</button>
				<v-date-picker :popover="{ placement: 'bottom', visibility: 'click' }" :masks="masks" v-model="startDate" @input="getDateBookings">
					<template v-slot="{ inputValue, inputEvents }">
						<button type="button" class="btn btn-white px-1 shadow-none rounded-0" v-on="inputEvents">{{ inputValue }}</button>
					</template>
				</v-date-picker>

				<button class="btn btn-sm btn-white p-1" type="button" @click="nextDay()">
					<chevron-right-icon height="25" width="25" transform="scale(1.4)"></chevron-right-icon>
				</button>
			</div>
		</div>

		<div v-if="bookings.length > 0" class="pt-3 d-flex">
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

			<div class="px-3 pt-3 pb-1 flex-grow-1 bg-white timeslots-wrapper shadow-sm position-relative rounded">
				<table class="table table-borderless mb-0">
					<thead class="text-muted">
						<tr>
							<th class="pt-0">Name</th>
							<th class="pt-0">Date</th>
							<th class="pt-0">Time</th>
						</tr>
					</thead>
					<tbody class="shadow-none bg-transparent">
						<tr v-for="booking in filteredBookings" :key="booking.id">
							<td class="align-middle pl-1">
								<div class="d-flex align-items-center">
									<div class="user-profile-image user-profile-image-sm" :style="{ backgroundImage: 'url(' + (booking.user || booking.contact).profile_image + ')' }">
										<span v-if="!(booking.user || booking.contact).profile_image">{{ (booking.user || booking.contact).initials }}</span>
									</div>
									<div class="ml-2 overflow-hidden flex-1">
										<h6 class="font-heading mb-0 text-ellipsis">{{ (booking.user || booking.contact).full_name }}</h6>
										<small class="d-block text-muted">{{ (booking.user || booking.contact).email }}</small>
									</div>
								</div>
							</td>
							<td class="align-middle">
								{{ formatDate(booking.date) }}
							</td>
							<td class="align-middle">
								{{ convertTime(booking.start, 'hh:mmA') }} -
								{{ convertTime(booking.end, 'hh:mmA') }}
							</td>
							<td class="align-middle">
								<div class="flex-grow-1 text-right d-flex align-items-center justify-content-end">
									<div class="dropleft">
										<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
											<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
										</button>
										<div class="dropdown-menu dropdown-menu-right">
											<span class="dropdown-item cursor-pointer" @click="editBooking(booking)">
												Edit
											</span>
										</div>
									</div>
								</div>
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

		<div v-else class="position-absolute-center text-muted">
			There are no bookings for this date.
		</div>

		<edit ref="bookingModal" :booking="selectedBooking" @update="bookingUpdated"></edit>

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
