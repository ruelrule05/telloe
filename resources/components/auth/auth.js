/* global axios */
import Login from './login.vue';
import Signup from './signup.vue';
import Recover from './recover.vue';
import Reset from './reset.vue';
import CloseIcon from '../../icons/close.vue';
import jstz from 'jstz';
const timezone = jstz.determine();

export default {
	components: {
		Login,
		Signup,
		Recover,
		Reset,

		CloseIcon
	},

	data: () => ({
		pageloading: false,
		loading: false,
		open: false,
		error: '',

		timezone: ''
	}),

	created() {
		this.timezone = timezone.name();
	},

	mounted() {
		setTimeout(() => {
			this.open = true;
		}, 150);
	},

	methods: {
		close() {
			this.open = false;
			setTimeout(() => {
				this.$root.auth = false;
			}, 150);
		},

		openAuthWindow(url, callback) {
			const w = 600;
			const h = 700;
			const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
			const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

			const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
			const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

			const systemZoom = width / window.screen.availWidth;
			const left = (width - w) / 2 / systemZoom + dualScreenLeft;
			const top = (height - h) / 2 / systemZoom + dualScreenTop;

			let authWindow = window.open(url, 'telloe_socialite_auth_window', `width=${w}, height=${h}, top=${top}, left=${left}`);
			let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
			let eventer = window[eventMethod];
			let messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
			eventer(
				messageEvent,
				e => {
					if (e.data.user) {
						if (this.$root.action == 'login') {
							window.location.replace('/dashboard/bookings/calendar');
						} else if (this.$root.action == 'signup') {
							this.$root.auth = e.data.user;
							this.$root.signupStep = 1;
						}
					}
				},
				false
			);

			let callbackInterval = setInterval(() => {
				if (authWindow.closed) {
					clearInterval(callbackInterval);
					callback();
				}
			}, 500);
		},

		async FacebookLogin() {
			this.pageloading = true;
			let response = await axios.get('/auth/facebook/redirect').catch(() => {
				this.pageloading = false;
			});
			if (response.data) {
				this.openAuthWindow(response.data, async () => {
					this.pageloading = false;
				});
			}
		},

		async Googlesignin() {
			this.pageloading = true;
			let response = await axios.get('/auth/google/redirect').catch(() => {
				this.pageloading = false;
			});
			if (response.data) {
				this.openAuthWindow(response.data, async () => {
					this.pageloading = false;
				});
			}
		}
	}
};
