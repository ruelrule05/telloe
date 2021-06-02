<template>
	<div class="relative">
		<button type="button" class="select" :id="`select-${_uid}`" :class="{ show: show }" :disabled="disabled" @click="show = !show" v-click-outside="onBlur">
			<span v-if="label" class="text-sm text-muted">{{ label }}:&nbsp;</span>
			<span class="mr-2 text-sm whitespace-nowrap truncate" :class="{ 'text-gray-400': !value }">{{ text_value }}</span>
			<div class="ml-auto line-height-0 text-gray-400">
				<chevron-down-icon v-if="!noCaret" class="ml-2 fill-current" width="8" height="8" transform="scale(3)"></chevron-down-icon>
			</div>
			<input :required="required" type="hidden" :data-parent="`#select-${_uid}`" :value="hiddenValue" />
		</button>

		<div v-show="menuOpen" class="select-menu" :class="[{ open: open }, dropPosition]">
			<div class="py-1 flex flex-col overflow-hidden" role="menu">
				<div v-if="searchable" class="px-2 pt-2 mb-2">
					<input v-if="searchable" type="text" spellcheck="false" v-model="search" class="search-input" ref="input-searchable" placeholder="Search..." />
				</div>
				<div class="overflow-auto h-full">
					<div class="text-center text-gray-400 text-sm mb-2" v-if="filtered_options.length == 0 && searchable">
						No results found
					</div>
					<div v-if="filtered_options.length > 0">
						<span v-for="(option, index) in filtered_options" :key="index" class="select-item overflow-hidden truncate" :class="{ active: option.value == selected_value }" @click.prevent="updateValue(option)">
							{{ option.text }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./vue-select.js"></script>
<style scoped lang="scss" src="./vue-select.scss"></style>
