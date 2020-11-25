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
import CalendarDayAltIcon from '../icons/calendar-day-alt';
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
import DollarSignIcon from '../icons/dollar-sign';
import jstz from 'jstz';
const timezone = jstz.determine();
import convertTime from '../js/plugins/convert-time.js';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/IsSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import tooltip from '../js/directives/tooltip.js';

export default {
	components: {
		VueFormValidate,
		Modal,
		ClockIcon,
		CalendarDayIcon,
		CalendarDayAltIcon,
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
		PackageIcon,
		DollarSignIcon
	},

	directives: { tooltip },

	data: () => ({
		organization: ORGANIZATION,
		auth: AUTH,
		ready: false,
		services: [],
		packages: [],
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		selectAttribute: {
			highlight: {
				fillMode: 'solid',
				contentClass: 'bg-primary'
			}
		},
		step: 1,
		selectedServiceForTimeline: null,
		selectedService: null,
		startDate: null,
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
		timeslots: {},
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
		convertTime: convertTime,
		dayjs: dayjs,
		selectedCoachId: null,
		activeUserBgPosition: 0
	}),

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

		endTime() {
			let endTime = '';
			if (this.selectedService && this.startDate && this.selectedTimeslot) {
				let startDate = dayjs(dayjs(this.startDate).format('YYYY-MM-DD') + ' ' + this.selectedTimeslot.time);
				endTime = dayjs(startDate)
					.add(this.selectedService.duration, 'minute')
					.format('hh:mmA');
			}
			return endTime;
			return this.timezoneTime(endTime);
		}
	},

	watch: {
		'selectedService.id': function(value) {
			if (value) {
				this.getTimeslots();
			} else {
				this.selectedCoachId = null;
			}
		},

		startDate: function(value) {
			if (value) this.error = null;
			this.authError = '';
			this.getTimeslots();
		},

		'selectedServiceForTimeline.id': function(value) {
			if (value) {
				this.selectedCoachId = this.selectedServiceForTimeline.member_services[0].member_id;
				this.error = null;
				this.authError = '';
				this.selectedTimeslot = null;
				this.calendarView = 'month';
				this.authAction = 'signup';
				this.authForm = false;
			}
		},

		selectedCoachId: function(value) {
			this.$nextTick(() => {
				let activeUser = document.querySelector('.user-container.active');
				if (activeUser) {
					this.activeUserBgPosition = activeUser.offsetTop;
				}
			});
		}
	},

	created() {
		this.getData();
		this.timezone = timezone.name();
		this.startDate = dayjs().toDate();

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
		previousWeek() {
			let previousWeek = dayjs(this.startDate).subtract(7, 'day');
			if (dayjs(previousWeek.format('YYYY-MM-DD')).isSameOrAfter(dayjs(dayjs().format('YYYY-MM-DD')))) {
				this.startDate = previousWeek.toDate();
			}
		},

		nextWeek() {
			this.startDate = dayjs(this.startDate)
				.add(7, 'day')
				.toDate();
		},

		setSelectedDateAndTimeslot(date, timeslot) {
			if (timeslot.is_available) {
				this.selectedDate = date.date;
				this.selectedTimeslot = timeslot;
			}
		},

		timezoneTooltip(timezone, timeslot) {
			return `
				<div class="text-left py-1 line-height-base">
					<div class="mb-2"><div>${timezone}</div><div><strong>${timeslot.label}</strong></div></div>
					<div>${this.timezone}</div><div><strong>${this.timezoneTime(timeslot.time)}</strong></div>
				</div>
			`;
		},

		selectTimeslot(e) {
			console.log(e.target);
		},

		availableTimeslots(service, timeslot) {
			let startParts = timeslot.split(':');
			let timeslotEls = '';
			let availableTimeslots = (service.timeslots || []).filter(x => {
				let serviceStartParts = x.time.split(':');
				return startParts[0] == serviceStartParts[0];
			});

			return availableTimeslots;
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
			let selectedServiceTimezone = this.selectedService.member.member_user.timezone;
			let timezoneTime;
			if (selectedServiceTimezone != this.timezone) {
				let profileTZ = this.getTimeZoneOffset(new Date(), selectedServiceTimezone);
				let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
				let timeslotDate = `${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`;
				timezoneTime = dayjs(timeslotDate).add(profileTZ - localTZ, 'minute');
			} else {
				timezoneTime = dayjs(`${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`);
			}
			return timezoneTime.format('hh:mmA');
		},

		goToCoachSelection() {
			this.assignedService = this.startDate = this.selectedTimeslot = null;
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
				this.isBooking = false;
				this.bookingSuccess = false;
				this.authForm = false;
				this.authAction = 'signup';
				this.authForm = false;
				this.startDate = dayjs().toDate();
				this.selectedServiceForTimeline = this.selectedService = this.selectedTimeslot = null;
			}, 150);
		},

		disabledDate(date) {
			let service = this.assignedService || this.selectedService;
			let dayName = dayjs(date.date).format('dddd');
			return !service.days[dayName].isOpen || service.holidays.find(x => x == date.label);
		},

		sliderActiveDate(date) {
			return (this.startDate ? dayjs(this.startDate).format('MMMDYYYY') : '') === dayjs(date.date).format('MMMDYYYY');
		},

		dateSelected(date) {
			if (date && this.calendarView == 'month') {
				this.startDate = date;
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
				let date = this.startDate || new Date();
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
						.post(`/@${this.profile.username}/${service.id}/signup_and_book`, data, { toasted: true })
						.then(response => {
							this.bookingSuccess = true;
							this.loginForm.loading = false;
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
						.post(`/@${this.profile.username}/${service.id}/login_and_book`, data, { toasted: true })
						.then(response => {
							this.bookingSuccess = true;
							this.loginForm.loading = false;
							this.authForm = false;
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
										.post(`/@${this.profile.username}/${service.id}/facebook_login_and_book`, data, { toasted: true })
										.then(response => {
											this.bookingSuccess = true;
											this.loginForm.loading = false;
											this.authForm = false;
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
								.post(`/@${this.profile.username}/${service.id}/google_login_and_book`, data, { toasted: true })
								.then(response => {
									this.bookingSuccess = true;
									this.loginForm.loading = false;
									this.authForm = false;
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

		async getTimeslots() {
			if (this.selectedService) {
				this.timeslotsLoading = true;
				this.selectedTimeslot = null;
				let response = await axios.get(`${window.location.pathname}/${this.selectedService.id}/timeslots?date=${dayjs(this.startDate).format('YYYY-MM-DD')}`);
				this.timeslots = response.data;
				this.timeslotsLoading = false;
			}
		},

		setService(service) {},

		getData() {
			axios.get(window.location.pathname).then(response => {
				this.services = response.data.services;
				this.packages = response.data.packages;

				// testing
				//this.selectedServiceForTimeline = this.services[0];
				//this.selectedService = this.selectedServiceForTimeline;

				//this.selectedServiceForTimeline = this.services[0];
				//this.selectedService = this.selectedServiceForTimeline;
				/*let now = new Date();
                now.setHours(0, 0, 0);
                this.startDate = now;
                this.setService(this.services[0]);
                setTimeout(() => {
                    this.selectedTimeslot = {label: '12:30PM'};
                    this.step = 3;
                });*/

				this.ready = true;
			});
		}
	}
};