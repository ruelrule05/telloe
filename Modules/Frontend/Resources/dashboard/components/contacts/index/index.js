import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
import VueButton from '../../../../components/vue-button.vue';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import Info from '../../conversations/show/info/info.vue';

import MoreIcon from '../../../../icons/more';
import PlusIcon from '../../../../icons/plus';
import TrashIcon from '../../../../icons/trash';
import PencilIcon from '../../../../icons/pencil';
import ClockIcon from '../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import CloseIcon from '../../../../icons/close';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import Paginate from '../../../../components/paginate/paginate.vue';
export default {
	components: {
		Modal,
		VueFormValidate,
		VueCheckbox,
		VueButton,
		ToggleSwitch,
		Info,

		MoreIcon,
		PlusIcon,
		TrashIcon,
		PencilIcon,
		ClockIcon,
		CheckmarkCircleIcon,
		CloseIcon,
		VueSelect,
		Paginate
	},

	data: () => ({
		infoTab: '',
		selectedContact: null,
		manageContact: false,
		manageFields: false,
		addContact: false,
		newContact: {
			custom_fields: {},
			blacklisted_services: [],
			sendToEmail: 1
		},
		activeTab: 'custom_fields',
		selectedFile: null,
		addField: false,
		newField: '',
		resendLoading: false,
		clonedContact: null,
		contactStatuses: [
			{
				text: 'All',
				value: 'all'
			},
			{
				text: 'Accepted',
				value: 'accepted'
			},
			{
				text: 'Pending',
				value: 'pending'
			}
		],
		contactStatus: 'all',
		query: '',
		originalUserCustomFields: [],
		userCustomFields: []
	}),

	computed: {
		...mapState({
			conversations: state => state.conversations.index,
			contacts: state => state.contacts.paginated,
			hasContacts: state => state.contacts.hasContacts,
			ready: state => state.contacts.ready,
			services: state => state.services.index,
			user_blacklisted_services: state => state.user_blacklisted_services.index
		}),

		defaultEmailMessage() {
			return `${this.$root.auth.full_name} has invited you in ${APP_NAME}`;
		},

		blacklisted_services() {
			return this.user_blacklisted_services[(this.selectedContact.contact_user || {}).id] || [];
		},

		conversation() {
			if (!this.selectedContact) return {};

			let conversation = this.conversations.find(x => x.members.length == 1 && x.member.id == this.selectedContact.contact_user.id);
			if (!conversation) {
				this.$root.auth.services = this.services;
				conversation = {
					ready: true,
					member: this.selectedContact.contact_user,
					members: [this.selectedContact.contact_user],
					user: this.$root.auth,
					user_id: this.$root.auth.id
				};
			} else {
				if (!this.selectedContact.ready) {
					this.showConversation({ id: conversation.id }).then(() => {
						conversation.files = null;
						this.$root.getFiles(conversation);
					});
				}
			}

			conversation.member.contact = this.selectedContact;
			this.selectedContact.ready = true;

			return conversation;
		}
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.showUserCustomFields().then(data => {
			this.userCustomFields = data.fields;
			this.originalUserCustomFields = JSON.parse(JSON.stringify(data.fields));
		});
		this.getServices();
		this.getContacts();
		this.$root.socket.on('invite_token', invite_token => {
			if (invite_token) this.getContactFromInviteToken(invite_token);
		});
	},

	mounted() {
		if (this.$root.intros.contacts_index.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.intros.contacts_index.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			getContacts: 'contacts/index',
			storeContact: 'contacts/store',
			updateContact: 'contacts/update',
			deleteContact: 'contacts/delete',
			getContactFromInviteToken: 'contacts/get_contact_from_invite_token',
			showUserCustomFields: 'user_custom_fields/show',
			storeUserCustomFields: 'user_custom_fields/store',
			storeConversation: 'conversations/store'
		}),

		async updateUserCustomFields() {
			if (this.newField.trim().length > 0) {
				this.userCustomFields.push(this.newField.trim());
			}
			this.newField = '';
			let response = await this.storeUserCustomFields(this.userCustomFields);
			this.userCustomFields = response.data.fields;
			this.originalUserCustomFields = JSON.parse(JSON.stringify(response.data.fields));
			this.$refs['fieldsModal'].hide();
		},

		async goToConversation(contact) {
			let conversation = await this.storeConversation({ members: [contact.contact_user_id] });
			if (conversation) {
				this.$router.push(`/dashboard/conversations/${conversation.id}`);
			}
		},

		async getData(page = this.contact.current_page) {
			this.getContacts({ page: page, query: this.query, status: this.contactStatus });
		},

		update(contact) {
			this.updateContact(contact);
			this.$refs['editModal'].hide();
		},

		goToContact(contact) {
			this.$router.push(`/dashboard/contacts/${contact.id}`);
		},

		resendEmail(contact) {
			this.resendLoading = true;
			axios.post(`/contacts/${contact.id}/resend`).then(() => {
				this.resendLoading = false;
				this.$refs['resendModal'].hide();
				this.$toasted.show('Invitation email has been sent successfully.');
			});
		},

		toggleContactServiceBlacklist(service, contact) {
			let index = contact.blacklisted_services.findIndex(x => x == service.id);
			if (index > -1) {
				contact.blacklisted_services.splice(index, 1);
			} else {
				contact.blacklisted_services.push(service.id);
			}
		},

		toggleServiceBlacklist(service) {
			let index = this.newContact.blacklisted_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.newContact.blacklisted_services.splice(index, 1);
			} else {
				this.newContact.blacklisted_services.push(service.id);
			}
		},

		openFile(file) {
			if (file.type == 'file') this.$root.downloadMedia(file);
			else this.selectedFile = file;
		},

		resetNewContact() {
			this.newContact = {
				custom_fields: {},
				blacklisted_services: []
			};
		},

		addNewField() {
			if (this.newField.trim().length > 0) {
				this.$root.auth.custom_fields.push(this.newField);
				this.newField = '';
				this.addField = false;
			}
			this.storeUserCustomFields();
			this.$refs['fieldsModal'].hide();
		},

		updateCustomField(index) {
			this.$root.auth.custom_fields[index] = this.editCustomField;
			this.storeUserCustomFields();
			this.$refs['customFieldsLabel'].click();
		},

		store() {
			if (this.newContact.email) {
				this.storeContact(this.newContact).then(() => {
					this.newContact = {
						custom_fields: {},
						blacklisted_services: [],
						sendToEmail: 1
					};
				});
				this.$refs['addModal'].hide();
			}
		}
	}
};
