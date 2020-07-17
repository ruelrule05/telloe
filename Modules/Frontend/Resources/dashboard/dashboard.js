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
                    component: {
                        render(c) {
                            return c('router-view');
                        },
                    },
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
import ShortcutIcon from '../icons/shortcut';
import PlannerIcon from '../icons/planner';
import VirtualRealityIcon from '../icons/virtual-reality';
import BillIcon from '../icons/bill';
import ContactIcon from '../icons/contact';
import ExclamationCircleIcon from '../icons/exclamation-circle';
import VideoCall from './components/video-call/video-call.vue';

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
        ShortcutIcon,
        PlannerIcon,
        ChevronDownIcon,
        BillIcon,
        ContactIcon,
        ExclamationCircleIcon,

        VideoCall,
        ScreenRecorder,
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
            status: '',
        },
    },

    computed: {
        ...mapState({
            conversations: state => state.conversations.index,
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
                if (!conversation.last_message.is_read) {
                    if(!count) count = 0;
                    count++;
                }
            });
            return count;
        },
    },

    watch: {
        '$route.name': function() {
            this.contentloading = true;
            $('.leader-line').remove();
        },
    },

    created() {
        if(this.$route.name != 'conversations') this.getConversations();
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
    },

    mounted() {
        this.FBInit();
    },

    methods: {
        ...mapActions({
            getConversations: 'conversations/index',
        }),

        isImage(extension) {
            let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];
            return imageExtensions.indexOf(extension) > -1;
        },

        async getMessageByID(data) {
            let message = await axios.get(`/messages/${data.id}`).catch((e) => {});
            if(message) return message.data;
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
