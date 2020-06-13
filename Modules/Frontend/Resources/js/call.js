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

var randomString = require('random-string');
new Vue ({
    el: '#app',
    components: {VideoIcon, CloseIcon, DuplicateAltIcon, DownloadIcon, ArrowRightIcon, ExpandIcon, CollapseIcon},

    data: () => ({
        auth: AUTH,
        conversation: CONVERSATION,
        notification_sound: null,
        connections: [],
        status: '',
        offerOptions: {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        },
        localCameraReady: false,
        remoteCameraReady: false,
        isAnswered: false,
        videoAnswer: null,
        callRecorder: null,
        recordedData: [],
        blobs: [],
        isRecording: false,
        videoSender: null,
        isScreenSharing: false,
        isFullScreen: false,
        localStream: null,
        format: format,
        endedEvent: null
    }),

    created() {
        this.notification_sound = new Audio(`/notifications/call.mp3`);
        this.socket = io(WS_URL);
        this.socket.emit('live_call_ready', {
            conversation_id: this.conversation.id,
            user_id: this.auth.id,
        });
        this.socket.on('live_call_connections', (response) => {
            if(this.socket.id == response.socket_id && response.data[this.conversation.id]) {
                let users = response.data[this.conversation.id];
                if(users.length == 1) this.outgoing = true;
                else {
                    this.outgoing = false;
                    users.forEach((user_id) => {
                        if(user_id != this.auth.id) {
                            this.createConnectionRequest(user_id);
                        }
                    });
                }
            }
        });
        this.socket.on('live_call_connection_request', (data) => {
            if(data.target_user_id == this.auth.id) {
                let connection = this.createPeerConnection();
                connection.remote_connection = data.source_connection;
                connection.remote_user_id = data.source_user_id;
                connection.polite = false;
                this.createOffer(connection);
                this.status = 'ongoing';
                this.notification_sound.pause();
            }
        });

        this.socket.on('live_call_offer', async (data) => {
            let connection = this.connections.find((x) => x.id == data.target_connection);
            if(connection && data.conversation_id == this.conversation.id) {
                connection.remote_connection = data.source_connection;
                this.createAnswer(connection, data.desc);
            }
        });
        this.socket.on('live_call_answer', async (data) => {
            let connection = this.connections.find((x) => x.id == data.target_connection);
            if(connection && data.conversation_id == this.conversation.id) {
                await connection.setRemoteDescription(data.desc);
                this.notification_sound.pause();
            }
        });
        this.socket.on('live_call_candidate', async (data) => {
            let connection = this.connections.find((x) => x.id == data.target_connection);
            if(connection && data.conversation_id == this.conversation.id) {
                console.log('received: candidate');
                await connection.addIceCandidate(data.candidate).catch((e) => {
                    console.error('live_call_candidate: ', e, connection.remoteDescription.type);
                    /*if(!connection.pendingCandidates) connection.pendingCandidates = [];
                    connection.pendingCandidates.push(data.candidate);
                    console.log('addToPending');*/
                });
            } else {
                //console.log('ERROR', data);
            }
        });
        this.socket.on('live_call_disconnect', (data) => {
            this.connections.forEach((connection, index) => {
                if(connection.remote_user_id == data.user_id) {
                    let videoEl = document.querySelector(`#remote-${this.connections[index].id}`);
                    if(videoEl) videoEl.remove();
                    this.connections[index].close();
                    this.connections.splice(index, 1);
                }
            });
            if(this.connections.length == 0 && this.status == 'ongoing') this.close();
            console.log(this.connections.length);
        });



        this.socket.on('live_call_reject', (data) => {
            if(this.conversation.id == data.conversation_id) {
                this.close();
            }
        });
        
        /*this.socket.on('live_call_end', (data) => {
            if(this.conversation.id == data.conversation_id) {
                this.close();
            }
        });*/

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
        this.$refs['cameraPreview'].onplaying = () => {
            this.localCameraReady = true;
        };
        if(!this.status && this.connections.length == 0) {
            this.initCall();
        }
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

        initCall() {
            this.notification_sound.play();
            this.socket.emit('live_call_incoming', { 
                conversation_id: this.conversation.id,
                user_id: this.auth.id,
            });
        },
        
        /*answerCall() {
            this.status = 'ongoing';
            setTimeout(() => {
                this.socket.emit('live_callee_ready', {
                    conversation_id: this.conversation.id,
                });
            }, 500);
        },*/

        /*addPendingCandidates(connection) {
            if(connection.pendingCandidates) {
                connection.pendingCandidates.forEach((candidate) => {
                    connection.addIceCandidate(candidate);
                })
            }
        },*/

        createConnectionRequest(user_id) {
            let connection = this.createPeerConnection();
            connection.remote_user_id = user_id;
            connection.polite = true;
            this.socket.emit('live_call_connection_request', {
                source_connection: connection.id,
                target_user_id: user_id,
                source_user_id: this.auth.id,
            });
            this.status = 'ongoing';
        },

        createOffer(connection) {
            setTimeout(() => {
                if (connection.signalingState != "stable") return;
                connection.createOffer().then((desc) => {
                    connection.setLocalDescription(desc)
                        .then(() => {
                            this.socket.emit('live_call_offer', {
                                desc,
                                conversation_id: this.conversation.id,
                                source_connection: connection.id,
                                target_connection: connection.remote_connection,
                            });
                        })
                        .catch((e) => console.error('createOffer 1: ', e));
                }, (e) => { console.error('createOffer 2: ', e); });
            }, 500);
        },

        async createAnswer(connection, desc) {
            if (desc.type == "offer" && connection.signalingState != "stable") {
                if (!connection.polite) return;
                await Promise.all([
                    connection.setLocalDescription({type: "rollback"}),
                    connection.setRemoteDescription(desc)
                ]);
            } else {
                await connection.setRemoteDescription(desc);
            }

            if (desc.type == "offer") {
                connection.createAnswer().then(async (desc) => {
                   await connection.setLocalDescription(desc);
                    this.socket.emit('live_call_answer', { 
                        desc, 
                        conversation_id: this.conversation.id,
                        source_connection: connection.id,
                        target_connection: connection.remote_connection
                    });
                }, (e) => { console.log('createAnswer: ', e, connection); });
            }
        },

        createPeerConnection() {
            let timestamp = dayjs().valueOf();
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
            let connection  = new RTCPeerConnection(configuration);
            connection.id = `${timestamp}-${randomString({length: 15})}`;
            connection.ontrack = (event) => {
                if(!connection.remoteStream) {
                    connection.remoteStream = event.streams[0];
                }
                connection.remoteStream.addTrack(event.track);

                let videoEl = document.querySelector(`#remote-${connection.id}`);
                if(videoEl) {
                    videoEl.srcObject = connection.remoteStream;
                } else {
                    let videoContainer = document.createElement('div');
                    videoContainer.classList.add('flex-grow-1');
                    videoContainer.id = `remote-${connection.id}`;
                    let videoEl = document.createElement('video');
                    videoEl.autoplay = true;
                    videoEl.playsinline = true;
                    videoEl.controls = false;
                    videoEl.classList.add('w-100');
                    videoEl.classList.add('h-100');
                    videoEl.srcObject = connection.remoteStream;
                    videoContainer.appendChild(videoEl);
                    this.$refs['remoteStreams'].appendChild(videoContainer);
                }
            }
            connection.onicecandidate = ({candidate}) => {
                if(candidate) {
                    console.log('emit: candidate');
                    this.socket.emit('live_call_candidate', {
                        conversation_id: this.conversation.id,
                        candidate: candidate,
                        target_connection: connection.remote_connection,
                    });
                }
            };
            connection.oniceconnectionstatechange = () => {
            };
            connection.onnegotiationneeded = (e) => {
                this.createOffer(connection);
            };
            connection.onicecandidateerror = (error) => {
                console.log(error);
            };
            this.addLocalStream(connection);  
            this.connections.push(connection);
            return connection;
        },

        async addLocalStream(connection) {
            let streams = await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(function(error) {
                alert('Unable to capture your camera.');
                console.error(error);
            });
           if(streams) {
                if(!this.localStream) {
                    this.localStream = streams;
                    this.$refs['cameraPreview'].muted = true;
                    this.$refs['cameraPreview'].volume = 0;
                    this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
                }

                let videoTrack = streams.getVideoTracks()[0];
                let audioTrack = streams.getAudioTracks()[0];
                connection.videoSender = connection.addTrack(videoTrack, streams);
                connection.audioSender = connection.addTrack(audioTrack, streams);
            }
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
                this.connections.forEach((connection) => {
                   if(connection.videoSender) {
                        connection.videoSender.replaceTrack(cameraTrack);
                   }
                });
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
                this.connections.forEach((connection) => {
                   if(connection.videoSender) {
                        connection.videoSender.replaceTrack(screenTrack);
                   }
                });
                this.$refs['cameraPreview'].srcObject = null;
                this.$refs['cameraPreview'].srcObject = new MediaStream(screenStreams.getVideoTracks());
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
            /*this.notification_sound.pause();
            if(this.status == 'ongoing') this.status = 'ended';
            if(emit) this.socket.emit('live_call_end', {conversation_id: this.conversation.id});

            if(this.isRecording) this.recordCall();
            else this.close();*/
            this.socket.emit('live_call_end', {conversation_id: this.conversation.id});
            window.dispatchEvent(this.endedEvent);
            window.close();
            //this.stopStreams();
        },

        rejectCall() {
            this.socket.emit('live_call_reject', {
                conversation_id: this.conversation.id,
            });
            this.close();
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
