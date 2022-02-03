require('../js/bootstrap');
/* global VIDEO_MESSAGE */
/* global AUTH */
import Vue from 'vue';
import VideoMessage from '../video-message/video-message.vue';
import store from '../dashboard/store';

import echo from '../js/echo.js';
Vue.prototype.$echo = echo;
window.app = new Vue({
	store: store,
	el: '#app',
	data: () => ({
		auth: AUTH,
		videoMessage: VIDEO_MESSAGE
	}),
	components: {
		VideoMessage
	},

	methods: {
		isImage(extension) {
			let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];
			return imageExtensions.indexOf(extension) > -1;
		}
	}
});
