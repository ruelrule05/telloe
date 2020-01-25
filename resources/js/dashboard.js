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
        ],
    },
]);

const dashboard = {
    data: {
        heading: '',
        pageloading: false,
    },

    computed: {},

    mounted() {},

    created() {},

    watch: {},

    methods: {
    },
};

window.mixins.push(dashboard);