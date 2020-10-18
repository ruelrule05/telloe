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
import dayjs from 'dayjs';
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);
const convertTime = require('convert-time');

export default {
	components: { Modal, VueFormValidate, VueCheckbox, PencilIcon, ChevronDownIcon, PlusIcon, CogIcon, TrashIcon, ClockIcon, ToggleSwitch, Timerangepicker, ArrowLeftIcon, MoreIcon },
	data: () => ({
		packageItem: null,
		clonedPackage: null,
	}),

	computed: {
		...mapState({
			services: state => state.services.index
		}),
	},

	created() {
		this.getPackage(this.$route.params.id).then(packageItem => {
			this.$root.contentloading = false;
			this.packageItem = packageItem;
			this.clonedPackage = Object.assign({}, packageItem);
		});
		this.getServices();
	},


	methods: {
		...mapActions({
			getPackage: 'packages/show',
			deletePackage: 'packages/delete',
			getServices: 'services/index',
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
