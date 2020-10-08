import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
import VueButton from '../../../../components/vue-button.vue';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';

import MoreIcon from '../../../../icons/more';
import PlusIcon from '../../../../icons/plus';
import TrashIcon from '../../../../icons/trash';
import PencilIcon from '../../../../icons/pencil';
import ClockIcon from '../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import CloseIcon from '../../../../icons/close';
export default {
	components: {
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
		CloseIcon
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
		resendLoading: false
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
		ready: function(value) {
			this.$root.contentloading = !value;
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getServices();
		this.getMembers();
		this.$root.socket.on('member_invite_token', invite_token => {
			if (invite_token) this.getMemberFromInviteToken(invite_token);
		});
	},

	mounted() {
		if (this.$root.intros.add_member.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.introJS.start().goToStepNumber(this.$root.intros.add_member.step);
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			getMembers: 'members/index',
			storeMember: 'members/store',
			deleteMember: 'members/delete',
			getMemberFromInviteToken: 'members/get_member_from_invite_token'
		}),

		goToMember(member_id) {
			this.$router.push(`/dashboard/members/${member_id}`);
		},

		resendEmail(member) {
			this.resendLoading = true;
			axios.post(`/members/${member.id}/resend`).then(() => {
				this.resendLoading = false;
				this.$refs['resendModal'].hide();
				this.$toasted.show('Invitation email has been sent successfully.');
			});
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
				this.infoTab = '';
			}
		}
	}
};
