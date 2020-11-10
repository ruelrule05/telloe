import { mapState, mapActions } from 'vuex';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import ShortcutIcon from '../../../../../icons/shortcut';
import MoreIcon from '../../../../../icons/more-h';
import CloseIcon from '../../../../../icons/close';
import PencilIcon from '../../../../../icons/pencil';
import Modal from '../../../../../components/modal/modal.vue';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import PackageIcon from '../../../../../icons/package';
import PlusIcon from '../../../../../icons/plus';
const slugify = require('slugify');

export default {
	components: { ArrowLeftIcon, ShortcutIcon, MoreIcon, CloseIcon, PencilIcon, Modal, VueSelect, VueFormValidate, PackageIcon, PlusIcon },

	data: () => ({
		organization: null,
		clonedOrganization: null,
		selectedMember: null,
		newMembers: [],
		slugify: slugify
	}),

	computed: {
		...mapState({
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

	created() {
		this.getMembers();
		this.getOrganization(this.$route.params.id).then(organization => {
			this.organization = organization;
			this.clonedOrganization = Object.assign({}, organization);
			this.$root.contentloading = false;
		});
	},

	methods: {
		...mapActions({
			getMembers: 'members/index',
			deleteOrganizationMember: 'organizations/delete_member',
			addOrganizationMembers: 'organizations/add_members',
			getOrganization: 'organizations/show',
			updateOrganization: 'organizations/update'
		}),

		deleteMember() {
			let index = this.organization.members.findIndex(x => x.id == this.selectedMember.id);
			if (index > -1) {
				this.organization.members.splice(index, 1);
			}
			this.deleteOrganizationMember(this.selectedMember);
			this.$refs['deleteModal'].hide();
		},

		addMembers() {
			if (this.newMembers.length > 0) {
				this.addOrganizationMembers({ organization_id: this.organization.id, member_ids: this.newMembers.map(member => member.id) }).then(response => {
					this.organization.members = response.data;
					this.$refs['addMemberModal'].hide();
				});
			}
		}
	}
};
