<template>
	<div class="position-relative">
		<!-- Emoji -->
		<div class="mb-0 text-4xl leading-none" v-if="message.type == 'emoji'">{{ message.message }}</div>

		<!-- Image -->
		<div class="mb-0" v-else-if="message.type == 'image'">
			<div v-if="message.sending" class="absolute-center message-sending w-full h-full">
				<div class="absolute-center">
					<div class="spinner-border spinner-border-sm text-primary"></div>
				</div>
			</div>
			<div v-if="squareThumbnail" class="image-square rounded" :style="{ backgroundImage: 'url(' + message.preview + ')' }" @click="if (click) $parent.openFile(message);"></div>
			<img v-else draggable="false" class="rounded cursor-pointer" :src="message.preview" @click="if (click) $parent.openFile(message);" />
		</div>

		<!-- Video -->
		<div class="mb-0" v-else-if="message.type == 'video'">
			<div v-if="message.sending" class="absolute-center message-sending w-full h-full">
				<div class="absolute-center">
					<div class="spinner-border spinner-border-sm text-primary"></div>
				</div>
			</div>
			<div v-else class="absolute-center preview-video-play pointer-events-none">
				<play-icon height="20" width="20"></play-icon>
			</div>
			<div v-if="squareThumbnail" class="image-square rounded" :style="{ backgroundImage: 'url(' + message.preview + ')' }" @click="if (click) $parent.openFile(message);"></div>
			<img v-else draggable="false" class="rounded cursor-pointer" :src="message.preview" @click="if (click) $parent.openFile(message);" />
		</div>

		<!-- Audio -->
		<div v-else-if="message.type == 'audio'">
			<waveplayer :theme="outgoing ? 'light' : ''" :source="message.source" :duration="message.metadata.duration"></waveplayer>
		</div>

		<!-- File -->
		<div class="mb-0" v-else-if="message.type == 'file'">
			<img draggable="false" v-if="$root.isImage(message.metadata.extension)" class="w-full rounded-md cursor-pointer" :src="message.preview" />
			<span class="cursor-pointer" @click="if (click) $root.downloadMedia(message);">
				<span class="block text-center">
					<component :is="fileIcon(message.metadata.extension)" height="46" transform="scale(1.7)" :fill="outgoing ? 'white' : ''"></component>
				</span>
				<div class="flex items-center">
					<arrow-circle-down-icon height="15" width="15" :fill="outgoing ? 'white' : ''"></arrow-circle-down-icon>&nbsp;
					<small class="text-ellipsis" :class="[outgoing ? 'text-white' : 'text-muted']">{{ message.metadata.filename }}</small>
				</div>
			</span>
		</div>

		<!-- Text -->
		<div class="mb-0" v-else>
			<p class="mb-0 text-left message-text" v-html="urlify(message.message)"></p>
			<div class="message-preview-container" v-if="message.link_preview" v-html="message.link_preview"></div>
		</div>
	</div>
</template>

<script>
import FileEmptyIcon from '../../../../icons/file-empty';
import FileImageIcon from '../../../../icons/file-image';
import FileVideoIcon from '../../../../icons/file-video';
import FileAudioIcon from '../../../../icons/file-audio';
import FilePdfIcon from '../../../../icons/file-pdf';
import FileArchiveIcon from '../../../../icons/file-archive';
import DocumentIcon from '../../../../icons/document';
import ArrowCircleDownIcon from '../../../../icons/arrow-circle-down';
import PlayIcon from '../../../../icons/play';
import Waveplayer from '../../../../components/waveplayer';
export default {
	props: {
		message: {
			type: Object
		},
		outgoing: {
			type: Boolean,
			default: false
		},
		click: {
			type: Boolean,
			default: true
		},

		squareThumbnail: {
			type: Boolean,
			default: false
		}
	},

	components: { FileEmptyIcon, FileImageIcon, FileVideoIcon, FileAudioIcon, FilePdfIcon, FileArchiveIcon, DocumentIcon, ArrowCircleDownIcon, PlayIcon, Waveplayer },

	methods: {
		fileIcon(extension) {
			let iconComponent = 'document-icon';
			let videoExtensions = ['mp4', 'webm'];
			let audioExtensions = ['mp3', 'wav'];

			if (this.$root.isImage(extension)) {
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

		urlify(text) {
			var urlRegex = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
			return text.replaceAll(urlRegex, function (url) {
				return '<a target="_blank" href="' + url + '">' + url + '</a>';
			});
		}
	}
};
</script>

<style scoped lang="scss">
.message-preview-container {
	::v-deep .message-preview {
		background: white !important;
		text-decoration: none;
		width: 350px;
		min-width: 100%;
		max-width: 100%;
		.preview-image {
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			height: 180px;
		}
		p {
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		&:hover {
			h6 {
				text-decoration: underline;
			}
		}
	}
}
.message-sending {
	background-color: rgba(255, 255, 255, 0.65);
}
.message-text {
	@apply leading-5 whitespace-pre-wrap break-words;
}
p {
	line-height: 1.3;
}
img {
	max-width: 100%;
	width: 350px;
	height: auto;
}
.image-square {
	width: 100px;
	height: 100px;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
.preview-video-play {
	line-height: 0;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.75);
	padding: 10px;
}
</style>
