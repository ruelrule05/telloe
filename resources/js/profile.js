import Vue from 'vue';
import Profile from '../profile/profile.vue';
window.app = new Vue({
	el: '#app',
	components: {
		Profile
	},
	data: () => ({
		widget: false,
		embed: false
	}),
	created() {
		const urlParams = new URLSearchParams(window.location.search);
		this.widget = urlParams.get('widget');
		this.embed = urlParams.get('embed');
	},
	mounted() {
		if (this.embed) {
			let app = document.querySelector('#app');
			if (app) {
				app.style.backgroundColor = 'transparent';
			}
		}
	}
});
