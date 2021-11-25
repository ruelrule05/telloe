import dayjs from 'dayjs';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import VCalendar from 'v-calendar';
import { mapState, mapActions } from 'vuex';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import MoreIcon from '../../../icons/more';
import VueButton from '../../../components/vue-button.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import ShortcutIcon from '../../../icons/shortcut';
import PlusIcon from '../../../icons/plus';
import Add from './add/add.vue';
import Paginate from '../../../components/paginate/paginate.vue';
export default {
	components: {
		VCalendar,
		Modal,
		VueFormValidate,
		MoreIcon,
		VueButton,
		VueSelect,
		ShortcutIcon,
		PlusIcon,
		Add,
		Paginate
	},

	data: () => ({
		selectedBooking: null,
		selectedDate: null,
		selectedTimeslot: null,
		selectAttribute: {
			highlight: {
				fillMode: 'solid',
				contentClass: 'bg-primary'
			}
		},
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		step: 1,
		error: '',
		dayjs: dayjs,
		serviceMembers: [],
		timeslots: [],
		bookingModalLoading: false,
		services: []
	}),

	computed: {
		...mapState({
			ready: state => state.bookings.ready,
			bookings: state => state.bookings.paginated
		}),

		formattedHolidays() {
			let formattedHolidays = [];
			if (this.selectedBooking.service) {
				this.selectedBooking.service.holidays.forEach(holiday => {
					let parts = holiday.split('-');
					const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
					formattedHolidays.push(holidayDate);
				});

				let disabledDays = [];
				this.days.forEach((day, index) => {
					index++;
					if (!this.selectedBooking.service.days[day].isOpen) disabledDays.push(index);
				});
				if (disabledDays.length > 0) {
					formattedHolidays.push({
						weekdays: disabledDays
					});
				}
			}
			return formattedHolidays;
		},

		nextDisabled() {
			let disabled = true;
			switch (this.step) {
				case 1:
					if (this.selectedDate) disabled = false;
					break;

				case 2:
					if (this.selectedTimeslot) disabled = false;
					break;
			}

			return disabled;
		},

		buttonText() {
			let buttonText = 'Next';
			switch (this.step) {
				case 1:
					buttonText = 'Select time';
					break;

				case 2:
					buttonText = 'Update';
					break;
			}

			return buttonText;
		},

		availableTimeslots() {
			return this.timeslots.filter(timeslot => timeslot.is_available);
		}
	},

	watch: {
		ready: function (value) {
			this.$root.contentloading = !value;
		},

		selectedDate: function (value) {
			if (value) this.error = null;
			this.getTimeslots();
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		//this.getBookings({ paginate: true });
		this.getServices();
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index',
			updateBooking: 'bookings/update',
			deleteBooking: 'bookings/delete'
		}),

		async getServices() {
			let response = await window.axios.get('/services/contact_services');
			this.services = response.data;
		},

		async confirmDeleteBooking(booking) {
			await this.deleteBooking(booking);
		},

		async getData() {
			//this.getBookings({ page: page, paginate: true });
		},

		async updateSelectedBooking(selectedBooking) {
			this.bookingModalLoading = true;
			selectedBooking = JSON.parse(JSON.stringify(selectedBooking));
			selectedBooking.date = dayjs(selectedBooking.date).format('YYYY-MM-DD');
			selectedBooking.start = dayjs(selectedBooking.start).format('HH:mm');
			let updatedBooking = await this.updateBooking(selectedBooking).catch(() => {});
			if (updatedBooking) {
				this.$refs['bookingModal'].hide();
			}
			this.bookingModalLoading = false;
		},

		editBooking(booking) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			selectedBooking.start = dayjs(`${selectedBooking.date} ${selectedBooking.start}`).toDate();
			selectedBooking.isPrevious = dayjs(new Date()).isSameOrAfter(dayjs(selectedBooking.start));
			this.selectedBooking = selectedBooking;
			this.getSelectedBookingNewTimeslots(booking, selectedBooking.date);
			this.$refs['bookingModal'].show();
		},

		async getSelectedBookingNewTimeslots(booking, date) {
			let response = await window.axios.get(`/services/${booking.service.id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
			this.timeslots = response.data;
		},

		resetStep() {
			this.step = 1;
			this.selectedTimeslot = this.selectedDate = null;
		},

		update(booking) {
			if (booking) {
				let data = JSON.parse(JSON.stringify(booking));
				data.date = dayjs(this.selectedDate).format('YYYY-MM-DD');
				data.start = this.selectedTimeslot.time;
				this.updateBooking(data)
					.then(() => {
						this.$refs['editModal'].hide();
					})
					.catch(e => {
						this.error = e.response.data.message;
						this.resetStep();
					});
			}
		},

		nextStep() {
			if (!this.nextDisabled) this.step++;
		},

		getTimeslots() {
			if (this.selectedBooking && this.selectedDate) {
				this.selectedTimeslot = null;
				let dateFormat = dayjs(this.selectedDate).format('YYYY-MM-DD');
				window.axios.get(`/@${this.selectedBooking.service.user.username}/${this.selectedBooking.service.id}/timeslots?date=${dateFormat}`).then(response => {
					let timeslots = response.data;
					if (this.selectedBooking.date == dateFormat) {
						let parts = this.selectedBooking.start.split(':');
						let label = dayjs().hour(parts[0]).minute(parts[1]).format('hh:mmA');
						let timeslot = {
							label: label,
							time: this.selectedBooking.start
						};
						if (timeslot.label.length == 6) timeslot.label = `0${timeslot.label}`;
						this.selectedTimeslot = timeslot;
						timeslots.push(timeslot);
					}
					timeslots = timeslots.sort((a, b) => {
						return a.time > b.time ? 1 : -1;
					});
					this.$set(this.selectedBooking.service, 'timeslots', timeslots);
				});
			}
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		formatTime(time) {
			let parts = time.split(':');
			let date = dayjs().set('hour', parts[0]).set('minute', parts[1]);
			return date.format('hh:mmA');
		},

		destroy(booking) {
			if (booking) {
				this.$refs['deleteModal'].hide();
				window.axios.delete(`/dashboard/bookings/${booking.id}`);
				this.$delete(
					this.bookings,
					this.bookings.findIndex(x => x.id == booking.id)
				);
			}
		}
	}
};
