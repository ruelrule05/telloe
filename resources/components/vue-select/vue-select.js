import ChevronDownIcon from '../../icons/chevron-down';
import ClickOutside from 'vue-click-outside';
export default {
	components: {
		ChevronDownIcon
	},
	directives: {
		ClickOutside
	},
	props: {
		placeholder: {
			type: String,
			default: ''
		},

		label: {
			type: String,
			default: null
		},

		options: {
			type: Array,
			default: []
		},

		value: {},

		searchable: {
			type: Boolean,
			default: false
		},

		required: {
			type: Boolean,
			default: false
		},

		disabled: {
			type: Boolean,
			default: false
		},

		noSetValue: {
			type: Boolean,
			default: false
		},

		noCaret: {
			type: Boolean,
			default: false
		},

		dropPosition: {
			type: String,
			default: 'down'
		}
	},

	data: () => ({
		selected_value: null,
		search: '',
		show: false,
		open: false,
		menuOpen: false,
		hiddenValue: ''
	}),

	computed: {
		text_value() {
			let value = this.options.find(x => x.value == this.selected_value);
			return (value || {}).text || this.value || this.placeholder;
		},

		filtered_options() {
			return this.options.filter(option => {
				let show = true;

				if (!this.multiple && this.searchable && typeof this.search != 'undefined' && this.search.trim().length > 0) {
					const pos = option.text.toLowerCase().indexOf(this.search.trim().toLowerCase());
					if (pos < 0) show = false;
				}

				return show;
			});
		},

		toggle_button_class() {
			let classes = this.searchable ? 'cursor-text ' : 'cursor-pointer ';
			classes += this.button_class;
			return classes;
		}
	},

	watch: {
		value: function(value) {
			this.selected_value = value;
			this.hiddenValue = this.value;
			if (!value) this.search = '';
		},

		show: function(value) {
			setTimeout(() => {
				this.open = value;
			});
			if (value) {
				this.search = '';
				this.menuOpen = value;
			} else {
				setTimeout(() => {
					this.menuOpen = value;
				}, 150);
			}
		}
	},

	created() {
		this.selected_value = this.value;
		this.hiddenValue = this.value;
		//this.search = this.select_placeholder;
	},

	mounted() {
		this.popupItem = this.$el;
	},

	methods: {
		onBlur() {
			this.show = false;
		},

		updateValue(option) {
			this.show = false;
			if (!this.noSetValue) {
				this.selected_value = option.value;
			}
			this.hiddenValue = option.value;
			this.$emit('input', option.value);
		}
	}
};
