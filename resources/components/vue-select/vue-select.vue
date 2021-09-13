<template>
	<div class="relative">
		<button type="button" class="select" :id="`select-${_uid}`" :class="{ show: show }" :disabled="disabled" @click="show = !show" v-click-outside="onBlur">
			<span v-if="label" class="text-sm text-muted">{{ label }}:&nbsp;</span>
			<span class="mr-2 text-sm whitespace-nowrap truncate" :class="{ 'text-gray-400': !value }">{{ text_value || '&nbsp;' }}</span>
			<div class="ml-auto line-height-0 text-gray-400">
				<div v-if="loading" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white">
					<div class="spinner spinner-xs -mb-px"></div>
				</div>
				<chevron-down-icon v-if="!noCaret && (!clearable || (clearable && !value))" class="fill-current" width="10" height="10"></chevron-down-icon>
				<button v-if="clearable && value" @click.stop="clear" type="button" class="bg-gray-100 rounded-full p-1 -mr-1 hover:bg-gray-200 transition-colors absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5"><close-icon class="fill-current absolute-center"></close-icon></button>
			</div>
			<input :required="required" type="hidden" :data-parent="`#select-${_uid}`" :value="hiddenValue" />
		</button>

		<div v-show="menuOpen" class="select-menu" :class="[{ open: open }, dropPosition]">
			<div class="py-1 flex flex-col overflow-hidden" role="menu">
				<div v-if="searchable" class="px-2 pt-2 mb-2">
					<input v-if="searchable" type="text" spellcheck="false" v-model="search" class="search-input" ref="input-searchable" placeholder="Search..." />
				</div>
				<div class="overflow-auto h-full" ref="selectMenu">
					<div v-if="filtered_options.length > 0">
						<span v-for="(option, index) in filtered_options" :key="index" class="select-item overflow-hidden truncate flex items-center" :class="{ active: optionActive(option), multiple: multiple }" @click.prevent="updateValue(option)">
							<div class="checkbox" v-if="multiple">
								<label class="mb-0">
									<span class="cr"><CheckmarkIcon /></span>
								</label>
							</div>
							{{ option.text }}
						</span>
					</div>
					<div v-else class="text-sm py-2 text-muted text-center">{{ noValuePlaceholder }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./vue-select.js"></script>
<style scoped lang="scss" src="./vue-select.scss"></style>
