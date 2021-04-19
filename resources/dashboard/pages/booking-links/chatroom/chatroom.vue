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
						<div v-for="(grouped_message, index) in grouped_messages" :key="index" class="w-100 message-group">
							<small style="margin-left: 34px" class="font-heading mb-1 font-weight-bold font-size-base line-height-1 message-sender d-block" :class="{ 'text-right': grouped_message.outgoing }">{{ grouped_message.sender.full_name }}</small>
							<div class="d-flex align-items-end message-body" :class="{ 'outgoing-message text-right flex-row-reverse': grouped_message.outgoing }">
								<div>
									<div class="user-profile-image" :style="{ backgroundImage: 'url(' + grouped_message.sender.profile_image + ')' }">
										<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
									</div>
								</div>
								<div class="px-1 flex-1">
									<div v-for="message in grouped_message.messages" :key="message.id" v-cloak :id="'message-' + message.id" class="message-item mb-1">
										<div class="text-wrap position-relative message-content d-inline-block rounded bg-light px-2 py-1">
											{{ message.message }}
										</div>
									</div>
								</div>
							</div>
							<small v-if="index == grouped_messages.length - 1" class="text-secondary d-flex align-items-center" style="margin-left: 34px" :class="{ 'justify-content-end': grouped_message.outgoing }">
								{{ messageTimezoneTime(grouped_message) }}
							</small>
						</div>
					</div>
				</div>
			</div>
			<div class="message-bar">
				<vue-form-validate class="relative mt-6" @submit="sendText">
					<input type="text" class="w-full px-4 text-xs font-normal bg-gray-200 border-none rounded-full shadow-none message-input" placeholder="Type a message" data-required />
					<button class="flex focus:outline-none transition-none items-center justify-center bg-white rounded-full text-primary" type="submit"><SendIcon class="fill-current"></SendIcon></button>
				</vue-form-validate>
			</div>
		</div>

		<div v-if="!open" class="btn-toggle bg-white badge-pill p-1 line-height-0 position-fixed" role="button" @click="open = true">
			<messages-icon width="30" height="30"></messages-icon>
		</div>
	</div>
</template>

<script src="./chatroom.js"></script>

<style lang="scss" scoped src="./chatroom.scss"></style>
