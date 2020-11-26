<template>
	<div v-if="contact" class="w-100 h-100 overflow-hidden">
		<div class="overflow-auto h-100 pb-4">
			<div class="p-4 d-flex align-items-center">
				<button class="btn p-1 btn-white badge-pill shadow-sm" type="button" @click="$router.push('/dashboard/contacts')">
					<arrow-left-icon width="30" height="30"></arrow-left-icon>
				</button>

				<div class="ml-auto d-flex align-items-center">
					<button class="btn btn-white shadow-sm mr-2" type="button" @click="$refs['addBookingModal'].show()">
						Add Booking
					</button>
					<div class="dropdown">
						<button class="btn p-2 btn-white badge-pill shadow-sm" data-toggle="dropdown" data-offset="-130, 10">
							<more-icon width="20" height="20" transform="scale(0.75)"></more-icon>
						</button>
						<div class="dropdown-menu">
							<span class="dropdown-item cursor-pointer" @click="$refs['editModal'].show()">
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
									<div v-if="addField || (contact.custom_fields || []).length == 0" class="d-flex align-items-center">
										<button class="btn p-0 d-flex align-items-center mr-1" disabled type="button">
											<move-icon width="10" height="10" transform="scale(1.5)" class="fill-gray-400"></move-icon>
										</button>
										<vue-select v-model="new_field.name" :options="customFields" button_class="form-control-sm mr-1" :searchable="true" :suggestion="true" container_class="w-50" :caret="false" placeholder="Label"></vue-select>
										<!-- <input type="text" placeholder="Label" @blur="addNewField" v-model="new_field.name" class="form-control form-control-sm w-50 mr-1"> -->
										<input type="text" placeholder="Value" v-model="new_field.value" class="form-control form-control-sm w-50 ml-2" />
										<trash-icon width="18" height="18" class="ml-1 opacity-0"></trash-icon>
									</div>
									<div class="d-flex align-items-center mt-4">
										<button type="button" class="btn btn-sm btn-light shadow-none" @click="editFields = false">Close</button>
										<button v-if="addField || (contact.custom_fields || []).length == 0" class="ml-auto btn btn-sm btn-primary" type="button" @click="addNewField">Save Field</button>
										<button v-else type="button" class="ml-auto btn btn-sm btn-primary" @click="addField = true">Add Field</button>
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
								<div class="d-flex">
									<h5 class="font-heading mb-0">Notes</h5>
									<button
										class="ml-auto btn btn-light p-1 badge-pill line-height-0 shadow-none"
										type="button"
										@click="
											addingNote = true;
											selectedNote = null;
										"
									>
										<plus-icon width="18" height="18" transform="scale(1.4)"></plus-icon>
									</button>
								</div>

								<vue-form-validate v-if="addingNote && !selectedNote" class="mt-2 mb-3" @submit="confirmAddNote()">
									<textarea placeholder="Write note..." v-model="newNote" data-required rows="3" class="form-control resize-none"></textarea>
									<div class="d-flex align-items-center mt-2">
										<button class="btn btn-light shadow-none" type="button" @click="addingNote = false">Cancel</button>
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

								<template v-for="(contact_note, index) in contact.contact_notes">
									<div :key="contact_note.id" v-if="!selectedNote || selectedNote.id != contact_note.id" class="d-flex align-items-center rounded bg-light px-3 py-2 mt-2">
										{{ contact_note.note }}

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

							<div class="rounded bg-white shadow-sm p-3">
								<!-- Bookings -->
								<div class="d-flex mb-2">
									<h5 class="font-heading mb-3">Bookings</h5>
									<div class="ml-auto d-flex align-items-center">
										<div class="d-inline-flex align-items-center">
											<vue-select :options="servicesList" multiple button_class="border-0 bg-light shadow-none" v-model="filterServices" label="Services" placeholder="All" @input="filterByServices"></vue-select>
										</div>
									</div>
								</div>
								<div v-if="contact.bookings.data.length > 0">
									<table class="table table-borderless mb-0">
										<tbody class=" shadow-none">
											<template v-for="booking in contact.bookings.data">
												<tr :key="booking.id">
													<td class="align-middle pl-0">{{ booking.service.name }}</td>
													<td class="align-middle">
														{{ formatDate(booking.date) }}
													</td>
													<td class="align-middle">
														{{ convertTime(booking.start, 'hh:MMA') }}
													</td>
													<td class="align-middle pr-0">
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

		<modal ref="addBookingModal" :close-button="false" :scrollable="false">
			<vue-form-validate>
				<h5 class="font-heading">Add Booking</h5>
				<div class="form-group">
					<label class="form-label">Booking Type</label>
					<vue-select :options="servicesList" required button_class="form-control" v-model="newBooking.service_id" placeholder="Select booking type"></vue-select>
				</div>
				<div class="form-group">
					<label class="form-label">Coach</label>
					<vue-select :options="servicesList" required button_class="form-control" v-model="newBooking.coach_id" placeholder="Select coach"></vue-select>
				</div>
				<div class="form-group">
					<label class="form-label">Timeslot</label>
				</div>
				<div class="d-flex justify-content-between mt-3">
					<button type="button" class="btn btn-light shadow-none" data-dismiss="modal" :disabled="bookingModalLoading">Cancel</button>
					<vue-button type="submit" button_class="btn btn-primary shadow-sm border" :loading="bookingModalLoading">Add</vue-button>
				</div>
			</vue-form-validate>
		</modal>

		<modal ref="bookingModal" :close-button="(selectedBooking || {}).isPrevious" :scrollable="false">
			<div v-if="selectedBooking" class="text-center">
				<div class="profile-image profile-image-md d-inline-block mb-2" :style="{ 'background-image': `url(${contact.contact_user.profile_image})` }">
					<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
				</div>
				<h4 class="font-heading mb-4">
					{{ contact.contact_user.full_name }}
				</h4>

				<div class="py-3">
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-50">Service</div>
						<div class="h6 font-heading mb-0">{{ selectedBooking.service.name }}</div>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-50">Coach</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ selectedService.user.full_name }}</div>
						<vue-select button_class="border-0 shadow-none btn btn-light bg-light" v-else v-model="selectedBooking.service_id" :options="serviceMembers"></vue-select>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-50">Date</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ formatDate(selectedBooking.date) }}</div>
						<v-date-picker v-else :min-date="new Date()" :popover="{ placement: 'right', visibility: 'click' }" v-model="selectedBooking.date" @input="getSelectedBookingNewTimeslots">
							<template v-slot="{ inputValue, inputEvents }">
								<button type="button" class="btn btn-light shadow-none" v-on="inputEvents">{{ formatDate(selectedBooking.date) }}</button>
							</template>
						</v-date-picker>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-50">Starts at</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ dayjs(selectedBooking.start).format('hh:mmA') }}</div>
						<div v-else class="dropright">
							<button class="btn btn-light shadow-none" data-toggle="dropdown">
								{{ dayjs(selectedBooking.start).format('hh:mmA') }}
							</button>
							<div class="dropdown-menu timeslots-dropdown-menu overflow-y-auto">
								<div class="text-center text-gray small px-2 py-1 text-nowrap" v-if="timeslots.length == 0">No available timeslots</div>
								<template v-else v-for="(timeslot, index) in timeslots">
									<button type="button" class="btn btn-primary btn-block mb-1" :key="index" xv-if="timeslot.is_available" @click="selectedBooking.start = dayjs(`${dayjs(selectedBooking.date).format('Y-m-d')} ${timeslot.time}`).toDate()">
										{{ timeslot.label }}
									</button>
								</template>
							</div>
						</div>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-50">Ends at</div>
						<div class="h6 font-heading mb-0">
							{{
								dayjs(selectedBooking.start)
									.add(selectedBooking.service.duration, 'minute')
									.format('hh:mmA')
							}}
						</div>
					</div>
					<div class="d-flex align-items-center text-left">
						<div class="font-weight-normal text-secondary w-50">Duration</div>
						<div class="h6 font-heading mb-0">{{ selectedBooking.service.duration }} minutes</div>
					</div>
					<div class="text-left mt-3">
						<div class="font-weight-normal text-secondary w-50 mb-2">Notes</div>
						<textarea rows="4" class="form-control resize-none" v-model="selectedBooking.booking_note.note" placeholder="Write notes.."></textarea>
					</div>
					<div v-if="!selectedBooking.isPrevious" class="text-left">
						<div class="mt-3" v-if="Object.keys(selectedBooking.zoom_link).length > 0">
							<div class="d-flex align-items-center text-left">
								<div class="font-weight-normal text-secondary w-50">Zoom Link</div>
								<a target="_blank" :href="selectedBooking.zoom_link.join_url" class="d-flex align-items-center">
									Go to Zoom meeting
									<shortcut-icon width="16" height="16" class="ml-1 fill-blue"></shortcut-icon>
								</a>
							</div>
						</div>
						<vue-button v-else-if="$root.auth.zoom_token" type="button" :loading="createZoomLoading" button_class="btn btn-light shadow-none mt-3" @click="createZoomLink(selectedBooking)">
							<div class="d-flex align-items-center">
								<zoom-icon width="20" height="20" class="mr-2"></zoom-icon>
								Create Zoom link
							</div>
						</vue-button>
					</div>
				</div>

				<div v-if="!selectedBooking.isPrevious" class="d-flex justify-content-between mt-3">
					<div class="d-flex align-items-center">
						<button type="button" class="btn btn-light shadow-none" data-dismiss="modal" :disabled="bookingModalLoading">Cancel</button>
						<button type="button" class="btn btn-link text-danger" data-dismiss="modal" @click="$refs['deleteBookingModal'].show()" :disabled="bookingModalLoading">Delete</button>
					</div>
					<vue-button type="button" button_class="btn btn-primary shadow-sm border" :loading="bookingModalLoading" @click.native="updateSelectedBooking(selectedBooking)">Update</vue-button>
				</div>
			</div>
		</modal>

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
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
