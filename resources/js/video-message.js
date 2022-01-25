/* global VIDEO_MESSAGE */
import Vue from 'vue';
import VideoMessage from '../video-message/video-message.vue';
window.app = new Vue({
	el: '#app',
	data: () => ({
		videoMessage: VIDEO_MESSAGE
	}),
	components: {
		VideoMessage
	}
});
