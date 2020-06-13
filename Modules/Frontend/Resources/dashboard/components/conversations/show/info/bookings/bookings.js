import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
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


	data: () => ({
        selectedBooking: null,
		addBooking: false, //false
		selectedDate: null,
        selectedTimeslot: '',
        selectedService: '',
        timeslots: [],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }),

    computed: {
		...mapState({
            services: (state) => state.services.index,
            bookings: (state) => state.bookings.index,
            bookingsReady: (state) => state.bookings.ready,
		}),

        userBookings() {
            let bookings = [];
            this.bookings.forEach((booking) => {
                if(booking.user_id == this.user.id) {
                    let parts = booking.date.split('-');
                    booking.new_date = new Date(parts[0], parts[1] - 1, parts[2]);
                    bookings.push(booking);
                }
            });

            return bookings;
        },
		
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
        'user.id': function() {
            this.getBookings();
        },
        addBooking: function(value) {
            if(value) {
                this.selectedTimeslot = this.selectedDate = this.selectedBooking = null;
                this.selectedService = '';
            }
        },
    },

	created() {
		this.getBookings();
	},

    methods: {
        ...mapActions({
            getBookings: 'bookings/index',
            storeBooking: 'bookings/store',
            updateBooking: 'bookings/update',
            deleteBooking: 'bookings/delete',
        }),

        edit(booking) {
            if(booking) {
                this.addBooking = false;
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
            if(this.selectedService && this.selectedTimeslot) {
        		let formatDate = dayjs(booking.new_date).format('YYYY-MM-DD');
                let parts = booking.date.split('-');

                booking.service_id = this.selectedService;
                booking.new_date = new Date(parts[0], parts[1] - 1, parts[2]);
                booking.date = formatDate;
                booking.start = this.selectedTimeslot.time;
                this.updateBooking(booking);

                this.selectedBooking = this.selectedTimeslot = null;
                this.selectedService = '';
                this.timeslots = [];
            }
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
                this.storeBooking(data);
                this.addBooking = false;
                this.selectedService = null;
                this.selectedDate = null;
                this.selectedService = this.selectedTimeslot = '';
    		}
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