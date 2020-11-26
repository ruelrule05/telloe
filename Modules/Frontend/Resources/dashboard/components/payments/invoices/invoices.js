import { mapState, mapActions } from 'vuex';
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
import XeroIcon from '../../../../icons/xero';
import CheckmarkIcon from '../../../../icons/checkmark';
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
		XeroIcon,
		CheckmarkIcon
	},

	directives: { Tooltip },

	data: () => ({
		newInvoiceForm: {
			contact_id: '',
			loading: false,
			service_ids: []
		},
		selectedInvoice: null,
		paginate: ['invoices'],
		invoiceStatuses: [
			{
				text: 'All',
				value: 'all'
			},
			{
				text: 'Draft',
				value: 'draft'
			},
			{
				text: 'Open',
				value: 'open'
			}
		],
		invoiceStatus: 'all',
		hasInvoices: false,
		openInfo: false,
		chooseIntegration: false,
		xeroTenants: [],
		invoices: [],
		chooseXeroTenant: false,
		organizations: [],
		tenantId: '',
		tableLoading: false,
		xeroTenantsLoading: true
	}),

	computed: {
		...mapState({
			ready: state => state.contacts.ready,
			contacts: state => state.contacts.index,
			services: state => state.services.index,
			pending_invoices: state => state.pending_invoices.index
		}),

		stripeContacts() {
			let contacts = [];
			this.contacts.forEach(contact => {
				if (!contact.is_pending) {
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
			this.services.forEach(service => {
				if (service.is_available) {
					services.push({
						text: service.name,
						value: service.id
					});
				}
			});
			return services;
		},

		invoicesx() {
			let invoices = [];
			this.contacts.forEach(contact => {
				contact.invoices.forEach(invoice => {
					invoice.contact = contact;
					this.$set(invoice, 'statusLoading', false);
					if (this.invoiceStatus == 'all' || this.invoiceStatus == invoice.status) invoices.push(invoice);
				});
			});
			invoices = invoices.concat(this.pending_invoices);
			invoices.sort((a, b) => {
				return a.created > b.created ? -1 : 1;
			});
			if (invoices.length > 0) {
				this.hasInvoices = true;
			} else {
				invoices.push({ placeholder: true });
				this.hasInvoices = false;
			}
			return invoices;
		}
	},

	watch: {
		ready: function(value) {
			//this.$root.contentloading = !value;
		},
		invoiceStatus: function(value) {
			if (this.$refs['paginate']) this.$refs['paginate'].goToPage(1);
		}
	},

	created() {
		//this.$root.contentloading = !this.ready;
		this.getUserContacts();
		this.getServices();
		if (this.$root.auth.xero_token) {
			this.getTenants();
			this.getXeroInvoices();
			this.invoiceStatuses.push({
				text: 'Authorised',
				value: 'authorised',
			});
			this.invoiceStatuses.push({
				text: 'Paid',
				value: 'paid',
			});
		} else {
			this.getPendingInvoices().then(() => {
				this.$root.contentloading = false;
			});
		}
	},

	mounted() {
		if (this.$root.intros.invoices_index.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.invoices_index.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getUserContacts: 'contacts/index',
			createContactInvoice: 'contacts/create_invoice',
			finalizeContactInvoice: 'contacts/finalize_invoice',
			getServices: 'services/index',
			getPendingInvoices: 'pending_invoices/index',
			storePendingInvoice: 'pending_invoices/store',
			deletePendingInvoice: 'pending_invoices/delete'
		}),

		changeTenant() {
			this.tableLoading = true;
			this.getXeroInvoices(this.tenantId);
		},

		async saveXeroTenant(tenantId) {
			this.$root.contentloading = true;
			let response = await axios.post('/xero/tenants_save', { tenant_id: tenantId });
			this.$root.auth.xero_tenant_id = response.data;
			this.chooseXeroTenant = false;
			this.getXeroInvoices();
		},

		async getTenants() {
			if (this.$root.auth.xero_token) {
				let response = await axios.get('/xero/tenants');
				this.xeroTenants = response.data;
				this.xeroTenantsLoading = false;
				if(response) {
					let organizations = [];
					response.data.forEach(organization => {
						organizations.push({
							text: organization.tenantName,
							value: organization.tenantId,
						});
					});
					this.organizations = organizations;
					this.tenantId = response.data[0].tenantId;
				}
			}
		},

		async getXeroInvoices(tenantId = '') {
			if (this.$root.auth.xero_token) {
				if (!this.$root.auth.xero_tenant_id) {
					this.chooseXeroTenant = true;
					this.$root.contentloading = false;
				} else {
					let response = await axios.get(`/xero/invoices?tenantId=${tenantId}`, { toasted: true }).catch(e => {});
					if (response) {
						this.invoices = response.data;
					}
					this.$root.contentloading = false;
				}
			} else {
				this.$root.contentloading = false;
			}
		},

		async authenticateXero() {
			let response = await axios.get('/xero_authenticate');
			this.goToXeroAuthUrl(response.data.authUrl);
		},

		goToXeroAuthUrl(url) {
			if (url) {
				const width = 450;
				const height = 650;
				const left = screen.width / 2 - width / 2;
				const top = screen.height / 2 - height / 2;
				let xeroAuthWindow = window.open(url, 'xero_auth_window', `width=${width}, height=${height}, top=${top}, left=${left}`);
				let callbackInterval = setInterval(() => {
					if (xeroAuthWindow.closed) {
						clearInterval(callbackInterval);
						console.log('closed');
						this.chooseIntegration = false;
						this.getXeroInvoices();
						console.log('closedxxxx');
					}
				}, 500);
			}
		},

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
				service_ids: []
			};
			this.openInfo = false;
		},

		draftInvoice(invoice) {
			if (invoice.is_pending) {
				this.$set(invoice, 'statusLoading', true);
				let data = {
					id: invoice.contact_id,
					service_ids: invoice.service_ids,
					amount: invoice.amount / 100
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
			if (invoice.is_pending) {
				this.deletePendingInvoice(invoice);
			}
		},

		async createInvoice() {
			this.newInvoiceForm.loading = true;
			this.newInvoiceForm.id = this.newInvoiceForm.contact_id;

			if (this.$root.auth.xero_token) {
				let response = await axios.post('/xero/invoices', this.newInvoiceForm, { toasted: true }).catch(() => {
					this.newInvoiceForm.loading = false;
				});
				if (response) {
					this.invoices.unshift(response.data);
					this.newInvoiceForm.loading = false;
					this.$refs['createInvoiceModal'].hide();
				}
			} else {
				this.storePendingInvoice(this.newInvoiceForm)
					.then(() => {
						this.resetInvoiceForm();
					})
					.catch(() => {
						this.newInvoiceForm.loading = false;
					});
			}
		},

		formatDate(date) {
			return dayjs.unix(date).format('MMM d, YYYY h:mmA');
		}
	}
};
