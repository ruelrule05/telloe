<template>
	<div>
		<vue-form-validate
			v-if="videoMessageData"
			@submit="
				if (videoMessageData.userVideos.length) {
					setInitialMessage();
					$emit('submit', videoMessageData);
				}
			"
			class="min-h-screen relative flex flex-col"
		>
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10 p-5">
				<div class="ml-7 lg:w-4/12 w-100 lg:ml-0">{{ videoMessageData.id ? 'EDIT' : 'CREATE' }} VIDEO MESSAGE</div>
				<div class="flex items-center gap-2">
					<button type="button" class="btn btn-md btn-outline-primary" @click="$emit('close')">
						<span>Cancel</span>
					</button>

					<button type="submit" class="btn btn-md btn-primary" :disabled="!videoMessageData.userVideos.length">
						<span>{{ videoMessageData.id ? 'Save' : 'Publish' }} </span>
					</button>
				</div>
			</div>
			<div class="h-20 lg:hidden block" />
			<div class="flex-grow overflow-auto flex items-stretch relative">
				<div class="text-left relative overflow-hidden w-full flex">
					<div class="flex-grow w-full h-full overflow-hidden">
						<div class="flex flex-col w-full h-full">
							<div class="bg-black flex-grow relative">
								<div v-if="(videoMessageData.userVideos || []).length == 0" class="absolute-center py-1 px-3 text-sm rounded-full border border-white text-white cursor-pointer hover:bg-opacity-20 hover:bg-white" @click="addVideo()">+ Add video</div>
								<VideoPlayer v-else :videos="videoMessageData.userVideos" @totalDuration="$emit('totalDuration', $event)"></VideoPlayer>
							</div>

							<div class="h-28 flex p-2 gap-2 overflow-hidden border-t bg-gray-100 w-full">
								<div>
									<div class="border border-gray-300 h-full w-28 bg-white border-dashed cursor-pointer relative hover:border-gray-600 hover:text-gray-600 text-gray-400" @click="$emit('showLibrary', true)">
										<span class="absolute-center text-3xl">+</span>
									</div>
								</div>

								<div class="flex-grow overflow-x-auto">
									<draggable handle=".user-video" direction="h" :list="videoMessageData.userVideos" class="h-full w-full flex gap-2">
										<div v-for="(userVideo, userVideoIndex) in videoMessageData.userVideos" :key="`userVideo-${userVideo.id}`">
											<div class="user-video cursor-move" :style="{ backgroundImage: `url(${userVideo.thumbnail})` }">
												<div class="absolute top-0.5 right-0.5 cursor-pointer rounded-full p-1.5 bg-black bg-opacity-50 text-white" @click="$emit('removeVideo', userVideoIndex)">
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
					<div class="border-l bg-white">
						<div class="form-intent p-4">
							<h5 class="font-bold font-lg mb-2">Video Details</h5>
							<div class="mb-4">
								<label required>Title</label>
								<input type="text" class="input" v-model="videoMessageData.title" required />
							</div>
							<div class="mb-4">
								<label>Description</label>
								<textarea class="input resize-none" rows="3" v-model="videoMessageData.description"></textarea>
							</div>
							<div class="mb-4">
								<label>Initial Message</label>
								<input type="file" class="hidden" ref="initialMessageFile" @change="addFile" />
								<div v-if="videoMessageData.initial_message.message || videoMessageData.initial_message.source" class="flex items-end">
									<div class="flex-grow overflow-hidden">
										<div class="relative initial-message-container">
											<div v-show="videoMessageData.initial_message.message" class="flex items-end">
												<div class="initial-message flex-grow break-all cursor-text" ref="newInitialMessage" spellcheck="false" v-html="videoMessageData.initial_message.message"></div>
											</div>
											<div v-if="videoMessageData.initial_message.source" class="px-3 py-2 text-white text-sm" :class="{ 'border-t border-dashed border-opacity-40': videoMessageData.initial_message.message }">
												<div v-if="videoMessageData.initial_message.preview" class="w-full h-36 bg-cover bg-center bg-no-repeat rounded relative" :style="{ backgroundImage: `url(${videoMessageData.initial_message.preview})` }">
													<div class="absolute top-0.5 right-0.5 cursor-pointer rounded-full bg-opacity-50 bg-white hover:bg-opacity-100 p-1 transition-colors" @click="videoMessageData.initial_message.source = videoMessageData.initial_message.preview = null">
														<CloseIcon class="h-2.5 w-2.5 text-gray-500 fill-current -mr-px -mb-px"></CloseIcon>
													</div>
												</div>
												<div v-else class="flex justify-between items-center">
													<div class="overflow-hidden truncate opacity-75">
														{{ videoMessageData.initial_message.filename }}
													</div>
													<div class="pl-1">
														<div class="cursor-pointer rounded-full bg-opacity-50 bg-white hover:bg-opacity-100 p-1 transition-colors" @click="videoMessageData.initial_message.source = videoMessageData.initial_message.preview = null">
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

							<div v-if="bookingType == 'service'" class="mb-4">
								<label>Event Type</label>
								<VueSelect :options="servicesOptions" clearable placeholder="Select event type" class="bg-white" v-model="videoMessageData.service_id" dropPosition="top w-full"></VueSelect>
								<span class="text-blue-400 text-xs cursor-pointer hover:underline" @click="bookingType = 'custom'">Set custom booking URL</span>
							</div>

							<div v-else-if="bookingType == 'custom'" class="mb-4">
								<label>Event Type</label>
								<input type="text" class="input" v-model="videoMessageData.booking_url" placeholder="https://example.com" />
								<span class="text-blue-400 text-xs cursor-pointer hover:underline" @click="bookingType = 'service'">Choose from event types</span>
							</div>

							<div class="mb-4">
								<label>Contact</label>
								<VueSelect :disabled="contactID ? true : false" :options="contactsOptions" noValuePlaceholder="No contact found" searchable clearable placeholder="Select contact" class="mb-4 bg-white" v-model="videoMessageData.contact_id" dropPosition="top w-full"></VueSelect>
							</div>

							<div v-if="!linkedinUser && linkedinUsersOptions.length" class="mt-4">
								<label>LinkedIn User</label>
								<VueSelect clearable searchable :options="linkedinUsersOptions" noValuePlaceholder="No LinkedIn user found" placeholder="Select LinkedIn user" class="mb-4" dropPosition="top w-full" v-model="videoMessageData.linkedin_user"></VueSelect>
							</div>
						</div>
					</div>
				</div>
			</div>
		</vue-form-validate>
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

export default {
	props: {
		videoMessage: {
			type: Object,
			default: () => {}
		},

		contactID: {
			default: null
		},

		linkedinUser: {
			default: null
		}
	},
	components: { VideoPlayer, draggable, VueSelect, VueFormValidate, CloseIcon, SendIcon },

	data: () => ({
		videoMessageData: null,
		retainMessage : '',
		bookingType: 'service'
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
		contactsOptions() {
			let contacts = this.contacts;
			return contacts.map(contact => {
				return { text: contact.full_name, value: contact.id };
			});
		},

		linkedinUsers() {
			let linkedinUsers = [];
			this.linkedActivities.forEach(activity => {
				let actor = activity.data.actor;
				if (activity.data.resharedUpdate) {
					actor = activity.data.resharedUpdate.actor;
				}
				if (actor && !linkedinUsers.find(x => x.urn == actor.urn)) {
					linkedinUsers.push(actor);
				}
			});
			return linkedinUsers;
		},

		linkedinUsersOptions() {
			let linkedinUsersOptions = [];
			this.linkedinUsers.forEach(actor => {
				linkedinUsersOptions.push({
					text: actor.name.text,
					value: actor.urn
				});
			});
			return linkedinUsersOptions;
		}
	},

	created() {
		if (this.videoMessage) {
			this.videoMessageData = JSON.parse(JSON.stringify(this.videoMessage));
			if (this.videoMessageData.booking_url) {
				this.bookingType = 'custom';
			} else {
				this.bookingType = 'service';
			}
			if (this.videoMessageData.service_id && !this.services.find(x => x.id == this.videoMessageData.service_id)) {
				this.videoMessageData.service_id = null;
			}
			if (this.contactID) {
				this.videoMessageData.contact_id = this.contactID;
			}
		}
		
		this.isRetainFormData = this.$root.auth.retain_form_data;
		if (this.isRetainFormData) {
			this.retainMessage = localStorage.getItem('videoMessageMessage');
		}
	},
	watch: {
		videoMessage: function () {
			if (this.videoMessage) {
				this.videoMessageData = JSON.parse(JSON.stringify(this.videoMessage));
				if (this.videoMessageData.booking_url) {
					this.bookingType = 'custom';
				} else {
					this.bookingType = 'service';
				}
				if (this.videoMessageData.service_id && !this.services.find(x => x.id == this.videoMessageData.service_id)) {
					this.videoMessageData.service_id = null;
				}

				if (this.contactID) {
					this.videoMessageData.contact_id = this.contactID;
				}
			}
		},
		contactID: function () {
			if (this.videoMessageData) {
				this.videoMessageData.contact_id = this.contactID;
			}
		},
		'videoMessage.userVideos': function () {
			if (this.videoMessage) {
				if (this.videoMessage.userVideos) {
					this.videoMessageData.userVideos = JSON.parse(JSON.stringify(this.videoMessage.userVideos));
				} else {
					this.videoMessageData.userVideos = [];
				}
				if (this.contactID) {
					this.videoMessageData.contact_id = this.contactID;
				}
			}
		}
	},

	methods: {
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

		setInitialMessage() {
			let initialMessage = this.$refs.messageInput.innerText || this.videoMessageData.initial_message.message;
			this.$set(this.videoMessageData.initial_message, 'message', initialMessage);
			this.$refs.messageInput.innerHTML = '';
		},

		addFile(e) {
			let fileInput = e.target;
			let fileExtension = fileInput.value.split('.').pop();
			this.$set(this.videoMessageData.initial_message, 'type', 'file');
			this.$set(this.videoMessageData.initial_message, 'extension', fileExtension);
			this.$set(this.videoMessageData.initial_message, 'filename', fileInput.value.split(/(\\|\/)/g).pop());

			if (this.isImage(fileExtension)) {
				this.$set(this.videoMessageData.initial_message, 'type', 'image');
				loadImage(
					fileInput.files[0],
					canvas => {
						let dataurl = canvas.toDataURL(fileInput.files[0].type);
						this.$set(this.videoMessageData.initial_message, 'preview', dataurl);
						this.$set(this.videoMessageData.initial_message, 'new_preview', dataurl);
						this.$set(this.videoMessageData.initial_message, 'source', fileInput.files[0]);
						this.$set(this.videoMessageData.initial_message, 'new_source', fileInput.files[0]);
						fileInput.value = '';
					},
					{ maxWidth: 450, canvas: true }
				);
			} else {
				this.$set(this.videoMessageData.initial_message, 'source', fileInput.files[0]);
				this.$set(this.videoMessageData.initial_message, 'new_source', fileInput.files[0]);
			}
		},

		addVideo() {
			localStorage.setItem('videoMessageStorageTitle', this.videoMessageData.title);
			localStorage.setItem('videoMessageStorageDescription', this.videoMessageData.description);
			localStorage.setItem('videoMessageMessage', this.$refs.messageInput.innerText);
			localStorage.setItem('videoMessageService', this.videoMessageData.service_id);
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
