/* global AUTH */
/* global BOOKING_LINK */
require('../js/bootstrap');

import dayjs from 'dayjs';
import jstz from 'jstz';
import tooltip from '../js/directives/tooltip.js';
const timezone = jstz.determine();
import CheckmarkIcon from '../icons/checkmark';
import echo from '../js/echo.js';
import { debounce } from 'throttle-debounce';
import VueSelect from '../components/vue-select/vue-select.vue';
export default {
	components: { CheckmarkIcon, VueSelect },

	directives: { tooltip },

	data: () => ({
		auth: AUTH,
		bookingLink: BOOKING_LINK,
		echo: echo,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		selectedTimeslots: [],
		timezone: '',
		channel: null,
		users: {},
		highlighterWidth: 0,
		debounceFunc: null,
		selectedDate: null,
		currentTarget: null
	}),

	computed: {
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
		this.channel.leaving(user => {
			let highlighter = document.querySelector(`.highlighter[data-id="${user.id}"]`);
			if (highlighter) {
				highlighter.style.left = '-100%';
			}
		});
		this.channel.listenForWhisper('move', data => {
			if (data.selectedDate == this.selectedDate) {
				this.highlighterWidth = `${document.querySelector('.timeslot-button').offsetWidth}px`;
				data.user.left = `${document.querySelector('.timeslot-button[data-index="' + data.index + '"]').offsetLeft}px`;
				this.$set(this.users, data.user.id, data.user);
			} else {
				data.user.left = '-100%';
			}
			this.$set(this.users, data.user.id, data.user);
		});
		this.debounceFunc = debounce(350, false, e => {
			this.currentTarget = e.target;
			this.channel.whisper('move', {
				user: this.auth,
				index: e.target.dataset.index,
				selectedDate: this.selectedDate
			});
		});

		this.selectedDate = Object.keys(this.bookingLink.dates)[0];
	},

	mounted() {
		this.highlighterWidth = `${document.querySelector('.timeslot-button').offsetWidth}px`;
	},

	methods: {
		showHighlight(e) {
			let x = `${e.target.offsetLeft}px`;
			this.$refs['highlighter'].style.left = x;
			this.debounceFunc(e);
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
