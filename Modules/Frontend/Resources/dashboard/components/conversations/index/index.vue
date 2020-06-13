<template>
	<div class="bg-white">
		<div class="conversation-list d-flex flex-column h-100 position-relative">
			<div class="d-flex align-items-center">
				<div class="py-3 px-2">
					<button class="btn px-2 py-1 font-heading font-weight-bold" :class="{'text-gray-500': conversationTab != 'active'}" @click="conversationTab = 'active'">Chats</button>
				</div>
				<div class="py-3 btn-tab">
					<button class="btn px-2 py-1 font-heading font-weight-bold" :class="{'text-gray-500': conversationTab != 'archive'}" @click="conversationTab = 'archive'">Archive</button>
				</div>
                <div class="ml-auto dropleft pr-3">
                    <button class="btn btn-secondary btn-sm badge-pill line-height-1 p-1 btn-new-chat" data-toggle="modal" data-target="#newConversationModal"><plus-icon width="20" height="20"></plus-icon></button>
                </div>
			</div>

			<div class="overflow-auto px-3 pb-3 position-relative h-100" v-if="ready">
                <div v-if="conversations.length == 0" class="position-absolute-center w-100 text-center font-weight-light text-gray">
                    You don't have any conversations yet.
                </div>
                <template v-else>
    				<div v-for="conversation in orderedConversations" v-if="conversation.status == conversationTab" class="conversation-preview mb-1 position-relative rounded-lg" :class="{'active': conversation.id ==  $route.params.id}">
    			  		<div class="position-absolute conversation-dropdown dropleft opacity-0 pr-2">
                            <button class="btn btn-sm btn-light p-1 badge-pill line-height-0" type="button" data-toggle="dropdown" @click.prevent><more-h-icon width="20" height="20"></more-h-icon></button>
                            <div class="dropdown-menu py-1">
                                <small v-if="conversation.status == 'active'" class="dropdown-item d-flex align-items-center px-2" @click="conversation.status = 'archive'; updateConversation(conversation)"><archive-icon height="16" width="16"></archive-icon> &nbsp;&nbsp;Move to archives</small>
                                <small v-else-if="conversation.status == 'archive'" class="dropdown-item d-flex align-items-center px-2"" @click="conversation.status = 'active'; updateConversation(conversation)"><download-icon height="16" width="16"></download-icon> &nbsp;&nbsp;Move to active</small>
                            </div>
                        </div>
    	                <div class="p-2 cursor-pointer" @click="setConversation(conversation)">
    						<div class="media align-items-center conversation-members">
    						  	<div class="user-profile-image position-relative" :class="{'rounded bg-transparent': conversation.members.length > 1}" :style="{backgroundImage: 'url('+conversation.member.profile_image+')'}">
    						  		<span v-if="conversation.members.length == 1 && !conversation.member.profile_image">{{ conversation.member.initials }}</span>
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
    						  	<div class="media-body pl-3">
    	                            <div class="h6 mb-0 font-heading">{{ conversation.member.full_name || conversation.name }}</div>
    	                            <div v-html="(conversation.last_message.prefix || '') + conversation.last_message.message" class="mb-0 text-gray str-limit line-height-sm font-weight-light conversation-message-preview" :class="[conversation.last_message.is_read ? 'text-gray' : 'text-black font-weight-bold']"></div>           
    						  	</div>
    	                        <small class="text-gray font-weight-light text-nowrap conversation-time">{{ conversation.last_message.created_diff }}</small>   
    						</div>
    					</div>
    				</div>
                </template>
			</div>
		</div>



        <!-- New conversation modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="newConversationModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content overflow-hidden">
                    <div class="modal-header pb-0">
                        <h5 class="modal-title font-heading">New Conversation</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    	 <form-search :search-url="`/users/search`" placeholder="Search users..." class="h-100 overflow-hidden d-flex flex-column" ref="addNewConversationMembersForm">
                            <template v-slot="{ searching, results, trimmedQuery }">
                            	<div v-if="newConversation.members.length > 0" class="mt-1">
	                                <div v-for="(member, index) in newConversation.members" class="user-profile-image d-inline-block new-conversation-member mr-1" :style="{backgroundImage: 'url('+member.profile_image+')'}">
                                        <span v-if="!member.profile_image">{{ member.initials }}</span>
                                        <button class="btn btn-sm btn-gray-200 badge-pill p-0 line-height-0 position-absolute" @click="newConversation.members.splice(index, 1)">
                                            <close-icon height="16" width="16" class="cursor-pointer"></close-icon>
                                        </button>
	                                </div>
	                            </div>

                                <div class="overflow-y-only mt-2 members-search-container position-relative">
                                    <div v-if="searching" class="text-center position-absolute-center w-100">
                                        <div class="spinner-border spinner-border-sm text-primary"></div>
                                    </div>
                                    <div v-else-if="results.length == 0 && trimmedQuery.length > 0" class="text-center text-gray position-absolute-center w-100 font-weight-light">
                                        No results found.
                                    </div>
                                    <div v-else-if="results.length > 0">
                                    	<div v-for="result in results" v-if="result.id != $root.auth.id" @click="addNewConversationMember(result)" class="media member-result align-items-center rounded mb-2 p-2 cursor-pointer" :class="{'active': newConversation.members.find((x) => x.id == result.id)}">
	                                        <div class="user-profile-image user-profile-image-md align-self-center" :style="{backgroundImage: 'url('+result.profile_image+')'}">
	                                            <span v-if="!result.profile_image">{{ result.initials }}</span>
	                                        </div>
	                                        <div class="media-body pl-2">
	                                            <div class="font-weight-bold font-heading mb-0 h6">{{ result.full_name }}</div>
	                                            <div class="small font-weight-light text-gray text-nowrap">@{{ result.username }}</div>      
	                                        </div>
	                                    </div>
                                    </div>
                                </div>

	                            <div class="text-right mt-3">
	                                <button class="btn btn-primary" type="button" :disabled="newConversation.members.length == 0" @click="createConversation()">Create</button>
	                            </div>
                            </template>
                        </form-search>

                       <!--  <vue-form-validate @submit="conversationCreate">
                            <div class="form-group form-icon mb-0">
                                <search-icon height="20" width="20" fill="#999"></search-icon>
                                <input type="text" placeholder="Add members" v-model="newConversation.memberSearch" @input="searchMembers" class="form-control">
                            </div>
                            <small class="text-danger" v-if="newConversation.createChatError">{{ newConversation.createChatError }}</small>
                            <div class="mt-2">
                                <div v-for="member, index in newConversation.selectedChatMembers" class="font-weight-bold d-inline-block badge badge-pill badge-primary py-2 px-3 mr-1 mb-2">
                                {{ member.full_name }}&nbsp;
                                    <close-icon height="8" width="8" fill="white" transform="scale(2.5)" class="cursor-pointer" @click.native="newConversation.selectedChatMembers.splice(index, 1)"></close-icon>
                                </div>
                            </div>
                            <div class="position-relative mt-1 overflow-auto members-search-container">
                                <div v-if="newConversation.searchingMembers" class="text-center">
                                    <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                                </div>
                                <div v-if="newConversation.groupMembersResults.length > 0">
                                    <div class="media cursor-pointer border-top py-2 px-2 member-result" v-for="member in newConversation.groupMembersResults" v-if="member.id != $root.auth.id && !newConversation.selectedChatMembers.find((x) => x.id == member.id)" @click="newConversation.selectedChatMembers.push(member)">
                                        <div class="user-profile-image user-profile-image-sm align-self-center" :style="{backgroundImage: 'url('+member.profile_image+')'}">
                                            <span v-if="!member.profile_image">{{ member.initials }}</span>
                                        </div>
                                        <div class="media-body pl-2">
                                            <div class="font-weight-bold mb-n1">{{ member.full_name }}</div>
                                            <small class="ml-auto text-gray text-nowrap">{{ member.email }}</small>           
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right mt-3">
                                <vue-button :loading="newConversation.createChatLoading" button_class="btn btn-primary" type="submit"">Create</vue-button>
                            </div>
                        </vue-form-validate> -->
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>