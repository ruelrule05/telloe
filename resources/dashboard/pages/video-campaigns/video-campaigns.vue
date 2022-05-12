<template>
	<div class="relative h-screen overflow-auto">
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

		<Add v-if="adding" :videoCampaign="videoCampaign" @close="adding = false" @update="update"></Add>

		<AddVideoMessage v-if="editVideoMessage" :videoMessage="editVideoMessage" @close="editVideoMessage = null" @submit="vmUpdate" @showLibrary="showLibrary = $event" @removeVideo="editVideoMessage.userVideos.splice($event, 1)" @totalDuration="totalDuration = $event"></AddVideoMessage>
		<Library
			v-if="editVideoMessage"
			v-show="showLibrary"
			@close="
				showLibrary = false;
				quickAdd = false;
			"
			@input="
				editVideoMessage.userVideos = $event;
				showLibrary = false;
				if (quickAdd) {
					vmUpdate(editVideoMessage, true);
				}
			"
			:selectedUserVideos="editVideoMessage.userVideos"
		></Library>
		<Library v-if="pickVideo" @close="pickVideo = null" :selectedUserVideos="[]" @input="videoPicked" :single="true"></Library>

		<div v-show="!adding" class="h-full relative flex flex-col">
			<div>
				<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
					<div class="ml-7 lg:ml-0">VIDEO CAMPAIGNS</div>
					<button type="button" class="btn btn-md btn-primary flex items-center" @click="adding = true">
						<span>{{ videoCampaign ? 'Edit' : 'Create' }} Template</span>
					</button>
				</div>
				<div class="h-20 lg:hidden block" />
			</div>
			<div v-if="videoCampaigns.length == 0" class="flex-grow relative border h-full">
				<div class="absolute-center p-8 bg-secondary rounded-xl flex items-start w-10/12 md:w-4/12">
					<div class="text-primary">
						<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
					</div>
					<div class="pl-4 -mt-1">
						<p class="font-bold text-sm">No video campaigns added yet. Add a video campaign by clicking the button below.</p>
						<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="adding = true">
							<span>Add New</span>
						</button>
					</div>
				</div>
			</div>

			<div v-else class="flex-grow">
				<template v-if="!videoCampaign">
					<div class="absolute-center p-6 bg-secondary rounded-xl flex items-start w-10/12 md:w-3/12">
						<div class="text-primary">
							<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
						</div>
						<div class="pl-4 -mt-1">
							<p class="font-bold text-sm leading-tight">No template selected. Select a template by using the dropdown below.</p>
							<VueSelect :options="videoCampaignsOptions" @input="setVideoCampaign" class="w-full bg-white rounded-md mt-4" placeholder="Select template" dropPosition="w-full"></VueSelect>
						</div>
					</div>
				</template>

				<div v-else class="p-6">
					<div class="w-10/12 md:w-3/12">
						<VueSelect :options="videoCampaignsOptions" @input="setVideoCampaign" :value="videoCampaign ? videoCampaign.id : null" class="w-full bg-white rounded-md" placeholder="Select template" dropPosition="w-full"></VueSelect>
					</div>
					<div class="py-6 border-b mb-4">
						<h6 class="text-muted text-sm">TEMPLATE PREVIEW</h6>
					</div>

					<div class="w-full flex gap-2 h-24">
						<template v-for="(userVideo, userVideoIndex) in videoCampaign.userVideos">
							<div v-if="userVideo && userVideo.id" :key="`userVideo-${userVideoIndex}`">
								<div class="user-video" :style="{ backgroundImage: `url(${userVideo.thumbnail})` }"></div>
							</div>
							<div v-else class="user-video border-dashed border border-gray-300" :key="`userVideo-${userVideoIndex}`">
								<span class="absolute-center text-3xl">+</span>
							</div>
						</template>
					</div>

					<div class="py-6 border-b mb-4 mt-8">
						<h6 class="text-muted text-sm">GENERATED VIDEOS</h6>
					</div>

					<div v-if="videoCampaign.video_messages.length == 0" class="relative text-center py-8">
						<div class="p-8 bg-secondary rounded-xl inline-flex items-start w-10/12 md:w-4/12 text-left">
							<div class="text-primary">
								<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
							</div>
							<div class="pl-4 -mt-1">
								<p class="font-bold text-sm">Can't generate list of video because you haven't selected a contact tag. Edit your template's settings by clicking the button below.</p>
								<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="adding = true">
									<span>Edit Template</span>
								</button>
							</div>
						</div>
					</div>

					<div v-else v-for="vMessage in videoCampaign.video_messages" :key="vMessage.id">
						<div class="flex items-start justify-between contact-row pt-2">
							<div class="flex-grow flex items-center gap-3">
								<div class="flex gap-2 h-24 relative">
									<template v-for="(video, videoIndex) in vMessage.videos">
										<template v-if="video.user_video">
											<div v-if="videoIndex < 3" class="h-24 w-44 bg-center bg-cover bg-no-repeat bg-gray-50 relative" :key="`video-${video.id}`" :style="{ backgroundImage: `url(${video.user_video.thumbnail})` }">
												<div v-if="videoIndex == 2 && vMessage.videos.length > 3" class="absolute-center w-full h-full bg-black bg-opacity-40">
													<span class="absolute-center text-white">+{{ vMessage.videos.length - 2 }}</span>
												</div>
												<span v-else class="text-xxs absolute bottom-1 left-1 text-white bg-black bg-opacity-25 p-1 rounded leading-none">{{ format(video.user_video.duration, { leading: true }) }}</span>
											</div>
										</template>
										<div v-else :key="`video-${videoIndex}`" class="relative">
											<AddVideoIcon :key="`video-icon-${video.id}`" class="absolute left-0 -top-5 w-5 h-5 cursor-pointer" @click.native="$set(video, 'quickRecord', true)"></AddVideoIcon>
											<div
												class="user-video border border-gray-300 cursor-pointer hover:border-black"
												:class="[video.quickRecord ? 'border-blue-600 border-solid' : 'border-dashed']"
												@click="
													if (!video.processing) {
														pickVideo = vMessage;
														pickIndex = videoIndex;
													}
												"
											>
												<span v-if="video.processing" class="absolute-center">
													<span class="spinner spinner-sm"></span>
												</span>
												<span v-else class="absolute-center text-3xl">+</span>
											</div>
											<QuickRecorder
												v-if="video.quickRecord"
												@cancel="video.quickRecord = false"
												@record="
													$set(video, 'quickRecord', false);
													$set(video, 'processing', true);
													quickVideoStore($event, video, vMessage, videoIndex);
												"
											></QuickRecorder>
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
											<VueDropdown @click="shareVideoMessage($event, vMessage)" :options="['Copy video link', 'Copy video for email', 'Send to email']" class="-mr-1 mt-0.5" dropPosition="right-auto left-0 w-44">
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
								<!-- <div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100" @click="setQuickAdd(vMessage)">
									<PlusIcon class="stroke-current text-gray-400 w-3 h-3 transform scale-110"></PlusIcon>
								</div> -->
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
					</div>
				</div>
			</div>
		</div>

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
import copy from 'copy-text-to-clipboard';
import { mapState, mapActions } from 'vuex';
import InfoCircleIcon from '../../../icons/info-circle.vue';
const format = require('format-duration');
import dayjs from 'dayjs';
import Add from './add.vue';
import AddVideoMessage from '../video-messages/add.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import CogIcon from '../../../icons/cog';
import ThumbupIcon from '../../../icons/thumb-up';
import ThumbdownIcon from '../../../icons/thumb-down';
import CommentIcon from '../../../icons/comment-solid';
import ShareIcon from '../../../icons/share';
import EyeIcon from '../../../icons/eye-solid';
import Modal from '../../../components/modal/modal.vue';
import WarningIcon from '../../../icons/warning';
import Library from '../video-messages/library.vue';
const gifshot = require('../../../js/plugins/gifshot.min.js');
import { GifReader } from 'omggif';
import { cover } from 'intrinsic-scale';
const AWS = window.AWS;
AWS.config.region = process.env.MIX_AWS_DEFAULT_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: process.env.MIX_AWS_IDENTITY_POOL
});
const humanizeDuration = require('humanize-duration');
const S3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: process.env.MIX_AWS_BUCKET }
});
import AddVideoIcon from './AddVideoIcon.vue';
import QuickRecorder from './QuickRecorder.vue';

export default {
	components: { InfoCircleIcon, Add, VueSelect, VueDropdown, ToggleSwitch, CogIcon, ThumbupIcon, ThumbdownIcon, CommentIcon, ShareIcon, EyeIcon, AddVideoMessage, Modal, WarningIcon, Library, AddVideoIcon, QuickRecorder },
	computed: {
		...mapState({
			videoCampaigns: state => state.video_campaigns.index,
			contacts: state => state.contacts.index,
			ready: state => state.video_campaigns.ready
		}),

		videoCampaignsOptions() {
			let videoCampaignsOptions = this.videoCampaigns.map(videoCampaign => {
				return { text: videoCampaign.name, value: videoCampaign.id };
			});

			videoCampaignsOptions.push({
				text: '+ Create new template',
				value: 'new'
			});

			return videoCampaignsOptions;
		}
	},

	data: () => ({
		pickVideo: null,
		pickIndex: 0,
		app_url: process.env.MIX_APP_URL,
		showLibrary: false,
		format: format,
		dayjs: dayjs,
		videoCampaign: null,
		adding: false,
		editVideoMessage: null,
		quickAdd: false,
		uploadProgress: 0,
		gifProgress: 0,
		status: null,
		videoMessageToDelete: null,
		totalDuration: 0,
		uploadComplete: 0
	}),

	created() {
		this.getContacts({ nopaginate: true });
		this.getVideoCampaigns();
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			getVideoCampaigns: 'video_campaigns/index',
			updateVideoMessage: 'video_messages/update',
			deleteVideoMessage: 'video_messages/delete',
			storeUserVideo: 'user_videos/store'
		}),

		async quickVideoStore(e, video, videoMessage, index) {
			let { gif, thumbnail } = await this.createGif(e.dimensions, e.source);
			let { S3Source, S3Gif, S3Thumbnail } = await this.uploadToS3(e.source, gif, thumbnail);

			let userVideoData = {
				source: S3Source,
				gif: S3Gif,
				thumbnail: S3Thumbnail,
				duration: parseInt(e.duration)
			};
			let response = await this.storeUserVideo(userVideoData);
			if (response) {
				let data = JSON.parse(JSON.stringify(videoMessage));
				data.userVideos = data.videos.map(x => x.user_video);
				data.userVideos[index] = response.data;
				data.user_video_ids = data.userVideos.map(x => (x && x.id ? x.id : 'blank'));
				let totalDuration = 0;
				data.userVideos.forEach(x => {
					if (x) {
						totalDuration += x.duration;
					}
				});
				data.link_preview = await this.generateLinkPreview(response.data.gif, totalDuration, false);
				data.initial_message = await this.generateInitialMessage(videoMessage);
				delete data.original_message;
				delete data.new_source;
				if (data.service_id && !this.services.find(x => x.id == data.service_id)) {
					data.service_id = null;
				}
				response = await this.updateVideoMessage(data).catch(() => {});
				if (response) {
					let index = this.videoCampaign.video_messages.findIndex(x => x.id == response.data.id);
					if (index > -1) {
						this.videoCampaign.video_messages[index] = response.data;
					}
				}
			}
			video.processing = false;
		},

		async createGif(dimensions, source) {
			return new Promise((resolve, reject) => {
				let gifWidth = dimensions.width;
				let gifHeight = dimensions.height;
				if (gifWidth > 320) {
					let ratio = 320 / gifWidth;
					gifWidth = 320;
					gifHeight = gifHeight * ratio;
				}
				gifshot.createGIF(
					{
						video: [source],
						numFrames: 30,
						gifWidth: gifWidth,
						gifHeight: gifHeight
					},
					obj => {
						if (!obj.error) {
							let gif = obj.image;
							let image = new Image();
							image.width = gifWidth;
							image.height = gifHeight;
							image.onload = () => {
								let canvas = document.createElement('canvas');
								canvas.width = image.width;
								canvas.height = image.height;
								let ctx = canvas.getContext('2d');
								ctx.drawImage(image, 0, 0);
								let thumbnail = canvas.toDataURL('image/png');
								resolve({ gif: gif, thumbnail: thumbnail });
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

		async uploadToS3(source, gif, thumbnail) {
			this.uploadComplete = 0;
			if (!source || !gif || !thumbnail) {
				return;
			}
			return new Promise(resolve => {
				let S3Source, S3Gif, S3Thumbnail;
				let timestamp = new Date().getTime();
				S3.upload(
					{
						Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'source.webm',
						Body: source,
						ACL: 'public-read'
					},
					(err, data) => {
						if (!err && data) {
							S3Source = data.Location;
							this.uploadComplete++;
							if (this.uploadComplete == 3) {
								resolve({ S3Thumbnail: S3Thumbnail, S3Gif: S3Gif, S3Source: S3Source });
							}
						}
					}
				);

				S3.upload(
					{
						Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'gif.gif',
						Body: this.dataURLtoFile(gif, 'gif.gif'),
						ACL: 'public-read'
					},
					(err, data) => {
						if (!err && data) {
							S3Gif = data.Location;
							this.uploadComplete++;
							if (this.uploadComplete == 3) {
								resolve({ S3Thumbnail: S3Thumbnail, S3Gif: S3Gif, S3Source: S3Source });
							}
						}
					}
				);

				S3.upload(
					{
						Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'thumbnail.png',
						Body: this.dataURLtoFile(thumbnail, 'thumbnail.png'),
						ACL: 'public-read'
					},
					(err, data) => {
						if (!err && data) {
							S3Thumbnail = data.Location;
							this.uploadComplete++;
							if (this.uploadComplete == 3) {
								resolve({ S3Thumbnail: S3Thumbnail, S3Gif: S3Gif, S3Source: S3Source });
							}
						}
					}
				);
			});
		},

		videoPicked(e) {
			if (e) {
				let videoMessage = JSON.parse(JSON.stringify(this.pickVideo));
				videoMessage.userVideos = videoMessage.videos.map(x => x.user_video);
				videoMessage.userVideos[this.pickIndex] = e;
				this.vmUpdate(videoMessage);
				this.pickVideo = null;
			}
		},

		setQuickAdd(videoMessage) {
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.userVideos = data.videos.map(x => x.user_video);
			this.editVideoMessage = data;
			this.showLibrary = true;
			this.quickAdd = true;
		},

		async vmUpdate(videoMessage, durationFromUserVideos = true) {
			this.status = 'Processing...';
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.user_video_ids = data.userVideos.map(x => (x && x.id ? x.id : 'blank'));

			this.uploadProgress += 20;
			let userVideo = data.userVideos.find(x => x && x.id);
			if (durationFromUserVideos) {
				let totalDuration = 0;
				data.userVideos.forEach(x => {
					if (x) {
						totalDuration += x.duration;
					}
				});
				data.link_preview = await this.generateLinkPreview(userVideo.gif, totalDuration);
			} else {
				data.link_preview = await this.generateLinkPreview(userVideo.gif, this.totalDuration);
			}
			data.initial_message = await this.generateInitialMessage(videoMessage);

			delete data.original_message;
			delete data.new_source;
			this.status = 'Finalizing...';
			this.uploadProgress += 10;
			if (data.service_id && !this.services.find(x => x.id == data.service_id)) {
				data.service_id = null;
			}
			let response = await this.updateVideoMessage(data).catch(() => {});
			if (response) {
				let index = this.videoCampaign.video_messages.findIndex(x => x.id == response.data.id);
				if (index > -1) {
					this.videoCampaign.video_messages[index] = response.data;
				}
			}
			this.status = null;
			this.gifProgress = 0;
			this.uploadProgress = 0;
			this.editVideoMessage = null;
			this.totalDuration = 0;
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

		async generateLinkPreview(gif, duration, status = true) {
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
									if (status) {
										this.status = 'Uploading...';
									}
									this.uploadProgress += 15;
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

		confirmDeleteVideoMessage() {
			if (this.videoMessageToDelete) {
				this.deleteVideoMessage(this.videoMessageToDelete);
			}
			let index = this.videoCampaign.video_messages.findIndex(x => x.id == this.videoMessageToDelete.id);
			if (index > -1) {
				this.videoCampaign.video_messages.splice(index, 1);
			}
			this.videoMessageToDelete = null;

			this.$refs.deleteModal.hide();
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
				this.editVideoMessage = data;
			} else if (action == 'Delete') {
				this.videoMessageToDelete = videoMessage;
				this.$refs.deleteModal.show();
			}
		},

		update(videoCampaign) {
			videoCampaign.userVideos = videoCampaign.video_campaign_videos.map(x => x.user_video);
			this.videoCampaign = videoCampaign;
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

		async copyElementToClipboard(videoMessage, message = false) {
			let element = await this.stringToElement(videoMessage, message);
			document.body.appendChild(element);
			window.getSelection().removeAllRanges();
			let range = document.createRange();
			range.selectNode(element);
			window.getSelection().addRange(range);
			document.execCommand('copy');
			window.getSelection().removeAllRanges();
			element.remove();
		},

		stringToElement(videoMessage, message = false) {
			return new Promise(resolve => {
				const img = new Image();
				img.onload = () => {
					let ratio = 450 / img.width;
					let height = img.height * ratio;
					let timestamp = new Date().valueOf();

					let element = `<table>`;

					if (message) {
						let regex = /[^{{}}]+(?=})/g;
						let greeting = this.videoCampaign.email_template;
						let matches = this.videoCampaign.email_template.match(regex);
						matches.forEach(match => {
							let prop = videoMessage.contact[match.trim()] || '';
							greeting = greeting.replace(`{{${match}}}`, prop);
						});

						element += `<tr><td>${greeting.trim()}</td></tr>`;
					}
					element += ` <tr> <td> <div style="width: 450px; max-width: 450px;  height:${height}px"><a style=" display: block; grid-row-start: 1;  background: #3167e3;  height: 100%; width: 100%; grid-column-start: 1; " href="${this.app_url}/v/${videoMessage.short_id}" ><img style="width: 100%;  height: auto" src="${videoMessage.link_preview}?ts=${timestamp}"/></a></div></td></tr>`;
					element += `</table>`;
					let template = document.createElement('template');
					template.innerHTML = element;
					resolve(template.content.firstChild);
				};
				img.src = videoMessage.link_preview;
			});
		},

		async shareVideoMessage(action, videoMessage) {
			switch (action) {
				case 'Copy video link':
					if (copy(`${process.env.MIX_APP_URL}/v/${videoMessage.short_id}`)) {
						this.$toast.open('Video message link copied to clipboard.');
					}
					break;

				case 'Copy video for email':
					this.copyElementToClipboard(videoMessage);
					this.$toast.open('Video message email copied to clipboard.');
					break;

				case 'Send to email':
					await this.copyElementToClipboard(videoMessage, true);
					window.location.href = `mailto:${videoMessage.contact.email}?subject=${videoMessage.title}`;
					break;
			}
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

		setVideoCampaign(e) {
			let videoCampaign = this.videoCampaigns.find(x => x.id == e);
			if (videoCampaign) {
				videoCampaign = JSON.parse(JSON.stringify(videoCampaign));
				videoCampaign.userVideos = videoCampaign.video_campaign_videos.map(x => x.user_video);
			}
			if (e == 'new') {
				this.adding = true;
			}
			this.videoCampaign = videoCampaign;
		}
	}
};
</script>

<style lang="scss" scoped>
.user-video {
	@apply h-full w-44  relative bg-cover bg-center bg-no-repeat bg-gray-200;
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
