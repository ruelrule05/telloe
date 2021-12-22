/* global PROFILE */
/* global SERVICE */
/* global TIMEZONE */
/* global gapi */

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
import FormField from './formField.vue';
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
		guests: [],
		isEmail: isEmail,
		noServiceForWidget: false,
		timezoneTime: timezoneTime,
		profile: PROFILE,
		service: SERVICE,
		timezone: TIMEZONE,
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
		selectedServiceForTimeline: null,
		selectedService: null,
		startDate: null,
		selectedDate: null,
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
		timeslots: [],
		dateForWeekView: null,
		calendarView: 'month',
		sliderNavIndex: 0,
		sliderTranslate: 0,
		sliderItemSize: 86,
		authForm: false, // false
		bookingSuccess: false,
		authAction: 'signup',
		GoogleAuth: null,
		assignedService: null,
		tab: 'services',
		convertTime: convertTime,
		dayjs: dayjs,
		selectedCoachId: null,
		activeUserBgPosition: 0,
		selectedTimeslots: [],
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
		bookings: [],
		masks: {
			input: 'MMMM D, YYYY'
		},
		timezonesOptions: [],
		authenticate: false,
		step: false, // false
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
		bookingLoading: false,
		creatingAccount: false,
		phone: '',
		skype: '',
		authFormAction: 'asGuest',
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
		selectedCoachId: function () {
			this.selectedTimeslots = [];
			this.$nextTick(() => {
				let activeUser = document.querySelector('.user-container.active');
				if (activeUser) {
					this.activeUserBgPosition = activeUser.offsetTop;
				}
			});
		},

		'selectedService.id': function () {
			this.getTimeslots();
		},

		startDate: function (value) {
			if (value) this.error = null;
			this.authError = '';
			this.getTimeslots();
		},

		'selectedServiceForTimeline.id': function (value) {
			if (value) {
				this.selectedCoachId = this.profile.id;
				this.error = null;
				this.authError = '';
				this.selectedTimeslots = [];
				this.calendarView = 'month';
				this.authAction = 'signup';
				this.authForm = false;
			}
		},

		step: function () {
			document.querySelector('#app').scrollTo(0, 0);
		}
	},

	created() {
		if (this.service) {
			this.selectedServiceForTimeline = this.service;
			this.selectedService = this.selectedServiceForTimeline;
			this.ready = true;
		} else {
			this.getData();
		}
		//if (!this.timezone) {
		this.timezone = timezone.name();
		//}
		this.startDate = dayjs().toDate();

		if (typeof gapi != 'undefined') {
			gapi.load('auth2', () => {
				this.GoogleAuth = gapi.auth2.init({ client_id: '187405864135-kboqmukelf9sio1dsjpu09of30r90ia1.apps.googleusercontent.com' });
			});
		}
		Object.keys(ct.getAllTimezones()).forEach(timezone => {
			this.timezonesOptions.push({
				text: timezone,
				value: timezone
			});
		});
	},

	mounted() {
		this.popupItem = this.$el;
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
				let clonedTimeslot = JSON.parse(JSON.stringify(timeslot));
				if (clonedTimeslot.end_date) {
					clonedTimeslot.end_date = dayjs(clonedTimeslot.end_date).format('YYYY-MM-DD');
				}
				clonedTimeslot.type = clonedTimeslot.type.type;
				clonedTimeslot.timeslot.time = timezoneTime.get(`${clonedTimeslot.date.format} ${clonedTimeslot.timeslot.time}`, this.selectedService.timezone, this.timezone);

				return clonedTimeslot;
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
				let response = await window.axios.post(`/@${this.profile.username}/${this.selectedService.id}/guest_book`, data, { toast: true }).catch(() => {
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
				clonedTimeslot.timeslot.time = timezoneTime.get(`${clonedTimeslot.date.format} ${clonedTimeslot.timeslot.time}`, this.selectedService.timezone, this.timezone);

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
				let response = await window.axios.post(`/@${this.profile.username}/${this.selectedService.id}/login_and_book`, data, { toast: true }).catch(() => {
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
					let clonedTimeslot = JSON.parse(JSON.stringify(timeslot));
					if (clonedTimeslot.end_date) {
						clonedTimeslot.end_date = dayjs(clonedTimeslot.end_date).format('YYYY-MM-DD');
					}
					clonedTimeslot.type = clonedTimeslot.type.type;
					clonedTimeslot.timeslot.time = timezoneTime.get(`${clonedTimeslot.date.format} ${clonedTimeslot.timeslot.time}`, this.selectedService.timezone, this.timezone);

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
					let response = await window.axios.post(`/@${this.profile.username}/${this.selectedService.id}/facebook_login_and_book`, data, { toast: true }).catch(() => {
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
					let clonedTimeslot = JSON.parse(JSON.stringify(timeslot));
					if (clonedTimeslot.end_date) {
						clonedTimeslot.end_date = dayjs(clonedTimeslot.end_date).format('YYYY-MM-DD');
					}
					clonedTimeslot.type = clonedTimeslot.type.type;
					clonedTimeslot.timeslot.time = timezoneTime.get(`${clonedTimeslot.date.format} ${clonedTimeslot.timeslot.time}`, this.selectedService.timezone, this.timezone);

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
					let response = await window.axios.post(`/@${this.profile.username}/${this.selectedService.id}/google_login_and_book`, data, { toast: true }).catch(() => {
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

		setTypeSelected(timeslot, type) {
			this.$set(timeslot, 'type', type);
		},

		daysInMonth(timeslot) {
			return [
				{
					text: `First ${timeslot.date.dayName} of the month`,
					value: 'first_week'
				},
				{
					text: `Second ${timeslot.date.dayName} of the month`,
					value: 'second_week'
				},
				{
					text: `Third ${timeslot.date.dayName} of the month`,
					value: 'third_week'
				},
				{
					text: `Last ${timeslot.date.dayName} of the month`,
					value: 'last_week'
				}
			];
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

		endTime(selectedTimeslot) {
			let endTime = '';
			if (this.selectedService && this.startDate) {
				let startDate = dayjs(dayjs(this.startDate).format('YYYY-MM-DD') + ' ' + selectedTimeslot.timeslot.time);
				endTime = dayjs(startDate).add(this.selectedService.duration, 'minute').format('HH:mm');
			}
			return this.timezoneTime.get(`${selectedTimeslot.date.format} ${endTime}`, this.selectedService.timezone, this.timezone);
		},

		previousWeek() {
			let previousWeek = dayjs(this.startDate).subtract(7, 'day');
			if (dayjs(previousWeek.format('YYYY-MM-DD')).isSameOrAfter(dayjs(dayjs().format('YYYY-MM-DD')))) {
				this.startDate = previousWeek.toDate();
			} else if (!dayjs(dayjs(this.startDate).format('YYYY-MM-DD')).isSame(dayjs(dayjs().format('YYYY-MM-DD')))) {
				this.startDate = dayjs().toDate();
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
			this.assignedService = this.startDate = null;
			this.selectedTimeslot = [];
			this.calendarView = 'month';
			this.authForm = false;
			this.authError = '';
		},

		reset() {
			window.location.href = `/@${this.profile.username}`;
			this.bookings = [];
			this.isBooking = false;
			this.bookingSuccess = false;
			this.authForm = false;
			this.authAction = 'signup';
			this.authForm = false;
			this.startDate = dayjs().toDate();
			this.step = null;
			this.selectedServiceForTimeline = this.selectedService = this.selectedTimeslot = null;
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

			//let translateX = new WebKitCSSMatrix(weekdaySlider.style.webkitTransform).m41 - this.sliderItemSize;
			let translateX = weekdaySlider.style.width;
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

		formatTime(time) {
			let parts = time.split(':');
			let formatTime = dayjs().hour(parts[0]).minute(parts[1]).format('hh:mmA');
			return formatTime;
		},

		async getTimeslots() {
			if (this.selectedService) {
				this.timeslotsLoading = true;
				this.selectedTimeslots = [];
				let response = await window.axios.get(`/@${this.profile.username}/${this.selectedService.id}/timeslots?date=${dayjs(this.startDate).format('YYYY-MM-DD')}`);
				this.timeslots = response.data;
				this.timeslotsLoading = false;
			}
		},

		getData() {
			window.axios.get(window.location.pathname + window.location.search).then(response => {
				if (this.$root.widget) {
					if (response.data.id) {
						this.selectedService = response.data;
						this.selectedServiceForTimeline = this.selectedService;
					} else {
						this.noServiceForWidget = true;
					}
				} else {
					this.services = response.data.services;
				}
				//this.packages = response.data.packages;

				// testing
				// this.selectedServiceForTimeline = this.services[0];
				// this.selectedService = this.selectedServiceForTimeline;

				this.ready = true;
			});
		}
	}
};
