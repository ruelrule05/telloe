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
		dayjs: dayjs
	}),

	watch: {
		date: function(value) {
			this.getBookings({ date: dayjs(value).format('YYYY-MM-DD') });
		}
	},

	computed: {
		...mapState({
			bookings: state => state.bookings.index
		}),

		parsedBookings() {
			return this.bookings.map(booking => {
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
		}
	},

	created() {
		this.getBookings({ date: dayjs(this.date).format('YYYY-MM-DD') });
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index'
		}),
		intervalFormat(interval) {
			return interval.time;
		},

		eventClick(event) {
			this.$emit('eventClick', event.event);
		}
	}
};
