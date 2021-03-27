import { mapGetters, mapActions, mapState } from 'vuex';
import dayjs from 'dayjs';
//const mime = require('mime');
//import Compressor from 'compressorjs';

import Modal from '../../../../components/modal/modal.vue';

import CastIcon from '../../../../icons/cast';
import NoteIcon from '../../../../icons/note';
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
import FileArchiveIcon from '../../../../icons/file-archive';
import FilePdfIcon from '../../../../icons/file-pdf';
import FileAudioIcon from '../../../../icons/file-audio';
import VolumeMidIcon from '../../../../icons/volume-mid';
import CallMenuIcon from '../../../../icons/call-menu';
import VideocamIcon from '../../../../icons/videocam';
import DocumentAltIcon from '../../../../icons/document-alt';
import DownloadIcon from '../../../../icons/download';
//import WeekView from '../../../components/WeekView/WeekView.vue';

import Tooltip from '../../../../js/directives/tooltip';
import Messages from '../../../components/Messages/Messages.vue';

export default {
	components: {
		//WeekView,

		Modal,

		CastIcon,
		NoteIcon,
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
		FileArchiveIcon,
		FilePdfIcon,
		FileAudioIcon,
		VolumeMidIcon,
		CallMenuIcon,
		VideocamIcon,
		DocumentAltIcon,
		DownloadIcon,
		Messages,

		info: () => import(/* webpackChunkName: "dashboard-conversations-show-info" */ './info/info.vue')
		//'video-recorder-modal': () => import(/* webpackChunkName: "modals-videorecorder" */ '../../../../modals/video-recorder'),
	},

	directives: {
		Tooltip
	},

	data: () => ({
		ready: false,
		moreActions: false,
		hasScreenRecording: false,
		pastedFile: null,
		selectedMessage: null,
		isTyping: false,
		typingTimeout: null,
		isScreenRecordDownloading: false,
		channel: null,
		duration: 0,
		showNotes: false,
		dayjs: dayjs,
		addNewNote: false,
		newNote: ''
	}),

	watch: {
		ready: function(value) {
			if (value) {
				this.$root.contentloading = false;
			}
			setTimeout(() => {
				this.$nextTick(() => {
					this.$emit('ready');
				});
			}, 50);
		},
		'conversation.id': function() {
			this.ready = false;
			if (this.$refs['messageInput']) this.$refs['messageInput'].focus();
		},
		'conversation.ready': function(value) {
			if (value) {
				this.ready = true;
				if (this.channel) {
					this.channel.whisper('readLastMessage', { conversation_id: this.conversation.id, message_id: this.conversation.last_message.id });
				}
			}
		},
		'conversation.last_message': function(value) {
			if (this.conversation && this.conversation.paginated_messages && value.id) {
				let message = this.conversation.paginated_messages.data.find(x => x.id == value.id);
				if (!message) {
					this.conversation.paginated_messages.data.push(value);
				}
			}
		},
		'$route.params.id': function(value) {
			if (value) {
				this.showConversation({ id: value }).then(() => {
					this.initChannel();
				});
				this.checkScreenRecorder();
			}
		},
		'$root.screenRecorder.status': function(value) {
			if (value == 'paused') this.checkScreenRecorder();
			else this.hasScreenRecording = false;
		},
		'$root.screenRecorder.conversation_id': function(value) {
			if (value == this.conversation.id) this.checkScreenRecorder();
			//else this.hasScreenRecording = false;
		}
	},

	computed: {
		...mapGetters({
			getConversation: 'conversations/show'
		}),

		...mapState({
			contacts: state => state.contacts.index
		}),

		conversation() {
			return this.getConversation(this.$route.params.id);
		}
	},

	created() {
		this.$root.toggleKnowBase = false;
		this.checkConversation().then(() => {
			this.initChannel();
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
			storeNote: 'notes/store',
			deleteNote: 'notes/delete'
		}),

		async scrollUp(page) {
			await this.showConversation({ id: this.$route.params.id, page: page }).catch(() => {});
			// let initialHeight = this.$refs['message-group-container'].scrollHeight;
			// this.$nextTick(() => {
			// 	this.$refs['message-group-container'].scrollTop = this.$refs['message-group-container'].scrollHeight - initialHeight;
			// });
		},

		deleteNoteSubmit(note, index) {
			this.deleteNote(note);
			this.conversation.notes.splice(index, 1);
		},

		addNote() {
			if (this.newNote.trim().length > 0) {
				this.storeNote({ notes: this.newNote, conversation_id: this.conversation.id }).then(note => {
					if (note) {
						this.conversation.notes.unshift(note);
					}
				});
				this.addNewNote = false;
				this.newNote = '';
			}
		},

		async getMessageByID(messageID) {
			let message = await window.axios.get(`/messages/${messageID}`).catch(() => {});
			if (message) return message.data;
		},

		initChannel() {
			if (!this.$route.params.id) return;
			this.typingUsers = {};
			if (this.channel) {
				this.$echo.leaveChannel(this.channel.name);
			}
			this.channel = this.$echo.private(`conversations.${this.$route.params.id}`);
			this.$set(this.conversation, 'channel', this.channel);

			this.channel.listenForWhisper('readLastMessage', e => {
				if (this.conversation && this.conversation.id == e.conversation_id && this.conversation.paginated_messages) {
					let message = this.conversation.paginated_messages.data.find(x => x.id == e.message_id);
					if (message) this.$set(message, 'is_read', true);
				}
			});

			this.channel.listenForWhisper('toggleVideo', e => {
				let wavesurfer = document.querySelector(`#wavesurfer-${e.username}`);
				let video = document.querySelector(`#${e.username} video`);
				if (e.isVideoStopped) {
					if (wavesurfer) {
						wavesurfer.classList.remove('hidden');
					}
					if (video) {
						video.classList.add('hidden');
					}
				} else {
					if (wavesurfer) {
						wavesurfer.classList.add('hidden');
					}
					if (video) {
						video.classList.remove('hidden');
					}
				}
			});

			this.channel.listenForWhisper('isMuted', e => {
				let microphoneMute = document.querySelector(`#microphone-mute-${e.username}`);
				if (microphoneMute) {
					if (e.isMuted) {
						microphoneMute.classList.remove('hidden');
					} else {
						microphoneMute.classList.add('hidden');
					}
				}
			});

			this.channel.listenForWhisper('remoteUserProfile', e => {
				let videoContainer = document.querySelector(`#${e.username}`);
				if (videoContainer) {
					let profileImage = document.createElement('div');
					profileImage.classList.add('profile-image');
					profileImage.classList.add('profile-image-remote');
					profileImage.style.backgroundImage = `url(${e.profileImage})`;
					if (!e.profileImage) {
						let initials = document.createElement('span');
						initials.textContent = e.initials;
						profileImage.appendChild(initials);
					}
					let fullName = document.createElement('div');
					fullName.classList.add('remote-full-name');
					fullName.textContent = e.fullName;
					videoContainer.appendChild(profileImage);
					videoContainer.appendChild(fullName);
				}
			});

			this.channel.listen('NewMessageEvent', message => {
				this.$root.newMessage(message.message);
			});
		},

		contact(member) {
			return this.contacts.find(x => x.contact_user_id == member.id);
		},

		goToContact(member) {
			let contact = this.contacts.find(x => x.contact_user_id == member.id);
			if (contact) {
				this.$router.push(`/dashboard/contacts/${contact.id}`);
			}
		},

		getText(e) {
			let clearText = e.clipboardData.getData('text/plain');
			document.execCommand('inserttext', false, clearText);
		},

		getTimeZoneOffset(date, timeZone) {
			// Abuse the Intl API to get a local ISO 8601 string for a given time zone.
			const options = { timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
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

		async checkConversation() {
			if (this.$route.params.id) {
				await this.showConversation({ id: this.$route.params.id }).catch(() => {
					this.$router.push('/dashboard/bookings/calendar');
				});
			}
		},

		async downloadScreenRecording() {
			if (this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data && !this.$root.screenRecorder.isDownloaded) {
				let video = await this.$root.$refs['screenRecorder'].submit();
				let link = document.createElement('a');
				link.download = video.source.name;
				link.href = URL.createObjectURL(video.source);
				link.click();
			}
		},

		async sendScreenRecording() {
			if (this.conversation && this.$root.screenRecorder.conversation_id == this.conversation.id && this.$root.screenRecorder.data && !this.$root.screenRecorder.isSent) {
				let video = await this.$root.$refs['screenRecorder'].submit();
				this.hasScreenRecording = false;
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

		toggleDetailsTab() {
			this.$root.detailsTab = this.$root.detailsTab ? '' : 'profile';
		}
	}
};
