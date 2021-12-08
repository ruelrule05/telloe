<template>
	<div class="min-h-full flex flex-col overflow-x-hidden">
		<div class="flex items-center border-bottom lg:static fixed w-full bg-white z-10" :class="{ 'flex-col lg:flex-row': !overview }">
			<div class="content-header" :class="{ 'calendar-header': !overview }">
				<div v-if="overview" class="ml-7 lg:ml-0 absolute md:static top-7">CALENDAR</div>
				<button
					v-else
					type="button"
					class="btn btn-md btn-outline-primary absolute lg:static top-6 lg:left-12 right-3 left-auto"
					@click="
						overview = true;
						$refs.bookingComponent.close();
						showCalendarMobile = false;
					"
				>
					<span>OVERVIEW</span>
				</button>
			</div>
			<div class="ml-auto px-5 md:pr-3 flex items-center">
				<div class="ml-0 md:ml-2 flex calendar-buttons__header absolute md:static md:pb-4 bottom-3 right-3" v-if="!overview">
					<button type="button" class="btn btn-md btn-outline-primary" ref="toggleViewBtn" @click="toggleView">
						<span>{{ weekToggleText }}</span>
					</button>
					<div class="button-date-nav ml-2">
						<button type="button" @click="prevDate()"><ArrowLeftIcon class="fill-current"></ArrowLeftIcon></button>

						<div class="px-2">
							<v-date-picker class="relative" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="selectedDate" :masks="masks">
								<template v-slot="{ inputValue, inputEvents }">
									<button type="button" class="uppercase font-semibold" v-on="inputEvents">
										<span>{{ inputValue }}</span>
									</button>
								</template>
							</v-date-picker>
						</div>

						<button type="button" @click="nextDate()"><ArrowRightIcon class="fill-current"></ArrowRightIcon></button>
					</div>
				</div>
				<div v-else>
					<div class="border p-3 border-primary rounded-full block md:hidden" :class="{ 'bg-primary': showCalendarMobile }" @click="showCalendarMobile = !showCalendarMobile">
						<CalendarIcon class="fill-current text-primary" :class="{ 'text-white': showCalendarMobile }"></CalendarIcon>
					</div>
				</div>
			</div>
		</div>
		<div class="lg:hidden block" :class="overview ? 'h-20' : 'h-28 md:h-32'" />

		<div v-if="banner" class="p-4 lg:p-8 border-bottom relative">
			<div class="font-serif absolute lg:top-10 lg:right-10 top-6 right-6 z-5">
				<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
			</div>
			<div class="bg-primary-ultralight justify-between rounded-xl lg:flex p-8">
				<div class="font-serif lg:w-1/4 font-semibold uppercase">CHECK YOUR MEETINGS AND AVAILABLE TIMES.</div>
				<div class="lg:w-7/12">
					<p class="text-muxted mb-4">Check your meetings in your calendar, meeting details and your future availabilities. Connect your Google Calendar or Outlook to link Telloe Calendar with existing Calendars.</p>
					<button class="btn btn-md btn-outline-primary" type="button" @click="$router.push('/dashboard/integrations')"><span>INTEGRATE GOOGLE CALENDAR OR OUTLOOK</span></button>
				</div>
			</div>
		</div>

		<div class="p-3 flex flex-col md:flex-row items-center justify-between border-bottom">
			<div class="flex items-center">
				<VueSelect class="w-full md:w-auto mr-1" :options="calendars" drop-position="bottom-right" v-model="selectedCalendar"></VueSelect>
				<VueSelect class="w-full md:w-auto" label="Timezone" :options="availableTimezones" drop-position="w-full" searchable v-model="timezone"></VueSelect>
			</div>
			<div class="flex align-center">
				<VueSelect v-if="googleCalendars.length" multiple label="Google Calendar" :loading="googleCalendarEventsLoading" class="w-full md:w-auto mt-1 md:mt-0" :options="googleCalendars" placeholder="Select Calendar" @input="updateGoogleCalendar" v-model="$root.auth.google_calendar_id" dropPosition="w-full"></VueSelect>
				<VueSelect v-if="outlookCalendars.length" multiple label="Outlook Calendar" :loading="outlookCalendarEventsLoading" class="ml-2 w-full md:w-auto mt-1 md:mt-0" :options="outlookCalendars" placeholder="Select Calendar" @input="updateOutlookCalendar" v-model="$root.auth.outlook_calendar_id" dropPosition="w-full"></VueSelect>
			</div>
		</div>

		<div v-if="overview" class="flex flex-grow">
			<div class="w-full lg:w-1/2 flex-grow" :class="!showCalendarMobile ? 'block' : 'hidden'">
				<UpcomingBookings :timezone="timezone" :loading="loading" :bookings="upcomingBookingsTz" :googleCalendarEvents="googleCalendarEvents" :outlookCalendarEvents="outlookCalendarEvents" @eventClick="upcomingEventClick"></UpcomingBookings>
			</div>
			<div class="w-full lg:w-1/2 py-6 px-3 border-left calendar-container hidden md:block" :class="{ open: showCalendarMobile }">
				<div>
					<v-calendar class="v-calendar" is-expanded :attributes="calendarAttributes" :now="selectedDate" ref="v-calendar" :masks="{ weekdays: 'WWW' }">
						<div slot="day-content" slot-scope="data">
							<div class="day-content text-center">
								<div class="day-label" :data-date="data.day.date" :class="{ active: selectedDate && selectedDate.toString() == data.day.date.toString(), 'is-today': data.day.isToday }" @click="dayClick(data.day.date)">
									<span>{{ data.day.label }}</span>
									<div v-if="data.attributes" class="flex items-center vc-badge-container">
										<div class="vc-badge bg-primary" v-if="hasBooking(data.attributes)"></div>
										<div class="vc-badge bg-red-500" v-if="hasGoogleEvent(data.attributes)"></div>
										<div class="vc-badge bg-blue-500" v-if="hasOutlookEvent(data.attributes)"></div>
									</div>
								</div>
							</div>
						</div>
					</v-calendar>
				</div>
			</div>
		</div>

		<div v-else>
			<DayView ref="dayView" v-if="view == 'day'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick" :googleCalendarEvents="googleCalendarEvents" :outlookCalendarEvents="outlookCalendarEvents" :timezone="timezone" class="calendar-daily"></DayView>
			<WeekView ref="weekView" v-else-if="view == 'week'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick" :googleCalendarEvents="googleCalendarEvents" :outlookCalendarEvents="outlookCalendarEvents" :timezone="timezone" class="calendar-week"></WeekView>
		</div>

		<Booking :booking="selectedBooking" :newEvent="newEvent" @update="bookingUpdated" @close="bookingClosed" @newBookingChange="newBookingChange" ref="bookingComponent" class="calendar-booking"></Booking>
	</div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.scss" lang="scss"></style>
