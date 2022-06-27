<template>
	<div id="recorder">
		<div class="flex items-center justify-between p-3">
			<div class="uppercase font-serif text-xs font-semibold">Record Camera</div>
			<div>
				<button class="btn btn-sm btn-outline-primary" type="button" @click="$emit('cancel')"><span>CANCEL</span></button>
			</div>
		</div>

		<div class="flex-grow overflow-hidden">
			<div class="flex flex-col h-full overflow-hidden">
				<div class="flex-grow relative">
					<div class="absolute-center w-full h-full">
						<video ref="videoPreview" class="w-full h-full bg-black" playsinline></video>
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
		S3Thumbnail: null
	}),

	created() {
		(async () => {
			this.cameraStreams = await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});
			if (!this.cameraStreams) {
				this.$toast.error('No camera detected.');
				return;
			}

			this.$refs.videoPreview.srcObject = this.cameraStreams;
			this.$refs.videoPreview.muted = true;
			this.$refs.videoPreview.volume = 0;
			try {
				this.$refs.videoPreview.play();
			} catch (e) {
				//
			}
			this.videoRecorder = new MediaRecorder(this.cameraStreams, { mimeType: 'video/webm', videoBitsPerSecond: 2500000 });
			this.videoRecorder.camera = this.cameraStreams;
			this.videoRecorder.ondataavailable = e => {
				if (this.isRecording) {
					this.blobs.push(e.data);
				}
			};
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
			this.$refs.videoPreview.play();
			const canvas = document.createElement('canvas');
			canvas.width = 300;
			canvas.height = (canvas.width / this.$refs.videoPreview.videoWidth) * this.$refs.videoPreview.videoHeight;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(this.$refs.videoPreview, 0, 0, canvas.width, canvas.height);
			thumbnail = canvas.toDataURL('image/png');
			this.$emit('record', { source: source, thumbnail: thumbnail, duration: this.blobs.length * 30 * 2, dimensions: { width: videoWidth, height: videoHeight } });
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
