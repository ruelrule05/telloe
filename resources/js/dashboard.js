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
                path: 'inquiries/:id',
                component: () => import(/* webpackChunkName: "inquiries-show" */ './components/dashboard/inquiries/show.vue'),
            },
            {
                path: 'settings',
                component: () => import(/* webpackChunkName: "settings" */ './components/dashboard/settings.vue'),
            },
            {
                path: 'integration',
                component: () => import(/* webpackChunkName: "integration" */ './components/dashboard/integration.vue'),
            },
            {
                path: 'notifications',
                component: () => import(/* webpackChunkName: "notifications" */ './components/dashboard/notifications.vue'),
            },
            {
                path: 'account',
                component: () => import(/* webpackChunkName: "account" */ './components/dashboard/account.vue'),
            },
            {
                path: 'billing',
                component: () => import(/* webpackChunkName: "billing" */ './components/dashboard/billing.vue'),
            },
        ],
    },
]);

const dashboard = {
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
