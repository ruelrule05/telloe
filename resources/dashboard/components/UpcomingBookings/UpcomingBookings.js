import dayjs from 'dayjs';
import convertTime from '../../../js/plugins/convert-time';

export default {
	props: {
		loading: {
			type: Boolean,
			required: true
		},

		bookings: {
			type: Array,
			required: true
		},

		googleCalendarEvents: {
			type: Array,
			required: true
		},

		timezone: {
			type: String
		}
	},

	data: () => ({
		convertTime: convertTime
	}),

	computed: {
		days() {
			let upcomingDays = [];
			let now = dayjs();
			upcomingDays.push({
				text: now.add(1, 'day').format('D MMM ddd'),
				value: now.add(1, 'day').format('YYYY-MM-DD'),
				day: now.add(1, 'day').format('dddd')
			});
			upcomingDays.push({
				text: now.format('D MMM ddd'),
				value: now.format('YYYY-MM-DD'),
				day: now.format('dddd'),
				today: true
			});
			let i = 1;
			while (i <= 5) {
				upcomingDays.push({
					text: now.subtract(i, 'day').format('D MMM ddd'),
					value: now.subtract(i, 'day').format('YYYY-MM-DD'),
					day: now.subtract(i, 'day').format('dddd')
				});
				i++;
			}
			return upcomingDays;
		}
	},

	created() {},

	methods: {
		dayBookings(date) {
			let dayBookings = this.bookings.filter(booking => booking.date == date);

			return dayBookings;
		},

		googleBookings(date) {
			let now = dayjs(date).format('YYYY-MM-DD');

			console.log(now);
			console.log(this.googleCalendarEvents);

			return this.googleCalendarEvents.filter(googleEventBooking => dayjs(googleEventBooking.start.dateTime).format('YYYY-MM-DD') == now);
		}
	}
};
