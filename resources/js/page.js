/* global Wistia */
require('./bootstrap');

import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import Auth from '../components/auth/auth.vue';
import CheckmarkIcon from '../icons/checkmark';
import GreencheckIcon from '../icons/greencheck';
import Vue from 'vue';

Vue.component('pageloader', require('../components/pageloader.vue').default);
window.app = new Vue({
	el: '#app',
	components: {
		RangeSlider,
		Auth,
		CheckmarkIcon,
		GreencheckIcon
	},

	data: {
		auth: false, //false
		action: 'login', // login
		seats: 10,
		invite_token: null,
		member_invite_token: null,
		email: '',
		signupStep: 0, //0,
		planFeatures: [
			{ title: 'Booking', features: ['Unlimited Event Types', 'Scheduling Slider', 'Booking Notes', 'Recurring Bookings', 'Client self-booking', 'Book on behalf of clients', 'Unlimited Event Types', 'Schedule Multiple Bookings', 'Calendar Integrations', 'Outreach Widget', 'Booking URL'] },
			{ title: 'Communications', features: ['Messaging System', 'Notifications', 'Zoom, Google Meet Integration', 'Telloe Video Calling'] },
			{ title: 'Team Management', features: ['Admin Panel', 'Centralised Billing', 'Book on Behalf of Team', 'Shared Booking Calendars', 'Team Groups', 'Team Booking URL', 'Linked Accounts'] },
			{ title: 'Integrations', features: ['Xero', 'Stripe', 'Zoom, Google Meet', 'Outlook & Google Calendar'] },
			{ title: 'Accept Payments *', features: ['For Single Bookings', 'For Blocks of Bookings', 'Collection Subscriptions', 'Send Invoices'] }
		],
		faq: 1,
		feature: 1,
		showVideo: true
	},

	watch: {
		action: function() {
			if (this.$refs['authForm']) this.$refs['authForm'].error = '';
		}
	},

	created() {
		this.checkAuth();
		const queryString = window.location.search;
		if (queryString) {
			const urlParams = new URLSearchParams(queryString);
			const invite_token = urlParams.get('invite_token');
			const member_invite_token = urlParams.get('member_invite_token');
			const authTab = urlParams.get('auth');
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

			const email = urlParams.get('email');
			if (email) this.email = email;
		}
	},

	mounted() {},

	methods: {
		openVideoDemo() {
			Wistia.api('sbp1xbl4gp').popover.showAndPlay();
		},

		checkAuth() {
			window.axios
				.get('/auth')
				.then(response => {
					if (response) {
						window.location.replace('/dashboard/overview');
					}
				})
				.catch(() => {});
		}
	}
});
