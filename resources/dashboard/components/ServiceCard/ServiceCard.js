import { mapActions } from 'vuex';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import copy from 'copy-text-to-clipboard';
export default {
	props: {
		service: {
			type: Object,
			required: true
		}
	},

	data: () => ({
		actions: ['Edit', 'Duplicate', 'Delete']
	}),

	components: { ToggleSwitch, VueDropdown },

	methods: {
		...mapActions({
			updateService: 'services/update'
		}),

		updateServiceStatus(state, service) {
			this.updateService(service);
		},

		serviceAction(action) {
			this.$emit('click', action);
		},

		copyLink(e) {
			this.$toast.clear();
			if (copy(`${process.env.MIX_APP_URL}/@${this.service.coach.username}/${this.service.id}`)) {
				this.$toast.open('Link copied to clipboard');
			}
			e.currentTarget.blur();
		}
	}
};
