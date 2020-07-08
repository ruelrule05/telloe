import {mapState, mapActions} from 'vuex';

import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';

import ArchiveIcon from '../../../../icons/archive';
import MoreHIcon from '../../../../icons/more-h';
import PlusIcon from '../../../../icons/plus';
import DownloadIcon from '../../../../icons/download';
import SearchIcon from '../../../../icons/search';
import CloseIcon from '../../../../icons/close';
import VideoIcon from '../../../../icons/video';

export default {
    components: {
        Modal,
        VueFormValidate,
        ToggleSwitch,

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
        newContact: {
            custom_fields: {},
            blacklisted_services: []
        },
    }),

    computed: {
        ...mapState({
            conversations: state => state.conversations.index,
            ready: state => state.conversations.ready,
            contacts: state => state.contacts.index,
            contactsReady: state => state.contacts.ready,
            services: (state) => state.services.index,
        }),

        orderedConversations() {
            let conversations = Object.assign([], this.conversations);
            return conversations.sort((a, b) => {
                const a_timestamp = a.last_message.timestamp || a.timestamp;
                const b_timestamp = b.last_message.timestamp || b.timestamp;
                return a_timestamp > b_timestamp ? -1 : 1;
            });
        },

        filteredContacts() {
            let filteredContacts = [];
            let trimmedQuery = this.userSearch.trim().toLowerCase();
            this.contacts.forEach(contact => {
                if (contact.contact_user.full_name.toLowerCase().includes(trimmedQuery)) filteredContacts.push(contact);
            });

            return filteredContacts;
        },

        defaultEmailMessage() {
            return `${this.$root.auth.full_name} has invited you in ${APP_NAME}`;
        },
    },

    watch: {
        ready: function(value) {
            this.$root.contentloading = !value;
            if (value && !this.$route.params.id && this.conversations.length > 0) this.setConversation(this.orderedConversations[0]);
        },
    },

    created() {
        this.$root.contentloading = !this.ready;
        if (this.ready && !this.$route.params.id && this.conversations.length > 0) this.setConversation(this.orderedConversations[0]);
        this.getConversations();
        this.getContacts();
        this.$root.socket.on('new_conversation', data => {
            if (data.member_ids.find(x => x == this.$root.auth.id)) {
                let conversation = this.conversations.find(x => x.id == data.conversation_id);
                if (!conversation) this.getConversation(data.conversation_id);
            }
        });
        this.getServices();
    },

    mounted() {
    },

    methods: {
        ...mapActions({
            getConversations: 'conversations/index',
            storeConversation: 'conversations/store',
            updateConversation: 'conversations/update',
            showConversation: 'conversations/show',
            getContacts: 'contacts/index',
            storeContact: 'contacts/store',
            getServices: 'services/index',
        }),

        resetNewContact() {
            this.newContact = {
                custom_fields: {},
                blacklisted_services: []
            };
        },

        async createContact() {
            if(this.newContact.email) {
                this.$refs['addContactModal'].hide();
                let contact = await this.storeContact(this.newContact);
                if(contact) {
                    this.setConversation(contact.conversation);
                    this.$refs['newConversationModal'].hide();
                }
            }
        },

        resetNewConversationForm() {
            this.newConversation.members = [];
            this.userSearch = '';
        },

        async getConversation(conversation_id) {
            await this.showConversation(conversation_id);
            let conversation = this.conversations.find(x => x.id == conversation_id);
            if (conversation) this.setConversation(conversation);
        },

        addNewConversationMember(member) {
            if (!member.is_pending && !this.newConversation.members.find(x => x.id == member.id)) this.newConversation.members.push(member);
        },

        createConversation() {
            if (this.newConversation.members.length > 0) {
                let member_ids = [];
                this.newConversation.members.forEach(m => {
                    member_ids.push(m.id);
                });

                this.storeConversation({members: member_ids}).then(conversation => {
                    if (conversation.id != this.$route.params.id) this.setConversation(conversation);
                    this.$root.socket.emit('new_conversation', {member_ids: member_ids, conversation_id: conversation.id});
                });
                this.$refs['newConversationModal'].hide();
            }
        },

        searchMembers(e, newConversation = true) {
            let chatTarget = newConversation ? this.newConversation : this;
            if (!chatTarget['searchingMembers']) {
                chatTarget['searchingMembers'] = true;
                setTimeout(() => {
                    axios.get(`/dashboard/contacts?search=${e.target.value.trim()}`).then(response => {
                        chatTarget['groupMembersResults'] = response.data;
                    });
                    chatTarget['searchingMembers'] = false;
                }, 500);
            }
        },

        setConversation(conversation) {
            if (conversation.id != this.$route.params.id) this.$router.replace(`/dashboard/conversations/${conversation.id}`);
        },
    },
};
