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
import UserCircleIcon from '../../../../../icons/user-circle';
import DollarSignIcon from '../../../../../icons/dollar-sign';
import WindowPlusIcon from '../../../../../icons/window-plus';
import MoreIcon from '../../../../../icons/more-h';
import SkypeIcon from '../../../../../icons/skype';
import PhoneIcon from '../../../../../icons/phone';
import VCalendar from 'v-calendar';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import dayjs from 'dayjs';
Vue.use(VCalendar);
import tooltip from '../../../../../js/directives/tooltip.js';
export default {
	components: { Modal, VueFormValidate, VueCheckbox, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, UserCircleIcon, ToggleSwitch, Timerangepicker, DollarSignIcon, WindowPlusIcon, MoreIcon, SkypeIcon, PhoneIcon, VueSelect },

	directives: { tooltip },

	data: () => ({
		newService: {},
		selectedService: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		newBreaktime: null,
		serviceDetailsTab: 'availability',
		selectedDay: '',
		clonedService: null,
		currencies: [
			{
				text: 'AUD',
				value: 'AUD'
			},
			{
				text: 'USD',
				value: 'USD'
			},
			{
				text: 'PHP',
				value: 'PHP'
			},
			{
				text: 'CHF',
				value: 'CHF'
			},
			{
				text: 'EUR',
				value: 'EUR'
			},
			{
				text: 'CAD',
				value: 'CAD'
			},
			{
				text: 'GBP',
				value: 'GBP'
			},
			{
				text: 'NZD',
				value: 'NZD'
			}
		],
		newHoliday: {
			dates: []
		},
		dayjs: dayjs
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
		}
		// selectedService: function() {
		// 	if (this.$root.intros.add_service.enabled) {
		// 		setTimeout(() => {
		// 			if (!document.querySelector('.introjs-overlay')) {
		// 				this.$root.introJS.start().goToStepNumber(this.$root.intros.add_service.step);
		// 			}
		// 		}, 500);
		// 	}
		// }
	},

	created() {
		this.getServices();
		this.$root.contentloading = !this.ready;
	},

	mounted() {
		if (this.$root.intros.services_index.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.intros.services_index.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeService: 'services/store',
			updateService: 'services/update',
			deleteService: 'services/delete'
		}),

		goToBookingPage(service) {
			window.open(`/@${service.user.username}/${service.id}`);
		},

		addHolidayDate(date) {
			let existingIndex = this.selectedService.holidays.findIndex(x => x == date);
			if (existingIndex == -1) {
				let index = this.newHoliday.dates.findIndex(x => x == date);
				if (index > -1) {
					this.newHoliday.dates.splice(index, 1);
				} else {
					this.newHoliday.dates.push(date);
				}
			}
		},

		addHolidays() {
			if (this.newHoliday.dates.length > 0) {
				if (!this.selectedService.holidays) this.$set(this.selectedService, 'holidays', []);
				this.newHoliday.dates.forEach(date => {
					this.selectedService.holidays.push(date);
				});
				this.updateService(this.selectedService);
				this.newHoliday.dates = [];
			}
		},

		updateServiceStatus(state, service) {
			// if (state) {
			// 	service.in_widget = true;
			// }
			this.updateService(service);
		},

		update() {
			this.updateService(this.clonedService).then(service => {
				Object.keys(service).map(key => {
					this.services[this.clonedService.index][key] = service[key];
				});
			});
			this.$refs['editModal'].hide();
		},

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
