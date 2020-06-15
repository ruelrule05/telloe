<template>
    <div class="flex-grow-1 border-left bg-white" v-if="conversation">
        <div class="d-flex h-100">
        	<div class="conversation-messages flex-grow-1 border-right text-nowrap overflow-hidden position-relative" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false" @drop.prevent="dropFile">
                <div v-if="dragOver" class="filedrop position-absolute w-100 h-100 bg-light">
                    <span class="h3 position-absolute-center text-gray">Drop Files Here</span>
                </div>
                
        		<div class="d-flex flex-column h-100">
        			<div class="p-3 bg-white border-bottom position-relative d-flex align-items-center">
        				<div class="d-flex align-items-center">
                            <div class="user-profile-image" :style="{backgroundImage: 'url('+conversation.member.profile_image+')'}">
                                <span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
                            </div>
                            <div class="ml-2">
                                <h5 class="font-heading mb-0">{{ conversation.member.full_name || conversation.name }}</h5>
                                <div class="d-flex align-items-center" v-if="conversation.member.id">
                                    <span class="chat-status mr-1" :class="[isOnline ? 'bg-success' : 'bg-gray']">&nbsp;</span> 
                                    <small class="text-gray">{{ isOnline ? 'Online' : `Last online ${conversation.member.last_online_format}` }}</small>
                                </div>
                                <small v-else class="d-block text-gray">{{ conversation.members.length }} members</small>
                            </div>
                        </div>
                        <div class="ml-auto">
                            <button class="btn btn-white btn-circle-actions border" v-tooltip.bottom="'Video call'" :disabled="$root.callWindow" @click="$root.initCall(conversation.id, 'outgoing')"><video-icon transform="scale(1.1)"></video-icon></button>
                            <button class="btn btn-white btn-circle-actions" v-tooltip.bottom="'Record screen'" @click="openRecorder('screen')"><cast-icon></cast-icon></button>
                            <button v-if="$root.auth.role.role == 'client'" class="btn btn-white btn-circle-actions" v-tooltip.bottom="'Manage bookings'"" @click="$root.detailsTab = 'bookings'" :class="{'active': $root.detailsTab == 'bookings'}"><calendar-day-icon></calendar-day-icon></button>
                            <button class="btn btn-white btn-circle-actions" v-tooltip.bottom="'Profile'" @click="$root.detailsTab = 'profile'" :class="{'active': $root.detailsTab == 'profile'}"><user-icon></user-icon></button>
                        </div>
        			</div>

        			<div class="overflow-hidden flex-grow-1 bg-white position-relative">
                        <div v-if="!ready || !conversation.ready" class="bg-white messages-loader position-absolute-center w-100 h-100">
                            <div class="position-absolute-center">
                                <div class="spinner-border spinner-border-sm text-primary"></div>
                            </div>
                        </div>
                        <div class="p-3 h-100 overflow-y-auto" :class="{'opacity-0': !ready}" ref="message-group-container">
                            <div v-for="grouped_message in grouped_messages" class="w-100 message-group">
                                <small class="font-heading font-weight-bold font-size-base line-height-1 message-sender d-block" :class="{'text-right': grouped_message.outgoing}">{{ grouped_message.sender.full_name }}</small>
                            	<div class="d-flex align-items-end message-body" :class="{'outgoing-message text-right flex-row-reverse': grouped_message.outgoing}">
                                    <div>
                                        <div class="user-profile-image" :style="{backgroundImage: 'url('+grouped_message.sender.profile_image+')'}">
                                            <span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
                                        </div>
                                    </div>
                            		<div class="px-1 flex-1">
                                    	<div v-for="message in grouped_message.messages" v-cloak :id="'message-' + message.id" class="message-item">
            	                            <div class="text-wrap position-relative message-content" :class="{'p-0 bg-transparent': ['emoji', 'image', 'video'].find((x) => x == message.type)}">
                                                <div class="message-actions position-absolute px-2 d-flex align-items-center dropup">
                                                    <div class="action-content position-relative mr-1 line-height-1">
                                                        <div v-tooltip.top="'Tags'" data-toggle="dropdown" class="action-button d-flex align-items-center">
                                                            <span v-if="message.tags.length > 0" class="action-label font-weight-light">{{ message.tags.length }}</span>
                                                            <bookmark-icon height="20" width="20" class="cursor-pointer"></bookmark-icon>
                                                        </div>
                                                        <div class="dropdown-menu dropdown-menu-x-center p-1 bg-light" @click.stop>
                                                            <vue-form-validate class="input-group border rounded overflow-hidden" @submit="updateMessageTags(message)">
                                                                <input type="text" class="form-control form-control-sm border-0 shadow-none" placeholder="Add tag" data-required v-model="message.newTag">
                                                                <div class="input-group-append">
                                                                    <button type="submit" class="btn btn-secondary p-1 shadow-none btn-sm border-0 line-height-1">
                                                                        <plus-icon width="20" height="20" class="no-action"></plus-icon>
                                                                    </button>
                                                                </div>
                                                            </vue-form-validate>

                                                            <div class="text-left tags-container" v-if="message.tags.length > 0">
                                                                <div v-for="(tag, index) in message.tags" class="d-inline-block badge badge-primary py-1 px-2 mr-1 mt-1 font-weight-light">
                                                                {{ tag }}&nbsp;
                                                                    <close-icon height="8" width="8" fill="white" transform="scale(2.5)" class="cursor-pointer no-action" @click.native="message.tags.splice(index, 1); updateMessageTags(message)"></close-icon>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-tooltip.top="'History'" class="action-content cursor-pointer line-height-1">
                                                        <div class="action-button">
                                                            <history-icon height="20" width="20" :fill="message.is_history ? '#6e82ea' : ''" :class="{'active': message.is_history}" @click.native="markHistory(message)"></history-icon>
                                                        </div>
                                                    </div>

                                                    <div class="message-metalabel text-nowrap text-gray small font-weight-light position-absolute">
                                                        <div v-if="message.is_history">
                                                            <history-icon height="16" width="16" class="no-action"></history-icon>
                                                        </div>
                                                        <div>{{ message.tags.join(', ') }}</div>
                                                    </div>
                                                </div>
            	                            	<message-type :message="message" :outgoing="grouped_message.outgoing"></message-type>
            	                            </div>
                                        </div>
                                    </div>
                            	</div>
                                <small class="text-gray d-block" :class="{'text-right': grouped_message.outgoing}">{{ grouped_message.created_at_format }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="border-top shadow-sm p-2 align-items-center bg-white message-form d-flex">
                        <vue-form-validate @submit="sendText" class="w-x100 flex-grow-1">
                            <input type="text" @paste="inputPaste" ref="messageInput" v-model="textMessage" class="form-control border-0 shadow-none message-input bg-gray-200" placeholder="Write a message.." data-required />
                        </vue-form-validate>

                        <div class="px-1 text-nowrap overflow-hidden" :class="{'expand': moreActions}">
                            <button type="button" class="line-height-sm ml-2 btn px-0" @blur="emojipicker = false" :class="{'emojipicker-open': emojipicker}">
                               <emojipicker @select="selectEmoji"></emojipicker>
                            </button>
                            <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('video')"><video-camera-icon width="24" height="24" class="mt-1"></video-camera-icon></button>
                            <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('audio')"><microphone-icon width="20" height="20"></microphone-icon></button>
                            <button class="line-height-sm ml-2 btn px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon width="20" height="20"></add-note-icon></button>
                            <input type="file" hidden ref="fileMedia" @change="addFile" />
                        </div>
                    </div>
        		</div>
            </div>



            <!-- Info -->
            <div class="conversation-details text-center p-3 h-100 position-relative bg-white" :class="{'open': $root.detailsTab}">
                <info :conversation="conversation"></info>
            </div>

                

            <file-view-modal v-if="selectedFile && ['image', 'video'].find((x) => x == selectedFile.type)" :file="selectedFile" @close="selectedFile = null"></file-view-modal>

            <audio-recorder-modal v-if="recorder == 'audio'" @submit="sendAudio" @close="recorder = ''"></audio-recorder-modal>
            <screen-recorder-modal v-if="recorder == 'screen'" @submit="sendVideo" @close="recorder = ''"></screen-recorder-modal>

            <video-recorder-modal v-if="recorder == 'video'" @submit="sendVideo" @close="recorder = ''" :conversation="conversation"></video-recorder-modal>
        </div>
    </div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>