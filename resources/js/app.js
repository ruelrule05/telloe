require('./bootstrap');

window.Vue = require('vue');
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/tab';
import RecordRTC from 'recordrtc';
const feather = require('feather-icons');

window.app = new Vue({
    el: '#app',
    data: {
        videoRecorder: null,
        streams: null,
        video: null,
    },


    mounted() {
        feather.replace();
        this.video = document.querySelector('#videoFile');

        $('#recordVideoModal').on('shown.bs.modal', (e) => {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                this.streams = streams;
                this.video.muted = true;
                this.video.volume = 0;
                this.video.srcObject = new MediaStream(this.streams.getVideoTracks());
                this.video.play();
            }).catch(function(error) {
                alert('Unable to capture your camera.');
                console.error(error);
            });

        });

        $('#recordVideoModal').on('hidden.bs.modal', (e) => {
            this.streams.getTracks().forEach(function(track) {
              track.stop();
            });
            this.videoRecorder = this.streams = null;
        });

    },

    created() {
    },

    watch: {
    },

    methods: {
        startRecord() {
            let canvasOutput = document.getElementById('canvas-output');
            let canvasCtx = canvasOutput.getContext('2d');
            canvasOutput.width = $('#toRecord').width();
            canvasOutput.height = $('#toRecord').height();

            // Video
            let video = this.video;
            (function loop() {
                if (!video.paused && !video.ended) {
                    canvasCtx.drawImage(video, canvasOutput.width / 2, 0, canvasOutput.width / 2, canvasOutput.height);
                    setTimeout(loop, 1);
                }
            })();

            // Images
            let images = document.getElementById('images');
            (function loop() {
                html2canvas(images, {
                    grabMouse: true,
                    onrendered: (canvas) => {
                        canvasCtx.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
                        canvasCtx.drawImage(canvas, 0, 0, canvasOutput.width / 2, canvasOutput.height);
                        setTimeout(loop, 60);
                    }
                });
            })();

            let finalStream = new MediaStream();

            let audioStream = new MediaStream(this.streams.getAudioTracks());
            audioStream.getTracks('audio').forEach(function(track) {
                finalStream.addTrack(track);
            });
            canvasOutput.captureStream().getTracks('video').forEach(function(track) {
                finalStream.addTrack(track);
            });

            this.videoRecorder = RecordRTC(finalStream, {
                type: 'video',
            });
            this.videoRecorder.startRecording();
        },
        

        stopRecord() {
            this.videoRecorder.stopRecording( (videoBlob) => {
                window.open(videoBlob);
            });
        },
    }
});


