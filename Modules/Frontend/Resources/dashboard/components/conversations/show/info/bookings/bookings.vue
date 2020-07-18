<template>
	<div v-if="!conversation.member.is_pending && (conversation.member.role || {}).role != 'support' && membersLength == 1" class="position-relative h-100 pb-2" ref="addBookingTitle">
		<div class="dropdown" ref="newBookingDropdown">
	        <button class="btn btn-sm btn-white border d-flex align-items-center" data-toggle="dropdown" data-display="static" @click="selectedBooking = null;"><plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon> Add Booking</button>
            <div class="dropdown-menu w-100 p-2" @click.stop>
				<select class="form-control shadow-nonxe mb-2 cursor-pointer" @change="getTimeslots(selectedService, selectedDate)" :class="{'text-muted': !selectedService}" v-model="selectedService">
					<option value="" selected disabled>Select service</option>
					<option :value="service.id" v-for="service in conversation.user.services">{{ service.name }}</option>
				</select>
				<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
					<div class="text-muted bg-gray-300 p-2">Date</div>
					<div class="flex-grow-1">
						<v-date-picker @input="getTimeslots(selectedService, selectedDate)" is-required :disabled-dates="formattedHolidays" :min-date="new Date().setDate(new Date().getDate() + 1)" :popover="{visibility: 'click' }" v-model="selectedDate" class="d-block h-100">
							<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100" :class="{'text-muted': !selectedDate}">{{ selectedDate ? formatDate(selectedDate) : 'Set date' }}</button>
						</v-date-picker>
					</div>
				</div>
				<div class="dropdown">
					<button class="btn btn-white border btn-block dropdown-toggle" @click="timeslotDropdown = !timeslotDropdown" :class="{'text-muted': !selectedTimeslot}" :disabled="!selectedDate || !selectedService">{{ selectedTimeslot ? selectedTimeslot.label : 'Select timeslot' }}</button>
					<div class="dropdown-menu w-100 p-0 bg-light timeslot-dropdown-menu" :class="{'show': timeslotDropdown}" v-if="selectedService">
						<div class="d-flex flex-wrap pb-3 pr-3 bg-white">
							<div v-if="timeslots.length == 0" class="text-center text-muted py-3 w-100">
								There are no timeslots available.
							</div>
							<div v-else class="w-100">
								<div v-for="timeslot in timeslots" class="pt-3 pl-3 w-100">
									<div class="btn btn-light border btn-sm btn-block text-left btn-timeslot p-2" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot; timeslotDropdown = false;">
										<div class="rounded border p-2 mb-1">
											<small class="d-block">Your time: {{ $root.auth.timezone }}</small>
											{{ timeslot.label }}
										</div>
										<div class="rounded border p-2">
											<small class="d-block">Client's time: {{ conversation.member.timezone }}</small>
											{{ timezoneTime($root.auth.timezone, conversation.member.timezone, timeslot.time) }}
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
					<button type="button" class="btn btn-sm btn-white border mr-1" @click="selectedDate = null; resetBookingForm();">Cancel</button>
					<button type="button" class="btn btn-sm btn-primary ml-auto" :disabled="!selectedDate || !selectedTimeslot || !selectedService" @click="store">Add</button>
				</div>
            </div>
        </div>



		<div class="position-relative h-100">
	        <div v-for="booking in userBookings" class="p-3 booking mt-2 dropdown shadow-sm rounded border">
	        	<div class="d-flex">
		            <div>
		                <strong class="font-heading d-block">{{ booking.service.name }}</strong>
		                <small class="d-block text-muted-600">{{ formatDate(booking.date) }} @ {{ formatTime(booking.start) }}-{{ formatTime(booking.end) }}</small>
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
					{{ (selectedService || {}).name }}
					<select class="form-control shadow-none mb-2 cursor-pointer" @change="getTimeslots(selectedService, booking.new_date)" :class="{'text-muted': !selectedService}" v-model="selectedService">
						<option :value="service.id" v-for="service in conversation.user.services">{{ service.name }}</option>
					</select>
	        		<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
						<div class="text-muted bg-gray-300 p-2">Date</div>
						<div class="flex-grow-1">
							<v-date-picker @input="getTimeslots(booking.service_id, booking.new_date)" :disabled-dates="formattedHolidays" is-required :min-date="new Date().setDate(new Date().getDate() + 1)" :popover="{visibility: 'click' }" v-model="booking.new_date" class="d-block h-100">
								<button class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100">{{ booking.new_date ? formatDate(booking.new_date) : 'Set date' }}</button>
							</v-date-picker>
						</div>
					</div>

					<div class="dropdown">
						<button class="btn btn-white border btn-block dropdown-toggle" data-toggle="dropdown" :class="{'text-muted': !selectedTimeslot}">{{ selectedTimeslot ? selectedTimeslot.label : 'Select timeslot' }}</button>
						<div class="dropdown-menu timeslot-dropdown-menu w-100 p-0 bg-light" :class="{'show': booking.timeslotDropdown}">
							<div class="d-flex flex-wrap pb-3 pr-3 bg-white">
								<div v-if="timeslots.length == 0" class="text-center text-muted py-3 w-100">
									There are no timeslots available.
								</div>
								<div v-else v-for="timeslot in timeslots" class="pt-3 pl-3 w-100">
									<div class="btn btn-light border btn-sm btn-block text-left btn-timeslot p-2" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot; timeslotDropdown = false;">
										<div class="rounded border p-2 mb-1">
											<small class="d-block">Your time: {{ $root.auth.timezone }}</small>
											{{ timeslot.label }}
										</div>
										<div class="rounded border p-2">
											<small class="d-block">Client's time: {{ conversation.member.timezone }}</small>
											{{ timezoneTime($root.auth.timezone, conversation.member.timezone, timeslot.time) }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="d-flex mt-2">
						<button type="button" class="btn btn-sm btn-white border mr-1" @click="selectedBooking = null; booking.new_date = booking.date; resetBookingForm()">Cancel</button>
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