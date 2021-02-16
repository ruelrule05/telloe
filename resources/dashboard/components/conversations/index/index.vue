<template>
	<div class="bg-white text-left border-right">
		<div class="conversation-list d-flex flex-column h-100 position-relative">
			<div class="conversations-header">
				<div class="d-flex px-3 align-items-center mb-2">
					<h5 class="mb-0 font-heading">Messages</h5>
					<div class="ml-auto">
						<button :data-intro="$root.intros.conversations.steps[0]" data-step="1" class="btn btn-light badge-pill line-height-0 p-1" type="button" @click="$refs['newConversationModal'].show()">
							<edit-square-icon></edit-square-icon>
						</button>
						<button :data-intro="$root.intros.conversations.steps[1]" data-step="2" class="btn btn-light badge-pill line-height-0 p-1 ml-1" type="button" @click="$root.muted = !$root.muted">
							<volume-max-icon v-if="!$root.muted"></volume-max-icon>
							<volume-min-icon v-else class="fill-gray-500"></volume-min-icon>
						</button>
					</div>
				</div>
				<div class="d-flex align-items-center btn-tab mt-3 px-3">
					<input type="text" class="form-control border shadow-none" placeholder="Search conversations" v-model="search" />
				</div>
			</div>

			<div class="overflow-auto p-3 position-relative h-100" v-if="ready">
				<div v-if="conversations.length == 0" class="position-absolute-center w-100 text-center text-muted">
					You don't have any conversations yet.
				</div>
				<template v-else-if="orderedConversations.length > 0">
					<template v-for="conversation in orderedConversations">
						<div :key="conversation.id" class="conversation-preview mb-1 position-relative rounded-lg" :class="{ active: conversation.id == $route.params.id }">
							<div v-if="$root.callConversation && $root.callConversation.id == conversation.id" class="conversation-oncall position-absolute pr-3">
								<video-icon width="24" height="24"></video-icon>
							</div>

							<div v-else class="position-absolute conversation-dropdown dropdown opacity-0 pr-2">
								<button class="btn btn-sm btn-light p-1 line-height-0" type="button" data-toggle="dropdown" data-offset="-130,0"><more-icon width="20" height="20" class="fill-gray-500" transform="scale(0.75)"></more-icon></button>
								<div class="dropdown-menu">
									<span
										v-if="!conversation.archive"
										class="dropdown-item cursor-pointer"
										@click="
											conversation.archive = true;
											updateConversation(conversation);
										"
									>
										Move to archives
									</span>
									<span
										v-else
										class="dropdown-item cursor-pointer"
										@click="
											conversation.archive = false;
											updateConversation(conversation);
										"
									>
										Move to active
									</span>
								</div>
							</div>

							<div class="p-2 cursor-pointer" @click="setConversation(conversation)">
								<span v-if="conversation.last_message.user_id != $root.auth.id && !conversation.last_message.is_read" class="position-absolute badge-new-message">&nbsp;</span>
								<div class="media align-items-center conversation-members">
									<div class="user-profile-image position-relative" :class="{ 'bg-light border border-gray-200 overflow-hidden': conversation.members.length > 1 }" :style="{ backgroundImage: 'url(' + conversation.member.profile_image + ')' }">
										<span v-if="conversation.members.length <= 1 && !conversation.member.profile_image">{{ conversation.member.initials }}</span>
										<div v-else-if="conversation.members.length > 1" class="position-absolute-center w-100 d-flex flex-wrap justify-content-center">
											<template v-for="(member, index) in conversation.members">
												<div class="w-50 position-relative conversation-members-container" :key="member.id" v-if="index < 4">
													<div class="line-height-0 user-profile-image user-profile-image-xs overflow-hidden" :style="{ backgroundImage: 'url(' + member.user.profile_image + ')' }">
														<span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
														<span v-if="index == 3 && conversation.members.length > 4" class="line-height-0 conversation-members-more w-100 h-100">
															<span class="position-absolute-center">+{{ conversation.members.length - 4 }}</span>
														</span>
													</div>
												</div>
											</template>
										</div>
										<i v-if="$root.isOnline(conversation.member.id)" class="online-status bg-success">&nbsp;</i>
									</div>
									<div class="media-body pl-3 overflow-hidden">
										<div class="h6 mb-0 font-heading" :class="{ 'font-weight-normal': conversation.last_message.is_read }">{{ conversation.member.full_name || conversation.name }}</div>
										<div class="d-flex align-items-center text-nowrap conversation-message-preview">
											<div v-html="(conversation.last_message.prefix || '') + conversation.last_message.message" class="flex-grow-1 text-ellipsis" :class="[conversation.last_message.is_read || conversation.last_message.user_id == $root.auth.id ? 'text-muted' : 'text-black font-weight-bold']"></div>
											<span v-if="!$root.callConversation || $root.callConversation.id != conversation.id" class="ml-auto text-muted last-message-time pl-2">{{ conversation.last_message.created_diff }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</template>
				<div v-else class="position-absolute-center text-muted">No conversations found.</div>
			</div>
		</div>

		<!-- New conversation modal -->
		<modal :close-button="false" :scrollable="false" ref="newConversationModal" @hidden="resetNewConversationForm">
			<div class="d-flex modal-title align-items-center mb-3">
				<h5 class="font-heading mb-0">New Conversation</h5>
				<!-- <button class="ml-auto btn btn-light shadow-none d-flex align-items-center" type="button" @click="$refs['addContactModal'].show()">
					<plus-icon height="10" width="10" transform="scale(2)" class="mr-1"></plus-icon>
					Add Contact
				</button> -->
			</div>
			<div class="h-100 overflow-hidden d-flex flex-column" :default="contacts" ref="addNewConversationMembersForm">
				<input type="text" placeholder="Search contacts or members..." class="form-control shadow-none border" v-model="userSearch" />
				<div v-if="newConversation.members.length > 0" class="mt-1">
					<div v-for="(member, index) in newConversation.members" :key="member.id" class="user-profile-image d-inline-block new-conversation-member mr-1" :style="{ backgroundImage: 'url(' + member.user.profile_image + ')' }">
						<span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
						<button class="btn btn-sm btn-gray-200 badge-pill p-0 line-height-0 position-absolute" @click="newConversation.members.splice(index, 1)">
							<close-icon height="16" width="16" class="cursor-pointer"></close-icon>
						</button>
					</div>
				</div>

				<div class="overflow-y-only mt-2 members-search-container position-relative">
					<div v-if="!contactsReady" class="text-center position-absolute-center w-100">
						<div class="spinner-border spinner-border-sm text-primary"></div>
					</div>
					<div v-else-if="filteredUsers.length == 0" class="text-center text-muted position-absolute-center w-100">
						No results found.
					</div>
					<div v-else-if="filteredUsers.length > 0">
						<div v-for="result in filteredUsers" :key="result.user.id" @click="addNewConversationMember(result)" class="media member-result align-items-center rounded mb-2 p-2 cursor-pointer" :class="{ active: newConversation.members.find(x => x.user.id == result.user.id), disabled: result.is_pending }">
							<div class="user-profile-image user-profile-image-md align-self-center" :style="{ backgroundImage: 'url(' + result.user.profile_image + ')' }">
								<span v-if="!result.user.profile_image">{{ result.user.initials }}</span>
							</div>
							<div class="media-body pl-2">
								<div class="font-weight-bold font-heading mb-0 h6">{{ result.user.full_name }}</div>
								<div class="small text-muted text-nowrap">
									{{ result.user.email }}
									<span v-if="result.is_pending" class="text-warning">Pending</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<template v-slot:footer>
				<div class="d-flex justify-content-between w-100">
					<button class="btn btn-light shadow-none" type="button" @click="$refs['newConversationModal'].hide()">Cancel</button>
					<button class="btn btn-primary" type="button" :disabled="newConversation.members.length == 0" @click="createConversation()">Create</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
