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
export default {
	components: { VueSelect, UpcomingBookings, DayView, WeekView, ArrowLeftIcon, ArrowRightIcon, Booking, VCalendar },

	data: () => ({
		dayjs: dayjs,
		selectedDate: null,
		view: 'week',
		selectedBooking: null,
		newEvent: false,
		googleCalendars: [],
		googleCalendarEvents: []
	}),

	computed: {
		...mapState({
			upcomingBookings: state => state.bookings.upcoming,
			bookings: state => state.bookings.index
		}),

		calendarAttributes() {
			let attributes = [];
			this.bookings.forEach(booking => {
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
		}
	},

	watch: {
		view: function() {
			this.$refs.toggleViewBtn.blur();
		}
	},

	created() {
		//this.selectedDate = dayjs().toDate();
		this.getUpcomingBookings();
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
	},

	mounted() {
		this.getGoogleCalendarEvents();
	},

	methods: {
		...mapActions({
			getUpcomingBookings: 'bookings/getUpcomingBookings',
			getGoogleCalendars: 'bookings/getGoogleCalendars'
		}),

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
			this.googleCalendarEvents = response.data;
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
			this.selectedBooking = event.booking;
			if (this.view == 'day') {
				this.$refs.dayView.newEventDate = {};
			} else if (this.view == 'week') {
				this.$refs.weekView.newEventDate = {};
			}
			this.newEvent = false;
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
