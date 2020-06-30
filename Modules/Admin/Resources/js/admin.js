require('./bootstrap');
window.Vue = require('vue');
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import Toasted from 'vue-toasted';
import VueRouter from 'vue-router';

Vue.use(Toasted, {
    position: 'bottom-center',
    singleton: true,
    duration: 3000,
    iconPack: 'custom-class',
    className: 'bg-primary rounded-0 justify-content-center',
    fullWidth: true,
    fitToScreen: true,
    action: {
        icon: 'fal fa-times',
        class: 'font-weight-light text-white',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    }
});
Vue.use(VueRouter);
Vue.component('vue-select', require('../assets/components/vue-select/vue-select.vue').default);
Vue.component('vue-button', require('../assets/components/vue-button.vue').default);
Vue.component('vue-form-validate', require('../assets/components/vue-form-validate.vue').default);

const routes = [
    {
        path: '',
        component: () =>
            import(/* webpackChunkName: "admin/dashboard" */ '../components/dashboard.vue')
    },
    {
        path: '/areas-of-interests',
        component: () =>
            import(/* webpackChunkName: "admin/areas-of-interests" */ '../components/areas-of-interests.vue')
    },
];
const router = new VueRouter({
    linkActiveClass: 'active',
    mode: 'history',
    routes: routes
});

window.app = new Vue({
    router,
    el: '#app',
    mixins: window.mixins || [],
    data: {
        frontend: frontend,
        auth: null,
        contentloading: true,
        sidebar_toggle: false,
        navbar_toggle: false,
        error: false,
        nav_links: [
            {
                to: '/areas-of-interests',
                icon: 'fal fa-briefcase fa-fw',
                text: 'Areas of Interests'
            },
            {
                to: '/widgets',
                icon: 'fal fa-briefcase fa-fw',
                text: 'Widgets'
            },
            {
                to: '/bookings',
                icon: 'fal fa-user-tie fa-fw',
                text: 'Bookings'
            },
            {
                to: '/inquiries',
                icon: 'fal fa-user-headset fa-fw',
                text: 'Inquiries'
            },
        ],
        title: '',
        notification_sound: null,
        header_title: '',
    },

    created() {
        axios.get('/auth', false, false).then((response) => {
            this.auth = response.data;
        });
    },

    watch: {
        '$route.path': function() {
            this.error = false;
            this.contentloading = true;
            if (this.$refs['dashboard-content-body']) {
                this.$refs['dashboard-content-body'].scrollTop = 0;
            }
        },

        title: function(value) {
            document.title = value;
        },
        navbar_toggle: function(value) {
            value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
        }
    },

    methods: {
        toggleSidebar() {
            this.sidebar_toggle = this.sidebar_toggle ? false : true;
        },

        basename(path) {
            return (path || '').split('/').pop();
        },

        br2nl(str, replaceMode) {
            const replaceStr = replaceMode ? '\n' : '';
            return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
        },
        
        jobStatusIconClass(status) {
            switch (status) {
                case 'requires_payment':
                    return 'fa-exclamation-circle';
                    break;
                case 'open':
                    return 'fa-pennant';
                    break;
                case 'in_progress':
                    return 'fa-sync';
                    break;
                case 'completed':
                    return 'fa-check';
                    break;
                case 'closed':
                    return 'fa-times';
                    break;
            }
        },
    }
});