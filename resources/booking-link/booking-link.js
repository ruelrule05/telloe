/* global AUTH */
/* global BOOKING_LINK */
/* global IN_EMAILS */
require('../js/bootstrap');

import dayjs from 'dayjs';
import jstz from 'jstz';
const timezone = jstz.determine();
import CheckmarkIcon from '../icons/checkmark';
import echo from '../js/echo.js';
import VueSelect from '../components/vue-select/vue-select.vue';
import Modal from '../components/modal/modal.vue';
import VueFormValidate from '../components/vue-form-validate.vue';
import MoreIcon from '../icons/more';
import VueCheckbox from '../components/vue-checkbox/vue-checkbox.vue';
import Chatroom from '../dashboard/pages/booking-links/chatroom/chatroom.vue';

export default {
	components: { CheckmarkIcon, VueSelect, Modal, VueFormValidate, MoreIcon, VueCheckbox, Chatroom },

	data: () => ({
		auth: AUTH,
		bookingLink: BOOKING_LINK,
		in_emails: IN_EMAILS,
		echo: echo,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		selectedTimeslots: [],
		timezone: '',
		channel: null,
		users: {},
		highlighterWidth: 0,
		debounceFunc: null,
		selectedDate: null,
		currentTarget: null,
		email: '',
		loginForm: {
			password: ''
		},
		signupForm: {
			firstName: '',
			lastName: '',
			password: ''
		},
		authAction: 'login',
		hoveredTimeslot: null,
		dayjs: dayjs
	}),

	computed: {
		timeslotStatusText() {
			let status = 'Suggest';
			if (this.hoveredTimeslot && this.bookingLink.dates[this.selectedDate].timeslots.find(x => x.time == this.hoveredTimeslot.time && x.isSuggested)) {
				status = 'Unsuggest';
			}
			return status;
		},
		dateOptions() {
			let dateOptions = [];
			if (this.bookingLink) {
				Object.keys(this.bookingLink.dates).forEach(key => {
					dateOptions.push({
						text: this.formatDate(key),
						value: key
					});
				});
			}
			return dateOptions;
		}
	},

	watch: {
		selectedDate: function() {
			if (this.currentTarget) {
				this.channel.whisper('move', {
					user: this.auth,
					index: this.currentTarget.dataset.index,
					selectedDate: this.selectedDate
				});
			}
		}
	},

	created() {
		this.timezone = timezone.name();
		this.channel = this.echo.join(`bookingLinks.${this.bookingLink.id}`);

		this.channel.listenForWhisper('selectedTimeslots', data => {
			if (data.selectedDate == this.selectedDate) {
				this.bookingLink.dates[data.selectedDate].selectedTimeslots = data.selectedTimeslots;
			}
		});

		this.selectedDate = Object.keys(this.bookingLink.dates)[0];

		if (this.in_emails) {
			let url = new URL(window.location.href);
			this.email = url.searchParams.get('email');
		}
	},

	mounted() {
		if (this.in_emails) {
			this.$refs['loginModal'].show();
		}
	},

	methods: {
		async toggleTimeslot(state, timeslot) {
			this.$set(timeslot, 'is_suggested', state);
			this.channel.whisper('suggestTimeslot', {
				userId: this.auth.id,
				timeslot: timeslot,
				is_suggested: state
			});
		},

		login() {
			this.$refs['loginModal'].hide();
		},

		register() {
			this.$refs['loginModal'].hide();
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		timezoneTime(timezone, time) {
			let timezoneTime;
			if (timezone != this.timezone) {
				let profileTZ = this.getTimeZoneOffset(new Date(), timezone);
				let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
				let timeslotDate = `${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`;
				timezoneTime = dayjs(timeslotDate).add(profileTZ - localTZ, 'minute');
			} else {
				timezoneTime = dayjs(`${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`);
			}
			return timezoneTime.format('h:mm A');
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
		}
	}
};
