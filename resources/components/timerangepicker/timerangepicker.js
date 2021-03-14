import dayjs from 'dayjs';
import ChevronDownIcon from '../../icons/chevron-down';
import VueSelect from '../vue-select/vue-select.vue';
import VueTimepicker from 'vue2-timepicker';
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
		start: function(value) {
			this.time_start = value;
		},
		end: function() {
			this.setTimeRanges();
		}
	},

	computed: {
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
			if (this.start) this.time_start = this.startTimeValue(this.start);
			if (this.end) this.time_end = this.endTimeValue(this.end);
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		emitChange() {
			this.$emit('change', { start: this.time_start, end: this.time_end });
		},

		startTimeValue(value) {
			let time_start = this.startHours.find(x => x.value == value);
			if (!time_start) {
				value = dayjs(`0000-00-00 ${value}`).format('HH:mmA');
			}
			return value;
		},

		endTimeValue(value) {
			let time_end = this.endHours.find(x => x.value == value);
			if (!time_end) {
				value = dayjs(`0000-00-00 ${value}`).format('HH:mmA');
			}
			return value;
		}
	}
};
