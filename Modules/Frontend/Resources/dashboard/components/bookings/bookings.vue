<template>
	<div class="h-100">
		<div class="p-4" v-if="$root.auth.role.role == 'customer'">
			<div v-if="ready">
				<h6 v-if="bookings.length == 0" class="text-center text-gray position-absolute-center font-weight-lighter">
					You don't have any bookings yet.
				</h6>
				<div v-else>
					<h1 class="font-heading h3 mb-3">Bookings</h1>
					<table class="table table-borderless table-fixed-header mb-0">
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
							<tr v-for="booking in bookings">
								<td class="align-middle">
									<strong class="d-block">{{ booking.service.name }}</strong>
									<small class="d-block text-muted">{{ booking.service.user.full_name }}</small>
								</td>
								<td class="align-middle">{{ formatDate(booking.date) }}</td>
								<td class="align-middle">{{ formatTime(booking.start) }}</td>
								<td class="align-middle">{{ formatTime(booking.end) }}</td>
								<td class="text-right align-middle" style="width:50px">
									<div class="dropdown">
			                    		<button class="btn btn-white border p-1 line-height-0" data-toggle="dropdown">
											<more-h-icon width="20" height="20"></more-h-icon>
			                    		</button>
										<div class="dropdown-menu dropdown-menu-right">
											<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="edit(booking)">
												Edit
											</span>
											<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="selectedBooking = booking; $refs['deleteModal'].show();">
												Delete
											</span>
										</div>
			                    	</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<modal ref="editModal" @hidden="resetStep">
					<template v-if="selectedBooking">
						<h5 class="font-heading">Edit Booking</h5>
						<strong class="d-block">{{ selectedBooking.service.name }}</strong>
						<small class="d-block text-muted">{{ selectedBooking.service.user.full_name }}</small>
						<div class="mb-2 mt-4">
							<div v-if="error" class="text-danger">{{ error }}</div>
							<template v-else>
								<strong v-if="!selectedDate">Select Date</strong>
								<template v-else>
									<strong>{{ formatDate(selectedDate) }}</strong>
									<span v-if="selectedTimeslot">@{{ selectedTimeslot.label }}</span>
								</template>
							</template>
						</div>

						<vue-form-validate @submit="update(selectedBooking)">
							<div class="form-body">
								<div class="rounded border h-100 mb-3 overflow-hidden">
									<div v-if="step == 1">
										<v-date-picker :select-attribute="selectAttribute" :disabled-dates="formattedHolidays" is-required class="v-calendar border-0" v-model="selectedDate" is-expanded is-inline :min-date="new Date()" title-position="left">
										</v-date-picker>
									</div>

									<div v-else-if="step == 2" class="position-relative h-100 bg-light">
										<div v-if="(selectedBooking.service.timeslots || []).length == 0" class="text-gray text-center position-absolute-center w-100">
											There are no timeslots available for the selected date
										</div>
										<div v-else class="d-flex flex-wrap pb-2 pr-2">
											<div v-for="timeslot in selectedBooking.service.timeslots" class="pt-2 pl-2 w-20">
												<div class="btn btn-white border btn-block btn-timeslot px-0 text-center" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot">{{ timeslot.label }}</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="d-flex mt-3">
								<button v-if="step > 1" type="button" class="btn btn-white border" @click="step--">Previous</button>
								<button v-if="step == 1" type="button" class="btn btn-primary ml-auto" :disabled="nextDisabled" @click.prevent="nextStep()">Select time</button>
								<button v-else-if="step == 2" type="submit" class="btn btn-primary ml-auto" :disabled="nextDisabled">Update</button>
							</div>
						</vue-form-validate>
					</template>
				</modal>

				<modal ref="deleteModal" :close-button="false">
					<template v-if="selectedBooking">
						<h5 class="font-heading text-center">Delete Booking</h5>
						<p class="text-center mt-3">
							Are you sure to delete the booking <strong>{{ selectedBooking.service.name }}</strong>? <br />
							<span class="text-danger">This action cannot be undone</span>
						</p>
						<div class="d-flex">
							<button class="btn btn-white border" type="button" data-dismiss="modal">Cancel</button>
							<button class="btn btn-danger ml-auto" type="button" @click="destroy(selectedBooking)">Delete</button>
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