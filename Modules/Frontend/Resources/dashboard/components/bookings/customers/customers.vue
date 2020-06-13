<template>
	<div class="h-100 p-4" v-if="ready">
		<div class="d-flex align-items-center">
			<h5 class="font-heading">Manage Customers</h5>
			<button class="btn btn-primary ml-auto" @click="$refs['addModal'].show()">Add Customer</button>
		</div>

		<div class="rounded border shadow-sm mt-3 bg-white">
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

				<div v-for="customer in user_customers" class="border-bottom py-2 px-3">
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
	                    	<div class="dropdown">
	                    		<button class="btn dropdown-toggle" data-toggle="dropdown">
									<more-h-icon></more-h-icon>
	                    		</button>
								<div class="dropdown-menu">
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
</template>

<script src="./customers.js"></script>
<style lang="scss" scoped src="./customers.scss"></style>