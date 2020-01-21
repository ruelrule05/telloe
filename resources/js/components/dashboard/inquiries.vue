<template>
	<div>
		<div class="modal fade" id="videoPlayerModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-zoom" role="document">
                <div class="modal-content">
                    <div>
                        <video ref="videoOutput" class="w-100" playsinline controls :src="videoOutput"></video>
                    </div>

                    <div class="modal-footer justify-content-between p-3">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="recordVideoModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-zoom" role="document">
                <div class="modal-content">
                    <div class="position-relative">
                        <div class="position-absolute-center w-100 h-100 bg-white" style="z-index: 10" v-if="!cameraReady">
                            <div class="position-absolute-center">
                                <div class="spinner-border text-primary" role="status"></div>
                            </div>
                        </div>
                        <div class="position-relative" :hidden="videoOutput">
                            <div class="d-flex align-items-middle" id="toRecord">
                                <div class="w-50 position-relative h-100 overflow-hidden" :hidden="!hasImages" @mousemove="imagesHover">

                                    <div v-if="isRecording" class="position-absolute d-flex" style="top: 10px; left: 10px; z-index: 2">
                                        <button @click="drawTool = 'brush'" class="btn p-1 badge-pill shadow-sm" :class="[drawTool == 'brush' ? 'btn-red text-white' : 'btn-white']"><pen-tool-icon size="5x"></pen-tool-icon></button>
                                        <button @click="drawTool = 'circle'" class="ml-1 btn p-1 badge-pill shadow-sm" :class="[drawTool == 'circle' ? 'btn-red text-white' : 'btn-white']"><circle-icon size="1x"></circle-icon></button>
                                    </div>
                                    <div v-if="selectedImage.type == 'video'" class="position-absolute" style="top: 10px; right: 10px; z-index: 2">
                                        <button v-if="!selectedVideoFrame" @click.stop="snapVideo" class="btn btn-white d-flex align-items-center shadow-sm"><aperture-icon size="1x" class="mr-2"></aperture-icon>Snap this frame</button>
                                        <button v-else @click.stop="selectedVideoFrame = null; continueVideo(); pulses = []; clearSvg()" class="btn btn-white d-flex align-items-center shadow-sm"><x-icon size="1x" class="mr-2"></x-icon>Unsnap frame</button>
                                    </div>

                                    <div id="images" class="w-100 h-100" @click="sharedFilesOpen = false" style="padding-bottom: 25px;">
                                        <div class="pulsating-circle" v-for="pulse, index in pulses" @click="removePulse(index)" :style="{top: pulse.top, left: pulse.left}"></div>
                                        <div class="h-100 position-relative"    
                                                @mousedown="mouseEvent"
                                                @mousemove="mouseEvent"
                                                @mouseup="mouseEvent"
                                                @mouseleave="mousemove = false">
                                            <!-- <button style="top: 10px; left: 10px; z-index: 2" class="position-absolute btn btn-circle bg-white shadow-sm" @click="selectedImage = null; pulses = []; selectedVideo.currentTime = '0:00'; clearSvg()"><arrow-left-icon></arrow-left-icon></button> -->

                                            <div v-if="selectedImage.type == 'image'" class="position-relative h-100">
                                                <image-to-canvas class="image-selected position-absolute-center w-100" :src="selectedImage.src"></image-to-canvas>
                                            </div>

                                            <div v-else-if="selectedImage.type == 'video'" class="h-100 bg-black">
                                                <div :hidden="selectedVideoFrame" class="h-100">
                                                    <video ref="selectedVideo" playsinline controls controlsList="nofullscreen nodownload noremoteplayback" class="w-100 h-100 outline-0" :src="selectedImage.src" @loadedmetadata="loadedmetadata"></video>
                                                </div>
                                                <div :hidden="!selectedVideoFrame" class="h-100">
                                                    <div class="h-100 position-relative">
                                                        <canvas ref="selectedVideoFrame" class="w-100 position-absolute-center" style="z-index: 0"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            <svg :hidden="selectedImage.type == 'video' && !selectedVideoFrame" xmlns="http://www.w3.org/2000/svg" ref="drawSvg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="svgElement" x="0px" y="0px" class="w-100 h-100 position-absolute" style="z-index: 1; top: 0; left: 0" enable-background="new 0 0 600 400" xml:space="preserve" />
                                        </div>
                                    </div>


                                    <div class="p-1 bg-light shared-files" :class="{'shared-files-open': sharedFilesOpen}">
                                        <div class="pl-1 cursor-pointer d-flex align-items-center"  @click="sharedFilesOpen = sharedFilesOpen ? false : true">Shared Files <i data-feather="chevron-up" class="chevron-arrow" style="height: 20px"></i></div>
                                        <div class="overflow-auto text-nowrap w-100" style="font-size: 0">
                                            <div v-for="file in files" class="p-1 d-inline-block" style="width: 90px">
                                                <div class="position-relative bg-black rounded cursor-pointer" style="padding-top: 100%" @click="selectedImage = file; pulses = []; clearSvg(); sharedFilesOpen = false;">
                                                    <image-to-canvas class="image-preview position-absolute-center w-100" :src="file.preview" @click="selectedImage = file"></image-to-canvas>
                                                    <play-icon class="position-absolute-center text-white" v-if="file.type == 'video'"></play-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-black text-center h-100" :class="[hasImages ? 'w-50' : 'w-100']">
                                    <button v-if="!hasImages" style="top: 10px; left: 10px; z-index: 10" class="position-absolute btn bg-white" @click="hasImages = true">Browse Shared Files</button>
                                    <video id="videoFile" class="h-100" :class="[hasImages ? 'w-100' : 'w-50']"></video>
                                </div>
                            </div>

                            <canvas id="canvas-placeholder" hidden></canvas> 
                            <canvas id="canvas-output" hidden></canvas> 

                            <div class="position-absolute text-center w-auto" id="recorder-controls">
                                <button class="btn btn-success btn-lg" @click="startRecord" :hidden="isRecording" data-toggle="tooltip" data-title="Start Record">
                                    <video-icon></video-icon>
                                </button>
                                <button class="btn btn-red btn-danger btn-lg" @click="pauseRecord" :hidden="!isRecording" data-toggle="tooltip" data-title="Pause Recording">
                                    <pause-icon></pause-icon>
                                </button>
                                <button class="btn btn-success btn-lg" @click="finishRecord" :hidden="!hasRecorded || isRecording" data-toggle="tooltip" data-title="Finish Recording">
                                    <check-icon></check-icon>
                                </button>
                            </div>
                        </div>

                        <div :hidden="!videoOutput">
                            <video ref="videoOutput" class="w-100" style="outline: 0" playsinline controls></video>
                        </div>
                    </div>


                    <div class="modal-footer justify-content-between px-2 pt-0 pb-1">
                        <button type="button" class="btn" data-dismiss="modal" aria-label="Close">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" :disabled="!videoOutput" @click="newMessage.type = 'video'; send();">Send</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>


<script>
	const feather = require('feather-icons');
	import io from 'socket.io-client';
	const domtoimage = require('dom-to-image');

	export default {
		data: () => ({
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
	        files: [],
	        selectedImage: null,
	        videoOutput: null,
	        videoPreview: null,
	        hasRecorded: false,
	        selectedVideo: {
	            duration: 0,
	            formatDuration: 0,
	            currentTime: '0:00',
	        },
	        finalStream: null,
	        selectedVideoFrame: null,
	        cameraReady: false,
	        DOMImages: null,
	        cursor: null,
	        mousedown: false,
	        mousemove: false,
	        mouseup: false,
	        canDraw: false,
	        sharedFilesOpen: true,
	        drawTool: null,
	        messages: [],
	        newMessage: {
	            inquiry_id: 1,
	            message: '',
	            type: 'text',
	            sender: 'You',
	        },
	        socket: null,
	        notification_sound: null
	    }),

	    computed: {
	        grouped_messages() {
	            const grouped_messages = [];
	            if (this.messages) {
	                // sort messages by timestamp
	                const messages = (this.messages || []).sort((a, b) => {
	                    return (parseInt(a.timestamp) > parseInt(b.timestamp)) ? 1 : -1;
	                });

	                for (var i = 0; i <= messages.length - 1; i++) {
	                    var message_group = { sender: messages[i].sender, messages: [messages[i]] };
	                    groupMessage();

	                    function groupMessage() {
	                        const next_message = messages[i + 1];
	                        if (next_message && next_message.sender == messages[i].sender) {
	                            message_group.messages.push(messages[i + 1]);
	                            i++;
	                            groupMessage();
	                        }
	                    }
	                    grouped_messages.push(message_group);
	                }
	            }

	            return grouped_messages;
	        },
	    },

	    mounted() {
	        feather.replace();
	        this.finalStream = new MediaStream();
	        this.video = document.querySelector('#videoFile');
	        this.DOMImages = document.getElementById('images');
	        this.cursor = new Image();
	        this.cursor.src = '/images/mouse.png';
	        this.svgDraw();
	    },

	    created() {
	        this.notification_sound = new Audio('/notifications/new_message.mp3');
	        this.selectedImage = this.files[0];

	        /*this.socket = io(window.location.hostname + ':8443');
	        this.socket.on('new_message', (data) => {
	            this.messages.push(data);
	            this.notification_sound.play();
	            this.scrollDown();
	        });*/
	        this.getMessages();
	    },

	    watch: {
	    },

	    methods: {
	        send() {
	            let data = new FormData();
	            Object.keys(this.newMessage).map((k) => {
	                data.append(k, this.newMessage[k]);
	            });

	            axios.post('/messages', data, {header : {'Content-Type' : 'multipart/form-data'}}).then((response) => {
	                this.messages.push(response.data);
	                this.newMessage.message = '';
	                this.newMessage.type = 'text';
	                this.newMessage.video = null;
	                this.newMessage.videoPreview = null;
	                this.socket.emit('message_sent', response.data);
	                this.scrollDown();
	            });
	        },

	        scrollDown() {
	            setTimeout(() => {
	                const message_group = this.$refs['message-group'];
	                if (message_group) {
	                    message_group.scrollTop = message_group.scrollHeight;
	                }
	            });
	        },

	        getMessages() {
	            axios.get('/messages').then((response) => {
	                this.messages = response.data;
	                this.scrollDown();
	                console.log(this.grouped_messages);
	            });
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
	                $this.selectedVideo.duration = videoPlayer.duration;
	                $this.selectedVideo.formatDuration = format(parseInt(videoPlayer.duration) * 1000);
	              }
	            } else {
	                videoPlayer.currentTime = 0.1;
	                $this.selectedVideo.duration = videoPlayer.duration;
	                $this.selectedVideo.formatDuration = format(parseInt(videoPlayer.duration) * 1000);
	            }
	        },

	        playVideo(videoSrc) {
	            this.videoOutput = videoSrc;
	            $('#videoPlayerModal').modal('show');
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

	        clearSvg() {
	            $(this.$refs['drawSvg']).find('path').remove();
	        },

	        svgDraw() {
	            var strokeWidth = 3;
	            var bufferSize;

	            var svgElement = this.$refs['drawSvg'];
	            var path = null;
	            var strPath;
	            var buffer = []; // Contains the last positions of the mouse cursor

	            svgElement.addEventListener("mousedown", (e) => {
	                bufferSize = 4;
	                path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	                path.setAttribute("fill", "none");
	                path.setAttribute("stroke", "red");
	                path.setAttribute("stroke-width", strokeWidth);
	                buffer = [];
	                var pt = getMousePosition(e);
	                appendToBuffer(pt);
	                strPath = "M" + pt.x + " " + pt.y;
	                path.setAttribute("d", strPath);
	                svgElement.appendChild(path);
	            });

	            svgElement.addEventListener("mousemove", (e) => {
	                if (path && this.isRecording && (this.selectedImage.type == 'image' || (this.selectedImage.type == 'video' && this.selectedVideoFrame)) && this.drawTool == 'brush') {
	                //if (path) {
	                    appendToBuffer(getMousePosition(e));
	                    updateSvgPath();
	                }
	            });

	            svgElement.addEventListener("mouseup", () => {
	                if (path) {
	                    path = null;
	                }
	            });

	            var getMousePosition = function (e) {
	                var rect = e.currentTarget.getBoundingClientRect();
	                return {
	                    x: e.clientX - rect.left,
	                    y: e.clientY - rect.top
	                }
	            };

	            var appendToBuffer = function (pt) {
	                buffer.push(pt);
	                while (buffer.length > bufferSize) {
	                    buffer.shift();
	                }
	            };

	            // Calculate the average point, starting at offset in the buffer
	            var getAveragePoint = function (offset) {
	                var len = buffer.length;
	                if (len % 2 === 1 || len >= bufferSize) {
	                    var totalX = 0;
	                    var totalY = 0;
	                    var pt, i;
	                    var count = 0;
	                    for (i = offset; i < len; i++) {
	                        count++;
	                        pt = buffer[i];
	                        totalX += pt.x;
	                        totalY += pt.y;
	                    }
	                    return {
	                        x: totalX / count,
	                        y: totalY / count
	                    }
	                }
	                return null;
	            };

	            var updateSvgPath = function () {
	                var pt = getAveragePoint(0);

	                if (pt) {
	                    // Get the smoothed part of the path that will not change
	                    strPath += " L" + pt.x + " " + pt.y;

	                    // Get the last part of the path (close to the current mouse position)
	                    // This part will change if the mouse moves again
	                    var tmpPath = "";
	                    for (var offset = 2; offset < buffer.length; offset += 2) {
	                        pt = getAveragePoint(offset);
	                        tmpPath += " L" + pt.x + " " + pt.y;
	                    }

	                    // Set the complete current path coordinates
	                    path.setAttribute("d", strPath + tmpPath);
	                }
	            };

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
	                this.newMessage.video = videoBlob;
	                this.videoOutput = URL.createObjectURL(videoBlob);
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
	                        canvas.toBlob((blob) => {
	                            $this.newMessage.videoPreview = blob;
	                        });
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
	            this.videoRecorder.pauseRecording();
	        },
	    }
	}

	$(document).on('click', 'path', function(e){
	    if (!e.target.parentElement.classList.contains('feather')) {
	        e.target.remove();
	    }
	});
</script>