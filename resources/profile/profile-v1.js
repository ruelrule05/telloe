require('../js/bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/js/dist/modal';
import VCalendar from 'v-calendar';
import Toasted from 'vue-toasted';
import dayjs from 'dayjs';
Vue.use(VCalendar);
Vue.use(VueRouter);
Vue.use(Toasted, {
	position: 'bottom-center',
	duration: 3000,
	className: 'bg-primary rounded shadow-none'
});

import VueFormValidate from '../components/vue-form-validate';
import VueButton from '../components/vue-button';
import Modal from '../components/modal/modal.vue';
import ClockIcon from '../icons/clock';
import CalendarDayIcon from '../icons/calendar-day';
import InfoCircleIcon from '../icons/info-circle';
import CheckmarkIcon from '../icons/checkmark';
import ArrowLeftIcon from '../icons/arrow-left';
import CalendarMonthIcon from '../icons/calendar-month';
import ChevronLeftIcon from '../icons/chevron-left';
import ChevronRightIcon from '../icons/chevron-right';
import EarthIcon from '../icons/earth';
import CheckmarkCircleIcon from '../icons/checkmark-circle';
import FacebookIcon from '../icons/facebook';
import GoogleIcon from '../icons/google';
import UsersIcon from '../icons/users';
import CalendarIcon from '../icons/calendar';
import CoinIcon from '../icons/coin';
import PackageIcon from '../icons/package';
import jstz from 'jstz';
const timezone = jstz.determine();
import convertTime from '../js/plugins/convert-time.js';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);

export default {
	components: {
		VueFormValidate,
		Modal,
		ClockIcon,
		CalendarDayIcon,
		InfoCircleIcon,
		CheckmarkIcon,
		VueButton,
		ArrowLeftIcon,
		CalendarMonthIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
		EarthIcon,
		CheckmarkCircleIcon,
		FacebookIcon,
		GoogleIcon,
		UsersIcon,
		CalendarIcon,
		CoinIcon,
		PackageIcon
	},
	data: () => ({
		profile: PROFILE,
		auth: AUTH,
		ready: false,
		services: [],
		packages: [],
		selectedService: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		selectAttribute: {
			highlight: {
				fillMode: 'solid',
				contentClass: 'bg-primary'
			}
		},
		step: 1,
		selectedDate: null,
		selectedTimeslot: null,
		detailsConfirmed: false,
		error: 'sds',
		reviewForm: 'details',

		authError: '',
		loginForm: {
			email: '',
			password: '',
			loading: false
		},
		timeslotsLoading: false,
		dateForWeekView: null,
		calendarView: 'month',
		sliderNavIndex: 0,
		sliderTranslate: 0,
		sliderItemSize: 86,
		authForm: false, // false
		bookingSuccess: false,
		authAction: 'signup',
		GoogleAuth: null,
		timezone: '',
		assignedService: null,
		tab: 'services',
		convertTime: convertTime
	}),

	computed: {
		formattedHolidays() {
			let formattedHolidays = [];
			let service = this.assignedService || this.selectedService;
			if (service) {
				service.holidays.forEach(holiday => {
					let parts = holiday.split('-');
					const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
					formattedHolidays.push(holidayDate);
				});

				let disabledDays = [];
				this.days.forEach((day, index) => {
					index = index + 2;
					if (index >= 8) index = 1;
					if (!service.days[day].isOpen) disabledDays.push(index);
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

				case 3:
					disabled = this.auth ? false : true;
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
					buttonText = 'Review details';
					break;

				case 3:
					buttonText = 'Book';
					break;

				case 4:
					buttonText = 'Booking';
					break;
			}

			return buttonText;
		},

		weekDayOptions() {
			let options = [];

			let dateForWeekView = dayjs();
			//if(this.dateForWeekView) dateForWeekView = dayjs(this.dateForWeekView);
			let daysBefore = [];
			let daysAfter = [];
			for (var i = 1; i <= 90; i++) {
				let before = dateForWeekView.subtract(i, 'day');
				let after = dateForWeekView.add(i, 'day');
				/* daysBefore.unshift({
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
				date: dateForWeekView
					.hour(0)
					.minute(0)
					.second(0)
					.toDate(),
				title: dateForWeekView.format('ddd'),
				description: dateForWeekView.format('D MMM'),
				label: dateForWeekView.format('YYYY-MM-DD'),
				id: dateForWeekView.format('MMMDYYYY')
			};
			//options = [...daysBefore, ...[dateForWeekView], ...daysAfter];
			options = [...[dateForWeekView], ...daysAfter];

			return options;
		},

		endTime() {
			let endTime = '';
			let service = this.assignedService || this.selectedService;
			if (this.selectedService && this.selectedDate && this.selectedTimeslot) {
				let selectedDate = dayjs(dayjs(this.selectedDate).format('YYYY-MM-DD') + ' ' + this.selectedTimeslot.time);
				endTime = dayjs(selectedDate)
					.add(this.selectedService.duration, 'minute')
					.format('hh:mm');
			}
			return this.timezoneTime(endTime);
		},

		timeslots() {
			let timeslots = [];
			let start = dayjs();
			let end = dayjs();
			if (this.selectedService && this.selectedDate) {
				let dayName = dayjs(this.selectedDate).format('dddd');
				let dayAvailability = this.selectedService.days[dayName];
				if (dayAvailability) {
					let startParts = dayAvailability.start.split(':');
					let endParts = dayAvailability.end.split(':');
					start = start.set('hour', startParts[0]).set('minute', startParts[1]);
					end = end.set('hour', endParts[0]).set('minute', endParts[1]);
				}
			}
			while (start.isSameOrBefore(end)) {
				timeslots.push(start.format('HH:mm'));
				//start = start.add(this.selectedService.duration, 'minute');
				start = start.add(60, 'minute');
			}

			return timeslots;
		}
	},

	watch: {
		selectedDate: function(value) {
			if (value) this.error = null;
			this.timeslotsLoading = true;
			this.authError = '';
		},
		step: function(value) {
			if (value == 4) {
				this.submit();
			}
		},
		selectedService: function(value) {
			this.error = null;
			this.authError = '';
			//this.timeslots = [];
			this.selectedTimeslot = null;
			this.calendarView = 'month';
			this.authAction = 'signup';
			this.authForm = false;
		}
	},

	created() {
		this.getData();
		this.timezone = timezone.name();
		this.selectedDate = new Date();

		if (typeof gapi != 'undefined') {
			gapi.load('auth2', () => {
				this.GoogleAuth = gapi.auth2.init({ client_id: '187405864135-kboqmukelf9sio1dsjpu09of30r90ia1.apps.googleusercontent.com' });
			});
		}
	},

	mounted() {
		/*this.$refs['bookingModal'].show();
        setTimeout(() => {
            this.bookingSuccess = true;
        }, 1000);*/
	},

	methods: {
		availableTimeslot(service, timeslot, index) {
			let startParts = timeslot.split(':');
			let timeslotEls = '';
			let availableTimeslots = (service.timeslots || []).filter(x => {
				let serviceStartParts = x.time.split(':');
				return startParts[0] == serviceStartParts[0];
			});
			if (availableTimeslots.length > 0) {
				availableTimeslots.forEach(availableTimeslot => {
					let availableTimeslotParts = availableTimeslot.time.split(':');
					let width = (service.duration / 60) * 100;
					let left = (parseInt(availableTimeslotParts[1]) / 60) * 100;
					let style = `height: 18px; width: ${width}%; left: ${left}%`;
					timeslotEls += `<div class="small position-absolute bg-primary d-inline-block position-relative text-white cursor-pointer rounded border border-white overflow-hidden" style="${style}"><span class="position-absolute-center d-nxone text-nowrap" style="font-size: 10px">${convertTime(availableTimeslot.time, 'hh:mmA')}</span></div>`;
				});
			}

			return timeslotEls;
		},

		moveSelector(e) {
			let selector = this.$refs['selector'];
			let rect = e.target.getBoundingClientRect();
			let selectorWidth = selector.offsetWidth / 2;
			let x = e.clientX - rect.left;
			console.log(x);
			if (x >= 0 && x <= e.srcElement.offsetWidth - selector.offsetWidth) {
				selector.style.left = `${x}px`;
			}
		},

		timezoneTime(time) {
			let profileTimezone = this.$root.profile.timezone;
			let timezoneTime;
			if (profileTimezone != this.timezone) {
				let profileTZ = this.getTimeZoneOffset(new Date(), profileTimezone);
				let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
				let timeslotDate = `${dayjs(this.selectedDate).format('YYYY-MM-DD')} ${time}`;
				timezoneTime = dayjs(timeslotDate).add(profileTZ - localTZ, 'minute');
			} else {
				timezoneTime = dayjs(`${dayjs(this.selectedDate).format('YYYY-MM-DD')} ${time}`);
			}
			return timezoneTime.format('hh:mmA');
		},

		goToCoachSelection() {
			this.assignedService = this.selectedDate = this.selectedTimeslot = null;
			this.calendarView = 'month';
			this.authForm = false;
			this.authError = '';
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

		reset() {
			this.$refs['bookingModal'].hide();
			setTimeout(() => {
				this.selectedService = null;
				this.selectedDate = null;
				this.selectedTimeslot = null;
				this.isBooking = false;
				this.bookingSuccess = false;
				this.authForm = false;
				this.authAction = 'signup';
			}, 150);
		},

		disabledDate(date) {
			let service = this.assignedService || this.selectedService;
			let dayName = dayjs(date.date).format('dddd');
			return !service.days[dayName].isOpen || service.holidays.find(x => x == date.label);
		},

		sliderActiveDate(date) {
			return (this.selectedDate ? dayjs(this.selectedDate).format('MMMDYYYY') : '') === dayjs(date.date).format('MMMDYYYY');
		},

		dateSelected(date) {
			if (date && this.calendarView == 'month') {
				this.selectedDate = date;
				//this.dateForWeekView = date;
				this.calendarView = 'week';
				this.sliderNavIndex = 0;
				this.selectedTimeslot = null;
				this.$nextTick(() => {
					this.calcSliderTranslate();
				});
			}
		},

		adjustSlider(step) {
			let weekdaySlider = this.$refs['weekday-slider'];

			let translateX = new WebKitCSSMatrix(weekdaySlider.style.webkitTransform).m41 - this.sliderItemSize;
			if ((step == -1 && translateX < this.sliderItemSize * -1) || step == 1) {
				this.sliderNavIndex += step;
			}
		},

		calcSliderTranslate() {
			if (this.$refs['weekday-slider'] && this.calendarView == 'week') {
				let date = this.selectedDate || new Date();
				let dateID = dayjs(date).format('MMMDYYYY');
				let sliderItem = this.$refs['weekday-slider'].querySelector(`#${dateID}`);
				let sliderSize = this.sliderItemSize;
				if (sliderItem) {
					let index = Array.from(this.$refs['weekday-slider'].children).indexOf(sliderItem);
					if (index > -1) {
						//index = index ? index - 1 : 1;
						this.sliderTranslate = sliderSize * index * -1;
					}
				}
			}
		},

		submit() {
			if (this.authAction == 'login') {
				this.LoginAndBook();
			} else if (this.authAction == 'signup') {
				this.SignupAndBook();
			}
		},

		SignupAndBook() {
			let service = this.assignedService || this.selectedService;
			if (service && this.selectedDate && this.selectedTimeslot) {
				this.$refs['bookingModal'].show().then(() => {
					this.loginForm.loading = true;
					this.isBooking = true;
					let data = {
						first_name: this.loginForm.first_name,
						last_name: this.loginForm.last_name,
						email: this.loginForm.email,
						password: this.loginForm.password,
						date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
						time: this.selectedTimeslot.time,
						timezone: this.timezone
					};
					axios
						.post(`/@${this.profile.username}/${service.id}/signup_and_book`, data, { toast: true })
						.then(response => {
							this.bookingSuccess = true;
							this.loginForm.loading = false;
							this.authForm = false;
							this.selectedService = this.assignedService = this.selectedDate = this.selectedTimeslot = null;
						})
						.catch(e => {
							setTimeout(() => {
								this.$refs['bookingModal'].hide().then(() => {
									this.loginForm.loading = false;
									this.isBooking = false;
								});
							}, 150);
						});
				});
			}
		},

		LoginAndBook() {
			let service = this.assignedService || this.selectedService;
			if (service && this.selectedDate && this.selectedTimeslot) {
				this.$refs['bookingModal'].show().then(() => {
					this.loginForm.loading = true;
					this.isBooking = true;
					let data = {
						email: this.loginForm.email,
						password: this.loginForm.password,
						date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
						time: this.selectedTimeslot.time
					};
					axios
						.post(`/@${this.profile.username}/${service.id}/login_and_book`, data, { toast: true })
						.then(response => {
							this.bookingSuccess = true;
							this.loginForm.loading = false;
							this.authForm = false;
							this.selectedService = this.assignedService = this.selectedDate = this.selectedTimeslot = null;
						})
						.catch(e => {
							setTimeout(() => {
								this.$refs['bookingModal'].hide().then(() => {
									this.loginForm.loading = false;
									this.isBooking = false;
								});
							}, 150);
						});
				});
			}
		},

		FacebookLoginAndBook() {
			let service = this.assignedService || this.selectedService;
			if (typeof FB != 'undefined' && service && this.selectedDate && this.selectedTimeslot) {
				this.$refs['bookingModal'].show().then(() => {
					this.loginForm.loading = true;
					this.isBooking = true;
					FB.login(
						e => {
							FB.api('/me', { fields: 'first_name, last_name, email' }, data => {
								if (data && !data.error) {
									data.timezone = this.timezone;
									data.date = dayjs(this.selectedDate).format('YYYY-MM-DD');
									data.time = this.selectedTimeslot.time;

									axios
										.post(`/@${this.profile.username}/${service.id}/facebook_login_and_book`, data, { toast: true })
										.then(response => {
											this.bookingSuccess = true;
											this.loginForm.loading = false;
											this.authForm = false;
											this.selectedService = this.assignedService = this.selectedDate = this.selectedTimeslot = null;
										})
										.catch(e => {
											setTimeout(() => {
												this.$refs['bookingModal'].hide().then(() => {
													this.loginForm.loading = false;
													this.isBooking = false;
												});
											}, 150);
										});
								} else {
									this.$refs['bookingModal'].hide();
									setTimeout(() => {
										this.loginForm.loading = false;
										this.isBooking = false;
										this.bookingSuccess = false;
									}, 150);
								}
							});
						},
						{ scope: 'email' }
					);
				});
			}
		},

		GoogleLoginAndBook() {
			let service = this.assignedService || this.selectedService;
			if (this.GoogleAuth && service && this.selectedDate && this.selectedTimeslot) {
				this.$refs['bookingModal'].show().then(() => {
					this.loginForm.loading = true;
					this.isBooking = true;
					this.GoogleAuth.signIn()
						.then(googleUser => {
							let profile = googleUser.getBasicProfile();
							let timezone = this.timezone;
							let data = {
								id: profile.getId(),
								first_name: profile.getGivenName(),
								last_name: profile.getFamilyName(),
								email: profile.getEmail(),
								image_url: profile.getImageUrl(),
								timezone: timezone,
								date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
								time: this.selectedTimeslot.time
							};

							axios
								.post(`/@${this.profile.username}/${service.id}/google_login_and_book`, data, { toast: true })
								.then(response => {
									this.bookingSuccess = true;
									this.loginForm.loading = false;
									this.authForm = false;
									this.selectedService = this.assignedService = this.selectedDate = this.selectedTimeslot = null;
								})
								.catch(e => {
									setTimeout(() => {
										this.$refs['bookingModal'].hide().then(() => {
											this.loginForm.loading = false;
											this.isBooking = false;
										});
									}, 150);
								});
						})
						.catch(() => {
							this.$refs['bookingModal'].hide();
							setTimeout(() => {
								this.loginForm.loading = false;
								this.isBooking = false;
								this.bookingSuccess = false;
							}, 150);
						});
				});
			}
		},

		formatDate(date) {
			let formatDate = '';
			if (date) formatDate = dayjs(date).format('MMMM DD, YYYY');
			return formatDate;
		},

		resetStep() {
			this.step = 1;
			this.selectedTimeslot = this.selectedDate = null;
		},

		getTimeslots() {
			let service = this.assignedService || this.selectedService;
			if (service && this.selectedDate) {
				this.selectedTimeslot = null;
				axios.get(`${window.location.pathname}/${service.id}/timeslots?date=${dayjs(this.selectedDate).format('YYYY-MM-DD')}`).then(response => {
					this.$set(service, 'timeslots', response.data);
					this.timeslotsLoading = false;
				});
			}
		},

		setService(service) {
			this.selectedService = service;
		},

		getData() {
			axios.get(window.location.pathname).then(response => {
				this.services = response.data.services;
				this.packages = response.data.packages;

				// testing
				this.selectedService = this.services[0];
				this.getTimeslots();
				/*let now = new Date();
                now.setHours(0, 0, 0);
                this.selectedDate = now;
                this.setService(this.services[0]);
                setTimeout(() => {
                    this.selectedTimeslot = {label: '12:30PM'};
                    this.step = 3;
                });*/

				this.ready = true;
			});
		},

		nextStep() {
			if (!this.nextDisabled) this.step++;
			if (this.step == 4) this.detailsConfirmed = true;
		},

		stepClass(step) {
			let stepClass = [];
			if (this.step == step) stepClass.push('step-current');
			switch (step) {
				case 1:
					if (this.selectedDate) stepClass.push('step-complete');
					break;

				case 2:
					if (this.selectedTimeslot) stepClass.push('step-complete');
					break;

				case 3:
					if (this.detailsConfirmed) stepClass.push('step-complete');
					break;
			}
			return stepClass.join(' ');
		}
	}
};
