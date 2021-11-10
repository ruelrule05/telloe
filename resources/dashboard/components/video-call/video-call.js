/* eslint-disable */
/* global WS_URL */
const mime = require('mime');
import dayjs from 'dayjs';
const format = require('format-duration');
import MultiStreamsMixer from 'multistreamsmixer';
import toggleFullscreen, { fullscreenChange, isFullscreen } from 'toggle-fullscreen';
import PlainDraggable from '../../../js/plugins/plain-draggable.min';

import VideoIcon from '../../../icons/video';
import VideoMutedIcon from '../../../icons/video-muted';
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
import MicrophoneMuteIcon from '../../../icons/microphone-mute';
import VideocamIcon from '../../../icons/videocam';
import CallMenuIcon from '../../../icons/call-menu';
import CommentIcon from '../../../icons/comment';
import ScreenshareIcon from '../../../icons/screenshare';
import SendIcon from '../../../icons/send';

import Tooltip from '../../../js/directives/tooltip.js';
import { mapActions } from 'vuex';
import WaveSurfer from 'wavesurfer.js';
import WaveSurferMicrophone from '../../../js/plugins/wavesurfer.microphone.min.js';
import domtoimage from 'dom-to-image';

require('../../../js/xirsys/xirsys-signal.js');
require('../../../js/xirsys/xirsys-p2group.js');

import Messages from '../../components/Messages/Messages.vue';

const videoCanvas = require('video-canvas');

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
		MicrophoneMuteIcon,
		ArrowBottomLeftIcon,
		ArrowTopRightIcon,
		MicrophoneAltIcon,
		VideocamIcon,
		CallMenuIcon,
		CommentIcon,
		VideoMutedIcon,
		ScreenshareIcon,
		SendIcon,
		Messages
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
		isShrinked: false, // false
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
		host: '',
		isLoading: false,
		duration: 0,
		timer: null,
		isCalling: false,
		showMessages: false,
		hasNewMessage: false,
		hasDevices: false,
		gettingDevices: true
	}),

	watch: {
		'$root.appChannel': function () {
			this.initListeners();
		}
	},

	created() {
		this.notification_sound = new Audio(`/notifications/call.mp3`);
		window.onbeforeunload = () => {
			//e = e || window.event;
			this.endCall(true, true, true);
		};
	},

	mounted() {
		if (this.$root.appChannel) {
			this.initListeners();
		}
	},

	methods: {
		...mapActions({
			storeMessage: 'messages/store'
		}),

		initListeners() {
			this.$root.appChannel.listenForWhisper('liveCallIncoming', data => {
				let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
				if (conversation) {
					this.caller = conversation.member;
					this.$root.callConversation = conversation;
					this.remoteCallID = data.username;
					if (!this.$root.callConversation.channel) {
						this.$root.callConversation.channel = this.$echo.private(`conversations.${conversation.id}`);
					}
					this.incomingCall(conversation);
				}
			});
			this.$root.appChannel.listenForWhisper('liveCallEnd', data => {
				let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
				if (conversation) {
					if (this.peer) {
						this.deleteRemoteStream(data.uid);
						this.peer.hangup(data.uid);
						if (this.peer.length() == 0) {
							this.endCall(false);
						}
					} else {
						this.endCall(false);
					}
				}
			});
			this.$root.appChannel.listenForWhisper('liveCallPresenter', data => {
				if (data.presenter) {
					let remoteVideo = document.querySelector(`#${data.username}`);
					if (remoteVideo) {
						this.presenter = data.presenter;
						document.querySelector('#presenter-container').append(remoteVideo);
						let member;
						if (data.presenter == this.$root.conversation.user_id) {
							member = this.$root.conversation.user;
						} else {
							member = this.$root.conversation.members.find(x => x.user_id == data.presenter).user;
						}
						if (member) {
							this.presenterUser = member;
						}
					}
				} else {
					this.presenterUser = {};
					this.presenter = null;
					let remoteStreams = document.querySelector('#remote-streams');
					let presenterContainerNodes = [...document.querySelectorAll('#presenter-container > .remote-video')];
					presenterContainerNodes.forEach(el => {
						remoteStreams.append(el);
					});
				}
			});
		},

		startTimer() {
			this.timer = setInterval(() => {
				this.duration++;
			}, 1000);
		},

		secondsToHms(d) {
			d = Number(d);
			var h = Math.floor(d / 3600);
			var m = Math.floor((d % 3600) / 60);
			var s = Math.floor((d % 3600) % 60);

			var hDisplay = h > 0 ? h + 'hr' : '';
			var mDisplay = m > 0 ? m + 'm' : '';
			var sDisplay = s > 0 ? s + 's' : '';
			return hDisplay + ' ' + mDisplay + ' ' + sDisplay;
		},

		async getXirsys() {
			return new Promise(resolve => {
				let completeCount = 0;
				window.axios.get('/xirsys/ice').then(response => {
					this.iceServers = response.data.v.iceServers;
					completeCount++;
					if (completeCount == 3) resolve();
				});
				window.axios.get(`/xirsys/token?id=${this.username}`).then(response => {
					this.token = response.data.v;
					completeCount++;
					if (completeCount == 3) resolve();
				});
				window.axios.get(`/xirsys/host?id=${this.username}`).then(response => {
					//this.host = response.data;
					this.host = response.data.v;
					completeCount++;
					if (completeCount == 3) resolve();
				});
			});
		},

		guid(s = 'user') {
			//return s + this.$root.auth.id;
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s + s4() + s4() + this.$root.auth.id;
		},

		callRemotePeer() {
			if (this.remoteCallID) {
				this.peer.callPeer(this.remoteCallID);
			} else {
				console.log('Error', 'A remote peer was not found!');
			}
		},

		setRemoteStream(stream, uid) {
			// check if exists
			let videoContainer = document.createElement('div');
			videoContainer.classList.add('video-container');
			videoContainer.classList.add('remote-video');
			videoContainer.id = uid;

			let videoEl = document.createElement('video');
			videoEl.srcObject = stream;
			videoEl.controls = false;
			videoEl.autoplay = true;
			videoEl.playsinline = true;
			videoEl.disablePictureInPicture = true;
			//let canvas = videoCanvas(videoEl);
			videoEl.classList.add('w-full');
			videoEl.classList.add('h-full');
			videoEl.classList.add('pointer-events-none');
			videoEl.classList.add('relative');
			videoEl.classList.add('z-20');
			//canvas.classList.add('absolute-center');

			let wavesurferEl = document.createElement('div');
			wavesurferEl.classList.add('wavesurfer');
			wavesurferEl.classList.add('w-1/2');
			wavesurferEl.classList.add('z-10');
			wavesurferEl.classList.add('hidden');
			wavesurferEl.id = `wavesurfer-${uid}`;

			let microphoneMute = this.$refs['microphoneMute'].$el.cloneNode(true);
			microphoneMute.id = `microphone-mute-${uid}`;
			microphoneMute.classList.add('microphone-mute');

			videoContainer.appendChild(videoEl);
			videoContainer.appendChild(wavesurferEl);
			videoContainer.appendChild(microphoneMute);
			this.$refs['remoteStreams'].appendChild(videoContainer);

			let wavesurfer = WaveSurfer.create({
				container: document.querySelector(`#wavesurfer-${uid}`),
				height: 200,
				barWidth: 3,
				barMinHeight: 0.01,
				barHeight: 1,
				barRadius: 3,
				interact: true,
				cursorWidth: 1,
				cursorColor: 'transparent',
				hideScrollbar: true,
				plugins: [WaveSurferMicrophone.create()]
			});
			wavesurfer.setCursorColor('transparent');
			wavesurfer.setProgressColor('#6e82ea');
			wavesurfer.setWaveColor('#6e82ea');
			wavesurfer.microphone.start(stream);
		},

		onStartCall(evt) {
			let remoteId = evt.data;
			this.conversation.channel.whisper('remoteUserProfile', {
				username: this.username,
				profileImage: this.$root.auth.profile_image,
				fullName: this.$root.auth.full_name,
				initials: this.$root.auth.initials
			});
			this.setRemoteStream(this.peer.getLiveStream(remoteId), remoteId);
			this.remoteCallID = remoteId;
		},

		onReady() {
			this.peer = new window.$xirsys.p2group(this.signal, this.localStream, { iceServers: this.iceServers }, { forceTurn: true });
			this.peer.on(this.peer.peerConnSuccess, this.onStartCall);
		},

		deleteRemoteStream(uid) {
			let remoteVideo = document.querySelector(`.video-container#${uid}`);
			if (remoteVideo) {
				remoteVideo.remove();
			}
		},

		onStopCall(uid) {
			this.deleteRemoteStream(uid);
			this.peer.hangup(uid);
			if (this.peer.length() == 0) {
				this.endCall(false);
			}
		},

		async xirsys() {
			await this.addLocalStream();
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
								}
							}
						}
						break;

					// new peer connected
					case 'peer_connected':
						if (fromPeer != this.username) {
							this.notification_sound.pause();
							if (this.status != 'ongoing') {
								this.action = '';
								this.status = 'ongoing';
								this.startTimer();
							}
						}
						break;

					//peer gone.
					case 'peer_removed':
						var p = this.peer.getLivePeer(fromPeer);
						if (!!p) {
							this.onStopCall(p.id);
						}
						break;
				}
			});
		},

		async initConnection() {
			// Xirsys
			this.isLoading = true;
			this.username = this.guid();
			await this.getXirsys();
			this.isLoading = false;
			this.xirsys();
		},

		async addLocalStream() {
			let videoStreams = await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});
			let audioStreams = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
			let outputTracks = [];
			if (videoStreams) {
				outputTracks = outputTracks.concat(videoStreams.getTracks());
			}
			if (audioStreams) {
				outputTracks = outputTracks.concat(audioStreams.getTracks());
			}
			if (outputTracks.length > 0 && !this.localStream && this.$refs['cameraPreview']) {
				let streams = new MediaStream(outputTracks);
				this.localStream = streams;
				this.$refs['cameraPreview'].muted = true;
				this.$refs['cameraPreview'].volume = 0;
				this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
				this.localStream.getVideoTracks().forEach(track => {
					track.enabled = !this.isVideoStopped;
				});
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
				setTimeout(() => {
					this.draggable = new PlainDraggable(this.$refs.videoCallModal, {
						containment: document.querySelector('#app'),
						left: 20,
						top: document.querySelector('#app').offsetHeight - 160
					});
					this.draggable.onDragStart = () => {
						return this.isShrinked;
					};
				}, 150);
			} else {
				this.$refs.videoCallModal.style.transform = null;
			}
		},

		toggleMic() {
			this.isMuted = !this.isMuted;
			if (this.localStream) {
				let audioTrack = this.localStream.getAudioTracks()[0];
				if (audioTrack) {
					audioTrack.enabled = !this.isMuted;
					this.conversation.channel.whisper('isMuted', {
						username: this.username,
						isMuted: this.isMuted
					});
				}
			}
		},

		toggleVideo() {
			this.isVideoStopped = !this.isVideoStopped;
			if (this.localStream) {
				this.localStream.getVideoTracks().forEach(track => {
					track.enabled = !this.isVideoStopped;
				});

				this.conversation.channel.whisper('toggleVideo', {
					username: this.username,
					isVideoStopped: this.isVideoStopped
				});
			}
		},

		async outgoingCall(conversation, camera = true) {
			this.isCalling = true;
			this.open = true;
			this.action = 'outgoing';
			this.hasDevices = await this.checkDevices();
			if (this.hasDevices) {
				this.conversation = conversation;
				this.isVideoStopped = !camera;
				this.isIncoming = false;
				clearTimeout(this.callTimeout);
				if (!this.$root.muted) this.notification_sound.play();

				await this.initConnection();
				this.$root.appChannel.whisper('liveCallIncoming', {
					conversation_id: conversation.id,
					user_id: this.$root.auth.id,
					username: this.username
				});
				this.$root.callConversation = conversation;
				this.callTimeout = setTimeout(() => {
					if (!this.status) {
						this.endCall();
					}
				}, 30000);
			}
		},

		async checkDevices() {
			this.gettingDevices = true;
			let streams = await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(() => {});
			if (!streams) {
				streams = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
			}
			this.gettingDevices = false;
			return streams ? true : false;
		},

		async sendMessage(message, broadcast = false) {
			message.tags = [];
			message.user_id = this.$root.auth.id;
			message.broadcast = broadcast;
			let response = await this.storeMessage(message);
			this.$root.appChannel.whisper('newMessage', {
				id: response.id,
				conversation_id: response.conversation_id,
				timestamp: response.timestamp
			});
		},

		async incomingCall(conversation) {
			this.hasDevices = await this.checkDevices();
			if (this.hasDevices) {
				this.conversation = conversation;
				this.open = true;
				if (!this.$root.muted) this.notification_sound.play();
				this.isIncoming = true;
				this.action = 'incoming';
			}
		},

		answerCall() {
			this.action = '';
			this.isIncoming = false;
			this.status = 'ongoing';
			this.notification_sound.pause();
			this.initConnection();
		},

		rejectCall() {
			this.$root.appChannel.whisper('liveCallEnd', {
				conversation_id: this.conversation.id
			});
			this.endCall(false);
		},

		endCall(emit = true, message = false, broadcast = false) {
			if (this.conversation) {
				if (message && this.isCalling) {
					if (this.status == 'ongoing') {
						clearInterval(this.timer);
						this.sendMessage({
							message: `Call ${this.secondsToHms(this.duration)}`,
							type: 'call_ended',
							conversation_id: this.conversation.id
						});
					} else if (!this.status) {
						this.sendMessage(
							{
								message: 'Call failed',
								type: 'call_failed',
								conversation_id: this.conversation.id
							},
							broadcast
						);
					}
				}

				if (emit && this.$root.appChannel) {
					this.$root.appChannel.whisper('liveCallEnd', {
						conversation_id: this.conversation.id,
						uid: this.username
					});
				}
			}
			this.isCalling = false;
			this.duration = 0;
			this.caller = null;
			this.timer = null;
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
			this.showMessages = false;

			if (this.peer) {
				this.peer.close();
			}
			if (this.signal) {
				this.signal.close();
			}

			this.notification_sound.pause();
			this.notification_sound.currentTime = 0;
			this.$root.callConversation = null;

			if (this.isRecording) this.recordCall();
			else {
				if (this.draggable) this.draggable.remove();
				this.draggable = null;
			}
			if (this.$refs['cameraPreview']) this.$refs['cameraPreview'].srcObject = null;
			this.stopLocalStream();
			this.$refs['remoteStreams'].innerHTML = '';
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
				let modalBody = this.$refs['modalBody'];
				let canvas = document.createElement('canvas');
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				let ctx = canvas.getContext('2d');
				let interval = setInterval(() => {
					domtoimage.toJpeg(modalBody).then(dataUrl => {
						let img = new Image();
						img.src = dataUrl;
						img.onload = () => {
							ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
						};
					});
				}, 25);
				let canvasStream = canvas.captureStream();
				this.callRecorder = new MediaRecorder(canvasStream);
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
			this.localStream.getVideoTracks().forEach(function (track) {
				track.stop();
			});
			this.localStream = await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});
			if (this.localStream) {
				let cameraTrack = this.localStream.getVideoTracks()[0];
				this.peer.updateLocalStream(cameraTrack);
				this.$refs['cameraPreview'].srcObject = null;
				this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
				this.$refs['cameraPreview'].play();
				this.isScreenSharing = false;
				this.presenter = null;
				this.$root.appChannel.whisper('liveCallPresenter', {
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
				this.localStream.getVideoTracks().forEach(function (track) {
					track.stop();
				});
				screenStreams.getVideoTracks().forEach(track => {
					this.localStream.addTrack(track);
				});
				let screenTrack = screenStreams.getVideoTracks()[0];
				this.peer.updateLocalStream(screenTrack);
				this.$refs['cameraPreview'].srcObject = null;
				this.$refs['cameraPreview'].srcObject = new MediaStream(screenStreams.getVideoTracks());
				this.$refs['cameraPreview'].play();
				this.isScreenSharing = true;
				this.localStream.getTracks()[0].addEventListener('ended', () => {
					this.stopShareScreen();
				});
				this.presenter = this.$root.auth.id;

				this.$root.appChannel.whisper('liveCallPresenter', {
					presenter: this.presenter,
					username: this.username
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
				this.localStream.getTracks().forEach(function (track) {
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
