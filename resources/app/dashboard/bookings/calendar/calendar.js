import BusinessHours from '../../../../components/vue-business-hours/BusinessHours';
import ChevronLeft from '../../../../icons/chevron-left';
import ChevronRight from '../../../../icons/chevron-right';
import convertTime from 'convert-time';
import VCalendar from 'v-calendar';
window.Vue.use(VCalendar);
export default {
	components: {
		BusinessHours, ChevronLeft, ChevronRight,
	},

	data: () => ({
		bookings: [],
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
	}),

	computed: {
		selectedDateBookings() {
			let bookings = [];
			if(this.selectedDate && this.dayjs) {
				let formatDate = this.dayjs(this.selectedDate).format('YYYY-MM-DD');
				this.bookings.forEach((booking) => {
					if(booking.date == formatDate) bookings.push(booking);
				});
			}
			return bookings;
		},

		calendarAttributes(){
			let attributes = [];
			this.bookings.forEach((booking) => {
				let bookingDate = this.dayjs(booking.date).format('YYYY-MM-DD');
				attributes.push({
					dot: {
						color: 'red',
					},
					dates: bookingDate
				});
			});
			return attributes;
		}
	},

	created() {
		this.getData();
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

		let now = new Date();
		now.setHours(0,0,0);
		this.selectedDate = now;
	},

	mounted() {
		this.$root.contentloading = false;
		//this.fullCalendar = this.$refs['fullCalendar'].getApi();
	},

	methods: {
		dayclick(date){
			this.selectedDate = date;
		},

		updateBusinessHour(business_hours) {
			this.$root.auth.widget.business_hours = business_hours;
			
			axios.put('/dashboard/widget', this.$root.auth.widget).then((response) => {
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

    	getData() {
    		axios.get(`/dashboard/bookings`).then((response) => {
    			/*response.data.map((booking) => {
    				let parts =booking.date.split('-');
    				booking.new_date = booking.date;
    				booking.new_start = booking.start;
    				booking.new_end = booking.end;
    			});*/
    			this.bookings = response.data;
    		});
    	},

	},
};
