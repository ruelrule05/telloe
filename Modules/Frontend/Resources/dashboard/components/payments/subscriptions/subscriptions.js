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
import BlockIcon from '../../../../icons/block';
import TrashIcon from '../../../../icons/trash';
import dayjs from 'dayjs';
import Tooltip from '../../../../js/directives/tooltip';
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
		BlockIcon,
		TrashIcon,
	},

	directives: {Tooltip},

	data: () => ({
		newSubscriptionForm: {
			loading: false,
			service_ids: [],
			service_bookings: {},
		},
		selectedSubscription: null,
	}),

	computed: {
		...mapState({
            ready: (state) => state.contacts.ready,
            contacts: (state) => state.contacts.index,
            services: (state) => state.services.index,
            pending_subscriptions: (state) => state.pending_subscriptions.index,
		}),

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
				services.push({
					text: service.name,
					value: service.id
				});
			});
			return services;
		},

		subscriptions() {
			let subscriptions = [];
			this.contacts.forEach((contact) => {
				contact.subscriptions.forEach((subscription) => {
					subscription.contact = contact;
					this.$set(subscription, 'statusLoading', false);
					subscriptions.push(subscription);
				})
			});
			subscriptions = subscriptions.concat(this.pending_subscriptions);
			subscriptions.sort((a, b) => {
				return (a.created > b.created) ? -1 : 1;
			});
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

        getCurrency(subscription) {
        	return subscription.plan ? subscription.plan.currency : (this.$root.auth.stripe_account ? (((this.$root.auth.stripe_account.external_accounts || {}).data || [])[0] || {}).currency : false) || 'USD';
        },

        startSubscription(subscription) {
        	this.$set(subscription, 'statusLoading', true);
        	let data = {
        		'id': subscription.contact_id,
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

        getServiceName(service_id) {
        	return this.services.find(x => x.id == service_id).name;
        },

        resetSubscriptionForm() {
        	this.newSubscriptionForm = {
        		loading: false,
        		service_ids: [],
				service_bookings: {},
        	}
        },

        createSubscription() {
        	this.newSubscriptionForm.loading = true;
        	this.newSubscriptionForm.id = this.newSubscriptionForm.contact_id;
        	this.newSubscriptionForm.services = [];
        	this.newSubscriptionForm.service_ids.forEach(service_id => {
        		this.newSubscriptionForm.services.push({
        			id: service_id,
        			bookings_count: this.newSubscriptionForm.service_bookings[service_id]
        		});
        	});
        	if(this.$root.payoutComplete) {
	        	this.createContactSubscription(this.newSubscriptionForm).then(() => {
	        		this.$refs['createSubscriptionModal'].hide();
	        	}).catch(() => {
	        		this.newSubscriptionForm.loading = false;
	        	});
        	} else {
	        	this.storePendingSubscription(this.newSubscriptionForm).then(() => {
	        		this.$refs['createSubscriptionModal'].hide();
	        	}).catch(() => {
	        		this.newSubscriptionForm.loading = false;
	        	});
        	}
        },

        formatDate(date) {
        	return dayjs.unix(date).format('MMM d, YYYY h:mmA');
        }
	}
}