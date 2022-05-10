<template>
	<div class="relative h-screen overflow-auto">
		<Add v-if="adding" :videoCampaign="videoCampaign" @close="adding = false"></Add>
		<VideoMessageAdd v-if="editVideoMessage"></VideoMessageAdd>

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

					<template v-else v-for="vMessage in videoCampaign.video_messages">
						<div class="flex items-start justify-between contact-row" :key="vMessage.id">
							<div class="flex-grow flex items-center gap-3">
								<div class="flex gap-2 h-24">
									<template v-for="(video, videoIndex) in vMessage.videos">
										<template v-if="video.user_video">
											<div v-if="videoIndex < 3" class="h-24 w-44 bg-center bg-cover bg-no-repeat bg-gray-50 relative" :key="`video-${video.id}`" :style="{ backgroundImage: `url(${video.user_video.thumbnail})` }">
												<div v-if="videoIndex == 2 && vMessage.videos.length > 3" class="absolute-center w-full h-full bg-black bg-opacity-40">
													<span class="absolute-center text-white">+{{ vMessage.videos.length - 2 }}</span>
												</div>
												<span v-else class="text-xxs absolute bottom-1 left-1 text-white bg-black bg-opacity-25 p-1 rounded leading-none">{{ format(video.user_video.duration, { leading: true }) }}</span>
											</div>
										</template>
										<div v-else class="user-video border-dashed border border-gray-300" :key="`video-${videoIndex}`">
											<span class="absolute-center text-3xl">+</span>
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
	</div>
</template>

<script>
import copy from 'copy-text-to-clipboard';
import { mapState, mapActions } from 'vuex';
import InfoCircleIcon from '../../../icons/info-circle.vue';
const format = require('format-duration');
import dayjs from 'dayjs';
import Add from './add.vue';
import VideoMessageAdd from '../video-messages/add.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import CogIcon from '../../../icons/cog';
import PlusIcon from '../../../icons/plus.vue';
import ThumbupIcon from '../../../icons/thumb-up';
import ThumbdownIcon from '../../../icons/thumb-down';
import CommentIcon from '../../../icons/comment-solid';
import ShareIcon from '../../../icons/share';
import EyeIcon from '../../../icons/eye-solid';

export default {
	components: { InfoCircleIcon, Add, VueSelect, VueDropdown, ToggleSwitch, CogIcon, PlusIcon, ThumbupIcon, ThumbdownIcon, CommentIcon, ShareIcon, EyeIcon, VideoMessageAdd },
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
		app_url: process.env.MIX_APP_URL,
		showLibrary: false,
		format: format,
		dayjs: dayjs,
		videoCampaign: null,
		adding: false,
		editVideoMessage: false
	}),

	created() {
		this.getContacts({ nopaginate: true });
		this.getVideoCampaigns();
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			getVideoCampaigns: 'video_campaigns/index',
			updateVideoMessage: 'video_messages/update'
		}),

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
						let greeting = this.videoCampaign.title;
						let matches = this.videoCampaign.title.match(regex);
						matches.forEach(match => {
							let prop = videoMessage.contact[match.trim()] || '';
							greeting = greeting.replace(`{{${match}}}`, prop);
						});

						let body = this.videoCampaign.description;
						matches = this.videoCampaign.description.match(regex);
						matches.forEach(match => {
							let prop = videoMessage.contact[match.trim()] || '';
							body = body.replace(`{{${match}}}`, prop);
						});

						element += `<tr><td>${greeting.trim()},</td></tr>`;
						element += `<tr><td>${body}</td></tr>`;
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
