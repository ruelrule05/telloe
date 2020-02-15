<template>
	<div class="h-100 w-100 overflow-hidden">
		<div v-if="inquiry" class="d-flex h-100">
			<div class="h-100 d-flex ml-auto flex-grow-1 justify-content-end">
				<div class="h-100 overflow-hidden d-flex flex-column w-50">
					<div class="overflow-auto flex-grow-1 bg-white" ref="message-group">
						<div class="px-4 pt-4">
		                    <div class="w-100 message-group">
								<div class="media mb-1">
				                    <img :src="inquiry.user.profile_image ? inquiry.user.profile_image : 'https://via.placeholder.com/34X34'" width="34" class="rounded-circle" alt="image">
				                    <div class="media-body pl-3">
				                        <div class="font-weight-bold mb-1 line-height-1">{{ inquiry.user.full_name }} <small class="text-gray">{{ inquiry.created_at }}</small></div>
				                		<p>{{ inquiry.message }}</p>
				                		<div class="d-flex bg-light rounded p-3">
				                			<div class="w-50">
				                				<h5>Inquiry</h5>
				                				<strong>Inquiry Type</strong>
				                				<div>
				                					{{ inquiry.inquiry_type.type }}
				                				</div>
				                			</div>

				                			<div class="w-50">
				                				<strong>Attached Photos</strong>
					                			<masonry :cols="{default: 3, 991: 2, 768: 1}" :gutter="10" class="mt-3">
													<div v-for="(media, index) in inquiry.inquiry_media" class="mb-3 cursor-pointer position-relative inquiry-media" data-toggle="modal" data-target="#mediaViewModal" @click="mediaViewIndex = index">
														<img :src="media.preview" alt="" class="w-100 rounded" />
														<image-icon v-if="media.type == 'image'" class="text-white position-absolute-center"></image-icon>
														<video-icon v-else-if="media.type == 'video'" class="text-white position-absolute-center"></video-icon>
													</div>
												</masonry>
				                			</div>
				                		</div>
				                    </div>
				                </div>
			                </div>
			            </div>

						<div class="px-4 pt-4x">
		                    <div v-for="grouped_message in grouped_messages" class="w-100 message-group">
		                        <div class="message-item" v-for="message in grouped_message.messages" v-cloak :class="{'outgoing-message': message.user.id == $root.auth.id}">
		                            <div class="media mb-n2">
		                                <img :src="message.user.profile_image ? message.user.profile_image : 'https://via.placeholder.com/34X34'" width="34" class="rounded-circle" alt="image">
		                                <div class="media-body pl-3">
		                                    <div class="font-weight-bold line-height-1">{{ message.user.id == $root.auth.id ? 'You' : message.user.full_name }} <small class="text-gray">{{ message.created_at }}</small></div>
		                                </div>
		                            </div>
		                            <div class="pl-5">
			                            <div class="message-content">
			                                <div v-if="message.type != 'text'" class="position-relative cursor-pointer" data-toggle="modal" data-target="#messageMediaModal" @click="messageMedia = message">
			                                    <div class="position-absolute-center text-center">
			                                        <play-icon></play-icon>
			                                    </div>
			                                    <img :src="message.preview" class="w-100 rounded" alt="">
			                                </div>
			                                <p class="mb-0" v-else>{{ message.message }}</p>
			                            </div>
		                            </div>
		                        </div>
		                    </div>
						</div>
					</div>

					<div class="bg-white p-3 border-top shadow-sm">
						<vue-form-validate class="d-flex align-items-center" @submit="sendText()">
							<input type="text" class="form-control form-control-sm border-0 shadow-none" v-model="textMessage" data-required placeholder="Write your message..">
							<button type="submit" class="btn btn-dark badge-pill px-3 btn-sm">Send</button>
							<div class="cursor-pointer mx-2" v-tooltip.top="'Record video'" @click="videoRecorderOpen = true; $refs['videoRecorder'].initCamera()"><file-video-icon size="1x"></file-video-icon></div>
							<div class="cursor-pointer"><comment-icon size="1x"></comment-icon></div>
						</vue-form-validate>
					</div>
				</div>
				
				<video-recorder :inquiry="inquiry" class="flex-grxow-1" :class="{'video-recorder-open': videoRecorderOpen}" @hide="videoRecorderOpen = false" @submit="sendVideo" ref="videoRecorder"></video-recorder>
			</div>

			<div class="py-3 px-2 bg-light border-left text-center shadow ml-auto rightbar text-break">
				<div class="user-profile mb-4 d-inline-block" :style="{backgroundImage: 'url('+inquiry.user.profile_image+')'}"></div>
				<div class="py-3">
					<panel-arrow-left-icon height="26" width="26" class="cursor-pointer" @click.native="$emit('hide')"></panel-arrow-left-icon>
				</div>
				<div class="py-3">
					<search-icon height="26" width="26"></search-icon>
				</div>
				<div class="py-3">
					<strong>Client Files</strong>
				</div>
				<div class="py-3 text-wrap">
					<strong>Inquiries/Reply</strong>
				</div>
				<div class="py-3">
					<strong>Offers</strong>
				</div>
			</div>
		</div>



		<div v-else>
			Loading..
		</div>

		<div class="modal fade" tabindex="-1" role="dialog" id="messageMediaModal">
		  	<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
			    <div class="modal-content bg-black">
			      	<div class="modal-header p-0">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="messageMedia = null">
				          	<span aria-hidden="true">&times;</span>
				        </button>
			      	</div>
			      	<div class="modal-body p-0 rounded overflow-hidden" v-if="messageMedia">
			      		<img v-if="messageMedia.type == 'image'" :src="messageMedia.message" class="w-100">
			      		<video v-else-if="messageMedia.type == 'video'" :src="messageMedia.message" controls autoplay class="w-100 outline-0"></video>
			      	</div>
			    </div>
		  	</div>
		</div>
		<div class="modal fade" tabindex="-1" role="dialog" id="mediaViewModal">
		  	<div class="modal-dialog modal-dialog-centered" role="document">
			    <div class="modal-content bg-black">
			      	<div class="modal-header p-0">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          	<span aria-hidden="true">&times;</span>
				        </button>
			      	</div>
			      	<div class="modal-body p-0 rounded overflow-hidden" v-if="mediaViewIndex > -1">
			      		<button v-if="mediaViewIndex > 0" class="btn bg-transparent outline-0 position-absolute h-50 shadow-none px-4 cursor-pointer media-control" @click="mediaViewIndex--">
			      			<chevron-left-icon class="position-absolute-center text-white" size="2x"></chevron-left-icon>
			      		</button>
			      		<img v-if="inquiry.inquiry_media[mediaViewIndex].type == 'image' || inquiry.inquiry_media[mediaViewIndex].type == 'sample'" :src="inquiry.inquiry_media[mediaViewIndex].media" class="w-100">
			      		<video v-else-if="inquiry.inquiry_media[mediaViewIndex].type == 'video'" :src="inquiry.inquiry_media[mediaViewIndex].media" controls autoplay class="w-100 outline-0"></video>
			      		<button class="btn bg-transparent outline-0 position-absolute h-50 shadow-none px-4 cursor-pointer media-control" style="right: 0" @click="mediaViewIndex++" v-if="mediaViewIndex < inquiry.inquiry_media.length - 1">
			      			<chevron-right-icon class="position-absolute-center text-white" size="2x"></chevron-right-icon>
			      		</button>
			      	</div>
			    </div>
		  	</div>
		</div>
	</div>
</template>

<script>
import VueFormValidate from './../../../components/vue-form-validate.vue';
import Tooltip from './../../../directives/tooltip.js';
import ImageIcon from 'vue-feather-icons/icons/ImageIcon';
import VideoIcon from 'vue-feather-icons/icons/VideoIcon';
import ChevronLeftIcon from 'vue-feather-icons/icons/ChevronLeftIcon';
import ChevronRightIcon from 'vue-feather-icons/icons/ChevronRightIcon';
import SendIcon from 'vue-feather-icons/icons/SendIcon';
import GiftIcon from 'vue-feather-icons/icons/GiftIcon';
import PauseIcon from 'vue-feather-icons/icons/PauseIcon';
import CheckIcon from 'vue-feather-icons/icons/CheckIcon';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';
import VueMasonry from './../../../components/vue-masonry.js';
import VideoRecorder from './../../../components/video-recorder.vue';


import SearchIcon from '../../../icons/search';
import PanelArrowLeftIcon from '../../../icons/panel-arrow-left';
import FileVideoIcon from '../../../icons/file-video';
import CommentIcon from '../../../icons/comment';
import CloseIcon from '../../../icons/close';
Vue.use(VueMasonry);

export default {
	directives: {Tooltip},

	components: {
		VueFormValidate,
		ImageIcon,
		VideoIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
		SendIcon,
		GiftIcon,
		PauseIcon,
		CheckIcon,
		PlayIcon,
		VideoRecorder,
		SearchIcon,
		PanelArrowLeftIcon,
		FileVideoIcon,
		CommentIcon,
		CloseIcon,
	},

	props: {
		id: {
			type: Number,
		}
	},

	data: () => ({
		inquiry: null,
		mediaViewIndex: -1,
        messages: [],
        newMessage: {
            inquiry_id: 0,
            message: '',
            type: '',
            preview: '',
            video: '',
            videoPreview: '',
        },
        messageMedia: null,
        videoRecorderOpen: false,
        textMessage: ''
	}),


    computed: {
        grouped_messages() {
            const grouped_messages = [];
            if (this.inquiry.messages) {
                // sort messages by timestamp
                const messages = (this.inquiry.messages || []).sort((a, b) => {
                    return (parseInt(a.timestamp) > parseInt(b.timestamp)) ? 1 : -1;
                });

                for (var i = 0; i <= messages.length - 1; i++) {
                    var message_group = { sender: messages[i].user_id, messages: [messages[i]] };
                    groupMessage();

                    function groupMessage() {
                        const next_message = messages[i + 1];
                        if (next_message && next_message.user_id == messages[i].user_id) {
                            message_group.messages.push(messages[i + 1]);
                            i++;
                            groupMessage();
                        }
                    }
                    grouped_messages.push(message_group);
                }
            }

            return grouped_messages;
        },
    },

	mounted() {
		this.scrollDown();
	},

	created() {
		this.$root.heading = 'Inquiries';
		this.getData();
	},

	methods: {
		sendText() {
			this.newMessage.type = 'text';
			this.newMessage.message = this.textMessage;
            let data = new FormData();
            Object.keys(this.newMessage).map((k) => {
                data.append(k, this.newMessage[k]);
            });
            axios.post(`/dashboard/inquiries/${this.inquiry.id}/message`, data, {header : {'Content-Type' : 'multipart/form-data'}}).then((response) => {
                this.inquiry.messages.push(response.data);
                this.newMessage.message = '';
                this.newMessage.type = 'text';
                this.newMessage.video = null;
                this.newMessage.videoPreview = null;
                //this.socket.emit('message_sent', response.data);
                this.scrollDown();
            });
		},

        sendVideo(video) {
            this.newMessage.type = 'video';
            this.newMessage.video = video.blob;
            this.newMessage.videoPreview = video.preview;
            let data = new FormData();
            Object.keys(this.newMessage).map((k) => {
                data.append(k, this.newMessage[k]);
            });

            axios.post(`/dashboard/inquiries/${this.inquiry.id}/message`, data, {header : {'Content-Type' : 'multipart/form-data'}}).then((response) => {
                this.inquiry.messages.push(response.data);
                this.newMessage.message = '';
                this.newMessage.type = 'text';
                this.newMessage.video = null;
                this.newMessage.videoPreview = null;
                //this.socket.emit('message_sent', response.data);
                this.scrollDown();
            });
        },

		getData() {
			axios.get(`/dashboard/inquiries/${this.id}`).then((response) => {
				this.inquiry = response.data;
				this.newMessage.inquiry_id = this.inquiry.id;
				this.$root.contentloading = false;
				this.scrollDown();
			});
		},

        scrollDown() {
            setTimeout(() => {
                const message_group = this.$refs['message-group'];
                if (message_group) {
                    message_group.scrollTop = message_group.scrollHeight;
                }
            }, 10);
        },

		goTo(id) {
			this.$router.push(`/dashboard/inquiries/${id}`);
		},
	},
};
</script>
