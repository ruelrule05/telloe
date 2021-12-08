/* global AUTH */
/* global BOOKING_LINK */
/* global AUTH_ACTION */
require('../js/bootstrap');
import dayjs from 'dayjs';
import jstz from 'jstz';
const timezone = jstz.determine();
import CheckmarkIcon from '../icons/checkmark';
import echo from '../js/echo.js';
import VueSelect from '../components/vue-select/vue-select.vue';
import Modal from '../components/modal/modal.vue';
import VueFormValidate from '../components/vue-form-validate.vue';
import MoreIcon from '../icons/more';
import VueCheckbox from '../components/vue-checkbox/vue-checkbox.vue';
import Chatroom from '../dashboard/pages/booking-links/chatroom/chatroom.vue';
import ClockIcon from '../icons/clock';
import VueDropdown from '../components/vue-dropdown/vue-dropdown.vue';
import ChevronDownIcon from '../icons/chevron-down';
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrAfter);
import VueButton from '../components/vue-button.vue';
import { VTooltip } from 'v-tooltip';

export default {
	components: { CheckmarkIcon, VueSelect, Modal, VueFormValidate, MoreIcon, VueCheckbox, Chatroom, ClockIcon, VueDropdown, ChevronDownIcon, VueButton },

	directives: { tooltip: VTooltip },

	data: () => ({
		auth: AUTH,
		bookingLink: BOOKING_LINK,
		echo: echo,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		selectedTimeslots: [],
		timezone: '',
		channel: null,
		users: {},
		highlighterWidth: 0,
		debounceFunc: null,
		selectedDate: null,
		currentTarget: null,
		email: '',
		loginForm: {
			password: ''
		},
		signupForm: {
			firstName: '',
			lastName: '',
			password: ''
		},
		authAction: AUTH_ACTION,
		hoveredTimeslot: null,
		dayjs: dayjs,
		requestData: null,
		acceptedContacts: 0,
		selectedTimeslot: null,
		booking: null,
		loading: false
	}),

	computed: {
		editable() {
			if (!this.selectedDate || this.bookingLink.is_booked) return false;
			return dayjs(this.selectedDate).isSameOrAfter(dayjs());
		},

		timeslotStatusText() {
			let status = 'Suggest';
			if (this.hoveredTimeslot && this.bookingLink.dates[this.selectedDate].timeslots.find(x => x.time == this.hoveredTimeslot.time && x.isSuggested)) {
				status = 'Unsuggest';
			}
			return status;
		},
		dateOptions() {
			let dateOptions = [];
			if (this.bookingLink) {
				Object.keys(this.bookingLink.dates).forEach(key => {
					dateOptions.push({
						text: this.formatDate(key),
						value: key
					});
				});
			}
			return dateOptions;
		},
		canBeBooked() {
			let participantsCount = 1 + this.bookingLink.booking_link_contacts.length + this.bookingLink.emails.length;
			let suggestedTimeslots = [];
			if (!this.editable) {
				return false;
			} else {
				// You
				let emailData = this.bookingLink.emails.find(x => x.email == this.auth.email);
				let userID = emailData ? emailData.id : this.auth.id;
				let propName = `${userID}-${this.selectedDate}`;
				if (this.bookingLink.selected_timeslots[propName]) {
					suggestedTimeslots.push(this.bookingLink.selected_timeslots[propName]);
				}

				// Contacts
				this.bookingLink.booking_link_contacts.forEach(bookingLinkContact => {
					let propName = `${bookingLinkContact.contact.contact_user_id}-${this.selectedDate}`;
					if (this.bookingLink.selected_timeslots[propName]) {
						suggestedTimeslots.push(this.bookingLink.selected_timeslots[propName]);
					}
				});

				// Emails
				this.bookingLink.emails.forEach(email => {
					let propName = `${email.id}-${this.selectedDate}`;
					if (this.bookingLink.selected_timeslots[propName]) {
						suggestedTimeslots.push(this.bookingLink.selected_timeslots[propName]);
					}
				});
			}
			return suggestedTimeslots.length == participantsCount && suggestedTimeslots.every(v => v === suggestedTimeslots[0]);
		}
	},

	watch: {
		selectedDate: function () {
			if (this.currentTarget) {
				this.channel.whisper('move', {
					user: this.auth,
					index: this.currentTarget.dataset.index,
					selectedDate: this.selectedDate
				});
			}
		}
	},

	created() {
		this.timezone = timezone.name();
		if (!this.bookingLink.is_booked) {
			this.channel = this.echo.join(`bookingLinks.${this.bookingLink.id}`);

			this.channel.listenForWhisper('selectedTimeslots', data => {
				this.bookingLink.dates[data.selectedDate].selectedTimeslots = data.selectedTimeslots;
				this.bookingLink.dates[data.selectedDate].timeslots = data.timeslots;
			});

			this.channel.listenForWhisper('suggestTimeslot', data => {
				let contact = this.bookingLink.booking_link_contacts.find(c => c.contact.contact_user_id == data.userId);
				if (contact) {
					if (!contact.suggestedTimeslots) {
						this.$set(contact, 'suggestedTimeslots', []);
					}
					let index = contact.suggestedTimeslots.findIndex(t => t.time == data.timeslot.time);
					if (data.is_suggested) {
						if (index == -1) {
							contact.suggestedTimeslots.push(data.timeslot);
						}
					} else {
						if (index > -1) {
							contact.suggestedTimeslots.splice(index, 1);
						}
					}
				} else if (data.userId == this.auth.id) {
					(this.bookingLink.selected_timeslots || [])[`${data.userID}-${this.selectedDate}`] = data.value;
				}
			});

			this.channel.listenForWhisper('requestToBook', data => {
				let contact = this.bookingLink.booking_link_contacts.find(c => c.contact.contact_user_id == data.userId);
				if (contact) {
					data.contact = contact;
					this.requestData = data;
					this.$refs.requestingModal.show();
				}
			});

			this.channel.listenForWhisper('declineRequest', data => {
				this.acceptedContacts = 0;
				this.$refs.requestModal.hide(true);
				this.$toast.error(`${data.contact} has declined the request to book the selected timeslot.`);
			});

			this.channel.listenForWhisper('creatingBooking', () => {
				this.$refs.requestingModal.hide(true);
				this.$refs.requestModal.hide(true);
				this.$refs.bookingModal.show();
			});

			this.channel.listenForWhisper('bookingSuccess', data => {
				this.booking = data.booking;
				this.$refs.bookingModal.hide(true);
				this.$refs.bookingSuccessModal.show();
				this.bookingLink.is_booked = true;
			});

			this.channel.listenForWhisper('selectTimeslot', data => {
				if (data.selected) {
					this.$set(this.bookingLink.selected_timeslots, data.key, data.value);
				} else {
					this.$delete(this.bookingLink.selected_timeslots, data.key, data);
				}
			});
		}

		this.selectedDate = Object.keys(this.bookingLink.dates)[0];

		if (this.authAction) {
			let url = new URL(window.location.href);
			this.email = url.searchParams.get('email');
		}
	},

	methods: {
		async book() {
			let emailData = this.bookingLink.emails.find(x => x.email == this.auth.email);
			let userID = emailData ? emailData.id : this.auth.id;
			let propName = `${userID}-${this.selectedDate}`;
			if (!this.canBeBooked || !this.bookingLink.selected_timeslots[propName]) return false;

			this.$refs.requestingModal.hide(true);
			this.$refs.requestModal.hide(true);
			this.$refs.bookingModal.show();

			this.channel.whisper('creatingBooking', {});
			let data = {
				date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
				start: this.bookingLink.selected_timeslots[propName]
			};
			let response = await window.axios.post(`/booking-links/${this.bookingLink.uuid}/book`, data, { toast: true });
			if (response.data) {
				this.booking = response.data;
				this.$refs.bookingSuccessModal.show();
				this.bookingLink.is_booked = true;
				this.channel.whisper('bookingSuccess', {
					booking: this.booking
				});
			}
		},

		isBookable(timeslot) {
			let isBookable = true;
			if (!this.editable) {
				isBookable = false;
			} else {
				// You
				let propName = `${this.auth.id}-${this.selectedDate}`;
				if (!this.bookingLink.selected_timeslots[propName] || this.bookingLink.selected_timeslots[propName] != timeslot.time) {
					isBookable = false;
				}

				// Contacts
				this.bookingLink.booking_link_contacts.forEach(bookingLinkContact => {
					let propName = `${bookingLinkContact.contact.contact_user_id}-${this.selectedDate}`;
					if (!this.bookingLink.selected_timeslots[propName] || this.bookingLink.selected_timeslots[propName] != timeslot.time) {
						isBookable = false;
					}
				});
				this.bookingLink.emails.forEach(email => {
					let propName = `${email}-${this.selectedDate}`;
					if (!this.bookingLink.selected_timeslots[propName] || this.bookingLink.selected_timeslots[propName] != timeslot.time) {
						isBookable = false;
					}
				});

				// Emails
			}
			return isBookable;
		},

		hasSelected(user, timeslot) {
			let emailData = this.bookingLink.emails.find(x => x.email == user.email);
			let userID = emailData ? emailData.id : user.id;
			return (this.bookingLink.selected_timeslots || [])[`${userID}-${this.selectedDate}`] == timeslot.time;
		},

		toggleSelectTimeslot(state, timeslot) {
			if (this.authAction) {
				return this.$refs.authModal.show();
			}
			let emailData = this.bookingLink.emails.find(x => x.email == this.auth.email);
			let userID = emailData ? emailData.id : this.auth.id;
			let propName = `${userID}-${this.selectedDate}`;
			if (state) {
				this.$set(this.bookingLink.selected_timeslots, propName, timeslot.time);
			} else {
				this.$delete(this.bookingLink.selected_timeslots, propName);
			}
			window.axios.put(`/booking-links/${this.bookingLink.id}`, this.bookingLink);
			this.channel.whisper('selectTimeslot', {
				key: propName,
				value: timeslot.time,
				selected: state
			});
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

		declineRequest() {
			this.channel.whisper('declineRequest', {
				contact: this.auth.full_name
			});
			this.$refs.requestingModal.hide(true);
		},

		acceptRequest() {
			this.channel.whisper('acceptRequest', {
				userId: this.auth.id
			});
			this.$refs.requestingModal.hide(true);
			this.$refs.requestModal.show();
		},

		requestToBook(timeslot) {
			this.selectedTimeslot = timeslot;
			this.channel.whisper('requestToBook', {
				userId: this.auth.id,
				timeslot: timeslot,
				date: this.selectedDate
			});
			this.acceptedContacts++;
			this.$refs.requestModal.show();
		},

		async login() {
			this.loading = true;
			let response = await window.axios.post('/login', { email: this.email, password: this.loginForm.password }, { toast: true }).catch(() => {});
			if (response) {
				window.location.href = `/booking-links/${this.bookingLink.uuid}`;
			}
			this.loading = false;
		},

		async register() {
			this.loading = true;
			this.signupForm.email = this.email;
			let response = await window.axios.post('/signup', this.signupForm, { toast: true }).catch(() => {});
			if (response) {
				let r = await window.axios.put(`/booking-links/${this.bookingLink.uuid}/associate_user`).catch(() => {});
				if (r) {
					window.location.href = `/booking-links/${this.bookingLink.uuid}`;
				}
			}
			this.loading = false;
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		timeslotTime(time, timezone) {
			let timezoneTime = this.timezoneTime(time, timezone);
			return `<span class="text-sm font-bold text-body block -mb-1">${timezoneTime.replace('AM', '').replace('PM', '')}</span><span class="text-sm text-muted uppercase">${timezoneTime.slice(-2)}</span>`;
		},

		timezoneTime(time, userTimezone) {
			let userTZ = this.getTimeZoneOffset(new Date(), userTimezone);
			let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
			let timeslotDate = `${dayjs(this.selectedDate).format('YYYY-MM-DD')} ${time}`;
			let timezoneTime = dayjs(timeslotDate).add(localTZ - userTZ, 'minute');
			return timezoneTime.format('hh:mmA');
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
			const lie = new Date(iso + 'Z');
			return -(lie - date) / 60 / 1000;
		}
	}
};
