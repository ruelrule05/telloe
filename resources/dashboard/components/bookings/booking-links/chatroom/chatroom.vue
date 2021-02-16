<template>
	<div>
		<div v-if="open" class="chatroom position-fixed shadow-sm rounded p-2 bg-white">
			<button class="btn btn-white badge-pill p-0 shadow-none ml-auto btn-close" type="button" @click="open = false">
				<close-icon transform="scale(1.3)"></close-icon>
			</button>
			<div class="d-flex align-items-center flex-column overflow-hidden h-100">
				<div class="d-flex align-items-center w-100">
					<div v-for="bookingLinkContact in bookingLink.booking_link_contacts" :key="bookingLinkContact.id" class="mr-n2">
						<div class="profile-image profile-image-sm" :style="{ 'background-image': `url(${bookingLinkContact.contact.contact_user.profile_image})` }">
							<span v-if="!bookingLinkContact.contact.contact_user.profile_image">{{ bookingLinkContact.contact.contact_user.initials }}</span>
						</div>
					</div>
				</div>

				<div class="flex-grow-1 w-100 overflow-auto position-relative">
					<div v-if="!bookingLink.booking_link_messages" class="position-absolute-center text-gray">No messages yet</div>
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
										<div class="text-wrap position-relative message-content d-inline-block rounded bg-light px-2 py-1 rounded-lg">
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

				<div class="mt-auto w-100 d-flex align-items-center">
					<vue-form-validate @submit="sendText" class="flex-grow-1" ref="messageForm" @mounted="messageFormMounted">
						<div class="form-control border-0 shadow-none message-input bg-gray-200 text-wrap h-auto overflow-auto" contenteditable data-placeholder="Write a message.." spellcheck="false" @keypress="messageInput" ref="messageInput"></div>
					</vue-form-validate>
					<button type="button" class="line-height-sm ml-2 btn px-0" @blur="emojipicker = false" :class="{ 'emojipicker-open': emojipicker }">
						<emojipicker @select="selectEmoji"></emojipicker>
					</button>
				</div>
			</div>
		</div>

		<div v-else class="btn-toggle bg-white badge-pill p-1 line-height-0 position-fixed" role="button" @click="open = true">
			<messages-icon width="30" height="30"></messages-icon>
		</div>
	</div>
</template>

<script src="./chatroom.js"></script>

<style lang="scss" scoped src="./chatroom.scss"></style>
