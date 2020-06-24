<template>
    <div class="vue-select">
        <div class="dropdown-container overflow-visible" :class="drop" ref="dropdown" :disabled="disabled">
            <button class="btn dropdown-toggle form-control rounded btn-block text-left d-inline-flex align-items-center" :class="toggle_button_class" :data-display="display" @click="show = !show">
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
                <chevron-down-icon class="ml-auto dropdown-caret" width="8" height="8" transform="scale(3)"></chevron-down-icon>
            </button>

            <div class="bg-white dropdown-menu w-100" :class="[dropdown_class, {'show': show}]" ref="dropdown-menu">
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

<script src="./vue-select.js"></script>
<style scoped lang="scss" src="./vue-select.scss"></style>