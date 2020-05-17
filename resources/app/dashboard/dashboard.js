require('../../js/bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';

Vue.use(VueRouter);
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
                    component: () => import(/* webpackChunkName: "dashboard/bookings" */ './bookings/bookings.vue'),
                },
                {
                    path: 'settings',
                    component: () => import(/* webpackChunkName: "dashboard/settings" */ './settings/settings.vue'),
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
import UsersIcon from '../../icons/users';
import CalendarDayIcon from '../../icons/calendar-day';
import VirtualRealityIcon from '../../icons/virtual-reality';
new Vue({
    router,
    el: '#app',
    components: {BellIcon, GridIcon, ChatIcon, NotebookIcon, CogIcon, VirtualRealityIcon, UsersIcon, CalendarDayIcon},
    data: {
        auth: null,
        pageloading: false,
        heading: '',
        contentloading: true,
        socket: null,
        online_users: [],
    },

    watch: {
        '$route.path': function() {
            this.contentloading = true;
            $('.leader-line').remove();
        },
    },

    created() {
        this.socket = io('https://telloe.app:8443');
        this.socket.on('online_users', (data) => {
            this.online_users = data;
            /*let online_users = JSON.parse(window.localStorage.getItem('telloe_online_users'));
            online_users = online_users || [];
            let index = online_users.findIndex((x) => x == data);
            if(index == -1) {
                online_users.push(data);
                online_users = online_users.filter(function(e){return e});
                window.localStorage.setItem('telloe_online_users', JSON.stringify(online_users));
            }*/
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

        logout() {
            axios
                .post('/logout')
                .then((response) => {
                    window.location.href = '/';
                })
                .catch(() => {
                    this.loading = false;
                });
        },
    }
});
