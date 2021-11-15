import dayjs from 'dayjs';
import convertTime from '../../../js/plugins/convert-time';
import GoogleIcon from '../../../icons/google.vue';
import OutlookIcon from '../../../icons/outlook.vue';
import timezoneTime from '../../../js/helpers/TimezoneTime.js';
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
dayjs.extend(timezone);

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

		outlookCalendarEvents: {
			type: Array,
			required: true
		},

		timezone: {
			type: String
		}
	},

	components: { GoogleIcon, OutlookIcon },

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
			return this.googleCalendarEvents.filter(googleEventBooking => dayjs(googleEventBooking.start.dateTime).format('YYYY-MM-DD') == now && !googleEventBooking.id.includes('telloebooking'));
		},

		outlookBookings(date) {
			let now = dayjs(date).format('YYYY-MM-DD');

			return this.outlookCalendarEvents.filter(outlookEventBooking => {
				let start = timezoneTime.get(dayjs(outlookEventBooking.start.dateTime).format('YYYY-MM-DD HH:mm'), outlookEventBooking.start.timeZone, this.timezone, 'YYYY-MM-DD HH:mm');
				outlookEventBooking.startTime = dayjs(start).format('hh:mmA');
				outlookEventBooking.endTime = timezoneTime.get(dayjs(outlookEventBooking.end.dateTime).format('YYYY-MM-DD HH:mm'), outlookEventBooking.end.timeZone, this.timezone, 'hh:mmA');
				return dayjs(start).format('YYYY-MM-DD') == now;
			});
		}
	}
};
