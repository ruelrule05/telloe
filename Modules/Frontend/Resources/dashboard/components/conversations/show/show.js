import {mapGetters, mapActions} from 'vuex';
import dayjs from 'dayjs';
import filesize from 'filesize';
const mime = require('mime');

import VueFormValidate from '../../../../components/vue-form-validate';
import Emojipicker from '../../../../components/emojipicker';
import MessageType from './message-type';

import VideoIcon from '../../../../icons/video';
import CastIcon from '../../../../icons/cast';
import CalendarDayIcon from '../../../../icons/calendar-day';
import UserIcon from '../../../../icons/user';
import VideoCameraIcon from '../../../../icons/video-camera';
import MicrophoneIcon from '../../../../icons/microphone';
import AddNoteIcon from '../../../../icons/add-note';
import BookmarkIcon from '../../../../icons/bookmark';
import PlusIcon from '../../../../icons/plus';
import HistoryIcon from '../../../../icons/history';
import CloseIcon from '../../../../icons/close';

import Tooltip from '../../../../js/directives/tooltip';

const emojiRegex = require('emoji-regex');
export default {
	components: {
		VueFormValidate,
		Emojipicker,
		MessageType,

		VideoIcon,
		CastIcon,
		CalendarDayIcon,
		UserIcon,
		VideoCameraIcon,
		MicrophoneIcon,
		AddNoteIcon,
		BookmarkIcon,
		PlusIcon,
		HistoryIcon,
		CloseIcon,

        'info': () => import(/* webpackChunkName: "dashboard/components/show/info" */ './info/info.vue'),
        'file-view-modal': () => import(/* webpackChunkName: "modals/file-view" */ '../../../../modals/file-view'),
        'video-recorder-modal': () => import(/* webpackChunkName: "modals/video-recorder" */ '../../../../modals/video-recorder'),
        'audio-recorder-modal': () => import(/* webpackChunkName: "modals/audio-recorder" */ '../../../../modals/audio-recorder'),
        'screen-recorder-modal': () => import(/* webpackChunkName: "modals/screen-recorder" */ '../../../../modals/screen-recorder'),
	},

	directives: {
		Tooltip
	},

	data: () => ({
        ready: false,
        dragOver: false,
    	textMessage: '',
        moreActions: false,
        emojipicker: false,
        selectedFile: null,
        recorder: '',
        hasScreenRecording: false,
	}),

	watch: {
        ready: function(value) {
            setTimeout(() => {
                this.scrollDown();
            }, 50);
        },
		'conversation.id': function(value) {
            this.ready = false;
            if(this.$refs['messageInput']) this.$refs['messageInput'].focus();
            this.scrollDown();
		},
        'conversation.ready': function(value) {
            if(value) this.scrollDown();
        },
        '$route.params.id': function(value) {
            if(value) {
                this.showConversation(value);
                this.checkScreenRecorder();
            }
        },
        '$root.screenRecorder.status': function(value) {
            if(value == 'paused') this.checkScreenRecorder();
            else this.hasScreenRecording = false;
        },
        '$root.screenRecorder.conversation_id': function(value) {
            if(value == this.conversation.id) this.checkScreenRecorder();
            else this.hasScreenRecording = false;
        }
	},

	computed: {
		...mapGetters({
			getConversation: 'conversations/show'
		}),

		conversation() {
			return this.getConversation(this.$route.params.id);
		},
		
        isOnline() {
            let is_online = this.$root.online_users.find((x) => x == this.conversation.member.id);
            if(!is_online) {
                /*axios.get(`/conversations/${this.conversation.id}`).then((response) => {
                    this.$set(this.conversation.member, 'last_online_format', response.data.member.last_online_format);
                });*/
            }
            return is_online;
        },

		grouped_messages() {
			const grouped_messages = [];
			// sort messages by timestamp
			const messages = (this.conversation.messages || []).sort((a, b) => {
				return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
			});

			for (var i = 0; i <= messages.length - 1; i++) {
				let message_group = {sender: Object.assign({}, messages[i].user) || (messages[i].metadata.is_chatbot ? {id: 'chatbot'} : ''), messages: [messages[i]]};
				groupMessage();

				function groupMessage() {
					const next_message = messages[i + 1];
					if (next_message && next_message.user.id == message_group.sender.id) {
						message_group.messages.push(messages[i + 1]);
						i++;
						groupMessage();
					}
				}

				if (message_group.sender.id == this.$root.auth.id || message_group.sender.id == 'chatbot') {
					message_group.sender.full_name = 'You';
					message_group.outgoing = true;
				}
				message_group.created_at_format = message_group.messages[message_group.messages.length - 1].created_at_format;
				grouped_messages.push(message_group);
			}

			return grouped_messages;
		},
	},

	created() {
        this.checkConversation();
        this.$root.socket.on('new_message', (data) => {
            let conversation = this.$root.conversations.find((x) => x.id == data.conversation_id);
            if(conversation) {
                this.getMessageByID(data).then((message) => {
                    if(message && message.conversation_id == conversation.id) {
                        conversation.last_message = message;
                        this.$root.message_sound.play();
                        if(conversation.id == this.conversation.id) {
                            conversation.messages.push(message);
                            this.scrollDown();
                        } else {
                            this.$router.push(`/dashboard/conversations/${conversation.id}`);
                        }
                    }
                });
            }
        });
	},

    mounted() {
        this.checkScreenRecorder();
    },

	methods: {
    	...mapActions({
            showConversation: 'conversations/show',
      		updateConversation: 'conversations/update',
            storeMessage: 'messages/store',
      		updateMessage: 'messages/update',
    	}),

        async checkConversation() {
            if(this.$route.params.id) {
                await this.showConversation(this.$route.params.id).catch((e) => {
                    this.$router.push('/dashboard/conversations');
                });
            }
        },

        async downloadScreenRecording() {
            if(this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data) {
               let video = await this.$root.$refs['screenRecorder'].submit();
                let filename = `${video.timestamp}.${mime.getExtension(video.source.type)}`; 
                let link = document.createElement("a");
                link.href = URL.createObjectURL(video.source);
                link.download = filename;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        },

        async sendScreenRecording() {
            if(this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data) {
               let video = await this.$root.$refs['screenRecorder'].submit();
               this.sendVideo(video);
           }
        },

        checkScreenRecorder() {
            if(this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data) {
                this.hasScreenRecording = true;
                this.$nextTick(() => {
                    if(this.$refs['screenRecorderData']) {
                        let blob = new Blob(this.$root.screenRecorder.data);
                        this.$refs['screenRecorderData'].src = null;
                        this.$refs['screenRecorderData'].src = URL.createObjectURL(blob);
                        this.$refs['screenRecorderData'].load();
                    }
                });
            } else {
                this.hasScreenRecording = false;
            }
        },

        initScreenRecorder() {
            if(!this.$root.screenRecorder.conversation_id) {
                this.$root.screenRecorder.conversation_id = this.conversation.id;
                this.$nextTick(() => {
                    this.$root.$refs.screenRecorder.initDevices();
                });
            }
        },

        async getMessageByID(data) {
            let message = await axios.get(`/messages/${data.id}`).catch((e) => {});
            if(message) return message.data;
        },


        markHistory(message) {
            message.is_history = !message.is_history;
            this.updateMessage(message);
        },

        updateMessageTags(message) {
            const newTag = (message.newTag || '').trim();
            if(newTag && !message.tags.find((x) => x == newTag)) message.tags.push(newTag);
            message.newTag = '';
            this.updateMessage(message);
        },


        updateConversationName(e) {
            if(this.conversation) {
                let newName = e.target.textContent.trim();
                if(newName != this.conversation.name) {
                    this.conversation.name = newName;
                    this.updateConversation(this.conversation);
                }
            }
        },

        sendAudio(audio) {
            if(this.conversation) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    source: audio.source,
                    timestamp: dayjs().valueOf(),
                    type: 'audio',
                    message: 'audio',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                    metadata: {duration: audio.duration}
                };
                this.sendMessage(message);
                this.recorder = '';
            }
        },

        sendVideo(video) {
            if(this.conversation) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    source: video.source,
                    preview: video.preview,
                    timestamp: dayjs().valueOf(),
                    type: 'video',
                    message: 'video',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                    metadata: {duration: video.duration}
                };
                this.sendMessage(message);
                this.recorder = '';
            }
        },

        openRecorder(type) {
            this.recorder = type;
        },

        openFile(file) {
            this.selectedFile = file;
            if(file.type == 'file') this.downloadMedia(file);
        },

        dropFile(e) {
            this.dragOver = false;
            this.addFile({target: {files: e.dataTransfer.files, value: e.dataTransfer.files[0].name}});
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
            }
        },

        scrollDown() {
            setTimeout(() => {
                const message_container = this.$refs['message-group-container'];
                if (message_container) message_container.scrollTop = message_container.scrollHeight;
                setTimeout(() => {
                    this.ready = true;
                }, 200);
            }, 50);
        },

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },

        isImage(extension) {
            let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
            return imageExtensions.indexOf(extension) > -1;
        },

        sendMessage(message) {
            if(this.conversation) {
                message.prefix = 'You: ';
                message.tags = [];
                message.conversation_id = this.conversation.id;

                if(message.type == 'text' && message.message.trim().length == 2) {
                    let regex = emojiRegex();
                    if(regex.exec(message.message)) {
                        message.type = 'emoji';
                    }
                }
            	this.storeMessage(message).then((message) => {
                    this.scrollDown();
            		this.$root.socket.emit('message_sent', {id: message.id, conversation_id: this.conversation.id});
            	});
            }
        },

        async addFile(e) {
            let fileInput = e.target;
            if (this.conversation && fileInput.files.length > 0) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    timestamp: dayjs().valueOf(),
                    type: 'file',
                    message: 'file',
                    source: fileInput.files[0],
                    timestamp: dayjs().valueOf(),
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                };

                let fileExtension = fileInput.value.split('.').pop();
                if (this.isImage(fileExtension)) {
                    message.type = 'image';
                    message.message = 'image';
                    var img = new Image();
                    img.src = URL.createObjectURL(fileInput.files[0]);
                    img.onload = () => {
                        let canvas = document.createElement('canvas');
                        let context = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        let srcUrl = canvas.toDataURL(fileInput.files[0].type);
                        // Preview
                        let canvasPreview = document.createElement('canvas');
                        let contextPreview = canvasPreview.getContext('2d');
                        canvasPreview.width = img.width / 2;
                        canvasPreview.height = img.height / 2;
                        contextPreview.drawImage(img, 0, 0, canvasPreview.width, canvasPreview.height);
                        let previewUrl = canvasPreview.toDataURL(fileInput.files[0].type);
                        message.preview = previewUrl;
                        this.sendMessage(message);
                    };
                } else {
                    let fileBase64 = await this.fileToBase64(fileInput.files[0]);
                    let messageData = {
                        filename: fileInput.value.split(/(\\|\/)/g).pop(),
                        extension: fileExtension,
                        size: filesize(fileInput.files[0].size, {round: 0}),
                    };
                    message.metadata = messageData;
                    this.sendMessage(message);
                }
            }
        },

        selectEmoji(emoji) {
            this.textMessage += emoji;
            this.$refs['messageInput'].focus();
        },

        inputPaste(e) {
            if(e.clipboardData.files.length > 0) {
                e.preventDefault();
                let parts = e.clipboardData.getData('Text').split('.');
                let filename = '';
                if(parts.length > 1) {
                    delete parts[parts.length - 1]
                }
                filename = parts.join('');
                filename += '.png';
                let file = e.clipboardData.files[0];
                let blob = file.slice(0, file.size, file.type);
                let newFile = new File([blob], filename, {type: file.type});
                this.addFile({target: {files: [newFile], value: newFile.name}});
            }
        },

    	sendText() {
            const timestamp = dayjs().valueOf();
            let message = {
                user: this.$root.auth,
                message: this.textMessage.trim(),
                type: 'text',
                is_read: 1,
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A'),
                created_diff: 'Just now',
            };
            this.sendMessage(message);
            this.textMessage = '';
    	},
	},
};
