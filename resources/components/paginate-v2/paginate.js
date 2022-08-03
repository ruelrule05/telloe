import ChevronRightIcon from '../../icons/chevron-right';
import ChevronLeftIcon from '../../icons/chevron-left';
export default {
	components: {
		ChevronRightIcon,
		ChevronLeftIcon
	},

	props: {
		total_items: {
			type: Number,
			require: true
		},
		per_page: {
			type: Number,
			require: true
		}
	},

	data() {
		return {
			pageInput: 1,
		}
	},

	computed: {
		last_page() {
			let last_page = 0;
			last_page = Math.ceil(this.total_items / this.per_page)
			
			return last_page;
		}
	},

	methods: {
		goToPage(state) {
			if (state == 'next') {
				this.pageInput = (parseInt(this.pageInput)+1);
				this.change(this.pageInput);
			}
			if (state == 'previous') {
				this.pageInput = (parseInt(this.pageInput)-1);
				this.change(this.pageInput);
			}
		},

		change(page) {
			this.pageInput = page;
			if( page <= this.last_page && page >= 1 ) this.$emit('change', page);
		}
	}
};
