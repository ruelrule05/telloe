<template>
	<div class="overflow-hidden h-100 flex-grow-1 d-flex flex-column" id="subscriptions">
		<div class="d-flex flex-column h-100">
			<div class="border-bottom bg-white p-3 d-flex align-items-center">
				<h5 class="font-heading mb-0">Subscriptions</h5>
				<div class="ml-auto d-flex align-items-center">
					<paginate-links :key="subscriptions.length" :async="true" for="subscriptions" :show-step-links="true" :classes="{'ul': ['pagination', 'd-inline-flex', 'mb-0'], 'li': ['page-item', !hasSubscriptions ? 'disabled': 'page-item'], 'li > a': ['page-link', 'cursor-pointer']}"></paginate-links>
					<div class="d-inline-flex align-items-center mx-2">
						<vue-select :options="subscriptionStatuses" button_class="border-0 bg-light shadow-none select-flex" v-model="subscriptionStatus" label="Status"></vue-select>
					</div>
                    <button class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="openInfo = true">
                        <plus-icon class="btn-icon"></plus-icon>
                        New Subscription
                    </button>
				</div>
			</div>

			<div class="flex-grow-1 d-flex h-100 overflow-hidden"> 
				<div class="d-flex overflow-hidden h-100 w-100">
					<div class="d-flex flex-column flex-grow-1 px-4 mt-2 pb-4">
						<div class="overflow-auto flex-grow-1 pb-4 h-100" v-if="subscriptions.length > 0" :class="{'d-none': !hasSubscriptions}">
							<table class="table table-borderless table-hover table-fixed-header mb-0">
								<thead>
									<tr>
										<th>Contact</th>
										<!-- <th>Subscription ID</th> -->
										<th>Status</th>
										<th>Created</th>
										<th>Next Invoice</th>
										<th></th>
									</tr>
								</thead>
								<paginate tag="tbody" name="subscriptions" ref="paginate" :list="subscriptions" :per="15">
									<template v-for="subscription in paginated('subscriptions')">
										<tr v-if="!subscription.placeholder" :key="subscription.id" class="cursor-pointer"  >
											<td class="align-middle" @click="viewSubscription(subscription)">
												<div class="d-flex align-items-center">
													<div class="user-profile-image user-profile-image-sm" :style="{backgroundImage: 'url('+subscription.contact.contact_user.profile_image+')'}">
															<span v-if="!subscription.contact.contact_user.profile_image">{{ subscription.contact.contact_user.initials }}</span>
													</div>
													<div class="ml-2 overflow-hidden flex-1">
														<h6 class="font-heading mb-0 text-ellipsis">{{ subscription.contact.contact_user.full_name }}</h6>
														<small class="d-block text-muted">{{ subscription.contact.contact_user.email }}</small>
													</div>
												</div>
											</td>
											<!-- <td class="align-middle">
												<span class="subscription-id" v-if="subscription.plan">{{ subscription.id }}</span>
												<template v-else>
													Not available
													<router-link to="/dashboard/account?tab=payout" v-if="!subscription.plan && !$root.payoutComplete" v-tooltip.right="'Please complete your payout account <br /> to create active subscriptions.'" class="badge badge-pill shadow-none py-0 px-1 badge-dark border-0 badge-sm cursor-pointer"><small>?</small></router-link>
												</template>
											</td> -->
											<td class="align-middle" @click="viewSubscription(subscription)">
												<span class="badge text-capitalize position-relative" :class="'badge-' + subscription.status">
													<span :class="{'opacity-0': subscription.statusLoading}">{{ subscription.plan ? subscription.status : 'Draft' }}</span>
													<div v-if="subscription.statusLoading" class="position-absolute-center">
														<div class="spinner-border spinner-border-sm text-primary"></div>
													</div>
												</span>
											</td>
											<td class="align-middle text-muted" @click="viewSubscription(subscription)">
												<p class="text-capitalize mb-0">{{ subscription.created ? timestampToDate(subscription.created) : '-' }}</p>
											</td>
											<td class="align-middle text-muted" @click="viewSubscription(subscription)">
												<p class="text-capitalize mb-0" v-if="subscription.status == 'active'">{{ subscription.current_period_end ? timestampToDate(subscription.current_period_end, false) : '-' }}</p>
											</td>
											<td class="text-right align-middle">
												<div v-if="subscription.status != 'canceled'" class="dropleft">
													<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown" :disabled="subscription.statusLoading">
														<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
													</button>
													<div class="dropdown-menu dropdown-menu-right">
														<template v-if="subscription.plan">
															<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="selectedSubscription = subscription; $refs['cancelModal'].show()">
																<block-icon width="18" height="18" class="ml-n2 mr-1 fill-secondary"></block-icon>
																Cancel Subscription
															</span>
														</template>
														<template v-else>
															<span v-if="$root.payoutComplete" class="dropdown-item d-flex align-items-center cursor-pointer" @click="startSubscription(subscription)">
																<task-icon width="18" height="18" class="ml-n2 mr-1 fill-secondary"></task-icon>
																Start Subscription
															</span>
															<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="selectedSubscription = subscription; $refs['deleteModal'].show()">
																<trash-icon width="18" height="18" class="ml-n2 mr-1 fill-secondary"></trash-icon>
																Delete
															</span>
														</template>
													</div>
												</div>
											</td>
										</tr>
									</template>
								</paginate>
							</table>
						</div>
						<div v-if="subscriptions.length == 0 || !hasSubscriptions" class="text-muted text-center position-absolute-center">
							<div class="h6 text-secondary font-weight-normal mb-0">No subscriptions found.</div>
						</div>
					</div>

					<div class="info bg-white h-100 border-left p-3 overflow-auto d-flex flex-column" :class="{'open': openInfo}">
						<h5 class="font-heading mb-3">New Subscription</h5>
						<vue-form-validate @submit="createSubscription()" class="d-flex flex-column flex-grow-1">
							<div class="flex-grow-1">
								<div class="form-group">
									<label class="form-label">Customer</label>
									<vue-select v-model="newSubscriptionForm.contact_id" :options="stripeCustomers" searchable required placeholder="Find customer"></vue-select>
								</div>
								<div class="form-group">
									<label class="form-label">Booking Types</label>
									<vue-select v-model="newSubscriptionForm.services" :options="servicesList" multiple required placeholder="Select booking type"></vue-select>
									<div v-for="(service, index) in newSubscriptionForm.services" :key="service.id" class="my-2 bg-light rounded p-2 position-relative">
										<button type="button" class="btn close p-0 line-height-0 mr-n1" @click="newSubscriptionForm.services.splice(index, 1)"><close-icon></close-icon></button>
										<strong class="d-block mb-1">{{ service.name }}</strong>
										<label class="form-label">Rate per session (Default pricing: ${{ newSubscriptionForm.services[index].default_rate }})</label>
										<input type="number" min="1" step="0.01" v-model="newSubscriptionForm.services[index].rate" class="form-control" placeholder="Rate per session" data-required>

										<label class="form-label d-block mt-2">Booking frequency</label>
										<div class="form-row align-items-center">
											<div class="col">
												<input type="number" min="1" class="form-control" v-model="newSubscriptionForm.services[index].frequency" placeholder="Maximum interval bookings" data-required>
											</div>
											<span class="text-secondary">sessions per</span>
											<div class="col">
												<select class="form-control" data-required v-model="newSubscriptionForm.services[index].frequency_interval">
													<option value="day">Day</option>
													<option value="week">Week</option>
													<option value="month">Month</option>
												</select>
											</div>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="form-label">Recurring Frequency</label>
									<vue-select v-model="newSubscriptionForm.recurring_frequency" :options="recurringOptions" required placeholder="Choose interval"></vue-select>
								</div>
								<div class="form-group">
									<label class="form-label">Start Date</label>
									<v-date-picker v-model="newSubscriptionForm.date" :input-props='{class: "form-control cursor-pointer bg-white",placeholder: "Select start date", readonly: true, "data-required": true}' :popover="{ placement: 'bottom', visibility: 'click' }" :min-date="new Date()"></v-date-picker>
								</div>

								<label class="form-label d-block mt-2">Subscription Duration</label>
								<div class="form-row align-items-center">
									<div class="col">
										<input type="number" min="1" class="form-control" v-model="newSubscriptionForm.duration" data-required>
									</div>
									<div class="col">
										<select class="form-control" data-required v-model="newSubscriptionForm.duration_frequency">
											<option value="month">Months</option>
											<option value="year">Years</option>
										</select>
									</div>
								</div>
								<div class="form-group text-right mt-4">
									<label class="form-label">Total:</label>
									<strong>${{ subscriptionTotal }}</strong>/{{ newSubscriptionForm.recurring_frequency }}
								</div>
							</div>
							<div class="d-flex align-items-center">
								<button type="button" class="btn btn-white border mr-1" :disabled="newSubscriptionForm.loading" @click="openInfo = false">Cancel</button>
								<vue-button type="submit" :loading="newSubscriptionForm.loading" button_class="ml-auto btn btn-primary">Create</vue-button>
							</div>
						</vue-form-validate>
					</div>
				</div>
			</div>
		</div>


		<modal ref="detailsModal" size="modal-lg">
			<template v-if="selectedSubscription">
				<span class="badge text-capitalize position-relative" :class="'badge-' + selectedSubscription.status">
					<span :class="{'opacity-0': selectedSubscription.statusLoading}">{{ selectedSubscription.plan ? selectedSubscription.status : 'Draft' }}</span>
					<div v-if="selectedSubscription.statusLoading" class="position-absolute-center">
						<div class="spinner-border spinner-border-sm text-primary"></div>
					</div>
				</span>
				<h6 class="font-heading mt-1 mb-3 h4">{{ selectedSubscription.id }}</h6>

				<div class="d-flex">
					<div class="w-50">
						<label class="d-block mb-0">Contact</label>
						<strong>{{ selectedSubscription.contact.contact_user.full_name }}</strong>
						<label class="d-block mb-0 mt-3">Services</label>
						<strong>{{ selectedSubscription.services }}</strong>
						<label class="d-block mb-0 mt-3">Amount</label>
						<strong>${{ ((selectedSubscription.plan || selectedSubscription).amount / 100).toFixed(2) }}</strong>
					</div>
					<div class="w-50">
						<label class="d-block mb-0 mt-3">Starts At</label>
						<strong>{{ selectedSubscription.current_period_start ? formatDate(selectedSubscription.current_period_start) : '-' }}</strong>
						<label class="d-block mb-0 mt-3">Next Invoice</label>
						<strong>{{ selectedSubscription.status == 'active' ? selectedSubscription.current_period_end ? timestampToDate(selectedSubscription.current_period_end, false) : '-' : '-' }}</strong>
					</div>
				</div>

				<label class="d-block mb-0 mt-3">Invoices</label>
				<div v-if="invoiceLoading" class="text-center py-3">
					<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
				</div>
				<div class="border p-1 rounded mt-2" v-else-if="selectedSubscription.latest_invoice">
					<table class="table table-sm table-borderless mb-0 p-0">
						<thead>
							<tr>
								<th class="pb-2">Amount</th>
								<th class="pb-2">Currency</th>
								<th class="pb-2">Status</th>
								<th class="pb-2">Invoice Number</th>
								<th class="pb-2">Created</th>
							</tr>
						</thead>
						<tbody class="shadow-none border-top">
							<tr>
								<td class="pt-2"><strong>${{ ((selectedSubscription.latest_invoice.amount || 0) / 100).toFixed(2) }}</strong></td>
								<td class="pt-2 text-uppercase">{{ selectedSubscription.latest_invoice.currency }}</td>
								<td class="pt-2 text-capitalize">
									<span class="badge text-capitalize" :class="'badge-' + selectedSubscription.latest_invoice.status">
										{{ selectedSubscription.latest_invoice.status }}
									</span>
								</td>
								<td class="pt-2 text-uppercase">{{ selectedSubscription.latest_invoice.number }}</td>
								<td class="pt-2 text-uppercase">{{ timestampToDate(selectedSubscription.latest_invoice.created) }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<span v-else>-</span>
			</template>
		</modal>

		<modal :close-button="false" ref="createSubscriptionModal" @hidden="resetSubscriptionForm()">
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="selectedSubscription">
				<h5 class="font-heading text-center">Delete Subscription</h5>
				<p class="text-center mt-3">
					Are you sure to delete this subscription? <br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-white border text-body" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-danger ml-auto" type="button" @click="deleteSubscription(selectedSubscription); $refs['deleteModal'].hide()">Delete</button>
				</div>
			</template>
		</modal>


		<modal ref="cancelModal" :close-button="false">
			<template v-if="selectedSubscription">
				<h5 class="font-heading text-center">Cancel Subscription</h5>
				<p class="text-center mt-3">
					Are you sure to cancel this subscription? <br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-white border text-body" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-danger ml-auto" type="button" @click="cancelSubscription(selectedSubscription); $refs['cancelModal'].hide()">Cancel Subscription</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./subscriptions.js"></script>
<style lang="scss" src="./subscriptions.scss"></style>