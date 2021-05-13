import VLazyImage from 'v-lazy-image';
import Waveplayer from '../../../components/waveplayer';
import CloseIcon from '../../../icons/close';
import ChevronLeftIcon from '../../../icons/chevron-left';
import ChevronRightIcon from '../../../icons/chevron-right';
import VolumeMidIcon from '../../../icons/volume-mid';
export default {
	components: {
		VLazyImage,
		Waveplayer,
		CloseIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
		VolumeMidIcon
	},

	props: {
		conversation: {
			type: Object,
			required: true
		},

		file: {
			type: Object
		}
	},

	data: () => ({
		svg: '',
		open: false,
		fileExtension: ''
	}),

	watch: {
		file: async function(value) {
			if (value) {
				this.fileExtension = await value.metadata.filename.split('.').pop();
				this.svg = new Image();
				if (this.fileExtension == 'svg') {
					this.svg = value.preview;
					this.open = this.svg ? true : false;
				} else {
					this.svg = '';
					this.open = value ? true : false;
				}
			} else {
				return;
			}
		}
	},

	computed: {
		media() {
			if (!this.conversation.files) return [];
			return this.conversation.files.data.filter(message => {
				return ['image', 'video', 'audio'].find(x => x == message.type);
			});
		},

		hasPrev() {
			let media = this.media;
			let prev = media.findIndex(x => x.id == (this.file || {}).id);
			return prev > 0;
		},

		hasNext() {
			let media = this.media;
			let next = media.findIndex(x => x.id == (this.file || {}).id);
			return next + 1 < media.length;
		}
	},

	mounted() {},

	methods: {
		imageLoaded(file) {
			this.$set(file, 'loaded', true);
		},

		goToNext() {
			let media = this.media;
			let index = media.findIndex(x => x.id == (this.file || {}).id);
			if (index + 1 < media.length) this.$parent.selectedFile = media[index + 1];
		},

		goToPrev() {
			let media = this.media;
			let index = media.findIndex(x => x.id == (this.file || {}).id);
			if (index > 0) this.$parent.selectedFile = media[index - 1];
		},

		close() {
			this.open = false;
			setTimeout(() => {
				this.$parent.selectedFile = null;
			}, 150);
		}
	}
};
