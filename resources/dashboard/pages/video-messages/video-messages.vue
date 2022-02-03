<template>
	<div class="min-h-screen relative" :class="{ 'h-screen max-h-screen overflow-hidden': showLibrary }" v-if="ready">
		<!-- video messages list -->
		<div v-show="!adding" class="min-h-screen relative flex flex-col">
			<div>
				<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
					<div class="ml-7 lg:ml-0">VIDEO MESSAGES</div>
					<button v-if="!adding" type="button" class="btn btn-md btn-primary flex items-center" @click="adding = true">
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
								<div class="py-1 px-2 leading-none inline-block text-xs rounded-sm capitalize" :class="[videoMessage.status == 'published' ? 'bg-green-400 text-white ' : 'bg-gray-300 text-gray-400']">{{ videoMessage.status }}</div>
								<div class="flex items-center text-xs text-gray-500 mt-1 gap-4">
									<div>
										<VueDropdown @click="shareVideoMessage($event, videoMessage)" :options="['Copy video link', 'Copy video for email']" class="-mr-1 mt-0.5" dropPosition="right-auto left-0 w-44">
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

						<div>
							<VueDropdown @click="videoMessageAction($event, videoMessage)" :options="[videoMessage.status == 'published' ? 'Set as draft' : 'Publish', 'Delete']" class="-mr-2 mt-1.5" dropPosition="w-28">
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

		<!-- Add form -->
		<vue-form-validate v-show="adding" @submit="store" class="min-h-screen relative flex flex-col">
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
				<div class="ml-7 lg:ml-0">VIDEO MESSAGES</div>
				<div class="flex items-center gap-2">
					<button v-if="success" type="button" class="btn btn-md btn-primary" @click="reset()">
						<span>Done</span>
					</button>
					<button v-if="!success" type="button" class="btn btn-md btn-outline-primary" @click="reset()">
						<span>Cancel</span>
					</button>

					<button v-if="!success" type="submit" class="btn btn-md btn-primary">
						<span>{{ step == 1 ? 'Preview Video' : 'Create' }}</span>
					</button>
				</div>
			</div>
			<div class="h-20 lg:hidden block" />
			<div class="flex-grow overflow-auto min-h-full flex items-stretch relative">
				<div v-if="uploading" class="absolute-center w-full h-full z-50 bg-white">
					<div class="absolute-center text-center">
						<div class="spinner spinner-sm"></div>
					</div>
				</div>

				<div v-if="success && videoMessage" class="w-full">
					<div class="relative text-center h-full overflow-hidden">
						<div class="w-5/12 inline-block text-left py-4">
							Share your video with contacts.
							<div class="flex gap-4 mt-4 rounded-lg p-8 bg-gray-100">
								<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="30" cy="30" r="30" fill="#3167E3" />
									<g clip-path="url(#clip0_2055_11070)">
										<path d="M33.0341 26.966C35.6014 29.536 35.5661 33.6562 33.0496 36.1867C33.0449 36.1919 33.0393 36.1974 33.0341 36.2026L30.1466 39.0901C27.5999 41.6369 23.4564 41.6365 20.9101 39.0901C18.3633 36.5438 18.3633 32.3999 20.9101 29.8535L22.5045 28.2591C22.9273 27.8363 23.6554 28.1173 23.6773 28.7149C23.7051 29.4764 23.8417 30.2414 24.0936 30.9802C24.179 31.2304 24.118 31.5071 23.9311 31.694L23.3687 32.2564C22.1645 33.4606 22.1267 35.4214 23.3191 36.6374C24.5233 37.8655 26.5025 37.8728 27.7159 36.6594L30.6034 33.7723C31.8147 32.561 31.8096 30.603 30.6034 29.3968C30.4444 29.2381 30.2842 29.1147 30.159 29.0286C30.0705 28.9678 29.9974 28.8872 29.9456 28.7931C29.8938 28.6991 29.8647 28.5942 29.8605 28.4869C29.8435 28.0329 30.0044 27.565 30.3632 27.2062L31.2679 26.3015C31.5051 26.0643 31.8772 26.0351 32.1523 26.2271C32.4674 26.4471 32.7624 26.6944 33.0341 26.966ZM39.0899 20.9099C36.5436 18.3635 32.4001 18.3632 29.8534 20.9099L26.9659 23.7974C26.9607 23.8026 26.9551 23.8082 26.9504 23.8133C24.4339 26.3439 24.3986 30.4641 26.9659 33.034C27.2376 33.3057 27.5326 33.5529 27.8476 33.7729C28.1227 33.9649 28.4949 33.9357 28.7321 33.6985L29.6368 32.7938C29.9956 32.435 30.1564 31.9671 30.1394 31.5131C30.1353 31.4058 30.1062 31.3009 30.0543 31.2069C30.0025 31.1128 29.9294 31.0322 29.8409 30.9714C29.7158 30.8853 29.5556 30.7619 29.3966 30.6032C28.1903 29.397 28.1852 27.439 29.3966 26.2277L32.2841 23.3406C33.4975 22.1272 35.4766 22.1345 36.6808 23.3626C37.8732 24.5786 37.8355 26.5394 36.6312 27.7436L36.0689 28.306C35.882 28.4929 35.821 28.7696 35.9063 29.0198C36.1583 29.7586 36.2949 30.5236 36.3227 31.2851C36.3446 31.8827 37.0727 32.1637 37.4955 31.7409L39.0899 30.1465C41.6367 27.6002 41.6367 23.4563 39.0899 20.9099Z" fill="white" />
									</g>
									<defs>
										<clipPath id="clip0_2055_11070">
											<rect width="22" height="22" fill="white" transform="translate(19 19)" />
										</clipPath>
									</defs>
								</svg>

								<div class="flex-grow">
									<h5 class="font-bold font-lg mb-2">Copy Link</h5>
									<div class="text-gray-400 mb-3">Copy a link to your recording to copy to send to contacts on other platforms</div>
									<button class="btn btn-outline-primary btn-sm" type="button" @click="shareVideoMessage('Copy video link', videoMessage)">
										<span>Copy Link</span>
									</button>
								</div>
							</div>
							<div class="flex gap-4 mt-4 rounded-lg p-8 bg-gray-100">
								<svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="30" cy="30" r="30" fill="#3167E3" />
									<path d="M30 19.3438C24.1107 19.3438 19.3438 24.1098 19.3438 30C19.3438 35.8893 24.1098 40.6562 30 40.6562C32.0691 40.6562 34.0967 40.0487 35.8183 38.9279C36.3342 38.5921 36.4467 37.8843 36.0569 37.408L35.6196 36.8738C35.29 36.4711 34.7095 36.3725 34.2715 36.6534C33.0044 37.4661 31.5174 37.9062 30 37.9062C25.6405 37.9062 22.0938 34.3595 22.0938 30C22.0938 25.6405 25.6405 22.0938 30 22.0938C34.3028 22.0938 37.9062 24.5696 37.9062 28.9688C37.9062 30.6353 36.9999 32.3952 35.4068 32.5649C34.6613 32.5454 34.6802 32.0125 34.8277 31.2748L35.8346 26.0709C35.9577 25.4346 35.4703 24.8438 34.8222 24.8438H32.8894C32.7467 24.8437 32.609 24.8963 32.5025 24.9913C32.3961 25.0864 32.3283 25.2173 32.3122 25.3591L32.3118 25.363C31.6803 24.5938 30.5738 24.4274 29.7349 24.4274C26.5303 24.4274 23.8125 27.1015 23.8125 30.9354C23.8125 33.7414 25.3931 35.4845 27.9375 35.4845C29.097 35.4845 30.4026 34.8126 31.1598 33.8374C31.5689 35.3028 32.9049 35.3028 34.1981 35.3028C38.8777 35.3028 40.6562 32.2257 40.6562 28.9688C40.6562 23.1101 35.9307 19.3438 30 19.3438ZM29.0684 32.4247C28.1124 32.4247 27.5186 31.7534 27.5186 30.6728C27.5186 28.7396 28.8411 27.5478 30.0378 27.5478C30.9957 27.5478 31.5675 28.2027 31.5675 29.2996C31.5675 31.2358 30.112 32.4247 29.0684 32.4247Z" fill="white" />
								</svg>

								<div class="flex-grow">
									<h5 class="font-bold font-lg mb-2">Copy For Email</h5>
									<div class="text-gray-400 mb-3">Copy a link to your recording which looks good for email</div>
									<button class="btn btn-outline-primary btn-sm" type="button" @click="shareVideoMessage('Copy video for email', videoMessage)">
										<span>Copy for Email</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-show="!success && !uploading" class="text-left relative overflow-hidden w-full">
					<div class="relative text-center h-full overflow-hidden">
						<div v-show="step == 1" class="text-center py-8">
							<div class="text-left inline-flex gap-6 rounded-lg bg-gray-100 w-5/12 p-8">
								<svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="30" cy="30" r="30" fill="#3167E3" />
									<path d="M27.56 22.32H31.912V18.48H27.56V22.32ZM27.56 42H31.912V24.72H27.56V42Z" fill="white" />
								</svg>
								<div class="flex-grow">
									<h5 class="font-bold font-lg mb-2">Videos</h5>
									<label required>Choose videos from library</label>
									<div class="mb-4">
										<div v-if="!userVideos.length" class="flex items-center h-24">
											<div class="border border-dashed h-full w-full cursor-pointer rounded bg-white relative" @click="showLibrary = true">
												<span class="absolute-center text-sm text-gray-400">+ Add videos</span>
											</div>
										</div>
										<div v-else class="grid grid-cols-4 gap-1.5">
											<div v-for="(userVideo, userVideoIndex) in userVideos" :key="userVideo.id" class="user-video" :style="{ backgroundImage: `url(${userVideo.thumbnail})` }">
												<div class="absolute top-1 right-1 cursor-pointer rounded-full p-1.5 bg-black bg-opacity-50 text-white" @click="userVideos.splice(userVideoIndex, 1)">
													<CloseIcon class="h-2 w-2 transform scale-120 fill-current"></CloseIcon>
												</div>
												<span class="text-xxs absolute bottom-1 left-1 text-white bg-black bg-opacity-25 p-1 rounded leading-none">{{ format(userVideo.duration, { leading: true }) }}</span>
											</div>
											<div class="h-24 rounded-lg relative bg-white border border-dashed cursor-pointer" @click="showLibrary = true">
												<span class="absolute-center text-2xl text-gray-400">+</span>
											</div>
										</div>
									</div>

									<h5 class="font-bold font-lg mb-2">Video Details</h5>
									<div class="mb-4">
										<label required>Title</label>
										<input type="text" class="input" v-model="title" required />
									</div>
									<div class="mb-4">
										<label required>Description</label>
										<textarea class="input resize-none" rows="3" required v-model="description"></textarea>
									</div>
									<h5 class="font-bold font-lg mb-2 mt-6">Initial Message</h5>
									<div class="mb-4">
										<label required>Message content</label>
										<textarea class="input resize-none" rows="3" v-model="initial_message" required></textarea>
									</div>

									<h5 class="font-bold font-lg mb-2 mt-6">Booking Button</h5>
									<div class="mb-4">
										<label required>Event Type</label>
										<VueSelect :options="servicesOptions" required placeholder="Select event type" class="mb-4 bg-white" v-model="service_id" dropPosition="w-full"></VueSelect>
									</div>
									<div class="flex items-center gap-4">
										<span class="text-gray-400 text-sm">Enabled</span>
										<toggle-switch v-model="embed_service"></toggle-switch>
									</div>
								</div>
							</div>
						</div>

						<VideoPlayer v-if="step == 2" :videos="userVideos"></VideoPlayer>
					</div>
				</div>
			</div>
		</vue-form-validate>

		<Library
			v-show="showLibrary"
			@close="showLibrary = false"
			@input="
				userVideos = $event;
				showLibrary = false;
			"
			:selectedUserVideos="userVideos"
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
import { mapState, mapActions } from 'vuex';

import InfoCircleIcon from '../../../icons/info-circle.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import dayjs from 'dayjs';
import CogIcon from '../../../icons/cog';
import ShareIcon from '../../../icons/share';
import EyeIcon from '../../../icons/eye-solid';
import CloseIcon from '../../../icons/close.vue';
import ThumbupIcon from '../../../icons/thumb-up';
import CommentIcon from '../../../icons/comment-solid';
import WarningIcon from '../../../icons/warning';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
const format = require('format-duration');
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import Library from './library.vue';
import copy from 'copy-text-to-clipboard';
import Modal from '../../../components/modal/modal.vue';

import VideoPlayer from '../../../video-message/videoplayer.vue';

export default {
	components: { VideoPlayer, WarningIcon, Modal, CloseIcon, VueFormValidate, InfoCircleIcon, VueSelect, CogIcon, VueDropdown, ShareIcon, EyeIcon, ThumbupIcon, CommentIcon, ToggleSwitch, Library },
	data: () => ({
		app_url: process.env.MIX_APP_URL,
		showLibrary: false,
		format: format,
		dayjs: dayjs,
		uploading: false,
		query: '',
		title: '',
		description: '',
		initial_message: '',
		service_id: null,
		embed_service: false,
		adding: false,
		success: false,
		videoMessage: null,
		userVideos: [],
		step: 1
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
			setVideoMessageStatus: 'video_messages/setStatus',
			deleteVideoMessage: 'video_messages/delete',
			getServices: 'services/index'
		}),

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
			canvas.width = 42;
			canvas.height = 13;
			let ctx = canvas.getContext('2d');
			ctx.font = '14px Arial';
			ctx.fillStyle = 'white';
			ctx.fillText(this.format(videoMessage.videos[0].user_video.duration, { leading: true }), 1, 11);

			let element = `<table><tr><td><div style="width: 580px; max-width: 580px"><div style="font-size: 20px; line-height: 22px; font-weight: 600; color: #3167e3">${videoMessage.title}</div><div style="font-size: 14px; color: #555555; margin-bottom:10px">From ${videoMessage.user.full_name}</div><div style="font-size: 14px; color: #151515; margin-bottom: 10px">${videoMessage.description}</div><div style="display: grid; grid-template-columns: 1fr"><a style="display: block; grid-row-start: 1; grid-column-start: 1" href="${this.app_url}/video-messages/${videoMessage.uuid}"><img style="width: 100%; height: auto;" src="${videoMessage.videos[0].user_video.gif}" /></a><div style="grid-row-start: 1; grid-column-start: 1; display: grid; grid-template-columns: 1fr"><div style="grid-row-start: 1; grid-column-start: 1; display: flex; align-items: center; justify-content: center"><img src="${this.app_url}/images/play.png" width="80" /></div><div style="grid-row-start: 1; grid-column-start: 1; display: flex; align-items: end"><div style="padding: 10px; pointer-events: none;"><img src="${canvas.toDataURL()}" /></div></div></div></div></div></td></tr><tr><td></td></tr></table>`;
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
			if (action == 'Publish' || action == 'Set as draft') {
				let status = action == 'Publish' ? 'published' : 'draft';
				videoMessage.status = status;
				this.setVideoMessageStatus(videoMessage).then(() => {
					if (status == 'published') {
						this.$toast.open('Video message published successfully.');
					} else {
						this.$toast.open('Video message set to draft.');
					}
				});
			} else if (action == 'Delete') {
				this.selectedVideoMessage = videoMessage;
				this.$refs.deleteModal.show();
			}
		},

		async store() {
			if (!this.userVideos.length) {
				return;
			}
			if (this.step == 1) {
				this.step++;
				return;
			}
			this.uploading = true;
			let userVideoIds = this.userVideos.map(x => x.id);
			let videoMessagedata = {
				title: this.title,
				description: this.description,
				initial_message: this.initial_message,
				service_id: this.service_id,
				embed_service: this.embed_service ? 1 : 0,
				user_video_ids: userVideoIds
			};
			let videoMessage = await this.storeVideoMessage(videoMessagedata);
			this.videoMessage = videoMessage.data;
			if (videoMessage.data) {
				this.success = true;
				this.uploading = false;
			}
		},

		reset() {
			this.adding = false;
			this.userVideos = [];
			this.success = false;
			this.title = '';
			this.description = '';
			this.service_id = null;
			this.initial_message = '';
			this.embed_service = false;
			this.step = 1;
		}
	}
};
</script>

<style lang="scss" scoped>
.user-video {
	@apply h-24 rounded-lg relative bg-cover bg-center bg-no-repeat bg-gray-200;
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
