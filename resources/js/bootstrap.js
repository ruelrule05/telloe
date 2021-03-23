// try {
// 	window.$ = window.jQuery = require('jquery');
// } catch (e) {
// 	console.log(e);
// }
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
Vue.use(VueToast, { position: 'bottom' });
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.interceptors.request.use(
	function(config) {
		let ajax = true;
		if (config.ajax == false) {
			ajax = false;
		}
		config.headers['Cache-Control'] = 'no-cache';
		if (ajax) {
			config.url = `/ajax${config.url}`;
		}
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
);
window.axios.interceptors.response.use(
	function(response) {
		Vue.$toast.clear();
		if (response.config.toast && response.data.message) {
			Vue.$toast.open(response.data.message);
		}
		return response;
	},
	function(error) {
		Vue.$toast.clear();
		let responseStatus = error.response.status;
		if ([401, 419].find(x => x == responseStatus)) {
			let isHomepage = window.location.pathname == '/';
			if (!isHomepage) {
				window.location.href = '/';
			} else if (responseStatus == 419 && window.location.search == '') {
				window.location.href = '/?auth=login';
			}
		}
		if (error.response.config.toast) {
			console.log(Vue.$toast);
			Vue.$toast.error(error.response.data.message);
		}
		/*if (error.response && error.response.status == 401) {
            window.location.href = '/login';
        }*/

		return Promise.reject(error);
	}
);
