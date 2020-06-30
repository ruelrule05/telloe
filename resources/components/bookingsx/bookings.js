import Vue from 'vue';
import dayjs from 'dayjs';
import VCalendar from 'v-calendar';
import convertTime from 'convert-time';
Vue.use(VCalendar);

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
        selectedBooking: null,
		addBooking: false, //false
		selectedDate: null,
        selectedTimeslot: '',
        services: [],
        selectedService: '',
        timeslots: [],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }),

    computed: {
        formattedHolidays() {
            let formattedHolidays = [];
            if (this.selectedService) {
                let service = this.services.find((x) => x.id == this.selectedService);
                if(service) {
                    service.holidays.forEach((holiday) => {
                        let parts = holiday.split('-');
                        const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
                        formattedHolidays.push(holidayDate);
                    });

                    let disabledDays = [];
                    this.days.forEach((day, index) => {
                        index++;
                        if (!service.days[day].isOpen) disabledDays.push(index);
                    });
                    if (disabledDays.length > 0) {
                        formattedHolidays.push({
                            weekdays: disabledDays,
                        });
                    }
                }
            }
            return formattedHolidays;
        }
    },

    watch: {
        user: function(value) {
            this.getData();
        },
        
        addBooking: function(value) {
            if(value) {
                this.selectedTimeslot = null;
            }
        },
    },


    methods: {
        edit(booking) {
            if(booking) {
                this.selectedBooking = booking;
                this.selectedService = booking.service.id;
                this.getTimeslots(booking.service_id, booking.date);
            }
        },

        getTimeslots(service_id = '', date = '') {
            if (service_id && date) {
                let service = this.services.find((x) => x.id == service_id);
                if(service) {
                    this.timeslots = [];
                    this.selectedTimeslot = null;
                    let dateFormat = dayjs(date).format('YYYY-MM-DD');
                    axios.get(`/@${service.user.username}/${service_id}/timeslots?date=${dateFormat}`).then((response) => {
                        let timeslots = response.data;
                        if(this.selectedBooking && dayjs(this.selectedBooking.date).format('YYYY-MM-DD') == dateFormat) {
                            let parts = this.selectedBooking.start.split(':');
                            let label = dayjs().hour(parts[0]).minute(parts[1]).format('hh:mmA');
                            let timeslot = {
                                label: label,
                                time: this.selectedBooking.start,
                            };
                            if(timeslot.label.length == 6) timeslot.label = `0${timeslot.label}`;
                            this.selectedTimeslot = timeslot;
                            timeslots.push(timeslot);
                        }
                        timeslots = timeslots.sort((a, b) => {
                            return a.time > b.time ? 1 : -1;
                        });
                        this.timeslots = timeslots;
                    });
                }
            }
        },

    	update(booking) {
    		let formatDate = dayjs(booking.new_date).format('YYYY-MM-DD');
    		let data = {
    			date: formatDate,
                start: this.selectedTimeslot.time,
    			service_id: this.selectedService,
    		};
			axios.put(`/dashboard/bookings/${booking.id}`, data).then((response) => {
                let newBooking = response.data;
                let parts = newBooking.date.split('-');
                newBooking.date = new Date(parts[0], parts[1] - 1, parts[2]);
                newBooking.new_date = newBooking.date;
                this.$set(this.bookings, this.bookings.findIndex((x) => x.id == booking.id), newBooking);
                this.selectedBooking = null;
                this.selectedService = '';
                this.timeslots = [];
			});
    	},

    	store() {
    		if(this.selectedService && this.selectedDate && this.selectedTimeslot) {
    			let formatDate = dayjs(this.selectedDate).format('YYYY-MM-DD');
    			let data = {
    				date: formatDate,
    				start: this.selectedTimeslot.time,
                    user_id: this.user.id,
    				service_id: this.selectedService,
    			};
    			this.addBooking = false;

    			axios.post('/dashboard/bookings', data).then((response) => {
                    let newBooking = response.data;
                    let parts = newBooking.date.split('-');
                    newBooking.new_date = newBooking.date;
                    newBooking.date = new Date(parts[0], parts[1] - 1, parts[2]);
    				this.bookings.unshift(newBooking);
    			});
    		}
    	},

        destroy(booking){
            this.$delete(this.bookings, this.bookings.findIndex((x) => x.id == booking.id));
            axios.delete(`/dashboard/bookings/${booking.id}`);
        },

    	async getData() {
            let response = await axios.get(`/dashboard/bookings?user_id=${this.user.id}`);
			response.data.map((booking) => {
				let parts = booking.date.split('-');
				booking.date = new Date(parts[0], parts[1] - 1, parts[2]);
				booking.new_date = booking.date;
			});
			this.bookings = response.data;

            response = await axios.get('/dashboard/services');
            this.services = response.data;

            this.ready = true;
    	},

    	formatTime(time) {
    		let parts = time.split(':');
    		let formatTime = dayjs().hour(parts[0]).minute(parts[1]).format('hh:mmA');
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