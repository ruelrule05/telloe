import Vue from 'vue';
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
		auth: {
			type: Boolean,
			default: false
		},
		contactID: {
			type: Number,
			default: 0
		},
		services: {
			type: Array,
			default: []
		}
	},

	data: () => ({
		selectedService: null,
		open: false,
		opacity: 0,
		startDate: null,
		selectedTimeslots: [],
		selectedTimeslot: false,
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
		bookingSuccess: false,
		bookings: []
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
		}
	},

	watch: {
		'selectedService.id': function() {
			this.getServiceTimeslots();
		},

		startDate: function(value) {
			if (value) this.error = null;
			this.authError = '';
			this.getServiceTimeslots();
		}
	},

	created() {
		this.timezone = timezone.name();
		this.startDate = dayjs().toDate();
	},

	methods: {
		formatTime(time) {
			let parts = time.split(':');
			let formatTime = dayjs()
				.hour(parts[0])
				.minute(parts[1])
				.format('hh:mmA');
			return formatTime;
		},

		submit() {
			let service = this.assignedService || this.selectedService;
			if (service && this.selectedTimeslots.length > 0) {
				this.$refs['bookingModal'].show().then(() => {
					this.isBooking = true;
					let data = {
						timeslots: this.selectedTimeslots
					};
					let target = null;
					if (this.auth) {
						target = 'auth=true';
					} else if (this.contactID) {
						target = `contact_id=${this.contactID}`;
					}
					if (target) {
						let url = `/@${service.user.username}/${service.id}/login_and_book?${target}`;
						window.axios
							.post(url, data, { toast: true })
							.then(response => {
								this.bookingSuccess = true;
								this.authForm = false;
								this.selectedTimeslots = [];
								this.bookings = response.data;
							})
							.catch(() => {
								setTimeout(() => {
									this.$refs['bookingModal'].hide().then(() => {
										this.isBooking = false;
									});
								}, 150);
							});
					}
				});
			}
		},

		daysInMonth(timeslot) {
			return [
				{
					text: `First ${timeslot.date.dayName} of the month`,
					value: 'first_week'
				},
				{
					text: `Second ${timeslot.date.dayName} of the month`,
					value: 'second_week'
				},
				{
					text: `Third ${timeslot.date.dayName} of the month`,
					value: 'third_week'
				},
				{
					text: `Last ${timeslot.date.dayName} of the month`,
					value: 'last_week'
				}
			];
		},

		setTimeslotDefaultDay(frequency, timeslot) {
			if (frequency == 'week') {
				let dayIndex = this.days.indexOf(timeslot.date.dayName);
				let index = timeslot.days.indexOf(dayIndex);
				if (index == -1 || timeslot.days.length == 1) {
					timeslot.days.push(dayIndex);
				}
			} else if (frequency == 'month') {
				timeslot.day_in_month = 'first_week';
			}
		},

		timeslotToggleDay(timeslot, dayIndex) {
			let index = timeslot.days.indexOf(dayIndex);
			if (index == -1) {
				timeslot.days.push(dayIndex);
			} else {
				timeslot.days.splice(index, 1);
			}

			if (timeslot.days.length == 0) {
				let dayIndex = this.days.indexOf(timeslot.date.dayName);
				timeslot.days.push(dayIndex);
			}
		},

		endTime(time) {
			let endTime = '';
			if (this.selectedService && this.startDate) {
				let startDate = dayjs(dayjs(this.startDate).format('YYYY-MM-DD') + ' ' + time);
				endTime = dayjs(startDate)
					.add(this.selectedService.duration, 'minute')
					.format('hh:mmA');
			}
			return endTime;
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		summary() {
			if (this.selectedTimeslots.length > 0) {
				this.selectedTimeslot = true;
			}
		},

		setSelectedDateAndTimeslot(date, timeslot) {
			if (timeslot.is_available) {
				// this.selectedDate = date.date;
				// this.selectedTimeslot = timeslot;
				let index = this.selectedTimeslots.findIndex(x => x.date.dayName == date.dayName && x.timeslot.time == timeslot.time);
				if (index > -1) {
					this.selectedTimeslots.splice(index, 1);
				} else {
					this.selectedTimeslots.push({
						date: date,
						timeslot: timeslot,
						days: []
					});
				}
			}
		},

		reset() {
			this.startDate = dayjs().toDate();
			this.selectedService = null;
			this.selectedTimeslots = [];
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
				this.selectedTimeslot = null;
				let response = await window.axios.get(`${window.location.origin}/ajax/@${this.selectedService.coach.username}/${this.selectedService.id}/timeslots?date=${dayjs(this.startDate).format('YYYY-MM-DD')}`, { ajax: false });
				this.timeslots = response.data;
				this.timeslotsLoading = false;
			}
		},
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
