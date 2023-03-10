/* global APP_NAME */
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
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../icons/cog';
import CheckmarkIcon from '../../../../icons/checkmark-circle';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import MessageIcon from '../../../../icons/comment';
import InfoCircleIcon from '../../../../icons/info-circle.vue';
import LinkedinIcon from '../../../../icons/linkedin';
import numbersOnly from 'numbers-only';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { isEmpty } from 'lodash';
const dayjs = require('dayjs');
const mobile = require('is-mobile');
//const ct = require('countries-and-timezones').default;
const countryCodes = require('country-codes-list');

export default {
	components: {
		LinkedinIcon,
		InfoCircleIcon,
		MessageIcon,
		CheckmarkIcon,
		Multiselect,
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
		Paginate,
		VueDropdown,
		CogIcon
	},

	data: () => ({
		banner: false,
		filterTags: [],
		actions: ['Edit', 'Delete'],
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
		userCustomFields: [],
		action: null,
		channel: null,
		csvFile: null,
		csvHeadings: [],
		csvMappings: [
			{
				label: 'Email',
				field: 'email',
				heading: '',
				required: true
			},
			{
				label: 'First Name',
				field: 'first_name',
				heading: ''
			},
			{
				label: 'Last Name',
				field: 'last_name',
				heading: ''
			},
			{
				label: 'Tags',
				field: 'tags',
				heading: ''
			},
			{
				label: 'Phone Number',
				field: 'phone_number',
				heading: ''
			}
		],
		csvContacts: [],
		csvPreview: false,
		page: 1,
		cookieItem: 'telloe_contacts_banner',
		isContactFormTab: true,
		dayjs: dayjs,
		numbersOnly: numbersOnly,
		getUnicodeFlagIcon: null,
		timezoneAreaCode: 'AU',
		editTimezoneAreaCode: 'AU',
		editContactDialCode: null,
		prefix: null
	}),

	computed: {
		...mapState({
			conversations: state => state.conversations.index,
			contacts: state => state.contacts.paginated,
			hasContacts: state => state.contacts.hasContacts,
			ready: state => state.contacts.ready,
			services: state => state.services.index,
			user_blacklisted_services: state => state.user_blacklisted_services.index,
			user_custom_fields: state => state.user_custom_fields.fields
		}),

		filteredContacts() {
			return this.contacts.data.filter(contact => {
				let query = this.query.trim().toLowerCase();
				let inFilter = true;
				let inQuery = true;
				if (this.filterTags.length) {
					inFilter = this.filterTags.some(arr => contact.tags.includes(arr));
				}
				if (query.length) {
					inQuery = contact.full_name.toLowerCase().includes(query) || contact.email.toLowerCase().includes(query);
				}
				return inFilter && inQuery;
			});
		},

		contactTags() {
			let contactTags = [];
			this.contacts.data.forEach(contact => {
				contact.tags.forEach(tag => {
					let exists = contactTags.find(x => x == tag);
					if (!exists) {
						contactTags.push(tag);
					}
				});
			});
			return contactTags;
		},

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
		ready: function (value) {
			this.$root.contentloading = !value;
		},

		query: function (value) {
			if (!value) {
				this.getContacts();
			}
		},

		page: function () {
			this.getData();
		},

		'newContact.phone_number': function (value) {
			let countryList = countryCodes.customList('countryCallingCode', '{countryCode}');
			Object.keys(countryList).forEach(key => {
				let countryCode = value == key ? countryList[key] : '';
				if (!isEmpty(countryCode)) {
					this.newContact.dial_code = '+' + value;
					this.prefix = value;
					this.timezoneAreaCode = countryCode;
					this.newContact.phone_number = ' ';
				}
			});
		},

		'clonedContact.phone_number': function (value) {
			let countryList = countryCodes.customList('countryCallingCode', '{countryCode}');
			Object.keys(countryList).forEach(key => {
				let countryCode = value == key ? countryList[key] : '';
				if (!isEmpty(countryCode)) {
					this.editContactDialCode = '+' + value;
					this.prefix = value;
					this.editTimezoneAreaCode = countryCode;
					this.clonedContact.phone_number = ' ';
				}
			});
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.userCustomFields = this.user_custom_fields;
		this.showUserCustomFields().then(data => {
			this.userCustomFields = data.fields;
			this.originalUserCustomFields = JSON.parse(JSON.stringify(data.fields));
		});
		this.getServices();
		this.getContacts();
		this.channel = this.$echo.private(`contacts.${this.$root.auth.id}`);
		this.channel.listen('ContactAcceptedEvent', e => {
			let contact = this.contacts.data.find(c => c.id == e.contact_id);
			if (contact) {
				contact.is_pending = false;
			}
		});
		this.checkCookie();
		this.isMobile = mobile();
		// this.$root.socket.on('invite_token', invite_token => {
		// 	if (invite_token) this.getContactFromInviteToken(invite_token);
		// });
		this.getUnicodeFlagIcon = getUnicodeFlagIcon;
		this.newContact.dial_code = '+61'; // default dial code set
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
			bulkStoreContact: 'contacts/bulkStore',
			updateContact: 'contacts/update',
			deleteContact: 'contacts/delete',
			getContactFromInviteToken: 'contacts/get_contact_from_invite_token',
			showUserCustomFields: 'user_custom_fields/show',
			storeUserCustomFields: 'user_custom_fields/store',
			storeConversation: 'conversations/store'
		}),

		updateField(e, index) {
			if (e.target.value.trim().length) {
				this.userCustomFields[index] = e.target.value.trim();
				this.updateUserCustomFields();
			}
		},

		checkCookie() {
			var match = document.cookie.match(new RegExp('(^| )' + this.cookieItem + '=([^;]+)'));
			if (!match) {
				this.banner = true;
			}
		},

		hideBanner() {
			this.banner = false;
			let expires = dayjs().add(2, 'year').format('ddd, D MMM YYYY H:m:s') + ' UTC';
			document.cookie = `${this.cookieItem}=true; expires=${expires}; path=/`;
		},

		async submitImportCsv() {
			if (this.csvFile && this.csvContacts.length > 0) {
				let contacts = [];
				this.csvContacts.forEach(contact => {
					if (contact[this.csvMappings[0].heading]) {
						let contactTags = this.csvMappings[3].heading ? contact[this.csvMappings[3].heading].split(',') : '';
						let number = this.csvMappings[4].heading ? contact[this.csvMappings[4].heading] : '';
						contacts.push({
							email: contact[this.csvMappings[0].heading],
							first_name: contact[this.csvMappings[1].heading],
							last_name: contact[this.csvMappings[2].heading],
							tags: contactTags,
							phone_number: number
						});
					}
				});
				this.$refs.importCsv.hide();
				await this.bulkStoreContact({ contacts: contacts });
				this.getContacts();
				this.resetCsvMappings();
			}
		},

		resetCsvMappings() {
			this.csvMappings.forEach(mapping => {
				mapping.heading = '';
			});
		},

		readCsv(e) {
			this.csvFile = e.srcElement.files[0];
			if (this.csvFile) {
				var reader = new FileReader();
				reader.onload = () => {
					let lines = reader.result.split('\n');
					this.csvHeadings = lines[0]
						.replaceAll('"', '')
						.split(',')
						.filter(x => x.trim().length > 0);
					delete lines[0];
					let csvContacts = [];
					lines.forEach(line => {
						line = line.replaceAll(' ', '');
						const regexLine = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
						if (regexLine) {
							if (regexLine[3]) {
								regexLine[3] = regexLine[3].replaceAll('"', '');
							}
							if (regexLine[4]) {
								regexLine[4] = regexLine[4].replaceAll('+', '');
								if (regexLine[4].length > 15) {
									this.$refs.importCsv.hide();
									return this.$toast.error('Please import correct number only');
								}
							}
							csvContacts.push(regexLine);
						}
					});
					this.csvContacts = csvContacts;
				};
				reader.readAsBinaryString(this.csvFile);
			}
		},

		contactAction(action, contact) {
			this.selectedContact = contact;

			switch (action) {
				case 'Edit':
					this.clonedContact = JSON.parse(JSON.stringify(contact));
					this.checkNumberCountryCode(this.clonedContact.phone_number);
					this.$refs.editModal.show();
					break;
				case 'Delete':
					this.$refs.deleteModal.show();
					break;
			}
		},

		async updateUserCustomFields() {
			if (this.newField.trim().length > 0) {
				this.userCustomFields.push(this.newField.trim());
			}
			this.newField = '';
			let response = await this.storeUserCustomFields(this.userCustomFields);
			this.userCustomFields = response.data.fields;
			this.originalUserCustomFields = JSON.parse(JSON.stringify(response.data.fields));
			//this.$refs['fieldsModal'].hide();
		},

		async goToConversation(contact) {
			let conversation = await this.storeConversation({ members: [contact.contact_user_id] });
			if (conversation) {
				this.$router.push(`/dashboard/conversations/${conversation.id}`);
			}
		},

		async getData() {
			this.getContacts({ page: this.page, query: this.query, status: this.contactStatus });
		},

		update(contact) {
			contact.phone_number = this.prefix + this.clonedContact.phone_number.replaceAll(' ', '');
			this.updateContact(contact);
			this.$refs['editModal'].hide();
		},

		goToContact(contact) {
			this.$router.push(`/dashboard/contacts/${contact.id}`);
		},

		resendEmail(contact) {
			this.resendLoading = true;
			window.axios.post(`/contacts/${contact.id}/resend`).then(() => {
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
				if (this.newContact.phone_number) {
					this.newContact.phone_number = this.prefix + this.newContact.phone_number.replaceAll(' ', '');
				}
				this.storeContact(this.newContact).then(() => {
					this.newContact = {
						custom_fields: {},
						blacklisted_services: [],
						sendToEmail: 1
					};
				});
				this.addContact = false;
			}
		},

		checkNumberCountryCode(value) {
			const phoneNumber = value;
			let first2Str = String(phoneNumber).slice(0, 2);
			let countryList = countryCodes.customList('countryCallingCode', '{countryCode}');
			Object.keys(countryList).forEach(key => {
				let countryCode = Number(first2Str) == key ? countryList[key] : '';
				if (!isEmpty(countryCode)) {
					this.editContactDialCode = '+' + Number(first2Str);
					this.editTimezoneAreaCode = countryCode;
					this.prefix = Number(first2Str);
					this.clonedContact.phone_number = String(phoneNumber).slice(2);
				}
			});
		}
	}
};
