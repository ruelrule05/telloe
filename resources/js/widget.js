window.SBAxios = require('axios');
window.SBVue = require('vue');

window.SBAxios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        console.warn(error.response.data.message);
        return Promise.reject(error);
    }
);

let container = document.createElement('div');
container.id = 'snapturebox-widget';
container.innerHTML = '<widget @click.native="widgetClicked" />';
document.body.appendChild(container);

import VueMasonry from './components/vue-masonry.js';
import TextareaAutosize from 'vue-textarea-autosize';
import VTooltip from 'v-tooltip';
import RecordRTC from 'recordrtc';
import io from 'socket.io-client';
import { MessageCircleIcon, SendIcon, VideoIcon, MicIcon, CameraIcon, PlayIcon, PauseIcon, ChevronDownIcon, SmileIcon, XIcon, UserIcon, AtSignIcon, SmartphoneIcon, LockIcon, MoreVerticalIcon, InfoIcon, FileTextIcon, PhoneIcon, PlusIcon, EditIcon, CheckCircleIcon } from 'vue-feather-icons';
import '../sass/widget.scss';

SBVue.component('widget', require('./components/widget.vue').default)
SBVue.use(VueMasonry, VTooltip, TextareaAutosize);
new SBVue({
    el: '#snapturebox-widget',

    components: { MessageCircleIcon, SendIcon, VideoIcon, MicIcon, CameraIcon, PlayIcon, PauseIcon, ChevronDownIcon, SmileIcon, XIcon, UserIcon, AtSignIcon, SmartphoneIcon, LockIcon, MoreVerticalIcon, InfoIcon, FileTextIcon, PhoneIcon, PlusIcon, EditIcon, CheckCircleIcon },

    data: {
        API: 'https://api.boxbi.app',
        widget: null,
        auth: null,
    },

    created() {
        this.validateDomain();
    },

    methods: {
        validateDomain() {
            SBAxios.get(`${this.API}/show?domain=${window.location.hostname}`).then((response) => {
                this.widget = response.data;
            }).catch(()=>{});
        },

        getAuth() {
            SBAxios.get(`${this.API}/auth/me`).then((response) => {
                this.auth = response.data;
            });
        },

        widgetClicked(e) {
            let visibleDropdowns = this.$el.querySelectorAll('.snapturebox-show');
            if (visibleDropdowns.length > 0) {
                visibleDropdowns.forEach((vd) => {
                    vd.classList.remove('snapturebox-show');
                });
            }
            if (e.target.classList.contains('snapturebox-dropdown-toggle')) {
                let dropdown = e.target.parentNode.querySelector('.snapturebox-dropdown-menu');
                if (dropdown) {
                    dropdown.classList.add('snapturebox-show');
                }
            }
        },
    }
});


