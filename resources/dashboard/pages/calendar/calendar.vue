<template>
	<div class="min-h-full">
		<div class="flex items-center border-bottom">
			<div class="content-header">
				<div v-if="!selectedDate">CALENDAR</div>
				<button
					v-else
					type="button"
					class="btn btn-md btn-outline-primary"
					@click="
						selectedDate = null;
						$refs.bookingComponent.close();
					"
				>
					<span>OVERVIEW</span>
				</button>
			</div>
			<div class="ml-auto pr-6 flex items-center">
				<div class="ml-2" v-if="selectedDate">
					<button type="button" class="btn btn-md btn-outline-primary" ref="toggleViewBtn" @click="toggleView">
						<span>{{ weekToggleText }}</span>
					</button>
					<div class="button-date-nav">
						<button type="button" @click="prevDate()"><ArrowLeftIcon class="fill-current"></ArrowLeftIcon></button>
						<span>{{ dayjs(selectedDate).format('MMMM D, YYYY') }}</span>
						<button type="button" @click="nextDate()"><ArrowRightIcon class="fill-current"></ArrowRightIcon></button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="banner" class="p-6 border-bottom">
			<div class="bg-primary-ultralight justify-between rounded-xl flex p-6">
				<div class="font-serif w-1/4 font-semibold uppercase">
					CHECK YOUR MEETINGS AND AVAILABLE TIMES.
				</div>
				<div class="w-7/12">
					<p class="text-muxted mb-4">
						Check your meetings in your calendar, meeting details and your future availabilities. Connect your Google Calendar or Outlook to link Telloe Calendar with existing Calendars.
					</p>
					<button class="btn btn-md btn-outline-primary" type="button" @click="$router.push('/dashboard/integrations')"><span>INTEGRATE GOOGLE CALENDAR OR OUTLOOK</span></button>
				</div>
				<div class="font-serif">
					<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
				</div>
			</div>
		</div>

		<div class="p-3 flex items-center justify-between border-bottom">
			<VueSelect label="Timezone" :options="availableTimezones" drop-position="w-full" searchable v-model="timezone"></VueSelect>
			<VueSelect label="Google Calendar" v-if="googleCalendars.length" :options="googleCalendars" placeholder="Select Google Calendar" @input="updateGoogleCalendar" v-model="$root.auth.google_calendar_id"></VueSelect>
		</div>

		<div v-if="!selectedDate" class="flex">
			<div class="w-1/2">
				<UpcomingBookings :timezone="timezone" :loading="loading" :bookings="upcomingBookingsTz" :googleCalendarEvents="googleCalendarEvents"></UpcomingBookings>
			</div>
			<div class="w-1/2 py-6 px-3 border-left calendar-container">
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
			<DayView ref="dayView" v-if="view == 'day'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick" :googleCalendarEvents="googleCalendarEvents" :contactBookings="contactBookingsTz" :timezone="timezone"></DayView>
			<WeekView ref="weekView" v-else-if="view == 'week'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick" :googleCalendarEvents="googleCalendarEvents" :contactBookings="contactBookingsTz" :timezone="timezone"></WeekView>
		</div>

		<Booking :booking="selectedBooking" :newEvent="newEvent" @update="bookingUpdated" @close="bookingClosed" @newBookingChange="newBookingChange" ref="bookingComponent"></Booking>
	</div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.scss" lang="scss"></style>
