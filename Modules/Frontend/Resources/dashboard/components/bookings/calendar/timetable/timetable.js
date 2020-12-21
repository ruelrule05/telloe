import { mapActions } from 'vuex';
import dayjs from 'dayjs';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/IsSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import ChevronLeftIcon from '../../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../../icons/chevron-right';
const queryString = require('query-string');
import convertTime from '../../../../../js/plugins/convert-time.js';
import Modal from '../../../../../components/modal/modal.vue';
import VueButton from '../../../../../components/vue-button.vue';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import MoreIcon from '../../../../../icons/more';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import Edit from '../../edit/edit.vue';
export default {
	components: { ChevronLeftIcon, ChevronRightIcon, Modal, VueButton, VueSelect, MoreIcon, ArrowLeftIcon, Edit },
	props: {
		date: {
			required: true,
			type: Date
		}
	},

	data: () => ({
		masks: {
			input: 'MMMM D, YYYY'
		},
		timeslotsLoading: false,
		activeUserBgPosition: 0,
		bookings: [],
		selectedCoachId: null,
		convertTime: convertTime,
		selectedBooking: null,
		dayjs: dayjs,
		timeslots: [],
		bookingModalLoading: false,
		startDate: null,
		ready: false
	}),
	watch: {
		selectedCoachId: function() {
			this.$nextTick(() => {
				let activeUser = document.querySelector('.user-container.active');
				if (activeUser) {
					this.activeUserBgPosition = activeUser.offsetTop + 1;
				}
			});
		}
	},

	computed: {
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
		},

		coaches() {
			let coaches = [];
			let bookings = this.bookings;
			bookings = bookings.sort((a, b) => {
				return a.start > b.start ? 1 : -1;
			});
			bookings.forEach(booking => {
				let exists = coaches.find(x => x.email == booking.service.coach.email);
				if (!exists) {
					coaches.push(booking.service.coach);
				}
			});
			if (coaches.length > 0) {
				this.selectedCoachId = coaches[0].id;
			}
			return coaches;
		},

		filteredBookings() {
			let filteredBookings = [];

			this.bookings.forEach(booking => {
				if (booking.service.coach.id == this.selectedCoachId) {
					filteredBookings.push(booking);
				}
			});
			filteredBookings = filteredBookings.sort((a, b) => {
				return a.date > b.date ? -1 : 1;
			});
			return filteredBookings;
		},

		serviceMembers() {
			let serviceMembers = [];
			if (this.selectedBooking) {
				serviceMembers.push({
					text: this.$root.auth.full_name,
					value: this.selectedBooking.service.parent_service_id || this.selectedBooking.service.id
				});
				if (this.selectedBooking.service.parent_service) {
					this.selectedBooking.service.parent_service.assigned_services.forEach(assignedService => {
						serviceMembers.push({
							text: assignedService.coach.full_name,
							value: assignedService.id
						});
					});
				} else {
					this.selectedBooking.service.assigned_services.forEach(assignedService => {
						serviceMembers.push({
							text: assignedService.coach.full_name,
							value: assignedService.id
						});
					});
				}
			}
			return serviceMembers;
		}
	},

	created() {
		this.startDate = this.date;
		this.getDateBookings();
	},

	methods: {
		...mapActions({
			updateBooking: 'bookings/update',
			deleteBooking: 'bookings/delete'
		}),

		bookingUpdated(booking) {
			this.startDate = dayjs(booking.date).toDate();
			this.getDateBookings();
		},

		previousDay() {
			let previousDay = dayjs(this.startDate).subtract(1, 'day');
			this.startDate = previousDay.toDate();
			this.getDateBookings();
		},

		nextDay() {
			let nextDay = dayjs(this.startDate).add(1, 'day');
			this.startDate = nextDay.toDate();
			this.getDateBookings();
		},

		editBooking(booking) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			this.selectedBooking = selectedBooking;
			this.$refs['bookingModal'].show();
		},

		getDateBookings() {
			let date = dayjs(this.startDate).format('YYYY-MM-DD');
			this.getBookings({ date: date });
			window.history.replaceState(null, null, `?date=${date}`);
		},

		async updateSelectedBooking(selectedBooking) {
			this.bookingModalLoading = true;
			let booking = JSON.parse(JSON.stringify(selectedBooking));
			booking.date = dayjs(booking.date).format('YYYY-MM-DD');
			booking.start = dayjs(booking.start).format('HH:mm');
			let response = await this.updateBooking(booking).catch(() => {});
			this.bookingModalLoading = false;
			if (response) {
				this.getDateBookings();
				this.$refs['bookingModal'].hide();
			}
		},

		async getBookings(params) {
			params = queryString.stringify(params);
			let response = await window.axios.get(`/bookings?${params}`);
			let bookings = response.data;
			bookings.map(booking => {
				let start = dayjs(`${booking.date} ${booking.start}`).toDate();
				booking.isPrevious = dayjs(new Date()).isSameOrAfter(dayjs(start));
			});
			this.bookings = bookings;
		},
		viewTimeslotBookings(booking, dayName, bookingIndex) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			selectedBooking.start = dayjs(`${selectedBooking.date} ${selectedBooking.start}`).toDate();
			selectedBooking.index = bookingIndex;
			selectedBooking.dayName = dayName;
			selectedBooking.timeslots = this.timeslots[dayName];
			selectedBooking.isPrevious = dayjs(new Date()).isSameOrAfter(dayjs(selectedBooking.start));
			this.selectedBooking = selectedBooking;
			this.$refs['bookingModal'].show();
			this.getSelectedBookingNewTimeslots(booking.date);
		},

		async getSelectedBookingNewTimeslots(date) {
			date = date || this.selectedBooking.date;
			let response = await window.axios.get(`/services/${this.selectedBooking.service_id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
			this.timeslots = response.data;
		},

		filterAvailableTimeslots(timeslots) {
			if (!timeslots) return [];
			return timeslots.filter(x => x.is_available);
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};
