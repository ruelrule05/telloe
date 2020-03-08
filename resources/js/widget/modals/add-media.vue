<template>
	<div class="snapturebox-modal" tabindex="-1" id="addMediaModal">
		<div class="snapturebox-modal-dialog snapturebox-modal-lg snapturebox-modal-dialog-centered" role="document">
			<div class="snapturebox-modal-content snapturebox-overflow-hidden">
				<div class="snapturebox-modal-body snapturebox-bg-dark snapturebox-p-0" style="height: 400px">
					<!-- Top buttons -->
					<div class="snapturebox-d-flex snapturebox-position-absolute snapturebox-w-100 snapturebox-pt-1" style="z-index: 10">
						<button
							type="button"
							class="snapturebox-btn snapturebox-text-white snapturebox-ml-auto snapturebox-shadow-none"
							@click="$root.toggleModal('#addMediaModal', 'hide');closeCamera();fileOutput = null;">
							<close fill="white"></close>
						</button>
					</div>

					<div class="snapturebox-position-absolute-center snapturebox-text-center" v-if="!cameraReady">
						<div class="snapturebox-spinner-border snapturebox-text-primary" role="status"></div>
						<div class="snapturebox-text-white snapturebox-mt-2">Loading camera..</div>
					</div>

					<video :hidden="fileOutput" ref="videoFile" class="snapturebox-w-100 snapturebox-h-100"></video>
					<div v-if="fileOutput" class="snapturebox-h-100">
						<video v-if="fileOutput.type == 'video'" ref="fileOutput" class="snapturebox-w-100 snapturebox-h-100" :src="fileOutput.blob" style="outline: 0" playsinline controls @loadeddata="loadeddata"></video>
						<div v-else class="snapturebox-w-100 snapturebox-h-100" :style="{backgroundImage: 'url(' + fileOutput.source + ')'}" style="background-size: contain; background-position: center; background-repeat: no-repeat; position: relative; left: -1px; z-index: 0"></div>
					</div>

					<div class="snapturebox-position-absolute snapturebox-w-100 snapturebox-text-center" style="bottom: 15px; z-index: 2" :hidden="fileOutput || !cameraReady">
						<div v-if="!isRecording">
							<!-- <button class="snapturebox-btn snapturebox-btn-light snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0" @click="startRecord">
                                        <video-icon size="1.2x"></video-icon>
                                    </button> -->
							<button class="snapturebox-btn snapturebox-btn-light snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0" @click="takePhoto">
								<camera stroke="black" stroke-width="1"></camera>
							</button>
						</div>
						<div v-else>
							<button class="snapturebox-btn snapturebox-btn-danger snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0" @click="stopRecord">
								<pause-icon size="1.2x"></pause-icon>
							</button>
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
			</div>
		</div>
	</div>
</template>

<script>
import RecordRTC from 'recordrtc';
import Camera from '../../icons/camera.vue';
import Close from '../../icons/close.vue';
export default {
	components: {Camera, Close},
	props: {
		itemType: {
			type: String
		}
	},

	data: () => ({
		cameraReady: false,
		videoRecorder: null,
		fileOutput: null,
		preview: '',
		streams: [],
		streams: null,
		isRecording: false,
		shutter: null,
		hasFlash: false //false
	}),

	created() {
        this.shutter = new Audio(`${this.$root.API}/notifications/shutter.mp3`);
        this.shutter.load();
	},

	mounted() {},

	computed: {},

	methods: {
		submit() {
			this.$emit('submit', this.fileOutput);
			this.$root.toggleModal('#addMediaModal', 'hide');
			this.closeCamera();
			this.fileOutput = null;
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
				type: this.itemType,
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
                    });
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
