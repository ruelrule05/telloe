<template>
	<div>
		<div id="form-editor"></div>
		<div id="form-render"></div>
	</div>
</template>
<script>
window.$ = window.jQuery = require('jquery');
require('jquery-ui-sortable');
require('formBuilder');
require('formBuilder/dist/form-render.min.js');

export default {
	name: 'v-form-builder',
	props: ['value'],
	data: () => ({
		buider: null
	}),
	mounted: function () {
		let fbOptions = {
			scrollToFieldOnAdd: false,
			disabledActionButtons: ['data', 'clear', 'save'],
			disableFields: ['button', 'hidden', 'autocomplete']
		};
		this.fbuilder = $('#form-editor').formBuilder(fbOptions);
		setTimeout(() => {
			if (this.value) {
				this.fbuilder.actions.setData(this.value);
			}
		}, 500);

		document.addEventListener('formSaved', () => {
			this.update();
		});
		document.addEventListener('fieldEditClosed', () => {
			this.update();
		});
	},
	methods: {
		update() {
			if (this.fbuilder) {
				let formData = this.fbuilder.formData;
				if (formData) {
					this.$emit('input', this.fbuilder.formData);
				}
			}
		}
	}
};
</script>
<style lang="scss">
#form-editor {
	@apply relative;
	.field-label {
		@apply inline;
		font-size: 13px;
		margin-bottom: 0.25rem;
	}
	.form-builder {
		@apply flex;
	}
	.stage-wrap {
		@apply p-4 border-2 border-black border-dashed;
	}
	.frmb-placeholder,
	.ui-state-highlight {
		@apply opacity-0;
	}
	input:not([type='checkbox']):not([type='radio']):not([type='file']),
	textarea {
		@apply border border-gray-300 text-sm block rounded-md font-medium w-full outline-none px-3 py-2 transition-all ring-primary ring-offset-1 focus:border-gray-500 focus:ring-2 shadow-inner #{!important};
	}
	textarea {
		@apply resize-none;
	}
	input[type='checkbox'],
	input[type='radio'] {
		@apply w-auto ring-opacity-0 #{!important};
	}
	input[type='file'] {
		@apply w-auto h-auto p-0 border-0 shadow-none ring-opacity-0;
	}
	.form-field {
		@apply transition-colors rounded-none border border-opacity-0 border-dashed border-primary transition-all;
		&.editing,
		&:hover {
			@apply bg-primary-ultralight shadow-none border-opacity-100;
		}

		&.header-field:not(.editing),
		&.paragraph-field:not(.editing) {
			.field-label {
				@apply hidden;
			}
		}
	}
	.cb-wrap {
		border-left: solid 1px theme('colors.gray.200');
	}
	.input-control {
		@apply rounded-none shadow-none m-1 #{!important};
		@apply bg-primary-ultralight border border-opacity-0 border-dashed border-primary transition-all;
		&:hover {
			@apply border-opacity-100 text-primary #{!important};
		}
	}
	.access-wrap {
		@apply hidden;
	}
	.btn {
		@apply bg-primary relative;
		width: 28px;
		height: 28px;
		&:before {
			@apply text-white;
			font-size: 12px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		&.remove {
			@apply static rounded-full p-2 bg-red-600;
			height: 28px;
			width: 28px;
			&:before {
				@apply text-white static top-auto left-auto transform-none;
			}
		}
	}
	.formbuilder-radio {
		@apply flex items-center mb-1;
		label {
			@apply mb-0;
		}
	}
	.input-wrap {
		@apply flex items-center mt-2;
		input {
			@apply mt-0;
		}
		label {
			@apply mb-0 ml-1;
		}
	}
	.formbuilder-checkbox {
		@apply flex items-center;
		label {
			@apply mb-0;
		}
	}
	.formbuilder-header {
		h1 {
			@apply text-3xl;
		}
		h2 {
			@apply text-2xl;
		}
		h3 {
			@apply text-xl;
		}
		h4 {
			@apply text-lg;
		}
	}
}
</style>
