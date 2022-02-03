import { mapActions } from 'vuex';
import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);
import filesize from 'filesize';
import VueFormValidate from '../../../components/vue-form-validate';
import Emojipicker from '../../../components/emojipicker';
import SendIcon from '../../../icons/send';
import ScreenshareIcon from '../../../icons/screenshare';
import MicrophoneAltIcon from '../../../icons/microphone-alt';
import AttachmentIcon from '../../../icons/attachment';
import dayjs from 'dayjs';
import MessageType from '../../pages/conversations/show/message-type.vue';
import EyeIcon from '../../../icons/eye';
import CloseIcon from '../../../icons/close';
import DocumentIcon from '../../../icons/document';
import PlayIcon from '../../../icons/play';
import TrashIcon from '../../../icons/trash';
import Modal from '../../../components/modal/modal.vue';

const loadImage = require('blueimp-load-image');
const emojiRegex = require('emoji-regex');
export default {
	props: {
		conversation: {
			required: true
		},
		ready: {
			type: Boolean,
			default: false
		},
		isVideoMessage: {
			type: Boolean,
			default: false
		}
	},

	components: {
		Modal,
		TrashIcon,
		VueFormValidate,
		Emojipicker,
		SendIcon,
		ScreenshareIcon,
		MicrophoneAltIcon,
		AttachmentIcon,
		MessageType,
		EyeIcon,
		CloseIcon,
		DocumentIcon,
		PlayIcon,

		gallery: () => import(/* webpackChunkName: "gallery" */ '../Gallery/Gallery.vue'),
		AudioRecorder: () => import(/* webpackChunkName: "AudioRecorder" */ '../AudioRecorder/AudioRecorder.vue')
	},

	data: () => ({
		pendingFiles: [],
		messagePaginateLoading: false,
		typingUsers: {},
		emojipicker: false,
		dayjs: dayjs,
		dragOver: false,
		textMessage: '',
		selectedFile: null,
		recorder: '',
		hasScreenRecording: false,
		pastedFile: null,
		isScreenRecordDownloading: false,
		selectedMessage: null
	}),

	computed: {
		grouped_messages() {
			/* eslint-disable */
			const grouped_messages = [];
			const paginated_messages = (this.conversation.paginated_messages || {}).data || [];
			const messages = paginated_messages.slice(0).sort((a, b) => {
				return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
			});
			for (var i = 0; i <= messages.length - 1; i++) {
				let message_group = { sender: Object.assign({}, messages[i].user) || (messages[i].metadata.is_chatbot ? { id: 'chatbot' } : ''), messages: [messages[i]] };

				let message = message_group.messages[message_group.messages.length - 1];
				if (messages[i].type == 'call_ended' || messages[i].type == 'call_failed') {
					message_group.type = messages[i].type;
				} else {
					groupMessage();

					function groupMessage() {
						const next_message = messages[i + 1];
						if (next_message && next_message.user && next_message.user.id == message_group.sender.id && next_message.type != 'call_ended' && next_message.type != 'call_failed') {
							let message = messages[i + 1];
							if (!message_group.messages.find(x => x.id == message.id)) {
								message_group.messages.push(message);
							}
							i++;
							groupMessage();
						}
					}
				}

				if (message_group.sender.id == this.$root.auth.id || message_group.sender.id == 'chatbot') {
					message_group.sender.full_name = 'You';
					message_group.outgoing = true;
					message_group.is_read = message.is_read;
				}
				message_group.created_at = message.created_at;
				message_group.timestamp = message_group.messages[message_group.messages.length - 1].timestamp;
				grouped_messages.push(message_group);
			}

			return grouped_messages;
		}
	},

	watch: {
		'conversation.channel': function (value) {
			if (value) {
				this.conversation.channel.listenForWhisper('typing', e => {
					if (this.$root.auth.id != e.userId) {
						this.$set(this.typingUsers, e.userId, e);
					}
				});
			}
		},
		'$root.screenRecorder.status': function (value) {
			if (value == 'paused') this.checkScreenRecorder();
			else this.hasScreenRecording = false;
		},
		'$root.screenRecorder.conversation_id': function (value) {
			if (value == this.conversation.id) this.checkScreenRecorder();
			//else this.hasScreenRecording = false;
		}
	},

	created() {
		if (!this.isVideoMessage) {
			this.$root.getFiles(this.conversation);
		}
	},

	mounted() {
		this.checkScreenRecorder();
	},

	methods: {
		...mapActions({
			deleteMessage: 'messages/delete',
			storeMessage: 'messages/store'
		}),

		sendVideo(video) {
			if (this.conversation) {
				let message = {
					user: this.$root.auth,
					source: video.source,
					preview: video.preview,
					type: 'video',
					message: 'video',
					created_diff: 'Just now',
					metadata: { duration: video.duration }
				};
				this.sendMessage(message);
				this.recorder = '';
			}
		},

		async downloadScreenRecording() {
			if (!this.isVideoMessage && this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data && !this.$root.screenRecorder.isDownloaded) {
				let video = await this.$root.$refs['screenRecorder'].submit();
				let link = document.createElement('a');
				link.download = video.source.name;
				link.href = URL.createObjectURL(video.source);
				link.click();
			}
			this.hasScreenRecording = false;
		},

		async sendScreenRecording() {
			if (!this.isVideoMessage && this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data && !this.$root.screenRecorder.isSent) {
				let video = await this.$root.$refs['screenRecorder'].submit();
				this.hasScreenRecording = false;
				this.sendVideo(video);
			}
		},

		checkScreenRecorder() {
			if (!this.isVideoMessage && this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data) {
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

		sendAudio(audio) {
			if (this.conversation) {
				let message = {
					user: this.$root.auth,
					source: audio.source,
					type: 'audio',
					message: 'audio',
					created_diff: 'Just now',
					metadata: { duration: audio.duration }
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

		sendPastedFile() {
			if (this.pastedFile) {
				this.addFile({ target: { files: [this.pastedFile.file], value: this.pastedFile.file.name } });
			}
			this.pastedFile = null;
		},

		inputPaste(e) {
			if (e.clipboardData.files.length > 0) {
				e.preventDefault();
				let event = {
					dataTransfer: {
						files: e.clipboardData.files
					}
				};
				this.dropFile(event);
			} else {
				let clearText = e.clipboardData.getData('text/plain');
				document.execCommand('inserttext', false, clearText);
			}
		},

		fileToBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
			});
		},

		initScreenRecorder() {
			// console.log(this.$root);

			// return;

			if (!this.$root.screenRecorder.conversation_id) {
				this.$root.screenRecorder.conversation_id = this.conversation.id;
				this.$nextTick(() => {
					this.$root.$refs.screenRecorder.initDevices();
				});
			}
		},

		messageTimezoneTime(message) {
			return dayjs(parseFloat(message.timestamp)).format('hh:mmA on ddd');
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
				this.conversation.channel.whisper('typing', {
					userId: this.$root.auth.id,
					name: this.$root.auth.full_name,
					typing: false
				});
				message.is_online = this.isOnline;
				let response = await this.storeMessage(message);
				if (!this.isVideoMessage) {
					this.$root.appChannel.whisper('newMessage', {
						id: response.id,
						conversation_id: response.conversation_id,
						timestamp: response.timestamp
					});
				}

				// if (!['text', 'emoji'].find(x => x == response.type)) {
				// 	this.conversation.files.data.unshift(response);
				// }
			}
		},

		selectEmoji(emoji) {
			this.$refs['messageInput'].innerHTML += emoji + ' ';
			this.placeCaretAtEnd(this.$refs['messageInput']);
		},

		placeCaretAtEnd(el) {
			el.focus();
			if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
				var range = document.createRange();
				range.selectNodeContents(el);
				range.collapse(false);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			} else if (typeof document.body.createTextRange != 'undefined') {
				var textRange = document.body.createTextRange();
				textRange.moveToElementText(el);
				textRange.collapse(false);
				textRange.select();
			}
		},

		messageFormMounted() {
			if (this.$route && this.$route.query.focus) {
				if (this.$refs['messageInput'] && this.$route.query.focus == 'message_input') {
					this.$refs['messageInput'].focus();
				}
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
					created_diff: 'Just now'
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
						{ maxWidth: 450, canvas: true }
					);
				} else {
					await this.fileToBase64(fileInput.files[0]);
					let messageData = {
						filename: fileInput.value.split(/(\\|\/)/g).pop(),
						extension: fileExtension,
						size: filesize(fileInput.files[0].size, { round: 0 })
					};
					message.metadata = messageData;
					this.sendMessage(message);
				}
			}
		},

		async sendText() {
			this.textMessage = this.$refs['messageInput'].innerText;
			this.$refs['messageInput'].innerHTML = '';
			let textMessage = this.textMessage.trim() || '';

			this.textMessage = '';
			if (textMessage.length > 0) {
				let message = {
					user: this.$root.auth,
					message: textMessage,
					type: 'text',
					created_diff: 'Just now'
				};
				await this.sendMessage(message);
			}

			this.pendingFiles.forEach(file => {
				this.addFile({ target: { files: [file.file], value: file.file.name } });
			});
			this.pendingFiles = [];
		},

		dropFile(e) {
			this.dragOver = false;
			this.typing();
			for (let file of e.dataTransfer.files) {
				let parts = file.type.split('/');
				file.extension = file.name.split('.').pop();
				if (this.$root.isImage(file.extension)) {
					file.dataType = 'image';
				} else if (parts[0] == 'video') {
					file.dataType = 'video';
				} else if (parts[0] == 'audio') {
					file.dataType = 'audio';
				} else if (parts[1] == 'pdf') {
					file.dataType = 'pdf';
				} else {
					file.dataType = 'document';
				}

				if (file.dataType == 'image') {
					loadImage(
						file,
						canvas => {
							let dataurl = canvas.toDataURL(file.type);
							this.pendingFiles.push({ file: file, preview: dataurl });
						},
						{ maxWidth: 500, canvas: true, pixelRatio: window.devicePixelRatio, downsamplingRatio: 0.5, imageSmoothingEnabled: true }
					);
				} else {
					this.pendingFiles.push({ file: file });
				}
			}
		},

		async messageScroll(e) {
			if (!this.messagePaginateLoading && this.conversation && (this.conversation.paginated_messages || {}).next_page_url) {
				this.messagePaginateLoading = true;
				const url = new URL(window.location.origin + this.conversation.paginated_messages.next_page_url);
				const urlParams = new URLSearchParams(url.search);
				const page = urlParams.get('page') || 1;

				this.$emit('scrollUp', page);
			}
		},

		typing() {
			if (this.conversation.channel) {
				if (!this.isTyping) {
					this.isTyping = true;
					this.conversation.channel.whisper('typing', {
						userId: this.$root.auth.id,
						name: this.$root.auth.full_name,
						typing: true
					});
				} else {
					clearTimeout(this.typingTimeout);
				}

				this.typingTimeout = setTimeout(() => {
					this.isTyping = false;
					this.conversation.channel.whisper('typing', {
						userId: this.$root.auth.id,
						name: this.$root.auth.full_name,
						typing: false
					});
				}, 5000);
			}
		},

		messageInput(e) {
			let isEnter = false;
			if ((e.keyCode ? e.keyCode : e.which) == 13) {
				e.preventDefault();
				isEnter = true;
				this.$refs['messageForm'].submit();
			}
			setTimeout(() => {
				if (!isEnter && this.textMessage.trim().length) {
					this.typing();
				}
			}, 50);
		}
	}
};
