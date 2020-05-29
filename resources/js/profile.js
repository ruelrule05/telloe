require('./bootstrap');

window.Vue = require('vue');
import 'bootstrap/js/dist/modal';
import VCalendar from 'v-calendar';
import convertTime from 'convert-time';
import dayjs from 'dayjs';
window.Vue.use(VCalendar);

import VueFormValidate from '../components/vue-form-validate';
import VueButton from '../components/vue-button';
import Modal from '../components/modal/modal.vue';
import Profile from '../app/profile/profile.vue';
import ClockIcon from '../icons/clock';
import CalendarDayIcon from '../icons/calendar-day';
import InfoCircleIcon from '../icons/info-circle';
import CheckmarkIcon from '../icons/checkmark';
new Vue({
    el: '#app',
    components: {
        VueFormValidate,
        Modal,
        Profile,
        ClockIcon,
        CalendarDayIcon,
        InfoCircleIcon,
        CheckmarkIcon,
        VueButton,
    },
    data: {
        auth: AUTH,
        ready: false,
        services: [],
        selectedService: null,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        selectAttribute: {
            highlight: {
                fillMode: 'solid',
                contentClass: 'bg-primary',
            },
        },
        step: 1,
        selectedDate: null,
        selectedTimeslot: null,
        detailsConfirmed: false,
        error: null,
        reviewForm: 'register',

        authError: '',
        loginForm: {
            email: 'clyde@telloe.com',
            password: 'adminx',
            loading: false,
        },
    },

    computed: {
        formattedHolidays() {
            let formattedHolidays = [];
            if (this.selectedService) {
                this.selectedService.holidays.forEach((holiday) => {
                    let parts = holiday.split('-');
                    const holidayDate = new Date(parts[0], parts[1] - 1, parts[2]);
                    formattedHolidays.push(holidayDate);
                });

                let disabledDays = [];
                this.days.forEach((day, index) => {
                    index++;
                    if (!this.selectedService.days[day].isOpen) disabledDays.push(index);
                });
                if (disabledDays.length > 0) {
                    formattedHolidays.push({
                        weekdays: disabledDays,
                    });
                }
            }
            return formattedHolidays;
        },

        nextDisabled() {
            let disabled = true;
            switch (this.step) {
                case 1:
                    if (this.selectedDate) disabled = false;
                    break;

                case 2:
                    if (this.selectedTimeslot) disabled = false;
                    break;

                case 3:
                    disabled = this.auth ? false : true;
                    break;
            }

            return disabled;
        },

        buttonText() {
            let buttonText = 'Next';
            switch (this.step) {
                case 1:
                    buttonText = 'Select time';
                    break;

                case 2:
                    buttonText = 'Review details';
                    break;

                case 3:
                    buttonText = 'Book';
                    break;

                case 4:
                    buttonText = 'Booking';
                    break;
            }

            return buttonText;
        },
    },

    watch: {
        selectedDate: function(value) {
            if (value) this.error = null;
            this.getTimeslots();
        },
        step: function(value) {
            if (value == 4) {
                this.submit();
            }
        },
    },

    created() {
        this.getData();
    },

    mounted() {},

    methods: {
        login() {
            if (this.loginForm.email && this.loginForm.password) {
                this.loginForm.loading = true;
                axios
                    .post('/login', this.loginForm)
                    .then((response) => {
                        this.auth = response.data;
                        this.reviewForm = 'details';
                    })
                    .catch((e) => {
                        this.loginForm.loading = false;
                        this.authError = e.response.data.message;
                    });
            }
        },

        submit() {
            if (this.selectedService && this.selectedDate && this.selectedTimeslot && this.detailsConfirmed) {
                let data = {
                    date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
                    time: this.selectedTimeslot.time,
                    timex: '24:00',
                };
                axios
                    .post(`${window.location.pathname}/${this.selectedService.id}/book`, data)
                    .then((response) => {
                        console.log(response.data);
                        this.step = 5;
                    })
                    .catch((e) => {
                        this.error = e.response.data.message;
                        this.resetStep();
                    });
            }
        },

        formatDate(date) {
            let formatDate = '';
            if (date) formatDate = dayjs(date).format('MMMM DD, YYYY');
            return formatDate;
        },

        resetStep() {
            this.step = 1;
            this.selectedTimeslot = this.selectedDate = null;
        },

        getTimeslots() {
            if (this.selectedService && this.selectedDate) {
                this.selectedTimeslot = null;
                axios.get(`${window.location.pathname}/${this.selectedService.id}/timeslots?date=${dayjs(this.selectedDate).format('YYYY-MM-DD')}`).then((response) => {
                    this.$set(this.selectedService, 'timeslots', response.data);
                });
            }
        },

        setService(service) {
            this.$refs['serviceModal'].show();
            this.selectedService = service;
        },

        getData() {
            axios.get(window.location.pathname).then((response) => {
                this.services = response.data;

                // testing
                let now = new Date();
                now.setHours(0, 0, 0);
                this.selectedDate = now;
                this.setService(this.services[0]);
                setTimeout(() => {
                    this.selectedTimeslot = {label: '12:30PM'};
                    this.step = 3;
                });

                this.ready = true;
            });
        },

        nextStep() {
            if (!this.nextDisabled) this.step++;
            if (this.step == 4) this.detailsConfirmed = true;
        },

        stepClass(step) {
            let stepClass = [];
            if (this.step == step) stepClass.push('step-current');
            switch (step) {
                case 1:
                    if (this.selectedDate) stepClass.push('step-complete');
                    break;

                case 2:
                    if (this.selectedTimeslot) stepClass.push('step-complete');
                    break;

                case 3:
                    if (this.detailsConfirmed) stepClass.push('step-complete');
                    break;
            }
            return stepClass.join(' ');
        },
    },
});
