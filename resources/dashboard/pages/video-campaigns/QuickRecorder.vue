<template>
	<div id="recorder">
		<div class="flex items-center justify-between p-3">
			<div class="uppercase font-serif text-xs font-semibold">Record Camera</div>
			<div>
				<button class="btn btn-sm btn-outline-primary" type="button" @click="$emit('cancel'); reset();"><span>CANCEL</span></button>
			</div>
		</div>

		<div class="flex-grow overflow-hidden">
			<div class="flex flex-col h-full overflow-hidden">
				<div class="flex-grow relative">
					<div class="absolute-center w-full h-full">
						<video ref="videoPreview" class="w-full h-full bg-black" width="1280" height="720" style="display: none" playsinline></video>
						<div ref="canvasBackground" id="canvasBackground" class="bg-black w-full h-full relative">
							<canvas class="h-full mx-auto" style="aspect-ratio:1.7777777777777777" id="videoCanvas" width="1280" height="720"></canvas>
						</div>
					</div>
				</div>
				<div class="text-center px-4 py-2">
					<div class="inline-flex items-center">
						<svg v-if="!isRecording" @click="startRecording" class="inline-block cursor-pointer" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="48" height="48" rx="24" fill="#E33171" />
							<rect x="16" y="16" width="16" height="16" fill="white" />
						</svg>
						<svg v-else @click="stopRecording" class="inline-block cursor-pointer" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#E33171" />
							<rect x="16.5" y="16.5" width="15" height="15" fill="#E33171" stroke="#E33171" />
						</svg>
						<div class="w-16 pl-2 text-left">
							{{ secondsToDuration(recordDuration) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions } from 'vuex';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
export default {
	data: () => ({
		isRecording: false,
		recordDuration: 0,
		videoRecorder: null,
		blobs: [],
		recordInterval: null,
		cameraStreams: null,
		gif: null,
		thumbnail: null,
		source: null,
		duration: 0,
		S3Source: null,
		uploadComplete: 0,
		S3Gif: null,
		S3Thumbnail: null,
		videoCanvas: null,
		canvaStream: null,
		canvasCtx: null,
		selfieSegmentation: null,
		backgroundImg: null,
		videoSettings: [],
		cameraMode: 1
	}),

	async mounted() {
		await this.getVideoSettings();

		this.videoElement = this.$refs['videoPreview'];
		this.videoCanvas = document.getElementById('videoCanvas');
		this.canvasCtx = this.videoCanvas.getContext("2d");

		this.backgroundImg = new Image()
		this.backgroundImg.src = this.videoSettings.virtual_background_image
		this.backgroundImg.setAttribute('crossOrigin', 'Anonymous')

		if( this.videoSettings.use_background_image ) {
			this.cameraMode=2
			this.$refs.videoPreview.style.display = "none";
			this.videoCanvas.style.display = "block";
			this.$refs.canvasBackground.style.display = "block";
		} else {
			this.cameraMode=1
			this.$refs.videoPreview.style.display = "block";
			this.videoCanvas.style.display = "none";
			this.$refs.canvasBackground.style.display = "none";
		}
	},

	created() {
		(async () => {

			this.cameraStreams = await navigator.mediaDevices.getUserMedia({ 
				video: {
					width: { min: 1024, ideal: 1280, max: 1920 },
					height: { min: 576, ideal: 720, max: 1080 }
				},
				audio: true
			}).catch(() => {});

			if (!this.cameraStreams) {
				this.$toast.error('No camera detected.');
				return;
			}

			if( this.cameraMode == 2 && this.videoSettings.use_background_image ) {
				this.videoElement.onloadeddata = () => {
					this.init();
					this.sendToMediaPipe();
				};
			}

			this.$refs.videoPreview.srcObject = this.cameraStreams;
			this.$refs.videoPreview.muted = true;
			this.$refs.videoPreview.volume = 0;
			try {
				this.$refs.videoPreview.play();
			} catch (e) {
				//
			}

			if( this.cameraMode == 2 ) {
				const stream = this.videoCanvas.captureStream(25);
				const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
				if (audioStream) {
					audioStream.getTracks().forEach(function (track) {
						stream.addTrack(track);
					});
				}
				this.canvaStream = stream;
				this.videoRecorder = new MediaRecorder(this.canvaStream, {
					mimeType: 'video/webm;codecs=vp9'
				});
				this.videoRecorder.ondataavailable = e => {
					if(e.data.size > 0){
						if (this.isRecording) {
							this.blobs.push(e.data);
						}
					}
				};
				
			} else {
				this.videoRecorder = new MediaRecorder(this.cameraStreams, { mimeType: 'video/webm', videoBitsPerSecond: 2500000 });
				this.videoRecorder.camera = this.cameraStreams;
				this.videoRecorder.ondataavailable = e => {
					if (this.isRecording) {
						this.blobs.push(e.data);
					}
				};
			}
			
		})();
	},

	methods: {
		...mapActions({
			storeUserVideo: 'user_videos/store'
		}),

		startRecording() {
			if (this.videoRecorder) {
				this.isRecording = true;
				if (this.blobs.length) {
					this.videoRecorder.resume();
				} else {
					this.videoRecorder.start(30);
					this.recordInterval = setInterval(() => {
						if (this.isRecording) {
							this.recordDuration++;
						}
					}, 1000);
				}
			}
		},
		async stopRecording() {
			this.videoRecorder.pause();
			const timestamp = dayjs().valueOf();
			let source = new File(this.blobs, timestamp, {
				type: this.blobs[0].type
			});
			let videoWidth = this.$refs.videoPreview.videoWidth;
			let videoHeight = this.$refs.videoPreview.videoHeight;

			let thumbnail = null;
			this.$refs.videoPreview.currentTime = 0;
			this.$refs.videoPreview.play();
			const canvas = document.createElement('canvas');
			canvas.width = 500;
			canvas.height = (canvas.width / this.$refs.videoPreview.videoWidth) * this.$refs.videoPreview.videoHeight;
			const ctx = canvas.getContext('2d');
			if( this.cameraMode == 2 ) {
				ctx.drawImage(this.videoCanvas, 0, 0, canvas.width, canvas.height);
			} else {
				ctx.drawImage(this.$refs.videoPreview, 0, 0, canvas.width, canvas.height);
			}
			thumbnail = canvas.toDataURL('image/png');
			this.$emit('record', { source: source, thumbnail: thumbnail, duration: this.blobs.length * 30 * 2, dimensions: { width: videoWidth, height: videoHeight } });

			if (this.cameraStreams) {
				this.cameraStreams.getTracks().forEach(function (track) {
					track.stop();
				});
			}
			this.cameraStreams = null;
			this.canvaStream = null;
			
			if(this.selfieSegmentation) {
				this.selfieSegmentation.close();
				this.selfieSegmentation = null;
			}
		},

		dataURLtoFile(dataurl, filename) {
			var arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);

			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}

			return new File([u8arr], filename, { type: mime });
		},

		secondsToDuration(seconds, limit = 14, end = 5) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(limit, end);
			return timeString;
		},

		async getVideoSettings() {
			let response = await window.axios.get('/video-settings')
			this.videoSettings = response.data;
			return
		},

		init() {
			this.selfieSegmentation = new SelfieSegmentation({
				locateFile: (file) =>
				`../../../models/${file}`,
			});

			this.selfieSegmentation.setOptions({
				modelSelection: 1,
				selfieMode: false,
			});

			this.selfieSegmentation.onResults(this.onResults);
		},

		async sendToMediaPipe() {
			try {
				await this.selfieSegmentation.send({ image: this.videoElement });
				requestAnimationFrame(this.sendToMediaPipe);
			} catch (e) {
				//
			}
		},

		onResults(results) {
			this.canvasCtx.save();
			this.canvasCtx.clearRect( 0, 0, this.videoCanvas.width, this.videoCanvas.height );
			this.canvasCtx.drawImage( results.segmentationMask, 0, 0, this.videoCanvas.width, this.videoCanvas.height );
			this.canvasCtx.globalCompositeOperation = "source-out";
			this.canvasCtx.drawImage( this.backgroundImg, 0, 0, this.videoCanvas.width, this.videoCanvas.height);
			this.canvasCtx.globalCompositeOperation = "destination-atop";
			this.canvasCtx.drawImage( results.image, 0, 0, this.videoCanvas.width, this.videoCanvas.height );
			this.canvasCtx.restore();
		},

		reset() {
			if (this.cameraStreams) {
				this.cameraStreams.getTracks().forEach(function (track) {
					track.stop();
				});
			}
			this.cameraStreams = null;
			this.canvaStream = null;

			if(this.selfieSegmentation) {
				this.selfieSegmentation.close();
				this.selfieSegmentation = null;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#recorder {
	width: 500px;
	height: 400px;
	@apply shadow bg-white top-1/3 left-full absolute z-10 flex flex-col;
}
</style>
