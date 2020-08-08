require('../js/bootstrap');
window.Vue = require('vue');

import {mapState, mapGetters, mapActions} from 'vuex';
import VueRouter from 'vue-router';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/collapse';
import Toasted from 'vue-toasted';

Vue.use(VueRouter);
Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 3000,
    className: 'bg-primary rounded shadow-none',
});
//Vue.component('vue-button', require('../components/vue-button.vue').default);
const router = new VueRouter({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            component: {
                render(c) {
                    return c('router-view');
                },
            },
            children: [
                {
                    name: 'conversations',
                    path: 'conversations/:id?',
                    component: () => import(/* webpackChunkName: "dashboard-conversations" */ './components/conversations/conversations.vue'),
                },
                {
                    name: 'bookings',
                    path: 'bookings',
                    component: () => import(/* webpackChunkName: "dashboard-bookings" */ './components/bookings/bookings.vue'),
                    children: [
                        {
                            path: 'calendar',
                            name: 'calendar',
                            component: () => import(/* webpackChunkName: "dashboard-bookings-calendar" */ './components/bookings/calendar/calendar.vue'),
                        },
                        {
                            path: 'services',
                            name: 'services',
                            component: () => import(/* webpackChunkName: "dashboard-bookings-services" */ './components/bookings/services/services.vue'),
                        },
                    ],
                },
                {
                    path: 'contacts',
                    name: 'contacts',
                    component: () => import(/* webpackChunkName: "dashboard-contacts" */ './components/contacts/contacts.vue'),
                },
                {
                    name: 'payments',
                    path: 'payments',
                    component: {
                        render(c) {
                            return c('router-view');
                        },
                    },
                    children: [
                        {
                            path: 'subscriptions',
                            name: 'subscriptions',
                            component: () => import(/* webpackChunkName: "dashboard-payments-subscriptions" */ './components/payments/subscriptions/subscriptions.vue'),
                        },
                        {
                            path: 'Invoices',
                            name: 'invoices',
                            component: () => import(/* webpackChunkName: "dashboard-payments-invoices" */ './components/payments/invoices/invoices.vue'),
                        },
                    ],
                },
                {
                    name: 'account',
                    path: 'account',
                    component: () => import(/* webpackChunkName: "dashboard-account" */ './components/account/account.vue'),
                },
                {
                    name: 'billing',
                    path: 'billing',
                    component: () => import(/* webpackChunkName: "dashboard-billing" */ './components/billing/billing.vue'),
                },
            ],
        },
    ],
});
import io from 'socket.io-client';
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

import DocumentIcon from '../icons/document';
import VideoCall from './components/video-call/video-call.vue';
import Notification from '../components/notification/notification.vue';

import store from './store';
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

        VideoCall,
        ScreenRecorder,
        Notification,

        'sidebar-conversations': () => import(/* webpackChunkName: "sidebar-conversations" */ './components/sidebar-conversations/sidebar-conversations.vue'),
    },
    data: {
        auth: null,
        pageloading: false,
        heading: '',
        contentloading: true,
        socket: null,
        online_users: [],
        detailsTab: 'profile',
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
            status: '',
        },
    },

    computed: {
        ...mapState({
            conversations: state => state.conversations.index,
            notifications: state => state.notifications.index,
        }),

        ...mapGetters({
            getConversation: 'conversations/show',
        }),

        conversation() {
            return this.getConversation(this.$route.params.id);
        },

        payoutComplete() {
            return !this.auth.stripe_account.individual || (this.auth.stripe_account.individual && this.auth.stripe_account.individual.requirements.pending_verification.length > 2) ? false : true;
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
                    supportLink = `/dashboard/conversations/${conversation.id}`;
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
        },
    },

    watch: {
        '$route.name': function(value) {
            this.contentloading = true;
            $('.leader-line').remove();
        },
    },

    created() {
        if (this.$route.name != 'conversations') this.getConversations();
        this.call_sound = new Audio(`/notifications/call.mp3`);
        this.message_sound = new Audio('/notifications/new_message.mp3');
        this.socket = io(WS_URL);

        this.socket.on('new_message', data => {
            let conversation = this.conversations.find(x => x.id == data.conversation_id);
            if (conversation) {
                // check if message does not exists by ID
                this.getMessageByID(data).then(message => {
                    if (message && message.conversation_id == conversation.id) {
                        conversation.last_message = message;
                        this.message_sound.play();
                    }
                });
            }
        });

        this.socket.on('new_notification', data => {
            this.getNotificationByID(data);
        });

        this.socket.on('online_users', data => {
            this.online_users = data;
        });

        axios.get('/auth').then(response => {
            this.auth = response.data;
            this.socket.emit('user_online', this.auth.id);
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
    },

    mounted() {
        this.FBInit();
    },

    methods: {
        ...mapActions({
            getConversations: 'conversations/index',
            getNotifications: 'notifications/index',
            updateNotification: 'notifications/update',
        }),

        getFiles(conversation) {
            if(conversation) {
                let page = 0;
                if(!conversation.files) {
                    this.$set(conversation, 'files', {data: []});
                    page = 1;
                }
                if((conversation.files || {}).next_page_url) {
                    const url = new URL(window.location.origin + conversation.files.next_page_url);
                    const urlParams = new URLSearchParams(url.search);
                    page = urlParams.get('page');
                }
                if(page) {
                    this.$set(conversation, 'filesLoading', true);
                    axios.get(`/conversations/${conversation.id}/files?page=${page}`).then(response => {
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
            let notification = await axios.get(`/notifications/${data.id}`).catch(e => {});
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

        async getMessageByID(data) {
            let message = await axios.get(`/messages/${data.id}`).catch(e => {});
            if (message) return message.data;
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
                conversation_id: this.callConversation.id,
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
                        this.callWindow.onunload = e => {
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
                    metadata: {duration: video.duration},
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
                version: 'v5.0',
            };
            window.fbAsyncInit = () => {
                FB.init(params);
                this.$emit('FBInit');
            };
        },

        FBParse() {
            return new Promise((resolve, reject) => {
                FB.XFBML.parse(null, () => {
                    resolve();
                });
            });
        },
    },
});
