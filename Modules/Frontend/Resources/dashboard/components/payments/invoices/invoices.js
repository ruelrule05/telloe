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
            ready: (state) => state.contacts.ready,
            contacts: (state) => state.contacts.index,
            services: (state) => state.services.index,
		}),

		stripeContacts() {
			let contacts = [];
			this.contacts.forEach((contact) => {
				if(contact.contact_user.stripe_customer_id) {
					contacts.push({
						text: contact.contact_user.full_name,
						value: contact.id
					});
				}
			});
			return contacts;
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
			this.contacts.forEach((contact) => {
				contact.invoices.forEach((invoice) => {
					invoice.contact = contact;
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
		this.getUserContacts();
		this.getServices();
	},

	mounted() {
	},

	methods: {
        ...mapActions({
            getUserContacts: 'contacts/index',
            createUserContactInvoice: 'contacts/create_invoice',
            finalizeContactInvoice: 'contacts/finalize_invoice',
            getServices: 'services/index',
        }),

        async finalizeInvoice(invoice) {
        	invoice.statusLoading = true;
        	await this.finalizeContactInvoice(invoice);
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
        	this.newInvoiceForm.id = this.newInvoiceForm.contact_id;
        	await this.createUserContactInvoice(this.newInvoiceForm);
        	this.$refs['createInvoiceModal'].hide();
        },

        formatDate(date) {
        	return dayjs.unix(date).format('MMM d, YYYY h:mmA');
        }
	}
}