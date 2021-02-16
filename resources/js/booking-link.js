import Vue from 'vue';
import 'bootstrap/js/dist/dropdown';
import BookingLink from '../booking-link/booking-link.vue';
window.app = new Vue({
	el: '#app',
	components: {
		BookingLink
	}
});
