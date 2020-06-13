<template>
	<div class="position-relative h-100">

		<button v-if="!addBooking" class="btn btn-sm btn-outline-primary" @click="addBooking = true">+ Add Booking</button>

		<div v-else class="bg-white rounded p-2 shadow-sm">
			<h6 class="font-heading">Add Booking</h6>
			<select class="form-control shadow-none mb-2 cursor-pointer" @change="getTimeslots(selectedService, selectedDate)" :class="{'text-gray': !selectedService}" v-model="selectedService">
				<option value="" selected disabled>Select service</option>
				<option :value="service.id" v-for="service in services">{{ service.name }}</option>
			</select>
			<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
				<div class="text-gray bg-gray-300 p-2">Date</div>
				<div class="flex-grow-1">
					<v-date-picker @input="getTimeslots(selectedService, selectedDate)" is-required :disabled-dates="formattedHolidays" :min-date="new Date()" :popover="{visibility: 'click' }" v-model="selectedDate" class="d-block h-100">
						<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100" :class="{'text-gray': !selectedDate}">{{ selectedDate ? formatDate(selectedDate) : 'Set date' }}</button>
					</v-date-picker>
				</div>
			</div>
			<div class="dropdown">
				<button class="btn btn-white border btn-block dropdown-toggle" data-toggle="dropdown" :class="{'text-gray': !selectedTimeslot}" :disabled="!selectedDate || !selectedService">{{ selectedTimeslot ? selectedTimeslot.label : 'Select timeslot' }}</button>
				<div class="dropdown-menu w-100 p-0 bg-light" v-if="selectedService">
					<div class="d-flex flex-wrap pb-1 pr-1">
						<div v-if="timeslots.length == 0" class="text-center text-gray py-3 w-100">
							There are no timeslots available.
						</div>
						<div v-else v-for="timeslot in timeslots" class="pt-1 pl-1 w-25">
							<div class="btn btn-white border btn-sm btn-block small" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot">{{ timeslot.label }}</div>
						</div>
					</div>
				</div>
			</div>

			<div class="d-flex mt-2">
				<button type="button" class="btn btn-sm btn-link text-body" @click="addBooking = false; selectedDate = null;">Cancel</button>
				<button type="button" class="btn btn-sm btn-primary ml-auto" :disabled="!selectedDate || !selectedTimeslot || !selectedService" @click="store">Add</button>
			</div>
		</div>

		<div class="position-relative h-100">
			<div v-if="!bookingsReady" class="modal-loader bg-light position-absolute w-100 h-100">
	            <div class="position-absolute-center">
	                <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
	            </div>
	        </div>

			<div class="mt-2">
		        <div v-for="booking in userBookings" class="py-2 booking border-bottom">
		        	<!-- Edit -->
		        	<div class="booking-edit bg-white rounded p-2 shadow-sm" :class="{'d-block': selectedBooking && selectedBooking.id == booking.id}">
						<h6 class="font-heading">Edit Booking</h6>
						{{ selectedService.name }}
						<select class="form-control shadow-none mb-2 cursor-pointer" @change="getTimeslots(selectedService, booking.new_date)" :class="{'text-gray': !selectedService}" v-model="selectedService">
							<option :value="service.id" v-for="service in services">{{ service.name }}</option>
						</select>
		        		<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
							<div class="text-gray bg-gray-300 p-2">Date</div>
							<div class="flex-grow-1">
								<v-date-picker @input="getTimeslots(booking.service_id, booking.new_date)" is-required :min-date="new Date()" :popover="{visibility: 'click' }" v-model="booking.new_date" class="d-block h-100">
									<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100">{{ booking.new_date ? formatDate(booking.new_date) : 'Set date' }}</button>
								</v-date-picker>
							</div>
						</div>

						<div class="dropdown">
							<button class="btn btn-white border btn-block dropdown-toggle" data-toggle="dropdown" :class="{'text-gray': !selectedTimeslot}">{{ selectedTimeslot ? selectedTimeslot.label : 'Select timeslot' }}</button>
							<div class="dropdown-menu w-100 p-0 bg-light">
								<div class="d-flex flex-wrap pb-1 pr-1">
									<div v-if="timeslots.length == 0" class="text-center text-gray py-3 w-100">
										There are no timeslots available.
									</div>
									<div v-else v-for="timeslot in timeslots" class="pt-1 pl-1 w-25">
										<div class="btn btn-white border btn-sm btn-block small" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot">{{ timeslot.label }}</div>
									</div>
								</div>
							</div>
						</div>

						<div class="d-flex mt-2">
							<button type="button" class="btn btn-sm btn-link text-body" @click="selectedBooking = null; selectedService = ''; booking.new_date = booking.date">Cancel</button>
							<button type="button" class="btn btn-sm btn-primary ml-auto" :disabled="!selectedTimeslot" @click="update(booking)">Update</button>
						</div>
		        	</div>
		        	<!-- End Edit -->

		        	<div v-if="!selectedBooking || selectedBooking.id != booking.id" class="d-flex align-items-center">
			            <div>
			                <strong class="font-heading d-block">{{ booking.service.name }}</strong>
			                <small class="d-block text-gray-600 font-weight-light">{{ formatDate(booking.date) }} @ {{ formatTime(booking.start) }}-{{ formatTime(booking.end) }}</small>
			            </div>
			            <div class="ml-auto opacity-0">
			                <button type="button" class="btn btn-sm btn-link p-0 text-body" @click="edit(booking)"><u>Edit</u></button>
			                <button type="button" class="ml-1 btn btn-sm btn-link p-0 text-danger" @click="addBooking = false; deleteBooking(booking)"><u>Delete</u></button>
			            </div>
		            </div>
		        </div>
	        </div>
		</div>
	</div>
</template>

<script src="./bookings.js"></script>
<style src="./bookings.scss" lang="scss" scoped></style>