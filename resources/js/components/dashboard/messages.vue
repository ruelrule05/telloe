<template>
	<div class="d-flex h-100">
		<!-- Conversations list -->
		<div class="conversation-list d-flex flex-column position-relative">
			<div class="p-3 bg-white border-bottom position-relative">
				<strong class="font-heading">Academic English</strong>
			</div>
			<div class="bg-white shadow-sm d-flex">
				<div class="p-3 btn-tab" :class="{'btn-tab-active': conversationTab == 'chats'}">
					<button class="btn px-2 py-1 rounded-0 font-heading font-weight-bold" @click="conversationTab = 'chats'">Chats</button>
				</div>
				<div class="p-3 btn-tab" :class="{'btn-tab-active': conversationTab == 'favorites'}">
					<button class="btn px-2 py-1 rounded-0 font-heading font-weight-bold" @click="conversationTab = 'favorites'">Favorites</button>
				</div>
				<div class="p-3 btn-tab" :class="{'btn-tab-active': conversationTab == 'hidden'}">
					<button class="btn px-2 py-1 rounded-0 font-heading font-weight-bold" @click="conversationTab = 'hidden'">Hidden</button>
				</div>
			</div>

			<div class="overflow-auto p-2">
				<div v-for="conversation in conversations" class="conversation-preview rounded shadow-sm p-3 cursor-pointer mb-2" :class="{'active': selectedConversation && selectedConversation.id == conversation.id}" @click="setConversation(conversation)">
					<div class="media">
					  	<div class="user-profile-image" :style="{backgroundImage: 'url('+conversation.user.profile_image+')'}">
					  		<span v-if="!conversation.user.profile_image">{{ conversation.user.initials }}</span>
					  	</div>
					  	<div class="media-body pl-2">
					    	<h6 class="mt-0 mb-0">{{ conversation.user.full_name }}</h6>
					    	<small v-html="conversation.last_message.message" class="mb-0 text-gray str-limit" :class="[conversation.last_message.is_read ? 'text-gray' : 'text-black font-weight-bold']"></small>
					  	</div>
					</div>
				</div>
			</div>

			<!-- Recorder -->
			<div v-if="selectedConversation" class="recorder position-absolute bg-white" :class="{'open': recorder}">
				<audio-recorder v-if="recorder == 'audio'" @submit="sendAudio"></audio-recorder>
				<video-recorder v-else-if="recorder == 'video'" :conversation="selectedConversation"></video-recorder>
			</div>
		</div>





		<!-- Conversations messages -->
		<div class="conversation-messages border-left text-nowrap flex-grow-1 bg-white overflow-hidden position-relative">
			<div v-if="selectedConversation" class="d-flex flex-column h-100">
				<div class="p-3 bg-white border-bottom position-relative">
					<strong class="font-heading">{{ selectedConversation.user.full_name }}</strong>
				</div>
				<div class="p-3 overflow-auto flex-grow-1" ref="message-group-container">
	                <div v-for="grouped_message in grouped_messages" class="w-100 message-group">
	                    <!-- outgoing message -->
	                	<div class="media outgoing-message" v-if="grouped_message.sender.id == $root.auth.id || grouped_message.sender.id == 'chatbot'">
	                		<div class="media-body pr-2 text-right">
                                <div class="font-weight-bold line-height-1">{{ grouped_message.sender.is_chatbot ? 'Genie' : 'You' }}</div>
	                            <div class="mt-2">
	                            	<div v-for="message in grouped_message.messages" v-cloak class="message-item">
			                            <div class="message-content text-wrap">
			                            	<message-type :message="message"></message-type>
			                            </div>
		                            	<small class="text-gray d-block">{{ message.created_at }}</small>
		                            </div>
	                            </div>
	                        </div>
					  		<div class="user-profile-image" :style="{backgroundImage: 'url('+grouped_message.sender.profile_image+')'}">
								<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
					  		</div>
	                	</div>
						
						<!-- incoming message -->
	                	<div class="media" v-else>
					  		<div class="user-profile-image" :style="{backgroundImage: 'url('+grouped_message.sender.profile_image+')'}">
								<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
					  		</div>
	                		<div class="media-body pl-2">
                                <div class="font-weight-bold line-height-1">{{ grouped_message.sender.full_name }}</div>
                                <div class="mt-2">
		                            <div v-for="message in grouped_message.messages" v-cloak class="message-item">
			                            <div class="message-content text-wrap">
			                            	<message-type :message="message"></message-type>
			                            </div>
		                            	<small class="text-gray d-block">{{ message.created_at }}</small>
		                            </div>
	                            </div>
	                        </div>
	                	</div>
	                    
	                </div>
                </div>

				<div class="px-3 pb-3">
					<vue-form-validate class="d-flex align-items-center border shadow-sm py-3 px-2 rounded" @submit="sendText()">
						<input type="text" class="form-control form-control-sm border-0 shadow-none" v-model="textMessage" data-required placeholder="Write your message..">
			            <button type="button" class="line-height-sm ml-2 btn px-0 emojipicker">
                            <emojipicker @select="sendEmoji"></emojipicker>
			            </button>
			            <button class="line-height-sm ml-2 btn px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon width="20" height="20"></add-note-icon></button>
			            <input type="file" hidden ref="fileMedia" @change="addFile" />
			            <button class="line-height-sm ml-2 btn px-0" type="button" @click="recorder = 'audio'"><microphone-icon width="20" height="20"></microphone-icon></button>
			            <button class="line-height-sm ml-2 btn px-0" type="button" @click="recorder = 'video'"><camera-icon width="20" height="20"></camera-icon></button>
						<button type="submit" class="btn btn-dark badge-pill px-3 btn-sm ml-3">Send</button>
					</vue-form-validate>
				</div>
			</div>
		</div>

		<!-- Conversations details -->
		<div class="conversation-details text-center p-3">
			<div v-if="selectedConversation">
				<div class="user-profile-image d-inline-block" :style="{backgroundImage: 'url('+selectedConversation.user.profile_image+')'}">
					<span v-if="!selectedConversation.user.profile_image">{{ selectedConversation.user.initials }}</span>
				</div>
				<h4 class="font-heading">{{ selectedConversation.user.full_name }}</h4>
                <div class="btn-group btn-group-sm w-100" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-white border">Files</button>
                    <button type="button" class="btn btn-white border-top border-bottom">Inquiries</button>
                    <button type="button" class="btn btn-white border-top border-bottom border-left">Bookings</button>
                    <button type="button" class="btn btn-white border">History</button>
                </div>

			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import filesize from 'filesize';
import VueFormValidate from '../../components/vue-form-validate';
import MessageType from '../../components/message-type';
import AudioRecorder from '../../components/audio-recorder';
import VideoRecorder from '../../components/video-recorder';
import CommentIcon from '../../icons/comment';
import FileVideoIcon from '../../icons/file-video';
import Tooltip from './../../directives/tooltip.js';
import CameraIcon from '../../icons/camera';
import MicrophoneIcon from '../../icons/microphone';
import AddNoteIcon from '../../icons/add-note';
import Emojipicker from '../../components/emojipicker';
export default {
	components: {VueFormValidate, MessageType, AudioRecorder, VideoRecorder, CommentIcon, FileVideoIcon, CameraIcon, MicrophoneIcon, AddNoteIcon, Emojipicker},
	directives: {Tooltip},

    data: () => ({
    	conversationTab: 'chats',
    	conversations: [],
    	selectedConversation: null,
    	convoLoading: false,
    	textMessage: '',
        recorder: '',
    }),

    computed: {
        grouped_messages() {
            const grouped_messages = [];
            if (this.selectedConversation.messages) {
                // sort messages by timestamp
                const messages = (this.selectedConversation.messages || []).sort((a, b) => {
                    return (parseInt(a.timestamp) > parseInt(b.timestamp)) ? 1 : -1;
                });

                for (var i = 0; i <= messages.length - 1; i++) {
                    let message_group = { sender: messages[i].user || (messages[i].metadata.is_chatbot ? {id: 'chatbot'} : ''), messages: [messages[i]] };
                    groupMessage();

                    function groupMessage() {
                        const next_message = messages[i + 1];
                        if (next_message && next_message.user.id == message_group.sender.id) {
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

    created() {
    	this.getData();
    },

    methods: {
        sendMessage(message) {
            if(this.selectedConversation) {
                this.selectedConversation.messages.push(message);
                this.scrollDown();
                let bodyFormData = new FormData();
                Object.keys(message).map((k) => {
                    bodyFormData.set(k, message[k]);
                });
                axios.post(`/dashboard/messages/${this.selectedConversation.id}`, bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then((response) => {
                    let index = this.selectedConversation.messages.findIndex((x) => x.id == message.id);
                    if(index > -1) {
                        this.selectedConversation.messages[index] = response.data;
                    }
                });
            }
        },

        sendAudio(audio) {
            if(this.selectedConversation) {
                const timestamp = dayjs().valueOf();
            	let message = {
                    user: this.$root.auth,
                    message: audio,
                    timestamp: dayjs().valueOf(),
                    type: 'audio',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                };
            	this.selectedConversation.messages.push(message);
            }
        },

        downloadMedia(message) {
            if (message.source) {
                let link = document.createElement("a");
                link.href = message.source;
                link.download = message.metadata.filename;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
                console.log(link);
            }
        },

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },

        async addFile() {
            let fileInput = this.$refs['fileMedia'];
            if (this.selectedConversation && fileInput.value) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    timestamp: dayjs().valueOf(),
                    type: 'file',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                };

                let fileExtension = fileInput.value.split('.').pop();
                if (this.isImage(fileExtension)) {
                    message.type = 'image';
                    var img = new Image();
                    img.src = URL.createObjectURL(fileInput.files[0]);
                    img.onload = () => {
                        let canvas = document.createElement('canvas');
                        let context = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        let srcUrl = canvas.toDataURL('image/jpeg');
                        // Preview
                        let canvasPreview = document.createElement('canvas');
                        let contextPreview = canvasPreview.getContext('2d');
                        canvasPreview.width = img.width / 2;
                        canvasPreview.height = img.height / 2;
                        contextPreview.drawImage(img, 0, 0, canvasPreview.width, canvasPreview.height);
                        let previewUrl = canvasPreview.toDataURL('image/jpeg');
                        message.source = srcUrl;
                        message.preview = previewUrl;
                        this.selectedConversation.messages.push(message);
                        this.scrollDown();
                    };
                } else {
                    let fileBase64 = await this.fileToBase64(this.$refs['fileMedia'].files[0]);
                    let messageData = {
                        filename: fileInput.value.split(/(\\|\/)/g).pop(),
                        extension: fileExtension,
                        size: filesize(fileInput.files[0].size, {round: 0}),
                    };
                    message.source = fileBase64;
                    message.metadata = messageData;
                    this.selectedConversation.messages.push(message);
                    this.scrollDown();
                }
            }
        },

        isImage(extension) {
            let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
            return imageExtensions.indexOf(extension) > -1;
        },

        sendEmoji(emoji) {
            const timestamp = dayjs().valueOf();
            let message = {
                user: this.$root.auth,
                message: emoji,
                type: 'emoji',
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A'),
            };
            this.sendMessage(message);
        },

    	sendText() {
            const timestamp = dayjs().valueOf();
            let message = {
                user: this.$root.auth,
                message: this.textMessage.trim(),
                type: 'text',
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A'),
            };
            this.sendMessage(message);
    	},

    	getData() {
    		axios.get('/dashboard/messages').then((response) => {
    			this.conversations = response.data;
                this.orderConversations();
    			this.$root.contentloading = false;
    			this.setConversation(this.conversations[0]);
    		});
    	},

        orderConversations() {
            if (this.conversations.length > 0) {
                this.conversations = this.conversations.sort((a, b) => {
                    const a_timestamp = a.last_message.timestamp;
                    const b_timestamp = b.last_message.timestamp;
                    return (a_timestamp > b_timestamp) ? -1 : 1;
                });
            }
        },

        setConversation(conversation) {
        	this.$set(conversation.last_message, 'is_read', true);
            axios.get(`/dashboard/messages/${conversation.id}?is_read=true`).then((response) => {
                this.convoLoading = false;
                this.selectedConversation = response.data;
                this.scrollDown();
            });
        },

        scrollDown() {
            setTimeout(() => {
                const message_group = this.$refs['message-group-container'];
                if (message_group) {
                    message_group.scrollTop = message_group.scrollHeight;
                }
            }, 50);
        },
    }
}
</script>
<style scoped lang="scss">
	@import '../../../sass/variables';
	.recorder{
		height: 100%;
		width: 100%;
		right: -100%;
		transition: right 0.15s;
		&.open{
			right: 0;
		}
	}
	.conversation-messages{
		width: 0;
	}
	.conversation-list{
		width: 350px;
	}
	.conversation-details{
		width: 350px;
		.user-profile-image{
			width: 50px;
			height: 50px;
			span {
				font-size: 18px;
			}
		}
	}
	.btn-tab{
		position: relative;
		.btn{
			color: #aaa;
		}
		&.btn-tab-active{
			border-bottom-color:#999;
			&:after{
				content: '';
				width: 100%;
				height: 2px;
				background-color: #999;
				position: absolute;
				bottom: 0;
				left: 0;
			}
			.btn{
				color: black;
			}
		}
	}
	.user-profile-image{
		width: 35px;
		height: 35px;
	}
	.str-limit {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.conversation-preview{
		background-color: white;
		transition: $transition-base;
		&:hover,
		&.active{
			background-color: #f7f8fc;
		}
	}
	.message-group {
	    margin-bottom: 1.5rem;
	    .media .media-body .message-item:not(:last-child):not(:only-child) {
	    	small {
	    		display: none !important;
	    	}
	    }
	    .message-content {
	        padding: 10px 14px;
	        margin-bottom: 2px;
	        font-size: 14px;
	        display: inline-block;
	        text-align: left;
	    }

	    /* Outgoing message */
        .outgoing-message {
        	padding-left: 45px;
            .message-content {
	            background-color: #DAE3EC;
                border-top-left-radius: $border-radius;
                border-bottom-left-radius: $border-radius;
            }
            .message-item:only-child,
            .message-item:first-child {
                .message-content {
                    border-top-right-radius: $border-radius;
                }
            }
            .message-item:only-child,
            .message-item:last-child:not(:only-child) {
                .message-content {
                    border-bottom-right-radius: $border-radius;
                }
            }
        }

	    /* Incoming message */
	    .media:not(.outgoing-message) {
        	padding-right: 45px;
	        .message-content {
                background-color: #f3f4f9;
	            border-top-right-radius: $border-radius;
	            border-bottom-right-radius: $border-radius;
	        }
	        .message-item:only-child,
	        .message-item:first-child {
	            .message-content {
	                border-top-left-radius: $border-radius;
	            }
	        }
	        .message-item:only-child,
	        .message-item:last-child:not(:only-child) {
	            .message-content {
	                border-bottom-left-radius: $border-radius;
	            }
	        }
	    }
	}
</style>