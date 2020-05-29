<template>
	<div class="p-4 overflow-auto h-100" v-if="user">
		<div class="row">
			<div class="col-md-6">

				<!-- Profile -->
				<div class="card shadow-sm mb-3">
					<div class="card-body">
						<h5 class="font-heading h3">Profile</h5>
						<vue-form-validate @submit="save">
							<div class="form-group">
								<label class="form-label">Username</label>
								<input type="text" class="form-control" data-required placeholder="Username" v-model="user.username" @keydown="nospace">
								<small class="text-gray font-weight-light d-block line-height-sm mt-1">This is your unique username for your profile page URL. Spaces and special characters are not allowed</small>
							</div>
							<hr />
							<div class="form-group">
								<label class="form-label">First Name</label>
								<input type="text" class="form-control" data-required placeholder="First Name" v-model="user.first_name">
							</div>
							<div class="form-group">
								<label class="form-label">Last Name</label>
								<input type="text" class="form-control" data-required placeholder="Last Name" v-model="user.last_name">
							</div>
							<div class="form-group">
								<label class="form-label">Email</label>
								<input type="email" class="form-control" data-required placeholder="Email" v-model="user.email">
							</div>
							<div class="text-right">
								<button type="submit" class="btn btn-primary">Update</button>
							</div>
						</vue-form-validate>
					</div>
				</div>

				<!-- Security -->
				<div class="card shadow-sm">
					<div class="card-body">
						<h5 class="font-heading h3">Security</h5>
						<vue-form-validate @submit="password">
							<div class="form-group">
								<label class="form-label">Current Password</label>
								<input type="password" v-model="securityForm.current_password" class="form-control" data-required placeholder="Current Password">
							</div>
							<div class="form-group">
								<label class="form-label">New Password</label>
								<input type="password" v-model="securityForm.password" class="form-control" data-required placeholder="New Password">
							</div>
							<div class="form-group">
								<label class="form-label">Confirm Password</label>
								<input type="password" v-model="securityForm.password_confirmation" class="form-control" data-required placeholder="Confirm Password">
							</div>
							<div class="text-right">
								<button type="submit" class="btn btn-primary">Update</button>
							</div>
						</vue-form-validate>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./account.js"></script>