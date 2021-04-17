<template>
	<div class="h-100" v-if="$root.auth && ready">
		<div v-show="!addContact">
			<div class="content-header border-bottom flex items-center justify-between">
				<div>
					CONTACTS
				</div>
				<div>
					<button type="button" class="mr-3 btn btn-md btn-outline-primary"><span>Import</span></button>
					<button type="button" class="btn btn-md btn-primary" @click="addContact = true"><span>Add contact</span></button>
				</div>
			</div>

			<div class="flex h-full contact-content">
				<div class="w-2/3 pt-8 pb-8 pl-6 pr-16 border-right">
					<div class="flex items-center justify-between mb-3 header">
						<VueSelect :options="contactStatuses" v-model="contactStatus" @input="getData" label="Status"></VueSelect>

						<form @submit.prevent="getData()">
							<input type="text" v-model="query" class="px-4 text-sm font-normal bg-gray-100 border-none rounded-full shadow-none w-80" placeholder="Search by name, surname or e-mail" />
						</form>
					</div>

					<div class="flex items-start justify-between contact-row border-bottom" v-for="contact in contacts.data" :key="contact.id">
						<div class="flex items-start">
							<div class="mr-2">
								<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact_user.profile_image + ')' }">
									<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
									<i v-if="$root.isOnline(contact.contact_user_id)" class="online-status">&nbsp;</i>
								</div>
							</div>
							<div>
								<router-link :to="`/dashboard/contacts/${contact.id}`" class="font-bold text-primary">{{ contact.contact_user.full_name }}</router-link>
								<p class="text-xs text-muted">{{ contact.contact_user.email }}</p>
							</div>
						</div>
						<div class="flex items-center">
							<p class="mr-5 text-xs text-muted">Date added: {{ contact.created_at_format }}</p>
							<span class="px-3 py-1 text-xs font-bold rounded text-muted" :class="[contact.is_pending ? 'bg-yellow-200' : 'bg-gray-200']">{{ contact.is_pending ? 'Pending' : 'Accepted' }}</span>

							<VueDropdown :options="actions" @click="contactAction($event, contact)" class="-mr-2 ml-1">
								<template #button>
									<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
										<CogIcon class="fill-current text-gray-400"></CogIcon>
									</div>
								</template>
							</VueDropdown>
						</div>
					</div>

					<!-- <paginate @change="getData" :data="contacts" class="ml-2"></paginate> -->
				</div>
				<div class="w-1/3 p-6">
					<p class="text-sm text-muted">Contacts information can be upgraded with custom fields. That gives you the option to have specific fields for contacts that match your needs.</p>
					<button type="button" class="btn btn-sm btn-outline-primary mt-6"><span>Manage fields</span></button>
				</div>
			</div>
		</div>

		<div v-if="addContact">
			<div class="content-header border-bottom">
				ADD CONTACT
			</div>
			<vue-form-validate @submit="store" class="p-6">
				<div class="flex">
					<div class="w-5/12">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Contact Details</h2>
						<div class="pr-3">
							<div class="mb-4">
								<label>Email</label>
								<input type="email" v-model="newContact.email" data-required />
							</div>

							<div class="mb-4">
								<label class="form-label">First Name (Optional)</label>
								<input type="text" v-model="newContact.first_name" />
							</div>
							<div class="mb-4">
								<label class="form-label">Last Name (Optional)</label>
								<input type="text" v-model="newContact.last_name" />
							</div>

							<div>
								<vue-checkbox v-model="newContact.sendToEmail" label="Send invitation link to email"></vue-checkbox>
								<div v-if="newContact.sendToEmail" class="mt-4">
									<label>Invitation Message (Optional)</label>
									<textarea rows="3" class="resize-none" :placeholder="defaultEmailMessage" v-model="newContact.invite_message"></textarea>
								</div>
							</div>
						</div>
					</div>

					<div class="w-4/12 pl-6">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Available Services</h2>
						<div v-for="service in services" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
							<h6 class="font-semibold text-primary">{{ service.name }}</h6>
							<div class="mt-2 flex items-center">
								<span class="text-xs mr-2">{{ newContact.blacklisted_services.find(x => x == service.id) ? 'Inactive' : 'Active' }}</span>
								<toggle-switch :value="newContact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleServiceBlacklist(service)"></toggle-switch>
							</div>
						</div>
						<div class="pl-3">
							<div class="mb-4" v-if="($root.auth.custom_fields || []).length > 0">
								<strong class="d-block mb-2">Fields (Optional)</strong>
								<div class="form-row">
									<div class="col-6 mb-2" v-for="field in $root.auth.custom_fields" :key="field">
										<label class="form-label">{{ field }}</label>
										<input type="text" class="form-control" v-model="newContact.custom_fields[field]" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="d-flex">
					<button class="btn btn-outline-primary btn-sm" type="button" @click="addContact = false"><span>Cancel</span></button>
					<button class="btn-sm btn btn-primary" type="submit"><span>Add</span></button>
				</div>
			</vue-form-validate>
		</div>

		<Modal ref="editModal" :close-button="false">
			<h4 class="font-serif uppercase font-semibold mb-4">EDIT CONTACT</h4>
			<vue-form-validate v-if="clonedContact" @submit="update(clonedContact)">
				<fieldset :disabled="!clonedContact.is_pending">
					<div class="mb-4">
						<label>Email</label>
						<input type="email" v-model="clonedContact.email" data-required />
					</div>

					<div class="grid grid-cols-2 mb-6 gap-x-6">
						<div class="col">
							<label class="form-label">First Name</label>
							<input type="text" class="form-control" v-model="clonedContact.first_name" />
						</div>
						<div class="col">
							<label class="form-label">Last Name</label>
							<input type="text" class="form-control" v-model="clonedContact.last_name" />
						</div>
					</div>
				</fieldset>
				<div class="mb-4">
					<strong class="font-serif uppercase font-semibold mb-2 block text-xs">Available services</strong>
					<div v-for="service in services" :key="service.id" class="flex items-center mb-2 rounded-xl p-3 bg-gray-100">
						<div>
							<h6 class="font-semibold">{{ service.name }}</h6>
						</div>
						<div class="ml-auto">
							<toggle-switch active-class="bg-primary" :value="clonedContact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleContactServiceBlacklist(service, clonedContact)"></toggle-switch>
						</div>
					</div>
				</div>

				<div class="flex justify-between mt-4">
					<button class="btn" type="button" @click="$refs.editModal.hide()"><span>Cancel</span></button>
					<button class="btn btn-primary" type="submit"><span>Update</span></button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="deleteModal">
			<template v-if="selectedContact">
				<h4 class="font-serif uppercase font-semibold mb-4">DELETE CONTACT</h4>
				<p class="mt-3">
					Are you sure to delete contact
					<strong>{{ selectedContact.contact_user.full_name.trim() || selectedContact.contact_user.email }}</strong>
					?
					<br />
					<span class="text-red-600">This action cannot be undone</span>
				</p>
				<div class="flex justify-between mt-4">
					<button class="btn btn-md" type="button" @click="$refs.deleteModal.hide()"><span>Cancel</span></button>
					<button
						class="btn btn-md btn-red"
						type="button"
						@click="
							deleteContact(selectedContact);
							$refs.deleteModal.hide();
						"
					>
						<span>Delete</span>
					</button>
				</div>
			</template>
		</Modal>

		<div class="hidden">
			<div class="d-flex h-100">
				<div class="h-100 flex-grow-1">
					<div class="d-flex flex-column h-100">
						<div class="border-bottom bg-white p-3 d-flex align-items-center">
							<h5 class="font-heading mb-0">Contacts</h5>
							<div class="ml-auto d-flex align-items-center">
								<button :data-intro="$root.intros.contacts_index.steps[0]" data-step="1" class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="$refs['addModal'].show()">
									<plus-icon class="btn-icon"></plus-icon>
									Add Contact
								</button>
								<button :data-intro="$root.intros.contacts_index.steps[1]" data-step="2" type="button" class="btn btn-light ml-1 shadow-none" @click="$refs['fieldsModal'].show()">Manage Fields</button>
							</div>
						</div>

						<div class="rounded mt-2 overflow-auto h-100 flex-grow-1 d-flex flex-column">
							<div v-if="!hasContacts && contacts.data.length == 0" class="text-secondary text-center p-4 position-absolute-center">
								<div class="h6 mb-0 font-weight-normal">You don't have any contacts yet.</div>
							</div>

							<div class="overflow-auto flex-grow-1 pb-4 px-4 pt-3 h-100" v-else>
								<div class="d-flex align-items-center">
									<form class="form-inline" @submit.prevent="getData">
										<input type="text" class="form-control" v-model="query" placeholder="Search..." />
									</form>
									<div class="ml-auto d-flex align-items-center">
										<vue-select :data-intro="$root.intros.contacts_index.steps[2]" data-step="3" :options="contactStatuses" button_class="border-0 bg-white shadow-sm" v-model="contactStatus" label="Status" @input="getData"></vue-select>
										<paginate @change="getData" :data="contacts" class="ml-2"></paginate>
									</div>
								</div>
								<div v-if="contacts.data.length == 0" class="text-gray position-absolute-center">
									No contacts found with your search query.
								</div>
								<table v-else class="table table-borderless mb-0 mt-2">
									<thead>
										<tr>
											<th>Name</th>
											<th>Status</th>
											<th>Date Added</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(contact, index) in contacts.data" :key="contact.id" class="contact-data">
											<td class="align-middle">
												<div class="d-flex align-items-center">
													<div class="user-profile-image user-profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact_user.profile_image + ')' }">
														<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
														<i v-if="$root.isOnline(contact.contact_user_id)" class="online-status bg-success">&nbsp;</i>
													</div>
													<div class="ml-2 overflow-hidden flex-1">
														<h6 class="font-heading mb-0 text-ellipsis">{{ contact.contact_user.full_name }}</h6>
														<small class="d-block text-muted">{{ contact.contact_user.email }}</small>
													</div>
												</div>
											</td>
											<td class="align-middle">
												<div class="flex-grow-1">
													<div class="badge badge-icon d-inline-flex align-items-center" :class="[contact.is_pending ? 'bg-warning-light text-warning' : 'bg-primary-light text-primary']">
														<clock-icon v-if="contact.is_pending" height="12" width="12"></clock-icon>
														<checkmark-circle-icon v-else height="12" width="12"></checkmark-circle-icon>
														&nbsp;{{ contact.is_pending ? 'Pending' : 'Accepted' }}
													</div>
												</div>
											</td>
											<td class="align-middle">
												<div class="flex-grow-1 text-muted">{{ contact.created_at_format }}</div>
											</td>
											<td class="align-middle">
												<div class="flex-grow-1 text-right d-flex align-items-center justify-content-end">
													<button class="btn btn-sm btn-light shadow-none mr-2" @click="goToContact(contact)">
														Details
													</button>
													<div class="dropleft">
														<button :data-intro="index == 0 ? $root.intros.contacts_index.steps[3] : null" :data-step="index == 0 ? 4 : null" class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
															<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
														</button>
														<div class="dropdown-menu dropdown-menu-right">
															<span v-if="!contact.is_pending" class="dropdown-item cursor-pointer" @click="goToConversation(contact)">
																Send Message
															</span>
															<span
																v-if="contact.is_pending"
																class="dropdown-item cursor-pointer"
																@click="
																	selectedContact = contact;
																	$refs['resendModal'].show();
																"
															>
																Resend invitation
															</span>
															<span
																class="dropdown-item cursor-pointer"
																@click="
																	clonedContact = Object.assign({}, contact);
																	$refs['editModal'].show();
																"
															>
																Edit
															</span>
															<span
																class="dropdown-item cursor-pointer"
																@click="
																	selectedContact = contact;
																	$refs['deleteModal'].show();
																"
															>
																Delete
															</span>
														</div>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<template>
				<modal ref="fieldsModal">
					<h5 class="font-heading mb-3">Manage Fields</h5>
					<div v-for="(custom_field, index) in userCustomFields" :key="index" class="d-flex align-items-center custom-field position-relative">
						<div class="mb-1 d-flex align-items-center w-100">
							<input type="text" :value="custom_field" class="form-control flex-grow-1" />
							<trash-icon width="18" height="18" class="cursor-pointer ml-1" @click.native="userCustomFields.splice(index, 1)"></trash-icon>
						</div>
					</div>
					<div class="mb-1 d-flex align-items-center w-100">
						<input type="text" v-model="newField" class="form-control flex-grow-1" placeholder="New Field" />
						<trash-icon width="18" height="18" class="ml-1 opacity-0"></trash-icon>
					</div>
					<div class="d-flex mt-3">
						<button
							class="btn btn-light shadow-none"
							type="button"
							data-dismiss="modal"
							@click="
								newField = '';
								userCustomFields = JSON.parse(JSON.stringify(originalUserCustomFields));
							"
						>
							Cancel
						</button>
						<button type="button" class="ml-auto btn btn-primary" :disabled="addField" @click="updateUserCustomFields()">Save</button>
					</div>
				</modal>

				<modal ref="addModal" size="modal-lg" :close-button="false">
					<h5 class="font-heading mb-3">Add Contact</h5>
				</modal>

				<modal ref="resendModal" :close-button="false">
					<template v-if="selectedContact">
						<h5 class="font-heading text-center">Resend Invitation</h5>
						<p class="text-center mt-3">
							Are you sure to resend the invitation email to contact
							<strong>{{ selectedContact.contact_user.full_name.trim() || selectedContact.contact_user.email }}</strong>
							?
							<br />
						</p>
						<div class="d-flex justify-content-end">
							<button class="btn btn-light shadow-none text-body" type="button" data-dismiss="modal">Cancel</button>
							<vue-button button_class="btn btn-primary ml-auto" :loading="resendLoading" type="button" @click="resendEmail(selectedContact)">Resend Invitation</vue-button>
						</div>
					</template>
				</modal>
			</template>
		</div>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
