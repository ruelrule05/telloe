import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import Timerangepicker from '../../../../components/timerangepicker/timerangepicker.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
import PencilIcon from '../../../../icons/pencil';
import ChevronDownIcon from '../../../../icons/chevron-down';
import PlusIcon from '../../../../icons/plus';
import CogIcon from '../../../../icons/cog';
import TrashIcon from '../../../../icons/trash';
import ClockIcon from '../../../../icons/clock';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import MoreIcon from '../../../../icons/more';
import DollarSignIcon from '../../../../icons/dollar-sign';
import WindowPlusIcon from '../../../../icons/window-plus';
import CalendarIcon from '../../../../icons/calendar';
import dayjs from 'dayjs';
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);
import tooltip from '../../../../js/directives/tooltip.js';
//const convertTime = require('convert-time');
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import ChevronLeftIcon from '../../../../icons/chevron-left';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
	components: { Modal, VueFormValidate, VueCheckbox, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, ToggleSwitch, Timerangepicker, ArrowLeftIcon, MoreIcon, DollarSignIcon, WindowPlusIcon, CalendarIcon, VueSelect, ChevronLeftIcon, Multiselect },

	directives: { tooltip },

	data: () => ({
		packageItem: null,
		clonedPackage: null,
		selectedService: null,
		activeServicePosition: 0,
		masks: {
			input: 'MMMM D, YYYY'
		}
	}),

	watch: {
		'selectedService.id': function() {
			this.$nextTick(() => {
				let activeService = document.querySelector('.service-container.active');
				if (activeService) {
					this.activeServicePosition = activeService.offsetTop + 1;
				}
			});
		},
		selectedCoachId: function() {
			this.$nextTick(() => {
				let activeUser = document.querySelector('.user-container.active');
				if (activeUser) {
					this.activeServicePosition = activeUser.offsetTop + 1;
				}
			});
		},

		packageItem: function() {
			if (this.$root.intros.packages_show.enabled) {
				setTimeout(() => {
					if (!document.querySelector('.introjs-overlay')) {
						this.$root.intros.packages_show.intro.start();
					}
				}, 500);
			}
		}
	},

	computed: {
		...mapState({
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

	created() {
		this.getPackage(this.$route.params.id).then(packageItem => {
			this.$root.contentloading = false;
			this.packageItem = packageItem;
			this.clonedPackage = Object.assign({}, packageItem);
			if (this.packageItem.services.length > 0) {
				this.selectedService = this.packageItem.services[0];
			}
		});
		this.getServices();
	},

	methods: {
		...mapActions({
			getPackage: 'packages/show',
			deletePackage: 'packages/delete',
			getServices: 'services/index',
			updatePackage: 'packages/update'
		}),

		update() {
			this.updatePackage(this.clonedPackage).then(packageItemData => {
				Object.keys(packageItemData.data).map(key => {
					this.packageItem[key] = packageItemData.data[key];
				});
			});
			this.$refs['editModal'].hide();
		},

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
