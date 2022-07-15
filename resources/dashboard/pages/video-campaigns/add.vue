<template>
	<div>
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

		<vue-form-validate v-if="videoCampaignData" @submit="submit" class="min-h-screen relative flex flex-col">
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10 p-5">
				<div class="ml-7 lg:w-4/12 w-100 lg:ml-0">{{ videoCampaignData.id ? 'EDIT' : 'CREATE' }} VIDEO TEMPLATE</div>
				<div class="flex items-center gap-2">
					<button type="button" class="btn btn-md btn-outline-primary" @click="$emit('close')">
						<span>Cancel</span>
					</button>

					<button type="submit" class="btn btn-md btn-primary" :disabled="!videoCampaignData.userVideos.length">
						<span>{{ videoCampaignData.id ? 'Save' : 'Publish' }} </span>
					</button>
				</div>
			</div>
			<div class="h-20 lg:hidden block" />
			<div class="flex-grow overflow-auto flex items-stretch relative">
				<div class="text-left relative overflow-hidden w-full flex">
					<div class="flex-grow w-full h-full overflow-hidden">
						<div class="flex flex-col w-full h-full">
							<div class="bg-black flex-grow relative">
								<VueDropdown v-if="videoCampaignData.userVideos.length == 0" dropPosition="bottom" @click="dropdownAction" :options="actions" class="absolute-center">
									<template #button>
										<div class="py-1 px-3 text-sm rounded-full border border-white text-white cursor-pointer hover:bg-opacity-20 hover:bg-white">+ Add video</div>
									</template>
								</VueDropdown>

								<VideoPlayer v-if="(videoCampaignData.userVideos.filter(x => (x && x.id ? true : false)) || []).length > 0" :videos="videoCampaignData.userVideos.filter(x => (x && x.id ? true : false))" @totalDuration="totalDuration = $event"></VideoPlayer>
							</div>

							<div class="h-28 flex p-2 gap-2 overflow-hidden border-t bg-gray-100 w-full">
								<div>
									<VueDropdown dropPosition="right" @click="dropdownAction" :options="actions" class="border border-gray-300 h-full w-28 bg-white border-dashed cursor-pointer relative hover:border-gray-600 hover:text-gray-600 text-gray-400">
										<template #button>
											<span class="absolute-center text-3xl">+</span>
										</template>
									</VueDropdown>
								</div>

								<div class="flex-grow overflow-x-auto">
									<draggable handle=".user-video" direction="h" :list="videoCampaignData.userVideos" class="h-full w-full flex gap-2">
										<template v-for="(userVideo, userVideoIndex) in videoCampaignData.userVideos">
											<div v-if="userVideo && userVideo.id" :key="`userVideo-${userVideoIndex}`">
												<div class="user-video cursor-move" :style="{ backgroundImage: `url(${userVideo.thumbnail})` }">
													<div class="absolute top-0.5 right-0.5 cursor-pointer rounded-full p-1.5 bg-black bg-opacity-50 text-white" @click="videoCampaignData.userVideos.splice(userVideoIndex, 1)">
														<CloseIcon class="h-2 w-2 transform scale-120 fill-current"></CloseIcon>
													</div>
												</div>
											</div>
											<div v-else class="user-video cursor-move border-dashed border border-gray-300" :key="`userVideo-${userVideoIndex}`">
												<div class="absolute top-0.5 right-0.5 cursor-pointer rounded-full p-1.5 bg-black bg-opacity-50 text-white" @click="videoCampaignData.userVideos.splice(userVideoIndex, 1)">
													<CloseIcon class="h-2 w-2 transform scale-120 fill-current"></CloseIcon>
												</div>
											</div>
										</template>
									</draggable>
								</div>
							</div>
						</div>
					</div>

					<!-- Intent Form -->
					<div class="border-l bg-white">
						<div class="form-intent p-4">
							<h5 class="font-bold font-lg mb-2">Video Details</h5>
							<div class="mb-4">
								<label required>Template Name</label>
								<input type="text" class="input" v-model="videoCampaignData.name" required />
							</div>
							<div class="mb-4">
								<label required>Title</label>
								<input type="text" class="input" v-model="videoCampaignData.title" required />
							</div>
							<div class="mb-4">
								<label>Description</label>
								<textarea class="input resize-none" rows="3" v-model="videoCampaignData.description"></textarea>
							</div>
							<div class="mb-4">
								<label>Email template</label>
								<textarea class="input resize-none" rows="3" v-model="videoCampaignData.email_template"></textarea>
							</div>
							<div class="mb-4">
								<label>Initial Message</label>
								<input type="file" class="hidden" ref="initialMessageFile" @change="addFile" />
								<div v-if="videoCampaignData.initial_message.message || videoCampaignData.initial_message.source" class="flex items-end">
									<div class="flex-grow overflow-hidden">
										<div class="relative initial-message-container">
											<div v-show="videoCampaignData.initial_message.message" class="flex items-end">
												<div class="initial-message flex-grow break-all cursor-text" ref="newInitialMessage" spellcheck="false" v-html="videoCampaignData.initial_message.message"></div>
											</div>
											<div v-if="videoCampaignData.initial_message.source" class="px-3 py-2 text-white text-sm" :class="{ 'border-t border-dashed border-opacity-40': videoCampaignData.initial_message.message }">
												<div v-if="videoCampaignData.initial_message.preview" class="w-full h-36 bg-cover bg-center bg-no-repeat rounded relative" :style="{ backgroundImage: `url(${videoCampaignData.initial_message.preview})` }">
													<div class="absolute top-0.5 right-0.5 cursor-pointer rounded-full bg-opacity-50 bg-white hover:bg-opacity-100 p-1 transition-colors" @click="videoCampaignData.initial_message.source = videoCampaignData.initial_message.preview = null">
														<CloseIcon class="h-2.5 w-2.5 text-gray-500 fill-current -mr-px -mb-px"></CloseIcon>
													</div>
												</div>
												<div v-else class="flex justify-between items-center">
													<div class="overflow-hidden truncate opacity-75">
														{{ videoCampaignData.initial_message.filename }}
													</div>
													<div class="pl-1">
														<div class="cursor-pointer rounded-full bg-opacity-50 bg-white hover:bg-opacity-100 p-1 transition-colors" @click="videoCampaignData.initial_message.source = videoCampaignData.initial_message.preview = null">
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
										<div class="flex items-center rounded-full bg-gray-200 p-1" style="border-radius: 20px">
											<div class="py-1 px-2 message-input h-auto overflow-auto flex-grow focus:outline-none" @keypress="messageInput" contenteditable data-placeholder="Write a message.." spellcheck="false" ref="messageInput">{{ retainMessage }}</div>
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
								<VueSelect :options="servicesOptions" clearable placeholder="Select event type" class="bg-white" v-model="videoCampaignData.service_id" dropPosition="top w-full"></VueSelect>
							</div>

							<div class="mb-4">
								<label>Contact Tags</label>
								<multiselect v-model="videoCampaignData.contact_tags" ref="selectedContacts" label="name" :searchable="false" track-by="value" :options="contact_tags" :showLabels="false" placeholder="Select contact tags" multiple clearOnSelect>
									<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
									<div slot="noResult" class="text-muted text-sm text-center">No tag found.</div>
								</multiselect>
							</div>
						</div>
					</div>
				</div>
			</div>
		</vue-form-validate>

		<Library
			v-show="showLibrary"
			@close="showLibrary = false"
			@input="
				libraryInput($event);
				showLibrary = false;
			"
			:selectedUserVideos="videoCampaignData.userVideos.filter(x => (x && x.id ? true : false))"
		></Library>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
import VideoPlayer from '../../../video-message/videoplayer.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import CloseIcon from '../../../icons/close.vue';
import SendIcon from '../../../icons/send';
const loadImage = require('blueimp-load-image');
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import Library from '../video-messages/library.vue';
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

import { mapActions } from 'vuex';

export default {
	props: {
		videoCampaign: {
			type: Object,
			default: () => {}
		}
	},
	components: { VideoPlayer, draggable, VueSelect, VueFormValidate, CloseIcon, SendIcon, VueDropdown, Library, Multiselect },

	data: () => ({
		app_url: process.env.MIX_APP_URL,
		showLibrary: false,
		actions: ['Placeholder video', 'Recording Type'],
		videoCampaignData: null,
		retainMessage: '',
		uploadProgress: 0,
		gifProgress: 0,
		status: null,
		totalDuration: 0
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			contacts: state => state.contacts.index,
			linkedActivities: state => state.linkedin_activities.index
		}),

		servicesOptions() {
			let services = this.services;
			return services.map(service => {
				return { text: service.name, value: service.id };
			});
		},

		contact_tags() {
			let contact_tags = [];
			this.contacts.forEach(contact => {
				contact.tags.forEach(tag => {
					let exists = contact_tags.find(x => x.value == tag);
					if (!exists) {
						contact_tags.push({
							name: tag,
							value: tag
						});
					}
				});
			});
			return contact_tags;
		}
	},

	created() {
		if (this.videoCampaign) {
			let videoCampaignData = JSON.parse(JSON.stringify(this.videoCampaign));
			videoCampaignData.contact_tags = videoCampaignData.contact_tags
				.filter(x => x)
				.map(x => {
					return { name: x, value: x };
				});
			this.videoCampaignData = videoCampaignData;

			if (this.videoCampaignData.service_id && !this.services.find(x => x.id == this.videoCampaignData.service_id)) {
				this.videoCampaignData.service_id = null;
			}
		} else {
			this.videoCampaignData = {
				name: '',
				title: '',
				description: '',
				initial_message: {},
				service_id: null,
				contact_tags: [],
				userVideos: []
			};
		}
	},

	methods: {
		...mapActions({
			storeVideoCampaign: 'video_campaigns/store',
			updateVideoCampaign: 'video_campaigns/update'
		}),

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

		async generateLinkPreview(userVideo, duration) {
			return new Promise(resolve => {
				(async () => {
					this.uploadProgress += 20;
					let canvas = document.createElement('canvas');
					canvas.width = 500;
					canvas.height = 93;
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
							ctx.rect(25, 35, 460, 42);
							ctx.fillStyle = '#3167e3';
							ctx.fill();

							ctx.drawImage(playImage, 10, 32, 50, 50);
							ctx.font = '17px Arial';
							ctx.fillStyle = 'white';
							ctx.fillText(durationText, 190, 62);
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
					if (this.$refs.messageInput && this.$refs.messageInput.innerText.trim()) {
						data.initial_message.message = this.$refs.messageInput.innerText.trim();
					}
					resolve(Object.assign({}, data.initial_message));
				})();
			});
		},

		submit() {
			if (this.videoCampaignData.userVideos.length) {
				this.setInitialMessage();
				if (this.videoCampaignData.id) {
					this.update();
				} else {
					this.store();
				}
			}
		},

		async update() {
			this.status = 'Processing...';
			let data = JSON.parse(JSON.stringify(this.videoCampaignData));
			data.contact_tags = data.contact_tags.map(x => x.value);
			let userVideo = data.userVideos.find(x => (x || {}).id);
			data.initial_message = await this.generateInitialMessage(this.videoCampaignData);
			data.user_video_ids = data.userVideos.map(x => (x && x.id ? x.id : 'blank'));
			if (userVideo) {
				data.gif_duration = await this.generateLinkPreview(userVideo, this.totalDuration);
			}
			this.status = 'Finalizing...';
			let response = await this.updateVideoCampaign(data);
			this.status = null;
			if (response) {
				this.$emit('update', response);
			}
			this.$emit('close');
		},

		async store() {
			this.status = 'Processing...';
			let data = JSON.parse(JSON.stringify(this.videoCampaignData));
			data.contact_tags = data.contact_tags.map(x => x.value);
			let userVideo = data.userVideos.find(x => x.id);
			data.initial_message = await this.generateInitialMessage(this.videoCampaignData);
			data.user_video_ids = data.userVideos.map(x => x.id || 'blank');
			if (userVideo) {
				data.gif_duration = await this.generateLinkPreview(userVideo, this.totalDuration);
			}
			this.status = 'Finalizing...';
			await this.storeVideoCampaign(data);
			this.status = null;
			this.$emit('close');
		},

		setInitialMessage() {
			let initialMessage = this.$refs.messageInput.innerText || this.videoCampaignData.initial_message.message;
			this.$set(this.videoCampaignData.initial_message, 'message', initialMessage);
			this.$refs.messageInput.innerHTML = '';
		},

		libraryInput(e) {
			e.forEach(x => {
				if (!this.videoCampaignData.userVideos.find(y => y && x && y.id == x.id)) {
					this.videoCampaignData.userVideos.push(x);
				}
			});
		},

		dropdownAction(action) {
			switch (action) {
				case 'Placeholder video':
					this.videoCampaignData.userVideos.push({});
					break;
				default:
					this.showLibrary = true;
			}
		},
		isImage(extension) {
			let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];
			return imageExtensions.indexOf(extension) > -1;
		},

		messageInput(e) {
			if ((e.keyCode ? e.keyCode : e.which) == 13) {
				e.preventDefault();
				this.setInitialMessage();
			}
		},

		addFile(e) {
			let fileInput = e.target;
			let fileExtension = fileInput.value.split('.').pop();
			this.$set(this.videoCampaignData.initial_message, 'type', 'file');
			this.$set(this.videoCampaignData.initial_message, 'extension', fileExtension);
			this.$set(this.videoCampaignData.initial_message, 'filename', fileInput.value.split(/(\\|\/)/g).pop());

			if (this.isImage(fileExtension)) {
				this.$set(this.videoCampaignData.initial_message, 'type', 'image');
				loadImage(
					fileInput.files[0],
					canvas => {
						let dataurl = canvas.toDataURL(fileInput.files[0].type);
						this.$set(this.videoCampaignData.initial_message, 'preview', dataurl);
						this.$set(this.videoCampaignData.initial_message, 'new_preview', dataurl);
						this.$set(this.videoCampaignData.initial_message, 'source', fileInput.files[0]);
						this.$set(this.videoCampaignData.initial_message, 'new_source', fileInput.files[0]);
						fileInput.value = '';
					},
					{ maxWidth: 450, canvas: true }
				);
			} else {
				this.$set(this.videoCampaignData.initial_message, 'source', fileInput.files[0]);
				this.$set(this.videoCampaignData.initial_message, 'new_source', fileInput.files[0]);
			}
		},

		addVideo() {
			localStorage.setItem('videoCampaignStorageTitle', this.videoCampaignData.title);
			localStorage.setItem('videoCampaignStorageDescription', this.videoCampaignData.description);
			localStorage.setItem('videoCampaignMessage', this.$refs.messageInput.innerText);
			localStorage.setItem('videoCampaignService', this.videoCampaignData.service_id);
			this.$emit('showLibrary', true);
		}
	}
};
</script>

<style lang="scss" scoped>
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
.form-intent {
	width: 300px;
}
.message-input {
	font-size: 14px;
	max-height: 120px;
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
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
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	@apply text-white p-3 outline-none text-sm;
}
</style>
