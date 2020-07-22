import { mapState, mapActions } from 'vuex';
import MoreHIcon from '../../assets/icons/more-h';
export default {
	components: {
		MoreHIcon,
	},
	
	data: () => ({
	}),

	computed: {
		...mapState({
      		users: state => state.users.index,
		}),
	},

	created() {
		this.getUsers()
	},

	methods: {
		...mapActions({
      		getUsers: 'users/index',
		}),
	}
}