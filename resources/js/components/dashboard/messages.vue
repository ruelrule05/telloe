<template>
	<div class="d-flex h-100">
		<!-- Conversations list -->
		<div class="conversation-list d-flex flex-column position-relative">
			<div class="bg-white shadow-sm d-flex align-items-center">
				<div class="p-3 btn-tab" :class="{'btn-tab-active': conversationTab == 'active'}">
					<button class="btn px-2 py-1 rounded-0 font-heading font-weight-bold" @click="conversationTab = 'active'">Chats</button>
				</div>
				<div class="p-3 btn-tab" :class="{'btn-tab-active': conversationTab == 'archive'}">
					<button class="btn px-2 py-1 rounded-0 font-heading font-weight-bold" @click="conversationTab = 'archive'">Archives</button>
				</div>
                <div class="ml-auto dropleft">
                    <button class="btn p-0 pr-2" data-toggle="dropdown"><plus-icon></plus-icon></button>
                    <div class="dropdown-menu py-1">
                        <span class="dropdown-item cursor-pointer d-flex align-items-center" @click="openNewChatModal()"><edit-square-icon height="18" width="18" class="mr-2"></edit-square-icon>New chat</span>
                    </div>
                </div>
			</div>

			<div class="overflow-auto p-2">
				<div v-for="conversation in conversations" v-if="conversation.status == conversationTab" class="conversation-preview rounded shadow-sm p-2 cursor-pointer mb-2 position-relative" :class="{'active': selectedConversation && selectedConversation.id == conversation.id}">
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
					  	<div class="media-body pl-2">
                            <div class="h6 mb-0">{{ conversation.user.full_name || conversation.name }}</div>
                            <div v-if="conversation.source" class="mb-2">
                                <sign-in-icon height="14" width="14"></sign-in-icon> <small class="text-primary">{{ conversation.source }}</small>
                            </div>
					    	<div class="d-flex">
                                <small v-html="conversation.last_message.message" class="mb-0 text-gray str-limit" :class="[conversation.last_message.is_read ? 'text-gray' : 'text-black font-weight-bold']"></small>    
                                 <small class="ml-auto text-gray-400 text-nowrap">{{ conversation.last_message.created_diff }}</small>                 
                            </div>
                            <div class="mt-2 d-flex justify-content-end">
                                <div class="user-profile-image user-profile-image-sm" :style="{backgroundImage: 'url('+$root.auth.profile_image+')'}">
                                    <span v-if="!$root.auth.profile_image">{{ $root.auth.initials }}</span>
                                </div>
                                <div v-for="member in conversation.members" class="user-profile-image user-profile-image-sm ml-1" :style="{backgroundImage: 'url('+member.user.profile_image+')'}">
                                    <span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
                                </div>
                            </div>
					  	</div>
					</div>
				</div>
			</div>
		</div>



		<!-- Messages list -->
		<div class="conversation-messages border-left text-nowrap flex-grow-1 bg-white overflow-hidden position-relative">
			<div v-if="selectedConversation" class="d-flex flex-column h-100">
				<div class="p-3 bg-white border-bottom position-relative">
					<strong class="font-heading">{{ selectedConversation.user.full_name || selectedConversation.name }}</strong>
				</div>
				<div class="p-3 overflow-y-auto flex-grow-1" ref="message-group-container" id="message-group-container">
	                <div v-for="grouped_message in grouped_messages" class="w-100 message-group">
	                    <!-- outgoing message -->
	                	<div class="media outgoing-message" v-if="grouped_message.sender.id == $root.auth.id || grouped_message.sender.id == 'chatbot'">
	                		<div class="media-body pr-2 text-right">
                                <div class="font-weight-bold line-height-1">{{ grouped_message.sender.is_chatbot ? 'Genie' : 'You' }}</div>
	                            <div class="mt-2">
	                            	<div v-for="message in grouped_message.messages" v-cloak :id="'message-' + message.id" class="message-item">
			                            <div class="message-content text-wrap position-relative">
                                            <div class="message-actions p-1 position-absolute bg-white d-flex rounded shadow-sm" :class="{show: message.is_history}">
                                                <div v-tooltip.top="'Mark as history'" class="cursor-pointer" @click="markHistory(message)">
                                                    <bookmark-icon height="20" width="20" :fill="message.is_history ? '#6e82ea' : ''"></bookmark-icon>
                                                </div>
                                            </div>
			                            	<message-type :message="message"></message-type>
			                            </div>
		                            	<small class="text-gray d-block">{{ message.created_at }}</small>
		                            </div>
	                            </div>
	                        </div>
					  		<div class="user-profile-image" :style="{backgroundImage: 'url('+grouped_message.sender.profile_image+')'}">
								<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
					  		</div>
	                	</div>
						
						<!-- incoming message -->
	                	<div class="media" v-else>
					  		<div class="user-profile-image" :style="{backgroundImage: 'url('+grouped_message.sender.profile_image+')'}">
								<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
					  		</div>
	                		<div class="media-body pl-2">
                                <div class="font-weight-bold line-height-1">{{ grouped_message.sender.full_name }}</div>
                                <div class="mt-2">
		                            <div v-for="message in grouped_message.messages" v-cloak :id="'message-' + message.id" class="message-item">
			                            <div class="message-content text-wrap position-relative">
                                            <div class="message-actions p-1 position-absolute bg-white d-flex rounded shadow-sm" :class="{show: message.is_history}">
                                                <div v-tooltip.top="'Mark as history'" class="cursor-pointer" @click="markHistory(message)">
                                                    <bookmark-icon height="20" width="20" :fill="message.is_history ? '#6e82ea' : ''"></bookmark-icon>
                                                </div>
                                            </div>
                                            <message-type :message="message"></message-type>
                                        </div>
		                            	<small class="text-gray d-block">{{ message.created_at }}</small>
		                            </div>
	                            </div>
	                        </div>
	                	</div>
	                </div>
                </div>

				<div class="px-3 pb-3">
					<vue-form-validate class="d-flex align-items-center border shadow-sm py-3 px-2 rounded message-form" @submit="sendText()">
						<input type="text" class="form-control form-control-sm border-0 shadow-none" v-model="textMessage" data-required placeholder="Write your message..">
			            <button type="button" class="line-height-sm ml-2 btn px-0 emojipicker">
                            <emojipicker @select="sendEmoji"></emojipicker>
			            </button>
			            <button class="line-height-sm ml-2 btn px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon width="20" height="20"></add-note-icon></button>
			            <input type="file" hidden ref="fileMedia" @change="addFile" />
			            <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('audio')"><microphone-icon width="20" height="20"></microphone-icon></button>
			            <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('video')"><camera-icon width="20" height="20"></camera-icon></button>
                        <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('live')"><video-icon width="24" height="24"></video-icon></button>
						<button type="submit" class="btn btn-dark badge-pill px-3 btn-sm ml-3">Send</button>
					</vue-form-validate>
				</div>
			</div>
		</div>
    


		<!-- Conversations details -->
		<div class="conversation-details text-center p-3 h-100">
			<div v-if="selectedConversation" class="d-flex flex-column h-100">
				<div>
                    <div class="user-profile-image d-inline-block" :style="{backgroundImage: 'url('+selectedConversation.user.profile_image+')'}">
                        <span v-if="!selectedConversation.user.profile_image">{{ selectedConversation.user.initials }}</span>
                    </div>
                    <h4 class="font-heading conversation-title" @keydown="disableNewline" spellcheck="false" @blur="updateConversationName" :contenteditable="selectedConversation.members.length >= 1">{{ selectedConversation.user.full_name || selectedConversation.name }}</h4>
                    <div class="btn-group btn-group-sm w-100" role="group">
                        <button type="button" class="btn btn-white border py-2" :class="{'active': detailsTab == 'overview'}" @click="detailsTab = 'overview'"><small class="font-weight-bold d-block">Overview</small></button>
                        <button type="button" class="btn btn-white border py-2" :class="{'active': detailsTab == 'files'}" @click="detailsTab = 'files'"><small class="font-weight-bold d-block">Files</small></button>
                        <button type="button" class="btn btn-white border py-2" :class="{'active': detailsTab == 'notes'}" @click="detailsTab = 'notes'"><small class="font-weight-bold d-block">Notes</small></button>
                        <button type="button" class="btn btn-white border py-2" :class="{'active': detailsTab == 'history'}" @click="detailsTab = 'history'"><small class="font-weight-bold d-block">History</small></button>
                        <button type="button" class="btn btn-white border py-2" :class="{'chat_data': detailsTab == 'chat_data'}" @click="detailsTab = 'inquiries'"><small class="font-weight-bold d-block">Chat Data</small></button>
                    </div>            
                </div>

                <div class="mt-3 overflow-auto flex-grow-1 h-100 text-left">
                    <!-- Overview -->
                    <div v-if="detailsTab == 'overview'">
                        <div v-if="selectedConversation.members.length == 0">
                            <h6 class="font-weight-bolder mb-3">Details</h6>
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
                                <div class="font-weight-bold"></div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="mb-2 p-2 rounded bg-white">
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
                    <div v-else-if="detailsTab == 'files'">
                        <select class="form-control form-control-sm mb-2" v-model="fileType">
                            <option value="all">All Files</option>
                            <option value="image">Photos</option>
                            <option value="video">Videos</option>
                            <option value="audio">Audios</option>
                            <option value="file">Documents & Others</option>
                        </select>

                        <div class="d-flex flex-wrap mx-n1">
                            <div v-for="file in selectedConversation.messages" v-if="isFile(file) && (file.type == fileType || fileType == 'all')" class="w-25 px-1 mb-2" style="height: 70px">
                                <div class="rounded shadow-sm h-100 w-100 overflow-hidden cursor-pointer bg-white position-relative" @click="openFile(file)">
                                    <div v-if="file.type == 'image' || file.type == 'video'" :style="{backgroundImage: 'url('+file.preview+')'}" class="file-thumbnail">
                                        <div class="position-absolute-center preview-video-play" v-if="file.type == 'video'">
                                            <play-icon height="15" width="15"></play-icon>
                                        </div>
                                    </div>
                                    <div v-else-if="file.type == 'audio'">
                                        <volume-mid-icon height="30" width="30" class="position-absolute-center"></volume-mid-icon>
                                        <span class="preview-filename text-muted position-absolute w-100 text-center px-1 text-nowrap text-ellipsis">{{ file.metadata.duration }}</span>
                                    </div>
                                    <div v-else-if="file.type == 'file'" class="p-1">
                                        <component height="30" width="30" class="position-absolute-center" :is="fileIcon(file.metadata.extension)"></component>
                                        <span class="preview-filename text-muted position-absolute w-100 text-center px-1 text-nowrap text-ellipsis">{{ file.metadata.filename }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- History -->
                    <div v-else-if="detailsTab == 'history'" class="message-group">
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
                    <div v-else-if="detailsTab == 'notes'" class="text-left">
                        <button class="btn btn-sm btn-outline-primary mb-2" @click="addingNote = true">+ Add Note</button>
                        <vue-form-validate v-if="addingNote" @submit="addNote" class="mb-3">
                            <textarea v-model="newNote" data-required rows="3" class="form-control form-control-sm resize-none shadow-none" placeholder="Add note.."></textarea>
                            <div class="d-flex align-items-center mt-1">
                                <div class="ml-auto">
                                    <button class="btn btn-sm btn-link text-body pl-0" @click="addingNote = false">Cancel</button>
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



        <!-- Live Recorder modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="liveRecorderModal">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content overflow-hidden rounded">
                    <div class="modal-body p-0">
                        <div v-if="selectedConversation && recorder == 'live'" class="h-100">
                            <live-recorder @close="closeRecorder('live')" :conversation="selectedConversation"></live-recorder>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Audio view modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="audioViewModal">
            <div class="modal-dialog modal-dialog-centered" :class="{'modal-lg': selectedFile && selectedFile.type == 'video'}" role="document">
                <div class="modal-content overflow-hidden">
                    <button type="button" class="close position-absolute" data-dismiss="modal" aria-label="Close" @click="selectedFile = null">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <div v-if="selectedFile" class="pt-5 w-100">
                            <waveplayer v-if="selectedFile.type == 'audio'" :source="selectedFile.source" :duration="selectedFile.metadata.duration"></waveplayer>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- File view modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="fileViewModal">
            <div class="modal-dialog modal-dialog-centered" :class="{'modal-lg': selectedFile && selectedFile.type == 'video'}" role="document">
                <div class="modal-content overflow-hidden">
                    <button type="button" class="close position-absolute" data-dismiss="modal" aria-label="Close" @click="selectedFile = null">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body p-0">
                        <div v-if="selectedFile" class="h-100">
                            <img v-if="selectedFile.type =='image'" :src="selectedFile.source" class="w-100">
                            <video controls v-else-if="selectedFile.type =='video'" :src="selectedFile.source" class="w-100 d-block bg-black"></video>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Audio Recorder modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="audioRecorderModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div v-if="selectedConversation && recorder == 'audio'" class="h-100">
                            <audio-recorder @submit="sendAudio" @close="closeRecorder('audio')"></audio-recorder>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Video Recorder modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="videoRecorderModal">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content overflow-hidden rounded">
                    <div class="modal-body p-0">
                        <div v-if="selectedConversation && recorder == 'video'" class="h-100">
                            <video-recorder @submit="sendVideo" @close="closeRecorder('video')" :conversation="selectedConversation"></video-recorder>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import io from 'socket.io-client';
import dayjs from 'dayjs';
import filesize from 'filesize';
import VueFormValidate from '../../components/vue-form-validate';
import MessageType from '../../components/message-type';
import CommentIcon from '../../icons/comment';
import DocumentIcon from '../../icons/document';
import VolumeMidIcon from '../../icons/volume-mid';
import FilePdfIcon from '../../icons/file-pdf';
import FileArchiveIcon from '../../icons/file-archive';
import PlayIcon from '../../icons/play';
import Tooltip from './../../directives/tooltip.js';
import CameraIcon from '../../icons/camera';
import MicrophoneIcon from '../../icons/microphone';
import AddNoteIcon from '../../icons/add-note';
import MoreHIcon from '../../icons/more-h';
import BookmarkIcon from '../../icons/bookmark';
import TrashIcon from '../../icons/trash';
import ArchiveIcon from '../../icons/archive';
import SignInIcon from '../../icons/sign-in';
import DownloadIcon from '../../icons/download';
import PlusIcon from '../../icons/plus';
import UsersIcon from '../../icons/users';
import SearchIcon from '../../icons/search';
import CloseIcon from '../../icons/close';
import EditSquareIcon from '../../icons/edit-square';
import VideoIcon from '../../icons/video';
import Emojipicker from '../../components/emojipicker';
import Waveplayer from '../../components/waveplayer';
import VueScrollTo from 'vue-scrollto';
export default {
	components: {VueFormValidate, MessageType, CommentIcon, CameraIcon, MicrophoneIcon, AddNoteIcon, Emojipicker, VolumeMidIcon, DocumentIcon, FilePdfIcon, FileArchiveIcon, PlayIcon, MoreHIcon, BookmarkIcon, TrashIcon, ArchiveIcon, SignInIcon, DownloadIcon, PlusIcon, UsersIcon, SearchIcon, CloseIcon, EditSquareIcon, VideoIcon, Waveplayer,
        'video-recorder': () => import(/* webpackChunkName: "video-recorder" */ '../../components/video-recorder'),
        'audio-recorder': () => import(/* webpackChunkName: "audio-recorder" */ '../../components/audio-recorder'),
        'live-recorder': () => import(/* webpackChunkName: "live-recorder" */ '../../components/live-recorder'),
    },
	directives: {Tooltip, VueScrollTo},

    data: () => ({
    	conversationTab: 'active',
    	conversations: [],
    	selectedConversation: null,
    	convoLoading: false,
    	textMessage: '',
        detailsTab: 'overview',
        fileType: 'all',
        recorder: '',
        selectedFile: null,
        notification_sound: null,
        addingNote: false,
        newNote: '',
        newChat: {
            memberSearch: '',
            searchingMembers: false,
            groupMembersResults: [],
            selectedChatMembers: [],
            createChatError: '',
            createChatLoading: false
        },
        memberSearch: '',
        searchingMembers: false,
        groupMembersResults: [],
        selectedChatMembers: [],
        socket: null,
        videoCallDesc: null,
        videoCallData: null,
        videoCallData: true,

    }),

    computed: {
        historyMessages() {

        },

        grouped_messages() {
            const grouped_messages = [];
            if (this.selectedConversation.messages) {
                // sort messages by timestamp
                const messages = (this.selectedConversation.messages || []).sort((a, b) => {
                    return (parseInt(a.timestamp) > parseInt(b.timestamp)) ? 1 : -1;
                });

                for (var i = 0; i <= messages.length - 1; i++) {
                    let message_group = { sender: messages[i].user || (messages[i].metadata.is_chatbot ? {id: 'chatbot'} : ''), messages: [messages[i]] };
                    groupMessage();

                    function groupMessage() {
                        const next_message = messages[i + 1];
                        if (next_message && next_message.user.id == message_group.sender.id) {
                            message_group.messages.push(messages[i + 1]);
                            i++;
                            groupMessage();
                        }
                    }
                    grouped_messages.push(message_group);
                }
            }

            return grouped_messages;
        },
    },

    created() {
        this.notification_sound = new Audio('/notifications/new_message.mp3');
        this.socket = io('https://snapturebox.com:8443');
        this.socket.on('new_message', (data) => {
            if(data.conversation.widget.id == this.$root.auth.widget.id) {
                if(this.selectedConversation && this.selectedConversation.id == data.conversation.id) {
                    let conversationData = this.conversations.find((x) => x.id == this.selectedConversation.id);
                    if(conversationData) {
                        this.getMessageByID(data).then((message) => {
                            if(message) {
                                this.selectedConversation.messages.push(message);
                                this.$set(conversationData, 'last_message', message);
                                this.notification_sound.play();
                                this.scrollDown();
                            }
                        });
                    }
                } else {
                    this.getMessageByID(data).then((message) => {
                        if(message) {
                            let conversationData = this.conversations.find((x) => x.id == message.conversation_id);
                            if(conversationData) {
                                this.$set(conversationData, 'last_message', message);
                            } else {
                                this.conversations.push(message.conversation);
                            }
                            this.setConversation(message.conversation);
                            this.orderConversations();
                        }
                    });
                }
            }
        });

    	this.getData();
    },

    mounted() {
    },

    methods: {
        async getMessageByID(data) {
            let message = await axios.get(`/dashboard/messages/${data.id}`).catch((e) => {});
            if(message) return message.data;
        },

        incomingCall(data) {
            this.videoCallDesc = data.desc;
            this.videoCallData = data;
            this.videoCalling = true;
            $('#liveRecorderModal').modal('show');
        },

        disableNewline(e) {
            if(e.keyCode == 13) e.preventDefault();
        },

        updateConversationName(e) {
            if(this.selectedConversation) {
                let newName = e.target.textContent.trim();
                if(newName != this.selectedConversation.name) {
                    this.selectedConversation.name = newName;
                    let conversation = this.conversations.find((x) => x.id == this.selectedConversation.id);
                    if(conversation) conversation.name = newName;
                    this.updateConversation(this.selectedConversation);
                }
            }
        },

        addMember(member) {
            if(this.selectedConversation) {
                member.conversation_id = this.selectedConversation.id;
                this.memberSearch = '';
                this.selectedChatMembers = [];
                this.groupMembersResults = [];
                this.searchingMembers = false;
                axios.post(`/dashboard/conversation_members`, member).then((response) => {
                    this.selectedConversation.members.unshift(response.data);
                    let index = this.conversations.findIndex((x) => x.id == this.selectedConversation.id);
                    if(index > -1) {
                        this.conversations[index].members.unshift(response.data);
                    }
                });
            }
        },

        deleteMember(member) {
            if(this.selectedConversation) {
                let index = this.selectedConversation.members.findIndex((x) => x.id == member.id);
                if(index > -1) this.selectedConversation.members.splice(index, 1);
                let conversation = this.conversations.find((x) => x.id == this.selectedConversation.id);
                if(this.selectedConversation.members.length == 1) this.selectedConversation.members = [];
                
                if(conversation) {
                    let memberIndex = conversation.members.findIndex((x) => x.id == member.id);
                    if(memberIndex > -1) conversation.members.splice(memberIndex, 1);
                    if(conversation.members.length == 1) conversation.members = [];
                }

                axios.delete(`/dashboard/conversation_members/${member.id}`).then((response) => {
                    if(response.data.user) {
                        this.selectedConversation.user = response.data.user;
                        if(conversation) conversation.user = response.data.user;
                    }
                });
            }
        },

        createChat() {
            if(this.newChat.selectedChatMembers.length > 0) {
                this.newChat.createChatLoading = true;
                let selectedChatMembers = [];
                this.newChat.selectedChatMembers.forEach((m) => {
                    selectedChatMembers.push(m.id);
                });
                axios.post('/dashboard/conversations', {members: selectedChatMembers}).then((response) => {
                    $('#newChatCreateModal').modal('hide');
                    this.newChat.searchingMembers = false;
                    this.newChat.groupMembersResults = [];
                    this.newChat.selectedChatMembers = [];
                    this.newChat.createChatError = '';
                    this.newChat.createChatLoading = false;
                    this.conversations.push(response.data);
                    this.orderConversations();
                    this.setConversation(response.data);
                });
            } else {
                this.newChat.createChatError = 'Please add at leat one (1) member';
            }
        },

        searchMembers(e, newChat = true) {
            let chatTarget = newChat ? this.newChat : this;
            if(!chatTarget['searchingMembers']) {
                chatTarget['searchingMembers'] = true;
                setTimeout(() => {
                    axios.get(`/dashboard/users?search=${e.target.value.trim()}`).then((response) => {
                        chatTarget['groupMembersResults'] = response.data;
                    });
                    chatTarget['searchingMembers'] = false;
                }, 500);
            }
        },

        openNewChatModal() {
            this.newChat.memberSearch = '';
            $('#newChatCreateModal').modal('show');
        },

        updateConversation(conversation) {
            axios.put(`/dashboard/conversations/${conversation.id}`, conversation);
        },

        deleteNote(note) {
            if(this.selectedConversation) {
                let index = this.selectedConversation.notes.findIndex((x) => x.id == note.id);
                if(index > -1) this.selectedConversation.notes.splice(index, 1);
                axios.delete(`/dashboard/notes/${note.id}`);
            }
        },

        addNote() {
            if(this.selectedConversation) {
                let note = {
                    conversation_id: this.selectedConversation.id,
                    notes: this.newNote,
                };
                axios.post('/dashboard/notes', note).then((response) => {
                    this.newNote = '';
                    this.addingNote = false;
                    this.selectedConversation.notes.push(response.data);
                });
            }
        },

        removeHiglightMessage(message) {
            $(`#${message.id} .message-content`).removeClass('bg-primary');
        },

        highlightMessage(message) {
            $(`#${message.id} .message-content`).addClass('bg-primary');
        },

        openFile(file) {
            this.selectedFile = file;
            if(file.type == 'image' || file.type == 'video') {
                $('#fileViewModal').modal('show');
            } else if(file.type == 'audio'){
                $('#audioViewModal').modal('show');
            } else {
                this.downloadMedia(file);
            }
        },

        markHistory(message) {
            let is_history = message.is_history ? false : true;
            this.$set(message, 'is_history', is_history);
            axios.put(`/dashboard/messages/${message.id}`, message).then((response) => {
            });
        },

        closeRecorder(type) {
            $(`#${type}RecorderModal`).modal('hide');
            this.recorder = '';
        },
        openRecorder(type) {
            this.recorder = type;
            $(`#${type}RecorderModal`).modal({backdrop: 'static', keyboard: false}).modal('show');
        },

        fileIcon(extension) {
            let iconComponent = 'document-icon';
            let videoExtensions = ['mp4', 'webm'];
            let audioExtensions = ['mp3', 'wav'];
            if (videoExtensions.indexOf(extension) > -1) {
                iconComponent = 'file-video-icon';
            } else if (audioExtensions.indexOf(extension) > -1) {
                iconComponent = 'file-audio-icon';
            } else {
                switch (extension) {
                    case 'pdf':
                        iconComponent = 'file-pdf-icon';
                        break;

                    case 'zip':
                        iconComponent = 'file-archive-icon';
                        break;

                    case 'rar':
                        iconComponent = 'file-archive-icon';
                        break;

                    case 'docx':
                        iconComponent = 'document-icon';
                        break;

                    case 'doc':
                        iconComponent = 'document-icon';
                        break;

                    case 'txt':
                        iconComponent = 'document-icon';
                        break;

                    case 'xls':
                        break;

                    case 'xlsx':
                        break;
                }
            }

            return iconComponent;
        },

        isFile(message) {
            let fileTypes = ['image', 'video', 'audio', 'file'];
            return fileTypes.indexOf(message.type) > -1;
        },

        sendMessage(message) {
            if(this.selectedConversation) {
                this.selectedConversation.messages.push(message);
                let conversationData = this.conversations.find((x) => x.id == this.selectedConversation.id);
                let messageCopy = Object.assign({}, message);
                if(conversationData) {
                    messageCopy.message = `You: ${messageCopy.message}`;
                    this.$set(conversationData, 'last_message', messageCopy);
                }
                this.scrollDown();
                this.orderConversations();

                messageCopy = Object.assign({}, message);
                let bodyFormData = new FormData();
                if(messageCopy.metadata) messageCopy.metadata = JSON.stringify(messageCopy.metadata);
                Object.keys(messageCopy).map((k) => {
                    bodyFormData.set(k, messageCopy[k]);
                });
                bodyFormData.set('conversation_id', this.selectedConversation.id)
                axios.post(`/dashboard/messages`, bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then((response) => {
                    let index = this.selectedConversation.messages.findIndex((x) => x.id == messageCopy.id);
                    if(index > -1) {
                        this.$set(this.selectedConversation.messages[index], 'id', response.data.id);
                        this.socket.emit('message_sent', response.data);
                    }
                });
            }
        },

        sendVideo(video) {
            if(this.selectedConversation) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    source: video.source,
                    preview: video.preview,
                    timestamp: dayjs().valueOf(),
                    type: 'video',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                };
                this.sendMessage(message);
                this.closeRecorder('video');
            }
        },

        sendAudio(audio) {
            if(this.selectedConversation) {
                const timestamp = dayjs().valueOf();
            	let message = {
                    user: this.$root.auth,
                    source: audio.source,
                    timestamp: dayjs().valueOf(),
                    type: 'audio',
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                    metadata: {duration: audio.duration}
                };
            	this.sendMessage(message);
                this.closeRecorder('audio');
            }
        },

        downloadMedia(message) {
            if (message.source) {
                let link = document.createElement("a");
                link.href = message.source;
                link.download = message.metadata.filename;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        },

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },

        async addFile() {
            let fileInput = this.$refs['fileMedia'];
            if (this.selectedConversation && fileInput.value) {
                const timestamp = dayjs().valueOf();
                let message = {
                    user: this.$root.auth,
                    timestamp: dayjs().valueOf(),
                    type: 'file',
                    source: fileInput.files[0],
                    timestamp: dayjs().valueOf(),
                    created_at: dayjs(timestamp).format('hh:mm A'),
                    is_read: 1,
                    created_diff: 'Just now',
                };

                let fileExtension = fileInput.value.split('.').pop();
                if (this.isImage(fileExtension)) {
                    message.type = 'image';
                    var img = new Image();
                    img.src = URL.createObjectURL(fileInput.files[0]);
                    img.onload = () => {
                        let canvas = document.createElement('canvas');
                        let context = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        let srcUrl = canvas.toDataURL('image/jpeg');
                        // Preview
                        let canvasPreview = document.createElement('canvas');
                        let contextPreview = canvasPreview.getContext('2d');
                        canvasPreview.width = img.width / 2;
                        canvasPreview.height = img.height / 2;
                        contextPreview.drawImage(img, 0, 0, canvasPreview.width, canvasPreview.height);
                        let previewUrl = canvasPreview.toDataURL('image/jpeg');
                        message.preview = previewUrl;
                        this.sendMessage(message);
                    };
                } else {
                    let fileBase64 = await this.fileToBase64(this.$refs['fileMedia'].files[0]);
                    let messageData = {
                        filename: fileInput.value.split(/(\\|\/)/g).pop(),
                        extension: fileExtension,
                        size: filesize(fileInput.files[0].size, {round: 0}),
                    };
                    message.metadata = messageData;
                    this.sendMessage(message);
                }
            }
        },

        isImage(extension) {
            let imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
            return imageExtensions.indexOf(extension) > -1;
        },

        sendEmoji(emoji) {
            const timestamp = dayjs().valueOf();
            let message = {
                user: this.$root.auth,
                message: emoji,
                type: 'emoji',
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A'),
                is_read: 1,
                created_diff: 'Just now',
            };
            this.sendMessage(message);
        },

    	sendText() {
            const timestamp = dayjs().valueOf();
            let message = {
                user: this.$root.auth,
                message: this.textMessage.trim(),
                type: 'text',
                is_read: 1,
                timestamp: dayjs().valueOf(),
                created_at: dayjs(timestamp).format('hh:mm A'),
                created_diff: 'Just now',
            };
            this.sendMessage(message);
            this.textMessage = '';
    	},

    	getData() {
    		axios.get('/dashboard/conversations').then((response) => {
    			this.conversations = response.data;
                this.orderConversations();
    			this.$root.contentloading = false;
                let firstConversation = this.conversations.find((x) => x.status == 'active');
    			if(firstConversation) this.setConversation(firstConversation);
    		});
    	},

        orderConversations() {
            if (this.conversations.length > 0) {
                this.conversations = this.conversations.sort((a, b) => {
                    const a_timestamp = a.last_message.timestamp || a.timestamp;
                    const b_timestamp = b.last_message.timestamp || b.timestamp;
                    return (a_timestamp > b_timestamp) ? -1 : 1;
                });
            }
        },

        setConversation(conversation) {
        	this.$set(conversation.last_message, 'is_read', true);
            axios.get(`/dashboard/conversations/${conversation.id}?is_read=true`).then((response) => {
                this.convoLoading = false;
                this.selectedConversation = response.data;
                this.scrollDown();
            });
        },

        scrollDown() {
            setTimeout(() => {
                const message_container = this.$refs['message-group-container'];
                if (message_container) {
                    message_container.scrollTop = message_container.scrollHeight;
                }
            }, 50);
        },
    }
}
</script>
<style scoped lang="scss">
	@import '../../../sass/variables';
    .conversation-title[contenteditable]{
        border: solid 1px transparent;
        &:focus{
            border-color: $gray-300;
            outline: 0;
        }
    }
    .delete-member{
        top: 5px;
        right: 5px;
        transition: $transition-base;
    }
    .member-item:hover{
        .delete-member{
            opacity: 1;
        }
    }
    .member-result:hover{
        background-color: $light;
    }
    .members-search-container{
        max-height: 200px;
    }
    .form-icon {
        position: relative;
        svg{
            position: absolute;
            top: 50%;
            left: 8px;
            transform: translateY(-50%);
        }
        .form-control {
            padding-left: 35px !important;
        }
    }
    .conversation-dropdown{
        top: 8px;
        right: 5px;
        z-index: 5;
    }
    .note:hover .delete-note{
        opacity: 1;
    }
    .delete-note{
        top: 5px;
        right: 5px;
        transition: $transition-base;
    }
    #fileViewModal {
        img, video {
            height: 500px;
        }
    }
    .message-form svg {
        transition: $transition-base;
    }
    .message-form svg:hover{
        transform: scale(1.1);
    }
    #videoRecorderModal .modal-content{
        height: 500px;
    }
    #audioRecorderModal .modal-content{
        height: 500px;
    }
    .preview-video-play{
        line-height: 0;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.75);
        padding: 5px;
    }
    .preview-filename{
        bottom: 2px;
        left: 0;
        font-size: 9px;
        font-weight: 200;
    }
    .file-thumbnail{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .user-profile-image-sm{
        width: 25px !important;
        height: 25px !important;
        span {
            font-size: 9px !important;
        }
    }
	.conversation-messages{
		width: 0;
	}
	.conversation-list{
		width: 350px;
	}
	.conversation-details{
		width: 350px;
		.user-profile-image{
			width: 50px;
			height: 50px;
			span {
				font-size: 18px;
			}
            &.user-profile-image-message{
                width: 35px;
                height: 35px;
            }
		}
	}
	.btn-tab{
		position: relative;
		.btn{
			color: #aaa;
		}
		&.btn-tab-active{
			border-bottom-color:#999;
			&:after{
				content: '';
				width: 100%;
				height: 2px;
				background-color: #999;
				position: absolute;
				bottom: 0;
				left: 0;
			}
			.btn{
				color: black;
			}
		}
	}
	.user-profile-image{
		width: 35px;
		height: 35px;
	}
	.str-limit {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.conversation-preview{
		background-color: white;
		transition: $transition-base;
		&.active{
			background-color: #f7f8fc;
		}
        &:hover{
            .conversation-dropdown{
                opacity: 1;
            }
        }
	}
	.message-group {
	    margin-bottom: 1.5rem;
	    .media .media-body .message-item:not(:last-child):not(:only-child) {
	    	small {
	    		display: none !important;
	    	}
	    }
	    .message-content {
	        padding: 10px 14px;
	        margin-bottom: 2px;
	        font-size: 14px;
	        display: inline-block;
	        text-align: left;
            transition: $transition-base;
	    }


        .message-content:hover {
            .message-actions{
                visibility:visible;
                opacity: 1;
            }
        }
        .message-actions.show{
            visibility:visible;
            opacity: 1;
        }
        .message-actions{
            visibility: hidden;
            opacity: 0;
            top: 0;
            z-index: 10;
            transition: visibility 0s, opacity 0.14s;
            svg {
                transition: $transition-base;
                &:hover{
                    transform: scale(1.1);
                }
            }
        }

	    /* Outgoing message */
        .outgoing-message {
        	padding-left: 45px;
            .message-content {
	            background-color: #DAE3EC;
                border-top-left-radius: $border-radius;
                border-bottom-left-radius: $border-radius;
            }
            .message-item:only-child,
            .message-item:first-child {
                .message-content {
                    border-top-right-radius: $border-radius;
                }
            }
            .message-item:only-child,
            .message-item:last-child:not(:only-child) {
                .message-content {
                    border-bottom-right-radius: $border-radius;
                }
            }
            .message-actions{
                left: -25px;
            }
        }

	    /* Incoming message */
	    .media:not(.outgoing-message) {
        	padding-right: 45px;
	        .message-content {
                background-color: #f3f4f9;
	            border-top-right-radius: $border-radius;
	            border-bottom-right-radius: $border-radius;
	        }
	        .message-item:only-child,
	        .message-item:first-child {
	            .message-content {
	                border-top-left-radius: $border-radius;
	            }
	        }
	        .message-item:only-child,
	        .message-item:last-child:not(:only-child) {
	            .message-content {
	                border-bottom-left-radius: $border-radius;
	            }
	        }
            .message-actions{
                right: -25px;
            }
	    }
	}
</style>