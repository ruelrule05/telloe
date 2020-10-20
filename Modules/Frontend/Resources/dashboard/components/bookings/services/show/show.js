import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
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
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import MoreIcon from '../../../../../icons/more';
import dayjs from 'dayjs';
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);
const convertTime = require('convert-time');
Vue.component('pagination', require('laravel-vue-pagination'));

export default {
	components: { Modal, VueFormValidate, VueCheckbox, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, ToggleSwitch, Timerangepicker, ArrowLeftIcon, MoreIcon },
	data: () => ({
		page: 1,
		service: null,
		clonedService: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		newBreaktime: null,
		newHoliday: null,
		serviceDetailsTab: 'availability',
		selectedDay: '',
		paginate: ['bookings'],
		assigningMember: false,
		convertTime: convertTime
	}),

	computed: {
		...mapState({
			members: state => state.members.index
		}),

		formattedHolidays() {
			let formattedHolidays = [];
			if (this.service) {
				this.service.holidays.forEach(holiday => {
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
		service: function(value) {
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
		this.getData();
		this.getMembers();
	},

	mounted() {},

	methods: {
		...mapActions({
			getService: 'services/show',
			updateService: 'services/update',
			deleteService: 'services/delete',
			getMembers: 'members/index',
			assignBookingToMember: 'bookings/assignToMember'
		}),

		getData() {
			this.getService(`${this.$route.params.id}?page=${this.page}`).then(service => {
				this.$root.contentloading = false;
				this.service = service;
				this.clonedService = Object.assign({}, service);
			});
		},

		getResults(page) {
			this.page = page;
			this.getData();
		},

		async assignMember(booking, member = null) {
			if (member) {
				let parentService = member.assigned_services.find(x => x.parent_service_id == this.service.id);
				if (parentService) {
					booking.service_id = parentService.id;
					booking.service.user = member;
					this.assignBookingToMember(booking);
				}
			} else {
				booking.service_id = this.service.id;
				booking.service.user = this.$root.auth;
				this.assignBookingToMember(booking);
			}
		},

		applyBreaktimeToAll() {
			if (this.service && this.selectedDay) {
				this.$refs['applyBreaktimeToAllModal'].hide();
				this.$toasted.show('Breaktimes has been applied to all days successfully.');
				Object.keys(this.service.days).forEach(key => {
					if (key != this.selectedDay) {
						this.service.days[key].breaktimes = this.service.days[this.selectedDay].breaktimes;
					}
				});
				this.updateService(this.service);
			}
		},

		removeHoliday(index) {
			this.$delete(this.service.holidays, index);
			this.updateService(this.service);
		},

		addHoliday() {
			if (this.newHoliday && this.newHoliday.date) {
				if (!this.service.holidays) this.$set(this.service, 'holidays', []);
				const formattedDate = dayjs(this.newHoliday.date).format('YYYY-MM-DD');
				this.service.holidays.push(formattedDate);
				this.newHoliday = null;
				this.updateService(this.service);
			}
		},

		removeBreaktime(index, day) {
			this.$delete(this.service.days[day].breaktimes, index);
			this.updateService(this.service);
		},

		updateBreaktime(time, index, day) {
			this.service.days[day].breaktimes[index].start = time.start.time;
			this.service.days[day].breaktimes[index].end = time.end.time;
			this.updateService(this.service);
		},

		updateNewBreaktime(time, day) {
			this.$set(this.newBreaktime, 'start', (time.start || {}).time);
			this.$set(this.newBreaktime, 'end', (time.end || {}).time);
			if (this.newBreaktime.start && this.newBreaktime.end) {
				if (!this.service.days[day].breaktimes) this.$set(this.service.days[day], 'breaktimes', []);
				this.service.days[day].breaktimes.push(this.newBreaktime);
				this.newBreaktime = null;
				this.updateService(this.service);
			}
		},

		updateAvailableHours(time, day) {
			if (this.service) {
				this.$set(this.service.days[day], 'start', time.start.time);
				this.$set(this.service.days[day], 'end', time.end.time);
				this.updateService(this.service);
			}
		},

		submit() {
			this.updateService(this.clonedService).then(service => {
				Object.keys(service).map(key => {
					this.service[key] = service[key];
				});
			});
			this.$refs['editModal'].hide();
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};
