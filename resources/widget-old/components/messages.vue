<template>
	<div class="snapturebox-overflow-hidden snapturebox-h-100 snapturebox-d-flex snapturebox-flex-column">
		<div class="snapturebox-p-3 snapturebox-d-flex snapturebox-align-items-center snapturebox-border-bottom">
			<div>
				<h1 class="snapturebox-h6 snapturebox-font-weight-bold snapturebox-mb-1">{{ $root.widget.name }}</h1>
				<div class="snapturebox-d-flex snapturebox-align-items-center"><span class="snapturebox-chat-status snapturebox-bg-success snapturebox-mr-1">&nbsp;</span> <small class="snapturebox-text-secondary">Online (Live chat available)</small></div>
			</div>
			<button class="snapturebox-ml-auto snapturebox-h6 snapturebox-btn snapturebox-p-0 snapturebox-mb-0">‒</button>
		</div>

		<div class="snapturebox-bg-white snapturebox-flex-grow-1 snapturebox-overflow-auto snapturebox-p-3" id="snapturebox-message-group-container" ref="message-group-container">
			<!-- Login/Signup -->
			<div v-if="!$root.auth" class="snapturebox-mb-3">
				<div class="snapturebox-d-flex snapturebox-mx-n1">
					<div class="snapturebox-flex-grow-1 snapturebox-px-1">
						<button class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-outline-primary snapturebox-btn-block" :class="{ 'snapturebox-active': authAction == 'login' }" @click="authAction = authAction == 'login' ? '' : 'login'">Log In</button>
					</div>
					<div class="snapturebox-flex-grow-1 snapturebox-px-1">
						<button class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-outline-primary snapturebox-btn-block" :class="{ 'snapturebox-active': authAction == 'register' }" @click="authAction = authAction == 'register' ? '' : 'register'">Signup</button>
					</div>
				</div>
				<div class="snapturebox-mt-2" v-if="authAction">
					<login v-if="authAction == 'login'"></login>
					<register v-else-if="authAction == 'register'"></register>
				</div>
			</div>

			<div v-for="grouped_message in grouped_messages" class="snapturebox-w-100 snapturebox-message-group">
				<div class="snapturebox-message-item" v-for="message in grouped_message.messages" v-cloak :class="{ 'snapturebox-outgoing-message': ($root.auth && $root.auth.id == message.user.id) || message.user.id == $root.guest_cookie }" v-if="message.type != 'action'">
					<div class="snapturebox-media snapturebox-mb-2 snapturebox-text-left snapturebox-d-inline-flex snapturebox-align-items-center">
						<div class="snapturebox-profile-image" :style="[message.user.profile_image ? { backgroundImage: 'url(' + $root.API + message.user.profile_image + ')' } : '']">
							<span v-if="!message.user.profile_image">{{ message.user.initials }}</span>
						</div>
						<div class="snapturebox-media-body snapturebox-pl-2 snapturebox-d-flex snapturebox-align-items-center">
							<div class="snapturebox-font-weight-bold snapturebox-line-height-sm snapturebox-message-name">{{ ($root.auth && $root.auth.id == message.user.id) || message.user.id == $root.guest_cookie ? 'You' : message.user.full_name }}</div>
							<small class="snapturebox-text-secondary snapturebox-ml-1">{{ message.created_at }}</small>
						</div>
					</div>
					<div>
						<div class="snapturebox-message-content snapturebox-d-inline-block snapturebox-message-content snapturebox-text-break">
							<!-- Emoji -->
							<p class="snapturebox-mb-0 snapturebox-h2" v-if="message.type == 'emoji'">{{ message.message }}</p>

							<!-- Image -->
							<p class="snapturebox-mb-0" v-else-if="message.type == 'image'">
								<img class="snapturebox-w-100 snapturebox-rounded snapturebox-cursor-pointer" :src="message.preview" @click="$emit('openMedia', message)" />
							</p>

							<!-- Audio -->
							<div v-else-if="message.type == 'audio'">
								<waveplayer :theme="($root.auth && $root.auth.id == message.user.id) || message.user.id == $root.guest_cookie ? 'light' : ''" :source="message.source" :duration="message.metadata.duration"></waveplayer>
							</div>

							<!-- Video -->
							<div v-else-if="message.type == 'video'" class="snapturebox-position-relative">
								<div class="snapturebox-position-absolute-center snapturebox-text-center snapturebox-message-play-icon snapturebox-cursor-pointer">
									<play-icon></play-icon>
								</div>
								<img class="snapturebox-w-100 snapturebox-rounded" :src="message.preview" />
							</div>

							<!-- File -->
							<p class="snapturebox-mb-0" v-else-if="message.type == 'file'">
								<img v-if="isImage(message.metadata.extension)" class="snapturebox-w-100 snapturebox-rounded snapturebox-cursor-pointer" :src="message.preview" @click="$emit('openMedia', message)" />
								<span class="snapturebox-cursor-pointer" @click="downloadMedia(message)">
									<span class="snapturebox-d-block snapturebox-text-center">
										<component :is="fileIcon(message.metadata.extension)" fill="white" height="46" transform="scale(1.7)"></component>
									</span>
									<span class="snapturebox-d-flex snapturebox-align-items-center"> <arrow-circle-down-icon fill="white" height="15" width="15"></arrow-circle-down-icon>&nbsp;{{ message.metadata.filename }} </span>
								</span>
							</p>

							<!-- Text -->
							<div class="snapturebox-mb-0" v-else-if="message.type == 'text'">
								<span v-if="message.status == 'is_writing'" class="snapturebox-typing-indicator">
									<span></span>
									<span></span>
									<span></span>
								</span>
								<template v-else>
									<p class="snapturebox-mb-0">{{ message.message }}</p>
									<div v-if="message.preview">
										<div v-if="typeof message.preview == 'boolean'" class="snapturebox-text-center">
											<div class="snapturebox-spinner-border snapturebox-spinner-border-sm" role="status"></div>
										</div>
										<div v-else v-html="message.preview"></div>
									</div>
								</template>
							</div>

							<!-- Buttons -->
							<div class="snapturebox-mb-0" v-else-if="message.type == 'buttons'">
								<span v-if="message.status == 'is_writing'" class="snapturebox-typing-indicator">
									<span></span>
									<span></span>
									<span></span>
								</span>
								<template v-else>
									<p class="snapturebox-mb-0">{{ message.message }}</p>
									<button class="snapturebox-mt-2 snapturebox-btn snapturebox-btn-sm snapturebox-btn-outline-primary snapturebox-badge-pill snapturebox-mr-1" v-for="button in message.metadata.buttons" @click="$parent.sendMessage({ message: button.id, type: 'action', target: button.target })">{{ button.text }}</button>
								</template>
							</div>

							<!-- Options -->
							<div class="snapturebox-mb-0" v-else-if="message.type == 'options'">
								<span v-if="message.status == 'is_writing'" class="snapturebox-typing-indicator">
									<span></span>
									<span></span>
									<span></span>
								</span>
								<template v-else>
									<p class="snapturebox-mb-0">{{ message.message }}</p>
									<button class="snapturebox-mt-1 snapturebox-btn snapturebox-btn-sm snapturebox-btn-outline-primary snapturebox-badge-pill snapturebox-mr-1 snapturebox-btn-block" v-for="option in message.metadata.options" :disabled="message.answer" :class="{ 'snapturebox-bg-primary snapturebox-text-white': message.answer == option.id }" @click="$parent.sendMessage({ message: option.id }, 'action', { message: message, answer: option.id })">{{ option.text }}</button>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="snapturebox-border-top snapturebox-shadow-sm snapturebox-p-2 snapturebox-d-flex snapturebox-align-items-center snapturebox-bg-white">
			<vue-form-validate @submit="sendText" class="snapturebox-w-100">
				<input type="text" v-model="textMessage" class="snapturebox-form-control snapturebox-form-control-sm snapturebox-pl-0" placeholder="Write a message.." data-required />
			</vue-form-validate>
			<button type="button" class="snapturebox-line-height-sm snapturebox-ml-2 snapturebox-btn snapturebox-px-0 snapturebox-emojipicker" @blur="emojipicker = false" :class="{ 'snapturebox-emojipicker-open': emojipicker }">
				<smile-icon width="20" height="20" class="snapturebox-cursor-pointer" @click.native="emojipicker = emojipicker ? false : true"></smile-icon>
				<VEmojiPicker :emojisByRow="6" @select="selectEmoji" />
			</button>
			<button class="snapturebox-line-height-sm snapturebox-ml-2 snapturebox-btn snapturebox-px-0" type="button" @click="$parent.openPanel('video-recorder')"><camera-icon width="20" height="20"></camera-icon></button>
			<button class="snapturebox-line-height-sm snapturebox-ml-2 snapturebox-btn snapturebox-px-0" type="button" @click="$parent.openPanel('audio-recorder')"><microphone-icon width="20" height="20"></microphone-icon></button>
			<button class="snapturebox-line-height-sm snapturebox-ml-2 snapturebox-btn snapturebox-px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon width="20" height="20"></add-note-icon></button>
			<input type="file" hidden ref="fileMedia" @change="addFile" />
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import filesize from 'filesize';
import VEmojiPicker from 'v-emoji-picker';
import SmileIcon from '../../icons/smile';
import VideoIcon from '../../icons/video';
import SendIcon from '../../icons/send';
import CameraIcon from '../../icons/camera';
import AddNoteIcon from '../../icons/add-note';
import FileEmptyIcon from '../../icons/file-empty';
import FileImageIcon from '../../icons/file-image';
import FileVideoIcon from '../../icons/file-video';
import FileAudioIcon from '../../icons/file-audio';
import FilePdfIcon from '../../icons/file-pdf';
import FileArchiveIcon from '../../icons/file-archive';
import DocumentIcon from '../../icons/document';
import ArrowCircleDownIcon from '../../icons/arrow-circle-down';
import MicrophoneIcon from '../../icons/microphone';
import PlayIcon from '../../icons/play';
import Waveplayer from './waveplayer';
export default {
	components: { VEmojiPicker, SmileIcon, VideoIcon, SendIcon, CameraIcon, AddNoteIcon, ArrowCircleDownIcon, FileEmptyIcon, FileImageIcon, FileVideoIcon, FileAudioIcon, FilePdfIcon, FileArchiveIcon, DocumentIcon, MicrophoneIcon, PlayIcon, Waveplayer, login: () => import(/* webpackChunkName: "login" */ './login'), register: () => import(/* webpackChunkName: "register" */ './register') },
	props: {
		messages: {
			type: Array,
			default: function () {
				return [];
			},
			required: true
		}
	},

	data: () => ({
		emojipicker: false,
		textMessage: '',
		dayjs: dayjs,
		authAction: ''
	}),

	computed: {
		grouped_messages() {
			const grouped_messages = [];
			if (this.messages) {
				// sort messages by timestamp
				const messages = (this.messages || []).sort((a, b) => {
					return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
				});

				for (let i = 0; i <= messages.length - 1; i++) {
					let message_group = { sender: messages[i].user.id, messages: [messages[i]] };
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
		}
	},

	created() {},

	mounted() {
		this.scrollDown();
	},

	methods: {
		downloadMedia(message) {
			if (message.source) {
				let sourceURL = new URL(message.source);
				let link = document.createElement('a');
				link.href = `${this.$root.API}/media${sourceURL.pathname}?filename=${message.metadata.filename}`;
				link.target = '_blank';
				link.download = message.metadata.filename;
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
				reader.onerror = error => reject(error);
			});
		},

		async addFile(e) {
			let fileInput = this.$refs['fileMedia'];
			if (fileInput.value) {
				let file = e.target.files[0];
				const timestamp = dayjs().valueOf();
				let user = this.$root.auth || { id: this.$root.guest_cookie, initials: 'G' };
				let message = {
					user: user,
					timestamp: dayjs().valueOf(),
					type: 'file',
					created_at: dayjs(timestamp).format('hh:mm A')
				};

				let fileExtension = fileInput.value.split('.').pop();
				if (this.isImage(fileExtension)) {
					message.type = 'image';
					let img = new Image();
					img.src = URL.createObjectURL(fileInput.files[0]);
					img.onload = () => {
						// Preview
						let canvasPreview = document.createElement('canvas');
						let contextPreview = canvasPreview.getContext('2d');
						canvasPreview.width = img.width / 2;
						canvasPreview.height = img.height / 2;
						contextPreview.drawImage(img, 0, 0, canvasPreview.width, canvasPreview.height);
						let previewUrl = canvasPreview.toDataURL('image/jpeg');
						message.source = file;
						message.preview = previewUrl;
						this.$emit('send', message);
						this.scrollDown();
					};
				} else {
					let messageData = {
						filename: fileInput.value.split(/(\\|\/)/g).pop(),
						extension: fileExtension,
						size: filesize(fileInput.files[0].size, { round: 0 })
					};
					message.source = file;
					message.metadata = messageData;
					this.$emit('send', message);
					this.scrollDown();
				}
			}
		},

		sendText() {
			const timestamp = dayjs().valueOf();
			let user = this.$root.auth || { id: this.$root.guest_cookie, initials: 'G' };
			this.$emit('send', {
				user: user,
				message: this.textMessage.trim(),
				type: 'text',
				timestamp: timestamp,
				created_at: dayjs(timestamp).format('hh:mm A')
			});
			this.textMessage = '';
			this.scrollDown();
		},

		selectEmoji(emoji) {
			let user = this.$root.auth || { id: this.$root.guest_cookie, initials: 'G' };
			const timestamp = dayjs().valueOf();
			this.emojipicker = false;
			this.$emit('send', {
				user: user,
				message: emoji.data,
				type: 'emoji',
				timestamp: dayjs().valueOf(),
				created_at: dayjs(timestamp).format('hh:mm A'),
				metadata: { guest_cookie: this.$root.guest_cookie }
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
		}
	}
};
</script>

<style scoped lang="scss">
@import '../variables.scss';
.message-play-icon {
	background: rgba(255, 255, 255, 0.7);
	border-radius: 50%;
	padding: 10px;
}
.message-group {
	margin-bottom: 1.5rem;
	.message-item:not(:first-child):not(:only-child) {
		.media {
			display: none !important;
		}
	}
	.message-content {
		padding: 8px 12px;
		margin-bottom: 2px;
		max-width: 90%;
		text-align: left;
		line-height: 18px;
		p:not(.h2) {
			line-height: 18px;
		}
	}
	.message-name {
		font-size: 16px;
	}

	/* Message right */
	.message-item {
		&.outgoing-message {
			text-align: right;
			&:only-child,
			&:first-child {
				.message-content {
					border-top-right-radius: 1em;
				}
			}
			&:only-child,
			&:last-child:not(:only-child) {
				.message-content {
					border-bottom-right-radius: 1em;
				}
			}
			.message-content {
				background-color: $primary;
				color: white;
				border-top-left-radius: 1em;
				border-bottom-left-radius: 1em;
			}
		}
	}

	/* Message left */
	.message-item:not(.outgoing-message) {
		.message-content {
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			background-color: $light;
		}
		&:only-child,
		&:first-child {
			.message-content {
				border-top-left-radius: 10px;
			}
		}
		&:only-child,
		&:last-child:not(:only-child) {
			.message-content {
				border-bottom-left-radius: 10px;
			}
		}
	}
}

.typing-indicator {
	width: auto;
	position: relative;
	display: inline-block;
	span {
		height: 8px;
		width: 8px;
		display: inline-block;
		background-color: #9e9ea1;
		border-radius: 50%;
		opacity: 0.4;
		@for $i from 1 through 3 {
			&:nth-of-type(#{$i}) {
				animation: 1s blink infinite ($i * 0.3333s);
			}
		}
	}
}

@keyframes blink {
	50% {
		opacity: 1;
	}
}

.emojipicker {
	&.emojipicker-open {
		> div {
			z-index: 1;
			visibility: visible;
		}
	}
	> div {
		position: absolute;
		bottom: 38px;
		right: 10px;
		z-index: -1;
		visibility: hidden;
	}
}
</style>
