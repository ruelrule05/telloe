import VueButton from '../../../components/vue-button.vue';
import CheckmarkIcon from '../../../icons/checkmark';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';

export default {
	components: {
		VueButton,
		CheckmarkIcon,
		Modal,
		VueFormValidate
	},
	data: () => ({
		zoomLoading: false,
		googleCalendarLoading: false,
		outlookLoading: false,
		xeroLoading: false,
		linkedInLoading: false,
		linkedinUsername: null
	}),

	created() {
		this.$root.contentloading = false;
	},
	methods: {
		async integrateXero() {
			this.xeroLoading = true;
			let response = await window.axios.get('/xero/authenticate');
			this.openAuthWindow(response.data.authUrl, async () => {
				await this.getXeroToken();
				this.xeroLoading = false;
			});
		},

		async getXeroToken() {
			let response = await window.axios.get('/xero/token');
			if (response.data) {
				this.$root.auth.xero_token = 1;
				this.$router.push('/dashboard/integrations/xero');
			}
		},

		async removeXero() {
			this.xeroLoading = true;
			await window.axios.get('/xero/remove');
			this.$root.auth.xero_token = null;
			this.xeroLoading = false;
		},

		async integrateOutlook() {
			if (!this.$root.auth.is_premium) {
				return this.$router.push('/dashboard/account?tab=plan');
			}
			this.outlookLoading = true;
			let response = await window.axios.get('/outlook/client', { toast: true }).catch(() => {});
			if (response) {
				window.location.href = response.data.authUrl;
			} else {
				this.outlookLoading = false;
			}
		},

		async getOutlookToken() {
			let response = await window.axios.get('/outlook/token');
			this.$root.auth.outlook_token = response.data;
		},

		async removeOutlook() {
			this.outlookLoading = true;
			await window.axios.get('/outlook/remove');
			this.$root.auth.outlook_token = null;
			this.outlookLoading = false;
		},

		async integrateGoogleCalendar() {
			if (!this.$root.auth.is_premium) {
				return this.$router.push('/dashboard/account?tab=plan');
			}
			this.googleCalendarLoading = true;
			let response = await window.axios.get('/google_calendar/client', { toast: true }).catch(() => {});
			if (response) {
				window.location.href = response.data.authUrl;
			} else {
				this.googleCalendarLoading = false;
			}
		},

		async getGoogleCalendarToken() {
			let response = await window.axios.get('/google_calendar/token');
			this.$root.auth.google_calendar_token = response.data;
		},

		async removeGoogleCalendar() {
			this.googleCalendarLoading = true;
			await window.axios.get('/google_calendar/remove');
			this.$root.auth.google_calendar_token = null;
			this.googleCalendarLoading = false;
		},

		async removeZoom() {
			this.zoomLoading = true;
			await window.axios.get('/zoom/remove');
			this.$root.auth.zoom_token = null;
			this.zoomLoading = false;
		},

		async getZoomToken() {
			let response = await window.axios.get('/zoom/token');
			this.$root.auth.zoom_token = response.data;
		},

		async integrateZoom() {
			this.zoomLoading = true;
			let response = await window.axios.get('/zoom/install');
			let zoomInstallLink = response.data;
			this.openAuthWindow(zoomInstallLink, async () => {
				this.zoomLoading = false;
				this.getZoomToken();
			});
		},

		async connectLinkedIn() {
			this.$refs.linkedinModal.show();
			// if (!this.$root.auth.is_premium) {
			// 	return this.$router.push('/dashboard/account?tab=plan');
			// }
			// this.linkedInLoading = true;
			// let response = await window.axios.get('/linkedin/connect', { toast: true }).catch(() => {});
			// if (response) {
			// 	window.location.href = response.data.authUrl;
			// } else {
			// 	this.linkedInLoading = false;
			// }
		},

		async addLinkedIn() {
			if (this.linkedinUsername) {
				let user = Object.assign({}, this.$root.auth);
				user.linkedin_username = this.linkedinUsername;
				let response = await window.axios.post('/auth', user, { toast: true }).catch(() => {
					this.$refs.linkedinModal.hide();
				});
				if (response) {
					this.$root.auth = response.data;
					this.$refs.linkedinModal.hide();
				}
			}
		},

		async removeLinkedIn() {
			let user = Object.assign({}, this.$root.auth);
			user.linkedin_username = null;
			let response = await window.axios.post('/auth', user, { toast: true }).catch(() => {
				this.$refs.linkedinModal.hide();
			});
			if (response) {
				this.$root.auth = response.data;
				this.$refs.linkedinModal.hide();
			}
		},

		openAuthWindow(url, callback) {
			const w = 450;
			const h = 650;
			const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
			const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

			const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
			const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

			const systemZoom = width / window.screen.availWidth;
			const left = (width - w) / 2 / systemZoom + dualScreenLeft;
			const top = (height - h) / 2 / systemZoom + dualScreenTop;

			let authWindow = window.open(url, 'telloe_auth_window', `width=${w}, height=${h}, top=${top}, left=${left}`);
			let callbackInterval = setInterval(() => {
				if (authWindow.closed) {
					clearInterval(callbackInterval);
					callback();
				}
			}, 500);
		}
	}
};
