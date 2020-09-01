<template>
	<div class="h-100" v-if="ready">
		<div class="d-flex h-100">
			<div class="h-100 flex-grow-1">
				<div class="d-flex flex-column h-100">
					<div class="border-bottom bg-white p-3 d-flex align-items-center">
						<h5 class="font-heading mb-0">Contacts</h5>
						<div class="ml-auto d-flex align-items-center">
		                    <button class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="infoTab = 'add_contact';">
		                        <plus-icon class="btn-icon"></plus-icon>
		                        Add Contact
		                    </button>
							<button type="button" class="btn btn-light ml-1 shadow-none" @click="infoTab = 'manage_fields'">Manage Fields</button>
						</div>
					</div>

					<div class="rounded mt-2 overflow-auto h-100 flex-grow-1 d-flex flex-column">
						<div v-if="contacts.length == 0" class="text-secondary text-center p-4 position-absolute-center">
							<div class="h6 mb-0 font-weight-normal">You don't have any contacts yet.</div>
						</div>

						<div class="overflow-auto flex-grow-1 pb-4 px-4 h-100" v-else>
							<table class="table table-borderless table-fixed-header mb-0">
								<thead>
									<tr>
										<th>Name</th>
										<th>Status</th>
										<th>Date Added</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="contact in contacts" :key="contact.id">
										<td class="align-middle">
											<div class="d-flex align-items-center">
						                        <div class="user-profile-image user-profile-image-sm" :style="{backgroundImage: 'url('+contact.contact_user.profile_image+')'}">
						                                <span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
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
						                    		<checkmark-circle-icon v-else height="12" width="12" ></checkmark-circle-icon>
						                    		&nbsp;{{ contact.is_pending ? 'Pending' : 'Accepted' }}
						                    	</div>
						                    </div>
										</td>
										<td class="align-middle">
				                    		<div class="flex-grow-1 text-muted">{{ contact.created_at_format }}</div>
										</td>
										<td class="align-middle">
						                    <div class="flex-grow-1 text-right">
						                    	<div class="dropleft">
						                    		<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
														<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
						                    		</button>
													<div class="dropdown-menu dropdown-menu-right">
													    <span class="dropdown-item cursor-pointer" :class="{'disabled': contact.is_pending}" @click="selectedContact = contact; infoTab = 'manage_contact'; selectedContact.ready = false;">Manage</span>
													    <span class="dropdown-item cursor-pointer" @click="selectedContact = contact; $refs['deleteModal'].show()">Delete</span>
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

			<div class="info bg-white h-100 border-left d-flex flex-column position-relative" :class="{'open': infoTab}">
				<button class="btn btn-white p-0 btn-close position-absolute" type="button" @click="infoTab = ''"><close-icon height="30" width="30"></close-icon></button>

				<template v-if="infoTab == 'manage_contact'">
				    <div class="border-bottom py-3 px-3">
		                <strong class="d-block my-2">Manage Contact</strong>
		            </div>
					<template v-if="selectedContact">
						<info :close-button="false" :conversation="conversation"></info>
					</template>
				</template>
				
				<template v-else-if="infoTab == 'manage_fields'">
				    <div class="border-bottom py-3 px-3">
		                <strong class="d-block my-2">Manage Fields</strong>
		            </div>
					<div  class="p-3" ref="customFieldsLabel">
		                <div v-for="(custom_field, index) in $root.auth.custom_fields" :key="index" class="d-flex align-items-center custom-field position-relative">
		                	<div class="mb-1 d-flex align-items-center w-100">
		                		<input type="text" :value="custom_field" class="form-control flex-grow-1">
		                		<trash-icon width="18" height="18" class="cursor-pointer ml-1" @click.native="$root.auth.custom_fields.splice(index, 1); storeUserCustomFields()"></trash-icon>
		                	</div>
		                </div>
		                <div v-if="addField" class="mb-1 d-flex align-items-center w-100">
		                	<input type="text" v-model="newField" class="form-control flex-grow-1" placeholder="New Field" @blur="addNewField">
		                	<trash-icon width="18" height="18" class="ml-1 opacity-0"></trash-icon>
		                </div>
		                <button class="btn btn-sm btn-primary d-flex align-items-center mt-2" :disabled="addField" @click="addField = true"><plus-icon height="10" width="10" transform="scale(2)" class="mr-1 fill-white"></plus-icon> Add Field</button>
					</div>
				</template>

				<div v-else-if="infoTab == 'add_contact'" class="d-flex flex-column overflow-hidden">
				    <div class="border-bottom py-3 px-3">
		                <strong class="d-block my-2">Add Contact</strong>
		            </div>
		            <div class="p-4 overflow-auto flex-grow-1">
		            	<vue-form-validate @submit="store">
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
								<strong class="d-block mb-2 font-weight-bold">Available services</strong>
				                <div v-for="service in services" class="d-flex align-items-center mb-2 rounded p-3 bg-light">
				                    <div>
				                        <h6 class="font-heading mb-0">{{ service.name }}</h6>
				                        <small class="text-gray d-block">{{ service.duration }} minutes</small>
				                    </div>
				                    <div class="ml-auto">
				                        <toggle-switch active-class="bg-green" :value="newContact.blacklisted_services.find((x) => x == service.id) ? false : true" @input="toggleServiceBlacklist(service)"></toggle-switch>
				                    </div>
				                </div>
							</div>
							
							<div class="form-group" v-if="($root.auth.custom_fields || []).length > 0">
								<strong class="d-block mb-2">Fields (Optional)</strong>
								<div class="form-row">
									<div class="col-6 mb-2" v-for="field in $root.auth.custom_fields">
										<label class="form-label">{{ field }}</label>
										<input type="text" class="form-control" v-model="newContact.custom_fields[field]">
									</div>
								</div>
							</div>

							<div class="form-group">
								<strong class="d-block mb-2">Invitation Message (Optional)</strong>
								<textarea cols="10" class="form-control resize-none" :placeholder="defaultEmailMessage" v-model="newContact.invite_message"></textarea>
							</div>
						
							<div class="d-flex">
								<button class="btn btn-white border" type="button" data-dismiss="modal">Cancel</button>
								<button class="ml-auto btn btn-primary" type="submit">Add</button>
							</div>
						</vue-form-validate>
					</div>
				</div>

			</div>
		</div>

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

		
       <gallery :conversation="conversation" :file="selectedFile" @close="selectedFile = null"></gallery>

	</div>
</template>

<script src="./contacts.js"></script>
<style lang="scss" scoped src="./contacts.scss"></style>