<template>
    <div class="flex-grow-1 border-left bg-white" v-if="conversation">
        <div class="d-flex h-100">
        	<div class="conversation-messages flex-grow-1 border-right text-nowrap overflow-hidden position-relative" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false" @drop.prevent="dropFile">
                <div v-if="dragOver" class="filedrop position-absolute w-100 h-100 bg-light">
                    <span class="h3 position-absolute-center text-muted">Drop Files Here</span>
                </div>
                
        		<div class="d-flex flex-column h-100">
        			<div class="p-3 bg-white border-bottom position-relative d-flex align-items-center">
        				<div class="d-flex align-items-center">
                            <div class="user-profile-image" :style="{backgroundImage: 'url('+conversation.member.profile_image+')'}">
                                <span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
                            </div>
                            <div class="ml-2">
                                <h5 class="font-heading mb-0">{{ conversation.member.full_name || conversation.name }}</h5>
                                <small v-if="conversation.member.is_pending" class="d-block text-warning">Pending account</small>
                                <div class="d-flex align-items-center" v-else-if="conversation.member.id && conversation.member.last_online">
                                    <span class="chat-status mr-1" :class="[isOnline ? 'bg-success' : 'bg-gray']">&nbsp;</span> 
                                    <small class="text-muted">{{ isOnline ? 'Online' : `Last online ${conversation.member.last_online_format}` }}</small>
                                </div>
                                <small v-else class="d-block text-muted">{{ conversation.members.length }} members</small>
                            </div>
                        </div>
                        <div class="ml-auto btn-circle-actions">
                            <template v-if="!conversation.member.is_pending">
                                <button class="btn shadow-none border-0 py-0 px-1" v-tooltip.bottom="'Video call'" @click="$root.initCall(conversation.id, 'outgoing')" :class="{'active disabled': $root.callWindow ? true : false}"><video-icon width="32" height="32"></video-icon></button>
                            </template>
                            <template v-if="!conversation.member.is_pending">
                                <button class="btn shadow-none border-0 py-0 px-1" v-tooltip.bottom="'Voice call'" :class="{'disabled': $root.callWindow ? true : false}"><colored-phone-icon width="24" height="24"></colored-phone-icon></button>
                            </template>
                            <button class="btn shadow-none border-0 py-0 px-1" v-tooltip.bottom="'Details'" @click="$root.detailsTab = 'profile'" :class="{'active': $root.detailsTab == 'profile'}"><info-circle-icon width="24" height="24"></info-circle-icon></button>
                        </div>
        			</div>

        			<div class="overflow-hidden flex-grow-1 bg-white position-relative">
                        
                        <div v-if="hasScreenRecording" class="position-absolute-center w-100 h-100 bg-white screen-recorder-data">
                            <div class="position-absolute-center w-75 text-center">
                                <h6 class="font-heading h5">Screen recording</h6>
                                <video src="" class="w-100 h-100 bg-black rounded d-block outline-0" controls ref="screenRecorderData"></video>
                                <div class="mt-2">
                                    <button type="button" class="btn btn-light border" @click="downloadScreenRecording">Download</button>
                                    <button type="button" class="btn  btn-light border" @click="sendScreenRecording">Send</button>
                                </div>
                            </div>
                        </div>

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
                                                            <span v-if="message.tags.length > 0" class="action-label">{{ message.tags.length }}</span>
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
                                                                <div v-for="(tag, index) in message.tags" class="d-inline-block badge badge-primary py-1 px-2 mr-1 mt-1">
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

                                                    <div class="message-metalabel text-nowrap text-muted small position-absolute">
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
                                <small class="text-muted d-block" :class="{'text-right': grouped_message.outgoing}">{{ grouped_message.created_at_format }}</small>
                            </div>
                        </div>
                    </div>

                    <div v-if="!conversation.member.is_pending" class="border-top shadow-sm p-2 align-items-center bg-white message-form d-flex">
                        <vue-form-validate @submit="sendText" class="flex-grow-1" ref="messageForm">
                            <textarea type="text" @paste="inputPaste" @keypress="messageInput" ref="messageInput" v-model="textMessage" class="form-control border-0 shadow-none message-input bg-gray-200" rows="1" placeholder="Write a message.." data-required></textarea>
                        </vue-form-validate>

                        <div class="px-1 text-nowrap overflow-hidden" :class="{'expand': moreActions}">
                            <button type="button" class="line-height-sm ml-2 btn px-0" @blur="emojipicker = false" :class="{'emojipicker-open': emojipicker}">
                               <emojipicker @select="selectEmoji"></emojipicker>
                            </button>
                            <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('video')"><video-camera-icon width="24" height="24" class="mt-1"></video-camera-icon></button>
                            <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('audio')"><microphone-icon width="20" height="20"></microphone-icon></button>
                            <button class="line-height-sm ml-2 btn px-0" type="button" @click="$refs['fileMedia'].click()"><add-note-icon width="20" height="20"></add-note-icon></button>
                            <input type="file" hidden ref="fileMedia" @change="addFile" />

                            <button class="line-height-sm ml-2 btn px-0 position-relative" @click="initScreenRecorder()" :disabled="$root.screenRecorder.conversation_id">
                                <expand-wide-icon width="20" height="20"></expand-wide-icon>
                                <span class="position-absolute-center h3 mb-0 mt-n2 line-height-0">.</span>
                            </button>
                        </div>
                    </div>
        		</div>
            </div>



            <!-- Info -->
           <info :conversation="conversation"></info>

                

            <file-view-modal v-if="selectedFile && ['image', 'video'].find((x) => x == selectedFile.type)" :file="selectedFile" @close="selectedFile = null"></file-view-modal>

            <audio-recorder-modal v-if="recorder == 'audio'" @submit="sendAudio" @close="recorder = ''"></audio-recorder-modal>
            <screen-recorder-modal v-if="recorder == 'screen'" @submit="sendVideo" @close="recorder = ''"></screen-recorder-modal>

            <video-recorder-modal v-if="recorder == 'video'" @submit="sendVideo" @close="recorder = ''" :conversation="conversation"></video-recorder-modal>
        </div>
    </div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>