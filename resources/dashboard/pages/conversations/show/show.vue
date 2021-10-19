<template>
	<div class="h-full flex overflow-hidden" v-if="conversation">
		<div class="h-full flex flex-col flex-grow">
			<div class="p-4 border-bottom relative flex items-center">
				<button @click="toggleConversationList()" class="text-gray-500 focus:outline-none lg:hidden">
					<ChevronLeftIcon class="fill-current"></ChevronLeftIcon>
				</button>
				<div class="flex items-center w-3/6 ml-2 lg:ml-0">
					<div>
						<div class="profile-image profile-image-md" :style="{ backgroundImage: 'url(' + conversation.member.profile_image + ')' }">
							<span v-if="!conversation.member.profile_image">{{ conversation.member.initials }}</span>
							<i v-if="$root.isOnline(conversation.member.id)" class="online-status">&nbsp;</i>
						</div>
					</div>
					<div class="ml-2">
						<h5 v-if="conversation.members.length > 1" class="font-bold md:font-normal text-sm sm:text-xs md:text-xl" @blur="updateConversationName" @keypress="updateConversationName">{{ conversation.name }}</h5>
						<h5 v-else class="font-bold md:font-normal text-sm sm:text-xs md:text-xl">{{ conversation.member.full_name || conversation.name }}</h5>
						<small v-if="conversation.member.is_pending" class="text-warning">Pending account</small>
						<div class="flex items-center" v-else-if="conversation.member.id && conversation.member.last_online_format">
							<small class="text-muted text-xs md:text-sm">{{ $root.isOnline(conversation.member.id) ? 'Online' : `Last online ${conversation.member.last_online_format}` }}</small>
						</div>
						<small v-else-if="conversation.members.length > 1" class="block text-muted text-xs md:text-sm"> {{ conversation.members.map(m => m.user.full_name).join(', ') }} </small>
						<small v-else class="block text-muted text-xs md:text-sm">
							<template>{{ conversation.member.email }}</template>
						</small>
					</div>
				</div>
				<div class="ml-auto btn-actions w-1/6 md:w-auto flex">
					<template v-if="!conversation.member.is_pending && (conversation.member.role || {}).role != 'support'">
						<button
							class="text-primary hidden lg:block"
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
					<button class="text-primary hidden lg:block" :data-intro="$root.intros.conversations.steps[4]" data-step="5" :class="{ active: showNotes }" @click="showNotes = true"><note-icon class="fill-current"></note-icon></button>
					<button class="text-primary hidden lg:block" @click="copyConvoLink()"><link-icon class="fill-current transform scale-125"></link-icon></button>
					<VueDropdown :options="['Audio Call', 'Notes', 'Copy Link']" @click="action">
						<template #button>
							<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100 block lg:hidden justify-center">
								<MoreIcon class="w-4 h-4"></MoreIcon>
							</div>
						</template>
					</VueDropdown>
				</div>
			</div>

			<div class="flex flex-grow h-full overflow-hidden">
				<div class="conversation-messages flex-grow text-nowrap overflow-hidden relative h-full bg-white">
					<div class="h-full">
						<Messages :conversation="conversation" :ready="ready" @scrollUp="scrollUp"></Messages>
					</div>
				</div>

				<!-- Info -->
				<!-- <div class="conversation-details h-100 position-relative bg-white overflow-hidden" :class="{ open: $root.detailsTab }">
				<div class="text-left h-100 overflow-hidden">
					<info :conversation="conversation"></info>
				</div>
			</div>
 -->
			</div>
		</div>

		<div class="notes-container border-left overflow-auto lg:overflow-hidden flex flex-col" :class="{ open: showNotes }">
			<div class="notes-header border-bottom px-6 flex justify-between">
				<span class="text-muted font-bold">NOTES</span>
				<div class="flex items-center">
					<button type="button" class="btn btn-sm btn-outline-primary" @click="addNewNote = true"><span>ADD NEW</span></button>
					<button type="button" @click="showNotes = false" class="rounded-full p-2 border text-gray-600 ml-1 transition-colors hover:bg-gray-200 focus:outline-none"><CloseIcon class="fill-current"></CloseIcon></button>
				</div>
			</div>

			<div class="p-8 overflow-auto flex-grow pb-24 md:pb-8">
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
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
