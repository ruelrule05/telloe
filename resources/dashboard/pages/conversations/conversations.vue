<template>
	<div>
		<div class="flex overflow-hidden flex-col" :class="{ 'h-screen': !banner }">
			<div class="content-header border-bottom lg:static fixed w-full bg-white z-20">
				<div class="ml-7 lg:ml-0">
					MESSAGES
				</div>
				<div class="ml-auto">
					<button type="button" class="btn btn-md btn-primary flex items-center" @click="$refs.newConversationModal.show()">
						<span>NEW</span>
						<span class="ml-2 hidden md:block">CONVERSATION</span>
					</button>
				</div>
			</div>
			<div class="h-20 lg:hidden block" />

			<div v-if="banner" class="p-4 lg:p-8 border-bottom relative">
				<div class="font-serif absolute lg:top-10 lg:right-10 top-6 right-6 z-10">
					<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
				</div>
				<div class="bg-primary-ultralight justify-between rounded-xl flex p-6 flex-col md:flex-row relative">
					<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">
						MESSAGING CONTACTS
					</div>
					<div class="w-full md:w-9/12 ml-0">
						<p class="text-muxted mb-4">
							Send messages, voice recordings, and make video calls with contacts, all with familiar features.
						</p>
						<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.newConversationModal.show()"><span>START A NEW CONVERSATION</span></button>
					</div>
				</div>
			</div>
			<div class="flex-grow flex h-full overflow-hidden" :class="{ 'h-screen': banner }">
				<div class="border-right overflow-hidden h-full">
					<index ref="conversationIndex" :showConversationList="isShowConversationList" @conversationList="toggleConversationList()"></index>
				</div>
				<div class="flex-1 overflow-hidden h-full">
					<show @ready="showReady()" @conversationList="toggleConversationList()"></show>
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
