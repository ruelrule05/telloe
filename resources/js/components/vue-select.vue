<template>
    <div class="vue-select">
        <div class="dropdown-container overflow-visible" :class="drop" ref="dropdown" :disabled="disabled">
            <button class="btn font-family-base font-smoothing-auto text-black dropdown-toggle border btn-block text-left shadow-none d-inline-flex" :class="toggle_button_class" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :data-display="display" @click.prevent ref="dropdown-toggle">
                <template v-if="searchable">
                    <input type="text" @focus="inputFocused" spellcheck="false" v-model="search" class="outline-0 input-searchable w-100 bg-transparent line-height-1 font-smoothing-auto" :placeholder="select_placeholder" ref="input-searchable" :required="required" />
                </template>
                <template v-else>
                    <div class="select-placeholder text-ellipsis">
                        <span v-if="selected_value.value" class="font-weight-normal">{{ selected_value.text }}</span>
                        <span v-else>{{ select_placeholder }}</span>
                    </div>
                </template>
                &nbsp;
            </button>
            <div class="bg-white dropdown-menu fade border-0 rounded" ref="dropdown-menu">
                <div class="scrollable-menu" ref="scrollable-menu">
                <span class="dropdown-item disabled pl-3 font-weight-light" v-if="filtered_options.length == 0">
                    <span v-if="show_no_results" class="text-gray">No results found</span>
                </span>
                <a href="#" v-else class="dropdown-item cursor-pointer" :id="'item-' + option.value" :class="{active: selected_value.text && option.value == selected_value.value}" @click.prevent="updateValue(option)" v-for="option in filtered_options">
                    <div class="text-ellipsis">
                        <span>{{ option.text }}</span>
                    </div>
                </a>
                </div>
            </div>
        </div>
        <div class="multiple-values">
            <transition-group name="fade" tag="div" v-if="selected_value.length > 0" class="mt-1">
                <span class="btn btn-xs btn-light bg-light text-dark badge-pill border py-1 pl-3 pr-1 mt-1 mr-1 d-inline-flex align-items-center" v-for="(selected, index) in selected_value" :key="selected.value" @click.stop>
                    {{ selected.text }}
                    <i class="eva eva-close-outline cursor-pointer font-size-15 line-height-0" @click="selected_value.splice(index, 1)"></i>
                </span>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
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
    },

    data: () => ({
        selected_value: {},
        search: '',
        show_no_results: true,
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
</script>