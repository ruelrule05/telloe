import {mapState, mapActions} from 'vuex';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';

import MoreHIcon from '../../../icons/more-h';
import PlusIcon from '../../../icons/plus';
import TrashIcon from '../../../icons/trash';
import PencilIcon from '../../../icons/pencil';
import ClockIcon from '../../../icons/clock';
import CheckmarkCircleIcon from '../../../icons/checkmark-circle';
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
		selectedContact: null,
		newContact: {
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
            contacts: (state) => state.contacts.index,
            ready: (state) => state.contacts.ready,
            services: (state) => state.services.index,
		}),

        defaultEmailMessage() {
            return `${this.$root.auth.full_name} has invited you in ${APP_NAME}`;
        },
	},

    watch: {
        ready: function(value) {
            this.$root.contentloading = !value;
        }
    },

	created() {
        this.$root.contentloading = !this.ready;
		this.getContacts();
		this.showUserCustomFields();
		this.getServices();
		this.getConversations();
	},

	methods: {
        ...mapActions({
            getContacts: 'contacts/index',
            storeContact: 'contacts/store',
            deleteContact: 'contacts/delete',
            showUserCustomFields: 'user_custom_fields/show',
            storeUserCustomFields: 'user_custom_fields/store',
            getServices: 'services/index',
      		getConversations: 'conversations/index',
        }),

        resetNewContact() {
            this.newContact = {
                custom_fields: {},
                blacklisted_services: []
            };
        },

        hasConversation(contact) {
        	return this.conversations.find((c) => {
        		return c.members.find((m) => m.user_id == contact.contact_id && m.user_id != this.$root.auth.id) || c.user_contact_id == contact.id;
        	});
        },

        goToConversation(contact) {
        	let conversation = this.conversations.find((c) => {
        		return c.members.find((m) => m.user_id == contact.contact_id && m.user_id != this.$root.auth.id) || c.user_contact_id == contact.id;
        	});
        	if(conversation) this.$router.push(`/dashboard/conversations/${conversation.id}?tab=profile`);
        },

        toggleServiceBlacklist(state, service) {
        	if(!this.newContact.blacklisted_services) this.newContact.blacklisted_services = [];
        	if(state) {
        		let index = this.newContact.blacklisted_services.findIndex((x) => x == service.id);
        		if(index > -1) {
        			this.newContact.blacklisted_services.splice(index, 1);
        		}
        	} else {
        		if(!this.newContact.blacklisted_services.find((x) => x == service.id)) this.newContact.blacklisted_services.push(service.id);
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
			if(this.newContact.email) {
				this.$refs['addModal'].hide();
				this.storeContact(this.newContact);
				this.$refs['addModal'].hide();
			}
		},
	}
}