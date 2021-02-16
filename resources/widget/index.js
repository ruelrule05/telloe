/* global ENDPOINT */
/* global FB */
/* global gapi */
/* global PROFILE */
import Vue from 'vue';
import VCalendar from 'v-calendar';
Vue.use(VCalendar);
import Widget from './component/widget.vue';
try {
	window.$ = window.jQuery = require('jquery');
} catch (e) {
	console.log(e);
}
window.TelloeAxios = require('axios');
window.TelloeAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.TelloeAxios.interceptors.request.use(
	function(config) {
		config.headers['Cache-Control'] = 'no-cache';
		config.url = `${ENDPOINT}/ajax${config.url}`;
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
);
window.TelloeAxios.interceptors.response.use(
	function(response) {
		if (response.config.toasted && window.app) {
			window.app.$toasted.show(response.data.message);
		}
		return response;
	},
	function(error) {
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
			GoogleAuth: null
		},

		created() {
			this.loadFacebook();
		},

		methods: {
			loadFacebook() {
				window.fbAsyncInit = function() {
					FB.init({
						appId: '1187408638266444',
						cookie: true,
						xfbml: true,
						version: 'v2.10'
					});
				};

				(function(d, s, id) {
					var js,
						fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement(s);
					js.id = id;
					js.src = '//connect.facebook.net/en_US/sdk.js';
					fjs.parentNode.insertBefore(js, fjs);
				})(document, 'script', 'facebook-jssdk');
				(function(d, s, id) {
					let js;
					const fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement(s);
					js.id = id;
					js.src = '//connect.facebook.net/en_US/sdk.js';
					fjs.parentNode.insertBefore(js, fjs);
				})(document, 'script', 'facebook-jssdk');
			},

			loadGoogle() {
				if (typeof gapi != 'undefined') {
					gapi.load('auth2', () => {
						this.GoogleAuth = gapi.auth2.init({ client_id: '187405864135-kboqmukelf9sio1dsjpu09of30r90ia1.apps.googleusercontent.com' });
					});
				}
			}
		}
	});

	// Google
	let googleScript = document.createElement('script');
	googleScript.type = 'text/javascript';
	googleScript.src = 'https://apis.google.com/js/platform.js';
	document.head.appendChild(googleScript);
	googleScript.onload = () => {
		window.telloe.loadGoogle();
	};
};
