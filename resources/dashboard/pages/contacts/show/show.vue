<template>
	<div v-if="contact" class="min-h-screen flex flex-col">
		<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white md:z-0 z-10">
			<div class="flex items-center">
				<router-link to="/dashboard/contacts" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
				CONTACT DETAILS
			</div>
			<div>
				<button type="button" class="btn btn-md btn-primary flex items-center" @click="createNewEvent">
					<span class="hidden md:block">Add</span>
					<span class="block md:hidden">+</span>
					<span class="ml-2">Booking</span>
				</button>
			</div>
		</div>
		<div class="h-20 lg:hidden block" />

		<div class="flex flex-col lg:flex-row items-stretch h-full contact-content flex-grow">
			<div class="w-full lg:w-5/12 min-h-full border-r-0 lg:border-r border-b lg:border-b-0">
				<div class="p-8 contact-detail bg-secondary-light">
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
						</div>
					</div>
					<div class="flex justify-end">
						<div class="w-full lg:w-4/5 flex items-end justify-between mt-9">
							<div>
								<span class="px-3 py-1 text-xs font-bold rounded text-muted" :class="[contact.is_pending ? 'bg-yellow-200' : 'bg-gray-200']">{{ contact.is_pending ? 'Pending' : 'Accepted' }}</span>
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
				<div class="px-6 pb-6 contact-files">
					<ul class="flex p-0 mb-4 tabs">
						<li :class="{ active: activeTab == 'notes' }"><span class="cursor-pointer" @click="activeTab = 'notes'">Notes</span></li>
						<li :class="{ active: activeTab == 'fields' }"><span class="cursor-pointer" @click="activeTab = 'fields'">Fields</span></li>
						<li :class="{ active: activeTab == 'packages' }"><span class="cursor-pointer" @click="activeTab = 'packages'">Packages</span></li>
						<li :class="{ active: activeTab == 'tags' }"><span class="cursor-pointer" @click="activeTab = 'tags'">Tags</span></li>
					</ul>

					<!-- Notes -->
					<template v-if="activeTab == 'notes'">
						<div class="flex items-center justify-between mb-6 filters">
							<button type="button" class="btn btn-outline-primary btn-sm" @click="addingNote = true"><span>Add new</span></button>
							<div class="flex">
								<vue-select v-if="notes.length > 0" :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="notesOrder" label="Date" placeholder="Order by" @input="getContactNotes"></vue-select>
							</div>
						</div>

						<!-- Add Note -->
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

						<!-- Edit Note -->
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

					<!-- Fields -->
					<template v-else-if="activeTab == 'fields'">
						<!-- Edit Fields -->
						<template v-if="editFields">
							<div class="flex mb-2 text-muted mt-3">
								<span class="w-1/2 ml-3">Label</span>
								<span class="w-1/2 -ml-1">Value</span>
							</div>
							<draggable handle=".handle" :list="contact.custom_fields">
								<div v-for="(custom_field, index) in contact.custom_fields" :key="custom_field.id" class="mb-2 flex items-center">
									<button class="flex items-center handle cursor-move" type="button">
										<move-icon width="10" height="10" transform="scale(1.5)"></move-icon>
									</button>
									<input type="text" placeholder="Label" @blur="updateContact(contact)" v-model="custom_field.name" class="w-1/2 mr-1 ml-1" />
									<input type="text" placeholder="Value" @blur="updateContact(contact)" v-model="custom_field.value" class="w-1/2 ml-1" />
									<trash-icon
										width="18"
										height="18"
										class="cursor-pointer ml-1 fill-current text-gray-400"
										@click.native="
											contact.custom_fields.splice(index, 1);
											updateContact(contact);
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

						<!-- List custom fields -->
						<div v-else>
							<div v-for="(custom_field, index) in contact.custom_fields" :key="index" class="flex items-center">
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

					<!-- Packages -->
					<template v-if="activeTab == 'packages'">
						<button v-if="!addingPackage" type="button" class="btn btn-outline-primary btn-sm" @click="addingPackage = true"><span>Add Package</span></button>
						<vue-form-validate @submit="addPackageService" v-else class="mb-6">
							<div class="w-1/2">
								<VueSelect :options="packagesOptions" dropPosition="w-full" v-model="selectedPackage" placeholder="Select Package" required></VueSelect>
							</div>

							<div class="flex items-center justify-between">
								<button
									type="button"
									class="btn btn-outline-primary btn-sm mt-2"
									@click="
										addingPackage = false;
										selectedPackage = null;
										selectedPackageService = null;
									"
								>
									<span>Cancel</span>
								</button>
								<button type="submit" class="btn btn-primary btn-sm mt-2"><span>Add</span></button>
							</div>
						</vue-form-validate>

						<div>
							<div class="rounded-xl p-3 bg-gray-50 my-2" v-for="(contactPackage, contactPackageIndex) in contact.contact_packages" :key="contactPackage.id">
								<div class="flex justify-between">
									<div>
										<div class="text-xs text-muted">{{ contactPackage.package.name }}</div>
										<div class="font-semibold text-sm">{{ contactPackage.service.name }}</div>
									</div>
									<div>
										<trash-icon width="15" height="15" class="cursor-pointer ml-1 fill-current text-gray-400" @click.native="deleteContactPackage(contactPackage, contactPackageIndex)"></trash-icon>
									</div>
								</div>

								<div class="py-2 flex justify-between items-center" :class="{ 'border-top': contactPackageBookingIndex > 0 }" v-for="(contactPackageBooking, contactPackageBookingIndex) in contactPackage.bookings" :key="contactPackageBooking.id">
									<div class="text-sm">{{ contactPackage.service.duration }}min</div>
									<div>
										<button type="button" class="btn btn-sm btn-primary disabled"><span>Booked</span></button>
									</div>
								</div>

								<template v-for="(block, index) in new Array(parseInt(contactPackage.service.bookings))">
									<div v-if="index >= contactPackage.bookings.length" class="block-container py-2 flex justify-between items-center" :class="{ 'border-top': index > 0, completed: (contactPackage.service.completed || []).find(x => x == index) >= -1 }" :key="index">
										<div class="text-sm">{{ contactPackage.service.duration }}min</div>
										<div class="flex items-center">
											<button type="button" class="btn btn-sm btn-outline-primary mr-2" @click="bookPackage(contactPackage, contactPackageIndex)">
												<span>{{ (contactPackage.service.completed || []).find(x => x == index) >= -1 ? 'Completed' : 'Book' }}</span>
											</button>
											<VueCheckbox @input="toggleBlockStatus($event, index, contactPackage)" :value="(contactPackage.service.completed || []).find(x => x == index) >= -1 ? true : false"></VueCheckbox>
										</div></div
								></template>
							</div>
						</div>
					</template>

					<div v-if="activeTab == 'tags'">
						<label>Tags</label>
						<multiselect v-model="contact.tags" :options="tagOptions" :showLabels="false" :taggable="true" placeholder="" multiple @tag="addTag" @remove="removeTag"></multiselect>
					</div>
				</div>
			</div>
			<div class="w-full lg:w-7/12 p-8">
				<div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 filters">
					<h5 class="font-serif text-sm font-bold tracking-tighter uppercase">Bookings</h5>
					<div class="flex-grow flex items-center justify-end">
						<vue-select :options="servicesList" button_class="mr-2 border-0 bg-light shadow-none" v-model="selectedService" label="Service" placeholder="All" @input="filterBookings"></vue-select>
						<div class="ml-2">
							<vue-select :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="order" label="Date" @input="filterBookings"></vue-select>
						</div>
					</div>
				</div>

				<div class="py-4 flex items-center justify-between border-bottom" v-for="booking in contact.bookings.data" :key="booking.id">
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

				<Paginate v-if="contact.bookings.data.length > 0" :data="contact.bookings" @change="p => (page = p)" class="mt-6"></Paginate>
			</div>
		</div>

		<Booking class="contact-booking" :contact="contact" :service="packageService" @store="newBookingStored" :newEvent="newEvent" :booking="selectedBooking" @update="bookingUpdated" @close="selectedBooking = null" @delete="bookingDeleted"></Booking>

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
					<button class="btn btn-danger ml-auto" type="button" @click="deleteContactMember(contact)">Delete</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
