import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';
import VCalendar from 'v-calendar';
Vue.use(VCalendar);
import ToggleSwitch from '../../../../../../components/toggle-switch/toggle-switch.vue';
import VueFormValidate from '../../../../../../components/vue-form-validate';
import VueButton from '../../../../../../components/vue-button';
import VueCheckbox from '../../../../../../components/vue-checkbox/vue-checkbox.vue';
import Modal from '../../../../../../components/modal/modal.vue';
import PlusIcon from '../../../../../../icons/plus';
import TrashIcon from '../../../../../../icons/trash';
import PencilIcon from '../../../../../../icons/pencil';
import CheckmarkCircleIcon from '../../../../../../icons/checkmark-circle';
import ChevronLeftIcon from '../../../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../../../icons/chevron-right';
import CalendarMonthIcon from '../../../../../../icons/calendar-month';
export default {
	components: {
		ToggleSwitch,
		VueFormValidate,
		VueButton,
		VueCheckbox,
		Modal,
		PlusIcon,
		TrashIcon,
		PencilIcon,
		CheckmarkCircleIcon,
		CalendarMonthIcon,
		ChevronLeftIcon,
		ChevronRightIcon
	},

	props: {
		conversation: {
			type: Object,
			required: true
		},
		membersLength: {
			type: Number,
			default: 0
		},
		blacklisted_services: {
			type: Array,
			default: []
		}
	},

	data: () => ({
		ready: false,
		user: null,
		selectedService: null,
		selectedBooking: null,
		selectedDate: null,
		dateForWeekView: null,
		selectedTimeslot: '',
		timeslots: [],
		timeslotsLoading: false,
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		timeslotDropdown: false,
		customTime: false,
		error: '',
		selectAttribute: {
			highlight: {
				fillMode: 'solid',
				contentClass: 'bg-blue'
			}
		},
		loading: false,
		calendarView: 'month',
		sliderNavIndex: 0,
		sliderTranslate: 0,
		bookingCreated: false,
		addingBooking: false,
		showExpiredBookings: true
	}),

	watch: {
		selectedDate: function(value) {
			if (value && this.selectedService) this.getTimeslots(this.selectedService.id, value);
		},
		conversation: function(value) {
			this.ready = false;
			this.getBookings(value).then(() => {
				this.ready = true;
			});
		}
	},

	computed: {
		...mapState({
			bookingsReady: state => state.bookings.ready,
			bookings: state => state.bookings.index
		}),

		userBookings() {
			//let now = dayjs();
			let bookings = [];
			this.bookings.forEach(booking => {
				let parts = booking.date.split('-');
				booking.new_date = new Date(parts[0], parts[1] - 1, parts[2]);
				/*if (now.isAfter(dayjs(`${booking.date} ${booking.start}`))) {
                    this.$set(booking, 'is_expired', true);
                }*/
				bookings.push(booking);
			});
			bookings.sort((a, b) => b.date.localeCompare(a.date));

			return bookings;
		},

		formattedHolidays() {
			let formattedHolidays = [];
			if (this.selectedService) {
				let service = this.conversation.user.services.find(x => x.id == this.selectedService.id);
				if (service) {
					service.holidays.forEach(holiday => {
						let parts = holiday.split('-');
						const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
						formattedHolidays.push(holidayDate);
					});

					let disabledDays = [];
					this.days.forEach((day, index) => {
						index++;
						if (!service.days[day].isOpen) disabledDays.push(index);
					});
					if (disabledDays.length > 0) {
						formattedHolidays.push({
							weekdays: disabledDays
						});
					}
				}
			}
			return formattedHolidays;
		},

		availableServices() {
			let availableServices = [];
			(this.conversation.user.services || []).forEach(service => {
				if (service.is_available && (this.$root.auth.id == service.user_id || !this.blacklisted_services.find(x => x.service_id == service.id && x.is_blacklisted))) {
					availableServices.push(service);
				}
			});
			return availableServices;
		},

		weekDayOptions() {
			let options = [];

			let dateForWeekView = dayjs();
			// if(this.dateForWeekView) dateForWeekView = dayjs(this.dateForWeekView);
			//let daysBefore = [];
			let daysAfter = [];
			for (var i = 1; i <= 15; i++) {
				//let before = dateForWeekView.subtract(i, 'day');
				let after = dateForWeekView.add(i, 'day');
				/*daysBefore.unshift({
                    date: before.toDate(),
                    title: before.format('ddd'),
                    description: before.format('D MMM'),
                    label: before.format('YYYY-MM-DD'),
                    id: before.format('MMMDYYYY'),
                });*/
				daysAfter.push({
					date: after.toDate(),
					title: after.format('ddd'),
					description: after.format('D MMM'),
					label: after.format('YYYY-MM-DD'),
					id: after.format('MMMDYYYY')
				});
			}
			dateForWeekView = {
				date: dateForWeekView.toDate(),
				title: dateForWeekView.format('ddd'),
				description: dateForWeekView.format('D MMM'),
				label: dateForWeekView.format('YYYY-MM-DD'),
				id: dateForWeekView.format('MMMDYYYY')
			};
			options = [...[dateForWeekView], ...daysAfter];

			return options;
		}
	},

	created() {
		this.getBookings(this.conversation).then(() => {
			this.ready = true;
		});
	},

	mounted() {
		$(this.$refs['newBookingDropdown']).on('hidden.bs.dropdown', () => {
			this.resetBookingForm();
		});
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index',
			storeBooking: 'bookings/store',
			updateBooking: 'bookings/update',
			deleteBooking: 'bookings/delete',
			storeUserBlacklistedService: 'user_blacklisted_services/store'
		}),

		disabledDate(date) {
			if (!this.selectedService) return false;
			let dayName = dayjs(date.date).format('dddd');
			return !this.selectedService.days[dayName].isOpen || this.selectedService.holidays.find(x => x == date.label);
		},

		calcSliderTranslate() {
			if (this.$refs['weekday-slider'] && this.calendarView == 'week') {
				let date = this.selectedDate || new Date();
				let dateID = dayjs(date).format('MMMDYYYY');
				let sliderItem = this.$refs['weekday-slider'].querySelector(`#${dateID}`);
				let sliderSize = 95;
				if (sliderItem) {
					let index = Array.from(this.$refs['weekday-slider'].children).indexOf(sliderItem);
					if (index > -1) {
						index = index ? index - 1 : 1;
						this.sliderTranslate = sliderSize * index * -1;
					}
				}
			}
		},

		adjustSlider(step) {
			/* eslint-disable */
			let weekdaySlider = this.$refs['weekday-slider'];

			let translateX = new WebKitCSSMatrix(weekdaySlider.style.webkitTransform).m41 - 95;
			if ((step == -1 && translateX < -95) || (step == 1 && translateX > 95 * 29 * -1)) {
				this.sliderNavIndex += step;
			}
		},

		dateSelected(date) {
			if (date && this.calendarView == 'month') {
				this.selectedDate = date;
				this.dateForWeekView = date;
				this.calendarView = 'week';
				this.sliderNavIndex = 0;
				this.selectedTimeslot = null;
				this.$nextTick(() => {
					this.calcSliderTranslate();
				});
			}
		},

		isServiceBlacklisted(service) {
			return (this.blacklisted_services.find(x => x.service_id == service.id) || {}).is_blacklisted;
		},

		selectService(service) {
			if (!this.isServiceBlacklisted(service) && (this.selectedService || {}).id != service.id) {
				this.selectedService = service;
				this.calendarView = 'month';
				this.selectedBooking = null;
				this.addingBooking = true;
				this.$nextTick(() => {
					this.$parent.$refs['info-container'].scrollTop = 0;
				});
			}
		},

		resetBookingForm() {
			this.selectedBooking = null;
			this.selectedService = null;
			this.selectedTimeslot = null;
			this.newDateSelected = null;
			this.timeslots = [];
			this.timeslotsLoading = false;
			this.loading = false;
			this.bookingCreated = false;
			this.error = '';
			this.addingBooking = false;
			this.sliderNavIndex = 0;
		},

		submit() {
			if (this.selectedBooking) {
				this.update(this.selectedBooking);
			} else {
				this.store();
			}
		},

		getTimeZoneOffset(date, timeZone) {
			// Abuse the Intl API to get a local ISO 8601 string for a given time zone.
			const options = { timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
			const dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
			const parts = dateTimeFormat.formatToParts(date);
			const map = new Map(parts.map(x => [x.type, x.value]));
			const year = map.get('year');
			const month = map.get('month');
			const day = map.get('day');
			let hour = map.get('hour');
			const minute = map.get('minute');
			const second = map.get('second');
			const ms = date
				.getMilliseconds()
				.toString()
				.padStart(3, '0');
			if (hour == '24') hour = '00';
			const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}`;

			// Lie to the Date object constructor that it's a UTC time.
			const lie = new Date(iso + 'Z');

			// Return the difference in timestamps, as minutes
			// Positive values are West of GMT, opposite of ISO 8601
			// this matches the output of `Date.getTimeZoneOffset`
			return -(lie - date) / 60 / 1000;
		},

		timezoneTime(timeZone, target_timeZone, time) {
			let localTZ = this.getTimeZoneOffset(new Date(), timeZone);
			let targetTZ = this.getTimeZoneOffset(new Date(), target_timeZone);
			let parts = time.split(':');
			let timezoneTime = dayjs()
				.hour(parts[0])
				.minute(parts[1])
				.add(localTZ - targetTZ, 'minute');
			return timezoneTime.format('hh:mmA');
		},

		edit(booking) {
			if (booking && booking.id != (this.selectedBooking || {}).id) {
				this.selectedBooking = booking;
				this.selectedService = booking.service;
				this.getTimeslots(booking.service_id, booking.date);
				let parts = booking.date.split('-');
				this.calendarView = 'month';
				this.$set(this.selectedBooking, 'date_object', new Date(parts[0], parts[1] - 1, parts[2]));
				this.$nextTick(() => {
					this.$parent.$refs['info-container'].scrollTop = 0;
				});
			}
		},

		getTimeslots(service_id = '', date = '') {
			if (service_id && date) {
				this.timeslotsLoading = true;
				let service = this.conversation.user.services.find(x => x.id == service_id);
				if (service) {
					this.timeslots = [];
					this.selectedTimeslot = null;
					let dateFormat = dayjs(date).format('YYYY-MM-DD');
					window.axios.get(`/@${this.conversation.user.username}/${service_id}/timeslots?date=${dateFormat}&single=true`).then(response => {
						let timeslots = response.data;
						if (this.selectedBooking && dayjs(this.selectedBooking.date).format('YYYY-MM-DD') == dateFormat) {
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
						this.timeslots = timeslots;
						this.timeslotsLoading = false;
					});
				}
			}
		},

		update(booking) {
			if (this.selectedService && this.selectedTimeslot) {
				this.loading = true;
				let formatDate = dayjs(this.selectedDate).format('YYYY-MM-DD');
				let data = {
					id: booking.id,
					date: formatDate,
					start: this.selectedTimeslot.time
				};
				this.updateBooking(data)
					.then(() => {
						this.bookingCreated = true;
					})
					.catch(e => {
						this.loading = false;
						this.error = e.response.data.message;
					});
			}
		},

		store() {
			if (this.selectedService && this.selectedDate && this.selectedTimeslot) {
				this.loading = true;
				let formatDate = dayjs(this.selectedDate).format('YYYY-MM-DD');
				let data = {
					date: formatDate,
					start: this.selectedTimeslot.time,
					user_id: this.conversation.member.id,
					contact_id: (this.conversation.member.contact || {}).id,
					service_id: this.selectedService.id
				};
				this.storeBooking(data)
					.then(() => {
						this.bookingCreated = true;
					})
					.catch(e => {
						this.loading = false;
						this.error = e.response.data.message;
					});
			}
		},

		formatTime(time) {
			let parts = time.split(':');
			let formatTime = dayjs()
				.hour(parts[0])
				.minute(parts[1])
				.format('hh:mmA');
			return formatTime;
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		toDate(string) {
			return dayjs(string);
		}
	}
};
