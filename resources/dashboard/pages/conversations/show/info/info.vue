<template>
	<div class="h-100 overflow-hidden">
		<button v-if="closeButton" class="btn btn-close close position-absolute" type="button" @click="$root.detailsTab = ''"><close-icon width="36" height="36"></close-icon></button>
		<!-- Profile -->
		<div class="h-100 py-3 overflow-auto" ref="info-container">
			<div class="text-center info-profile">
				<div class="user-profile-image d-inline-block" ref="profileImage" :style="{ backgroundImage: 'url(' + conversation.member.profile_image + ')' }">
					<span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
				</div>
				<h4 class="h5 font-heading conversation-title mb-0 rounded" @keydown="disableNewline" spellcheck="false" @blur="updateConversationName" :contenteditable="conversation.members.length > 1">{{ conversation.member.full_name || conversation.name }}</h4>
				<div class="text-muted">{{ conversation.member.email || `${conversation.members.length} members` }}</div>
				<div v-if="(conversation.member.contact || {}).is_pending" class="mt-1 badge badge-icon d-inline-flex align-items-center bg-warning-light text-warning"><clock-icon class="fill-warning" height="12" width="12"></clock-icon>&nbsp;Pending</div>
			</div>

			<div id="info-items" class="mt-3 d-flex flex-column">
				<template v-if="(conversation.member.role || {}).role != 'support'">
					<!-- Overview -->
					<div class="border-top border-top px-4 py-2" v-if="!(conversation.member.contact || {}).is_pending">
						<h5
							class="h6 cursor-pointer mb-0 d-flex align-items-center py-2"
							data-toggle="collapse"
							data-target="#overview"
							@click="
								toggleCollapse($event);
								editFields = false;
							"
						>
							{{ editFields ? 'Edit Fields' : 'Overview' }}
							<chevron-right-icon class="ml-auto mr-n2"></chevron-right-icon>
						</h5>
						<div id="overview" class="collapse" data-parent="#info-items">
							<!-- Fields -->
							<div v-if="conversation.members.length == 1" class="form-group">
								<span class="text-muted d-block">Timezone</span>
								{{ conversation.member.timezone }}
								<div v-for="(custom_field, index) in (conversation.contact || {}).custom_fields" :key="index" class="my-2 custom-field position-relative">
									<span class="text-ellipsis text-muted">{{ custom_field.name }}</span>
									<div class="text-ellipsis">
										<span v-if="custom_field.value">{{ custom_field.value }}</span>
										<span v-else><i>No value</i></span>
									</div>
								</div>
							</div>

							<!-- Conversation members -->
							<div v-else>
								<div class="d-flex align-items-center py-2 member-item position-relative" v-for="member in conversation.members" :key="member.index">
									<trash-icon fill="red" class="position-absolute cursor-pointer delete-member opacity-0" height="18" width="18" @click.native="deleteMember(member)"></trash-icon>
									<div class="user-profile-image user-profile-image-sm align-self-center" :style="{ backgroundImage: 'url(' + member.user.profile_image + ')' }">
										<span v-if="!member.user.profile_image">{{ member.user.initials }}</span>
									</div>
									<div class="pl-2">
										<div class="font-weight-bold mb-n1">{{ member.user.full_name }}</div>
										<small class="ml-auto text-muted text-nowrap">{{ member.user.email }}</small>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Bookings -->
					<!-- <div v-if="conversation.members.length == 1" class="border-top px-4 py-2">
                        <h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#bookings" @click="toggleCollapse">
                            Bookings
                            <chevron-right-icon class="ml-auto mr-n2"></chevron-right-icon>
                        </h5>
                        <div id="bookings" class="collapse pb-1" data-parent="#info-items">
                            <bookings v-if="conversation.ready" :conversation="conversation" :blacklisted_services="blacklisted_services" :membersLength="conversation.members.length"></bookings>
                        </div>
                    </div> -->
				</template>

				<!-- Files -->
				<div class="border-top px-4 py-2" v-if="!(conversation.member.contact || {}).is_pending">
					<h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#files" @click="toggleCollapse">
						Files
						<chevron-right-icon class="ml-auto mr-n2"></chevron-right-icon>
					</h5>
					<div id="files" class="collapse pb-1" data-parent="#info-items">
						<div class="btn-tab mb-3">
							<button class="btn px-0 py-2 font-heading font-weight-bold rounded-0" :class="{ active: fileType == 'image' }" @click="fileType = 'image'">Photos</button>
							<button class="btn px-0 py-2 mx-4 font-heading font-weight-bold rounded-0" :class="{ active: fileType == 'video' }" @click="fileType = 'video'">Videos</button>
							<button class="btn px-0 py-2 mr-4 font-heading font-weight-bold rounded-0" :class="{ active: fileType == 'audio' }" @click="fileType = 'audio'">Audio</button>
							<button class="btn px-0 py-2 font-heading font-weight-bold rounded-0" :class="{ active: fileType == 'file' }" @click="fileType = 'file'">Files</button>
						</div>
						<template v-if="files.length > 0">
							<div class="d-flex flex-wrap mx-n1">
								<template v-if="fileType != 'file'">
									<div v-for="(file, fileIndex) in files" :key="fileIndex" class="position-relative file-thumbnail p-1 overflow-hidden">
										<div class="position-relative rounded bg-light h-100 cursor-pointer" @click="$parent.openFile(file)" :style="{ backgroundImage: 'url(' + file.preview + ')' }">
											<div v-if="file.type == 'image' || file.type == 'video'">
												<div class="position-absolute-center preview-video-play" v-if="file.type == 'video'">
													<play-icon height="15" width="15"></play-icon>
												</div>
											</div>
											<div v-else-if="file.type == 'audio'">
												<volume-mid-icon height="30" width="30" class="position-absolute-center"></volume-mid-icon>
											</div>
											<div v-else-if="file.type == 'file'" class="p-1">
												<file-empty-icon height="30" width="30" class="position-absolute-center" :is="$root.fileIcon(file.metadata.extension)"></file-empty-icon>
											</div>
										</div>
										<small v-if="file.type == 'file'" class="file-filename position-absolute text-ellipsis text-secondary px-2 text-center w-100">{{ file.metadata.filename }}</small>
									</div>
								</template>

								<div v-else v-for="(file, fileIndex) in files" :key="fileIndex" class="flex-grow-1 p-2 mb-2 d-flex align-items-center border bg-white rounded position-relative cursor-pointer overflow-hidden" @click="$root.downloadMedia(file)">
									<div class="flex-1">
										<div class="doc-thumbnail position-relative rounded overflow-hidden bg-light file-thumbnail">
											<component height="30" width="30" class="position-absolute-center" :is="$root.fileIcon(file.metadata.extension)"></component>
										</div>
									</div>
									<div class="w-100 overflow-hidden pl-2 file-details">
										<span class="font-weight-bold file-filename d-block text-nowrap text-ellipsis">{{ (file.metadata || {}).filename }}</span>
										<div class="text-muted text-ellipsis">
											<span class="mr-2">{{ ['audio', 'video'].find(x => x == file.type) ? file.metadata.duration : file.metadata.size }}</span>
											{{ file.created_diff }} ago
										</div>
										<div v-if="(file.tags || []).length > 0" class="d-flex align-items-center">
											<bookmark-icon width="18" height="18" fill="#999" class="ml-n1"></bookmark-icon>
											<span>{{ (file.tags || []).join(', ') }}</span>
										</div>
									</div>
								</div>
							</div>
							<div v-if="(conversation.files || {}).next_page_url && !conversation.filesLoading" class="text-center my-2">
								<button type="button" class="btn btn-sm btn-link text-body" @click="$root.getFiles(conversation)">Show more..</button>
							</div>
							<div v-else-if="conversation.filesLoading" class="text-center my-3">
								<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
							</div>
						</template>
						<div v-else class="text-center text-secondary py-3">No {{ fileType }}s found.</div>
					</div>
				</div>

				<!-- Tags -->
				<div class="border-top px-4 py-2" v-if="!(conversation.member.contact || {}).is_pending">
					<h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#tags" @click="toggleCollapse">
						Tags
						<chevron-right-icon class="ml-auto mr-n2"></chevron-right-icon>
					</h5>
					<div id="tags" class="collapse" data-parent="#info-items">
						<!-- Tags -->
						<div class="h-100 overflow-hidden d-flex flex-column">
							<template v-if="(tagsData.tags || []).length">
								<div>
									<input type="text" class="form-control form-control-sm shadow-none" placeholder="Search for tags..." v-model="tagSearch" />
								</div>
								<div v-if="(tagsData.tags || []).length > 0" class="my-2">
									<small v-for="(tag, tagIndex) in tagsData.tags" :key="tagIndex" class="badge badge-warning mr-1 mb-1">{{ tag }}</small>
								</div>

								<div class="overflow-y-only mt-2">
									<div v-if="tagsData.length == 0" class="text-center text-muted py-2">
										No results found.
									</div>
									<div v-else v-for="(data, dataIndex) in tagsData.data" :key="dataIndex" class="mb-3">
										<div class="rounded bg-white border py-2 px-3">
											<div v-if="data.type == 'message'" class="message-group mb-0">
												<div class="d-flex align-items-center mb-2">
													<div class="user-profile-image" :style="{ backgroundImage: 'url(' + data.data.user.profile_image + ')' }">
														<span v-if="!data.data.user.profile_image">{{ data.data.user.initials }}</span>
													</div>
													<small class="pl-2 pr-0 font-heading font-weight-bold font-size-base line-height-1 message-sender d-block">{{ data.data.user.full_name }}</small>
													<small class="text-muted ml-auto px-0">{{ data.data.created_at_format }}</small>
													<div class="text-wrap position-relative message-content" :class="{ 'p-0 bg-transparent': ['emoji', 'image', 'video'].find(x => x == data.data.type) }"></div>
												</div>

												<message-type :click="false" :square-thumbnail="true" :message="data.data" :outgoing="data.data.outgoing"></message-type>

												<div class="mb-1">
													<div v-for="(tag, dataTagIndex) in data.data.tags" :key="dataTagIndex" class="d-inline-block badge badge-warning line-height-sm mb-1 small py-1 px-2 mr-1 mt-1">
														{{ tag }}&nbsp;
														<close-icon
															height="8"
															width="8"
															transform="scale(2.5)"
															class="cursor-pointer"
															@click.native="
																data.data.tags.splice(dataTagIndex, 1);
																$parent.updateMessageTags(data.data);
															"
														></close-icon>
													</div>
												</div>
											</div>

											<div v-else-if="data.type == 'note'">
												<p class="mb-0">{{ data.data.notes }}</p>
												<small class="text-muted d-block">{{ data.data.created_at_format }}</small>
											</div>
										</div>
									</div>
								</div>
							</template>
							<div v-else class="text-center text-secondary pb-3">You don't have any tagged messages yet.</div>
						</div>
					</div>
				</div>

				<!-- Notes -->
				<!-- <template v-if="!(conversation.member.contact || {}).is_pending && (conversation.member.role || {}).role != 'support'">
					<div class="border-top px-4 py-2">
						<h5 class="h6 cursor-pointer mb-0 d-flex align-items-center py-2" data-toggle="collapse" data-target="#notes" @click="toggleCollapse">
							Notes
							<chevron-right-icon class="ml-auto mr-n2"></chevron-right-icon>
						</h5>
						<div id="notes" class="collapse pb-1" data-parent="#info-items">
							<button v-if="!addingNote && !selectedNote" class="btn btn-sm btn-white border d-flex align-items-center" @click="addingNote = true"><plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon>Add Note</button>
							<template v-if="addingNote">
								<vue-form-validate @submit="addNote()">
									<textarea v-model="newNote" data-required rows="3" class="form-control form-control-sm resize-none shadow-none border" placeholder="Add note.."></textarea>
									<div class="d-flex align-items-center mt-2">
										<button
											type="button"
											class="btn btn-sm btn-white border mr-1"
											@click="
												addingNote = false;
												newNote = '';
											"
										>
											Cancel
										</button>
										<button type="submit" class="ml-auto btn btn-sm btn-primary">Add</button>
									</div>
								</vue-form-validate>
							</template>
							<template v-else>
								<template v-if="(conversation.notes || []).length > 0">
									<template v-if="selectedNote">
										<vue-form-validate @submit="submitUpdateNote(selectedNote)" class="mt-2">
											<textarea v-model="selectedNote.new_notes" data-required rows="3" class="form-control form-control-sm resize-none shadow-none border" placeholder="Add note.."></textarea>
											<div class="d-flex align-items-center mt-2">
												<button type="button" class="btn btn-sm btn-white border mr-1" @click="selectedNote = null">
													Cancel
												</button>
												<button type="submit" class="ml-auto btn btn-sm btn-primary">Update</button>
											</div>
										</vue-form-validate>
									</template>
									<template v-else>
										<div
											v-for="note in conversation.notes"
											class="position-relative note py-3 cursor-pointer"
											@click="
												note.new_notes = note.notes;
												selectedNote = note;
											"
										>
											<template v-if="note.edit">
												<textarea rows="3" :value="note.notes" class="form-control form-control-sm resize-none"></textarea>
											</template>
											<template v-else>
												<div class="note-actions position-absolute d-flex align-items-center dropleft w-25 justify-content-end">
													<div class="action-content">
														<div class="action-button">
															<trash-icon fill="red" class="cursor-pointer delete-note" height="18" width="18" @click.native="deleteNote(note)"></trash-icon>
														</div>
													</div>
													<div class="position-absolute text-muted text-right small note-metalabel">{{ note.tags.join(', ') }}</div>
												</div>

												<p class="mb-0">{{ note.notes }}</p>
												<small class="text-muted d-block">{{ note.created_at_format }}</small>
											</template>
										</div>
									</template>
								</template>
								<div v-else class="text-center text-secondary py-3">You don't have any notes yet.</div>
							</template>
						</div>
					</div>
				</template> -->
			</div>
		</div>
	</div>
</template>

<script src="./info.js"></script>
<style lang="scss" scoped src="./info.scss"></style>
