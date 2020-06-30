<template>
	<div class="modal fade" tabindex="-1" role="dialog" ref="screenRecorderModal">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
				<div class="d-flex w-100" style="z-index: 10">
					<button type="button" class="btn ml-auto shadow-none" @click="close">
						<close-icon height="36" width="36"></close-icon>
					</button>
				</div>
                <div class="modal-body pt-0">
					<div class="screen-recorder w-100 overflow-hidden bg-white">
						<div class="d-flex flex-column h-100">

							<!-- video recorder live preview -->
							<div class="flex-grow-1 h-100 d-flex flex-column">
								<div class="video-container position-relative">
									<video ref="videoPreview" :hidden="!cameraReady || isRecording || !hasRecorded" class="w-100 h-100 bg-black position-absolute video-preview outline-0" playsinline controls></video>
									<video :hidden="!cameraReady" ref="videoFile" class="w-100 h-100 bg-black"></video>
								</div>

								<div class="flex-grow-1 w-100 position-relative text-center">
									<div v-if="fileOutput || cameraReady" class="position-absolute-center w-100">
										<div class="pb-2 d-inline-block font-weight-light">
											<div class="h6 mb-0">{{ (duration || isRecording) ? secondsToDuration(duration) : 'Click to start recording' }}</div>
											<div :class="{'opacity-0':!isRecording}" class="d-flex align-items-center">
												<span class="chat-status bg-danger">&nbsp;</span>&nbsp;
												<small class="text-secondary">Rec</small>
											</div>
										</div>

										<div class="d-flex justify-content-between align-items-center text-center">
											<div class="w-25">
												<button v-if="hasRecorded" @click="close" class="btn font-weight-bold mr-auto">Cancel</button>
											</div>
											<div class="flex-grow-1">
												<button v-if="isRecording" class="video-control video-pause" @click="pauseRecord"></button>
												<button v-else class="video-control video-record" @click="startRecord"></button>
											</div>
											<div class="w-25">
												<button @click="submit" v-if="hasRecorded && recorderStatus == 'paused'" class="btn font-weight-bold ml-auto">Send</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div v-if="hasFlash" class="camera-flash"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import CameraIcon from '../assets/icons/camera.vue';
import CloseIcon from '../assets/icons/close.vue';
import PauseAltIcon from '../assets/icons/pause-alt';
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
		if (this.streams) {
			this.streams.getTracks().forEach(function(track) {
				track.stop();
			});
		}
	},


	mounted() {
		this.initDevices();
	},

	computed: {},

	methods: {
		close() {
			$(this.$refs['screenRecorderModal']).modal('hide');
			setTimeout(() => {
				this.$emit('close');
			}, 150);
		},

		submit() {
			this.videoRecorder.stop();
			if(this.blobs.length > 0) {
                const timestamp = dayjs().valueOf();
			    let file = new File(this.blobs, timestamp, {
			        type: this.blobs[0].type
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
					    	timestamp: timestamp,
               				created_at: dayjs(timestamp).format('hh:mm A'),
					    };
	                    setTimeout(() => {
	                        let canvas = document.createElement("canvas");
	                        canvas.width = this.$refs['videoPreview'].videoWidth / 2;
	                        canvas.height = this.$refs['videoPreview'].videoHeight / 2;
	                        canvas.getContext('2d').drawImage(this.$refs['videoPreview'], 0, 0, canvas.width, canvas.height);
	                        canvas.toBlob((blob) => {
				  				let reader = new FileReader();
							    reader.onload = () => {
		                            video.preview = reader.result;
					  				this.$emit('submit', video);
			  						this.close();
							    };
							    reader.readAsDataURL(blob);
	                        });
	                   });
			        }
			    });
		  	}
		},

		secondsToDuration(seconds, limit = 11, end = 8) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(limit, end);
			return timeString;
		},

		pauseRecord() {
			if(this.videoRecorder) {
				clearInterval(this.timer);
				this.recorderStatus = 'paused';
				this.isRecording = false;
				this.videoRecorder.pause();
				this.videoRecorder.requestData();
		    	let blob = new Blob(this.blobs);
		    	this.$refs['videoPreview'].src = URL.createObjectURL(blob);
		    	this.$refs['videoPreview'].load();
			}
		},

		startRecord() {
			if(!this.screenCapture) {
				this.initDevices();
				return;
			}

			if(this.videoRecorder) {
				this.timer = setInterval(() => {
					this.duration += 0.01;
				}, 10)
				this.isRecording = true;
				this.recorderStatus = 'recording';
				if(this.hasRecorded) {
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
			let audioStreams = await navigator.mediaDevices.getUserMedia({audio: true}).catch((e) => {this.close();});
			if(!audioStreams) {
				this.close();
				return;
			}
			audioStreams.getTracks().forEach(function(track) {
				finalStream.addTrack(track);
			});


			let displayStreams = await navigator.mediaDevices.getDisplayMedia({video: true}).catch((e) => {this.close();});
			if(!displayStreams) {
				this.close();
				return;
			}
			displayStreams.getTracks().forEach(function(track) {
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
			this.videoRecorder = new MediaRecorder(finalStream);
			this.videoRecorder.ondataavailable = e => this.blobs.push(e.data);
			this.videoRecorder.camera = finalStream;
			this.$refs['videoFile'].muted = true;
			this.$refs['videoFile'].volume = 0;
			this.$refs['videoFile'].srcObject = finalStream;
			this.$refs['videoFile'].play();
			this.$refs['videoFile'].onplaying = () => {
			};

			$(this.$refs['screenRecorderModal']).modal({backdrop: 'static', keyboard: false}).modal('show');
		},
	},
};
</script>

<style scoped lang="scss">
@import "../sass/variables.scss";
.screen-recorder{
	height: 380px;
}
.video-container{
	max-height: 70%;
}
.video-preview{
	z-index: 2;
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
