const mime = require('mime');
import dayjs from 'dayjs';
const format = require('format-duration');
import MultiStreamsMixer from 'multistreamsmixer';
import toggleFullscreen, { fullscreenChange, isFullscreen } from 'toggle-fullscreen';
import PlainDraggable from '../../../js/plugins/plain-draggable.min';

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
const randomString = require('random-string');
import MicrophoneAltIcon from '../../../icons/microphone-alt';
import VideocamIcon from '../../../icons/videocam';
import CallMenuIcon from '../../../icons/call-menu';
import CommentIcon from '../../../icons/comment';

import Tooltip from '../../../js/directives/tooltip.js';

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
		presenterUser: {}
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
		}
	},

	created() {
		this.notification_sound = new Audio(`/notifications/call.mp3`);

		this.$root.socket.on('live_call_incoming', data => {
			let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
			if (conversation) {
				this.caller = conversation.member;
				this.$root.callConversation = conversation;
				this.incomingCall();
			}
		});

		this.$root.socket.on('live_call_end', data => {
			this.connections.forEach((connection, index) => {
				if (connection.remote_user_id == data.user_id) {
					let videoEl = document.querySelector(`#remote-${this.connections[index].id}`);
					if (videoEl) videoEl.remove();
					this.connections[index].close();
					this.connections.splice(index, 1);
				}
			});
			if (this.connections.length == 0) this.endCall(false);
		});

		this.$root.socket.on('live_call_connections', response => {
			// triggered on live_call_connections
			if (this.$root.socket.id == response.socket_id && response.data[this.$root.callConversation.id]) {
				if (response.is_limit) {
					this.status = 'limit';
				} else {
					let users = response.data[this.$root.callConversation.id];
					if (users.length > 1) {
						this.outgoing = false;
						users.forEach(user_id => {
							let exists = this.connections.find(x => x.remote_user_id == user_id);
							if (!exists && user_id != this.$root.auth.id) {
								setTimeout(() => {
									this.createConnectionRequest(user_id);
								}, 150);
							}
						});
					}
				}
			}
		});

		this.$root.socket.on('live_call_connection_request', data => {
			if (data.target_user_id == this.$root.auth.id) {
				let connection = this.createPeerConnection();
				connection.remote_connection = data.source_connection;
				connection.remote_user_id = data.source_user_id;
				connection.polite = false;
				this.createOffer(connection);
				this.status = 'ongoing';
				this.notification_sound.pause();
			}
		});

		this.$root.socket.on('live_call_offer', async data => {
			let connection = this.connections.find(x => x.id == data.target_connection);
			if (connection && data.conversation_id == this.$root.callConversation.id) {
				connection.remote_connection = data.source_connection;
				this.createAnswer(connection, data.desc);
			}
		});

		this.$root.socket.on('live_call_answer', async data => {
			let connection = this.connections.find(x => x.id == data.target_connection);
			if (connection && data.conversation_id == this.$root.callConversation.id) {
				await connection.setRemoteDescription(data.desc);
				this.notification_sound.pause();
				if (connection.pendingCandidates) {
					connection.pendingCandidates.forEach((candidate, index) => {
						connection.addIceCandidate(candidate).then(() => {
							connection.pendingCandidates.splice(index, 1);
						});
					});
				}
			}
		});

		this.$root.socket.on('live_call_candidate', async data => {
			let connection = this.connections.find(x => x.id == data.target_connection);
			if (connection && data.conversation_id == this.$root.callConversation.id) {
				//console.log('received: candidate');
				await connection.addIceCandidate(data.candidate).catch(e => {
					console.error('live_call_candidate: ', e, connection.connectionState);
					if (!connection.pendingCandidates) connection.pendingCandidates = [];
					connection.pendingCandidates.push(data.candidate);
				});
			} else {
				//console.log('ERROR', data);
			}
		});

		this.$root.socket.on('live_call_reject', async data => {
			let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
			if (conversation) {
				this.rejectsCount++;
				if (this.rejectsCount >= conversation.members.length) {
					this.endCall(false);
					this.rejectsCount = 0;
				}
			}
		});

		this.$root.socket.on('live_call_presenter', data => {
			if (data.conversation_id == this.$root.callConversation.id) {
				if (data.presenter) {
					let connection = this.connections.find(x => x.remote_user_id == data.presenter);
					if (connection) {
						let remoteVideo = document.querySelector(`#remote-${connection.id}`);
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
			}
		});

		window.onbeforeunload = e => {
			e = e || window.event;
			this.endCall();
		};
	},

	methods: {
		goToConversation() {
			this.isShrinked = true;
			let conversationUrl = `/dashboard/bookings/services/${this.$root.callConversation.id}`;
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
			this.isVideoStopped = !camera;
			this.isIncoming = false;
			clearTimeout(this.callTimeout);
			if (!this.$root.muted) this.notification_sound.play();
			/*$(this.$refs['modal'])
				.modal({keyboard: false, backdrop: 'static'})
				.modal('show');*/

			this.$root.socket.emit('live_call_ready', {
				conversation_id: this.$root.callConversation.id,
				user_id: this.$root.auth.id
			});

			this.action = 'outgoing';
			this.$root.socket.emit('live_call_incoming', {
				conversation_id: this.$root.callConversation.id,
				user_id: this.$root.auth.id
			});
			this.$root.callConversation = conversation;
			/*this.callTimeout = setTimeout(() => {
                if(!this.status) this.endCall();
            }, 15000);*/
		},

		incomingCall() {
			this.open = true;
			if (!this.$root.muted) this.notification_sound.play();
			this.isIncoming = true;
			$(this.$refs['modal'])
				.modal({ keyboard: false, backdrop: 'static' })
				.modal('show');
			this.action = 'incoming';
		},

		answerCall() {
			console.log('answerCall');
			this.isIncoming = false;
			this.$root.socket.emit('live_call_ready', {
				conversation_id: this.$root.callConversation.id,
				user_id: this.$root.auth.id
			});
			this.notification_sound.pause();
		},

		rejectCall() {
			this.$root.socket.emit('live_call_reject', {
				conversation_id: this.$root.callConversation.id
			});
			this.endCall(false);
		},

		endCall(emit = true) {
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
			if (this.$root.callConversation) {
				this.$root.socket.emit('live_call_end', { conversation_id: this.$root.callConversation.id, broadcast: emit });
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

		createConnectionRequest(user_id) {
			let connection = this.createPeerConnection();
			connection.remote_user_id = user_id;
			connection.polite = true;
			this.$root.socket.emit('live_call_connection_request', {
				source_connection: connection.id,
				target_user_id: user_id,
				source_user_id: this.$root.auth.id
			});
			this.status = 'ongoing';
		},

		createOffer(connection) {
			setTimeout(() => {
				if (connection.signalingState != 'stable') return;
				connection.createOffer(this.offerOptions).then(
					desc => {
						connection
							.setLocalDescription(desc)
							.then(() => {
								this.$root.socket.emit('live_call_offer', {
									desc,
									conversation_id: this.$root.callConversation.id,
									source_connection: connection.id,
									target_connection: connection.remote_connection
								});
							})
							.catch(e => console.error('createOffer 1: ', e));
					},
					e => {
						console.error('createOffer 2: ', e);
					}
				);
			}, 500);
		},

		async createAnswer(connection, desc) {
			if (desc.type == 'offer' && connection.signalingState != 'stable') {
				if (!connection.polite) return;
				await Promise.all([connection.setLocalDescription({ type: 'rollback' }), connection.setRemoteDescription(desc)]);
			} else {
				await connection.setRemoteDescription(desc);
			}

			if (desc.type == 'offer') {
				connection.createAnswer().then(
					async desc => {
						await connection.setLocalDescription(desc);
						this.$root.socket.emit('live_call_answer', {
							desc,
							conversation_id: this.$root.callConversation.id,
							source_connection: connection.id,
							target_connection: connection.remote_connection
						});
					},
					e => {
						console.log('createAnswer: ', e, connection);
					}
				);
			}
		},

		createPeerConnection() {
			let timestamp = dayjs().valueOf();
			let configuration = {
				iceServers: [
					{ urls: 'stun:stun.cocoach.com:5349' },
					{
						urls: 'turn:turn.cocoach.com:5349',
						credential: 'moonfang',
						username: 'cleidoscope'
					}
				]
			};
			let connection = new RTCPeerConnection(configuration);
			connection.id = `${timestamp}-${randomString({ length: 15 })}`;
			connection.ontrack = event => {
				console.log(event.streams[0]);
				if (!connection.remoteStream) {
					connection.remoteStream = event.streams[0];
				}
				connection.remoteStream.addTrack(event.track);

				let videoEl = document.querySelector(`#remote-${connection.id}`);
				if (videoEl) {
					videoEl.srcObject = connection.remoteStream;
				} else {
					let videoContainer = document.createElement('div');
					videoContainer.classList.add('flex-grow-1');
					videoContainer.classList.add('video-container');
					videoContainer.classList.add('position-relative');
					videoContainer.classList.add('remote-video');
					videoContainer.id = `remote-${connection.id}`;
					let videoEl = document.createElement('video');
					videoEl.autoplay = true;
					videoEl.playsinline = true;
					videoEl.controls = false;
					videoEl.classList.add('w-100');
					videoEl.classList.add('h-auto');
					videoEl.classList.add('position-absolute-center');
					videoEl.srcObject = connection.remoteStream;
					videoContainer.appendChild(videoEl);
					this.$refs['remoteStreams'].appendChild(videoContainer);
				}
			};
			connection.onicecandidate = ({ candidate }) => {
				if (candidate && this.$root.callConversation) {
					//console.log('emit: candidate');
					this.$root.socket.emit('live_call_candidate', {
						conversation_id: this.$root.callConversation.id,
						candidate: candidate,
						target_connection: connection.remote_connection
					});
				}
			};
			connection.oniceconnectionstatechange = () => {};
			connection.onnegotiationneeded = e => {
				this.createOffer(connection);
			};
			connection.onicecandidateerror = error => {
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
			if (streams) {
				if (!this.localStream) {
					this.localStream = streams;
					this.$refs['cameraPreview'].muted = true;
					this.$refs['cameraPreview'].volume = 0;
					this.$refs['cameraPreview'].srcObject = new MediaStream(this.localStream.getVideoTracks());
				}

				if (connection) {
					connection.localStream = this.localStream;
					let videoTrack = streams.getVideoTracks()[0];
					let audioTrack = streams.getAudioTracks()[0];
					audioTrack.enabled = !this.isMuted;
					videoTrack.enabled = !this.isVideoStopped;
					connection.videoSender = connection.addTrack(videoTrack, streams);
					connection.audioSender = connection.addTrack(audioTrack, streams);
				}
			}
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
				axios.post(`/dashboard/messages`, bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
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
				let stream = mixer.getMixedStream();

				let localVideo = this.$refs['cameraPreview'];
				let remoteVideo = this.$refs['remotePreview'];
				let canvas = this.$refs['preview'];
				canvas.width = $('.video-call').width();
				canvas.height = $('.video-call').height();
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
			this.localStream = await navigator.mediaDevices.getUserMedia({ video: true }).catch(e => {});
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
