import { mapState, mapActions } from 'vuex';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import Modal from '../../../../../components/modal/modal.vue';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
import ChevronLeftIcon from '../../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../../icons/chevron-right';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import CheckmarkIcon from '../../../../../icons/checkmark';
import jstz from 'jstz';
const timezone = jstz.determine();
import tooltip from '../../../../../js/directives/tooltip.js';
import Paginate from '../../../../../components/paginate/paginate.vue';
import ShortcutIcon from '../../../../../icons/shortcut';
import MoreIcon from '../../../../../icons/more';
import convertTime from '../../../../../js/plugins/convert-time.js';
import PlusIcon from '../../../../../icons/plus';
import CloseIcon from '../../../../../icons/close';
export default {
	components: { VueFormValidate, Modal, VCalendar, ChevronLeftIcon, ChevronRightIcon, VueSelect, CheckmarkIcon, Paginate, ShortcutIcon, MoreIcon, PlusIcon, CloseIcon },

	directives: { tooltip },

	data: () => ({
		startDate: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		masks: {
			input: 'MMM D, YYYY'
		},
		selectedContacts: [],
		timeslots: [],
		selectedTimeslots: [],
		timezone: '',
		timeslotsLoading: false,
		convertTime: convertTime,
		dates: [],
		dayjs: dayjs,
		name: ''
	}),

	computed: {
		...mapState({
			ready: state => state.booking_links.ready,
			booking_links: state => state.booking_links.paginated,
			contacts: state => state.contacts.index
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
		}
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		},
		startDate: function(value) {
			if (value) {
				let dateFormat = dayjs(value).format('YYYY-MM-DD');
				let exists = this.dates.find(x => x == dateFormat);
				if (!exists) {
					this.dates.push(dateFormat);
				}
			}
		},
		dates: function() {
			this.getAllTimeslots();
		}
	},

	created() {
		this.timezone = timezone.name();
		this.$root.contentloading = !this.ready;
		this.startDate = dayjs()
			.add(1, 'day')
			.toDate();
		this.dates.push(dayjs(this.startDate).format('YYYY-MM-DD'));
		this.getBookingLinks({ paginate: true });
		this.getContacts({ nopaginate: true });
	},

	mounted() {
		setTimeout(() => {
			this.$refs['addModal'].show();
		}, 150);
	},

	methods: {
		...mapActions({
			getBookingLinks: 'booking_links/index',
			storeBookingLink: 'booking_links/store',
			getContacts: 'contacts/index'
		}),

		addTimeslot(timeslot) {
			if (!timeslot.is_available) return false;
			let index = this.selectedTimeslots.findIndex(x => x.time == timeslot.time);
			if (index == -1) {
				this.selectedTimeslots.push(timeslot);
			} else {
				this.selectedTimeslots.splice(index, 1);
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

		setSelectedDateAndTimeslot(date, timeslot) {
			if (timeslot.is_available) {
				let index = this.selectedTimeslots.findIndex(x => x.date.dayName == date.dayName && x.timeslot.time == timeslot.time);
				if (index > -1) {
					this.selectedTimeslots.splice(index, 1);
				} else {
					this.selectedTimeslots.push({
						date: date,
						timeslot: timeslot,
						days: []
					});
				}
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

		async getAllTimeslots() {
			if (this.dates.length > 0) {
				this.timeslotsLoading = true;
				let response = await window.axios.get(`/booking-links/get_all_timeslots?dates=${this.dates.join(',')}`);
				if (response) {
					this.timeslots = response.data;
				}
				this.timeslotsLoading = false;
			}
		},

		async storeLink() {
			this.timeslotsLoading = true;
			let data = {
				name: this.name,
				contacts: this.selectedContacts.map(c => c.id),
				date: dayjs(this.startDate).format('YYYY-MM-DD'),
				selected_timeslots: this.selectedTimeslots.map(timeslot => {
					return timeslot.time;
				}),
				timeslots: this.timeslots
			};
			await window.axios.post('/booking-links', data);
			this.getBookingLinks({ paginate: true });
			this.timeslotsLoading = false;
			this.$refs['addModal'].hide();
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};
