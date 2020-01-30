<template>
    <div class="modal fade video-recorder-modal" tabindex="-1" role="dialog" aria-hidden="true" ref="modal" id="videoRecorder">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-zoom" role="document">
            <div class="modal-content overflow-hidden">
                <div class="position-relative bg-dark modal-body p-0 overflow-hidden">

                    <!-- Spinner -->
                    <div class="position-absolute-center w-100 h-100 bg-dark z-index-1" v-if="!cameraReady">
                        <div class="position-absolute-center text-center">
                            <div class="spinner-border text-primary" role="status"></div>
                            <div class="text-white mt-3">Loading camera..</div>
                        </div>
                    </div>
                    <!-- End Spinner -->

                    <div class="d-flex flex-column h-100">
                        <div class="position-relative z-index-0 h-100" :hidden="videoOutput || !cameraReady">
                            <div class="d-flex align-items-middle h-100" id="toRecord">
                                <div class="w-50 position-relative overflow-hidden" :hidden="!hasImages" @mousemove="imagesHover">
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
                                                <image-to-canvas class="image-selected position-absolute-center w-100" :src="selectedImage.media"></image-to-canvas>
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
                                    <div class="p-1 bg-white-75 shared-files" :class="{'shared-files-open': sharedFilesOpen}">
                                        <div class="pl-1 cursor-pointer d-flex align-items-center" @click="sharedFilesOpen = sharedFilesOpen ? false : true">Shared Files <i data-feather="chevron-up" class="chevron-arrow" style="height: 20px"></i></div>
                                        <div class="overflow-auto text-nowrap w-100" style="font-size: 0">
                                            <div v-for="file in files" class="p-1 d-inline-block" style="width: 90px">
                                                <div class="position-relative bg-black rounded shadow-sm overflow-hidden cursor-pointer" style="padding-top: 100%" @click="selectedImage = file; pulses = []; clearSvg(); sharedFilesOpen = false;">
                                                    <image-to-canvas class="position-absolute-center w-100" :src="file.preview" @click="selectedImage = file"></image-to-canvas>
                                                    <play-icon class="position-absolute-center text-white" v-if="file.type == 'video'"></play-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End Shared Files -->
                                </div>

                                <div class="bg-black text-center h-100" :class="[hasImages ? 'w-50' : 'w-100']">
                                    <button v-if="!hasImages" style="top: 10px; left: 10px; z-index: 10" class="position-absolute btn bg-white" @click="hasImages = true">Browse Shared Files</button>
                                    <video ref="videoFile" class="h-100" :class="[hasImages ? 'w-100' : 'w-50']"></video>
                                </div>
                            </div>

                            <canvas id="canvas-placeholder" hidden></canvas> 
                            <canvas id="canvas-output" hidden></canvas> 
                            
                        </div>

                         <video :hidden="!videoOutput" ref="videoOutput" class="w-100" style="outline: 0" playsinline controls preload></video>

                        <!-- Footer -->
                         <div v-if="cameraReady" class="d-flex justify-content-between p-2">
                            <button type="button" class="btn btn-link shadow-none text-white" data-dismiss="modal">Cancel</button>

                            <div>
                                <button class="btn btn-success btn-lg badge-pill" :disabled="currentTime >= limit" @click="startRecord" :hidden="isRecording" data-toggle="tooltip" data-title="Start Record">
                                    <video-icon></video-icon>
                                </button>
                                <button class="btn btn-red btn-danger btn-lg badge-pill" @click="pauseRecord" :hidden="!isRecording" data-toggle="tooltip" data-title="Pause Recording">
                                    <pause-icon></pause-icon>
                                </button>
                                <button class="btn btn-success btn-lg badge-pill" @click="finishRecord" :hidden="!hasRecorded || isRecording" data-toggle="tooltip" data-title="Finish Recording">
                                    <check-icon></check-icon>
                                </button>
                                <span class="text-white">{{ format(limit - currentTime, { leading: true }) }}</span>
                            </div>

                            <button type="button" class="btn btn-primary" data-dismiss="modal" :disabled="!videoOutput" @click="submit">Send</button>
                        </div>
                        <!-- End Footer -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const feather = require('feather-icons');
const domtoimage = require('dom-to-image');
const format = require('format-duration');
import RecordRTC from 'recordrtc';
import VideoIcon from 'vue-feather-icons/icons/VideoIcon';
import PauseIcon from 'vue-feather-icons/icons/PauseIcon';
import CheckIcon from 'vue-feather-icons/icons/CheckIcon';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';
import ApertureIcon from 'vue-feather-icons/icons/ApertureIcon';
import PenToolIcon from 'vue-feather-icons/icons/PenToolIcon';
import CircleIcon from 'vue-feather-icons/icons/CircleIcon';
import XIcon from 'vue-feather-icons/icons/XIcon';
import SvgDraw from '../components/svg-draw.vue';
export default {
    components: {
        VideoIcon,
        PauseIcon,
        CheckIcon,
        PlayIcon,
        ApertureIcon,
        PenToolIcon,
        CircleIcon,
        XIcon,
        SvgDraw,
    },

    props: {
        files: {
            type: Array,
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
        limit: 3000 // 30 seconds
    }),

    created() {
        if (this.files.length > 0) this.selectedImage = this.files[0]
    },

    mounted() {
        feather.replace();
        this.finalStream = new MediaStream();
        this.DOMImages = document.getElementById('images');
        this.cursor = new Image();
        this.cursor.src = '/images/mouse.png';
        $(this.$refs['modal']).on('shown.bs.modal', (e) => {
            this.initCamera();
        });
        $(this.$refs['modal']).on('hidden.bs.modal', (e) => {
            this.closeCamera();
        });
    },

    methods: {
        submit() {
            this.$emit('submit', this.video);
        },

        initCamera() {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                this.videoRecorder = RecordRTC(this.finalStream, {
                    type: 'video',
                });
                this.streams = streams;
                this.$refs['videoFile'].muted = true;
                this.$refs['videoFile'].volume = 0;
                this.$refs['videoFile'].srcObject = new MediaStream(this.streams.getVideoTracks());
                this.$refs['videoFile'].play();
                this.$refs['videoFile'].onplaying = () => {
                    this.cameraReady = true;
                }
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
                let video = $this.$refs['videoFile'];
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