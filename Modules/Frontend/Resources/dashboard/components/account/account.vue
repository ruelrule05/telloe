<template>
	<div class="overflow-hidden h-100 d-flex flex-column" v-if="user">
		<div class="p-4">
			<ul class="nav nav-tabs">
			  	<li v-for="t in tabs" class="nav-item">
			    	<span class="nav-link  cursor-pointer" :class="{'active': t == tab}" @click="tab = t">{{ t }}</span>
			  	</li>
			</ul>
		</div>

		<div class="flex-grow-1 overflow-auto container pb-4">
			<!-- Profile -->
			<div v-if="tab == 'Profile'" class="row">
				<div class="col-md-6">
					<div class="card shadow-sm mb-3">
						<div class="card-body">
							<h5 class="font-heading h3">Profile</h5>
							<vue-form-validate @submit="save">

								<div class="d-flex align-items-center my-3">
									<div>
										<div class="user-profile-image user-profile-image-lg" :style="{backgroundImage: 'url('+user.profile_image+')'}"></div>
									</div>
									<div class="pl-2">
										<label class="d-block">Upload new profile picture</label>
										<button type="button" class="btn btn-sm btn-white border" @click="$refs['profileImageInput'].click()">Choose file</button>
										<label class="d-block">Only JPEG and PNG files are accepted with maximum size of 200KB</label>
										<input ref="profileImageInput" type="file" accept="image/x-png,image/jpeg" @change="updateImage" hidden>
									</div>
								</div>

								<template v-if="$root.auth.role.role == 'client'">
									<div class="form-group">
										<label class="form-label">Username</label>
										<input type="text" class="form-control" data-required placeholder="Username" v-model="user.username" @keydown="nospace">
										<small class="text-gray font-weight-light d-block line-height-sm mt-1">This is your unique username for your profile page URL. Spaces and special characters are not allowed</small>
									</div>
									<hr />
								</template>

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
				</div>
			</div>

			<!-- Security -->
			<div v-else-if="tab == 'Security'" class="row">
				<div class="col-md-6">
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

			<!-- Payout -->
			<div v-else-if="tab == 'Payout'" class="row">
				<div class="col-md-8">
					<div class="card shadow-sm">
						<div class="card-body">
							<div v-if="$root.payoutComplete" class="alert alert-primary text-center">
								<checkmark-circle-icon class="fill-primary"></checkmark-circle-icon>
								<p class="mb-0">Your account is verified and legible for payments and payouts.</p>
							</div>
							<div v-else class="alert alert-warning text-center">Please complete this form to make your account legible for payments and payouts.</div>
							<h5 class="font-heading h3 mb-0">Payout</h5>
							<p class="text-muted d-block mb-3">Please complete this form to make your account legible for payments and payouts. We might require additional documents for verification purposes.</p>
							<vue-form-validate @submit="updateStripeAccount()">
								<hr />
								<h5>Identity</h5>
								<div class="form-group form-row">
									<div class="col">
										<label class="form-label">Country</label>
										<select v-model="stripeAccountForm.country" class="form-control text-capitalize" :class="{'text-gray': !stripeAccountForm.country}" data-required :disabled="stripeAccountForm.countryDisabled">
											<option value="" disabled selected>- Choose a country -</option>
											<option :value="country.code" v-for="country in countries">{{ country.name }}</option>
										</select>
										<div class="d-flex align-items-center mt-1">
											<exclamation-circle-icon class="fill-danger" height="16" width="16"></exclamation-circle-icon>
											<small class="font-weight-light text-muted ml-1">Country cannot be changed once saved.</small>
										</div>
									</div>
									<div class="col">
										<label class="form-label">Address</label>
										<input type="text" class="form-control" v-model="stripeAccountForm.address" placeholder="Address" data-required>
									</div>
								</div>
								<div class="form-group form-row">
									<div class="col">
										<label class="form-label">City</label>
										<input type="text" class="form-control" v-model="stripeAccountForm.city" placeholder="City" data-required>
									</div>
									<div class="col">
										<label class="form-label">State</label>
										<input type="text" class="form-control" v-model="stripeAccountForm.state" placeholder="State" data-required>
									</div>
								</div>
								<div class="form-group form-row">
									<div class="col">
										<label class="form-label">Postal code</label>
										<input type="text" class="form-control" v-model="stripeAccountForm.postal" placeholder="Postal code" data-required>
									</div>
									<div class="col">
										<label class="form-label">Business website</label>
										<input type="url" class="form-control" v-model="stripeAccountForm.website" placeholder="Business website" data-required>
									</div>
								</div>
								<div class="form-group form-row">
									<div class="col">
										<label class="form-label">Phone number</label>
										<input type="tel" class="form-control" v-model="stripeAccountForm.phone" placeholder="Phone number" data-required>
									</div>
									<div class="col">
										<label class="form-label">Date of birth</label>
										<v-date-picker is-required :popover="{visibility: 'click' }" v-model="stripeAccountForm.dob" :input-props='{
											    class: "form-control bg-light",
											    placeholder: "Date of birth",
											    readonly: true,
											    "data-required": true,
											}'>
										</v-date-picker>
									</div>
								</div>

								<hr />
								<h5>Bank details</h5>
								<fieldset :disabled="$root.auth.stripe_account.external_accounts && $root.auth.stripe_account.external_accounts.data.length > 0">
									<div class="form-group">
										<label class="form-label">Account number</label>
										<input type="text" class="form-control" v-model="stripeAccountForm.account_number" data-required>
									</div>
									<div class="form-group form-row">
										<div class="col">
											<label class="form-label">Account holder name</label>
											<input type="text" class="form-control" v-model="stripeAccountForm.account_holder_name" data-required>
										</div>
										<div class="col">
											<label class="form-label">Routing number</label>
											<input type="text" class="form-control" v-model="stripeAccountForm.routing_number" data-required>
										</div>
									</div>
								</fieldset>


								<!-- <hr />
								<h5>Documents</h5>
								<label>Photo ID - Front</label>
								<div class="form-group">
									<input type="file" class="form-control-file d-inline-block" data-requirexd>
								</div>
								<label>Photo ID - Back</label>
								<div class="form-group form-inline">
									<input type="file" class="form-control-file" data-requirxed>
								</div>
								<label>Utility bill</label>
								<div class="form-group form-inline">
									<input type="file" class="form-control-file" data-rexquired>
								</div> -->

								<div class="text-right mt-3">
									<vue-button :loading="stripeAccountForm.loading" type="submit" button_class="btn btn-primary">Update</vue-button>
								</div>
							</vue-form-validate>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./account.js"></script>
<style src="./account.scss" lang="scss"></style>