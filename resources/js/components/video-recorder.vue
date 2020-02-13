<template>
    <div id="video-recorder" class="bg-light overflow-auto border-left position-relative">
        <close-icon class="position-absolute cursor-pointer" fill="white" @click.native="closeCamera(); $emit('hide');"></close-icon>
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
                            <div v-if="isRecording" class="position-absolute d-flex" style="top: 10px; left: 10px; z-index: 2">
                                <button @click="drawTool = 'brush'" class="btn btn-sm p-1 line-height-0 badge-pill shadow-sm" :class="[drawTool == 'brush' ? 'btn-danger text-white' : 'btn-white']"><pen-tool-icon size="1x"></pen-tool-icon></button>
                                <button @click="drawTool = 'circle'" class="ml-1 btn-sm btn p-1 line-height-0 badge-pill shadow-sm" :class="[drawTool == 'circle' ? 'btn-danger text-white' : 'btn-white']"><circle-icon size="1x"></circle-icon></button>
                            </div>
                            
                            <div v-if="selectedImage.type == 'video'" class="position-absolute" style="top: 10px; right: 10px; z-index: 2">
                                <button v-if="!selectedVideoFrame" @click.stop="snapVideo" class="btn btn-white d-flex align-items-center shadow-sm"><aperture-icon size="1x" class="mr-2"></aperture-icon>Snap this frame</button>
                                <button v-else @click.stop="selectedVideoFrame = null; continueVideo(); pulses = []; clearSvg()" class="btn btn-white d-flex align-items-center shadow-sm"><x-icon size="1x" class="mr-2"></x-icon>Unsnap frame</button>
                            </div>

                            <div id="images" class="w-100 h-100" @click="sharedFilesOpen = false">
                                <div class="pulsating-circle" v-for="pulse, index in pulses" @click="removePulse(index)" :style="{top: pulse.top, left: pulse.left}"></div>
                                <div class="h-100 position-relative"    
                                        @mousedown="mouseEvent"
                                        @mousemove="mouseEvent"
                                        @mouseup="mouseEvent"
                                        @mouseleave="mousemove = false">
                                    <div v-if="selectedImage.type == 'image'" class="position-relative h-100">
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

                            <!-- Shared Files -->
                            <!-- <div class="p-1 bg-white-75 shared-files" :class="{'shared-files-open': sharedFilesOpen}">
                                <div class="pl-1 cursor-pointer d-flex align-items-center" @click="sharedFilesOpen = sharedFilesOpen ? false : true">Shared Files <i data-feather="chevron-up" class="chevron-arrow" style="height: 20px"></i></div>
                                <div class="overflow-auto text-nowrap w-100" style="font-size: 0">
                                    <div v-for="file in files" class="p-1 d-inline-block" style="width: 90px">
                                        <div class="position-relative bg-black rounded shadow-sm overflow-hidden cursor-pointer" style="padding-top: 100%" @click="selectedImage = file; pulses = []; clearSvg(); sharedFilesOpen = false;">
                                            <image-to-canvas class="position-absolute-center w-100" :src="file.preview" @click="selectedImage = file"></image-to-canvas>
                                            <play-icon class="position-absolute-center text-white" v-if="file.type == 'video'"></play-icon>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <!-- End Shared Files -->
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

                 <video :hidden="!videoOutput" ref="videoOutput" class="w-100" style="outline: 0" playsinline controls preload></video>

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
                <h4>{{ inquiry.user.full_name }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
const feather = require('feather-icons');
const domtoimage = require('dom-to-image');
const format = require('format-duration');
import RecordRTC from 'recordrtc';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';
import ApertureIcon from 'vue-feather-icons/icons/ApertureIcon';
import PenToolIcon from 'vue-feather-icons/icons/PenToolIcon';
import CircleIcon from 'vue-feather-icons/icons/CircleIcon';
import XIcon from 'vue-feather-icons/icons/XIcon';
import SvgDraw from '../components/svg-draw.vue';
import ExpandAltIcon from '../icons/expand-alt';
import CollapseIcon from '../icons/collapse';
import PauseAltIcon from '../icons/pause-alt';
import VideoIcon from '../icons/video';
import CheckmarkIcon from '../icons/checkmark';
import CloseIcon from '../icons/close';
import Tooltip from './../directives/tooltip.js';
export default {
    directives: {Tooltip},

    components: {
        VideoIcon,
        PlayIcon,
        ApertureIcon,
        PenToolIcon,
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
        sharedFilesOpen: true,
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
        limit: 3000, // 30 seconds
        cameraFull: false,
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
        this.selectedImage = this.inquiry.inquiry_media[0];
       /*
        $(this.$refs['modal']).on('hidden.bs.modal', (e) => {
            this.closeCamera();
        });*/
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

            this.$refs['selectedVideo'].pause();
            let container = $('#images');
            let containerWidth = container.width();
            let containerHeight= container.height();
            let selectedVideo = this.$refs['selectedVideo'];
            let canvas = this.$refs['selectedVideoFrame'];
            canvas.width = containerWidth;
            canvas.height = (containerWidth / selectedVideo.videoWidth) * selectedVideo.videoHeight + 1;
            let canvasCtx = canvas.getContext('2d');
            canvasCtx.drawImage(selectedVideo, 0, 0, canvas.width, canvas.height);
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
            if (this.isRecording && (this.selectedImage.type == 'image' || (this.selectedImage.type == 'video' && this.selectedVideoFrame)) && e.target.nodeName != 'path' && this.drawTool == 'circle') {
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
            if (!this.recorderStarted && this.currentTime < this.limit) {
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
                this.videoRecorder.onTimeStamp((timestamp) => {
                    console.log(timestamp);
                });
                this.videoRecorder.startRecording();
            }
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
                let video = $this.$refs['cameraPreview'];
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
                                    $this.recordCanvas(canvasOutput);
                                    setTimeout(loopImages, 1);
                                }
                            });
                        } else {
                            $this.recordCanvas(canvasOutput);
                            setTimeout(loopImages, 1);
                        }
                    } else {
                        $this.recordCanvas(canvasOutput);
                        setTimeout(loopImages, 1);
                    }
                })();
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
                this.recorderStarted = false;
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