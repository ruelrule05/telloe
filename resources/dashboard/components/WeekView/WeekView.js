import { mapState, mapActions } from 'vuex';
import { VCalendar } from 'vuetify/lib';
import vuetify from '../../../js/plugins/vuetify';
import dayjs from 'dayjs';
export default {
	vuetify,
	props: {
		date: {
			type: Date,
			required: true
		},

		selectedBooking: {
			type: Object
		}
	},

	components: {
		VCalendar
	},

	data: () => ({
		dayjs: dayjs,
		newEvent: null
	}),

	watch: {
		date: function() {
			this.$nextTick(() => {
				this.getWeekBookings();
			});
		}
	},

	computed: {
		...mapState({
			bookings: state => state.bookings.index
		}),

		parsedBookings() {
			let parsedBookings = this.bookings.map(booking => {
				let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == booking.id) {
					color = 'bg-primary text-white';
				}
				return {
					booking: booking,
					name: booking.service.name,
					start: `${booking.date} ${booking.start}`,
					end: `${booking.date} ${booking.end}`,
					category: 'bookings',
					color: color
				};
			});
			if (this.newEvent) {
				parsedBookings.push({
					newEvent: true,
					name: 'New Event',
					start: `${this.newEvent.date} ${this.newEvent.start}`,
					end: `${this.newEvent.date} ${this.newEvent.end}`,
					color: 'bg-gray-200'
				});
			}

			return parsedBookings;
		}
	},

	created() {},

	mounted() {
		this.getWeekBookings();
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index'
		}),

		getWeekBookings() {
			this.getBookings({
				from: this.$refs.calendar.lastStart.date,
				to: this.$refs.calendar.lastEnd.date
			});
		},

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
