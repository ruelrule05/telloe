<template>
	<div class="min-h-screen relative" :class="{ 'h-screen max-h-screen overflow-hidden': showLibrary }" v-if="ready">
		<div v-if="status" class="absolute-center w-full h-full z-50 bg-white">
			<div class="absolute-center text-center w-full">
				<div class="absolute-center w-3/12">
					<div class="rounded w-full h-2 border bg-gray-50 overflow-hidden">
						<div class="bg-primary h-full" :style="{ width: `${uploadProgress + gifProgress}%` }"></div>
					</div>
					<div class="mt-2 text-sm">{{ status }}</div>
				</div>
			</div>
		</div>
		<!-- video messages list -->
		<div v-show="!adding && !status" class="min-h-screen relative flex flex-col">
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
				<div v-show="!status" class="text-left relative overflow-hidden w-full flex">
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
								<input type="file" class="hidden" ref="initialMessageFile" @change="addFile" />
								<div v-if="videoMessage.initial_message.message || videoMessage.initial_message.source" class="flex items-end">
									<div class="flex-grow overflow-hidden">
										<div class="relative initial-message-container">
											<div v-show="videoMessage.initial_message.message" class="flex items-end">
												<div class="initial-message flex-grow break-all cursor-text" ref="newInitialMessage" spellcheck="false" v-html="videoMessage.initial_message.message"></div>
											</div>
											<div v-if="videoMessage.initial_message.source" class="px-3 py-2 text-white text-sm" :class="{ 'border-t border-dashed border-opacity-40': videoMessage.initial_message.message }">
												<div v-if="videoMessage.initial_message.preview" class="w-full h-36 bg-cover bg-center bg-no-repeat rounded relative" :style="{ backgroundImage: `url(${videoMessage.initial_message.preview})` }">
													<div class="absolute top-0.5 right-0.5 cursor-pointer rounded-full bg-opacity-50 bg-white hover:bg-opacity-100 p-1 transition-colors" @click="videoMessage.initial_message.source = videoMessage.initial_message.preview = null">
														<CloseIcon class="h-2.5 w-2.5 text-gray-500 fill-current -mr-px -mb-px"></CloseIcon>
													</div>
												</div>
												<div v-else class="flex justify-between items-center">
													<div class="overflow-hidden truncate opacity-75">
														{{ videoMessage.initial_message.filename }}
													</div>
													<div class="pl-1">
														<div class="cursor-pointer rounded-full bg-opacity-50 bg-white hover:bg-opacity-100 p-1 transition-colors" @click="videoMessage.initial_message.source = videoMessage.initial_message.preview = null">
															<CloseIcon class="h-2.5 w-2.5 text-gray-500 fill-current -mr-px -mb-px"></CloseIcon>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="align-self-end pl-1">
										<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + $root.auth.profile_image + ')' }">
											<span v-if="!$root.auth.profile_image">{{ $root.auth.initials }}</span>
										</div>
									</div>
								</div>
								<div class="flex items-center mt-2">
									<div class="flex-grow">
										<div class="flex items-center rounded-full bg-gray-200 p-1">
											<div class="py-1 px-2 message-input h-auto overflow-auto flex-grow focus:outline-none" @keypress="messageInput" contenteditable data-placeholder="Write a message.." spellcheck="false" ref="messageInput"></div>
											<button type="button" class="btn-send-message rounded-full bg-white p-1.5 text-primary focus:outline-none transition-colors hover:text-white hover:bg-primary" @click="$refs.initialMessageFile.click()">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
												</svg>
											</button>
											<button type="button" @click="setInitialMessage" class="btn-send-message rounded-full bg-white p-1.5 text-primary ml-0.5 focus:outline-none transition-colors hover:text-white hover:bg-primary"><SendIcon class="fill-current w-3.5 h-3.5"></SendIcon></button>
										</div>
									</div>
								</div>
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
import SendIcon from '../../../icons/send';
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

const loadImage = require('blueimp-load-image');

export default {
	components: { VideoPlayer, WarningIcon, Modal, CloseIcon, VueFormValidate, InfoCircleIcon, VueSelect, CogIcon, VueDropdown, ShareIcon, EyeIcon, ThumbupIcon, CommentIcon, Library, draggable, ToggleSwitch, PlusIcon, ThumbdownIcon, SendIcon },
	data: () => ({
		app_url: process.env.MIX_APP_URL,
		showLibrary: false,
		format: format,
		dayjs: dayjs,
		query: '',
		adding: false,
		videoMessage: {
			title: '',
			description: '',
			initial_message: {},
			service_id: null,
			userVideos: []
		},
		quickAdd: false,
		channel: null,
		uploadProgress: 0,
		gifProgress: 0,
		status: null
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

		this.channel = this.$echo.private(`${this.$root.auth.id}.videoMessages`);
		this.channel.listen('VideoMessageStat', v => {
			let videoMessage = this.videoMessages.find(x => x.id == v.videoMessage.id);
			if (videoMessage) {
				this.getVideoMessageStats(videoMessage);
			}
		});
	},

	methods: {
		...mapActions({
			getVideoMessages: 'video_messages/index',
			storeVideoMessage: 'video_messages/store',
			updateVideoMessage: 'video_messages/update',
			setVideoMessageStatus: 'video_messages/setStatus',
			getVideoMessageStats: 'video_messages/getStats',
			deleteVideoMessage: 'video_messages/delete',
			getServices: 'services/index'
		}),

		messageInput(e) {
			if ((e.keyCode ? e.keyCode : e.which) == 13) {
				e.preventDefault();
				this.setInitialMessage();
			}
		},

		isImage(extension) {
			let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];
			return imageExtensions.indexOf(extension) > -1;
		},

		addFile(e) {
			let fileInput = e.target;
			let fileExtension = fileInput.value.split('.').pop();
			this.$set(this.videoMessage.initial_message, 'type', 'file');
			this.$set(this.videoMessage.initial_message, 'extension', fileExtension);
			this.$set(this.videoMessage.initial_message, 'filename', fileInput.value.split(/(\\|\/)/g).pop());

			if (this.isImage(fileExtension)) {
				this.$set(this.videoMessage.initial_message, 'type', 'image');
				loadImage(
					fileInput.files[0],
					canvas => {
						let dataurl = canvas.toDataURL(fileInput.files[0].type);
						this.$set(this.videoMessage.initial_message, 'preview', dataurl);
						this.$set(this.videoMessage.initial_message, 'new_preview', dataurl);
						this.$set(this.videoMessage.initial_message, 'source', fileInput.files[0]);
						this.$set(this.videoMessage.initial_message, 'new_source', fileInput.files[0]);
						fileInput.value = '';
					},
					{ maxWidth: 450, canvas: true }
				);
			} else {
				this.$set(this.videoMessage.initial_message, 'source', fileInput.files[0]);
				this.$set(this.videoMessage.initial_message, 'new_source', fileInput.files[0]);
			}
		},

		setInitialMessage() {
			this.$set(this.videoMessage.initial_message, 'message', this.$refs.messageInput.innerText);
			this.$refs.messageInput.innerHTML = '';
		},

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

		async copyElementToClipboard(videoMessage) {
			let element = await this.stringToElement(videoMessage);
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
			return new Promise(resolve => {
				const img = new Image();
				img.onload = () => {
					let ratio = 450 / img.width;
					let height = img.height * ratio;
					let timestamp = new Date().valueOf();

					let element = `<table> <tr> <td> <div style="width: 450px; max-width: 450px; background: #3167e3; height:${height}px"><a style=" display: block; grid-row-start: 1; grid-column-start: 1; " href="${this.app_url}/video-messages/${videoMessage.uuid}" ><img style="width: 100%; height: auto" src="${videoMessage.link_preview}?ts=${timestamp}"/></a></div></td></tr></table>`;
					let template = document.createElement('template');
					template.innerHTML = element;
					resolve(template.content.firstChild);
				};
				img.src = videoMessage.link_preview;
			});
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
				if (data.initial_message) {
					data.initial_message.original_message = data.initial_message.message;
				}
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
				this.status = 'Processing...';
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
					this.uploadProgress += 10;
					const blob = await response.blob();
					const arrayBuffer = await blob.arrayBuffer();
					this.uploadProgress += 10;
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

						this.uploadProgress += 5;
						gifshot.createGIF(
							{
								images: images,
								numFrames: 30,
								gifWidth: canvas.width,
								gifHeight: canvas.height
							},
							async obj => {
								if (!obj.error) {
									this.status = 'Uploading...';
									this.uploadProgress += 15;
									S3.upload(
										{
											Key: 'user-videos/' + this.$root.auth.id + '/' + this.videoMessage.uuid + '/' + 'link_preview.gif',
											Body: this.dataURLtoFile(obj.image, 'link_preview.gif'),
											ACL: 'public-read',
											ContentType: 'image/gif'
										},
										async (err, d) => {
											if (!err && d) {
												this.uploadProgress += 20;
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
			this.status = 'Processing...';
			let data = JSON.parse(JSON.stringify(this.videoMessage));
			data.user_video_ids = data.userVideos.map(x => x.id);

			let totalDuration = 0;
			data.userVideos.forEach(userVideo => {
				totalDuration += userVideo.duration;
			});

			this.uploadProgress += 20;
			data.link_preview = await this.generateLinkPreview(data.userVideos[0].gif, totalDuration);
			data.initial_message = await this.generateInitialMessage(this.videoMessage);

			delete data.original_message;
			delete data.new_source;
			this.status = 'Finalizing...';
			this.uploadProgress += 10;
			await this.updateVideoMessage(data).catch(() => {});
			this.reset();
		},

		async generateInitialMessage(data) {
			return new Promise(resolve => {
				(async () => {
					if (data.initial_message.new_source) {
						if (data.initial_message.new_preview) {
							let preview = await S3.upload({
								Key: 'video-messages/' + this.$root.auth.id + '/' + data.uuid + '/' + 'initial_message_preview.png',
								Body: this.dataURLtoFile(data.initial_message.new_preview, 'initial_message_preview.png'),
								ACL: 'public-read',
								ContentType: 'image/png'
							})
								.promise()
								.catch(() => {});
							if (preview) {
								data.initial_message.preview = preview.Location;
								this.uploadProgress += 5;
							}
						}
						let source = await S3.upload({
							Key: 'video-messages/' + this.$root.auth.id + '/' + data.uuid + '/' + data.initial_message.filename,
							Body: data.initial_message.new_source,
							ACL: 'public-read'
						})
							.promise()
							.catch(() => {});
						if (source) {
							data.initial_message.source = source.Location;
							this.uploadProgress += 5;
						}
					} else {
						this.uploadProgress += 10;
					}
					if (this.$refs.newInitialMessage) {
						data.initial_message.message = this.$refs.newInitialMessage.innerText.trim();
					}
					resolve(data.initial_message);
				})();
			});
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
			this.status = null;
			this.gifProgress = 0;
			this.uploadProgress = 0;
			this.videoMessage = {
				title: '',
				description: '',
				initial_message: {},
				service_id: null,
				userVideos: []
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.message-input {
	border-radius: 10px;
	font-size: 14px;
	max-height: 120px;
	word-break: break-all;
	&[data-placeholder]:empty:before {
		content: attr(data-placeholder);
		color: #888;
	}
}

.initial-message-container {
	@apply bg-primary;
	border-radius: 15px;
	border-bottom-right-radius: 2px;
}
.initial-message {
	@apply text-white p-3 outline-none text-sm;
}
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
