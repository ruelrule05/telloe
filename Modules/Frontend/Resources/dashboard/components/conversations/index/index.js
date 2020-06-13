import { mapState, mapActions } from 'vuex'

import VueFormValidate from '../../../../components/vue-form-validate';
import FormSearch from '../../../../components/form-search/form-search.vue';

import ArchiveIcon from '../../../../icons/archive';
import MoreHIcon from '../../../../icons/more-h';
import PlusIcon from '../../../../icons/plus';
import DownloadIcon from '../../../../icons/download';
import SearchIcon from '../../../../icons/search';
import CloseIcon from '../../../../icons/close';

export default {
	components: {
		VueFormValidate,
        FormSearch,

		ArchiveIcon, 
		MoreHIcon, 
		PlusIcon, 
		DownloadIcon,
		SearchIcon,
        CloseIcon,
	},

	data: () => ({
		conversationTab: 'active',
        newConversation: {
            members: [],
        },
	}),

	computed: {
		...mapState({
      		conversations: state => state.conversations.index,
      		ready: state => state.conversations.ready,
		}),

		orderedConversations() {
			let conversations = Object.assign([], this.conversations);
           	return conversations.sort((a, b) => {
                const a_timestamp = a.last_message.timestamp || a.timestamp;
                const b_timestamp = b.last_message.timestamp || b.timestamp;
                return (a_timestamp > b_timestamp) ? -1 : 1;
            });
		},
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
			if(value && !this.$route.params.id && this.conversations.length > 0) this.setConversation(this.orderedConversations[0]);
		}
	},

	created() {
		this.$root.contentloading = !this.ready;
		if(this.ready && !this.$route.params.id && this.conversations.length > 0) this.setConversation(this.orderedConversations[0]);
		this.getConversations();
	},

    mounted() {
        $('#newConversationModal').on('hidden.bs.modal', () => {
            this.newConversation.members = [];
            this.$refs['addNewConversationMembersForm'].query = '';
        });
    },

	methods: {
    	...mapActions({
      		getConversations: 'conversations/index',
      		storeConversation: 'conversations/store',
      		updateConversation: 'conversations/update',
    	}),

        addNewConversationMember(member) {
            if(!this.newConversation.members.find((x) => x.id == member.id)) this.newConversation.members.push(member)
        },

        createConversation() {
            if(this.newConversation.members.length > 0) {
                let member_ids = [];
                this.newConversation.members.forEach((m) => {
                    member_ids.push(m.id);
                });
                this.storeConversation({members: member_ids}).then((conversation) => {
                    if(conversation.id != this.$route.params.id) this.setConversation(conversation);
                });
                $('#newConversationModal').modal('hide');
            }
        },

        searchMembers(e, newConversation = true) {
            let chatTarget = newConversation ? this.newConversation : this;
            if(!chatTarget['searchingMembers']) {
                chatTarget['searchingMembers'] = true;
                setTimeout(() => {
                    axios.get(`/dashboard/users?search=${e.target.value.trim()}`).then((response) => {
                        chatTarget['groupMembersResults'] = response.data;
                    });
                    chatTarget['searchingMembers'] = false;
                }, 500);
            }
        },

        setConversation(conversation) {
        	if(conversation.id != this.$route.params.id) this.$router.push(`/dashboard/conversations/${conversation.id}`);
        }
	}
}