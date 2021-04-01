import CogIcon from '../../icons/cog.vue';
import ClickOutside from 'vue-click-outside';
export default {
	props: {
		options: {
			type: Array,
			required: true
		},

		dropPosition: {
			type: String,
			default: 'down'
		}
	},
	components: { CogIcon },

	directives: {
		ClickOutside
	},

	data: () => ({
		open: false
	}),

	methods: {
		onBlur() {
			this.open = false;
		},

		emitClick(option) {
			this.$emit('click', option);
			this.open = false;
		}
	}
};
