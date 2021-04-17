import CloseIcon from '../../icons/close';
import VueFormValidate from '../../components/vue-form-validate.vue';
export default {
	components: {
		CloseIcon,
		VueFormValidate
	},

	props: {
		size: {
			type: String,
			default: ''
		},
		noBackdropHide: {
			type: Boolean,
			default: false
		}
	},

	// 	form: {
	// 		type: Boolean,
	// 		default: false
	// 	},

	// 	title: {
	// 		type: String
	// 	},

	// 	loading: {
	// 		type: Boolean,
	// 		default: false
	// 	},

	// 	size: {
	// 		type: String,
	// 		default: ''
	// 	},

	// 	scrollable: {
	// 		type: Boolean,
	// 		default: true
	// 	}
	// },

	data: () => ({
		open: false,
		masks: {
			input: 'MMM D, YYYY'
		}
	}),

	computed: {
		contentComponent() {
			return this.form ? 'vue-form-validate' : 'div';
		},

		hasFooterSlot() {
			return !!this.$slots['footer'];
		}
	},

	mounted() {
		// $(this.$refs['modal']).on('show.bs.modal', () => {
		// 	this.$emit('show');
		// });
		// $(this.$refs['modal']).on('shown.bs.modal', () => {
		// 	this.$emit('shown');
		// });
		// $(this.$refs['modal']).on('hide.bs.modal', () => {
		// 	this.$emit('hide');
		// });
		// $(this.$refs['modal']).on('hidden.bs.modal', () => {
		// 	this.$emit('hidden');
		// });
	},

	methods: {
		submit() {
			this.$emit('submit');
		},

		async show() {
			this.open = true;
		},

		async hide(force = false) {
			if (!this.noBackdropHide || force) this.open = false;
		}
	}
};
