<template>
	<div class="d-flex h-100">
		<!-- Conversations list -->
		<div class="conversation-list d-flex flex-column">
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
					  	<div class="user-profile-image" :style="{backgroundImage: 'url('+conversation.user.profile_image+')'}"></div>
					  	<div class="media-body pl-2">
					    	<h6 class="mt-0 mb-0">{{ conversation.user.full_name }}</h6>
					    	<small v-html="conversation.last_message.message" class="mb-0 text-gray str-limit"></small>
					  	</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Conversations messages -->
		<div class="conversation-messages border-left text-nowrap flex-grow-1 overflow-auto bg-white overflow-hidden">
			<div v-if="selectedConversation" class="d-flex flex-column h-100">
				<div class="p-3 bg-white border-bottom position-relative">
					<strong class="font-heading">{{ selectedConversation.user.full_name }}</strong>
				</div>
				<div class="p-3 overflow-auto flex-grow-1">
	                <div v-for="grouped_message in grouped_messages" class="w-100 message-group">
	                    <div class="message-item" v-for="message in grouped_message.messages" v-cloak :class="{'outgoing-message': message.user.id == $root.auth.id}">
	                        <div class="media">
						  		<div class="user-profile-image" :style="{backgroundImage: 'url('+message.user.profile_image+')'}"></div>
	                            <div class="media-body pl-2">
	                                <div class="font-weight-bold line-height-1">{{ message.user.id == $root.auth.id ? 'You' : message.user.full_name }}</div>
		                            <div class="message-content mt-2 text-wrap">
		                                <p class="mb-0">{{ message.message }}</p>
		                            </div>
		                            <small class="text-gray">{{ message.created_at }}</small>
		                        </div>
	                        </div>
	                    </div>
	                </div>
                </div>

				<div class="px-3 pb-3">
					<vue-form-validate class="d-flex align-items-center border shadow-sm py-3 px-2 rounded" @submit="sendText()">
						<input type="text" class="form-control form-control-sm border-0 shadow-none" v-model="textMessage" data-required placeholder="Write your message..">
						<button type="submit" class="btn btn-dark badge-pill px-3 btn-sm">Send</button>
						<div class="cursor-pointer mx-2" v-tooltip.top="'Record video'" @click="videoRecorderOpen = true; $refs['videoRecorder'].initCamera()"><file-video-icon size="1x"></file-video-icon></div>
						<div class="cursor-pointer"><comment-icon size="1x"></comment-icon></div>
					</vue-form-validate>
				</div>
			</div>
		</div>

		<!-- Conversations details -->
		<div class="conversation-details border">info</div>
	</div>
</template>

<script>
import VueFormValidate from '../../components/vue-form-validate';
import CommentIcon from '../../icons/comment';
import FileVideoIcon from '../../icons/file-video';
import Tooltip from './../../directives/tooltip.js';
export default {
	components: {VueFormValidate, CommentIcon, FileVideoIcon},
	directives: {Tooltip},

    data: () => ({
    	conversationTab: 'chats',
    	conversations: [],
    	selectedConversation: null,
    	convoLoading: false,
    	textMessage: '',
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

    created() {
    	this.getData();
    },

    methods: {
    	sendText() {

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
            axios.get(`/dashboard/messages/${conversation.id}?is_read=true`).then((response) => {
                this.convoLoading = false;
                this.selectedConversation = response.data;
            });
        } 
    }
}
</script>
<style scoped lang="scss">
	@import '../../../sass/variables';
	.conversation-messages{
		width: 0;
	}
	.conversation-list{
		width: 350px;
	}
	.conversation-details{
		width: 350px;
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
	    .message-item:not(:first-child):not(:only-child) {
	        .media {
	            display: none !important;
	        }
	    }
	    .message-content {
	        padding: 6px $border-radius;
	        border-radius: 4px;
	        margin-bottom: 2px;
	        font-size: 14px;
	    }

	    /* Outgoing message */
	    .message-item {
	        &.outgoing-message {
	            &:only-child,
	            &:first-child {
	                .message-content {
	                    border-top-right-radius: $border-radius;
	                }
	            }
	            &:only-child,
	            &:last-child:not(:only-child) {
	                .message-content {
	                    border-bottom-right-radius: $border-radius;
	                }
	            }
	            .message-content {
	                background-color: #f3f4f9;
	                border-top-left-radius: $border-radius;
	                border-bottom-left-radius: $border-radius;
	            }
	        }
	    }

	    /* Incoming message */
	    .message-item:not(.outgoing-message) {
	        .message-content {
	            border-top-right-radius: $border-radius;
	            border-bottom-right-radius: $border-radius;
	            background-color: $gray-300;
	        }
	        &:only-child,
	        &:first-child {
	            .message-content {
	                border-top-left-radius: $border-radius;
	            }
	        }
	        &:only-child,
	        &:last-child:not(:only-child) {
	            .message-content {
	                border-bottom-left-radius: $border-radius;
	            }
	        }
	    }
	}
</style>