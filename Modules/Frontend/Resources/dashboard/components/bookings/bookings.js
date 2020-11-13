import dayjs from 'dayjs';
import VCalendar from 'v-calendar';
import { mapState, mapActions } from 'vuex';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import MoreHIcon from '../../../icons/more-h';
export default {
	components: {
		VCalendar,
		Modal,
		VueFormValidate,
		MoreHIcon
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
		error: ''
	}),

	computed: {
		...mapState({
			ready: state => state.bookings.ready,
			bookings: state => state.bookings.index
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
		}
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		},

		selectedDate: function(value) {
			if (value) this.error = null;
			this.getTimeslots();
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getBookings();
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index',
			updateBooking: 'bookings/update'
		}),

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

		formatDate(date) {
			let formatDate = '';
			if (date) formatDate = dayjs(date).format('MMMM DD, YYYY');
			return formatDate;
		},

		nextStep() {
			if (!this.nextDisabled) this.step++;
		},

		edit(booking) {
			if (booking) {
				let parts = booking.date.split('-');
				const date_object = new Date(parts[0], parts[1] - 1, parts[2]);
				this.selectedBooking = booking;
				this.selectedDate = date_object;
				this.$refs['editModal'].show();
			}
		},

		getTimeslots() {
			if (this.selectedBooking && this.selectedDate) {
				this.selectedTimeslot = null;
				let dateFormat = dayjs(this.selectedDate).format('YYYY-MM-DD');
				axios.get(`/@${this.selectedBooking.service.user.username}/${this.selectedBooking.service.id}/timeslots?date=${dateFormat}`).then(response => {
					let timeslots = response.data;
					if (this.selectedBooking.date == dateFormat) {
						let parts = this.selectedBooking.start.split(':');
						let label = dayjs()
							.hour(parts[0])
							.minute(parts[1])
							.format('hh:mmA');
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
			let date = dayjs()
				.set('hour', parts[0])
				.set('minute', parts[1]);
			return date.format('hh:mmA');
		},

		destroy(booking) {
			if (booking) {
				this.$refs['deleteModal'].hide();
				axios.delete(`/dashboard/bookings/${booking.id}`);
				this.$delete(
					this.bookings,
					this.bookings.findIndex(x => x.id == booking.id)
				);
			}
		}
	}
};
