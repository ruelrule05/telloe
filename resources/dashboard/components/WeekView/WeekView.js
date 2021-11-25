import { mapState, mapActions } from 'vuex';
import { VCalendar } from 'vuetify/lib';
import vuetify from '../../../js/plugins/vuetify';
import dayjs from 'dayjs';
import GoogleIcon from '../../../icons/google.vue';
import CloseIcon from '../../../icons/close.vue';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
dayjs.extend(IsSameOrAfter);
dayjs.extend(timezone);
dayjs.extend(utc);
import ClickOutside from 'vue-click-outside';
import Timerangepicker from '../../../components/timerangepicker/timerangepicker.vue';
import convertTime from '../../../js/plugins/convert-time';
import timezoneTime from '../../../js/helpers/TimezoneTime.js';
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';
import OutlookIcon from '../../../icons/outlook.vue';

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

	directives: {
		ClickOutside
	},

	components: {
		VDatePicker,
		VCalendar,
		GoogleIcon,
		VueDropdown,
		Timerangepicker,
		CloseIcon,
		OutlookIcon
	},

	data: () => ({
		masks: {
			input: 'MMM D, YYYY'
		},
		dayjs: dayjs,
		newEvent: null,
		timeslotToBlock: {},
		timeToBlock: {},
		convertTime: convertTime,
		organizationBookings: []
	}),

	watch: {
		date: function () {
			this.$nextTick(() => {
				this.getWeekBookings();
			});
		}
	},

	computed: {
		...mapState({
			bookings: state => state.bookings.index
		}),

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
			}

			this.googleCalendarEvents.forEach(event => {
				if (!event.id.includes('telloebooking')) {
					let calendarEvent = JSON.parse(JSON.stringify(event));
					let color = 'bg-red-200 hover:bg-red-400 hover:text-white';
					if (this.selectedBooking && this.selectedBooking.id == calendarEvent.id) {
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
						booking: calendarEvent,
						name: calendarEvent.summary,
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

			if (this.newEvent) {
				parsedBookings.push({
					newEvent: true,
					name: 'New Event',
					start: this.newEvent.date + ' ' + timezoneTime.get(`${this.newEvent.date} ${this.newEvent.start}`, this.newEvent.timezone, this.timezone),
					end: this.newEvent.date + ' ' + timezoneTime.get(`${this.newEvent.date} ${this.newEvent.end}`, this.newEvent.timezone, this.timezone),
					color: 'bg-gray-200'
				});
			}

			return parsedBookings.filter((v, i, a) => a.findIndex(t => (t.booking || {}).id === (v.booking || {}).id) === i || (v.booking || {}).recurring_end);
		}
	},

	created() {},

	mounted() {
		let helpcrunch = document.querySelector('.helpcrunch-iframe-wrapper iframe');
		if (helpcrunch) {
			helpcrunch.style.setProperty('visibility', 'hidden');
		}
		this.getWeekBookings();
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

		timeslotBlockChange(time, date) {
			if (time.start && time.end) {
				date = dayjs(date).format('YYYY-MM-DD');
				this.timeToBlock = {
					start: `${date} ${convertTime(time.start)}`,
					end: `${this.timeslotBlockEndDate} ${convertTime(time.end)}`,
					timezone: this.timezone
				};
			}
		},
		timeslotBlockEndDateChange(date) {
			date = dayjs(date).format('YYYY-MM-DD');
			if (this.timeToBlock && this.timeToBlock.end) {
				let end = dayjs(this.timeToBlock.end).format('HH:mm');
				this.timeToBlock.end = `${date} ${end}`;
			}
			this.timeslotBlockEndDate = date;
		},

		isPrevious(interval) {
			let nowMs = dayjs().unix();
			let invervalMs = dayjs(`${interval.date} ${interval.time}`).unix();
			return nowMs >= invervalMs;
		},

		isBlocked(interval) {
			return (this.$root.auth.blocked_timeslots || []).find(x => x.date == interval.date && x.start == interval.time) ? true : false;
		},

		blockTimeslot() {
			if (this.timeToBlock.start && this.timeToBlock.end) {
				this.timeslotToBlock.date = null;
				if (!this.$root.auth.blocked_timeslots) {
					this.$set(this.$root.auth, 'blocked_timeslots', []);
				}
				this.$root.auth.blocked_timeslots.push(this.timeToBlock);
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
					this.timeslotBlockEndDate = dayjs(interval.date).format('YYYY-MM-DD');
					break;

				case 'Unblock timeslot':
					let index = this.$root.auth.blocked_timeslots.findIndex(x => x.date == interval.date && x.start == interval.start && x.end == interval.end);
					this.$root.auth.blocked_timeslots.splice(index, 1);
					this.$toast.open('Timeslot unblocked.');
					window.axios.post('/auth', this.$root.auth, { toast: true });
					break;
			}
		},

		async getWeekBookings() {
			if (this.$refs.calendar) {
				let data = {
					from: this.$refs.calendar.lastStart.date,
					to: this.$refs.calendar.lastEnd.date,
					commit: false
				};
				if (this.organization) {
					data.organization_id = this.organization.id;
					let response = await axios.get('/bookings', { params: data });
					if (response) {
						this.organizationBookings = response.data;
					}
				} else {
					this.getBookings(data);
				}
			}
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
