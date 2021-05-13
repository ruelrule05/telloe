<template>
	<div class="modal fade" tabindex="-1" role="dialog" ref="audioRecorderModal">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<div class="h-100">
						<div class="audio-recorder overflow-hidden">
							<div class="d-flex flex-column h-100">
								<div class="d-flex w-100">
									<button type="button" class="btn ml-auto shadow-none" data-dismiss="modal" @click="close">
										<close-icon height="36" width="36"></close-icon>
									</button>
								</div>

								<div class="flex-grow-1 h-100 d-flex flex-column position-relative text-center">
									<div v-if="!hasRecorded" class="text-center position-absolute-center w-100">
										<div class="h6 mb-0">Click to start recording</div>
									</div>

									<div v-if="duration || recorderStatus">
										<div class="pt-4 d-inline-block text-center font-weight-light">
											<div class="h2 mb-0">{{ secondsToDuration(duration) }}</div>
											<div class="d-flex align-items-center">
												<template v-if="recorderStatus == 'recording'">
													<span class="chat-status bg-danger">&nbsp;</span>&nbsp;
													<small class="text-gray">Rec</small>
												</template>
												<template v-else-if="recorderStatus == 'paused'">
													<span class="chat-status bg-gray">&nbsp;</span>&nbsp;
													<small class="text-gray">Paused</small>
												</template>
											</div>
										</div>
									</div>

									<!-- wavesurfer -->
									<div class="position-absolute-center w-100 wavesurfer-container">
										<div id="wavesurfer"></div>
										<div v-if="hasRecorded && recorderStatus == 'paused'" class="player-control position-absolute-center">
											<button class="btn btn-sm btn-white border-0 badge-pill py-2" @click="togglePlayer">
												<play-icon width="15" height="15" v-if="playerStatus == 'paused'"></play-icon>
												<pause-icon width="15" height="15" v-else-if="playerStatus == 'playing'"></pause-icon>
											</button>
										</div>
									</div>
								</div>

								<!-- Controls -->
								<div v-if="micReady" class="flex-fill w-100 text-center px-5 pb-5">
									<div class="d-flex align-items-center text-center">
										<div class="w-25">
											<button v-if="hasRecorded" @click="close" data-dismiss="modal" class="btn font-weight-bold mr-auto">Cancel</button>
										</div>

										<div class="flex-grow-1">
											<button v-if="recorderStatus == 'recording'" class="audio-control audio-pause" @click="pauseRecord"></button>
											<button v-else class="audio-control audio-record" @click="startRecord">
												<microphone-icon fill="white"></microphone-icon>
											</button>
										</div>

										<div class="w-25">
											<button @click="submit" v-if="hasRecorded && recorderStatus == 'paused'" class="btn font-weight-bold ml-auto">Send</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import WaveSurfer from 'wavesurfer.js';
import WaveSurferMicrophone from '../js/plugins/wavesurfer.microphone.min.js';
// import WaveSurferCursor from '../js/plugins/wavesurfer.cursor.min.js';
// import CameraIcon from '../icons/camera.vue';
import CloseIcon from '../icons/close.vue';
// import PauseAltIcon from '../icons/pause-alt';
import MicrophoneIcon from '../icons/microphone';
import PlayIcon from '../icons/play';
import PauseIcon from '../icons/pause';
export default {
	components: { CloseIcon, MicrophoneIcon, PlayIcon, PauseIcon },

	data: () => ({
		audioRecorder: null,
		streams: null,
		blobs: [],
		recorderStatus: '',
		playerStatus: 'paused',
		micReady: false,
		duration: 0,
		wavesurfer: null,
		hasRecorded: false,
		timer: null
	}),

	created() {},

	beforeDestroy() {
		if (this.streams) {
			this.streams.getTracks().forEach(function(track) {
				track.stop();
			});
		}
	},

	mounted() {
		$(this.$refs['audioRecorderModal']).modal('show');
		this.initMic();
		this.wavesurfer = WaveSurfer.create({
			container: document.querySelector('#wavesurfer'),
			//backend: 'MediaElement',
			height: 200,
			barWidth: 3,
			barHeight: 1,
			barRadius: 3,
			interact: true,
			cursorWidth: 1,
			cursorColor: 'transparent',
			hideScrollbar: true,
			plugins: [WaveSurferMicrophone.create()]
		});
		this.wavesurfer.on('finish', () => {
			this.playerStatus = 'paused';
			this.wavesurfer.seekTo(0);
		});
		/*this.wavesurfer.on('ready', (progress) => {
			if(this.recorderStatus == 'paused') {
				this.wavesurfer.play();
			}
		});
		this.wavesurfer.on('seek', (progress) => {
			if(this.recorderStatus == 'paused') {
				let audioDuration = this.wavesurfer.getDuration();
				let playTo = audioDuration * progress;
				this.wavesurfer.play(playTo);
			}
		});*/
	},

	computed: {},

	methods: {
		close() {
			setTimeout(() => {
				this.$emit('close');
			}, 150);
		},

		reset() {
			this.blobs = [];
			this.recorderStatus = '';
			this.playerStatus = 'paused';
			this.duration = 0;
			this.hasRecorded = false;
			this.timer = null;
			this.wavesurfer.setCursorColor('transparent');
			this.wavesurfer.empty();
			this.audioRecorder.stop();
		},

		submit() {
			if (this.blobs.length > 0) {
				$(this.$refs['audioRecorderModal']).modal('hide');
				setTimeout(() => {
					const timestamp = dayjs().valueOf();
					let file = new File(this.blobs, timestamp, {
						type: this.blobs[0].type
					});
					let audio = {
						source: file,
						duration: this.secondsToDuration(this.wavesurfer.getDuration(), 14, 5)
					};
					this.$emit('submit', audio);
					this.reset();
				}, 150);
			}
		},

		togglePlayer() {
			switch (this.playerStatus) {
				case 'paused':
					this.playerStatus = 'playing';
					this.wavesurfer.play();
					break;

				case 'playing':
					this.playerStatus = 'paused';
					this.wavesurfer.pause();
					break;
			}
		},

		secondsToDuration(seconds, limit = 11, end = 8) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(limit, end);
			return timeString;
		},

		pauseRecord() {
			if (this.audioRecorder) {
				clearInterval(this.timer);
				this.recorderStatus = 'paused';
				this.audioRecorder.requestData();
				this.audioRecorder.pause();
				let blob = new Blob(this.blobs, {
					type: 'audio/mp3'
				});
				this.wavesurfer.microphone.stop();
				this.wavesurfer.setCursorColor('#aaa');
				this.wavesurfer.setProgressColor('#6e82ea');
				this.wavesurfer.setWaveColor('#b5bce5');
				this.wavesurfer.loadBlob(blob);
			}
		},

		startRecord() {
			if (this.audioRecorder) {
				this.timer = setInterval(() => {
					this.duration += 0.01;
				}, 10);
				if (this.hasRecorded) {
					this.audioRecorder.resume();
				} else {
					this.audioRecorder.start(30);
				}
				this.hasRecorded = true;
				this.recorderStatus = 'recording';
				this.wavesurfer.setCursorColor('transparent');
				this.wavesurfer.setProgressColor('#6e82ea');
				this.wavesurfer.setWaveColor('#6e82ea');
				this.wavesurfer.microphone.start(this.streams);
			}
		},

		initMic() {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then(streams => {
					this.streams = streams;

					this.audioRecorder = new MediaRecorder(streams);
					this.audioRecorder.ondataavailable = e => this.blobs.push(e.data);
					this.micReady = true;
					/*this.$refs['audioFile'].muted = true;
					this.$refs['audioFile'].volume = 0;
					this.$refs['audioFile'].srcObject = new MediaStream(streams.getaudioTracks());
					this.$refs['audioFile'].play();
					this.$refs['audioFile'].onplaying = () => {
						this.cameraReady = true;
					};*/
				})
				.catch(function(error) {
					alert('Unable to detect your microphone.');
					console.error(error);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.wavesurfer-container {
	.btn {
		opacity: 0;
	}
	&:hover {
		.btn {
			opacity: 1;
		}
	}
}
.audio-recorder {
	height: 500px;
}
.player-control {
	z-index: 10;
	button {
		line-height: 1 !important;
		padding: 15px !important;
		position: relative;
		svg {
			position: absolute;
			line-height: 1 !important;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
.audio-control {
	border: 0 !important;
	outline: 0 !important;
	width: 50px;
	height: 50px;
	border-radius: 50% !important;
	background-color: #4a4a4a;
	position: relative;
	vertical-align: top;
	&.audio-pause {
		&:before {
			content: '';
			position: absolute;
			top: 50%;
			left: 19px;
			transform: translateY(-50%);
			width: 2px;
			height: 35%;
			background-color: #fff;
			border-radius: 5px;
		}
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			left: 27px;
			transform: translateY(-50%);
			width: 2px;
			height: 35%;
			background-color: #fff;
			border-radius: 5px;
		}
	}
}
</style>
