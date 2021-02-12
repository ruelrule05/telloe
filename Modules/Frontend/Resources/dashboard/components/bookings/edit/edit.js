import Vue from 'vue';
import { mapActions } from 'vuex';
import ClockIcon from '../../../../icons/clock';
import CloseIcon from '../../../../icons/close';
import tooltip from '../../../../js/directives/tooltip.js';
import ChevronLeftIcon from '../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../icons/chevron-right';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import MapMarkerIcon from '../../../../icons/map-marker';
import CheckmarkIcon from '../../../../icons/checkmark';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
import dayjs from 'dayjs';
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import VCalendar from 'v-calendar';
import Toasted from 'vue-toasted';
Vue.use(VCalendar);
Vue.use(Toasted, {
	position: 'bottom-center',
	duration: 3000,
	className: 'bg-primary rounded shadow-none'
});
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import MoreIcon from '../../../../icons/more-h';
import VueFormValidate from '../../../../components/vue-form-validate';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import Modal from '../../../../components/modal/modal.vue';
import jstz from 'jstz';
const timezone = jstz.determine();

export default {
	components: { ClockIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, MapMarkerIcon, CheckmarkIcon, ToggleSwitch, MoreIcon, VueFormValidate, VueSelect, CheckmarkCircleIcon, Modal },
	directives: { tooltip },

	props: {
		booking: {
			type: Object
		}
	},

	data: () => ({
		selectedService: null,
		open: true,
		opacity: 1,
		startDate: null,
		selectedTimeslots: [],
		selectedTimeslot: null,
		authError: '',
		error: null,
		masks: {
			input: 'MMM D, YYYY'
		},
		timeslotsLoading: false,
		timeslots: [],
		dayjs: dayjs,
		recurringFrequencies: [
			{
				text: 'Week',
				value: 'week'
			},
			{
				text: 'Month',
				value: 'month'
			}
		],
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		bookings: [],
		continueButton: false,
		selectedCoachId: null,
		activeUserBgPosition: 0,
		assignedServices: [],
		getAssignedServices: true,
		createZoomLoading: false
	}),

	computed: {
		tabDates() {
			let tabDates = [];
			let i = 7;
			let startDate = dayjs(this.startDate);
			while (i > 0) {
				tabDates.push({
					name: startDate.format('ddd'),
					dayName: startDate.format('dddd'),
					date: startDate.toDate(),
					label: startDate.format('MMM DD'),
					format: startDate.format('YYYY-MM-DD')
				});
				startDate = startDate.add(1, 'day');
				i--;
			}

			return tabDates;
		},

		isPrevious() {
			let start = dayjs(`${this.booking.date} ${this.booking.start}`).toDate();
			return dayjs(new Date()).isSameOrAfter(dayjs(start));
		}
	},

	watch: {
		booking: function(value) {
			if (value) {
				this.startDate = dayjs(value.date).toDate();
				this.selectedService = value.service;
				this.selectedTimeslot = { date: value.date, time: value.start, service_id: value.service_id };
			}
		},

		selectedCoachId: function() {
			this.$nextTick(() => {
				let activeUser = document.querySelector('#edit .user-container.active');
				if (activeUser) {
					this.activeUserBgPosition = activeUser.offsetTop;
				}
			});
			this.getServiceTimeslots();
		},

		startDate: function() {
			this.getServiceTimeslots();
		}
	},

	created() {
		this.timezone = timezone.name();
	},

	methods: {
		...mapActions({
			getService: 'services/show',
			updateBooking: 'bookings/update'
		}),

		async createZoomLink(booking) {
			this.createZoomLoading = true;
			if (this.$root.auth.zoom_token) {
				let response = await window.axios.get(`/zoom/create_meeting?booking_id=${booking.id}`);
				this.createZoomLoading = false;

				booking.zoom_link = response.data;
			}
		},

		async confirmUpdateBooking() {
			let data = this.booking;
			data.date = this.selectedTimeslot.date;
			data.start = this.selectedTimeslot.time;
			await this.$refs['bookingModal'].show();
			let booking = await this.updateBooking(data);
			setTimeout(async () => {
				await this.$refs['bookingModal'].hide();
				this.hide();
				this.$emit('update', booking);
			}, 150);
		},

		setSelectedService(service) {
			this.selectedCoachId = service.coach.id;
			this.selectedService = service;
		},

		submit() {},

		summary() {},

		previousWeek() {
			let previousWeek = dayjs(this.startDate).subtract(7, 'day');
			if (dayjs(previousWeek.format('YYYY-MM-DD')).isSameOrAfter(dayjs(dayjs().format('YYYY-MM-DD')))) {
				this.startDate = previousWeek.toDate();
			} else if (!dayjs(dayjs(this.startDate).format('YYYY-MM-DD')).isSame(dayjs(dayjs().format('YYYY-MM-DD')))) {
				this.startDate = dayjs().toDate();
			}
		},

		nextWeek() {
			this.startDate = dayjs(this.startDate)
				.add(7, 'day')
				.toDate();
		},

		timeslotClass(timeslot, date) {
			let timeslotClass = [];
			let active = false;
			if (date.format == this.selectedTimeslot.date) {
				if ((this.selectedTimeslot.time == timeslot.time || timeslot.time == this.booking.start) && this.selectedTimeslot.service_id == this.selectedService.id) {
					active = true;
				}
				if (timeslot.time == this.booking.start && this.selectedTimeslot.service_id == this.selectedService.id) {
					timeslot.is_available = true;
				}
			}
			if (timeslot.is_available || active) {
				timeslotClass.push.apply(timeslotClass, ['bg-primary', 'text-white']);
			} else if (!timeslot.is_available && !active) {
				timeslotClass.push.apply(timeslotClass, ['bg-gray-400', 'disabled']);
			}
			if (this.isPrevious) {
				timeslotClass.push.apply(timeslotClass, ['disabled']);
			} else if (timeslot.is_available) {
				timeslotClass.push.apply(timeslotClass, ['cursor-pointer']);
			}

			if (this.selectedTimeslot.service_id == this.selectedService.id && date.format == this.selectedTimeslot.date && this.selectedTimeslot.time == timeslot.time) {
				timeslotClass.push.apply(timeslotClass, ['selected']);
			}

			return timeslotClass.join(' ');
		},

		setSelectedDateAndTimeslot(date, timeslot) {
			if (!this.isPrevious && timeslot.is_available) {
				timeslot.date = date.format;
				timeslot.service_id = this.selectedService.id;
				this.selectedTimeslot = timeslot;
			}
			this.continueButton = timeslot.date != this.booking.date || timeslot.time != this.booking.start;
		},

		getTimeZoneOffset(date, timeZone) {
			// Abuse the Intl API to get a local ISO 8601 string for a given time zone.
			const options = { timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
			const dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
			const parts = dateTimeFormat.formatToParts(date);
			const map = new Map(parts.map(x => [x.type, x.value]));
			const year = map.get('year');
			const month = map.get('month');
			const day = map.get('day');
			let hour = map.get('hour');
			const minute = map.get('minute');
			const second = map.get('second');
			const ms = date
				.getMilliseconds()
				.toString()
				.padStart(3, '0');
			if (hour == '24') hour = '00';
			const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}`;
			const lie = new Date(iso + 'Z');
			return -(lie - date) / 60 / 1000;
		},

		timezoneTime(time) {
			let profileTimezone = this.selectedService.coach.timezone;
			let timezoneTime;
			if (profileTimezone != this.timezone) {
				let profileTZ = this.getTimeZoneOffset(new Date(), profileTimezone);
				let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
				let timeslotDate = `${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`;
				timezoneTime = dayjs(timeslotDate).add(profileTZ - localTZ, 'minute');
			} else {
				timezoneTime = dayjs(`${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`);
			}
			return timezoneTime.format('hh:mmA');
		},

		timezoneTooltip(timezone, timeslot) {
			return `
				<div class="text-left py-1 line-height-base">
					<div class="mb-2"><div>${timezone}</div><div><strong>${timeslot.label}</strong></div></div>
					<div>${this.timezone}</div><div><strong>${this.timezoneTime(timeslot.time)}</strong></div>
				</div>
			`;
		},

		async getServiceTimeslots() {
			if (this.selectedService) {
				this.timeslotsLoading = true;
				let service = await this.getService({ service_id: this.selectedService.id, params: { date: dayjs(this.startDate).format('YYYY-MM-DD') } });
				if (this.getAssignedServices) {
					this.assignedServices = service.assigned_services;
					this.getAssignedServices = false;
				}
				this.timeslots = service.timeslots;
				this.timeslotsLoading = false;
			}
		},

		reset() {
			this.startDate = dayjs().toDate();
			this.selectedService = null;
			this.selectedTimeslots = [];
		},

		show() {
			this.open = true;
			setTimeout(() => {
				this.opacity = 1;
			}, 50);
		},

		hide() {
			this.opacity = 0;
			this.$emit('hide');
			setTimeout(() => {
				this.open = false;
				this.reset();
			}, 100);
		}
	}
};
