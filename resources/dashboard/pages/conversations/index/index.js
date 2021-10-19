/* global APP_NAME */
import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../components/vue-form-validate';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';

import ArchiveIcon from '../../../../icons/archive';
import MoreHIcon from '../../../../icons/more-h';
import PlusIcon from '../../../../icons/plus';
import DownloadIcon from '../../../../icons/download';
import SearchIcon from '../../../../icons/search';
import CloseIcon from '../../../../icons/close';
import VideoIcon from '../../../../icons/colored-video';
import UserCircleIcon from '../../../../icons/user-circle';
import PasswordIcon from '../../../../icons/password';
import HeadphoneIcon from '../../../../icons/headphone';
import LockIcon from '../../../../icons/lock';
import ListBulletIcon from '../../../../icons/list-bullet';
import MoreIcon from '../../../../icons/more';
import VolumeMaxIcon from '../../../../icons/volume-max';
import VolumeMinIcon from '../../../../icons/volume-min';
import BellSlashIcon from '../../../../icons/bell-slash';
import EditSquareIcon from '../../../../icons/edit-square';
import ChatIcon from '../../../../icons/chat';
import dayjs from 'dayjs';

export default {
	props: {
		showConversationList: {
			default: false
		}
	},
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
		UserCircleIcon,
		PasswordIcon,
		HeadphoneIcon,
		LockIcon,
		ListBulletIcon,
		MoreIcon,
		VolumeMaxIcon,
		VolumeMinIcon,
		BellSlashIcon,
		EditSquareIcon,
		ChatIcon
	},

	data: () => ({
		conversationTab: 'active',
		newConversation: {
			members: []
		},
		newContact: {
			custom_fields: {},
			blacklisted_services: []
		},
		search: ''
	}),

	computed: {
		...mapState({
			conversations: state => state.conversations.index,
			ready: state => state.conversations.ready,
			services: state => state.services.index
		}),

		orderedConversations() {
			let conversations = Object.assign([], this.conversations);
			conversations.sort((a, b) => {
				//console.log(a.last_message.timestamp);
				const a_timestamp = a.last_message.timestamp || dayjs(a.created_at).valueOf();
				const b_timestamp = b.last_message.timestamp || dayjs(b.created_at).valueOf();
				return a_timestamp > b_timestamp ? -1 : 1;
			});

			let search = this.search.trim().toLowerCase();
			return conversations.filter(conversation => {
				if (!search.length) {
					return true;
				} else {
					let keywords = conversation.name || '';
					keywords += ` ${conversation.user.full_name} ${conversation.user.email}`;
					conversation.members.forEach(member => {
						keywords += ` ${member.full_name} ${member.email}`;
					});
					return keywords.toLowerCase().includes(search);
				}
			});
		},

		defaultEmailMessage() {
			return `${this.$root.auth.full_name} has invited you in ${APP_NAME}`;
		}
	},

	watch: {},

	created() {
		this.$root.contentloading = !this.ready;
		this.getConversations().then(() => {
			if (!this.$route.params.id && this.conversations.length > 0 && this.$route.name == 'conversations') {
				this.setConversation(this.orderedConversations[0]);
			}
		});
		this.$root.appChannel.listenForWhisper('newConversation', data => {
			if (data.member_ids.find(x => x == this.$root.auth.id)) {
				let conversation = this.conversations.find(x => x.id == data.conversation_id);
				if (!conversation) this.getConversation(data.conversation_id);
			}
		});
	},

	mounted() {},

	methods: {
		...mapActions({
			getConversations: 'conversations/index',
			updateConversation: 'conversations/update',
			showConversation: 'conversations/show',
			getContacts: 'contacts/index',
			storeContact: 'contacts/store',
			getServices: 'services/index',
			getMembers: 'members/index'
		}),

		resetNewContact() {
			this.newContact = {
				custom_fields: {},
				blacklisted_services: []
			};
		},

		async createContact() {
			if (this.newContact.email) {
				this.$refs['addContactModal'].hide();
				let contact = await this.storeContact(this.newContact);
				if (contact) {
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
			await this.showConversation({ id: conversation_id });
			let conversation = this.conversations.find(x => x.id == conversation_id);
			if (conversation) this.setConversation(conversation);
		},

		searchMembers(e, newConversation = true) {
			let chatTarget = newConversation ? this.newConversation : this;
			if (!chatTarget['searchingMembers']) {
				chatTarget['searchingMembers'] = true;
				setTimeout(() => {
					window.axios.get(`/dashboard/contacts?search=${e.target.value.trim()}`).then(response => {
						chatTarget['groupMembersResults'] = response.data;
					});
					chatTarget['searchingMembers'] = false;
				}, 500);
			}
		},

		setConversation(conversation) {
			if (conversation.id != this.$route.params.id) this.$router.replace(`/dashboard/conversations/${conversation.id}`);
		},

		toggleConversationList() {
			this.$emit('conversationList');
		}
	}
};
