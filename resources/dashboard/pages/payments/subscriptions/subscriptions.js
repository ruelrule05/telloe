import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import VueButton from '../../../../components/vue-button.vue';
import MoreVIcon from '../../../../icons/more-v';
import PlusIcon from '../../../../icons/plus';
import ShortcutIcon from '../../../../icons/shortcut';
import ArrowDownIcon from '../../../../icons/arrow-down';
import TaskIcon from '../../../../icons/task';
import BlockIcon from '../../../../icons/block';
import TrashIcon from '../../../../icons/trash';
import MoreIcon from '../../../../icons/more';
import CloseIcon from '../../../../icons/close';
import dayjs from 'dayjs';
import Tooltip from '../../../../js/directives/tooltip';
import Vue from 'vue';
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);
import VCalendar from 'v-calendar';
Vue.use(VCalendar);
const dateFormat = require('dateformat');
import InfoCircleIcon from '../../../../icons/info-circle.vue';
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import getSymbolFromCurrency from 'currency-symbol-map';
const format = require('format-number');
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../icons/cog';

export default {
	components: {
		CogIcon,
		VueDropdown,
		Multiselect,
		Modal,
		VueFormValidate,
		VueSelect,
		VueButton,

		MoreVIcon,
		PlusIcon,
		ShortcutIcon,
		ArrowDownIcon,
		TaskIcon,
		BlockIcon,
		TrashIcon,
		MoreIcon,
		CloseIcon,
		InfoCircleIcon
	},

	directives: { Tooltip },

	data: () => ({
		banner: false,
		format: format,
		getSymbolFromCurrency: getSymbolFromCurrency,
		newSubscriptionForm: {
			loading: false,
			services: [],
			date: null,
			recurring_frequency: 'week',
			duration: 6,
			duration_frequency: 'month'
		},
		selectedSubscription: null,
		openInfo: false,
		recurringOptions: [
			{
				text: 'Weekly',
				value: 'week'
			},
			{
				text: 'Monthly',
				value: 'month'
			},
			{
				text: 'Yearly',
				value: 'year'
			}
		],
		paginate: ['subscriptions'],
		subscriptionStatuses: [
			{
				text: 'Cancel',
				value: 'cancel'
			}
		],
		subscriptionStatus: 'all',
		hasSubscriptions: false,
		invoiceLoading: false,
		loading: true,
		subscriptions: [],
		cookieItem: 'telloe_subscriptions_banner'
	}),

	computed: {
		...mapState({
			ready: state => state.contacts.ready,
			contacts: state => state.contacts.index,
			services: state => state.services.index,
			pending_subscriptions: state => state.pending_subscriptions.index
		}),

		subscriptionTotal() {
			let total = 0;
			this.newSubscriptionForm.services.forEach(service => {
				total += service.rate * service.frequency;
			});
			return total.toFixed(2);
		},

		stripeContacts() {
			let contacts = [];
			this.contacts.forEach(contact => {
				if (!contact.is_pending && contact.stripe_customer_id) {
					contacts.push({
						text: contact.contact_user.full_name,
						value: contact.id
					});
				}
			});
			return contacts;
		},

		stripeCustomers() {
			let customers = [];
			this.contacts.forEach(contact => {
				if (!contact.is_pending) {
					customers.push({
						text: contact.contact_user.full_name,
						value: contact.id
					});
				}
			});
			return customers;
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
		ready: function(value) {
			this.$root.contentloading = !value;
		},

		selectedSubscription: function(value) {
			if (value.latest_invoice) this.getInvoice(value.latest_invoice);
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getContacts({ nopaginate: true });
		this.getServices();
		this.getSubscriptions();
		this.checkCookie();
	},

	mounted() {
		if (this.$root.intros.subscriptions_index.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.intros.subscriptions_index.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			createContactSubscription: 'contacts/create_subscription',
			cancelContactSubscription: 'contacts/cancel_subscription',
			getServices: 'services/index'
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

		subscriptionAction(action, subscription) {
			let index = this.subscriptions.findIndex(x => x.id == subscription.id);
			this.subscriptions.splice(index, 1);
			axios.delete(`/stripe/subscriptions/${subscription.id}`);
		},

		async getSubscriptions() {
			this.loading = true;
			let response = await axios.get('/stripe/subscriptions');
			if (response) {
				this.subscriptions = response.data;
			}
			this.loading = false;
		},

		resetInvoiceForm() {
			this.newSubscriptionForm = {
				contact_id: '',
				loading: false,
				service_ids: []
			};
			this.openInfo = false;
		},

		getInvoice(invoice_id) {
			this.invoiceLoading = true;
			window.axios.get(`/get_invoice?invoice_id=${invoice_id}`).then(response => {
				this.invoiceLoading = false;
				if (this.selectedSubscription) {
					console.log(response.data);
					this.selectedSubscription.latest_invoice = response.data;
				}
			});
		},

		viewSubscription(subscription) {
			this.selectedSubscription = subscription;
			this.$refs['detailsModal'].show();
		},

		getCurrency(subscription) {
			return subscription.plan ? subscription.plan.currency : (this.$root.auth.stripe_account ? (((this.$root.auth.stripe_account.external_accounts || {}).data || [])[0] || {}).currency : false) || 'USD';
		},

		startSubscription(subscription) {
			this.$set(subscription, 'statusLoading', true);
			let data = {
				id: subscription.contact_id,
				date: subscription.date,
				duration: subscription.duration,
				duration_frequency: subscription.duration_frequency,
				recurring_frequency: subscription.recurring_frequency,
				services: subscription.services,
				amount: subscription.amount / 100
			};

			this.createContactSubscription(data)
				.then(() => {
					this.$set(subscription, 'statusLoading', false);
					this.deleteSubscription(subscription);
				})
				.catch(() => {
					this.$set(subscription, 'statusLoading', false);
				});
		},

		cancelSubscription(subscription) {
			this.$set(subscription, 'statusLoading', true);
			this.cancelContactSubscription(subscription)
				.then(() => {
					this.$set(subscription, 'statusLoading', false);
				})
				.catch(() => {
					this.$set(subscription, 'statusLoading', false);
				});
		},

		deleteSubscription(subscription) {
			if (!subscription.plan) {
				this.deletePendingSubscription(subscription);
			}
		},

		resetSubscriptionForm() {
			this.newSubscriptionForm = {
				loading: false,
				services: [],
				date: null,
				recurring_frequency: 'week',
				duration: 6,
				duration_frequency: 'month'
			};
			this.openInfo = false;
		},

		async createSubscription() {
			this.newSubscriptionForm.loading = true;
			this.newSubscriptionForm.id = this.newSubscriptionForm.contact_id;

			let data = JSON.parse(JSON.stringify(this.newSubscriptionForm));
			data.service_ids = data.service_ids.map(s => {
				return s.value;
			});

			let response = await window.axios.post('/stripe/subscriptions', data, { toast: true }).catch(() => {
				this.newSubscriptionForm.loading = false;
			});
			if (response) {
				this.subscriptions.unshift(response.data);
				this.newSubscriptionForm.loading = false;
			}
			this.$refs.createSubscriptionModal.hide(true);
		},

		timestampToDate(timestamp, time = true) {
			let date = new Date(timestamp * 1000);
			let format = 'mmm d, yyyy';
			if (time) format += ' h:MM TT';
			return dateFormat(date, format);
		},

		formatDate(date) {
			return dayjs.unix(date).format('MMM d, YYYY');
		}
	}
};
