<template>
    <div class="snapturebox-overflow-hidden snapturebox-h-100 snapturebox-d-flex snapturebox-flex-column">
        <div class="snapturebox-flex-grow-1 snapturebox-overflow-auto snapturebox-p-3" id="snapturebox-message-group-container" ref="message-group-container">
            <small v-if="$root.widget.welcome_message" class="snapturebox-d-block snapturebox-bg-gray-100 snapturebox-rounded snapturebox-p-3 snapturebox-mb-3 snapturebox-line-height-base">
                {{ $root.widget.welcome_message }}
            </small>
            <div v-for="grouped_message in grouped_messages" class="snapturebox-w-100 snapturebox-message-group">
                <div class="snapturebox-message-item" v-for="message in grouped_message.messages" v-cloak :class="{'snapturebox-outgoing-message': message.user.id == $root.auth.id}">
                    <div class="snapturebox-media snapturebox-mb-1 snapturebox-text-left snapturebox-d-inline-flex">
                        <img :src="message.user.profile_image ? $root.API + message.user.profile_image : 'https://via.placeholder.com/34X34'" width="34" class="snapturebox-rounded-circle" alt="image" />
                        <div class="snapturebox-media-body snapturebox-pl-2">
                            <div class="snapturebox-font-weight-bold snapturebox-line-height-sm snapturebox-mb-n1">{{ message.user.id == $root.auth.id ? 'You' : message.user.full_name }}</div>
                            <small class="snapturebox-text-gray">{{ message.created_at }}</small>
                        </div>
                    </div>
                    <div>
                        <div class="snapturebox-message-content snapturebox-d-inline-block snapturebox-message-content snapturebox-text-break">
                            <p class="snapturebox-mb-0 snapturebox-h2" v-if="message.type == 'emoji'">{{ message.message }}</p>

                            <p class="snapturebox-mb-0" v-else-if="message.type == 'image'">
                                <img class="snapturebox-w-100 snapturebox-rounded snapturebox-cursor-pointer" :src="message.preview" @click="$emit('openMedia', message)" />
                            </p>

                            <p class="snapturebox-mb-0" v-else-if="message.type == 'file'">
                                <img v-if="isImage(message.metadata.extension)" class="snapturebox-w-100 snapturebox-rounded snapturebox-cursor-pointer" :src="message.preview" @click="$emit('openMedia', message)" />
                                <span class=" snapturebox-cursor-pointer" @click="downloadMedia(message)">
                                    <span class="snapturebox-d-block snapturebox-text-center">
                                        <component :is="fileIcon(message.metadata.extension)" fill="white" height="46" transform="scale(1.7)"></component>
                                    </span>
                                    <span class="snapturebox-d-flex snapturebox-align-items-center"> <arrow-circle-down-icon fill="white" height="15" width="15"></arrow-circle-down-icon>&nbsp;{{ message.metadata.filename }} </span>
                                </span>
                            </p>

                            <div class="snapturebox-mb-0" v-else-if="message.type == 'text'">
                                <p class="snapturebox-mb-0">{{ message.message }}</p>
                                <div v-if="message.preview">
                                    <div v-if="typeof message.preview == 'boolean'" class="snapturebox-text-center">
                                        <div class="snapturebox-spinner-border snapturebox-spinner-border-sm" role="status"></div>
                                    </div>
                                    <div v-else v-html="message.preview"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <vue-form-validate @submit="sendText" class="snapturebox-border-top snapturebox-shadow-sm snapturebox-p-2 snapturebox-d-flex snapturebox-align-items-center snapturebox-bg-white">
            <input type="text" v-model="textMessage" class="snapturebox-form-control snapturebox-form-control-sm snapturebox-pl-0" placeholder="Write a message.." data-required />
            <button class="snapturebox-btn snapturebox-px-0" type="submit" :disabled="textMessage.trim().length == 0"><send-icon></send-icon></button>
            <button type="button" class="snapturebox-ml-2 snapturebox-btn snapturebox-px-0 snapturebox-emojipicker" @blur="emojipicker = false" :class="{'snapturebox-emojipicker-open': emojipicker}">
                <smile-icon class="snapturebox-cursor-pointer" @click.native="emojipicker = emojipicker ? false : true"></smile-icon>
                <VEmojiPicker :emojisByRow="6" @select="selectEmoji" />
            </button>
            <button class="snapturebox-ml-2 snapturebox-btn snapturebox-px-0" type="button" @click="$emit('addMedia')"><camera-icon></camera-icon></button>
            <button class="snapturebox-ml-2 snapturebox-btn snapturebox-px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon></add-note-icon></button>
            <input type="file" hidden ref="fileMedia" @change="addFile" />
        </vue-form-validate>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import filesize from 'filesize';
import AddMediaModal from './modals/add-media';
import VEmojiPicker from 'v-emoji-picker';
import SmileIcon from '../icons/smile';
import VideoIcon from '../icons/video';
import SendIcon from '../icons/send';
import CameraIcon from '../icons/camera';
import AddNoteIcon from '../icons/add-note';
import FileEmptyIcon from '../icons/file-empty';
import FileImageIcon from '../icons/file-image';
import FileVideoIcon from '../icons/file-video';
import FileAudioIcon from '../icons/file-audio';
import FilePdfIcon from '../icons/file-pdf';
import FileArchiveIcon from '../icons/file-archive';
import DocumentIcon from '../icons/document';
import ArrowCircleDownIcon from '../icons/arrow-circle-down';
export default {
    components: {VEmojiPicker, AddMediaModal, SmileIcon, VideoIcon, SendIcon, CameraIcon, AddNoteIcon, ArrowCircleDownIcon, FileEmptyIcon, FileImageIcon, FileVideoIcon, FileAudioIcon, FilePdfIcon, FileArchiveIcon, DocumentIcon},
    props: {
        messages: {
            type: Array,
            default: [],
            required: true,
        },
    },

    data: () => ({
        emojipicker: false,
        textMessage: '',
    }),

    computed: {
        grouped_messages() {
            const grouped_messages = [];
            if (this.messages) {
                // sort messages by timestamp
                const messages = (this.messages || []).sort((a, b) => {
                    return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
                });

                for (var i = 0; i <= messages.length - 1; i++) {
                    var message_group = {sender: messages[i].user.id, messages: [messages[i]]};
                    groupMessage();

                    function groupMessage() {
                        const next_message = messages[i + 1];
                        if (next_message && next_message.user.id == messages[i].user.id) {
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

    created() {},

    mounted() {
        this.scrollDown();
    },

    methods: {
        downloadMedia(message) {
            if (message.source) {
                fetch(this.$root.API + message.source, {mode: 'no-cors'})
                  .then(resp => resp.blob())
                  .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = message.metadata.filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                  });
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
            if (fileInput.value) {
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
                        this.$emit('send', message);
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
                    this.$emit('send', message);
                    this.scrollDown();
                }
            }
        },

        sendText() {
            const timestamp = dayjs().valueOf();
            this.$emit('send', {
                user: this.$root.auth,
                message: this.textMessage.trim(),
                type: 'text',
                timestamp: timestamp,
                created_at: dayjs(timestamp).format('hh:mm A'),
            });
            this.textMessage = '';
            this.scrollDown();
        },

        selectEmoji(emoji) {
            const timestamp = dayjs().valueOf();
            this.emojipicker = false;
            this.$emit('send', {
                user: this.$root.auth,
                message: emoji.data,
                type: 'emoji',
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A'),
            });
            this.scrollDown();
        },

        isImage(extension) {
            let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
            return imageExtensions.indexOf(extension) > -1;
        },

        fileIcon(extension) {
            let iconComponent = 'file-empty-icon';
            let videoExtensions = ['mp4', 'webm'];
            let audioExtensions = ['mp3', 'wav'];

            if (this.isImage(extension)) {
                iconComponent = 'file-image-icon';
            } else if (videoExtensions.indexOf(extension) > -1) {
                iconComponent = 'file-video-icon';
            } else if (audioExtensions.indexOf(extension) > -1) {
                iconComponent = 'file-audio-icon';
            } else {
                switch (extension) {
                    case 'pdf':
                        iconComponent = 'file-pdf-icon';
                        break;

                    case 'zip':
                        iconComponent = 'file-archive-icon';
                        break;

                    case 'rar':
                        iconComponent = 'file-archive-icon';
                        break;

                    case 'docx':
                        iconComponent = 'document-icon';
                        break;

                    case 'doc':
                        iconComponent = 'document-icon';
                        break;

                    case 'txt':
                        iconComponent = 'document-icon';
                        break;

                    case 'xls':
                        break;

                    case 'xlsx':
                        break;
                }
            }

            return iconComponent;
        },

        scrollDown() {
            setTimeout(() => {
                const message_group = this.$refs['message-group-container'];
                if (message_group) {
                    message_group.scrollTop = message_group.scrollHeight;
                }
            }, 50);
        },
    },
};
</script>
