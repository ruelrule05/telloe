<template>
	<div class="checkbox" :class="{ disabled: disabled }">
		<label class="flex items-center mb-0">
			<div>
				<input type="checkbox" v-model="state" @change="emitInput" :disabled="disabled" />
				<span class="cr"><checkmark-icon></checkmark-icon></span>
			</div>
			<span v-if="label" :class="[state ? 'text-primary font-bold' : 'text-body']" class="ml-2">{{ label }}</span>
		</label>
	</div>
</template>

<script src="./vue-checkbox.js"></script>
<style scoped lang="scss" src="./vue-checkbox.scss"></style>
