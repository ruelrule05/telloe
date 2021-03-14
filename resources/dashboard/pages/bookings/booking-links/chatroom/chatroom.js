import CloseIcon from '../../../../../icons/close.vue';
import MessagesIcon from '../../../../../icons/chat.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import Emojipicker from '../../../../../components/emojipicker';
import dayjs from 'dayjs';
export default {
	props: {
		bookingLink: {
			required: true
		}
	},
	data: () => ({
		open: false,
		emojipicker: false
	}),

	computed: {
		grouped_messages() {
			/* eslint-disable */
			const grouped_messages = [];
			// sort messages by timestamp
			const messages = (this.bookingLink.booking_link_messages || []).sort((a, b) => {
				return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
			});

			for (var i = 0; i <= messages.length - 1; i++) {
				let message_group = { sender: Object.assign({}, messages[i].user) || (messages[i].metadata.is_chatbot ? { id: 'chatbot' } : ''), messages: [messages[i]] };

				let message = message_group.messages[message_group.messages.length - 1];
				if (messages[i].type == 'call_ended' || messages[i].type == 'call_failed') {
					message_group.type = messages[i].type;
				} else {
					groupMessage();

					function groupMessage() {
						const next_message = messages[i + 1];
						if (next_message && next_message.user && next_message.user.id == message_group.sender.id && next_message.type != 'call_ended' && next_message.type != 'call_failed') {
							let message = messages[i + 1];
							if (!message_group.messages.find(x => x.id == message.id)) {
								message_group.messages.push(message);
							}
							i++;
							groupMessage();
						}
					}
				}

				if (message_group.sender.id == this.$root.auth.id || message_group.sender.id == 'chatbot') {
					message_group.sender.full_name = 'You';
					message_group.outgoing = true;
					message_group.is_read = message.is_read;
				}
				message_group.created_at = message.created_at;
				message_group.timestamp = message_group.messages[message_group.messages.length - 1].timestamp;
				grouped_messages.push(message_group);
			}

			return grouped_messages;
		}
	},
	components: {
		CloseIcon,
		VueFormValidate,
		Emojipicker,
		MessagesIcon
	},
	methods: {
		messageTimezoneTime(message) {
			return dayjs(parseFloat(message.timestamp)).format('hh:mmA on ddd');
		},
		messageFormMounted() {
			if (this.$refs['messageInput']) {
				this.$refs['messageInput'].focus();
			}
		},
		sendText() {},
		selectEmoji(emoji) {
			this.$refs['messageInput'].innerHTML += emoji + ' ';
			this.placeCaretAtEnd(this.$refs['messageInput']);
		},
		messageInput(e) {
			this.textMessage = e.target.innerText;
			if ((e.keyCode ? e.keyCode : e.which) == 13) {
				e.preventDefault();
				this.$refs['messageForm'].submit();
				this.$refs['messageInput'].innerHTML = '';
			}
		}
	}
};
