<template>
	<div class="p-4 md:p-8 flex flex-col h-full conversations-list pb-24 md:pb-8" :class="showConversationList ? 'show overflow-auto' : 'overflow-hidden' ">
		<div class="flex">
			<input type="text" placeholder="Search conversations" v-model="search" class="w-11/12 lg:w-full" />
			<button class="text-primary w-1/12 items-center justify-end flex lg:hidden ml-1" @click="toggleConversationList()"><chat-icon class="fill-current transform scale-125"></chat-icon></button>
		</div>

		<div class="overflow-auto flex-grow mt-8 md:mt-12 relative" v-if="ready">
			<div v-if="conversations.length == 0" class="absolute-center w-full text-center text-muted text-sm">
				You don't have any conversations yet.
			</div>
			<template v-else-if="orderedConversations.length > 0">
				<template v-for="conversation in orderedConversations">
					<div :key="conversation.id" class="conversation-preview mb-2" :class="{ active: conversation.id == $route.params.id }" @click="setConversation(conversation), toggleConversationList()">
						<div>
							<div class="profile-image profile-image-sm relative" :class="{ 'bg-light border border-gray-200': conversation.members.length > 1 }" :style="{ backgroundImage: 'url(' + conversation.member.profile_image + ')' }">
								<span v-if="conversation.members.length <= 1 && !conversation.member.profile_image">{{ conversation.member.initials }}</span>
								<span v-else-if="conversation.members.length > 1">GC</span>
								<!-- <div class="position-absolute-center w-100 d-flex flex-wrap justify-content-center">
									<span>GC</span>
									<template v-for="(member, index) in conversation.members">
										<div class="w-1/2 relative conversation-members-container" :key="member.id" v-if="index < 4">
											<div class="line-height-0 user-profile-image user-profile-image-xs overflow-hidden" :style="{ backgroundImage: 'url(' + member.user.profile_image + ')' }">
												<span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
												<span v-if="index == 3 && conversation.members.length > 4" class="line-height-0 conversation-members-more w-100 h-100">
													<span class="absolute-center">+{{ conversation.members.length - 4 }}</span>
												</span>
											</div>
										</div>
									</template>
								</div> -->
								<i v-if="$root.isOnline(conversation.member.id)" class="online-status">&nbsp;</i>
							</div>
						</div>
						<!-- <div v-if="$root.callConversation && $root.callConversation.id == conversation.id" class="conversation-oncall position-absolute pr-3">
							<video-icon width="24" height="24"></video-icon>
						</div>

						<div v-else class="absolute conversation-dropdown dropdown opacity-0 pr-2">
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
						</div> -->

						<div class="pl-2 flex-grow overflow-hidden">
							<div class="font-bold text-sm mb-1" :class="{ 'font-weight-normal': conversation.last_message.is_read }">{{ conversation.member.full_name || conversation.name }}</div>
							<div class="flex items-center">
								<div v-html="(conversation.last_message.prefix || '') + conversation.last_message.message" class="flex-grow text-sm overflow-hidden overflow-ellipsis whitespace-nowrap pr-6" :class="[conversation.last_message.id && conversation.last_message.is_read && conversation.last_message.user_id != $root.auth.id ? 'text-black font-semibold' : 'text-muted']"></div>
								<span v-if="!$root.callConversation || $root.callConversation.id != conversation.id" class="whitespace-nowrap text-muted text-xs">{{ conversation.last_message.created_diff }}</span>
							</div>
						</div>
					</div>
				</template>
			</template>
			<div v-else class="position-absolute-center text-muted">No conversations found.</div>
		</div>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
