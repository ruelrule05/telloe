/* global ORGANIZATION */
/* global AUTH */
require('../js/bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
Vue.use(VCalendar);
Vue.use(VueRouter);
import VueFormValidate from '../components/vue-form-validate';
import VueButton from '../components/vue-button';
import Modal from '../components/modal/modal.vue';
import ClockIcon from '../icons/clock';
import CalendarDayIcon from '../icons/calendar-day';
import CalendarDayAltIcon from '../icons/calendar-day-alt';
import InfoCircleIcon from '../icons/info-circle';
import CheckmarkIcon from '../icons/checkmark';
import ArrowLeftIcon from '../icons/arrow-left';
import ArrowRightIcon from '../icons/arrow-right';
import CalendarMonthIcon from '../icons/calendar-month';
import ChevronLeftIcon from '../icons/chevron-left';
import ChevronRightIcon from '../icons/chevron-right';
import ChevronDownIcon from '../icons/chevron-down';
import EarthIcon from '../icons/earth';
import CheckmarkCircleIcon from '../icons/checkmark-circle';
import FacebookIcon from '../icons/facebook';
import GoogleIcon from '../icons/google';
import UsersIcon from '../icons/users';
import CalendarIcon from '../icons/calendar';
import CoinIcon from '../icons/coin';
import PackageIcon from '../icons/package';
import DollarSignIcon from '../icons/dollar-sign';
import WindowPlusIcon from '../icons/window-plus';
import CloseIcon from '../icons/close';
import MoreIcon from '../icons/more-h';
import MapMarkerIcon from '../icons/map-marker';
import jstz from 'jstz';
const timezone = jstz.determine();
import convertTime from '../js/plugins/convert-time.js';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import tooltip from '../js/directives/tooltip.js';
import ToggleSwitch from '../components/toggle-switch/toggle-switch.vue';
import VueSelect from '../components/vue-select/vue-select.vue';
import ZoomIcon from '../icons/zoom';
import GoogleMeetIcon from '../icons/google-meet';
import CogIcon from '../icons/cog';
import vClickOutside from 'v-click-outside';
import FacebookAltIcon from '../icons/facebook-alt.vue';
import GoogleAltIcon from '../icons/google-alt.vue';
import VueCardFormat from '../components/vue-credit-card-validation/src';
const ct = require('countries-and-timezones').default;
import VisaIcon from '../icons/cc/visa.vue';
import MastercardIcon from '../icons/cc/mastercard.vue';
import AmexIcon from '../icons/cc/amex.vue';
import DiscoverIcon from '../icons/cc/discover.vue';
import DinersclubIcon from '../icons/cc/dinersclub.vue';
import JcbIcon from '../icons/cc/jcb.vue';
import UnionpayIcon from '../icons/cc/unionpay.vue';
const format = require('format-number');
import Stripe from 'stripe-client';
import axios from 'axios';
import VueDropdown from '../components/vue-dropdown/vue-dropdown.vue';
import RefreshIcon from '../icons/refresh';
import SocialLogin from '../js/helpers/SocialLogin';
import PhoneIcon from '../icons/call-menu.vue';
import SkypeIcon from '../icons/skype.vue';
import timezoneTime from '../js/helpers/TimezoneTime.js';
import Multiselect from 'vue-multiselect';
const isEmail = require('isemail');
import 'vue-multiselect/dist/vue-multiselect.min.css';
import FormField from '../profile/formField.vue';
import numbersOnly from 'numbers-only';

export default {
	components: {
		FormField,
		Multiselect,
		SkypeIcon,
		PhoneIcon,
		VueFormValidate,
		Modal,
		ClockIcon,
		CalendarDayIcon,
		CalendarDayAltIcon,
		InfoCircleIcon,
		CheckmarkIcon,
		VueButton,
		ArrowLeftIcon,
		ArrowRightIcon,
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
		DollarSignIcon,
		WindowPlusIcon,
		CloseIcon,
		MoreIcon,
		ToggleSwitch,
		VueSelect,
		MapMarkerIcon,
		ZoomIcon,
		GoogleMeetIcon,
		CogIcon,
		FacebookAltIcon,
		GoogleAltIcon,
		MastercardIcon,
		AmexIcon,
		DiscoverIcon,
		DinersclubIcon,
		JcbIcon,
		UnionpayIcon,
		VueDropdown,
		ChevronDownIcon,
		RefreshIcon
	},

	directives: { tooltip, clickOutside: vClickOutside.directive, cardformat: VueCardFormat },

	data: () => ({
		numbersOnly: numbersOnly,
		isEmail: isEmail,
		phone: '',
		skype: '',
		timezoneTime: timezoneTime,
		timezonesOptions: [],
		bookingLoading: false,
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
		step: false,
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
		activeUserBgPosition: 0,
		selectedTimeslots: [],
		bookings: [],
		masks: {
			input: 'MMM D, YYYY'
		},
		recurringFrequencies: [
			{
				text: 'Week',
				value: 'week'
			},
			{
				text: 'Month',
				value: 'month'
			}
		],
		guests: [],
		authFormAction: 'asGuest',
		user: {
			email: '',
			password: ''
		},
		guest: {
			first_name: '',
			last_name: '',
			email: ''
		},
		cardForm: {
			number: '',
			exp_month: '',
			exp_year: '',
			cvc: '',
			name: '',
			expiration: '',
			errors: {
				number: false,
				expiration: false,
				cvc: false
			}
		},
		cardBrand: null,
		format: format,
		creatingAccount: false,
		formData: {}
	}),

	computed: {
		cardBrandComponent() {
			switch (this.cardBrand) {
				case 'visa':
					return VisaIcon;
				case 'mastercard':
					return MastercardIcon;
				case 'amex':
					return AmexIcon;
				case 'discover':
					return DiscoverIcon;
				case 'dinersclub':
					return DinersclubIcon;
				case 'jcb':
					return JcbIcon;
				case 'unionpay':
					return UnionpayIcon;
				default:
					return false;
			}
		},

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
					if (this.startDate) disabled = false;
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
			let daysAfter = [];
			for (var i = 1; i <= 90; i++) {
				let after = dateForWeekView.add(i, 'day');
				daysAfter.push({
					date: after.toDate(),
					title: after.format('ddd'),
					description: after.format('D MMM'),
					label: after.format('YYYY-MM-DD'),
					id: after.format('MMMDYYYY')
				});
			}
			dateForWeekView = {
				date: dateForWeekView.hour(0).minute(0).second(0).toDate(),
				title: dateForWeekView.format('ddd'),
				description: dateForWeekView.format('D MMM'),
				label: dateForWeekView.format('YYYY-MM-DD'),
				id: dateForWeekView.format('MMMDYYYY')
			};
			options = [...[dateForWeekView], ...daysAfter];

			return options;
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
		'selectedService.id': function (value) {
			if (value) {
				this.getTimeslots();
			} else {
				this.selectedCoachId = null;
			}
		},

		startDate: function (value) {
			if (value) this.error = null;
			this.authError = '';
			this.getTimeslots();
		},

		'selectedServiceForTimeline.id': function (value) {
			if (value) {
				this.selectedCoachId = this.selectedServiceForTimeline.assigned_services[0].member_id;
				this.error = null;
				this.authError = '';
				this.selectedTimeslot = null;
				this.calendarView = 'month';
				this.authAction = 'signup';
				this.authForm = false;
			}
		},

		selectedCoachId: function () {
			this.selectedTimeslots = [];
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

		Object.keys(ct.getAllTimezones()).forEach(timezone => {
			this.timezonesOptions.push({
				text: timezone,
				value: timezone
			});
		});
	},

	mounted() {
		/*this.$refs['bookingModal'].show();
        setTimeout(() => {
            this.bookingSuccess = true;
        }, 1000);*/
	},

	methods: {
		addEmail(email) {
			this.guests.push(email);
			this.$refs.guestsSelect.$el.querySelector('input').blur();
		},
		addToCalendar(calendar, booking) {
			switch (calendar) {
				case 'Google Calendar':
					window.open(booking.google_link, '_blank');
					break;
				case 'MS Outlook':
					window.open(booking.outlook_link, '_blank');
					break;
				case 'Yahoo':
					window.open(booking.yahoo_link, '_blank');
					break;
				case 'iCal (.ics file download)':
					window.open(booking.ical_link, '_blank');
					break;
			}
		},

		async createAccount() {
			this.creatingAccount = true;
			let response = await axios.post('/auth/guest_account', this.guest);
			if (response.data.user) {
				this.step = 'bookings';
			} else {
				this.step = 'account-created';
			}
			this.creatingAccount = false;
		},

		async getCardToken() {
			const publishableKey = process.env.MIX_STRIPE_PUBLISHABLE_KEY;
			const stripe = Stripe(publishableKey);
			let expParts = this.cardForm.expiration.split('/');
			let exp_month = expParts[0].trim();
			let exp_year = expParts[1].trim();
			if (exp_year.length === 2) {
				if (exp_year < 70) {
					exp_year = `20${exp_year}`;
				} else {
					exp_year = `19${exp_year}`;
				}
			}
			let cardData = {
				number: this.cardForm.number,
				exp_month: exp_month,
				exp_year: exp_year,
				cvc: this.cardForm.cvc,
				name: this.cardForm.name
			};
			let cardToken = await stripe.createToken({ card: cardData });
			const tokenData = await cardToken.json();
			if (!tokenData.error) {
				return tokenData.id;
			} else {
				this.$toast.error(tokenData.error.message);
				return false;
			}
		},

		async cardDetails() {
			Object.keys(this.cardForm.errors).forEach(k => (this.cardForm.errors[k] = false));
			let error = false;

			// validate card number
			if (!VueCardFormat.format().validateCardNumber(this.cardForm.number)) {
				this.cardForm.errors.number = error = true;
			}

			// validate card expiry
			if (!VueCardFormat.format().validateCardExpiry(this.cardForm.expiration)) {
				this.cardForm.errors.expiration = error = true;
			}

			// validate card CVC
			if (!VueCardFormat.format().validateCardCVC(this.cardForm.cvc)) {
				this.cardForm.errors.cvc = error = true;
			}

			// validate card name
			if (!this.cardForm.name.trim().length) {
				error = true;
			}

			if (!error) {
				this.step = 'authenticate';
			}
		},

		async bookGuest() {
			this.bookingLoading = true;
			let timeslots = this.selectedTimeslots.map(timeslot => {
				if (timeslot.end_date) {
					timeslot.end_date = dayjs(timeslot.end_date).format('YYYY-MM-DD');
				}
				timeslot.type = timeslot.type.type;

				// set timeslot time  based on timezone
				return timeslot;
			});

			let data = JSON.parse(JSON.stringify(this.guest));
			data.timeslots = timeslots;
			data.card_token = true;
			data.phone = this.phone;
			data.skype = this.skype;
			data.timezone = this.timezone;
			data.guests = this.guests;
			data.formData = this.formData;
			if (this.selectedService.require_payment) {
				data.card_token = await this.getCardToken();
			}
			if (data.card_token) {
				let response = await window.axios.post(`/@${this.selectedService.coach.username}/${this.selectedService.id}/guest_book`, data, { toast: true }).catch(() => {
					this.bookingLoading = false;
				});
				if (response) {
					this.bookings = response.data;
					this.step = 'booked-signup';
				}
			}
			this.bookingLoading = false;
		},

		async LoginAndBook() {
			this.bookingLoading = true;
			let timeslots = this.selectedTimeslots.map(timeslot => {
				let clonedTimeslot = JSON.parse(JSON.stringify(timeslot));
				if (clonedTimeslot.end_date) {
					clonedTimeslot.end_date = dayjs(clonedTimeslot.end_date).format('YYYY-MM-DD');
				}
				clonedTimeslot.type = clonedTimeslot.type.type;
				return clonedTimeslot;
			});

			let data = JSON.parse(JSON.stringify(this.user));
			data.timeslots = timeslots;
			data.card_token = true;
			data.phone = this.phone;
			data.skype = this.skype;
			data.timezone = this.timezone;
			data.guests = this.guests;
			data.formData = this.formData;
			if (this.selectedService.require_payment) {
				data.card_token = await this.getCardToken();
			}
			if (data.card_token) {
				let response = await window.axios.post(`/@${this.selectedService.coach.username}/${this.selectedService.id}/login_and_book`, data, { toast: true }).catch(() => {
					this.bookingLoading = false;
				});
				if (response) {
					this.bookings = response.data;
					this.step = 'bookings';
				}
			}
			this.bookingLoading = false;
		},

		async FacebookLoginAndBook() {
			let response = await SocialLogin.FacebookLogin();
			if (response) {
				this.bookingLoading = true;
				let timeslots = this.selectedTimeslots.map(timeslot => {
					if (timeslot.end_date) {
						timeslot.end_date = dayjs(timeslot.end_date).format('YYYY-MM-DD');
					}
					timeslot.type = timeslot.type.type;
					return timeslot;
				});

				let data = JSON.parse(JSON.stringify(this.user));
				data.timeslots = timeslots;
				data.card_token = true;
				data.phone = this.phone;
				data.skype = this.skype;
				data.timezone = this.timezone;
				data.guests = this.guests;
				data.formData = this.formData;
				if (this.selectedService.require_payment) {
					data.card_token = await this.getCardToken();
				}
				if (data.card_token) {
					let response = await window.axios.post(`/@${this.selectedService.coach.username}/${this.selectedService.id}/facebook_login_and_book`, data, { toast: true }).catch(() => {
						this.bookingLoading = false;
					});
					if (response) {
						this.bookings = response.data;
						this.step = 'bookings';
					}
				}
				this.bookingLoading = false;
			}
		},

		async GoogleLoginAndBook() {
			let response = await SocialLogin.GoogleSignin();
			if (response) {
				this.bookingLoading = true;
				let timeslots = this.selectedTimeslots.map(timeslot => {
					if (timeslot.end_date) {
						timeslot.end_date = dayjs(timeslot.end_date).format('YYYY-MM-DD');
					}
					timeslot.type = timeslot.type.type;
					return timeslot;
				});

				let data = JSON.parse(JSON.stringify(this.user));
				data.timeslots = timeslots;
				data.card_token = true;
				data.phone = this.phone;
				data.skype = this.skype;
				data.timezone = this.timezone;
				data.guests = this.guests;
				data.formData = this.formData;
				if (this.selectedService.require_payment) {
					data.card_token = await this.getCardToken();
				}
				if (data.card_token) {
					let response = await window.axios.post(`/@${this.selectedService.coach.username}/${this.selectedService.id}/google_login_and_book`, data, { toast: true }).catch(() => {
						this.bookingLoading = false;
					});
					if (response) {
						this.bookings = response.data;
						this.step = 'bookings';
					}
				}
				this.bookingLoading = false;
			}
		},

		timeslotToggleDay(timeslot, dayIndex) {
			let index = timeslot.days.indexOf(dayIndex);
			if (index == -1) {
				timeslot.days.push(dayIndex);
			} else {
				timeslot.days.splice(index, 1);
			}

			if (timeslot.days.length == 0) {
				let dayIndex = this.days.indexOf(timeslot.date.dayName);
				timeslot.days.push(dayIndex);
			}
		},

		setTimeslotDefaultDay(frequency, timeslot) {
			if (frequency == 'week') {
				let dayIndex = this.days.indexOf(timeslot.date.dayName);
				let index = timeslot.days.indexOf(dayIndex);
				if (index == -1 || timeslot.days.length == 1) {
					timeslot.days.push(dayIndex);
				}
			} else if (frequency == 'month') {
				timeslot.day_in_month = 'first_week';
			}
		},

		setTypeSelected(timeslot, type) {
			this.$set(timeslot, 'type', type);
		},

		formatTime(time) {
			let parts = time.split(':');
			let formatTime = dayjs().hour(parts[0]).minute(parts[1]).format('hh:mmA');
			return formatTime;
		},
		endTime(time) {
			let endTime = '';
			if (this.selectedService && this.startDate) {
				let startDate = dayjs(dayjs(this.startDate).format('YYYY-MM-DD') + ' ' + time);
				endTime = dayjs(startDate).add(this.selectedService.duration, 'minute').format('hh:mmA');
			}
			return endTime;
		},

		summary() {
			if (this.selectedTimeslots.length > 0) {
				this.selectedTimeslot = true;
			}
		},
		previousWeek() {
			let previousWeek = dayjs(this.startDate).subtract(7, 'day');
			if (dayjs(previousWeek.format('YYYY-MM-DD')).isSameOrAfter(dayjs(dayjs().format('YYYY-MM-DD')))) {
				this.startDate = previousWeek.toDate();
			}
		},

		nextWeek() {
			this.startDate = dayjs(this.startDate).add(7, 'day').toDate();
		},

		setSelectedDateAndTimeslot(date, timeslot) {
			if (timeslot.is_available) {
				// this.selectedDate = date.date;
				// this.selectedTimeslot = timeslot;
				let index = this.selectedTimeslots.findIndex(x => x.date.dayName == date.dayName && x.timeslot.time == timeslot.time);
				if (index > -1) {
					this.selectedTimeslots.splice(index, 1);
				} else {
					let timeslotData = {
						date: date,
						timeslot: timeslot,
						days: []
					};
					if (this.selectedService.types.length > 0) {
						timeslotData.type = this.selectedService.types[0];
					}
					this.selectedTimeslots.push(timeslotData);
				}
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
			let availableTimeslots = (service.timeslots || []).filter(x => {
				let serviceStartParts = x.time.split(':');
				return startParts[0] == serviceStartParts[0];
			});

			return availableTimeslots;
		},

		moveSelector(e) {
			let selector = this.$refs['selector'];
			let rect = e.target.getBoundingClientRect();
			let x = e.clientX - rect.left;
			console.log(x);
			if (x >= 0 && x <= e.srcElement.offsetWidth - selector.offsetWidth) {
				selector.style.left = `${x}px`;
			}
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
			const ms = date.getMilliseconds().toString().padStart(3, '0');
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
			setTimeout(() => {
				this.bookings = [];
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

			/* eslint-disable */
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
