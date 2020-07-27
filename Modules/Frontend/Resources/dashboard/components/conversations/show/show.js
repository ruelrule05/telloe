import {mapGetters, mapActions} from 'vuex';
import dayjs from 'dayjs';
import filesize from 'filesize';
const mime = require('mime');
const loadImage = require('blueimp-load-image');
import Compressor from 'compressorjs';

import VueFormValidate from '../../../../components/vue-form-validate';
import Emojipicker from '../../../../components/emojipicker';
import Modal from '../../../../components/modal/modal.vue';
import MessageType from './message-type';

import CastIcon from '../../../../icons/cast';
import InfoCircleIcon from '../../../../icons/colored-info-circle';
import VideoCameraIcon from '../../../../icons/video-camera';
import MicrophoneIcon from '../../../../icons/microphone';
import AddNoteIcon from '../../../../icons/add-note';
import BookmarkIcon from '../../../../icons/bookmark';
import PlusIcon from '../../../../icons/plus';
import HistoryIcon from '../../../../icons/history';
import CloseIcon from '../../../../icons/close';
import ExpandWideIcon from '../../../../icons/expand-wide';
import ColoredPhoneIcon from '../../../../icons/colored-phone';
import TrashIcon from '../../../../icons/trash';
import EyeIcon from '../../../../icons/eye';

import Tooltip from '../../../../js/directives/tooltip';

const emojiRegex = require('emoji-regex');
export default {
    components: {
        VueFormValidate,
        Emojipicker,
        Modal,
        MessageType,

        CastIcon,
        InfoCircleIcon,
        VideoCameraIcon,
        MicrophoneIcon,
        AddNoteIcon,
        BookmarkIcon,
        PlusIcon,
        HistoryIcon,
        CloseIcon,
        ExpandWideIcon,
        ColoredPhoneIcon,
        TrashIcon,
        EyeIcon,

        info: () => import(/* webpackChunkName: "dashboard-conversations-show-info" */ './info/info.vue'),
        gallery: () => import(/* webpackChunkName: "gallery" */ '../../../../components/gallery/gallery.vue'),
        //'video-recorder-modal': () => import(/* webpackChunkName: "modals-videorecorder" */ '../../../../modals/video-recorder'),
        'audio-recorder-modal': () => import(/* webpackChunkName: "modals-audiorecorder" */ '../../../../modals/audio-recorder'),
    },

    directives: {
        Tooltip,
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
        pastedFile: null,
        selectedMessage: null,
        isTyping: false,
        typingTimeout: null,
    }),

    watch: {
        ready: function(value) {
            if(value) this.$root.contentloading = false;
            setTimeout(() => {
                this.scrollDown();
            }, 50);
        },
        'conversation.id': function(value) {
            this.ready = false;
            if (this.$refs['messageInput']) this.$refs['messageInput'].focus();
            this.scrollDown();
        },
        'conversation.ready': function(value) {
            if (value) {
                this.scrollDown();
                this.$root.socket.emit('last_message_read', {conversation_id: this.conversation.id, message_id: this.conversation.last_message.id});
            }
        },
        'conversation.last_message': function(value) {
            if (this.conversation && this.conversation.messages && value.id) {
                let message = this.conversation.messages.find(x => x.id == value.id);
                if (!message) {
                    this.conversation.messages.push(value);
                    this.scrollDown();
                }
            }
        },
        '$route.params.id': function(value) {
            if (value) {
                this.showConversation(value);
                this.checkScreenRecorder();
            }
        },
        '$root.screenRecorder.status': function(value) {
            if (value == 'paused') this.checkScreenRecorder();
            else this.hasScreenRecording = false;
        },
        '$root.screenRecorder.conversation_id': function(value) {
            if (value == this.conversation.id) this.checkScreenRecorder();
            else this.hasScreenRecording = false;
        },
    },

    computed: {
        ...mapGetters({
            getConversation: 'conversations/show',
        }),

        conversation() {
            return this.getConversation(this.$route.params.id);
        },

        isOnline() {
            let is_online = this.$root.online_users.find(x => x == this.conversation.member.id);
            if (!is_online) {
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
                let message = message_group.messages[message_group.messages.length - 1];

                function groupMessage() {
                    const next_message = messages[i + 1];
                    if (next_message && next_message.user && next_message.user.id == message_group.sender.id) {
                        message_group.messages.push(messages[i + 1]);
                        i++;
                        groupMessage();
                    }
                }

                if (message_group.sender.id == this.$root.auth.id || message_group.sender.id == 'chatbot') {
                    message_group.sender.full_name = 'You';
                    message_group.outgoing = true;
                    message_group.is_read = message.is_read;
                }
                message_group.created_at_format = message.created_at_format;
                grouped_messages.push(message_group);
            }

            return grouped_messages;
        },
    },

    created() {
        this.checkConversation();
        this.$root.socket.on('last_message_read', data => {
            if(this.conversation.id == data.conversation_id) {
                let message = this.conversation.messages.find(x => x.id == data.message_id);
                if(message) this.$set(message, 'is_read', true);
            }
        });

        this.$root.socket.on('is_typing', data => {
            if(this.conversation.id == data.conversation_id) {
                if(this.conversation.user.id == data.user_id) {
                    this.$set(this.conversation.user, 'is_typing', data.typing);
                } else {
                    for(let member of this.conversation.members) {
                        if(member.user_id == data.user_id) {
                            this.$set(member, 'is_typing', data.typing);
                            break;
                        }
                    }
                }
                if(data.typing) this.scrollDown();
            }
        });
       /* this.$root.socket.on('new_messagex', data => {
            let conversation = this.$root.conversations.find(x => x.id == data.conversation_id);
            if (conversation) {
                let message = conversation.messages.find(x => x.id == data.id);
                if (!message) {
                    this.$root.getMessageByID(data).then(message => {
                        if (message && message.conversation_id == conversation.id) {
                            conversation.last_message = message;
                            this.$root.message_sound.play();
                            if (this.conversation) {
                                if (conversation.id == this.conversation.id) {
                                    conversation.messages.push(message);
                                    this.scrollDown();
                                } else {
                                    this.$router.push(`/dashboard/conversations/${conversation.id}`);
                                }
                            }
                        }
                    });
                }
            }
        });*/
        window.onbeforeunload = () => {
            this.$root.socket.emit('is_typing', {typing: false, conversation_id: this.conversation.id, user_id: this.$root.auth.id});
        };
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
            deleteMessage: 'messages/delete',
        }),

        typing() {
            if(!this.isTyping) {
                this.isTyping = true;
                this.$root.socket.emit('is_typing', {typing: this.isTyping, conversation_id: this.conversation.id, user_id: this.$root.auth.id});
            } else {
                clearTimeout(this.typingTimeout);
            }

            this.typingTimeout = setTimeout(() => {
                this.isTyping = false;
                this.$root.socket.emit('is_typing', {typing: this.isTyping, conversation_id: this.conversation.id, user_id: this.$root.auth.id});
            }, 5000);
        },

        messageInput(e) {
            setTimeout(() => {
                if ((e.keyCode ? e.keyCode : e.which) == 13) {
                    e.preventDefault();
                    this.$refs['messageForm'].submit();
                } else if(this.textMessage.trim().length) {
                    this.typing();
                }
            }, 50);
        },

        async checkConversation() {
            if (this.$route.params.id) {
                await this.showConversation(this.$route.params.id).catch(e => {
                    this.$router.push('/dashboard/conversations');
                });
            }
        },

        async downloadScreenRecording() {
            if (this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data && !this.$root.screenRecorder.isDownloaded) {
                let video = await this.$root.$refs['screenRecorder'].submit();
                let filename = `${video.timestamp}.${mime.getExtension(video.source.type)}`;
                let link = document.createElement('a');
                link.href = URL.createObjectURL(video.source);
                link.download = filename;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        },

        async sendScreenRecording() {
            if (this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data && !this.$root.screenRecorder.isSent) {
                let video = await this.$root.$refs['screenRecorder'].submit();
                this.sendVideo(video);
            }
        },

        checkScreenRecorder() {
            if (this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data) {
                this.hasScreenRecording = true;
                this.$nextTick(() => {
                    if (this.$refs['screenRecorderData']) {
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
            if (!this.$root.screenRecorder.conversation_id) {
                this.$root.screenRecorder.conversation_id = this.conversation.id;
                this.$nextTick(() => {
                    this.$root.$refs.screenRecorder.initDevices();
                });
            }
        },

        markHistory(message) {
            message.is_history = !message.is_history;
            this.updateMessage(message);
        },

        updateMessageTags(message) {
            const newTag = (message.newTag || '').trim();
            if (newTag && !message.tags.find(x => x == newTag)) message.tags.push(newTag);
            message.newTag = '';
            this.updateMessage(message);
        },

        updateConversationName(e) {
            if (this.conversation) {
                let newName = e.target.textContent.trim();
                if (newName != this.conversation.name) {
                    this.conversation.name = newName;
                    this.updateConversation(this.conversation);
                }
            }
        },

        sendAudio(audio) {
            if (this.conversation) {
                let message = {
                    user: this.$root.auth,
                    source: audio.source,
                    type: 'audio',
                    message: 'audio',
                    created_diff: 'Just now',
                    metadata: {duration: audio.duration},
                };
                this.sendMessage(message);
                this.recorder = '';
            }
        },

        sendVideo(video) {
            if (this.conversation) {
                let message = {
                    user: this.$root.auth,
                    source: video.source,
                    preview: video.preview,
                    type: 'video',
                    message: 'video',
                    created_diff: 'Just now',
                    metadata: {duration: video.duration},
                };
                this.sendMessage(message);
                this.recorder = '';
            }
        },

        openRecorder(type) {
            this.recorder = type;
        },

        openFile(file) {
            if (file.type == 'file') this.downloadMedia(file);
            else this.selectedFile = file;
        },

        dropFile(e) {
            this.dragOver = false;
            this.addFile({target: {files: e.dataTransfer.files, value: e.dataTransfer.files[0].name}});
        },

        downloadMedia(message) {
            if (message.source) {
                let link = document.createElement('a');
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
                reader.onerror = error => reject(error);
            });
        },

        sendMessage(message) {
            if (this.conversation) {
                message.user_id = this.$root.auth.id;
                message.sending = true;
                message.prefix = 'You: ';
                message.tags = [];
                message.conversation_id = this.conversation.id;
                message.timestamp = dayjs().unix();

                if (message.type == 'text' && message.message.trim().length == 2) {
                    let regex = emojiRegex();
                    if (regex.exec(message.message)) {
                        message.type = 'emoji';
                    }
                }

                this.isTyping = false;
                this.$root.socket.emit('is_typing', {typing: this.isTyping, conversation_id: this.conversation.id, user_id: this.$root.auth.id});
                this.storeMessage(message).then(message => {
                    this.scrollDown();
                    this.$root.socket.emit('message_sent', {id: message.id, conversation_id: this.conversation.id});
                });
            }
        },

        async addFile(e) {
            let fileInput = e.target;
            if (this.conversation && fileInput.files.length > 0) {
                let file = fileInput.files[0];
                let message = {
                    user: this.$root.auth,
                    type: 'file',
                    message: 'file',
                    source: file,
                    created_diff: 'Just now',
                };

                let fileExtension = fileInput.value.split('.').pop();
                if (this.$root.isImage(fileExtension)) {
                    message.type = 'image';
                    message.message = 'image';
                    new Compressor(file, {
                        quality: 0.6,
                        success: (result) => {
                            message.source = result;
                            loadImage(
                                result,
                                canvas => {
                                    let dataurl = canvas.toDataURL(fileInput.files[0].type);
                                    message.preview = dataurl;
                                    this.sendMessage(message);
                                },
                                {maxWidth: 200, canvas: true},
                            );
                        },
                        error(err) {
                            console.log(err.message);
                        },
                    });

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

        sendPastedFile() {
            if (this.pastedFile) {
                this.addFile({target: {files: [this.pastedFile.file], value: this.pastedFile.file.name}});
            }
            this.pastedFile = null;
        },

        inputPaste(e) {
            if (e.clipboardData.files.length > 0) {
                e.preventDefault();
                let parts = e.clipboardData.getData('Text').split('.');
                let filename = '';
                if (parts.length > 1) {
                    delete parts[parts.length - 1];
                }
                filename = parts.join('');
                filename += '.png';
                let file = e.clipboardData.files[0];
                loadImage(
                    file,
                    canvas => {
                        let dataurl = canvas.toDataURL(file.type);
                        this.pastedFile = {file: file, preview: dataurl};
                    },
                    {maxWidth: 500, canvas: true, pixelRatio: window.devicePixelRatio, downsamplingRatio: 0.5, imageSmoothingEnabled: true},
                );
            }
        },

        sendText() {
            let message = {
                user: this.$root.auth,
                message: this.textMessage.trim(),
                type: 'text',
                created_diff: 'Just now',
            };
            this.sendMessage(message);
            this.textMessage = '';
        },
    },
};
