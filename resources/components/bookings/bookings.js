import dayjs from 'dayjs';
import Timerangepicker from '../timerangepicker/timerangepicker.vue';
import VCalendar from 'v-calendar';
window.Vue.use(VCalendar);

export default{
	components: {Timerangepicker},
	
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
		addBooking: false,
		date: null,
		start: null,
		end: null,
    }),

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
    				user_id: this.user.id
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

    	timeUpdate(time) {
    		this.start = (time.start || {}).time;
    		this.end = (time.end || {}).time;
    	},

    	getData() {
    		axios.get(`/dashboard/bookings?user_id=${this.user.id}`).then((response) => {
    			response.data.map((booking) => {
    				let parts =booking.date.split('-');
    				booking.date = new Date(parts[0], parts[1] - 1, parts[2]);
    				booking.new_date = booking.date;
    				booking.new_start = booking.start;
    				booking.new_end = booking.end;
    			});
    			this.bookings = response.data;
    			this.ready = true;
    		});
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