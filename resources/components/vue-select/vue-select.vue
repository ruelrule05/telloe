<template>
	<div :class="container_class" class="relative">
		<div class="relative">
			<button type="button" class="overflow-hidden dropdown" :class="{ show: show }" :disabled="disabled" @click="show = !show">
				<span v-if="label" class="text-secondary mr-2">{{ label }}</span>
				<input v-if="searchable" type="text" spellcheck="false" v-model="search" class="p-0 ring-opacity-0 outline-0 flex-1 border-0 rounded-none" :placeholder="select_placeholder" ref="input-searchable" :data-required="required" />
				<template v-else>
					<input type="text" class="hidden" @focus="inputFocused" v-model="selected_value" :data-required="required" data-parent=".dropdown-toggle" />
					<div class="text-ellipsis" :class="{ 'text-muted': !selected_value || selected_value.length == 0 }">{{ select_placeholder }}</div>
				</template>
				<div v-if="caret" class="ml-auto line-height-0">
					<chevron-down-icon class="ml-2" width="8" height="8" transform="scale(3)"></chevron-down-icon>
				</div>
			</button>

			<div v-show="show" class="dropdown-menu overflow-auto">
				<div class="py-1" role="menu">
					<div class="text-center text-gray-400 py-3" v-if="filtered_options.length == 0">
						<span v-if="show_no_results">No results found</span>
					</div>
					<span v-else class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" :id="'item-' + option.value" :class="{ active: !multiple && option.value == selected_value }" @click.prevent="updateValue(option)" v-for="(option, index) in filtered_options" :key="index">
						<vue-checkbox v-if="multiple" :value="(selected_value || []).find(x => x == option.value || (x.id && option.value.id && x.id == option.value.id))" :label="option.text"></vue-checkbox>
						<span v-else>{{ option.text }}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./vue-select.js"></script>
<style scoped lang="scss" src="./vue-select.scss"></style>
