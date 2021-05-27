import { mapActions } from 'vuex';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import copy from 'copy-text-to-clipboard';
import CogIcon from '../../../icons/cog';
import PhoneIcon from '../../../icons/call-menu.vue';
import SkypeIcon from '../../../icons/skype.vue';
import MapMarkerIcon from '../../../icons/map-marker';
import GoogleMeetIcon from '../../../icons/google-meet';
import ZoomIcon from '../../../icons/zoom';
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

	components: { ZoomIcon, ToggleSwitch, VueDropdown, CogIcon, PhoneIcon, SkypeIcon, MapMarkerIcon, GoogleMeetIcon },

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
