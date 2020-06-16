require('./bootstrap');

import 'bootstrap/js/dist/collapse';
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import Auth from '../app/auth/auth.vue';

window.Vue = require('vue');

Vue.component('pageloader', require('../components/pageloader.vue').default);
new Vue({
    el: '#app',
    components: {
        RangeSlider,
        Auth,
    },

    data: {
        auth: false,
        action: 'login',
    	seats: 15,
        invite_token: null,
    },

    watch: {
        action: function(value) {
            if(this.$refs['authForm']) this.$refs['authForm'].error = '';
        }
    },

    created() {
        const queryString = window.location.search;
        if(queryString) {
            const urlParams = new URLSearchParams(queryString);
            const invite_token = urlParams.get('invite_token');
            const authTab = urlParams.get('auth');
            if(authTab) this.action = authTab;
            if(invite_token) {
                this.invite_token = invite_token;
                this.auth = true;
            }
        }
    },

    methods: {
    },
});