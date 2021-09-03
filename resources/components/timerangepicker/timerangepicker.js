import dayjs from 'dayjs';
import ChevronDownIcon from '../../icons/chevron-down';
import ClockIcon from '../../icons/clock';
import VueSelect from '../vue-select/vue-select.vue';
import VueTimepicker from 'vue2-timepicker';
import convertTime from '../../js/plugins/convert-time';
export default {
	props: {
		start: {
			type: String,
			default: null
		},
		end: {
			type: String,
			default: null
		},
		noLabel: {
			type: Boolean,
			default: false
		},
		hideClearButton: {
			type: Boolean,
			default: false
		},
		dropdownWFull: {
			type: Boolean,
			default: false
		},
		vertical: {
			type: Boolean,
			default: false
		},
		clockIcon: {
			type: Boolean,
			default: false
		}
	},
	components: {
		ChevronDownIcon,
		VueSelect,
		VueTimepicker,
		ClockIcon
	},
	data: () => ({
		time_start: null,
		time_end: null
	}),

	watch: {
		start: function() {
			this.setTimeRanges();
		},
		end: function() {
			this.setTimeRanges();
		}
		// time_start: function(value) {
		// 	let start = value;
		// 	let parts = start.split(':');
		// 	let period = start.slice(-2).toLowerCase();
		// 	if (period == 'pm' && parts[0] < 12) {
		// 		parts[0] = parseInt(parts[0]) + 12;
		// 	}
		// 	start = parseInt(parts[0] * 60) + parseInt(parts[1]);
		// 	if (start <= 1380) {
		// 		start += 60;
		// 	}
		// 	let hh = Math.floor(start / 60);
		// 	let mm = start % 60;
		// 	let timeslot = convertTime(('' + (hh == 12 ? 12 : hh)).slice(-2) + ':' + ('0' + mm).slice(-2)).toUpperCase();
		// 	this.time_end = timeslot;
		// }
	},

	computed: {
		startHourRange() {
			let hourRange = [0];
			if (this.time_end && typeof this.time_end == 'string') {
				let time_end = dayjs(`1990-09-23 ${this.time_end}`).subtract(1, 'minute');
				hourRange.push(time_end.get('hour'));
			} else {
				hourRange.push(24);
			}
			return hourRange;
		},

		startMinuteRange() {
			let minuteRange = [0];
			if (this.time_start && this.time_end && typeof this.time_start == 'string' && typeof this.time_end == 'string') {
				let time_start = dayjs(`1990-09-23 ${this.time_start}`);
				let time_end = dayjs(`1990-09-23 ${this.time_end}`);
				if (time_start.get('hour') == time_end.get('hour')) {
					minuteRange.push(time_end.get('minute') - 1);
				} else {
					minuteRange.push(60);
				}
			} else {
				minuteRange.push(60);
			}
			return minuteRange;
		},

		endHourRange() {
			let hourRange = [];
			if (this.time_start && typeof this.time_start == 'string') {
				let time_start = dayjs(`1990-09-23 ${this.time_start}`).add(1, 'minute');
				let hour = time_start.get('hour');
				hourRange.push(hour);
				hourRange.push(24);
			} else {
				hourRange.push(0);
				hourRange.push(24);
			}
			return hourRange;
		},

		endMinuteRange() {
			let minuteRange = [];
			if (this.time_start && this.time_end && typeof this.time_start == 'string' && typeof this.time_end == 'string') {
				let time_start = dayjs(`1990-09-23 ${this.time_start}`);
				let time_end = dayjs(`1990-09-23 ${this.time_end}`);
				let minuteRangeDiff = 0;
				if (time_start.get('hour') == time_end.get('hour')) {
					minuteRangeDiff = time_start.get('minute') + 1;
					minuteRange.push(minuteRangeDiff);
				} else {
					minuteRange.push(0);
				}
			} else {
				minuteRange.push(0);
			}
			minuteRange.push(60);
			return minuteRange;
		},

		hours() {
			let now = dayjs();
			now = now.hour(0).minute(0);
			let hours = [];
			for (let i = 0; i < 24; i++) {
				hours.push({
					time: now.format('HH:mm'),
					label: now.format('h:mmA')
				});
				hours.push({
					time: now.add(30, 'minute').format('HH:mm'),
					label: now.add(30, 'minute').format('h:mmA')
				});
				now = now.add(60, 'minute');
			}
			return hours;
		},

		startHours() {
			let startHours = [];
			this.hours.forEach(hour => {
				if (!this.time_end || hour.time < this.time_end) {
					startHours.push({
						text: hour.label,
						value: hour.time
					});
				}
			});
			return startHours;
		},

		endHours() {
			let endHours = [];
			this.hours.forEach(hour => {
				if (!this.time_start || hour.time > this.time_start) {
					endHours.push({
						text: hour.label,
						value: hour.time
					});
				}
			});
			return endHours;
		}
	},

	created() {
		this.setTimeRanges();
	},

	methods: {
		timeslots(start, add = 0) {
			if (start) {
				let parts = start.split(':');
				let period = start.slice(-2).toLowerCase();
				if (period == 'pm' && parts[0] < 12) {
					parts[0] = parseInt(parts[0]) + 12;
				}
				start = parseInt(parts[0] * 60) + parseInt(parts[1]) + add;
			} else {
				start = 0;
			}
			let timeslots = [];
			for (var i = 0; start < 24 * 60; i++) {
				let hh = Math.floor(start / 60);
				let mm = start % 60;
				let timeslot = convertTime(('' + (hh == 12 ? 12 : hh)).slice(-2) + ':' + ('0' + mm).slice(-2)).toUpperCase();
				timeslots[i] = {
					text: timeslot,
					value: timeslot
				};
				start = start + 15;
			}
			return timeslots;
		},

		setTimeRanges() {
			if (this.start) this.time_start = convertTime(this.start, 'hh:mm A');
			if (this.end) this.time_end = convertTime(this.end, 'hh:mm A');
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		emitChange() {
			let time_start = this.time_start;
			let time_end = this.time_end;

			if (time_start && typeof time_start == 'object') {
				if (time_start.A && time_start.hh && time_start.mm) {
					time_start = `${time_start.hh}:${time_start.mm} ${time_start.A}`;
				} else {
					time_start = null;
				}
			}
			if (time_end && typeof time_end == 'object') {
				if (time_end.A && time_end.hh && time_end.mm) {
					time_end = `${time_end.hh}:${time_end.mm} ${time_end.A}`;
				} else {
					time_end = null;
				}
			}

			let data = { start: time_start, end: time_end };
			this.$emit('change', data);
		}
	}
};
