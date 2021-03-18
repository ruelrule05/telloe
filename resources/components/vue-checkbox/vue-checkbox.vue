<template>
	<div class="checkbox" :class="{ disabled: disabled }">
		<label class="flex items-center mb-0">
			<div>
				<input type="checkbox" v-model="state" :disabled="disabled" />
				<span class="cr"><checkmark-icon></checkmark-icon></span>
			</div>
			<span :class="[state ? 'text-primary font-bold' : 'text-body']">{{ label }}</span>
		</label>
	</div>
</template>

<script src="./vue-checkbox.js"></script>
<style scoped lang="scss" src="./vue-checkbox.scss"></style>
