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
		},

		disabled: {
			type: Boolean,
			default: false
		}
	},
	components: { CogIcon },

	directives: {
		ClickOutside
	},

	data: () => ({
		open: false
	}),

	mounted() {
		this.popupItem = this.$el;
	},

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
