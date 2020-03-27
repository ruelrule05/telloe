<template>
	<div class="snapturebox-video-recorder snapturebox-h-100 snapturebox-overflow-hidden">
		<div class="snapturebox-position-absolute-center snapturebox-text-center" v-if="!cameraReady">
			<div class="snapturebox-spinner-border snapturebox-text-primary" role="status"></div>
			<div class="snapturebox-mt-2">Loading camera..</div>
		</div>

		<div class="snapturebox-d-flex snapturebox-flex-column snapturebox-h-100">
			<div class="snapturebox-d-flex snapturebox-w-100" style="z-index: 10">
				<button type="button" class="snapturebox-btn snapturebox-text-white snapturebox-ml-auto snapturebox-shadow-none" @click="closeCamera();fileOutput = null;$parent.leftContent = '';">
					<close-icon height="36" width="36"></close-icon>
				</button>
			</div>

			<!-- video recorder live preview -->
			<div class="snapturebox-flex-grow-1 snapturebox-h-100 snapturebox-d-flex snapturebox-flex-column">
				<div class="snapturebox-video-container">
					<video :hidden="fileOutput || !cameraReady" ref="videoFile" class="snapturebox-w-100 snapturebox-h-100 snapturebox-bg-black"></video>
					<video v-if="fileOutput" class="snapturebox-w-100 snapturebox-h-100 snapturebox-bg-black" :src="fileOutput" style="outline: 0" playsinline controls></video>
				</div>

				<div class="snapturebox-flex-grow-1 snapturebox-w-100 snapturebox-position-relative snapturebox-text-center">
					<div v-if="fileOutput || cameraReady" class="snapturebox-position-absolute-center snapturebox-w-100">
						<div class="snapturebox-pb-2 snapturebox-d-inline-block snapturebox-font-weight-light">
							<div class="snapturebox-h6 snapturebox-mb-0">{{ (duration || isRecording) ? secondsToDuration(duration) : 'Click to start recording' }}</div>
							<div :class="{'snapturebox-opacity-0':!isRecording}" class="snapturebox-d-flex snapturebox-align-items-center">
								<span class="snapturebox-chat-status snapturebox-bg-danger">&nbsp;</span>&nbsp;
								<small class="snapturebox-text-secondary">Rec</small>
							</div>
						</div>
						<div class="snapturebox-d-flex snapturebox-justify-content-between snapturebox-align-items-center snapturebox-text-center">
							<div class="">dsds</div>
							<button v-if="isRecording" class="snapturebox-video-control snapturebox-video-pause" @click="pauseRecord"></button>
							<button v-else class="snapturebox-video-control snapturebox-video-record" @click="startRecord"></button>
							<div class="snapturebox">dsds</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="hasFlash" class="snapturebox-camera-flash"></div>

		<div v-if="fileOutput" class="snapturebox-position-absolute snapturebox-p-3 snapturebox-d-flex snapturebox-w-100" style="right: 0; bottom: 0">
			<button class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-light snapturebox-shadow-none snapturebox-float-right" @click="fileOutput = null">
				Retake
			</button>
			<button type="button" class="snapturebox-ml-auto snapturebox-btn snapturebox-btn-sm snapturebox-btn-primary snapturebox-shadow-none" @click="submit()">
				Add
			</button>
		</div>
	</div>
</template>

<script>
import RecordRTC from 'recordrtc';
import CameraIcon from '../../icons/camera.vue';
import CloseIcon from '../../icons/close.vue';
import PauseAltIcon from '../../icons/pause-alt';
export default {
	components: {CameraIcon, CloseIcon, PauseAltIcon},

	data: () => ({
		cameraReady: false,
		videoRecorder: null,
		fileOutput: null,
		preview: '',
		streams: [],
		streams: null,
		isRecording: false,
		shutter: null,
		hasFlash: false, //false
		blobs: [],
		duration: 0
	}),

	created() {
		this.shutter = new Audio(`${this.$root.API}/notifications/shutter.mp3`);
		this.shutter.load();
	},
	
	beforeDestroy() {
		this.videoRecorder.destroy();
	},

	mounted() {
		this.initCamera();
	},

	computed: {},

	methods: {
		secondsToDuration(seconds) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(11, 8);
			return timeString;
		},

		submit() {
			this.$emit('submit', this.fileOutput);
			this.$root.toggleModal('#addMediaModal', 'hide');
			this.closeCamera();
			this.fileOutput = null;
		},

		pauseRecord() {
			if(this.videoRecorder) {
				this.isRecording = false;
				this.videoRecorder.pauseRecording();
			    let blob = new File(this.blobs, 'video.webm', {
			        type: 'video/webm'
			    });
			    this.fileOutput = URL.createObjectURL(blob);
			}
		},

		startRecord() {
			if(this.videoRecorder) {
				this.isRecording = true;
				this.videoRecorder.startRecording();
			}
		},

		takePhoto() {
			this.shutter.currentTime = 0;
			this.shutter.play();
			this.hasFlash = true;
			setTimeout(() => {
				this.hasFlash = false;
			}, 200);
			// Source
			let canvas = document.createElement('canvas');
			let context = canvas.getContext('2d');
			canvas.width = this.$refs['videoFile'].videoWidth;
			canvas.height = this.$refs['videoFile'].videoHeight;
			context.drawImage(this.$refs['videoFile'], 0, 0, canvas.width, canvas.height);
			let srcUrl = canvas.toDataURL('image/jpeg');
			// Preview
			let canvasPreview = document.createElement('canvas');
			let contextPreview = canvasPreview.getContext('2d');
			canvasPreview.width = this.$refs['videoFile'].videoWidth / 2;
			canvasPreview.height = this.$refs['videoFile'].videoHeight / 2;
			contextPreview.drawImage(this.$refs['videoFile'], 0, 0, canvasPreview.width, canvasPreview.height);
			let previewUrl = canvasPreview.toDataURL('image/jpeg');

			this.fileOutput = {
				type: 'video',
				source: srcUrl,
				preview: previewUrl,
			};
		},

		closeCamera() {
			if (this.streams) {
				this.streams.getTracks().forEach(function(track) {
					track.stop();
				});
			}
			this.cameraReady = false;
			this.$refs['videoFile'].srcObject = null;
		},

		initCamera() {
			this.cameraReady = false;
			navigator.mediaDevices
				.getUserMedia({audio: true, video: true})
				.then((streams) => {
					this.streams = streams;
					this.videoRecorder = RecordRTC(streams, {
						type: 'video',
						timeSlice: 1000,
						onTimeStamp: (timestamp, timestamps) => {
			                let duration = (new Date().getTime() - timestamps[0]) / 1000;
			                if(duration < 0) return;
			                this.duration = duration;
			            },
						ondataavailable: (blob) => {
					        this.blobs.push(blob);
					    }
					});
    				this.videoRecorder.camera = streams;
					this.$refs['videoFile'].muted = true;
					this.$refs['videoFile'].volume = 0;
					this.$refs['videoFile'].srcObject = new MediaStream(streams.getVideoTracks());
					this.$refs['videoFile'].play();
					this.$refs['videoFile'].onplaying = () => {
						this.cameraReady = true;
					};
				})
				.catch(function(error) {
					alert('Unable to capture your camera.');
					console.error(error);
				});
		},
	},
};
</script>

<style scoped lang="scss">
.video-container{
	height: 450px;
	max-height: 70%;
}
.video-recorder {
	width: 480px;
}
.video-control{
	border: 0 !important;
	outline: 0 !important;
	width: 40px;
	height: 40px;
	border-radius: 50% !important;
	background-color: #4a4a4a;
	position: relative;
	&.video-record:before{
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40%;
		height: 40%;
		background-color: #fff;
		border-radius: 50%;
	}
	&.video-pause{
		&:before{
			content: '';
			position: absolute;
			top: 50%;
			left: 15px;
			transform: translateY(-50%);
			width: 2px;
			height: 35%;
			background-color: #fff;
			border-radius: 5px;
		}
		&:after{
			content: '';
			position: absolute;
			top: 50%;
			left: 23px;
			transform: translateY(-50%);
			width: 2px;
			height: 35%;
			background-color: #fff;
			border-radius: 5px;
		}
	}
}
</style>
