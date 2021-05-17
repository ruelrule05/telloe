import dayjs from 'dayjs';
export default {
	props: {
		bookings: {
			type: Array,
			required: true
		}
	},

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

	methods: {
		dayBookings(date) {
			return this.bookings.filter(booking => booking.date == date);
		}
	}
};