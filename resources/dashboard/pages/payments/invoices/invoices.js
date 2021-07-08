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
import VuePaginate from 'vue-paginate';
import Vue from 'vue';
Vue.use(VuePaginate);
const format = require('format-number');
import getSymbolFromCurrency from 'currency-symbol-map';
import InfoCircleIcon from '../../../../icons/info-circle.vue';
import axios from 'axios';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../icons/cog';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import CloseIcon from '../../../../icons/close.vue';
export default {
	components: {
		CloseIcon,
		Multiselect,
		CogIcon,
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
		CheckmarkIcon,
		InfoCircleIcon,
		VueDropdown
	},

	directives: { Tooltip },

	data: () => ({
		banner: false,
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
		xeroTenantsLoading: true,
		currencies: [
			{
				text: 'AUD',
				value: 'AUD'
			},
			{
				text: 'USD',
				value: 'USD'
			},
			{
				text: 'PHP',
				value: 'PHP'
			},
			{
				text: 'CHF',
				value: 'CHF'
			},
			{
				text: 'EUR',
				value: 'EUR'
			},
			{
				text: 'CAD',
				value: 'CAD'
			},
			{
				text: 'GBP',
				value: 'GBP'
			},
			{
				text: 'NZD',
				value: 'NZD'
			}
		],
		format: format,
		getSymbolFromCurrency: getSymbolFromCurrency,
		invoiceToDelete: null,
		invoiceToVoid: null,
		invoiceToEdit: null,
		loading: true,
		cookieItem: 'telloe_invoices_banner'
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
						name: service.name,
						value: service.id
					});
				}
			});
			return services;
		}
	},

	watch: {
		ready: function() {
			//this.$root.contentloading = !value;
		},
		invoiceStatus: function() {
			if (this.$refs['paginate']) this.$refs['paginate'].goToPage(1);
		}
	},

	created() {
		//this.$root.contentloading = !this.ready;
		this.getUserContacts({ nopaginate: true });
		this.getServices();
		this.getStripeInvoices();
		this.checkCookie();
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

		checkCookie() {
			var match = document.cookie.match(new RegExp('(^| )' + this.cookieItem + '=([^;]+)'));
			if (!match) {
				this.banner = true;
			}
		},

		hideBanner() {
			this.banner = false;
			let expires =
				dayjs()
					.add(2, 'year')
					.format('ddd, D MMM YYYY H:m:s') + ' UTC';
			document.cookie = `${this.cookieItem}=true; expires=${expires}; path=/`;
		},

		async invoiceAction(action, invoice) {
			if (action.value == 'download') {
				window.open(invoice.invoice_pdf, '_blank');
			} else {
				let response = await axios.put(`/stripe/invoices/${invoice.id}`, { action: action.value }, { toast: true }).catch(() => {});
				if (response) {
					if (action.value == 'delete') {
						this.invoices.splice(
							this.invoices.findIndex(i => i.id == invoice.id),
							1
						);
					} else {
						Object.assign(invoice, response.data);
					}
				}
			}
		},

		stripeInvoiceStatuses(invoice) {
			let stripeInvoiceStatuses = [];
			switch (invoice.status) {
				case 'draft':
					stripeInvoiceStatuses = [
						{ text: 'Finalize', value: 'finalize' },
						{ text: 'Delete', value: 'delete' }
					];
					break;
				case 'uncollectible':
					stripeInvoiceStatuses = [
						{ text: 'Void', value: 'void' },
						{ text: 'Pay', value: 'pay' }
					];
					break;
				case 'open':
					stripeInvoiceStatuses = [
						{ text: 'Send', value: 'send' },
						{ text: 'Void', value: 'void' },
						{ text: 'Mark Uncollectible', value: 'uncollectible' },
						{ text: 'Pay', value: 'pay' }
					];
					break;
			}
			if (invoice.invoice_pdf) {
				stripeInvoiceStatuses.push({ text: 'Download', value: 'download' });
			}
			return stripeInvoiceStatuses;
		},

		async getStripeInvoices() {
			this.loading = true;
			let response = await axios.get('/stripe/invoices');
			if (response) {
				this.invoices = response.data.data;
			}
			this.loading = false;
		},

		async updateInvoice(invoiceToUpdate) {
			this.$refs['editModal'].hide();
			this.$set(invoiceToUpdate, 'statusLoading', true);
			let response = await window.axios.put('/xero/invoices', { invoice_id: invoiceToUpdate.InvoiceID, status: invoiceToUpdate.newStatus, description: invoiceToUpdate.description, tenantId: this.tenantId }).catch(() => {});
			if (response) {
				if (response.data.Status == 'DELETED' || response.data.Status == 'VOIDED') {
					let index = this.invoices.findIndex(x => x.InvoiceID == response.data.InvoiceID);
					if (index > -1) {
						this.invoices.splice(index, 1);
					}
				} else {
					let invoice = this.invoices.find(x => x.InvoiceID == response.data.InvoiceID);
					if (invoice) {
						this.$set(invoice, 'statusLoading', false);
						Object.assign({}, invoice, response.data);
					}
				}
			}
		},

		confirmInvoiceUpdate(invoice, status) {
			invoice.newStatus = status;
			if (status == 'DELETED') {
				this.invoiceToDelete = invoice;
				this.$refs['deleteModal'].show();
			} else if (status == 'VOIDED') {
				this.invoiceToVoid = invoice;
				this.$refs['voidModal'].show();
			} else {
				this.invoiceToEdit = invoice;
				this.$refs['editModal'].show();
			}
		},

		changeTenant() {
			this.tableLoading = true;
			this.getXeroInvoices(this.tenantId);
		},

		async saveXeroTenant(tenantId) {
			this.$root.contentloading = true;
			let response = await window.axios.post('/xero/tenants_save', { tenant_id: tenantId });
			this.$root.auth.xero_tenant_id = response.data;
			this.chooseXeroTenant = false;
			this.getXeroInvoices();
		},

		async getTenants() {
			if (this.$root.auth.xero_token) {
				let response = await window.axios.get('/xero/tenants');
				this.xeroTenants = response.data;
				this.xeroTenantsLoading = false;
				if (response) {
					let organizations = [];
					response.data.forEach(organization => {
						organizations.push({
							text: organization.tenantName,
							value: organization.tenantId
						});
					});
					this.organizations = organizations;
				}
			}
		},

		async getXeroInvoices(tenantId = '') {
			if (this.$root.auth.xero_token) {
				if (!this.$root.auth.xero_tenant_id) {
					this.chooseXeroTenant = true;
					this.$root.contentloading = false;
				} else {
					let response = await window.axios.get(`/xero/invoices?tenantId=${tenantId}`, { toast: true }).catch(() => {});
					if (response) {
						this.invoices = response.data;
					}
					this.tenantId = tenantId.length > 0 ? tenantId : this.$root.auth.xero_tenant_id;
					this.$root.contentloading = false;
					this.tableLoading = false;
				}
			} else {
				this.$root.contentloading = false;
			}
		},

		async authenticateXero() {
			let response = await window.axios.get('/xero_authenticate');
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

		async createInvoice() {
			this.newInvoiceForm.loading = true;
			this.newInvoiceForm.id = this.newInvoiceForm.contact_id;

			let data = JSON.parse(JSON.stringify(this.newInvoiceForm));
			data.service_ids = data.service_ids.map(s => {
				return s.value;
			});

			let response = await window.axios.post('/stripe/invoices', data, { toast: true }).catch(() => {
				this.newInvoiceForm.loading = false;
			});
			if (response) {
				this.invoices.unshift(response.data);
				this.newInvoiceForm.loading = false;
				this.$refs.createInvoiceModal.hide(true);
			}
		},

		formatDate(date) {
			return date ? dayjs.unix(date).format('MMM D, YYYY') : '-';
		}
	}
};
