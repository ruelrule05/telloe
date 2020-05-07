import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import BusinessHours from '../../../components/vue-business-hours/BusinessHours';
import ChevronLeft from '../../../icons/chevron-left';
import ChevronRight from '../../../icons/chevron-right';
export default {
	components: {FullCalendar, BusinessHours, ChevronLeft, ChevronRight},

	data: () => ({
		events: [
			{
				title: 'Sunny Out of Office',
				start: '2020-04-29',
				end: '2020-04-29',
			},
		],
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
	}),

	computed: {},

	created() {
		this.$root.heading = 'Bookings';
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
		console.log(this.business_hours);
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
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
