import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueButton from '../../../../components/vue-button';
import ChevronLeft from '../../../../icons/chevron-left';
import ChevronRight from '../../../../icons/chevron-right';
import PencilIcon from '../../../../icons/pencil';
import ShortcutIcon from '../../../../icons/shortcut';
import InfoCircleIcon from '../../../../icons/info-circle';
import EyeSlashIcon from '../../../../icons/eye-slash';
import PlusIcon from '../../../../icons/plus';
import CogIcon from '../../../../icons/cog';
import CloseIcon from '../../../../icons/close';
import VCalendar from 'v-calendar';
import utcPlugin from 'dayjs/plugin/utc';
window.Vue.use(VCalendar);
export default {
	components: {
		Modal,
		VueButton,
		ChevronLeft,
		ChevronRight,
		PencilIcon,
		ShortcutIcon,
		InfoCircleIcon,
		EyeSlashIcon,
		PlusIcon,
		CogIcon,
		CloseIcon,
	},

	data: () => ({
		buttonText: {
			today: 'Today',
		},
		customButtons: {
			previous: {
				icon: 'fc-icon fc-icon-chevron-left',
				click: () => {},
			},
		},
		header: {
			left: 'title',
			right: '',
		},
		dayjs: null,
		selectedBooking: null,
		selectConstraint: {
			start: '00:01',
			end: '23:59',
		},
		selectedDate: null,
		fullCalendar: null,
		tab: 'services',

		googleCalendarCalendarAuthWindow: null,
		googleAuthCode: '',
		outlookCalendarCalendarAuthWindow: null,
		outlookAuthCode: '',
		newGoogleCalendarId: '',
		googleAuthUrl: '',
		outlookAuthUrl: '',
		confirmCalendarLoading: false,
		newOutlookCalendarId: '',
		calendarToRemove: '',
		removeCalendarLoading: false,
        infoTab: ''
	}),

	computed: {
		...mapState({
			bookings: state => state.bookings.index,
			conversations: state => state.conversations.index,
			googleCalendarsReady: state => state.bookings.googleCalendarsReady,
			outlookClient: state => state.bookings.outlookClient,
			outlookCalendarsReady: state => state.bookings.outlookCalendarsReady,
			outlookCalendarEvents: state => state.bookings.outlookCalendarEvents,
		}),

		selectedDateBookingsEvents() {
			let items = [];
			if (this.selectedDate && this.dayjs) {
				let formatDate = this.dayjs(this.selectedDate).format('YYYY-MM-DD');
				this.bookings.forEach(booking => {
					if (booking.date == formatDate) {
						booking.type = 'booking';
						items.push(booking);
					}
				});

				this.$root.auth.google_calendar_events.forEach(event => {
					let eventDate = this.dayjs(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
					if (eventDate == formatDate) {
						event.type = 'google-event';
						items.push(event);
					}
				});

				this.$root.auth.outlook_calendar_events.forEach(event => {
					let eventDate = this.dayjs(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
					if (eventDate == formatDate) {
						event.type = 'outlook-event';
						items.push(event);
					}
				});
			}
			return items;
		},

		calendarAttributes() {
			let attributes = [];
			this.bookings.forEach(booking => {
				let bookingDate = this.dayjs(booking.date).format('YYYY-MM-DD');
				attributes.push({
					dot: {
						color: 'red',
					},
					customData: 'booking',
					dates: bookingDate,
				});
			});

			this.$root.auth.google_calendar_events.forEach(event => {
				let eventDate = this.dayjs(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
				attributes.push({
					dot: {
						color: 'red',
					},
					customData: 'event',
					customData: 'google-event',
					dates: eventDate,
				});
			});

			this.$root.auth.outlook_calendar_events.forEach(event => {
				let eventDate = this.dayjs(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
				attributes.push({
					dot: {
						color: 'red',
					},
					customData: 'outlook-event',
					dates: eventDate,
				});
			});

			return attributes;
		},
	},

	watch: {
		'$route.query.date': function(value) {
			let date = value;
			if (date) {
				date = this.dayjs(date).toDate();
				if (date != 'Invalid Date') {
					this.$refs['v-calendar'].focusDate(date);
					this.selectedDate = date;
					this.infoTab = 'bookings';
				}
			}
		},
	},

	created() {
		this.getBookings();
		this.getConversations();
		this.$root.heading = 'Bookings';
		this.dayjs = require('dayjs');
		this.dayjs.extend(utcPlugin);
		let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		let business_hours = [];
		days.forEach(day => {
			business_hours[day] = {
				isOpen: false,
				hours: [
					{
						open: '',
						close: '',
					},
				],
			};
		});

		this.getGoogleClient();
		this.getGoogleCalendarEvents();
		this.getOutlookClient();
		this.getOutlookEvents();
		this.getGoogleCalendars();
		this.getOutlookCalendars();
	},

	mounted() {
		this.$root.contentloading = false;
		//this.fullCalendar = this.$refs['fullCalendar'].getApi();
		$(this.$refs['googleCalendarDropdown']).on('show.bs.dropdown', () => {
			this.getGoogleCalendars();
		});
		$(this.$refs['outlookCalendarDropdown']).on('show.bs.dropdown', () => {
			this.getOutlookCalendars();
		});

		let date = this.$route.query.date;
		if (date) {
			date = this.dayjs(date).toDate();
			if (date != 'Invalid Date') {
				this.$refs['v-calendar'].focusDate(date);
				this.selectedDate = date;
				this.infoTab = 'bookings';
			}
		}
	},

	methods: {
		...mapActions({
			getBookings: 'bookings/index',
			getConversations: 'conversations/index',
			getGoogleCalendars: 'bookings/googleCalendars',
			getOutlookCalendars: 'bookings/outlookCalendars',
		}),

		parseTimezone(data) {
			let date = new Date(data.dateTime + 'Z');
			return this.dayjs(date).format('hh:mmA');
		},

		async removeCalendar() {
			if (this.calendarToRemove) {
				this.removeCalendarLoading = true;
				await axios.post('/remove_calendar', {calendar: this.calendarToRemove.toLowerCase()});
				await this.$refs['removeCalendar'].hide();
				this.removeCalendarLoading = false;
				switch (this.calendarToRemove.toLowerCase()) {
					case 'google':
						this.$root.auth.google_calendar_events = [];
						this.getGoogleClient();
						break;
					case 'outlook':
						this.$root.auth.outlook_calendar_events = [];
						this.getOutlookClient();
						break;
				}
				this.calendarToRemove = '';
			}
		},

		removeCalendarConfirm(calendar) {
			this.calendarToRemove = calendar.charAt(0).toUpperCase() + calendar.slice(1);
			this.$refs['removeCalendar'].show();
		},

		async toggleIgnoreEvent(event) {
			let eventId = `${event.type}-${event.id}`;
			let index = this.$root.auth.ignored_calendar_events.findIndex(x => x == eventId);
			if (index == -1) {
				this.$root.auth.ignored_calendar_events.push(eventId);
			} else {
				this.$root.auth.ignored_calendar_events.splice(index, 1);
			}
			await axios.put('/auth', this.$root.auth);
		},

		async getOutlookEvents() {
			let response = await axios.get(`/outlook_calendar_events`);
			this.$root.auth.outlook_calendar_events = response.data;
		},

		async getGoogleCalendarEvents() {
			let response = await axios.get(`/google_calendar_events`);
			this.$root.auth.google_calendar_events = response.data;
		},

		getGoogleClient() {
			axios.get('/google_client').then(response => {
				this.googleAuthUrl = response.data.authUrl;
			});
		},

		async setGoogleCalendar() {
			this.confirmCalendarLoading = true;
			$(this.$refs['googleCalendarDropdown'])
				.find('select')
				.val(this.newGoogleCalendarId);
			this.$root.auth.google_calendar_id = this.newGoogleCalendarId;
			await axios.post('/update_google_calendar_events', {google_calendar_id: this.newGoogleCalendarId});
			await this.getGoogleCalendarEvents();
			this.confirmCalendarLoading = false;
			this.$refs['changeGoogleCalendar'].hide();
		},

		getOutlookClient() {
			axios.get('/outlook_client').then(response => {
				this.outlookAuthUrl = response.data.authUrl;
			});
		},

		toggleOutlookCalendar(e, calendar) {
			let checked = e.currentTarget.checked;
			let auth_outlook_calendars = this.$root.auth.outlook_calendars;

			if (checked) {
				if (!auth_outlook_calendars.find(x => x == calendar.id)) auth_outlook_calendars.push(calendar.id);
			} else {
				auth_outlook_calendars.splice(
					auth_outlook_calendars.findIndex(x => x == calendar.id),
					1,
				);
			}

			this.$root.auth.outlook_calendars = auth_outlook_calendars;
			axios.put('/auth', this.$root.auth);
		},

		outlookCalendarDropdownToggle(e) {
			if (this.outlookAuthUrl) {
				e.stopPropagation();
				this.goToOutlookAuthUrl();
			}
		},

		goToOutlookAuthUrl() {
			if (this.outlookAuthUrl) {
				const width = 450;
				const height = 650;
				const left = screen.width / 2 - width / 2;
				const top = screen.height / 2 - height / 2;
				this.outlookCalendarCalendarAuthWindow = window.open(this.outlookAuthUrl, 'outlook_calendar_auth_window', `width=${width}, height=${height}, top=${top}, left=${left}`);
				let callbackInterval = setInterval(() => {
					if (this.outlookCalendarCalendarAuthWindow.closed) {
						clearInterval(callbackInterval);
						this.outlookAuthUrl = '';
						$(this.$refs['outlookCalendarDropdown'].querySelector('.dropdown-toggle')).click();
					}
				}, 500);
			}
		},

		changeOutlookCalendar(e) {
			if (this.$root.auth.outlook_calendar_id != e.target.value) {
				this.newOutlookCalendarId = e.target.value;
				this.$refs['changeOutlookCalendar'].show();
				this.$refs['calendar'].click();
			}
		},

		async setOutlookCalendar() {
			this.confirmCalendarLoading = true;
			$(this.$refs['outlookCalendarDropdown'])
				.find('select')
				.val(this.newOutlookCalendarId);
			this.$root.auth.outlook_calendar_id = this.newOutlookCalendarId;
			await axios.post('/update_outlook_calendar_events', {outlook_calendar_id: this.newOutlookCalendarId});
			await this.getOutlookEvents();
			this.confirmCalendarLoading = false;
			this.$refs['changeOutlookCalendar'].hide();
		},

		countEvents(attributes) {
			let count;
			attributes.forEach(attr => {
				if (attr.customData != 'booking') {
					if (!count) count = 0;
					count++;
				}
			});
			return count;
		},

		countBookings(attributes) {
			let count;
			attributes.forEach(attr => {
				if (attr.customData == 'booking') {
					if (!count) count = 0;
					count++;
				}
			});
			return count;
		},

		changeGoogleCalendar(e) {
			if (this.$root.auth.google_calendar_id != e.target.value) {
				this.newGoogleCalendarId = e.target.value;
				this.$refs['changeGoogleCalendar'].show();
				this.$refs['calendar'].click();
			}
		},

		googleCalendarDropdownToggle(e) {
			if (this.googleAuthUrl) {
				e.stopPropagation();
				this.goToGoogleAuthUrl();
			}
		},

		goToGoogleAuthUrl() {
			if (this.googleAuthUrl) {
				const width = 450;
				const height = 650;
				const left = screen.width / 2 - width / 2;
				const top = screen.height / 2 - height / 2;
				this.googleCalendarCalendarAuthWindow = window.open(this.googleAuthUrl, 'google_calendar_auth_window', `width=${width}, height=${height}, top=${top}, left=${left}`);
				let callbackInterval = setInterval(() => {
					if (this.googleCalendarCalendarAuthWindow.closed) {
						clearInterval(callbackInterval);
						if (this.googleCalendarCalendarAuthWindow.code) {
							this.googleAuthCode = this.googleCalendarCalendarAuthWindow.code;
							this.googleAuthUrl = '';
							$(this.$refs['googleCalendarDropdown'].querySelector('.dropdown-toggle')).click();
						}
					}
				}, 500);
			}
		},

		getConversationIdByUserId(user_id) {
			let conversation = this.conversations.find(x => x.members.length == 1 && x.members.find(m => m.user.id == user_id));
			return (conversation || {}).id;
		},

		formatTime(time) {
			let parts = time.split(':');
			let formatTime = this.dayjs()
				.hour(parts[0])
				.minute(parts[1])
				.format('hh:mmA');
			return formatTime;
		},

		dayclick(date) {
			this.selectedDate = date;
		},

		updateBusinessHour(business_hours) {
			this.$root.auth.widget.business_hours = business_hours;

			axios.put('/dashboard/widget', this.$root.auth.widget).then(response => {
				this.$root.auth.widget = response.data;
			});
		},

		goToDate(date) {
			switch (date) {
				case 'today':
					this.fullCalendar.today();
					let now = this.dayjs(this.fullCalendar.getDate()).format('YYYY-MM-D');
					this.selectedDate = now;
					$('.fc-day').removeClass('fc-active');
					$(`.fc-day[data-date=${now}]`).addClass('fc-active');
					break;

				case 'next':
					this.fullCalendar.next();
					break;

				case 'prev':
					this.fullCalendar.prev();
					break;
			}
		},
	},
};
