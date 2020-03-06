<template>
    <div>
        <h5>Select date and available timeslot</h5>
        <div class="snapturebox-d-flex snapturebox-align-items-center snapturebox-border snapturebox-rounded">
            <DatePicker is-expanded title-position="left" v-model="date" :masks="{ input: 'MMMM D, YYYY' }" class="snapturebox-flex-grow-1">
                <input
                  slot-scope="{ inputProps, inputEvents, isDragging }"
                  class="snapturebox-form-control"
                  placeholder="Select date"
                  v-bind="inputProps"
                  v-on="inputEvents" />
            </DatePicker>
            <calendar-icon class="snapturebox-pointer-events-none" fill="#CCC"></calendar-icon>
        </div>

        {{ businessHours[selectedDay] }}
    </div>
</template>

<script>
import dayjs from 'dayjs';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import CalendarIcon from '../icons/calendar';
export default {
    components: {DatePicker, CalendarIcon},
    props: {
        businessHours: {
            type: Object,
            default: [],
        },
    },

    data: () => ({
        date: new Date(),  
        dayjs: dayjs
    }),

    computed: {
        selectedDay() {
            return dayjs(this.date).format('dddd');
        }
    },

    created() {
    },

    mounted() {
    },

    methods: {
    },
};
</script>