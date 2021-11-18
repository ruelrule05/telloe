import { mapState, mapActions } from 'vuex';
import ServiceCard from '../../components/ServiceCard/ServiceCard.vue';
import InfoCircleIcon from '../../../icons/info-circle.vue';
import WarningIcon from '../../../icons/warning.vue';
import Service from '../../components/Service/Service.vue';
import copy from 'copy-text-to-clipboard';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import CloseIcon from '../../../icons/close.vue';
const dayjs = require('dayjs');
export default {
	components: {
		ServiceCard,
		InfoCircleIcon,
		Service,
		Modal,
		WarningIcon,
		VueFormValidate,
		CloseIcon
	},

	data: () => ({
		serviceToEdit: null,
		serviceToDelete: null,
		newService: {},
		createService: false,
		banner: false,
		cookieItem: 'telloe_event_types_banner'
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
		this.checkCookie();
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeService: 'services/store',
			deleteService: 'services/delete'
		}),

		hideBanner() {
			this.banner = false;
			let expires = dayjs().add(2, 'year').format('ddd, D MMM YYYY H:m:s') + ' UTC';
			document.cookie = `${this.cookieItem}=true; expires=${expires}; path=/`;
		},

		checkCookie() {
			var match = document.cookie.match(new RegExp('(^| )' + this.cookieItem + '=([^;]+)'));
			if (!match) {
				this.banner = true;
			}
		},

		confirmAddService() {
			this.storeService(this.newService);
			this.$refs.addServiceModal.hide();
		},

		resetNewService() {
			this.newService = {};
			this.newService.duration = 5;
			this.newService.interval = 30;
			this.newService.timezone = this.$root.auth.timezone;
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
