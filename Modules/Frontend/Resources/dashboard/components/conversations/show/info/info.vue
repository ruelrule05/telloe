<template>
    <div v-if="conversation" class="conversation-details h-100 position-relative bg-white overflow-hidden" :class="{'open': open}">
    	<div class="h-100 d-flex flex-column">
            <div class="d-flex align-items-center border-bottom py-3 px-3">
                <div class="info-header">
                    <strong class="text-capitalize d-block">{{ $root.detailsTab }}</strong>
                    <span class="text-muted">{{ conversation.member.full_name || conversation.name }}</span>
                </div>
                <button class="btn btn-white p-0 ml-auto" @click="closeInfo()"><close-icon height="30" width="30"></close-icon></button>
            </div>
            <div class="text-left flex-grow-1 overflow-hidden">

                <!-- Profile -->
                <div v-if="$root.detailsTab == 'profile'" class="h-100 py-3 overflow-auto">
                    <div class="text-center">
                        <div class="user-profile-image d-inline-block" :style="{backgroundImage: 'url('+conversation.member.profile_image+')'}">
                            <span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
                        </div>
                        <h4 class="h5 font-heading conversation-title mb-0 rounded" @keydown="disableNewline" spellcheck="false" @blur="updateConversationName" :contenteditable="conversation.members.length > 1">{{ conversation.member.full_name || conversation.name }}</h4>
                        <div class="text-muted">{{ conversation.member.email }}</div>
                        <div v-if="conversation.member.is_pending" class="mt-1 badge badge-icon d-inline-flex align-items-center bg-warning-light text-warning">
                            <clock-icon class="fill-warning" height="12" width="12"></clock-icon>&nbsp;Pending
                        </div>
                        <div v-else-if="(conversation.member.role || {}).role != 'support' && conversation.members.length == 1" class="mt-1">
                            <button v-if="$root.auth.role.role == 'client'" v-tooltip.bottom="'Bookings'" class="btn btn-white badge-pill p-1" @click="$root.detailsTab = 'bookings'" :class="{'active': $root.detailsTab == 'bookings'}">
                                <planner-icon width="24" height="24"></planner-icon>
                            </button>
                        </div>
                    </div>
                    <div v-if="(conversation.member.role || {}).role != 'support' && !conversation.member.is_pending" id="info-items" class="mt-3">
                        <!-- Overview -->
                        <div class="border-bottom border-top px-3 py-1">
                            <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#overview">
                                Overview
                                <chevron-right-icon class="ml-auto mr-n2" transform="scale(1.3)"></chevron-right-icon>
                            </h5>
                            <div id="overview" class="collapse" data-parent="#info-items">
                                <div v-if="conversation.members.length == 1" class="form-group">
                                    <div class="d-flex align-items-center dropdown">
                                        <label class="text-muted mb-0" ref="customFieldsLabel">Bespoke Fields</label>
                                        <button class="ml-auto btn btn-sm btn-white border d-flex align-items-center" data-toggle="dropdown" data-display="static"><plus-icon height="10" width="10" transform="scale(2)" class="mr-1"></plus-icon> Add Field</button>
                                        <div class="dropdown-menu w-100 p-2" @click.stop>
                                            <vue-form-validate @submit="addCustomField()">
                                                <div class="form-group mb-2">
                                                    <label class="form-label">Name</label>
                                                    <select v-if="!customFieldForm.is_custom" class="form-control form-control-sm cursor-pointer shadow-none" :class="{'text-muted': !customFieldForm.name}" v-model="customFieldForm.name" data-required>
                                                        <option value="" disabled selected>Select Fields</option>
                                                        <option :value="custom_field" v-for="custom_field in $root.auth.custom_fields">{{ custom_field }}</option>
                                                        <option value="custom">- New custom field -</option>
                                                    </select>
                                                    <input v-else type="text" class="form-control form-control-sm shadow-none" v-model="customFieldForm.name" placeholder="Field name" data-required>
                                                </div>
                                                <div class="form-group mb-0">
                                                    <label class="form-label">Value</label>
                                                    <input type="text" class="form-control form-control-sm shadow-none" v-model="customFieldForm.value" placeholder="Field value" data-required>
                                                </div>
                                                <div class="d-flex justify-content-end align-items-center mt-2">
                                                    <button type="button" class="btn btn-sm btn-white border mr-1" @click="resetCustomFieldForm()">Cancel</button>
                                                    <button type="submit" class="btn btn-sm btn-primary">Add</button>
                                                </div>
                                            </vue-form-validate>
                                        </div>
                                    </div>
                                    <div v-for="(custom_field, index) in conversation.custom_fields" class="d-flex align-items-center my-2 custom-field position-relative">
                                        <div class="overflow-hidden">
                                            <small class="d-block mb-n1 text-muted text-ellipsis">{{ custom_field.name }}</small>
                                            <div class="text-ellipsis">{{ custom_field.value }}</div>
                                        </div>
                                        <div class="ml-auto position-static d-flex align-items-center pl-1 dropdown">
                                            <button type="button" class="btn btn-light btn-sm p-1 badge-pill line-height-0 mr-1 edit-custom-field" data-toggle="dropdown" data-display="static" @click="editCustomField(custom_field)"><pencil-icon width="16" height="16"></pencil-icon></button>
                                            <div class="dropdown-menu w-100 p-2" @click.stop>
                                                <vue-form-validate @submit="updateCustomField(custom_field)">
                                                    <h6 class="font-heading">Edit Custom Field</h6>
                                                    <div class="form-group mb-2">
                                                        <label class="form-label">Name</label>
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="custom_field.new_name" placeholder="Field name" data-required>
                                                    </div>
                                                    <div class="form-group mb-0">
                                                        <label class="form-label">Value</label>
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="custom_field.new_value" placeholder="Field value" data-required>
                                                    </div>
                                                    <div class="d-flex align-items-center mt-2">
                                                        <button type="button" class="btn btn-white line-height-0 btn-sm btn-link text-body p-1 badge-pill" @click="$refs['customFieldsLabel'].click(); conversation.custom_fields.splice(index, 1); updateConversation(conversation)">
                                                            <trash-icon fill="red" width="18" height="18"></trash-icon>
                                                        </button>
                                                        <div class="ml-auto">
                                                            <button type="button" class="btn btn-sm btn-white border mr-1" @click="$refs['customFieldsLabel'].click();">Cancel</button>
                                                            <button type="submit" class="btn btn-sm btn-primary">Save</button>
                                                        </div>
                                                    </div>
                                                </vue-form-validate>
                                            </div>

                                            <toggle-switch v-model="custom_field.is_visible" @input="updateConversation(conversation)"></toggle-switch>
                                        </div>
                                    </div>
                                </div>

                                <!-- Available services -->
                                <div v-if="conversation.members.length == 1">
                                    <div class="form-group">
                                        <label class="text-muted">Available Services</label>
                                        <div v-for="service in services" class="d-flex align-items-center mb-2">
                                            <div>
                                                <h6 class="font-heading mb-0">{{ service.name }}</h6>
                                                <small class="text-muted d-block">{{ service.duration }} minutes</small>
                                            </div>
                                            <div class="ml-auto">
                                                <toggle-switch :value="!(blacklisted_services.find((x) => x.service_id == service.id) || {}).is_blacklisted" @input="storeUserBlacklistedService({user_id: conversation.member.id, service_id: service.id, is_blacklisted: !$event})"></toggle-switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Conversation members -->
                                <div v-else>
                                    <div class="my-2">
                                        <!-- <div class="form-group form-icon mb-0">
                                            <search-icon height="20" width="20" fill="#999"></search-icon>
                                            <input type="text" v-model="memberSearch" placeholder="Add members" @input="searchMembers($event, false)" class="form-control shadow-none form-control-sm">
                                        </div>
                                        <div class="position-relative mt-1 overflow-auto members-search-container">
                                            <div v-if="searchingMembers" class="text-center">
                                                <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                                            </div>
                                            <div v-if="groupMembersResults.length > 0">
                                                <div class="media cursor-pointer border-top p-1 member-result" v-for="member in groupMembersResults" v-if="member.id != $root.auth.id && !conversation.members.find((x) => x.user_id == member.id)" @click="addMember(member)">
                                                    <div class="user-profile-image user-profile-image-sm align-self-center" :style="{backgroundImage: 'url('+member.profile_image+')'}">
                                                        <span v-if="!member.profile_image">{{ member.initials }}</span>
                                                    </div>
                                                    <div class="media-body pl-2">
                                                        <div class="font-weight-bold mb-n1">{{ member.full_name }}</div>
                                                        <small class="ml-auto text-muted text-nowrap">{{ member.email }}</small>           
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>

                                    <div class="media border-top py-2 px-2 member-item position-relative" v-for="member in conversation.members">
                                        <trash-icon fill="red" class="position-absolute cursor-pointer delete-member opacity-0" height="18" width="18" @click.native="deleteMember(member)"></trash-icon>
                                        <div class="user-profile-image user-profile-image-sm align-self-center" :style="{backgroundImage: 'url('+member.user.profile_image+')'}">
                                            <span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
                                        </div>
                                        <div class="media-body pl-2">
                                            <div class="font-weight-bold mb-n1">{{ member.user.full_name }}</div>
                                            <small class="ml-auto text-muted text-nowrap">{{ member.user.email }}</small>           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Files -->
                        <div class="border-bottom px-3 py-1">
                            <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#files">
                                Files
                                <chevron-right-icon class="ml-auto mr-n2" transform="scale(1.3)"></chevron-right-icon>
                            </h5>
                            <div id="files" class="collapse pb-1" data-parent="#info-items">
                                <select class="form-control form-control-sm shadow-none" v-model="fileType">
                                    <option value="all">All Files</option>
                                    <option value="image">Photos</option>
                                    <option value="video">Videos</option>
                                    <option value="audio">Audios</option>
                                    <option value="file">Documents & Others</option>
                                </select>
                                
                                <div v-if="conversation.messages" class="mt-2">
                                    <div v-for="file in conversation.messages.slice().reverse()" v-if="isFile(file) && (file.type == fileType || fileType == 'all') && file.updated_at" class="p-2 mb-2 d-flex align-items-center border bg-white rounded position-relative cursor-pointer" @click="openFile(file)">
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
                                                <!-- {{ file.created_diff }} -->
                                            </div>
                                            <div v-if="file.tags.length > 0" class="d-flex align-items-center">
                                                <bookmark-icon width="18" height="18" fill="#999" class="ml-n1"></bookmark-icon>
                                                <span>{{ file.tags.join(', ') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tags & History -->
                        <div class="border-bottom px-3 py-1">
                            <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#tags_history">
                                Tags & History
                                <chevron-right-icon class="ml-auto mr-n2" transform="scale(1.3)"></chevron-right-icon>
                            </h5>
                            <div id="tags_history" class="collapse" data-parent="#info-items">
                                <!-- History -->
                                <div v-for="grouped_message in $parent.grouped_messages" v-if="grouped_message.messages.find((x) => x.is_history)" class="w-100 message-group">
                                    <small class="font-heading font-weight-bold font-size-base line-height-1 message-sender d-block" :class="{'text-right': grouped_message.outgoing}">{{ grouped_message.sender.full_name }}</small>
                                    <div class="d-flex align-items-end message-body" :class="{'outgoing-message text-right flex-row-reverse': grouped_message.outgoing}">
                                        <div>
                                            <div class="user-profile-image" :style="{backgroundImage: 'url('+grouped_message.sender.profile_image+')'}">
                                                <span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
                                            </div>
                                        </div>
                                        <div class="px-1 flex-1">
                                            <div v-for="message in grouped_message.messages" v-if="message.is_history" v-cloak class="message-item">
                                                <div class="text-wrap position-relative message-content cursor-pointer" :class="{'p-0 bg-transparent': ['emoji', 'image', 'video'].find((x) => x == message.type)}" v-scroll-to="{el: '#message-'+message.id, container: '#message-group-container', offset: -30, onStart: highlightMessage, onDone: removeHiglightMessage, cancelable: false}">
                                                    <div class="message-actions p-1 position-absolute" :class="{show: message.is_history}">
                                                        <div class="action-content cursor-pointer line-height-1">
                                                             <div class="action-content cursor-pointer line-height-1">
                                                                <div class="action-button show">
                                                                    <history-icon height="20" width="20" class="active" @click.native="$parent.markHistory(message)"></history-icon>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <message-type :click="false" :message="message" :outgoing="grouped_message.outgoing"></message-type>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <small class="text-muted d-block" :class="{'text-right': grouped_message.outgoing}">{{ grouped_message.created_at_format }}</small>
                                </div>

                                <!-- Tags -->
                                <div class="h-100 overflow-hidden d-flex flex-column">
                                    <div>
                                        <input type="text" class="form-control form-control-sm shadow-none" placeholder="Search tags..." v-model="tagSearch">
                                    </div>
                                    <div v-if="tagsData.tags.length > 0" class="my-2">
                                        <span class="text-muted">Available tags:</span> <span v-for="tag in tagsData.tags" class="badge badge-secondary mr-1 line-height-sm">{{ tag }}</span>
                                    </div>

                                    <div class="overflow-y-only mt-2">
                                        <div v-if="tagsData.length == 0" class="text-center text-muted py-2">
                                            No results found.
                                        </div>
                                        <div v-else v-for="data in tagsData.data" class="mb-2">
                                            <div class="small text-muted text-uppercase">{{ data.type }} </div>
                                            <div class="rounded bg-white border py-2 px-3">
                                                <div v-if="data.type == 'message'" class="message-group mb-0">
                                                    <small class="font-heading font-weight-bold font-size-base line-height-1 message-sender d-block" :class="{'text-right': data.data.outgoing}">{{ data.data.user.full_name }}</small>
                                                    <div class="d-flex align-items-end message-body" :class="{'outgoing-message text-right flex-row-reverse': data.data.outgoing}">
                                                        <div>
                                                            <div class="user-profile-image" :style="{backgroundImage: 'url('+data.data.user.profile_image+')'}">
                                                                <span v-if="!data.data.user.profile_image">{{ data.data.user.initials }}</span>
                                                            </div>
                                                        </div>
                                                        <div class="px-1 flex-1">
                                                            <div class="text-wrap position-relative message-content" :class="{'p-0 bg-transparent': ['emoji', 'image', 'video'].find((x) => x == data.data.type)}">
                                                                <message-type :click="false" :message="data.data" :outgoing="data.data.outgoing"></message-type>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <small class="text-muted d-block" :class="{'text-right': data.data.outgoing}">{{ data.data.created_at_format }}</small>
                                                </div>

                                                <div v-else-if="data.type == 'note'">
                                                    <p class="mb-0">{{ data.data.notes }}</p>
                                                    <small class="text-muted d-block">{{ data.data.created_at_format }}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Notes -->
                        <div class="border-bottom px-3 py-1">
                            <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#notes">
                                Notes
                                <chevron-right-icon class="ml-auto mr-n2" transform="scale(1.3)"></chevron-right-icon>
                            </h5>
                            <div id="notes" class="collapse pb-1" data-parent="#info-items">
                                <div class="dropdown mb-2">
                                    <button class="btn btn-sm btn-white border d-flex align-items-center" data-toggle="dropdown" data-display="static"><plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon>Add Note</button>
                                    <div class="dropdown-menu w-100 p-2" @click.stop>
                                        <vue-form-validate @submit="addNote()">
                                            <textarea v-model="newNote" data-required rows="3" class="form-control form-control-sm resize-none shadow-none border" placeholder="Add note.."></textarea>
                                            <div class="d-flex justify-content-end align-items-center mt-2">
                                                <button type="button" class="btn btn-sm btn-white border mr-1" @click="newNote = ''; $refs['customFieldsLabel'].click()">Cancel</button>
                                                <button type="submit" class="btn btn-sm btn-primary">Add</button>
                                            </div>
                                        </vue-form-validate>
                                    </div>
                                </div>
                                <div v-for="note in conversation.notes" class="mb-2 position-relative note">
                                    <div class="note-actions position-absolute d-flex align-items-center dropleft w-25 justify-content-end">
                                        <div class="action-content position-relative mr-1 line-height-1">
                                            <div data-toggle="dropdown" data-offset="-140,0" class="action-button d-flex align-items-center">
                                                <span v-if="note.tags.length > 0" class="action-label">{{ note.tags.length }}</span>
                                                <bookmark-icon height="20" width="20" class="cursor-pointer"></bookmark-icon>
                                            </div>
                                            <div class="dropdown-menu p-1 bg-light" @click.stop>
                                                <vue-form-validate class="input-group border rounded overflow-hidden" @submit="updateNoteTags(note)">
                                                    <input type="text" class="form-control form-control-sm border-0 shadow-none" placeholder="Add tag" data-required v-model="note.newTag">
                                                    <div class="input-group-append">
                                                        <button type="submit" class="btn btn-white border p-1 shadow-none btn-sm border-0 line-height-1">
                                                            <plus-icon width="20" height="20" class="no-action"></plus-icon>
                                                        </button>
                                                    </div>
                                                </vue-form-validate>

                                                <div class="text-left tags-container" v-if="note.tags.length > 0">
                                                    <div v-for="(tag, index) in note.tags" class="d-inline-block badge badge-primary py-1 px-2 mr-1 mt-1">
                                                    {{ tag }}&nbsp;
                                                        <close-icon height="8" width="8" fill="white" transform="scale(2.5)" class="cursor-pointer no-action" @click.native="note.tags.splice(index, 1); updateNoteTags(note)"></close-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="action-content">
                                            <div class="action-button">
                                                <trash-icon fill="red" class="cursor-pointer delete-note" height="18" width="18" @click.native="deleteNote(note)"></trash-icon>
                                            </div>
                                        </div>
                                        <div class="position-absolute text-muted text-right small note-metalabel">{{ note.tags.join(', ') }}</div>
                                    </div>

                                    <p class="mb-0">{{ note.notes }}</p>
                                    <small class="text-muted d-block">{{ note.created_at_format }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Bookings -->
                <div v-else-if="$root.detailsTab == 'bookings' && $root.auth.role.role == 'client'" class="text-left h-100">
                    <bookings :user="conversation.member" :membersLength="conversation.members.length"></bookings>
                </div>
            </div>
    	</div>
    </div>
</template>

<script src="./info.js"></script>
<style lang="scss" scoped src="./info.scss"></style>