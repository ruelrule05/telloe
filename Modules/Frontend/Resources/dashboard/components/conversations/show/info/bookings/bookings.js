import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
import dayjs from 'dayjs';
import VCalendar from 'v-calendar';
import convertTime from 'convert-time';
Vue.use(VCalendar);
import VueFormValidate from '../../../../../../components/vue-form-validate';
import VueButton from '../../../../../../components/vue-button';
import Modal from '../../../../../../components/modal/modal.vue';
import PlusIcon from '../../../../../../icons/plus';
import TrashIcon from '../../../../../../icons/trash';
import PencilIcon from '../../../../../../icons/pencil';
import CheckmarkCircleIcon from '../../../../../../icons/checkmark-circle';
export default {
    components: {
        VueFormValidate,
        VueButton,
        Modal,
        PlusIcon,
        TrashIcon,
        PencilIcon,
        CheckmarkCircleIcon,
    },

    props: {
        conversation: {
            type: Object,
            required: true,
        },
        membersLength: {
            type: Number,
            default: 0,
        },
        blacklisted_services: {
            type: Array,
            default: [],
        },
    },

    data: () => ({
        user: null,
        selectedService: null,
        selectedBooking: null,
        selectedDate: null,
        selectedTimeslot: '',
        selectedService: '',
        timeslots: [],
        timeslotsLoading: false,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeslotDropdown: false,
        customTime: false,
        step: 1,
        error: '',
        selectAttribute: {
            highlight: {
                fillMode: 'solid',
                contentClass: 'bg-primary',
            },
        },
        loading: false,
    }),

    watch: {
        selectedDate: function(value) {
            this.selectedTimeslot = null;
        },
    },

    computed: {
        ...mapState({
            bookingsReady: state => state.bookings.ready,
            bookings: state => state.bookings.index,
        }),

        userBookings() {
            let bookings = [];
            this.bookings.forEach(booking => {
                let parts = booking.date.split('-');
                booking.new_date = new Date(parts[0], parts[1] - 1, parts[2]);
                bookings.push(booking);
            });

            return bookings;
        },

        formattedHolidays() {
            let formattedHolidays = [];
            if (this.selectedService) {
                let service = this.conversation.user.services.find(x => x.id == this.selectedService.id);
                if (service) {
                    service.holidays.forEach(holiday => {
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

        availableServices() {
            let availableServices = [];
            (this.conversation.user.services || []).forEach(service => {
                if (service.is_available && !this.blacklisted_services.find(x => x.service_id == service.id && x.is_blacklisted)) availableServices.push(service);
            });
            return availableServices;
        },

        nextDisabled() {
            let disabled = true;
            switch (this.step) {
                case 1:
                    if (this.selectedService) disabled = false;
                    break;

                case 2:
                    if (this.selectedDate) disabled = false;
                    break;

                case 3:
                    if (this.selectedTimeslot) disabled = false;
                    break;
            }

            return disabled;
        },
    },

    created() {
        this.getBookings(this.conversation);
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

        resetBookingForm() {
            this.step = 1;
            this.selectedBooking = null;
            this.selectedService = null;
            this.selectedTimeslot = null;
            this.selectedDate = null;
            this.timeslots = [];
            this.timeslotsLoading = false;
            this.loading = false;
        },

        submit() {
            if (this.selectedBooking) {
                this.update(this.selectedBooking);
            } else {
                this.store();
            }
        },

        nextStep() {
            if (!this.nextDisabled) this.step++;
        },

        getTimeZoneOffset(date, timeZone) {
            // Abuse the Intl API to get a local ISO 8601 string for a given time zone.
            const options = {timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
            const dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
            const parts = dateTimeFormat.formatToParts(date);
            const map = new Map(parts.map(x => [x.type, x.value]));
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
            if (hour == '24') hour = '00';
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
            let timezoneTime = dayjs()
                .hour(parts[0])
                .minute(parts[1])
                .add(localTZ - targetTZ, 'minute');
            return timezoneTime.format('hh:mmA');
        },

        edit(booking) {
            if (booking && booking.id != (this.selectedBooking || {}).id) {
                this.step = 2;
                this.selectedBooking = booking;
                this.selectedService = booking.service;
                this.getTimeslots(booking.service_id, booking.date);
            }
        },

        getTimeslots(service_id = '', date = '') {
            if (service_id && date) {
                this.timeslotsLoading = true;
                let service = this.conversation.user.services.find(x => x.id == service_id);
                if (service) {
                    this.timeslots = [];
                    this.selectedTimeslot = null;
                    let dateFormat = dayjs(date).format('YYYY-MM-DD');
                    axios.get(`/@${this.conversation.user.username}/${service_id}/timeslots?date=${dateFormat}`).then(response => {
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
                        this.timeslotsLoading = false;
                    });
                }
            }
        },

        update(booking) {
            if (this.selectedService && this.selectedTimeslot) {
                this.loading = true;
                let formatDate = dayjs(this.selectedDate).format('YYYY-MM-DD');
                let data = {
                    id: booking.id,
                    date: formatDate,
                    start: this.selectedTimeslot.time,
                };
                this.updateBooking(data)
                    .then(() => {
                        this.step = 5;
                    })
                    .catch(e => {
                        this.loading = false;
                        this.error = e.response.data.message;
                    });
            }
        },

        store() {
            if (this.selectedService && this.selectedDate && this.selectedTimeslot) {
                this.loading = true;
                let formatDate = dayjs(this.selectedDate).format('YYYY-MM-DD');
                let data = {
                    date: formatDate,
                    start: this.selectedTimeslot.time,
                    user_id: this.conversation.member.id,
                    service_id: this.selectedService.id,
                };
                this.storeBooking(data)
                    .then(() => {
                        this.step = 5;
                    })
                    .catch(e => {
                        this.loading = false;
                        this.error = e.response.data.message;
                    });
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
