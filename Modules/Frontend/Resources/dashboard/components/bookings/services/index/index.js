import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Modal from '../../../../../components/modal/modal.vue';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import Timerangepicker from '../../../../../components/timerangepicker/timerangepicker.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../../components/vue-checkbox/vue-checkbox.vue';
import PencilIcon from '../../../../../icons/pencil';
import ChevronDownIcon from '../../../../../icons/chevron-down';
import PlusIcon from '../../../../../icons/plus';
import CogIcon from '../../../../../icons/cog';
import TrashIcon from '../../../../../icons/trash';
import ClockIcon from '../../../../../icons/clock';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
Vue.use(VCalendar);
export default {
	components: { Modal, VueFormValidate, VueCheckbox, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, ToggleSwitch, Timerangepicker },
	data: () => ({
		newService: {},
		selectedService: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		newBreaktime: null,
		newHoliday: null,
		serviceDetailsTab: 'availability',
		selectedDay: ''
	}),

	computed: {
		...mapState({
			ready: state => state.services.ready,
			services: state => state.services.index
		}),

		formattedHolidays() {
			let formattedHolidays = [];
			if (this.selectedService) {
				this.selectedService.holidays.forEach(holiday => {
					let parts = holiday.split('-');
					const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
					formattedHolidays.push(holidayDate);
				});
			}
			return formattedHolidays;
		}
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		},
		selectedService: function(value) {
			if (this.$root.intros.add_service.enabled) {
				setTimeout(() => {
					if (!document.querySelector('.introjs-overlay')) {
						this.$root.introJS.start().goToStepNumber(this.$root.intros.add_service.step);
					}
				}, 500);
			}
		}
	},

	created() {
		this.getServices();
		this.$root.contentloading = !this.ready;
		/*this.services.push({
			id: 1, 
			name: 'Test service', 
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat blandit lorem, volutpat molestie nulla pulvinar vel.', 
			days: days,
		});
		this.selectedService = this.services[0];*/
	},

	mounted() {},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeService: 'services/store',
			updateService: 'services/update',
			deleteService: 'services/delete'
		}),

		applyBreaktimeToAll() {
			if (this.selectedService && this.selectedDay) {
				this.$refs['applyBreaktimeToAllModal'].hide();
				this.$toasted.show('Breaktimes has been applied to all days successfully.');
				Object.keys(this.selectedService.days).forEach(key => {
					if (key != this.selectedDay) {
						this.selectedService.days[key].breaktimes = this.selectedService.days[this.selectedDay].breaktimes;
					}
				});
				this.updateService(this.selectedService);
			}
		},

		removeHoliday(index) {
			this.$delete(this.selectedService.holidays, index);
			this.updateService(this.selectedService);
		},

		addHoliday() {
			if (this.newHoliday && this.newHoliday.date) {
				if (!this.selectedService.holidays) this.$set(this.selectedService, 'holidays', []);
				const formattedDate = dayjs(this.newHoliday.date).format('YYYY-MM-DD');
				this.selectedService.holidays.push(formattedDate);
				this.newHoliday = null;
				this.updateService(this.selectedService);
			}
		},

		removeBreaktime(index, day) {
			this.$delete(this.selectedService.days[day].breaktimes, index);
			this.updateService(this.selectedService);
		},

		updateBreaktime(time, index, day) {
			this.selectedService.days[day].breaktimes[index].start = time.start.time;
			this.selectedService.days[day].breaktimes[index].end = time.end.time;
			this.updateService(this.selectedService);
		},

		updateNewBreaktime(time, day) {
			this.$set(this.newBreaktime, 'start', (time.start || {}).time);
			this.$set(this.newBreaktime, 'end', (time.end || {}).time);
			if (this.newBreaktime.start && this.newBreaktime.end) {
				if (!this.selectedService.days[day].breaktimes) this.$set(this.selectedService.days[day], 'breaktimes', []);
				this.selectedService.days[day].breaktimes.push(this.newBreaktime);
				this.newBreaktime = null;
				this.updateService(this.selectedService);
			}
		},

		updateAvailableHours(time, day) {
			if (this.selectedService) {
				this.$set(this.selectedService.days[day], 'start', time.start.time);
				this.$set(this.selectedService.days[day], 'end', time.end.time);
				this.updateService(this.selectedService);
			}
		},

		submit() {
			if (this.newService.id) {
				this.selectedService.name = this.newService.name;
				this.selectedService.description = this.newService.description;
				this.selectedService.duration = this.newService.duration;
				this.selectedService.interval = this.newService.interval;
				this.selectedService.default_rate = this.newService.default_rate;
				this.selectedService.in_widget = this.newService.in_widget;
				this.updateService(this.selectedService);
				this.$refs['editModal'].hide();
			} else {
				this.store();
			}
		},

		store() {
			let days = {};
			this.days.forEach(day => {
				let isOpen = day == 'Sunday' || day == 'Saturday' ? false : true;
				days[day] = {
					isOpen: isOpen,
					start: '08:00',
					end: '17:00'
				};
			});
			this.newService.days = days;
			if (this.newService.name && this.newService.description) {
				this.$refs['addModal'].hide();
				let data = JSON.parse(JSON.stringify(this.newService));
				this.storeService(data);
			}
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};