<template>
	<div class="h-100" v-if="$root.auth && ready">
		<div class="d-flex h-100">
			<div class="h-100 flex-grow-1">
				<div class="d-flex flex-column h-100">
					<div class="border-bottom bg-white p-3 d-flex align-items-center">
						<h5 class="font-heading mb-0">Contacts</h5>
						<div v-if="$root.auth.role.role == 'client'" class="ml-auto d-flex align-items-center">
							<button :data-intro="$root.intros.contacts_index.steps[0]" data-step="1" class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="$refs['addModal'].show()">
								<plus-icon class="btn-icon"></plus-icon>
								Add Contact
							</button>
							<button :data-intro="$root.intros.contacts_index.steps[1]" data-step="2" type="button" class="btn btn-light ml-1 shadow-none" @click="$refs['fieldsModal'].show()">Manage Fields</button>
						</div>
						<div v-else class="py-3">
							<div class="py-1"></div>
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
															v-if="$root.auth.role.role == 'client'"
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

		<template v-if="$root.auth.role.role == 'client'">
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

			<modal ref="editModal" :close-button="false">
				<h5 class="font-heading mb-3">Edit Contact</h5>
				<vue-form-validate v-if="clonedContact" @submit="update(clonedContact)">
					<fieldset :disabled="!clonedContact.is_pending">
						<div class="form-group">
							<label class="form-label">Email</label>
							<input type="email" class="form-control" v-model="clonedContact.email" data-required />
						</div>

						<div class="form-row form-group">
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
					<div class="form-group">
						<strong class="d-block mb-2 font-weight-bold">Available services</strong>
						<div v-for="service in services" :key="service.id" class="d-flex align-items-center mb-2 rounded p-3 bg-light">
							<div>
								<h6 class="font-heading mb-0">{{ service.name }}</h6>
							</div>
							<div class="ml-auto">
								<toggle-switch active-class="bg-primary" :value="clonedContact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleContactServiceBlacklist(service, clonedContact)"></toggle-switch>
							</div>
						</div>
					</div>

					<div class="d-flex mt-4">
						<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">Cancel</button>
						<button class="ml-auto btn btn-primary" type="submit">Update</button>
					</div>
				</vue-form-validate>
			</modal>

			<modal ref="addModal" size="modal-lg" :close-button="false">
				<h5 class="font-heading mb-3">Add Contact</h5>
				<vue-form-validate @submit="store">
					<div class="row mx-0 mb-2">
						<div class="col-md-6 px-0">
							<div class="pr-3">
								<div class="form-group">
									<label class="form-label">Email</label>
									<input type="email" class="form-control" v-model="newContact.email" data-required />
								</div>

								<div class="form-row form-group">
									<div class="col">
										<label class="form-label">First Name (Optional)</label>
										<input type="text" class="form-control" v-model="newContact.first_name" />
									</div>
									<div class="col">
										<label class="form-label">Last Name (Optional)</label>
										<input type="text" class="form-control" v-model="newContact.last_name" />
									</div>
								</div>
								<div class="form-group">
									<strong class="d-block mb-2 font-weight-bold">Available services</strong>
									<div v-for="service in services" :key="service.id" class="d-flex align-items-center mb-2 rounded p-3 bg-light">
										<div>
											<h6 class="font-heading mb-0">{{ service.name }}</h6>
										</div>
										<div class="ml-auto">
											<toggle-switch active-class="bg-primary" :value="newContact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleServiceBlacklist(service)"></toggle-switch>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-6 border-left border-gray-200 px-0">
							<div class="pl-3">
								<div class="form-group">
									<strong class="d-block mb-2">Invitation Message (Optional)</strong>
									<textarea cols="10" class="form-control resize-none mb-2" :placeholder="defaultEmailMessage" v-model="newContact.invite_message"></textarea>
									<vue-checkbox v-model="newContact.sendToEmail" label="Send invitation link to email"></vue-checkbox>
								</div>

								<div class="form-group" v-if="($root.auth.custom_fields || []).length > 0">
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
						<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">Cancel</button>
						<button class="ml-auto btn btn-primary" type="submit">Add</button>
					</div>
				</vue-form-validate>
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

		<modal ref="deleteModal" :close-button="false">
			<template v-if="selectedContact">
				<h5 class="font-heading text-center">Delete Contact</h5>
				<p class="text-center mt-3">
					Are you sure to delete contact
					<strong>{{ selectedContact.contact_user.full_name.trim() || selectedContact.contact_user.email }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-light shadow-none text-body" type="button" data-dismiss="modal">Cancel</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							deleteContact(selectedContact);
							$refs['deleteModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
