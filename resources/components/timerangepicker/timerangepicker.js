import dayjs from 'dayjs';
export default{
    props: {
        start: {
            type: String,
            default: null
        },
        end: {
            type: String,
            default: null
        },
    },


	data: () => ({
		time_start: null,
		time_end: null,
    }),

    computed: {
    	hours() {
    		let now = dayjs();
    		now = now.hour(0).minute(0);
    		let hours = [];
    		for(let i = 0; i < 24; i++) {
    			hours.push({
    				time: now.format('HH:mm'),
    				label: now.format('h:mmA'),
    			});
    			hours.push({
    				time: now.add(30, 'minute').format('HH:mm'),
    				label: now.add(30, 'minute').format('h:mmA'),
    			});
    			now = now.add(60, 'minute');
    		}
    		return hours;
    	},

        startHours() {
            let startHours = [];
            this.hours.forEach((hour) => {
                if(!this.time_end || hour.time < this.time_end.time) {
                    startHours.push(hour);
                }
            })
            return startHours;
        },

        endHours() {
            let endHours = [];
            this.hours.forEach((hour) => {
                if(!this.time_start || hour.time > this.time_start.time) {
                    endHours.push(hour);
                }
            })
            return endHours;
        },
    },

    watch: {
        time_start: function(value) {
            this.$emit('update', {start: this.time_start, end: this.time_end})
        },
        time_end: function(value) {
            this.$emit('update', {start: this.time_start, end: this.time_end})
        },
    },

    mounted() {
        $(this.$refs['start']).on('show.bs.dropdown', () => {
            setTimeout(() => {
                if(this.time_start) {
                    this.$refs['dropdown-start'].querySelector(`#start-${this.time_start.time.replace(':', '')}`).scrollIntoView({
                        block: 'center'
                    });
                }
            }, 50);
        });
        $(this.$refs['end']).on('show.bs.dropdown', () => {
            setTimeout(() => {
                if(this.time_end) {
                    this.$refs['dropdown-end'].querySelector(`#end-${this.time_end.time.replace(':', '')}`).scrollIntoView({
                        block: 'center'
                    });
                }
            }, 50);
        });
    },

    created() {
        let hours = this.hours;
        if(this.start) this.time_start = hours.find((x) => x.time == this.start);
        if(this.end) this.time_end = hours.find((x) => x.time == this.end);
    },

    methods: {
        formatDate(date) {
            return dayjs(date).format('MMMM D, YYYY');
        },
    }
}