import { mapState, mapActions } from 'vuex';
import { VCalendar } from 'vuetify/lib';
import vuetify from '../../../js/plugins/vuetify';
import dayjs from 'dayjs';
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
import GoogleIcon from '../../../icons/google.vue';
dayjs.extend(IsSameOrAfter);
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import convertTime from '../../../js/plugins/convert-time';
import ClickOutside from 'vue-click-outside';
import Timerangepicker from '../../../components/timerangepicker/timerangepicker.vue';
import CloseIcon from '../../../icons/close.vue';
import timezoneTime from '../../../js/helpers/TimezoneTime.js';
import OutlookIcon from '../../../icons/outlook.vue';
import axios from 'axios';

export default {
	vuetify,
	props: {
		date: {
			type: Date,
			required: true
		},

		selectedBooking: {
			type: Object
		},

		googleCalendarEvents: {
			type: Array
		},

		contactBookings: {
			type: Array
		},
		timezone: {
			type: String
		},
		outlookCalendarEvents: {
			type: Array
		},

		organization: {
			type: Object
		}
	},

	components: {
		VCalendar,
		GoogleIcon,
		VueDropdown,
		Timerangepicker,
		CloseIcon,
		OutlookIcon
	},

	directives: {
		ClickOutside
	},

	data: () => ({
		dayjs: dayjs,
		newEvent: null,
		timeslotToBlock: {},
		timeToBlock: {},
		organizationBookings: []
	}),

	watch: {
		date: function (value) {
			this.getDayBookings({ date: dayjs(value).format('YYYY-MM-DD'), commit: false });
		}
	},

	computed: {
		...mapState({
			bookings: state => state.bookings.index
		}),

		isPrevious() {
			return dayjs().isSameOrAfter(dayjs(this.date));
		},

		parsedBookings() {
			let parsedBookings = [];
			if (this.organization) {
				this.organizationBookings.forEach(booking => {
					let parsedBooking = JSON.parse(JSON.stringify(booking));
					let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
					if (this.selectedBooking && this.selectedBooking.id == parsedBooking.id) {
						color = 'bg-primary text-white';
					}
					parsedBookings.push({
						booking: parsedBooking,
						name: parsedBooking.name,
						start: parsedBooking.date + ' ' + timezoneTime.get(`${parsedBooking.date} ${parsedBooking.start}`, parsedBooking.timezone, this.timezone),
						end: parsedBooking.date + ' ' + timezoneTime.get(`${parsedBooking.date} ${parsedBooking.end}`, parsedBooking.timezone, this.timezone),
						category: 'bookings',
						color: color
					});
				});
			} else {
				this.bookings.forEach(booking => {
					let parsedBooking = JSON.parse(JSON.stringify(booking));
					let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
					if (this.selectedBooking && this.selectedBooking.id == booking.id) {
						color = 'bg-primary text-white';
					}
					parsedBookings.push({
						booking: booking,
						name: (booking.service || booking.booking_link).name,
						start: parsedBooking.date + ' ' + timezoneTime.get(`${parsedBooking.date} ${parsedBooking.start}`, parsedBooking.timezone, this.timezone),
						end: parsedBooking.date + ' ' + timezoneTime.get(`${parsedBooking.date} ${parsedBooking.end}`, parsedBooking.timezone, this.timezone),
						category: 'bookings',
						color: color
					});
				});
			}

			this.googleCalendarEvents.forEach(event => {
				if (!event.id.includes('telloebooking')) {
					let calendarEvent = JSON.parse(JSON.stringify(event));
					let color = 'bg-red-200 hover:bg-red-400 hover:text-white';
					if (this.selectedBooking && this.selectedBooking.id == event.id) {
						color = 'bg-red-600 text-white';
					}
					calendarEvent.type = 'google-event';
					calendarEvent.date = dayjs(calendarEvent.start.dateTime || calendarEvent.start.date).format('YYYY-MM-DD');
					calendarEvent.timezone = calendarEvent.start.timeZone;
					calendarEvent.start = dayjs(calendarEvent.start.dateTime || calendarEvent.start.date)
						.tz(event.start.timeZone || this.timezone)
						.format('HH:mm');
					calendarEvent.end = dayjs(calendarEvent.end.dateTime || calendarEvent.end.date)
						.tz(event.start.timeZone || this.timezone)
						.format('HH:mm');
					calendarEvent.startDate = event.start;
					calendarEvent.endDate = event.end;
					let dayEvent = {
						booking: event,
						name: event.summary,
						type: 'google-event',
						start: calendarEvent.date + ' ' + timezoneTime.get(`${calendarEvent.date} ${calendarEvent.start}`, calendarEvent.timezone, this.timezone),
						end: calendarEvent.date + ' ' + timezoneTime.get(`${calendarEvent.date} ${calendarEvent.end}`, calendarEvent.timezone, this.timezone),
						category: 'bookings',
						color: color
					};
					parsedBookings.push(dayEvent);
				}
			});

			this.outlookCalendarEvents.forEach(event => {
				if (!event.transactionId || !event.transactionId.includes('telloebooking')) {
					let calendarEvent = JSON.parse(JSON.stringify(event));
					let color = 'bg-blue-200 hover:bg-blue-400 hover:text-white';
					if (this.selectedBooking && this.selectedBooking.id == calendarEvent.id) {
						color = 'bg-blue-600 text-white';
					}
					calendarEvent.type = 'outlook-event';

					let start = timezoneTime.get(dayjs(calendarEvent.start.dateTime).format('YYYY-MM-DD HH:mm'), calendarEvent.start.timeZone, this.timezone, 'YYYY-MM-DD HH:mm');
					let end = timezoneTime.get(dayjs(calendarEvent.end.dateTime).format('YYYY-MM-DD HH:mm'), calendarEvent.end.timeZone, this.timezone, 'YYYY-MM-DD HH:mm');

					calendarEvent.date = dayjs(calendarEvent.start.dateTime || calendarEvent.start.date).format('YYYY-MM-DD');
					calendarEvent.timezone = calendarEvent.start.timeZone;
					calendarEvent.start = dayjs(start).format('HH:mm');
					calendarEvent.end = dayjs(end).format('HH:mm');
					calendarEvent.startDate = start;
					calendarEvent.endDate = end;

					let dayEvent = {
						booking: calendarEvent,
						name: calendarEvent.subject,
						type: 'outlook-event',
						start: start,
						end: end,
						category: 'bookings',
						color: color
					};
					parsedBookings.push(dayEvent);
				}
			});

			(this.$root.auth.blocked_timeslots || []).forEach(timeslot => {
				timeslot.type = 'blocked';
				let start;
				let end;
				if (timeslot.date) {
					timeslot.id = `blocked${timeslot.date}-${timeslot.start}-${timeslot.end}`;
					start = `${timeslot.date} ${timeslot.start}`;
					end = `${timeslot.date} ${timeslot.end}`;
				} else {
					timeslot.id = `blocked-${timeslot.start}-${timeslot.end}`;
					start = `${timeslot.start}`;
					end = `${timeslot.end}`;
				}
				parsedBookings.push({
					booking: timeslot,
					name: 'Blocked',
					start: start,
					end: end,
					category: 'bookings',
					color: 'bg-gray-50'
				});
			});

			return parsedBookings.filter((v, i, a) => a.findIndex(t => (t.booking || {}).id === (v.booking || {}).id) === i);
		}
	},

	created() {
		this.getDayBookings({ date: dayjs(this.date).format('YYYY-MM-DD'), commit: false });
	},

	mounted() {
		let helpcrunch = document.querySelector('.helpcrunch-iframe-wrapper iframe');
		if (helpcrunch) {
			helpcrunch.style.setProperty('visibility', 'hidden');
		}
		this.popupItem = this.$el;
	},

	beforeDestroy: function () {
		let helpcrunch = document.querySelector('.helpcrunch-iframe-wrapper iframe');
		if (helpcrunch) {
			helpcrunch.style.setProperty('visibility', 'visible', 'important');
		}
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index'
		}),

		async getDayBookings(data) {
			if (this.organization) {
				data.organization_id = this.organization.id;
				let response = await axios.get('/bookings', { params: data });
				if (response) {
					this.organizationBookings = response.data;
				}
			} else {
				this.getBookings(data);
			}
		},

		timeslotBlockChange(time, date) {
			if (time.start && time.end) {
				this.timeToBlock = {
					date: date,
					start: convertTime(time.start),
					end: convertTime(time.end)
				};
			}
		},

		blockTimeslot() {
			if (this.timeToBlock.date && this.timeToBlock.start && this.timeToBlock.end) {
				this.timeslotToBlock.date = null;
				if (!this.$root.auth.blocked_timeslots) {
					this.$set(this.$root.auth, 'blocked_timeslots', []);
				}
				let exists = this.$root.auth.blocked_timeslots.find(x => x.date == this.timeToBlock.date && x.start == this.timeToBlock.start && x.end == this.timeToBlock.end);
				if (!exists) {
					this.$root.auth.blocked_timeslots.push({ date: this.timeToBlock.date, start: this.timeToBlock.start, end: this.timeToBlock.end });
				}
				this.$toast.open('Timeslot blocked.');
				window.axios.post('/auth', this.$root.auth, { toast: true });
			}
		},

		newEventAction(action, interval) {
			/* eslint-disable */
			switch (action) {
				case 'Create booking':
					this.setNewEvent(interval);
					break;

				case 'Block timeslot':
					this.timeslotToBlock = interval;
					break;

				case 'Unblock timeslot':
					let index = this.$root.auth.blocked_timeslots.findIndex(x => x.date == interval.date && x.start == interval.time);
					this.$root.auth.blocked_timeslots.splice(index, 1);
					this.$toast.open('Timeslot unblocked.');
					window.axios.post('/auth', this.$root.auth, { toast: true });
					break;
			}
		},

		timeslotOptions(interval) {
			if (this.isBlocked(interval)) {
				return ['Unblock timeslot'];
			}
			return ['Create booking', 'Block timeslot'];
		},

		isBlocked(interval) {
			return (this.$root.auth.blocked_timeslots || []).find(x => x.date == interval.date && x.start == interval.time) ? true : false;
		},

		intervalFormat(interval) {
			return dayjs(`${interval.date} ${interval.time}`).format('hh:mmA');
		},

		eventClick(event) {
			if (!event.event.newEvent) {
				this.$emit('eventClick', event.event);
				this.newEvent = null;
			}
		},

		setNewEvent(interval) {
			let end = dayjs(`${interval.date} ${interval.time}`).add(1, 'hour').format('HH:mm');
			this.newEvent = { date: interval.date, start: interval.time, end: end, timezone: this.timezone };
			this.$emit('newEvent', JSON.parse(JSON.stringify(this.newEvent)));
		}
	}
};
