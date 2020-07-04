import {mapState, mapActions} from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import VueButton from '../../../../components/vue-button.vue';
import MoreHIcon from '../../../../icons/more-h';
import PlusIcon from '../../../../icons/plus';
import ShortcutIcon from '../../../../icons/shortcut';
import ArrowDownIcon from '../../../../icons/arrow-down';
import TaskIcon from '../../../../icons/task';
import dayjs from 'dayjs';
export default {
	components: {
		Modal,
		VueFormValidate,
		VueSelect,
		VueButton,

		MoreHIcon,
		PlusIcon,
		ShortcutIcon,
		ArrowDownIcon,
		TaskIcon,
	},

	data: () => ({
		newInvoiceForm: {
			loading: false,
			service_ids: []
		}
	}),

	computed: {
		...mapState({
            ready: (state) => state.user_customers.ready,
            user_customers: (state) => state.user_customers.index,
            services: (state) => state.services.index,
		}),

		stripeCustomers() {
			let customers = [];
			this.user_customers.forEach((customer) => {
				if(customer.customer.stripe_customer_id) {
					customers.push({
						text: customer.customer.full_name,
						value: customer.id
					});
				}
			});
			return customers;
		},

		servicesList() {
			let services = [];
			this.services.forEach((service) => {
				services.push({
					text: service.name,
					value: service.id
				});
			});
			return services;
		},

		invoices() {
			let invoices = [];
			this.user_customers.forEach((customer) => {
				customer.invoices.forEach((invoice) => {
					invoice.user_customer = customer;
					this.$set(invoice, 'statusLoading', false);
					invoices.push(invoice);
				})
			});
			invoices.sort((a, b) => {
				return (a.created > b.created) ? -1 : 1;
			});
			return invoices;
		}
	},

    watch: {
        ready: function(value) {
            this.$root.contentloading = !value;
        }
    },
	
	created() {
        this.$root.contentloading = !this.ready;
		this.getUserCustomers();
		this.getServices();
	},

	mounted() {
	},

	methods: {
        ...mapActions({
            getUserCustomers: 'user_customers/index',
            createUserCustomerInvoice: 'user_customers/create_invoice',
            finalizeCustomerInvoice: 'user_customers/finalize_invoice',
            getServices: 'services/index',
        }),

        async finalizeInvoice(invoice) {
        	invoice.statusLoading = true;
        	await this.finalizeCustomerInvoice(invoice);
        	invoice.statusLoading = false;
        },

        resetInvoiceForm() {
        	this.newInvoiceForm = {
        		loading: false,
        		service_ids: []
        	}
        },

        async createInvoice() {
        	this.newInvoiceForm.loading = true;
        	this.newInvoiceForm.id = this.newInvoiceForm.customer_id;
        	await this.createUserCustomerInvoice(this.newInvoiceForm);
        	this.$refs['createInvoiceModal'].hide();
        },

        formatDate(date) {
        	return dayjs.unix(date).format('MMM d, YYYY h:mmA');
        }
	}
}