import { mapState, mapActions } from 'vuex';
import { VCalendar } from 'vuetify/lib';
import vuetify from '../../../js/plugins/vuetify';
import dayjs from 'dayjs';
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
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
			return this.bookings.map(booking => {
				let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == booking.id) {
					color = 'bg-primary text-white';
				}
				return {
					booking: booking,
					name: (booking.service || booking.booking_link).name,
					start: `${booking.date} ${booking.start}`,
					end: `${booking.date} ${booking.end}`,
					category: 'bookings',
					color: color
				};
			});
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
