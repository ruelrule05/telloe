import { mapState, mapActions } from 'vuex';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import ClockIcon from '../../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../../icons/checkmark-circle';
import MoreIcon from '../../../../../icons/more';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import Vue from 'vue';
import VuePaginate from 'vue-paginate';
import Modal from '../../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import dayjs from 'dayjs';
Vue.use(VuePaginate);
const convertTime = require('convert-time');

export default {
	components: {
		ArrowLeftIcon,
		ClockIcon,
		CheckmarkCircleIcon,
		ToggleSwitch,
		MoreIcon,
		Modal,
		VueFormValidate
	},

	data: () => ({
		member: null,
		paginate: ['bookings'],
		convertTime: convertTime,
		clonedMember: null
	}),

	computed: {
		...mapState({
			services: state => state.services.index
		}),

		bookings() {
			let bookings = [];
			this.member.assigned_services.forEach(assignedService => {
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
			updateMember: 'members/update',
			deleteMember: 'members/delete',
			updateService: 'services/update',
			deleteService: 'services/delete'
		}),

		toggleAssignedService(service) {
			let index = this.member.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.member.assigned_services.splice(index, 1);
			} else {
				this.member.assigned_services.push(service.id);
			}
		},

		async update() {
			let serviceIds = this.clonedMember.assigned_services.map(service => {
				return service.id;
			});
			this.clonedMember.assigned_services = serviceIds;
			let member = await this.updateMember(this.clonedMember);
			this.member = member;
			this.$refs['editModal'].hide();
		},

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

			if (assigned_service && !assigned_service.deleted_at) {
				await this.deleteService(assigned_service);
				assigned_service.deleted_at = 'deleted';
			} else {
				let data = {
					id: this.member.id,
					service_id: service.id
				};
				await this.storeMemberService(data).then(data => {
					if (assigned_service) assigned_service.deleted_at = null;
				});
			}
			this.$set(service, 'is_loading', false);
		},

		async getMember() {
			let response = await axios.get(`/members/${this.$route.params.id}`);
			this.member = response.data;
			this.clonedMember = JSON.parse(JSON.stringify(response.data));
			this.$root.contentloading = false;
		}
	}
};
