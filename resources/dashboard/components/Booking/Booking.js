import { mapActions, mapState } from 'vuex';
import CalendarIcon from '../../../icons/calendar.vue';
import CloseIcon from '../../../icons/close.vue';
import WarningIcon from '../../../icons/warning.vue';
import Timerangepicker from '../../../components/timerangepicker/timerangepicker.vue';
import dayjs from 'dayjs';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import Modal from '../../../components/modal/modal.vue';
import convertTime from '../../../js/plugins/convert-time';
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';
import VueCheckbox from '../../../components/vue-checkbox/vue-checkbox.vue';
import jstz from 'jstz';
const timezone = jstz.determine();
import SkypeIcon from '../../../icons/skype.vue';
import CallMenuIcon from '../../../icons/call-menu.vue';
import Multiselect from 'vue-multiselect';
const isEmail = require('isemail');
import 'vue-multiselect/dist/vue-multiselect.min.css';
import GoogleMeetIcon from '../../../icons/google-meet.vue';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import PlusIcon from '../../../icons/plus';
import vClickOutside from 'v-click-outside';
export default {
	props: {
		booking: {},
		newEvent: {
			type: Boolean,
			default: false
		},
		contact: {
			type: Object
		},
		service: {
			type: Object,
			default: null
		}
	},

	components: { PlusIcon, VueDropdown, Multiselect, CallMenuIcon, SkypeIcon, VueCheckbox, CalendarIcon, CloseIcon, Timerangepicker, VueSelect, VueFormValidate, Modal, WarningIcon, VDatePicker, GoogleMeetIcon },

	directives: { clickOutside: vClickOutside.directive },

	data: () => ({
		clonedBooking: {},
		open: false,
		masks: {
			input: 'MMM D, YYYY'
		},
		selectedContacts: [],
		timeslots: [],
		selectedTimeslot: {},
		selectFromTimeslots: true, // false
		disableServiceSelect: false,
		isEmail: isEmail,
		dayjs: dayjs,
		meetingTypes: [
			{ text: 'Google Meet', value: 'Google Meet' },
			{ text: 'Zoom', value: 'Zoom' },
			{ text: 'Face-to-face', value: 'Face-to-face' },
			{ text: 'Phone', value: 'Phone' },
			{ text: 'Skype', value: 'Skype' },
			{ text: 'Telloe Video Call', value: 'Telloe Video Call' }
		],
		recurringMenu: false,

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
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		includeGoogleCalendar: false
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			contacts: state => state.contacts.index
		}),

		servicesOptions() {
			return this.services.map(service => {
				return { text: service.name, value: service.id };
			});
		},

		contactsOptions() {
			return this.contacts.map(contact => {
				return { name: contact.contact_user.full_name, value: contact.id, id: contact.id, contact_user: contact.contact_user };
			});
		}
	},

	watch: {
		'clonedBooking.is_recurring': function(value) {
			if (value) {
				this.$set(
					this.clonedBooking,
					'end_date',
					dayjs(new Date())
						.add(1, 'week')
						.toDate()
				);
				this.$set(this.clonedBooking, 'frequency', this.recurringFrequencies[0].value);
				this.setTimeslotDefaultDay('week');
			}
		},
		booking: function(booking) {
			if (booking) {
				this.open = true;
				this.clonedBooking = JSON.parse(JSON.stringify(this.booking));
				if (this.service) {
					this.clonedBooking.service = this.service.id;
					this.disableServiceSelect = true;
				} else {
					this.disableServiceSelect = false;
				}
				if (this.clonedBooking.type == 'google-event') {
					let included = (this.$root.auth.google_calendar_events || []).find(x => x == this.clonedBooking.id);
					this.includeGoogleCalendar = included ? true : false;
				}
			}
		},
		newEvent: function(value) {
			if (value) {
				this.open = true;
				this.getServices();
				this.getContacts({ nopaginate: true });
			} else {
				this.selectedContacts = [];
			}
		},
		'clonedBooking.service': function(service) {
			if (this.newEvent && service) {
				let serviceOption = this.services.find(x => x.id == service);
				let start = dayjs(`${this.clonedBooking.date} ${this.clonedBooking.start}`);
				this.clonedBooking.end = start.add(serviceOption.duration, 'minute').format('HH:mm');
			}
			if (service) {
				if (!this.$root.auth.zoom_token) {
					this.meetingTypes.splice(
						this.meetingTypes.findIndex(x => x.text == 'Zoom'),
						1
					);
				}
				if (!this.$root.auth.google_calendar_token) {
					this.meetingTypes.splice(
						this.meetingTypes.findIndex(x => x.text == 'Google Meet'),
						1
					);
				}
			}
		},
		'clonedBooking.date': function() {
			this.getTimeslots();
		},
		service: function(value) {
			if (value && this.clonedBooking) {
				this.clonedBooking.service = this.service.id;
				this.disableServiceSelect = true;
			} else {
				this.disableServiceSelect = false;
			}
			if (this.clonedBooking && this.clonedBooking.type == 'google-event') {
				let included = (this.$root.auth.google_calendar_events || []).find(x => x == this.clonedBooking.id);
				this.includeGoogleCalendar = included ? true : false;
			}
		}
	},

	created() {
		this.timezone = timezone.name();
		this.clonedBooking = JSON.parse(JSON.stringify(this.booking));
		this.getServices();
		if (this.newEvent) {
			this.getContacts({ nopaginate: true });
		}
		if (this.contact) {
			this.contact.value = this.contact.id;
			this.contact.name = this.contact.contact_user.full_name;
			this.selectedContacts.push(this.contact);
		}
		if (this.service) {
			this.clonedBooking.service = this.service.id;
			this.disableServiceSelect = true;
		} else {
			this.disableServiceSelect = false;
		}
	},

	methods: {
		...mapActions({
			storeBooking: 'bookings/store',
			updateBooking: 'bookings/update',
			deleteBooking: 'bookings/delete',
			getServices: 'services/index',
			getContacts: 'contacts/index'
		}),

		toggleIncludeGoogleCalendar(state) {
			if (this.clonedBooking && this.clonedBooking.type == 'google-event') {
				if (!this.$root.auth.google_calendar_events) {
					this.$root.auth.google_calendar_events = [];
				}
				let index = (this.$root.auth.google_calendar_events || []).findIndex(x => x == this.clonedBooking.id);
				if (state && index < 0) {
					this.$root.auth.google_calendar_events.push(this.clonedBooking.id);
				} else if (!state && index >= 0) {
					this.$root.auth.google_calendar_events.splice(index, 1);
				}
				window.axios.post('/auth', this.$root.auth, { toast: true });
			}
		},

		timeslotToggleDay(dayIndex) {
			let index = this.clonedBooking.days.indexOf(dayIndex);
			if (index == -1) {
				this.clonedBooking.days.push(dayIndex);
			} else {
				this.clonedBooking.days.splice(index, 1);
			}

			if (this.clonedBooking.days.length == 0) {
				let dayName = dayjs(this.clonedBooking.date).format('dddd');
				let dayIndex = this.days.indexOf(dayName);
				this.clonedBooking.days.push(dayIndex);
			}
		},

		setTimeslotDefaultDay(frequency) {
			this.$set(this.clonedBooking, 'days', []);
			if (frequency == 'week') {
				let dayName = dayjs(this.clonedBooking.date).format('dddd');
				let dayIndex = this.days.indexOf(dayName);
				let index = this.clonedBooking.days.indexOf(dayIndex);
				if (index == -1 || this.clonedBooking.days.length == 1) {
					this.clonedBooking.days.push(dayIndex);
				}
			} else if (frequency == 'month') {
				this.clonedBooking.day_in_month = 'first_week';
			}
		},

		selectType(type) {
			let exists = this.selectedTypes.find(x => x.type == type);
			if (!exists) {
				this.selectedTypes.push({
					type: type
				});
			}
		},

		addEmail(email) {
			let exists = this.selectedContacts.find(x => x.email == email);
			if (!exists) {
				this.selectedContacts.push({
					id: email,
					name: email,
					contact_user: {
						initials: email[0].toUpperCase(),
						full_name: email,
						timezone: this.$root.auth.timezone
					},
					type: 'email'
				});
			}
			this.$refs.selectedContacts.deactivate();
		},

		selectTimeslot(timeslot) {
			this.selectedTimeslot = timeslot;
			this.clonedBooking.start = timeslot.time;
			let startDate = dayjs(dayjs(this.clonedBooking.date).format('YYYY-MM-DD') + ' ' + timeslot.time);
			let serviceOption = this.services.find(x => x.id == this.clonedBooking.service);
			let endTime = dayjs(startDate)
				.add(serviceOption.duration, 'minute')
				.format('HH:mm');
			this.clonedBooking.end = endTime;
		},

		timeslotTime(timeslot) {
			return `<span class="text-sm font-bold text-body block -mb-1">${timeslot.label.replace('AM', '').replace('PM', '')}</span><span class="text-sm text-muted uppercase">${timeslot.label.slice(-2)}</span>`;
		},

		timezoneTime(time, userTimezone) {
			let userTZ = this.getTimeZoneOffset(new Date(), userTimezone);
			let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
			let timeslotDate = `${dayjs(this.selectedDate).format('YYYY-MM-DD')} ${time}`;
			let timezoneTime = dayjs(timeslotDate).add(localTZ - userTZ, 'minute');
			return timezoneTime.format('hh:mmA');
		},

		getTimeZoneOffset(date, timeZone) {
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
			const lie = new Date(iso + 'Z');
			return -(lie - date) / 60 / 1000;
		},

		async getTimeslots() {
			let response = await window.axios.get(`/booking-links/get_all_timeslots?date=${dayjs(this.clonedBooking.date).format('YYYY-MM-DD')}`);
			this.timeslots = response.data;
		},

		confirmDeleteBooking() {
			this.deleteBooking(this.booking.id);
			this.$emit('delete', this.booking);
			this.close();
			this.$refs.deleteModal.hide();
		},

		confirmDelete() {
			this.$refs.deleteModal.show();
		},

		async createBooking() {
			if (!this.clonedBooking.start || !this.clonedBooking.end) {
				return this.$toast.error('Please select a timeslot');
			}
			if (this.selectedContacts.length == 0) {
				this.$refs.selectedContacts.$el.querySelector('.multiselect__input').focus();
				return;
			}
			let data = JSON.parse(JSON.stringify(this.clonedBooking));
			data.service_id = data.service;
			data.contact_ids = this.selectedContacts.filter(x => x.type != 'email').map(x => x.id);
			data.emails = this.selectedContacts.filter(x => x.type == 'email').map(x => x.name);
			data.date = dayjs(data.date).format('YYYY-MM-DD');
			this.close();
			let bookings = await this.storeBooking(data);
			this.$emit('store', bookings);
		},

		update() {
			this.open = false;
			let newData = JSON.parse(JSON.stringify(this.clonedBooking));
			newData.date = dayjs(newData.date).format('YYYY-MM-DD');
			this.updateBooking(newData);
			setTimeout(() => {
				this.$emit('update', newData);
			}, 150);
		},

		updateTime(time) {
			this.clonedBooking.start = convertTime(time.start, 'hh:mm');
			this.clonedBooking.end = convertTime(time.end, 'hh:mm');
		},

		close() {
			this.open = false;
			this.$emit('close');
			if (!this.contact) {
				setTimeout(() => {
					this.selectedContacts = [];
				}, 150);
			}
		},

		contactSelected(contact) {
			let exists = this.selectedContacts.find(x => x.id == contact.id);
			if (!exists) {
				this.selectedContacts.push(contact);
			}
		},

		emitNewBookingDateChange(time) {
			if (time) {
				this.clonedBooking.start = convertTime(time.start, 'hh:mm');
				this.clonedBooking.end = convertTime(time.end, 'hh:mm');
			}
			if (this.newEvent) {
				let clonedNewBooking = JSON.parse(JSON.stringify(this.clonedBooking));
				clonedNewBooking.date = dayjs(clonedNewBooking.date).format('YYYY-MM-DD');
				this.$emit('newBookingChange', clonedNewBooking);
			}
		}
	}
};