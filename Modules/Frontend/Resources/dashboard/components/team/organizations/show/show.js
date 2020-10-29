import { mapState, mapActions } from 'vuex';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import ShortcutIcon from '../../../../../icons/shortcut';

export default {
	components: { ArrowLeftIcon, ShortcutIcon },

	data: () => ({
		organization: null
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
			getOrganization: 'organizations/show'
		})
	}
};
