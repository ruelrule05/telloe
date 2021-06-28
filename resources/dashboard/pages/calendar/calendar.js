import { mapState, mapActions } from 'vuex';
import UpcomingBookings from '../../components/UpcomingBookings/UpcomingBookings.vue';
import DayView from '../../components/DayView/DayView.vue';
import WeekView from '../../components/WeekView/WeekView.vue';
import Booking from '../../components/Booking/Booking.vue';
import ArrowLeftIcon from '../../../icons/arrow-left.vue';
import ArrowRightIcon from '../../../icons/arrow-right.vue';
import VCalendar from 'v-calendar/lib/components/calendar.umd';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import axios from 'axios';
const dayjs = require('dayjs');
const ct = require('countries-and-timezones');
import jstz from 'jstz';
const timezone = jstz.determine();
import timezoneTime from '../../../js/helpers/TimezoneTime.js';
import CloseIcon from '../../../icons/close.vue';
export default {
	components: { VueSelect, UpcomingBookings, DayView, WeekView, ArrowLeftIcon, ArrowRightIcon, Booking, VCalendar, CloseIcon },

	data: () => ({
		loading: true,
		dayjs: dayjs,
		selectedDate: null,
		view: 'week',
		selectedBooking: null,
		newEvent: false,
		googleCalendars: [],
		googleCalendarEvents: [],
		contactBookings: [],
		timezone: '',
		banner: true
	}),

	computed: {
		...mapState({
			upcomingBookings: state => state.bookings.upcoming,
			bookings: state => state.bookings.index
		}),

		upcomingBookingsTz() {
			return this.bookingsTimezone(this.upcomingBookings);
		},

		contactBookingsTz() {
			return this.bookingsTimezone(this.contactBookings);
		},

		calendarAttributes() {
			let attributes = [];
			this.bookings.forEach(booking => {
				let bookingDate = this.dayjs(booking.date).format('YYYY-MM-DD');
				attributes.push({
					customData: 'booking',
					dates: bookingDate
				});
			});
			this.contactBookings.forEach(booking => {
				let bookingDate = this.dayjs(booking.date).format('YYYY-MM-DD');
				attributes.push({
					customData: 'booking',
					dates: bookingDate
				});
			});

			this.googleCalendarEvents.forEach(event => {
				let eventDate = this.dayjs(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
				attributes.push({
					dot: {
						color: 'red'
					},
					customData: 'google-event',
					dates: eventDate
				});
			});

			(this.$root.auth.outlook_calendar_events || []).forEach(event => {
				let eventDate = this.dayjs(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
				attributes.push({
					dot: {
						color: 'red'
					},
					customData: 'outlook-event',
					dates: eventDate
				});
			});

			return attributes;
		},

		weekToggleText() {
			return (this.view == 'week' ? 'DAY' : 'WEEK') + ' VIEW';
		},

		availableTimezones() {
			let timezones = [];
			let countries = ct.getAllCountries();
			Object.keys(countries).forEach(country => {
				countries[country].timezones.forEach(timezone => {
					timezones.push({
						text: timezone,
						value: timezone
					});
				});
			});
			return timezones.sort((a, b) => {
				return a.text > b.text ? 1 : -1;
			});
		}
	},

	watch: {
		view: function() {
			this.$refs.toggleViewBtn.blur();
		}
	},

	created() {
		this.timezone = timezone.name();
		//this.selectedDate = dayjs().toDate();
		this.getUpcomingBookingsData();
		this.getContactBookings();
		this.getGoogleCalendars().then(response => {
			this.googleCalendars = response.data
				.filter(calendar => {
					return calendar.accessRole == 'owner';
				})
				.map(calendar => {
					return {
						text: calendar.summary,
						value: calendar.id
					};
				});
		});
		this.getGoogleCalendarEvents();
	},

	methods: {
		...mapActions({
			getUpcomingBookings: 'bookings/getUpcomingBookings',
			getGoogleCalendars: 'bookings/getGoogleCalendars'
		}),

		bookingsTimezone(bookings) {
			let timezonedBookings = [];
			bookings.forEach(booking => {
				let parseBooking = JSON.parse(JSON.stringify(booking));
				parseBooking.start = timezoneTime.get(`${booking.date} ${booking.start}`, booking.timezone, this.timezone);
				parseBooking.end = timezoneTime.get(`${booking.date} ${booking.end}`, booking.timezone, this.timezone);
				timezonedBookings.push(parseBooking);
			});
			return timezonedBookings;
		},

		async getUpcomingBookingsData() {
			this.loading = true;
			await this.getUpcomingBookings();
			this.loading = false;
		},

		async getContactBookings() {
			let response = await axios.get('/bookings/contact');
			this.contactBookings = response.data;
		},

		hasBooking(attributes) {
			let count = 0;
			attributes.forEach(attr => {
				if (attr.customData == 'booking') {
					if (!count) count = 0;
					count++;
				}
			});
			return count;
		},

		hasGoogleEvent(attributes) {
			let count = 0;
			attributes.forEach(attr => {
				if (attr.customData == 'google-event') {
					if (!count) count = 0;
					count++;
				}
			});
			return count;
		},

		async getGoogleCalendarEvents() {
			if (this.$root.auth.google_calendar_id) {
				let response = await axios.get('/google_calendar_events');
				this.googleCalendarEvents = response.data;
			}
		},

		async updateGoogleCalendar(calendarId) {
			let response = await axios.put('/google_calendar', { google_calendar_id: calendarId });
			this.googleCalendarEvents = response.data.map(event => {
				event.timezone = event.start.timeZone;
				return event;
			});
		},

		toggleView() {
			this.view = this.view == 'week' ? 'day' : 'week';
		},

		dayClick(date) {
			this.selectedDate = date;
		},

		prevDate() {
			this.selectedDate = dayjs(this.selectedDate)
				.subtract(1, 'day')
				.toDate();
		},

		nextDate() {
			this.selectedDate = dayjs(this.selectedDate)
				.add(1, 'day')
				.toDate();
		},

		bookingUpdated(booking) {
			if (booking.id == this.selectedBooking.id) {
				this.selectedBooking.date = dayjs(booking.date).format('YYYY-MM-DD');
				this.selectedBooking.start = booking.start;
				this.selectedBooking.end = booking.end;
			}
			this.selectedBooking = null;
		},

		eventClick(event) {
			if ((event.booking || {}).type != 'blocked') {
				this.selectedBooking = event.booking;
				if (this.view == 'day') {
					this.$refs.dayView.newEventDate = {};
				} else if (this.view == 'week') {
					this.$refs.weekView.newEventDate = {};
				}
				this.newEvent = false;
			}
		},

		newEventClick(newEvent) {
			this.selectedBooking = newEvent;
			this.newEvent = true;
		},

		bookingClosed() {
			if (this.view == 'day') {
				this.$refs.dayView.newEvent = null;
			} else if (this.view == 'week') {
				this.$refs.weekView.newEvent = null;
			}
			this.selectedBooking = null;
		},

		newBookingChange(newBooking) {
			if (this.view == 'day') {
				this.$refs.dayView.newEvent.date = newBooking.date;
				this.$refs.dayView.newEvent.start = newBooking.start;
				this.$refs.dayView.newEvent.end = newBooking.end;
			} else if (this.view == 'week') {
				this.$refs.weekView.newEvent.date = newBooking.date;
				this.$refs.weekView.newEvent.start = newBooking.start;
				this.$refs.weekView.newEvent.end = newBooking.end;
			}
		}
	}
};
