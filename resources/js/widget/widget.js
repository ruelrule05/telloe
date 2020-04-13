let API = 'https://api.snapturebox.app'; //get from config
//let API = 'https://api.snapturebox.com'; //get from config

//const widget_business_hours = {"Monday":{"start":"8:00","end":"18:00"},"Tuesday":{"start":"8:00","end":"18:00"},"Wednesday":{"start":"8:00","end":"18:00"},"Thursday":{"start":"8:00","end":"18:00"},"Friday":{"start":"8:00","end":"18:00"},"Saturday":{"start":"9:00","end":"17:00"}}

try {
    window.$ = require('jquery');
} catch (e) {}

window.SBAxios = require('axios');
window.SBVue = require('vue');

window.SBAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.SBAxios.interceptors.request.use(
    function(config) {
        let access_token = window.localStorage.getItem('snapturebox_access_token');
        let params = [];
        if (access_token && config.url != '/auth/login') params.push(`token=${access_token}`);
        if (params.length == 0) params = '';
        else params = '?' + params.join('&');

        config.headers['Cache-Control'] = 'no-cache';
        config.url = `${API}/ajax${config.url}${params}`;
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
        if (error.response && error.response.status == 401) {
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
container.innerHTML = '<widget v-if="ready" ref="widget" />';
document.body.appendChild(container);

//import VueMasonry from './../components/vue-masonry.js';
//import TextareaAutosize from 'vue-textarea-autosize';
import './widget.scss';
import dayjs from 'dayjs';
// console.log(style);
//import Toasted from 'vue-toasted';

SBVue.component('widget', require('./widget.vue').default);
SBVue.component('vue-select', require('./components/vue-select.vue').default);
SBVue.component('vue-button', require('./components/vue-button.vue').default);
SBVue.component('vue-form-validate', require('./../components/vue-form-validate.vue').default);
//SBVue.use(VueMasonry);

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
        guest_cookie: null,
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

        // Wordpress Cocoach
        widget_business_hours: null,
        ready: false,
        conversation: {messages: []}
    },

    created() {
        if (typeof widget_business_hours != 'undefined') {
           this.widget_business_hours = widget_business_hours;
        }
        
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
                    if (response.data.id) this.auth = response.data;
                    window.localStorage.setItem('snapturebox_access_token', response.data.access_token);
                })
                .catch(() => {
                    this.auth = null;
                    window.localStorage.removeItem('snapturebox_access_token');
                });
        },

         getData() {
            /*SBAxios.get('/inquiry_types').then((response) => {
                this.inquiry_types = response.data;
            });*/
            SBAxios.get('/auth/me').then((response) => {
                this.auth = response.data.user;
                this.conversation = response.data.conversation;
                this.ready = true;
            }).catch(() => {this.guestCookie()});
         
        },

        getGuestMessages() {
            SBAxios.get(`/messages?guest=${this.guest_cookie}`, ).then((response) => {
                //console.log(response.data.messages);
                if(response.data.id) this.conversation = response.data;
                this.ready = true;
            });
        },

        guestCookie() {
            let guest_cookie = null;
            let cookie = this.getCookie();
            if(cookie){
                guest_cookie = cookie;
            } else {
                let exdays = 30; // 1 month
                let randomString = require('random-string');
                let rndString = randomString({length: 12});
                const timestamp = `${dayjs().valueOf()}${rndString}`;
                let d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = 'snapturebox_guest_cookie' + "=" + timestamp + ";" + expires + ";path=/";
                guest_cookie = timestamp;
            }
            this.guest_cookie = guest_cookie;
            this.getGuestMessages();
        },

        getCookie() {
            let cname = 'snapturebox_guest_cookie';
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
            }
            return "";
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
            this.auth = null;
            this.conversation = {messages: []};
            SBAxios.post('/auth/logout').then(() => {
                window.localStorage.removeItem('snapturebox_access_token');
            });
        },

        validateDomain() {
            SBAxios.get('/show')
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
