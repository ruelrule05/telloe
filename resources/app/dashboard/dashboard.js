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
Vue.component('vue-button', require('../../components/vue-button.vue').default);
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
                            component: () => import(/* webpackChunkName: "dashboard/bookings/index" */ './bookings/bookings.vue'),
                        },
                        {
                            path: 'calendar',
                            name: 'calendar',
                            component: () => import(/* webpackChunkName: "dashboard/bookings/calendar" */ './bookings/calendar/calendar.vue'),
                        },
                        {
                            path: 'services',
                            name: 'services',
                            component: () => import(/* webpackChunkName: "dashboard/bookings/services" */ './bookings/services/services.vue'),
                        },
                        {
                            path: 'customers',
                            name: 'customers',
                            component: () => import(/* webpackChunkName: "dashboard/bookings/customers" */ './bookings/customers/customers.vue'),
                        },
                    ]
                },
                {
                    path: 'settings',
                    component: () => import(/* webpackChunkName: "dashboard/settings" */ './settings/settings.vue'),
                },
                {
                    path: 'account',
                    component: () => import(/* webpackChunkName: "dashboard/account" */ './account/account.vue'),
                },
                {
                    path: 'billing',
                    component: () => import(/* webpackChunkName: "dashboard/billing" */ './billing/billing.vue'),
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
window.app = new Vue({
    router,
    el: '#app',
    components: {BellIcon, GridIcon, ChatIcon, NotebookIcon, CogIcon, VirtualRealityIcon, UsersIcon, UserCircleIcon, ShortcutIcon, CalendarDayIcon, ChevronDownIcon, ShoppingBagIcon,
        'video-call-modal': () => import(/* webpackChunkName: "modals/video-call" */ '../../modals/video-call/video-call.vue'),
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

        notification_sound: null,
        pc: null,
        videoCallData: null,
        videoCallStatus: '',
        offerOptions: {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        },
        remoteStream: null,
    },

    watch: {
        '$route.path': function() {
            this.contentloading = true;
            $('.leader-line').remove();
        },
    },

    created() {
        this.createPeerConnection();
        this.remoteStream = new MediaStream();
        this.notification_sound = new Audio(`/notifications/call.mp3`);
        this.getData();
        //this.socket = io('https://telloe.app:8443');
        this.socket = io('https://telloe.com:8443');
        this.socket.on('online_users', (data) => {
            this.online_users = data;
        });

        /* Video call listeners  */
        this.socket.on('live_call_offer', (data) => {
            let conversation = this.$root.conversations.find((x) => x.id == data.conversation_id);
            if(conversation) {
                let users = this.conversationUsers(conversation);
                let caller = users.find((x) => x.id == data.caller);
                if(caller) {
                    if(!this.pc) this.createPeerConnection();
                    this.pc.setRemoteDescription(data.desc);
                    if(this.videoCallStatus != 'ongoing') {
                        this.videoCallData = {
                            action: 'incoming',
                            caller: caller,
                            callee: this.$root.auth,
                            conversation: conversation,
                        }
                        this.$refs['videoCall'].init();
                    } else {
                        this.createAnswer();
                    }
                }
            }
        });
        this.socket.on('live_call_candidate', (data) => {
            if(this.conversations.find((x) => x.id == data.conversation_id) && this.pc) {
                console.log('received: live_call_candidate');
                this.pc.addIceCandidate(data.candidate);
            }
        });
        this.socket.on('live_call_answer', (data) => {
            if(this.conversations.find((x) => x.id == data.conversation_id)) {
                this.pc.setRemoteDescription(data.desc);
                this.videoCallStatus = 'ongoing';
                this.notification_sound.pause();
            }
        });
        /* End Video call listeners  */

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
        resetVideoCall() {
            if(this.pc) this.pc.close();
            this.pc = this.videoCallData = this.remoteStream = this.videoCallStatus = this.remoteStream = null;
            this.remoteStream = new MediaStream();
            this.notification_sound.currentTime = 0;
        },

        startCall() {
            this.createPeerConnection();
            this.$refs['videoCall'].init();
            let users = this.conversationUsers(this.selectedConversation);
            let callee = users.find((x) => x.id != this.auth.id);
            this.videoCallData = {
                action: 'outgoing',
                caller: this.auth,
                callee: callee,
                conversation: this.selectedConversation,
            };
            this.createOffer();
        },

        answerCall() {
            this.notification_sound.pause();
            this.videoCallStatus = 'ongoing';
            this.createAnswer();
        },

        createOffer() {
            this.pc.createOffer(this.offerOptions).then((desc) => {
                this.pc.setLocalDescription(desc);
                this.socket.emit('live_call_offer', {
                    desc,
                    conversation_id: this.selectedConversation.id,
                    caller: this.auth.id
                });
            }, (e) => { console.log(e); });
        },

        createAnswer() {
            this.pc.createAnswer().then((desc) => {
                this.pc.setLocalDescription(desc);
                this.socket.emit('live_call_answer', { 
                    desc, 
                    conversation_id: this.selectedConversation.id,
                });
            }, (e) => { console.log(e); });
        },

        createPeerConnection() {
            let configuration = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        credential: 'moonfang',
                        username: 'cleidoscope@gmail.com'
                    }
                ]
            };
            this.pc = new RTCPeerConnection(configuration);
            this.pc.ontrack = (event) => {
                this.remoteStream.addTrack(event.track);
                this.$refs['videoCall'].updateRemoteStream();
            }
            this.pc.onicecandidate = (event) => {
                if(event.candidate) {
                    console.log('emit: live_call_candidate');
                    this.socket.emit('live_call_candidate', {
                        conversation_id: this.$root.selectedConversation.id,
                        candidate: event.candidate
                    });
                }
            };
            this.pc.oniceconnectionstatechange = () => {
                //console.log(this.pc.iceConnectionState);
            };
            this.pc.onnegotiationneeded = (e) => {
                this.createOffer();
            };
            this.pc.onicecandidateerror = (error) => {
                console.log(error);
            };
        },

        conversationUsers(conversation) {
            let users = [];
            if(conversation) {
                conversation.members.forEach((member) => {
                    users.push(member.user);
                })
                users.push(conversation.user);
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
