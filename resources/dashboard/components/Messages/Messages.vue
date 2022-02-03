<template>
	<div class="flex flex-col h-full" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false" @drop.prevent="dropFile">
		<div v-if="dragOver" class="filedrop">
			<span class="absolute-center text-muted text-2xl">Drop Files Here</span>
		</div>
		<div class="overflow-hidden flex-grow relative">
			<div v-if="hasScreenRecording" class="absolute w-full h-full bg-white screen-recorder-data">
				<div class="absolute-center w-3/4 text-center h-full py-5 flex flex-col">
					<h6 class="text-xl mb-2">Screen recording</h6>
					<div class="flex-grow-1 position-relative bg-dark rounded overflow-hidden">
						<video src="" class="w-100 h-100 bg-black position-absolute-center d-block outline-0" controls ref="screenRecorderData"></video>
					</div>
					<div class="mt-2">
						<button type="button" class="btn btn-sm border" @click="downloadScreenRecording()"><span>Download</span></button>
						<button type="button" class="btn btn-sm border" @click="sendScreenRecording()"><span>Send</span></button>
					</div>
				</div>
			</div>

			<!-- <div v-if="pastedFile" class="position-absolute w-100 h-100 bg-white pasted-file">
				<div class="position-absolute-center w-75 h-100 d-flex flex-column p-5">
					<div v-if="!pastedFile.preview" class="position-relative border"></div>
					<div v-else class="pasted-preview flex-grow-1" :style="{ 'background-image': 'url(' + pastedFile.preview + ')' }"></div>
					<div class="text-center mt-3">
						<button type="button" class="btn btn-light border" @click="pastedFile = null">Cancel</button>
						<button type="button" class="btn btn-light border" @click="sendPastedFile()">Send</button>
					</div>
				</div>
			</div> -->

			<div v-if="!ready || !conversation.ready" class="bg-white messages-loader position-absolute-center w-100 h-100">
				<div class="position-absolute-center">
					<div class="spinner-border spinner-border-sm text-primary"></div>
				</div>
			</div>

			<div class="p-3 h-full overflow-y-auto" :class="{ 'opacity-0': !ready }" v-chat-scroll="{ always: true, smooth: false }" ref="message-group-container" @v-chat-scroll-top-reached="messageScroll">
				<!-- Pagination spinner -->
				<div class="text-center mb-3" :class="{ 'opacity-0': !messagePaginateLoading }">
					<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
				</div>

				<!-- Group messages -->
				<div v-for="(grouped_message, index) in grouped_messages" :key="index" class="w-100 message-group">
					<div v-if="grouped_message.type == 'call_ended'" class="text-center">
						<div v-for="message in grouped_message.messages" :key="message.id" class="hrule">
							<small class="bg-white relative px-2 font-light text-muted"> {{ message.message }} </small>
						</div>
					</div>
					<div v-else-if="grouped_message.type == 'call_failed'" class="text-center">
						<div v-for="message in grouped_message.messages" :key="message.id" class="hrule">
							<small class="bg-white relative px-2 font-light text-muted">
								{{ message.user_id == $root.auth.id ? 'Call failed' : 'You missed a call' }}
							</small>
						</div>
					</div>
					<template v-else>
						<div class="flex items-end message-body" :class="{ 'outgoing-message text-right flex-row-reverse': grouped_message.outgoing }">
							<div>
								<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + grouped_message.sender.profile_image + ')' }">
									<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
								</div>
							</div>
							<div class="px-1 flex-1 -mb-1">
								<div v-for="message in grouped_message.messages" :key="message.id" v-cloak :id="'message-' + message.id" class="message-item" :class="{ 'has-link': message.link_preview }">
									<div class="relative message-content" :class="{ 'p-0 bg-transparent': ['emoji', 'image', 'video'].find(x => x == message.type) }">
										<div
											v-if="grouped_message.outgoing"
											class="action-button"
											@click="
												selectedMessage = message;
												$refs.deleteMessageModal.show();
											"
										>
											<TrashIcon class="fill-current" height="15" width="15"></TrashIcon>
										</div>
										<message-type :message="message" :outgoing="grouped_message.outgoing"></message-type>
									</div>
								</div>
							</div>
						</div>
						<small class="text-muted flex items-center mt-2" :class="{ 'justify-end': grouped_message.outgoing }">
							<template v-if="index == grouped_messages.length - 1 && grouped_message.outgoing && grouped_message.is_read">
								Seen&nbsp;
								<eye-icon width="14" height="14" class="fill-primary"></eye-icon>
								&nbsp;•
							</template>
							{{ messageTimezoneTime(grouped_message) }}
						</small>
					</template>
				</div>

				<!-- Typing users -->
				<div class="absolute bottom-0 left-0 pl-2">
					<template v-for="typingUser in typingUsers">
						<div class="flex items-center text-muted text-sm mb-2" v-if="typingUser.typing" :key="typingUser.userId">
							<div class="typing-indicator mr-1">
								<span></span>
								<span></span>
								<span></span>
							</div>
							<small>{{ typingUser.name }} is typing</small>
						</div>
					</template>
				</div>
			</div>
		</div>

		<!-- Message input -->
		<div v-if="isVideoMessage || (conversation.member && !conversation.member.is_pending)" class="border-top p-4 message-input-wrapper">
			<!-- Pending files -->
			<div class="flex mb-4" v-if="pendingFiles.length > 0">
				<div v-for="(file, index) in pendingFiles" :key="index" class="pending-file-preview">
					<button class="absolute -top-2 -right-2 focus:outline-none rounded-full bg-gray-200 p-2" @click="pendingFiles.splice(index, 1)">
						<close-icon height="10" width="10" class="fill-current text-gray-600"></close-icon>
					</button>
					<div v-if="file.file.dataType == 'image' || file.file.dataType == 'video'" :style="{ backgroundImage: 'url(' + file.preview + ')' }" class="file-thumbnail bg-gray-100">
						<div class="absolute-center" v-if="file.file.dataType == 'video'">
							<play-icon height="25" width="25"></play-icon>
						</div>
					</div>
					<div v-else-if="file.file.dataType == 'audio'" class="bg-gray-100">
						<volume-mid-icon height="30" width="30" class="absolute-center"></volume-mid-icon>
					</div>
					<div v-else class="p-1 bg-gray-100 h-full rounded-md">
						<component height="40" width="40" class="absolute-center fill-current text-primary" :is="$root.fileIcon(file.extension)"></component>
						<small class="pending-filename">{{ file.file.name }}</small>
					</div>
				</div>
			</div>
			<div class="flex items-start md:items-center flex-col md:flex-row">
				<div class="overflow-hidden flex items-center text-primary">
					<button data-step="6" data-position="top" type="button" class="line-height-sm p-0 focus:outline-none" @blur="emojipicker = false" :class="{ 'emojipicker-open': emojipicker }">
						<emojipicker @select="selectEmoji"></emojipicker>
					</button>
					<button data-step="8" data-position="top" class="ml-2 transition-colors hover:bg-gray-200 p-2 rounded-full" type="button" @click="$refs['fileMedia'].click()"><AttachmentIcon class="fill-current"></AttachmentIcon></button>

					<button data-step="7" data-position="top" class="ml-2 transition-colors hover:bg-gray-200 p-2 rounded-full" type="button" @click="openRecorder('audio')"><microphone-alt-icon class="fill-current"></microphone-alt-icon></button>
					<div class="hidden">
						<input type="file" ref="fileMedia" class="hidden" @change="addFile" />
					</div>

					<button data-step="9" data-position="top" class="btn-screen-recorder ml-2 transition-colors hover:bg-gray-200 p-2 rounded-full" @click="initScreenRecorder()" :disabled="!isVideoMessage && $root.screenRecorder.conversation_id">
						<screenshare-icon class="fill-current"></screenshare-icon>
					</button>
				</div>
				<div class="flex-1 pl-0 md:pl-4 w-full md:w-auto">
					<vue-form-validate @submit="sendText" ref="messageForm" @mounted="messageFormMounted">
						<div class="flex items-center rounded-full bg-gray-200 p-1">
							<div class="py-2 px-4 message-input h-auto overflow-auto flex-grow focus:outline-none" contenteditable data-placeholder="Write a message.." spellcheck="false" ref="messageInput" @keypress="messageInput" @paste.prevent="inputPaste"></div>
							<button type="submit" class="btn-send-message rounded-full bg-white p-3 text-primary focus:outline-none transition-colors hover:text-white hover:bg-primary"><SendIcon class="fill-current"></SendIcon></button>
						</div>
					</vue-form-validate>
				</div>
			</div>
		</div>

		<gallery :conversation="conversation" :file="selectedFile" @close="selectedFile = null"></gallery>

		<AudioRecorder v-if="recorder == 'audio'" @submit="sendAudio" @close="recorder = ''"></AudioRecorder>

		<Modal ref="deleteMessageModal" size="sm">
			<template v-if="selectedMessage">
				<h5 class="font-serif font-semibold mb-5 uppercase text-center">Delete Message</h5>
				<p class="text-center mt-3">Are you sure to delete this message?</p>
				<div class="flex justify-between mt-8">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.deleteMessageModal.hide()"><span>Cancel</span></button>
					<button
						class="btn btn-md btn-red"
						type="button"
						@click="
							deleteMessage(selectedMessage);
							$refs.deleteMessageModal.hide();
						"
					>
						<span>Delete</span>
					</button>
				</div>
			</template>
		</Modal>

		<!-- <video-recorder-modal v-if="recorder == 'video'" @submit="sendVideo" @close="recorder = ''" :conversation="conversation"></video-recorder-modal> -->
	</div>
</template>

<script src="./Messages.js"></script>

<style lang="scss" scoped src="./Messages.scss"></style>
