<template>
	<div class="d-flex h-100">
		<!-- Conversations list -->
		<div class="conversation-list d-flex flex-column position-relative">
            <div class="bg-white px-3 pt-3 d-flex align-items-center position-relative">
                <h5 class="font-heading m-0">Messages</h5>
                <button class="ml-auto btn p-0"><search-icon></search-icon></button>
            </div>
			<div class="bg-white shadow-sm d-flex align-items-center">
				<div class="p-3 btn-tab" :class="{'btn-tab-active': conversationTab == 'active'}">
					<button class="btn px-2 py-1 rounded-0 font-heading font-weight-bold" @click="conversationTab = 'active'">Chats</button>
				</div>
				<div class="p-3 btn-tab" :class="{'btn-tab-active': conversationTab == 'archive'}">
					<button class="btn px-2 py-1 rounded-0 font-heading font-weight-bold" @click="conversationTab = 'archive'">Archive</button>
				</div>
                <div class="ml-auto dropleft pr-3">
                    <button class="btn btn-secondary btn-sm badge-pill line-height-1 p-1 btn-new-chat" @click="openNewChatModal()"><plus-icon width="20" height="20"></plus-icon></button>
                </div>
			</div>

			<div class="overflow-auto p-3">
				<div v-for="conversation in conversations" v-if="conversation.status == conversationTab" class="conversation-preview rounded border shadow-sm p-3 cursor-pointer mb-2 position-relative" :class="{'active': selectedConversation && selectedConversation.id == conversation.id}">
                    <div class="position-absolute conversation-dropdown dropright opacity-0">
                        <more-h-icon data-toggle="dropdown"></more-h-icon>
                        <div class="dropdown-menu py-1">
                            <small v-if="conversation.status == 'active'" class="dropdown-item d-flex align-items-center px-2" @click="conversation.status = 'archive'; updateConversation(conversation)"><archive-icon height="16" width="16"></archive-icon> &nbsp;&nbsp;Move to archives</small>
                            <small v-else-if="conversation.status == 'archive'" class="dropdown-item d-flex align-items-center px-2"" @click="conversation.status = 'active'; updateConversation(conversation)"><download-icon height="16" width="16"></download-icon> &nbsp;&nbsp;Move to active</small>
                        </div>
                    </div>
					<div class="media" @click="setConversation(conversation)">
					  	<div class="user-profile-image" :style="{backgroundImage: 'url('+conversation.user.profile_image+')'}">
					  		<span v-if="!conversation.user.profile_image">{{ conversation.user.initials }}</span>
					  	</div>
					  	<div class="media-body pl-3">
                            <div class="h6 mb-0 font-heading">{{ conversation.user.full_name || conversation.name }}</div>
                            <div v-if="conversation.source" class="mb-2">
                                <sign-in-icon height="14" width="14"></sign-in-icon> <small class="text-primary">{{ conversation.source }}</small>
                            </div>
					    	<div class="mt-1">
                                <small v-html="conversation.last_message.message" class="mb-0 text-gray str-limit line-height-sm" :class="[conversation.last_message.is_read ? 'text-gray' : 'text-black font-weight-bold']"></small>                  
                            </div>
                            <div class="mt-2 d-flex">
                                <div v-for="member in conversation.members" class="user-profile-image user-profile-image-sm ml-1" :style="{backgroundImage: 'url('+member.user.profile_image+')'}">
                                    <span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
                                </div>

                                 <small class="ml-auto text-gray-500 text-nowrap align-self-end">{{ conversation.last_message.created_diff }}</small>   
                            </div>
					  	</div>
					</div>
				</div>
			</div>
		</div>



		<!-- Messages list -->
		<div class="conversation-messages border-left border-right text-nowrap flex-grow-1 bg-white overflow-hidden position-relative" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false" @drop.prevent="dropFile">
            <div v-if="dragOver" class="filedrop position-absolute w-100 h-100 bg-light">
                <span class="h3 position-absolute-center text-gray">Drop Files Here</span>
            </div>
			<div v-if="selectedConversation" class="d-flex flex-column h-100">
				<div class="p-3 bg-white border-bottom position-relative d-flex align-items-center">
					<div class="d-flex align-items-center">
                        <div class="user-profile-image" :style="{backgroundImage: 'url('+selectedConversation.user.profile_image+')'}">
                                <span v-if="!selectedConversation.user.profile_image">{{ selectedConversation.user.initials }}</span>
                        </div>
                        <div class="ml-2">
                            <h5 class="font-heading mb-0">{{ selectedConversation.user.full_name || selectedConversation.name }}</h5>
                            <div class="d-flex align-items-center" v-if="selectedConversation.user.id">
                                <span class="chat-status mr-1" :class="[isOnline ? 'bg-success' : 'bg-gray']">&nbsp;</span> 
                                <small class="text-gray">{{ isOnline ? 'Online' : `Last online ${selectedConversation.user.last_online}` }}</small>
                            </div>
                            <div class="d-flex" v-else>
                                <small class="text-gray">{{ selectedConversation.members.length }} members</small>
                            </div>
                        </div>
                    </div>
                    <div class="ml-auto">
                        <!-- <button class="btn btn-sm font-weight-bold" :class="{'btn-orange': detailsTab == 'profile'}" @click="detailsTab = 'profile'">Profile</button> -->
                        <!-- <button class="btn btn-sm font-weight-bold" :class="{'btn-orange': detailsTab == 'files'}" @click="detailsTab = 'files'">Files</button>
                        <button class="btn btn-sm font-weight-bold" :class="{'btn-orange': detailsTab == 'notes'}" @click="detailsTab = 'notes'">Notes</button>
                        <button class="btn btn-sm font-weight-bold" :class="{'btn-orange': detailsTab == 'history'}" @click="detailsTab = 'history'">History</button> -->
                        <!-- <button class="btn btn-sm font-weight-bold" :class="{'btn-orange': detailsTab == 'bookings'}" @click="detailsTab = 'bookings'">Bookings</button> -->

                        <button class="btn btn-white btn-circle-actions border" @click="initCall"><phone-icon></phone-icon></button>
                        <button class="btn btn-white btn-circle-actions" @click="openRecorder('screen')"><cast-icon></cast-icon></button>
                        <button class="btn btn-white btn-circle-actions" @click="detailsTab = 'bookings'" :class="{'active': detailsTab == 'bookings'}"><calendar-day-icon></calendar-day-icon></button>
                        <button class="btn btn-white btn-circle-actions" @click="detailsTab = 'profile'" :class="{'active': detailsTab == 'profile'}"><user-icon></user-icon></button>
                    </div>
				</div>
				<div class="p-3 overflow-y-auto flex-grow-1 bg-white" ref="message-group-container" id="message-group-container">
	                <div v-for="grouped_message in grouped_messages" class="w-100 message-group">
                        <small class="font-heading font-weight-bold font-size-base line-height-1 message-sender d-block" :class="{'text-right': grouped_message.outgoing}">{{ grouped_message.sender.full_name }}</small>
	                	<div class="d-flex align-items-end message-body" :class="{'outgoing-message text-right flex-row-reverse': grouped_message.outgoing}">
                            <div class="user-profile-image" :style="{backgroundImage: 'url('+grouped_message.sender.profile_image+')'}">
                                <span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
                            </div>
	                		<div class="px-1 flex-1">
                            	<div v-for="message in grouped_message.messages" v-cloak :id="'message-' + message.id" class="message-item">
		                            <div class="text-wrap position-relative message-content" :class="{'p-0 bg-transparent': ['emoji', 'image', 'video'].find((x) => x == message.type)}">
                                        <div class="message-actions p-1 position-absolute bg-white d-flex rounded shadow-sm" :class="{show: message.is_history}">
                                            <div class="cursor-pointer" @click="markHistory(message)">
                                                <bookmark-icon height="20" width="20" :fill="message.is_history ? '#6e82ea' : ''"></bookmark-icon>
                                            </div>
                                        </div>
		                            	<message-type :message="message" :outgoing="grouped_message.outgoing"></message-type>
		                            </div>
	                            </div>
	                        </div>
	                	</div>
                        <small class="text-gray d-block" :class="{'text-right': grouped_message.outgoing}">{{ grouped_message.created_at }}</small>
	                </div>
                </div>

				

            <div class="border-top shadow-sm p-2 align-items-center bg-white message-form d-flex">
                <vue-form-validate @submit="sendText" class="w-x100 flex-grow-1">
                    <input type="text" @paste="inputPaste" v-model="textMessage" class="form-control border-0 shadow-none message-input bg-gray-200" placeholder="Write a message.." data-required />
                </vue-form-validate>

                <div class="actions text-nowrap overflow-hidden" :class="{'expand': moreActions}">
                    <button type="button" class="line-height-sm ml-2 btn px-0" @blur="emojipicker = false" :class="{'emojipicker-open': emojipicker}">
                       <emojipicker @select="selectEmoji"></emojipicker>
                    </button>
                    <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('video')"><camera-icon width="20" height="20"></camera-icon></button>
                    <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('audio')"><microphone-icon width="20" height="20"></microphone-icon></button>
                    <button class="line-height-sm ml-2 btn px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon width="20" height="20"></add-note-icon></button>
                    <input type="file" hidden ref="fileMedia" @change="addFile" />

                    <!-- <button class="btn px-0 mx-2 btn-more" @click="moreActions = moreActions ? false : true">
                        <plus-circle-icon width="20" height="20" class="no-scale" :class="{'rotate': moreActions}"></plus-circle-icon>
                    </button>
                    <template v-if="moreActions">
                        <button class="btn px-0 mx-2" @click="openRecorder('screen')">
                            <duplicate-alt-icon width="20" height="20"></duplicate-alt-icon>
                        </button>
                    </template> -->
                </div>
            </div>

			</div>
		</div>
    


		<!-- Conversations details -->
		<div v-if="selectedConversation" class="conversation-details text-center p-3 h-100 position-relative" :class="{'open': detailsTab}">
			<button class="btn p-0 position-absolute btn-close" @click="detailsTab = ''"><close-icon height="34" width="36"></close-icon></button>
            <div class="text-left h-100">
                <!-- Profile -->
                <div v-if="detailsTab == 'profile'" class="h-100 overflow-hidden d-flex flex-column ">
                    <div class="text-center">
                        <div class="user-profile-image d-inline-block" :style="{backgroundImage: 'url('+selectedConversation.user.profile_image+')'}">
                            <span v-if="!selectedConversation.user.profile_image">{{ selectedConversation.user.initials }}</span>
                        </div>
                        <h4 class="font-heading conversation-title" @keydown="disableNewline" spellcheck="false" @blur="updateConversationName" :contenteditable="selectedConversation.members.length >= 1">{{ selectedConversation.user.full_name || selectedConversation.name }}</h4>
                    </div>
                    <div class="btn-group btn-group-sm w-100" role="group">
                        <button type="button" class="btn btn-white border py-2" :class="{'active': profileTab == 'overview'}" @click="profileTab = 'overview'"><small class="font-weight-bold d-block">Overview</small></button>
                        <button type="button" class="btn btn-white border py-2" :class="{'active': profileTab == 'files'}" @click="profileTab = 'files'"><small class="font-weight-bold d-block">Files</small></button>
                        <button type="button" class="btn btn-white border py-2" :class="{'active': profileTab == 'notes'}" @click="profileTab = 'notes'"><small class="font-weight-bold d-block">Notes</small></button>
                        <button type="button" class="btn btn-white border py-2" :class="{'active': profileTab == 'history'}" @click="profileTab = 'history'"><small class="font-weight-bold d-block">History</small></button>
                    </div> 

                    <!-- Overview -->
                    <div v-if="profileTab == 'overview'" class="mt-2">
                        <div v-if="selectedConversation.members.length == 0">
                            <div class="form-group">
                                <strong class="text-gray">Email:</strong>
                                <div class="font-weight-bold">{{ selectedConversation.user.email }}</div>
                            </div>
                            <div class="form-group">
                                <strong class="text-gray">Phone:</strong>
                                <div class="font-weight-bold">{{ selectedConversation.user.phone }}</div>
                            </div>
                            <div class="form-group">
                                <strong class="text-gray">Tags:</strong>
                                <div class="mt-2" v-if="(selectedConversation.tags || {}).length > 0">
                                    <div v-for="(tag, index) in selectedConversation.tags" class="font-weight-bold d-inline-block badge badge-pill badge-primary py-1 px-2 mr-1 mb-2 line-height-sm">
                                    {{ tag }}&nbsp;
                                        <close-icon height="8" width="8" fill="white" transform="scale(2.5)" class="cursor-pointer" @click.native="selectedConversation.tags.splice(index, 1); updateConversation(selectedConversation)"></close-icon>
                                    </div>
                                </div>
                                <form class="input-group border rounded overflow-hidden mt-1" @submit.prevent="addTag">
                                    <input type="text" class="form-control form-control-sm border-0 shadow-none" placeholder="Add Tag" v-model="newTag">
                                    <div class="input-group-append">
                                    <button type="submit" class="btn btn-secondary shadow-none btn-sm border-0 line-height-1" :disabled="!newTag.trim()">
                                        <plus-icon width="20" height="20"></plus-icon>
                                    </button>
                                    </div>
                                </form>
                            </div>

                            <div class="form-group">
                                <strong class="text-gray">Blacklisted services:</strong>
                                <select class="form-control form-control-sm shadow-none cursor-pointer">
                                    <option value="" v-for="service in services">{{ service.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div v-else>
                            <div class="my-2">
                                <div class="form-group form-icon mb-0">
                                    <search-icon height="20" width="20" fill="#999"></search-icon>
                                    <input type="text" v-model="memberSearch" placeholder="Add members" @input="searchMembers($event, false)" class="form-control shadow-none form-control-sm">
                                </div>
                                <div class="position-relative mt-1 overflow-auto members-search-container">
                                    <div v-if="searchingMembers" class="text-center">
                                        <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    </div>
                                    <div v-if="groupMembersResults.length > 0">
                                        <div class="media cursor-pointer border-top p-1 member-result" v-for="member in groupMembersResults" v-if="member.id != $root.auth.id && !selectedConversation.members.find((x) => x.user_id == member.id)" @click="addMember(member)">
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
                            </div>

                            <div class="media border-top py-2 px-2 member-item position-relative" v-for="member in selectedConversation.members">
                                <trash-icon fill="red" class="position-absolute cursor-pointer delete-member opacity-0" height="18" width="18" @click.native="deleteMember(member)"></trash-icon>
                                <div class="user-profile-image user-profile-image-sm align-self-center" :style="{backgroundImage: 'url('+member.user.profile_image+')'}">
                                    <span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
                                </div>
                                <div class="media-body pl-2">
                                    <div class="font-weight-bold mb-n1">{{ member.user.full_name }}</div>
                                    <small class="ml-auto text-gray text-nowrap">{{ member.user.email }}</small>           
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Files -->
                    <div v-else-if="profileTab == 'files'" class="mt-2 d-flex flex-column overflow-hidden h-100">
                        <div class="flex-fill">
                            <select class="form-control form-control-sm shadow-none" v-model="fileType">
                                <option value="all">All Files</option>
                                <option value="image">Photos</option>
                                <option value="video">Videos</option>
                                <option value="audio">Audios</option>
                                <option value="file">Documents & Others</option>
                            </select>
                        </div>

                        <div class="overflow-y-only flex-grow-1 h-100 mt-2">
                            <div v-for="file in selectedConversation.messages.slice().reverse()" v-if="isFile(file) && (file.type == fileType || fileType == 'all') && file.updated_at" class="p-2 mb-2 d-flex align-items-center border bg-white rounded position-relative cursor-pointer" @click="openFile(file)">
                                <div class="flex-1">
                                    <div style="width: 50px; height: 50px" class="position-relative rounded overflow-hidden bg-secondary">
                                        <div v-if="file.type == 'image' || file.type == 'video'" :style="{backgroundImage: 'url('+file.preview+')'}" class="file-thumbnail">
                                            <div class="position-absolute-center preview-video-play" v-if="file.type == 'video'">
                                                <play-icon height="15" width="15"></play-icon>
                                            </div>
                                        </div>
                                        <div v-else-if="file.type == 'audio'">
                                            <volume-mid-icon height="30" width="30" class="position-absolute-center"></volume-mid-icon>
                                        </div>
                                        <div v-else-if="file.type == 'file'" class="p-1">
                                            <component height="30" width="30" class="position-absolute-center" :is="fileIcon(file.metadata.extension)"></component>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-100 overflow-hidden pl-2 file-details">
                                    <span class="font-weight-bold file-filename d-block text-nowrap text-ellipsis">{{ (file.metadata || {}).filename }}</span>

                                     <div class="text-muted text-ellipsis">
                                        <span class="mr-2">{{ ['audio', 'video'].find((x) => x == file.type) ? file.metadata.duration : file.metadata.size }}</span>
                                        {{ file.created_diff }} ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- History -->
                    <div v-else-if="profileTab == 'history'" class="message-group mt-2 overflow-y-only h-100">
                        <div v-for="history in selectedConversation.messages" v-if="history.is_history">
                            <div class="media outgoing-message my-3" v-if="history.user.id == $root.auth.id || history.user.id == 'chatbot'">
                                <div class="media-body pr-2 text-right overflow-hidden">
                                    <div class="font-weight-bold line-height-1">{{ history.user.is_chatbot ? 'Genie' : 'You' }}</div>
                                    <div class="mt-2 overflow-hidden">
                                        <div class="message-content rounded position-relative mw-100 cursor-pointer" v-scroll-to="{el: '#message-'+history.id, container: '#message-group-container', offset: -10, onStart: highlightMessage, onDone: removeHiglightMessage}">
                                            <message-type :click="false" :message="history"></message-type>
                                        </div>
                                        <small class="text-gray d-block">{{ history.created_at }}</small>
                                    </div>
                                </div>
                                <div class="user-profile-image user-profile-image-message" :style="{backgroundImage: 'url('+history.user.profile_image+')'}">
                                    <span v-if="!history.user.profile_image">{{ history.user.initials }}</span>
                                </div>
                            </div>
                            <div class="media my-3 text-left" v-else>
                                <div class="user-profile-image user-profile-image-message" :style="{backgroundImage: 'url('+history.user.profile_image+')'}">
                                    <span v-if="!history.user.profile_image">{{ history.user.initials }}</span>
                                </div>
                                <div class="media-body pl-2 overflow-hidden">
                                    <div class="font-weight-bold line-height-1">{{ history.user.full_name }}</div>
                                    <div class="mt-2">
                                        <div class="message-content rounded text-wrap position-relative mw-100 cursor-pointer" v-scroll-to="{el: '#message-'+history.id, container: '#message-group-container', offset: -10, onStart: highlightMessage, onDone: removeHiglightMessage}">
                                            <message-type :click="false" :message="history"></message-type>
                                        </div>
                                        <small class="text-gray d-block">{{ history.created_at }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Notes -->
                    <div v-else-if="profileTab == 'notes'" class="text-left mt-2">
                        <button class="btn btn-sm btn-outline-primary mb-2" @click="addingNote = true">+ Add Note</button>
                        <vue-form-validate v-if="addingNote" @submit="addNote" class="mb-3">
                            <textarea v-model="newNote" data-required rows="3" class="form-control form-control-sm resize-none shadow-none" placeholder="Add note.."></textarea>
                            <div class="d-flex align-items-center mt-1">
                                <div class="ml-auto">
                                    <button type="button" class="btn btn-sm btn-link text-body pl-0" @click="addingNote = false">Cancel</button>
                                    <button type="submit" class="btn btn-sm btn-primary ml-auto">Add</button>
                                </div>
                            </div>
                        </vue-form-validate>
                        <div v-for="note in selectedConversation.notes" class="mb-2 py-2 position-relative note border-bottom">
                            <trash-icon fill="red" class="position-absolute cursor-pointer delete-note opacity-0" height="18" width="18" @click.native="deleteNote(note)"></trash-icon>
                            <p class="mb-0">{{ note.notes }}</p>
                            <small class="text-gray">{{ note.created_at }}</small>
                        </div>
                    </div>
                </div>

                <!-- Bookings -->
                <div v-else-if="detailsTab == 'bookings'" class="text-left h-100">
                    <h4 class="font-heading">Bookings</h4>
                    <bookings :user="selectedConversation.user"></bookings>
                </div>
            </div>
		</div>

        

        <!-- New chat modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="newChatCreateModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content overflow-hidden">
                    <div class="modal-header pb-0">
                        <h5 class="modal-title">New chat</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                         <vue-form-validate @submit="createChat">
                                <div class="form-group form-icon mb-0">
                                    <search-icon height="20" width="20" fill="#999"></search-icon>
                                    <input type="text" placeholder="Add members" v-model="newChat.memberSearch" @input="searchMembers" class="form-control">
                                </div>
                                <small class="text-danger" v-if="newChat.createChatError">{{ newChat.createChatError }}</small>
                                <div class="mt-2">
                                    <div v-for="member, index in newChat.selectedChatMembers" class="font-weight-bold d-inline-block badge badge-pill badge-primary py-2 px-3 mr-1 mb-2">
                                    {{ member.full_name }}&nbsp;
                                        <close-icon height="8" width="8" fill="white" transform="scale(2.5)" class="cursor-pointer" @click.native="newChat.selectedChatMembers.splice(index, 1)"></close-icon>
                                    </div>
                                </div>
                                <div class="position-relative mt-1 overflow-auto members-search-container">
                                    <div v-if="newChat.searchingMembers" class="text-center">
                                        <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    </div>
                                    <div v-if="newChat.groupMembersResults.length > 0">
                                        <div class="media cursor-pointer border-top py-2 px-2 member-result" v-for="member in newChat.groupMembersResults" v-if="member.id != $root.auth.id && !newChat.selectedChatMembers.find((x) => x.id == member.id)" @click="newChat.selectedChatMembers.push(member)">
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
                                    <vue-button :loading="newChat.createChatLoading" button_class="btn btn-primary" type="submit"">Create</vue-button>
                                </div>
                         </vue-form-validate>
                    </div>
                </div>
            </div>
        </div>

        <file-view-modal v-if="selectedFile && ['image', 'video'].find((x) => x == selectedFile.type)" :file="selectedFile" @close="selectedFile = null"></file-view-modal>
        <audio-recorder-modal v-if="recorder == 'audio'" @submit="sendAudio" @close="recorder = ''"></audio-recorder-modal>
        <screen-recorder-modal v-if="recorder == 'screen'" @submit="sendVideo" @close="recorder = ''"></screen-recorder-modal>

       <video-recorder-modal v-if="recorder == 'video'" @submit="sendVideo" @close="recorder = ''" :conversation="selectedConversation"></video-recorder-modal>

        <video-call-modal v-if="videoCall" :data="videoCall" @close="videoCall = null" @submit="sendVideo"></video-call-modal>
	</div>
</template>

<style scoped lang="scss" src="./messages.scss"></style>
<script src="./messages.js"></script>