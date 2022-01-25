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
						$refs.addModal.show();
					"
				>
					<span>Create</span>
					<span class="ml-1 hidden md:block lg:block"> Video</span>
				</button>
			</div>
		</div>
		<div class="h-20 lg:hidden block" />

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

		<Modal ref="addModal" :noBackdropHide="true">
			<div v-if="uploading || creatingGif" class="absolute-center w-full h-full z-50 bg-white">
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
				<div class="font-semibold font-serif mb-4 uppercase">Create Video Message</div>
				<div class="mb-4">
					<label>Title</label>
					<input type="text" class="input" v-model="title" required />
				</div>
				<div class="mb-4">
					<label>Description</label>
					<input type="text" class="input" v-model="description" />
				</div>
				<div class="mb-4">
					<label>Initial Message</label>
					<input type="text" class="input" v-model="initial_message" required />
				</div>

				<div class="mb-4">
					<label>Event Type</label>
					<VueSelect :options="servicesOptions" required placeholder="Select event type" class="mb-4" v-model="service_id" dropPosition="w-full"></VueSelect>
				</div>

				<div>
					<label>Video</label>
					<div class="h-64">
						<div v-if="!source" class="border border-dashed h-full rounded-lg relative bg-gray-50 cursor-pointer" @click="$refs.fileInput.click()">
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
				<div class="mt-4 items-center flex justify-between">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.addModal.hide(true)">
						<span>Cancel</span>
					</button>
					<button :class="{ disabled: source ? false : true }" class="btn btn-md btn-primary" type="submit"><span>Add</span></button>
				</div>
			</form>
		</Modal>
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
		embed_service: false
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

<style lang="scss" scoped></style>
