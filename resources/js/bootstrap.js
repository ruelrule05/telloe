// try {
// 	window.$ = window.jQuery = require('jquery');
// } catch (e) {
// 	console.log(e);
// }

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
		if (response.config.toasted && window.app) {
			window.app.$toasted.show(response.data.message);
		}
		return response;
	},
	function(error) {
		let responseStatus = error.response.status;
		if ([401, 419].find(x => x == responseStatus)) {
			let isHomepage = window.location.pathname == '/';
			if (!isHomepage) {
				window.location.href = '/';
			} else if (responseStatus == 419 && window.location.search == '') {
				window.location.href = '/?auth=login';
			}
		}
		if (error.response.config.toasted && window.app) {
			window.app.$toasted.show(error.response.data.message, {
				className: 'bg-danger rounded shadow-none'
			});
		}
		/*if (error.response && error.response.status == 401) {
            window.location.href = '/login';
        }*/

		return Promise.reject(error);
	}
);
