require('./bootstrap');

import 'bootstrap/js/dist/collapse';
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

window.Vue = require('vue');

Vue.component('pageloader', require('../components/pageloader.vue').default);
new Vue({
    el: '#app',
    components: {
        RangeSlider,
        'auth': () => import(/* webpackChunkName: "auth" */ '../app/auth/auth.vue'),
    },

    data: {
        auth: false,
        action: 'login',
    	seats: 15,
    },

    created() {
    },

    methods: {
    },
});