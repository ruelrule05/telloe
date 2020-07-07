<template>
	<div class="h-100 py-4" v-if="ready">
		<div class="row h-100">
			<div class="col-md-9 h-100">
				<div class="d-flex flex-column h-100">
					<div class="d-flex align-items-center px-4">
						<h5 class="font-heading">Manage Contacts</h5>
						<button class="btn btn-primary ml-auto d-flex align-items-center" @click="$refs['addModal'].show()"><plus-icon height="13" width="13" transform="scale(1.6)" fill="white" class="mr-1"></plus-icon>Add Contact</button>
					</div>

					<div class="rounded mt-3 overflow-auto h-100 flex-grow-1 d-flex flex-column">
						<div v-if="contacts.length == 0" class="text-gray text-center p-4">
							<div class="h6 mb-3">You don't have any contacts yet.</div>
							<button class="btn btn-primary" @click="$refs['addModal'].show()">Add Contact</button>
						</div>

						<template v-else>
							<div class="px-4">
								<div class="d-flex py-2 px-3 text-muted">
									<div class="flex-grow-1 ml-n3 mr-3 w-35">Name</div>
									<div class="flex-grow-1 w-35">Status</div>
									<div class="flex-grow-1 w-15">Date Added</div>
									<div class="flex-grow-1 w-15 text-right"></div>
								</div>
							</div>
							
							<div class="overflow-auto px-4 pt-1">
								<div v-for="contact in contacts" class="border-top p-3 bg-white rounded shadow-sm mb-3">
									<div class="d-flex align-items-center flex-nowrap">
										<div class="d-flex align-items-center w-35">
					                        <div class="user-profile-image user-profile-image-sm" :style="{backgroundImage: 'url('+contact.contact_user.profile_image+')'}">
					                                <span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
					                        </div>
					                        <div class="ml-2 overflow-hidden flex-1">
					                            <h6 class="font-heading mb-0 text-ellipsis">{{ contact.contact_user.full_name }}</h6>
					                            <small class="d-block text-muted">{{ contact.contact_user.email }}</small>
					                        </div>
					                    </div>
					                    <div class="flex-grow-1 w-35">
					                    	<div class="badge badge-icon d-inline-flex align-items-center" :class="[contact.is_pending ? 'bg-warning-light text-warning' : 'bg-primary-light text-primary']">
					                    		<clock-icon v-if="contact.is_pending" height="12" width="12"></clock-icon>
					                    		<checkmark-circle-icon v-else height="12" width="12" ></checkmark-circle-icon>
					                    		&nbsp;{{ contact.is_pending ? 'Pending' : 'Accepted' }}
					                    	</div>
					                    </div>
					                    <div class="flex-grow-1 w-15 text-muted">{{ contact.created_at_format }}</div>
					                    <div class="flex-grow-1 w-15 text-right">
					                    	<div class="dropleft">
					                    		<button class="btn btn-white border p-1 line-height-0" data-toggle="dropdown">
													<more-h-icon width="20" height="20"></more-h-icon>
					                    		</button>
												<div class="dropdown-menu dropdown-menu-right">
												    <span class="dropdown-item cursor-pointer" :class="{'disabled': !hasConversation(contact)}" @click="goToConversation(contact)">Manage</span>
												    <span class="dropdown-item cursor-pointer" @click="selectedContact = contact; $refs['deleteModal'].show()">Delete</span>
												</div>
					                    	</div>
					                    </div>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
			</div>

			<div class="col-md-3">
				<div class="pr-4">
					<div class="shadow-sm rounded bg-white p-3 h-100">
						<div class="dropdown">
		                    <label class="text-gray mb-0 d-block mb-1" ref="customFieldsLabel">Fields</label>
		                    <button class="btn btn-sm btn-light border d-flex align-items-center" data-toggle="dropdown"><plus-icon height="10" width="10" transform="scale(2)" class="mr-1"></plus-icon> Add Field</button>
		                    <div class="dropdown-menu w-100 p-2 bg-white mt-2" @click.stop>
		                        <vue-form-validate @submit="addCustomField()">
	                                <div class="form-group mb-0">
	                                    <label class="form-label">Field name</label>
	                                    <input type="text" class="form-control form-control-sm shadow-none" v-model="newCustomField" placeholder="Field name" data-required>
	                                </div>
	                                <div class="d-flex justify-content-end align-items-center mt-2">
	                                    <button type="button" class="btn btn-sm btn-link text-body pl-0" @click="resetCustomField()">Cancel</button>
	                                    <button type="submit" class="btn btn-sm btn-primary">Add</button>
	                                </div>
		                        </vue-form-validate>
		                    </div>
						</div>
		                <div v-for="(custom_field, index) in $root.auth.custom_fields" class="d-flex align-items-center my-2 custom-field position-relative">
		                    <div class="overflow-hidden">
		                        <div class="text-ellipsis">{{ custom_field }}</div>
		                    </div>
		                    <div class="ml-auto position-static d-flex align-items-center pl-1 dropdown">
		                        <button type="button" class="btn btn-light btn-sm p-1 badge-pill line-height-0 edit-custom-field" data-toggle="dropdown" data-offset="-205,0" @click="editCustomField = custom_field"><pencil-icon width="16" height="16"></pencil-icon></button>
		                        <div class="dropdown-menu w-100 p-2 bg-white pl-2 mt-2" @click.stop>
		                            <vue-form-validate @submit="updateCustomField(index)">
	                                    <div class="form-group mb-0">
	                                        <label class="form-label">Field name</label>
	                                        <input type="text" class="form-control form-control-sm shadow-none border" v-model="editCustomField" placeholder="Field name" data-required>
	                                    </div>
	                                    <div class="d-flex align-items-center mt-2">
	                                        <button type="button" class="btn btn-white line-height-0 btn-sm btn-link text-body p-1 badge-pill" @click="$refs['customFieldsLabel'].click(); $root.auth.custom_fields.splice(index, 1); storeUserCustomFields()">
	                                            <trash-icon fill="red" width="18" height="18"></trash-icon>
	                                        </button>
	                                        <div class="ml-auto">
	                                            <button type="button" class="btn btn-sm btn-link text-body pl-0" @click="$refs['customFieldsLabel'].click();">Cancel</button>
	                                            <button type="submit" class="btn btn-sm btn-primary">Save</button>
	                                        </div>
		                                    </div>
		                            </vue-form-validate>
		                        </div>
		                    </div>
		                </div>
					</div>
				</div>
			</div>
		</div>


		<modal ref="addModal" title="Add Contact" :form="true" @submit="store" @hidden="resetNewContact()" :close-button="false">
			<div class="form-group">
				<label class="form-label">Email</label>
				<input type="email" class="form-control" v-model="newContact.email" data-required>
			</div>
			<div class="form-row form-group">
				<div class="col">
					<label class="form-label">First Name (Optional)</label>
					<input type="text" class="form-control" v-model="newContact.first_name">
				</div>
				<div class="col">
					<label class="form-label">Last Name (Optional)</label>
					<input type="text" class="form-control" v-model="newContact.last_name">
				</div>
			</div>
			<div class="form-group">
				<label class="form-label d-block mb-n1">Available services</label>
                <div v-for="service in services" class="d-inline-flex mt-2 border rounded shadow-sm py-2 px-3 mr-2">
                    <div>
                        <h6 class="font-heading mb-0">{{ service.name }}</h6>
                        <small class="text-gray d-block">{{ service.duration }} minutes</small>
                    </div>
                    <div class="ml-3">
                        <toggle-switch :value="newContact.blacklisted_services.find((x) => x == service.id) ? false : true" @input="toggleServiceBlacklist($event, service)"></toggle-switch>
                    </div>
                </div>
			</div>
			
			<div class="form-group" v-if="($root.auth.custom_fields || []).length > 0">
				<label class="form-label">Fields (Optional)</label>
				<div class="form-row">
					<div class="col" v-for="field in $root.auth.custom_fields">
						<label class="form-label">{{ field }}</label>
						<input type="text" class="form-control" v-model="newContact.custom_fields[field]">
					</div>
				</div>
			</div>

			<div class="form-group">
				<label class="form-label">Invitation Message (Optional)</label>
				<textarea cols="10" class="form-control resize-none" :placeholder="defaultEmailMessage" v-model="newContact.message"></textarea>
			</div>
			
			<template v-slot:footer>
				<div class="d-flex justify-content-end">
					<button class="btn btn-white border mr-1" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-primary" type="submit">Add</button>
				</div>
			</template>
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="selectedContact">
				<h5 class="font-heading text-center">Delete Contact</h5>
				<p class="text-center mt-3">
					Are you sure to delete contact <strong>{{ selectedContact.contact_user.full_name.trim() || selectedContact.contact_user.email }}</strong>? <br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-white border text-body" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-danger ml-auto" type="button" @click="deleteContact(selectedContact); $refs['deleteModal'].hide()">Delete</button>
				</div>
			</template>
		</modal>

	</div>
</template>

<script src="./contacts.js"></script>
<style lang="scss" scoped src="./contacts.scss"></style>