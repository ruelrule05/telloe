<template>
	<div class="h-100 d-flex flex-column overflow-hidden" ref="calendar">
		<div class="border-bottom bg-white p-3 d-flex align-items-center">
			<h5 class="font-heading mb-0">Calendar</h5>
			<div class="ml-auto d-flex align-items-center">
                <button :data-intro='$root.intros.calendar_settings.intro' :data-step="$root.intros.calendar_settings.step"  class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="selectedDate = null; infoTab = 'settings'">
                    <cog-icon class="btn-icon"></cog-icon>
                    Settings
                </button>
			</div>
		</div>

		<div v-if="!selectedDate" class="h-100 d-flex overflow-auto">
			<div class="h-100 d-flex flex-column flex-grow-1 p-4">
				<div class="bg-white rounded shadow-sm h-100 p-1 flex-grow-1">
					<div class="h-100 position-relative">
						<div class="calendar-buttons position-absolute">
							<button class="btn btn-white border" @click="goToDate('today')">Today</button>
							<button class="btn btn-white border line-height-1 badge-pill p-1" @click="goToDate('prev')">
								<chevron-left width="28" height="28" transform="scale(1.5)"></chevron-left>
							</button>
							<button class="btn btn-white border line-height-1 badge-pill p-1" @click="goToDate('next')">
								<chevron-right width="28" height="28" transform="scale(1.5)"></chevron-right>
							</button>
						</div>
						<!-- <FullCalendar ref="fullCalendar" themeSystem="bootstrap" :header="header" :buttonText="buttonText" eventColor="#FBBC1B" :displayEventTime="false" @dateClick="dateClick" defaultView="dayGridMonth" :plugins="calendarPlugins" height="parent" :dayRender="dayRender"></FullCalendar> -->

						<v-calendar class="v-calendar h-100 border-0" is-expanded :attributes="calendarAttributes" ref="v-calendar">
							<div slot="day-content" slot-scope="{day, dayEvents, attributes}">
								<div class="day-content text-center">
									<div class="day-label" :class="{active: selectedDate && selectedDate.toString() == day.date.toString(), 'is-today': day.isToday}" @click="dayclick(day.date); infoTab = 'bookings'">
										<span>{{ day.label }}</span>
										<div v-if="attributes" class="d-flex align-items-center vc-badge-container">
											<div class="vc-badge vc-bookings">{{ countBookings(attributes) }}</div>
											<div class="vc-badge vc-events">{{ countEvents(attributes) }}</div>
										</div>
									</div>
								</div>
							</div>
						</v-calendar>
					</div>
				</div>
			</div>
		</div>

		<timetable v-else :date="selectedDate"></timetable>


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



		<modal ref="confirmBooking" :close-button="false">
			<template v-if="selectedBooking && selectedTimeslot">
				<div v-if="!bookingCreated">
					<h4 class="font-heading text-center mb-3">Review Booking Details</h4>
					<div class="bg-light rounded py-2 px-3">
						<div class="d-flex">
							<div class="w-25">Service</div>
							<strong>{{ selectedBooking.service.name }}</strong>
						</div>
						<div class="d-flex">
							<div class="w-25">Date</div>
							<strong>{{ formatDate(selectedBooking.date_object) }}</strong>
						</div>
						<div class="d-flex">
							<div class="w-25">Time</div>
							<strong>{{ selectedTimeslot.label }}</strong>
						</div>
					</div>
					<div class="text-danger text-center mt-2">
						&nbsp; {{ error }} &nbsp;
					</div>


					<div class="d-flex mt-3">
						<button type="button" :disabled="loading" class="btn btn-white border" @click="$refs['confirmBooking'].hide(); error = ''">Cancel</button>
						<vue-button type="button" :loading="loading" button_class="ml-auto btn btn-primary" @click="submit()">Update</vue-button>
					</div>
				</div>


				<div v-else class="py-5 text-center">
					<checkmark-circle-icon class="fill-success" width="50" height="50"></checkmark-circle-icon>
					<h5 class="font-heading text-center mb-4 mt-2">Booking has been successfully {{ selectedBooking ? 'updated' : 'placed' }}</h5>
					<button type="button" class="btn btn-white border" @click="$refs['confirmBooking'].hide(); resetBookingForm()">Close</button>
				</div>
			</template>
		</modal>


		<modal ref="removeCalendar" :close-button="false">
			<div class="text-center">
				<info-circle-icon fill="red" width="50" height="50" class="d-inline-block"></info-circle-icon>
				<p class="mb-0 mt-2">
					Are you sure to remove <strong>{{ calendarToRemove }} Calendar</strong>? 
					<br />
					This action will delete all booking events from this calendar.
				</p>
				
				<div class="d-flex align-items-center mt-5">
					<button class="btn btn-white border mr-2" type="button" data-dismiss="modal" :disabled="removeCalendarLoading">Cancel</button>
					<vue-button button_class="btn btn-primary ml-auto" type="button" :loading="removeCalendarLoading" @click.native="removeCalendar()">Continue</vue-button>
				</div>
			</div>
		</modal>

		<modal ref="changeGoogleCalendar" :close-button="false">
			<div class="text-center" v-if="newGoogleCalendarId">
				<info-circle-icon fill="#ffc107" width="50" height="50" class="d-inline-block"></info-circle-icon>
				<p class="mb-0 mt-2">
					Are you sure to use Google Calendar <strong>{{ $root.auth.google_calendars.find((x) => x.id == newGoogleCalendarId).summary }}</strong>? 
					<br />
					This action will populate your existing bookings to the selected calendar as events.
				</p>
				
				<div class="d-flex align-items-center mt-5">
					<button class="btn btn-white border mr-2" type="button" data-dismiss="modal" :disabled="confirmCalendarLoading">Cancel</button>
					<vue-button button_class="btn btn-primary ml-auto" type="button" :loading="confirmCalendarLoading" @click.native="setGoogleCalendar">Continue</vue-button>
				</div>
			</div>
		</modal>

		<modal ref="changeOutlookCalendar" :close-button="false">
			<div class="text-center" v-if="newOutlookCalendarId">
				<info-circle-icon fill="#ffc107" width="50" height="50" class="d-inline-block"></info-circle-icon>
				<p class="mb-0 mt-2">
					Are you sure to use Outlook Calendar <strong>{{ $root.auth.outlook_calendars.find((x) => x.id == newOutlookCalendarId).name }}</strong>? 
					<br />
					This action will populate your existing bookings to the selected calendar as events.
				</p>
				
				<div class="d-flex align-items-center mt-5">
					<button class="btn btn-white border mr-2" type="button" data-dismiss="modal" :disabled="confirmCalendarLoading">Cancel</button>
					<vue-button button_class="btn btn-primary ml-auto" type="button" :loading="confirmCalendarLoading" @click.native="setOutlookCalendar">Continue</vue-button>
				</div>
			</div>
		</modal>
	</div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.scss" lang="scss"></style>
