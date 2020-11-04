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
import ChevronLeftIcon from '../../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../../icons/chevron-right';
import dayjs from 'dayjs';
import VuePaginate from 'vue-paginate';
import tooltip from '../../../../../js/directives/tooltip.js';
import Axios from 'axios';
Vue.use(VuePaginate);
const convertTime = require('convert-time');
Vue.component('pagination', require('laravel-vue-pagination'));
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/IsSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);

export default {
	components: { Modal, VueFormValidate, VueCheckbox, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, ToggleSwitch, Timerangepicker, ArrowLeftIcon, MoreIcon, ChevronLeftIcon, ChevronRightIcon },

	directives: { tooltip },

	data: () => ({
		service: null,
		selectedService: null,
		clonedService: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		newBreaktime: null,
		newHoliday: null,
		serviceDetailsTab: 'availability',
		selectedDay: '',
		paginate: ['bookings'],
		assigningMember: false,
		convertTime: convertTime,
		timeslotsLoading: false,
		timeslots: [],
		selectedCoachId: null,
		activeUserBgPosition: 0,
		startDate: dayjs().toDate(),
		selectedTimeslot: null,
		dayjs: dayjs
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
		},

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
		},

		selectedCoachId: function(value) {
			this.$nextTick(() => {
				let activeUser = document.querySelector('.user-container.active');
				if (activeUser) {
					this.activeUserBgPosition = activeUser.offsetTop + 1;
				}
			});
		},

		'selectedService.id': function(value) {
			this.getTimeslots();
		},

		startDate: function(value) {
			this.getTimeslots();
		}
	},

	created() {
		this.selectedCoachId = this.$root.auth.id;
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
			assignBookingToMember: 'bookings/assignToMember',
			assignService: 'members/store_service',
			deleteService: 'services/delete'
		}),

		removeAssignedService(assignedService, index) {
			this.deleteService(assignedService);
			this.service.assigned_services.splice(index, 1);
			this.selectedService = this.service;
			this.selectedCoachId = this.$root.auth.id;
		},

		updateBooking(selectedTimeslot) {
			let timeslot = this.timeslots[selectedTimeslot.dayName][selectedTimeslot.index];
			console.log(timeslot);
			if (timeslot) {
				console.log(dayjs(timeslot.date).format('dddd'));
				timeslot.bookings = [];
			}
			this.$refs['bookingModal'].hide();
		},

		viewTimeslotBookings(timeslot, dayName, index) {
			if (timeslot.bookings && timeslot.bookings.length > 0) {
				let selectedTimeslot = JSON.parse(JSON.stringify(timeslot));
				selectedTimeslot.bookings[0].start = dayjs(`${selectedTimeslot.bookings[0].date} ${selectedTimeslot.bookings[0].start}`).toDate();
				selectedTimeslot.index = index;
				selectedTimeslot.dayName = dayName;
				this.selectedTimeslot = selectedTimeslot;
				this.$refs['bookingModal'].show();
			}
		},

		async addMember(member) {
			let data = Object.assign({}, member);
			data.service_id = this.service.id;
			let assignedService = await this.assignService(data);
			this.service.assigned_services.push(assignedService);
		},

		previousWeek() {
			let previousWeek = dayjs(this.startDate).subtract(7, 'day');
			this.startDate = previousWeek.toDate();
		},

		nextWeek() {
			this.startDate = dayjs(this.startDate)
				.add(7, 'day')
				.toDate();
		},

		async getTimeslots() {
			if (this.selectedService) {
				this.timeslotsLoading = true;
				let response = await axios.get(`/services/${this.selectedService.id}?date=${dayjs(this.startDate).format('YYYY-MM-DD')}`);
				this.timeslots = response.data.timeslots;
				this.timeslotsLoading = false;
			}
		},

		async getData() {
			let service = await this.getService(`${this.$route.params.id}`);
			this.$root.contentloading = false;
			this.service = service;
			this.selectedService = service;
			this.timeslots = service.timeslots;
			this.clonedService = Object.assign({}, service);
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
