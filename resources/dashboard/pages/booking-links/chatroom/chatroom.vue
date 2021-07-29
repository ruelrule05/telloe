<template>
	<div>
		<div class="messenger" :class="{ open: open }">
			<h5 class="flex items-center justify-between mb-6 font-serif text-sm font-extrabold tracking-tighter uppercase">
				Chat
				<button type="button" @click="open = false">Hide</button>
			</h5>
			<div class="message-box">
				<div class="overflow-auto h-full" v-chat-scroll="{ always: true, smooth: false }">
					<div v-if="!bookingLink.booking_link_messages" class="absolute-center text-muted text-sm">No messages yet</div>
					<div v-else class="mt-3">
						<!-- Group messages -->
						<div v-for="(grouped_message, index) in grouped_messages" :key="index" class="w-100 message-group">
							<div v-if="grouped_message.type == 'call_ended'" class="text-center">
								<div v-for="message in grouped_message.messages" :key="message.id" class="hrule">
									<small class="bg-white relative px-2 font-light text-muted"> {{ message.message }} </small>
								</div>
							</div>
							<div v-else-if="grouped_message.type == 'call_failed'" class="text-center">
								<div v-for="message in grouped_message.messages" :key="message.id" class="hrule">
									<small class="bg-white relative px-2 font-light text-muted">
										{{ message.user_id == $root.auth.id ? 'Call failed' : 'You missed a call' }}
									</small>
								</div>
							</div>
							<template v-else>
								<div class="flex items-end message-body" :class="{ 'outgoing-message text-right flex-row-reverse': grouped_message.outgoing }">
									<div>
										<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + grouped_message.sender.profile_image + ')' }">
											<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
										</div>
									</div>
									<div class="px-1 flex-1 -mb-1">
										<div v-for="message in grouped_message.messages" :key="message.id" v-cloak :id="'message-' + message.id" class="message-item">
											<div class="relative message-content" :class="{ 'p-0 bg-transparent': ['emoji', 'image', 'video'].find(x => x == message.type) }">
												<MessageType :message="message" :outgoing="grouped_message.outgoing"></MessageType>
											</div>
										</div>
									</div>
								</div>
								<small class="text-muted flex items-center mt-2" :class="{ 'justify-end': grouped_message.outgoing }">
									<template v-if="index == grouped_messages.length - 1 && grouped_message.outgoing && grouped_message.is_read">
										Seen&nbsp;
										<eye-icon width="14" height="14" class="fill-primary"></eye-icon>
										&nbsp;•
									</template>
									{{ messageTimezoneTime(grouped_message) }}
								</small>
							</template>
						</div>
					</div>
				</div>
			</div>
			<div class="message-bar">
				<vue-form-validate class="relative mt-6" @submit="sendText">
					<input type="text" class="w-full px-4 text-xs font-normal bg-gray-200 border-none rounded-full shadow-none message-input" v-model="messageText" placeholder="Type a message" data-required />
					<button class="flex focus:outline-none transition-none items-center justify-center bg-white rounded-full text-primary" type="submit"><SendIcon class="fill-current"></SendIcon></button>
				</vue-form-validate>
			</div>
		</div>

		<div
			v-if="!open"
			:class="{ bouncing: bouncing }"
			class="btn-toggle"
			role="button"
			@click="
				open = true;
				bouncing = false;
			"
		>
			<messages-icon width="30" height="30"></messages-icon>
		</div>
	</div>
</template>

<script src="./chatroom.js"></script>

<style lang="scss" scoped src="./chatroom.scss"></style>
