<template>
	<div>
		<div class="flex h-screen overflow-hidden flex-col">
			<div>
				<div class="content-header border-bottom">
					MESSAGES
					<div class="ml-auto">
						<button type="button" class="btn btn-md btn-primary" @click="$refs.newConversationModal.show()">
							<span>NEW CONVERSATION</span>
						</button>
					</div>
				</div>
			</div>
			<div class="flex-grow flex h-full overflow-hidden">
				<div class="border-right overflow-hidden h-full">
					<index ref="conversationIndex"></index>
				</div>
				<div class="flex-grow overflow-hidden h-full">
					<show @ready="showReady()"></show>
				</div>
			</div>
		</div>
		<Modal ref="newConversationModal" size="sm">
			<div class="d-flex modal-title align-items-center mb-3">
				<h5 class="font-serif font-semibold mb-5 uppercase">New Conversation</h5>
			</div>
			<div class="h-full overflow-hidden d-flex flex-column" :default="contacts" ref="addNewConversationMembersForm">
				<input type="email" placeholder="Search for users or add email" class="ring-opacity-0" v-model="userSearch" />
				<div v-if="newConversation.members.length > 0" class="mt-2">
					<div v-for="(member, index) in newConversation.members" :key="member.id" class="profile-image inline-block new-conversation-member mr-2 relative" :style="{ backgroundImage: 'url(' + member.user.profile_image + ')' }">
						<span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
						<button class="absolute top-0 right-0 focus:outline-none rounded-full bg-gray-200 p-1" @click="newConversation.members.splice(index, 1)">
							<close-icon height="8" width="8" class="fill-current text-gray-600"></close-icon>
						</button>
					</div>
				</div>

				<div class="overflow-auto mt-4 members-search-container relative">
					<div v-if="!contactsReady" class="text-center absolute-center w-full">
						<div class="spinner-border spinner-border-sm text-primary"></div>
					</div>
					<div v-else-if="filteredUsers.length == 0" class="text-center text-muted  w-full">
						<button v-if="isEmail.validate(userSearch)" type="button" @click="createConversation" class="btn btn-md btn-outline-primary"><span>Invite this email</span></button>
						<div v-else class="absolute-center text-sm text-muted">No users found.</div>
					</div>
					<div v-else-if="filteredUsers.length > 0" class="text-sm">
						<div v-for="result in filteredUsers" :key="result.user.id" @click="addNewConversationMember(result)" class="contact-card flex items-center mb-4 cursor-pointer" :class="{ active: newConversation.members.find(x => x.user.id == result.user.id), disabled: result.is_pending }">
							<div>
								<div class="profile-image profile-image-md align-self-center" :style="{ backgroundImage: 'url(' + result.user.profile_image + ')' }">
									<span v-if="!result.user.profile_image">{{ result.user.initials }}</span>
								</div>
							</div>
							<div class="pl-2">
								<div class="font-semibold -mb-1">{{ result.user.full_name }}</div>
								<div class="text-sm text-muted text-nowrap">
									<span class="text-xs">{{ result.user.email }}</span>
									<span v-if="result.is_pending" class="text-warning">Pending</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex items-center justify-between w-full">
				<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.newConversationModal.hide()"><span>Cancel</span></button>
				<button class="btn btn-md btn-primary" type="button" :disabled="newConversation.members.length == 0" @click="createConversation()"><span>Create</span></button>
			</div>
		</Modal>
	</div>
</template>

<script src="./conversations.js"></script>

<style lang="scss" src="./conversations.scss"></style>