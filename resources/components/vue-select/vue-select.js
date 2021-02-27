import VueCheckbox from '../../components/vue-checkbox/vue-checkbox.vue';
import ChevronDownIcon from '../../icons/chevron-down';
export default {
	components: {
		VueCheckbox,
		ChevronDownIcon
	},
	props: {
		drop: {
			type: String,
			default: 'dropdown'
		},

		placeholder: {
			type: String,
			default: ''
		},

		options: {
			type: Array,
			default: []
		},

		value: {
			type: [Number, String, Array, Object]
		},

		multiple: {
			type: Boolean,
			default: false
		},

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

		button_class: {
			type: String,
			default: ''
		},

		dropdown_class: {
			type: String,
			default: ''
		},

		label: {
			type: String,
			default: ''
		},

		caret: {
			type: Boolean,
			default: true
		},

		container_class: {
			type: String,
			default: ''
		},

		suggestion: {
			type: Boolean,
			default: false
		}
	},

	data: () => ({
		selected_value: {},
		search: '',
		show_no_results: true,
		show: false,
		focused: false
	}),

	computed: {
		select_placeholder() {
			let placeholder = this.placeholder;
			if (this.selected_value) {
				if (this.multiple) {
					let multiple_texts = [];
					this.selected_value.forEach(selected => {
						let value = this.options.find(x => x.value == selected || (x.value.id && selected.id && x.value.id == selected.id));
						if (value) multiple_texts.push(value.text);
					});
					if (multiple_texts.length > 0) placeholder = multiple_texts.join(', ');
				} else {
					placeholder = (this.options.find(x => x.value == this.selected_value) || {}).text || this.placeholder;
				}
			}

			return placeholder;
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
			if (!value) this.search = '';
		},

		search: function(value) {
			if (this.suggestion) {
				this.selected_value = value;
				this.$emit('input', this.selected_value);
			}
			this.$nextTick(() => {
				$(this.$refs['dropdown-toggle']).dropdown('update');
			});
		}
	},

	created() {
		this.selected_value = this.value;
		this.search = this.select_placeholder;
	},

	mounted() {
		$(this.$refs['dropdown']).on('show.bs.dropdown', () => {
			if (this.$refs['input-searchable']) this.$refs['input-searchable'].removeAttribute('readonly');
			this.show_no_results = true;
			if (!this.suggestion) this.search = '';

			if (this.searchable) {
				setTimeout(() => {
					this.$refs['input-searchable'].focus();
				});
			}

			/* if (!this.multiple && this.selected_value) {
                setTimeout(() => {
                    const pos = document.getElementById('item-' + this.selected_value).offsetTop;
                    this.$refs['scrollable-menu'].scrollTop = pos - 36;
                });
            } else if (this.multiple) {
                this.$refs['scrollable-menu'].scrollTop = 0;
            }*/
		});

		$(this.$refs['dropdown']).on('hide.bs.dropdown', () => {
			if (this.suggestion) {
				this.search = this.selected_value;
			} else {
				this.search = this.selected_value ? this.select_placeholder : '';
			}
			if (this.$refs['input-searchable'] && !this.suggestion) this.$refs['input-searchable'].setAttribute('readonly', true);
		});

		$(this.$refs['dropdown']).on('hidden.bs.dropdown', () => {
			this.show_no_results = false;
		});
	},
	methods: {
		inputBlurred() {
			if (this.suggestion) {
				setTimeout(() => {
					this.focused = false;
				}, 100);
			}
		},

		inputFocused(e) {
			if (e.relatedTarget && e.relatedTarget.type == 'submit') {
				this.$refs['dropdown-toggle'].click();
			}
			if (this.suggestion) {
				setTimeout(() => {
					this.focused = true;
				}, 100);
			}
		},

		updateValue(option) {
			if (this.multiple) {
				this.selected_value = this.selected_value || [];
				let valueIndex = this.selected_value.findIndex(x => x == option.value || (x.id && option.value.id && x.id == option.value.id));
				if (valueIndex == -1) this.selected_value.push(option.value);
				else this.selected_value.splice(valueIndex, 1);
				this.search = this.placeholder;
			} else {
				this.selected_value = option.value;
				if (!this.suggestion) this.search = option.text;
			}
			this.$emit('change', this.selected_value);
			this.$emit('input', this.selected_value);
		}
	}
};
