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
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';
import dayjs from 'dayjs';
const ct = require('countries-and-timezones');
export default {
	props: {
		service: {
			required: true
		},

		createService: {
			type: Boolean,
			default: false
		}
	},

	components: { VDatePicker, VueFormValidate, ToggleSwitch, Timerangepicker, VueCheckbox, VueSelect, PlusIcon, VueDropdown, CloseIcon },

	data: () => ({
		dayjs: dayjs,
		allowed_countries: ['AU', 'CA', 'NZ', 'GB', 'US'],
		masks: {
			input: 'MMMM D, YYYY'
		},
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
		types: ['Google Meet', 'Zoom', 'Face-to-face', 'Phone', 'Skype', 'Telloe Video Call']
	}),

	computed: {
		availableTimezones() {
			let timezones = [];
			this.allowed_countries.forEach(code => {
				let countryTimezones = ct.getTimezonesForCountry(code);
				if (countryTimezones) {
					countryTimezones.forEach(timezone => {
						timezones.push({
							text: timezone.name,
							value: timezone.name
						});
					});
				}
			});
			return timezones.sort((a, b) => {
				return a.text > b.text ? 1 : -1;
			});
		}
	},

	watch: {
		service: function() {
			let clonedService = JSON.parse(JSON.stringify(this.service));
			if (clonedService) {
				if (clonedService.starts_at) {
					clonedService.starts_at = dayjs(clonedService.starts_at).toDate();
				}
				if (clonedService.ends_at) {
					clonedService.ends_at = dayjs(clonedService.ends_at).toDate();
				}
			}
			this.clonedService = clonedService;
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
			updateService: 'services/update',
			storeService: 'services/store'
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
			let data = JSON.parse(JSON.stringify(this.clonedService));
			if (data.starts_at) {
				data.starts_at = dayjs(data.starts_at).format('YYYY-MM-DD');
			}
			if (data.ends_at) {
				data.ends_at = dayjs(data.ends_at).format('YYYY-MM-DD');
			}
			if (!data.types || !data.types.length) {
				this.$refs.meetingTypes.$el.querySelector('.btn-dropdown').click();
				document.querySelector('.dashboard-content').scrollTo(0, document.querySelector('.dashboard-content').scrollHeight);
				return;
			}
			if (!data.timezone) {
				this.activeMenu = 'Advanced';
				return;
			}

			if (this.createService) {
				this.storeService(data);
			} else {
				this.updateService(data);
			}
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