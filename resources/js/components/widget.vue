<template>
    <div v-if="$root.widget">
       <div id="snapturebox-button" @click="toggleWidget">
           <message-circle-icon></message-circle-icon>
        </div>

        <div id="snapturebox-window" :class="{'snapturebox-open': open}">
            <!-- Header -->
            <div id="snapturebox-header">
                <div class="snapturebox-dropdown">
                    <button class="snapturebox-btn snapturebox-bg-white snapturebox-dropdown-toggle" type="button">{{ member }}<chevron-down-icon size="1x" class="snapturebox-pointer-events-none"></chevron-down-icon></button>
                    <div class="snapturebox-dropdown-menu">
                        <a class="snapturebox-dropdown-item" :class="{'snapturebox-active': member == cmember}" href="#" @click="setMember(cmember)" v-for="cmember in members">{{ cmember }}</a>
                    </div>
                     <button v-if="!sent" class="snapturebox-btn snapturebox-bg-white snapturebox-dropdown-toggle" :disabled="items.length == 0" data-toggle="modal" data-target="#authModal">Send Inquiry</button>
                    <button v-else class="snapturebox-btn snapturebox-bg-white snapturebox-dropdown-toggle snapturebox-d-inline-flex snapturebox-align-items-center" disabled><check-circle-icon size="1x" class="snapturebox-mr-1"></check-circle-icon>Inquiry Sent</button>

                    <button class="snapturebox-btn snapturebox-bg-white snapturebox-dropdown-toggle" type="button" data-toggle="modal" data-target="#offerModal">View Offer</button>
                    <button class="snapturebox-btn snapturebox-bg-white snapturebox-dropdown-toggle" :disabled="repliesCount == 0" type="button" data-toggle="modal" data-target="#repliesModal">Replies <span class="snapturebox-badge snapturebox-badge-pill snapturebox-badge-primary snapturebox-ml-1" v-if="repliesCount > 0">{{ repliesCount }}</span></button>
                </div>
                <div class="snapturebox-ml-auto snapturebox-d-flex snapturebox-align-items-center">
                    <div class="snapturebox-dropdown">
                        <div class="snapturebox-dropdown-toggle snapturebox-cursor-pointer"><user-icon size="1x" class="snapturebox-pointer-events-none snapturebox-line-height-0"></user-icon></div>
                        <div class="snapturebox-dropdown-menu snapturebox-dropdown-menu-right">
                            <a class="snapturebox-dropdown-item" href="#">Login</a>
                            <a class="snapturebox-dropdown-item" href="#">Sign up</a>
                        </div>
                    </div>
                    <x-icon size="1.2x" class="snapturebox-cursor-pointer snapturebox-ml-1" @click="toggleWidget"></x-icon>
                </div>
            </div>

            <div class="snapturebox-d-flex">
                <!-- Left -->
                <div class="snapturebox-d-flex snapturebox-flex-grow-1 snapturebox-flex-column snapturebox-position-relative snapturebox-border-right">
                    <masonry :cols="2" :gutter="0" id="snapturebox-media-items" class="snapturebox-p-1">
                        <div class="snapturebox-media-item snapturebox-p-2" v-if="items.length > 0" v-for="(item, index) in items">
                            <div class="snapturebox-media-item-content snapturebox-overflow-hidden snapturebox-shadow-sm snapturebox-position-relative">
                                <div class="snapturebox-p-2 snapturebox-position-absolute" v-if="!sent" style="z-index: 1; right: 0">
                                    <button type="button" class="snapturebox-btn snapturebox-text-white snapturebox-p-0 snapturebox-shadow-none snapturebox-line-height-0" @click="removeItem(index)">
                                        <x-icon size="1.2x"></x-icon>
                                    </button>
                                </div>
                                <img :src="item.item.preview" alt="" class="w-100 position-relative">
                                
                                <div class="snapturebox-p-2">
                                    <div v-if="!sent">
                                        <div class="position-relative" v-if="item.comment">
                                            <textarea-autosize :disabled="!item.edit || sent" :class="{'border-0': !item.edit || sent}" :value="item.comment" class="form-control bg-white font-weight-normal form-control-sm shadow-none" placeholder="Add comment.." rows="1" style="padding-right: 46px" />
                                            <div class="position-absolute" style="top: 0; right: 0; padding: 2px; height: 30px" v-if="!sent">
                                                <button class="btn btn-primary btn-sm shadow-none h-100 py-0 line-height-0" :class="{'bg-white border-0 text-dark': !item.edit || sent}" @click="saveComment(index, $event)">
                                                    <span v-if="item.edit">Save</span>
                                                    <edit-icon size="1x" v-else></edit-icon>
                                                </button>  
                                            </div>
                                        </div>

                                        <div class="position-relative" v-else>
                                            <textarea-autosize :disabled="sent" :value="item.comment" class="form-control font-weight-normal form-control-sm shadow-none" placeholder="Add comment.." rows="1" style="padding-right: 46px" />
                                                
                                            <div class="position-absolute" style="top: 0; right: 0; padding: 2px; height: 30px">
                                                <button class="btn btn-primary btn-sm shadow-none h-100 py-0 line-height-0" @click="addComment(index, $event)">Add</button>
                                            </div>
                                        </div>
                                    </div>

                                    <p style="line-height: 1.5; margin-bottom: 0" v-else-if="item.comment">{{ item.comment }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- New items -->    
                        <div class="snapturebox-media-item p-2" v-for="new_item in new_items" v-if="!sent">
                            <div class="snapturebox-media-item-content snapturebox-overflow-hidden snapturebox-shadow-sm">
                                <div class="snapturebox-bg-secondary snapturebox-position-relative" style="height: 247px">
                                    <div class="snapturebox-position-absolute-center">
                                        <button class="snapturebox-btn snapturebox-btn-light snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0" @click=" preview = ''" data-toggle="modal" data-target="#addItemModal">
                                            <plus-icon size="1.2x"></plus-icon>
                                        </button>
                                    </div>

                                    <div class="snapturebox-text-white snapturebox-media-item-bottom-buttons snapturebox-position-absolute snapturebox-px-3">
                                        <video-icon class="snapturebox-cursor-pointer" size="1.4x" data-toggle="modal" data-target="#addItemModal"></video-icon>
                                        <camera-icon class="snapturebox-cursor-pointer mx-2" size="1.4x" data-toggle="modal" data-target="#addItemModal"></camera-icon>
                                        <file-text-icon class="snapturebox-cursor-pointer" size="1.4x" data-toggle="modal" data-target="#addItemModal"></file-text-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </masonry>
                </div>
                

                <!-- Right (intro) -->
                <div id="snapturebox-convo">
                       <div id="snapturebox-body">
                            <div id="snapturebox-convo" style="display: flex; flex-direction: column; max-height: 400px;">
                                <div style="overflow-y: auto; background-color: #fafafa" ref="snapturebox-scroll">
                                    <img src="dist/poster.png" style="cursor: pointer;" class="snapturebox-w-100" alt="" data-toggle="modal" data-target="#introModal">
                                    <div class="snapturebox-py-3 snapturebox-px-2">
                                        <h6 class="snapturebox-text-center snapturebox-font-weight-bold">How Does It Work?</h6>
                                        <ol class="snapturebox-pl-3 snapturebox-m-0" style="line-height: 1.4">
                                            <li class="mb-2">Add photos or vidoes of areas you would like improved.</li>
                                            <li>Receive back our recommendations and offer.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
            </div>
        </div>

    </div>
</template>

<script>
import { MessageCircleIcon, SendIcon, VideoIcon, MicIcon, CameraIcon, PlayIcon, PauseIcon, ChevronDownIcon, SmileIcon, XIcon, UserIcon, AtSignIcon, SmartphoneIcon, LockIcon, MoreVerticalIcon, InfoIcon, FileTextIcon, PhoneIcon, PlusIcon, EditIcon, CheckCircleIcon } from 'vue-feather-icons';

export default {
    components: { MessageCircleIcon, SendIcon, VideoIcon, MicIcon, CameraIcon, PlayIcon, PauseIcon, ChevronDownIcon, SmileIcon, XIcon, UserIcon, AtSignIcon, SmartphoneIcon, LockIcon, MoreVerticalIcon, InfoIcon, FileTextIcon, PhoneIcon, PlusIcon, EditIcon, CheckCircleIcon },

    data: () => ({
        open: true,

        message: '',
        playing: false,
        member: 'Clinic Team',
        messages: [],
        members: [
            'Clinic Team',
            'Dr. Zac Turner',
            'Sally Woo RN',
            'Trinh Nguyen RN',
            'Chantelle Atkinson RN',
            'Ebony Andrews RN',
            'Jodie Church RN',
        ],

        signupForm: {
            name: '',
            email: '',
            phone: '',
            password: '',
        },
        signupFormDisabled: false,
        messageInputDisabled: false,
        items: [
            /*{item: 'src/images/file1.jpg', comment: 'I am a comment', edit: false},
            {item: 'src/images/file2.jpg', comment: '', edit: false},*/
        ],
        preview: '',
        sent: false,

        videoRecorder: null,
        streams: null,
        video: null,
        cameraReady: false,
        isRecording: false,
        fileOutput: null,
        socket: null,
        domain: 'https://snapturebox.com',
        notification_sound: null,
        videoOutput: null,
        newMessage: {
            inquiry_id: 1,
            message: '',
            type: 'text',
            sender: 'Margaretta Worvell',
        },
    }),

    computed: {
        new_items() {
            let new_items =  4 - this.items.length;
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
                    return (parseInt(a.timestamp) > parseInt(b.timestamp)) ? 1 : -1;
                });

                for (var i = 0; i <= messages.length - 1; i++) {
                    var message_group = { sender: messages[i].sender, messages: [messages[i]] };
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

    mounted() {
        //this.scrollDown();
        /*setTimeout(() => {
            this.video = document.querySelector('#videoFile');
            $('#repliesModal').on('shown.bs.modal', (e) => {
                this.scrollDown();
            });
            $('#addItemModal').on('shown.bs.modal', (e) => {
                this.cameraReady = false;
                navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                    this.videoRecorder = RecordRTC(streams, {
                        type: 'video',
                    });
                    this.video.muted = true;
                    this.video.volume = 0;
                    this.video.srcObject = new MediaStream(streams.getVideoTracks());
                    this.video.play();
                    this.video.onplaying = () => {
                        this.cameraReady = true;
                    }
                }).catch(function(error) {
                    alert('Unable to capture your camera.');
                    console.error(error);
                });
            });

            $('#addItemModal').on('hidden.bs.modal', (e) => {
                this.fileOutput = null;
            });
        });*/
    },

    created() {
        /*this.notification_sound = new Audio('/notifications/new_message.mp3');
        this.socket = io('https://snapturebox.com:8443');
        this.socket.on('new_message', (data) => {
            this.messages.push(data);
            this.notification_sound.play();
            this.scrollDown();
        });*/
        //this.getMessages();
    },

    methods: {

        send() {
            let data = new FormData();
            Object.keys(this.newMessage).map((k) => {
                data.append(k, this.newMessage[k]);
            });

            SBAxios.post(`${this.domain}/messages`, data, {header : {'Content-Type' : 'multipart/form-data'}}).then((response) => {
                this.messages.push(response.data);
                this.newMessage.message = '';
                this.socket.emit('message_sent', response.data);
                this.scrollDown();
            });
        },

        scrollDown() {
            setTimeout(() => {
                const message_group = this.$refs['message-group'];
                if (message_group) {
                    message_group.scrollTop = message_group.scrollHeight;
                }
            });
        },

        getMessages() {
            SBAxios.get(`${this.domain}/messages`).then((response) => {
                this.messages = response.data;
            });
        },

        loadeddata(e) {
            let video = e.target;
            setTimeout(() => {
                let canvas = document.createElement("canvas");
                canvas.width = video.videoWidth / 2;
                canvas.height = video.videoHeight / 2;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                this.fileOutput.preview = canvas.toDataURL("image/jpeg", 0.8);
            }, 200);
        },

        takePhoto() {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
            let dataUrl = canvas.toDataURL('image/jpeg');
            this.fileOutput = {
                type: 'image',
                src: dataUrl,
                preview: dataUrl,
            };
        },


        stopRecord() {
            this.videoRecorder.stopRecording(() => {
                this.fileOutput = {
                    type: 'video',
                    src: URL.createObjectURL(this.videoRecorder.getBlob()),
                };
            });
            this.isRecording = false;
        },

        startRecord() {
            this.videoRecorder.startRecording();
            this.isRecording = true;
        },

        addComment(index, e) {
            this.items[index].edit = false;
            this.items[index].comment = $(e.currentTarget).parent().siblings('textarea').val();
        },

        saveComment(index, e) {
            this.$set(this.items[index], 'edit', this.items[index].edit ? false : true);
            if (!this.items[index].edit) {
                this.items[index].comment = $(e.currentTarget).parent().siblings('textarea').val();
            }
        },

        authSubmit() {
            this.sent = true;
            $('#authModal').modal('hide');
            $('.modal-backdrop').remove();
        },

        removeItem(index) {
            this.items.splice(index, 1);
        },

        setPreview(e) {
            var input = $(e.currentTarget);
            var file = input[0].files[0];
            if (file) {
                if (file.type.match('image/jpeg') || file.type.match('image/png')) {
                    var photosize = file.size / 1000000;
                    if (photosize > 5) {
                        alert('Error: Image file too big. Please select image file less than 5MB.');
                    } else {
                        var img = document.createElement('img');
                        var reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = (oFREvent) => {
                            var canvas = document.createElement('canvas');
                            img.src = oFREvent.target.result;
                            img.addEventListener('load', () => {
                                var ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0);

                                var MAX_WIDTH = 600;
                                var MAX_HEIGHT = 600;
                                var width = img.width;
                                var height = img.height;

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
                                var ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0, width, height);

                                var dataurl = canvas.toDataURL('image/jpg');
                                this.fileOutput = {
                                    type: 'image',
                                    preview: dataurl,
                                    src: img.src,
                                };
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

        browseMedia() {
            this.$refs['addMedia'].click();
        },

        addItem() {
            this.items.push({
                item: this.fileOutput,
                comment: '',
            });
        },

        setMember(member) {
            this.member = member;
        },

        passwordFormat(password) {
            password = password[0] + password.substr(1, password.length - 2).replace(/./g, '*') + password[password.length - 1];
            return password;
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

        inputKeyup(e) {
            if (e.keyCode == 13) {
                this.send();
            }
        },

        signupContinue() {
            this.messages.push({
                sender: 'You',
                message: 'Your details: ',
                time: 'Just now',
                signupDetails: true,
            });
            this.signupFormDisabled = true;
            this.messageInputDisabled = false;
            this.scrollDown();
            var new_messages = [
                {
                    sender: 'You',
                    message: 'Hi there please look at my photos of my problem areas I would like to look better.',
                    hasPhotos: true,
                    time: 'Just now'
                },
                {
                    sender: this.member,
                    message: `Hi ${this.signupForm.name}, please view my feedback video`,
                    video: 'https://www.youtube.com/embed/oBDyhh5CEkI',
                    time: 'Just now'
                },
                {
                    sender: this.member,
                    time: 'Just now',
                    hasOffers: true
                },
                {
                    sender: 'You',
                    message: 'Thank you for sending your suggestions. I will get back to you soon I just need to talk to my sister.',
                    time: 'Just now'
                },
                {
                    sender: this.member,
                    message: `No problems ${this.signupForm.name} I am here to help. Let me know if I can help more.`,
                    time: 'Just now'
                },
            ];
            var i = 0;
            var timeInterval = setInterval(() => {
                this.messages.push(new_messages[i]);
                this.scrollDown();
                if (i == new_messages.length - 1) clearInterval(timeInterval);
                i++;
            }, 1000);

        },

        /*send() {
            if (this.message.trim().length == 0) {
                this.message = '';
                this.$refs['message'].focus();
            } else {
                this.messages.push({
                    sender: 'You',
                    message: this.message.trim(),
                    time: 'Just now'
                });
                this.message = '';
                this.scrollDown();
                this.$refs['message'].focus();
                if (this.first_message) {
                    this.messageInputDisabled = true;
                    this.first_message = false;
                    setTimeout(() => {
                        this.messages.push({
                            sender: 'Stacey',
                            message: 'Before we continue we just need a few details:',
                            time: 'Just now',
                            auth: true,
                        });
                        this.scrollDown();
                    }, 500);
                }
            }
        },*/

        askNow() {
            this.$refs['snapturebox-intro'].pause();
            this.content = 'convo';
        },

        signup() {
            
        },

        toggleWidget() {
            this.open = this.open ? false : true;
            if (!this.open && this.$refs['snapturebox-intro']) {
                this.playing = false;
                this.$refs['snapturebox-intro'].pause();
            }
        },
    },
}
</script>