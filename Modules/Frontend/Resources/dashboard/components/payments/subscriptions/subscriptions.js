import {mapState, mapActions} from 'vuex';
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

export default {
	components: {
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
	},

	directives: {Tooltip},

	data: () => ({
		newSubscriptionForm: {
			loading: false,
			services: [],
			date: null,
			recurring_frequency: 'week',
			duration: 6,
			duration_frequency: 'month',
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
			},
		],
		paginate: ['subscriptions'],
		subscriptionStatuses: [
			{ 
				'text': 'All', 
				'value': 'all' 
			},
			{ 
				'text': 'Trialing', 
				'value': 'trialing' 
			},
			{ 
				'text': 'Canceled', 
				'value': 'canceled' 
			},
			{ 
				'text': 'Draft', 
				'value': 'draft' 
			},
		],
		subscriptionStatus: 'all',
		hasSubscriptions: false,
	}),

	computed: {
		...mapState({
            ready: (state) => state.contacts.ready,
            contacts: (state) => state.contacts.index,
            services: (state) => state.services.index,
            pending_subscriptions: (state) => state.pending_subscriptions.index,
		}),

		subscriptionTotal() {
			let total = 0;
			this.newSubscriptionForm.services.forEach(service => {
				total += (service.rate * service.frequency);
			});
			return total.toFixed(2);
		},

		stripeCustomers() {
			let customers = [];
			this.contacts.forEach((contact) => {
				if(!contact.is_pending) {
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
			this.services.forEach((service) => {
				if(service.is_available) {
					let serviceCopy =  Object.assign({}, service);
					serviceCopy.frequency = 1;
					serviceCopy.frequency_interval = 'day';
					serviceCopy.rate = service.default_rate;
					services.push({
						text: serviceCopy.name,
						value: serviceCopy
					});
				}
			});
			return services;
		},

		subscriptions() {
			let subscriptions = [];
			this.contacts.forEach((contact) => {
				contact.subscriptions.forEach((subscription) => {
					subscription.contact = contact;
					this.$set(subscription, 'statusLoading', false);
					if(this.subscriptionStatus == 'all' || this.subscriptionStatus == subscription.status) {
						if(subscription.status == 'trialing') subscription.status = 'pending';
						subscriptions.push(subscription);
					}
				})
			});
			subscriptions = subscriptions.concat(this.pending_subscriptions);
			subscriptions.sort((a, b) => {
				return (a.created > b.created) ? -1 : 1;
			});
			if(subscriptions.length > 0) {
				this.hasSubscriptions = true;
			} else {
				subscriptions.push({ 'placeholder': true });
				this.hasSubscriptions = false;
			}
			return subscriptions;
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
		this.getPendingSubscriptions();
	},

	mounted() {
	},

	methods: {
        ...mapActions({
            getUserCustomers: 'contacts/index',
            createContactSubscription: 'contacts/create_subscription',
            cancelContactSubscription: 'contacts/cancel_subscription',
            getServices: 'services/index',
            getPendingSubscriptions: 'pending_subscriptions/index',
            storePendingSubscription: 'pending_subscriptions/store',
            deletePendingSubscription: 'pending_subscriptions/delete',
		}),

		viewSubscription(subscription) {
			this.selectedSubscription = subscription; 
			this.$refs['detailsModal'].show()
		},
		
        getCurrency(subscription) {
        	return subscription.plan ? subscription.plan.currency : (this.$root.auth.stripe_account ? (((this.$root.auth.stripe_account.external_accounts || {}).data || [])[0] || {}).currency : false) || 'USD';
        },

        startSubscription(subscription) {
        	this.$set(subscription, 'statusLoading', true);
        	let data = {
        		'id': subscription.contact_id,
        		'date': subscription.date,
        		'duration': subscription.duration,
        		'duration_frequency': subscription.duration_frequency,
        		'recurring_frequency': subscription.recurring_frequency,
        		'services': subscription.services,
        		'amount': subscription.amount / 100,
        	};

        	this.createContactSubscription(data).then(() => {
        		this.$set(subscription, 'statusLoading', false);
        		this.deleteSubscription(subscription);
        	}).catch(() => {
        		this.$set(subscription, 'statusLoading', false);
        	});
        },

        cancelSubscription(subscription) {
        	this.$set(subscription, 'statusLoading', true);
			this.cancelContactSubscription(subscription).then(() => {
        		this.$set(subscription, 'statusLoading', false);
        	}).catch(() => {
        		this.$set(subscription, 'statusLoading', false);
        	});
        },

        deleteSubscription(subscription) {
        	if(!subscription.plan) {
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
				duration_frequency: 'month',
			};
			this.openInfo = false;
        },

        createSubscription() {
        	this.newSubscriptionForm.loading = true;
        	this.newSubscriptionForm.id = this.newSubscriptionForm.contact_id;
    
        	if(this.$root.payoutComplete) {
	        	this.createContactSubscription(this.newSubscriptionForm).then(() => {
	        		this.resetSubscriptionForm();
	        		this.openInfo = false;
	        	}).catch(() => {
	        		this.newSubscriptionForm.loading = false;
	        	});
        	} else {
        		this.newSubscriptionForm.date = dayjs(this.newSubscriptionForm.date).format('YYYY-MM-DD')
	        	this.storePendingSubscription(this.newSubscriptionForm).then(() => {
	        		this.resetSubscriptionForm();
	        	}).catch(() => {
	        		this.newSubscriptionForm.loading = false;
	        	});
        	}
		},
		
		timestampToDate(timestamp, time = true) {
			let date = new Date(timestamp * 1000);
			let format = 'mmm d, yyyy';
			if(time) format += ' h:MM TT';
			return dateFormat(date, format);
		},
 
        formatDate(date) {
        	return dayjs.unix(date).format('MMM d, YYYY');
        }
	}
}