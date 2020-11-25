<template>
	<div :class="container_class">
		<div class="dropdown" :class="drop" ref="dropdown" :disabled="disabled">
			<button type="button" class="btn dropdown-toggle text-left d-inline-flex align-items-center" :class="toggle_button_class" data-toggle="dropdown" ref="dropdown-toggle">
				<span v-if="label" class="text-secondary mr-2">{{ label }}</span>
				<template v-if="searchable">
					<input type="text" spellcheck="false" @focus="inputFocused" @blur="inputBlurred" v-model="search" class="p-0 form-control shadow-none border-0 outline-0 input-searchable w-100 bg-transparent line-height-1 font-smoothing-auto" :placeholder="select_placeholder" ref="input-searchable" :data-required="required" />
				</template>
				<template v-else>
					<input type="text" class="select_hidden_value d-none" @focus="inputFocused" v-model="selected_value" :data-required="required" data-parent=".dropdown-toggle" />
					<div class="text-ellipsis" :class="{ 'text-muted': !selected_value || selected_value.length == 0 }">{{ select_placeholder }}</div>
				</template>
				<div v-if="caret" class="ml-auto line-height-0">
					<chevron-down-icon class="ml-2 dropdown-caret" width="8" height="8" transform="scale(3)"></chevron-down-icon>
				</div>
			</button>

			<div class="bg-white dropdown-menu" :class="[dropdown_class]" ref="dropdown-menu" :hidden="filtered_options.length == 0 && suggestion">
				<div class="scrollable-menu" ref="scrollable-menu">
					<span class="dropdown-item disabled pl-3 font-weight-light" v-if="filtered_options.length == 0">
						<span v-if="show_no_results" class="text-muted">No results found</span>
					</span>
					<span v-else class="dropdown-item cursor-pointer" :id="'item-' + option.value" :class="{ active: !multiple && option.value == selected_value }" @click.prevent="updateValue(option)" v-for="(option, index) in filtered_options" :key="index">
						<vue-checkbox v-if="multiple" :value="(selected_value || []).find(x => x == option.value || x.id == option.value.id)" :label="option.text"></vue-checkbox>
						<span v-else>{{ option.text }}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./vue-select.js"></script>
<style scoped lang="scss" src="./vue-select.scss"></style>
