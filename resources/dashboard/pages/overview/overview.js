import CloseIcon from '../../../icons/close.vue';
import { mapState, mapActions } from 'vuex';
import UpcomingBookings from '../../components/UpcomingBookings/UpcomingBookings.vue';
import ServiceCard from '../../components/ServiceCard/ServiceCard.vue';
import Modal from '../../../components/modal/modal.vue';
import WarningIcon from '../../../icons/warning.vue';
import Service from '../../components/Service/Service.vue';
export default {
	components: { CloseIcon, UpcomingBookings, ServiceCard, Modal, WarningIcon, Service },

	data: () => ({
		banner: false,
		serviceToEdit: null,
		serviceToDelete: null
	}),

	computed: {
		...mapState({
			upcomingBookings: state => state.bookings.upcoming,
			services: state => state.services.index
		})
	},

	created() {
		this.getUpcomingBookings();
		this.getServices();
	},

	methods: {
		...mapActions({
			getUpcomingBookings: 'bookings/getUpcomingBookings',
			getServices: 'services/index',
			storeService: 'services/store',
			deleteService: 'services/delete'
		}),

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
		}
	}
};
