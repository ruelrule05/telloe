import dayjs from 'dayjs';
import ChevronDownIcon from '../../icons/chevron-down';
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
		}
	},
	components: {
		ChevronDownIcon,
		VueSelect,
		VueTimepicker
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
	},

	computed: {
		startHourRange() {
			let hourRange = [0];
			let time_end = dayjs(`1990-09-23 ${this.time_end}`).subtract(1, 'minute');
			hourRange.push(time_end.get('hour'));
			return hourRange;
		},

		startMinuteRange() {
			let minuteRange = [0];
			let time_start = dayjs(`1990-09-23 ${this.time_start}`);
			let time_end = dayjs(`1990-09-23 ${this.time_end}`);
			if (time_start.get('hour') == time_end.get('hour')) {
				minuteRange.push(time_end.get('minute') - 1);
			} else {
				minuteRange.push(60);
			}
			return minuteRange;
		},

		endHourRange() {
			let hourRange = [];
			let time_start = dayjs(`1990-09-23 ${this.time_start}`).add(1, 'minute');
			let hour = time_start.get('hour');
			hourRange.push(hour);
			hourRange.push(24 - hour);
			return hourRange;
		},

		endMinuteRange() {
			let minuteRange = [];
			let time_start = dayjs(`1990-09-23 ${this.time_start}`);
			let time_end = dayjs(`1990-09-23 ${this.time_end}`);
			let minuteRangeDiff = 0;
			if (time_start.get('hour') == time_end.get('hour')) {
				minuteRangeDiff = time_start.get('minute') + 1;
				minuteRange.push(minuteRangeDiff);
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
		setTimeRanges() {
			if (this.start) this.time_start = convertTime(this.start, 'HH:mm A');
			if (this.end) this.time_end = convertTime(this.end, 'HH:mm A');
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		emitChange() {
			let data = { start: convertTime(this.time_start, 'hh:mm'), end: convertTime(this.time_end, 'hh:mm') };
			this.$emit('change', data);
		}
	}
};
