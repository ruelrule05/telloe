<template>
	<div class="checkbox" :class="{ disabled: disabled }">
		<label class="d-flex align-items-center mb-0">
			<div>
				<input type="checkbox" v-model="state" :disabled="disabled" />
				<span class="cr"><checkmark-icon fill="white"></checkmark-icon></span>
			</div>
			<span class="font-size-base text-ellipsis" :class="[state ? 'text-primary font-weight-bold' : 'text-body']">{{ label }}</span>
		</label>
	</div>
</template>

<script src="./vue-checkbox.js"></script>
<style scoped lang="scss" src="./vue-checkbox.scss"></style>
