import dayjs from 'dayjs';
import filesize from 'filesize';
import VueFormValidate from '../../../components/vue-form-validate';
import MessageType from '../../../components/message-type';
import CommentIcon from '../../../icons/comment';
import DocumentIcon from '../../../icons/document';
import VolumeMidIcon from '../../../icons/volume-mid';
import FilePdfIcon from '../../../icons/file-pdf';
import FileArchiveIcon from '../../../icons/file-archive';
import PlayIcon from '../../../icons/play';
import CameraIcon from '../../../icons/camera';
import MicrophoneIcon from '../../../icons/microphone';
import AddNoteIcon from '../../../icons/add-note';
import MoreHIcon from '../../../icons/more-h';
import BookmarkIcon from '../../../icons/bookmark';
import TrashIcon from '../../../icons/trash';
import ArchiveIcon from '../../../icons/archive';
import SignInIcon from '../../../icons/sign-in';
import DownloadIcon from '../../../icons/download';
import PlusIcon from '../../../icons/plus';
import UsersIcon from '../../../icons/users';
import SearchIcon from '../../../icons/search';
import CloseIcon from '../../../icons/close';
import EditSquareIcon from '../../../icons/edit-square';
import PhoneIcon from '../../../icons/phone';
import DuplicateAltIcon from '../../../icons/duplicate-alt';
import PlusCircleIcon from '../../../icons/plus-circle';
import CastIcon from '../../../icons/cast';
import CalendarDayIcon from '../../../icons/calendar-day';
import UserIcon from '../../../icons/user';
import Emojipicker from '../../../components/emojipicker';
import Waveplayer from '../../../components/waveplayer';
import Modal from '../../../components/modal/modal.vue';
import VueScrollTo from 'vue-scrollto';
const emojiRegex = require('emoji-regex');
export default {
	components: {VueFormValidate, MessageType, CommentIcon, CameraIcon, MicrophoneIcon, AddNoteIcon, Emojipicker, VolumeMidIcon, DocumentIcon, FilePdfIcon, FileArchiveIcon, PlayIcon, MoreHIcon, BookmarkIcon, TrashIcon, ArchiveIcon, SignInIcon, DownloadIcon, PlusIcon, UsersIcon, SearchIcon, CloseIcon, EditSquareIcon, PhoneIcon, Waveplayer, PlusCircleIcon, DuplicateAltIcon, CastIcon,CalendarDayIcon, UserIcon, Modal,
        'video-recorder-modal': () => import(/* webpackChunkName: "modals/video-recorder" */ '../../../modals/video-recorder'),
        'file-view-modal': () => import(/* webpackChunkName: "modals/file-view" */ '../../../modals/file-view'),
        'audio-recorder-modal': () => import(/* webpackChunkName: "modals/audio-recorder" */ '../../../modals/audio-recorder'),
        'screen-recorder-modal': () => import(/* webpackChunkName: "modals/screen-recorder" */ '../../../modals/screen-recorder'),
        'video-call-modal': () => import(/* webpackChunkName: "modals/video-call" */ '../../../modals/video-call'),
        'bookings': () => import(/* webpackChunkName: "components/bookings" */ '../../../components/bookings/bookings.vue'),
    },
	directives: {VueScrollTo},

    data: () => ({
    	conversationTab: 'active',
    	conversations: [],
    	selectedConversation: null,
    	convoLoading: false,
    	textMessage: '',
        detailsTab: 'bookings',
        profileTab: 'overview',
        fileType: 'all',
        recorder: '',
        selectedFile: null,
        notification_sound: null,
        addingNote: false,
        newNote: '',
        newChat: {
            memberSearch: '',
            searchingMembers: false,
            groupMembersResults: [],
            selectedChatMembers: [],
            createChatError: '',
            createChatLoading: false
        },
        memberSearch: '',
        searchingMembers: false,
        groupMembersResults: [],
        selectedChatMembers: [],
        videoCallDesc: null,
        videoCallData: null,
        videoCallData: true,
        moreActions: false,
        emojipicker: false,
        videoCall: null,
        videoCall: null,
        dragOver: false,
        newTag: '',
        selectedBooking: null,
    }),

    computed: {
        isOnline() {
            let is_online = this.$root.online_users.find((x) => x == this.selectedConversation.user.id);
            if(!is_online) {
                axios.get(`/dashboard/conversations/${this.selectedConversation.id}`).then((response) => {
                    this.selectedConversation.user.last_online = response.data.user.last_online;
                });
            }
            return is_online;
        },

        historyMessages() {

        },

        grouped_messages() {
            const grouped_messages = [];
            if (this.selectedConversation.messages) {
                // sort messages by timestamp
                const messages = (this.selectedConversation.messages || []).sort((a, b) => {
                    return (parseInt(a.timestamp) > parseInt(b.timestamp)) ? 1 : -1;
                });

                for (var i = 0; i <= messages.length - 1; i++) {
                    let message_group = { sender: Object.assign({}, messages[i].user) || (messages[i].metadata.is_chatbot ? {id: 'chatbot'} : ''), messages: [messages[i]] };
                    groupMessage();

                    function groupMessage() {
                        const next_message = messages[i + 1];
                        if (next_message && next_message.user.id == message_group.sender.id) {
                            message_group.messages.push(messages[i + 1]);
                            i++;
                            groupMessage();
                        }
                    }

                    if(message_group.sender.id == this.$root.auth.id || message_group.sender.id == 'chatbot') {
                        message_group.sender.full_name = 'You';
                        message_group.outgoing = true;
                    }
                    message_group.created_at = message_group.messages[message_group.messages.length - 1].created_at;
                    grouped_messages.push(message_group);
                }
            }

            return grouped_messages;
        },
    },

    created() {
        this.notification_sound = new Audio('/notifications/new_message.mp3');
        this.$root.socket.on('new_message', (data) => {
            if(data.conversation.widget.id == this.$root.auth.widget.id) {
                if(this.selectedConversation && this.selectedConversation.id == data.conversation.id) {
                    let conversationData = this.conversations.find((x) => x.id == this.selectedConversation.id);
                    if(conversationData) {
                        this.getMessageByID(data).then((message) => {
                            if(message) {
                                this.selectedConversation.messages.push(message);
                                this.$set(conversationData, 'last_message', message);
                                this.notification_sound.play();
                                this.scrollDown();
                            }
                        });
                    }
                } else {
                    this.getMessageByID(data).then((message) => {
                        if(message) {
                            let conversationData = this.conversations.find((x) => x.id == message.conversation_id);
                            if(conversationData) {
                                this.$set(conversationData, 'last_message', message);
                            } else {
                                this.conversations.push(message.conversation);
                            }
                            this.setConversation(message.conversation);
                            this.orderConversations();
                        }
                    });
                }
            }
        });

        this.$root.socket.on('live_call_offer', (data) => {
            let conversation = this.conversations.find((x) => x.id == data.conversation_id);
            if(conversation) {
                data.action = 'incoming';
                data.conversation = conversation;
                this.videoCall = data;
            }
        });

    	this.getData();
    },

    mounted() {
        /*this.openModal();
        this.selectedBooking = {};*/
    },

    methods: {
        openModal() {
            this.$refs['modal'].show();
        },

        addTag() {
            let newTag = this.newTag.trim();
            if(newTag) {
                if(!this.selectedConversation.tags) this.selectedConversation.tags = [];
                this.selectedConversation.tags.push(newTag);
                this.updateConversation(this.selectedConversation);
            }
            this.newTag = '';
        },

        dropFile(e) {
            this.dragOver = false;
            this.addFile({target: {files: e.dataTransfer.files, value: e.dataTransfer.files[0].name}});
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

        initCall() {
            this.videoCall = {
                action: 'outgoing',
                caller: this.$root.auth.id,
                conversation: this.selectedConversation,
            };
        },

        async getMessageByID(data) {
            let message = await axios.get(`/dashboard/messages/${data.id}`).catch((e) => {});
            if(message) return message.data;
        },

        disableNewline(e) {
            if(e.keyCode == 13) e.preventDefault();
        },

        updateConversationName(e) {
            if(this.selectedConversation) {
                let newName = e.target.textContent.trim();
                if(newName != this.selectedConversation.name) {
                    this.selectedConversation.name = newName;
                    let conversation = this.conversations.find((x) => x.id == this.selectedConversation.id);
                    if(conversation) conversation.name = newName;
                    this.updateConversation(this.selectedConversation);
                }
            }
        },

        addMember(member) {
            if(this.selectedConversation) {
                member.conversation_id = this.selectedConversation.id;
                this.memberSearch = '';
                this.selectedChatMembers = [];
                this.groupMembersResults = [];
                this.searchingMembers = false;
                axios.post(`/dashboard/conversation_members`, member).then((response) => {
                    this.selectedConversation.members.unshift(response.data);
                    let index = this.conversations.findIndex((x) => x.id == this.selectedConversation.id);
                    if(index > -1) {
                        this.conversations[index].members.unshift(response.data);
                    }
                });
            }
        },

        deleteMember(member) {
            if(this.selectedConversation) {
                let index = this.selectedConversation.members.findIndex((x) => x.id == member.id);
                if(index > -1) this.selectedConversation.members.splice(index, 1);
                let conversation = this.conversations.find((x) => x.id == this.selectedConversation.id);
                if(this.selectedConversation.members.length == 1) this.selectedConversation.members = [];
                
                if(conversation) {
                    let memberIndex = conversation.members.findIndex((x) => x.id == member.id);
                    if(memberIndex > -1) conversation.members.splice(memberIndex, 1);
                    if(conversation.members.length == 1) conversation.members = [];
                }

                axios.delete(`/dashboard/conversation_members/${member.id}`).then((response) => {
                    if(response.data.user) {
                        this.selectedConversation.user = response.data.user;
                        if(conversation) conversation.user = response.data.user;
                    }
                });
            }
        },

        createChat() {
            if(this.newChat.selectedChatMembers.length > 0) {
                this.newChat.createChatLoading = true;
                let selectedChatMembers = [];
                this.newChat.selectedChatMembers.forEach((m) => {
                    selectedChatMembers.push(m.id);
                });
                axios.post('/dashboard/conversations', {members: selectedChatMembers}).then((response) => {
                    $('#newChatCreateModal').modal('hide');
                    this.newChat.searchingMembers = false;
                    this.newChat.groupMembersResults = [];
                    this.newChat.selectedChatMembers = [];
                    this.newChat.createChatError = '';
                    this.newChat.createChatLoading = false;
                    this.conversations.push(response.data);
                    this.orderConversations();
                    this.setConversation(response.data);
                });
            } else {
                this.newChat.createChatError = 'Please add at leat one (1) member';
            }
        },

        searchMembers(e, newChat = true) {
            let chatTarget = newChat ? this.newChat : this;
            if(!chatTarget['searchingMembers']) {
                chatTarget['searchingMembers'] = true;
                setTimeout(() => {
                    axios.get(`/dashboard/users?search=${e.target.value.trim()}`).then((response) => {
                        chatTarget['groupMembersResults'] = response.data;
                    });
                    chatTarget['searchingMembers'] = false;
                }, 500);
            }
        },

        openNewChatModal() {
            this.newChat.memberSearch = '';
            $('#newChatCreateModal').modal('show');
        },

        updateConversation(conversation) {
            axios.put(`/dashboard/conversations/${conversation.id}`, conversation);
        },

        deleteNote(note) {
            if(this.selectedConversation) {
                let index = this.selectedConversation.notes.findIndex((x) => x.id == note.id);
                if(index > -1) this.selectedConversation.notes.splice(index, 1);
                axios.delete(`/dashboard/notes/${note.id}`);
            }
        },

        addNote() {
            if(this.selectedConversation) {
                let note = {
                    conversation_id: this.selectedConversation.id,
                    notes: this.newNote,
                };
                axios.post('/dashboard/notes', note).then((response) => {
                    this.newNote = '';
                    this.addingNote = false;
                    this.selectedConversation.notes.push(response.data);
                });
            }
        },

        removeHiglightMessage(message) {
            $(`#${message.id} .message-content`).removeClass('bg-primary');
        },

        highlightMessage(message) {
            $(`#${message.id} .message-content`).addClass('bg-primary');
        },

        openFile(file) {
            this.selectedFile = file;
            if(file.type == 'file') this.downloadMedia(file);
        },

        markHistory(message) {
            let is_history = message.is_history ? false : true;
            this.$set(message, 'is_history', is_history);
            axios.put(`/dashboard/messages/${message.id}`, message).then((response) => {
            });
        },

        closeRecorder(type) {
            this.recorder = '';
        },
        openRecorder(type) {
            this.recorder = type;
        },

        fileIcon(extension) {
            let iconComponent = 'document-icon';
            let videoExtensions = ['mp4', 'webm'];
            let audioExtensions = ['mp3', 'wav'];
            if (videoExtensions.indexOf(extension) > -1) {
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

        isFile(message) {
            let fileTypes = ['image', 'video', 'audio', 'file'];
            return fileTypes.indexOf(message.type) > -1;
        },

        sendMessage(message) {
            if(this.selectedConversation) {
                this.selectedConversation.messages.push(message);
                let conversationData = this.conversations.find((x) => x.id == this.selectedConversation.id);
                let messageCopy = Object.assign({}, message);
                if(conversationData) {
                    messageCopy.message = `You: ${messageCopy.message}`;
                    this.$set(conversationData, 'last_message', messageCopy);
                }
                this.scrollDown();
                this.orderConversations();

                if(message.type == 'text' && message.message.trim().length == 2) {
                    let regex = emojiRegex();
                    if(regex.exec(message.message)) {
                        message.type = 'emoji';
                    }
                }

                messageCopy = Object.assign({}, message);
                let bodyFormData = new FormData();
                if(messageCopy.metadata) messageCopy.metadata = JSON.stringify(messageCopy.metadata);
                Object.keys(messageCopy).map((k) => {
                    bodyFormData.set(k, messageCopy[k]);
                });
                bodyFormData.set('conversation_id', this.selectedConversation.id)
                axios.post(`/dashboard/messages`, bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then((response) => {
                    let index = this.selectedConversation.messages.findIndex((x) => x.id == messageCopy.id);
                    if(index > -1) {
                        this.selectedConversation.messages[index].id = response.data.message.id;
                        this.selectedConversation.messages[index].source = response.data.message.source;
                        this.$root.socket.emit('message_sent', {id: response.data.message.id, conversation_id: response.data.conversation.id});
                    }
                });
            }
        },

        sendVideo(video) {
            if(this.selectedConversation) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    source: video.source,
                    preview: video.preview,
                    timestamp: dayjs().valueOf(),
                    type: 'video',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                    metadata: {duration: video.duration}
                };
                this.sendMessage(message);
                this.closeRecorder('video');
            }
        },

        sendAudio(audio) {
            if(this.selectedConversation) {
                const timestamp = dayjs().valueOf();
            	let message = {
                    user: this.$root.auth,
                    source: audio.source,
                    timestamp: dayjs().valueOf(),
                    type: 'audio',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                    metadata: {duration: audio.duration}
                };
            	this.sendMessage(message);
                this.closeRecorder('audio');
            }
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

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },

        async addFile(e) {
            let fileInput = e.target;
            if (this.selectedConversation && fileInput.files.length > 0) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    timestamp: dayjs().valueOf(),
                    type: 'file',
                    source: fileInput.files[0],
                    timestamp: dayjs().valueOf(),
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
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

        isImage(extension) {
            let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
            return imageExtensions.indexOf(extension) > -1;
        },

        selectEmoji(emoji) {
            this.textMessage += emoji;
            /*const timestamp = dayjs().valueOf();
            let message = {
                user: this.$root.auth,
                message: emoji,
                type: 'emoji',
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A'),
                is_read: 1,
                created_diff: 'Just now',
            };
            this.sendMessage(message);*/
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

    	getData() {
    		axios.get('/dashboard/conversations').then((response) => {
    			this.conversations = response.data;
                this.orderConversations();
    			this.$root.contentloading = false;

                let booking_id = this.$route.query.booking_id;
                if(booking_id) {
                    for(let c of this.conversations){
                        if(c.members.length == 0) {
                            let booking = c.widget.bookings.find((x) => x.id == booking_id);
                            if(booking) {
                                this.setConversation(c);
                                this.detailsTab = 'bookings';
                                break;
                            }
                        }
                    };
                } else {
                    let firstConversation = this.conversations.find((x) => x.status == 'active');
                    if(firstConversation) this.setConversation(firstConversation);
                }
    		});
    	},

        orderConversations() {
            if (this.conversations.length > 0) {
                this.conversations = this.conversations.sort((a, b) => {
                    const a_timestamp = a.last_message.timestamp || a.timestamp;
                    const b_timestamp = b.last_message.timestamp || b.timestamp;
                    return (a_timestamp > b_timestamp) ? -1 : 1;
                });
            }
        },

        setConversation(conversation) {
        	this.$set(conversation.last_message, 'is_read', true);
            axios.get(`/dashboard/conversations/${conversation.id}?is_read=true`).then((response) => {
                this.convoLoading = false;
                this.selectedConversation = response.data;
                this.scrollDown();
            });
        },

        scrollDown() {
            setTimeout(() => {
                const message_container = this.$refs['message-group-container'];
                if (message_container) {
                    message_container.scrollTop = message_container.scrollHeight;
                }
            }, 50);
        },
    }
}