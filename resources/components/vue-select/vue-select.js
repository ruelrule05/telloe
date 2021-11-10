import ChevronDownIcon from '../../icons/chevron-down';
import CloseIcon from '../../icons/close';
import ClickOutside from 'vue-click-outside';
import VueCheckbox from '../vue-checkbox/vue-checkbox.vue';
import CheckmarkIcon from '../../icons/checkmark';

export default {
	components: {
		ChevronDownIcon,
		CloseIcon,
		VueCheckbox,
		CheckmarkIcon
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
		},
		noValuePlaceholder: {
			type: String,
			default: 'No options found'
		},
		clearable: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
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
			if (this.multiple && this.selected_value) {
				if (this.selected_value.length > 1) {
					return this.selected_value.length + ' selected';
				} else if (this.selected_value.length == 0) {
					return this.placeholder;
				}
			}
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
		value: function (value) {
			this.selected_value = value;
			this.hiddenValue = this.value;
			if (!value) this.search = '';
		},

		show: function (value) {
			setTimeout(() => {
				this.open = value;
			});
			if (value) {
				this.search = '';
				this.menuOpen = value;
				if (this.searchable) {
					this.$nextTick(() => {
						this.$refs['input-searchable'].focus();
					});
				} else {
					let activeItem = this.$refs.selectMenu.querySelector('.select-item.active');
					if (activeItem) {
						this.$nextTick(() => {
							this.$refs.selectMenu.scrollTop = activeItem.offsetTop - 76;
						});
					}
				}
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
		optionActive(option) {
			return option.value == this.selected_value || (this.selected_value && typeof this.selected_value == 'object' && this.selected_value.find(x => x == option.value));
		},

		clear() {
			this.selected_value = null;
			this.$emit('input', null);
			this.show = false;
		},
		onBlur() {
			this.show = false;
		},

		updateValue(option) {
			if (!this.multiple) {
				this.show = false;
			}
			if (!this.noSetValue) {
				if (this.multiple) {
					if (!this.selected_value) {
						this.selected_value = [];
					}
					let index = this.selected_value.findIndex(x => x == option.value);
					if (index > -1) {
						this.selected_value.splice(index, 1);
					} else {
						this.selected_value.push(option.value);
					}
				} else {
					this.selected_value = option.value;
				}
			}
			this.hiddenValue = option.value;
			if (this.multiple) {
				this.$emit('input', this.selected_value);
			} else {
				this.$emit('input', option.value);
			}
		}
	}
};
