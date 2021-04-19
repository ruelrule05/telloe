<template>
	<div v-if="contact" class="min-h-screen flex flex-col overflow-hidden">
		<div class="content-header border-bottom flex items-center justify-between">
			<div class="flex items-center">
				<router-link to="/dashboard/contacts" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
				CONTACT DETAILS
			</div>
			<div>
				<button type="button" class="hidden btn btn-md btn-primary"><span>Add Booking</span></button>
			</div>
		</div>

		<div class="page-contacts h-full page-profile">
			<div class="flex items-stretch h-full contact-content">
				<div class="w-5/12 min-h-full border-right">
					<div class="p-6 contact-detail bg-secondary-light">
						<div class="flex items-start contact-profile">
							<div class="mr-4">
								<div class="profile-image profile-image-xl" :style="{ backgroundImage: 'url(' + contact.contact_user.profile_image + ')' }">
									<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
									<i v-if="$root.isOnline(contact.contact_user_id)" class="online-status">&nbsp;</i>
								</div>
							</div>

							<div class="flex-1 pt-2">
								<h2 class="mb-1 text-xl font-bold">{{ contact.contact_user.full_name }}</h2>
								<p class="text-xs text-muted">{{ contact.contact_user.email }}</p>

								<div class="flex items-end justify-between mt-9">
									<div>
										<span class="px-3 py-1 mb-1 text-xs font-bold bg-gray-200 rounded-md text-muted">Accepted</span>
										<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Status</p>
									</div>
									<div>
										<span class="flex mb-1 font-bold">{{ contact.bookings.total }}</span>
										<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Bookings</p>
									</div>
									<div>
										<span class="flex mb-1">{{ formatDate(contact.created_at) }}</span>
										<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Added</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="px-6 pb-6 contact-files ">
						<ul class="flex p-0 mb-4 tabs">
							<li class="active"><span>Notes</span></li>
							<li><span>Fields</span></li>
							<!-- <li><span>Packages</span></li>
							<li><span>Subscriptions</span></li> -->
						</ul>

						<div class="flex items-center justify-between mb-6 filters">
							<button type="button" class="btn btn-outline-primary btn-sm" @click="addingNote = true"><span>Add new</span></button>
							<div class="flex">
								<vue-select v-if="(contact.contactNotes || []).length > 0" :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="notesOrder" label="Date" placeholder="Order by" @input="getContactNotes"></vue-select>
							</div>
						</div>

						<!-- Add Note -->
						<vue-form-validate v-if="addingNote && !selectedNote" class="mt-2 mb-3" @submit="confirmAddNote()">
							<textarea placeholder="Write note..." v-model="newNote" data-required rows="3" class="form-control resize-none"></textarea>
							<div class="flex justify-between mt-2">
								<button
									class="btn btn-sm"
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

						<!-- Edit Note -->
						<vue-form-validate v-else-if="selectedNote" class="mt-2 mb-3" @submit="confirmUpdateNote(selectedNote)">
							<textarea placeholder="Write note..." v-model="selectedNote.new_note" data-required rows="3" class="form-control resize-none"></textarea>
							<div class="flex justify-between mt-2">
								<button class="btn btn-sm" type="button" @click="selectedNote = null"><span>Cancel</span></button>
								<button class="btn btn-primary btn-sm" type="submit"><span>Update</span></button>
							</div>
						</vue-form-validate>

						<div v-for="contact_note in contact.contactNotes" :key="contact_note.id" class="relative flex justify-between p-5 mb-3 rounded-lg bg-secondary-light note-row">
							<div class="">
								<p class="mr-4 text-sm">{{ contact_note.note }}</p>
								<div class="flex items-center mt-2">
									<p class="text-xxs text-muted">{{ formatDate(contact_note.created_at) }}</p>
								</div>
							</div>

							<VueDropdown :options="['Edit', 'Delete']" @click="noteAction($event, contact_note)">
								<template #button>
									<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100 -mt-2 -mr-3">
										<MoreIcon class="fill-current text-gray-300 h-4 w-4"></MoreIcon>
									</div>
								</template>
							</VueDropdown>
						</div>
					</div>
				</div>
				<div class="w-7/12 p-6">
					<div class="flex items-center justify-between mb-6 filters">
						<h5 class="font-serif text-sm font-bold tracking-tighter uppercase">Bookings</h5>
						<div class="flex-grow flex items-center justify-end">
							<vue-select :options="servicesList" button_class="mr-2 border-0 bg-light shadow-none" v-model="selectedService" label="Service" placeholder="All" @input="filterBookings"></vue-select>
							<div class="ml-2">
								<vue-select :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="order" label="Date" @input="filterBookings"></vue-select>
							</div>
						</div>
					</div>
					<div class="flex py-4 flex items-center justify-between border-bottom" v-for="booking in contact.bookings.data" :key="booking.id">
						<div>
							<span class="font-bold text-primary">{{ booking.service.name }}</span>
						</div>
						<div class="flex items-center justify-end text-sm"><ClockIcon class="fill-current text-gray-200 mr-2"></ClockIcon>{{ formatDate(booking.created_at) }}</div>
						<div class="text-sm text-right">{{ booking.start }} &mdash; {{ booking.end }}</div>
						<div>
							<VueDropdown :options="['Edit']" @click="bookingAction($event, booking)" class="-mr-2 -mt-2">
								<template #button>
									<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
										<CogIcon class="fill-current text-gray-400"></CogIcon>
									</div>
								</template>
							</VueDropdown>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Booking :booking="selectedBooking" @update="bookingUpdated" @close="selectedBooking = null" @delete="bookingDeleted"></Booking>

		<div class="hidden overflow-auto h-full pb-4">
			<div class="p-4 d-flex align-items-center">
				<button class="btn p-1 btn-white badge-pill shadow-sm" type="button" @click="$router.push('/dashboard/contacts')">
					<arrow-left-icon width="30" height="30"></arrow-left-icon>
				</button>

				<div class="ml-auto d-flex align-items-center">
					<button class="btn btn-white shadow-sm mr-2" type="button" @click="$refs['add'].show()">
						Add Booking
					</button>
					<div class="dropdown">
						<button class="btn p-2 btn-white badge-pill shadow-sm" data-toggle="dropdown" data-offset="-130, 10">
							<more-icon width="20" height="20" transform="scale(0.75)"></more-icon>
						</button>
						<div class="dropdown-menu">
							<span class="dropdown-item cursor-pointer" @click="goToConversation()">
								Send Message
							</span>
							<span class="dropdown-item cursor-pointer" @click="$refs['editModal'].show()">
								Edit
							</span>
							<span class="dropdown-item cursor-pointer" @click="$refs['deleteModal'].show()">
								Delete
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="px-4">
				<div class="row px-2 align-items-stretch">
					<div class="col-md-5 px-2">
						<div class="px-1">
							<div class="rounded bg-white shadow-sm p-3 mb-4">
								<div class="text-center">
									<div
										class="user-profile-image d-inline-block"
										:style="{
											backgroundImage: 'url(' + contact.contact_user.profile_image + ')'
										}"
									>
										<span v-if="!contact.contact_user.profile_image">
											{{ contact.contact_user.initials }}
										</span>
										<i v-if="$root.isOnline(contact.contact_user_id)" class="online-status bg-success">&nbsp;</i>
									</div>
									<h1 class="h3 font-heading mt-2 mb-0">{{ contact.contact_user.full_name }}</h1>
									<div class="text-muted mb-1">{{ contact.contact_user.email }}</div>
								</div>
								<div class="d-flex justify-content-between mt-4">
									<div>
										<div class="text-gray mb-1">Status</div>
										<div>
											<div class="badge badge-icon d-inline-flex align-items-center" :class="[contact.is_pending ? 'bg-warning-light text-warning' : 'bg-primary-light text-primary']">
												<clock-icon v-if="contact.is_pending" height="12" width="12"></clock-icon>
												<checkmark-circle-icon v-else height="12" width="12"></checkmark-circle-icon>
												&nbsp;{{ contact.is_pending ? 'Pending' : 'Accepted' }}
											</div>
										</div>
									</div>
									<div>
										<div class="text-gray mb-1">Bookings</div>
										<div>{{ contact.bookings.total }}</div>
									</div>
									<div>
										<div class="text-gray mb-1">Date Added</div>
										<div>{{ formatDate(contact.created_at) }}</div>
									</div>
								</div>
							</div>

							<div class="rounded bg-white shadow-sm p-3 mb-4">
								<div class="d-flex">
									<h5 class="font-heading mb-0">Fields</h5>
									<button class="ml-auto btn btn-light p-1 badge-pill line-height-0 shadow-none" type="button" @click="editFields = !editFields">
										<pencil-icon width="18" height="18"></pencil-icon>
									</button>
								</div>
								<template v-if="editFields">
									<div class="d-flex mb-2 text-gray mt-3">
										<span class="w-50 ml-3">Label</span>
										<span class="w-50 ml-n1">Value</span>
									</div>
									<draggable handle=".handle" :list="contact.custom_fields" @end="updateContact(contact)">
										<div v-for="(custom_field, index) in contact.custom_fields" :key="custom_field.id" class="d-flex mb-2 align-items-center">
											<button class="btn p-0 d-flex align-items-center handle cursor-move" type="button">
												<move-icon width="10" height="10" transform="scale(1.5)"></move-icon>
											</button>
											<input type="text" placeholder="Label" @blur="updateContact(contact)" v-model="custom_field.name" class="form-control form-control-sm w-50 mr-1 ml-1" />
											<input type="text" placeholder="Value" @blur="updateContact(contact)" v-model="custom_field.value" class="form-control form-control-sm w-50 ml-1" />
											<trash-icon
												width="18"
												height="18"
												class="cursor-pointer ml-1"
												@click.native="
													contact.custom_fields.splice(index, 1);
													updateContact(contact);
												"
											></trash-icon>
										</div>
									</draggable>
									<div class="d-flex align-items-center">
										<button class="btn p-0 d-flex align-items-center mr-1" disabled type="button">
											<move-icon width="10" height="10" transform="scale(1.5)" class="fill-gray-400"></move-icon>
										</button>
										<vue-select v-model="new_field.name" :options="customFields" button_class="form-control form-control-sm mr-1" :searchable="true" :suggestion="true" container_class="w-50" :caret="false" placeholder="Label"></vue-select>
										<!-- <input type="text" placeholder="Label" @blur="addNewField" v-model="new_field.name" class="form-control form-control-sm w-50 mr-1"> -->
										<input type="text" placeholder="Value" v-model="new_field.value" class="form-control form-control-sm w-50 ml-2" />
										<trash-icon width="18" height="18" class="ml-1 opacity-0"></trash-icon>
									</div>
									<div class="d-flex align-items-center mt-4">
										<button type="button" class="btn btn-light shadow-none" @click="editFields = false">Close</button>
										<button class="ml-auto btn btn-primary" type="button" @click="addNewField">Save</button>
									</div>
								</template>
								<div v-else v-for="(custom_field, index) in contact.custom_fields" :key="index" class="d-flex align-items-center custom-field position-relative">
									<div class="mt-3 d-flex align-items-center w-100">
										<span class="text-muted">{{ custom_field.name }}</span>
										<div class="ml-auto d-flex align-items-center">
											<span>{{ custom_field.value }}</span>
											<trash-icon width="18" height="18" class="cursor-pointer ml-1 d-none" @click.native="$root.auth.custom_fields.splice(index, 1)"></trash-icon>
										</div>
									</div>
								</div>
							</div>

							<div class="rounded bg-white shadow-sm p-3 mb-4">
								<div class="d-flex mb-3">
									<h5 class="font-heading mb-0">Notes</h5>
									<div class="ml-auto d-flex align-items-center">
										<vue-select v-if="(contact.contactNotes || []).length > 0" :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="notesOrder" label="Date" placeholder="Order by" @input="getContactNotes"></vue-select>
										<button
											class="btn btn-light p-1 badge-pill line-height-0 shadow-none"
											type="button"
											@click="
												addingNote = true;
												selectedNote = null;
											"
										>
											<plus-icon width="18" height="18" transform="scale(1.4)"></plus-icon>
										</button>
									</div>
								</div>

								<vue-form-validate v-if="addingNote && !selectedNote" class="mt-2 mb-3" @submit="confirmAddNote()">
									<textarea placeholder="Write note..." v-model="newNote" data-required rows="3" class="form-control resize-none"></textarea>
									<div class="d-flex align-items-center mt-2">
										<button
											class="btn btn-light shadow-none"
											type="button"
											@click="
												newNote = '';
												addingNote = false;
											"
										>
											Cancel
										</button>
										<button class="ml-auto btn btn-primary" type="submit">Add</button>
									</div>
								</vue-form-validate>

								<vue-form-validate v-else-if="selectedNote" class="mt-2 mb-3" @submit="confirmUpdateNote(selectedNote)">
									<textarea placeholder="Write note..." v-model="selectedNote.new_note" data-required rows="3" class="form-control resize-none"></textarea>
									<div class="d-flex align-items-center mt-2">
										<button class="btn btn-light shadow-none" type="button" @click="selectedNote = null">Cancel</button>
										<button class="ml-auto btn btn-primary" type="submit">Update</button>
									</div>
								</vue-form-validate>

								<template v-if="contact.contactNotes">
									<template v-if="contact.contactNotes.length > 0">
										<template v-for="(contact_note, index) in contact.contactNotes">
											<div :key="contact_note.id" v-if="!selectedNote || selectedNote.id != contact_note.id" class="d-flex rounded bg-light px-3 py-2 mt-2">
												<div>
													<p class="mb-0">{{ contact_note.note }}</p>
													<small class="text-muted">{{ formatDate(contact_note.created_at) }}</small>
												</div>
												<div class="ml-auto mr-n2">
													<div class="dropleft">
														<button class="btn btn-light p-1 line-height-0" data-toggle="dropdown">
															<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
														</button>
														<div class="dropdown-menu dropdown-menu-right">
															<span
																class="dropdown-item cursor-pointer"
																@click="
																	selectedNote = contact_note;
																	selectedNote.new_note = selectedNote.note;
																"
															>
																Edit
															</span>
															<span class="dropdown-item cursor-pointer" @click="deleteContactNote(contact_note, index)">
																Delete
															</span>
														</div>
													</div>
												</div>
											</div>
										</template>
									</template>
									<div v-else class="text-center py-3 text-muted">
										No notes added.
									</div>
								</template>
							</div>
						</div>
					</div>

					<div class="col-md-7 px-2">
						<div class="px-1 h-100">
							<div v-if="recentNotes.length > 0" class="row px-2 mb-4">
								<!-- Recent Booking Notes -->
								<div v-for="recentNote in recentNotes" :key="recentNote.id" class="col-md-4 px-2">
									<div class="px-1 h-100">
										<div class="rounded bg-white shadow-sm p-3 h-100 d-flex flex-column">
											<div class="d-flex">
												<note-icon class="fill-gray ml-n1" width="35" height="35"></note-icon>
												<div class="pl-1">
													<small class="text-gray d-block">Booking date</small>
													<small class="text-muted">{{ formatDate(recentNote.booking.date) }}</small>
												</div>
											</div>
											<p class="mb-0 mt-2 flex-grow-1">{{ recentNote.note }}</p>
										</div>
									</div>
								</div>
							</div>

							<div class="rounded bg-white shadow-sm d-flex flex-column p-3 mb-4">
								<h5 class="font-heading">Upcoming Bookings</h5>
								<div class="flex-grow-1">
									<!-- Upcoming Bookings -->
									<template v-if="contact.upcoming_bookings.length > 0">
										<div v-for="booking in contact.upcoming_bookings" :key="booking.id" class="mt-3">
											<div class="d-flex">
												<div>
													<div class="h6 font-heading mb-0">{{ booking.service.name }}</div>
													<div>
														{{ formatDate(booking.date) }} {{ dayjs(booking.startDate).format('hh:mmA') }} -
														{{
															dayjs(booking.startDate)
																.add(booking.service.duration, 'minute')
																.format('hh:mmA')
														}}
													</div>
												</div>

												<div class="ml-auto">
													<div class="dropleft">
														<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
															<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
														</button>
														<div class="dropdown-menu dropdown-menu-right">
															<span class="dropdown-item cursor-pointer" @click="editBooking(booking)">
																Edit
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</template>

									<div v-else class="py-3 text-center text-gray">No upcoming bookings</div>
								</div>
							</div>

							<div class="rounded bg-white shadow-sm">
								<!-- Bookings -->
								<div class="d-flex mb-3 px-3 pt-3">
									<h5 class="font-heading mb-3">Bookings</h5>
									<div class="ml-auto d-flex align-items-center">
										<div class="d-inline-flex align-items-center">
											<vue-select :options="servicesList" multiple button_class="border-0 bg-light shadow-none" v-model="filterServices" label="Services" placeholder="All" @input="filterBookings"></vue-select>
											<vue-select :options="orders" button_class="ml-2 border-0 bg-light shadow-none" v-model="order" label="Date" placeholder="Order by" @input="filterBookings"></vue-select>
										</div>
									</div>
								</div>
								<div v-if="contact.bookings.data.length > 0" class="border-top">
									<table class="table table-borderless mb-0">
										<thead class="text-secondary">
											<th class="pb-0">Service</th>
											<th class="pb-0">Date</th>
											<th class="pb-0">Starts at</th>
											<th class="pb-0">Ends at</th>
										</thead>
										<tbody class="shadow-none">
											<template v-for="booking in contact.bookings.data">
												<tr :key="booking.id">
													<td class="align-middle">{{ booking.service.name }}</td>
													<td class="align-middle">
														{{ formatDate(booking.date) }}
													</td>
													<td class="align-middle">
														{{ convertTime(booking.start, 'hh:MMA') }}
													</td>
													<td class="align-middle">
														{{ convertTime(booking.end, 'hh:MMA') }}
													</td>
													<td class="align-middle">
														<div class="flex-grow-1 text-right">
															<div class="dropleft">
																<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
																	<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
																</button>
																<div class="dropdown-menu dropdown-menu-right">
																	<span class="dropdown-item cursor-pointer" @click="editBooking(booking)">
																		Edit
																	</span>
																</div>
															</div>
														</div>
													</td>
												</tr>
											</template>
										</tbody>
									</table>
								</div>
								<div v-else class="px-4 mb-4">
									<div class="text-center py-3 text-muted">
										No bookings found.
									</div>
								</div>
							</div>

							<div class="mt-3 text-right">
								<paginate @change="getData" :data="contact.bookings"></paginate>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<edit-booking ref="bookingModal" :booking="selectedBooking" @update="getContact"></edit-booking>

		<modal ref="deleteBookingModal" :close-button="false">
			<template v-if="selectedBooking">
				<h5 class="font-heading text-center">Delete Booking</h5>
				<p class="text-center mt-3">
					Are you sure to delete this booking?
				</p>
				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" @click="$refs['bookingModal'].show()" data-dismiss="modal">
						Cancel
					</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							confirmDeleteBooking(selectedBooking);
							$refs['deleteBookingModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>

		<modal ref="editModal" :close-button="false">
			<h5 class="font-heading mb-3">Edit Contact</h5>
			<vue-form-validate v-if="contact" @submit="update(contact)">
				<fieldset :disabled="!contact.is_pending">
					<div class="form-group">
						<label class="form-label">Email</label>
						<input type="email" class="form-control" v-model="contact.email" data-required />
					</div>

					<div class="form-row form-group">
						<div class="col">
							<label class="form-label">First Name</label>
							<input type="text" class="form-control" v-model="contact.first_name" />
						</div>
						<div class="col">
							<label class="form-label">Last Name</label>
							<input type="text" class="form-control" v-model="contact.last_name" />
						</div>
					</div>
				</fieldset>
				<div class="form-group">
					<strong class="d-block mb-2 font-weight-bold">Available services</strong>
					<div v-for="service in services" :key="service.id" class="d-flex align-items-center mb-2 rounded p-3 bg-light">
						<div>
							<h6 class="font-heading mb-0">{{ service.name }}</h6>
						</div>
						<div class="ml-auto">
							<toggle-switch active-class="bg-primary" :value="contact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleContactServiceBlacklist(service, contact)"></toggle-switch>
						</div>
					</div>
				</div>

				<div class="d-flex mt-4">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">Cancel</button>
					<button class="ml-auto btn btn-primary" type="submit">Update</button>
				</div>
			</vue-form-validate>
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="contact">
				<h5 class="font-heading text-center">Delete Contact</h5>
				<p class="text-center mt-3">
					Are you sure to delete contact
					<strong>{{ contact.contact_user.full_name.trim() || $parent.selectedContact.contact_user.email }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-light shadow-none text-body" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-danger ml-auto" type="button" @click="deleteContactMember(contact)">
						Delete
					</button>
				</div>
			</template>
		</modal>

		<add ref="add" :services="availableServices" @hide="getContact()" :contactID="contact.id"></add>
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
