<template>
	<div class="bg-white">
		<div class="conversation-list d-flex flex-column h-100 position-relative">
			<div class="d-flex align-items-center">
				<div class="py-3 px-2">
					<button class="btn px-2 py-1 font-heading font-weight-bold" :class="{'text-muted-500': conversationTab != 'active'}" @click="conversationTab = 'active'">Chats</button>
				</div>
				<div class="py-3 btn-tab">
					<button class="btn px-2 py-1 font-heading font-weight-bold" :class="{'text-muted-500': conversationTab != 'archive'}" @click="conversationTab = 'archive'">Archive</button>
				</div>
                <div class="ml-auto dropleft pr-3">
                    <button class="btn btn-sm btn-white border d-flex align-items-center" type="button" @click="$refs['newConversationModal'].show()"><plus-icon height="10" width="10" transform="scale(2)" class="mr-1"></plus-icon>New Chat</button>
                </div>
			</div>

			<div class="overflow-auto px-3 pb-3 position-relative h-100" v-if="ready">
                <div v-if="conversations.length == 0" class="position-absolute-center w-100 text-center text-muted">
                    You don't have any conversations yet.
                </div>
                <template v-else>
    				<div v-for="conversation in orderedConversations" v-if="conversation.status == conversationTab" class="conversation-preview mb-1 position-relative rounded-lg" :class="{'active': conversation.id ==  $route.params.id}">
                        
                        <div v-if="$root.callWindow && $root.callConversationId == conversation.id" class="conversation-oncall position-absolute pr-3">
                            <video-icon width="24" height="24"></video-icon>
                        </div>
                        
                        <div v-else class="position-absolute conversation-dropdown dropdown opacity-0 pr-2">
                            <button class="btn btn-sm btn-white p-1 border line-height-0" type="button" data-toggle="dropdown" data-offset="-130,0" @click.prevent><more-h-icon width="20" height="20"></more-h-icon></button>
                            <div class="dropdown-menu py-1">
                                <small v-if="conversation.status == 'active'" class="dropdown-item d-flex align-items-center px-2 cursor-pointer" @click="conversation.status = 'archive'; updateConversation(conversation)"><archive-icon height="16" width="16"></archive-icon> &nbsp;&nbsp;Move to archives</small>
                                <small v-else-if="conversation.status == 'archive'" class="dropdown-item d-flex align-items-center px-2 cursor-pointer" @click="conversation.status = 'active'; updateConversation(conversation)"><download-icon height="16" width="16"></download-icon> &nbsp;&nbsp;Move to active</small>
                            </div>
                        </div>

    	                <div class="p-2 cursor-pointer" @click="setConversation(conversation)">
    						<div class="media align-items-center conversation-members">
    						  	<div class="user-profile-image position-relative" :class="{'rounded bg-transparent': conversation.members.length > 1}" :style="{backgroundImage: 'url('+conversation.member.profile_image+')'}">
    						  		<span v-if="conversation.members.length <= 1 && !conversation.member.profile_image">{{ conversation.member.initials }}</span>
                                    <div v-else-if="conversation.members.length > 1" class="position-absolute-center w-100 d-flex flex-wrap justify-content-center">
                                        <div class="w-50 position-relative conversation-members-container" v-for="(member, index) in conversation.members" v-if="index < 4">
                                            <div class="line-height-0 user-profile-image user-profile-image-xs overflow-hidden" :style="{backgroundImage: 'url('+member.user.profile_image+')'}">
                                                <span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
                                                <span v-if="index == 3 && conversation.members.length > 4" class="line-height-0 conversation-members-more w-100 h-100">
                                                    <span class="position-absolute-center">+{{ conversation.members.length - 4 }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
    						  	</div> 
    						  	<div class="media-body pl-3 overflow-hidden">
    	                            <div class="h6 mb-0 font-heading">{{ conversation.member.full_name || conversation.name }}</div>
                                    <div class="d-flex align-items-center text-nowrap conversation-message-preview">
                                        <div v-html="(conversation.last_message.prefix || '') + conversation.last_message.message" class="flex-grow-1 text-ellipsis" :class="[conversation.last_message.is_read ? 'text-muted' : 'text-black font-weight-bold']"></div>    
                                        <span class="ml-auto text-gray ">{{ conversation.last_message.created_diff }}</span>   
                                    </div>    
    						  	</div>
    						</div>
    					</div>
    				</div>
                </template>
			</div>
		</div>



        <!-- New conversation modal -->
        <modal :close-button="false" ref="newConversationModal" @hidden="resetNewConversationForm">
            <h5 class="font-heading mb-3">New Conversation</h5>
            <div class="h-100 overflow-hidden d-flex flex-column" :default="contacts" ref="addNewConversationMembersForm">
               <input type="text" placeholder="Search active contacts..." class="form-control shadow-none border" v-model="userSearch">
                <div v-if="newConversation.members.length > 0" class="mt-1">
                    <div v-for="(member, index) in newConversation.members" class="user-profile-image d-inline-block new-conversation-member mr-1" :style="{backgroundImage: 'url('+member.profile_image+')'}">
                        <span v-if="!member.profile_image">{{ member.initials }}</span>
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
                        <div v-for="result in filteredUsers" @click="addNewConversationMember(result)" class="media member-result align-items-center rounded mb-2 p-2 cursor-pointer" :class="{'active': newConversation.members.find((x) => x.id == result.id)}">
                            <div class="user-profile-image user-profile-image-md align-self-center" :style="{backgroundImage: 'url('+result.profile_image+')'}">
                                <span v-if="!result.profile_image">{{ result.initials }}</span>
                            </div>
                            <div class="media-body pl-2">
                                <div class="font-weight-bold font-heading mb-0 h6">{{ result.full_name }}</div>
                                <div class="small text-muted text-nowrap">@{{ result.username }}</div>      
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex align-items-center">
                    <div class="ml-auto">
                        <button class="btn btn-white border" type="button" @click="$refs['newConversationModal'].hide()">Cancel</button>
                        <button class="btn btn-primary" type="button" :disabled="newConversation.members.length == 0" @click="createConversation()">Create</button>
                    </div>
                </div>
            </div>
        </modal>

	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>