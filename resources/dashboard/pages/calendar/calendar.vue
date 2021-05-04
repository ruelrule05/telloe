<template>
	<div class="min-h-full">
		<div class="flex items-center border-bottom">
			<div class="content-header">
				<div v-if="!selectedDate" class="content-header">CALENDAR</div>
				<button v-else type="button" class="btn btn-md btn-outline-primary" @click="selectedDate = null">
					<span>OVERVIEW</span>
				</button>
			</div>
			<div class="ml-auto pr-6 flex items-center">
				<div v-if="selectedDate">
					<button type="button" class="btn btn-md btn-outline-primary" ref="toggleViewBtn" @click="toggleView">
						<span>{{ weekToggleText }}</span>
					</button>
					<div class="button-date-nav">
						<button type="button" @click="prevDate()"><ArrowLeftIcon class="fill-current"></ArrowLeftIcon></button>
						<span>{{ dayjs(selectedDate).format('MMMM D, YYYY') }}</span>
						<button type="button" @click="nextDate()"><ArrowRightIcon class="fill-current"></ArrowRightIcon></button>
					</div>
				</div>
				<div v-else>
					<VueSelect v-if="googleCalendars.length" :options="googleCalendars" placeholder="Select Google Calendar" @input="updateGoogleCalendar" v-model="$root.auth.google_calendar_id"></VueSelect>
				</div>
			</div>
		</div>
		<div v-if="!selectedDate" class="flex">
			<div class="w-1/2">
				<UpcomingBookings :bookings="upcomingBookings"></UpcomingBookings>
			</div>
			<div class="w-1/2 py-6 px-3 border-left">
				<v-calendar class="v-calendar" is-expanded :attributes="calendarAttributes" :now="selectedDate" ref="v-calendar" :masks="{ weekdays: 'WWW' }">
					<div slot="day-content" slot-scope="data">
						<div class="day-content text-center">
							<div class="day-label" :class="{ active: selectedDate && selectedDate.toString() == data.day.date.toString(), 'is-today': data.day.isToday }" @click="dayClick(data.day.date)">
								<span>{{ data.day.label }}</span>
								<div v-if="data.attributes" class="flex items-center vc-badge-container">
									<div class="vc-badge bg-primary" v-if="hasBooking(data.attributes)"></div>
									<div class="vc-badge bg-red-500" v-if="hasGoogleEvent(data.attributes)"></div>
								</div>
							</div>
						</div>
					</div>
				</v-calendar>
			</div>
		</div>

		<div v-else>
			<DayView ref="dayView" v-if="view == 'day'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick" :googleCalendarEvents="googleCalendarEvents"></DayView>
			<WeekView ref="weekView" v-else-if="view == 'week'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick"></WeekView>
		</div>

		<Booking :booking="selectedBooking" :newEvent="newEvent" @update="bookingUpdated" @close="bookingClosed" @newBookingChange="newBookingChange"></Booking>
	</div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.scss" lang="scss"></style>
