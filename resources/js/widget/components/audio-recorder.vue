<template>
	<div class="snapturebox-audio-recorder snapturebox-h-100 snapturebox-overflow-hidden">
		<div class="snapturebox-d-flex snapturebox-flex-column snapturebox-h-100">
			<div class="snapturebox-d-flex snapturebox-w-100">
				<button type="button" class="snapturebox-btn snapturebox-text-white snapturebox-ml-auto snapturebox-shadow-none" @click="$parent.leftContent = '';">
					<close-icon height="36" width="36"></close-icon>
				</button>
			</div>

			<div class="snapturebox-flex-grow-1 snapturebox-h-100 snapturebox-d-flex snapturebox-flex-column snapturebox-position-relative snapturebox-text-center">

				<div v-if="!hasRecorded" class="snapturebox-text-center snapturebox-position-absolute-center snapturebox-w-100">
					<div class="snapturebox-h6 snapturebox-mb-0">Click to start recording</div>
				</div>

				<div v-if="duration || recorderStatus">
					<div class="snapturebox-pt-4 snapturebox-d-inline-block snapturebox-text-center snapturebox-font-weight-light">
						<div class="snapturebox-h2 snapturebox-mb-0">{{ secondsToDuration(duration) }}</div>
						<div class="snapturebox-d-flex snapturebox-align-items-center">
							<template v-if="recorderStatus == 'recording'">
								<span class="snapturebox-chat-status snapturebox-bg-danger">&nbsp;</span>&nbsp;
								<small class="snapturebox-text-secondary">Rec</small>
							</template>
							<template v-else-if="recorderStatus == 'paused'">
								<span class="snapturebox-chat-status snapturebox-bg-gray">&nbsp;</span>&nbsp;
								<small class="snapturebox-text-secondary">Paused</small>
							</template>
						</div>
					</div>
				</div>

				<!-- wavesurfer -->
				<div class="snapturebox-position-absolute-center snapturebox-w-100 snapturebox-wavesurfer-container">
					<div id="wavesurfer"></div>
					<div v-if="hasRecorded && recorderStatus == 'paused'" class="snapturebox-player-control snapturebox-position-absolute-center">
						<button class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-white snapturebox-border-0 snapturebox-badge-pill snapturebox-py-2" @click="togglePlayer">
							<play-icon width="15" height="15" v-if="playerStatus == 'paused'"></play-icon>
							<pause-icon width="15" height="15" v-else-if="playerStatus == 'playing'"></pause-icon>
						</button>
					</div>
				</div>
			</div>

			

			<!-- Controls -->
			<div v-if="micReady" class="snapturebox-flex-fill snapturebox-w-100 snapturebox-text-center snapturebox-px-5 snapturebox-pb-5">
				<div class="snapturebox-d-flex snapturebox-align-items-center snapturebox-text-center">
					<div class="snapturebox-w-25">
						<button v-if="hasRecorded" @click="$parent.leftContent = '';" class="snapturebox-btn snapturebox-font-weight-bold snapturebox-mr-auto">Cancel</button>
					</div>

					<div class="snapturebox-flex-grow-1">
						<button v-if="recorderStatus == 'recording'" class="snapturebox-audio-control snapturebox-audio-pause" @click="pauseRecord"></button>
						<button v-else class="snapturebox-audio-control snapturebox-audio-record" @click="startRecord">
							<microphone-icon fill="white"></microphone-icon>
						</button>
					</div>

					<div class="snapturebox-w-25">
						<button @click="submit" v-if="hasRecorded && recorderStatus == 'paused'" class="snapturebox-btn snapturebox-font-weight-bold snapturebox-ml-auto">Send</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import WaveSurfer from 'wavesurfer.js';
import WaveSurferMicrophone from '../../plugins/wavesurfer.microphone.min.js';
import WaveSurferCursor from '../../plugins/wavesurfer.cursor.min.js';
import CameraIcon from '../../icons/camera.vue';
import CloseIcon from '../../icons/close.vue';
import PauseAltIcon from '../../icons/pause-alt';
import MicrophoneIcon from '../../icons/microphone';
import PlayIcon from '../../icons/play';
import PauseIcon from '../../icons/pause';
export default {
	components: {CameraIcon, CloseIcon, PauseAltIcon, MicrophoneIcon, PlayIcon, PauseIcon},

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

	created() {
	},

	beforeDestroy() {
		if (this.streams) {
			this.streams.getTracks().forEach(function(track) {
				track.stop();
			});
		}
	},

	mounted() {
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
		    plugins: [
			    WaveSurferMicrophone.create(),
			]
		});
		this.wavesurfer.on('finish', (progress) => {
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
			if(this.blobs.length > 0) {
                const timestamp = dayjs().valueOf();
			    let file = new File(this.blobs, timestamp, {
			        type: this.blobs[0].type
			    });
			    let user = this.$root.auth || {id: this.$root.guest_cookie, initials: 'G'};
			    let audio = {
			    	user: user,
			    	source: file,
					type: 'audio',
			    	timestamp: timestamp,
					created_at: dayjs(timestamp).format('hh:mm A'),
					metadata: {duration: this.secondsToDuration(this.wavesurfer.getDuration(), 14, 5)}
			    };
			  	this.$emit('submit', audio);
			  	this.reset();
		  	}
		},

		togglePlayer() {
			switch(this.playerStatus) {
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
			if(this.audioRecorder) {
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
			if(this.audioRecorder) {
				this.timer = setInterval(() => {
					this.duration += 0.01;
				}, 10)
				if(this.hasRecorded) {
					this.audioRecorder.resume();
				} else {
					this.audioRecorder.start(30);
				}
				this.hasRecorded = true;
				this.recorderStatus = 'recording';
				this.wavesurfer.setCursorColor('transparent');
				this.wavesurfer.setProgressColor('#6e82ea');
				this.wavesurfer.setWaveColor('#6e82ea');
				this.wavesurfer.microphone.start();
			}
		},

		initMic() {
			navigator.mediaDevices
				.getUserMedia({audio: true})
				.then((streams) => {
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
		},
	},
};
</script>

<style scoped lang="scss">
.wavesurfer-container {
	.btn {
		opacity: 0;
	}
	&:hover{
		.btn {
			opacity: 1;
		}
	}
}
.audio-recorder {
	width: 380px;
}
.player-control{
	z-index: 10;
	button {
		line-height: 1 !important;
		padding: 15px !important;
		position: relative;
		svg{
			position: absolute;
		line-height: 1 !important;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
.audio-control{
	border: 0 !important;
	outline: 0 !important;
	width: 50px;
	height: 50px;
	border-radius: 50% !important;
	background-color: #4a4a4a;
	position: relative;
	vertical-align: top;
	&.audio-pause{
		&:before{
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
		&:after{
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
