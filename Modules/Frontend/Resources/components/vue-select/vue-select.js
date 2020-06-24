import ChevronDownIcon from '../../icons/chevron-down';
export default {
    components: {ChevronDownIcon},
    props: {
        drop: {
            type: String,
            default: 'dropdown'
        },

        display: {
            type: String,
            default: 'static'
        },

        placeholder: {
            type: String,
            default: '',
        },

        options: {
            type: Array,
            default: [],
        },

        value: {
            type: [Number, String, Array, Object],
            default: () => [],
        },

        multiple: {
            type: Boolean,
            default: false,
        },

        searchable: {
            type: Boolean,
            default: false,
        },

        required: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        button_class: {
            type: String,
            default: '',
        },

        dropdown_class: {
            type: String,
            default: '',
        },
    },

    data: () => ({
        selected_value: {},
        search: '',
        show_no_results: true,
        show: false
    }),

    watch: {
        value: function(value) {
            this.selected_value = value;
            this.search = this.selected_value.text;
        },
    },

    created() {
        this.selected_value = this.value;
    },

    mounted() {
        $(this.$refs['dropdown']).on('show.bs.dropdown', () => {
            this.show_no_results = true;
            this.search = '';

            if (this.searchable) {
                setTimeout(() => {
                    this.$refs['input-searchable'].focus();
                });
            }

            if (!this.multiple && this.selected_value.value) {
                setTimeout(() => {
                    const pos = document.getElementById('item-' + this.selected_value.value).offsetTop;
                    this.$refs['scrollable-menu'].scrollTop = pos - 36;
                });
            } else if (this.multiple) {
                this.$refs['scrollable-menu'].scrollTop = 0;
            }
        });

        $(this.$refs['dropdown']).on('hidden.bs.dropdown', () => {
            this.show_no_results = false;
            if (this.searchable && this.selected_value.text) {
                this.search = this.selected_value.text || this.placeholder;
            }
        });
    },

    computed: {
        select_placeholder() {
            let placeholder = this.placeholder;
            if (!this.multiple || this.selected_value) {
                placeholder = this.selected_value.text || this.placeholder;
            }

            return placeholder;
        },

        filtered_options() {
            return this.options.filter((option) => {
                let show = true;

                if (this.searchable && typeof this.search != 'undefined' && this.search.trim().length > 0) {
                    const pos = option.text.toLowerCase().indexOf(this.search.trim().toLowerCase());
                    if (pos != 0) {
                        show = false;
                    }
                }
                if (this.multiple && this.selected_value.findIndex((x) => x.value == option.value) > -1) {
                    show = false;
                }

                return show;
            });
        },

        toggle_button_class() {
            let classes = this.searchable ? 'cursor-text ' : 'cursor-pointer ';
            classes += this.button_class;
            return classes;
        },
    },

    methods: {
        inputFocused(e) {
            if (!$(this.$refs['dropdown-menu']).hasClass('show') && e.relatedTarget && e.relatedTarget.type == 'submit') {
                $(this.$refs['dropdown-toggle']).dropdown('show');
            }
        },

        updateValue(option) {
            if (this.multiple) {
                this.selected_value.push(option);
                this.search = this.placeholder;
            } else {
                this.selected_value = option;
                this.search = option.text;
            }
            this.$emit('change', this.selected_value);
            this.$emit('input', this.selected_value);
        },
    },
};