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
				text: now.format('D MMM ddd'),
				value: now.format('YYYY-MM-DD'),
				day: now.format('dddd'),
				today: true
			});
			let i = 1;
			while (i <= 5) {
				upcomingDays.push({
					text: now.add(i, 'day').format('D MMM ddd'),
					value: now.add(i, 'day').format('YYYY-MM-DD'),
					day: now.add(i, 'day').format('dddd')
				});
				i++;
			}
			return upcomingDays;
		}
	},

	created() {},

	methods: {
		dayBookings(date) {
			let allBookings = [];
			let now = dayjs(date).format('YYYY-MM-DD');

			// fetch day bookings
			let dayBookings = this.bookings.filter(booking => booking.date == date);
			dayBookings.map(function (value) {
				allBookings.push({ startTime: dayjs(value.start).format('HH:mm'), endTime: dayjs(value.end).format('HH:mm'), title: value.name, integration: 'telloe' });
			});

			// fetch google bookings
			let googleBookingsList = this.googleCalendarEvents.filter(googleEventBooking => googleEventBooking.status == 'confirmed' && dayjs(googleEventBooking.start.dateTime).format('YYYY-MM-DD') == now && !googleEventBooking.id.includes('telloebooking'));
			googleBookingsList.map(function (value) {
				allBookings.push({ startTime: dayjs(value.start.dateTime).format('HH:mm'), endTime: dayjs(value.end.dateTime).format('HH:mm'), title: value.summary, integration: 'google' });
			});

			// fetch outlook bookings
			let outlookBookings = this.outlookCalendarEvents.filter(outlookEventBooking => {
				let start = timezoneTime.get(dayjs(outlookEventBooking.start.dateTime).format('YYYY-MM-DD HH:mm'), outlookEventBooking.start.timeZone, this.timezone, 'YYYY-MM-DD HH:mm');
				outlookEventBooking.startTime = dayjs(start).format('HH:mm');
				outlookEventBooking.endTime = timezoneTime.get(dayjs(outlookEventBooking.end.dateTime).format('YYYY-MM-DD HH:mm'), outlookEventBooking.end.timeZone, this.timezone, 'HH:mm');
				return dayjs(start).format('YYYY-MM-DD') == now;
			});
			outlookBookings.map(function (value) {
				console.log(value.endTime);
				allBookings.push({ startTime: value.startTime, endTime: value.endTime, title: value.subject, integration: 'outlook' });
			});

			allBookings.sort((a, b) => {
				return a.startTime.localeCompare(b.startTime);
			});

			return allBookings;
		},

		googleBookings(date) {
			let now = dayjs(date).format('YYYY-MM-DD');
			let googleBookingsList = this.googleCalendarEvents.filter(googleEventBooking => dayjs(googleEventBooking.start.dateTime).format('YYYY-MM-DD') == now && !googleEventBooking.id.includes('telloebooking'));
			return googleBookingsList;
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
