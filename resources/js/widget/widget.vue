<template>
    <div v-if="$root.ready">
        <div v-if="$root.widget && !$root.hidden" :class="{'snapturebox-fullpage': $root.fullPage}" v-cloak>
            <div v-if="!$root.fullPage" id="snapturebox-button" class="snapturebox-bg-primary snapturebox-shadow" @click="toggleWidget">
                <comment-icon fill="white" stroke="white" stroke-width="1"></comment-icon>
            </div>
            <div id="snapturebox-window" :class="{'snapturebox-window-open': $root.open}">
                <div class="snapturebox-d-flex snapturebox-overflow-hidden snapturebox-mh-100 snapturebox-h-100 justify-content-center">
                    <!-- Left -->
                    <div class="snapturebox-overflow-hidden" id="snapturebox-section-left">
                        <div class="snapturebox-d-flex snapturebox-h-100">
                            <!-- Left buttons -->
                            <div class="snapturebox-h-100 snapturebox-bg-white snapturebox-pt-3 snapturebox-px-3 snapturebox-text-center">
                                <div class="snapturebox-pb-3 snapturebox-text-center">
                                    <div v-if="$root.auth" class="snapturebox-profile-image" :style="{backgroundImage: 'url('+$root.API + $root.auth.profile_image+')'}"></div>
                                    <a href="#" v-else class="snapturebox-text-dark" @click.prevent="$root.toggleModal('#loginModal', 'show')"><span class="snapturebox-font-weight-bold">Login</span></a>
                                </div>
                                <div class="snapturebox-pt-2 snapturebox-pb-3">
                                    <widget-chat class="snapturebox-cursor-pointer" @click.native="rightContent = 'messages'"></widget-chat>
                                </div>
                                <div class="snapturebox-py-2 snapturebox-text-center snapturebox-font-heading snapturebox-line-height-sm">
                                    <span class="snapturebox-font-weight-bold">My <br />Inquiries</span>
                                </div>
                                <div class="snapturebox-py-2 snapturebox-text-center snapturebox-font-heading snapturebox-line-height-sm">
                                    <span class="snapturebox-font-weight-bold">My <br />Offers</span>
                                </div>
                                <a v-if="$root.widget_business_hours" href="#"
                                    @click.prevent="
                                        leftContent = 'book';
                                        $root.leftOpen = true;
                                    "
                                    class="snapturebox-py-2 snapturebox-text-center snapturebox-font-heading snapturebox-line-height-sm snapturebox-text-dark"
                                >
                                    <span class="snapturebox-font-weight-bold">Book</span>
                                </a>
                            </div>

                            <!-- Left content -->
                            <div class="snapturebox-d-flex snapturebox-flex-column snapturebox-mh-100 snapturebox-h-100 snapturebox-overflow-auto snapturebox-position-relative">
                                <!-- Inquiries -->
                               <inquiry-form v-if="leftContent == 'inquiry-form'"></inquiry-form>
                               <video-recorder v-else-if="leftContent == 'video-recorder'"></video-recorder>
                               <audio-recorder v-else-if="leftContent == 'audio-recorder'" @submit="sendAudio"></audio-recorder>

                                <!-- DateTimePicker -->
                                <div class="snapturebox-overflow-auto snapturebox-h-100 snapturebox-position-relative snapturebox-p-4" v-else-if="leftContent == 'book'">
                                    <DateTimePicker :businessHours="$root.widget_business_hours"></DateTimePicker>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right -->
                    <!-- Messages -->
                    <div v-if="rightContent == 'messages'" class="snapturebox-shadow snapturebox-position-relative" id="snapturebox-section-right">
                        <messages :messages="messages" @send="sendMessage" ref="messages"></messages>
                    </div>
                </div>
            </div>

            <!-- Modals -->
            <!-- <add-media-modal @submit="addMedia" :itemType="itemType" ref="addMediaModal"></add-media-modal>
            <signup-modal ref="signupModal"></signup-modal>
            <login-modal ref="loginModal"></login-modal>
            <manage-media-modal :media="selectedMedia" @submit="updateMedia" @deleteMedia="deleteMedia"></manage-media-modal>
            <message-media-modal :message="selectedMessage"></message-media-modal> -->

            <transition name="snapturebox-fade">
                <div v-if="$root.backdrop" class="snapturebox-modal-backdrop"></div>
            </transition>
        </div>
        <!-- <input type="file" hidden ref="addMedia" @change="setPreview" accept="image/x-png,image/gif,image/jpeg,video/mp4,video/x-m4v,video/*" /> -->
        <input type="file" hidden ref="addMedia" @change="setPreview" accept="image/x-png,image/gif,image/jpeg" />
    </div>
</template>
<script>
import dayjs from 'dayjs';
import io from 'socket.io-client';
/*let formatNumber = require('format-number');
let format = formatNumber({prefix: '$', padRight: 2});*/
import PanelArrowLeft from '../icons/panel-arrow-left';
import PanelArrowRight from '../icons/panel-arrow-right';
import WidgetChat from '../icons/widget-chat';
import ChevronDown from '../icons/chevron-down';
import CloseIcon from '../icons/close';
import CameraIcon from '../icons/camera';
import SearchIcon from '../icons/search';
import CommentIcon from '../icons/comment';
import ExclamationCircleIcon from '../icons/exclamation-circle';
import ArrowRightIcon from '../icons/arrow-right';
/*import SignupModal from './modals/signup';
import LoginModal from './modals/login';
import ManageMediaModal from './modals/manage-media';
import MessageMediaModal from './modals/message-media';*/
import Tooltip from './directives/tooltip.js';
//import VueLazyload from 'vue-lazyload';
import Messages from './components/messages';
//import VideoRecorder from './components/video-recorder';
//import getUrls from 'get-urls';
//SBVue.use(VueLazyload);
export default {
    components: {PanelArrowLeft, PanelArrowRight, WidgetChat, CameraIcon, ChevronDown, CloseIcon, SearchIcon, CommentIcon, ExclamationCircleIcon, ArrowRightIcon, Messages, 
        'video-recorder': () => import(/* webpackChunkName: "video-recorder" */ './components/video-recorder'),
        'audio-recorder': () => import(/* webpackChunkName: "audio-recorder" */ './components/audio-recorder'),
        'inquiry-form': () => import(/* webpackChunkName: "inquiry-form" */ './components/inquiry-form'),
        'date-time-picker': () => import(/* webpackChunkName: "datetimepicker" */ './components/datetimepicker'),
    },
    directives: {Tooltip},
    data: () => ({
        //format: format,
        enquiry: {
            message: '',
            inquiry_type_id: '',
            interests: [],
            items: [],
            widget_id: '',
        },
        enquiryTypeTooltip: false,
        enquiryInterestTooltip: false,
        enquiryMessageTooltip: false,
        enquiryMediaTooltip: false,
        message: '',
        playing: false,
        signupFormDisabled: false,
        messageInputDisabled: false,
        sent: false,
        socket: null,
        notification_sound: null,
        videoOutput: null,
        leftContent: 'audio-recorder', //inquiries, book
        itemType: '',
        selectedMedia: null,
        rightContent: 'messages', //form
        selectedMessage: {},
        messages: [],
    }),
    computed: {
        customerImagesCount() {
            return this.enquiry.items.filter((i) => i.type == 'image').length;
        },

        sampleImagesCount() {
            return this.enquiry.items.filter((i) => i.type == 'sample').length;
        },

        implodeInterests() {
            let implodeInterests = [];
            this.enquiry.interests.forEach((i) => {
                implodeInterests.push(i.text);
            });
            return [implodeInterests.slice(0, -1).join(', '), implodeInterests.slice(-1)[0]].join(implodeInterests.length < 2 ? '' : ' and ');
        },
        subTotal() {
            let subTotal = 0;
            this.$root.auth.offers.forEach((o) => {
                o.services.forEach((s) => {
                    subTotal += parseInt(s.price);
                });
            });
            return subTotal;
        },
        new_items() {
            let new_items = 2 - this.enquiry.items.length;
            if (new_items < 1) new_items = 1;
            return new_items;
        },
        repliesCount() {
            return this.messages.filter((m) => {
                return m.sender == 'You';
            }).length;
        },
        grouped_messages() {
            const grouped_messages = [];
            if (this.messages) {
                // sort messages by timestamp
                const messages = (this.messages || []).sort((a, b) => {
                    return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
                });
                for (let i = 0; i <= messages.length - 1; i++) {
                    let message_group = {sender: messages[i].sender, messages: [messages[i]]};
                    groupMessage();

                    function groupMessage() {
                        const next_message = messages[i + 1];
                        if (next_message && next_message.sender == messages[i].sender) {
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
        this.notification_sound = new Audio(`${this.$root.API}/notifications/new_message.mp3`);
        /*this.socket = io('https://snapturebox.app:8443');
        this.socket.on('new_message', (data) => {
            this.messages.push(data);
            this.notification_sound.play();
            this.scrollDown();
        });*/
        //this.messages = this.$root.auth ? this.$root.auth.convo.messages : [];


        //if(this.$root.widget.default_chatbot && this.$root.auth) this.callChatbot();
    },
    mounted() {
    },
    methods: {
        sendAudio(audio) {
            this.sendMessage(audio, 'audio');
        },
        
        openPanel(panel) {
            this.leftContent = panel;
        },

        openURL(url) {
            let link = document.createElement("a");
            link.href = url;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            link.remove();
        },

        callChatbot() {
            let bodyFormData = new FormData();
            bodyFormData.set('message', 'stop');
            SBAxios.post('/botman', bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then(async (response) => {
                this.loopChatbotMessages(response.data.messages);
            });
        },

        async loopChatbotMessages(messages) {
            let timeout = 0;
            for(let message of messages) {
                await this.sendChatbotMessage(message, timeout);
                timeout = 1000;
            }
            console.log('ready to listen');
        },

        async sendChatbotMessage(message, timeout = 0) {
            return new Promise((resolve, reject) => {
                // if type is action
                if(message.additionalParameters.type == 'action') {
                    switch(message.additionalParameters.action) {
                        case 'open_url':
                            this.openURL(message.text);
                            break;

                        case 'download_file':
                            this.openURL(message.text);
                            break;

                        case 'trigger_chatbot':
                            //this.bot_id = message.text;
                            /*let bodyFormData = new FormData();
                            bodyFormData.set('bot_id', this.bot_id);
                            SBAxios.post('/botman', bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then(async (response) => {
                                let timeout = 0;
                                for(let message of response.data.messages) {
                                    await this.sendChatbotMessage(message, timeout);
                                    timeout = 2500;
                                }
                            });*/
                            //this.callChatbot(false);
                            break;
                    }
                    return resolve();
                }

                if(message.additionalParameters.end) {
                    console.log('ended');
                    return resolve();
                }
                if(!message.text) {
                    return resolve();
                }
                let type = message.additionalParameters.type || 'text';
                setTimeout(() => {
                    let timestamp = dayjs().valueOf();
                    this.messages.push({
                        message: message.text,
                        type: type,
                        metadata: message.additionalParameters,
                        user: {full_name: 'Genie'},
                        timestamp: timestamp,
                        created_at: dayjs(timestamp).format('hh:mm A'),
                        status: 'is_writing'
                    });
                    setTimeout(() => {
                        let message = this.messages.find((m) => m.timestamp == timestamp);
                        if(message) message.status = 'visible';
                        return resolve();
                    }, 1000);
                    this.$refs['messages'].scrollDown();
                }, timeout);
            });
        },

        openMedia(message) {
            this.selectedMessage = message;
            this.$root.toggleModal('#messageMediaModal', 'show');
        },

        openAddMediaModal() {
            this.itemType = 'message';
            this.$root.toggleModal('#addMediaModal', 'show');
            this.$refs['addMediaModal'].initCamera();
        },

        sendMessage(message, type = 'text', messageAnswer = false) {
            if(messageAnswer && !messageAnswer.message.answer) {
                this.$set(messageAnswer.message, 'answer', messageAnswer.answer);
            }
            if(type != 'action') {
                this.messages.push({
                    message: message.message,
                    type: type,
                    user: this.$root.auth,
                    timestamp: dayjs().valueOf(),
                    created_at: dayjs().valueOf(),
                });
                this.$refs['messages'].scrollDown();
            }
            let bodyFormData = new FormData();
            bodyFormData.set('message', message.message);
            /*SBAxios.post('/botman', bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then(async (response) => {
                this.loopChatbotMessages(response.data.messages);
            });*/


            /*if (!this.$root.auth) {
                this.$root.toggleModal('#loginModal', 'show');
            } else {
                let messageCopy = Object.assign({}, message);
                if (messageCopy.metadata) messageCopy.metadata = JSON.stringify(messageCopy.metadata);
                delete messageCopy.user;
                if (message.type == 'file') message.source = null;

                SBAxios.post('/messages', messageCopy).then((response) => {
                    let index = this.$root.auth.convo.messages.findIndex((x) => x.timestamp == messageCopy.timestamp);
                    if (index > -1) {
                        if (messageCopy.type == 'file') {
                            this.$root.auth.convo.messages[index].source = response.data.source;
                        }
                        this.$root.auth.convo.messages[index].id = response.data.id;
                    }
                });

                let links = [];
                if (message.message) links = [...getUrls(message.message)];
                if (links.length > 0) {
                    message.preview = true;
                    SBAxios.get(`/get_page_preview?url=${links[0]}`)
                        .then((response) => {
                            let index = this.$root.auth.convo.messages.findIndex((x) => x.timestamp == message.timestamp);
                            if (index > -1) {
                                this.$root.auth.convo.messages[index].preview = response.data;
                                this.$refs['messages'].scrollDown();
                                if (this.$root.auth.convo.messages[index].id) {
                                    SBAxios.put(`/messages/${this.$root.auth.convo.messages[index].id}`, {preview: response.data});
                                }
                                let messageCopy = Object.assign({}, message);
                            }
                        })
                        .catch(() => {
                            let index = this.$root.auth.convo.messages.findIndex((x) => x.timestamp == message.timestamp);
                            if (index > -1) this.$root.auth.convo.messages[index].preview = null;
                        });
                }


                this.$root.auth.convo.messages.push(message);
            }*/
        },

        deleteMedia(newMedia) {
            this.enquiry.items.splice(newMedia.index, 1);
        },
        updateMedia(newMedia) {
            this.enquiry.items[newMedia.index] = newMedia.media;
        },
        send() {
            if (!this.enquiry.inquiry_type_id) {
                this.enquiryTypeTooltip = true;
                console.log('1');
                return;
            } else this.enquiryTypeTooltip = false;
            if (this.enquiry.interests.length == 0) {
                this.enquiryInterestTooltip = true;
                console.log('2');
                return;
            } else this.enquiryInterestTooltip = false;
            if (!this.enquiry.message) {
                this.enquiryMessageTooltip = true;
                console.log('3');
                return;
            } else this.enquiryMessageTooltip = false;
            if (this.enquiry.items.length == 0) {
                this.enquiryMediaTooltip = true;
                console.log('4');
                return;
            } else this.enquiryMediaTooltip = false;
            if (this.$root.auth) {
                this.enquiry.widget_id = this.$root.widget.id;
                SBAxios.post('/inquiries', this.enquiry).then((response) => {
                    console.log(response.data);
                    //this.socket.emit('message_sent', response.data);
                });
            } else {
                this.$root.toggleModal('#loginModal', 'show');
            }
        },
        getMessages() {
            SBAxios.get(`${this.domain}/messages`).then((response) => {
                this.messages = response.data;
            });
        },
        loadeddata(e) {
            setTimeout(() => {
                let canvas = document.createElement('canvas');
                canvas.width = this.$refs['videoFile'].videoWidth / 2;
                canvas.height = this.$refs['videoFile'].videoHeight / 2;
                canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
                this.fileOutput.preview = canvas.toDataURL('image/jpeg', 0.8);
            }, 200);
        },
        stopRecord() {
            this.videoRecorder.stopRecording(() => {
                let videoBlob = this.videoRecorder.getBlob();
                let reader = new window.FileReader();
                reader.readAsDataURL(videoBlob);
                reader.onloadend = () => {
                    this.fileOutput = {
                        type: 'video',
                        src: reader.result,
                        blob: URL.createObjectURL(videoBlob),
                    };
                };
            });
            this.isRecording = false;
        },
        startRecord() {
            this.videoRecorder.startRecording();
            this.isRecording = true;
        },
        addComment(index, e) {
            this.enquiry.items[index].edit = false;
            this.items[index].comment = $(e.currentTarget)
                .parent()
                .siblings('textarea')
                .val();
        },
        saveComment(index, e) {
            this.$set(this.enquiry.items[index], 'edit', this.enquiry.items[index].edit ? false : true);
            if (!this.enquiry.items[index].edit) {
                this.enquiry.items[index].comment = $(e.currentTarget)
                    .parent()
                    .siblings('textarea')
                    .val();
            }
        },
        authSubmit() {
            this.sent = true;
            $('#authModal').modal('hide');
            $('.modal-backdrop').remove();
        },
        setPreview(e) {
            let input = $(e.currentTarget);
            let file = input[0].files[0];
            if (file) {
                if (file.type.match('image/jpeg') || file.type.match('image/png')) {
                    let photosize = file.size / 1000000;
                    if (photosize > 5) {
                        alert('Error: Image file too big. Please select image file less than 5MB.');
                    } else {
                        let img = document.createElement('img');
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (oFREvent) => {
                            let canvas = document.createElement('canvas');
                            img.src = oFREvent.target.result;
                            img.addEventListener('load', () => {
                                let ctx = canvas.getContext('2d');
                                let MAX_WIDTH = 600;
                                let MAX_HEIGHT = 600;
                                let width = img.width;
                                let height = img.height;
                                if (width > height) {
                                    if (width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                    }
                                } else {
                                    if (height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                    }
                                }
                                canvas.width = width;
                                canvas.height = height;
                                ctx.drawImage(img, 0, 0, width, height);
                                let dataurl = canvas.toDataURL('image/jpeg');
                                this.enquiry.items.push({
                                    type: this.itemType,
                                    preview: dataurl,
                                    src: img.src,
                                });
                                this.$refs['addMedia'].value = '';
                            });
                        };
                    }
                } else {
                    alert('Error: Invalid image file!');
                    input.val('');
                }
            } else {
            }
        },
        addMedia(fileOutput) {
            if (this.itemType == 'message') {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    source: fileOutput.source,
                    preview: fileOutput.preview,
                    type: 'image',
                    timestamp: dayjs().valueOf(),
                    created_at: dayjs(timestamp).format('hh:mm A'),
                };
                this.$root.auth.convo.messages.push(message);
                this.$refs['messages'].scrollDown();


                let messageCopy = Object.assign({}, message);
                delete messageCopy.user;
                SBAxios.post('/messages', messageCopy);
            } else {
                this.enquiry.items.push(fileOutput);
                this.fileOutput = null;
            }
        },
        /*   scrollDown() {
            setTimeout(() => {
                const message_group = this.$refs['snapturebox-scroll'];
                if (message_group) {
                    message_group.scrollTop = message_group.scrollHeight;
                }
            });
        },*/
        togglePlay() {
            this.playing = this.playing ? false : true;
            if (this.playing) {
                this.$refs['snapturebox-intro'].play();
            } else {
                this.$refs['snapturebox-intro'].pause();
            }
        },
        toggleWidget() {
            this.$root.open = this.$root.open ? false : true;
            if (!this.$root.open && this.$refs['snapturebox-intro']) {
                this.playing = false;
                this.$refs['snapturebox-intro'].pause();
            }
        },
    },
};
</script>
