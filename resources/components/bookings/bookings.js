import dayjs from 'dayjs';
import VCalendar from 'v-calendar';
window.Vue.use(VCalendar);

export default{
	
	props: {
		user: {
			type: Object,
			required: true
		}
	},

	created() {
		this.getData();
	},

	data: () => ({
		ready: false,
		bookings: [],
		addBooking: true, //false
		date: null,
        timeslot: '',
        services: [],
        selectedService: '',
    }),

    computed: {
        timeslots() {
            let timeslots = [];
            if(this.selectedService && this.date) {
                const dateFormat = dayjs(this.date).format('YYYY-MM-DD')
                const dayName = dayjs(this.date).format('dddd');
                let available_time = this.selectedService.days[dayName];

                let start_time = dayjs(`${dateFormat} ${available_time.start}`);
                let end_time = dayjs(`${dateFormat} ${available_time.end}`);
                let breaktimes = this.selectedService.days[dayName].breaktimes;
                let holidays = this.selectedService.holidays;

                while(start_time < end_time) {
                    timeslots.push({
                        time: start_time.format('HH:mm'),
                        label: start_time.format('hh:mmA'),
                    });
                    start_time = start_time.add(this.selectedService.duration + 30, 'minute');
                }

            }

            return timeslots;
        },

        formattedHolidays() {
            let formattedHolidays = [];
            if(this.selectedService) {
                this.selectedService.holidays.forEach((holiday) => {
                    let parts = holiday.split('-');
                    const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
                    formattedHolidays.push(holidayDate);
                });
            }
            return formattedHolidays;
        }
    },


    methods: {
    	update(booking) {
    		let formatDate = dayjs(booking.new_date).format('YYYY-MM-DD');
    		let data = {
    			date: formatDate,
    			start: booking.new_start,
    			end: booking.new_end,
    		};
			axios.put(`/dashboard/bookings/${booking.id}`, data).then((response) => {
				booking.date = booking.new_date;
				booking.start = booking.new_start;
				booking.end = booking.new_end;
				booking.edit = false;
				this.$set(booking, booking);
			});
    	},

    	store() {
    		if(this.date && this.start && this.end) {
    			let formatDate = dayjs(this.date).format('YYYY-MM-DD');
    			let data = {
    				date: formatDate,
    				start: this.start,
    				end: this.end,
                    user_id: this.user.id,
    				service_id: this.service_id,
    			};
    			this.addBooking = false;
    			axios.post('/dashboard/bookings', data).then((response) => {
    				this.bookings.unshift(response.data);
    			});
    		}
    	},

        deleteBooking(booking){
            this.$delete(this.bookings, this.bookings.findIndex((x) => x.id == booking.id));
            axios.delete(`/dashboard/bookings/${booking.id}`);
        },

    	async getData() {
            let response = await axios.get(`/dashboard/bookings?user_id=${this.user.id}`);
			response.data.map((booking) => {
				let parts = booking.date.split('-');
				booking.date = new Date(parts[0], parts[1] - 1, parts[2]);
				booking.new_date = booking.date;
				booking.new_start = booking.start;
				booking.new_end = booking.end;
			});
			this.bookings = response.data;

            response = await axios.get('/dashboard/services');
            this.services = response.data;
            this.selectedService = this.services[0];

            this.ready = true;
    	},

    	formatTime(time) {
    		let parts = time.split(':');
    		let formatTime = dayjs().hour(parts[0]).minute(parts[1]).format('h:mmA');
    		return formatTime;
    	},

        formatDate(date) {
            return dayjs(date).format('MMMM D, YYYY');
        },

        toDate(string){
        	return dayjs(string);
        }
    }
}