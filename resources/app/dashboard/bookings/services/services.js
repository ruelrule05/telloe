import Modal from '../../../../components/modal/modal.vue';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import Timerangepicker from '../../../../components/timerangepicker/timerangepicker.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import PencilIcon from '../../../../icons/pencil';
import ChevronDownIcon from '../../../../icons/chevron-down';
import PlusIcon from '../../../../icons/plus';
import CogIcon from '../../../../icons/cog';
import TrashIcon from '../../../../icons/trash';
import ClockIcon from '../../../../icons/clock';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
window.Vue.use(VCalendar);
export default {
	components: {Modal, VueFormValidate, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, ToggleSwitch, Timerangepicker},
	data: () => ({
		ready: false,
		services: [],
		newService: {},
		selectedService: null,
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		newBreaktime: null,
		newHoliday: null,
		serviceDetailsTab: 'availability'
	}),

	computed: {
		formattedHolidays() {
			let formattedHolidays = [];
			if(this.selectedService) {
				this.selectedService.holidays.forEach((holiday) => {
    				let parts = holiday.split('-');
    				const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
					formattedHolidays.push(holidayDate);
				});
			}
			return formattedHolidays;
		}
	},

	created() {
		this.getData();
		/*this.services.push({
			id: 1, 
			name: 'Test service', 
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat blandit lorem, volutpat molestie nulla pulvinar vel.', 
			days: days,
		});
		this.selectedService = this.services[0];*/
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
		removeHoliday(index) {
			this.$delete(this.selectedService.holidays, index);
			this.update(this.selectedService);
		},

		addHoliday() {
			if(this.newHoliday && this.newHoliday.date) {
				if(!this.selectedService.holidays) this.$set(this.selectedService, 'holidays', []);
				const formattedDate = dayjs(this.newHoliday.date).format('YYYY-MM-DD');
				this.selectedService.holidays.push(formattedDate);
				this.newHoliday = null;
				this.update(this.selectedService);
			}
		},

		removeBreaktime(index, day) {
			this.$delete(this.selectedService.days[day].breaktimes, index);
			this.update(this.selectedService);
		},

		updateNewBreaktime(time, day) {
			this.$set(this.newBreaktime, 'start', (time.start || {}).time);
			this.$set(this.newBreaktime, 'end', (time.end || {}).time);
			if(this.newBreaktime.start && this.newBreaktime.end) {
				if(!this.selectedService.days[day].breaktimes) this.$set(this.selectedService.days[day], 'breaktimes', []);
				this.selectedService.days[day].breaktimes.push(this.newBreaktime);
				this.newBreaktime = null;
				this.update(this.selectedService);
			}
		},

		updateAvailableHours(time, day) {
			if(this.selectedService) {
				this.$set(this.selectedService.days[day], 'start', time.start.time);
				this.$set(this.selectedService.days[day], 'end', time.end.time);
				this.update(this.selectedService);
			}
		},

		getData() {
			axios.get('/dashboard/services').then((response) => {
				this.services = response.data;
			});
		},

		submit() {
			if(this.newService.id) {
				this.selectedService.name = this.newService.name;
				this.selectedService.description = this.newService.description;
				this.selectedService.duration = this.newService.duration;
				this.update(this.selectedService);
			} else {
				this.store();
			}
		},

		store() {
			let days = {};
			this.days.forEach((day) => {
				let isOpen = (day == 'Sunday' || day == 'Saturday') ? false : true;
				days[day] = {
					isOpen: isOpen,
					start: '08:00',
					end: '17:00',
				};
			});
			this.newService.days = days;
			if(this.newService.name && this.newService.description) {
				this.$refs['modal'].hide();
				let data = JSON.parse(JSON.stringify(this.newService));
				axios.post('/dashboard/services', data).then((response) => {
					this.services.unshift(response.data);
				});
			}
		},

		update(service) {
			if(service) {
				axios.put(`/dashboard/services/${service.id}`, service).then((response) => {
					this.$refs['modal'].hide();
					Object.assign(service, response.data);
				});
			}
		},

		destroy(service) {
			if(service) {
				axios.delete(`/dashboard/services/${service.id}`, service).then((response) => {
					this.$refs['deleteModal'].hide();
					this.$delete(this.services, this.services.findIndex((x) => x.id == service.id));
				});
			}
		},

        formatDate(date) {
            return dayjs(date).format('MMMM D, YYYY');
        },
	}
}