require('../js/bootstrap');
const introJS = require('intro.js');

import Vue from 'vue';
import Login from '../components/auth/login.vue';
import Conversation from '../../resources/dashboard/pages/conversations/show/show.vue';
import SocialLogin from '../js/helpers/SocialLogin';
import jstz from 'jstz';
const timezone = jstz.determine();
import store from '../dashboard/store';
import echo from './echo';
import intros from '../dashboard/intros.js';
import ScreenRecorder from '../dashboard/components/ScreenRecorder/ScreenRecorder.vue';
import videoCall from '../dashboard/components/video-call/video-call.vue';

const mobile = require('is-mobile');

window.app = new Vue({
	store: store,
	el: '#app',
	components: {
		Login,
		Conversation,
		ScreenRecorder,
		videoCall
	},

	data: () => ({
		auth: null,
		action: 'conversation',
		pageloading: false,
		heading: '',
		email: '',
		invite_token: null,
		member_invite_token: null,
		timezone: '',
		showHelpWidget: null,
		contentloading: false,
		onlineUsers: [],
		intros: intros,
		introJS: introJS,
		screenRecorder: {
			conversation_id: null,
			data: null,
			status: ''
		},
		appChannel: null,
		userChannel: null
	}),

	async created() {
		this.timezone = timezone.name();
		this.auth = window.AUTH;

		window.axios.get('/auth').then(response => {
			this.auth = response.data;
			this.$echo
				.join('onlineUsers')
				.here(userIds => {
					this.onlineUsers = userIds;
				})
				.joining(userId => {
					let exists = this.onlineUsers.find(x => x == userId);
					if (!exists) {
						this.onlineUsers.push(userId);
					}
				})
				.leaving(userId => {
					let index = this.onlineUsers.findIndex(x => x == userId);
					if (index > -1) {
						this.onlineUsers.splice(index, 1);
					}
				});

			this.appChannel = this.$echo.private('AppChannel');
			this.appChannel.listenForWhisper('newMessage', message => {
				this.newMessage(message);
				if (this.callConversation && this.callConversation.id == message.conversation_id && this.$refs.videoCall) {
					this.$refs.videoCall.hasNewMessage = true;
				} else {
					this.videoCall.hasNewMessage = true;
				}
			});

			this.userChannel = this.$echo.private(`users.${this.auth.id}`);
			this.userChannel.listen('NewNotificationEvent', data => {
				this.getNotificationByID(data.notification.id);
			});
		});

		this.notifyIncomingBookings();
		if (this.$route && this.$route.name) {
			if (this.$route.name != 'conversations') this.getConversations();
		}

		this.call_sound = new Audio(`/notifications/call.mp3`);
		this.message_sound = new Audio('/notifications/new_message.mp3');

		this.isMobile = mobile();
	},

	methods: {
		isImage(extension) {
			let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];
			return imageExtensions.indexOf(extension) > -1;
		},

		getFiles(conversation) {
			if (conversation) {
				let page = 0;
				if (!conversation.files) {
					this.$set(conversation, 'files', { data: [] });
					page = 1;
				}
				if ((conversation.files || {}).next_page_url) {
					const url = new URL(window.location.origin + conversation.files.next_page_url);
					const urlParams = new URLSearchParams(url.search);
					page = urlParams.get('page');
				}
				if (page) {
					this.$set(conversation, 'filesLoading', true);
					window.axios.get(`/conversations/${conversation.id}/files?page=${page}`).then(response => {
						conversation.files.data = conversation.files.data.concat(response.data.data);
						conversation.files.next_page_url = response.data.next_page_url;
						conversation.filesLoading = false;
					});
				}
			}
		},

		isOnline(userId) {
			return this.onlineUsers.find(x => x.id == userId);
		},

		async FacebookLogin() {
			this.pageloading = true;
			let response = await SocialLogin.FacebookLogin();
			this.pageloading = false;
			if (response.data.user) {
				window.location.reload();
			}
		},

		async GoogleSignin() {
			this.pageloading = true;
			let response = await SocialLogin.GoogleSignin();
			this.pageloading = false;
			if (response.data.user) {
				window.location.reload();
			}
		},

		notifyIncomingBookings() {
			// let now = dayjs();
			// this.bookings.forEach(booking => {
			// 	let bookingDate = dayjs(`${booking.date} ${booking.start}`);
			// 	let hoursDiff = bookingDate.diff(now, 'hours');
			// 	if (hoursDiff > 0) {
			// 		let description = '';
			// 		let link = false;
			// 		if (booking.user_id == this.auth.id || booking.contact_id == this.auth.id) {
			// 			description = `You have an upcoming appointment in less than`;
			// 		} else {
			// 			description = `You have an upcoming appointment with <strong>${(booking.user || booking.contact).full_name}</strong> in less than`;
			// 			link = `/dashboard/bookings/calendar?date=${booking.date}`;
			// 		}
			// 		if (hoursDiff <= 1 && !booking.notified_1_app) {
			// 			// 1 hour
			// 			booking.notified_1_app = true;
			// 			this.$refs['notification'].show({
			// 				description: `${description} an hour.`,
			// 				link: link
			// 			});
			// 		}
			// 		if (hoursDiff > 1 && hoursDiff <= 3 && !booking.notified_3_app) {
			// 			// 3 hours
			// 			booking.notified_3_app = true;
			// 			this.$refs['notification'].show({
			// 				description: `${description} an hour.`,
			// 				link: link
			// 			});
			// 		}
			// 	}
			// });
			// setTimeout(() => {
			// 	this.notifyIncomingBookings();
			// }, 1000);
		}

		// initCall(conversation_id, action) {
		// 	if (!this.callWindow) {
		// 		let conversation = this.conversations.find(x => x.id == conversation_id);
		// 		if (conversation) {
		// 			if (action == 'incoming') {
		// 				this.$refs['videoCall'].endCall();
		// 				this.callUser = this.caller;
		// 				this.call_sound.pause();
		// 				this.call_sound.currentTime = 0;
		// 			} else if (action == 'outgoing') this.callUser = conversation.member;

		// 			let url = `${window.location.origin}/conversations/${conversation_id}/call`;
		// 			const width = 800; // 4:3
		// 			const height = 600;
		// 			const left = screen.width / 2 - width / 2;
		// 			const top = screen.height / 2 - height / 2;
		// 			this.callConversation = conversation;
		// 			this.callWindow = window.open(url, 'telloe_call_window', `width=${width}, height=${height}, top=${top}, left=${left}`);

		// 			this.callWindow.onload = () => {
		// 				this.callWindow.onunload = () => {
		// 					this.callWindow = this.caller = this.callUser = this.callConversation = null;
		// 				};
		// 			};
		// 			this.callWindow.onended = () => {
		// 				this.callUser = null;
		// 			};
		// 		}
		// 	}
		// }
	}
});

Vue.prototype.$echo = echo;
