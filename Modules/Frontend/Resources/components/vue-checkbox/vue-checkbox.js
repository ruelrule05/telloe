import CheckmarkIcon from '../../icons/checkmark';
export default {
	components: {
		CheckmarkIcon
	},

	data: () => ({
		state: false
	}),

	watch: {
		value: function(value) {
			this.state = value ? 1 : 0;
		},

		state: function(value) {
			this.$emit('input', value);
		}
	},

	created() {
		this.state = this.value;
	},

	props: {
		value: {},

		disabled: {
			type: Boolean,
			default: false
		},

		label: {
			type: String
		}
	}
};
