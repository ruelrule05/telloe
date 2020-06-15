import {mapState, mapActions} from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';

import MoreHIcon from '../../../../icons/more-h';
import PlusIcon from '../../../../icons/plus';
import TrashIcon from '../../../../icons/trash';
import PencilIcon from '../../../../icons/pencil';
export default {
	components: {
		Modal, 
		VueFormValidate, 

		MoreHIcon, 
		PlusIcon,
		TrashIcon,
		PencilIcon,
	},

	data: () => ({
		selectedCustomer: {},
		activeTab: 'custom_fields',
		newCustomField: '',
		editCustomField: '',
	}),

	computed: {
		...mapState({
            user_customers: (state) => state.user_customers.index,
            ready: (state) => state.user_customers.ready,
		}),
	},

	created() {
		this.getUserCustomers();
		this.showUserCustomFields();
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
        ...mapActions({
            getUserCustomers: 'user_customers/index',
            storeUserCustomer: 'user_customers/store',
            deleteUserCustomer: 'user_customers/delete',
            showUserCustomFields: 'user_custom_fields/show',
            storeUserCustomFields: 'user_custom_fields/store',
        }),
        
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
			if(this.selectedCustomer.email) {
				this.$refs['addModal'].hide();
				this.storeUserCustomer(this.selectedCustomer);
				this.$refs['addModal'].hide();
			}
		},
	}
}