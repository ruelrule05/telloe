import ChevronRightIcon from '../../icons/chevron-right';
import ChevronLeftIcon from '../../icons/chevron-left';
export default {
	components: {
		ChevronRightIcon,
		ChevronLeftIcon
	},

	props: {
		data: {
			type: Object,
			require: true
		}
	},

	computed: {
		pages() {
			let pages = [];
			let i = 1;
			let pageTotal = Math.ceil(this.data.total / this.data.per_page);
			while (i <= pageTotal) {
				pages.push(i);
				i++;
			}
			return pages;
		}
	},

	methods: {
		goToPage(url) {
			if (url) {
				url = new URL(url);
				const urlParams = new URLSearchParams(url.search);
				const page = urlParams.get('page');
				this.change(page);
			}
		},

		change(page) {
			this.$emit('change', page);
		}
	}
};
