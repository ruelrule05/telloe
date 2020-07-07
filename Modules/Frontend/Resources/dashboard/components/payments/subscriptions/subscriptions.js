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
		newSubscriptionForm: {
			loading: false,
			service_ids: [],
			service_bookings: {},
		}
	}),

	computed: {
		...mapState({
            ready: (state) => state.contacts.ready,
            contacts: (state) => state.contacts.index,
            services: (state) => state.services.index,
		}),

		stripeCustomers() {
			let customers = [];
			this.contacts.forEach((contact) => {
				if(contact.contact_user.stripe_customer_id) {
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
	},

	mounted() {
	},

	methods: {
        ...mapActions({
            getUserCustomers: 'contacts/index',
            createUserCustomerSubscription: 'contacts/create_subscription',
            getServices: 'services/index',
        }),

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

        async createSubscription() {
        	this.newSubscriptionForm.loading = true;
        	this.newSubscriptionForm.id = this.newSubscriptionForm.customer_id;
        	this.newSubscriptionForm.services = [];
        	this.newSubscriptionForm.service_ids.forEach(service_id => {
        		this.newSubscriptionForm.services.push({
        			id: service_id,
        			bookings_count: this.newSubscriptionForm.service_bookings[service_id]
        		});
        	});
        	await this.createUserCustomerSubscription(this.newSubscriptionForm);
        	this.$refs['createSubscriptionModal'].hide();
        },

        formatDate(date) {
        	return dayjs.unix(date).format('MMM d, YYYY h:mmA');
        }
	}
}