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
import { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon, PlayIcon, PauseIcon, CheckIcon, ApertureIcon, EditIcon, PenToolIcon } from 'vue-feather-icons';

var format = require('format-duration');
//const imageDataURI = require('image-data-uri');
import VueObserveVisibility from 'vue-observe-visibility';
import io from 'socket.io-client';
 
Vue.use(VueObserveVisibility)

$(document).on('click', 'path', function(e){
    if (!e.target.parentElement.classList.contains('feather')) {
        e.target.remove();
    }
});

Vue.component('image-to-canvas', require('./components/image-to-canvas.vue').default);
window.app = new Vue({
    components: { XIcon, ArrowLeftIcon, VideoIcon, CircleIcon, PlayIcon, PauseIcon, CheckIcon, ApertureIcon, EditIcon, PenToolIcon },
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
            {src: '/images/video1.webm', type: 'video', preview: '/images/video.png'},
        ],
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
    },

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
        this.videoRecorder = RecordRTC(this.finalStream, {
            type: 'video',
        });
        this.video = document.querySelector('#videoFile');
        this.DOMImages = document.getElementById('images');
        this.cursor = new Image();
        this.cursor.src = '/images/mouse.png';

        $('#recordVideoModal').on('shown.bs.modal', (e) => {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                this.streams = streams;
                this.video.muted = true;
                this.video.volume = 0;
                this.video.srcObject = new MediaStream(this.streams.getVideoTracks());
                this.video.play();
                this.video.onplaying = () => {
                    this.cameraReady = true;
                }
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
        this.svgDraw();
    },

    created() {
        this.notification_sound = new Audio('/notifications/new_message.mp3');
        this.selectedImage = this.files[0];

        this.socket = io(window.location.hostname + ':8443');
        this.socket.on('new_message', (data) => {
            this.messages.push(data);
            this.notification_sound.play();
            this.scrollDown();
        });
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
});
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})


