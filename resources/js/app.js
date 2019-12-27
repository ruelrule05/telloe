require('./bootstrap');

window.Vue = require('vue');
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/tab';
import RecordRTC from 'recordrtc';
const feather = require('feather-icons');
//const html2canvas = require('html2canvas');
//const domtoimage = require('dom-to-image-improved');
const domtoimage = require('dom-to-image');
import { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon } from 'vue-feather-icons';


window.app = new Vue({
    components: { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon },
    el: '#app',
    data: {
        videoRecorder: null,
        streams: null,
        video: null,
        mouse: {
            x: 0,
            y: 0
        },
        pulses: [],
        isRecording: false,
        recorderStarted: false,

        hasImages: true,
        images: [
            '/images/file1.jpg',
            '/images/file2.jpg',
            '/images/file3.jpg',
            '/images/file4.jpg',
            '/images/file5.jpg',
        ],
        selectedImage: null,
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
        test() {
            alert('dsd');
        },

        removePulse(index) {
            this.pulses.splice(index, 1);
        },

        pulsingPoint(e) {
            if (this.isRecording) {
                let rect = e.target.getBoundingClientRect();
                this.pulses.push({
                    top: (e.clientY - rect.top) + 'px',
                    left: (e.clientX - rect.left) + 'px',
                });
            }
        },

        imagesHover(e) {
            let rect = e.target.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        },

        recordCanvas(canvasOutput) {
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

        startRecord() {
            this.isRecording = true;
            let canvasOutput = document.getElementById('canvas-output');
            let canvasOutputCtx = canvasOutput.getContext('2d');

            let canvasPlaceholder = document.getElementById('canvas-placeholder');
            let canvasCtx = canvasPlaceholder.getContext('2d');

            canvasOutput.width = canvasPlaceholder.width = $('#toRecord').width();
            canvasOutput.height = canvasPlaceholder.height = $('#toRecord').height();

            let $this = this;

            // Video
            let video = this.video;
            (function loopVideo() {
                if ($this.isRecording) {
                    if (!video.paused && !video.ended) {
                        if ($this.hasImages) {
                            canvasCtx.drawImage(video, canvasPlaceholder.width / 2, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                        } else {
                            canvasCtx.fillStyle = "black";
                            canvasCtx.fillRect(0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                            canvasCtx.drawImage(video, canvasPlaceholder.width / 4, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                        }
                        canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                        setTimeout(loopVideo, 1);
                    }
                }
            })();

            // Images
            let images = document.getElementById('images');
            let cursor = new Image();
            cursor.src = '/images/mouse.png';
            (function loopImages(test) {
                if ($this.isRecording) {
                    domtoimage.toJpeg(images).then(dataUrl => {
                        if ($this.hasImages) {
                            let img = new Image();
                            img.src = dataUrl;
                            img.onload = () => {
                                let newCanvas = document.createElement('canvas');
                                let newCanvasCtx = newCanvas.getContext('2d');
                                newCanvas.width = img.width;
                                newCanvas.height = img.height;
                                newCanvasCtx.drawImage(img, 0, 0, img.width, img.height);

                                if ($this.mouse.x > -1 && $this.mouse.y > -1) {
                                    newCanvasCtx.drawImage(cursor, $this.mouse.x, $this.mouse.y, 20, 20);
                                }

                                canvasCtx.clearRect(0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                                canvasCtx.drawImage(newCanvas, 0, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                                canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                                if (!$this.recorderStarted) {
                                    $this.recorderStarted = true;
                                    $this.recordCanvas(canvasOutput);
                                }
                                setTimeout(loopImages, 1);
                            }
                        } else {
                            setTimeout(loopImages, 1);
                        }
                    });
                }

                /*html2canvas(images, {
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

                });*/

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
        },
        

        stopRecord() {
            this.isRecording = false;
            this.videoRecorder.stopRecording( (videoBlob) => {
                this.recorderStarted = false;
                //window.open(videoBlob);
                var url = videoBlob;
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.download = 'record.webm';
                a.click();
                window.URL.revokeObjectURL(url);
            });
        },
    }
});


