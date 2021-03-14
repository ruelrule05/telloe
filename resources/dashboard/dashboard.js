require('../js/bootstrap');
import Vue from 'vue';

import { mapState, mapGetters, mapActions } from 'vuex';
import VueRouter from 'vue-router';
import Toasted from 'vue-toasted';
const introJS = require('intro.js');

Vue.use(VueRouter);
Vue.use(Toasted, {
	position: 'bottom-center',
	duration: 3000,
	singleton: true
});
//window.Vue.component('vue-button', require('../components/vue-button.vue').default);

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
import echo from '../js/echo.js';
import router from './router';

window.app = new Vue({
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

		'knowledge-base': () => import(/* webpackChunkName: "knowledge-base" */ './components/knowledge-base/knowledge-base.vue')
	},
	data: {
		auth: null,
		pageloading: false,
		heading: '',
		contentloading: true,
		onlineUsers: [],
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
		muted: false,
		intros: intros,
		introJS: introJS,
		appChannel: null,
		userChannel: null,
		showHelpWidget: true,

		toggleKnowBase: false
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

		profileLink() {
			let profileLink = '/dashboard/account?tab=profile';
			if (!this.payoutComplete) profileLink = '/dashboard/account?tab=payout';

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
			//$('.leader-line').remove();
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
			});

			this.userChannel = this.$echo.private(`users.${this.auth.id}`);
			this.userChannel.listen('NewNotificationEvent', data => {
				this.getNotificationByID(data.notification.id);
			});
		});

		this.notifyIncomingBookings();
		if (this.$route.name != 'conversations') this.getConversations();
		this.call_sound = new Audio(`/notifications/call.mp3`);
		this.message_sound = new Audio('/notifications/new_message.mp3');

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

		newMessage(message) {
			let conversation = window.app.conversations.find(x => x.id == message.conversation_id);
			if (conversation) {
				//window.app.$set(conversation.last_message, 'is_read', false);
				window.app.getMessageByID(message.id).then(message => {
					if (message) {
						let conversation = window.app.conversations.find(x => x.id == message.conversation_id);
						if (conversation) {
							conversation.last_message = message;
						}
						if (!window.app.$root.muted) window.app.$root.message_sound.play();
					}
				});
			}
		},

		isOnline(userId) {
			return this.onlineUsers.find(x => x.id == userId);
		},

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

		async getNotificationByID(id) {
			let notification = await window.axios.get(`/notifications/${id}`).catch(() => {});
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
		}
	}
});

Vue.prototype.$echo = echo;
