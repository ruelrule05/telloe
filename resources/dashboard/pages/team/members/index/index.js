/* global APP_NAME */
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
import PackageIcon from '../../../../../icons/package';
import VueDropdown from '../../../../../components/vue-dropdown/vue-dropdown.vue';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import CogIcon from '../../../../../icons/cog';
import InfoCircleIcon from '../../../../../icons/info-circle.vue';

export default {
	components: {
		InfoCircleIcon,
		CogIcon,
		VueDropdown,
		VueSelect,
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
		PackageIcon
	},

	data: () => ({
		infoTab: '',
		selectedMember: null,
		manageMember: false,
		manageFields: false,
		addMember: false,
		newMember: {
			custom_fields: {},
			assigned_services: [],
			sendToEmail: 1
		},
		activeTab: 'custom_fields',
		selectedFile: null,
		addField: false,
		newField: '',
		resendLoading: false,
		clonedMember: null,
		memberStatuses: [
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
		memberStatus: 'All',
		query: ''
	}),

	computed: {
		...mapState({
			ready: state => state.members.ready,
			services: state => state.services.index,
			members: state => state.members.index
		}),

		defaultEmailMessage() {
			return `${this.$root.auth.full_name} has invited you as a member in ${APP_NAME}`;
		}
	},

	watch: {
		ready: function (value) {
			this.$root.contentloading = !value;
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getServices();
		this.getMembers();
		// this.$root.socket.on('member_invite_token', invite_token => {
		// 	if (invite_token) this.getMemberFromInviteToken(invite_token);
		// });
	},

	mounted() {
		if (this.$root.intros.members_index.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.intros.members_index.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			getMembers: 'members/index',
			storeMember: 'members/store',
			updateMember: 'members/update',
			deleteMember: 'members/delete',
			getMemberFromInviteToken: 'members/get_member_from_invite_token'
		}),

		actions(member) {
			let actions = ['Edit', 'Delete'];
			if (member.is_pending) {
				actions = ['Edit', 'Resend Invitation', 'Delete'];
			}
			return actions;
		},

		memberAction(action, member) {
			this.selectedMember = member;
			let clonedMember = JSON.parse(JSON.stringify(member));
			switch (action) {
				case 'Edit':
					clonedMember.assigned_services = clonedMember.assigned_services.map(x => x.parent_service_id);
					this.clonedMember = clonedMember;
					this.$refs.editModal.show();
					break;
				case 'Resend Invitation':
					this.$refs.resendModal.show();
					break;
				case 'Delete':
					this.$refs.deleteModal.show();
					break;
			}
		},

		getData() {},

		update() {
			this.updateMember(this.clonedMember);
			this.$refs['editModal'].hide();
		},

		goToMember(member_id) {
			this.$router.push(`/dashboard/team/members/${member_id}`);
		},

		resendEmail(member) {
			this.resendLoading = true;
			window.axios.post(`/members/${member.id}/resend`).then(() => {
				this.resendLoading = false;
				this.$refs['resendModal'].hide();
				this.$toast.open('Invitation email has been sent successfully.');
			});
		},

		editMember(member) {
			let clonedMember = JSON.parse(JSON.stringify(member));
			clonedMember.assigned_services = clonedMember.assigned_services.map(x => x.parent_service_id);
			this.clonedMember = clonedMember;
			this.$refs['editModal'].show();
		},

		toggleMemberAssignedService(service) {
			let index = this.clonedMember.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.clonedMember.assigned_services.splice(index, 1);
			} else {
				this.clonedMember.assigned_services.push(service.id);
			}
		},

		toggleAssignedService(service) {
			let index = this.newMember.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.newMember.assigned_services.splice(index, 1);
			} else {
				this.newMember.assigned_services.push(service.id);
			}
		},

		resetNewMember() {
			this.newMember = {
				custom_fields: {},
				assigned_services: []
			};
		},

		store() {
			if (this.newMember.email) {
				this.storeMember(this.newMember).then(() => {
					this.newMember = {
						custom_fields: {},
						assigned_services: [],
						sendToEmail: 1
					};
				});
				this.$refs['addModal'].hide();
			}
		}
	}
};
