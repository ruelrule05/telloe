import {mapState, mapActions} from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';

import MoreHIcon from '../../../../icons/more-h';
import PlusIcon from '../../../../icons/plus';
import TrashIcon from '../../../../icons/trash';
import PencilIcon from '../../../../icons/pencil';
import ClockIcon from '../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
export default {
	components: {
		Modal, 
		VueFormValidate, 
		ToggleSwitch,

		MoreHIcon, 
		PlusIcon,
		TrashIcon,
		PencilIcon,
		ClockIcon,
		CheckmarkCircleIcon,
	},

	data: () => ({
		selectedCustomer: null,
		newCustomer: {
			custom_fields: {},
			blacklisted_services: []
		},
		activeTab: 'custom_fields',
		newCustomField: '',
		editCustomField: '',
	}),

	computed: {
		...mapState({
      		conversations: state => state.conversations.index,
            user_customers: (state) => state.user_customers.index,
            ready: (state) => state.user_customers.ready,
            services: (state) => state.services.index,
		}),
	},

    watch: {
        ready: function(value) {
            this.$root.contentloading = !value;
        }
    },

	created() {
        this.$root.contentloading = !this.ready;
		this.getUserCustomers();
		this.showUserCustomFields();
		this.getServices();
		this.getConversations();
	},

	methods: {
        ...mapActions({
            getUserCustomers: 'user_customers/index',
            storeUserCustomer: 'user_customers/store',
            deleteUserCustomer: 'user_customers/delete',
            showUserCustomFields: 'user_custom_fields/show',
            storeUserCustomFields: 'user_custom_fields/store',
            getServices: 'services/index',
      		getConversations: 'conversations/index',
        }),

        resetNewCustomer() {
            this.newCustomer = {
                custom_fields: {},
                blacklisted_services: []
            };
        },

        hasConversation(customer) {
        	return this.conversations.find((c) => {
        		return c.members.find((m) => m.user_id == customer.customer_id && m.user_id != this.$root.auth.id) || c.user_customer_id == customer.id;
        	});
        },

        goToConversation(customer) {
        	let conversation = this.conversations.find((c) => {
        		return c.members.find((m) => m.user_id == customer.customer_id && m.user_id != this.$root.auth.id) || c.user_customer_id == customer.id;
        	});
        	if(conversation) this.$router.push(`/dashboard/conversations/${conversation.id}?tab=profile`);
        },

        toggleServiceBlacklist(state, service) {
        	if(!this.newCustomer.blacklisted_services) this.newCustomer.blacklisted_services = [];
        	if(state) {
        		let index = this.newCustomer.blacklisted_services.findIndex((x) => x == service.id);
        		if(index > -1) {
        			this.newCustomer.blacklisted_services.splice(index, 1);
        		}
        	} else {
        		if(!this.newCustomer.blacklisted_services.find((x) => x == service.id)) this.newCustomer.blacklisted_services.push(service.id);
        	}
        },
        
        updateCustomField(index) {
        	this.$root.auth.custom_fields[index] = this.editCustomField;
            this.storeUserCustomFields();
            this.$refs['customFieldsLabel'].click();
        },

        addCustomField() {
        	if(!this.$root.auth.custom_fields) Vue.set(this.$root.auth, 'custom_fields', []);
            this.$root.auth.custom_fields.unshift(this.newCustomField);
            this.storeUserCustomFields();
            this.resetCustomField(); 
        },

        resetCustomField() {
            this.newCustomField = '';
            this.$refs['customFieldsLabel'].click();
        },

		store() {
			if(this.newCustomer.email) {
				this.$refs['addModal'].hide();
				this.storeUserCustomer(this.newCustomer);
				this.$refs['addModal'].hide();
			}
		},
	}
}