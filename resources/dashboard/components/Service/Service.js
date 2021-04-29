import { mapActions } from 'vuex';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import Timerangepicker from '../../../components/timerangepicker/timerangepicker.vue';
import convertTime from '../../../js/plugins/convert-time';
import VueCheckbox from '../../../components/vue-checkbox/vue-checkbox.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import PlusIcon from '../../../icons/plus';
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import CloseIcon from '../../../icons/close';
export default {
	props: {
		service: {
			required: true
		},

		newService: {
			type: Boolean,
			default: false
		}
	},

	components: { VueFormValidate, ToggleSwitch, Timerangepicker, VueCheckbox, VueSelect, PlusIcon, VueDropdown, CloseIcon },

	data: () => ({
		menus: ['General Settings', 'Availability', 'Payment', 'Advanced'],
		activeMenu: 'General Settings',
		clonedService: null,
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		mounted: false,
		currencies: [
			{
				text: 'AUD',
				value: 'AUD'
			},
			{
				text: 'USD',
				value: 'USD'
			},
			{
				text: 'PHP',
				value: 'PHP'
			},
			{
				text: 'CHF',
				value: 'CHF'
			},
			{
				text: 'EUR',
				value: 'EUR'
			},
			{
				text: 'CAD',
				value: 'CAD'
			},
			{
				text: 'GBP',
				value: 'GBP'
			},
			{
				text: 'NZD',
				value: 'NZD'
			}
		],
		types: ['Google Meet', 'Zoom', 'Face-to-face', 'Phone', 'Skype']
	}),

	watch: {
		service: function() {
			this.clonedService = JSON.parse(JSON.stringify(this.service));
			this.activeMenu = 'General Settings';
			this.setMounted();
		}
	},

	created() {
		this.clonedService = JSON.parse(JSON.stringify(this.service));
		if (!this.$root.auth.zoom_token) {
			this.types.splice(this.types.indexOf('Zoom'), 1);
		}
		if (!this.$root.auth.google_calendar_token) {
			this.types.splice(this.types.indexOf('Google Meet'), 1);
		}
	},

	mounted() {
		this.setMounted();
	},

	methods: {
		...mapActions({
			updateService: 'services/update'
		}),

		selectType(type) {
			if (!this.clonedService.types) {
				this.$set(this.clonedService, 'types', []);
			}
			let exists = this.clonedService.types.find(x => x.type == type);
			if (!exists) {
				this.clonedService.types.push({
					type: type
				});
			}
		},

		setMounted() {
			if (this.clonedService) {
				setTimeout(() => {
					this.mounted = true;
				}, 1000);
			} else {
				this.mounted = false;
			}
		},

		update() {
			this.updateService(this.clonedService);
			this.$emit('close');
		},

		availableTimeChange(time, day) {
			let start = convertTime(time.start, 'hh:mm');
			let end = convertTime(time.end, 'hh:mm');
			this.clonedService.days[day].start = start;
			this.clonedService.days[day].end = end;
		},

		breaktimeChange(time, day) {
			let start = convertTime(time.start, 'hh:mm');
			let end = convertTime(time.end, 'hh:mm');
			this.clonedService.days[day].breaktimeStart = start;
			this.clonedService.days[day].breaktimeEnd = end;
		}
	}
};
