<template>
	<div class="h-100 p-4" v-if="ready">
		<div class="row h-100">
			<div class="col-md-9">
				<div class="d-flex align-items-center">
					<h5 class="font-heading">Manage Customers</h5>
					<button class="btn btn-primary ml-auto" @click="$refs['addModal'].show()">Add Customer</button>
				</div>

				<div class="rounded border mt-3 bg-white overflow-hidden">
					<div v-if="user_customers.length == 0" class="text-gray text-center p-4">
						<div class="h6 font-weight-light mb-3">You don't have any customers yet.</div>
						<button class="btn btn-primary" @click="$refs['addModal'].show()">Add Customer</button>
					</div>

					<div v-else>
						<div class="d-flex font-heading py-2 px-3 bg-secondary">
							<div class="flex-grow-1 w-35">Name</div>
							<div class="flex-grow-1 w-35">Email</div>
							<div class="flex-grow-1 w-15">Status</div>
							<div class="flex-grow-1 w-15 text-right">Actions</div>
						</div>

						<div v-for="customer in user_customers" class="border-top py-2 px-3">
							<div class="d-flex align-items-center flex-nowrap">
								<div class="d-flex align-items-center w-35">
			                        <div class="user-profile-image user-profile-image-sm" :style="{backgroundImage: 'url('+customer.customer.profile_image+')'}">
			                                <span v-if="!customer.customer.profile_image">{{ customer.customer.initials }}</span>
			                        </div>
			                        <div class="ml-2 overflow-hidden flex-1">
			                            <h6 class="font-heading mb-0 line-height-1 text-ellipsis">{{ customer.customer.full_name }}</h6>
			                        </div>
			                    </div>
			                    <div class="flex-grow-1 w-35">{{ customer.customer.email }}</div>
			                    <div class="flex-grow-1 w-15" :class="{'text-gray font-weight-light':customer.is_pending}">{{ customer.is_pending ? 'Pending' : 'Accepted' }}</div>
			                    <div class="flex-grow-1 w-15 text-right">
			                    	<div class="dropleft">
			                    		<button class="btn btn-white p-1 badge-pill line-height-0 dropdown-toggle" data-toggle="dropdown" data-offset="-3,0">
											<more-h-icon></more-h-icon>
			                    		</button>
										<div class="dropdown-menu py-1">
										    <span class="dropdown-item cursor-pointer" @click="selectedCustomer = customer; $refs['deleteModal'].show()">Delete</span>
										</div>
			                    	</div>
			                    </div>
							</div>
						</div>
					</div>
				</div>

				<modal ref="addModal" :close-button="false">
					<h5 class="font-heading mb-3">Add Customer</h5>
					<vue-form-validate @submit="store">
						<div class="form-group">
							<label class="form-label">Email</label>
							<input type="email" class="form-control" v-model="selectedCustomer.email" data-required>
						</div>
						<div class="form-group">
							<label class="form-label">First Name (Optional)</label>
							<input type="text" class="form-control" v-model="selectedCustomer.first_name">
						</div>
						<div class="form-group">
							<label class="form-label">Last Name (Optional)</label>
							<input type="text" class="form-control" v-model="selectedCustomer.last_name">
						</div>
						<div class="d-flex justify-content-end">
							<button class="btn btn-link text-body mr-2" type="button" data-dismiss="modal">Cancel</button>
							<button class="btn btn-primary" type="submit">Add</button>
						</div>
					</vue-form-validate>
				</modal>

				<modal ref="deleteModal" :close-button="false">
					<template v-if="selectedCustomer.id">
						<h5 class="font-heading text-center">Delete Customer</h5>
						<p class="text-center mt-3">
							Are you sure to delete customer <strong>{{ selectedCustomer.customer.full_name.trim() || selectedCustomer.customer.email }}</strong>? <br />
							<span class="text-danger">This action cannot be undone</span>
						</p>
						<div class="d-flex">
							<button class="btn btn-link text-body" type="button" data-dismiss="modal">Cancel</button>
							<button class="btn btn-danger ml-auto" type="button" @click="deleteUserCustomer(selectedCustomer); $refs['deleteModal'].hide()">Delete</button>
						</div>
					</template>
				</modal>
			</div>

			<div class="col-md-3">
				<div class="shadow-sm rounded bg-white p-3 h-100">
					<div class="dropdown">
	                    <label class="text-gray mb-0 d-block mb-1" ref="customFieldsLabel">Custom Fields</label>
	                    <button class="btn btn-sm btn-secondary d-flex align-items-center" data-toggle="dropdown"><plus-icon height="13" width="13" transform="scale(1.6)" fill="#5A5ADF" class="mr-1"></plus-icon> Add Custom Field</button>
	                    <div class="dropdown-menu dropdown-menu-shadow w-100 border-0 p-2 bg-white mt-2" @click.stop>
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
	                        <div class="dropdown-menu dropdown-menu-shadow w-100 border-0 p-2 bg-white pl-2 mt-2" @click.stop>
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
</template>

<script src="./customers.js"></script>
<style lang="scss" scoped src="./customers.scss"></style>