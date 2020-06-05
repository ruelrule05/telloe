import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import MoreHIcon from '../../../../icons/more-h';
export default {
	components: {Modal, VueFormValidate, MoreHIcon},

	data: () => ({
		ready: false,
		customers: [],
		selectedCustomer: {},
	}),

	created() {
		this.getData();
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
		getData() {
			axios.get('/dashboard/user_customers').then((response) => {
				this.customers = response.data;
				this.ready = true;
			});
		},

		store() {
			if(this.selectedCustomer.email) {
				this.$refs['addModal'].hide();
				axios.post('/dashboard/user_customers', this.selectedCustomer).then((response) => {
					this.customers.unshift(response.data);
				});
				this.selectedCustomer = {};
			}
		},

		destroy(customer) {
			if(customer) {
				this.$refs['deleteModal'].hide();
				axios.delete(`/dashboard/user_customers/${customer.id}`);
				this.$delete(this.customers, this.customers.findIndex((x) => x.id == customer.id));
			}
		}
	}
}