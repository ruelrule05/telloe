import dayjs from 'dayjs';
import WaveSurfer from 'wavesurfer.js';
import WaveSurferMicrophone from '../../../js/plugins/wavesurfer.microphone.min.js';
// import WaveSurferCursor from '../js/plugins/wavesurfer.cursor.min.js';
// import CameraIcon from '../icons/camera.vue';
import CloseIcon from '../../../icons/close.vue';
// import PauseAltIcon from '../icons/pause-alt';
import MicrophoneIcon from '../../../icons/microphone';
import PlayIcon from '../../../icons/play';
import PauseIcon from '../../../icons/pause';
export default {
	components: { CloseIcon, MicrophoneIcon, PlayIcon, PauseIcon },

	data: () => ({
		ready: false,
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
		this.initMic();
		this.wavesurfer = WaveSurfer.create({
			container: document.querySelector('#wavesurfer'),
			//backend: 'MediaElement',
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
		this.wavesurfer.on('finish', () => {
			this.playerStatus = 'paused';
			this.wavesurfer.seekTo(0);
		});
		this.ready = true;
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
			if (this.audioRecorder.state != 'inactive') {
				this.audioRecorder.stop();
			}
		},

		submit() {
			if (this.blobs.length > 0) {
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
