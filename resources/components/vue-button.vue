<template>
	<button :type="type" class="btn relative" :class="button_class" :disabled="loading || disabled" @click="$emit('click')">
		<div v-if="loading" class="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 left-1/2 top-1/2 leading-none">
			<div class="spinner spinner-sm" :class="{ 'spinner-light': theme == 'light' }"></div>
		</div>
		<div :class="{ 'opacity-0': loading }">
			<template v-if="icon"><i :class="icon"></i>&nbsp;&nbsp;</template><slot></slot>
		</div>
	</button>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: ''
		},

		type: {
			type: String,
			default: 'button'
		},

		icon: {
			type: String,
			default: ''
		},

		button_class: {
			type: String,
			default: 'btn-block btn-primary'
		},

		loading: {
			type: Boolean,
			default: false
		},

		disabled: {
			type: Boolean,
			default: false
		},
		theme: {
			type: String,
			default: 'light'
		}
	},

	data: () => ({}),

	mounted() {},

	methods: {}
};
</script>
