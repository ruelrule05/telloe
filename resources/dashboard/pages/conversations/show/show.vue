<template>
	<div class="flex-grow-1 bg-white d-flex flex-column h-100 overflow-hidden" v-if="conversation">
		<div class="px-4 py-4 bg-white border-bottom position-relative d-flex align-items-center">
			<div class="d-flex align-items-center">
				<div class="user-profile-image" :style="{ backgroundImage: 'url(' + conversation.member.profile_image + ')' }">
					<span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
					<i v-if="$root.isOnline(conversation.member.id)" class="online-status bg-success">&nbsp;</i>
				</div>
				<div class="ml-2">
					<h5 class="font-heading mb-0" @click="goToContact(conversation.member)" :class="{ 'hover-underline cursor-pointer': contact(conversation.member) }">{{ conversation.member.full_name || conversation.name }}</h5>
					<small v-if="conversation.member.is_pending" class="d-block text-warning">Pending account</small>
					<div class="d-flex align-items-center" v-else-if="conversation.member.id && conversation.member.last_online">
						<small class="text-secondary">{{ $root.isOnline(conversation.member.id) ? 'Online' : `Last online ${conversation.member.last_online_format}` }}</small>
					</div>
					<small v-else class="d-block text-secondary">
						<template v-if="(conversation.member.role || {}).role != 'support'">{{ conversation.members.length }} members</template>
						<template v-else>{{ conversation.member.email }}</template>
					</small>
				</div>
			</div>
			<div class="ml-auto btn-circle-actions">
				<template v-if="!conversation.member.is_pending && (conversation.member.role || {}).role != 'support'">
					<button
						:data-intro="$root.intros.conversations.steps[2]"
						data-step="3"
						class="btn border-0 py-0 px-1"
						v-tooltip.bottom="'Video call'"
						@click="
							$root.callConversation = conversation;
							$root.$refs['videoCall'].outgoingCall(conversation);
						"
						:class="{ 'active disabled': $root.callConversation ? true : false }"
					>
						<videocam-icon width="26" height="26"></videocam-icon>
					</button>
					<button
						:data-intro="$root.intros.conversations.steps[3]"
						data-step="4"
						class="btn border-0 py-0 px-1 mx-2"
						v-tooltip.bottom="'Audio call'"
						@click="
							$root.callConversation = conversation;
							$root.$refs['videoCall'].outgoingCall(conversation, false);
						"
						:class="{ 'active disabled': $root.callConversation ? true : false }"
					>
						<call-menu-icon width="20" height="20"></call-menu-icon>
					</button>
					<!-- <button class="btn shadow-none border-0 py-0 px-1" v-tooltip.bottom="'Voice call'" :class="{'disabled': $root.callConversation ? true : false}"><colored-phone-icon width="24" height="24"></colored-phone-icon></button> -->
				</template>
				<button :data-intro="$root.intros.conversations.steps[4]" data-step="5" class="btn shadow-none border-0 py-0 px-1" v-tooltip.bottom="'Details'" @click="toggleDetailsTab" :class="{ active: $root.detailsTab == 'profile' }"><info-circle-icon width="28" height="28"></info-circle-icon></button>
			</div>
		</div>

		<div class="d-flex flex-grow-1 h-100 overflow-hidden">
			<div class="conversation-messages flex-grow-1 border-right text-nowrap overflow-hidden position-relative h-100" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false" @drop.prevent="dropFile">
				<div v-if="dragOver" class="filedrop position-absolute w-100 h-100 bg-light">
					<span class="h3 position-absolute-center text-secondary">Drop Files Here</span>
				</div>

				<div class="d-flex flex-column h-100">
					<div class="overflow-hidden flex-grow-1 bg-white position-relative">
						<div v-if="hasScreenRecording" class="position-absolute w-100 h-100 bg-white screen-recorder-data">
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
						</div>

						<div v-if="!ready || !conversation.ready" class="bg-white messages-loader position-absolute-center w-100 h-100">
							<div class="position-absolute-center">
								<div class="spinner-border spinner-border-sm text-primary"></div>
							</div>
						</div>
						<div class="p-3 h-100 overflow-y-auto" :class="{ 'opacity-0': !ready }" v-chat-scroll="{ always: true, smooth: false }" ref="message-group-container" @v-chat-scroll-top-reached="messageScroll">
							<div class="text-center mb-3" :class="{ 'opacity-0': !messagePaginateLoading }">
								<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
							</div>
							<div v-for="(grouped_message, index) in grouped_messages" :key="index" class="w-100 message-group">
								<div v-if="grouped_message.type == 'call_ended'" class="text-center text-gray">
									<div v-for="message in grouped_message.messages" :key="message.id" class="position-relative hrule">
										<small class="bg-white position-relative px-2 font-weight-light"> {{ message.message }} </small>
									</div>
								</div>
								<div v-else-if="grouped_message.type == 'call_failed'" class="text-center text-gray">
									<div v-for="message in grouped_message.messages" :key="message.id" class="position-relative hrule">
										<small class="bg-white position-relative px-2 font-weight-light">
											{{ message.user_id == $root.auth.id ? 'Call failed' : 'You missed a call' }}
										</small>
									</div>
								</div>
								<template v-else>
									<small class="font-heading font-weight-bold font-size-base line-height-1 message-sender d-block" :class="{ 'text-right': grouped_message.outgoing }">{{ grouped_message.sender.full_name }}</small>
									<div class="d-flex align-items-end message-body" :class="{ 'outgoing-message text-right flex-row-reverse': grouped_message.outgoing }">
										<div>
											<div class="user-profile-image" :style="{ backgroundImage: 'url(' + grouped_message.sender.profile_image + ')' }">
												<span v-if="!grouped_message.sender.profile_image">{{ grouped_message.sender.initials }}</span>
											</div>
										</div>
										<div class="px-1 flex-1">
											<div v-for="message in grouped_message.messages" :key="message.id" v-cloak :id="'message-' + message.id" class="message-item">
												<div class="text-wrap position-relative message-content" :class="{ 'p-0 bg-transparent': ['emoji', 'image', 'video'].find(x => x == message.type) }">
													<div v-if="!message.sending" class="message-actions position-absolute px-2 d-flex align-items-center dropup">
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
														<!-- <div v-tooltip.top="'History'" class="action-content mx-1 cursor-pointer line-height-1">
                                                        <div class="action-button">
                                                            <history-icon height="20" width="20" :fill="message.is_history ? '#6e82ea' : ''" :class="{'active': message.is_history}" @click.native="markHistory(message)"></history-icon>
                                                        </div>
                                                    </div> -->
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
													</div>
													<message-type :message="message" :outgoing="grouped_message.outgoing"></message-type>
												</div>
											</div>
										</div>
									</div>
									<small v-if="index == grouped_messages.length - 1" class="text-secondary d-flex align-items-center" :class="{ 'justify-content-end': grouped_message.outgoing }">
										<template v-if="grouped_message.outgoing && grouped_message.is_read">
											Seen&nbsp;
											<eye-icon width="14" height="14" class="fill-primary"></eye-icon>
											&nbsp;•
										</template>
										{{ messageTimezoneTime(grouped_message) }}
									</small>
								</template>
							</div>

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

					<div v-if="!conversation.member.is_pending" class="border-top shadow-sm p-2 bg-white message-form">
						<div class="d-flex mb-1">
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
						<div class="d-flex align-items-center message-form-inputs">
							<vue-form-validate @submit="sendText" class="flex-1" ref="messageForm" @mounted="messageFormMounted">
								<div class="form-control border-0 shadow-none message-input bg-gray-200 text-wrap h-auto overflow-auto" contenteditable data-placeholder="Write a message.." spellcheck="false" ref="messageInput" @keypress="messageInput" @paste.prevent="inputPaste"></div>
							</vue-form-validate>

							<div class="px-1 text-nowrap overflow-hidden" :class="{ expand: moreActions }">
								<button :data-intro="$root.intros.conversations.steps[5]" data-step="6" data-position="top" type="button" class="line-height-sm ml-2 btn px-0" @blur="emojipicker = false" :class="{ 'emojipicker-open': emojipicker }">
									<emojipicker @select="selectEmoji"></emojipicker>
								</button>
								<!-- <button class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('video')"><video-camera-icon width="24" height="24" class="mt-1"></video-camera-icon></button> -->
								<button :data-intro="$root.intros.conversations.steps[6]" data-step="7" data-position="top" class="line-height-sm ml-2 btn px-0" type="button" @click="openRecorder('audio')"><microphone-alt-icon width="20" height="20"></microphone-alt-icon></button>
								<button :data-intro="$root.intros.conversations.steps[7]" data-step="8" data-position="top" class="line-height-sm ml-2 btn px-0" type="button" @click="$refs['fileMedia'].click()"><document-alt-icon width="20" height="20"></document-alt-icon></button>
								<input type="file" hidden ref="fileMedia" @change="addFile" />

								<button :data-intro="$root.intros.conversations.steps[8]" data-step="9" data-position="top" class="line-height-sm ml-2 btn px-0 position-relative" @click="initScreenRecorder()" :disabled="$root.screenRecorder.conversation_id">
									<screen-record-icon width="20" height="20"></screen-record-icon>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Info -->
			<div class="conversation-details h-100 position-relative bg-white overflow-hidden" :class="{ open: $root.detailsTab }">
				<div class="text-left h-100 overflow-hidden">
					<info :conversation="conversation"></info>
				</div>
			</div>

			<gallery :conversation="conversation" :file="selectedFile" @close="selectedFile = null"></gallery>

			<audio-recorder-modal v-if="recorder == 'audio'" @submit="sendAudio" @close="recorder = ''"></audio-recorder-modal>

			<!-- <video-recorder-modal v-if="recorder == 'video'" @submit="sendVideo" @close="recorder = ''" :conversation="conversation"></video-recorder-modal> -->
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
