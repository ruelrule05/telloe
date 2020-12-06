import VueButton from '../../../components/vue-button.vue';
import CheckmarkIcon from '../../../icons/checkmark';

export default {
	components: {
		VueButton,
		CheckmarkIcon
	},
	data: () => ({
		zoomLoading: false,
		googleCalendarLoading: false,
		outlookLoading: false,
		xeroLoading: false
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
			await window.axios.get('/xero/token');
			this.$root.auth.xero_token = 1;
		},

		async removeXero() {
			this.xeroLoading = true;
			await window.axios.get('/xero/remove');
			this.$root.auth.xero_token = null;
			this.xeroLoading = false;
		},

		async integrateOutlook() {
			this.outlookLoading = true;
			let response = await window.axios.get('/outlook/client');
			this.openAuthWindow(response.data.authUrl, async () => {
				await this.getOutlookToken();
				this.outlookLoading = false;
			});
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
			this.googleCalendarLoading = true;
			let response = await window.axios.get('/google_calendar/client');
			this.openAuthWindow(response.data.authUrl, async () => {
				await this.getGoogleCalendarToken();
				this.googleCalendarLoading = false;
			});
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

		openAuthWindow(url, callback) {
			const width = 450;
			const height = 650;
			const left = screen.width / 2 - width / 2;
			const top = screen.height / 2 - height / 2;
			let authWindow = window.open(url, 'telloe_auth_window', `width=${width}, height=${height}, top=${top}, left=${left}`);
			let callbackInterval = setInterval(() => {
				if (authWindow.closed) {
					clearInterval(callbackInterval);
					callback();
				}
			}, 500);
		}
	}
};
