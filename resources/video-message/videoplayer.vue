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
				<div v-for="video in videos" :key="video.id" class="video" :class="{ show: video.id == currentVideoId }">
					<div class="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-50" :style="{ backgroundImage: `url(${video.thumbnail})` }" style="filter: blur(30px)"></div>
					<video :ref="`video-${video.id}`" class="w-full h-full pointer-events-none relative z-10" muted playsinline>
						<source :src="video.source.replace('.webm', '.mp4')" type="video/mp4" />
						<source :src="video.source" type="video/webm" />
					</video>
				</div>
				<div v-if="!playing" class="absolute-center z-10">
					<div class="border border-primary rounded-full w-14 h-14 bg-white cursor-pointer shadow-lg" @click="playPause">
						<svg version="1.1" class="absolute-center fill-current text-primary ml-0.5 w-8 h-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14" height="14" viewBox="0 0 163.861 163.861" style="enable-background: new 0 0 163.861 163.861" xml:space="preserve">
							<g>
								<path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275 c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z" />
							</g>
						</svg>
					</div>
				</div>
			</div>
			<div v-show="videoReady" class="flex items-center p-2 bg-white">
				<button type="button" class="rounded-full border border-primary w-8 h-8 relative" @click="playPause">
					<svg v-if="!playing" version="1.1" class="absolute-center fill-current text-primary ml-px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14" height="14" viewBox="0 0 163.861 163.861" style="enable-background: new 0 0 163.861 163.861" xml:space="preserve">
						<g>
							<path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275 c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z" />
						</g>
					</svg>
					<svg v-else class="absolute-center fill-current text-primary" width="15" height="15" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 365 365" style="enable-background: new 0 0 365 365" xml:space="preserve">
						<g>
							<rect x="74.5" width="73" height="365" />
							<rect x="217.5" width="73" height="365" />
						</g>
					</svg>
				</button>
				<div class="flex-grow mx-3 relative flex items-center">
					<div class="absolute-center w-full bg-gray-200 h-1/2"></div>
					<div v-for="video in videos" :key="video.id" class="relative h-3 cursor-pointer" @click="seekTo($event, video)" :style="{ width: `${(durations[video.id] / totalDuration) * 100}%` }">
						<div class="absolute top-1/2 transform -translate-y-1/2 left-0 h-1/2 pointer-events-none bg-primary" :style="{ width: `${videoProgress[video.id] ? (videoProgress[video.id] / durations[video.id]) * 100 + 0.5 : 0}%` }"></div>
						<span v-show="currentVideoId == video.id" :style="{ left: `${(videoProgress[video.id] / durations[video.id]) * 100}%` }" class="absolute top-1/2 transform -translate-y-1/2 rounded-full bg-primary h-3.5 w-3.5 cursor-pointer"></span>
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
const mobile = require('is-mobile');
import toggleFullscreen, { fullscreenChange, isFullscreen } from 'toggle-fullscreen';
export default {
	props: {
		videos: {
			type: Array
		}
	},
	components: {},

	data: () => ({
		currentVideoId: 0,
		format: format,
		videoReady: false,
		playing: false,
		isFullScreen: false,
		durations: {},
		videoProgress: {},
		firstPlayAttempt: true
	}),

	computed: {
		playProgress: function () {
			let playProgress = 0;
			playProgress = Object.values(this.videoProgress).reduce((a, b) => a + b, 0);
			return playProgress;
		},

		totalDuration: function () {
			let totalDuration = 0;
			totalDuration = Object.values(this.durations).reduce((a, b) => a + b, 0);

			return totalDuration;
		}
	},

	watch: {
		playProgress: function (value) {
			if (value >= this.totalDuration) {
				this.currentVideoId = 1;
				this.videoProgress = {};
			}
		},
		videos: function () {
			this.$nextTick(() => {
				this.init();
			});
		},
		totalDuration: function () {
			this.$emit('totalDuration', this.totalDuration);
		}
	},

	mounted() {
		this.$nextTick(() => {
			this.init();
		});
	},

	methods: {
		seekTo(e, video) {
			const domRect = e.target.getBoundingClientRect();
			let percent = (e.offsetX - 5) / domRect.width;
			let seekTo = this.durations[video.id] * percent;
			let currentVideoId = this.currentVideoId;
			this.currentVideoId = video.id;
			let videoEl = this.$refs[`video-${video.id}`][0] || null;
			if (videoEl) {
				videoEl.currentTime = seekTo / 1000;
				if (this.playing) {
					videoEl.play();
				}
			}

			let videoIndex = this.videos.findIndex(x => x.id == video.id);
			for (let i = 0; i < this.videos.length; i++) {
				if (i < videoIndex) {
					this.$set(this.videoProgress, this.videos[i].id, this.durations[this.videos[i].id]);
				} else if (i != videoIndex) {
					this.$set(this.videoProgress, this.videos[i].id, 0);
				}
			}
			if (currentVideoId != video.id) {
				let currentVideoEl = this.$refs[`video-${currentVideoId}`][0] || null;
				if (currentVideoEl) {
					currentVideoEl.currentTime = 0;
					currentVideoEl.pause();
				}
			}
			// let seekTo = totalSeekTo;
			// let duration = 0;
			// let durationToDeduct = 0;
			// let videoIndex = 0;
			// for (let i = 0; i < this.videos.length; i++) {
			// 	duration += this.durations[this.videos[i].id];
			// 	if (seekTo <= duration) {
			// 		videoIndex = i;
			// 		break;
			// 	} else {
			// 		durationToDeduct += this.durations[this.videos[i].id];
			// 	}
			// }
			// seekTo = seekTo - durationToDeduct;

			// let video = this.videos[videoIndex];

			// if (video) {
			// 	this.currentVideoId = video.id;
			// 	let nextVideoEl = this.$refs[`video-${video.id}`][0] || null;
			// 	if (nextVideoEl) {
			// 		nextVideoEl.currentTime = seekTo / 1000;
			// 		if (this.playing) {
			// 			nextVideoEl.play();
			// 		}
			// 	}
			// }
		},
		init() {
			this.playing = false;
			this.currentVideoId = this.videos[0].id;
			this.videoReady = true;
			let videoIds = this.videos.map(x => x.id);
			Object.keys(this.durations).forEach(key => {
				if (videoIds.indexOf(parseInt(key)) == -1) {
					this.$delete(this.durations, key);
				}
			});
			for (var index = 0; index < this.videos.length; index++) {
				let video = this.videos[index];
				let videoEl = this.$refs[`video-${video.id}`];
				if (videoEl) {
					videoEl = videoEl[0];
				}
				let self = this;
				if (videoEl) {
					videoEl.onloadedmetadata = async () => {
						if (videoEl.duration != Infinity) {
							this.$set(this.durations, video.id, videoEl.duration * 1000);
						} else {
							this.$set(this.durations, video.id, video.duration);
						}
						if (index == 0) {
							this.videoReady = true;
						}
					};

					if (mobile()) {
						this.videoReady = true;
					}
					if (index > 0) {
						videoEl.muted = true;
						videoEl.play();
						setTimeout(() => {
							videoEl.pause();
							videoEl.currentTime = 0;
						}, 1000);
					}
					videoEl.ontimeupdate = function () {
						if (videoEl.duration != Infinity) {
							if (self.currentVideoId == video.id) {
								self.$set(self.durations, video.id, videoEl.duration * 1000);
								self.$set(self.videoProgress, video.id, this.currentTime * 1000);
							}
						}
					};
					videoEl.onended = () => {
						let currentVideoIndex = this.videos.findIndex(x => x.id == this.currentVideoId);
						if (this.currentVideoId == video.id && currentVideoIndex < this.videos.length - 1) {
							if (currentVideoIndex < this.videos.length - 1) {
								let nextVideo = this.videos[currentVideoIndex + 1];
								if (nextVideo) {
									this.currentVideoId = nextVideo.id;
									let nextVideoEl = this.$refs[`video-${this.currentVideoId}`][0] || null;
									if (nextVideoEl) {
										nextVideoEl.muted = false;
										nextVideoEl.play();
									}
								}
							}
						} else {
							this.playing = false;
							this.currentVideoId = this.videos[0].id;
						}
						setTimeout(() => {
							videoEl.currentTime = 0;
						}, 500);
					};
				}
			}
		},

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
			if (this.firstPlayAttempt) {
				this.$emit('firstPlayAttempt');
				this.firstPlayAttempt = false;
			}
			let currentVideo = this.$refs[`video-${this.currentVideoId}`];
			if (currentVideo) {
				currentVideo = currentVideo[0];
			}
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
