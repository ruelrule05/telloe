require('./bootstrap');

import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import Auth from '../components/auth/auth.vue';
import CheckmarkIcon from '../icons/checkmark';
import GreencheckIcon from '../icons/greencheck';
import MessengerIcon from '../icons/messenger';
import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import SmoothScroll from 'smooth-scroll';

Vue.component('pageloader', require('../components/pageloader.vue').default);
window.app = new Vue({
	el: '#app',
	components: {
		RangeSlider,
		Auth,
		CheckmarkIcon,
		GreencheckIcon,
		MessengerIcon
	},

	directives: { clickOutside: vClickOutside.directive },

	data: {
		auth: false, //false
		action: 'login', // login
		seats: 10,
		invite_token: null,
		member_invite_token: null,
		email: '',
		signupStep: 0, //0
		planFeatures: [
			{ title: 'Booking', features: ['Unlimited Event Types', 'Scheduling Slider', 'Booking Notes', 'Recurring Bookings', 'Client self-booking', 'Book on behalf of clients', 'Unlimited Event Types', 'Schedule Multiple Bookings', 'Calendar Integrations', 'Outreach Widget', 'Booking URL'] },
			{ title: 'Communications', features: ['Messaging System', 'Notifications', 'Zoom, Google Meet Integration', 'Telloe Video Calling'] },
			{ title: 'Team Management', features: ['Admin Panel', 'Centralised Billing', 'Book on Behalf of Team', 'Shared Booking Calendars', 'Team Groups', 'Team Booking URL', 'Linked Accounts'] },
			{ title: 'Integrations', features: ['Xero', 'Stripe', 'Zoom, Google Meet', 'Outlook & Google Calendar'] },
			{ title: 'Accept Payments *', features: ['For Single Bookings', 'For Blocks of Bookings', 'Collection Subscriptions', 'Send Invoices'] }
		],
		faq: 1,
		feature: 1,
		showVideo: true,
		dropdownOpen: false,
		videoOpen: false,
		WistiaPlayer: null,
		mobileApp: true
	},

	watch: {
		action: function() {
			if (this.$refs['authForm']) this.$refs['authForm'].error = '';
		}
	},

	created() {
		//this.checkAuth();
		const queryString = window.location.search;
		let mobileApp = false;
		if (queryString) {
			const urlParams = new URLSearchParams(queryString);
			const invite_token = urlParams.get('invite_token');
			const member_invite_token = urlParams.get('member_invite_token');
			const authTab = urlParams.get('auth');
			mobileApp = urlParams.get('mobile_app');
			const videoOpen = urlParams.get('video');
			if (authTab) {
				this.action = authTab;
				this.auth = true;
			}
			if (invite_token) {
				this.invite_token = invite_token;
				this.auth = true;
			} else if (member_invite_token) {
				this.member_invite_token = member_invite_token;
				this.auth = true;
			}
			this.videoOpen = videoOpen == 'true';

			const email = urlParams.get('email');
			if (email) this.email = email;
		}
		this.mobileApp = mobileApp == 'true';
		if (this.mobileApp) {
			this.auth = true;
		}
	},

	mounted() {
		this.popupItem = this.$el;

		setTimeout(() => {
			let wq = window._wq || [];
			wq.push({
				id: 'sbp1xbl4gp',
				onReady: video => {
					this.WistiaPlayer = video;
					if (this.videoOpen) {
						this.openVideoDemo();
					}
				}
			});
		}, 500);
	},

	methods: {
		openVideoDemo() {
			this.WistiaPlayer.popover.showAndPlay();
		},

		checkAuth() {
			window.axios
				.get('/auth')
				.then(response => {
					if (response) {
						this.auth = response.data;
						//window.location.replace('/dashboard/overview');
					}
				})
				.catch(() => {});
		}
	}
});

new SmoothScroll('a[href*="#"]', {
	speed: 700,
	speedAsDuration: true
});
