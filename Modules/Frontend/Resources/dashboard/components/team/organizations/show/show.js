import { mapState, mapActions } from 'vuex';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import ShortcutIcon from '../../../../../icons/shortcut';
import MoreIcon from '../../../../../icons/more-h';
import Modal from '../../../../../components/modal/modal.vue';

export default {
	components: { ArrowLeftIcon, ShortcutIcon, MoreIcon, Modal },

	data: () => ({
		organization: null,
		selectedMember: null,
	}),

	computed: {
		...mapState({
			members: state => state.services.index
		})
	},

	created() {
		this.getMembers();
		this.getOrganization(this.$route.params.id).then(organization => {
			this.organization = organization;
			this.$root.contentloading = false;
		});
	},

	methods: {
		...mapActions({
			getMembers: 'members/index',
			deleteMember: 'organizations/delete_member',
			getOrganization: 'organizations/show'
		})
	}
};
