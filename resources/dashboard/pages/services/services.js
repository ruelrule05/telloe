import { mapState, mapActions } from 'vuex';
import ServiceCard from '../../components/ServiceCard/ServiceCard.vue';
import InfoCircleIcon from '../../../icons/info-circle.vue';
import WarningIcon from '../../../icons/warning.vue';
import Service from '../../components/Service/Service.vue';
import copy from 'copy-text-to-clipboard';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
export default {
	components: {
		ServiceCard,
		InfoCircleIcon,
		Service,
		Modal,
		WarningIcon,
		VueFormValidate
	},

	data: () => ({
		serviceToEdit: null,
		serviceToDelete: null,
		newService: {},
		createService: false
	}),

	computed: {
		...mapState({
			ready: state => state.services.ready,
			services: state => state.services.index
		}),

		widgetService() {
			return this.services.find(x => x.in_widget);
		},

		scriptCode() {
			return `<script src="${this.$root.app_url}/js/widget.js?p=${this.$root.auth.username}"></script>`;
		}
	},

	created() {
		this.getServices();
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeService: 'services/store',
			deleteService: 'services/delete'
		}),

		confirmAddService() {
			this.storeService(this.newService);
			this.$refs.addServiceModal.hide();
		},

		resetNewService() {
			this.newService = {};
			this.newService.days = { Friday: { end: '17:00', start: '08:00', isOpen: true }, Monday: { end: '17:00', start: '08:00', isOpen: true }, Sunday: { end: '17:00', start: '08:00', isOpen: false }, Tuesday: { end: '17:00', start: '08:00', isOpen: true }, Saturday: { end: '17:00', start: '08:00', isOpen: false }, Thursday: { end: '17:00', start: '08:00', isOpen: true }, Wednesday: { end: '17:00', start: '08:00', isOpen: true } };
		},

		embedModal() {
			this.$refs.embedModal.show();
		},

		confirmDeleteService() {
			if (this.serviceToDelete) {
				this.deleteService(this.serviceToDelete);
				this.$refs.deleteServiceModal.hide();
			}
		},

		serviceAction(action, service) {
			switch (action) {
				case 'Edit':
					this.serviceToEdit = service;
					break;
				case 'Duplicate':
					// eslint-disable-next-line no-case-declarations
					let data = JSON.parse(JSON.stringify(service));
					data.in_widget = false;
					this.storeService(data);
					break;
				case 'Delete':
					this.serviceToDelete = service;
					this.$refs.deleteServiceModal.show();
					break;
			}
		},

		copyLink(e) {
			this.$toast.clear();
			if (copy(`${process.env.MIX_APP_URL}/@${this.$root.auth.username}`)) {
				this.$toast.open('Link copied to clipboard');
			}
			e.currentTarget.blur();
		},
		copySCriptCode(e) {
			this.$toast.clear();
			if (copy(this.scriptCode)) {
				this.$toast.open('Link copied to clipboard');
			}
			e.currentTarget.blur();
			this.$refs.embedModal.hide();
		}
	}
};
