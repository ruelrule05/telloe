import {mapGetters, mapActions} from 'vuex';
import dayjs from 'dayjs';
import filesize from 'filesize';
const mime = require('mime');
const loadImage = require('blueimp-load-image');

import VueFormValidate from '../../../../components/vue-form-validate';
import Emojipicker from '../../../../components/emojipicker';
import Modal from '../../../../components/modal/modal.vue';
import MessageType from './message-type';

import VideoIcon from '../../../../icons/colored-video';
import CastIcon from '../../../../icons/cast';
import InfoCircleIcon from '../../../../icons/info-circle';
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

import Tooltip from '../../../../js/directives/tooltip';

const emojiRegex = require('emoji-regex');
export default {
    components: {
        VueFormValidate,
        Emojipicker,
        Modal,
        MessageType,

        VideoIcon,
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

        info: () => import(/* webpackChunkName: "dashboard-conversations-show-info" */ './info/info.vue'),
        gallery: () => import(/* webpackChunkName: "gallery" */ '../../../../components/gallery/gallery.vue'),
        'video-recorder-modal': () => import(/* webpackChunkName: "modals-videorecorder" */ '../../../../modals/video-recorder'),
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
    }),

    watch: {
        ready: function(value) {
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
            if (value) this.scrollDown();
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
        this.$root.socket.on('new_messagex', data => {
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
            deleteMessage: 'messages/delete',
        }),

        messageInput(e) {
            if ((e.keyCode ? e.keyCode : e.which) == 13) {
                e.preventDefault();
                this.$refs['messageForm'].submit();
            }
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
                    metadata: {duration: audio.duration},
                };
                this.sendMessage(message);
                this.recorder = '';
            }
        },

        sendVideo(video) {
            if (this.conversation) {
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
                message.sending = true;
                message.prefix = 'You: ';
                message.tags = [];
                message.conversation_id = this.conversation.id;

                if (message.type == 'text' && message.message.trim().length == 2) {
                    let regex = emojiRegex();
                    if (regex.exec(message.message)) {
                        message.type = 'emoji';
                    }
                }
                this.storeMessage(message).then(message => {
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

                    loadImage(
                        fileInput.files[0],
                        canvas => {
                            let dataurl = canvas.toDataURL(fileInput.files[0].type);
                            message.preview = dataurl;
                            this.sendMessage(message);
                        },
                        {maxWidth: 200, canvas: true},
                    );
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
                    {maxWidth: 350, canvas: true},
                );
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
