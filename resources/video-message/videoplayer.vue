<template>
	<div class="w-full h-full" ref="videoPlayer">
		<div v-if="!videoReady" class="absolute-center w-full h-full bg-black z-50">
			<div class="absolute-center text-center">
				<div class="spinner spinner-sm spinner-light"></div>
				<div class="text-white">Loading...</div>
			</div>
		</div>

		<div class="flex flex-col w-full h-full">
			<div class="flex-grow relative overflow-hidden w-full h-full">
				<div v-for="(video, videoIndex) in videos" :key="video.id" class="video" :class="{ show: videoIndex == currentVideoIndex }">
					<div class="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-50" :style="{ backgroundImage: `url(${video.thumbnail})` }" style="filter: blur(30px)"></div>
					<video :ref="`video-${video.id}`" class="w-full h-full pointer-events-none relative z-10" :src="video.source" muted></video>
				</div>
			</div>
			<div v-show="videoReady" class="flex items-center p-2 bg-white">
				<button type="button" class="rounded-full border border-primary w-8 h-8 relative" @click="playPause">
					<svg v-if="!playing" version="1.1" class="absolute-center fill-current text-primary ml-px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14" height="14" viewBox="0 0 163.861 163.861" style="enable-background: new 0 0 163.861 163.861" xml:space="preserve">
						<g>
							<path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275 c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z" />
						</g>
					</svg>
					<svg v-else class="absolute-center fill-current text-primary" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 365 365" style="enable-background: new 0 0 365 365" xml:space="preserve">
						<g>
							<rect x="74.5" width="73" height="365" />
							<rect x="217.5" width="73" height="365" />
						</g>
					</svg>
				</button>
				<div class="flex-grow px-3 relative">
					<div ref="scrubber" class="relative">
						<div class="rounded overflow-hidden absolute top-0 left-0 w-full pointer-events-none">
							<div class="h-2 bg-primary" :style="{ width: `${(playProgress / totalDuration) * 100 + 0.5}%` }"></div>
						</div>
						<span :style="{ left: `${(playProgress / totalDuration) * 100}%` }" class="absolute top-1/2 transform -translate-y-1/2 rounded-full bg-primary h-3.5 w-3.5 cursor-pointer"></span>

						<div class="h-2 border border-gray-200 rounded cursor-pointer"></div>
					</div>
				</div>
				<span class="text-sm">{{ format(totalDuration - playProgress, { leading: true }) }}</span>

				<div class="ml-2 mr-1">
					<div v-if="!isFullScreen" class="hover:text-primary cursor-pointer" @click="fullScreen(true)">
						<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="16" height="16" viewBox="0 0 20 20">
							<title>fullscreen</title>
							<path fill-rule="evenodd" d="M1 1v6h2V3h4V1H1zm2 12H1v6h6v-2H3v-4zm14 4h-4v2h6v-6h-2v4zm0-16h-4v2h4v4h2V1h-2z" />
						</svg>
					</div>
					<div v-else class="hover:text-primary cursor-pointer" @click="fullScreen(false)">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" class="fill-current" width="16" height="16" viewBox="0 0 122.88 122.871" enable-background="new 0 0 122.88 122.871" xml:space="preserve">
							<g><path d="M122.88,35.775v9.529H81.515c-2.278,0-4.125-1.847-4.125-4.125V0h9.63v35.775H122.88L122.88,35.775z M35.499,0h9.63v41.118 c0,2.278-1.847,4.125-4.125,4.125H0v-9.644h35.499V0L35.499,0z M0,87.164v-9.598h40.942c2.277,0,4.125,1.846,4.125,4.125v41.18 h-9.633V87.164H0L0,87.164z M77.328,122.871V81.752c0-2.277,1.847-4.125,4.125-4.125h41.427v9.625H86.931 c0,12.338-0.003,23.271-0.003,35.619H77.328L77.328,122.871z" /></g>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const format = require('format-duration');
import toggleFullscreen, { fullscreenChange, isFullscreen } from 'toggle-fullscreen';
export default {
	props: {
		videos: {
			type: Array
		}
	},
	components: {},

	data: () => ({
		currentVideoIndex: 0,
		totalDuration: 0,
		playProgress: 0,
		format: format,
		videoReady: false,
		playing: false,
		isFullScreen: false
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
		this.videos.forEach((video, index) => {
			totalDuration += video.duration;
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
					if (this.currentVideoIndex == index && this.currentVideoIndex < this.videos.length - 1) {
						this.currentVideoIndex++;
						if (this.currentVideoIndex < this.videos.length) {
							let nextVideo = this.videos[this.currentVideoIndex];
							if (nextVideo) {
								let nextVideoEl = this.$refs[`video-${nextVideo.id}`][0] || null;
								if (nextVideoEl) {
									nextVideoEl.muted = false;
									nextVideoEl.play();
								}
							}
						}
					} else {
						this.playProgress = 0;
						this.playing = false;
						this.currentVideoIndex = 0;
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
		fullScreen(state) {
			this.isFullScreen = state;
			toggleFullscreen(this.$refs.videoPlayer).then(() => {
				return fullscreenChange(() => {
					if (isFullscreen()) {
						this.isFullScreen = true;
					} else {
						this.isFullScreen = false;
					}
				});
			});
		},

		playPause() {
			let currentVideo = this.$refs[`video-${this.videos[this.currentVideoIndex].id}`][0];
			if (currentVideo) {
				currentVideo.muted = false;
				if (currentVideo.paused) {
					currentVideo.play();
					this.playing = true;
				} else {
					currentVideo.pause();
					this.playing = false;
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
</style>
