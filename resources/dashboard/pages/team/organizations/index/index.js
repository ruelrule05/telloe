import { mapState, mapActions } from 'vuex';
import Modal from '../../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../../components/vue-checkbox/vue-checkbox.vue';
import VueButton from '../../../../../components/vue-button.vue';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import MoreIcon from '../../../../../icons/more-h';
import PlusIcon from '../../../../../icons/plus';
import TrashIcon from '../../../../../icons/trash';
import PencilIcon from '../../../../../icons/pencil';
import ClockIcon from '../../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../../icons/checkmark-circle';
import CloseIcon from '../../../../../icons/close';
import ShortcutIcon from '../../../../../icons/shortcut';
import tooltip from '../../../../../js/directives/tooltip.js';
const slugify = require('slugify');
import InfoCircleIcon from '../../../../../icons/info-circle.vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import VueDropdown from '../../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../../icons/cog';
import copy from 'copy-text-to-clipboard';

export default {
	components: {
		CogIcon,
		VueDropdown,
		Multiselect,
		InfoCircleIcon,
		Modal,
		VueFormValidate,
		VueCheckbox,
		VueButton,
		ToggleSwitch,

		MoreIcon,
		PlusIcon,
		TrashIcon,
		PencilIcon,
		ClockIcon,
		CheckmarkCircleIcon,
		CloseIcon,
		ShortcutIcon
	},

	directives: { tooltip },

	data: () => ({
		infoTab: '',
		addMember: false,
		selectedOrganization: null,
		newOrganization: {
			name: '',
			members: [],
			services: []
		},
		clonedOrganization: null,
		slugify: slugify,
		newMembers: []
	}),

	computed: {
		...mapState({
			ready: state => state.organizations.ready,
			organizations: state => state.organizations.index,
			members: state => state.members.index,
			services: state => state.services.index
		}),

		membersList() {
			let members = [];
			this.members.forEach(member => {
				if (!member.is_pending) {
					let memberCopy = Object.assign({}, member);
					members.push({
						name: memberCopy.member_user.full_name,
						email: memberCopy.member_user.email,
						value: memberCopy
					});
				}
			});
			return members;
		}
	},

	watch: {
		ready: function (value) {
			this.$root.contentloading = !value;
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getOrganizations();
		this.getMembers();
		this.getServices();
	},

	mounted() {
		if (this.$root.intros.organizations_index.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.intros.organizations_index.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getOrganizations: 'organizations/index',
			deleteOrganization: 'organizations/delete',
			storeOrganization: 'organizations/store',
			getMembers: 'members/index',
			updateOrganization: 'organizations/update',
			addOrganizationMembers: 'organizations/add_members',
			getServices: 'services/index'
		}),

		toggleNewService(service) {
			let index = this.newOrganization.services.findIndex(x => x == service.id);
			if (index > -1) {
				this.newOrganization.services.splice(index, 1);
			} else {
				this.newOrganization.services.push(service.id);
			}
		},

		toggleService(service) {
			let index = this.clonedOrganization.services.findIndex(x => x == service.id);
			if (index > -1) {
				this.clonedOrganization.services.splice(index, 1);
			} else {
				this.clonedOrganization.services.push(service.id);
			}
		},

		copyLink(e, organization) {
			this.$toast.clear();
			if (copy(`${process.env.MIX_APP_URL}/${organization.slug}`)) {
				this.$toast.open('Link copied to clipboard');
			}
			e.currentTarget.blur();
		},

		orgAction(action, org) {
			switch (action) {
				case 'Booking Page':
					window.open(`${process.env.MIX_APP_URL}/${org.slug}`, '_blank');
					break;
				case 'Edit':
					/* eslint-disable */
					let clonedOrganization = JSON.parse(JSON.stringify(org));
					clonedOrganization.members.forEach(m => {
						m.name = m.member.member_user.full_name;
						m.email = m.member.member_user.email;
					});
					this.clonedOrganization = clonedOrganization;
					this.$refs.editModal.show();
					break;

				case 'Delete':
					this.selectedOrganization = org;
					this.$refs.deleteModal.show();
					break;
			}
		},

		async confirmStoreOrganization() {
			let data = JSON.parse(JSON.stringify(this.newOrganization));
			data.members = data.members.map(m => {
				return { id: m.value.id };
			});
			await this.storeOrganization(data);
			this.resetForm();
		},

		resetForm() {
			this.newOrganization.name = '';
			this.newOrganization.slug = '';
			this.newOrganization.members = [];
			this.$refs['addModal'].hide();
		},

		async submitUpdate() {
			let data = JSON.parse(JSON.stringify(this.clonedOrganization));
			data.members = data.members.map(m => {
				return { id: m.value ? m.value.id : m.id };
			});
			this.updateOrganization(data);
			this.$refs.editModal.hide();
		},

		addMembers() {
			if (this.newMembers.length > 0) {
				this.addOrganizationMembers({ organization_id: this.clonedOrganization.id, member_ids: this.newMembers.map(member => member.id) }).then(response => {
					let organization = this.organizations.find(x => x.id == this.clonedOrganization.id);
					if (organization) {
						organization.members = response.data;
					}
					this.$refs['addMemberModal'].hide();
					this.newMembers = [];
				});
			}
		}
	}
};
