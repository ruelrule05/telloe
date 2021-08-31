import { mapState, mapActions } from 'vuex';
import UpcomingBookings from '../../components/UpcomingBookings/UpcomingBookings.vue';
import DayView from '../../components/DayView/DayView.vue';
import WeekView from '../../components/WeekView/WeekView.vue';
import Booking from '../../components/Booking/Booking.vue';
import ArrowLeftIcon from '../../../icons/arrow-left.vue';
import ArrowRightIcon from '../../../icons/arrow-right.vue';
import CalendarIcon from '../../../icons/calendar.vue';
import CalendarDayIcon from '../../../icons/calendar-day.vue';
import VCalendar from 'v-calendar/lib/components/calendar.umd';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import axios from 'axios';
const dayjs = require('dayjs');
const ct = require('countries-and-timezones');
import jstz from 'jstz';
const timezone = jstz.determine();
import timezoneTime from '../../../js/helpers/TimezoneTime.js';
import CloseIcon from '../../../icons/close.vue';
import { DatePicker } from 'v-calendar';

export default {
	components: { VueSelect, UpcomingBookings, DayView, WeekView, ArrowLeftIcon, ArrowRightIcon, Booking, VCalendar, CloseIcon, 'v-date-picker': DatePicker, CalendarIcon, CalendarDayIcon },

	data: () => ({
		overview: true,
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
		banner: false,
		cookieItem: 'telloe_calendar_banner',
		masks: {
			input: 'MMMM D, YYYY'
		},
		isMobile: false,
		showCalendarMobile: false,
		googleCalendarEventsLoading: false
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
			return (this.view == 'week' ? 'DAY' : 'WEEK') + (!this.isMobile ? ' VIEW' : '');
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
		this.selectedDate = dayjs().toDate();
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
		this.checkCookie();
	},

	methods: {
		checkCookie() {
			var match = document.cookie.match(new RegExp('(^| )' + this.cookieItem + '=([^;]+)'));
			if (!match) {
				this.banner = true;
			}
		},

		hideBanner() {
			this.banner = false;
			let expires =
				dayjs()
					.add(2, 'year')
					.format('ddd, D MMM YYYY H:m:s') + ' UTC';
			document.cookie = `${this.cookieItem}=true; expires=${expires}; path=/`;
		},

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
				this.googleCalendarEventsLoading = true;
				response = await axios.get('/google_calendar_events', { params: { refresh: true } });
				this.googleCalendarEvents = response.data;
				this.googleCalendarEventsLoading = false;
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
			this.overview = false;
			this.selectedDate = date;
		},

		prevMonth() {
			this.selectedDate = dayjs(this.selectedDate)
				.subtract(1, 'month')
				.toDate();
			this.$refs['v-calendar'].move(this.selectedDate);
		},

		nextMonth() {
			this.selectedDate = dayjs(this.selectedDate)
				.add(1, 'month')
				.toDate();
			this.$refs['v-calendar'].move(this.selectedDate);
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
			if (this.view == 'day' && this.$refs.dayView) {
				this.$refs.dayView.newEvent = null;
			} else if (this.view == 'week' && this.$refs.weekView) {
				this.$refs.weekView.newEvent = null;
			}
			this.selectedBooking = null;
		},

		newBookingChange(newBooking) {
			if (newBooking) {
				if (this.view == 'day' && this.$refs.dayView.newEvent) {
					this.$refs.dayView.newEvent.date = newBooking.date;
					this.$refs.dayView.newEvent.start = newBooking.start;
					this.$refs.dayView.newEvent.end = newBooking.end;
					this.$refs.dayView.newEvent.timezone = newBooking.timezone;
				} else if (this.view == 'week' && this.$refs.weekView.newEvent) {
					this.$refs.weekView.newEvent.date = newBooking.date;
					this.$refs.weekView.newEvent.start = newBooking.start;
					this.$refs.weekView.newEvent.end = newBooking.end;
					this.$refs.weekView.newEvent.timezone = newBooking.timezone;
				}
			}
		},

		upcomingEventClick(booking, type) {
			this.overview = false;
			booking = JSON.parse(JSON.stringify(booking));
			if (type == 'booking') {
				booking.date = dayjs(booking.date).toDate();
				this.selectedDate = booking.date;
			} else if (type == 'google-event') {
				this.selectedDate = dayjs(booking.start.dateTime).toDate();
			}
			this.$nextTick(() => {
				document.querySelector('.dashboard-content').scrollTo(0, 0);
			});
		}
	}
};
