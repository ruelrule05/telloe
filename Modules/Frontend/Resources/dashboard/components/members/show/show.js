import { mapState, mapActions } from 'vuex';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import ClockIcon from '../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import Vue from 'vue';
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);

export default {
	components: {
		ArrowLeftIcon,
		ClockIcon,
		CheckmarkCircleIcon,
		ToggleSwitch
	},

	data: () => ({
		member: null,
		paginate: ['bookings']
	}),

	computed: {
		...mapState({
			services: state => state.services.index
		}),

		bookings() {
			return [];
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
			deleteService: 'services/delete'
		}),

		async memberToggleAssignedService(value, service) {
			this.$set(service, 'is_loading', true);
			let assigned_service = this.member.services.find(x => x.assigned_service_id == service.id);
			if (assigned_service) {
				await this.deleteService(assigned_service);
				this.member.services.splice(
					this.member.services.findIndex(x => x.assigned_service_id == service.id),
					1
				);
			} else {
				let data = {
					id: this.member.id,
					service_id: service.id
				};
				await this.storeMemberService(data);
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
