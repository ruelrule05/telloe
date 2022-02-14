<template>
	<div class="min-h-screen relative" :class="{ 'h-screen max-h-screen overflow-hidden': showLibrary }" v-if="ready">
		<!-- video messages list -->
		<div v-show="!adding" class="min-h-screen relative flex flex-col">
			<div>
				<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
					<div class="ml-7 lg:ml-0">VIDEO MESSAGES</div>
					<button
						v-if="!adding"
						type="button"
						class="btn btn-md btn-primary flex items-center"
						@click="
							reset();
							adding = true;
						"
					>
						<span>Create Video</span>
					</button>
				</div>
				<div class="h-20 lg:hidden block" />
			</div>
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
								adding = true;
							"
						>
							<span>Add New</span>
						</button>
					</div>
				</div>
			</div>
			<div v-else class="p-8">
				<div>
					<div class="mb-3 flex items-center justify-between">
						<div class="w-3/12">
							<input type="text" v-model="query" placeholder="Search video..." />
						</div>
						<div class="text-primary cursor-pointer hover:underline hidden">Video library</div>
					</div>

					<template v-for="vMessage in videoMessages">
						<div v-if="inQuery(vMessage)" class="flex items-start justify-between contact-row border-t py-3" :key="vMessage.id">
							<div class="flex-grow flex items-center gap-3">
								<div class="flex gap-2">
									<template v-for="(video, videoIndex) in vMessage.videos">
										<div v-if="videoIndex < 3" class="h-24 w-44 bg-center bg-cover bg-no-repeat bg-gray-50 relative" :key="`video-${video.id}`" :style="{ backgroundImage: `url(${video.user_video.thumbnail})` }">
											<div v-if="videoIndex == 2 && vMessage.videos.length > 3" class="absolute-center w-full h-full bg-black bg-opacity-40">
												<span class="absolute-center text-white">+{{ vMessage.videos.length - 2 }}</span>
											</div>
											<span v-else class="text-xxs absolute bottom-1 left-1 text-white bg-black bg-opacity-25 p-1 rounded leading-none">{{ format(video.user_video.duration, { leading: true }) }}</span>
										</div>
									</template>
								</div>
								<div class="flex-grow">
									<div class="overflow-hidden pr-6 w-full">
										<div class="line-clamp-1 -mb-1">
											<span class="font-bold text-primary cursor-pointer hover:underline" @click="openVideoMessage(vMessage)">
												{{ vMessage.title }}
											</span>
										</div>
										<div class="text-sm text-gray-500 mb-2 line-clamp-1">{{ vMessage.description }}</div>
									</div>
									<div class="text-xs text-gray-400 mb-1">{{ dayjs(vMessage.created_at).format('MMM DD, YYYY hh:mm A') }}</div>
									<div class="flex items-center text-xs text-gray-500 mt-1 gap-4">
										<div>
											<VueDropdown @click="shareVideoMessage($event, vMessage)" :options="['Copy video link', 'Copy video for email']" class="-mr-1 mt-0.5" dropPosition="right-auto left-0 w-44">
												<template #button>
													<div class="flex items-center transition-colors cursor-pointer"><ShareIcon class="w-3.5 fill-current text-gray-400 mr-1"></ShareIcon> Share</div>
												</template>
											</VueDropdown>
										</div>
										<div class="flex items-center"><EyeIcon class="mr-1 w-4 fill-current"></EyeIcon> {{ vMessage.views }}</div>
										<div class="flex items-center"><ThumbupIcon class="mr-1 w-3 fill-current"></ThumbupIcon> {{ likes(vMessage) }}</div>
										<div class="flex items-center"><ThumbdownIcon class="mr-1 w-3 fill-current"></ThumbdownIcon> {{ dislikes(vMessage) }}</div>
										<div class="flex items-center"><CommentIcon class="mr-1 w-4 fill-current"></CommentIcon> {{ vMessage.conversation.messages_count }}</div>
									</div>
								</div>
							</div>

							<div class="flex items-center">
								<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100" @click="setQuickAdd(vMessage)">
									<PlusIcon class="stroke-current text-gray-400 w-3 h-3 transform scale-110"></PlusIcon>
								</div>
								<VueDropdown @click="videoMessageAction($event, vMessage)" :options="['Edit', 'Delete']" class="mr-1" dropPosition="w-28">
									<template #button>
										<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
											<CogIcon class="fill-current text-gray-400"></CogIcon>
										</div>
									</template>
								</VueDropdown>
								<toggle-switch @input="updateVideoMessageStatus($event, vMessage)" v-model="vMessage.is_active"></toggle-switch>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>

		<!-- Add form -->
		<vue-form-validate v-show="adding" @submit="store" class="min-h-screen relative flex flex-col">
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10 p-5">
				<div class="ml-7 lg:w-4/12 w-100 lg:ml-0">{{ videoMessage.id ? 'EDIT' : 'CREATE' }} VIDEO MESSAGE</div>
				<div class="flex items-center gap-2">
					<button type="button" class="btn btn-md btn-outline-primary" @click="reset()">
						<span>Cancel</span>
					</button>

					<button type="submit" class="btn btn-md btn-primary">
						<span>{{ videoMessage.id ? 'Save' : 'Publish' }} </span>
					</button>
				</div>
			</div>
			<div class="h-20 lg:hidden block" />
			<div class="flex-grow overflow-auto flex items-stretch relative">
				<div v-if="uploading" class="absolute-center w-full h-full z-50 bg-white" id="uploading">
					<div class="absolute-center text-center">
						<div class="spinner spinner-sm"></div>
					</div>
				</div>

				<div v-show="!uploading" class="text-left relative overflow-hidden w-full flex">
					<div class="flex-grow w-full h-full overflow-hidden">
						<div class="flex flex-col w-full h-full">
							<div class="bg-black flex-grow relative">
								<div v-if="(videoMessage.userVideos || []).length == 0" class="absolute-center py-1 px-3 text-sm rounded-full border border-white text-white cursor-pointer hover:bg-opacity-20 hover:bg-white" @click="showLibrary = true">+ Add video</div>
								<VideoPlayer v-else :videos="videoMessage.userVideos"></VideoPlayer>
							</div>

							<div class="h-28 flex p-2 gap-2 overflow-hidden border-t bg-gray-100 w-full">
								<div>
									<div class="border border-gray-300 h-full w-28 bg-white border-dashed cursor-pointer relative hover:border-gray-600 hover:text-gray-600 text-gray-400" @click="showLibrary = true">
										<span class="absolute-center text-3xl">+</span>
									</div>
								</div>

								<div class="flex-grow overflow-x-auto">
									<draggable handle=".user-video" direction="h" :list="videoMessage.userVideos" class="h-full w-full flex gap-2">
										<div v-for="(userVideo, userVideoIndex) in videoMessage.userVideos" :key="`userVideo-${userVideo.id}`">
											<div class="user-video cursor-move" :style="{ backgroundImage: `url(${userVideo.thumbnail})` }">
												<div class="absolute top-0.5 right-0.5 cursor-pointer rounded-full p-1.5 bg-black bg-opacity-50 text-white" @click="videoMessage.userVideos.splice(userVideoIndex, 1)">
													<CloseIcon class="h-2 w-2 transform scale-120 fill-current"></CloseIcon>
												</div>
											</div>
										</div>
									</draggable>
								</div>
							</div>
						</div>
					</div>

					<!-- Intent Form -->
					<div class="border-l">
						<div class="form-intent p-4">
							<h5 class="font-bold font-lg mb-2">Video Details</h5>
							<div class="mb-4">
								<label required>Title</label>
								<input type="text" class="input" v-model="videoMessage.title" required />
							</div>
							<div class="mb-4">
								<label>Description</label>
								<textarea class="input resize-none" rows="3" v-model="videoMessage.description"></textarea>
							</div>
							<div class="mb-4">
								<label>Initial Message</label>
								<textarea class="input resize-none" rows="3" v-model="videoMessage.initial_message"></textarea>
							</div>

							<div class="mb-4">
								<label>Event Type</label>
								<VueSelect :options="servicesOptions" clearable placeholder="Select event type" class="mb-4 bg-white" v-model="videoMessage.service_id" dropPosition="w-full"></VueSelect>
							</div>
						</div>
					</div>
				</div>
			</div>
		</vue-form-validate>

		<Library
			v-show="showLibrary"
			@close="
				showLibrary = false;
				quickAdd = false;
			"
			@input="
				videoMessage.userVideos = $event;
				showLibrary = false;
				if (quickAdd) {
					update();
				}
			"
			:selectedUserVideos="videoMessage.userVideos"
		></Library>

		<Modal ref="deleteModal">
			<div class="text-center">
				<WarningIcon class="fill-current text-red-600 h-8 w-8 inline-block mb-4"></WarningIcon>
				<p>Are you sure you want to delete this video message?</p>
			</div>
			<div class="flex justify-between mt-6">
				<button class="btn btn-sm btn-outline-primary" type="button" @click="$refs.deleteModal.hide()"><span>Cancel</span></button>
				<button class="btn btn-sm btn-red" type="button" @click="confirmDeleteVideoMessage"><span>Delete</span></button>
			</div>
		</Modal>
	</div>
</template>

<script>
/// <reference types="aws-sdk" />
import { mapState, mapActions } from 'vuex';
import InfoCircleIcon from '../../../icons/info-circle.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import dayjs from 'dayjs';
import CogIcon from '../../../icons/cog';
import ShareIcon from '../../../icons/share';
import EyeIcon from '../../../icons/eye-solid';
import CloseIcon from '../../../icons/close.vue';
import PlusIcon from '../../../icons/plus.vue';
import ThumbupIcon from '../../../icons/thumb-up';
import ThumbdownIcon from '../../../icons/thumb-down';
import CommentIcon from '../../../icons/comment-solid';
import WarningIcon from '../../../icons/warning';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
const format = require('format-duration');
import VueFormValidate from '../../../components/vue-form-validate.vue';
import Library from './library.vue';
import copy from 'copy-text-to-clipboard';
import Modal from '../../../components/modal/modal.vue';
import VideoPlayer from '../../../video-message/videoplayer.vue';
import draggable from 'vuedraggable';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
const humanizeDuration = require('humanize-duration');
import { GifReader } from 'omggif';
import { cover } from 'intrinsic-scale';
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

export default {
	components: { VideoPlayer, WarningIcon, Modal, CloseIcon, VueFormValidate, InfoCircleIcon, VueSelect, CogIcon, VueDropdown, ShareIcon, EyeIcon, ThumbupIcon, CommentIcon, Library, draggable, ToggleSwitch, PlusIcon, ThumbdownIcon },
	data: () => ({
		app_url: process.env.MIX_APP_URL,
		showLibrary: false,
		format: format,
		dayjs: dayjs,
		uploading: false,
		query: '',
		adding: false,
		videoMessage: {
			title: '',
			description: '',
			initial_message: '',
			service_id: null,
			userVideos: []
		},
		quickAdd: false
	}),

	computed: {
		...mapState({
			videoMessages: state => state.video_messages.index,
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
		this.getServices();
	},

	methods: {
		...mapActions({
			getVideoMessages: 'video_messages/index',
			storeVideoMessage: 'video_messages/store',
			updateVideoMessage: 'video_messages/update',
			setVideoMessageStatus: 'video_messages/setStatus',
			deleteVideoMessage: 'video_messages/delete',
			getServices: 'services/index'
		}),

		dislikes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => !x.is_liked).length;
		},

		likes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => x.is_liked).length;
		},

		openVideoMessage(videoMessage) {
			window.open(`${process.env.MIX_APP_URL}/video-messages/${videoMessage.uuid}`, '_blank');
		},

		setQuickAdd(videoMessage) {
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.userVideos = data.videos.map(x => x.user_video);
			this.videoMessage = data;
			this.showLibrary = true;
			this.quickAdd = true;
		},

		inQuery(videoMessage) {
			const trimmed = this.query.trim().toLowerCase();
			return trimmed.length == 0 || videoMessage.title.toLowerCase().includes(trimmed) || videoMessage.description.toLowerCase().includes(trimmed);
		},

		copyElementToClipboard(videoMessage) {
			let element = this.stringToElement(videoMessage);
			document.body.appendChild(element);
			window.getSelection().removeAllRanges();
			let range = document.createRange();
			range.selectNode(element);
			window.getSelection().addRange(range);
			document.execCommand('copy');
			window.getSelection().removeAllRanges();
			element.remove();
		},

		stringToElement(videoMessage) {
			let canvas = document.createElement('canvas');
			canvas.width = 500;
			canvas.height = 20;
			let totalDuration = 0;
			videoMessage.videos.forEach(userVideo => {
				totalDuration += userVideo.user_video.duration;
			});
			let ctx = canvas.getContext('2d');
			ctx.font = '16px Arial';
			ctx.fillStyle = 'white';
			ctx.fillText(`Play ${humanizeDuration(totalDuration, { round: true, units: ['m'] }).replace('minutes', 'minute')} video`, 200, 15);

			let element = `<table> <tr> <td> <div style="width: 550px; max-width: 550px"> <div style="display: grid; grid-template-columns: 1fr"> <a style=" display: block; grid-row-start: 1; grid-column-start: 1; " href="${this.app_url}/video-messages/${videoMessage.uuid}" ><img style="width: 100%; height: auto" src="${videoMessage.videos[0].user_video.gif}"/></a> <div style=" grid-row-start: 1; grid-column-start: 1; display: grid; grid-template-columns: 1fr; " > <div style=" grid-row-start: 1; grid-column-start: 1; display: flex; align-items: end; " > <div style="padding: 10px; pointer-events: none; display: grid; grid-template-columns: 1fr; width: 100%;"> <div style=" grid-row-start: 1; grid-column-start: 1; padding: 10px 0 10px 15px; overflow: hidden; height: 60px; vertical-align: middle; box-sizing: border-box; " > <div style="background-color: #3167e3; height: 100%; "> <div style="display: flex; height: 100%; justify-content: center; align-items: center;"> <div style="margin-top: 5px"><img src="${canvas.toDataURL()}" /></div></div></div></div><div style=" display: block; grid-row-start: 1; grid-column-start: 1; "> <img src="${this.app_url}/images/email-play.png" style=" display: inline-block; vertical-align: middle; " width="60"/> </div></div></div></div></div></div></td></tr><tr> <td></td></tr></table>`;
			let template = document.createElement('template');
			template.innerHTML = element;
			return template.content.firstChild;
		},

		confirmDeleteVideoMessage() {
			if (this.selectedVideoMessage) {
				this.deleteVideoMessage(this.selectedVideoMessage);
			}
			this.$refs.deleteModal.hide();
		},

		shareVideoMessage(action, videoMessage) {
			switch (action) {
				case 'Copy video link':
					if (copy(`${process.env.MIX_APP_URL}/video-messages/${videoMessage.uuid}`)) {
						this.$toast.open('Video message link copied to clipboard.');
					}
					break;

				case 'Copy video for email':
					this.copyElementToClipboard(videoMessage);
					this.$toast.open('Video message email copied to clipboard.');
					break;
			}
		},

		videoMessageAction(action, videoMessage) {
			if (action == 'Edit') {
				let data = JSON.parse(JSON.stringify(videoMessage));
				data.userVideos = data.videos.map(x => x.user_video);
				this.videoMessage = data;
				this.adding = true;
			} else if (action == 'Delete') {
				this.selectedVideoMessage = videoMessage;
				this.$refs.deleteModal.show();
			}
		},

		async store() {
			if (!this.videoMessage.userVideos.length) {
				return;
			}

			if (this.videoMessage.id) {
				return this.update();
			} else {
				this.uploading = true;
				let userVideoIds = this.videoMessage.userVideos.map(x => x.id);
				let videoMessagedata = {
					title: this.videoMessage.title,
					description: this.videoMessage.description,
					initial_message: this.videoMessage.initial_message,
					service_id: this.videoMessage.service_id,
					user_video_ids: userVideoIds
				};

				let totalDuration = 0;
				this.videoMessage.userVideos.forEach(userVideo => {
					totalDuration += userVideo.duration;
				});
				videoMessagedata.link_preview = await this.generateLinkPreview(this.videoMessage.userVideos[0].gif, totalDuration);
				let videoMessage = await this.storeVideoMessage(videoMessagedata).catch(() => {});
				if (videoMessage.data) {
					this.reset();
				}
			}
		},

		async generateLinkPreview(gif, duration) {
			return new Promise((resolve, reject) => {
				(async () => {
					const response = await fetch(gif);
					const blob = await response.blob();
					const arrayBuffer = await blob.arrayBuffer();
					const intArray = new Uint8Array(arrayBuffer);
					const reader = new GifReader(intArray);
					const info = reader.frameInfo(0);
					const results = new Array(reader.numFrames()).fill(0).map((_, k) => {
						const image = new ImageData(info.width, info.height);
						reader.decodeAndBlitFrameRGBA(k, image.data);
						return image;
					});
					let canvas = document.createElement('canvas');
					canvas.width = 600;
					canvas.height = 313;
					let ctx = canvas.getContext('2d');
					let parsedDuration = humanizeDuration(duration, { round: true, units: duration < 60000 ? ['s'] : ['m'] })
						.replace('minutes', 'minute')
						.replace('seconds', 'second');
					let durationText = `Play ${parsedDuration} video`;

					let playImage = new Image();
					playImage.src = `${this.app_url}/images/email-play.png`;

					let images = [];
					playImage.onload = () => {
						results.forEach(imageData => {
							let { width, height, x, y } = cover(canvas.width, canvas.height, imageData.width, imageData.height);
							let renderer = document.createElement('canvas');
							renderer.width = imageData.width;
							renderer.height = imageData.height;
							renderer.getContext('2d').putImageData(imageData, 0, 0);
							ctx.drawImage(renderer, x, y, width, height);
							ctx.beginPath();
							ctx.rect(30, 240, 540, 50);
							ctx.fillStyle = '#3167e3';
							ctx.fill();

							ctx.drawImage(playImage, 20, 230, 70, 70);
							ctx.font = '18px Arial';
							ctx.fillStyle = 'white';
							ctx.fillText(durationText, 230, 270);
							images.push(canvas.toDataURL());
							ctx.clearRect(0, 0, canvas.width, canvas.height);
						});
						gifshot.createGIF(
							{
								images: images,
								numFrames: 30,
								gifWidth: canvas.width,
								gifHeight: canvas.height
							},
							async obj => {
								if (!obj.error) {
									let timestamp = new Date().getTime();
									S3.upload(
										{
											Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'link_preview.gif',
											Body: this.dataURLtoFile(obj.image, 'link_preview.gif'),
											ACL: 'public-read',
											ContentType: 'image/gif'
										},
										async (err, d) => {
											if (!err && d) {
												resolve(d.Location);
											}
										}
									);
								} else {
									console.log(obj.error);
									reject(obj.error);
								}
							}
						);
					};
				})();
			});
		},

		async update() {
			this.uploading = true;
			let data = JSON.parse(JSON.stringify(this.videoMessage));
			data.user_video_ids = data.userVideos.map(x => x.id);

			let totalDuration = 0;
			data.videos.forEach(userVideo => {
				totalDuration += userVideo.user_video.duration;
			});
			data.link_preview = await this.generateLinkPreview(data.userVideos[0].gif, totalDuration);
			await this.updateVideoMessage(data).catch(() => {});
			this.uploading = false;
			this.reset();
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

		updateVideoMessageStatus(status, videoMessage) {
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.is_active = status;
			data.user_video_ids = data.videos.map(x => x.user_video_id);
			this.updateVideoMessage(data);
		},

		reset() {
			this.adding = false;
			this.uploading = false;
			this.videoMessage = {
				title: '',
				description: '',
				initial_message: '',
				service_id: null,
				userVideos: []
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.form-intent {
	width: 300px;
}
.user-video {
	@apply h-full w-28  relative bg-cover bg-center bg-no-repeat bg-gray-200;
	> div {
		@apply opacity-0;
	}
	&:hover {
		> div {
			@apply opacity-100;
		}
	}
}
</style>