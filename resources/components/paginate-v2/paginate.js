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
			previousPageInput: 1
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
			if (this.pageInput.length == 0 || this.pageInput <= 0 || this.pageInput > this.last_page) this.pageInput = this.previousPageInput

			if (state == 'next') {
				if( this.pageInput !== this.last_page ) {
					this.pageInput = (parseInt(this.pageInput)+1);
					this.change(this.pageInput);
				}
			}
			if (state == 'previous') {
				if( this.pageInput !== 1 ) {
					this.pageInput = (parseInt(this.pageInput)-1);
					this.change(this.pageInput);
				}
			}

			this.previousPageInput = this.pageInput;
		},

		change(page) {
			if( page <= this.last_page && page >= 1 ) this.$emit('change', page);
		}
	}
};
