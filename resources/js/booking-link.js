/* global AUTH */
import Vue from 'vue';
import BookingLink from '../booking-link/booking-link.vue';
window.app = new Vue({
	el: '#app',
	data: () => ({
		auth: AUTH
	}),
	components: {
		BookingLink
	}
});
