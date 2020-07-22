<template>
    <div class="snapturebox-vue-select">
        <div class="snapturebox-dropdown-container snapturebox-overflow-visible" :class="drop" ref="dropdown" :disabled="disabled">
            <button @click="showMenu()" class="snapturebox-btn snapturebox-btn-sm snapturebox-font-family-base snapturebox-font-smoothing-auto snapturebox-text-black snapturebox-dropdown-toggle snapturebox-btn-block snapturebox-text-left snapturebox-d-inline-flex" :class="toggle_button_class" @click.prevent ref="dropdown-toggle">
                <template v-if="searchable">
                    <input type="text" @focus="showMenu()" spellcheck="false" v-model="search" class="snapturebox-outline-0 snapturebox-input-searchable snapturebox-w-100 snapturebox-bg-transparent snapturebox-line-height-1 snapturebox-font-smoothing-auto snapturebox-form-control" :placeholder="select_placeholder" ref="input-searchable" :required="required" />
                </template>
                <template v-else>
                    <div class="snapturebox-select-placeholder snapturebox-text-ellipsis snapturebox-pointer-events-none">
                        <span v-if="selected_value.value" class="font-weight-normal">{{ selected_value.text }}</span>
                        <span v-else>{{ select_placeholder }}</span>
                    </div>
                </template>
                <chevron-down height="28" width="28"></chevron-down>
            </button>

            <div class="snapturebox-bg-white snapturebox-dropdown-menu snapturebox-rounded-lg snapturebox-fade snapturebox-border-0" ref="dropdown-menu">
                <div class="snapturebox-scrollable-menu" ref="scrollable-menu">
                <span class="snapturebox-dropdown-item snapturebox-disabled snapturebox-pl-3 snapturebox-font-weight-light" v-if="filtered_options.length == 0">
                    <span v-if="show_no_results" class="snapturebox-text-gray">No results found</span>
                </span>
                <a href="#" v-else class="snapturebox-dropdown-item snapturebox-cursor-pointer" :id="'item-' + option.value" :class="{active: selected_value.text && option.value == selected_value.value}" @click.prevent="updateValue(option);hideMenu();" v-for="option in filtered_options">
                    <div class="snapturebox-text-ellipsis">
                        <span>{{ option.text }}</span>
                    </div>
                </a>
                </div>
            </div>
        </div>

        <div class="snapturebox-multiple-values">
            <transition-group name="fade" tag="div" v-if="selected_value.length > 0" class="snapturebox-mt-1">
                <span class="snapturebox-badge snapturebox-line-height-0 snapturebox-badge-pill snapturebox-d-inline-flex snapturebox-align-items-center snapturebox-ml-1" v-for="(selected, index) in selected_value" :key="selected.value" @click.stop>
                    {{ selected.text }}
                    <close fill="white" width="18" height="20" @click.native="selected_value.splice(index, 1)" class="snapturebox-cursor-pointer"></close>
                </span>
            </transition-group>
        </div>
    </div>
</template>

<script>
import ChevronDown from '../../icons/chevron-down.vue';
import Close from '../../icons/close.vue';
export default {
    components: {ChevronDown, Close},
    props: {
        drop: {
            type: String,
            default: 'snapturebox-dropdown'
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
        document.onclick = (e) => {
            let element = e.target;
            let dropdown = null;
            if (element.classList.contains('snapturebox-dropdown-toggle') || element.classList.contains('snapturebox-input-searchable')) {
                dropdown = $(element).parentsUntil('.snapturebox-vue-select').find('.snapturebox-dropdown-menu')[0];
            }

            let visibleDropdowns = this.$el.querySelectorAll('.snapturebox-show');
            if (visibleDropdowns.length > 0) {
                visibleDropdowns.forEach((vd) => {
                    if (vd != dropdown || !dropdown) vd.classList.remove('snapturebox-show');
                });
            }
        };
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
        hideMenu() {
            $(this.$refs['dropdown-menu']).removeClass('snapturebox-show');
        },

        showMenu(e) {
            $(this.$refs['dropdown-menu']).addClass('snapturebox-show');
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