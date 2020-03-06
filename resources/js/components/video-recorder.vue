<template>
    <div id="video-recorder" class="bg-light overflow-auto border-left position-relative">
        <close-icon v-if="!isRecording" class="position-absolute cursor-pointer" fill="white" @click.native="closeCamera(); $emit('hide');"></close-icon>
        <div id="video-viewer" class="position-relative bg-black">
            <!-- Spinner -->
            <div class="position-absolute-center text-center" v-if="!cameraReady">
                <div class="spinner-border text-primary" role="status"></div>
                <div class="text-white mt-3">Loading camera..</div>
            </div>
            <!-- End Spinner -->


            <div class="d-flex flex-column h-100">
                <div class="position-relative z-index-0 h-100" :hidden="videoOutput || !cameraReady">
                    <div class="h-100" id="toRecord">
                        <div class="position-relative overflow-hidden h-100" @mousemove="imagesHover">
                            <div v-if="isRecording" class="position-absolute" style="top: 20px; left: 20px; z-index: 2">
                                <button @click="drawTool = 'circle'" class="btn-sm btn p-1 line-height-0 badge-pill shadow-sm" :class="[drawTool == 'circle' ? 'btn-danger text-white' : 'btn-white']"><circle-icon size="1x"></circle-icon></button>
                                <div>
                                    <button @click="drawTool = 'brush'" class="mt-2 btn btn-sm p-1 line-height-0 badge-pill shadow-sm" :class="[drawTool == 'brush' ? 'btn-danger text-white' : 'btn-white']"><pencil-circle-icon width="16" height="16"></pencil-circle-icon></button>
                                </div>
                            </div>
                            
                            <div v-if="selectedImage.type == 'video'" class="position-absolute" style="top: 10px; right: 10px; z-index: 2">
                                <button v-if="!selectedVideoFrame" @click.stop="snapVideo" class="btn btn-danger btn-sm d-flex align-items-center shadow-sm badge-pill py-1 px-2">Snap this frame</button>
                                <button v-else @click.stop="selectedVideoFrame = null; continueVideo(); pulses = []; clearSvg()" class="btn btn-danger btn-sm d-flex align-items-center shadow-sm badge-pill py-1 px-2">Unsnap frame</button>
                            </div>

                            <div id="images" class="w-100 h-100">
                                <div class="pulsating-circle" v-for="pulse, index in pulses" @click="removePulse(index)" :style="{top: pulse.top, left: pulse.left}"></div>
                                <div class="h-100 position-relative"    
                                        @mousedown="mouseEvent"
                                        @mousemove="mouseEvent"
                                        @mouseup="mouseEvent"
                                        @mouseleave="mousemove = false">
                                    <div v-if="selectedImage.type == 'image' || selectedImage.type == 'sample'" class="position-relative h-100">
                                        <image-to-canvas class="image-selected position-absolute-center w-100 bg-black" :src="selectedImage.media"></image-to-canvas>
                                    </div>

                                    <div v-else-if="selectedImage.type == 'video'" class="h-100 bg-black">
                                        <div :hidden="selectedVideoFrame" class="h-100">
                                            <video ref="selectedVideo" playsinline controls controlsList="nofullscreen nodownload noremoteplayback" class="w-100 h-100 outline-0" :src="selectedImage.media" @loadedmetadata="loadedmetadata"></video>
                                        </div>
                                        <div :hidden="!selectedVideoFrame" class="h-100">
                                            <div class="h-100 position-relative">
                                                <canvas ref="selectedVideoFrame" class="w-100 position-absolute-center" style="z-index: 0"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <svg-draw ref="svgDraw" :hidden="selectedImage.type == 'video' && !selectedVideoFrame" :disabled="drawTool != 'brush' || !isRecording"></svg-draw>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="cameraPreviewWrapper" class="position-absolute" :class="{'cameraPreviewWrapper-full': cameraFull}">
                        <collapse-icon v-if="cameraFull" fill="white" width="20" class="cursor-pointer" @click.native="cameraFull = false"></collapse-icon>
                        <expand-alt-icon v-else fill="white" width="20" class="cursor-pointer" @click.native="cameraFull = true"></expand-alt-icon>
                        <div class="position-relative overflow-hidden bg-black" :class="{'w-100 h-100': cameraFull, 'rounded-circle' : !cameraFull}">
                            <video ref="cameraPreview" class="h-100 position-absolute-center"></video>
                        </div>
                    </div>
                    <canvas id="canvas-placeholder" hidden></canvas> 
                    <canvas id="canvas-output" hidden></canvas> 
                </div>
                
                <!-- Video output -->
                <div id="videoOutput" class="hover-opacity-1" :hidden="!videoOutput">
                    <div class="position-absolute-center opacity-0">
                        <button class="btn btn-light badge-pill btn-sm" @click="resetRecorder()">Cancel</button>
                        <button class="btn btn-primary ml-2 badge-pill btn-sm" @click="submit()">Send</button>
                    </div>
                    <video ref="videoOutput" class="w-100" style="outline: 0" playsinline controls preload></video>
                </div>

                <!-- Controls -->
                <div id="recorderControls" class="position-absolute w-100 text-center" v-if="cameraReady">
                    <button v-tooltip.top="'Start record'" class="btn btn-danger btn-lg badge-pill line-height-1 px-2" :disabled="currentTime >= limit" @click="startRecord" :hidden="isRecording">
                        <video-icon fill="white"></video-icon>
                    </button>
                    <button v-tooltip.top="'Pause recording'" class="btn btn-danger btn-lg badge-pill line-height-1 px-2" @click="pauseRecord" :hidden="!isRecording">
                        <pause-alt-icon fill="white"></pause-alt-icon>
                    </button>
                    <button v-tooltip.top="'Finish recording'" class="btn btn-primary btn-lg badge-pill line-height-1 px-2" @click="finishRecord" :hidden="!hasRecorded || isRecording">
                        <checkmark-icon fill="white"></checkmark-icon>
                    </button>
                    <span class="text-white">{{ format(limit - currentTime, { leading: true }) }}</span>
                </div>

                    <!-- <button type="button" class="btn btn-primary" data-dismiss="modal" :disabled="!videoOutput" @click="submit">Send</button> -->
                <!-- End Footer -->
            </div>

            <div class="p-4">
                <h5>{{ inquiry.user.full_name }}</h5>
                <div class="text-center">
                    <button class="btn border-bottom-primary pb-2 px-4 shadow-none" :class="{'active': activeTab == 'photos'}" @click="activeTab = 'photos'">Photos</button>
                    <button class="btn border-bottom-primary pb-2 px-4 shadow-none" :class="{'active': activeTab == 'files'}" @click="activeTab = 'files'">Client Files</button>
                </div>


                <!-- Shared Files -->
                <div class="p-1 bg-white-7 mt-4" v-if="activeTab == 'photos'">
                    <div class="overflow-auto text-nowrap w-100">
                        <div v-for="file in inquiry.inquiry_media" class="p-1 d-inline-block" style="width: 90px">
                            <div class="position-relative bg-black rounded shadow-sm overflow-hidden cursor-pointer" style="padding-top: 100%" @click="selectedImage = file; pulses = []; clearSvg();">
                                <image-to-canvas class="position-absolute-center w-100" :src="file.preview" @click="selectedImage = file"></image-to-canvas>
                                <play-icon class="position-absolute-center text-white" v-if="file.type == 'video'"></play-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Shared Files -->
            </div>
        </div>
    </div>
</template>

<script>
import Timer from 'tiny-timer/dist/tiny-timer.js';
const timer = new Timer();
const feather = require('feather-icons');
const domtoimage = require('dom-to-image');
const format = require('format-duration');
import RecordRTC from 'recordrtc';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';
import ApertureIcon from 'vue-feather-icons/icons/ApertureIcon';
import CircleIcon from 'vue-feather-icons/icons/CircleIcon';
import XIcon from 'vue-feather-icons/icons/XIcon';
import SvgDraw from '../components/svg-draw.vue';
import ExpandAltIcon from '../icons/expand-alt';
import CollapseIcon from '../icons/collapse';
import PauseAltIcon from '../icons/pause-alt';
import VideoIcon from '../icons/video';
import CheckmarkIcon from '../icons/checkmark';
import PencilCircleIcon from '../icons/pencil-circle';
import CloseIcon from '../icons/close';
import Tooltip from './../directives/tooltip.js';
export default {
    directives: {Tooltip},

    components: {
        VideoIcon,
        PlayIcon,
        ApertureIcon,
        PencilCircleIcon,
        CircleIcon,
        XIcon,
        SvgDraw,
        ExpandAltIcon,
        CollapseIcon,
        PauseAltIcon,
        CheckmarkIcon,
        CloseIcon,
    },

    props: {
        inquiry: {
            type: Object,
            default: [],
        }
    },

    data: () => ({
        cameraReady: false,
        videoOutput: null,
        selectedImage: {
            type: '',
            src: '',
        },
        hasImages: true,
        mouse: {
            x: 0,
            y: 0
        },
        pulses: [],
        isRecording: false,
        recorderStarted: false,
        hasRecorded: false,
        selectedVideoFrame: null,
        drawTool: null,
        video: {
            blob: null,
            preview: null
        },
        format: format,
        recordInterval: null,
        currentTime: 0,
        limit: 30000, // 30 seconds
        cameraFull: false,
        timer: timer,
        activeTab: 'photos',
    }),

    created() {
        if (this.inquiry.inquiry_media.length > 0) this.selectedImage = this.inquiry.inquiry_media[0]
    },

    mounted() {
        feather.replace();
        this.finalStream = new MediaStream();
        this.DOMImages = document.getElementById('images');
        this.cursor = new Image();
        this.cursor.src = '/images/mouse.png';
        this.selectedImage = this.inquiry.inquiry_media[1];

        /*this.timer.start(this.limit);
        this.timer.on('tick', (ms) => console.log(this.timer.status))
        this.timer.on('done', () => this.stopRecording());*/
    },

    methods: {
        updateCameraPreview() {
            this.cameraCtx.drawImage(this.$refs['cameraPreview'], 0, 0, 150, 150);
            setTimeout(() => {
                this.updateCameraPreview()
            }, 1000/60);
        },

        submit() {
            this.$emit('submit', this.video);
            this.resetRecorder();
            this.$emit('hide');
        },

        initCamera() {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                this.videoRecorder = RecordRTC(this.finalStream, {
                    type: 'video',
                });
                this.streams = streams;
                this.$refs['cameraPreview'].muted = true;
                this.$refs['cameraPreview'].volume = 0;
                this.$refs['cameraPreview'].srcObject = new MediaStream(this.streams.getVideoTracks());
                this.$refs['cameraPreview'].play();
                this.$refs['cameraPreview'].onplaying = () => {
                    this.cameraReady = true;
                };
            }).catch(function(error) {
                alert('Unable to capture your camera.');
                console.error(error);
            });
        },

        resetRecorder() {
           this.videoOutput = null; 
           this.hasRecorded = this.recorderStarted = false; 
           this.videoRecorder.reset();
           this.clearSvg();
           this.pulses = [];
        },

        closeCamera() {
            this.streams.getTracks().forEach(function(track) {
              track.stop();
            });
            this.videoRecorder = this.streams = this.videoOutput = null;
            this.hasRecorded = this.cameraReady = this.isRecording = false;
            this.pulses = [];
            this.clearSvg();
        },

        clearSvg() {
            this.$refs['svgDraw'].clearSvg();
        },

        continueVideo() {
            this.$refs['selectedVideo'].play();
        },

        snapVideo() {
            this.pulses = [];
            setTimeout(() => {
                let selectedVideo = this.$refs['selectedVideo'];
                selectedVideo.pause();
                let container = $('#images');
                let containerWidth = container.width();
                let containerHeight= container.height();
                let canvas = this.$refs['selectedVideoFrame'];
                canvas.width = containerWidth;
                canvas.height = containerHeight;
                let canvasCtx = canvas.getContext('2d');


                canvasCtx.drawImage(selectedVideo, 90, 0, (canvas.height/selectedVideo.videoHeight) * canvas.width - 3, canvas.height);
                console.log(canvas.width);
                console.log(selectedVideo.clientWidth);
                this.selectedVideoFrame = true;
            });
        },

        loadeddata(e) {
            setTimeout(() => {
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
              }
            } else {
                videoPlayer.currentTime = 0.1;
            }
        },

        removePulse(index) {
            this.pulses.splice(index, 1);
        },

        pulsingPoint(e) {
            if (this.isRecording && (this.selectedImage.type == 'image' || this.selectedImage.type == 'sample' || (this.selectedImage.type == 'video' && this.selectedVideoFrame)) && e.target.nodeName != 'path' && this.drawTool == 'circle') {
                let rect = e.currentTarget.getBoundingClientRect();
                this.pulses.push({
                    top: (e.clientY - rect.top) + 'px',
                    left: (e.clientX - rect.left) + 'px',
                });
            }
        },

        mouseEvent(e) {
            switch(e.type) {
                case 'mousedown' :
                    this.mousedown = true;
                    this.mouseup = false;
                    break;

                case 'mousemove' :
                    if (this.mousedown) {
                        this.mousemove = true;
                    } else {
                        this.mousemove = false;
                    }
                    this.mouseup = false;
                    break;

                case 'mouseup' :
                    if (!this.mousemove) {
                        this.pulsingPoint(e);
                    }
                    this.mouseup = true;
                    this.mousemove = false;
                    this.mousedown = false;
                    break;
            }
            return;
        },

        imagesHover(e) {
            let rect = e.currentTarget.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        },

        recordCanvas(canvasOutput) {
            if (!this.recorderStarted) {
                this.recorderStarted = true;
                let audioStream = new MediaStream(this.streams.getAudioTracks());
                audioStream.getTracks('audio').forEach((track) => {
                    this.finalStream.addTrack(track);
                });
                canvasOutput.captureStream().getTracks('video').forEach((track) => {
                    this.finalStream.addTrack(track);
                });
                this.videoRecorder.setRecordingDuration(this.limit).onRecordingStopped(() => {
                    this.pauseRecord();
                });
                this.videoRecorder.startRecording();
            }
        },

        loopRecordVideoCamera(canvasCtx, canvasOutputCtx, canvasOutput, canvasPlaceholder) {
            let $this = this;
            let video = this.$refs['cameraPreview'];
            (function loopVideo() {
                if ($this.isRecording) {
                    canvasCtx.save();
                    /*canvasCtx.fillStyle = "black";
                    canvasCtx.fillRect(0, 0, canvasPlaceholder.width, canvasPlaceholder.height);*/
                    if ($this.cameraFull) {
                        canvasCtx.drawImage(video, (canvasPlaceholder.width - video.offsetWidth) / 2, 0, (canvasPlaceholder.height/video.videoHeight) * canvasPlaceholder.width, canvasPlaceholder.height);
                    } else {
                        canvasCtx.beginPath();
                        canvasCtx.arc(60, canvasPlaceholder.height - 60, 50, 0, 6.28, false); //draw the circle
                        canvasCtx.clip(); //call the clip method so the next render is clipped in last path
                        canvasCtx.closePath();
                        canvasCtx.drawImage(video, -5, canvasPlaceholder.height - 108, video.offsetWidth, video.offsetHeight);
                    }
                    canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                    canvasCtx.restore();
                }
                requestAnimationFrame(loopVideo);
            })();
        },

        loopRecordImages(canvasCtx, canvasOutputCtx, canvasOutput, canvasPlaceholder) {
            let $this = this;
            let images = document.getElementById('images');
            let cursor = new Image();
            cursor.src = '/images/mouse.png';

            (function loopImages() {
                if ($this.isRecording) {
                    if (!$this.cameraFull) {
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
                                canvasCtx.drawImage(newCanvas, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                                canvasOutputCtx.drawImage(canvasPlaceholder, 0, 0, canvasPlaceholder.width, canvasPlaceholder.height);
                                $this.recordCanvas(canvasOutput);
                                setTimeout(loopImages, 1);
                            }
                        });
                    } else {
                        $this.recordCanvas(canvasOutput);
                        setTimeout(loopImages, 1);
                    }
                }
            })();
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

                this.loopRecordVideoCamera(canvasCtx, canvasOutputCtx, canvasOutput, canvasPlaceholder);
                this.loopRecordImages(canvasCtx, canvasOutputCtx, canvasOutput, canvasPlaceholder);
            }
        },

        finishRecord() {
            this.videoRecorder.stopRecording(() => {
                let videoBlob = this.videoRecorder.getBlob();
                this.video.blob = videoBlob;
                this.videoOutput = URL.createObjectURL(videoBlob);
                this.$refs['videoOutput'].src = this.videoOutput;
                this.$refs['videoOutput'].load();
                let $this = this;
                // generate thumbnail
                this.$refs['videoOutput'].onloadeddata = function() {
                    setTimeout(() => {
                        let canvas = document.createElement("canvas");
                        canvas.width = this.videoWidth / 2;
                        canvas.height = this.videoHeight / 2;
                        canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob((blob) => {
                            $this.video.preview = blob;
                        });
                   });
                };
                this.finalStream = new MediaStream();
                this.videoRecorder.reset();
                this.recorderStarted = this.isRecording = false;
            });
        },

        pauseRecord() {
            this.hasRecorded = true;
            this.isRecording = false;
            this.videoRecorder.pauseRecording();
        },
    },
};
</script>