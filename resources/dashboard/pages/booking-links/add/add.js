import { mapState, mapActions } from 'vuex';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import jstz from 'jstz';
const timezone = jstz.determine();
import dayjs from 'dayjs';
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';
import PlusIcon from '../../../../icons/plus';
import CloseIcon from '../../../../icons/close';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
const color = require('randomcolor');
import VueFormValidate from '../../../../components/vue-form-validate.vue';
const isEmail = require('isemail');
import Modal from '../../../../components/modal/modal.vue';
const ct = require('countries-and-timezones').default;
import VueSelect from '../../../../components/vue-select/vue-select.vue';
const { getNameList } = require('country-list');
import { VTooltip } from 'v-tooltip';
import Timerangepicker from '../../../../components/timerangepicker/timerangepicker.vue';
import convertTime from '../../../../js/plugins/convert-time';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';

export default {
	components: { Multiselect, VDatePicker, PlusIcon, CloseIcon, VueCheckbox, VueFormValidate, Modal, VueSelect, Timerangepicker, ToggleSwitch },
	data: () => ({
		selectedContacts: [],
		dates: {},
		selectedDate: null,
		timeslotsLoading: false,
		dayjs: dayjs,
		startDate: null,
		name: 'My new match up link',
		duration: 30,
		isEmail: isEmail,
		emailToAdd: {
			email: '',
			timezone: ''
		},
		allowed_countries: ['AU', 'CA', 'NZ', 'GB', 'US'],
		message: '',
		bookedTimeslots: {},
		start: '6:00',
		end: '18:00'
	}),

	directives: { tooltip: VTooltip },
	computed: {
		...mapState({
			ready: state => state.booking_links.ready,
			booking_links: state => state.booking_links.paginated,
			contacts: state => state.contacts.index
		}),

		availableTimezones() {
			let timezones = [];

			/* eslint-disable */
			Object.entries(getNameList()).forEach(([name, code]) => {
				let countryTimezones = ct.getTimezonesForCountry(code);
				if (countryTimezones) {
					countryTimezones.forEach(timezone => {
						timezones.push({
							text: timezone.name,
							value: timezone.name
						});
					});
				}
			});
			return timezones.sort((a, b) => {
				return a.text > b.text ? 1 : -1;
			});
		},

		contactsOptions() {
			let colors = [];
			let colorOptions = { luminosity: 'bright', format: 'rgba', alpha: 0.1 };
			return this.contacts
				.filter(contact => !contact.is_pending)
				.map(contact => {
					let contactColor = color(colorOptions);
					while (colors.indexOf(contactColor) > -1) {
						contactColor = color(colorOptions);
					}
					colors.push(color);
					return { name: `${contact.contact_user.full_name} (${contact.contact_user.email})`, value: contact.id, id: contact.id, contact_user: contact.contact_user, color: contactColor };
				});
		}
	},

	watch: {
		startDate: function (value) {
			if (value) {
				let dateFormat = dayjs(value).format('YYYY-MM-DD');
				let exists = this.dates[dateFormat];
				if (!exists) {
					let timeslots = this.timeslots();
					let lastDate = this.dates[Object.keys(this.dates)[0]];
					if (lastDate) {
						timeslots = JSON.parse(JSON.stringify(lastDate.timeslots));
					}
					this.$set(this.dates, dateFormat, { timeslots: timeslots, selectedTimeslots: [] });
				}
				this.selectedDate = dateFormat;
			}
		},
		contacts: function () {
			if (this.contactsOptions.length > 0) {
				this.selectedContacts.push(this.contactsOptions[0]);
			}
			if (this.contactsOptions.length > 1) {
				this.selectedContacts.push(this.contactsOptions[1]);
			}
		},
		duration: function () {
			Object.keys(this.dates).forEach(key => {
				this.dates[key].timeslots = this.timeslots();
			});
		}
	},

	async created() {
		this.message = `${this.$root.auth.full_name} has sent you a range of times to select that match up with your time zone and when ${this.$root.auth.first_name} is available to meet.`;
		this.timezone = timezone.name();
		this.$root.contentloading = !this.ready;
		this.startDate = dayjs().add(1, 'day').toDate();
		let formatDate = dayjs(this.startDate).format('YYYY-MM-DD');
		this.selectedDate = formatDate;
		this.createNewDate(formatDate);
		this.getContacts({ nopaginate: true });
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			storeBookingLink: 'booking_links/store'
		}),

		updateTimeslots(time) {
			this.start = convertTime(time.start, 'hh:mm');
			this.end = convertTime(time.end, 'hh:mm');
			this.$set(this.dates, this.selectedDate, { timeslots: this.timeslots(this.selectedDate), selectedTimeslots: [] });
		},

		async createNewDate(date) {
			this.timeslotsLoading = true;
			if (!this.bookedTimeslots[date]) {
				let response = await window.axios.get(`/booking-links/get_all_timeslots?date=${date}`);
				this.bookedTimeslots[date] = response.data.filter(x => x.is_booked == true);
			}
			this.timeslotsLoading = false;
			this.$set(this.dates, date, { timeslots: this.timeslots(date), selectedTimeslots: [] });
		},

		timeslots(date) {
			let start = this.start;
			let parts = start.split(':');
			let period = start.slice(-2).toLowerCase();
			if (period == 'pm' && parts[0] < 12) {
				parts[0] = parseInt(parts[0]) + 12;
			}
			start = parseInt(parts[0] * 60) + parseInt(parts[1]);

			let end = this.end;
			parts = end.split(':');
			period = end.slice(-2).toLowerCase();
			if (period == 'pm' && parts[0] < 12) {
				parts[0] = parseInt(parts[0]) + 12;
			}
			end = parseInt(parts[0] * 60) + parseInt(parts[1]);
			let timeslots = [];
			for (var i = 0; start <= end; i++) {
				let hh = Math.floor(start / 60);
				let mm = start % 60;
				let timeslot = ('0' + (hh == 12 ? 12 : hh)).slice(-2) + ':' + ('0' + mm).slice(-2);
				let add = true;
				if (this.bookedTimeslots[date]) {
					let booked = this.bookedTimeslots[date].find(x => x.time == timeslot);
					if (booked) {
						add = false;
					}
				}
				if (add) {
					timeslots.push({
						time: timeslot,
						is_available: false
					});
				}
				start = start + parseInt(this.duration);
			}
			return timeslots;
		},

		addEmail() {
			let exists = this.selectedContacts.find(x => x.email == this.emailToAdd.email);
			if (!exists) {
				let colorOptions = { luminosity: 'bright', format: 'rgba', alpha: 0.1 };
				let contactColor = color(colorOptions);
				while (this.selectedContacts.find(c => c.color == contactColor)) {
					contactColor = color(colorOptions);
				}
				this.selectedContacts.push({
					id: this.emailToAdd.email,
					name: this.emailToAdd.email,
					contact_user: {
						initials: this.emailToAdd.email[0].toUpperCase(),
						full_name: this.emailToAdd.email,
						timezone: this.emailToAdd.timezone
					},
					type: 'email',
					color: contactColor
				});
			}
			this.$refs.selectedContacts.deactivate();
			this.$refs.addEmailModal.hide();
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
		},

		async storeLink() {
			this.$parent.timeslotsLoading = true;

			let data = {
				name: this.name,
				contacts: this.selectedContacts.map(c => {
					return {
						id: c.id,
						type: c.type,
						timezone: c.contact_user.timezone,
						color: c.color
					};
				}),
				dates: this.dates,
				duration: this.duration,
				message: this.message
			};
			await window.axios.post('/booking-links', data);
			this.$parent.getBookingLinks({ paginate: true });
			this.$parent.timeslotsLoading = false;
			this.$parent.addLink = false;
		},

		removeDate(date) {
			this.$delete(this.dates, date);
			if (date == this.selectedDate) {
				this.selectedDate = Object.keys(this.dates)[0];
			}
		}
	}
};
