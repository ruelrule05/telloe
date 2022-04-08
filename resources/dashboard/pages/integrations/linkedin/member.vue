<template>
	<div>
		<div v-if="member" class="min-h-screen flex flex-col relative">
			<div v-if="videoMessageStatus" class="absolute-center w-full h-full z-50 bg-white">
				<div class="absolute-center text-center w-full">
					<div class="absolute-center w-3/12">
						<div class="rounded w-full h-2 border bg-gray-50 overflow-hidden">
							<div class="bg-primary h-full" :style="{ width: `${uploadProgress + gifProgress}%` }"></div>
						</div>
						<div class="mt-2 text-sm">{{ videoMessageStatus }}</div>
					</div>
				</div>
			</div>
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white md:z-0 z-10">
				<div class="flex items-center">
					<router-link to="/dashboard/integrations/linkedin" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
					LINKEDIN MEMBER DETAILS
				</div>

				<button
					v-if="!addingVideoMessage"
					type="button"
					class="btn btn-md btn-primary flex items-center"
					@click="
						reset();
						addingVideoMessage = true;
					"
				>
					<span>Create Video</span>
				</button>
			</div>
			<div class="h-20 lg:hidden block" />

			<div class="flex flex-col lg:flex-row items-stretch h-full contact-content flex-grow">
				<div class="w-full lg:w-5/12 min-h-full border-r-0 lg:border-r border-b lg:border-b-0">
					<div class="p-8 contact-detail bg-secondary-light">
						<div class="flex items-start contact-profile">
							<div class="mr-4">
								<div class="profile-image profile-image-xl" :style="{ backgroundImage: 'url(' + member.author_details.photo_url + ')' }">
									<span v-if="!member.author_details.photo_url">{{ member.author.name.charAt(0) }}</span>
								</div>
							</div>

							<div class="flex-1 pt-2">
								<h2 class="mb-1 text-xl font-bold">{{ member.author.name }}</h2>
								<p class="text-xs text-muted">{{ member.author_details.headline }}</p>
							</div>
						</div>
						<div class="flex justify-end">
							<div class="w-full lg:w-4/5 flex items-end space-x-24 mt-9">
								<div>
									<span class="flex mb-1 font-bold">{{ member.bookings ? member.bookings.total : 0 }}</span>
									<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Bookings</p>
								</div>
								<div>
									<span class="flex mb-1 font-bold">{{ member.videoMessages ? member.videoMessages.length : 0 }}</span>
									<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Video Messages</p>
								</div>
							</div>
						</div>
					</div>
					<div class="px-6 pb-6 contact-files">
						<ul class="flex p-0 mb-4 tabs">
							<li :class="{ active: activeTab == 'notes' }"><span class="cursor-pointer" @click="activeTab = 'notes'">Notes</span></li>
							<li :class="{ active: activeTab == 'fields' }"><span class="cursor-pointer" @click="activeTab = 'fields'">Fields</span></li>
							<li :class="{ active: activeTab == 'tags' }"><span class="cursor-pointer" @click="activeTab = 'tags'">Tags</span></li>
						</ul>

						<template v-if="activeTab == 'notes'">
							<div class="flex items-center justify-between mb-6 filters">
								<button type="button" class="btn btn-outline-primary btn-sm" @click="addingNote = true"><span>Add new</span></button>
								<div class="flex">
									<vue-select v-if="notes.length > 0" :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="notesOrder" label="Date" placeholder="Order by" @input="getContactNotes"></vue-select>
								</div>
							</div>

							<vue-form-validate v-if="addingNote && !selectedNote" class="mt-2 mb-3" @submit="confirmAddNote()">
								<textarea placeholder="Write note..." v-model="newNote" data-required rows="3" class="form-control resize-none"></textarea>
								<div class="flex justify-between mt-2">
									<button
										class="btn btn-sm btn-outline-primary"
										type="button"
										@click="
											newNote = '';
											addingNote = false;
										"
									>
										<span>Cancel</span>
									</button>
									<button class="btn btn-sm btn-primary" type="submit"><span>Add</span></button>
								</div>
							</vue-form-validate>

							<vue-form-validate v-else-if="selectedNote" class="mt-2 mb-3" @submit="confirmUpdateNote(selectedNote)">
								<textarea placeholder="Write note..." v-model="selectedNote.new_note" data-required rows="3" class="form-control resize-none"></textarea>
								<div class="flex justify-between mt-2">
									<button class="btn btn-sm btn-outline-primary" type="button" @click="selectedNote = null"><span>Cancel</span></button>
									<button class="btn btn-primary btn-sm" type="submit"><span>Update</span></button>
								</div>
							</vue-form-validate>

							<div v-for="contact_note in notes" :key="contact_note.id" class="relative flex justify-between p-5 mb-3 rounded-lg bg-secondary-light note-row">
								<div class="">
									<p class="mr-4 text-sm">{{ contact_note.note }}</p>
									<div class="flex items-center mt-2">
										<p class="text-xxs text-muted">
											{{ formatDate(contact_note.created_at) }}
											<span v-if="contact_note.type == 'booking-note'"> - Booking note</span>
										</p>
									</div>
								</div>

								<VueDropdown :options="contact_note.type == 'booking-note' ? ['View Booking'] : ['Edit', 'Delete']" @click="noteAction($event, contact_note)">
									<template #button>
										<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100 -mt-2 -mr-3">
											<MoreIcon class="fill-current text-gray-300 h-4 w-4"></MoreIcon>
										</div>
									</template>
								</VueDropdown>
							</div>
						</template>

						<template v-else-if="activeTab == 'fields'">
							<template v-if="editFields">
								<div class="flex mb-2 text-muted mt-3">
									<span class="w-1/2 ml-3">Label</span>
									<span class="w-1/2 -ml-1">Value</span>
								</div>
								<draggable handle=".handle" :list="linkedinUser.custom_fields">
									<div v-for="(custom_field, index) in linkedinUser.custom_fields" :key="custom_field.id" class="mb-2 flex items-center">
										<button class="flex items-center handle cursor-move" type="button">
											<move-icon width="10" height="10" transform="scale(1.5)"></move-icon>
										</button>
										<input type="text" placeholder="Label" @blur="updateLinkedinUser()" v-model="custom_field.name" class="w-1/2 mr-1 ml-1" />
										<input type="text" placeholder="Value" @blur="updateLinkedinUser()" v-model="custom_field.value" class="w-1/2 ml-1" />
										<trash-icon
											width="18"
											height="18"
											class="cursor-pointer ml-1 fill-current text-gray-400"
											@click.native="
												linkedinUser.custom_fields.splice(index, 1);
												updateLinkedinUser();
											"
										></trash-icon>
									</div>
								</draggable>
								<div class="flex items-center">
									<button class="flex items-center mr-1 pointer-events-none" disabled type="button">
										<move-icon width="10" height="10" transform="scale(1.5)" class="opacity-0"></move-icon>
									</button>
									<vue-select v-model="new_field.name" :options="customFields" class="w-1/2 mr-1" :searchable="true" :suggestion="true" container_class="w-50" :caret="false" placeholder="Label"></vue-select>
									<input type="text" placeholder="Value" v-model="new_field.value" class="w-1/2 ml-2" />
									<trash-icon width="18" height="18" class="ml-1 opacity-0"></trash-icon>
								</div>
								<div class="flex items-center justify-between mt-4">
									<button type="button" class="btn btn-sm btn-outline-primary" @click="editFields = false"><span>Close</span></button>
									<button class="btn btn-primary btn-sm" type="button" @click="addNewField"><span>Save</span></button>
								</div>
							</template>

							<div v-else>
								<div v-for="(custom_field, index) in linkedinUser.custom_fields" :key="index" class="flex items-center">
									<div class="mb-2 flex items-center justify-between w-full text-sm">
										<span class="text-muted">{{ custom_field.name }}:</span>
										<span>{{ custom_field.value }}</span>
									</div>
								</div>
								<button class="btn btn-sm btn-outline-primary mt-3" type="button" @click="editFields = true">
									<span>Edit Fields</span>
								</button>
							</div>
						</template>

						<div v-if="activeTab == 'tags'">
							<label>Tags</label>
							<multiselect v-model="linkedinUser.tags" :options="tagOptions" :showLabels="false" :taggable="true" placeholder="" multiple @tag="addTag" @remove="removeTag"></multiselect>
						</div>
					</div>
				</div>

				<div class="w-full lg:w-7/12 p-8">
					<div class="flex items-center w-full mb-6 space-x-3">
						<div class="font-serif uppercase font-semibold text-xs cursor-pointer transition-colors" :class="[rightTab == 'video_messages' ? 'text-primary' : ' text-gray-500 hover:text-black']" @click="rightTab = 'video_messages'">Video Messages</div>
						<div class="font-serif uppercase font-semibold text-xs cursor-pointer transition-colors" :class="[rightTab == 'bookings' ? 'text-primary' : ' text-gray-500 hover:text-black']" @click="rightTab = 'bookings'">Bookings</div>
					</div>
					<template v-if="rightTab == 'bookings'">
						<div v-if="bookings.data.length == 0" class="flex-grow relative h-full">
							<div class="absolute-center text-sm text-gray-400">No bookings created for this contact.</div>
						</div>
						<template v-else>
							<div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 filters">
								<div class="flex-grow flex items-center">
									<vue-select :options="servicesList" button_class="mr-2 border-0 bg-light shadow-none" v-model="selectedService" label="Service" placeholder="All" @input="filterBookings"></vue-select>
									<div class="ml-2">
										<vue-select :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="order" label="Date" @input="filterBookings"></vue-select>
									</div>
								</div>
								<button type="button" class="btn btn-md btn-primary flex items-center" @click="createNewEvent">
									<span class="hidden md:block">Add</span>
									<span class="block md:hidden">+</span>
									<span class="ml-2">Booking</span>
								</button>
							</div>

							<div class="flex items-center justify-between font-serif uppercase text-xs text-gray-500">
								<div class="w-4/12">
									<span class="font-bold">Booking Name</span>
								</div>
								<div class="w-3/12 text-right pr-6">
									<span class="font-bold">Date</span>
								</div>
								<div class="w-3/12 text-right">
									<span class="font-bold">Start/End</span>
								</div>
								<div class="w-2/12"></div>
							</div>

							<div class="py-4 flex items-center justify-between border-bottom" v-for="booking in bookings.data" :key="booking.id">
								<div class="w-4/12">
									<span class="font-bold text-primary">{{ booking.name }}</span>
								</div>
								<div class="w-3/12 flex items-center justify-end text-sm"><ClockIcon class="fill-current text-gray-200 mr-2"></ClockIcon>{{ formatDate(booking.date) }}</div>
								<div class="w-3/12 text-sm text-right">{{ booking.start }} &mdash; {{ booking.end }}</div>
								<div class="w-2/12 text-right">
									<VueDropdown :options="['Edit']" @click="bookingAction($event, booking)" class="-mb-2">
										<template #button>
											<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
												<CogIcon class="fill-current text-gray-400"></CogIcon>
											</div>
										</template>
									</VueDropdown>
								</div>
							</div>

							<Paginate v-if="bookings.data.length > 0" :data="bookings" @change="p => (page = p)" class="mt-6"></Paginate>
						</template>
					</template>

					<template v-else-if="rightTab == 'video_messages'">
						<div v-if="videoMessages.length == 0" class="flex-grow relative h-full">
							<div class="absolute-center text-sm text-gray-400">No video messages added yet.</div>
						</div>
						<div v-else class="flex-grow">
							<template v-for="vMessage in videoMessages">
								<div class="flex items-start justify-between contact-row border-t py-3" :key="vMessage.id">
									<div class="flex-grow flex items-center gap-3">
										<div class="flex gap-2">
											<template v-for="(video, videoIndex) in vMessage.videos">
												<div v-if="videoIndex < 3" class="h-24 w-44 bg-center bg-cover bg-no-repeat bg-gray-50 relative" :key="`video-${video.id}`" :style="{ backgroundImage: `url(${video.user_video.thumbnail})` }">
													<div v-if="videoIndex == 2 && vMessage.videos.length > 3" class="absolute-center w-full h-full bg-black bg-opacity-40">
														<span class="absolute-center text-white">+{{ vMessage.videos.length - 2 }}</span>
													</div>
													<span v-else class="text-xxs absolute bottom-1 left-1 text-white bg-black bg-opacity-25 p-1 rounded leading-none">{{ format(video.user_video.duration, { leading: true }) }}</span>
												</div>
											</template>
										</div>
										<div class="flex-grow">
											<div class="overflow-hidden pr-6 w-full">
												<div class="line-clamp-1 -mb-1">
													<span class="font-bold text-primary cursor-pointer hover:underline" @click="openVideoMessage(vMessage)">
														{{ vMessage.title }}
													</span>
												</div>
												<div class="text-sm text-gray-500 mb-2 line-clamp-1">{{ vMessage.description }}</div>
											</div>
											<div class="text-xs text-gray-400 mb-1">{{ dayjs(vMessage.created_at).format('MMM DD, YYYY hh:mm A') }}</div>
											<div class="flex items-center text-xs text-gray-500 mt-1 gap-4">
												<div>
													<VueDropdown @click="shareVideoMessage($event, vMessage)" :options="['Copy video link', 'Copy video for email']" class="-mr-1 mt-0.5" dropPosition="right-auto left-0 w-44">
														<template #button>
															<div class="flex items-center transition-colors cursor-pointer"><ShareIcon class="w-3.5 fill-current text-gray-400 mr-1"></ShareIcon> Share</div>
														</template>
													</VueDropdown>
												</div>
												<div class="flex items-center"><EyeIcon class="mr-1 w-4 fill-current"></EyeIcon> {{ vMessage.views }}</div>
												<div class="flex items-center"><ThumbupIcon class="mr-1 w-3 fill-current"></ThumbupIcon> {{ likes(vMessage) }}</div>
												<div class="flex items-center"><ThumbdownIcon class="mr-1 w-3 fill-current"></ThumbdownIcon> {{ dislikes(vMessage) }}</div>
												<div class="flex items-center cursor-pointer hover:text-primary" @click="openVideoMessage(vMessage)"><CommentIcon class="mr-1 w-4 fill-current"></CommentIcon> {{ vMessage.conversation ? vMessage.conversation.messages_count : 0 }}</div>
											</div>
										</div>
									</div>

									<div class="flex items-center">
										<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100" @click="setQuickAdd(vMessage)">
											<PlusIcon class="stroke-current text-gray-400 w-3 h-3 transform scale-110"></PlusIcon>
										</div>
										<VueDropdown @click="videoMessageAction($event, vMessage)" :options="['Edit', 'Delete']" class="mr-1" dropPosition="w-28">
											<template #button>
												<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
													<CogIcon class="fill-current text-gray-400"></CogIcon>
												</div>
											</template>
										</VueDropdown>
										<toggle-switch @input="updateVideoMessageStatus($event, vMessage)" v-model="vMessage.is_active"></toggle-switch>
									</div>
								</div>
							</template>
						</div>
					</template>
				</div>
			</div>
			<AddVideoMessage v-show="addingVideoMessage" :linkedinUser="linkedinUser.id" class="absolute top-0 left-0 h-screen w-full z-50" :videoMessage="videoMessage" @close="addingVideoMessage = false" @submit="updateVideoMessageSubmit" @totalDuration="totalDuration = $event" @showLibrary="showLibrary = $event" @removeVideo="videoMessage.userVideos.splice($event, 1)"></AddVideoMessage>

			<Library
				v-show="showLibrary"
				@close="
					showLibrary = false;
					quickAdd = false;
				"
				@input="
					if (videoMessage) {
						videoMessage.userVideos = $event;
						showLibrary = false;
						if (quickAdd) {
							updateVideoMessageSubmit(videoMessage);
						}
					}
				"
				:selectedUserVideos="videoMessage ? videoMessage.userVideos : []"
			></Library>

			<Modal ref="deleteVideoMessageModal">
				<div class="text-center">
					<WarningIcon class="fill-current text-red-600 h-8 w-8 inline-block mb-4"></WarningIcon>
					<p>Are you sure you want to delete this video message?</p>
				</div>
				<div class="flex justify-between mt-6">
					<button class="btn btn-sm btn-outline-primary" type="button" @click="$refs.deleteVideoMessageModal.hide()"><span>Cancel</span></button>
					<button class="btn btn-sm btn-red" type="button" @click="confirmDeleteVideoMessage"><span>Delete</span></button>
				</div>
			</Modal>

			<Booking class="contact-booking" :linkedinUser="linkedinUser" @store="newBookingStored" :newEvent="newEvent" :booking="selectedBooking" @update="bookingUpdated" @close="selectedBooking = null" @delete="bookingDeleted"></Booking>
		</div>
	</div>
</template>

<script src="./member.js"></script>
<style lang="scss" scoped>
.contact-content {
	.contact-row {
		@apply py-5;

		.profile {
			@apply bg-cover bg-center bg-no-repeat rounded-full bg-primary relative mr-3;
			width: 28px;
			height: 28px;

			> span {
				@apply absolute transform -translate-x-1/2 -translate-y-1/2 z-10 left-1/2 top-1/2 text-xs font-bold text-white leading-tight;
				padding-bottom: 0.5px;
				padding-left: 1px;
			}
		}

		.action-popup {
			top: 25px;
			right: 0;
		}
	}

	.contact-profile {
		.profile {
			@apply bg-cover bg-center bg-no-repeat rounded-full bg-primary relative mr-7;
			width: 65px;
			height: 65px;

			> span {
				@apply absolute transform -translate-x-1/2 -translate-y-1/2 z-10 left-1/2 top-1/2 text-lg font-light text-secondary leading-tight;
				padding-bottom: 0.5px;
				padding-left: 1px;
			}
		}
	}

	.tabs {
		margin-top: -1px;

		li {
			@apply pr-4;

			span {
				@apply flex text-gray-300 font-serif uppercase tracking-tighter font-bold py-5 border-t-2 border-transparent;

				font-size: 0.7rem;
			}

			&.active {
				span {
					@apply text-primary border-primary border-t-2;
				}
			}
		}
	}

	.filters {
		.button {
			@apply inline-flex rounded-full border-primary border relative text-primary font-serif uppercase tracking-tighter font-bold h-7 flex items-center justify-center px-3;

			font-size: 0.6rem;
			padding-top: 1px;
		}

		.select-wrap.notes {
			@apply h-7 mr-2;
			width: 90px;

			&:before {
				@apply text-muted  text-xs items-center flex absolute flex h-7;

				content: 'Notes:';
				left: 0.5rem;
			}
			&:after {
				@apply h-7 pr-1.5 w-4;
				padding-bottom: 3px;
			}
			select {
				@apply shadow-none border-none flex items-center bg-gray-100 text-xs h-7 py-0 font-bold;
				padding-left: 3.25rem;
			}
		}

		&.bookings {
			.select-wrap.notes {
				width: 105px;

				&:before {
					content: 'Services:';
				}
				select {
					padding-left: 4.15rem;
				}
			}
		}

		.select-wrap.date {
			@apply h-7;
			width: 110px;

			&:before {
				@apply text-muted text-xs items-center flex absolute flex h-7;

				content: 'Date:';
				left: 0.5rem;
			}
			&:after {
				@apply h-7 pr-1.5 w-4;
				padding-bottom: 3px;
			}
			select {
				@apply shadow-none border-none flex items-center bg-gray-100 text-xs h-7 py-0 font-bold;
				padding-left: 2.75rem;
			}
		}
	}

	.note-row {
		.action-popup {
			top: 50px;
			right: -100px;
		}
	}

	.action-popup {
		@apply shadow-lg p-3 bg-white w-36;
		z-index: 9;

		a {
			@apply flex text-sm py-1 px-2 w-full;

			&:hover {
				@apply bg-secondary-light rounded-md;
			}
		}
	}
}
.block-container {
	&.completed {
		button {
			@apply pointer-events-none opacity-20;
		}
		.text-sm {
			@apply text-gray-300;
		}
	}
}

.contact-booking {
	@media (max-width: 768px) {
		@apply z-10;
	}
	@media (max-width: 425px) {
		width: 100%;
	}
}
</style>
