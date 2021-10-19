<template>
	<div class="min-h-screen flex flex-col relative">
		<div v-if="$root.auth.stripe_account">
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
				<div class="ml-7 lg:ml-0">
					SUBSCRIPTIONS
				</div>

				<button
					class="btn btn-primary btn-md flex items-center"
					type="button"
					@click="
						resetInvoiceForm();
						$refs.createSubscriptionModal.show();
					"
				>
					<span>New</span>
					<span class="ml-1 hidden md:block">Subscription</span>
				</button>
			</div>
			<div class="h-20 lg:hidden block" />

			<div v-if="banner" class="p-8 border-bottom">
				<div class="bg-primary-ultralight rounded-xl flex p-6 flex-col md:flex-row relative">
					<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">
						CREATE A SUBSCRIPTION
					</div>
					<div class="w-full md:w-7/12 ml-0 md:ml-20">
						<p class="text-muxted mb-4">
							Create a subscription to make a group of events and do the billing for all your events in a monthly system.
						</p>
						<button
							class="btn btn-md btn-outline-primary"
							type="button"
							@click="
								resetInvoiceForm();
								$refs.createSubscriptionModal.show();
							"
						>
							<span>CREATE A SUBSCRIPTION</span>
						</button>
					</div>
					<div class="font-serif absolute top-5 right-6">
						<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
					</div>
				</div>
			</div>
			
			<div v-show="!loading">
				<div v-if="subscriptions.length > 0" class="px-6 pb-6">
					<div class="subscriptions-table">
						<table class="table table-fixed my-6 text-sm text-left">
							<thead>
								<tr>
									<th>Subscription ID</th>
									<th>Contact</th>
									<th>Status</th>
									<th>Amount</th>
									<th>Interval</th>
									<th>Services</th>
								</tr>
							</thead>
							<paginate tag="tbody" name="subscriptions" :list="subscriptions" :per="15" ref="paginate">
								<template v-for="subscription in paginated('subscriptions')">
									<tr v-if="subscription.contact" :key="subscription.id">
										<td class="align-middle text-primary font-bold uppercase ">{{ subscription.subscription_id }}</td>
										<td>{{ subscription.contact.full_name }}</td>
										<td class="capitalize">{{ subscription.status }}</td>
										<td class="uppercase">{{ subscription.currency }} {{ parseFloat(subscription.amount).toFixed(2) }}</td>
										<td class="capitalize">{{ subscription.interval }}</td>
										<td class="capitalize">
											{{ subscription.services.map(s => s.name).join(', ') }}
										</td>
										<td class="text-right align-middle">
											<div class="text-left inline-block">
												<VueDropdown :options="subscriptionStatuses" @click="subscriptionAction($event, subscription)" class="ml-1">
													<template #button>
														<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
															<CogIcon class="fill-current text-gray-400"></CogIcon>
														</div>
													</template>
												</VueDropdown>
											</div>
										</td>
									</tr>
								</template>
							</paginate>
						</table>
					</div>

					<paginate-links
						:step-links="{
							next: 'Next',
							prev: 'Previous'
						}"
						:key="subscriptions.length"
						:async="true"
						for="subscriptions"
						:show-step-links="true"
					></paginate-links>
				</div>

				<div v-else class="text-center absolute-center w-full">
					<div class="text-muted ">No subscriptions found.</div>
				</div>
			</div>
		</div>
		<div v-else class="absolute-center p-8 bg-secondary rounded-xl flex items-start" style="width: 450px">
			<div class="text-primary">
				<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
			</div>
			<div class="pl-4 -mt-1">
				<p>You haven't completed your payout account details yet.</p>
				<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="$router.push('/dashboard/account')"><span>Go To Account</span></button>
			</div>
		</div>

		<Modal ref="createSubscriptionModal" size="sm" :noBackdropHide="true">
			<h4 class="font-serif uppercase font-semibold mb-4">CREATE SUBSCRIPTION</h4>
			<vue-form-validate @submit="createSubscription()">
				<div class="mb-4">
					<label>Contact</label>
					<vue-select v-model="newSubscriptionForm.contact_id" button_class="form-control" :options="stripeContacts" searchable required placeholder="Find contact"></vue-select>
				</div>
				<div class="mb-4">
					<label>Amount</label>
					<input type="number" step="0.01" class="form-control" data-required v-model="newSubscriptionForm.amount" placeholder="Amount" />
				</div>
				<div class="mb-4">
					<label>Recurring</label>
					<vue-select v-model="newSubscriptionForm.recurring" button_class="form-control" :options="recurringOptions" searchable required placeholder="Recurring"></vue-select>
				</div>
				<div class="mb-4">
					<label>Booking Types (Optional)</label>
					<multiselect v-model="newSubscriptionForm.service_ids" label="name" track-by="name" :options="servicesList" :showLabels="false" placeholder="" multiple>
						<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
						<span slot="noResult" class="text-muted text-sm">No services found.</span>
					</multiselect>
				</div>
				<div class="flex justify-between mt-6">
					<button type="button" class="btn btn-md btn-outline-primary" :disabled="newSubscriptionForm.loading" @click="$refs.createSubscriptionModal.hide(true)"><span>Cancel</span></button>
					<vue-button type="submit" :loading="newSubscriptionForm.loading" class="btn btn-md btn-primary"><span>Create</span></vue-button>
				</div>
			</vue-form-validate>
		</Modal>
	</div>
</template>

<script src="./subscriptions.js"></script>
<style lang="scss" src="./subscriptions.scss" scoped></style>
