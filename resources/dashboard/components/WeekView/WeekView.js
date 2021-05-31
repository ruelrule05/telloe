import { mapState, mapActions } from 'vuex';
import { VCalendar } from 'vuetify/lib';
import vuetify from '../../../js/plugins/vuetify';
import dayjs from 'dayjs';
import GoogleIcon from '../../../icons/google.vue';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrAfter);
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
		}
	},

	components: {
		VCalendar,
		GoogleIcon,
		VueDropdown
	},

	data: () => ({
		dayjs: dayjs,
		newEvent: null
	}),

	watch: {
		date: function() {
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
			this.bookings.forEach(booking => {
				let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == booking.id) {
					color = 'bg-primary text-white';
				}
				parsedBookings.push({
					booking: booking,
					name: (booking.service || booking.booking_link).name,
					start: `${booking.date} ${booking.start}`,
					end: `${booking.date} ${booking.end}`,
					category: 'bookings',
					color: color
				});
			});

			this.contactBookings.forEach(booking => {
				let color = 'bg-primary-ultralight hover:bg-primary-light hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == booking.id) {
					color = 'bg-primary text-white';
				}
				booking.type = 'contact-booking';
				parsedBookings.push({
					booking: booking,
					name: (booking.service || booking.booking_link).name,
					start: `${booking.date} ${booking.start}`,
					end: `${booking.date} ${booking.end}`,
					category: 'bookings',
					color: color
				});
			});

			this.googleCalendarEvents.forEach(event => {
				let color = 'bg-red-200 hover:bg-red-400 hover:text-white';
				if (this.selectedBooking && this.selectedBooking.id == event.id) {
					color = 'bg-red-600 text-white';
				}
				event.type = 'google-event';
				let start = this.dayjs(event.start.date || event.start.dateTime);
				let end = this.dayjs(event.end.date || event.end.dateTime);
				let diffInHours = end.diff(start, 'hour');
				if (diffInHours >= 24) {
					end = start.add(24, 'hour').subtract(1, 'second');
				}
				start = start.format('YYYY-MM-DD HH:mm');
				end = end.format('YYYY-MM-DD HH:mm');
				event.startDate = start;
				event.endDate = end;
				let dayEvent = {
					booking: event,
					name: event.summary,
					type: 'google-event',
					start: start,
					end: end,
					category: 'bookings',
					color: color
				};
				parsedBookings.push(dayEvent);
			});

			if (this.newEvent) {
				parsedBookings.push({
					newEvent: true,
					name: 'New Event',
					start: `${this.newEvent.date} ${this.newEvent.start}`,
					end: `${this.newEvent.date} ${this.newEvent.end}`,
					color: 'bg-gray-200'
				});
			}

			return parsedBookings.filter((v, i, a) => a.findIndex(t => (t.booking || {}).id === (v.booking || {}).id) === i);
		}
	},

	created() {},

	mounted() {
		this.getWeekBookings();
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index'
		}),

		isPrevious(interval) {
			let nowMs = dayjs().unix();
			let invervalMs = dayjs(`${interval.date} ${interval.time}`).unix();
			return nowMs >= invervalMs;
		},

		isBlocked(interval) {
			return (this.$root.auth.blocked_timeslots || []).find(x => x.date == interval.date && x.start == interval.time) ? true : false;
		},

		timeslotOptions(interval) {
			if (this.isBlocked(interval)) {
				return ['Unblock timeslot'];
			}
			return ['Create booking', 'Block timeslot'];
		},

		newEventAction(action, interval) {
			let dateTimeslot = dayjs(`${interval.date} ${interval.time}`);
			let start = dateTimeslot.format('HH:mm');
			let end = dateTimeslot.add(1, 'hour').format('HH:mm');
			/* eslint-disable */
			switch (action) {
				case 'Create booking':
					this.setNewEvent(interval);
					break;

				case 'Block timeslot':
					if (!this.$root.auth.blocked_timeslots) {
						this.$set(this.$root.auth, 'blocked_timeslots', []);
					}
					let exists = this.$root.auth.blocked_timeslots.find(x => x.date == interval.date && x.start == interval.time);
					if (!exists) {
						this.$root.auth.blocked_timeslots.push({ date: interval.date, start: start, end: end });
					}
					this.$toast.open('Timeslot blocked.');
					window.axios.post('/auth', this.$root.auth, { toast: true });
					break;

				case 'Unblock timeslot':
					let index = this.$root.auth.blocked_timeslots.findIndex(x => x.date == interval.date && x.start == interval.time);
					this.$root.auth.blocked_timeslots.splice(index, 1);
					this.$toast.open('Timeslot unblocked.');
					window.axios.post('/auth', this.$root.auth, { toast: true });
					break;
			}
		},

		getWeekBookings() {
			this.getBookings({
				from: this.$refs.calendar.lastStart.date,
				to: this.$refs.calendar.lastEnd.date,
				commit: false
			});
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
			let end = dayjs(`${interval.date} ${interval.time}`)
				.add(1, 'hour')
				.format('HH:mm');
			this.newEvent = { date: interval.date, start: interval.time, end: end };
			this.$emit('newEvent', JSON.parse(JSON.stringify(this.newEvent)));
		}
	}
};
