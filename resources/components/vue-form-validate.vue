<template>
	<form ref="form" @submit.prevent="submit($event)"><slot></slot></form>
</template>

<script>
export default {
	data: () => ({
		valid: true
	}),

	mounted() {
		this.$emit('mounted');
	},

	methods: {
		submit(e) {
			this.valid = true;
			let inputs = this.$refs.form.querySelectorAll('input, textarea, select');
			for (const input of inputs) {
				if (((input.type != 'password' && input.value.trim().length == 0) || (input.type == 'password' && input.value.length == 0)) && (input.getAttribute('required') || input.hasAttribute('data-required'))) {
					input.value = '';
					this.valid = false;
					let parent = input.getAttribute('data-parent');
					if (parent) {
						document.querySelector(parent).focus();
						document.querySelector(parent).click();
					} else {
						input.focus();
					}

					input.setAttribute('data-has-error', true);
					break;
				}
				input.removeAttribute('data-has-error', true);

				if (input.type == 'text') input.value = input.value.trim();
			}
			if (this.valid) {
				this.$emit('submit', e);
			}
		},

		getOffset(el) {
			const rect = el.getBoundingClientRect();
			return {
				left: rect.left + window.scrollX,
				top: rect.top + window.scrollY
			};
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep [data-has-error] {
	@apply ring-red-600;
}
</style>
