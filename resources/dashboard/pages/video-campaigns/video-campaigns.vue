<template>
	<div class="absolute w-full h-screen top-0 left-0 overflow-auto bg-white">
		<div v-if="status" class="absolute top-0 left-0 w-full h-full z-50 bg-white border">
			<div class="absolute-center text-center w-full">
				<div class="absolute-center w-3/12">
					<div class="rounded w-full h-2 border bg-gray-50 overflow-hidden">
						<div class="bg-primary h-full" :style="{ width: `${uploadProgress}%` }"></div>
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

		<div v-show="!adding && !editVideoMessage" class="h-full relative flex flex-col">
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

					<div class="py-6 border-b mt-8">
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
						{{ checkLinkPreview(vMessage) }}
						<div class="flex items-start justify-between contact-row pt-7 relative">
							<div v-if="vMessage.processing" class="absolute top-0 left-0 z-50 w-full h-full bg-white opacity-70"></div>
							<div class="flex-grow flex items-center gap-3">
								<div class="flex gap-2 h-24 relative">
									<div v-if="vMessage.processing" class="absolute z-50 text-sm left-12 top-1/2 transform -translate-y-1/2">Processing..</div>
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
											<AddVideoIcon
												:key="`video-icon-${video.id}`"
												class="absolute left-0 -top-5 w-5 h-5 cursor-pointer"
												@click.native="
													disableQuickRecorders();
													$set(video, 'quickRecord', true);
													scrollIntoView(video);
												"
											></AddVideoIcon>
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
												:ref="`recorder-${video.id}`"
												@cancel="disableQuickRecorders()"
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
										<div class="relative">
											<div v-if="vMessage.loading" class="absolute-center">
												<div class="spinner spinner-xs"></div>
											</div>
											<VueDropdown :class="{ 'opacity-0': vMessage.loading }" @click="shareVideoMessage($event, vMessage)" :options="['Copy video link', 'Copy video for email', 'Send to email']" class="-mr-1 mt-0.5" dropPosition="right-auto left-0 w-44">
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
			services: state => state.services.index,
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
		status: null,
		videoMessageToDelete: null,
		totalDuration: 0,
		uploadComplete: 0
	}),

	created() {
		this.getContacts({ nopaginate: true });
		this.getVideoCampaigns();
		this.getServices();
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			getVideoCampaigns: 'video_campaigns/index',
			updateVideoMessage: 'video_messages/update',
			deleteVideoMessage: 'video_messages/delete',
			storeUserVideo: 'user_videos/store',
			getServices: 'services/index'
		}),

		checkLinkPreview(videoMessage) {
			const linkPreview = new Image();
			linkPreview.src = videoMessage.link_preview;
			linkPreview.onload = () => {
				this.$set(videoMessage, 'processing', false);
			};
			linkPreview.onerror = () => {
				this.$set(videoMessage, 'processing', true);
				setTimeout(() => {
					linkPreview.src = videoMessage.link_preview;
				}, 1000);
			};
		},

		disableQuickRecorders() {
			if (this.videoCampaign) {
				this.videoCampaign.video_messages.forEach(vMessage => {
					vMessage.videos.forEach(video => {
						if (!video.user_video) {
							this.$set(video, 'quickRecord', false);
						}
					});
				});
			}
		},

		scrollIntoView(video) {
			this.$nextTick(() => {
				let videoElement = this.$refs[`recorder-${video.id}`];
				if (videoElement && videoElement[0]) {
					videoElement[0].$el.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
				}
			});
		},

		goToNextPlaceholder(videoMessage, index) {
			let vMessageIndex = this.videoCampaign.video_messages.findIndex(x => x.id == videoMessage.id);
			let nextIndex = vMessageIndex + 1;
			if (this.videoCampaign.video_messages[nextIndex]) {
				let nextVideo = this.videoCampaign.video_messages[nextIndex].videos[index];
				if (nextVideo && !nextVideo.user_video) {
					setTimeout(() => {
						this.$set(nextVideo, 'quickRecord', true);
					}, 100);
				} else {
					nextIndex = nextIndex + 1;
					if (this.videoCampaign.video_messages[nextIndex]) {
						this.goToNextPlaceholder(this.videoCampaign.video_messages[nextIndex], index);
					}
				}
			}
		},

		async quickVideoStore(e, video, videoMessage, index) {
			this.goToNextPlaceholder(videoMessage, index);
			let { S3Source, S3Thumbnail } = await this.uploadToS3(e.source, e.thumbnail);

			let userVideoData = {
				source: S3Source,
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
				data.gif_duration = await this.generateLinkPreview(response.data, totalDuration);
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
						this.videoCampaign.video_messages[index].videos = response.data.videos;
						this.videoCampaign.video_messages[index].link_preview = response.data.link_preview;
					}
				}
			}
			video.processing = false;
		},

		async uploadToS3(source, thumbnail) {
			this.uploadComplete = 0;
			if (!source || !thumbnail) {
				return;
			}
			return new Promise(resolve => {
				let S3Source, S3Thumbnail;
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
							if (S3Thumbnail) {
								resolve({ S3Thumbnail: S3Thumbnail, S3Source: S3Source });
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
							if (S3Source) {
								resolve({ S3Thumbnail: S3Thumbnail, S3Source: S3Source });
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
				data.gif_duration = await this.generateLinkPreview(userVideo, totalDuration);
			} else {
				data.gif_duration = await this.generateLinkPreview(userVideo, this.totalDuration);
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
			let index = this.videoCampaigns.find(x => x.id == this.videoCampaign.id);
			this.$set(this.videoCampaigns, index, videoCampaign);
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

					let element = `<div style="border: none"><table style="border-collapse: collapse;background: #ffff; border: none;width: 450px; max-width: 450px;  "><tr style="border-collapse: collapse;border: none"><td style="border-collapse: collapse;border: none">`;

					if (message) {
						let regex = /[^{{}}]+(?=})/g;
						let greeting = this.videoCampaign.email_template ? this.videoCampaign.email_template : '';
						if (this.videoCampaign.email_template) {
							let matches = this.videoCampaign.email_template.match(regex);
							if (matches) {
								matches.forEach(match => {
									if (videoMessage.contact) {
										let prop = videoMessage.contact[match.trim()] || '';
										greeting = greeting.replace(`{{${match}}}`, prop);
									}
								});
							}
						}

						element += `<div style="font-size: 13px; font-family: 'Arial', sans-serif;border: none">${this.nl2br(greeting.trim())}</div>`;
					}
					element += `<div style="height:${height}px; border: none;border-collapse: collapse"><a style=" display: block; grid-row-start: 1;  background: #3167e3;  height: 100%; width: 100%; grid-column-start: 1; border: none" href="${this.app_url}/v/${videoMessage.short_id}" ><img style="width: 100%;  height: auto" src="${videoMessage.link_preview}?ts=${timestamp}"/></a></div>`;
					element += `</td></tr></table></div>`;
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

		nl2br(str, is_xhtml) {
			if (typeof str === 'undefined' || str === null) {
				return '';
			}
			var breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
			return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
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
					this.$set(videoMessage, 'loading', true);
					await this.copyElementToClipboard(videoMessage, true).catch(() => {});
					this.$set(videoMessage, 'loading', false);
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
