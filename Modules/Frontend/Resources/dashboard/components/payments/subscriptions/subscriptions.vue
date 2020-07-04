<template>
	<div class="overflow-hidden py-4 h-100 flex-grow-1 d-flex flex-column">
		<div v-if="$root.payoutComplete">
			<div v-if="subscriptions.length == 0" class="text-muted text-center p-4 position-absolute-center">
				<div class="h6 font-weight-normal mb-3">You don't have any subscriptions yet.</div>
				<button type="button" @click="$refs['createSubscriptionModal'].show()" class="btn border btn-white d-inline-flex align-items-center">
					<plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon>New subscription
				</button>
			</div>

			<template v-else>
				<div class="px-4 d-flex flex-column h-100">
					<div class="d-flex align-items-center">
						<h4 class="font-heading mb-0">Subscriptions</h4>
						<button type="button" @click="$refs['createSubscriptionModal'].show()" class="ml-auto btn btn-white d-flex align-items-center border">
							<plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon>New subscription
						</button>
					</div>

					<div class="flex-grow-1 overflow-auto">
						<table class="table table-borderless table-fixed-header mb-0">
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
									<td class="align-middle text-muted">{{ subscription.id }}</td>
									<td class="align-middle">{{ (subscription.plan.amount / 100).toFixed(2) }} <span class="text-uppercase text-muted">{{ subscription.plan.currency }}</span><span class="text-muted">/{{subscription.plan.interval}}</span></td>
									<td class="align-middle">{{ subscription.user_customer.customer.full_name }}</td>
									<td class="align-middle">
										<span class="badge bg-primary-light text-primary text-capitalize position-relative">
											<span :class="{'opacity-0': subscription.statusLoading}">{{ subscription.status }}</span>
											<div v-if="subscription.statusLoading" class="position-absolute-center">
												<div class="spinner-border spinner-border-sm text-primary"></div>
											</div>
										</span>
									</td>
									<td class="align-middle text-muted">{{ formatDate(subscription.created) }}</td>
									<td class="text-right align-middle">
										<div class="dropdown">
				                    		<button class="btn btn-white border p-1 line-height-0" data-toggle="dropdown" :disabled="subscription.statusLoading">
												<more-h-icon width="20" height="20"></more-h-icon>
				                    		</button>
											<div class="dropdown-menu dropdown-menu-right">
												
											</div>
				                    	</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</template>

			<modal :close-button="false" ref="createSubscriptionModal" @hidden="resetSubscriptionForm()">
				<h5 class="font-heading mb-3">Create subscription</h5>
				<vue-form-validate @submit="createSubscription()">
					<div class="form-group">
						<label class="form-label">Customer</label>
						<vue-select v-model="newSubscriptionForm.customer_id" :options="stripeCustomers" searchable required placeholder="Find customer"></vue-select>
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
		</div>

		<div v-else class="text-muted text-center p-4 position-absolute-center">
			<div class="h6 font-weight-normal mb-3">Please complete your payout information before creating a subscription.</div>
			<router-link to="/dashboard/account" type="button" @click="$refs['createSubscriptionModal'].show()" class="btn border btn-white">
				Go to account
			</router-link>
		</div>
	</div>
</template>

<script src="./subscriptions.js"></script>
<style scoped lang="scss" src="./subscriptions.scss"></style>