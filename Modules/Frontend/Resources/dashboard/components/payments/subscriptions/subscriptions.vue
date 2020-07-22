<template>
	<div class="overflow-hidden h-100 flex-grow-1 d-flex flex-column">
		<div class="d-flex flex-column h-100">
			<div class="border-bottom bg-white p-3 d-flex align-items-center">
				<h5 class="font-heading mb-0">Subscriptions</h5>
				<div class="ml-auto d-flex align-items-center">
                    <button class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="$refs['createSubscriptionModal'].show()">
                        <plus-icon class="btn-icon"></plus-icon>
                        New Subscription
                    </button>
				</div>
			</div>

			<div class="flex-grow-1 overflow-auto px-4 py-2">
				<table v-if="subscriptions.length > 0" class="table table-borderless table-fixed-header mb-0">
					<thead>
						<tr>
							<th>Subscription ID</th>
							<th>Amount</th>
							<th>Customer</th>
							<th>Status</th>
							<th>Date Created</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="subscription in subscriptions">
							<td class="align-middle text-muted">
								{{ subscription.plan ? subscription.id : 'Not available' }}
								<router-link to="/dashboard/account?tab=payout" v-if="!subscription.plan && !$root.payoutComplete" v-tooltip.right="'Please complete your payout account <br /> to create active subscriptions.'" class="badge badge-pill shadow-none py-0 px-1 badge-dark border-0 badge-sm cursor-pointer"><small>?</small></router-link>
							</td>
							<td class="align-middle">
								{{ ((subscription.plan || subscription).amount / 100).toFixed(2) }} 
								<span class="text-uppercase text-muted">{{ getCurrency(subscription) }}</span><span class="text-muted">/{{subscription.plan ? subscription.plan.interval : 'month'}}</span>
							</td>
							<td class="align-middle">{{ subscription.contact.contact_user.full_name }}</td>
							<td class="align-middle">
								<span class="badge bg-primary-light text-primary text-capitalize position-relative">
									<span :class="{'opacity-0': subscription.statusLoading}">{{ subscription.plan ? subscription.status : 'Draft' }}</span>
									<div v-if="subscription.statusLoading" class="position-absolute-center">
										<div class="spinner-border spinner-border-sm text-primary"></div>
									</div>
								</span>
							</td>
							<td class="align-middle text-muted">{{ subscription.plan ? formatDate(subscription.created) : subscription.created_at }}</td>
							<td class="text-right align-middle">
								<div v-if="subscription.status != 'canceled'" class="dropleft">
		                    		<button class="btn btn-white border p-1 line-height-0" data-toggle="dropdown" :disabled="subscription.statusLoading">
										<more-h-icon width="20" height="20"></more-h-icon>
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
					</tbody>
				</table>

				<div v-else class="text-muted text-center position-absolute-center">
					<div class="h6 text-secondary font-weight-normal mb-0">You don't have any subscriptions yet.</div>
				</div>
			</div>
		</div>

		<modal :close-button="false" ref="createSubscriptionModal" @hidden="resetSubscriptionForm()">
			<h5 class="font-heading mb-3">Create subscription</h5>
			<vue-form-validate @submit="createSubscription()">
				<div class="form-group">
					<label class="form-label">Customer</label>
					<vue-select v-model="newSubscriptionForm.contact_id" :options="stripeCustomers" searchable required placeholder="Find customer"></vue-select>
				</div>
				<div class="form-group">
					<label class="form-label">Services</label>
					<vue-select v-model="newSubscriptionForm.service_ids" :options="servicesList" multiple required placeholder="Select services"></vue-select>
					<div v-for="service_id in newSubscriptionForm.service_ids" class="my-2">
						<strong class="d-block">{{ getServiceName(service_id) }}</strong>
						<div class="form-inline">
							<input type="number" min="1" class="form-control" v-model="newSubscriptionForm.service_bookings[service_id]" placeholder="Monthly bookings" data-required>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label class="form-label">Amount</label>
					<input type="number" step="0.01" class="form-control" data-required v-model="newSubscriptionForm.amount" placeholder="Amount">
				</div>
				<div class="mt-4 d-flex align-items-center justify-content-end">
					<button type="button" class="btn btn-white border mr-1" data-dismiss="modal" :disabled="newSubscriptionForm.loading">Cancel</button>
					<vue-button type="submit" :loading="newSubscriptionForm.loading" button_class="btn btn-primary">Create</vue-button>
				</div>
			</vue-form-validate>
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
<style scoped lang="scss" src="./subscriptions.scss"></style>