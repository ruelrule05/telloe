import { mapState, mapActions } from 'vuex';
import Modal from '../../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../../../components/vue-checkbox/vue-checkbox.vue';
import VueButton from '../../../../../components/vue-button.vue';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';

import MoreIcon from '../../../../../icons/more';
import PlusIcon from '../../../../../icons/plus';
import TrashIcon from '../../../../../icons/trash';
import PencilIcon from '../../../../../icons/pencil';
import ClockIcon from '../../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../../icons/checkmark-circle';
import CloseIcon from '../../../../../icons/close';
import ShortcutIcon from '../../../../../icons/shortcut';
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

	data: () => ({
		infoTab: '',
		addMember: false,
		selectedOrganization: null,
		newOrganization: {
			name: '',
			members: []
		}
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
			storeOrganization: 'organizations/store',
			getMembers: 'members/index'
		}),

		goToOrganization(id) {
			this.$router.push(`/dashboard/team/organizations/${id}`);
		},

		resetForm() {
			this.newOrganization.name = '';
			this.newOrganization.members = [];
		}
	}
};
