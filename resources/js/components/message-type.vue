<template>
	<div>
		<!-- Emoji -->
        <p class="mb-0 h2" v-if="message.type == 'emoji'">{{ message.message }}</p>

        <!-- Image -->
        <p class="mb-0" v-else-if="message.type == 'image'">
            <img class="w-100 rounded cursor-pointer" :src="message.preview" @click="$emit('openMedia', message)" />
        </p>

        <!-- Audio -->
        <div v-else-if="message.type == 'audio'">
            <waveplayer :source="message.source" :duration="message.metadata.duration"></waveplayer>
        </div>

        <!-- File -->
        <p class="mb-0" v-else-if="message.type == 'file'">
            <img v-if="$parent.isImage(message.metadata.extension)" class="w-100 rounded cursor-pointer" :src="message.preview" @click="$emit('openMedia', message)" />
            <span class=" cursor-pointer" @click="$parent.downloadMedia(message)">
                <span class="d-block text-center">
                    <component :is="fileIcon(message.metadata.extension)" height="46" transform="scale(1.7)"></component>
                </span>
                <span class="d-flex align-items-center"> <arrow-circle-down-icon height="15" width="15"></arrow-circle-down-icon>&nbsp;{{ message.metadata.filename }} </span>
            </span>
        </p>

        <!-- Text -->
        <div class="mb-0" v-else>
            <p class="mb-0">{{ message.message }}</p>
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
import ArrowCircleDownIcon from '../icons/arrow-circle-down';
import Waveplayer from './waveplayer';
export default {
	props: {
		message: {
			type: Object
		}
	},

    components: {FileEmptyIcon, FileImageIcon, FileVideoIcon, FileAudioIcon, FilePdfIcon, FileArchiveIcon, ArrowCircleDownIcon, Waveplayer},

	methods: {
        fileIcon(extension) {
            let iconComponent = 'file-empty-icon';
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
        },
	}
}
</script>