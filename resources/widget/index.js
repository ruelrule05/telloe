/* global ENDPOINT */
/* global PROFILE */
import Vue from 'vue';
// import VCalendar from 'v-calendar';
// Vue.use(VCalendar);
import Widget from './component/widget.vue';

// window.TelloeAxios = require('axios');
// window.TelloeAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.TelloeAxios.interceptors.request.use(
// 	function(config) {
// 		config.headers['Cache-Control'] = 'no-cache';
// 		config.url = `${ENDPOINT}/ajax${config.url}`;
// 		return config;
// 	},
// 	function(error) {
// 		return Promise.reject(error);
// 	}
// );
// window.TelloeAxios.interceptors.response.use(
// 	function(response) {
// 		if (response.config.toasted && window.app) {
// 			window.app.$toasted.show(response.data.message);
// 		}
// 		return response;
// 	},
// 	function(error) {
// 		if (error.response.config.toasted && window.app) {
// 			window.app.$toasted.show(error.response.data.message, {
// 				className: 'bg-danger rounded shadow-none'
// 			});
// 		}
// 		return Promise.reject(error);
// 	}
// );

window.onload = () => {
	let container = document.createElement('div');
	container.id = 'telloe-widget';
	container.innerHTML = '<widget ref="widget" />';
	document.body.appendChild(container);

	window.telloe = new Vue({
		el: '#telloe-widget',
		components: {
			Widget
		},
		data: {
			profile: PROFILE,
			endpoint: ENDPOINT
		}
	});
};
