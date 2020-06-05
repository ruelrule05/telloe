require('./bootstrap');
window.Vue = require('vue');

import io from 'socket.io-client';
const mime = require('mime');
import dayjs from 'dayjs';
const format = require('format-duration');
import MultiStreamsMixer from 'multistreamsmixer';
import toggleFullscreen, {fullscreenChange, isFullscreen} from 'toggle-fullscreen';

import VideoIcon from '../icons/video';
import CloseIcon from '../icons/close';
import DuplicateAltIcon from '../icons/duplicate-alt';
import DownloadIcon from '../icons/download';
import ArrowRightIcon from '../icons/arrow-right';
import ExpandIcon from '../icons/expand';
import CollapseIcon from '../icons/collapse';
new Vue ({
    el: '#app',
    components: {VideoIcon, CloseIcon, DuplicateAltIcon, DownloadIcon, ArrowRightIcon, ExpandIcon, CollapseIcon},

    data: () => ({
        auth: AUTH,
        action: ACTION,
        caller: CALLER,
        callee: CALLEE,
        conversation: CONVERSATION,
        notification_sound: null,
        pc: null,
        status: '',
        localCameraReady: false,
        remoteCameraReady: false,
        isCalling: false,
        isAnswered: false,
        videoAnswer: null,
        callRecorder: null,
        recordedData: [],
        blobs: [],
        isRecording: false,
        videoSender: null,
        isScreenSharing: false,
        isFullScreen: false,
        isCalling: false,
        localStream: null,
        remoteStream: null,
        format: format,
        endedEvent: null
    }),

    created() {
        this.createPeerConnection();
        this.notification_sound = new Audio(`/notifications/call.mp3`);
        this.remoteStream = new MediaStream();

        this.socket = io(WS_URL);

        this.socket.on('live_callee_ready', (data) => {
            if(this.conversation.id == data.conversation_id) {
                this.notification_sound.pause();
                setTimeout(() => {
                    this.createOffer();
                }, 500);
                this.addLocalStream();
                this.status = 'ongoing';
            }
        });
        this.socket.on('live_call_candidate', (data) => {
            if(this.conversation.id == data.conversation_id) {
                console.log('received: candidate');
                this.pc.addIceCandidate(data.candidate);
            }
        });
        this.socket.on('live_call_answer', (data) => {
            if(this.conversation.id == data.conversation_id) {
                this.pc.setRemoteDescription(data.desc);
                this.notification_sound.pause();
            }
        });
        this.socket.on('live_call_offer', (data) => {
            if(this.conversation.id == data.conversation_id) {
                this.pc.setRemoteDescription(data.desc);
                this.createAnswer();
            }
        });
        this.socket.on('live_call_reject', (data) => {
            if(this.conversation.id == data.conversation_id) {
                this.close();
            }
        });
        this.socket.on('live_call_end', (data) => {
            if(this.conversation.id == data.conversation_id) {
                this.close();
            }
        });

        window.onbeforeunload = (e) => {
            e = e || window.event;
            if(this.blobs.length > 0) {
                let message = 'Any data will be lost. Are you sure to close this window?';
                // For IE and Firefox prior to version 4
                if (e) e.returnValue = message;
                // For Safari
                return message;
            }
        };
        this.endedEvent = new Event('ended');
    },

    mounted() {
        this.initCamera();
        switch(this.action) {
            case 'outgoing':
                this.startCall();
                this.notification_sound.play();
                break;

            case 'incoming':
                this.answerCall();
                break;
        }

        this.$refs['remotePreview'].onplaying = () => {
            this.remoteCameraReady = true;
        };
        this.$refs['cameraPreview'].onplaying = () => {
            this.localCameraReady = true;
        };
    },

    methods: {
        fullScreen(state) {
            this.isFullScreen = state;
            toggleFullscreen(document.documentElement).then(() => {
                return fullscreenChange(() => {
                    if (isFullscreen()) {
                      this.isFullScreen = true;
                    } else {
                      this.isFullScreen = false;
                    }
                });
            });
        },

        close() {
            if(this.blobs.length > 0) {
                this.endCall(false);
            } else{
                window.close();
            }
        },

        startCall() {
            this.socket.emit('live_call_incoming', { 
                conversation_id: this.conversation.id,
                caller_id: this.caller.id,
            });
        },
        
        answerCall() {
            this.status = 'ongoing';
            setTimeout(() => {
                this.socket.emit('live_callee_ready', {
                    conversation_id: this.conversation.id,
                });
            }, 500);
        },

        createOffer() {
            this.pc.createOffer(this.offerOptions).then((desc) => {
                this.pc.setLocalDescription(desc);
                this.socket.emit('live_call_offer', {
                    desc,
                    conversation_id: this.conversation.id,
                    caller: this.caller.id
                });
            }, (e) => { console.log(e); });
        },

        createAnswer() {
            this.pc.createAnswer().then((desc) => {
                this.pc.setLocalDescription(desc);
                this.socket.emit('live_call_answer', { 
                    desc, 
                    conversation_id: this.conversation.id,
                });
            }, (e) => { console.log(e); });
        },

        createPeerConnection() {
            let configuration = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        credential: 'moonfang',
                        username: 'cleidoscope@gmail.com'
                    }
                ]
            };
            this.pc = new RTCPeerConnection(configuration);
            this.pc.ontrack = (event) => {
                this.remoteStream.addTrack(event.track);
                this.$refs['remotePreview'].srcObject = this.remoteStream;
            }
            this.pc.onicecandidate = (event) => {
                if(event.candidate) {
                    console.log('emit: candidate');
                    this.socket.emit('live_call_candidate', {
                        conversation_id: this.conversation.id,
                        candidate: event.candidate
                    });
                }
            };
            this.pc.oniceconnectionstatechange = () => {
                //console.log(this.pc.iceConnectionState);
            };
            this.pc.onnegotiationneeded = (e) => {
                this.createOffer();
            };
            this.pc.onicecandidateerror = (error) => {
                console.log(error);
            };
        },

        initCamera() {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                this.localStream = streams;
                if(this.action == 'incoming') this.addLocalStream();
                this.$refs['cameraPreview'].volume = 0;
                this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
                this.$refs['cameraPreview'].pause();
                this.$refs['cameraPreview'].play();
            }).catch(function(error) {
                alert('Unable to capture your camera.');
                console.error(error);
            });
        },

        sendRecorded(recorded) {
            if(!recorded.sent) {
                this.$set(recorded, 'sent', true);
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.auth,
                    type: 'video',
                    source: recorded.source,
                    preview: recorded.preview,
                    timestamp: timestamp,
                    metadata: JSON.stringify({duration: recorded.duration}),
                    conversation_id: this.conversation.id
                };

                let bodyFormData = new FormData();
                Object.keys(message).map((k) => {
                    bodyFormData.set(k, message[k]);
                });
                axios.post(`/dashboard/messages`, bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then((response) => {
                    this.socket.emit('message_sent', {id: response.data.message.id, conversation_id: response.data.conversation.id});
                });
            }
        },

        downloadRecorded(recorded) {
            if(recorded) {
                let filename = `${recorded.timestamp}.${mime.getExtension(recorded.source.type)}`; 
                let link = document.createElement("a");
                link.href = URL.createObjectURL(recorded.source);
                link.download = filename;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        },

        recordCall() {
            if(!this.isRecording) {
                this.isRecording = true;
                let streams = [this.remoteStream, this.localStream];
                if(this.localStream) streams.push(this.localStream);
                const mixer = new MultiStreamsMixer(streams);
                mixer.frameInterval = 1;
                mixer.startDrawingFrames();
                let stream = mixer.getMixedStream();

                let localVideo = this.$refs['cameraPreview'];
                let remoteVideo = this.$refs['remotePreview'];
                let canvas = this.$refs['preview'];
                canvas.width = $('.live-recorder').width();
                canvas.height = $('.live-recorder').height();
                let canvasContext = canvas.getContext('2d');
                this.localStream.onRender = (context, x, y, width, height, idx) => {
                    canvasContext.save();
                    canvasContext.beginPath();
                    canvasContext.arc(60, canvas.height - 60, 50, 0, 6.28, false); //draw the circle
                    canvasContext.clip(); //call the clip method so the next render is clipped in last path
                    canvasContext.closePath();
                    canvasContext.stroke();
                    canvasContext.drawImage(localVideo, -7, canvas.height - 110, localVideo.offsetWidth, localVideo.offsetHeight);
                    canvasContext.restore();
                };

                let position = this.setCenterPosition(remoteVideo, canvas);
                this.remoteStream.onRender = (context, x, y, width, height, idx) => {
                    canvasContext.drawImage(remoteVideo, position.x, position.y, position.width, position.height);
                };

                let finalStream = new MediaStream();
                let audioStream = new MediaStream(this.localStream.getAudioTracks());
                audioStream.getTracks('audio').forEach((track) => {
                    finalStream.addTrack(track);
                });
                let remoteAudioStream = new MediaStream(this.remoteStream.getAudioTracks());
                remoteAudioStream.getTracks('audio').forEach((track) => {
                    finalStream.addTrack(track);
                });
                canvas.captureStream().getTracks('video').forEach((track) => {
                   finalStream.addTrack(track);
                });
                this.callRecorder = new MediaRecorder(finalStream);
                this.callRecorder.start(30);
                this.callRecorder.ondataavailable = e => this.blobs.push(e.data);
            } else {
                this.isRecording = false;
                this.callRecorder.stop();
                this.callRecorder = null;

                const timestamp = dayjs().valueOf();
                let blob = new File(this.blobs, timestamp, {
                    type: this.blobs[0].type,
                });
                let data = {
                    source: blob,
                    timestamp: timestamp,
                };
                let video = document.createElement('video');
                video.src = URL.createObjectURL(blob);
                video.play().then(() => {
                    video.currentTime = 10e99;
                    video.onseeked = () => {
                        setTimeout(() => {
                            let canvas = document.createElement('canvas');
                            let context = canvas.getContext('2d');
                            canvas.width = video.videoWidth / 3;
                            canvas.height = video.videoHeight / 3;
                            context.fillStyle = "black";
                            context.fillRect(0, 0, canvas.width, canvas.height);
                            context.drawImage(video, 0, 0, canvas.width, canvas.height);
                            canvas.toBlob((blob) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(blob);
                                reader.onload = () => {
                                    data.preview = reader.result;
                                    data.duration = format(video.duration * 1000, { leading: true });
                                    this.recordedData.push(data);
                                    this.blobs = [];
                                };
                            });
                        }, 150);
                    };
                });
            }
        },

        async stopShareScreen() {
            this.localStream.getVideoTracks().forEach(function(track) {
                track.stop();
            });
            this.localStream = await navigator.mediaDevices.getUserMedia({video: true}).catch((e) => {  });
            if(this.localStream) {
                let cameraTrack = this.localStream.getVideoTracks()[0];
                this.videoSender.replaceTrack(cameraTrack);
                this.$refs['cameraPreview'].srcObject = null;
                this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
                this.$refs['cameraPreview'].play();
                this.isScreenSharing = false;
            }
        },

        async shareScreen() {
            let screenStreams = await navigator.mediaDevices.getDisplayMedia({video: true}).catch((e) => {  });
            if(screenStreams) {
                this.localStream.getVideoTracks().forEach(function(track) {
                    track.stop();
                });
                this.localStream = screenStreams;
                let screenTrack = this.localStream.getVideoTracks()[0];
                this.videoSender.replaceTrack(screenTrack);
                this.$refs['cameraPreview'].srcObject = null;
                this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
                this.$refs['cameraPreview'].play();
                this.isScreenSharing = true;
                this.localStream.getTracks()[0].addEventListener('ended', () => {
                    this.stopShareScreen();
                });
            }
        },

        setCenterPosition(video, canvas) {
            let imageAspectRatio = video.videoWidth / video.videoHeight;
            let canvasAspectRatio = canvas.width / canvas.height;
            let renderableHeight, renderableWidth, xStart, yStart;

            // If image's aspect ratio is less than canvas's we fit on height
            // and place the image centrally along width
            if(imageAspectRatio < canvasAspectRatio) {
                renderableHeight = canvas.height;
                renderableWidth = video.videoWidth * (renderableHeight / video.videoHeight);
                xStart = (canvas.width - renderableWidth) / 2;
                yStart = 0;
            }

            // If image's aspect ratio is greater than canvas's we fit on width
            // and place the image centrally along height
            else if(imageAspectRatio > canvasAspectRatio) {
                renderableWidth = canvas.width
                renderableHeight = video.videoHeight * (renderableWidth / video.videoWidth);
                xStart = 0;
                yStart = (canvas.height - renderableHeight) / 2;
            }

            // Happy path - keep aspect ratio
            else {
                renderableHeight = canvas.height;
                renderableWidth = canvas.width;
                xStart = 0;
                yStart = 0;
            }
            return {x: xStart, y: yStart, height: renderableHeight, width: renderableWidth};
        },

        endCall(emit = true) {
            this.notification_sound.pause();
            if(this.status == 'ongoing') this.status = 'ended';
            if(emit) this.socket.emit('live_call_end', {conversation_id: this.conversation.id});

            if(this.isRecording) this.recordCall();
            else this.close();

            window.dispatchEvent(this.endedEvent);
            this.stopStreams();
        },

        rejectCall() {
            this.socket.emit('live_call_reject', {
                conversation_id: this.conversation.id,
            });
            this.close();
        },

        addLocalStream() {
            this.localStream.getTracks().forEach((track) => {
                let sender = this.pc.addTrack(track, this.localStream);
                if(track.kind == 'video') this.videoSender = sender;
            });
        },

        stopStreams() {
            if (this.localStream) {
                this.localStream.getTracks().forEach(function(track) {
                    track.stop();
                });
            }
        },

        secondsToDuration(seconds, limit = 11, end = 8) {
            let date = new Date(0);
            date.setSeconds(seconds);
            let timeString = date.toISOString().substr(limit, end);
            return timeString;
        },
    },

    /*beforeDestroy() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
    },*/
});
