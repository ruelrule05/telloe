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
import { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon, PlayIcon, PauseIcon, CheckIcon } from 'vue-feather-icons';

var format = require('format-duration');
window.app = new Vue({
    components: { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon, PlayIcon, PauseIcon, CheckIcon },
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
        files: [
            {src: '/images/file1.jpg', type: 'image', preview: '/images/file1.jpg'},
            {src: '/images/file2.jpg', type: 'image', preview: '/images/file2.jpg'},
            {src: '/images/file3.jpg', type: 'image', preview: '/images/file3.jpg'},
            {src: '/images/file4.jpg', type: 'image', preview: '/images/file4.jpg'},
            {src: '/images/video.webm', type: 'video', preview: '/images/video.png'},
        ],
        selectedImage: null,
        videoOutput: null,
        videoPreview: null,
        videoSent: false,
        hasRecorded: false,
        selectedVideo: {
            duration: 0,
            formatDuration: 0,
            currentTime: '0:00',
        },
        finalStream: null,
    },


    mounted() {
        feather.replace();
        this.finalStream = new MediaStream();
        this.videoRecorder = RecordRTC(this.finalStream, {
            type: 'video',
        });
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
        setVideoCurrentTime(e) {
            let selectedVideo = this.$refs['selectedVideo'];
            let currentTime = this.selectedVideo.duration * (e.target.value / 100);
            this.selectedVideo.currentTime = format(parseInt(currentTime) * 1000);
            selectedVideo.currentTime = currentTime;
            let canvas = this.$refs['selectedVideoFrame'];
            let canvasCtx = canvas.getContext('2d');
            canvasCtx.fillStyle = "black";
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            let hRatio = (canvas.width / selectedVideo.videoWidth) * selectedVideo.videoHeight;
            var y = hRatio * 0.5;
            canvasCtx.drawImage(selectedVideo, 0, y, canvas.width, hRatio);
        },

        loadeddata(e) {
            setTimeout(() => {
                let selectedVideo = this.$refs['selectedVideo'];
                let canvas = this.$refs['selectedVideoFrame'];
                canvas.width = selectedVideo.videoWidth / 2;
                canvas.height = selectedVideo.videoHeight;
                let canvasCtx = canvas.getContext('2d');
                let hRatio = (canvas.width / selectedVideo.videoWidth) * selectedVideo.videoHeight;
                var y = hRatio * 0.5;
                canvasCtx.drawImage(e.target, 0, y, canvas.width, hRatio);
            }, 200);
        },

        loadedmetadata(e) {
            let videoPlayer = e.target;
            let $this = this;
            if (videoPlayer.duration === Infinity) {
              videoPlayer.currentTime = 1e101;
              videoPlayer.ontimeupdate = function() {
                this.ontimeupdate = () => {
                  return;
                }
                videoPlayer.currentTime = 0.1;
                $this.selectedVideo.duration = videoPlayer.duration;
                $this.selectedVideo.formatDuration = format(parseInt(videoPlayer.duration) * 1000);
              }
            }
        },

        playVideo() {
            $('#videoPlayerModal').modal('show');
        },

        sendVideo() {
            this.videoSent = true;
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
            let rect = e.currentTarget.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        },

        recordCanvas(canvasOutput) {
            console.log('recordCanvas');
            let audioStream = new MediaStream(this.streams.getAudioTracks());
            audioStream.getTracks('audio').forEach((track) => {
                this.finalStream.addTrack(track);
            });
            canvasOutput.captureStream().getTracks('video').forEach((track) => {
                this.finalStream.addTrack(track);
            });
            this.videoRecorder.startRecording();
        },

        startRecord() {
            let $this = this;
            $this.isRecording = true;
            if ($this.videoRecorder.state === 'paused') {
                $this.videoRecorder.resumeRecording();
            } else {
                let canvasOutput = document.getElementById('canvas-output');
                let canvasOutputCtx = canvasOutput.getContext('2d');

                let canvasPlaceholder = document.getElementById('canvas-placeholder');
                let canvasCtx = canvasPlaceholder.getContext('2d');

                canvasOutput.width = canvasPlaceholder.width = $('#toRecord').width();
                canvasOutput.height = canvasPlaceholder.height = $('#toRecord').height();
                // Video
                let video = $this.video;
                (function loopVideo() {
                    if ($this.isRecording) {
                        if ($this.hasImages) {
                            canvasCtx.drawImage(video, canvasPlaceholder.width / 2, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                        } else {
                            canvasCtx.fillStyle = "black";
                            canvasCtx.fillRect(0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                            canvasCtx.drawImage(video, canvasPlaceholder.width / 4, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                        }
                        canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                    }
                    requestAnimationFrame(loopVideo);
                })();

                // Images
                let images = document.getElementById('images');
                let cursor = new Image();
                cursor.src = '/images/mouse.png';

                (function loopImages() {
                    if ($this.isRecording) {
                        if ($this.hasImages) {
                            domtoimage.toJpeg(images).then(dataUrl => {
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

                                    //canvasCtx.clearRect(0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                                    canvasCtx.drawImage(newCanvas, 0, 0, canvasPlaceholder.width / 2, canvasPlaceholder.height);
                                    canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                                    if (!$this.recorderStarted) {
                                        $this.recorderStarted = true;
                                        $this.recordCanvas(canvasOutput);
                                    }
                                    setTimeout(loopImages, 1);
                                }
                            });
                        }
                    } else {
                        setTimeout(loopImages, 1);
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
            }
        },
        
        finishRecord() {
            this.videoRecorder.stopRecording(() => {
                this.videoOutput = URL.createObjectURL(this.videoRecorder.getBlob());
                this.$refs['videoOutput'].src = this.videoOutput;
                let $this = this;
                // generate thumbnail
                this.$refs['videoOutput'].onloadeddata = function() {
                    setTimeout(() => {
                        let canvas = document.createElement("canvas");
                        canvas.width = this.videoWidth / 2;
                        canvas.height = this.videoHeight / 2;
                        canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
                        $this.videoPreview = canvas.toDataURL("image/jpeg", 0.8);
                    }, 500);
                };
                this.finalStream = new MediaStream();
                this.videoRecorder.reset();
                this.recorderStarted = false;
            });
        },

        pauseRecord() {
            this.hasRecorded = true;
            this.isRecording = false;
            this.videoRecorder.pauseRecording(blob => {
                console.log(blob);
            });
        },
    }
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

