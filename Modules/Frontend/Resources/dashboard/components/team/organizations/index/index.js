import { mapState, mapActions } from 'vuex';
import Modal from '../../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../../components/vue-checkbox/vue-checkbox.vue';
import VueButton from '../../../../../components/vue-button.vue';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
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

export default {
	components: {
		Modal,
		VueFormValidate,
		VueCheckbox,
		VueButton,
		VueSelect,
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
			members: []
		},
		clonedOrganization: null,
		selectedOrganization: null,
		slugify: slugify,
		newMembers: []
	}),

	computed: {
		...mapState({
			ready: state => state.organizations.ready,
			organizations: state => state.organizations.index,
			members: state => state.members.index
		}),

		membersList() {
			let members = [];
			this.members.forEach(member => {
				if (!member.is_pending) {
					let memberCopy = Object.assign({}, member);
					members.push({
						text: memberCopy.member_user.full_name,
						value: memberCopy
					});
				}
			});
			return members;
		}
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getOrganizations();
		this.getMembers();
	},

	mounted() {},

	methods: {
		...mapActions({
			getOrganizations: 'organizations/index',
			deleteOrganization: 'organizations/delete',
			storeOrganization: 'organizations/store',
			getMembers: 'members/index',
			updateOrganization: 'organizations/update',
			addOrganizationMembers: 'organizations/add_members'
		}),

		goToPage(slug) {
			window.open(`/${slug}`);
		},

		goToOrganization(id) {
			this.$router.push(`/dashboard/team/organizations/${id}`);
		},

		resetForm() {
			this.newOrganization.name = '';
			this.newOrganization.members = [];
			this.$refs['addModal'].hide();
		},

		async submitUpdate() {
			let data = await this.updateOrganization(this.clonedOrganization);
			this.organization = data;
			this.$refs['editModal'].hide();
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
