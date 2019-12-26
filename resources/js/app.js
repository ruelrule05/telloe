require('./bootstrap');

window.Vue = require('vue');
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/tab';
import RecordRTC from 'recordrtc';
const feather = require('feather-icons');
//const html2canvas = require('html2canvas');


window.app = new Vue({
    el: '#app',
    data: {
        videoRecorder: null,
        streams: null,
        video: null,
        mouse: {
            x: 0,
            y: 0
        }
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
        imagesHover(e) {
            var rect = e.target.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        },


        startRecord() {
            let canvasOutput = document.getElementById('canvas-output');
            let canvasOutputCtx = canvasOutput.getContext('2d');

            let canvasPlaceholder = document.getElementById('canvas-placeholder');
            let canvasCtx = canvasPlaceholder.getContext('2d');

            canvasOutput.width = canvasPlaceholder.width = $('#toRecord').width();
            canvasOutput.height = canvasPlaceholder.height = $('#toRecord').height();

            // Video
            let video = this.video;
            (function loopVideo() {
                if (!video.paused && !video.ended) {
                    canvasCtx.drawImage(video, canvasPlaceholder.width / 2, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                    canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                    setTimeout(loopVideo, 1);
                }
            })();

            // Images
            let images = document.getElementById('images');
            let $this = this;
            let cursor = new Image();
            cursor.src = '/images/mouse.png';
            (function loopImages(test) {
                html2canvas(images, {
                    grabMouse: false,
                    onrendered: (canvas) => {
                        if ($this.mouse.x > -1 && $this.mouse.y > -1) {
                            let newCanvasCtx = canvas.getContext('2d');
                            newCanvasCtx.drawImage(cursor, $this.mouse.x, $this.mouse.y, 20, 20);
                        }

                        canvasCtx.clearRect(0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                        canvasCtx.drawImage(canvas, 0, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                        canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                        setTimeout(loopImages, 1);
                    }

                });

                /*html2canvas(images, {
                    allowTaint: true,
                    scale: 6,
                }).then(canvas => {
                    if ($this.mouse.x > -1 && $this.mouse.y > -1) {
                        let newCanvasCtx = canvas.getContext('2d');
                        newCanvasCtx.drawImage(cursor, $this.mouse.x + 70, $this.mouse.y + 70, 20, 20);
                    }

                    canvasCtx.clearRect(0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                    canvasCtx.drawImage(canvas, 0, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                    canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                    setTimeout(loopImages, 1);
                });*/
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
                /*var url = videoBlob;
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.download = 'test.webm';
                a.click();
                window.URL.revokeObjectURL(url);*/
            });
        },
    }
});


