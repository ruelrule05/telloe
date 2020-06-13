require('../../js/bootstrap');
window.Vue = require('vue');
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
    className: 'bg-primary rounded shadow-none'
});
Vue.component('vue-button', require('./components/vue-button.vue').default);
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
                    path: 'messages',
                    component: () => import(/* webpackChunkName: "dashboard/messages" */ './messages/messages.vue'),
                },
                {
                    path: 'bookings',
                    component: {
                        render(c) {
                            return c('router-view');
                        },
                    },
                    children: [
                        {
                            path: '',
                            name: 'bookings',
                            component: () => import(/* webpackChunkName: "bookings" */ './bookings/bookings.vue'),
                        },
                        {
                            path: 'calendar',
                            name: 'calendar',
                            component: () => import(/* webpackChunkName: "calendar" */ './bookings/calendar/calendar.vue'),
                        },
                        {
                            path: 'services',
                            name: 'services',
                            component: () => import(/* webpackChunkName: "services" */ './bookings/services/services.vue'),
                        },
                        {
                            path: 'customers',
                            name: 'customers',
                            component: () => import(/* webpackChunkName: "customers" */ './bookings/customers/customers.vue'),
                        },
                    ]
                },
                {
                    path: 'settings',
                    component: () => import(/* webpackChunkName: "settings" */ './settings/settings.vue'),
                },
                {
                    path: 'account',
                    component: () => import(/* webpackChunkName: "account" */ './account/account.vue'),
                },
                {
                    path: 'billing',
                    component: () => import(/* webpackChunkName: "billing" */ './billing/billing.vue'),
                },
                
            ],
        },
    ]
});
import io from 'socket.io-client';
import BellIcon from '../../icons/bell';
import GridIcon from '../../icons/grid';
import ChatIcon from '../../icons/chat';
import NotebookIcon from '../../icons/notebook';
import CogIcon from '../../icons/cog';
import ChevronDownIcon from '../../icons/chevron-down';
import UsersIcon from '../../icons/users';
import UserCircleIcon from '../../icons/user-circle';
import ShortcutIcon from '../../icons/shortcut';
import ShoppingBagIcon from '../../icons/shopping-bag';
import CalendarDayIcon from '../../icons/calendar-day';
import VirtualRealityIcon from '../../icons/virtual-reality';
import IncomingCallModal from '../../modals/incoming-call/incoming-call.vue';
window.app = new Vue({
    router,
    el: '#app',
    components: {BellIcon, GridIcon, ChatIcon, NotebookIcon, CogIcon, VirtualRealityIcon, UsersIcon, UserCircleIcon, ShortcutIcon, CalendarDayIcon, ChevronDownIcon, ShoppingBagIcon, IncomingCallModal
    },
    data: {
        auth: null,
        pageloading: false,
        heading: '',
        contentloading: true,
        socket: null,
        online_users: [],
        conversations: [],
        selectedConversation: null,
        detailsTab: 'profile',
        profileTab: 'notes', //overview

        notification_sound: null,
        callWindow: null,
        caller: null,
        callConversationId: null,
        callUser: null,
    },

    watch: {
        '$route.path': function() {
            this.contentloading = true;
            $('.leader-line').remove();
        },
    },

    created() {
        this.notification_sound = new Audio(`/notifications/call.mp3`);
        this.getData();
        this.socket = io(WS_URL);
        this.socket.on('online_users', (data) => {
            this.online_users = data;
        });

        this.socket.on('live_call_incoming', (data) => {
            let conversation = this.conversations.find((x) => x.id == data.conversation_id);
            if(conversation) {
                let conversationUsers = this.conversationUsers(conversation);
                let caller = conversationUsers.find((x) => x.id == data.caller_id);
                if(caller && caller.id != this.auth.id) {
                    this.notification_sound.play();
                    this.caller = caller;
                    this.callConversationId = conversation.id;
                    this.$refs['incomingCall'].show();
                }
            }
        });
        this.socket.on('live_call_reject', (data) => {
            let conversation = this.conversations.find((x) => x.id == data.conversation_id);
            if(conversation) {
                this.notification_sound.pause();
                this.notification_sound.currentTime = 0;
                this.$refs['incomingCall'].hide();
            }
        });
        this.socket.on('live_call_end', (data) => {
            let conversation = this.conversations.find((x) => x.id == data.conversation_id);
            if(conversation) {
                this.notification_sound.pause();
                this.notification_sound.currentTime = 0;
                this.$refs['incomingCall'].hide();
            }
        });

        axios.get('/auth').then((response) => {
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
        focusCallWindow() {
            if(this.callWindow) {
                this.callWindow.focus();
            }
        },

        rejectCall() {
            this.notification_sound.pause();
            this.notification_sound.currentTime = 0;
            this.socket.emit('live_call_reject', {
                conversation_id: this.callConversationId,
            });
            this.$refs['incomingCall'].hide();
            this.callWindow = this.caller = this.callConversationId = null;
        },

        initCall(conversation_id, action) {
            if(!this.callWindow) {
                let conversation = this.conversations.find((x) => x.id == conversation_id);
                if(action == 'incoming') {
                    this.$refs['incomingCall'].hide();
                    this.callUser = this.caller;
                    this.notification_sound.pause();
                    this.notification_sound.currentTime = 0;
                }
                else if(action == 'outgoing') this.callUser = conversation.member;

                let url = `${window.location.origin}/conversations/${conversation_id}/call/${action}`;
                const width = 800;
                const height = 475;
                const left = (screen.width/2) - (width/2);
                const top = (screen.height/2) - (height/2);
                this.callWindow = window.open(
                    url, 
                    'telloe_call_window',
                    `width=${width}, height=${height}, top=${top}, left=${left}`);

                this.callWindow.onload = () => {
                    this.callWindow.onunload = (e) => {
                        this.callWindow = this.caller = this.callUser = this.callConversationId = null;
                    };
                };
                this.callWindow.onended = () => {
                    this.callUser = null;
                };
            }
        },

        conversationUsers(conversation) {
            let users = [];
            if(conversation) {
                users.push(conversation.user);
                conversation.members.forEach((member) => {
                    users.push(member.user);
                })
            }

            return users;
        },

        sendVideo(video) {
            if(this.selectedConversation) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    source: video.source,
                    preview: video.preview,
                    timestamp: dayjs().valueOf(),
                    type: 'video',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                    metadata: {duration: video.duration}
                };
                this.sendMessage(message);
                this.closeRecorder('video');
            }
        },

        getData() {
            axios.get('/dashboard/conversations').then((response) => {
                this.conversations = response.data;
                this.orderConversations();
            });
        },

        orderConversations() {
            if (this.conversations.length > 0) {
                this.conversations = this.conversations.sort((a, b) => {
                    const a_timestamp = a.last_message.timestamp || a.timestamp;
                    const b_timestamp = b.last_message.timestamp || b.timestamp;
                    return (a_timestamp > b_timestamp) ? -1 : 1;
                });
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
    }
});
