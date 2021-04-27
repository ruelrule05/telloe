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
export default {
	components: { Multiselect, VDatePicker, PlusIcon, CloseIcon, VueCheckbox, VueFormValidate },
	data: () => ({
		selectedContacts: [],
		dates: {},
		selectedDate: null,
		timeslotsLoading: false,
		dayjs: dayjs,
		startDate: null,
		name: '',
		duration: 0
	}),

	computed: {
		...mapState({
			ready: state => state.booking_links.ready,
			booking_links: state => state.booking_links.paginated,
			contacts: state => state.contacts.index
		}),

		contactsOptions() {
			let colors = [];
			let colorOptions = { luminosity: 'bright', format: 'rgba', alpha: 0.1 };
			return this.contacts.map(contact => {
				let contactColor = color(colorOptions);
				while (colors.indexOf(contactColor) > -1) {
					contactColor = color(colorOptions);
				}
				colors.push(color);
				return { name: contact.contact_user.full_name, value: contact.id, id: contact.id, contact_user: contact.contact_user, color: contactColor };
			});
		}
	},

	watch: {
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
		this.$set(this.dates, formatDate, { timeslots: [], selectedTimeslots: [] });
		this.getContacts({ nopaginate: true });
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			storeBookingLink: 'booking_links/store'
		}),

		addTimeslot(state, timeslot) {
			if (!timeslot.is_available) return false;

			if (state) {
				this.dates[this.selectedDate].selectedTimeslots.push(timeslot);
				timeslot.is_selected = true;
			} else {
				let index = this.dates[this.selectedDate].selectedTimeslots.findIndex(x => x.time == timeslot.time);
				this.dates[this.selectedDate].selectedTimeslots.splice(index, 1);
				timeslot.is_selected = false;
			}
		},

		timeslotTime(time, contact) {
			let timezoneTime = this.timezoneTime(time, contact.contact_user.timezone);
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
			const ms = date
				.getMilliseconds()
				.toString()
				.padStart(3, '0');
			if (hour == '24') hour = '00';
			const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}`;
			const lie = new Date(iso + 'Z');
			return -(lie - date) / 60 / 1000;
		},

		async storeLink() {
			this.$parent.timeslotsLoading = true;
			let dates = {};
			Object.keys(this.dates).forEach(d => {
				let date = JSON.parse(JSON.stringify(this.dates[d]));
				date.timeslots.forEach(t => {
					if (!date.selectedTimeslots.find(s => s.time == t.time)) {
						t.is_available = false;
					}
				});
				dates[d] = date;
			});
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
				dates: dates,
				duration: this.duration
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
		},

		async getAllTimeslots() {
			if (this.selectedDate && Object.keys(this.dates).length) {
				this.timeslotsLoading = true;
				let response = await window.axios.get(`/booking-links/get_all_timeslots?date=${this.selectedDate}`);
				if (response) {
					this.dates[this.selectedDate].timeslots = response.data.map(t => {
						if (this.dates[this.selectedDate].selectedTimeslots.find(s => s.time == t.time)) {
							t.is_selected = true;
						}
						return t;
					});
				}
				this.timeslotsLoading = false;
			}
		}
	}
};
