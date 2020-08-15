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
import TrashIcon from '../../../../icons/trash';
import MoreIcon from '../../../../icons/more';
import dayjs from 'dayjs';
import Tooltip from '../../../../js/directives/tooltip';
import Vue from 'vue';
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);
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
		TrashIcon,
		MoreIcon,
	},

	directives: {Tooltip},

	data: () => ({
		newInvoiceForm: {
			contact_id: '',
			loading: false,
			service_ids: [],
		},
		selectedInvoice: null,
		paginate: ['invoices'],
		invoiceStatuses: [
			{ 
				'text': 'All', 
				'value': 'all' 
			},
			{ 
				'text': 'Draft', 
				'value': 'draft' 
			},
			{ 
				'text': 'Open', 
				'value': 'open' 
			},
		],
		invoiceStatus: 'all',
		hasInvoices: false,
		openInfo: false,
	}),

	computed: {
		...mapState({
			ready: state => state.contacts.ready,
			contacts: state => state.contacts.index,
			services: state => state.services.index,
            pending_invoices: (state) => state.pending_invoices.index,
		}),

		stripeContacts() {
			let contacts = [];
			this.contacts.forEach(contact => {
				if (!contact.is_pending) {
					contacts.push({
						text: contact.contact_user.full_name,
						value: contact.id,
					});
				}
			});
			return contacts;
		},

		servicesList() {
			let services = [];
			this.services.forEach(service => {
				if(service.is_available) {
					services.push({
						text: service.name,
						value: service.id
					});
				}
			});
			return services;
		},

		invoices() {
			let invoices = [];
			this.contacts.forEach(contact => {
				contact.invoices.forEach(invoice => {
					invoice.contact = contact;
					this.$set(invoice, 'statusLoading', false);
					if(this.invoiceStatus == 'all' || this.invoiceStatus == invoice.status) invoices.push(invoice);
				});
			});
			invoices = invoices.concat(this.pending_invoices);
			invoices.sort((a, b) => {
				return a.created > b.created ? -1 : 1;
			});
			if(invoices.length > 0) {
				this.hasInvoices = true;
			} else {
				invoices.push({ 'placeholder': true });
				this.hasInvoices = false;
			}
			return invoices;
		},
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		},
		invoiceStatus: function(value) {
			if(this.$refs['paginate']) this.$refs['paginate'].goToPage(1);
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getUserContacts();
		this.getServices();
		this.getPendingInvoices();
	},

	mounted() {},

	methods: {
		...mapActions({
			getUserContacts: 'contacts/index',
			createContactInvoice: 'contacts/create_invoice',
			finalizeContactInvoice: 'contacts/finalize_invoice',
			getServices: 'services/index',
            getPendingInvoices: 'pending_invoices/index',
            storePendingInvoice: 'pending_invoices/store',
            deletePendingInvoice: 'pending_invoices/delete',
		}),

        getCurrency(invoice) {
        	return !invoice.is_pending ? invoice.currency : (this.$root.auth.stripe_account ? (((this.$root.auth.stripe_account.external_accounts || {}).data || [])[0] || {}).currency : false) || 'USD';
        },

		async finalizeInvoice(invoice) {
			invoice.statusLoading = true;
			await this.finalizeContactInvoice(invoice);
			invoice.statusLoading = false;
		},

		resetInvoiceForm() {
			this.newInvoiceForm = {
				contact_id: '',
				loading: false,
				service_ids: [],
			};
			this.openInfo = false;
		},

		draftInvoice(invoice) {
			if(invoice.is_pending) {
	        	this.$set(invoice, 'statusLoading', true);
	        	let data = {
	        		'id': invoice.contact_id,
	        		'service_ids': invoice.service_ids,
	        		'amount': invoice.amount / 100,
	        	};

				this.createContactInvoice(data)
					.then(() => {
	        			this.$set(invoice, 'statusLoading', false);
        				this.deleteInvoice(invoice);
					})
					.catch(() => {
	        			this.$set(invoice, 'statusLoading', false);
					});
			}
		},


        deleteInvoice(invoice) {
        	if(invoice.is_pending) {
        		this.deletePendingInvoice(invoice);
        	}
        },

		createInvoice() {
			this.newInvoiceForm.loading = true;
			this.newInvoiceForm.id = this.newInvoiceForm.contact_id;

        	if(this.$root.payoutComplete) {
				this.createContactInvoice(this.newInvoiceForm)
					.then(() => {
						this.resetInvoiceForm();
					})
					.catch(() => {
						this.newInvoiceForm.loading = false;
					});
			} else {
	        	this.storePendingInvoice(this.newInvoiceForm).then(() => {
	        		this.resetInvoiceForm();
	        	}).catch(() => {
	        		this.newInvoiceForm.loading = false;
	        	});
			}
		},

		formatDate(date) {
			return dayjs.unix(date).format('MMM d, YYYY h:mmA');
		},
	},
};
