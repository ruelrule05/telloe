import {mapState, mapActions} from 'vuex';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import Info from '../conversations/show/info/info.vue';

import MoreHIcon from '../../../icons/more-h';
import PlusIcon from '../../../icons/plus';
import TrashIcon from '../../../icons/trash';
import PencilIcon from '../../../icons/pencil';
import ClockIcon from '../../../icons/clock';
import CheckmarkCircleIcon from '../../../icons/checkmark-circle';
import CloseIcon from '../../../icons/close';
export default {
	components: {
		Modal, 
		VueFormValidate, 
		ToggleSwitch,
        Info,

		MoreHIcon, 
		PlusIcon,
		TrashIcon,
		PencilIcon,
		ClockIcon,
		CheckmarkCircleIcon,
        CloseIcon,
	},

	data: () => ({
        openInfo: false,
		selectedContact: null,
        manageContact: false,
        manageFields: false,
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
            conversations: (state) => state.conversations.index,
            contacts: (state) => state.contacts.index,
            ready: (state) => state.contacts.ready,
            services: (state) => state.services.index,
            user_blacklisted_services: (state) => state.user_blacklisted_services.index,
		}),

        defaultEmailMessage() {
            return `${this.$root.auth.full_name} has invited you in ${APP_NAME}`;
        },

        blacklisted_services() {
            return this.user_blacklisted_services[(this.selectedContact.contact_user || {}).id] || [];
        },

        conversation() {
            let conversation = this.conversations.find(x => 
                x.members.length == 1 && x.member.id == this.selectedContact.contact_user.id
            );
            if(!conversation) {
                conversation = {
                    member: this.selectedContact.contact_user,
                    members: [this.selectedContact.contact_user],
                };
            }
            return conversation;
        },
	},

    watch: {
        ready: function(value) {
            this.$root.contentloading = !value;
        },
        manageContact: function(value) {
            if(value) this.openInfo = true;
        },
        manageFields: function(value) {
            if(value) this.openInfo = true;
        },
    },

	created() {
        this.$root.contentloading = !this.ready;
		this.getContacts();
		this.showUserCustomFields();
	},

	methods: {
        ...mapActions({
            getContacts: 'contacts/index',
            storeContact: 'contacts/store',
            deleteContact: 'contacts/delete',
            showUserCustomFields: 'user_custom_fields/show',
            storeUserCustomFields: 'user_custom_fields/store',
        }),

        closeInfo() {
            this.openInfo = false;
            setTimeout(() => {
                this.manageContact = false;
                this.manageFields = false;
            }, 150);
        },

        resetNewContact() {
            this.newContact = {
                custom_fields: {},
                blacklisted_services: []
            };
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
			}
		},
	}
}