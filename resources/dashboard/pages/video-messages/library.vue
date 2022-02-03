<template>
	<div class="library">
		<div v-if="status" class="absolute-center w-full h-full z-50 bg-white">
			<div class="absolute-center text-center">
				<div class="spinner spinner-sm"></div>
				<div>{{ status }}</div>
			</div>
		</div>

		<div v-show="!form" class="md:grid md:grid-cols-12 auto-cols-max flex items-center justify-center">
			<div class="col-start-4 col-span-6 relative z-50 p-6">
				<div class="bg-white rounded-xl p-6 transform transition-all ease-in-out shadow-lg overflow-hidden relative">
					<div class="uppercase font-serif font-bold text-sm">Choose videos to be added to the sequence</div>
					<div class="grid grid-cols-4 my-4 gap-1">
						<div v-for="userVideo in userVideos" :key="userVideo.id" class="user-video" :class="{ selected: selectedVideos.findIndex(x => x.id == userVideo.id) > -1 }" @click="toggleSelectedVideo(userVideo)" :style="{ backgroundImage: `url(${userVideo.thumbnail})` }">
							<div class="backdrop"></div>
							<div class="checkmark absolute-center rounded-full">
								<div class="absolute-center w-full h-full p-0.5">
									<div class="bg-white rounded-full w-full h-full"></div>
								</div>
								<svg class="relative" width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
									<path d="M20.6719 10.5C20.6719 16.1178 16.1178 20.6719 10.5 20.6719C4.88221 20.6719 0.328125 16.1178 0.328125 10.5C0.328125 4.88221 4.88221 0.328125 10.5 0.328125C16.1178 0.328125 20.6719 4.88221 20.6719 10.5ZM9.32343 15.8859L16.8703 8.33905C17.1266 8.08279 17.1266 7.66726 16.8703 7.41099L15.9422 6.48293C15.686 6.22662 15.2704 6.22662 15.0141 6.48293L8.85938 12.6377L5.98586 9.76414C5.7296 9.50787 5.31407 9.50787 5.05776 9.76414L4.1297 10.6922C3.87343 10.9485 3.87343 11.364 4.1297 11.6203L8.39532 15.8859C8.65163 16.1422 9.06712 16.1422 9.32343 15.8859Z" fill="#3167E3" />
								</svg>
							</div>
							<span class="text-xxs absolute bottom-1 left-1 text-white bg-black bg-opacity-25 p-1 rounded leading-none">{{ format(userVideo.duration, { leading: true }) }}</span>
						</div>
					</div>

					<div class="text-sm mb-2">Record or upload another video to add to the sequence. The recorded video will be automatically added to this sequence.</div>
					<div class="border border-dashed border-primary rounded relative h-24 bg-gray-50 cursor-pointer hover:bg-gray-100" @click="form = true">
						<span class="absolute-center text-4xl text-gray-400">+</span>
					</div>
					<div class="flex items-center justify-between mt-4">
						<button
							class="btn btn-md btn-outline-primary"
							type="button"
							@click="
								$emit('close');
								reset();
							"
						>
							<span>Cancel</span>
						</button>
						<button
							class="btn btn-md btn-primary"
							:class="{ disabled: !selectedVideos.length }"
							type="button"
							@click="
								$emit('input', selectedVideos);
								reset();
							"
						>
							<span>Add selected to sequence</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div v-show="form" class="bg-white w-full h-full overflow-auto text-center relative flex flex-col">
			<input
				type="file"
				ref="fileInput"
				class="hidden"
				@change="
					source = $event.target.files[0];
					if (source) {
						step = 3;
					}
					createVideoPreview();
				"
				accept="video/mp4,video/x-m4v,video/*"
			/>
			<div>
				<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
					<div class="ml-7 lg:ml-0">ADD VIDEO</div>
					<div class="flex items-center gap-3">
						<button type="button" class="btn btn-md btn-outline-primary" @click="reset()">
							<span>Cancel</span>
						</button>
						<button v-if="!isRecording && blobs.length && step == 2" type="button" class="btn btn-md btn-primary" @click="getRecordedVideo">
							<span>Next</span>
						</button>
						<button v-if="source" type="button" class="btn btn-md btn-primary" @click="store">
							<span>Create</span>
						</button>
					</div>
				</div>
				<div class="h-20 lg:hidden block" />
			</div>
			<div class="flex-grow">
				<!-- Step 1 -->
				<div v-show="step == 1" class="w-5/12 inline-block text-left py-4">
					Create a personal video message for your contacts.
					<!-- Camera -->
					<div class="flex gap-4 mt-4 rounded-lg p-8 bg-gray-100 mb-4">
						<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="30" cy="30" r="30" fill="#3167E3" />
							<path d="M32.6778 19.5H16.6556C15.1889 19.5 14 20.6703 14 22.1141V37.8859C14 39.3297 15.1889 40.5 16.6556 40.5H32.6778C34.1444 40.5 35.3333 39.3297 35.3333 37.8859V22.1141C35.3333 20.6703 34.1444 19.5 32.6778 19.5ZM43.2 21.5617L37.1111 25.6961V34.3039L43.2 38.4328C44.3778 39.2313 46 38.4164 46 37.0219V22.9727C46 21.5836 44.3833 20.7633 43.2 21.5617Z" fill="white" />
						</svg>

						<div class="flex-grow">
							<h5 class="font-bold font-lg mb-2">Camera</h5>
							<div class="text-gray-400 mb-3">Create a personal video for your contacts</div>
							<button
								class="btn btn-outline-primary btn-sm"
								type="button"
								@click="
									sourceType = 'camera';
									step++;
									initMediastreams();
								"
							>
								<span>Record video</span>
							</button>
						</div>
					</div>

					<!-- Screen -->
					<div class="flex gap-4 mt-4 rounded-lg p-8 bg-gray-100 mb-4">
						<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="30" cy="30" r="30" fill="#3167E3" />
							<path d="M39.9167 19H19.0833C17.9332 19 17 19.9238 17 21.0625V34.8125C17 35.9512 17.9332 36.875 19.0833 36.875H27.4167L26.7222 38.9375H23.5972C23.02 38.9375 22.5556 39.3973 22.5556 39.9688C22.5556 40.5402 23.02 41 23.5972 41H35.4028C35.98 41 36.4444 40.5402 36.4444 39.9688C36.4444 39.3973 35.98 38.9375 35.4028 38.9375H32.2778L31.5833 36.875H39.9167C41.0668 36.875 42 35.9512 42 34.8125V21.0625C42 19.9238 41.0668 19 39.9167 19ZM39.2222 34.125H19.7778V21.75H39.2222V34.125Z" fill="white" />
						</svg>

						<div class="flex-grow">
							<h5 class="font-bold font-lg mb-2">Screen Recording</h5>
							<div class="text-gray-400 mb-3">Show a contact your screen</div>
							<button
								class="btn btn-outline-primary btn-sm"
								type="button"
								@click="
									sourceType = 'screen';
									step++;
									initMediastreams();
								"
							>
								<span>Record video</span>
							</button>
						</div>
					</div>

					<!-- Screen and camera -->
					<div class="flex gap-4 mt-4 rounded-lg p-8 bg-gray-100 mb-4">
						<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="30" cy="30" r="30" fill="#3167E3" />
							<path d="M38.9375 19H25.1875C24.0488 19 23.125 19.9238 23.125 21.0625V23.125H21.0625C19.9238 23.125 19 24.0488 19 25.1875V38.9375C19 40.0762 19.9238 41 21.0625 41H34.8125C35.9512 41 36.875 40.0762 36.875 38.9375V36.875H38.9375C40.0762 36.875 41 35.9512 41 34.8125V21.0625C41 19.9238 40.0762 19 38.9375 19ZM34.8125 38.9375H21.0625V30H34.8125V38.9375ZM38.9375 34.8125H36.875V25.1875C36.875 24.0488 35.9512 23.125 34.8125 23.125H25.1875V21.0625H38.9375V34.8125Z" fill="white" />
						</svg>

						<div class="flex-grow">
							<h5 class="font-bold font-lg mb-2">Screen and Camera Recording</h5>
							<div class="text-gray-400 mb-3">Show a contact your screen with your face</div>
							<button
								class="btn btn-outline-primary btn-sm"
								type="button"
								@click="
									sourceType = 'screen_camera';
									step++;
									initMediastreams();
								"
							>
								<span>Record video</span>
							</button>
						</div>
					</div>

					<!-- Upload -->
					<div class="flex gap-4 mt-4 rounded-lg p-8 bg-gray-100">
						<svg version="1.1" width="60" class="fill-current" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" xml:space="preserve">
							<g><path class="fill-current text-primary" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490s490-219.4,490-490C990,229.4,770.6,10,500,10z M391.1,750.4V238.7l359.3,255.9L391.1,750.4z" /></g>
						</svg>

						<div class="flex-grow">
							<h5 class="font-bold font-lg mb-2">Upload Video</h5>
							<div class="text-gray-400 mb-3">Upload your existing videos</div>
							<button class="btn btn-outline-primary btn-sm" type="button" @click="$refs.fileInput.click()">
								<span>Upload video</span>
							</button>
						</div>
					</div>
				</div>

				<!-- Step 2 -->
				<div v-show="step == 2" class="h-full">
					<div class="flex flex-col h-full overflow-hidden">
						<div class="flex-grow relative">
							<div class="absolute-center w-full h-full">
								<video ref="videoPreview" class="w-full h-full bg-black" playsinline></video>
								<video ref="cameraPreview" class="absolute" playsinline></video>
							</div>
						</div>
						<div class="text-center px-4 py-2">
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
									{{ secondsToDuration((blobs.length * 30 * 2) / 1000) }}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Step 3 -->
				<div v-show="step == 3 && source" class="h-full">
					<div class="flex flex-col h-full overflow-hidden">
						<div class="flex-1 relative overflow-hidden">
							<div class="absolute-center w-full h-full">
								<video :src="previewSource" ref="videoPlayback" controls class="w-full h-full bg-black"></video>
							</div>
						</div>
						<div class="p-4 bg-gray-50">
							<div class="flex items-center">
								<div>
									<button type="button" class="btn btn-outline-primary bg-white btn-sm"><span>Play</span></button>
								</div>
								<div class="flex-grow px-4 relative">
									<span class="absolute-center rounded-full bg-white border-2 border-primary h-3 w-3 cursor-pointer"></span>
									<div class="h-1 bg-primary rounded"></div>
								</div>
								<div>
									<button type="button" class="btn btn-outline-primary bg-white btn-sm"><span>Full</span></button>
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
/// <reference types="aws-sdk" />
const gifshot = require('../../../js/plugins/gifshot.min.js');
const AWS = window.AWS;
AWS.config.region = process.env.MIX_AWS_DEFAULT_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: process.env.MIX_AWS_IDENTITY_POOL
});
const S3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: process.env.MIX_AWS_BUCKET }
});
const format = require('format-duration');
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';
import MultiStreamsMixer from 'multistreamsmixer';

export default {
	props: {
		selectedUserVideos: {
			type: Array,
			default: () => []
		}
	},

	data: () => ({
		format: format,
		form: false,
		source: null,
		duration: 0,
		gif: null,
		thumbnail: null,
		step: 1,
		sourceType: null,
		previewSource: null,
		status: null,
		uploadComplete: 0,
		S3Source: null,
		S3Gif: null,
		S3Thumbnail: null,
		selectedVideos: [],
		audioStreams: null,
		finalStream: null,
		cameraStreams: null,
		screenStreams: null,
		videoRecorder: null,
		blobs: [],
		isRecording: false
	}),

	computed: {
		...mapState({
			userVideos: state => state.user_videos.index
		})
	},

	watch: {
		selectedUserVideos: function (value) {
			this.selectedVideos = JSON.parse(JSON.stringify(value));
		}
	},

	created() {
		this.getUserVideos();
	},

	mounted() {
		this.$refs.videoPlayback.onloadedmetadata = () => {
			if (!this.blobs.length) {
				this.duration = this.$refs.videoPlayback.duration * 1000;
			}
		};
	},

	methods: {
		...mapActions({
			getUserVideos: 'user_videos/index',
			storeUserVideo: 'user_videos/store'
		}),

		secondsToDuration(seconds, limit = 14, end = 5) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(limit, end);
			return timeString;
		},

		getRecordedVideo() {
			if (this.videoRecorder && this.blobs.length) {
				this.videoRecorder.stop();
				const timestamp = dayjs().valueOf();
				let source = new File(this.blobs, timestamp, {
					type: this.blobs[0].type
				});
				this.source = source;
				this.previewSource = URL.createObjectURL(this.source);
				this.duration = this.blobs.length * 30 * 2;
				this.step = 3;
			}
		},

		pauseRecording() {
			if (this.videoRecorder) {
				this.isRecording = false;
				this.videoRecorder.pause();
			}
		},

		startRecording() {
			if (this.videoRecorder) {
				this.isRecording = true;
				if (this.blobs.length) {
					this.videoRecorder.resume();
				} else {
					this.videoRecorder.start(30);
				}
			}
		},

		async initMediastreams() {
			let finalStream = new MediaStream();
			this.audioStreams = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
			if (this.audioStreams) {
				this.audioStreams.getTracks().forEach(function (track) {
					finalStream.addTrack(track);
				});
			}
			if (this.sourceType.includes('camera')) {
				this.cameraStreams = await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});
				if (!this.cameraStreams) {
					this.$toast.error('No camera detected.');
					this.reset();
					return;
				}
			}
			if (this.sourceType.includes('screen')) {
				this.screenStreams = await navigator.mediaDevices.getDisplayMedia({ video: true }).catch(() => {});
				if (!this.screenStreams) {
					this.$toast.error('No display detected.');
					this.reset();
					return;
				}
			}

			if (this.sourceType == 'screen_camera') {
				this.screenStreams.width = window.screen.width;
				this.screenStreams.height = window.screen.height;
				this.screenStreams.fullcanvas = true;
				this.cameraStreams.width = 320;
				this.cameraStreams.height = 240;
				this.cameraStreams.top = this.screenStreams.height - this.cameraStreams.height;
				this.cameraStreams.left = this.screenStreams.width - this.cameraStreams.width;

				let mixer = new MultiStreamsMixer([this.screenStreams, this.cameraStreams], 'multi-streams-mixer');
				mixer.frameInterval = 10;
				mixer.width = 360;
				mixer.height = 240;
				mixer.startDrawingFrames();
				mixer
					.getMixedStream()
					.getTracks()
					.forEach(function (track) {
						finalStream.addTrack(track);
					});
			} else {
				if (this.cameraStreams) {
					this.cameraStreams.getTracks().forEach(function (track) {
						finalStream.addTrack(track);
					});
				}

				if (this.screenStreams) {
					this.screenStreams.getTracks().forEach(function (track) {
						finalStream.addTrack(track);
					});
				}
			}

			this.finalStream = finalStream;
			this.$refs.videoPreview.srcObject = this.finalStream;
			this.$refs.videoPreview.muted = true;
			this.$refs.videoPreview.volume = 0;
			this.$refs.videoPreview.play();
			this.videoRecorder = new MediaRecorder(this.finalStream, { mimeType: 'video/webm' });
			this.videoRecorder.camera = this.finalStream;
			this.videoRecorder.ondataavailable = e => this.blobs.push(e.data);
		},

		toggleSelectedVideo(userVideo) {
			let index = this.selectedVideos.findIndex(x => x.id == userVideo.id);
			if (index > -1) {
				this.selectedVideos.splice(index, 1);
			} else {
				this.selectedVideos.push(userVideo);
			}
		},

		reset(clearSelectedVideos = true) {
			this.form = false;
			this.previewSource = null;
			this.gif = null;
			this.thumbnail = null;
			this.source = null;
			this.step = 1;
			this.uploadComplete = 0;
			this.S3Source = null;
			this.S3Gif = null;
			this.S3Thumbnail = null;
			this.status = null;
			if (clearSelectedVideos) {
				this.selectedVideos = JSON.parse(JSON.stringify(this.selectedUserVideos));
			}
			this.blobs = [];

			if (this.videoRecorder && this.isRecording) {
				this.videoRecorder.stop();
			}
			this.videoRecorder = null;
			this.isRecording = false;

			if (this.finalStream) {
				this.finalStream.getTracks().forEach(function (track) {
					track.stop();
				});
			}
			this.finalStream = null;

			if (this.audioStreams) {
				this.audioStreams.getTracks().forEach(function (track) {
					track.stop();
				});
			}
			this.audioStreams = null;

			if (this.cameraStreams) {
				this.cameraStreams.getTracks().forEach(function (track) {
					track.stop();
				});
			}
			this.cameraStreams = null;

			if (this.screenStreams) {
				this.screenStreams.getTracks().forEach(function (track) {
					track.stop();
				});
			}
			this.screenStreams = null;
		},

		createVideoPreview() {
			if (!this.source) return null;
			this.previewSource = URL.createObjectURL(this.source);
		},

		async createGif() {
			this.status = 'Creating GIF...';
			return new Promise((resolve, reject) => {
				let gifWidth = this.$refs.videoPlayback.videoWidth;
				let gifHeight = this.$refs.videoPlayback.videoHeight;
				if (gifWidth > 320) {
					let ratio = 320 / gifWidth;
					gifWidth = 320;
					gifHeight = gifHeight * ratio;
				}
				gifshot.createGIF(
					{
						video: [this.source],
						numFrames: 30,
						gifWidth: gifWidth,
						gifHeight: gifHeight
					},
					obj => {
						if (!obj.error) {
							this.gif = obj.image;
							let image = new Image();
							image.width = gifWidth;
							image.height = gifHeight;
							image.onload = () => {
								let canvas = document.createElement('canvas');
								canvas.width = image.width;
								canvas.height = image.height;
								let ctx = canvas.getContext('2d');
								ctx.drawImage(image, 0, 0);
								this.thumbnail = canvas.toDataURL('image/png');
								resolve();
							};
							image.src = obj.image;
						} else {
							console.log(obj.error);
							reject();
						}
					}
				);
			});
		},

		async uploadToS3() {
			if (!this.source || !this.gif || !this.thumbnail) {
				return;
			}
			this.status = 'Uploading...';
			return new Promise(resolve => {
				let timestamp = new Date().getTime();
				S3.upload(
					{
						Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'source',
						Body: this.source,
						ACL: 'public-read'
					},
					(err, data) => {
						if (!err && data) {
							this.S3Source = data.Location;
							this.uploadComplete++;
							if (this.uploadComplete == 3) {
								resolve();
							}
						}
					}
				);

				S3.upload(
					{
						Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'gif.gif',
						Body: this.dataURLtoFile(this.gif, 'gif.gif'),
						ACL: 'public-read'
					},
					(err, data) => {
						if (!err && data) {
							this.S3Gif = data.Location;
							this.uploadComplete++;
							if (this.uploadComplete == 3) {
								resolve();
							}
						}
					}
				);

				S3.upload(
					{
						Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'thumbnail.png',
						Body: this.dataURLtoFile(this.thumbnail, 'thumbnail.png'),
						ACL: 'public-read'
					},
					(err, data) => {
						if (!err && data) {
							this.S3Thumbnail = data.Location;
							this.uploadComplete++;
							if (this.uploadComplete == 3) {
								resolve();
							}
						}
					}
				);
			});
		},

		async store() {
			this.$refs.videoPlayback.pause();
			await this.createGif();
			await this.uploadToS3();
			this.status = 'Finalizing...';
			if (!this.S3Source || !this.S3Gif || !this.S3Thumbnail || !this.duration) {
				return;
			}
			let userVideoData = {
				source: this.S3Source,
				gif: this.S3Gif,
				thumbnail: this.S3Thumbnail,
				duration: parseInt(this.duration)
			};
			let response = await this.storeUserVideo(userVideoData);
			if (response) {
				this.selectedVideos.push(response.data);
			}
			this.reset(false);
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
		}
	}
};
</script>

<style lang="scss" scoped>
.library {
	@apply absolute top-0 left-0 w-full h-screen z-50 overflow-auto bg-black bg-opacity-50;
}
.user-video {
	@apply h-24 rounded-lg relative overflow-hidden bg-cover bg-center bg-no-repeat bg-gray-100 cursor-pointer border-2 border-white;

	.backdrop {
		@apply absolute w-full h-full top-0 left-0 bg-black bg-opacity-50;
	}
	.backdrop,
	.checkmark {
		@apply hidden;
	}
	&.selected {
		@apply border-primary;
		.backdrop,
		.checkmark {
			@apply block;
		}
	}
}
</style>
