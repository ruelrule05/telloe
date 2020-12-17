/* global WS_URL */
/* global FB */
require('../js/bootstrap');
window.Vue = require('vue');

import { mapState, mapGetters, mapActions } from 'vuex';
import VueRouter from 'vue-router';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/collapse';
import Toasted from 'vue-toasted';
const introJS = require('intro.js');

window.Vue.use(VueRouter);
window.Vue.use(Toasted, {
	position: 'bottom-center',
	duration: 3000,
	className: 'bg-primary rounded shadow-none',
	singleton: true
});
//window.Vue.component('vue-button', require('../components/vue-button.vue').default);
const router = new VueRouter({
	linkActiveClass: 'active',
	mode: 'history',
	routes: [
		{
			path: '/dashboard',
			component: {
				render(c) {
					return c('router-view');
				}
			},
			children: [
				{
					name: 'conversations',
					path: 'conversations/:id?',
					component: () => import(/* webpackChunkName: "dashboard-conversations" */ './components/conversations/conversations.vue')
				},
				{
					name: 'bookings',
					path: 'bookings',
					component: () => import(/* webpackChunkName: "dashboard-bookings" */ './components/bookings/bookings.vue'),
					children: [
						{
							path: 'calendar',
							name: 'calendar',
							component: () => import(/* webpackChunkName: "dashboard-bookings-calendar" */ './components/bookings/calendar/calendar.vue')
						},
						{
							path: 'services',
							name: 'services_index',
							component: () => import(/* webpackChunkName: "dashboard-bookings-services" */ './components/bookings/services/index/index.vue')
						},
						{
							path: 'services/:id',
							name: 'services_show',
							component: () => import(/* webpackChunkName: "dashboard-bookings-services-show" */ './components/bookings/services/show/show.vue')
						}
					]
				},
				{
					path: 'contacts',
					name: 'contacts',
					component: {
						render(c) {
							return c('router-view');
						}
					},
					children: [
						{
							path: '/',
							name: 'contacts_index',
							component: () => import(/* webpackChunkName: "dashboard-contacts" */ './components/contacts/index/index.vue')
						},
						{
							path: ':id',
							name: 'contacts_show',
							component: () => import(/* webpackChunkName: "dashboard-contacts" */ './components/contacts/show/show.vue')
						}
					]
				},
				{
					name: 'packages',
					path: 'packages',
					component: () => import(/* webpackChunkName: "dashboard-bookings" */ './components/bookings/bookings.vue'),
					children: [
						{
							path: '/',
							name: 'packages_index',
							component: () => import(/* webpackChunkName: "dashboard-packages" */ './components/packages/index/index.vue')
						},
						{
							path: ':id',
							name: 'packages_show',
							component: () => import(/* webpackChunkName: "dashboard-bookings-packages-show" */ './components/packages/show/show.vue')
						}
					]
				},

				{
					name: 'team',
					path: 'team',
					component: {
						render(c) {
							return c('router-view');
						}
					},
					children: [
						{
							path: 'organizations',
							name: 'organizations_index',
							component: () => import(/* webpackChunkName: "dashboard-team-organizations" */ './components/team/organizations/index/index.vue')
						},
						{
							path: 'organizations/:id',
							name: 'organizations_show',
							component: () => import(/* webpackChunkName: "dashboard-team-organizations-show" */ './components/team/organizations/show/show.vue')
						},
						{
							path: 'members',
							name: 'members_index',
							component: () => import(/* webpackChunkName: "dashboard-team-members" */ './components/team/members/index/index.vue')
						},
						{
							path: 'members/:id',
							name: 'members_show',
							component: () => import(/* webpackChunkName: "dashboard-team-members-show" */ './components/team/members/show/show.vue')
						}
					]
				},
				{
					name: 'payments',
					path: 'payments',
					component: {
						render(c) {
							return c('router-view');
						}
					},
					children: [
						{
							path: 'subscriptions',
							name: 'subscriptions_index',
							component: () => import(/* webpackChunkName: "dashboard-payments-subscriptions" */ './components/payments/subscriptions/subscriptions.vue')
						},
						{
							path: 'Invoices',
							name: 'invoices_index',
							component: () => import(/* webpackChunkName: "dashboard-payments-invoices" */ './components/payments/invoices/invoices.vue')
						}
					]
				},
				{
					name: 'account',
					path: 'account',
					component: () => import(/* webpackChunkName: "dashboard-account" */ './components/account/account.vue')
				},
				{
					name: 'billing',
					path: 'billing',
					component: () => import(/* webpackChunkName: "dashboard-billing" */ './components/billing/billing.vue')
				},
				{
					name: 'widget',
					path: 'widget',
					component: () => import(/* webpackChunkName: "dashboard-widget" */ './components/widget/widget.vue')
				},
				{
					path: 'integrations',
					name: 'integrations',
					component: () => import(/* webpackChunkName: "dashboard-integrations" */ './components/integrations/integrations.vue')
				}
			]
		}
	]
});
import io from 'socket.io-client';
import dayjs from 'dayjs';
import ScreenRecorder from '../components/screen-recorder/screen-recorder.vue';

import BellIcon from '../icons/bell';
import GridIcon from '../icons/grid';
import ChatIcon from '../icons/chat';
import NotebookIcon from '../icons/notebook';
import CogIcon from '../icons/cog';
import ChevronDownIcon from '../icons/chevron-down';
import UsersIcon from '../icons/users';
import UserCircleIcon from '../icons/user-circle';
import ShortcutIcon from '../icons/shortcut';
import PlannerIcon from '../icons/planner';
import VirtualRealityIcon from '../icons/virtual-reality';
import ColoredBillIcon from '../icons/colored-bill';
import ContactIcon from '../icons/contact';
import WalletIcon from '../icons/wallet';
import LockIcon from '../icons/lock';
import ExclamationCircleIcon from '../icons/exclamation-circle';
import PlayAltIcon from '../icons/play-alt';
import InfoCircleIcon from '../icons/info-circle';
import HeadphoneIcon from '../icons/headphone';
import PasswordIcon from '../icons/password';
import ListBulletIcon from '../icons/list-bullet';
import CreditCardIcon from '../icons/credit-card';
import BillIcon from '../icons/bill';
import ColoredBellIcon from '../icons/colored-bell';
import FilePdfIcon from '../icons/file-pdf';
import FileArchiveIcon from '../icons/file-archive';
import CloseIcon from '../icons/close';
import TrayIcon from '../icons/tray';
import TrayStackIcon from '../icons/tray-stack';
import LighthouseIcon from '../icons/lighthouse';

import ContactAltIcon from '../icons/contact-alt';
import MonthviewIcon from '../icons/monthview';
import PaymentsIcon from '../icons/payments';
import MessagesIcon from '../icons/chat';
import MemberIcon from '../icons/member';
import PlusIcon from '../icons/plus';
import PackageIcon from '../icons/package';

import DocumentIcon from '../icons/document';
import VideoCall from './components/video-call/video-call.vue';
import Notification from '../components/notification/notification.vue';
import Modal from '../components/modal/modal.vue';

import store from './store';
import intros from './intros.js';
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

window.app = new window.Vue({
	router: router,
	store: store,
	el: '#app',
	components: {
		BellIcon,
		GridIcon,
		ChatIcon,
		NotebookIcon,
		CogIcon,
		VirtualRealityIcon,
		UsersIcon,
		UserCircleIcon,
		ShortcutIcon,
		PlannerIcon,
		ChevronDownIcon,
		ColoredBillIcon,
		ContactIcon,
		WalletIcon,
		LockIcon,
		ExclamationCircleIcon,
		PlayAltIcon,
		InfoCircleIcon,
		HeadphoneIcon,
		PasswordIcon,
		ListBulletIcon,
		CreditCardIcon,
		BillIcon,
		ColoredBellIcon,

		ContactAltIcon,
		MonthviewIcon,
		PaymentsIcon,
		MessagesIcon,
		CloseIcon,
		TrayIcon,
		TrayStackIcon,
		LighthouseIcon,
		MemberIcon,
		PlusIcon,
		PackageIcon,

		VideoCall,
		ScreenRecorder,
		Notification,
		Modal,

		'knowledge-base': () => import(/* webpackChunkName: "knowledge-base" */ './components/knowledge-base/knowledge-base.vue'),

		'sidebar-conversations': () => import(/* webpackChunkName: "sidebar-conversations" */ './components/sidebar-conversations/sidebar-conversations.vue')
	},
	data: {
		auth: null,
		pageloading: false,
		heading: '',
		contentloading: true,
		socket: null,
		online_users: [],
		detailsTab: '',
		profileTab: 'overview', //overview

		call_sound: null,
		message_sound: null,

		callWindow: null,
		caller: null,
		callConversation: null,
		callUser: null,
		screenRecorder: {
			conversation_id: null,
			data: null,
			status: ''
		},
		jQuery: $,
		muted: false,
		intros: intros,
		introJS: introJS
	},

	computed: {
		...mapState({
			conversations: state => state.conversations.index,
			notifications: state => state.notifications.index,
			bookings: state => state.bookings.index
		}),

		...mapGetters({
			getConversation: 'conversations/show'
		}),

		currentConversationID() {
			if (this.$route.name == 'conversations' && this.$route.params.id) {
				return this.$route.params.id;
			}
			return '';
		},

		conversation() {
			return this.getConversation(this.$route.params.id);
		},

		payoutComplete() {
			return !this.auth.stripe_account || (this.auth.stripe_account.individual && this.auth.stripe_account.individual.requirements.pending_verification.length > 2) ? false : true;
		},

		newMessagesCount() {
			let count;
			this.conversations.forEach(conversation => {
				if (conversation.last_message.user_id != this.auth.id && !conversation.last_message.is_read) {
					if (!count) count = 0;
					count++;
				}
			});
			return count;
		},

		supportLink() {
			let supportLink = '#';
			for (let conversation of this.conversations) {
				let role = (conversation.member.role || {}).role;
				if (role == 'support') {
					supportLink = `/dashboard/bookings/services/${conversation.id}`;
					break;
				}
			}
			return supportLink;
		},

		profileLink() {
			let profileLink = '/dashboard/account?tab=profile';
			if (this.auth.role.role == 'client' && !this.payoutComplete) profileLink = '/dashboard/account?tab=payout';

			return profileLink;
		},

		notificationsCount() {
			let count;
			this.notifications.forEach(notification => {
				if (!notification.is_read) {
					if (!count) count = 0;
					count++;
				}
			});

			return count;
		}
	},

	watch: {
		'$route.name': function() {
			this.contentloading = true;
			$('.leader-line').remove();
		},
		muted: function(value) {
			this.$toasted.show(`Notifications ${value ? 'off' : 'on'}`, {
				className: value ? 'bg-secondary rounded' : 'bg-primary rounded'
			});
		}
	},

	created() {
		window.axios.get('/auth').then(response => {
			this.auth = response.data;
			//this.socket.emit('user_online', this.auth.id);
			this.$echo
				.join('onlineUsers')
				.here(userIds => {
					this.online_users = userIds;
				})
				.joining(userId => {
					let exists = this.online_users.find(x => x == userId);
					if (!exists) {
						this.online_users.push(userId);
					}
				})
				.leaving(userId => {
					let index = this.online_users.findIndex(x => x == userId);
					if (index > -1) {
						this.online_users.splice(index, 1);
					}
				});
		});

		this.notifyIncomingBookings();
		if (this.$route.name != 'conversations') this.getConversations();
		this.call_sound = new Audio(`/notifications/call.mp3`);
		this.message_sound = new Audio('/notifications/new_message.mp3');
		this.socket = io(WS_URL);

		// https://telloe.app?invite_token=ry36DJxbh3EomBAWk151gizVmCT1MB
		let location = JSON.parse(JSON.stringify(window.location));
		if (location.search) {
			let searchParams = new URLSearchParams(location.search);
			let invite_token = searchParams.get('invite_token');
			let member_invite_token = searchParams.get('member_invite_token');
			if (invite_token) this.socket.emit('invite_token', invite_token);
			if (member_invite_token) this.socket.emit('member_invite_token', member_invite_token);
		}

		// this.socket.on('new_message', data => {
		// 	let conversation = this.conversations.find(x => x.id == data.conversation_id);
		// 	if (conversation) {
		// 		// check if message does not exists by ID
		// 		this.getMessageByID(data).then(message => {
		// 			if (message && message.conversation_id == conversation.id) {
		// 				conversation.last_message = message;
		// 				if (!this.muted) this.message_sound.play();
		// 			}
		// 		});
		// 	}
		// });

		this.socket.on('new_notification', data => {
			if (data.user_id == this.auth.id) this.getNotificationByID(data.id);
		});

		this.socket.on('online_users', data => {
			this.online_users = data;
		});

		(function(d) {
			var js,
				id = 'facebook-jssdk',
				ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement('script');
			js.id = id;
			js.async = true;
			js.src = '//connect.facebook.net/en_US/all.js';
			ref.parentNode.insertBefore(js, ref);
		})(document);

		this.getNotifications();
		this.getBookings();
	},

	mounted() {
		this.FBInit();
		if (!window.localStorage.getItem('telloe_has_logged_in')) {
			window.localStorage.setItem('telloe_has_logged_in', true);
			window.onload = () => {
				this.introJS.start();
			};
		} else {
			Object.values(this.intros).map(intro => {
				intro.enabled = false;
			});
		}
	},

	methods: {
		...mapActions({
			getConversations: 'conversations/index',
			getNotifications: 'notifications/index',
			updateNotification: 'notifications/update',
			clearNotifications: 'notifications/clear',
			getBookings: 'bookings/index'
		}),

		async getMessageByID(messageID) {
			let message = await window.axios.get(`/messages/${messageID}`).catch(() => {});
			if (message) return message.data;
		},

		toggleIntros() {
			// Object.values(this.intros).map(intro => {
			//     intro.enabled = true;
			// });

			console.log(this.$route.name);
			let intro = this.intros[this.$route.name];
			if (intro) {
				intro.intro.start();
			}

			// let step = 0;
			// switch () {
			// 	case 'services_index':
			// 		step = this.intros.services.index.step;
			// 		break;

			// 	case 'conversations':
			// 		this.intros.new_chat.enabled = true;
			// 		step = this.intros.new_chat.step;
			// 		break;

			// 	case 'calendar':
			// 		this.intros.calendar_settings.enabled = true;
			// 		step = this.intros.calendar_settings.step;
			// 		break;
			// }
			// if (step) this.introJS.start().goToStepNumber(step);
		},

		notifyIncomingBookings() {
			let now = dayjs();
			this.bookings.forEach(booking => {
				let bookingDate = dayjs(`${booking.date} ${booking.start}`);
				let hoursDiff = bookingDate.diff(now, 'hours');
				if (hoursDiff > 0) {
					let description = '';
					let link = false;
					if (booking.user_id == this.auth.id || booking.contact_id == this.auth.id) {
						description = `You have an upcoming appointment in less than`;
					} else {
						description = `You have an upcoming appointment with <strong>${(booking.user || booking.contact).full_name}</strong> in less than`;
						link = `/dashboard/bookings/calendar?date=${booking.date}`;
					}
					if (hoursDiff <= 1 && !booking.notified_1_app) {
						// 1 hour
						booking.notified_1_app = true;
						this.$refs['notification'].show({
							description: `${description} an hour.`,
							link: link
						});
					}
					if (hoursDiff > 1 && hoursDiff <= 3 && !booking.notified_3_app) {
						// 3 hours
						booking.notified_3_app = true;
						this.$refs['notification'].show({
							description: `${description} an hour.`,
							link: link
						});
					}
				}
			});
			setTimeout(() => {
				this.notifyIncomingBookings();
			}, 1000);
		},

		downloadMedia(message) {
			if (message.source) {
				let link = document.createElement('a');
				link.href = message.source;
				link.download = message.metadata.filename;
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				link.remove();
			}
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

		fileIcon(extension) {
			let iconComponent = 'document-icon';
			let videoExtensions = ['mp4', 'webm'];
			let audioExtensions = ['mp3', 'wav'];
			if (videoExtensions.indexOf(extension) > -1) {
				iconComponent = 'file-video-icon';
			} else if (audioExtensions.indexOf(extension) > -1) {
				iconComponent = 'file-audio-icon';
			} else {
				switch (extension) {
					case 'pdf':
						iconComponent = FilePdfIcon;
						break;

					case 'zip':
						iconComponent = FileArchiveIcon;
						break;

					case 'rar':
						iconComponent = FileArchiveIcon;
						break;

					case 'docx':
						iconComponent = DocumentIcon;
						break;

					case 'doc':
						iconComponent = DocumentIcon;
						break;

					case 'txt':
						iconComponent = DocumentIcon;
						break;

					case 'xls':
						break;

					case 'xlsx':
						break;
				}
			}

			return iconComponent;
		},

		number_format(number, decimals, dec_point, thousands_sep) {
			// Strip all characters but numerical ones.
			number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
				sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
				dec = typeof dec_point === 'undefined' ? '.' : dec_point,
				s = '',
				toFixedFix = function(n, prec) {
					var k = Math.pow(10, prec);
					return '' + Math.round(n * k) / k;
				};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			if (s[0].length > 3) {
				s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
			}
			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
		},

		async getNotificationByID(data) {
			let notification = await window.axios.get(`/notifications/${data.id}`).catch(() => {});
			if (notification) {
				this.$refs['notification'].show(notification.data);
				this.notifications.unshift(notification.data);
			}
		},

		goToNotifLink(notification) {
			if (notification.link && this.$route.fullPath != notification.link) {
				this.$router.push(notification.link);
			}
		},

		isImage(extension) {
			let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];
			return imageExtensions.indexOf(extension) > -1;
		},

		focusCallWindow() {
			if (this.callWindow) {
				this.callWindow.focus();
			}
		},

		rejectCall() {
			this.call_sound.pause();
			this.call_sound.currentTime = 0;
			this.socket.emit('live_call_reject', {
				conversation_id: this.callConversation.id
			});
			this.$refs['videoCall'].endCall();
			this.callWindow = this.caller = this.callConversation = null;
		},

		initCall(conversation_id, action) {
			if (!this.callWindow) {
				let conversation = this.conversations.find(x => x.id == conversation_id);
				if (conversation) {
					if (action == 'incoming') {
						this.$refs['videoCall'].endCall();
						this.callUser = this.caller;
						this.call_sound.pause();
						this.call_sound.currentTime = 0;
					} else if (action == 'outgoing') this.callUser = conversation.member;

					let url = `${window.location.origin}/conversations/${conversation_id}/call`;
					const width = 800; // 4:3
					const height = 600;
					const left = screen.width / 2 - width / 2;
					const top = screen.height / 2 - height / 2;
					this.callConversation = conversation;
					this.callWindow = window.open(url, 'telloe_call_window', `width=${width}, height=${height}, top=${top}, left=${left}`);

					this.callWindow.onload = () => {
						this.callWindow.onunload = () => {
							this.callWindow = this.caller = this.callUser = this.callConversation = null;
						};
					};
					this.callWindow.onended = () => {
						this.callUser = null;
					};
				}
			}
		},

		sendVideo(video) {
			if (this.conversation) {
				const timestamp = dayjs().valueOf();
				let message = {
					user: this.auth,
					source: video.source,
					preview: video.preview,
					timestamp: dayjs().valueOf(),
					type: 'video',
					created_at: dayjs(timestamp).format('hh:mm A'),
					is_read: 1,
					created_diff: 'Just now',
					metadata: { duration: video.duration }
				};
				this.sendMessage(message);
				this.closeRecorder('video');
			}
		},

		FBInit() {
			let params = {
				appId: '1187408638266444',
				cookie: true,
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v5.0'
			};
			window.fbAsyncInit = () => {
				FB.init(params);
				this.$emit('FBInit');
			};
		},

		FBParse() {
			return new Promise(resolve => {
				FB.XFBML.parse(null, () => {
					resolve();
				});
			});
		}
	}
});

window.Vue.prototype.$echo = new Echo({
	broadcaster: 'pusher',
	key: 'anyKey',
	wsHost: window.location.hostname,
	wsPort: 6001,
	wssPort: 6001,
	disableStats: true,
	encrypted: true,
	namespace: 'Modules.Frontend.Events',
	enabledTransports: ['ws', 'wss'],
	auth: {
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	}
});
window.app.$echo.private('AppChannel').listen('NewMessageEvent', e => {
	let conversation = window.app.conversations.find(x => x.id == e.message.conversation_id);
	if (conversation) {
		//window.app.$set(conversation.last_message, 'is_read', false);
		window.app.getMessageByID(e.message.id).then(message => {
			if (message) {
				let conversation = window.app.conversations.find(x => x.id == message.conversation_id);
				if (conversation) {
					conversation.last_message = message;
				}
				if (!window.app.$root.muted) window.app.$root.message_sound.play();
			}
		});
	}
});
// window.Echo.private('chat').listenForWhisper('typing', e => {
// 	alert(e);
// });
// setTimeout(() => {
// 	window.Echo.private('chat').whisper('typing', {
// 		user: 'eww',
// 		typing: true
// 	});
// }, 3000);
