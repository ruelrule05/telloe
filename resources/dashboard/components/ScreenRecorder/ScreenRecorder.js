require('../../../js/bootstrap');
import dayjs from 'dayjs';
import PlainDraggable from '../../../js/plugins/plain-draggable.min';
import Tooltip from '../../../js/directives/tooltip';
import CameraIcon from '../../../icons/camera.vue';
import CloseIcon from '../../../icons/close.vue';
import PauseAltIcon from '../../../icons/pause-alt';
import CommentIcon from '../../../icons/comment';
export default {
	components: { CameraIcon, CloseIcon, PauseAltIcon, CommentIcon },

	directives: { Tooltip },

	data: () => ({
		cameraReady: false,
		videoRecorder: null,
		fileOutput: null,
		preview: '',
		streams: [],
		isRecording: false,
		shutter: null,
		hasFlash: false, //false
		blobs: [],
		duration: 0,
		timer: null,
		hasRecorded: false,
		recorderStatus: '',
		screenCapture: false
	}),

	created() {
		this.shutter = new Audio(`${this.$root.API}/notifications/shutter.mp3`);
		this.shutter.load();
	},

	beforeDestroy() {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
			if (stream) {
				if (this.streams.getTracks) {
					this.streams.getTracks().forEach(function (track) {
						track.stop();
					});
				} else {
					this.$toast.error('No input devices found.');
				}
			}
		});
	},

	mounted() {
		new PlainDraggable(document.querySelector('.screen-recorder'));
	},

	computed: {},

	methods: {
		goToConversation() {
			let target = `/dashboard/conversations/${this.$root.screenRecorder.conversation_id}`;
			if (this.$route.path != target) this.$router.push(target);
		},

		close() {
			this.$emit('close');
			this.$root.screenRecorder.conversation_id = null;
			this.$root.screenRecorder.data = null;
		},

		async submit() {
			this.videoRecorder.stop();

			return new Promise(resolve => {
				if (this.blobs.length > 0) {
					const timestamp = dayjs().valueOf();
					let file = new File(this.blobs, timestamp, {
						type: this.blobs[0].type
					});

					//let extension = mime.extension(file.type);
					let extension = 'mp4';
					file = new File([file], `${timestamp}.${extension}`, {
						type: file.type
					});

					let duration = '';
					this.$refs['videoPreview'].play().then(() => {
						this.$refs['videoPreview'].currentTime = 10e99;
						this.$refs['videoPreview'].onseeked = () => {
							this.$refs['videoPreview'].currentTime = 0;
							this.$refs['videoPreview'].pause();
							this.$refs['videoPreview'].onseeked = null;
							duration = this.$refs['videoPreview'].duration;
							let video = {
								source: file,
								duration: this.secondsToDuration(duration, 14, 5),
								type: 'video',
								timestamp: `${timestamp}.${extension}`,
								created_at: dayjs(timestamp).format('hh:mm A')
							};
							setTimeout(() => {
								let canvas = document.createElement('canvas');
								canvas.width = this.$refs['videoPreview'].videoWidth;
								canvas.height = this.$refs['videoPreview'].videoHeight;
								canvas.getContext('2d').drawImage(this.$refs['videoPreview'], 0, 0, canvas.width, canvas.height);
								canvas.toBlob(blob => {
									let reader = new FileReader();
									reader.onload = () => {
										video.preview = reader.result;
										resolve(video);
										this.$emit('submit', video);
										this.close();
									};
									reader.readAsDataURL(blob);
								});
							});
						};
					});
				}
			});
		},

		secondsToDuration(seconds, limit = 11, end = 8) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(limit, end);
			return timeString;
		},

		pauseRecord() {
			if (this.videoRecorder) {
				clearInterval(this.timer);
				this.$root.screenRecorder.status = 'paused';
				this.recorderStatus = 'paused';
				this.isRecording = false;
				this.videoRecorder.pause();
				this.videoRecorder.requestData();
				let blob = new Blob(this.blobs);
				this.$refs['videoPreview'].src = URL.createObjectURL(blob);
				this.$refs['videoPreview'].load();
				this.$root.screenRecorder.data = this.blobs;
			}
		},

		startRecord() {
			if (!this.screenCapture) {
				this.initDevices();
				return;
			}

			this.recorderStatus = 'recording';
			this.$root.screenRecorder.status = 'recording';
			if (this.videoRecorder) {
				this.timer = setInterval(() => {
					this.duration += 0.01;
				}, 10);
				this.isRecording = true;
				if (this.hasRecorded) {
					this.videoRecorder.resume();
				} else {
					this.videoRecorder.start(30);
				}
				this.hasRecorded = true;
			}
		},

		async initDevices() {
			this.cameraReady = false;
			let finalStream = new MediaStream();
			let audioStreams = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {
				this.close();
			});
			if (!audioStreams) {
				this.close();
				return;
			}
			audioStreams.getTracks().forEach(function (track) {
				finalStream.addTrack(track);
			});

			let displayStreams = await navigator.mediaDevices.getDisplayMedia({ video: true }).catch(() => {
				this.close();
			});
			if (!displayStreams) {
				this.close();
				return;
			}
			displayStreams.getTracks().forEach(function (track) {
				finalStream.addTrack(track);
			});
			displayStreams.getTracks()[0].addEventListener('ended', () => {
				this.close();
				/*if(this.recorderStatus == 'recording') this.pauseRecord();
				this.screenCapture = false;
				alert('Screen sharing has been stopped');*/
			});

			this.cameraReady = true;
			this.screenCapture = true;
			this.streams = finalStream;
			this.videoRecorder = new MediaRecorder(finalStream, { mimeType: 'video/webm' });
			this.videoRecorder.ondataavailable = e => this.blobs.push(e.data);
			this.videoRecorder.camera = finalStream;
			this.$refs['videoFile'].muted = true;
			this.$refs['videoFile'].volume = 0;
			this.$refs['videoFile'].srcObject = finalStream;
			this.$refs['videoFile'].play();
			this.$refs['videoFile'].onplaying = () => {};
		}
	}
};
