<template>
	<div class="min-h-screen relative" :class="{ 'h-screen max-h-screen overflow-hidden': showLibrary }" v-if="ready">
		<div v-if="status" class="absolute top-0 left-0 w-full h-full z-50 bg-white border">
			<div class="absolute-center text-center w-full">
				<div class="absolute-center w-3/12">
					<div class="rounded w-full h-2 border bg-gray-50 overflow-hidden">
						<div class="bg-primary h-full" :style="{ width: `${uploadProgress + gifProgress}%` }"></div>
					</div>
					<div class="mt-2 text-sm">{{ status }}</div>
					<div class="text-sm mt-2 text-gray-800 bg-gray-100 p-2 border rounded">Note: Please keep this window open while we are processing the video.</div>
				</div>
			</div>
		</div>
		<!-- video messages list -->
		<div v-show="!adding && !status" class="min-h-screen relative flex flex-col">
			<div>
				<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
					<div class="ml-7 lg:ml-0">VIDEO MESSAGES</div>
					<router-link v-if="!$root.auth.is_premium && videoMessages.length > 9" to="/dashboard/account?tab=plan" class="btn btn-md btn-primary flex items-center">
						<span>Upgrade</span>
					</router-link>
					<button
						v-else-if="!adding"
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
			<div v-if="videoMessages.length < 1" class="flex-grow">
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

					<template v-for="vMessage in paginatedVideoMessages">
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
										<div class="relative">
											<div v-if="vMessage.loading" class="absolute-center">
												<div class="spinner spinner-xs"></div>
											</div>

											<VueDropdown @click="shareVideoMessage($event, vMessage)" :class="{ 'opacity-0': vMessage.loading }" :options="['Copy video link', 'Copy video for email']" class="-mr-1 mt-0.5" dropPosition="right-auto left-0 w-44">
												<template #button>
													<div class="flex items-center transition-colors cursor-pointer"><ShareIcon class="w-3.5 fill-current text-gray-400 mr-1"></ShareIcon> Share</div>
												</template>
											</VueDropdown>
										</div>
										<div class="flex items-center"><EyeIcon class="mr-1 w-4 fill-current"></EyeIcon> {{ vMessage.views }}</div>
										<div class="flex items-center"><ThumbupIcon class="mr-1 w-3 fill-current"></ThumbupIcon> {{ likes(vMessage) }}</div>
										<div class="flex items-center"><ThumbdownIcon class="mr-1 w-3 fill-current"></ThumbdownIcon> {{ dislikes(vMessage) }}</div>
										<div class="flex items-center cursor-pointer hover:text-primary" @click="openVideoMessage(vMessage)"><CommentIcon class="mr-1 w-4 fill-current"></CommentIcon> {{ vMessage.conversation ? vMessage.conversation.messages_count : 0 }}</div>
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
					<Paginate v-show="filteredVideoMessages.length > per_page" :total_items="filteredVideoMessages.length" :per_page="per_page" @change="pageChanged" class="mt-6"></Paginate>
				</div>
			</div>
		</div>

		<!-- Add form -->
		<AddVideoMessage v-show="adding" :videoMessage="videoMessage" @close="adding = false" @submit="store" @showLibrary="showLibrary = $event" @removeVideo="videoMessage.userVideos.splice($event, 1)" @totalDuration="totalDuration = $event"></AddVideoMessage>

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
					update(videoMessage, true);
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
import dayjs from 'dayjs';
import CogIcon from '../../../icons/cog';
import ShareIcon from '../../../icons/share';
import EyeIcon from '../../../icons/eye-solid';
import PlusIcon from '../../../icons/plus.vue';
import ThumbupIcon from '../../../icons/thumb-up';
import ThumbdownIcon from '../../../icons/thumb-down';
import CommentIcon from '../../../icons/comment-solid';
import WarningIcon from '../../../icons/warning';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
const format = require('format-duration');
import Library from './library.vue';
import copy from 'copy-text-to-clipboard';
import Modal from '../../../components/modal/modal.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import Paginate from '../../../components/paginate-v2/paginate.vue';
const humanizeDuration = require('humanize-duration');
const AWS = window.AWS;
AWS.config.region = process.env.MIX_AWS_DEFAULT_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: process.env.MIX_AWS_IDENTITY_POOL
});
const S3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: process.env.MIX_AWS_BUCKET }
});

import AddVideoMessage from './add.vue';

export default {
	components: { WarningIcon, Modal, InfoCircleIcon, CogIcon, VueDropdown, ShareIcon, EyeIcon, ThumbupIcon, CommentIcon, Library, ToggleSwitch, PlusIcon, ThumbdownIcon, AddVideoMessage, Paginate },
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
			contact_id: null,
			userVideos: []
		},
		quickAdd: false,
		channel: null,
		uploadProgress: 0,
		gifProgress: 0,
		status: null,
		totalDuration: 0,
		isRetainFormData: 0,
		per_page: 10,
		current_page: 1
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			videoMessages: state => state.video_messages.index,
			ready: state => state.video_messages.ready
		}),

		filteredVideoMessages() {
			let search = this.query.trim().toLowerCase();
			return this.videoMessages.filter((videoMessage) => {
				let title = videoMessage.title ? videoMessage.title.toLowerCase() : ''
				let description = videoMessage.description ? videoMessage.description.toLowerCase() : ''

				return title.includes(search) || description.includes(search)
			});
		},

		paginatedVideoMessages: {
			get() {
				return this.filteredVideoMessages.slice(
					(this.current_page - 1) * this.per_page,
					this.current_page * this.per_page
				);
			},
			set(videoMessages) {
				return videoMessages;
			}
		}
	},
	created() {
		this.getVideoMessages();
		this.getServices();
		this.getContacts({ nopaginate: true });
		this.channel = this.$echo.private(`${this.$root.auth.id}.videoMessages`);
		this.channel.listen('VideoMessageStat', v => {
			let videoMessage = this.videoMessages.find(x => x.id == v.videoMessage.id);
			if (videoMessage) {
				this.getVideoMessageStats(videoMessage);
			}
		});

		this.isRetainFormData = this.$root.auth.retain_form_data;
		if (!this.isRetainFormData) {
			localStorage.clear();
		}
	},

	methods: {
		...mapActions({
			getVideoMessages: 'video_messages/index',
			storeVideoMessage: 'video_messages/store',
			updateVideoMessage: 'video_messages/update',
			setVideoMessageStatus: 'video_messages/setStatus',
			getVideoMessageStats: 'video_messages/getStats',
			deleteVideoMessage: 'video_messages/delete',
			getServices: 'services/index',
			getContacts: 'contacts/index'
		}),

		paginate(page_size, page_number) {
			let itemsToSlice = this.paginatedVideoMessages;
			this.paginatedVideoMessages = itemsToSlice.slice(
				page_number * page_size,
				(page_number + 1) * page_size
			);
		},

		pageChanged(page) {
			this.current_page = page;
			this.paginate(this.per_page, page - 1);
		},

		isImage(extension) {
			let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];
			return imageExtensions.indexOf(extension) > -1;
		},

		dislikes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => !x.is_liked).length;
		},

		likes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => x.is_liked).length;
		},

		openVideoMessage(videoMessage) {
			window.open(`${process.env.MIX_APP_URL}/v/${videoMessage.short_id}`, '_blank');
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
			let title = videoMessage.title ? videoMessage.title.toLowerCase() : '';
			let description = videoMessage.description ? videoMessage.description.toLowerCase() : '';
			return trimmed.length == 0 || title.includes(trimmed) || description.includes(trimmed);
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
					let element = `<div style="border: none; width: 450px; max-width: 450px;  height:${height}px"><a style=" display: block; grid-row-start: 1;  background: #3167e3;  height: 100%; width: 100%; grid-column-start: 1; border: none" href="${this.app_url}/v/${videoMessage.short_id}" ><img style="width: 100%;  height: auto" src="${videoMessage.link_preview}"/></a></div>`;
					let template = document.createElement('template');
					template.innerHTML = element;
					resolve(template.content.firstChild);
				};
				img.src = videoMessage.link_preview;
				img.onerror = () => {
					setTimeout(() => {
						img.src = videoMessage.link_preview;
					}, 1000);
				};
			});
		},

		confirmDeleteVideoMessage() {
			if (this.selectedVideoMessage) {
				this.deleteVideoMessage(this.selectedVideoMessage);
			}
			this.$refs.deleteModal.hide();
		},

		async shareVideoMessage(action, videoMessage) {
			switch (action) {
				case 'Copy video link':
					if (copy(`${process.env.MIX_APP_URL}/v/${videoMessage.short_id}`)) {
						this.$toast.open('Video message link copied to clipboard.');
					}
					break;

				case 'Copy video for email':
					this.$set(videoMessage, 'loading', true);
					await this.copyElementToClipboard(videoMessage);
					this.$set(videoMessage, 'loading', false);
					this.$toast.open('Video message email copied to clipboard.');
					break;
			}
		},

		videoMessageAction(action, videoMessage) {
			if (action == 'Edit') {
				let data = JSON.parse(JSON.stringify(videoMessage));
				data.userVideos = data.videos.map(x => x.user_video);
				if (data.initial_message) {
					if (Array.isArray(data.initial_message)) {
						data.initial_message = {};
					}
					data.initial_message.original_message = data.initial_message.message;
				}
				this.videoMessage = data;
				this.adding = true;
				if (this.isRetainFormData) {
					localStorage.setItem('videoMessageMessage', data.initial_message.message);
					this.localStorage(data);
				}
			} else if (action == 'Delete') {
				this.selectedVideoMessage = videoMessage;
				this.$refs.deleteModal.show();
			}
		},

		async store(data) {
			if (!data.userVideos.length) {
				return;
			}

			if (data.id) {
				return this.update(data);
			} else {
				this.status = 'Processing...';
				let userVideoIds = data.userVideos.map(x => x.id);
				let initialMessage = await this.generateInitialMessage(data);

				let videoMessagedata = {
					title: data.title,
					description: data.description,
					initial_message: initialMessage,
					service_id: data.service_id,
					user_video_ids: userVideoIds,
					contact_id: data.contact_id
				};
				if (this.isRetainFormData) {
					this.localStorage(videoMessagedata);
				}

				videoMessagedata.gif_duration = await this.generateLinkPreview(data.userVideos[0], this.totalDuration);
				let videoMessage = await this.storeVideoMessage(videoMessagedata).catch(() => {});
				if (videoMessage.data) {
					this.reset();
				}
			}
		},

		async generateLinkPreview(userVideo, duration) {
			return new Promise(resolve => {
				(async () => {
					this.uploadProgress += 20;
					let canvas = document.createElement('canvas');
					canvas.width = 400;
					canvas.height = 75;
					let ctx = canvas.getContext('2d');
					let parsedDuration = humanizeDuration(duration, { round: true, units: duration < 60000 ? ['s'] : ['m'] })
						.replace('minutes', 'minute')
						.replace('seconds', 'second');
					let durationText = `Play ${parsedDuration} video`;

					let playImage = new Image();
					playImage.src = `${this.app_url}/images/email-play.png`;

					playImage.onload = () => {
						const sourceImage = new Image();
						sourceImage.src = userVideo.thumbnail;
						sourceImage.onload = () => {
							this.uploadProgress += 20;
							ctx.beginPath();
							ctx.rect(25, 12, 360, 42);
							ctx.fillStyle = '#3167e3';
							ctx.fill();

							ctx.drawImage(playImage, 10, 9, 50, 50);
							ctx.font = '17px Arial';
							ctx.fillStyle = 'white';
							ctx.fillText(durationText, 120, 40);
							this.status = 'Uploading...';
							let timestamp = new Date().getTime();
							S3.upload(
								{
									Key: 'gif-durations/' + this.$root.auth.id + '/' + timestamp + '/' + 'gif_duration.png',
									Body: this.dataURLtoFile(canvas.toDataURL('image/png'), 'gif_duration.png'),
									ACL: 'public-read',
									ContentType: 'image/png'
								},
								async (err, d) => {
									if (!err && d) {
										this.uploadProgress += 20;
										resolve(d.Location);
									}
								}
							);
						};
					};
				})();
			});
		},

		async update(videoMessage, durationFromUserVideos = false) {
			this.status = 'Processing...';
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.user_video_ids = data.userVideos.map(x => x.id);

			this.uploadProgress += 20;
			if (durationFromUserVideos) {
				let totalDuration = 0;
				data.userVideos.forEach(x => {
					totalDuration += x.duration;
				});
				data.gif_duration = await this.generateLinkPreview(data.userVideos[0], totalDuration);
			} else {
				data.gif_duration = await this.generateLinkPreview(data.userVideos[0], this.totalDuration);
			}
			data.initial_message = await this.generateInitialMessage(videoMessage);

			delete data.original_message;
			delete data.new_source;
			this.status = 'Finalizing...';
			this.uploadProgress += 10;
			if (data.service_id && !this.services.find(x => x.id == data.service_id)) {
				data.service_id = null;
			}
			await this.updateVideoMessage(data).catch(() => {});
			if (this.isRetainFormData) {
				this.localStorage(data);
			}
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
			if (data.service_id && !this.services.find(x => x.id == data.service_id)) {
				data.service_id = null;
			}
			this.updateVideoMessage(data);
		},

		reset() {
			this.adding = false;
			this.status = null;
			this.gifProgress = 0;
			this.uploadProgress = 0;
			let title = localStorage.getItem('videoMessageStorageTitle');
			let description = localStorage.getItem('videoMessageStorageDescription');
			this.videoMessage = {
				title: title != 'null' ? title : '',
				description: description != 'null' ? description : '',
				initial_message: {},
				service_id: localStorage.getItem('videoMessageService'),
				contact_id: null,
				userVideos: [],
				retainMessage: localStorage.getItem('videoMessageMessage')
			};
		},

		localStorage(data) {
			localStorage.setItem('videoMessageStorageTitle', data.title);
			localStorage.setItem('videoMessageStorageDescription', data.description);
		}
	},
	watch: {
		query() {
			this.current_page = 1;
		}
	}
};
</script>
