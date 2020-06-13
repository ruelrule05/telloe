import {mapState, mapActions} from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import MoreHIcon from '../../../../icons/more-h';
export default {
	components: {Modal, VueFormValidate, MoreHIcon},

	data: () => ({
		selectedCustomer: {},
	}),

	computed: {
		...mapState({
            user_customers: (state) => state.user_customers.index,
            ready: (state) => state.user_customers.ready,
		}),
	},

	created() {
		this.getUserCustomers();
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
        ...mapActions({
            getUserCustomers: 'user_customers/index',
            storeUserCustomer: 'user_customers/store',
            deleteUserCustomer: 'user_customers/delete',
        }),

		store() {
			if(this.selectedCustomer.email) {
				this.$refs['addModal'].hide();
				this.storeUserCustomer(this.selectedCustomer);
				this.$refs['addModal'].hide();
			}
		},
	}
}