<template>
    <div class="h-100 overflow-hidden">
        <!-- Profile -->
        <div class="h-100 py-3 overflow-auto" ref="info-container">
            <div class="text-center info-profile" :class="{'hidden': hideProfile}">
                <div class="user-profile-image d-inline-block" ref="profileImage" :style="{backgroundImage: 'url(' + conversation.member.profile_image + ')'}">
                    <span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
                </div>
                <h4 class="h5 font-heading conversation-title mb-0 rounded" @keydown="disableNewline" spellcheck="false" @blur="updateConversationName" :contenteditable="conversation.members.length > 1">{{ conversation.member.full_name || conversation.name }}</h4>
                <div class="text-muted">{{ conversation.member.email || `${conversation.members.length} members` }}</div>
                <div v-if="conversation.member.is_pending" class="mt-1 badge badge-icon d-inline-flex align-items-center bg-warning-light text-warning"><clock-icon class="fill-warning" height="12" width="12"></clock-icon>&nbsp;Pending</div>
                <!-- <div v-else-if="(conversation.member.role || {}).role != 'support' && conversation.members.length == 1" class="mt-1">
                    <button v-if="$root.auth.role.role == 'client'" v-tooltip.bottom="'Bookings'" class="btn btn-white badge-pill p-1" @click="$root.detailsTab = 'bookings'" :class="{'active': $root.detailsTab == 'bookings'}">
                        <planner-icon width="24" height="24"></planner-icon>
                    </button>
                </div> -->
            </div>

            <div v-if="(conversation.member.role || {}).role != 'support' && !conversation.member.is_pending" id="info-items" class="mt-3 d-flex flex-column">
                <!-- Overview -->
                <div class="border-top border-top px-3 py-1">
                    <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#overview" @click="toggleCollapse">
                        Overview
                        <chevron-down-icon class="ml-auto mr-n2"></chevron-down-icon>
                    </h5>
                    <div id="overview" class="collapse" data-parent="#info-items">
                        <!-- Fields -->
                        <div v-if="conversation.members.length == 1" class="form-group">
                            <div class="d-flex align-items-center dropdown">
                                <template v-if="$root.auth.role.role == 'client'">
                                    <label class="text-muted mb-0" ref="customFieldsLabel">Information</label>
                                    <button class="ml-auto btn btn-sm btn-white border d-flex align-items-center" data-toggle="dropdown" data-display="static"><plus-icon height="10" width="10" transform="scale(2)" class="mr-1"></plus-icon> Add Field</button>
                                </template>
                                <div class="dropdown-menu w-100 p-2" @click.stop>
                                    <vue-form-validate @submit="addCustomField()">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Name</label>
                                            <select v-if="!customFieldForm.is_custom" class="form-control form-control-sm cursor-pointer shadow-none" :class="{'text-muted': !customFieldForm.name}" v-model="customFieldForm.name" data-required>
                                                <option value="" disabled selected>Select Fields</option>
                                                <option :value="custom_field" v-for="custom_field in $root.auth.custom_fields">{{ custom_field }}</option>
                                                <option value="custom">- New custom field -</option>
                                            </select>
                                            <input v-else type="text" class="form-control form-control-sm shadow-none" v-model="customFieldForm.name" placeholder="Field name" data-required />
                                        </div>
                                        <div class="form-group mb-0">
                                            <label class="form-label">Value</label>
                                            <input type="text" class="form-control form-control-sm shadow-none" v-model="customFieldForm.value" placeholder="Field value" data-required />
                                        </div>
                                        <div class="d-flex justify-content-end align-items-center mt-2">
                                            <button type="button" class="btn btn-sm btn-white border mr-1" @click="resetCustomFieldForm()">Cancel</button>
                                            <button type="submit" class="btn btn-sm btn-primary">Add</button>
                                        </div>
                                    </vue-form-validate>
                                </div>
                            </div>
                            <div v-for="(custom_field, index) in conversation.custom_fields" v-if="custom_field.is_visible || $root.auth.id == conversation.user_id" class="d-flex align-items-center my-2 custom-field position-relative">
                                <div class="overflow-hidden">
                                    <small class="d-block mb-n1 text-muted text-ellipsis">{{ custom_field.name }}</small>
                                    <div class="text-ellipsis">{{ custom_field.value }}</div>
                                </div>
                                <div v-if="$root.auth.role.role == 'client'" class="ml-auto position-static d-flex align-items-center pl-1 dropdown">
                                    <button type="button" class="btn btn-light btn-sm p-1 badge-pill line-height-0 mr-1 edit-custom-field" data-toggle="dropdown" data-display="static" @click="editCustomField(custom_field)"><pencil-icon width="16" height="16"></pencil-icon></button>
                                    <div class="dropdown-menu w-100 p-2" @click.stop>
                                        <vue-form-validate @submit="updateCustomField(custom_field)">
                                            <h6 class="font-heading">Edit Custom Field</h6>
                                            <div class="form-group mb-2">
                                                <label class="form-label">Name</label>
                                                <input type="text" class="form-control form-control-sm shadow-none" v-model="custom_field.new_name" placeholder="Field name" data-required />
                                            </div>
                                            <div class="form-group mb-0">
                                                <label class="form-label">Value</label>
                                                <input type="text" class="form-control form-control-sm shadow-none" v-model="custom_field.new_value" placeholder="Field value" data-required />
                                            </div>
                                            <div class="d-flex align-items-center mt-2">
                                                <button
                                                    type="button"
                                                    class="btn btn-white line-height-0 btn-sm btn-link text-body p-1 badge-pill"
                                                    @click="
                                                        $refs['customFieldsLabel'].click();
                                                        conversation.custom_fields.splice(index, 1);
                                                        updateConversation(conversation);
                                                    "
                                                >
                                                    <trash-icon fill="red" width="18" height="18"></trash-icon>
                                                </button>
                                                <div class="ml-auto">
                                                    <button type="button" class="btn btn-sm btn-white border mr-1" @click="$refs['customFieldsLabel'].click()">Cancel</button>
                                                    <button type="submit" class="btn btn-sm btn-primary">Save</button>
                                                </div>
                                            </div>
                                        </vue-form-validate>
                                    </div>

                                    <toggle-switch v-model="custom_field.is_visible" @input="updateConversation(conversation)"></toggle-switch>
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
                                <div class="user-profile-image user-profile-image-sm align-self-center" :style="{backgroundImage: 'url(' + member.user.profile_image + ')'}">
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

                <!-- Bookings -->
                <div v-if="conversation.members.length == 1" class="border-top px-3 py-1">
                    <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#bookings" @click="toggleCollapse">
                        Bookings
                        <chevron-down-icon class="ml-auto mr-n2"></chevron-down-icon>
                    </h5>
                    <div id="bookings" class="collapse pb-1" data-parent="#info-items">
                        <bookings v-if="conversation.ready" :conversation="conversation" :blacklisted_services="blacklisted_services" :membersLength="conversation.members.length"></bookings>
                    </div>
                </div>

                <!-- Files -->
                <div class="border-top px-3 py-1">
                    <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#files" @click="toggleCollapse">
                        Files
                        <chevron-down-icon class="ml-auto mr-n2"></chevron-down-icon>
                    </h5>
                    <div id="files" class="collapse pb-1" data-parent="#info-items">
                        <div class="d-flex flex-wrap mx-n1">
                            <div v-for="file in (conversation.files || {}).data" class="position-relative file-thumbnail p-1 overflow-hidden">
                                <div class="position-relative rounded bg-light h-100 cursor-pointer" @click="$parent.openFile(file)" :style="{backgroundImage: 'url(' + file.preview + ')'}">
                                    <div v-if="file.type == 'image' || file.type == 'video'">
                                        <div class="position-absolute-center preview-video-play" v-if="file.type == 'video'">
                                            <play-icon height="15" width="15"></play-icon>
                                        </div>
                                    </div>
                                    <div v-else-if="file.type == 'audio'">
                                        <volume-mid-icon height="30" width="30" class="position-absolute-center"></volume-mid-icon>
                                    </div>
                                    <div v-else-if="file.type == 'file'" class="p-1">
                                        <file-empty-icon height="30" width="30" class="position-absolute-center" :is="$parent.fileIcon(file.metadata.extension)"></file-empty-icon>
                                    </div>
                                </div>
                                <small v-if="file.type == 'file'" class="file-filename position-absolute text-ellipsis text-secondary px-2 text-center w-100">{{ file.metadata.filename }}</small>
                            </div>
                        </div>
                        <div v-if="(conversation.files || {}).next_page_url && !conversation.filesLoading" class="text-center my-2">
                            <button type="button" class="btn btn-sm btn-link text-body" @click="$parent.getFiles()">Show more..</button>
                        </div>
                        <div v-else-if="conversation.filesLoading" class="text-center my-3">
                            <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                        </div>
                    </div>
                </div>

                <!-- Tags -->
                <div class="border-top px-3 py-1">
                    <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#tags" @click="toggleCollapse">
                        Tags
                        <chevron-down-icon class="ml-auto mr-n2"></chevron-down-icon>
                    </h5>
                    <div id="tags" class="collapse" data-parent="#info-items">
                        <!-- Tags -->
                        <div class="h-100 overflow-hidden d-flex flex-column">
                            <div>
                                <input type="text" class="form-control form-control-sm shadow-none" placeholder="Search tags..." v-model="tagSearch" />
                            </div>
                            <div v-if="tagsData.tags.length > 0" class="my-2">
                                <span class="text-muted">Available tags:</span> <span v-for="tag in tagsData.tags" class="badge badge-secondary mr-1 line-height-sm">{{ tag }}</span>
                            </div>

                            <div class="overflow-y-only mt-2">
                                <div v-if="tagsData.length == 0" class="text-center text-muted py-2">
                                    No results found.
                                </div>
                                <div v-else v-for="data in tagsData.data" class="mb-2">
                                    <div class="small text-muted text-uppercase">{{ data.type }}</div>
                                    <div class="rounded bg-white border py-2 px-3">
                                        <div v-if="data.type == 'message'" class="message-group mb-0">
                                            <small class="font-heading font-weight-bold font-size-base line-height-1 message-sender d-block" :class="{'text-right': data.data.outgoing}">{{ data.data.user.full_name }}</small>
                                            <div class="d-flex align-items-end message-body" :class="{'outgoing-message text-right flex-row-reverse': data.data.outgoing}">
                                                <div>
                                                    <div class="user-profile-image" :style="{backgroundImage: 'url(' + data.data.user.profile_image + ')'}">
                                                        <span v-if="!data.data.user.profile_image">{{ data.data.user.initials }}</span>
                                                    </div>
                                                </div>
                                                <div class="px-1 flex-1">
                                                    <div class="text-wrap position-relative message-content" :class="{'p-0 bg-transparent': ['emoji', 'image', 'video'].find(x => x == data.data.type)}">
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
                <div class="border-top px-3 py-1">
                    <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#notes" @click="toggleCollapse">
                        Notes
                        <chevron-down-icon class="ml-auto mr-n2"></chevron-down-icon>
                    </h5>
                    <div id="notes" class="collapse pb-1" data-parent="#info-items">
                        <div class="dropdown mb-2">
                            <button class="btn btn-sm btn-white border d-flex align-items-center" data-toggle="dropdown" data-display="static"><plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon>Add Note</button>
                            <div class="dropdown-menu w-100 p-2" @click.stop>
                                <vue-form-validate @submit="addNote()">
                                    <textarea v-model="newNote" data-required rows="3" class="form-control form-control-sm resize-none shadow-none border" placeholder="Add note.."></textarea>
                                    <div class="d-flex justify-content-end align-items-center mt-2">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-white border mr-1"
                                            @click="
                                                newNote = '';
                                                $refs['profileImage'].click();
                                            "
                                        >
                                            Cancel
                                        </button>
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
                                            <input type="text" class="form-control form-control-sm border-0 shadow-none" placeholder="Add tag" data-required v-model="note.newTag" />
                                            <div class="input-group-append">
                                                <button type="submit" class="btn btn-white border p-1 shadow-none btn-sm border-0 line-height-1">
                                                    <plus-icon width="20" height="20" class="no-action"></plus-icon>
                                                </button>
                                            </div>
                                        </vue-form-validate>

                                        <div class="text-left tags-container" v-if="note.tags.length > 0">
                                            <div v-for="(tag, index) in note.tags" class="d-inline-block badge badge-primary py-1 px-2 mr-1 mt-1">
                                                {{ tag }}&nbsp;
                                                <close-icon
                                                    height="8"
                                                    width="8"
                                                    fill="white"
                                                    transform="scale(2.5)"
                                                    class="cursor-pointer no-action"
                                                    @click.native="
                                                        note.tags.splice(index, 1);
                                                        updateNoteTags(note);
                                                    "
                                                ></close-icon>
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
    </div>
</template>

<script src="./info.js"></script>
<style lang="scss" scoped src="./info.scss"></style>
