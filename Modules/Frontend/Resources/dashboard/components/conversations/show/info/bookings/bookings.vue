<template>
	<div v-if="!conversation.member.is_pending && (conversation.member.role || {}).role != 'support' && membersLength == 1" class="position-relative h-100 pb-2" ref="addBookingTitle">
		<div class="dropdown" ref="newBookingDropdown">
	        <button type="button" class="btn btn-sm btn-white border d-flex align-items-center" @click="selectedBooking = null; $refs['manageBooking'].show()"><plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon> Add Booking</button>
        </div>

		<div class="position-relative h-100">
	        <div v-for="booking in userBookings" class="p-3 booking mt-2 dropdown shadow-sm rounded border position-relative" :class="{'bg-primary text-white': selectedBooking && selectedBooking.id == booking.id}">
                <strong class="font-heading d-block">{{ booking.service.name }}</strong>
                <small class="d-block text-muted-600">{{ formatDate(booking.date) }} @ {{ formatTime(booking.start) }}-{{ formatTime(booking.end) }}</small>
	            <div class="position-absolute booking-actions" :class="{'opacity-0': !selectedBooking || selectedBooking.id != booking.id}">
	                <button type="button" class="btn btn-sm btn-white p-1 line-height-0 border badge-pill" @click=" edit(booking); $refs['manageBooking'].show()">
	                	<pencil-icon width="15" height="15"></pencil-icon>
	                </button>
	                <button type="button" class="btn btn-sm btn-white p-1 line-height-0 border badge-pill" @click="selectedBooking = booking; $refs['deleteBooking'].show()">
	                	<trash-icon width="15" height="15" fill="red"></trash-icon>
	                </button>
	            </div>
	        </div>
		</div>


		<modal ref="deleteBooking" :close-button="false" @hidden="resetBookingForm">
			<div class="text-center">
				<h5 class="font-heading">Delete Booking</h5>
				<p class="mb-0">Are you sure to delete this booking?</p>
			</div>
			<div class="d-flex mt-4">
				<button type="button" class="btn btn-white border" @click="$refs['deleteBooking'].hide()">Cancel</button>
				<button type="button" class="ml-auto btn btn-danger" @click="deleteBooking(selectedBooking); $refs['deleteBooking'].hide()">Delete Booking</button>
			</div>
		</modal>


		<modal ref="manageBooking" :close-button="!loading" @hidden="resetBookingForm">
			<vue-form-validate @submit="submit">
				<div class="booking-form-body">
					<div class="h-100 mb-3 overflow-hidden">

						<div v-if="step == 1" class="position-absolute-center w-100 px-3 mt-1">
							<h4 class="font-heading text-center mb-4">Select Service</h4>
							<div class="d-flex flex-wrap mx-n1">
								<div v-for="service in availableServices" class="w-50 p-1">
									<div class="rounded py-2 px-3 border cursor-pointer shadow-sm" :class="{'bg-primary text-white': selectedService && selectedService.id == service.id}" @click="selectedService = service">
										<h5 class="mb-0 font-heading">{{ service.name }}</h5>
										<p class="mb-0">{{ service.duration }} minutes</p>
									</div>
								</div>
							</div>
						</div>

						<div v-if="step == 2">
							<h4 class="font-heading text-center mb-4">Select Date</h4>
							<v-date-picker :select-attribute="selectAttribute" :disabled-dates="formattedHolidays" is-required class="v-calendar border-0 border" v-model="selectedDate" is-expanded is-inline :min-date="new Date()" title-position="left">
							</v-date-picker>
						</div>

						<div v-else-if="step == 3" class="position-absolute-center w-100 px-3">
							<div v-if="timeslotsLoading" class="position-absolute-center">
								<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
							</div>
							<div :class="{'d-none': timeslotsLoading}">
								<h4 class="font-heading text-center mb-4">Select Time</h4>
								<div v-if="timeslots.length == 0" class="text-gray text-center">
									<span>There are no timeslots available for the selected date.</span>
								</div>
								<div v-else class="d-flex flex-wrap pb-2 pr-2">
									<div v-for="timeslot in timeslots" class="pt-2 pl-2 w-20">
										<div class="btn btn-white border btn-block btn-timeslot px-2 text-center" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot">{{ timeslot.label }}</div>
									</div>
								</div>
							</div>
						</div>

						<div v-else-if="step == 4 && selectedService && selectedDate && selectedTimeslot" class="position-absolute-center w-100 px-3">
							<h4 class="font-heading text-center mb-3">Review Booking Details</h4>
							<div class="bg-light rounded py-2 px-3">
								<div class="d-flex">
									<div class="w-25">Service</div>
									<strong>{{ selectedService.name }}</strong>
								</div>
								<div class="d-flex">
									<div class="w-25">Date</div>
									<strong>{{ formatDate(selectedDate) }}</strong>
								</div>
								<div class="d-flex">
									<div class="w-25">Time</div>
									<strong>{{ selectedTimeslot.label }}</strong>
								</div>
							</div>
							<div class="text-danger text-center mt-2">
								&nbsp; {{ error }} &nbsp;
							</div>
						</div>


						<div v-else-if="step == 5" class="position-absolute-center w-100 text-center">
							<checkmark-circle-icon class="fill-success" width="50" height="50"></checkmark-circle-icon>
							<h5 class="font-heading text-center mb-4 mt-2">Booking has been successfully {{ selectedBooking ? 'updated' : 'placed' }}</h5>
							<button type="button" class="btn btn-white border" @click="$refs['manageBooking'].hide()">Close</button>
						</div>
					</div>
				</div>

				<div class="d-flex mt-3">
					<button v-if="step > 1 && step < 5" type="button" :disabled="loading" class="btn btn-white border" @click="step--; error = ''">Previous</button>
					<div class="ml-auto">
						<button v-if="step == 1" type="button" class="btn btn-primary" :disabled="nextDisabled" @click="nextStep()">Select Date</button>
						<button v-else-if="step == 2" type="button" class="btn btn-primary" :disabled="nextDisabled" @click="getTimeslots(selectedService.id, selectedDate); nextStep();">Select Time</button>
						<button v-else-if="step == 3" type="button" class="btn btn-primary" :disabled="nextDisabled" @click="nextStep()">Review Details</button>
						<vue-button v-else-if="step == 4" type="submit" :loading="loading" button_class="btn btn-primary">{{ selectedBooking ? 'Update' : 'Book Now' }}</vue-button>
					</div>
				</div>
			</vue-form-validate>
		</modal>
	</div>
</template>

<script src="./bookings.js"></script>
<style src="./bookings.scss" lang="scss" scoped></style>