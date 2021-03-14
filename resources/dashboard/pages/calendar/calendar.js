import { mapState, mapActions } from 'vuex';
import UpcomingBookings from '../../components/UpcomingBookings/UpcomingBookings.vue';
import DayView from '../../components/DayView/DayView.vue';
import WeekView from '../../components/WeekView/WeekView.vue';
import Booking from '../../components/Booking/Booking.vue';
import Vue from 'vue';
import VCalendar from 'v-calendar';
import ArrowLeftIcon from '../../../icons/arrow-left.vue';
import ArrowRightIcon from '../../../icons/arrow-right.vue';
Vue.use(VCalendar);
const dayjs = require('dayjs');
export default {
	components: { UpcomingBookings, DayView, WeekView, ArrowLeftIcon, ArrowRightIcon, Booking },

	data: () => ({
		dayjs: dayjs,
		selectedDate: null,
		view: 'week',
		selectedBooking: null,
		newEvent: false
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
					dot: {
						color: 'red'
					},
					customData: 'booking',
					dates: bookingDate
				});
			});

			this.$root.auth.google_calendar_events.forEach(event => {
				let eventDate = this.dayjs(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
				attributes.push({
					dot: {
						color: 'red'
					},
					customData: 'google-event',
					dates: eventDate
				});
			});

			this.$root.auth.outlook_calendar_events.forEach(event => {
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
		//this.selectedDate = dayjs().toDate(); // for testing
		this.getUpcomingBookings();
	},

	methods: {
		...mapActions({
			getUpcomingBookings: 'bookings/getUpcomingBookings'
		}),

		toggleView() {
			this.view = this.view == 'week' ? 'day' : 'week';
		},

		countBookings(attributes) {
			let count;
			attributes.forEach(attr => {
				if (attr.customData == 'booking') {
					if (!count) count = 0;
					count++;
				}
			});
			return count;
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
			this.$refs.weekView.newEventDate = {};
			this.newEvent = false;
		},

		newEventClick(newEvent) {
			this.selectedBooking = newEvent;
			this.newEvent = true;
		},

		bookingClosed() {
			this.$refs.weekView.newEvent = null;
			this.selectedBooking = null;
		},

		newBookingChange(newBooking) {
			this.$refs.weekView.newEvent.date = newBooking.date;
			this.$refs.weekView.newEvent.start = newBooking.start;
			this.$refs.weekView.newEvent.end = newBooking.end;
		}
	}
};
