import Vue from 'vue';
import Profile from '../profile/profile.vue';
window.app = new Vue({
	el: '#app',
	data: () => ({
		profile: PROFILE
	}),
	components: {
		Profile
	}
});
