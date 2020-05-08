import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import BusinessHours from '../../../components/vue-business-hours/BusinessHours';
import ChevronLeft from '../../../icons/chevron-left';
import ChevronRight from '../../../icons/chevron-right';
import convertTime from 'convert-time';
export default {
	components: {FullCalendar, BusinessHours, ChevronLeft, ChevronRight},

	data: () => ({
		events: [],
		calendarPlugins: [dayGridPlugin, bootstrapPlugin],
		business_hours: null,
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
	}),

	computed: {},

	created() {
		this.$root.heading = 'Bookings';
		this.dayjs = require('dayjs');
		let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		let business_hours = [];
		days.forEach((day) => {
			business_hours[day] = {
				isOpen: false,
				hours: [
					{
						open: "",
						close: "",
					}
				]
			};
		});
		this.business_hours = Object.assign({}, business_hours, this.$root.auth.widget.business_hours || {});
		this.$root.auth.widget.bookings.forEach((booking) => {
			let event = {
				id: booking.id,
				title: booking.user.full_name,
				start: `${booking.date} ${convertTime(booking.start)}`,
				end: `${booking.date} ${convertTime(booking.end)}`,
			};
			this.events.push(event);
		});
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
		eventRender(info) {
			let title = `<strong class="d-block font-heading">${info.event.title}</strong>`;
			title += `<small class="d-block">Start: ${this.dayjs(info.event.start).format('h:mmA')}<br />`;
			title += `End: ${this.dayjs(info.event.end).format('h:mmA')}</small>`;
			$(info.el).tooltip({
				title: title, 
				container: 'body',
				html: true,
			});
		},

		eventClick(info) {
			let booking = this.$root.auth.widget.bookings.find((x) => x.id ==  info.event.id);
			if(booking) {
				this.selectedBooking = booking;
			}
		},

		updateBusinessHour(business_hours) {
			this.$root.auth.widget.business_hours = business_hours;
			
			axios.put('/dashboard/widget', this.$root.auth.widget).then((response) => {
				this.$root.auth.widget = response.data;
			});
		},

		goToDate(date) {
			let fullCalendar = this.$refs['fullCalendar'].getApi();
			switch (date) {
				case 'today':
					fullCalendar.today();
					break;

				case 'next':
					fullCalendar.next();
					break;

				case 'prev':
					fullCalendar.prev();
					break;
			}
		},
	},
};
