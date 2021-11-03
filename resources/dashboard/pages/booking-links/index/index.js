import { mapState, mapActions } from 'vuex';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import Modal from '../../../../components/modal/modal.vue';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
import ChevronLeftIcon from '../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../icons/chevron-right';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import CheckmarkIcon from '../../../../icons/checkmark';
import jstz from 'jstz';
const timezone = jstz.determine();
import tooltip from '../../../../js/directives/tooltip.js';
import Paginate from '../../../../components/paginate/paginate.vue';
import ShortcutIcon from '../../../../icons/shortcut';
import MoreIcon from '../../../../icons/more';
import convertTime from '../../../../js/plugins/convert-time.js';
import PlusIcon from '../../../../icons/plus';
import CloseIcon from '../../../../icons/close';
const ct = require('countries-and-timezones').default;
import InfoCircleIcon from '../../../../icons/info-circle.vue';
import Add from '../add/add.vue';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import copy from 'copy-text-to-clipboard';
import VueButton from '../../../../components/vue-button.vue';

export default {
	components: { Add, InfoCircleIcon, VueFormValidate, Modal, VCalendar, ChevronLeftIcon, ChevronRightIcon, VueSelect, CheckmarkIcon, Paginate, ShortcutIcon, MoreIcon, PlusIcon, CloseIcon, VueDropdown, VueButton },

	directives: { tooltip },

	data: () => ({
		startDate: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		masks: {
			input: 'MMM D, YYYY'
		},
		selectedContacts: [],
		timeslots: [],
		timezone: '',
		timeslotsLoading: false,
		convertTime: convertTime,
		dates: {},
		dayjs: dayjs,
		name: '',
		selectedDate: null,
		addEmail: false,
		newEmail: '',
		newTimezone: '',
		timezonesOptions: [],
		addLink: false,
		banner: false,
		selectedLink: null,
		sendingEmail: false,
		cookieItem: 'telloe_bespoke_banner'
	}),

	computed: {
		...mapState({
			ready: state => state.booking_links.ready,
			booking_links: state => state.booking_links.paginated
		}),

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

		bookingLinkUrl() {
			return window.location.origin + '/booking-links/' + this.selectedLink.uuid;
		}
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		},
		startDate: function(value) {
			if (value) {
				let dateFormat = dayjs(value).format('YYYY-MM-DD');
				let exists = this.dates[dateFormat];
				if (!exists) {
					this.$set(this.dates, dateFormat, { timeslots: [], selectedTimeslots: [] });
				}
				this.selectedDate = dateFormat;
			}
		},
		selectedDate: function() {
			this.getAllTimeslots();
		},
		addEmail: function(value) {
			if (value) {
				this.$nextTick(() => {
					this.$refs['newEmailInput'].focus();
				});
			}
		},
		addLink: function() {
			this.$refs.toggleAddLinkBtn.blur();
		}
	},

	created() {
		this.timezone = timezone.name();
		this.$root.contentloading = !this.ready;
		this.startDate = dayjs()
			.add(1, 'day')
			.toDate();
		let formatDate = dayjs(this.startDate).format('YYYY-MM-DD');
		this.selectedDate = formatDate;
		this.dates[formatDate] = { timeslots: [], selectedTimeslots: [] };
		this.getBookingLinks({ paginate: true });
		Object.keys(ct.getAllTimezones()).forEach(timezone => {
			this.timezonesOptions.push({
				text: timezone,
				value: timezone
			});
		});
		this.checkCookie();
	},

	methods: {
		...mapActions({
			getBookingLinks: 'booking_links/index',
			storeBookingLink: 'booking_links/store',
			deleteBookingLink: 'booking_links/delete'
		}),

		checkCookie() {
			var match = document.cookie.match(new RegExp('(^| )' + this.cookieItem + '=([^;]+)'));
			if (!match) {
				this.banner = true;
			}
		},

		hideBanner() {
			this.banner = false;
			let expires =
				dayjs()
					.add(2, 'year')
					.format('ddd, D MMM YYYY H:m:s') + ' UTC';
			document.cookie = `${this.cookieItem}=true; expires=${expires}; path=/`;
		},

		copyToClipboard() {
			if (copy(this.bookingLinkUrl)) {
				this.$toast.open('Copied to clipboard');
			}
		},

		async sendEmail() {
			this.sendingEmail = true;
			let response = await window.axios.post(`/booking-links/${this.selectedLink.id}/send_invitation`);
			if (response) {
				this.$refs.sendModal.hide(true);
				this.$toast.success('Invitation emails has been sent successfully.');
			}
			this.sendingEmail = false;
		},

		async destroy() {
			await this.deleteBookingLink(this.selectedLink);
			this.$refs.deleteModal.hide(true);
		},

		action(action, bookingLink) {
			this.selectedLink = bookingLink;
			switch (action) {
				case 'Send email invitation':
					this.$refs.sendModal.show();
					break;

				case 'Copy link':
					this.copyToClipboard();
					break;

				case 'Delete':
					this.$refs.deleteModal.show();
					break;
			}
		},

		addNewEmail() {
			if (this.newEmail && this.newTimezone) {
				this.selectedContacts.push({
					type: 'email',
					id: this.newEmail,
					contact_user: {
						timezone: this.newTimezone,
						full_name: this.newEmail
					}
				});
				this.addEmail = false;
			}
		},

		addTimeslot(timeslot) {
			if (!timeslot.is_available) return false;

			let index = this.dates[this.selectedDate].selectedTimeslots.findIndex(x => x.time == timeslot.time);
			if (index == -1) {
				this.dates[this.selectedDate].selectedTimeslots.push(timeslot);
			} else {
				this.dates[this.selectedDate].selectedTimeslots.splice(index, 1);
			}
		},

		removeDate(date) {
			this.$delete(this.dates, date);
			if (date == this.selectedDate) {
				this.selectedDate = Object.keys(this.dates)[0];
			}
		},

		removeContact(contact) {
			let index = this.selectedContacts.findIndex(x => x.id == contact.id);
			if (index > -1) {
				this.selectedContacts.splice(index, 1);
			}
		},

		addContact(contact) {
			let exists = this.selectedContacts.find(x => x.id == contact.id);
			if (!exists) {
				this.selectedContacts.push(contact);
			}
		},

		async getAllTimeslots() {
			if (this.selectedDate && Object.keys(this.dates).length) {
				this.timeslotsLoading = true;
				let response = await window.axios.get(`/booking-links/get_all_timeslots?date=${this.selectedDate}`);
				if (response) {
					this.dates[this.selectedDate].timeslots = response.data;
				}
				this.timeslotsLoading = false;
			}
		},
		timezoneTime(timezone, time) {
			let timezoneTime;
			if (timezone != this.timezone) {
				let profileTZ = this.getTimeZoneOffset(new Date(), timezone);
				let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
				let timeslotDate = `${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`;
				timezoneTime = dayjs(timeslotDate).add(profileTZ - localTZ, 'minute');
			} else {
				timezoneTime = dayjs(`${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`);
			}
			return timezoneTime.format('h:mm A');
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
			const lie = new Date(iso + 'Z');
			return -(lie - date) / 60 / 1000;
		},

		timezoneTooltip(timeslot) {
			let timezone = this.selectedContact ? this.selectedContact.contact_user.timezone : this.timezone;
			let timezoneTime = this.timezoneTime(timezone, timeslot.time);
			return `
				<div class="text-left py-1 line-height-base timeslot-tooltip">
					<div class="tooltip-timezone">${timezone}</div><div class="tooltip-timezonetime"><strong>${timezoneTime}</strong></div>
				</div>
			`;
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};
