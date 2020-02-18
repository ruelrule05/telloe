let API = 'https://api.snapturebox.app'; //get from config

try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

window.SBAxios = require('axios');
window.SBVue = require('vue');

window.SBAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.SBAxios.interceptors.request.use(
    function(config) {
        let access_token = window.localStorage.getItem('snapturebox_access_token');
        let concat = '?';
        if (config.url.indexOf('?') > -1) concat = '&';
        access_token = access_token ? `${concat}token=${access_token}` : '';
        config.headers['Cache-Control'] = 'no-cache';
        config.url = `${API}/ajax${config.url}${access_token}`;
        return config;
    },
    function(error) {
        return Promise.reject(error);
    },
);
window.SBAxios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response.status == 401) {
            let access_token = window.localStorage.getItem('snapturebox_access_token');
            if (access_token) window.snapturebox.refreshToken();
        } else {
            /*SBVue.toasted.error(error.response.data.message, {
                className: 'snapturebox-bg-red snapturebox-rounded-0 snapturebox-justify-content-center',
            });*/
        }

        return Promise.reject(error);
    },
);

let container = document.createElement('div');
container.id = 'snapturebox-widget';
container.innerHTML = '<widget />';
document.body.appendChild(container);

import VueMasonry from './../components/vue-masonry.js';
//import TextareaAutosize from 'vue-textarea-autosize';
import './widget.scss';
// console.log(style);
//import Toasted from 'vue-toasted';

SBVue.component('widget', require('./widget.vue').default);
SBVue.component('vue-select', require('./../widget/vue-select.vue').default);
SBVue.component('vue-button', require('./../components/vue-button.vue').default);
SBVue.component('vue-form-validate', require('./../components/vue-form-validate.vue').default);
SBVue.use(VueMasonry);

window.snapturebox = new SBVue({
    el: '#snapturebox-widget',

    data: {
        API: API,
        widget: null,
        auth: null,
        hidden: false,
        open: true, // false
        fullPage: false,
        leftOpen: false, // false
        backdrop: false,
        loginForm: {
            email: 'cleidoscope@gmail.com',
            password: 'admin',
            loading: false,
        },
        signupForm: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            loading: false,
        },
        customerForm: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            offer_id: '',
            loading: false,
            skipButton: true,
        },
        inquiry_types: [],
        classPrefix: 'snapturebox-',
    },

    created() {
        if (typeof widget == 'undefined') {
            this.validateDomain();
        } else {
            this.widget = widget;
            this.fullPage = this.leftOpen = true;
        }
    },

    methods: {
        book() {
            this.customerForm.loading = true;
            this.customerForm.skipButton = false;
            SBAxios.post('/bookings', this.customerForm).then((response) => {
                this.toggleModal('#customerInfoModal', 'hide');
                let index = this.auth.offers.findIndex((x) => x.id == this.customerForm.offer_id);
                if (index > -1) this.auth.offers[index] = response.data;
                this.customerForm.first_name = this.customerForm.last_name = this.customerForm.email = this.customerForm.phone = this.customerForm.offer_id = '';
                this.customerForm.loading = false;
                this.customerForm.skipButton = true;
            });
        },

        refreshToken() {
            SBAxios.post('/auth/refresh')
                .then((response) => {
                    this.auth = response.data;
                    window.localStorage.setItem('snapturebox_access_token', response.data.access_token);
                })
                .catch(() => {
                    this.auth = null;
                    window.localStorage.removeItem('snapturebox_access_token');
                });
        },

        async getData() {
            let inquiry_types = await SBAxios.get('/inquiry_types');
            if (inquiry_types) this.inquiry_types = inquiry_types.data;
            let me = await SBAxios.get('/auth/me').catch(() => {});
            if (me) this.auth = me.data;
        },

        signup() {
            this.signupForm.loading = true;
            SBAxios.post('/auth/signup', this.signupForm)
                .then((response) => {
                    this.signupForm.loading = false;
                    this.signupForm.email = this.signupForm.password = '';
                    this.toggleModal('#signupModal', 'hide');
                    this.auth = response.data;
                })
                .catch(() => {
                    this.signupForm.loading = false;
                });
        },

        login() {
            this.loginForm.loading = true;
            SBAxios.post('/auth/login', this.loginForm)
                .then((response) => {
                    this.loginForm.loading = false;
                    this.loginForm.email = this.loginForm.password = '';
                    this.toggleModal('#loginModal', 'hide');
                    this.auth = response.data.user;
                    window.localStorage.setItem('snapturebox_access_token', response.data.access_token);
                })
                .catch(() => {
                    this.loginForm.loading = false;
                });
        },

        toggleModal(el, status) {
            let modal = $(el);
            if (modal) {
                if (status == 'show') {
                    setTimeout(() => {
                        modal.addClass('snapturebox-modal-show');
                    });
                    modal.css('display', 'block');
                    this.backdrop = true;
                    this.$emit('show');
                } else if (status == 'hide') {
                    modal.removeClass('snapturebox-modal-show');
                    this.backdrop = false;
                    setTimeout(() => {
                        modal.css('display', 'none');
                    }, 200);
                }
            }
        },

        logout() {
            SBAxios.post('/auth/logout').then(() => {
                this.auth = null;
                window.localStorage.removeItem('snapturebox_access_token');
            });
        },

        validateDomain() {
            SBAxios.get(`/show?domain=${window.location.hostname}`)
                .then((response) => {
                    this.getData();
                    this.widget = response.data;
                    let pageRule = this.widget.widget_rules.find((x) => x.page == window.location.pathname);
                    if (pageRule) {
                        switch (pageRule.state) {
                            case 'Open':
                                this.open = true;
                                break;

                            case 'Minimized':
                                this.open = false;
                                break;

                            case 'Hidden':
                                this.hidden = true;
                                break;
                        }
                    }
                })
                .catch((e) => {
                    if (e.response) console.warn(e.response.data.message);
                });
        },
    },
});
