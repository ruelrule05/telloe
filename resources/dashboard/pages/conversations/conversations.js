import { mapState, mapActions } from 'vuex';
import Index from './index/index.vue';
import Show from './show/show.vue';
import Modal from '../../../components/modal/modal.vue';
import CloseIcon from '../../../icons/close';
const isEmail = require('isemail');
const dayjs = require('dayjs');
const mobile = require('is-mobile');

export default {
	components: { Index, Show, Modal, CloseIcon },
	created() {
		this.getContacts({ nopaginate: true });
		this.getMembers();
		if (this.$route.query.tab) {
			this.$root.detailsTab = this.$route.query.tab;
		}
		this.checkCookie();
		this.isMobile = mobile();
	},

	mounted() {
		let helpcrunch = document.querySelector('.helpcrunch-iframe-wrapper iframe');
		if (helpcrunch) {
			helpcrunch.style.setProperty('visibility', 'hidden');
		}
	},
	beforeDestroy: function () {
		let helpcrunch = document.querySelector('.helpcrunch-iframe-wrapper iframe');
		if (helpcrunch) {
			helpcrunch.style.setProperty('visibility', 'visible', 'important');
		}
	},
	data: () => ({
		newConversation: {
			members: []
		},
		userSearch: '',
		isEmail: isEmail,
		banner: false,
		cookieItem: 'telloe_conversations_banner',
		isMobile: true,
		isShowConversationList: false
	}),

	computed: {
		...mapState({
			contacts: state => state.contacts.index,
			members: state => state.members.index,
			contactsReady: state => state.contacts.ready
		}),

		users() {
			let users = [];

			this.contacts.forEach(contact => {
				if (!contact.is_pending) {
					let exists = users.find(x => x.user.id == contact.contact_user_id);
					if (!exists) {
						users.push({
							type: 'contact',
							user: contact.contact_user
						});
					}
				}
			});
			this.members.forEach(member => {
				if (!member.is_pending) {
					let exists = users.find(x => x.user.id == member.member_user_id);
					if (!exists) {
						users.push({
							type: 'member',
							user: member.member_user
						});
					}
				}
			});

			return users;
		},

		filteredUsers() {
			let filteredUsers = [];
			let trimmedQuery = this.userSearch.trim().toLowerCase();
			this.users.forEach(user => {
				if (user.user.full_name.toLowerCase().includes(trimmedQuery) || user.user.email.toLowerCase().includes(trimmedQuery)) filteredUsers.push(user);
			});

			return filteredUsers;
		}
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			getMembers: 'members/index',
			storeConversation: 'conversations/store'
		}),

		checkCookie() {
			var match = document.cookie.match(new RegExp('(^| )' + this.cookieItem + '=([^;]+)'));
			if (!match) {
				this.banner = true;
			}
		},

		hideBanner() {
			this.banner = false;
			let expires = dayjs().add(2, 'year').format('ddd, D MMM YYYY H:m:s') + ' UTC';
			document.cookie = `${this.cookieItem}=true; expires=${expires}; path=/`;
		},

		createConversation() {
			if (this.newConversation.members.length > 0) {
				let member_ids = [];
				this.newConversation.members.forEach(m => {
					member_ids.push(m.user.id);
				});

				this.storeConversation({ members: member_ids }).then(conversation => {
					if (conversation.id != this.$route.params.id) this.$refs.conversationIndex.setConversation(conversation);
					this.$root.appChannel.whisper('newConversation', { member_ids: member_ids, conversation_id: conversation.id });
				});
			} else if (this.isEmail.validate(this.userSearch)) {
				this.storeConversation({ email: this.userSearch });
			}
			this.$refs.newConversationModal.hide();
		},

		addNewConversationMember(member) {
			if (!member.is_pending && !this.newConversation.members.find(x => x.user.id == member.user.id)) this.newConversation.members.push(member);
		},

		showReady() {
			if (this.$root.intros.conversations.enabled) {
				setTimeout(() => {
					if (!document.querySelector('.introjs-overlay')) {
						this.$root.intros.conversations.intro.start();
					}
				}, 500);
			}
		},

		toggleConversationList() {
			if (mobile()) {
				this.isShowConversationList = !this.isShowConversationList;
			}
		}
	}
};
