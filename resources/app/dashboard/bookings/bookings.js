import dayjs from 'dayjs';
export default {
	components: {
		
	},

	data: () => ({
		ready: false,
		bookings: [],
	}),

	computed: {
	},

	created() {
		this.getData();
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
    	getData() {
    		axios.get(`/dashboard/bookings`).then((response) => {
    			this.bookings = response.data;
    			this.ready = true;
    		});
    	},

        formatDate(date) {
            return dayjs(date).format('MMMM D, YYYY');
        },

        formatTime(time) {
        	let parts = time.split(':');
        	let date = dayjs().set('hour', parts[0]).set('minute', parts[1]);
        	return date.format('h:mmA');
        },
	},
};
