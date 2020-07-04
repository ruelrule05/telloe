import { mapState, mapActions } from 'vuex';

import VueFormValidate from '../../../../components/vue-form-validate';
import FormSearch from '../../../../components/form-search/form-search.vue';

import ArchiveIcon from '../../../../icons/archive';
import MoreHIcon from '../../../../icons/more-h';
import PlusIcon from '../../../../icons/plus';
import DownloadIcon from '../../../../icons/download';
import SearchIcon from '../../../../icons/search';
import CloseIcon from '../../../../icons/close';
import VideoIcon from '../../../../icons/video';

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
        VideoIcon,
	},

	data: () => ({
		conversationTab: 'active',
        newConversation: {
            members: [],
        },
        userSearch: '',
	}),

	computed: {
		...mapState({
      		conversations: state => state.conversations.index,
            ready: state => state.conversations.ready,
            users: state => state.users.index,
      		usersReady: state => state.users.ready,
		}),

		orderedConversations() {
			let conversations = Object.assign([], this.conversations);
           	return conversations.sort((a, b) => {
                const a_timestamp = a.last_message.timestamp || a.timestamp;
                const b_timestamp = b.last_message.timestamp || b.timestamp;
                return (a_timestamp > b_timestamp) ? -1 : 1;
            });
		},

        filteredUsers() {
            let filteredUsers = [];
            let trimmedQuery = this.userSearch.trim().toLowerCase();
            if(trimmedQuery.length > 0) {
                this.users.forEach((user) => {
                    if(user.full_name.toLowerCase().includes(trimmedQuery)) filteredUsers.push(user);
                });
            } else {
                filteredUsers = this.users;
            }

            return filteredUsers;
        }
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
        this.getUsers();
        this.$root.socket.on('new_conversation', (data) => {
            if(data.member_ids.find((x) => x == this.$root.auth.id)) {
                let conversation = this.conversations.find((x) => x.id == data.conversation_id);
                if(!conversation) this.getConversation(data.conversation_id);
            }
        });
	},

    mounted() {
        $('#newConversationModal').on('hidden.bs.modal', () => {
            this.newConversation.members = [];
            this.userSearch = '';
        });
    },

	methods: {
    	...mapActions({
      		getConversations: 'conversations/index',
      		storeConversation: 'conversations/store',
            updateConversation: 'conversations/update',
            showConversation: 'conversations/show',
      		getUsers: 'users/index',
    	}),

        async getConversation(conversation_id) {
            await this.showConversation(conversation_id);
            let conversation = this.conversations.find((x) => x.id == conversation_id);
            if(conversation) this.setConversation(conversation); 
        },

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
                    this.$root.socket.emit('new_conversation', { member_ids: member_ids, conversation_id: conversation.id });
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