window.routes = window.routes.concat([
    {
        path: '/dashboard',
        component: {
            render(c) {
                return c('router-view');
            },
        },
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "dashboard" */ './components/dashboard/dashboard.vue'),
            },
            {
                path: 'inquiries',
                component: () => import(/* webpackChunkName: "inquiries" */ './components/dashboard/inquiries/index.vue'),
            },
            {
                path: 'settings',
                component: () => import(/* webpackChunkName: "settings" */ './components/dashboard/settings.vue'),
            },
            {
                path: 'account',
                component: () => import(/* webpackChunkName: "account" */ './components/dashboard/account.vue'),
            },
            {
                path: 'billing',
                component: () => import(/* webpackChunkName: "billing" */ './components/dashboard/billing.vue'),
            },
            {
                path: 'chatbots',
                component: () => import(/* webpackChunkName: "chatbots" */ './components/dashboard/chatbots/index.vue'),
            },
            {
                path: 'chatbots/:id',
                component: () => import(/* webpackChunkName: "chatbots-show" */ './components/dashboard/chatbots/show.vue'),
            },
        ],
    },
]);
import Tooltip from './directives/tooltip.js';
import BellIcon from './icons/bell';
import GridIcon from './icons/grid';
import ChatIcon from './icons/chat';
import NotebookIcon from './icons/notebook';
import CogIcon from './icons/cog';
import VirtualRealityIcon from './icons/virtual-reality';
const dashboard = {
    directives: {Tooltip},
    
    components: {BellIcon, GridIcon, ChatIcon, NotebookIcon, CogIcon, VirtualRealityIcon},

    data: {
        heading: '',
        contentloading: true,
    },

    computed: {},

    created() {
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

    watch: {
        '$route.path': function() {
            this.contentloading = true;
            $('.leader-line').remove();
        },
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
        }

    },
};

window.mixins.push(dashboard);
