// try {
// 	window.$ = window.jQuery = require('jquery');
// } catch (e) {
// 	console.log(e);
// }
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
Vue.use(VueToast, { position: 'bottom' });
if (process.env.MIX_APP_ENV == 'production') {
	Vue.config.productionTip = false;
}
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.interceptors.request.use(
	function (config) {
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
	function (error) {
		return Promise.reject(error);
	}
);
window.axios.interceptors.response.use(
	function (response) {
		Vue.$toast.clear();
		if (response.config.toast && response.data.message) {
			Vue.$toast.open(response.data.message);
		}
		return response;
	},
	function (error) {
		Vue.$toast.clear();
		let responseStatus = error.response.status;
		if ([401, 419].find(x => x == responseStatus)) {
			let isPage = ['/', 'privacy-policy', 'terms-of-service'].find(x => x == window.location.pathname);
			if (!isPage && responseStatus == 419 && window.location.search == '') {
				window.location.href = '/?auth=login';
			}
		}
		if (error.response.config.toast) {
			let errorMessage = error.response.data.message;
			if (error.response.data.errors && Object.keys(error.response.data.errors).length > 0) {
				errorMessage = Object.keys(error.response.data.errors)
					.map(key => {
						return error.response.data.errors[key];
					})
					.join('. ');
			}
			Vue.$toast.error(errorMessage);
		}
		/*if (error.response && error.response.status == 401) {
            window.location.href = '/login';
        }*/

		return Promise.reject(error);
	}
);
