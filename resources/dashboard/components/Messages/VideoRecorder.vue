<template>
	<div>
		<input
			type="file"
			ref="fileInput"
			class="hidden"
			@change="
				source = $event.target.files[0];
				createVideoPreview();
				$event.target.value = '';
			"
			accept="video/mp4,video/x-m4v,video/*"
		/>
		<div v-show="open" class="fixed top-0 left-0 w-screen h-screen z-10 bg-white flex flex-col">
			<div>
				<div class="overflow-hidden">
					<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
						<div class="ml-7 lg:ml-0 uppercase">Record Camera</div>
						<div class="flex items-center gap-3">
							<button type="button" class="btn btn-md btn-outline-primary" @click="resetRecorder()">
								<span>Cancel</span>
							</button>
							<button v-if="!isRecording && blobs.length && !previewSource" type="button" class="btn btn-md btn-primary" @click="getRecordedVideo">
								<span>Preview</span>
							</button>
							<button v-else-if="previewSource" type="button" class="btn btn-md btn-primary" @click="submit">
								<span>Send</span>
							</button>
						</div>
					</div>
					<div class="h-20 lg:hidden block" />
				</div>
			</div>

			<div class="flex-grow">
				<div class="flex flex-col h-full overflow-hidden">
					<div class="flex-grow relative">
						<div class="absolute-center w-full h-full">
							<video v-show="previewSource" :src="previewSource" ref="videoPlayback" controls controlsList="nodownload noplaybackrate" disablePictureInPicture class="w-full h-full bg-black"></video>
							<video v-show="!previewSource" ref="videoPreview" class="w-full h-full bg-black" playsinline></video>
						</div>
					</div>
					<div v-show="!previewSource" class="text-center px-4 py-2">
						<div class="inline-flex items-center">
							<svg v-if="!isRecording" @click="startRecording" class="inline-block cursor-pointer" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="48" height="48" rx="24" fill="#E33171" />
								<rect x="16" y="16" width="16" height="16" fill="white" />
							</svg>
							<svg v-else @click="pauseRecording" class="inline-block cursor-pointer" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	</div>
</template>

<script>
import dayjs from 'dayjs';
const videoCanvas = require('video-canvas');

export default {
	data: () => ({
		open: false,
		source: null,
		isRecording: false,
		blobs: [],
		recordDuration: 0,
		videoRecorder: null,
		recordInterval: null,
		streams: null,
		previewSource: null,
		thumbnail: null,
		thumbnailUrl: null
	}),

	methods: {
		async submit() {
			this.$emit('submit', {
				source: this.source,
				thumbnail: this.thumbnail,
				base64Preview: this.thumbnailUrl,
				duration: this.recordDuration * 1000
			});
			this.resetRecorder();
		},

		getRecordedVideo() {
			if (this.videoRecorder && this.blobs.length) {
				const timestamp = dayjs().valueOf();
				let source = new File(this.blobs, timestamp, {
					type: this.blobs[0].type
				});
				this.source = source;
				this.previewSource = URL.createObjectURL(this.source);
				this.duration = this.blobs.length * 30 * 2;
			}

			if (this.videoRecorder && this.isRecording) {
				this.videoRecorder.stop();
			}
			this.videoRecorder = null;
			this.isRecording = false;
			this.streams = null;
			clearInterval(this.recordInterval);

			const canvas = videoCanvas(this.$refs.videoPreview);
			const dataUrl = canvas.toDataURL('image/png');
			this.thumbnailUrl = dataUrl;
			let blobBin = atob(dataUrl.split(',')[1]);
			let array = [];
			for (var i = 0; i < blobBin.length; i++) {
				array.push(blobBin.charCodeAt(i));
			}
			this.thumbnail = new Blob([new Uint8Array(array)], { type: 'image/png' });
		},

		async show() {
			this.open = true;
			if (!this.videoRecorder) {
				this.streams = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => {});

				if (this.streams) {
					this.$refs.videoPreview.srcObject = this.streams;
					this.$refs.videoPreview.muted = true;
					this.$refs.videoPreview.volume = 0;
					this.$refs.videoPreview.play();
					this.videoRecorder = new MediaRecorder(this.streams, { mimeType: 'video/webm', videoBitsPerSecond: 2500000 });
					this.videoRecorder.camera = this.streams;
					this.videoRecorder.ondataavailable = e => {
						if (this.isRecording) {
							this.blobs.push(e.data);
						}
					};
				}
			}
		},

		resetRecorder() {
			this.open = false;
			clearInterval(this.recordInterval);

			if (this.videoRecorder && this.isRecording) {
				this.videoRecorder.stop();
			}
			this.videoRecorder = null;
			this.isRecording = false;
			if (this.streams) {
				this.streams.getTracks().forEach(function (track) {
					track.stop();
				});
			}
			this.streams = null;
			this.recordDuration = 0;
			this.previewSource = null;
			this.thumbnailUrl = null;
			this.thumbnail = null;
			this.source = null;
			this.blobs = [];
			this.processing = false;
		},

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

		pauseRecording() {
			if (this.videoRecorder) {
				this.isRecording = false;
				this.videoRecorder.pause();
			}
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
.content-header {
	@apply px-4 lg:px-6 font-serif font-semibold flex items-center;
	height: 78px;
}
</style>
