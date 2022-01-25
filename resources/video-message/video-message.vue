<template>
	<div class="w-screen h-screen flex items-stretch">
		<div class="flex-grow overflow-hidden">
			<div class="w-full h-full bg-black relative">
				<div v-if="!videoReady" class="absolute-center w-full h-full bg-black z-50">
					<div class="absolute-center text-center">
						<div class="spinner spinner-sm spinner-light"></div>
						<div class="text-white">Loading...</div>
					</div>
				</div>

				<div class="flex flex-col w-full h-full">
					<div class="flex-grow relative overflow-hidden w-full h-full">
						<div v-for="(video, videoIndex) in $root.videoMessage.videos" :key="video.id" class="video" :class="{ show: videoIndex == currentVideoIndex }">
							<div class="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-50" :style="{ backgroundImage: `url(${video.user_video.thumbnail})` }" style="filter: blur(30px)"></div>
							<video :ref="`video-${video.id}`" class="w-full h-full pointer-events-none relative z-10" :src="video.user_video.source" muted></video>
						</div>
					</div>
					<div v-show="videoReady" class="flex items-center p-2 bg-white">
						<span class="text-xs">{{ format(totalDuration - playProgress, { leading: true }) }}</span>
						<button type="button" @click="playPause">Play/Pause</button>
					</div>
				</div>
			</div>
		</div>
		<div class="chat-container"></div>
	</div>
</template>

<script>
const format = require('format-duration');
export default {
	data: () => ({
		currentVideoIndex: 0,
		totalDuration: 0,
		playProgress: 0,
		format: format,
		videoReady: false
	}),

	watch: {
		playProgress: function (value) {
			if (value >= this.totalDuration) {
				this.currentVideoIndex = 0;
				this.playProgress = 0;
			}
		}
	},
	mounted() {
		let totalDuration = 0;
		this.$root.videoMessage.videos.forEach((video, index) => {
			totalDuration += video.user_video.duration;
			let videoEl = this.$refs[`video-${video.id}`][0];
			let self = this;
			if (videoEl) {
				if (index == 0) {
					videoEl.onloadedmetadata = () => {
						this.videoReady = true;
					};
				} else {
					videoEl.play();
					setTimeout(() => {
						videoEl.pause();
						videoEl.currentTime = 0;
					}, 1000);
				}
				let initialTime = 0;
				videoEl.ontimeupdate = function () {
					if (self.currentVideoIndex == index) {
						let currentTime = this.currentTime * 1000;
						self.playProgress += currentTime - initialTime;
						initialTime = currentTime;
					}
				};
				videoEl.onended = () => {
					if (this.currentVideoIndex == index && this.currentVideoIndex < this.$root.videoMessage.videos.length - 1) {
						this.currentVideoIndex++;
						if (this.currentVideoIndex < this.$root.videoMessage.videos.length) {
							let nextVideo = this.$root.videoMessage.videos[this.currentVideoIndex];
							if (nextVideo) {
								let nextVideoEl = this.$refs[`video-${nextVideo.id}`][0] || null;
								if (nextVideoEl) {
									nextVideoEl.muted = false;
									nextVideoEl.play();
								}
							}
						}
					}
					setTimeout(() => {
						videoEl.currentTime = 0;
					}, 500);
					initialTime = 0;
				};
			}
		});
		this.totalDuration = totalDuration;
	},

	methods: {
		playPause() {
			let currentVideo = this.$refs[`video-${this.$root.videoMessage.videos[this.currentVideoIndex].id}`][0];
			if (currentVideo) {
				currentVideo.muted = false;
				if (currentVideo.paused) {
					currentVideo.play();
				} else {
					currentVideo.pause();
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.video {
	@apply w-full h-full opacity-0 absolute top-0 left-0;
	&.show {
		@apply opacity-100;
	}
}
.chat-container {
	width: 400px;
	@apply bg-white border-l;
}
</style>
