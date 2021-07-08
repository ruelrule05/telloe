import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import PlusIcon from '../../../../icons/plus';
import CalendarIcon from '../../../../icons/calendar';
import CoinIcon from '../../../../icons/coin';
import PackageIcon from '../../../../icons/package';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import MoreIcon from '../../../../icons/more-h';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
import VCalendar from 'v-calendar';
Vue.use(VCalendar);
import dayjs from 'dayjs';
import InfoCircleIcon from '../../../../icons/info-circle.vue';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../icons/cog';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import CloseIcon from '../../../../icons/close.vue';
export default {
	components: { Modal, VueFormValidate, VueSelect, PlusIcon, CalendarIcon, CoinIcon, PackageIcon, ToggleSwitch, MoreIcon, VueCheckbox, InfoCircleIcon, VueDropdown, CogIcon, Multiselect, CloseIcon },
	data: () => ({
		banner: false,
		newPackage: {},
		clonedPackage: null,
		selectedPackage: null,
		masks: {
			input: 'MMMM D, YYYY'
		},
		cookieItem: 'telloe_packages_banner'
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
						name: serviceCopy.name,
						value: serviceCopy,
						id: serviceCopy.id
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
		this.checkCookie();
	},

	mounted() {
		if (this.$root.intros.packages_index.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.intros.packages_index.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			getPackages: 'packages/index',
			storePackage: 'packages/store',
			updatePackage: 'packages/update',
			deletePackage: 'packages/delete'
		}),

		checkCookie() {
			var match = document.cookie.match(new RegExp('(^| )' + this.cookieItem + '=([^;]+)'));
			if (!match) {
				this.banner = true;
			}
		},

		hideBanner() {
			this.banner = false;
			let expires =
				dayjs()
					.add(2, 'year')
					.format('ddd, D MMM YYYY H:m:s') + ' UTC';
			document.cookie = `${this.cookieItem}=true; expires=${expires}; path=/`;
		},

		packageAction(action, packageItem) {
			switch (action) {
				case 'Edit':
					this.clonedPackage = Object.assign({}, packageItem);
					this.$refs.editModal.show();
					break;
				case 'Delete':
					this.selectedPackage = packageItem;
					this.$refs.deleteModal.show();
					break;
			}
		},

		update() {
			if (!(this.clonedPackage.services || {}).length) {
				this.$refs.servicesEdit.$el.querySelector('input').focus();
				return;
			}
			this.updatePackage(this.clonedPackage);
			this.$refs.editModal.hide();
		},

		submit() {
			if (!(this.newPackage.services || {}).length) {
				this.$refs.services.$el.querySelector('input').focus();
				return;
			}
			this.newPackage.expiration_date = dayjs(this.newPackage.expiration_date).format('YYYY-MM-DD');
			this.storePackage(this.newPackage);
			this.$refs['addModal'].hide();
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};
