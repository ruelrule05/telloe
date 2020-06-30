import {mapState, mapActions} from 'vuex';
import MoreHIcon from '../../../../icons/more-h';
export default {
	components: {
		MoreHIcon
	},

	data: () => ({
		subscribers: []
	}),

	computed: {
		...mapState({
      		ready: state => state.user_customers.ready,
      		customers: state => state.user_customers.index,
      		conversations: state => state.conversations.index,
		}),
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		this.getUserCustomers();
		this.getConversations();
	},

	mounted() {
		this.subscribers.push({customer: this.$root.auth});
	},

	methods: {
        ...mapActions({
      		getUserCustomers: 'user_customers/index',
      		getConversations: 'conversations/index',
        }),

        hasConversation(customer) {
        	return this.conversations.find((c) => {
        		return c.members.find((m) => m.user_id == customer.customer_id && m.user_id != this.$root.auth.id) || c.user_customer_id == customer.id;
        	});
        },

        goToConversation(customer) {
        	let conversation = this.conversations.find((c) => {
        		return c.members.find((m) => m.user_id == customer.customer_id && m.user_id != this.$root.auth.id) || c.user_customer_id == customer.id;
        	});
        	if(conversation) this.$router.push(`/dashboard/conversations/${conversation.id}?tab=profile`);
        },
	}
}