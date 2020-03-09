<template>
    <div v-if="$root.ready">
        <div v-if="$root.widget && !$root.hidden" :class="{'snapturebox-fullpage': $root.fullPage}" v-cloak>
            <div v-if="!$root.fullPage" id="snapturebox-button" class="snapturebox-bg-primary snapturebox-shadow" @click="toggleWidget">
                <comment fill="white" stroke="white" stroke-width="1"></comment>
            </div>
            <div id="snapturebox-window" class="snapturebox-rounded-lg snapturebox-shadow snapturebox-border" :class="{'snapturebox-window-open': $root.open}">
                <div class="snapturebox-d-flex snapturebox-overflow-hidden snapturebox-mh-100 snapturebox-h-100 justify-content-center">
                    <!-- Left -->
                    <div class="snapturebox-overflow-hidden snapturebox-bg-white snapturebox-border-right" :class="{'snapturebox-section-left-open': $root.leftOpen}" id="snapturebox-section-left">
                        <div class="snapturebox-d-flex snapturebox-h-100">
                            <!-- Left buttons -->
                            <div class="snapturebox-h-100 snapturebox-pt-5 snapturebox-px-3 snapturebox-text-center snapturebox-border-right">
                                <div class="snapturebox-mb-2">
                                    <button class="snapturebox-btn snapturebox-p-0 snapturebox-section-left-open-toggle snapturebox-shadow-none" @click="$root.leftOpen = $root.leftOpen ? false : true">
                                        <x-icon v-if="$root.fullPage"></x-icon>
                                        <panel-arrow-right v-else-if="$root.leftOpen"></panel-arrow-right>
                                        <panel-arrow-left v-else></panel-arrow-left>
                                    </button>
                                </div>
                                <div class="snapturebox-pt-2 snapturebox-pb-3 snapturebox-text-center">
                                    <div v-if="$root.auth" class="snapturebox-profile-image" :style="{backgroundImage: 'url('+$root.API + $root.auth.profile_image+')'}"></div>
                                    <a href="#" v-else class="snapturebox-text-dark" @click.prevent="$root.toggleModal('#loginModal', 'show')"><small class="snapturebox-font-weight-bold">Login</small></a>
                                </div>
                                <div class="snapturebox-pt-2 snapturebox-pb-3">
                                    <widget-chat class="snapturebox-cursor-pointer" @click.native="rightContent = 'messages'"></widget-chat>
                                </div>
                                <div class="snapturebox-py-2 snapturebox-text-center snapturebox-font-montserrat snapturebox-line-height-sm">
                                    <small class="snapturebox-font-weight-bold">My <br />Inquiries</small>
                                </div>
                                <div class="snapturebox-py-2 snapturebox-text-center snapturebox-font-montserrat snapturebox-line-height-sm">
                                    <small class="snapturebox-font-weight-bold">My <br />Offers</small>
                                </div>
                                <a
                                    v-if="$root.widget_business_hours"
                                    href="#"
                                    @click.prevent="
                                        activeTab = 'book';
                                        $root.leftOpen = true;
                                    "
                                    class="snapturebox-py-2 snapturebox-text-center snapturebox-font-montserrat snapturebox-line-height-sm snapturebox-text-dark"
                                >
                                    <small class="snapturebox-font-weight-bold">Book</small>
                                </a>
                            </div>
                            <!-- Left content -->
                            <div class="snapturebox-d-flex snapturebox-flex-column snapturebox-mh-100 snapturebox-left-content snapturebox-overflow-auto snapturebox-position-relative">
                                <!-- Inquiries -->
                                <div v-if="activeTab == 'inquiries'" class="snapturebox-h-100 snapturebox-left-content-inquiries">
                                    <div class="snapturebox-overflow-auto snapturebox-h-100 snapturebox-position-relative">
                                        <div class="snapturebox-px-4 snapturebox-pt-5 snapturebox-py-3">
                                            <h4 class="snapturebox-font-montserrat">Upload Photos</h4>
                                            <span class="snapturebox-text-secondary snapturebox-font-weight-light snapturebox-font-montserrat">{{ $root.widget.widget_type.upload_description }}</span>
                                            <div class="snapturebox-mt-5">
                                                <!-- Salon -->
                                                <template v-if="$root.widget.widget_type.type == 'Salon'">
                                                    <!-- Current hair -->
                                                    <div class="snapturebox-d-flex">
                                                        <div class="snapturebox-flex-25 snapturebox-line-height-0">
                                                            <h6 class="snapturebox-font-montserrat snapturebox-mb-3">Current Hair</h6>
                                                            <small class="snapturebox-text-muted snapturebox-font-montserrat">Tips: Upload photos of your current hair style in natural form possible.</small>
                                                        </div>
                                                        <div class="snapturebox-pl-5 snapturebox-flex-grow-1 snapturebox-position-relative">
                                                            <div class="snapturebox-border-dashed snapturebox-rounded-lg snapturebox-d-flex snapturebox-align-items-center snapturebox-position-relative">
                                                                <div class="snapturebox-flex-50 snapturebox-text-center snapturebox-py-3">
                                                                    <div>
                                                                        <camera width="20" height="20" stroke-width="1" stroke="black"></camera>
                                                                    </div>
                                                                    <span
                                                                        class="snapturebox-btn snapturebox-btn-sm snapturebox-mt-2 snapturebox-btn-link snapturebox-p-0 snapturebox-font-weight-bold"
                                                                        @click="
                                                                            itemType = 'image';
                                                                            $root.toggleModal('#addMediaModal', 'show');
                                                                            $refs['addMediaModal'].initCamera();
                                                                        "
                                                                        >Take photo</span
                                                                    >
                                                                </div>
                                                                <div class="snapturebox-position-absolute-center snapturebox-or-vertical h-100"><span>or</span></div>
                                                                <div class="snapturebox-position-relative snapturebox-flex-50">
                                                                    <div class="snapturebox-text-center">
                                                                        <div
                                                                            class="snapturebox-btn snapturebox-btn-link snapturebox-btn-sm snapturebox-p-0 snapturebox-text-dark"
                                                                            @click="
                                                                                itemType = 'image';
                                                                                $refs['addMedia'].click();
                                                                            "
                                                                        >
                                                                            <div class="snapturebox-font-weight-bold snapturebox-mb-1">click here</div>
                                                                            to upload photo
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="snapturebox-row snapturebox-mx-n1 snapturebox-mx-0 snapturebox-mt-3">
                                                                <div
                                                                    class="snapturebox-col-md-3 snapturebox-position-relative snapturebox-px-1 snapturebox-mb-2 snapturebox-cursor-pointer"
                                                                    v-for="(image, index) in enquiry.items"
                                                                    v-if="image.type == 'image'"
                                                                    @click="
                                                                        selectedMedia = {media: image, index: index, total: sampleImagesCount};
                                                                        $root.toggleModal('#manageMediaModal', 'show');
                                                                    "
                                                                >
                                                                    <close fill="white" width="28" class="snapturebox-close-right snapturebox-cursor-pointer" @click.native.stop="enquiry.items.splice(index, 1)"></close>
                                                                    <img :src="image.preview" class="snapturebox-w-100" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Dream hair -->
                                                    <div class="snapturebox-mt-5">
                                                        <div class="snapturebox-d-flex">
                                                            <div class="snapturebox-flex-25 snapturebox-line-height-0">
                                                                <h6 class="snapturebox-font-montserrat snapturebox-mb-3">Dream Hair</h6>
                                                                <small class="snapturebox-text-muted snapturebox-font-montserrat">Tips: Upload examples of the hairstyle you want or search the Instagram Gallery below and add in your favorite images.</small>
                                                            </div>
                                                            <div class="snapturebox-pl-5 snapturebox-flex-grow-1 snapturebox-position-relative">
                                                                <div class="snapturebox-border-dashed snapturebox-rounded-lg snapturebox-d-flex snapturebox-py-3 snapturebox-position-relative">
                                                                    <div class="snapturebox-w-50 snapturebox-text-center">
                                                                        <div>
                                                                            <camera width="20" height="20" stroke-width="1" stroke="black"></camera>
                                                                        </div>
                                                                        <span
                                                                            class="snapturebox-btn snapturebox-btn-sm snapturebox-mt-2 snapturebox-btn-link snapturebox-p-0 snapturebox-font-weight-bold"
                                                                            @click="
                                                                                itemType = 'sample';
                                                                                $root.toggleModal('#addMediaModal', 'show');
                                                                                $refs['addMediaModal'].initCamera();
                                                                            "
                                                                            >Take photo</span
                                                                        >
                                                                    </div>
                                                                    <div class="snapturebox-position-absolute-center snapturebox-or-vertical h-100"><span>or</span></div>
                                                                    <div class="snapturebox-position-relative snapturebox-w-50 curs">
                                                                        <div class="snapturebox-position-absolute-center snapturebox-text-center">
                                                                            <div
                                                                                class="snapturebox-btn snapturebox-btn-link snapturebox-btn-sm snapturebox-p-0 snapturebox-text-dark"
                                                                                @click="
                                                                                    itemType = 'sample';
                                                                                    $refs['addMedia'].click();
                                                                                "
                                                                            >
                                                                                <div class="snapturebox-font-weight-bold snapturebox-mb-1">click here</div>
                                                                                to upload photo
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="snapturebox-row snapturebox-mx-n1 snapturebox-mx-0 snapturebox-mt-3">
                                                                    <div
                                                                        class="snapturebox-col-md-3 snapturebox-position-relative snapturebox-px-1 snapturebox-mb-2 snapturebox-cursor-pointer"
                                                                        v-for="(image, index) in enquiry.items"
                                                                        v-if="image.type == 'sample'"
                                                                        @click="
                                                                            selectedMedia = {media: image, index: index, total: customerImagesCount};
                                                                            $root.toggleModal('#manageMediaModal', 'show');
                                                                        "
                                                                    >
                                                                        <close fill="white" width="28" class="snapturebox-close-right snapturebox-cursor-pointer" @click.native.stop="enquiry.items.splice(index, 1)"></close>
                                                                        <img :src="image.preview" class="snapturebox-w-100" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Instagram search -->
                                    <instagram-search @select="selectIGImage" ref="instagramSearch"></instagram-search>
                                </div>

                                <!-- DateTimePicker -->
                                <div class="snapturebox-overflow-auto snapturebox-h-100 snapturebox-position-relative snapturebox-p-4" v-else-if="activeTab == 'book'">
                                    <DateTimePicker :businessHours="$root.widget_business_hours"></DateTimePicker>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right -->

                    <!-- Messages -->
                    <div v-if="rightContent == 'messages'" id="snapturebox-section-right">
                        <messages :messages="$root.auth ? $root.auth.convo.messages : []" @send="sendMessage" @openMedia="openMedia" @addMedia="openAddMediaModal" ref="messages"></messages>
                    </div>

                    <!-- Inquiry form -->
                    <div v-else-if="rightContent == 'form'" class="snapturebox-d-flex snapturebox-overflow-auto snapturebox-bg-primary" id="snapturebox-section-right">
                        <div class="snapturebox-px-1 snapturebox-py-3 snapturebox-section-left-open-toggle snapturebox-d-flex snapturebox-align-items-center">
                            <button v-if="$root.fullPage" class="snapturebox-btn snapturebox-px-2 snapturebox-py-0 snapturebox-text-white" @click="$root.leftOpen = $root.leftOpen ? false : true">
                                <menu-icon></menu-icon>
                            </button>
                        </div>
                        <div class="snapturebox-text-white snapturebox-h-100 snapturebox-w-100">
                            <div class="snapturebox-p-4 snapturebox-pt-5">
                                <div v-if="!$root.fullPage" class="snapturebox-position-absolute" style="top: 15px; right: 15px">
                                    <exclamation-circle width="20" fill="white" class="snapturebox-cursor-pointer"></exclamation-circle>
                                    <close fill="white" transform="scale(1.5)" class="snapturebox-cursor-pointer" @click.native="toggleWidget"></close>
                                </div>
                                <p class="snapturebox-h4 snapturebox-font-weight-normal snapturebox-mb-4">
                                    Good morning! <br />
                                    <strong>How can we help you today?</strong>
                                </p>
                                <div class="snapturebox-my-4">
                                    Clinic Location: <span class="snapturebox-text-info snapturebox-text-underline">(change location)</span>
                                    <h5 class="snapturebox-mt-1 snapturebox-font-weight-bold">{{ $root.widget.heading }}</h5>
                                </div>
                                <span class="snapturebox-font-montserrat" v-tooltip.right="{content: 'Choose an enquiry type', show: enquiryTypeTooltip}">Your enquiry type:</span>
                                <div class="snapturebox-mt-2 snapturebox-mb-3">
                                    <div class="snapturebox-d-flex mx-n1">
                                        <div class="snapturebox-flex-grow-1 snapturebox-px-1" v-for="inquiry_type in $root.inquiry_types">
                                            <button
                                                class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-outline-info snapturebox-badge-pill snapturebox-shadow-none snapturebox-border-white snapturebox-text-white snapturebox-btn-block snapturebox-line-height-0"
                                                :class="{'snapturebox-active': enquiry.inquiry_type_id == inquiry_type.id}"
                                                @click="
                                                    enquiry.inquiry_type_id = inquiry_type.id;
                                                    enquiryTypeTooltip = false;
                                                "
                                            >
                                                <small class="snapturebox-font-weight-bold">{{ inquiry_type.type }}</small>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="snapturebox-mt-2 snapturebox-mb-3" v-tooltip.top="{content: 'Choose an area of interest', show: enquiryInterestTooltip}">
                                    <vue-select
                                        searchable
                                        multiple
                                        v-model="enquiry.interests"
                                        :options="[
                                            {text: 'Bridal Hair', value: 'Bridal Hair'},
                                            {text: 'Chignon Hair', value: 'Chignon Hair'},
                                        ]"
                                        :value="{}"
                                        button_class="snapturebox-badge-pill"
                                        placeholder="Choose areas of interests"
                                    ></vue-select>
                                </div>
                                <strong v-tooltip.right="{content: 'Write your inquiry', show: enquiryMessageTooltip}">Your Inquiry:</strong>
                                <exclamation-circle fill="white" width="14" height="14" stroke="white" stroke-width="1" class="snapturebox-cursor-pointer"></exclamation-circle>
                                <div class="snapturebox-mt-2 snapturebox-mb-3">
                                    <textarea v-model="enquiry.message" rows="7" class="snapturebox-font-montserrat snapturebox-form-control snapturebox-rounded-lg" placeholder="Please type your inquiry here" style="resize: none"></textarea>
                                </div>
                                <div class="snapturebox-text-right">
                                    <button class="snapturebox-btn snapturebox-px-5 snapturebox-btn-dark snapturebox-shadow-none snapturebox-rounded-lg snapturebox-d-inline-flex snapturebox-align-items-center" @click="send">Send <arrow-right stroke="white" stroke-width="1" fill="white" class="snapturebox-ml-2"></arrow-right></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modals -->
            <add-media-modal @submit="addMedia" :itemType="itemType" ref="addMediaModal"></add-media-modal>
            <signup-modal ref="signupModal"></signup-modal>
            <login-modal ref="loginModal"></login-modal>
            <manage-media-modal :media="selectedMedia" @submit="updateMedia" @deleteMedia="deleteMedia"></manage-media-modal>
            <message-media-modal :message="selectedMessage"></message-media-modal>

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
import Camera from '../icons/camera';
import Search from '../icons/search';
import Close from '../icons/close';
import Comment from '../icons/comment';
import ExclamationCircle from '../icons/exclamation-circle';
import ArrowRight from '../icons/arrow-right';
import AddMediaModal from './modals/add-media';
import SignupModal from './modals/signup';
import LoginModal from './modals/login';
import ManageMediaModal from './modals/manage-media';
import MessageMediaModal from './modals/message-media';
import DateTimePicker from './datetimepicker';
import InstagramSearch from './instagram-search';
import Tooltip from './directives/tooltip.js';
import VueLazyload from 'vue-lazyload';
import Messages from './messages';
import getUrls from 'get-urls';
SBVue.use(VueLazyload);
export default {
    components: {PanelArrowLeft, PanelArrowRight, WidgetChat, Camera, ChevronDown, Search, Close, Comment, ExclamationCircle, ArrowRight, AddMediaModal, InstagramSearch, SignupModal, LoginModal, ManageMediaModal, Messages, MessageMediaModal, DateTimePicker},
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
        activeTab: 'book', //inquiries, book
        itemType: '',
        selectedMedia: null,
        rightContent: 'messages', //form
        selectedMessage: {},
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
    },
    mounted() {},
    methods: {
        openMedia(message) {
            this.selectedMessage = message;
            this.$root.toggleModal('#messageMediaModal', 'show');
        },

        openAddMediaModal() {
            this.itemType = 'message';
            this.$root.toggleModal('#addMediaModal', 'show');
            this.$refs['addMediaModal'].initCamera();
        },

        sendMessage(message) {
            if (!this.$root.auth) {
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
            }
        },

        deleteMedia(newMedia) {
            this.enquiry.items.splice(newMedia.index, 1);
        },
        updateMedia(newMedia) {
            this.enquiry.items[newMedia.index] = newMedia.media;
        },
        selectIGImage(igImage) {
            let exists = this.enquiry.items.find((x) => x.url == igImage.url);
            if (!exists) {
                this.enquiry.items.push(igImage);
                this.$refs['instagramSearch'].open = false;
            }
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
