<template>
	<div class="w-100 position-relative">
		<!-- Emoji -->
		<div class="mb-0 display-3 line-height-1" v-if="message.type == 'emoji'">{{ message.message }}</div>

		<!-- Image -->
		<div class="mb-0 d-inline-block cursor-pointer" v-else-if="message.type == 'image'">
			<img class="rounded cursor-pointer border" :src="message.preview" @click="$parent.openFile(message)" />
		</div>

		<!-- Video -->
		<div class="mb-0 position-relative d-inline-block cursor-pointer" v-else-if="message.type == 'video'">
			<img class="rounded border" :src="message.preview" @click="click ? $parent.openFile(message) : null" />
			<div class="position-absolute-center preview-video-play pointer-events-none">
				<play-icon height="20" width="20"></play-icon>
			</div>
		</div>

		<!-- Audio -->
		<div v-else-if="message.type == 'audio'">
			<waveplayer :source="message.source" :duration="message.metadata.duration"></waveplayer>
		</div>

		<!-- File -->
		<div class="mb-0" v-else-if="message.type == 'file'">
			<img v-if="$parent.isImage(message.metadata.extension)" class="w-100 rounded cursor-pointer" :src="message.preview" />
			<span class="cursor-pointer" @click="click ? $parent.downloadMedia(message) : null">
				<span class="d-block text-center">
					<component :is="fileIcon(message.metadata.extension)" height="46" transform="scale(1.7)" :fill="outgoing ? 'white' : ''"></component>
				</span>
				<div class="d-flex align-items-center">
					<arrow-circle-down-icon height="15" width="15" :fill="outgoing ? 'white' : ''"></arrow-circle-down-icon>&nbsp;
					<small class="text-ellipsis" :class="[outgoing ? 'text-white' : 'text-gray']">{{ message.metadata.filename }}</small>
				</div>
			</span>
		</div>

		<!-- Text -->
		<div class="mb-0" v-else>
			<p class="mb-0 text-left">{{ message.message }}</p>
			<div v-if="message.preview">
				{{ message.preview }}
				<div v-if="typeof message.preview == 'boolean'" class="text-center">
					<div class="spinner-border spinner-border-sm" role="status"></div>
				</div>
				<div v-else v-html="message.preview"></div>
			</div>
		</div>
	</div>
</template>

<script>
import FileEmptyIcon from '../icons/file-empty';
import FileImageIcon from '../icons/file-image';
import FileVideoIcon from '../icons/file-video';
import FileAudioIcon from '../icons/file-audio';
import FilePdfIcon from '../icons/file-pdf';
import FileArchiveIcon from '../icons/file-archive';
import DocumentIcon from '../icons/document';
import ArrowCircleDownIcon from '../icons/arrow-circle-down';
import PlayIcon from '../icons/play';
import Waveplayer from './waveplayer';
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
		}
	},

	components: { FileEmptyIcon, FileImageIcon, FileVideoIcon, FileAudioIcon, FilePdfIcon, FileArchiveIcon, DocumentIcon, ArrowCircleDownIcon, PlayIcon, Waveplayer },

	methods: {
		fileIcon(extension) {
			let iconComponent = 'document-icon';
			let videoExtensions = ['mp4', 'webm'];
			let audioExtensions = ['mp3', 'wav'];

			if (this.$parent.isImage(extension)) {
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
		}
	}
};
</script>

<style scoped>
img {
	width: 350px;
	max-width: 100%;
	height: auto;
}
.preview-video-play {
	line-height: 0;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.75);
	padding: 10px;
}
</style>
