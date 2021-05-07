import { mapState, mapActions } from 'vuex';
import { VCalendar } from 'vuetify/lib';
import vuetify from '../../../js/plugins/vuetify';
import dayjs from 'dayjs';
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
import GoogleIcon from '../../../icons/google.vue';
dayjs.extend(IsSameOrAfter);
export default {
	vuetify,
	props: {
		date: {
			type: Date,
			required: true
		},

		selectedBooking: {
			type: Object
		},

		googleCalendarEvents: {
			type: Array
		},

		contactBookings: {
			type: Array
		}
	},

	components: {
		VCalendar,
		GoogleIcon
	},

	data: () => ({
		dayjs: dayjs,
		newEvent: null
	}),

	watch: {
		date: function(value) {
			this.getBookings({ date: dayjs(value).format('YYYY-MM-DD'), commit: false });
		}
	},

	computed: {
		...mapState({
			bookings: state => state.bookings.index
		}),

		isPrevious() {
			return dayjs().isSameOrAfter(dayjs(this.date));
		},

		parsedBookings() {
			let parsedBookings = [];
			this.bookings.forEach(booking => {
				let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == booking.id) {
					color = 'bg-primary text-white';
				}
				parsedBookings.push({
					booking: booking,
					name: (booking.service || booking.booking_link).name,
					start: `${booking.date} ${booking.start}`,
					end: `${booking.date} ${booking.end}`,
					category: 'bookings',
					color: color
				});
			});

			this.contactBookings.forEach(booking => {
				let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == booking.id) {
					color = 'bg-primary text-white';
				}
				parsedBookings.push({
					booking: booking,
					name: (booking.service || booking.booking_link).name,
					start: `${booking.date} ${booking.start}`,
					end: `${booking.date} ${booking.end}`,
					category: 'bookings',
					type: 'contact-booking',
					color: color
				});
			});
			this.googleCalendarEvents.forEach(event => {
				let color = 'bg-red-200 hover:bg-red-400 hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == event.id) {
					color = 'bg-red-600 text-white';
				}
				event.type = 'google-event';
				let start = this.dayjs(event.start.date || event.start.dateTime);
				let end = this.dayjs(event.end.date || event.end.dateTime);
				let diffInHours = end.diff(start, 'hour');
				if (diffInHours >= 24) {
					end = start.add(24, 'hour').subtract(1, 'second');
				}
				start = start.format('YYYY-MM-DD HH:mm');
				end = end.format('YYYY-MM-DD HH:mm');
				event.startDate = start;
				event.endDate = end;
				let dayEvent = {
					booking: event,
					name: event.summary,
					type: 'google-event',
					start: start,
					end: end,
					category: 'bookings',
					color: color
				};
				parsedBookings.push(dayEvent);
			});

			return parsedBookings;
		}
	},

	created() {
		this.getBookings({ date: dayjs(this.date).format('YYYY-MM-DD'), commit: false });
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index'
		}),
		intervalFormat(interval) {
			return interval.time;
		},

		eventClick(event) {
			if (!event.event.newEvent) {
				this.$emit('eventClick', event.event);
				this.newEvent = null;
			}
		},

		setNewEvent(interval) {
			let end = dayjs(`${interval.date} ${interval.time}`)
				.add(1, 'hour')
				.format('HH:mm');
			this.newEvent = { date: interval.date, start: interval.time, end: end };
			this.$emit('newEvent', JSON.parse(JSON.stringify(this.newEvent)));
		}
	}
};
