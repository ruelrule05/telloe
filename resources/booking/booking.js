/* global BOOKING */
import dayjs from 'dayjs';
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';
import CalendarIcon from '../icons/calendar.vue';
import VueCheckbox from '../components/vue-checkbox/vue-checkbox.vue';
import convertTime from '../js/plugins/convert-time';
import Timerangepicker from '../components/timerangepicker/timerangepicker.vue';
import Modal from '../components/modal/modal.vue';
import WarningIcon from '../icons/warning.vue';
import jstz from 'jstz';
const timezone = jstz.determine();
import timezoneTime from '../js/helpers/TimezoneTime.js';

export default {
	components: { VDatePicker, CalendarIcon, VueCheckbox, Timerangepicker, Modal, WarningIcon },

	data: () => ({
		booking: null,
		dayjs: dayjs,
		masks: {
			input: 'MMMM D, YYYY'
		},
		selectFromTimeslots: false,
		timeslots: [],
		selectedTimeslot: {},
		convertTime: convertTime,
		changed: false,
		timezone: ''
	}),

	watch: {
		'booking.date': function() {
			this.getTimeslots();
		}
	},

	created() {
		this.timezone = timezone.name();
		let booking = BOOKING;
		booking.start = timezoneTime.get(`${booking.date} ${booking.start}`, booking.timezone, this.timezone);
		booking.end = timezoneTime.get(`${booking.date} ${booking.end}`, booking.timezone, this.timezone);
		this.booking = booking;
		this.getTimeslots();
	},

	methods: {
		confirmDeleteBooking() {
			window.axios.delete(`/bookings/${this.booking.id}`);
			window.location.href = '/';
		},

		confirmDelete() {
			this.$refs.deleteModal.show();
		},

		async update() {
			let newData = JSON.parse(JSON.stringify(this.booking));
			newData.date = dayjs(newData.date).format('YYYY-MM-DD');

			newData.start = timezoneTime.get(`${newData.date} ${newData.start}`, this.timezone, newData.timezone);
			newData.end = timezoneTime.get(`${newData.date} ${newData.end}`, this.timezone, newData.timezone);

			await window.axios.put(`/bookings/${this.booking.id}`, newData);
			this.$toast.open('Booking updated successfully.');
		},

		updateTime(time) {
			this.booking.start = convertTime(time.start, 'hh:mm');
			this.booking.end = convertTime(time.end, 'hh:mm');
			this.changed = true;
		},

		async getTimeslots() {
			let response = await window.axios.get(`/booking-links/get_all_timeslots?date=${dayjs(this.booking.date).format('YYYY-MM-DD')}`);
			this.timeslots = response.data;
		},
		setBookingDate(date) {
			this.booking.date = dayjs(date).format('YYYY-MM-DD');
			this.changed = true;
		},
		timeslotTime(timeslot) {
			return `<span class="text-sm font-bold text-body block -mb-1">${timeslot.label.replace('AM', '').replace('PM', '')}</span><span class="text-sm text-muted uppercase">${timeslot.label.slice(-2)}</span>`;
		},

		selectTimeslot(timeslot) {
			this.selectedTimeslot = timeslot;
			this.booking.start = timeslot.time;
			let startDate = dayjs(dayjs(this.booking.date).format('YYYY-MM-DD') + ' ' + timeslot.time);
			let endTime = dayjs(startDate)
				.add(this.booking.service.duration, 'minute')
				.format('HH:mm');
			this.booking.end = endTime;
			this.changed = true;
		}
	}
};
