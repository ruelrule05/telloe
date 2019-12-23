require('./bootstrap');

window.Vue = require('vue');
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/tab';
import video_css from 'video.js/dist/video-js.min.css';
import videojs from 'video.js';
import 'webrtc-adapter';
import RecordRTC from 'recordrtc';
import record_css from 'videojs-record/dist/css/videojs.record.css';
import record from 'videojs-record/dist/videojs.record.js';


const feather = require('feather-icons');
const DetectRTC = require('detectrtc');
const html2canvas = require('html2canvas');
const recordrtc = require('recordrtc');


window.app = new Vue({
    el: '#app',
    data: {
        videoRecorder: null,
    },


    mounted() {
    	feather.replace();
        $('#recordVideoModal').on('shown.bs.modal', (e) => {
            this.videoRecorder = videojs('videoFile', {
                controls: true,
                width: 400,
                height: 400,
                controlBar: {
                    fullscreenToggle: false,
                },
                plugins: {
                    record: {
                        audio: true,
                        video: true,
                        maxLength: 15,
                        debug: false,
                    }
                }
            });

            this.videoRecorder.on('deviceError', () => {
                console.warn('device error:', this.videoRecorder.deviceErrorCode);
            });

            this.videoRecorder.on('error', function(error) {
                console.log('error:', error);
            });

            this.videoRecorder.on('finishRecord', () => {
                this.$emit('finish-record', this.videoRecorder.recordedData);
            });

            this.videoRecorder.record().getDevice();

            this.testRecord();
        });

        $('#recordVideoModal').on('hidden.bs.modal', (e) => {
            //this.videoRecorder.record().reset();
        });
    },

    created() {
    },

    watch: {
    },

    methods: {
        testRecord() {
        }
    }
});