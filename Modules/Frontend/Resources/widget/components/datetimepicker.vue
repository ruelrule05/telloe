<template>
    <div class="snapturebox-h-100">
        <div class="snapturebox-d-flex snapturebox-flex-column snapturebox-h-100">
            <div class="snapturebox-flex-grow-1">
                <h5 class="snapturebox-mb-4">Select date and available timeslot</h5>
                <div class="snapturebox-border snapturebox-rounded snapturebox-datepicker snapturebox-position-relative">
                    <DatePicker title-position="left" v-model="date" :masks="{input: 'MMMM D, YYYY'}" class="snapturebox-flex-grow-1" :popover="{visibility: 'focus'}" :attributes="calendarAttributes" color="indigo" @input="selectedTime = ''" :min-date="new Date()">
                        <input slot-scope="{inputProps, inputEvents, isDragging}" class="snapturebox-form-control snapturebox-cursor-pointer" readonly placeholder="Select date" v-bind="inputProps" v-on="inputEvents" />
                    </DatePicker>
                    <calendar-icon class="snapturebox-pointer-events-none" fill="#999"></calendar-icon>
                </div>

                <div class="snapturebox-d-flex snapturebox-flex-wrap snapturebox-text-center snapturebox-mt-2 snapturebox-mx-n1" v-if="timeslots.length">
                    <div class="snapturebox-w-25 snapturebox-p-1" v-for="timeslot in timeslots">
                        <button class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-outline-primary snapturebox-btn-block snapturebox-border snapturebox-rounded snapturebox-line-height-1" :class="{'snapturebox-active': selectedTime == timeslot, 'snapturebox-disabled snapturebox-border-0 snapturebox-text-gray snapturebox-pointer-events-none': !isBookable(timeslot)}" @click="selectedTime = timeslot">
                            <small>{{ timeslot }}</small>
                        </button>
                    </div>
                </div>
                <div v-else class="snapturebox-mt-2 snapturebox-text-gray snapturebox-text-center snapturebox-line-height-sm">
                    <small>There are no available timeslots in the selected date</small>
                </div>
            </div>
            <div class="snapturebox-text-center">
                <small v-if="selectedTime" class="snapturebox-text-gray">{{ dateFormat }}</small>
                <small v-else class="snapturebox-text-gray">No selected timeslot</small>
                <vue-button :loading="loading" :disabled="!selectedTime" class="snapturebox-btn snapturebox-btn-block snapturebox-btn-primary" @click.native="book()">Book now</vue-button>
            </div>
        </div>
        
        <transition name="snapturebox-fade">
            <div v-if="bookingComplete" class="snapturebox-position-absolute-center snapturebox-w-100 snapturebox-h-100 snapturebox-bg-white">
                <button class="snapturebox-btn snapturebox-p-1 snapturebox-float-right" @click="bookingComplete = false;"><close-icon></close-icon></button>
                <div class="snapturebox-position-absolute-center snapturebox-w-100 snapturebox-px-3 snapturebox-text-center">
                    <checkmark-circle-icon width="40" height="40"></checkmark-circle-icon>
                    <h5 class="snapturebox-mt-2">Your booking has been submitted</h5>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import CalendarIcon from '../../icons/calendar';
import CloseIcon from '../../icons/close';
import CheckmarkCircleIcon from '../../icons/checkmark-circle';
export default {
    components: {DatePicker, CalendarIcon, CloseIcon, CheckmarkCircleIcon},
    props: {
        businessHours: {
            type: Object,
            default: {},
        },
    },

    data: () => ({
        loading: false,
        date: new Date(),
        dayjs: dayjs,
        selectedTime: '',
        bookingComplete: false
    }),

    computed: {
        dateFormat() {
            return dayjs(this.date).format('MMMM D, YYYY') + ' - ' + this.selectedTime;
        },

        calendarAttributes() {
            return [
                {
                    dot: true,
                    key: 'today', 
                    dates: new Date(), 
                }
            ];
        },

        selectedDay() {
            return dayjs(this.date).format('dddd');
        },

        timeslots() {
            let timeslots = [];

            if (this.businessHours && this.businessHours[this.selectedDay]) {
                let startParts = this.businessHours[this.selectedDay].start.split(':');
                let endParts = this.businessHours[this.selectedDay].end.split(':');
                let dateStart = dayjs()
                    .set('hour', startParts[0])
                    .set('minute', startParts[1]);
                let dateEnd = dayjs()
                    .set('hour', endParts[0])
                    .set('minute', endParts[1]);

                while (true) {
                    if (dateEnd.diff(dateStart) > 0) {
                        timeslots.push(dateStart.format('h:mmA'));
                        dateStart = dateStart.add(1, 'hour');
                    } else {
                        break;
                    }
                }
            }

            return timeslots;
        },
    },

    created() {
    },

    mounted() {},

    methods: {
        book() {
            if(this.date && this.selectedTime) {
                this.loading = true;
                SBAxios.post('/bookings', {date: dayjs(this.date).format('YYYY-MM-DD'), time: this.selectedTime}).then((response) => {
                    this.$root.widget.bookings.push(response.data);
                    this.loading = false;
                    this.bookingComplete = true;
                }).catch(() => {
                    this.loading = false;
                });
            }
        },

        isBookable(timeslot) {
            if (!this.$root.widget.bookings) return false;
            let now = dayjs();
            let timeslotDate = dayjs(`${dayjs(this.date).format('YYYY-MM-DD')} ${timeslot}`, 'YYYY-MM-DD h:mmA');
            let isBooked = this.$root.widget.bookings.find((x) => x.date == dayjs(this.date).format('YYYY-MM-DD') && x.time == timeslot);
            return !isBooked && now.isBefore(timeslotDate, 'hour');
        }
    },
};
</script>
