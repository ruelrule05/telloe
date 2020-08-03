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
			this.state = value;
		},

		state: function(value) {
			this.$emit('input', value)
		}
	},

	created() {
		this.state = this.value;
	},

	props: {
		value: {
		},
		label: {
			type: String
		}
	},
}