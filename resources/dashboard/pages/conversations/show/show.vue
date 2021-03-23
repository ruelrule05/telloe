<template>
	<div class="h-full flex overflow-hidden" v-if="conversation">
		<div class="h-full flex flex-col flex-grow">
			<div class="p-4 border-bottom relative flex items-center">
				<div class="flex items-center">
					<div>
						<div class="profile-image profile-image-md" :style="{ backgroundImage: 'url(' + conversation.member.profile_image + ')' }">
							<span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
							<i v-if="$root.isOnline(conversation.member.id)" class="online-status">&nbsp;</i>
						</div>
					</div>
					<div class="ml-2">
						<h5 class="text-xl">{{ conversation.member.full_name || conversation.name }}</h5>
						<small v-if="conversation.member.is_pending" class="text-warning">Pending account</small>
						<div class="flex items-center" v-else-if="conversation.member.id && conversation.member.last_online_format">
							<small class="text-muted">{{ $root.isOnline(conversation.member.id) ? 'Online' : `Last online ${conversation.member.last_online_format}` }}</small>
						</div>
						<small v-else class="block text-muted">
							<template v-if="(conversation.member.role || {}).role != 'support'">{{ conversation.members.length }} members</template>
							<template v-else>{{ conversation.member.email }}</template>
						</small>
					</div>
				</div>
				<div class="ml-auto btn-actions">
					<template v-if="!conversation.member.is_pending && (conversation.member.role || {}).role != 'support'">
						<button
							class="text-primary"
							:data-intro="$root.intros.conversations.steps[3]"
							data-step="4"
							@click="
								$root.callConversation = conversation;
								$root.$refs['videoCall'].outgoingCall(conversation, false);
							"
							:class="{ 'active disabled': $root.callConversation ? true : false }"
						>
							<call-menu-icon class="fill-current"></call-menu-icon>
						</button>
						<button
							class="text-primary"
							:data-intro="$root.intros.conversations.steps[2]"
							data-step="3"
							@click="
								$root.callConversation = conversation;
								$root.$refs['videoCall'].outgoingCall(conversation);
							"
							:class="{ 'active disabled': $root.callConversation ? true : false }"
						>
							<videocam-icon class="fill-current"></videocam-icon>
						</button>
					</template>
					<button class="text-primary" :data-intro="$root.intros.conversations.steps[4]" data-step="5" :class="{ active: showNotes }" @click="showNotes = true"><note-icon class="fill-current"></note-icon></button>
				</div>
			</div>

			<div class="flex flex-grow h-full overflow-hidden">
				<div class="conversation-messages flex-grow text-nowrap overflow-hidden relative h-full" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false" @drop.prevent="dropFile">
					<div v-if="dragOver" class="filedrop position-absolute w-100 h-100 bg-light">
						<span class="h3 position-absolute-center text-secondary">Drop Files Here</span>
					</div>

					<div class="flex flex-col h-full">
						<div class="overflow-hidden flex-grow relative">
							<!-- <div v-if="hasScreenRecording" class="position-absolute w-100 h-100 bg-white screen-recorder-data">
							<div class="position-absolute-center w-75 text-center h-100 py-5 d-flex flex-column">
								<h6 class="font-heading h5">Screen recording</h6>
								<div class="flex-grow-1 position-relative bg-dark rounded overflow-hidden">
									<video src="" class="w-100 h-100 bg-black position-absolute-center d-block outline-0" controls ref="screenRecorderData"></video>
								</div>
								<div class="mt-2">
									<button type="button" class="btn btn-light border" @click="downloadScreenRecording()">Download</button>
									<button type="button" class="btn  btn-light border" @click="sendScreenRecording">Send</button>
								</div>
							</div>
							<div class="position-absolute-center w-100 h-100 bg-white" v-if="isScreenRecordDownloading">
								<div class="position-absolute-center w-75 text-center">
									<div class="spinner-border text-primary"></div>
									<h5 class="font-heading mb-0 mt-3">Converting your video...</h5>
								</div>
							</div>
						</div>

						<div v-if="pastedFile" class="position-absolute w-100 h-100 bg-white pasted-file">
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
												<div v-for="message in grouped_message.messages" :key="message.id" v-cloak :id="'message-' + message.id" class="message-item">
													<div class="relative message-content" :class="{ 'p-0 bg-transparent': ['emoji', 'image', 'video'].find(x => x == message.type) }">
														<!-- <div v-if="!message.sending" class="message-actions position-absolute px-2 d-flex align-items-center dropup">
														<div class="action-content position-relative line-height-1">
															<div v-tooltip.top="'Tags'" data-toggle="dropdown" class="action-button d-flex align-items-center">
																<span v-if="message.tags.length > 0" class="action-label">{{ message.tags.length }}</span>
																<bookmark-icon height="20" width="20" class="cursor-pointer"></bookmark-icon>
															</div>
															<div class="dropdown-menu dropdown-menu-x-center p-1 bg-light" @click.stop>
																<vue-form-validate class="input-group border rounded overflow-hidden" @submit="updateMessageTags(message)">
																	<input type="text" class="form-control form-control-sm border-0 shadow-none" placeholder="Add tag" data-required v-model="message.newTag" />
																	<div class="input-group-append border-left">
																		<button type="submit" class="btn btn-light border-0 p-1 btn-sm line-height-1">
																			<plus-icon width="20" height="20" class="no-action"></plus-icon>
																		</button>
																	</div>
																</vue-form-validate>

																<div class="text-left" v-if="message.tags.length > 0">
																	<div v-for="(tag, index) in message.tags" :key="tag.id" class="d-inline-block badge badge-warning py-1 px-2 mr-1 mt-1">
																		{{ tag }}&nbsp;
																		<close-icon
																			height="8"
																			width="8"
																			transform="scale(2.5)"
																			class="cursor-pointer no-action"
																			@click.native="
																				message.tags.splice(index, 1);
																				updateMessageTags(message);
																			"
																		></close-icon>
																	</div>
																</div>
															</div>
														</div>
														<div v-if="grouped_message.outgoing" v-tooltip.top="'Delete'" class="action-content cursor-pointer line-height-1">
															<div class="action-button">
																<trash-icon
																	height="20"
																	width="20"
																	@click.native="
																		selectedMessage = message;
																		$refs['deleteMessageModal'].show();
																	"
																></trash-icon>
															</div>
														</div>

														<div class="message-metalabel text-nowrap text-secondary small position-absolute">
															<div v-if="message.is_history">
																<history-icon height="16" width="16" class="no-action"></history-icon>
															</div>
															<div>{{ message.tags.join(', ') }}</div>
														</div>

														<div v-if="['image', 'video', 'audio', 'file'].find(x => x == message.type)" v-tooltip.top="'Download'" class="action-content cursor-pointer line-height-1">
															<div class="action-button">
																<download-icon height="20" width="20" @click.native="$root.downloadMedia(message)"></download-icon>
															</div>
														</div>
													</div> -->
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
								<div class="typing-users position-absolute pl-2">
									<template v-for="typingUser in typingUsers">
										<div class="d-flex align-items-center text-secondary mb-2" v-if="typingUser.typing" :key="typingUser.userId">
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
						<div v-if="!conversation.member.is_pending" class="border-top p-4">
							<!-- Pending files -->
							<div class="flex mb-1" v-if="pendingFiles.length > 0">
								<div v-for="(file, index) in pendingFiles" :key="index" class="bg-light rounded overflow-hidden pending-file-preview mr-1 position-relative">
									<button type="button" class="position-absolute btn badge-pill line-height-0 p-0 btn-white btn-sm remove-file" @click="pendingFiles.splice(index, 1)"><close-icon></close-icon></button>
									<div v-if="file.file.dataType == 'image' || file.file.dataType == 'video'" :style="{ backgroundImage: 'url(' + file.preview + ')' }" class="file-thumbnail">
										<div class="position-absolute-center preview-video-play" v-if="file.file.dataType == 'video'">
											<play-icon height="15" width="15"></play-icon>
										</div>
									</div>
									<div v-else-if="file.file.dataType == 'audio'">
										<volume-mid-icon height="30" width="30" class="position-absolute-center"></volume-mid-icon>
									</div>
									<div v-else class="p-1">
										<component height="30" width="30" class="position-absolute-center" :is="$root.fileIcon(file.extension)"></component>
										<small class="text-secondary text-center text-ellipsis pending-filename position-absolute w-100">{{ file.file.name }}</small>
									</div>
								</div>
							</div>
							<div class="flex items-center">
								<div class="overflow-hidden flex items-center text-primary">
									<button :data-intro="$root.intros.conversations.steps[5]" data-step="6" data-position="top" type="button" class="line-height-sm p-0 focus:outline-none" @blur="emojipicker = false" :class="{ 'emojipicker-open': emojipicker }">
										<emojipicker @select="selectEmoji"></emojipicker>
									</button>
									<button :data-intro="$root.intros.conversations.steps[7]" data-step="8" data-position="top" class="ml-2 transition-colors hover:bg-gray-200 p-2 rounded-full" type="button" @click="$refs['fileMedia'].click()"><AttachmentIcon class="fill-current"></AttachmentIcon></button>

									<button :data-intro="$root.intros.conversations.steps[6]" data-step="7" data-position="top" class="ml-2 transition-colors hover:bg-gray-200 p-2 rounded-full" type="button" @click="openRecorder('audio')"><microphone-alt-icon class="fill-current"></microphone-alt-icon></button>
									<input type="file" ref="fileMedia" class="hidden" @change="addFile" />

									<button :data-intro="$root.intros.conversations.steps[8]" data-step="9" data-position="top" class="ml-2 transition-colors hover:bg-gray-200 p-2 rounded-full" @click="initScreenRecorder()" :disabled="$root.screenRecorder.conversation_id">
										<screenshare-icon class="fill-current"></screenshare-icon>
									</button>
								</div>
								<div class="flex-1 pl-4">
									<vue-form-validate @submit="sendText" class="flex items-center rounded-full bg-gray-200 p-1" ref="messageForm" @mounted="messageFormMounted">
										<div class="py-2 px-4 message-input h-auto overflow-auto flex-grow focus:outline-none " contenteditable data-placeholder="Write a message.." spellcheck="false" ref="messageInput" @keypress="messageInput" @paste.prevent="inputPaste"></div>
										<button type="submit" class="rounded-full bg-white p-3 text-primary focus:outline-none transition-colors hover:text-white hover:bg-primary"><SendIcon class="fill-current"></SendIcon></button>
									</vue-form-validate>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Info -->
				<!-- <div class="conversation-details h-100 position-relative bg-white overflow-hidden" :class="{ open: $root.detailsTab }">
				<div class="text-left h-100 overflow-hidden">
					<info :conversation="conversation"></info>
				</div>
			</div>

			<gallery :conversation="conversation" :file="selectedFile" @close="selectedFile = null"></gallery>

			<audio-recorder-modal v-if="recorder == 'audio'" @submit="sendAudio" @close="recorder = ''"></audio-recorder-modal> -->

				<!-- <video-recorder-modal v-if="recorder == 'video'" @submit="sendVideo" @close="recorder = ''" :conversation="conversation"></video-recorder-modal> -->
			</div>
		</div>

		<div class="notes-container border-left overflow-hidden flex flex-col" :class="{ open: showNotes }">
			<div class="notes-header border-bottom px-6 flex justify-between">
				<span class="text-muted font-bold">NOTES</span>
				<div class="flex items-center">
					<button type="button" class="btn btn-sm btn-outline-primary" @click="addNewNote = true"><span>ADD NEW</span></button>
					<button type="button" @click="showNotes = false" class="rounded-full p-2 border text-gray-600 ml-1 transition-colors hover:bg-gray-200 focus:outline-none"><CloseIcon class="fill-current"></CloseIcon></button>
				</div>
			</div>

			<div class="p-6 overflow-auto flex-grow">
				<vue-form-validate v-if="addNewNote" @submit="addNote" class="mb-4">
					<textarea rows="3" v-model="newNote" placeholder="Write a note.." class="resize-none" data-required></textarea>
					<div class="flex justify-between mt-2">
						<button
							type="button"
							class="btn btn-outline-primary btn-sm"
							@click="
								addNewNote = false;
								newNote = '';
							"
						>
							<span>Cancel</span>
						</button>
						<button type="submit" class="btn btn-primary btn-sm"><span>Add</span></button>
					</div>
				</vue-form-validate>
				<div v-for="(note, noteIndex) in conversation.notes" :key="note.id" class="rounded-2xl p-4 text-sm bg-gray-100 mb-4 relative note">
					<p class="mb-2">{{ note.notes }}</p>
					<span class="text-xs text-muted">{{ dayjs(note.created_at).format('MMM d, YYYY') }}</span>
					<button type="button" @click="deleteNoteSubmit(note, noteIndex)"><TrashIcon class="fill-current"></TrashIcon></button>
				</div>
			</div>
		</div>

		<modal ref="deleteMessageModal" @hidden="selectedMessage = null">
			<template v-if="selectedMessage">
				<h5 class="font-heading text-center">Delete Message</h5>
				<p class="text-center mt-3">
					Are you sure to delete this message?
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">Cancel</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							deleteMessage(selectedMessage);
							$refs['deleteMessageModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
