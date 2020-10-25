import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Modal from '../../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import PlusIcon from '../../../../../icons/plus';
import CalendarIcon from '../../../../../icons/calendar';
import CoinIcon from '../../../../../icons/coin';
import PackageIcon from '../../../../../icons/package';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import VCalendar from 'v-calendar';
Vue.use(VCalendar);
import dayjs from 'dayjs';
export default {
	components: { Modal, VueFormValidate, VueSelect, PlusIcon, CalendarIcon, CoinIcon, PackageIcon, ToggleSwitch },
	data: () => ({
		newPackage: {}
	}),

	computed: {
		...mapState({
			ready: state => state.packages.ready,
			packages: state => state.packages.index,
			services: state => state.services.index
		}),

		servicesList() {
			let services = [];
			this.services.forEach(service => {
				if (service.is_available) {
					let serviceCopy = Object.assign({}, service);
					serviceCopy.bookings = 1;
					services.push({
						text: serviceCopy.name,
						value: serviceCopy
					});
				}
			});
			return services;
		}
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getServices();
		this.getPackages();
	},

	mounted() {},

	methods: {
		...mapActions({
			getServices: 'services/index',
			getPackages: 'packages/index',
			storePackage: 'packages/store',
			updatePackage: 'packages/update',
			deletePackage: 'packages/delete'
		}),

		submit() {
			this.newPackage.expiration_date = dayjs(this.newPackage.expiration_date).format('YYYY-MM-DD');
			this.storePackage(this.newPackage);
			this.$refs['addModal'].hide();
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};