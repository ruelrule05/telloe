<template>
	<div class="flex min-h-screen flex-col">
		<div class="content-header border-bottom lg:static fixed w-full bg-white z-20">
			<div class="ml-7 lg:ml-0">MY ACCOUNT</div>
		</div>
		<div class="h-20 lg:hidden block" />

		<div class="flex flex-grow flex-col md:flex-row">
			<VueSelect class="w-11/12 mx-auto block md:hidden mt-5" :options="menusMobile" drop-position="w-full lg:px-6 pt-0 lg:pt-4" v-model="activeMenu"></VueSelect>

			<div class="sidebar account-sidebar border-r-0 md:border-r px-6 pt-4">
				<div v-for="(menu, menuIndex) in menus" :key="menuIndex" class="sidebar-menu-item hidden md:block" :class="{ active: activeMenu == menu }" @click="activeMenu = menu">{{ menu }}</div>

				<form action="/logout" ref="logoutForm" method="POST" class="sidebar-menu-item hidden md:block">
					<input type="hidden" name="_token" :value="csrf_token" />
					<button type="submit">Log Out</button>
				</form>
			</div>
			<div class="flex-grow">
				<div v-if="activeMenu == 'Profile'" class="w-full md:w-6/12 p-6 md:p-8">
					<h2 class="font-serif uppercase font-semibold mb-8">Profile Settings</h2>
					<vue-form-validate @submit="save">
						<div class="flex items-center mb-8 profile-photo">
							<button class="mr-6 image relative overflow-hidden" type="button" :style="{ backgroundImage: 'url(' + user.profile_image + ')' }" @click="$refs['profileImageInput'].click()">
								<span v-if="!user.profile_image" class="absolute-center text-gray-300 text-2xl">{{ user.initials }}</span>
								<span class="absolute left-0 w-full h-1/2 opacity-80 bottom-0 bg-gradient-to-t from-black"></span>
								<span class="absolute bottom-2 left-0 text-center w-full text-white text-xs">Edit</span>
							</button>
							<input ref="profileImageInput" type="file" accept="image/x-png,image/jpeg" @change="updateImage" class="hidden" />

							<div class="text">
								<h5 class="mb-3 text-sm">Set up you profile image by uploading your photo.</h5>
								<p class="text-xs text-muted">Only JPEG and PNG files are accepted with maximum size of 5MB</p>
							</div>
						</div>
						<div class="mb-5">
							<label required>Username</label>
							<input type="text" v-model="user.username" @keypress="validateUsername" data-required />
							<p class="text-muted text-xs mt-1">This is your unique username for your profile page URL. Spaces and special characters are not allowed.</p>
						</div>
						<div class="mb-5">
							<label required>First Name</label>
							<input type="text" v-model="user.first_name" data-required />
						</div>
						<div class="mb-5">
							<label required>Last Name</label>
							<input type="text" v-model="user.last_name" data-required />
						</div>
						<div class="mb-5">
							<label required>Email</label>
							<input type="email" v-model="user.email" data-required />
						</div>
						<div class="mb-5">
							<label>Timezone</label>
							<vue-select :options="availableTimezones" drop-position="w-full" searchable v-model="user.timezone"></vue-select>
						</div>
						<div class="mb-5">
							<label>Mobile No.</label>
							<div class="relative">
								<div class="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center text-sm">
									<span class="flag-icon line-height-0 mr-1">{{ getUnicodeFlagIcon(timezoneAreaCode.country) }}</span>
									{{ user.dial_code }}
								</div>
								<input type="tel" ref="phone" @keydown="numbersOnly" class="pl-16" placeholder="Mobile No." v-model="user.phone" />
							</div>
						</div>

						<vue-button :loading="loading" type="submit" button_class="btn btn-primary"><span>Save</span></vue-button>
					</vue-form-validate>
				</div>

				<div v-else-if="activeMenu == 'Security'" class="w-full md:w-5/12 p-6 md:p-8">
					<h2 class="font-serif uppercase font-semibold mb-8">Security Settings</h2>
					<vue-form-validate @submit="password">
						<div class="mb-5">
							<label required>Current Password</label>
							<input type="password" v-model="securityForm.current_password" placeholder="Current Password" data-required />
						</div>
						<div class="mb-5">
							<label required>New Password</label>
							<input type="password" v-model="securityForm.password" placeholder="New Password" data-required />
						</div>
						<div class="mb-5">
							<label required>Confirm Password</label>
							<input type="password" v-model="securityForm.password_confirmation" placeholder="Confirm Password" data-required />
						</div>

						<vue-button :loading="loading" type="submit" button_class="btn btn-primary"><span>Save</span></vue-button>
					</vue-form-validate>
				</div>

				<div v-else-if="activeMenu == 'Plan'" class="p-8">
					<div v-if="isTrial" class="bg-secondary p-3 mb-4 rounded-xl text-center text-sm free-trial">Your free trial will expire at {{ dayjs($root.auth.trial_expires_at).format('MMMM D, YYYY') }}</div>

					<h2 class="font-serif uppercase font-semibold mb-8">Plan</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6">
						<div v-for="plan in plans" :key="plan.id" class="card-plan mb-6" :class="{ active: $root.auth.subscription && $root.auth.subscription.plan_id == plan.id, selected: plan.id == (selectedPlan || {}).id }">
							<div class="flex justify-between">
								<div class="text-muted font-serif uppercase font-semibold text-xs">{{ plan.name }}</div>
								<div class="active-plan text-xs font-serif uppercase font-semibold text-primary">active</div>
							</div>

							<div class="mt-16 mb-24">
								<h3 class="mb-6">
									<strong class="text-6xl">${{ parseInt(plan.price) }}</strong
									><strong class="text-2xl">.{{ plan.price.split('.')[1] }}</strong>
								</h3>
								<div class="uppercase font-serif font-semibold text-muted text-xs">Monthly per user</div>
								<div class="bg-green-400 mt-5 rounded text-white p-3 font-semibold inline-block font-serif text-xs" :class="{ 'opacity-0': !plan.price_meta }">
									<span class="relative -bottom-px">&nbsp;{{ plan.price_meta }}&nbsp;</span>
								</div>
							</div>
							<button type="button" class="btn btn-outline-primary w-full btn-cancel" @click="$refs.cancelSubscription.show()">
								<span>Cancel</span>
							</button>
							<button type="button" class="btn btn-primary w-full btn-subscribe" @click="selectPlan(plan)">
								<span>Subscribe</span>
							</button>
						</div>
					</div>
				</div>

				<div v-else-if="activeMenu == 'Billing'" class="billing-content">
					<template v-if="$root.auth.subscription">
						<div class="flex items-stretch w-full border-bottom">
							<div class="billing-setting border-right">
								<div class="p-8">
									<h2 class="font-serif uppercase font-semibold mb-6">Billing Setting</h2>

									<div class="flex justify-between billing-row border-bottom">
										<p class="title">Plan</p>
										<p class="content">{{ $root.auth.subscription.plan.name }}</p>
									</div>
									<div class="flex justify-between billing-row border-bottom">
										<p class="title">Price</p>
										<p class="content">${{ $root.auth.subscription.plan.price }} per user</p>
									</div>
									<div class="flex justify-between billing-row border-bottom">
										<p class="title">Users on plan</p>
										<p class="content">{{ members.length }}</p>
									</div>
									<div class="flex justify-between billing-row border-bottom">
										<p class="title">Total monthly cost</p>
										<p class="content">${{ $root.auth.subscription.plan.price * members.length }}/ month</p>
									</div>

									<!-- <h2 class="mt-10">Payment method</h2>
								<div class="flex items-center justify-between">
									<div class="flex items-center visa">
										<CcPreviewIcon></CcPreviewIcon>
										<p class="ml-2">Visa ending in 3827</p>
										<p class="ml-4 text-muted">08/2023</p>
									</div>
								</div> -->
								</div>
							</div>
							<div class="members p-8">
								<div class="flex items-center justify-between mb-4">
									<h2 class="font-serif uppercase font-semibold">Members</h2>
									<button type="button" class="btn btn-outline-primary btn-sm" @click="$refs.addMember.show()"><span>Add Member</span></button>
								</div>

								<div class="flex member-row flex-between">
									<div class="name">
										<div>
											<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + $root.auth.profile_image + ')' }">
												<span v-if="!$root.auth.profile_image">@{{ $root.auth.initials }}</span>
											</div>
										</div>
										<p class="pl-2">{{ $root.auth.full_name }}</p>
									</div>
									<div class="status text-right">
										<p>Account Owner</p>
									</div>
								</div>

								<div class="flex member-row flex-between border-top" v-for="member in members" :key="member.id">
									<div class="name">
										<div>
											<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + member.member_user.profile_image + ')' }">
												<span v-if="!member.member_user.profile_image">{{ member.member_user.initials }}</span>
											</div>
										</div>
										<p class="pl-2">{{ member.member_user.full_name }} <span class="text-muted font-normal ml-1" v-if="member.is_pending">Pending</span></p>
									</div>
									<div class="remove">
										<button
											class="btn btn-sm flex items-center"
											type="button"
											@click="
												selectedMember = member;
												$refs.removeMember.show();
											"
										>
											<i class="bg-primary rounded-full p-1"><CloseIcon class="fill-current text-white h-2 w-2"></CloseIcon></i><span class="ml-1">Remove</span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="invoices">
							<h2 class="font-serif uppercase font-semibold mb-6">Invoices</h2>
							<div class="mb-10 search">
								<input type="text" v-model="invoiceSearch" placeholder="Search invoices..." />
							</div>

							<table class="table-fixed w-full">
								<thead>
									<tr>
										<td>Invoice no.</td>
										<td>Date</td>
										<td>Amount</td>
										<td>Status</td>
										<td>Download</td>
									</tr>
								</thead>
								<tbody>
									<tr v-for="invoice in filteredInvoices" :key="invoice.number" class="border-bottom">
										<td class="invoice">{{ invoice.number }}</td>
										<td>{{ dayjs.unix(invoice.created).format('MMM d, YYYY') }}</td>
										<td>${{ (invoice.amount_due / 100).toFixed(2) }}</td>
										<td class="status">
											<p>{{ invoice.status }}</p>
										</td>
										<td class="download"><a :href="invoice.invoice_pdf" target="_blank">.PDF</a></td>
									</tr>
									<tr></tr>
								</tbody>
							</table>
						</div>
					</template>
					<div v-else class="pt-36 text-center text-muted">You are not subscribed to a plan yet.</div>
				</div>

				<div v-else-if="activeMenu == 'Payout'" class="p-8 payout-content">
					<div v-if="banner && $root.auth.stripe_account" class="mb-6">
						<div class="bg-primary-ultralight justify-between rounded-xl flex p-6 flex-col md:flex-row relative">
							<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">SET UP YOUR BANKING DETAILS</div>
							<div class="w-full md:w-7/12 ml-0 md:ml-20">
								<p class="text-muxted mb-4">Use subscriptions to make groups of events where contacts can subscribe to recurring bookings for a recurring cost.</p>
							</div>
							<div class="font-serif absolute top-5 right-6">
								<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="banner = false"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
							</div>
						</div>
					</div>

					<h2 class="font-serif uppercase font-semibold mb-8">Payout Settings</h2>
					<p class="note text-sm">Please complete this form to make your account legible for payments and payouts. We might require additional documents for verification purposes.</p>

					<vue-form-validate @submit="updateStripeAccount()">
						<fieldset :disabled="stripeAccountForm.loading">
							<div class="flex flex-col md:flex-row">
								<div class="payout-sidebar border-r-0 md:border-r">
									<h2 class="text-xs">Identity</h2>
								</div>
								<div class="form">
									<div class="flex justify-between form-inline">
										<div class="form-field select-country">
											<label required>Country</label>
											<vue-select searchable :disabled="stripeAccountForm.countryDisabled" v-model="stripeAccountForm.country" placeholder="Choose a country" dropPosition="w-full" :options="countries" required></vue-select>
											<p class="warning text-sm mt-1">Cannot be changed once set.</p>
										</div>
										<div class="form-field">
											<label required>Address</label>
											<input type="text" placeholder="Your full address" v-model="stripeAccountForm.address" data-required />
										</div>
										<div class="form-field">
											<label required>City</label>
											<input type="text" placeholder="City name" v-model="stripeAccountForm.city" data-required />
										</div>
										<div class="form-field">
											<label required>State</label>
											<input type="text" placeholder="State" v-model="stripeAccountForm.state" data-required />
										</div>
										<div class="form-field">
											<label required>Postal code</label>
											<input type="text" placeholder="Postal code" v-model="stripeAccountForm.postal" data-required />
										</div>
										<div class="form-field">
											<label required>Business website</label>
											<input type="text" placeholder="Business website" v-model="stripeAccountForm.website" data-required />
										</div>
										<div class="form-field">
											<label required>Phone number</label>
											<input type="tel" placeholder="Phone number" v-model="stripeAccountForm.phone" data-required />
										</div>
										<div class="form-field">
											<label required>Date of birth</label>
											<v-date-picker class="relative" is-required :popover="{ visibility: 'click' }" v-model="stripeAccountForm.dob" :masks="masks">
												<template v-slot="{ inputValue, inputEvents }">
													<input type="text" readonly v-on="inputEvents" :value="inputValue" placeholder="Date of birth" data-required />
												</template>
											</v-date-picker>
										</div>
									</div>
								</div>
							</div>
							<div class="flex flex-col md:flex-row mt-8">
								<div class="payout-sidebar border-r-0 md:border-r">
									<h2 class="text-xs">Bank details</h2>
								</div>
								<div class="form">
									<div class="flex flex-col justify-between form-inline">
										<div class="form-field">
											<label required>Account number</label>
											<input type="text" v-model="stripeAccountForm.account_number" data-required />
										</div>
										<div class="form-field">
											<label required>Account holder name</label>
											<input type="text" v-model="stripeAccountForm.account_holder_name" data-required />
										</div>
										<div v-if="stripeAccountForm.country && stripeAccountForm.country != 'NZ' && routingNumber" class="form-field">
											<label required>{{ routingNumber }}</label>
											<input type="text" v-model="stripeAccountForm.routing_number" data-required />
										</div>
										<div v-if="stripeAccountForm.country == 'CA'" class="form-field">
											<label required>Transit number</label>
											<input type="text" v-model="stripeAccountForm.transit_number" data-required />
										</div>
										<div>
											<vue-button :loading="stripeAccountForm.loading" class="btn btn-primary" type="submit"><span>Save</span></vue-button>
										</div>
									</div>
								</div>
							</div>
						</fieldset>
					</vue-form-validate>
				</div>

				<div v-else-if="activeMenu == 'Notifications'" class="p-8">
					<div class="notification-content account-body">
						<h2 class="font-serif uppercase font-semibold mb-8">Notification Settings</h2>

						<vue-form-validate @submit="save">
							<div class="form-group mb-2">
								<vue-checkbox v-model="user.notify_email" label="Notify me by email for each booking activity."></vue-checkbox>
							</div>
							<div class="form-group mb-2">
								<vue-checkbox v-model="user.notify_sms" label="Notify me by SMS 2 hours before booking."></vue-checkbox>
							</div>
							<div class="form-group">
								<vue-checkbox v-model="user.notify_message" label="Notify me by email for each new message when I'm offline."></vue-checkbox>
							</div>
							<div class="mt-5">
								<vue-button :loading="loading" type="submit" button_class="btn btn-primary"><span>Save</span></vue-button>
							</div>
						</vue-form-validate>
					</div>
				</div>

				<div v-else-if="activeMenu == 'My Menu'" class="p-8">
					<div class="notification-content account-body">
						<h2 class="font-serif uppercase font-semibold mb-8">My Menu</h2>

						<vue-form-validate @submit="saveMenuSettings">
							<div class="form-group mb-2">
								<vue-checkbox v-model="user.packages" label="Packages"></vue-checkbox>
							</div>
							<div class="form-group mb-2">
								<vue-checkbox v-model="user.team" label="Team"></vue-checkbox>
							</div>
							<div class="form-group mb-2">
								<vue-checkbox v-model="user.payments" label="Payments"></vue-checkbox>
							</div>
							<div class="form-group mb-2">
								<vue-checkbox v-model="user.match_up" label="Match Up"></vue-checkbox>
							</div>
							<div class="form-group mb-2">
								<vue-checkbox v-model="user.messages" label="Messages"></vue-checkbox>
							</div>
							<div class="form-group">
								<vue-checkbox v-model="user.contacts" label="Contacts"></vue-checkbox>
							</div>
							<div class="mt-5">
								<vue-button :loading="loading" type="submit" button_class="btn btn-primary"><span>Save</span></vue-button>
							</div>
						</vue-form-validate>
					</div>
				</div>
			</div>
		</div>

		<Modal ref="paymentModal" size="sm" no-backdrop-hide>
			<div v-if="selectedPlan">
				<h4 class="font-serif uppercase font-semibold mb-4">SUBSCRIBE</h4>

				<div class="bg-secondary rounded-2xl px-4 py-3 font-bold mb-8 text-sm">You are subscribing to "{{ selectedPlan.name }}" plan which totals ${{ selectedPlan.price }} per {{ selectedPlan.interval }}.</div>

				<vue-form-validate @submit="subscribe()">
					<fieldset :disabled="paymentLoading">
						<label>Card information</label>
						<div class="input-cc-card border-bottom border-gray-300 relative z-10">
							<div class="cc-icon">
								<component :is="cardBrandComponent"></component>
							</div>
							<input v-model="cardForm.number" type="tel" class="input-cc rounded-b-none border-b-0" :class="{ 'is-invalid': cardForm.errors.number }" placeholder="#### #### #### ####" v-cardformat:formatCardNumber data-required />
						</div>
						<div class="flex relative">
							<div class="flex-grow">
								<input type="text" :class="{ 'is-invalid': cardForm.errors.expiration }" v-model="cardForm.expiration" class="input-cc rounded-t-none rounded-r-none border-r-0 border-t-0" placeholder="MM/YY" v-cardformat:formatCardExpiry data-required />
							</div>
							<div class="flex-grow border-left">
								<input type="text" :class="{ 'is-invalid': cardForm.errors.cvc }" v-model="cardForm.cvc" class="input-cc rounded-t-none rounded-l-none border-l-0 border-t-0" placeholder="CVC" v-cardformat:formatCardCVC data-required />
							</div>
						</div>

						<div class="mt-6">
							<label>Name on card</label>
							<input v-model="cardForm.name" type="text" data-required />
						</div>
					</fieldset>

					<!-- <div class="text-center text-muted"><small class="font-weight-light">Powered by</small>&nbsp;&nbsp;<img src="/images/stripe.png" height="55" /></div> -->

					<div class="flex items-betweeen mt-6">
						<button :disabled="paymentLoading" type="button" class="btn" @click="$refs.paymentModal.hide(true)"><span>Cancel</span></button>
						<vue-button type="submit" :loading="paymentLoading" button_class="ml-auto btn btn-primary shadow-none"><span>Subscribe</span></vue-button>
					</div>
				</vue-form-validate>
			</div>
		</Modal>

		<Modal ref="cancelSubscription" size="md">
			<h5 class="font-serif text-sm text-muted uppercase font-semibold mb-6">Cancel Subscription</h5>
			<p>Are you sure to cancel your current subscription?</p>
			<div class="flex mt-8">
				<button type="button" :disabled="loading" class="btn btn-light shadow-none" @click="$refs.cancelSubscription.hide()"><span>Cancel</span></button>
				<vue-button type="button" :loading="loading" button_class="ml-auto btn btn-red" @click="unsubscribe()"><span>Cancel Subscription</span></vue-button>
			</div>
		</Modal>

		<Modal ref="addMember">
			<h4 class="font-serif uppercase font-semibold mb-4">ADD MEMBER</h4>

			<vue-form-validate @submit="submitStoreMember">
				<div class="mb-4">
					<label>Email</label>
					<input type="email" v-model="newMember.email" data-required />
				</div>
				<div class="mb-6 flex items-center">
					<div class="flex-grow pr-4">
						<label>First Name (Optional)</label>
						<input type="text" v-model="newMember.first_name" />
					</div>
					<div class="flex-grow pl-4">
						<label>Last Name (Optional)</label>
						<input type="text" v-model="newMember.last_name" />
					</div>
				</div>
				<div class="mb-4">
					<strong class="block mb-2 font-semibold font-serif uppercase text-sm">Assign Services</strong>
					<div class="grid grid-cols-2 gap-3">
						<template v-for="service in services">
							<div v-if="service.is_available" :key="service.id" class="flex rounded-xl p-3 bg-gray-50">
								<div>
									<h6 class="font-semibold">{{ service.name }}</h6>
									<small class="text-muted block">{{ service.duration }} minutes</small>
								</div>
								<div class="ml-auto">
									<toggle-switch :value="newMember.assigned_services.find(x => x == service.id) ? true : false" @input="toggleAssignedService(service)"></toggle-switch>
								</div>
							</div>
						</template>
					</div>
				</div>

				<div class="mb-4">
					<label>Invitation Message (Optional)</label>
					<textarea rows="3" class="resize-none" :placeholder="defaultEmailMessage" v-model="newMember.invite_message"></textarea>
				</div>

				<div class="mb-4">
					<vue-checkbox v-model="newMember.sendToEmail" label="Send invitation link to email"></vue-checkbox>
				</div>

				<div class="flex justify-between">
					<button class="btn" type="button" @click="$refs.addMember.hide()">Cancel</button>
					<button class="btn btn-primary btn-md" type="submit">
						<span>Add</span>
					</button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="removeMember" size="md">
			<template v-if="selectedMember">
				<h5 class="font-serif text-sm uppercase font-semibold mb-6">Remove Member</h5>
				<p>
					Are you sure to remove member <strong>{{ selectedMember.full_name.trim() || selectedMember.email }}</strong
					>? <br />This action cannot be undone.
				</p>
				<div class="flex justify-between mt-4">
					<button type="button" :disabled="loading" class="btn btn-light shadow-none" @click="$refs.removeMember.hide()"><span>Cancel</span></button>
					<button
						type="button"
						:loading="loading"
						class="btn btn-red"
						@click="
							deleteMember(selectedMember);
							$refs.removeMember.hide();
						"
					>
						<span>Remove</span>
					</button>
				</div>
			</template>
		</Modal>

		<div hidden class="overflow-hidden h-100 d-flex flex-column" v-if="user">
			<div class="flex-grow-1 overflow-auto container pb-4">
				<!-- Payout -->
				<div v-if="activeMenu == 'Payout'" class="row">
					<div class="col-md-8">
						<div class="card shadow-sm">
							<div class="card-body">
								<div v-if="$root.payoutComplete" class="alert alert-primary text-center">
									<checkmark-circle-icon class="fill-primary"></checkmark-circle-icon>
									<p class="mb-0">Your account is verified and legible for payments and payouts.</p>
								</div>
								<div v-else class="alert alert-warning text-center">
									<exclamation-circle-icon class="fill-warning mb-2" width="30" height="30"></exclamation-circle-icon>
									<p class="mb-0">Please complete this form to make your account legible for payments and payouts.</p>
								</div>
								<h5 class="font-heading h3 mb-0">Payout</h5>
								<p class="text-muted d-block mb-3">Please complete this form to make your account legible for payments and payouts. We might require additional documents for verification purposes.</p>
								<vue-form-validate @submit="updateStripeAccount()">
									<hr />
									<h5>Identity</h5>
									<div class="form-group form-row">
										<div class="col">
											<label class="form-label">Country</label>
											<select v-model="stripeAccountForm.country" class="form-control text-capitalize" :class="{ 'text-gray': !stripeAccountForm.country }" data-required :disabled="stripeAccountForm.countryDisabled">
												<option value="" disabled selected>- Choose a country -</option>
												<option :value="country.code" v-for="country in countries" :key="country.name">{{ country.name }}</option>
											</select>
											<div class="d-flex align-items-center mt-1">
												<exclamation-circle-icon class="fill-danger" height="16" width="16"></exclamation-circle-icon>
												<small class="font-weight-light text-muted ml-1">Country cannot be changed once saved.</small>
											</div>
										</div>
										<div class="col">
											<label class="form-label">Address</label>
											<input type="text" class="form-control" v-model="stripeAccountForm.address" placeholder="Address" data-required />
										</div>
									</div>
									<div class="form-group form-row">
										<div class="col">
											<label class="form-label">City</label>
											<input type="text" class="form-control" v-model="stripeAccountForm.city" placeholder="City" data-required />
										</div>
										<div class="col">
											<label class="form-label">State</label>
											<input type="text" class="form-control" v-model="stripeAccountForm.state" placeholder="State" data-required />
										</div>
									</div>
									<div class="form-group form-row">
										<div class="col">
											<label class="form-label">Postal code</label>
											<input type="text" class="form-control" v-model="stripeAccountForm.postal" placeholder="Postal code" data-required />
										</div>
										<div class="col">
											<label class="form-label">Business website</label>
											<input type="url" class="form-control" v-model="stripeAccountForm.website" placeholder="Business website" data-required />
										</div>
									</div>
									<div class="form-group form-row">
										<div class="col">
											<label class="form-label">Phone number</label>
											<input type="tel" class="form-control" v-model="stripeAccountForm.phone" placeholder="Phone number" data-required />
										</div>
										<div class="col">
											<label class="form-label">Date of birth</label>
											<v-date-picker class="relative" is-required :popover="{ visibility: 'click' }" v-model="stripeAccountForm.dob" :masks="masks">
												<template v-slot="{ inputValue, inputEvents }">
													<button type="button" class="form-control text-left" v-on="inputEvents">
														<span v-if="inputValue">{{ inputValue }}</span>
														<span v-else class="text-gray">Date of birth</span>
													</button>
												</template>
											</v-date-picker>
										</div>
									</div>

									<hr />
									<h5>Bank details</h5>
									<fieldset :disabled="($root.auth.stripe_account || {}).external_accounts && ($root.auth.stripe_account || {}).external_accounts.data.length > 0">
										<div class="form-group">
											<label class="form-label">Account number</label>
											<input type="text" class="form-control" v-model="stripeAccountForm.account_number" data-required />
										</div>
										<div class="form-group form-row">
											<div class="col">
												<label class="form-label">Account holder name</label>
												<input type="text" class="form-control" v-model="stripeAccountForm.account_holder_name" data-required />
											</div>
											<div v-if="stripeAccountForm.country && stripeAccountForm.country != 'NZ'" class="col">
												<label class="form-label">{{ routingNumber }}</label>
												<input type="text" class="form-control" v-model="stripeAccountForm.routing_number" data-required />
											</div>
											<div v-if="stripeAccountForm.country == 'CA'" class="col">
												<label class="form-label">Transit number</label>
												<input type="text" class="form-control" v-model="stripeAccountForm.transit_number" data-required />
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

				<!-- Notifications -->
				<div v-else-if="tab == 'notifications'" class="row">
					<div class="col-md-6">
						<div class="card shadow-sm">
							<div class="card-body">
								<h5 class="font-heading h3 mb-5">Notifications</h5>
								<vue-form-validate @submit="save">
									<div class="form-group mb-2">
										<vue-checkbox v-model="user.notify_email" label="Notify me by email for each booking activity."></vue-checkbox>
									</div>
									<div class="form-group mb-2">
										<vue-checkbox v-model="user.notify_sms" label="Notify me by SMS 2 hours before booking."></vue-checkbox>
									</div>
									<div class="form-group">
										<vue-checkbox v-model="user.notify_message" label="Notify me by email for each new message when I'm offline."></vue-checkbox>
									</div>
									<div class="text-right mt-5">
										<vue-button :loading="loading" type="submit" button_class="btn btn-primary">Update Settings</vue-button>
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

<script src="./account.js"></script>
<style src="./account.scss" lang="scss"></style>
