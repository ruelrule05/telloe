/* eslint-disable */
/* global WS_URL */
const mime = require('mime');
import dayjs from 'dayjs';
const format = require('format-duration');
import MultiStreamsMixer from 'multistreamsmixer';
import toggleFullscreen, { fullscreenChange, isFullscreen } from 'toggle-fullscreen';
import PlainDraggable from '../../../js/plugins/plain-draggable.min';
import RTCMultiConnection from 'rtcmulticonnection';

import VideoIcon from '../../../icons/video';
import PhoneIcon from '../../../icons/phone';
import CloseIcon from '../../../icons/close';
import DuplicateAltIcon from '../../../icons/duplicate-alt';
import DownloadIcon from '../../../icons/download';
import ArrowRightIcon from '../../../icons/arrow-right';
import ExpandIcon from '../../../icons/expand';
import CollapseIcon from '../../../icons/collapse';
import InterviewIcon from '../../../icons/interview';
import MicrophoneIcon from '../../../icons/microphone';
import ArrowBottomLeftIcon from '../../../icons/arrow-bottom-left';
import ArrowTopRightIcon from '../../../icons/arrow-top-right';
import MicrophoneAltIcon from '../../../icons/microphone-alt';
import VideocamIcon from '../../../icons/videocam';
import CallMenuIcon from '../../../icons/call-menu';
import CommentIcon from '../../../icons/comment';

import Tooltip from '../../../js/directives/tooltip.js';
import io from 'socket.io-client';
window.io = io;

require('../../../js/xirsys/xirsys-signal.js');
require('../../../js/xirsys/xirsys-p2group.js');

export default {
	components: {
		VideoIcon,
		PhoneIcon,
		CloseIcon,
		DuplicateAltIcon,
		DownloadIcon,
		ArrowRightIcon,
		ExpandIcon,
		CollapseIcon,
		InterviewIcon,
		MicrophoneIcon,
		ArrowBottomLeftIcon,
		ArrowTopRightIcon,
		MicrophoneAltIcon,
		VideocamIcon,
		CallMenuIcon,
		CommentIcon
	},

	directives: {
		Tooltip
	},

	data: () => ({
		open: false,
		notification_sound: null,
		connections: [],
		caller: null,
		status: '',
		action: '',
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
		format: format,
		endedEvent: null,
		localStream: null,
		remoteStreamsMixer: null,
		isMuted: false,
		isVideoStopped: false,
		isShrinked: false,
		draggable: null,
		rejectsCount: 0,
		callTimeout: null,
		isIncoming: false,
		presenter: null,
		presenterUser: {},
		connection: null,
		iceServers: [],
		conversation: null,
		signal: null,
		remoteCallID: null,
		peer: null,
		username: '',
		token: '',
		host: ''
	}),

	watch: {
		isShrinked: function(value) {
			if (value) {
				document.querySelector('.modal-backdrop').style.display = 'none';
			} else {
				document.querySelector('.modal-backdrop').style.display = 'block';
				this.$refs['modal'].removeAttribute('style');
				this.$refs['modal'].style.display = 'block';
				this.$refs['modal'].style.opacity = 1;
				this.$refs['modal'].style.visibility = 'visible';
			}
		},
		'$root.appChannel': function() {
			this.$root.appChannel.listenForWhisper('liveCallIncoming', data => {
				let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
				if (conversation) {
					this.caller = conversation.member;
					this.$root.callConversation = conversation;
					this.remoteCallID = data.username;
					this.incomingCall(conversation);
				}
			});
			this.$root.appChannel.listenForWhisper('liveCallAnswer', data => {
				let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
				if (conversation) {
					this.status = 'ongoing';
				}
			});
			this.$root.appChannel.listenForWhisper('liveCallEnd', data => {
				let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
				if (conversation) {
					this.endCall(false);
				}
			});
		},

		'$root.auth': function(value) {
			if (value) {
				this.username = this.guid();
				this.getXirsys();
			}
		}
	},

	created() {
		this.notification_sound = new Audio(`/notifications/call.mp3`);
		window.onbeforeunload = () => {
			//e = e || window.event;
			this.endCall();
		};
	},

	methods: {
		getXirsys() {
			window.axios.get('/xirsys/ice').then(response => {
				this.iceServers = response.data.v.iceServers;
			});
			window.axios.get(`/xirsys/token?id=${this.username}`).then(response => {
				this.token = response.data.v;
			});
			window.axios.get(`/xirsys/host?id=${this.username}`).then(response => {
				this.host = response.data.v;
			});
		},

		guid(s = 'user') {
			//return s + this.$root.auth.id;
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s + s4() + s4();
		},

		callRemotePeer() {
			if (this.remoteCallID) {
				this.peer.callPeer(this.remoteCallID);
			} else {
				console.log('Error', 'A remote peer was not found!');
			}
		},

		setRemoteStream(stream, uid) {
			let videoContainer = document.createElement('div');
			videoContainer.classList.add('flex-grow-1');
			videoContainer.classList.add('video-container');
			videoContainer.classList.add('position-relative');
			videoContainer.classList.add('remote-video');
			let videoEl = document.createElement('video');
			videoEl.srcObject = stream;
			videoEl.classList.add('w-100');
			videoEl.classList.add('h-auto');
			videoEl.controls = false;
			videoEl.autoplay = true;
			videoEl.playsinline = true;
			videoEl.disablePictureInPicture = true;
			videoEl.id = uid;
			videoContainer.appendChild(videoEl);
			this.$refs['remoteStreams'].appendChild(videoEl);
		},

		onStartCall(evt) {
			let remoteId = evt.data;
			this.setRemoteStream(this.peer.getLiveStream(remoteId), remoteId);
			this.remoteCallID = remoteId;
		},

		onReady() {
			this.peer = new window.$xirsys.p2group(this.signal, this.localStream, { iceServers: this.iceServers }, { forceTurn: true });
			this.peer.on(this.peer.peerConnSuccess, this.onStartCall);
		},

		async xirsys() {
			this.addLocalStream();

			this.signal = new window.$xirsys.signal(this.host + '/v2/' + this.token, this.username);
			this.signal.on('message', msg => {
				var pkt = JSON.parse(msg.data);
				var payload = pkt.p; //the actual message data sent
				var meta = pkt.m; //meta object
				var msgEvent = meta.o; //event label of message
				var toPeer = meta.t; //msg to user (if private msg)
				var fromPeer = meta.f; //msg from user
				if (!!fromPeer) {
					var p = fromPeer.split('/');
					fromPeer = p[p.length - 1];
				}
				switch (msgEvent) {
					case 'peers':
						this.onReady();
						if (!!this.remoteCallID) {
							var users = payload.users;
							var l = users.length;
							for (var i = 0; i < l; i++) {
								var user = users[i];
								if (user === this.remoteCallID) {
									this.callRemotePeer();
									break;
								}
							}
						}
						break;
					//peer gone.
					case 'peer_removed':
						//if(fromPeer == remoteCallID) onStopCall();
						//todo - ceck if peer is one that is connected to us and stop that call.
						var p = this.peer.getLivePeer(fromPeer);
						if (!!p) {
							//onStopCall(p.id);
						}
						break;
				}
			});
		},

		async initConnection() {
			// Xirsys
			this.xirsys();

			// RTCMultiConnection
			//await this.rtcmc();
		},

		async addLocalStream() {
			let streams = await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(error => {
				this.$toasted.error('Unable to capture your camera.');
				console.error(error);
			});
			if (streams && !this.localStream && this.$refs['cameraPreview']) {
				this.localStream = streams;
				this.$refs['cameraPreview'].muted = true;
				this.$refs['cameraPreview'].volume = 0;
				this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
			}
		},

		goToConversation() {
			this.isShrinked = true;
			let conversationUrl = `/dashboard/conversations/${this.$root.callConversation.id}`;
			if (this.$route.path != conversationUrl) {
				conversationUrl = `${conversationUrl}?focus=message_input`;
				this.$router.push(conversationUrl);
			}
		},

		toggleDraggable() {
			if (this.isShrinked) {
				if (this.draggable) this.draggable.remove();
				this.$refs['modal'].style.visibility = 'hidden';
				setTimeout(() => {
					this.draggable = new PlainDraggable(this.$refs['modal'], {
						containment: document.querySelector('#app'),
						left: 20,
						top: document.querySelector('#app').offsetHeight - 160
					});
					this.draggable.onDragStart = () => {
						return this.isShrinked;
					};
					this.$refs['modal'].style.visibility = 'visible';
					this.$refs['modal'].style.opacity = 1;
				}, 150);
			}
		},

		toogleMic() {
			this.isMuted = !this.isMuted;
			this.connections.forEach(connection => {
				connection.audioSender.track.enabled = !this.isMuted;
			});
			if (this.localStream) this.localStream.getAudioTracks()[0].enabled = !this.isMuted;
		},

		toggleVideo() {
			this.isVideoStopped = !this.isVideoStopped;
			this.connections.forEach(connection => {
				connection.videoSender.track.enabled = !this.isVideoStopped;
			});
			if (this.localStream) this.localStream.getVideoTracks()[0].enabled = !this.isVideoStopped;
		},

		outgoingCall(conversation, camera = true) {
			this.open = true;
			this.conversation = conversation;
			this.initConnection();
			this.action = 'outgoing';
			$(this.$refs['modal'])
				.modal({ keyboard: false, backdrop: 'static' })
				.modal('show');
			this.isVideoStopped = !camera;
			this.isIncoming = false;
			clearTimeout(this.callTimeout);
			if (!this.$root.muted) this.notification_sound.play();
			this.$root.appChannel.whisper('liveCallIncoming', {
				conversation_id: conversation.id,
				user_id: this.$root.auth.id,
				username: this.username
			});
			this.$root.callConversation = conversation;
			this.callTimeout = setTimeout(() => {
				//if (!this.status) this.endCall();
			}, 15000);
		},

		incomingCall(conversation) {
			this.conversation = conversation;
			this.open = true;
			if (!this.$root.muted) this.notification_sound.play();
			this.isIncoming = true;
			$(this.$refs['modal'])
				.modal({ keyboard: false, backdrop: 'static' })
				.modal('show');
			this.action = 'incoming';
		},

		async answerCall() {
			this.isIncoming = false;
			this.status = 'ongoing';
			this.$root.appChannel.whisper('liveCallAnswer', {
				conversation_id: this.$root.callConversation.id,
				user_id: this.$root.auth.id
			});
			this.notification_sound.pause();
			await this.initConnection();
		},

		rejectCall() {
			this.$root.appChannel.whisper('liveCallEnd', {
				conversation_id: this.conversation.id,
				broadcast: false
			});
			this.endCall(false);
		},

		endCall(emit = true) {
			console.log('endCall');
			this.caller = null;
			this.localCameraReady = false;
			this.remoteCameraReady = false;
			this.isAnswered = false;
			this.videoAnswer = null;
			this.callRecorder = null;
			this.status = '';
			this.action = '';
			this.open = false;
			this.notification_sound.pause();
			this.isMuted = false;
			this.isVideoStopped = false;
			this.isScreenSharing = false;
			this.isFullScreen = false;
			this.isIncoming = false;
			this.isShrinked = false;
			if (emit) {
				this.$root.appChannel.whisper('liveCallEnd', {
					conversation_id: this.conversation.id
				});
			}

			this.stopLocalStream();

			this.notification_sound.pause();
			this.notification_sound.currentTime = 0;
			this.$root.callConversation = null;

			if (this.isRecording) this.recordCall();
			else {
				if (this.$refs['modal']) this.$refs['modal'].removeAttribute('style');
				if (this.draggable) this.draggable.remove();
				this.draggable = null;
			}
			//setTimeout(() => {
			$(this.$refs['remoteStreams']).empty();
			if (this.$refs['cameraPreview']) this.$refs['cameraPreview'].srcObject = null;
			this.connections.forEach(connection => {
				connection.localStream.getTracks().forEach(function(track) {
					track.stop();
				});
				connection.close();
				connection = null;
			});

			this.connections = [];
			//}, 150);
		},

		fullScreen(state) {
			this.isFullScreen = state;
			toggleFullscreen(document.documentElement).then(() => {
				return fullscreenChange(() => {
					if (isFullscreen()) {
						this.isFullScreen = true;
					} else {
						this.isFullScreen = false;
						this.$refs['modal'].style.display = 'block';
						this.$refs['modal'].style.opacity = 1;
					}
				});
			});
		},

		sendRecorded(recorded) {
			if (!recorded.sent) {
				this.$set(recorded, 'sent', true);
				const timestamp = dayjs().valueOf();
				let message = {
					user: this.$root.auth,
					type: 'video',
					source: recorded.source,
					preview: recorded.preview,
					timestamp: timestamp,
					metadata: JSON.stringify({ duration: recorded.duration }),
					conversation_id: this.$root.callConversation.id
				};

				let bodyFormData = new FormData();
				Object.keys(message).map(k => {
					bodyFormData.set(k, message[k]);
				});
				window.axios.post(`/dashboard/messages`, bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
					this.$root.socket.emit('message_sent', { id: response.data.message.id, conversation_id: response.data.conversation.id });
				});
			}
		},

		downloadRecorded(recorded) {
			if (recorded) {
				let filename = `${recorded.timestamp}.${mime.getExtension(recorded.source.type)}`;
				let link = document.createElement('a');
				link.href = URL.createObjectURL(recorded.source);
				link.download = filename;
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				link.remove();
			}
		},

		recordCall() {
			if (!this.isRecording) {
				this.isRecording = true;
				let streams = [this.remoteStream, this.localStream];
				if (this.localStream) streams.push(this.localStream);
				const mixer = new MultiStreamsMixer(streams);
				mixer.frameInterval = 1;
				mixer.startDrawingFrames();

				let localVideo = this.$refs['cameraPreview'];
				let remoteVideo = this.$refs['remotePreview'];
				let canvas = this.$refs['preview'];
				canvas.width = $('.video-call').width();
				canvas.height = $('.video-call').height();
				let canvasContext = canvas.getContext('2d');
				this.localStream.onRender = () => {
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
				this.remoteStream.onRender = () => {
					canvasContext.drawImage(remoteVideo, position.x, position.y, position.width, position.height);
				};

				let finalStream = new MediaStream();
				let audioStream = new MediaStream(this.localStream.getAudioTracks());
				audioStream.getTracks('audio').forEach(track => {
					finalStream.addTrack(track);
				});
				let remoteAudioStream = new MediaStream(this.remoteStream.getAudioTracks());
				remoteAudioStream.getTracks('audio').forEach(track => {
					finalStream.addTrack(track);
				});
				canvas
					.captureStream()
					.getTracks('video')
					.forEach(track => {
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
					type: this.blobs[0].type
				});
				let data = {
					source: blob,
					timestamp: timestamp
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
							context.fillStyle = 'black';
							context.fillRect(0, 0, canvas.width, canvas.height);
							context.drawImage(video, 0, 0, canvas.width, canvas.height);
							canvas.toBlob(blob => {
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
			this.localStream = await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});
			if (this.localStream) {
				let cameraTrack = this.localStream.getVideoTracks()[0];
				this.connections.forEach(connection => {
					if (connection.videoSender) {
						connection.videoSender.replaceTrack(cameraTrack);
					}
				});
				this.$refs['cameraPreview'].srcObject = null;
				this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
				this.$refs['cameraPreview'].play();
				this.isScreenSharing = false;
				this.presenter = null;

				this.$root.socket.emit('live_call_presenter', {
					conversation_id: this.$root.callConversation.id,
					presenter: this.presenter
				});
			}
		},

		async shareScreen() {
			if (this.presenter) return;

			let screenStreams = await navigator.mediaDevices.getDisplayMedia({ video: true }).catch(e => {
				console.log(e);
			});
			if (screenStreams) {
				this.localStream.getVideoTracks().forEach(function(track) {
					track.stop();
				});
				this.localStream = screenStreams;
				let screenTrack = this.localStream.getVideoTracks()[0];
				this.connections.forEach(connection => {
					if (connection.videoSender) {
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
				this.presenter = this.$root.auth.id;

				this.$root.socket.emit('live_call_presenter', {
					conversation_id: this.$root.callConversation.id,
					presenter: this.presenter
				});
			}
		},

		setCenterPosition(video, canvas) {
			let imageAspectRatio = video.videoWidth / video.videoHeight;
			let canvasAspectRatio = canvas.width / canvas.height;
			let renderableHeight, renderableWidth, xStart, yStart;

			// If image's aspect ratio is less than canvas's we fit on height
			// and place the image centrally along width
			if (imageAspectRatio < canvasAspectRatio) {
				renderableHeight = canvas.height;
				renderableWidth = video.videoWidth * (renderableHeight / video.videoHeight);
				xStart = (canvas.width - renderableWidth) / 2;
				yStart = 0;
			}

			// If image's aspect ratio is greater than canvas's we fit on width
			// and place the image centrally along height
			else if (imageAspectRatio > canvasAspectRatio) {
				renderableWidth = canvas.width;
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
			return { x: xStart, y: yStart, height: renderableHeight, width: renderableWidth };
		},

		stopLocalStream() {
			if (this.localStream) {
				this.localStream.getTracks().forEach(function(track) {
					track.stop();
				});
				this.localStream = null;
			}
		},

		secondsToDuration(seconds, limit = 11, end = 8) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(limit, end);
			return timeString;
		}
	}
};
