require('./bootstrap');

window.Vue = require('vue');
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/tab';
import RecordRTC from 'recordrtc';
import VueRouter from 'vue-router';
import Toasted from 'vue-toasted';
//const html2canvas = require('html2canvas');
//const domtoimage = require('dom-to-image-improved');
import { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon, PlayIcon, PauseIcon, CheckIcon, ApertureIcon, EditIcon, PenToolIcon } from 'vue-feather-icons';

var format = require('format-duration');
//const imageDataURI = require('image-data-uri');
import VueObserveVisibility from 'vue-observe-visibility';
 
Vue.use(VueObserveVisibility);
Vue.use(VueRouter);


Vue.use(Toasted, {
    position: 'bottom-center',
    singleton: true,
    duration: 3000,
    iconPack: 'custom-class',
    className: 'bg-primary rounded-0 justify-content-center',
    fullWidth: true,
    fitToScreen: true,
    action: {
        icon: 'eva eva-close-outline font-size-20',
        class: 'font-weight-light text-white',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    }
});
Vue.component('image-to-canvas', require('./components/image-to-canvas.vue').default);
Vue.component('vue-button', require('./components/vue-button.vue').default);

const router = new VueRouter({
    linkActiveClass: 'active',
    mode: 'history',
    routes: window.routes || []
});

window.app = new Vue({
    router,
    mixins: window.mixins || [],
    components: { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon, PlayIcon, PauseIcon, CheckIcon, ApertureIcon, EditIcon, PenToolIcon },
    el: '#app',
    mounted() {
    }
});
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})


