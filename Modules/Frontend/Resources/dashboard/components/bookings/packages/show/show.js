import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Modal from '../../../../../components/modal/modal.vue';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import Timerangepicker from '../../../../../components/timerangepicker/timerangepicker.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../../components/vue-checkbox/vue-checkbox.vue';
import PencilIcon from '../../../../../icons/pencil';
import ChevronDownIcon from '../../../../../icons/chevron-down';
import PlusIcon from '../../../../../icons/plus';
import CogIcon from '../../../../../icons/cog';
import TrashIcon from '../../../../../icons/trash';
import ClockIcon from '../../../../../icons/clock';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import MoreIcon from '../../../../../icons/more';
import DollarSignIcon from '../../../../../icons/dollar-sign';
import WindowPlusIcon from '../../../../../icons/window-plus';
import CalendarIcon from '../../../../../icons/calendar';
import dayjs from 'dayjs';
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);
import tooltip from '../../../../../js/directives/tooltip.js';
const convertTime = require('convert-time');

export default {
	components: { Modal, VueFormValidate, VueCheckbox, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, ToggleSwitch, Timerangepicker, ArrowLeftIcon, MoreIcon, DollarSignIcon, WindowPlusIcon, CalendarIcon },

	directives: { tooltip },

	data: () => ({
		packageItem: null,
		clonedPackage: null,
		selectedService: null,
		activeServicePosition: 0
	}),

	watch: {
		'selectedService.id': function(value) {
			this.$nextTick(() => {
				let activeService = document.querySelector('.service-container.active');
				if (activeService) {
					this.activeServicePosition = activeService.offsetTop + 1;
				}
			});
		}
	},
	selectedCoachId: function(value) {
		this.$nextTick(() => {
			let activeUser = document.querySelector('.user-container.active');
			if (activeUser) {
				this.activeServicePosition = activeUser.offsetTop + 1;
			}
		});
	},
	selectedCoachId: function(value) {
		this.$nextTick(() => {
			let activeUser = document.querySelector('.user-container.active');
			if (activeUser) {
				this.activeServicePosition = activeUser.offsetTop + 1;
			}
		});
	},

	computed: {
		...mapState({
			services: state => state.services.index
		})
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
			getServices: 'services/index'
		}),

		submit() {
			this.updateService(this.clonedService).then(service => {
				Object.keys(service).map(key => {
					this.service[key] = service[key];
				});
			});
			this.$refs['editModal'].hide();
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};
