<template>
	<div class="position-relative h-100">
		<div v-if="!ready" class="modal-loader position-absolute w-100 h-100">
            <div class="position-absolute-center">
                <div class="spinner-border text-primary" role="status"></div>
            </div>
        </div>

		<div :class="{'opacity-0': !ready}">
			<button v-if="!addBooking" class="btn btn-sm btn-outline-primary" @click="addBooking = true">+ Add Booking</button>

			<div v-else class="bg-white rounded p-2 shadow-sm">
				<h6 class="font-heading">Add Booking</h6>
				<select class="form-control shadow-none mb-2 cursor-pointer" :class="{'text-gray': !selectedService}" v-model="selectedService">
					<option value="" selected disabled>Select service</option>
					<option :value="service" v-for="service in services">{{ service.name }}</option>
				</select>
				<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
					<div class="text-gray bg-gray-300 p-2">Date</div>
					<div class="flex-grow-1">
						<v-date-picker is-required :disabled-dates="formattedHolidays" :min-date="new Date()" :popover="{visibility: 'click' }" v-model="date" class="d-block h-100">
							<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100" :class="{'text-gray': !date}">{{ date ? formatDate(date) : 'Set date' }}</button>
						</v-date-picker>
					</div>
				</div>
				<!-- <timerangepicker @update="timeUpdate"></timerangepicker> -->
				<div class="dropdown">
					<button class="btn btn-white border btn-block dropdown-toggle" data-toggle="dropdown" :class="{'text-gray': !timeslot}" :disabled="!date || !selectedService">Select timeslot</button>
					<div class="dropdown-menu w-100 p-0 bg-light">
						<div class="d-flex flex-wrap pb-1 pr-1">
							<div v-for="timeslot in timeslots" class="pt-1 pl-1 w-25">
								<div class="btn btn-white border btn-sm btn-block small">{{ timeslot.label }}</div>
							</div>
						</div>
					</div>
				</div>

				<div class="d-flex mt-2">
					<button type="button" class="btn btn-sm btn-link text-body" @click="addBooking = false; date = null;">Cancel</button>
					<button type="button" class="btn btn-sm btn-primary ml-auto" :disabled="!date || !timeslot || !selectedService" @click="store">Add</button>
				</div>
			</div>
			
			<div class="mt-2">
		        <div v-for="booking in bookings" class="py-2 booking border-bottom">
		        	<!-- Edit -->
		        	<div v-if="booking.edit" class="bg-white rounded p-2 shadow-sm">
						<h6 class="font-heading">Edit Booking</h6>
		        		<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
							<div class="text-gray bg-gray-300 p-2">Date</div>
							<div class="flex-grow-1">
								<v-date-picker is-required @input="(date) => booking.new_date = date" :min-date="new Date()" :popover="{visibility: 'click' }" :value="booking.date" class="d-block h-100">
									<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100" :class="{'text-gray': !booking.new_date}">{{ booking.new_date ? formatDate(booking.new_date) : 'Set date' }}</button>
								</v-date-picker>
							</div>
						</div>
						<timerangepicker @update="(time) => {booking.new_start = (time.start || {}).time; booking.new_end = (time.end || {}).time}" :start="booking.new_start" :end="booking.new_end"></timerangepicker>

						<div class="d-flex mt-2">
							<button type="button" class="btn btn-sm btn-link text-body" @click="$set(booking, 'edit', false)">Cancel</button>
							<button type="button" class="btn btn-sm btn-primary ml-auto" @click="update(booking)">Update</button>
						</div>
		        	</div>
		        	<!-- End Edit -->

		        	<div v-else class=" d-flex align-items-center">
			            <div>
			                <strong class="font-heading d-block">{{ formatDate(booking.date) }}</strong>
			                <small class="d-block text-gray font-weight-light">{{ formatTime(booking.start) }} - {{ formatTime(booking.end) }}</small>
			            </div>
			            <div class="ml-auto opacity-0">
			                <button type="button" class="btn btn-sm btn-link p-0 text-body" @click="$set(booking, 'edit', true)"><u>Edit</u></button>
			                <button type="button" class="ml-1 btn btn-sm btn-link p-0 text-danger" @click="deleteBooking(booking)"><u>Delete</u></button>
			            </div>
		            </div>
		        </div>
	        </div>
		</div>
	</div>
</template>

<script src="./bookings.js"></script>
<style src="./bookings.scss" lang="scss" scoped></style>