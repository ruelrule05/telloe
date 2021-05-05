import Vue from 'vue';
import Profile from '../profile/profile.vue';
window.app = new Vue({
	el: '#app',
	components: {
		Profile
	},
	data: () => ({
		widget: false
	}),
	created() {
		const urlParams = new URLSearchParams(window.location.search);
		this.widget = urlParams.get('widget');
	}
});
