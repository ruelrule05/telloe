import CloseIcon from '../../icons/close';
import ChevronLeftIcon from '../../icons/chevron-left';
import ChevronRightIcon from '../../icons/chevron-right';
export default {
	components: {
		CloseIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
	},

	props: {
		conversation: {
			type: Object,
			required: true,
		},

		file: {
			type: Object,
		},
	},

	data: () => ({
		open: false,
	}),

	watch: {
		file: function(value) {
			this.open = value ? true : false;
		},
	},

	computed: {
		media () {
			if(!this.conversation.messages) return [];
			return this.conversation.messages.filter(message => {
				return ['image', 'video'].find(x => x == message.type);
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
		},
	},

	mounted() {},

	methods: {
		goToNext() {
			let media = this.media;
			let index = media.findIndex(x => x.id == (this.file || {}).id);
			if(index + 1 < media.length) this.$parent.selectedFile = media[index + 1];
		},

		goToPrev() {
			let media = this.media;
			let index = media.findIndex(x => x.id == (this.file || {}).id);
			if(index > 0) this.$parent.selectedFile = media[index - 1];
		},

		close() {
			this.open = false;
			setTimeout(() => {
				this.$parent.selectedFile = null;
			}, 150);
		}
	},
};
