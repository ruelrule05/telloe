<template>
	<div class="position-relative h-100">
		<h4 class="font-heading" ref="addBookingTitle">Bookings</h4>
		<div class="dropdown" ref="newBookingDropdown">
	        <button class="btn btn-sm btn-secondary d-flex align-items-center" data-toggle="dropdown" data-display="static" @click="selectedBooking = null; selectedService = ''"><plus-icon height="13" width="13" transform="scale(1.6)" fill="#5A5ADF" class="mr-1"></plus-icon> Add Booking</button>
            <div class="dropdown-menu w-100 p-2" @click.stop>
				<select class="form-control shadow-nonxe mb-2 cursor-pointer" @change="getTimeslots(selectedService, selectedDate)" :class="{'text-gray': !selectedService}" v-model="selectedService">
					<option value="" selected disabled>Select service</option>
					<option :value="service.id" v-for="service in services">{{ service.name }}</option>
				</select>
				<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
					<div class="text-gray bg-gray-300 p-2">Date</div>
					<div class="flex-grow-1">
						<v-date-picker @input="getTimeslots(selectedService, selectedDate)" is-required :disabled-dates="formattedHolidays" :min-date="new Date().setDate(new Date().getDate() + 1)" :popover="{visibility: 'click' }" v-model="selectedDate" class="d-block h-100">
							<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100" :class="{'text-gray': !selectedDate}">{{ selectedDate ? formatDate(selectedDate) : 'Set date' }}</button>
						</v-date-picker>
					</div>
				</div>
				<div class="dropdown">
					<button class="btn btn-white border btn-block dropdown-toggle" @click="timeslotDropdown = !timeslotDropdown" :class="{'text-gray': !selectedTimeslot}" :disabled="!selectedDate || !selectedService">{{ selectedTimeslot ? selectedTimeslot.label : 'Select timeslot' }}</button>
					<div class="dropdown-menu w-100 p-0 bg-light timeslot-dropdown-menu" :class="{'show': timeslotDropdown}" v-if="selectedService">
						<div class="d-flex flex-wrap pb-3 pr-3 bg-white">
							<div v-if="timeslots.length == 0" class="text-center text-gray py-3 w-100">
								There are no timeslots available.
							</div>
							<div v-else class="w-100">
								<div v-for="timeslot in timeslots" class="pt-3 pl-3 w-100">
									<div class="btn btn-light border btn-sm btn-block text-left btn-timeslot p-2" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot; timeslotDropdown = false;">
										<div class="rounded border p-2 mb-1">
											<small class="d-block font-weight-light">Your time: {{ $root.auth.timezone }}</small>
											{{ timeslot.label }}
										</div>
										<div class="rounded border p-2">
											<small class="d-block font-weight-light">Client's time: {{ user.timezone }}</small>
											{{ timezoneTime($root.auth.timezone, user.timezone, timeslot.time) }}
										</div>
									</div>
								</div>
								<div class="text-center">
									<button v-if="!customTime" class="btn btn-link" type="button" @click="customTime = true">+ Add custom time</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="d-flex mt-2">
					<button type="button" class="btn btn-sm btn-link text-body" @click="selectedDate = null; resetBookingForm();">Cancel</button>
					<button type="button" class="btn btn-sm btn-primary ml-auto" :disabled="!selectedDate || !selectedTimeslot || !selectedService" @click="store">Add</button>
				</div>
            </div>
        </div>



		<div class="position-relative h-100">
			<div v-if="!bookingsReady" class="modal-loader bg-white position-absolute w-100 h-100">
	            <div class="position-absolute-center">
	                <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
	            </div>
	        </div>

	        <div v-for="booking in userBookings" class="p-3 booking mt-2 dropdown shadow-sm rounded border">
	        	<div class="d-flex">
		            <div>
		                <strong class="font-heading d-block">{{ booking.service.name }}</strong>
		                <small class="d-block text-gray-600 font-weight-light">{{ formatDate(booking.date) }} @ {{ formatTime(booking.start) }}-{{ formatTime(booking.end) }}</small>
		            </div>
		            <div class="ml-auto" :class="{'opacity-0': !selectedBooking || selectedBooking.id != booking.id}">
		                <button type="button" class="btn btn-sm btn-white p-1 line-height-0 border badge-pill" @click="edit(booking)">
		                	<pencil-icon width="15" height="15"></pencil-icon>
		                </button>
		                <button type="button" class="btn btn-sm btn-white p-1 line-height-0 border badge-pill" @click="deleteBooking(booking)">
		                	<trash-icon width="15" height="15" fill="red"></trash-icon>
		                </button>
		            </div>
	            </div>



	        	<!-- Edit -->
	        	<div class="dropdown-menu w-100 p-2 mt-n3" :class="{'show': selectedBooking && selectedBooking.id == booking.id}">
					<h6 class="font-heading">Edit Booking</h6>
					{{ selectedService.name }}
					<select class="form-control shadow-none mb-2 cursor-pointer" @change="getTimeslots(selectedService, booking.new_date)" :class="{'text-gray': !selectedService}" v-model="selectedService">
						<option :value="service.id" v-for="service in services">{{ service.name }}</option>
					</select>
	        		<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
						<div class="text-gray bg-gray-300 p-2">Date</div>
						<div class="flex-grow-1">
							<v-date-picker @input="getTimeslots(booking.service_id, booking.new_date)" :disabled-dates="formattedHolidays" is-required :min-date="new Date().setDate(new Date().getDate() + 1)" :popover="{visibility: 'click' }" v-model="booking.new_date" class="d-block h-100">
								<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100">{{ booking.new_date ? formatDate(booking.new_date) : 'Set date' }}</button>
							</v-date-picker>
						</div>
					</div>

					<div class="dropdown">
						<button class="btn btn-white border btn-block dropdown-toggle" data-toggle="dropdown" :class="{'text-gray': !selectedTimeslot}">{{ selectedTimeslot ? selectedTimeslot.label : 'Select timeslot' }}</button>
						<div class="dropdown-menu timeslot-dropdown-menu w-100 p-0 bg-light" :class="{'show': booking.timeslotDropdown}">
							<div class="d-flex flex-wrap pb-3 pr-3 bg-white">
								<div v-if="timeslots.length == 0" class="text-center text-gray py-3 w-100">
									There are no timeslots available.
								</div>
								<div v-else v-for="timeslot in timeslots" class="pt-3 pl-3 w-100">
									<div class="btn btn-light border btn-sm btn-block text-left btn-timeslot p-2" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot; timeslotDropdown = false;">
										<div class="rounded border p-2 mb-1">
											<small class="d-block font-weight-light">Your time: {{ $root.auth.timezone }}</small>
											{{ timeslot.label }}
										</div>
										<div class="rounded border p-2">
											<small class="d-block font-weight-light">Client's time: {{ user.timezone }}</small>
											{{ timezoneTime($root.auth.timezone, user.timezone, timeslot.time) }}
										</div>
									</div>
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
	        </div>
		</div>
	</div>
</template>

<script src="./bookings.js"></script>
<style src="./bookings.scss" lang="scss" scoped></style>