require('./bootstrap');
import Vue from 'vue';
import Booking from '../booking/booking.vue';
window.app = new Vue({
	el: '#app',
	components: {
		Booking
	}
});
