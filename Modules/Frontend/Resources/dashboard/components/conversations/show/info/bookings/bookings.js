import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
import dayjs from 'dayjs';
import VCalendar from 'v-calendar';
import convertTime from 'convert-time';
Vue.use(VCalendar);
import PlusIcon from '../../../../../../icons/plus';
import TrashIcon from '../../../../../../icons/trash';
import PencilIcon from '../../../../../../icons/pencil';
export default {
    components: {
        PlusIcon,
        TrashIcon,
        PencilIcon,
    },

    props: {
        user: {
            type: Object,
            required: true,
        },
        membersLength: {
            type: Number,
            default: 0
        }
    },

    data: () => ({
        selectedBooking: null,
        selectedDate: null,
        selectedTimeslot: '',
        selectedService: '',
        timeslots: [],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeslotDropdown: false,
        customTime: false,
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
                if (booking.user_id == this.user.id) {
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
                if (service) {
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
        },
    },

    watch: {
        'user.id': function() {
            this.getBookings();
        },
    },

    created() {
        this.getBookings();
        this.selectedService = (this.services[0] || {}).id;
    },

    mounted() {
        $(this.$refs['newBookingDropdown']).on('hidden.bs.dropdown', () => {
            this.resetBookingForm();
        });
    },

    methods: {
        ...mapActions({
            getBookings: 'bookings/index',
            storeBooking: 'bookings/store',
            updateBooking: 'bookings/update',
            deleteBooking: 'bookings/delete',
        }),

        getTimeZoneOffset(date, timeZone) {
            // Abuse the Intl API to get a local ISO 8601 string for a given time zone.
            const options = {timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
            const dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
            const parts = dateTimeFormat.formatToParts(date);
            const map = new Map(parts.map((x) => [x.type, x.value]));
            const year = map.get('year');
            const month = map.get('month');
            const day = map.get('day');
            let hour = map.get('hour');
            const minute = map.get('minute');
            const second = map.get('second');
            const ms = date
                .getMilliseconds()
                .toString()
                .padStart(3, '0');
            if(hour == '24') hour = '00';
            const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}`;

            // Lie to the Date object constructor that it's a UTC time.
            const lie = new Date(iso + 'Z');

            // Return the difference in timestamps, as minutes
            // Positive values are West of GMT, opposite of ISO 8601
            // this matches the output of `Date.getTimeZoneOffset`
            return -(lie - date) / 60 / 1000;
        },

        timezoneTime(timeZone, target_timeZone, time) {
            let localTZ = this.getTimeZoneOffset(new Date(), timeZone);
            let targetTZ = this.getTimeZoneOffset(new Date(), target_timeZone);
            let parts = time.split(':');
            let timezoneTime = dayjs().hour(parts[0]).minute(parts[1]).add(localTZ - targetTZ, 'minute');
            return timezoneTime.format('hh:mmA');
        },

        resetBookingForm() {
            this.selectedDate = null;
            this.selectedService = (this.services[0] || {}).id;
            this.selectedTimeslot = '';
            this.timeslotDropdown = false;
            this.customTime = false;
            this.$refs['addBookingTitle'].click();
        },

        edit(booking) {
            if (booking && booking.id != (this.selectedBooking || {}).id) {
                this.selectedBooking = booking;
                this.selectedService = booking.service.id;
                this.getTimeslots(booking.service_id, booking.date);
            }
        },

        getTimeslots(service_id = '', date = '') {
            if (service_id && date) {
                let service = this.services.find((x) => x.id == service_id);
                if (service) {
                    this.timeslots = [];
                    this.selectedTimeslot = null;
                    let dateFormat = dayjs(date).format('YYYY-MM-DD');
                    axios.get(`/@${service.user.username}/${service_id}/timeslots?date=${dateFormat}`).then((response) => {
                        let timeslots = response.data;
                        if (this.selectedBooking && dayjs(this.selectedBooking.date).format('YYYY-MM-DD') == dateFormat) {
                            let parts = this.selectedBooking.start.split(':');
                            let label = dayjs()
                                .hour(parts[0])
                                .minute(parts[1])
                                .format('hh:mmA');
                            let timeslot = {
                                label: label,
                                time: this.selectedBooking.start,
                            };
                            if (timeslot.label.length == 6) timeslot.label = `0${timeslot.label}`;
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
            if (this.selectedService && this.selectedTimeslot) {
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
            if (this.selectedService && this.selectedDate && this.selectedTimeslot) {
                let formatDate = dayjs(this.selectedDate).format('YYYY-MM-DD');
                let data = {
                    date: formatDate,
                    start: this.selectedTimeslot.time,
                    user_id: this.user.id,
                    service_id: this.selectedService,
                };
                this.storeBooking(data);
                this.resetBookingForm();
            }
        },

        formatTime(time) {
            let parts = time.split(':');
            let formatTime = dayjs()
                .hour(parts[0])
                .minute(parts[1])
                .format('hh:mmA');
            return formatTime;
        },

        formatDate(date) {
            return dayjs(date).format('MMMM D, YYYY');
        },

        toDate(string) {
            return dayjs(string);
        },
    },
};
