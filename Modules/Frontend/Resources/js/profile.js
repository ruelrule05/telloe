require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/js/dist/modal';
import VCalendar from 'v-calendar';
import Toasted from 'vue-toasted';
import dayjs from 'dayjs';
Vue.use(VCalendar);
Vue.use(VueRouter);
Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 3000,
    className: 'bg-primary rounded shadow-none',
});

import VueFormValidate from '../components/vue-form-validate';
import VueButton from '../components/vue-button';
import Modal from '../components/modal/modal.vue';
import ClockIcon from '../icons/clock';
import CalendarDayIcon from '../icons/calendar-day';
import InfoCircleIcon from '../icons/info-circle';
import CheckmarkIcon from '../icons/checkmark';
import ArrowLeftIcon from '../icons/arrow-left';
import CalendarMonthIcon from '../icons/calendar-month';
import ChevronLeftIcon from '../icons/chevron-left';
import ChevronRightIcon from '../icons/chevron-right';
import EarthIcon from '../icons/earth';
import CheckmarkCircleIcon from '../icons/checkmark-circle';
import FacebookIcon from '../icons/facebook';
import GoogleIcon from '../icons/google';

const router = new VueRouter({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
       /* {
            name: 'profile',
            component: ,
        },*/
    ],
});

window.app = new Vue({
    el: '#app',
    router,
    components: {
        VueFormValidate,
        Modal,
        ClockIcon,
        CalendarDayIcon,
        InfoCircleIcon,
        CheckmarkIcon,
        VueButton,
        ArrowLeftIcon,
        CalendarMonthIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
        EarthIcon,
        CheckmarkCircleIcon,
        FacebookIcon,
        GoogleIcon
    },
    data: {
        profile: PROFILE,
        auth: AUTH,
        ready: false,
        services: [],
        selectedService: null,
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
        error: 'sds',
        reviewForm: 'details',

        authError: '',
        loginForm: {
            email: '',
            password: '',
            loading: false,
        },
        timeslotsLoading: false,
        timeslots: [],
        dateForWeekView: null,
        calendarView: 'month',
        sliderNavIndex: 0,
        sliderTranslate: 0,
        sliderItemSize: 86,
        authForm: false, // false
        bookingSuccess: false,
        authAction: 'login',
        GoogleAuth: null,
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
                    index = index+2;
                    if(index >= 8) index = 1;
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

        weekDayOptions() {
            let options = [];

            let dateForWeekView = dayjs();
            //if(this.dateForWeekView) dateForWeekView = dayjs(this.dateForWeekView);
            let daysBefore = [];
            let daysAfter = [];
            for (var i = 1; i <= 90; i++) {
                let before = dateForWeekView.subtract(i, 'day');
                let after = dateForWeekView.add(i, 'day');
               /* daysBefore.unshift({
                    date: before.toDate(),
                    title: before.format('ddd'),
                    description: before.format('D MMM'),
                    label: before.format('YYYY-MM-DD'),
                    id: before.format('MMMDYYYY'),
                });*/
                daysAfter.push({
                    date: after.toDate(),
                    title: after.format('ddd'),
                    description: after.format('D MMM'),
                    label: after.format('YYYY-MM-DD'),
                    id: after.format('MMMDYYYY'),
                });
            }
            dateForWeekView = {
                date: dateForWeekView.hour(0).minute(0).second(0).toDate(),
                title: dateForWeekView.format('ddd'),
                description: dateForWeekView.format('D MMM'),
                label: dateForWeekView.format('YYYY-MM-DD'),
                id: dateForWeekView.format('MMMDYYYY'),
            };
            //options = [...daysBefore, ...[dateForWeekView], ...daysAfter];
            options = [...[dateForWeekView], ...daysAfter];


            return options;
        },

        endTime() {
            let endTime = '';
            if(this.selectedService && this.selectedDate && this.selectedTimeslot) {
                let selectedDate = dayjs(dayjs(this.selectedDate).format('YYYY-MM-DD') + ' ' + this.selectedTimeslot.time);
                endTime = dayjs(selectedDate).add(this.selectedService.duration, 'minute').format('hh:mmA');
            }
            return endTime;
        }
    },

    watch: {
        selectedDate: function(value) {
            if (value) this.error = null;
            this.getTimeslots();
            this.timeslotsLoading = true;
            this.authError = ''; 
        },
        step: function(value) {
            if (value == 4) {
                this.submit();
            }
        },
        selectedService: function(value) {
            this.error = null;
            this.authError = ''; 
            if(!value) {
                this.timeslots = [];
                this.selectedTimeslot = null;
                this.selectedDate = null;
                this.calendarView = 'month';
            }
        }
    },

    created() {
        this.getData();

        if (typeof gapi != 'undefined') {
            gapi.load('auth2', () => {
                this.GoogleAuth = gapi.auth2.init({client_id: '187405864135-kboqmukelf9sio1dsjpu09of30r90ia1.apps.googleusercontent.com'});
            });
        }
    },

    mounted() {
        /*this.$refs['bookingModal'].show();
        setTimeout(() => {
            this.bookingSuccess = true;
        }, 1000);*/
    },

    methods: {
        reset() {
            this.$refs['bookingModal'].hide();
            setTimeout(() => {
                this.selectedService = null;
                this.selectedDate = null;
                this.selectedTimeslot = null;
                this.isBooking = false;
                this.bookingSuccess = false;
                this.authForm = false;
                this.authAction = 'login';
            }, 150);
        },

        disabledDate(date) {
            let dayName = dayjs(date.date).format('dddd');
            return !this.selectedService.days[dayName].isOpen || this.selectedService.holidays.find(x => x == date.label);
        },

        sliderActiveDate(date) {
            return (this.selectedDate ? dayjs(this.selectedDate).format('MMMDYYYY') : '') === dayjs(date.date).format('MMMDYYYY');
        },

        dateSelected(date) {
            if(date && this.calendarView == 'month') {
                this.selectedDate = date;
                //this.dateForWeekView = date;
                this.calendarView = 'week';
                this.sliderNavIndex = 0;
                this.selectedTimeslot = null;
                this.$nextTick(() => {
                    this.calcSliderTranslate();
                });
            }
        },

        adjustSlider(step) {
            let weekdaySlider = this.$refs['weekday-slider'];

            let translateX = new WebKitCSSMatrix(weekdaySlider.style.webkitTransform).m41 - this.sliderItemSize;
            if((step == -1 && translateX < (this.sliderItemSize * -1)) || step == 1) {
                this.sliderNavIndex += step;
            }
        },

        calcSliderTranslate() {
            if(this.$refs['weekday-slider'] && this.calendarView == 'week') {
                let date = this.selectedDate || new Date();
                let dateID = dayjs(date).format('MMMDYYYY');
                let sliderItem = this.$refs['weekday-slider'].querySelector(`#${dateID}`);
                let sliderSize = this.sliderItemSize;
                if(sliderItem) {
                    let index = Array.from(this.$refs['weekday-slider'].children).indexOf(sliderItem);
                    if(index > -1) {
                        //index = index ? index - 1 : 1;
                        this.sliderTranslate = (sliderSize * index) * -1;
                    }
                }
            }
        },

        submit() {
            if(this.authAction == 'login') {
                this.LoginAndBook();
            } else if(this.authAction == 'signup') {
                this.SignupAndBook();
            }
        },

        SignupAndBook() {
            if (this.selectedService && this.selectedDate && this.selectedTimeslot) {
                this.$refs['bookingModal'].show().then(() => {
                    this.loginForm.loading = true;
                    this.isBooking = true;
                    let data = {
                        first_name: this.loginForm.first_name,
                        last_name: this.loginForm.last_name,
                        email: this.loginForm.email,
                        password: this.loginForm.password,
                        date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
                        time: this.selectedTimeslot.time,
                    };
                    axios
                        .post(`/@${this.profile.username}/${this.selectedService.id}/signup_and_book`, data, {toasted: true})
                        .then(response => {
                            this.bookingSuccess = true;
                            this.loginForm.loading = false;
                            this.authForm = false;
                            this.selectedService = this.selectedDate = this.selectedTimeslot = null;
                        })
                        .catch(e => {
                            setTimeout(() => {
                                this.$refs['bookingModal'].hide().then(() => {
                                    this.loginForm.loading = false;
                                    this.isBooking = false;
                                });
                            }, 150);
                        });
                });
            }
        },

        LoginAndBook() {
            if (this.selectedService && this.selectedDate && this.selectedTimeslot) {
                this.$refs['bookingModal'].show().then(() => {
                    this.loginForm.loading = true;
                    this.isBooking = true;
                    let data = {
                        email: this.loginForm.email,
                        password: this.loginForm.password,
                        date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
                        time: this.selectedTimeslot.time,
                    };
                    axios
                        .post(`/@${this.profile.username}/${this.selectedService.id}/login_and_book`, data, {toasted: true})
                        .then(response => {
                            this.bookingSuccess = true;
                            this.loginForm.loading = false;
                            this.authForm = false;
                            this.selectedService = this.selectedDate = this.selectedTimeslot = null;
                        })
                        .catch(e => {
                            setTimeout(() => {
                                this.$refs['bookingModal'].hide().then(() => {
                                    this.loginForm.loading = false;
                                    this.isBooking = false;
                                });
                            }, 150);
                        });
                });
            }
        },

        FacebookLoginAndBook() {
            if (typeof FB != 'undefined' && this.selectedService && this.selectedDate && this.selectedTimeslot) {
                this.$refs['bookingModal'].show().then(() => {
                    this.loginForm.loading = true;
                    this.isBooking = true;
                    FB.login(
                        e => {
                            FB.api('/me', {fields: 'first_name, last_name, email'}, data => {
                                if (data && !data.error) {
                                    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                    data.timezone = timezone;
                                    data.date = dayjs(this.selectedDate).format('YYYY-MM-DD');
                                    data.time = this.selectedTimeslot.time;

                                    axios
                                        .post(`/@${this.profile.username}/${this.selectedService.id}/facebook_login_and_book`, data, {toasted: true})
                                        .then(response => {
                                            this.bookingSuccess = true;
                                            this.loginForm.loading = false;
                                            this.authForm = false;
                                            this.selectedService = this.selectedDate = this.selectedTimeslot = null;
                                        })
                                        .catch(e => {
                                            setTimeout(() => {
                                                this.$refs['bookingModal'].hide().then(() => {
                                                    this.loginForm.loading = false;
                                                    this.isBooking = false;
                                                });
                                            }, 150);
                                        });
                                    
                                } else {
                                    this.$refs['bookingModal'].hide();
                                    setTimeout(() => {
                                        this.loginForm.loading = false;
                                        this.isBooking = false;
                                        this.bookingSuccess = false;
                                    }, 150);
                                }
                            });
                        },
                        {scope: 'email'},
                    );
                });
            }
        },

        GoogleLoginAndBook() {
            if (this.GoogleAuth && this.selectedService && this.selectedDate && this.selectedTimeslot) {
                this.$refs['bookingModal'].show().then(() => {
                    this.loginForm.loading = true;
                    this.isBooking = true;
                    this.GoogleAuth.signIn()
                        .then(googleUser => {
                            let profile = googleUser.getBasicProfile();
                            let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                            let data = {
                                id: profile.getId(),
                                first_name: profile.getGivenName(),
                                last_name: profile.getFamilyName(),
                                email: profile.getEmail(),
                                image_url: profile.getImageUrl(),
                                timezone: timezone,
                                date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
                                time: this.selectedTimeslot.time,
                            };

                            axios
                                .post(`/@${this.profile.username}/${this.selectedService.id}/google_login_and_book`, data, {toasted: true})
                                .then(response => {
                                    this.bookingSuccess = true;
                                    this.loginForm.loading = false;
                                    this.authForm = false;
                                    this.selectedService = this.selectedDate = this.selectedTimeslot = null;
                                })
                                .catch(e => {
                                    setTimeout(() => {
                                        this.$refs['bookingModal'].hide().then(() => {
                                            this.loginForm.loading = false;
                                            this.isBooking = false;
                                        });
                                    }, 150);
                                });
                        })
                        .catch(() => {
                            this.$refs['bookingModal'].hide();
                            setTimeout(() => {
                                this.loginForm.loading = false;
                                this.isBooking = false;
                                this.bookingSuccess = false;
                            }, 150);
                        });
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
                    this.timeslots = response.data;
                    this.timeslotsLoading = false;
                });
            }
        },

        setService(service) {
            this.selectedService = service;
        },

        getData() {
            axios.get(window.location.pathname).then((response) => {
                this.services = response.data;
                //this.selectedService = this.services[0];

                // testing
                /*let now = new Date();
                now.setHours(0, 0, 0);
                this.selectedDate = now;
                this.setService(this.services[0]);
                setTimeout(() => {
                    this.selectedTimeslot = {label: '12:30PM'};
                    this.step = 3;
                });*/

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
