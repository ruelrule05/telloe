import { mapState, mapActions } from 'vuex';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import ClockIcon from '../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import Vue from 'vue';
import VuePaginate from 'vue-paginate';
import dayjs from 'dayjs';
Vue.use(VuePaginate);
const convertTime = require('convert-time');

export default {
	components: {
		ArrowLeftIcon,
		ClockIcon,
		CheckmarkCircleIcon,
		ToggleSwitch
	},

	data: () => ({
		member: null,
		paginate: ['bookings'],
		convertTime: convertTime
	}),

	computed: {
		...mapState({
			services: state => state.services.index
		}),

		bookings() {
			let bookings = [];
			this.member.services.forEach(assignedService => {
				if (assignedService.bookings.length > 0) {
					assignedService.bookings.forEach(booking => {
						booking.service = assignedService;
						bookings.push(booking);
					});
				}
			});
			return bookings;
		}
	},

	created() {
		this.getServices();
		this.getMember();
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeMemberService: 'members/store_service',
			updateService: 'services/update',
			deleteService: 'services/delete'
		}),

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		async memberToggleManageBookings(value, service) {
			service.manage_bookings = value;
			this.updateService(service);
		},

		async memberToggleAssignedService(value, service) {
			this.$set(service, 'is_loading', true);
			let assigned_service = this.member.services.find(x => x.parent_service_id == service.id);

			if (!(assigned_service || {}).deleted_at) {
				await this.deleteService(assigned_service);
				assigned_service.deleted_at = 'deleted';
			} else {
				let data = {
					id: this.member.id,
					service_id: service.id
				};
				await this.storeMemberService(data).then(data => {
					assigned_service.deleted_at = null;
				});
			}
			this.$set(service, 'is_loading', false);
		},

		async getMember() {
			let response = await axios.get(`/members/${this.$route.params.id}`);
			this.member = response.data;
			this.$root.contentloading = false;
		}
	}
};
