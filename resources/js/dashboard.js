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

    mounted() {},

    created() {},

    watch: {
        '$route.path': function() {
            this.contentloading = true;
        },
    },

    methods: {
    },
};

window.mixins.push(dashboard);