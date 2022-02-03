<template>
	<div class="w-screen h-screen flex items-stretch">
		<div class="flex-1 overflow-hidden">
			<div class="flex flex-col h-screen xhidden">
				<div class="bg-white p-5">
					<h1 class="font-serif text-primary font-semibold">{{ $root.videoMessage.title }}</h1>
					<div class="font-semibold text-gray-500 text-sm mb-1">From {{ $root.videoMessage.user }}</div>
					<p class="text-sm">{{ $root.videoMessage.description }}</p>
				</div>
				<div class="w-full flex-grow bg-black relative">
					<VideoPlayer :videos="$root.videoMessage.videos.map(x => x.user_video)"></VideoPlayer>
				</div>
			</div>
		</div>
		<div class="chat-container">
			<div class="h-screen overflow-hidden flex flex-col">
				<div v-if="$root.videoMessage.service && $root.videoMessage.embed_service" class="border-b p-3 flex items-center justify-between">
					<a :href="`/@${$root.videoMessage.username}`" target="_blank" class="btn btn-primary w-full block text-center"><span>Book with me</span></a>
				</div>
				<div class="border-b p-3 flex items-center justify-between">
					<div class="text-muted">Message {{ this.$root.videoMessage.user.split(' ')[0] }}</div>
					<div class="flex items-center gap-1">
						<div class="w-8 h-8 border rounded-full relative cursor-pointer transition-colors hover:bg-gray-50 hover:text-primary text-muted">
							<svg width="15" height="15" class="absolute-center fill-current -mt-px" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M2.03125 4.375H0.46875C0.209863 4.375 0 4.58486 0 4.84375V9.53125C0 9.79014 0.209863 10 0.46875 10H2.03125C2.29014 10 2.5 9.79014 2.5 9.53125V4.84375C2.5 4.58486 2.29014 4.375 2.03125 4.375ZM1.25 9.21875C0.991113 9.21875 0.78125 9.00889 0.78125 8.75C0.78125 8.49111 0.991113 8.28125 1.25 8.28125C1.50889 8.28125 1.71875 8.49111 1.71875 8.75C1.71875 9.00889 1.50889 9.21875 1.25 9.21875ZM7.5 1.59086C7.5 2.4193 6.99277 2.88398 6.85006 3.4375H8.83683C9.48912 3.4375 9.99693 3.97941 9.99998 4.57223C10.0016 4.92258 9.8526 5.29975 9.62031 5.53311L9.61816 5.53525C9.81027 5.99105 9.77904 6.62973 9.43637 7.08738C9.60592 7.59314 9.43502 8.21441 9.11641 8.54748C9.20035 8.89119 9.16023 9.18371 8.99633 9.4192C8.59769 9.99193 7.60969 10 6.7742 10L6.71863 9.99998C5.77553 9.99965 5.00367 9.65627 4.38348 9.38035C4.07182 9.2417 3.66432 9.07006 3.35514 9.06437C3.2274 9.06203 3.125 8.95779 3.125 8.83004V4.65484C3.125 4.59234 3.15004 4.53236 3.19449 4.48842C3.9682 3.72389 4.3009 2.91445 4.93506 2.27922C5.2242 1.98953 5.32935 1.55195 5.43102 1.12879C5.51787 0.767441 5.69955 0 6.09375 0C6.5625 0 7.5 0.15625 7.5 1.59086Z" />
							</svg>
						</div>
						<div class="w-8 h-8 border rounded-full relative cursor-pointer transition-colors hover:bg-gray-50 hover:text-primary text-muted">
							<svg width="15" height="15" class="absolute-center fill-current mt-px" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M2.03125 5.625H0.46875C0.209863 5.625 0 5.41514 0 5.15625V0.46875C0 0.209864 0.209863 0 0.46875 0H2.03125C2.29014 0 2.5 0.209864 2.5 0.46875V5.15625C2.5 5.41514 2.29014 5.625 2.03125 5.625ZM1.25 0.78125C0.991113 0.78125 0.78125 0.991114 0.78125 1.25C0.78125 1.50889 0.991113 1.71875 1.25 1.71875C1.50889 1.71875 1.71875 1.50889 1.71875 1.25C1.71875 0.991114 1.50889 0.78125 1.25 0.78125ZM7.5 8.40914C7.5 7.5807 6.99277 7.11602 6.85006 6.5625H8.83683C9.48912 6.5625 9.99693 6.02059 9.99998 5.42777C10.0016 5.07742 9.8526 4.70025 9.62031 4.46689L9.61816 4.46475C9.81027 4.00895 9.77904 3.37027 9.43637 2.91262C9.60592 2.40686 9.43502 1.78559 9.11641 1.45252C9.20035 1.10881 9.16023 0.816289 8.99633 0.580801C8.59769 0.00806618 7.60969 0 6.7742 0L6.71863 2.00272e-05C5.77553 0.000351906 5.00367 0.343731 4.38348 0.619649C4.07182 0.758301 3.66432 0.929941 3.35514 0.935625C3.2274 0.937968 3.125 1.04221 3.125 1.16996V5.34516C3.125 5.40766 3.15004 5.46764 3.19449 5.51158C3.9682 6.27611 4.3009 7.08555 4.93506 7.72078C5.2242 8.01047 5.32935 8.44805 5.43102 8.87121C5.51787 9.23256 5.69955 10 6.09375 10C6.5625 10 7.5 9.84375 7.5 8.40914Z" />
							</svg>
						</div>
					</div>
				</div>
				<div class="flex-grow overflow-hidden relative">
					<Messages v-if="conversation" isVideoMessage :conversation="conversation" ready @scrollUp="getConversation($event)"></Messages>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import VideoPlayer from './videoplayer.vue';
import Messages from '../dashboard/components/Messages/Messages.vue';
export default {
	components: { VideoPlayer, Messages },

	data: () => ({
		conversation: null
	}),

	created() {
		let conversation = this.$root.videoMessage.conversation;
		conversation.channel = this.$echo.private(`conversations.${conversation.id}`);
		conversation.channel.listen('NewMessageEvent', message => {
			this.getMessageByID(message.message.id);
		});

		this.conversation = conversation;
		this.getConversation(1);
	},

	methods: {
		...mapActions({
			showConversation: 'conversations/show'
		}),

		async getMessageByID(messageID) {
			let message = await window.axios.get(`/messages/${messageID}`).catch(() => {});
			if (message) {
				this.conversation.paginated_messages.data.unshift(message.data);
			}
		},

		async getConversation(page) {
			let response = await this.showConversation({ id: this.conversation.id, page: page });
			if (response) {
				if (!this.conversation.paginated_messages) {
					this.$set(this.conversation, 'paginated_messages', response.data.paginated_messages);
				} else {
					if (response.data.page == 1) this.conversation.paginated_messages.data = [];
					this.conversation.paginated_messages.data = this.conversation.paginated_messages.data.concat(response.data.paginated_messages.data);
					this.conversation.paginated_messages.next_page_url = response.data.paginated_messages.next_page_url;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.chat-container {
	width: 400px;
	@apply bg-white border-l relative;
}
::v-deep {
	.message-input-wrapper {
		@apply p-2;
	}
	.message-input {
		@apply px-3 py-1;
	}
	.btn-send-message {
		@apply p-2;
		svg {
			width: 14px;
			height: 14px;
		}
	}
	.btn-screen-recorder {
		@apply hidden;
	}
}
</style>

<style lang="scss">
.profile-image {
	@apply bg-cover bg-center bg-no-repeat rounded-full bg-primary relative;
	width: 36px;
	height: 36px;
	> span {
		@apply absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-sm font-bold text-white leading-tight;
		z-index: 8;
	}

	&.profile-image-sm {
		width: 28px;
		height: 28px;
		> span {
			@apply text-xs;
		}
	}
}
</style>
