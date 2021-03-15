<template>
	<div class="min-h-full">
		<div class="content-header border-bottom">
			<div class="flex justify-between">
				CALENDAR
				<div v-if="selectedDate">
					<button type="button" class="btn btn-sm btn-outline-primary" ref="toggleViewBtn" @click="toggleView">
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
								<div v-if="data.attributes" class="d-flex align-items-center vc-badge-container">
									<div v-if="data.attributes.length > 0" class="vc-badge"></div>
								</div>
							</div>
						</div>
					</div>
				</v-calendar>
			</div>
		</div>

		<div v-else>
			<DayView ref="dayView" v-if="view == 'day'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick"></DayView>
			<WeekView ref="weekView" v-else-if="view == 'week'" :date="selectedDate" :selectedBooking="selectedBooking" @eventClick="eventClick" @newEvent="newEventClick"></WeekView>
		</div>

		<Booking :booking="selectedBooking" :newEvent="newEvent" @update="bookingUpdated" @close="bookingClosed" @newBookingChange="newBookingChange"></Booking>
	</div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.scss" lang="scss"></style>
