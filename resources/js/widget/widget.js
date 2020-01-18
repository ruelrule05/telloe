let API = 'https://api.snapturebox.com'; //get from config

try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

window.SBAxios = require('axios');
window.SBVue = require('vue');

window.SBAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.SBAxios.interceptors.request.use(
    function(config) {
        config.headers['Cache-Control'] = 'no-cache';
        config.url = `${API}/ajax${config.url}`;
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
window.SBAxios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        SBVue.toasted.error(error.response.data.message, {
            className: 'snapturebox-bg-red snapturebox-rounded-0 snapturebox-justify-content-center',
        });
        return Promise.reject(error);
    },
);

let container = document.createElement('div');
container.id = 'snapturebox-widget';
container.innerHTML = '<widget @click.native="widgetClicked" />';
document.body.appendChild(container);

import VueMasonry from './../components/vue-masonry.js';
import TextareaAutosize from 'vue-textarea-autosize';
import VTooltip from 'v-tooltip';
import RecordRTC from 'recordrtc';
import io from 'socket.io-client';
import '../../sass/widget.scss';
import Toasted from 'vue-toasted';

SBVue.component('widget', require('./widget.vue').default);
SBVue.component('vue-select', require('./../widget/vue-select.vue').default);
SBVue.component('vue-button', require('./../components/vue-button.vue').default);
SBVue.component('vue-form-validate', require('./../components/vue-form-validate.vue').default);
SBVue.use(VueMasonry, VTooltip, TextareaAutosize);
SBVue.use(Toasted, {
    position: 'bottom-center',
    singleton: true,
    duration: 3000,
    iconPack: 'custom-class',
    containerClass: 'snapturebox-toasted',
    className: 'snapturebox-bg-primary snapturebox-rounded-0 snapturebox-justify-content-center',
    fullWidth: true,
    fitToScreen: true,
    action: {
        icon: 'eva eva-close-outline font-size-20',
        class: 'font-weight-light text-white',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        },
    },
});

new SBVue({
    el: '#snapturebox-widget',

    data: {
        widget: null,
        auth: null,
        hidden: false,
        open: true, // false
        fullPage: false,
        leftOpen: false,
        backdrop: false,
        loginForm: {
            email: '',
            password: '',
            loading: false,
        },
    },

    created() {
        if (typeof AUTH != 'undefined' && AUTH) {
            this.auth = AUTH;
        }

        if (typeof widget == 'undefined') {
            this.validateDomain();
        } else {
            this.widget = widget;
            this.fullPage = this.leftOpen = true;
        }
    },

    methods: {
        login() {
            this.loginForm.loading = true;
            SBAxios.post('/login', this.loginForm)
                .then((response) => {
                    this.auth = response.data.auth;
                    this.loginForm.loading = false;
                    this.loginForm.email = this.loginForm.password = '';
                    this.toggleModal('#loginModal', 'hide');
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
            axios.post('/logout').then(() => {
                this.auth = null;
            });
        },

        validateDomain() {
            SBAxios.get(`/show?domain=${window.location.hostname}`)
                .then((response) => {
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
                .catch(() => {});
        },

        getAuth() {
            SBAxios.get(`/auth/me`).then((response) => {
                this.auth = response.data;
            });
        },

        widgetClicked(e) {
            let dropdown = null;
            if (e.target.classList.contains('snapturebox-dropdown-toggle')) {
                dropdown = e.target.parentNode.querySelector('.snapturebox-dropdown-menu');
                if (dropdown) dropdown.classList.toggle('snapturebox-show');
            }

            let visibleDropdowns = this.$el.querySelectorAll('.snapturebox-show');
            if (visibleDropdowns.length > 0) {
                visibleDropdowns.forEach((vd) => {
                    if (vd != dropdown || !dropdown) vd.classList.remove('snapturebox-show');
                });
            }
        },
    },
});
