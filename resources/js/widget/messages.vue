<template>
    <div class="snapturebox-overflow-hidden snapturebox-h-100 snapturebox-d-flex snapturebox-flex-column">
        <div class="snapturebox-flex-grow-1 snapturebox-overflow-auto snapturebox-p-3">
            <div v-for="grouped_message in grouped_messages" class="snapturebox-w-100 snapturebox-message-group">
                <div class="snapturebox-message-item" v-for="message in grouped_message.messages" v-cloak :class="{'snapturebox-outgoing-message': message.user.id == $root.auth.id}">
                    <div class="snapturebox-media snapturebox-mb-1 snapturebox-text-left snapturebox-d-inline-flex">
                        <img :src="message.user.profile_image ? message.user.profile_image : 'https://via.placeholder.com/34X34'" width="34" class="snapturebox-rounded-circle" alt="image">
                        <div class="snapturebox-media-body snapturebox-pl-2">
                            <div class="snapturebox-font-weight-bold snapturebox-line-height-sm snapturebox-mb-n1">{{ message.user.id == $root.auth.id ? 'You' : message.user.full_name }}</div>
                            <small class="snapturebox-text-gray">{{ message.created_at }}</small>
                        </div>
                    </div>
                    <div>
                        <div class="snapturebox-message-content snapturebox-d-inline-block snapturebox-message-content snapturebox-text-break">
                            <p class="snapturebox-mb-0 snapturebox-h2" v-if="message.type == 'emoji'">{{ message.message }}</p>
                            <p class="snapturebox-mb-0" v-else-if="message.type == 'image'"><img class="snapturebox-w-100 snapturebox-rounded snapturebox-cursor-pointer" :src="message.message.preview" @click="$emit('openMedia', message)"></p>
                            <p class="snapturebox-mb-0" v-else-if="message.type == 'file'">{{ message.message }}</p>
                            <div class="snapturebox-mb-0" v-else-if="message.type == 'text'">
                                <p class="snapturebox-mb-0">{{ message.message }}</p>
                                <a v-if="message.preview" class="snapturebox-my-2 snapturebox-d-block snapturebox-text-decoration-none" :href="message.preview.url" target="_blank">
                                    <div v-if="typeof message.preview == 'boolean'" class="snapturebox-text-center">
                                        <div class="snapturebox-spinner-border snapturebox-spinner-border-sm" role="status"> </div>
                                    </div>
                                    <div v-else class="snapturebox-bg-light snapturebox-rounded snapturebox-p-2">
                                        <div v-if="message.preview.favicon" class="snapturebox-text-center snapturebox-mb-2">
                                            <img :src="message.preview.favicon" height="20">
                                        </div>
                                        <h6 class="snapturebox-text-dark snapturebox-mb-0 snapturebox-font-weight-bold">{{ message.preview.title }}</h6>
                                        <div class="snapturebox-line-height-sm">
                                            <small class="snapturebox-text-gray">{{ message.preview.description }}</small>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <vue-form-validate @submit="sendText" class="snapturebox-border-top snapturebox-shadow-sm snapturebox-p-2 snapturebox-d-flex snapturebox-align-items-center snapturebox-bg-white">
            <input type="text" v-model="textMessage" class="snapturebox-form-control snapturebox-form-control-sm snapturebox-pl-0" placeholder="Write a message.." data-required>
            <button class="snapturebox-btn snapturebox-px-0" type="submit" :disabled="textMessage.trim().length == 0"><send-icon></send-icon></button>
            <button type="button" class="snapturebox-ml-2 snapturebox-btn snapturebox-px-0 snapturebox-emojipicker" @blur="emojipicker = false" :class="{'snapturebox-emojipicker-open': emojipicker}">
                <smile-icon class="snapturebox-cursor-pointer" @click.native="emojipicker = emojipicker ? false : true"></smile-icon>
                <VEmojiPicker :emojisByRow="6" @select="selectEmoji" />
            </button>
            <button class="snapturebox-ml-2 snapturebox-btn snapturebox-px-0" type="button" @click="$emit('addMedia')"><camera-icon></camera-icon></button>
            <button class="snapturebox-ml-2 snapturebox-btn snapturebox-px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon></add-note-icon></button>
            <input type="file" hidden ref="fileMedia" @change="addFile">
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
export default {
    components: {VEmojiPicker, AddMediaModal, SmileIcon, VideoIcon, SendIcon, CameraIcon, AddNoteIcon},
    props: {
        messages: {
            type: Array,
            default: [],
            required: true
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
    },

    mounted() {
    },

    methods: {
        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },

        async addFile() {
            let fileInput = this.$refs['fileMedia'];
            if (fileInput.value) {
                const timestamp = dayjs().valueOf();

                let fileBase64 = await this.fileToBase64(this.$refs['fileMedia'].files[0]);
                let fileExtension = fileInput.value.split('.').pop();
                this.$emit('send',  {
                    user: this.$root.auth,
                    message: {
                        filename: fileInput.value.split(/(\\|\/)/g).pop(),
                        extension: fileExtension,
                        base64: fileBase64,
                        size:  filesize(fileInput.files[0].size, {round: 0})
                    },
                    type: 'file',
                    timestamp: dayjs().valueOf(),
                    created_at: dayjs(timestamp).format('hh:mm A')
                });
            }
        },

        sendText() {
            const timestamp = dayjs().valueOf();
            this.$emit('send',  {
                user: this.$root.auth,
                message: this.textMessage.trim(),
                type: 'text',
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A')
            });
            this.textMessage = '';
        },

        selectEmoji(emoji) {
            const timestamp = dayjs().valueOf();
            this.emojipicker = false;
            this.$emit('send',  {
                user: this.$root.auth,
                message: emoji.data,
                type: 'emoji',
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A')
            });
        }
    },
};
</script>