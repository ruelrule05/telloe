require('../js/bootstrap');

import Vue from 'vue';
import Auth from '../components/auth/auth.vue';

window.app = new Vue({
	el: '#app',
	components: { Auth },
	data: () => ({
		auth: window.AUTH,
		signupStep: 1,
		action: 'signup'
	}),

	created() {
		console.log(this.auth);
	},

	methods: {}
});
