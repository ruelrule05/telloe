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
import DocumentIcon from '../../../../icons/document';
import FileArchiveIcon from '../../../../icons/file-archive';
import FilePdfIcon from '../../../../icons/file-pdf';
import FileAudioIcon from '../../../../icons/file-audio';
import VolumeMidIcon from '../../../../icons/volume-mid';
import PlayIcon from '../../../../icons/play';
import CallMenuIcon from '../../../../icons/call-menu';
import VideocamIcon from '../../../../icons/videocam';
import MicrophoneAltIcon from '../../../../icons/microphone-alt';
import DocumentAltIcon from '../../../../icons/document-alt';
import ScreenRecordIcon from '../../../../icons/screen-record';

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
        DocumentIcon,
        FileArchiveIcon,
        FilePdfIcon,
        FileAudioIcon,
        VolumeMidIcon,
        PlayIcon,
        CallMenuIcon,
        VideocamIcon,
        MicrophoneAltIcon,
        DocumentAltIcon,
        ScreenRecordIcon,


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
        pendingFiles: [],
        messagePaginateLoading: false,
    }),

    watch: {
        ready: function(value) {
            if(value) {
                this.$root.contentloading = false;
                this.$root.getFiles(this.conversation);
            }
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
            if (this.conversation && this.conversation.paginated_messages && value.id) {
                let message = this.conversation.paginated_messages.data.find(x => x.id == value.id);
                if (!message) {
                    this.conversation.paginated_messages.data.push(value);
                    if(!['text', 'emoji'].find(x => x == value.type)) {
                        this.conversation.files.data.unshift(value);
                    }
                    this.scrollDown();
                }
            }
        },
        '$route.params.id': function(value) {
            if (value) {
                this.showConversation({id: value});
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
            const messages = ((this.conversation.paginated_messages || {}).data || []).sort((a, b) => {
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
                message_group.created_at = message.created_at;
                message_group.timestamp = message.timestamp;
                grouped_messages.push(message_group);
            }

            return grouped_messages;
        },
    },

    created() {
        this.checkConversation();
        this.$root.socket.on('last_message_read', data => {
            if(this.conversation && this.conversation.id == data.conversation_id) {
                let message = this.conversation.paginated_messages.data.find(x => x.id == data.message_id);
                if(message) this.$set(message, 'is_read', true);
            }
        });

        this.$root.socket.on('is_typing', data => {
            if(this.conversation && this.conversation.id == data.conversation_id) {
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
        window.onbeforeunload = () => {
            if(this.conversation) this.$root.socket.emit('is_typing', {typing: false, conversation_id: this.conversation.id, user_id: this.$root.auth.id});
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

        messageTimezoneTime(message) {
            let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let timezoneTime;
            if(timezone != message.sender.timezone) {
                let messageTZ = this.getTimeZoneOffset(new Date(), message.sender.timezone);
                let localTZ = this.getTimeZoneOffset(new Date(), timezone);
                timezoneTime = dayjs(parseFloat(message.timestamp)).add(messageTZ - localTZ, 'minute');
            } else {
                timezoneTime = dayjs(parseFloat(message.timestamp));
            }

            return timezoneTime.format('hh:mmA on ddd');
        },

        getTimeZoneOffset(date, timeZone) {
            // Abuse the Intl API to get a local ISO 8601 string for a given time zone.
            const options = {timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
            const dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
            const parts = dateTimeFormat.formatToParts(date);
            const map = new Map(parts.map(x => [x.type, x.value]));
            const year = map.get('year');
            const month = map.get('month');
            const day = map.get('day');
            let hour = map.get('hour');
            const minute = map.get('minute');
            const second = map.get('second');
            const ms = date
                .getMilliseconds()
                .toString()
                .padStart(3, '0');
            if (hour == '24') hour = '00';
            const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}`;

            // Lie to the Date object constructor that it's a UTC time.
            const lie = new Date(iso + 'Z');

            // Return the difference in timestamps, as minutes
            // Positive values are West of GMT, opposite of ISO 8601
            // this matches the output of `Date.getTimeZoneOffset`
            return -(lie - date) / 60 / 1000;
        },

        getFiles() {
            if(this.conversation) {
                let page = 0;
                if(!this.conversation.files) {
                    this.$set(this.conversation, 'files', {data: []});
                    page = 1;
                }
                if((this.conversation.files || {}).next_page_url) {
                    const url = new URL(window.location.origin + this.conversation.files.next_page_url);
                    const urlParams = new URLSearchParams(url.search);
                    page = urlParams.get('page');
                }
                if(page) {
                    this.$set(this.conversation, 'filesLoading', true);
                    axios.get(`/conversations/${this.conversation.id}/files?page=${page}`).then(response => {
                        this.conversation.files.data = this.conversation.files.data.concat(response.data.data);
                        this.conversation.files.next_page_url = response.data.next_page_url;
                        this.conversation.filesLoading = false;
                    });
                }
            }
        },

        async messageScroll(e) {
            if (
                e.target.scrollTop == 0 && 
                !this.messagePaginateLoading && 
                this.conversation && 
                (this.conversation.paginated_messages || {}).next_page_url) {
                    let initialHeight = this.$refs['message-group-container'].scrollHeight;
                    this.messagePaginateLoading = true;
                    this.$refs['message-group-container'].classList.add('overflow-hidden', 'pr-2');
                    const url = new URL(window.location.origin + this.conversation.paginated_messages.next_page_url);
                    const urlParams = new URLSearchParams(url.search);
                    const page = urlParams.get('page') || 1;

                    await this.showConversation({id: this.$route.params.id, page: page}).catch(e => {
                    });
                    this.messagePaginateLoading = false;
                    this.$refs['message-group-container'].classList.remove('overflow-hidden', 'pr-2');
                    this.$nextTick(() => {
                        this.$refs['message-group-container'].scrollTop = this.$refs['message-group-container'].scrollHeight - initialHeight;
                    });
            }
        },

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
            let isEnter = false;
            if ((e.keyCode ? e.keyCode : e.which) == 13) {
                isEnter = true;
                this.$refs['messageForm'].submit();
            }
            setTimeout(() => {
                if(!isEnter && this.textMessage.trim().length) {
                    this.typing();
                }
            }, 50);
        },

        async checkConversation() {
            if (this.$route.params.id) {
                await this.showConversation({id: this.$route.params.id}).catch(e => {
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
            if (file.type == 'file') this.$root.downloadMedia(file);
            else this.selectedFile = file;
        },

        dropFile(e) {
            this.dragOver = false;
            this.typing();
            for(let file of e.dataTransfer.files) {
                let parts = file.type.split('/');
                file.extension = file.name.split('.').pop();
                if(this.$root.isImage(file.extension)) {
                    file.dataType = 'image'; 
                } else if(parts[0] == 'video') {
                    file.dataType = 'video'; 
                } else if(parts[0] == 'audio') {
                    file.dataType = 'audio'; 
                } else if(parts[1] == 'pdf') {
                    file.dataType = 'pdf'; 
                } else {
                    file.dataType = 'document'; 
                }

                if(file.dataType == 'image') {
                    loadImage(
                        file,
                        canvas => {
                            let dataurl = canvas.toDataURL(file.type);
                            this.pendingFiles.push({file: file, preview: dataurl});
                        },
                        {maxWidth: 500, canvas: true, pixelRatio: window.devicePixelRatio, downsamplingRatio: 0.5, imageSmoothingEnabled: true},
                    );
                } else {
                    this.pendingFiles.push({file: file});
                }

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

        async sendMessage(message) {
            if (this.conversation) {
                message.user_id = this.$root.auth.id;
                message.sending = true;
                message.prefix = 'You: ';
                message.tags = [];
                message.conversation_id = this.conversation.id;
                message.timestamp = dayjs().valueOf();

                if (message.type == 'text' && message.message.trim().length == 2) {
                    let regex = emojiRegex();
                    if (regex.exec(message.message)) {
                        message.type = 'emoji';
                    }
                }


                this.isTyping = false;
                this.$root.socket.emit('is_typing', {typing: this.isTyping, conversation_id: this.conversation.id, user_id: this.$root.auth.id});
                let response = await this.storeMessage(message);

                if(!['text', 'emoji'].find(x => x == response.type)) {
                    this.conversation.files.data.unshift(response);
                }
                this.scrollDown();
                this.$root.socket.emit('message_sent', {id: response.id, conversation_id: this.conversation.id});
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
                    message.source = file;
                    loadImage(
                        file,
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
                file = new File([file], filename, {type: file.type});

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

        async sendText() {
            let textMessage = this.textMessage.trim();
            this.textMessage = '';
            if(textMessage.length > 0) {
                let message = {
                    user: this.$root.auth,
                    message: textMessage,
                    type: 'text',
                    created_diff: 'Just now',
                };
                await this.sendMessage(message);
            }

            this.pendingFiles.forEach(file => {
                this.addFile({target: {files: [file.file], value: file.file.name}});
            });
            this.pendingFiles = [];
        },
    },
};
