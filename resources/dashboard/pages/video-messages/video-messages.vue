<template>
	<div class="min-h-screen relative" v-if="ready">
		<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
			<div class="ml-7 lg:ml-0">VIDEO MESSAGES</div>
			<div>
				<button
					type="button"
					class="btn btn-md btn-primary flex items-center"
					@click="
						reset();
						adding = !adding;
					"
				>
					<template v-if="!adding">
						<span>Create</span>
						<span class="ml-1 hidden md:block lg:block"> Video</span>
					</template>
					<span v-else>Cancel</span>
				</button>
			</div>
		</div>
		<div class="h-20 lg:hidden block" />

		<div v-show="!adding">
			<div v-if="videoMessages.length == 0" class="flex-grow">
				<div class="absolute-center p-8 bg-secondary rounded-xl flex items-start w-10/12 md:w-4/12">
					<div class="text-primary">
						<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
					</div>
					<div class="pl-4 -mt-1">
						<p class="font-bold text-sm">No video messages added yet. Add a video message by clicking the button below.</p>
						<button
							type="button"
							class="btn btn-outline-primary btn-md mt-4"
							@click="
								reset();
								$refs.addModal.show();
							"
						>
							<span>Add New</span>
						</button>
					</div>
				</div>
			</div>
			<div v-else class="h-full contact-content p-8">
				<div>
					<div class="mb-3 w-3/12">
						<div>
							<input type="text" v-model="query" placeholder="Search video..." />
						</div>
					</div>

					<div class="flex items-center justify-between contact-row border-bottom py-3" v-for="videoMessage in videoMessages" :key="videoMessage.id">
						<div class="flex items-center gap-3">
							<div class="flex gap-2">
								<div v-for="video in videoMessage.videos" class="h-24 w-44 bg-center bg-cover bg-no-repeat bg-gray-50 relative" :key="`video-${video.id}`" :style="{ backgroundImage: `url(${video.user_video.thumbnail})` }">
									<span class="text-xxs absolute bottom-1 left-1 text-white bg-black bg-opacity-25 p-1 rounded leading-none">{{ format(video.user_video.duration, { leading: true }) }}</span>
								</div>
							</div>
							<div>
								<div class="font-bold text-primary">{{ videoMessage.title }}</div>
								<div class="text-xs text-gray-400 mb-1">{{ dayjs(videoMessage.created_at).format('MMM DD, YYYY h:m A') }}</div>
								<div class="text-white py-1 px-2 leading-none inline-block text-xs rounded-sm bg-green-400">Sent</div>
								<div class="flex items-center text-xs text-gray-500 mt-1 gap-4">
									<div>
										<VueDropdown :options="['Copy video link', 'Copy video for email']" class="-mr-1 mt-0.5" dropPosition="right-auto left-0 w-44">
											<template #button>
												<div class="flex items-center transition-colors cursor-pointer"><ShareIcon class="w-3.5 fill-current text-gray-400 mr-1"></ShareIcon> Share</div>
											</template>
										</VueDropdown>
									</div>
									<div class="flex items-center"><EyeIcon class="mr-1 w-4 fill-current"></EyeIcon> {{ videoMessage.views }}</div>
									<div class="flex items-center"><ThumbupIcon class="mr-1 w-3 fill-current"></ThumbupIcon> {{ videoMessage.views }}</div>
									<div class="flex items-center"><CommentIcon class="mr-1 w-4 fill-current"></CommentIcon> {{ videoMessage.views }}</div>
								</div>
							</div>
						</div>

						<div class="flex items-center">
							<div class="mr-1">
								<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
									<PlusIcon class="w-3.5 stroke-current text-gray-400"></PlusIcon>
								</div>
							</div>
							<div>
								<VueDropdown :options="['Edit details', 'Delete']" class="-mr-2 mt-1.5">
									<template #button>
										<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
											<CogIcon class="fill-current text-gray-400"></CogIcon>
										</div>
									</template>
								</VueDropdown>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Modal ref="addModal" :noBackdropHide="true"> </Modal>

		<div v-show="adding" id="add">
			<div class="w-full h-full py-8">
				<div class="w-5/12 inline-block text-left relative">
					<div v-if="uploading || creatingGif" class="absolute-center w-full h-full z-50 bg-white bg-opacity-50">
						<div class="absolute-center text-center">
							<div class="spinner spinner-sm"></div>
							<div>{{ uploading ? 'Uploading..' : creatingGif ? 'Creating preview..' : 'Loading..' }}</div>
						</div>
					</div>

					<input
						type="file"
						ref="fileInput"
						class="hidden"
						@change="
							source = $event.target.files[0];
							createVideoPreview();
						"
						accept="video/mp4,video/x-m4v,video/*"
					/>
					<form @submit.prevent="submitVideoMessage" class="relative">
						<!-- Step 1 -->
						<div v-show="step == 1">
							Create a personal video message for your contacts.
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
										"
									>
										<span>Record video</span>
									</button>
								</div>
							</div>
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
										"
									>
										<span>Record video</span>
									</button>
								</div>
							</div>
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
										"
									>
										<span>Record video</span>
									</button>
								</div>
							</div>

							<div class="flex gap-4 mt-4 rounded-lg p-8 bg-gray-100">
								<svg version="1.1" width="60" class="fill-current" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" xml:space="preserve">
									<g><path class="fill-current text-primary" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490s490-219.4,490-490C990,229.4,770.6,10,500,10z M391.1,750.4V238.7l359.3,255.9L391.1,750.4z" /></g>
								</svg>

								<div class="flex-grow">
									<h5 class="font-bold font-lg mb-2">Upload Video</h5>
									<div class="text-gray-400 mb-3">Upload your existing videos</div>
									<button
										class="btn btn-outline-primary btn-sm"
										type="button"
										@click="
											sourceType = 'upload';
											step++;
										"
									>
										<span>Upload video</span>
									</button>
								</div>
							</div>
							<div class="h-64 hidden">
								<div v-if="!source" class="border border-dashed h-full rounded-lg relative bg-gray-50 cursor-pointer">
									<span class="absolute-center text-center text-gray-400">
										<div>Add a video file</div>
										<span class="text-xl">+</span>
									</span>
								</div>
								<div v-else class="h-full w-full relative">
									<video class="pointer-eventxs-none border w-full h-full bg-black" controls :src="previewSource"></video>
									<div
										class="absolute bg-gray-100 top-2 right-2 z-10 rounded-full p-1 cursor-pointer"
										@click="
											$refs.fileInput.value = '';
											source = null;
										"
									>
										<CloseIcon class="w-3 h-3 fill-current text-blacj"></CloseIcon>
									</div>
								</div>
							</div>
						</div>
						<!-- Step 2 -->
						<div v-show="step == 2" class="border border-red-600">
							{{ sourceType }}
						</div>
						<!-- Step 3 -->
						<div v-show="step == 3" class="flex gap-6 rounded-lg p-8 bg-gray-100">
							<svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="30" cy="30" r="30" fill="#3167E3" />
								<path d="M27.56 22.32H31.912V18.48H27.56V22.32ZM27.56 42H31.912V24.72H27.56V42Z" fill="white" />
							</svg>
							<div class="flex-grow">
								<h5 class="font-bold font-lg mb-2">Video details</h5>
								<div class="mb-4">
									<label required>Title</label>
									<input type="text" class="input" v-model="title" required />
								</div>
								<div class="mb-4">
									<label required>Description</label>
									<textarea class="input resize-none" rows="3" v-model="description"></textarea>
								</div>
								<h5 class="font-bold font-lg mb-2 mt-6">Initial Message</h5>
								<div class="mb-4">
									<label> Message content</label>
									<textarea class="input resize-none" rows="3" v-model="initial_message"></textarea>
								</div>

								<h5 class="font-bold font-lg mb-2 mt-6">Booking Button</h5>
								<div class="mb-4">
									<label>Event Type</label>
									<VueSelect :options="servicesOptions" required placeholder="Select event type" class="mb-4 bg-white" v-model="service_id" dropPosition="w-full"></VueSelect>
								</div>
							</div>

							<div class="mt-4 items-center flex justify-between">
								<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.addModal.hide(true)">
									<span>Cancel</span>
								</button>
								<button :class="{ disabled: source ? false : true }" class="btn btn-md btn-primary" type="submit"><span>Add</span></button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/// <reference types="aws-sdk" />
import { mapState, mapActions } from 'vuex';
const gifshot = require('../../../js/plugins/gifshot.min.js');
const AWS = window.AWS;
AWS.config.region = 'ap-southeast-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: 'ap-southeast-1:4de40dfa-eaf9-4b32-9918-cb84392aa276'
});
import Modal from '../../../components/modal/modal.vue';
const S3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: process.env.MIX_AWS_BUCKET }
});

import InfoCircleIcon from '../../../icons/info-circle.vue';
import CloseIcon from '../../../icons/close.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import dayjs from 'dayjs';
import CogIcon from '../../../icons/cog';
import ShareIcon from '../../../icons/share';
import EyeIcon from '../../../icons/eye-solid';
import ThumbupIcon from '../../../icons/thumb-up';
import CommentIcon from '../../../icons/comment-solid';
import PlusIcon from '../../../icons/plus';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
const format = require('format-duration');
export default {
	components: { Modal, InfoCircleIcon, CloseIcon, VueSelect, CogIcon, VueDropdown, ShareIcon, EyeIcon, ThumbupIcon, CommentIcon, PlusIcon },
	data: () => ({
		format: format,
		dayjs: dayjs,
		source: null,
		gif: null,
		thumbnail: null,
		uploadComplete: 0,
		creatingGif: false,
		uploading: false,
		S3Source: null,
		S3Gif: null,
		S3Thumbnail: null,
		query: '',
		previewSource: null,
		duration: 0,
		title: '',
		description: '',
		initial_message: '',
		service_id: null,
		embed_service: false,
		adding: true,
		step: 1,
		sourceType: null
	}),

	computed: {
		...mapState({
			videoMessages: state => state.video_messages.index,
			videos: state => state.user_videos.index,
			ready: state => state.video_messages.ready,
			services: state => state.services.index
		}),
		servicesOptions() {
			let services = this.services;
			return services
				.filter(x => x.is_available)
				.map(service => {
					return { text: service.name, value: service.id };
				});
		}
	},
	created() {
		this.getVideoMessages();
		this.getUserVideos();
		this.getServices();
	},

	methods: {
		...mapActions({
			getVideoMessages: 'video_messages/index',
			storeVideoMessage: 'video_messages/store',
			storeUserVideo: 'user_videos/store',
			getUserVideos: 'user_videos/index',
			getServices: 'services/index'
		}),

		createVideoPreview() {
			if (!this.source) return null;
			this.previewSource = URL.createObjectURL(this.source);
		},

		submitVideoMessage() {
			if (!this.source || !this.title.trim().length || !this.initial_message.trim().length || this.creatingGif || !this.service_id) {
				return;
			}
			this.creatingGif = true;
			const url = URL.createObjectURL(this.source);
			const $video = document.createElement('video');
			$video.src = url;
			$video.addEventListener('loadedmetadata', () => {
				this.duration = $video.duration * 1000;
				let gifWidth = $video.videoWidth;
				let gifHeight = $video.videoHeight;
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
							image.onload = () => {
								let canvas = document.createElement('canvas');
								let ctx = canvas.getContext('2d');
								ctx.drawImage(image, 0, 0);
								this.thumbnail = canvas.toDataURL('image/png');
								this.uploadToS3();
							};
							image.src = obj.image;
						} else {
							console.log(obj.error);
							this.creatingGif = false;
						}
					}
				);
			});
		},

		async uploadToS3() {
			if (!this.source || !this.gif || !this.thumbnail || !this.duration || !this.title.trim().length || this.uploading) {
				return;
			}
			this.uploading = true;
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
							this.store();
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
							this.store();
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
							this.store();
						}
					}
				}
			);
		},

		async store() {
			if (!this.S3Source || !this.S3Gif || !this.duration || !this.title.trim().length || this.uploadComplete != 3) {
				return;
			}
			let userVideoData = {
				source: this.S3Source,
				gif: this.S3Gif,
				thumbnail: this.S3Thumbnail,
				duration: parseInt(this.duration)
			};
			let response = await this.storeUserVideo(userVideoData);
			if (response.data) {
				let videoMessagedata = {
					title: this.title,
					description: this.description,
					initial_message: this.initial_message,
					service_id: this.service_id,
					embed_service: this.embed_service ? 1 : 0,
					user_video_id: response.data.id
				};
				await this.storeVideoMessage(videoMessagedata);
				this.$refs.addModal.hide(true);
				this.reset();
			} else {
				this.uploading = false;
				this.creatingGif = false;
			}
		},

		reset() {
			this.uploadComplete = 0;
			this.uploading = false;
			this.creatingGif = false;
			this.source = false;
			this.S3Source = null;
			this.S3Gif = null;
			this.gif = null;
			this.gifSource = null;
			this.title = '';
			this.description = '';
			this.duration = 0;
			this.service_id = null;
			this.initial_message = '';
			this.embed_service = false;
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
#add {
	@apply bg-white w-full h-full top-0 left-0  text-center;
}
</style>
