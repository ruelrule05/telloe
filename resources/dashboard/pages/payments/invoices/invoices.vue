<template>
	<div class="min-h-screen flex flex-col relative">
		<div v-if="$root.auth.stripe_account">
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
				<div class="ml-7 lg:ml-0">
					INVOICES
				</div>

				<button
					class="btn btn-primary btn-md flex items-center"
					type="button"
					@click="
						resetInvoiceForm();
						$refs.createInvoiceModal.show();
					"
				>
					<span>New</span>
					<span class="ml-1 hidden md:block">Invoice</span>
				</button>
			</div>
			<div class="h-20 lg:hidden block" />

			<div v-if="banner && !$root.auth.stripe_account" class="p-8 border-bottom">
				<div class="bg-primary-ultralight rounded-xl flex p-6 flex-col md:flex-row relative">
					<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">
						CREATE INVOICES FOR CONTACTS
					</div>
					<div class="w-full md:w-7/12 ml-0 md:ml-20">
						<p class="text-muxted mb-4">
							Use invoices to bill your contacts once they have booked an event.
						</p>
						<button class="btn btn-md btn-outline-primary" type="button" @click="$router.push('/dashboard/account?tab=payout')">
							<span>SETUP YOUR PAYMENT INFORMATION</span>
						</button>
					</div>
					<div class="font-serif absolute top-5 right-6">
						<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
					</div>
				</div>
			</div>
			<div v-show="!loading">
				<div v-if="invoices.length > 0" class="px-6 pb-6">
					<div class="invoices-table">
						<table class="table my-6">
							<thead>
								<tr>
									<th>Invoice No.</th>
									<th>To</th>
									<th>Date</th>
									<th>Due Date</th>
									<th>Paid</th>
									<th>Due</th>
									<th>Status</th>
								</tr>
							</thead>
							<paginate tag="tbody" name="invoices" :list="invoices" :per="15" ref="paginate">
								<template v-for="invoice in paginated('invoices')">
									<tr :key="invoice.InvoiceID">
										<td class="align-middle text-primary font-bold">{{ invoice.number }}</td>
										<td class="align-middle text-gray-600">{{ invoice.customer_name }}</td>
										<td class="align-middle text-gray-600">{{ formatDate(invoice.created) }}</td>
										<td class="align-middle text-gray-600">{{ formatDate(invoice.due_date) }}</td>
										<td class="align-middle">{{ getSymbolFromCurrency(invoice.currency) }}{{ format({ padRight: 2 })(invoice.amount_paid / 100) }}</td>
										<td class="align-middle">{{ getSymbolFromCurrency(invoice.currency) }}{{ format({ padRight: 2 })(invoice.amount_due / 100) }}</td>
										<td class="align-middle">
											<div v-if="invoice.statusLoading" class="spinner spinner-sm"></div>
											<span v-else class="badge capitalize">{{ invoice.status }}</span>
										</td>
										<td class="text-right align-middle">
											<div v-if="stripeInvoiceStatuses(invoice).length > 0" class="text-left inline-block">
												<VueDropdown :options="stripeInvoiceStatuses(invoice)" @click="invoiceAction($event, invoice)" class="ml-1" v-show="!invoice.statusLoading">
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
						:key="invoices.length"
						:async="true"
						for="invoices"
						:show-step-links="true"
					></paginate-links>
				</div>

				<div v-else class="text-center absolute-center w-full">
					<div class="text-muted ">No invoices found.</div>
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

		<Modal ref="createInvoiceModal" size="sm" :noBackdropHide="true">
			<h4 class="font-serif uppercase font-semibold mb-4">CREATE INVOICE</h4>
			<vue-form-validate @submit="createInvoice()">
				<div class="mb-4">
					<label>Contact</label>
					<vue-select v-model="newInvoiceForm.contact_id" button_class="form-control" :options="stripeContacts" searchable required placeholder="Find contact"></vue-select>
				</div>
				<div class="mb-4">
					<label>Amount</label>
					<input type="number" step="0.01" class="form-control" data-required v-model="newInvoiceForm.amount" placeholder="Amount" />
				</div>
				<div class="mb-4">
					<label>Currency</label>
					<vue-select v-model="newInvoiceForm.currency" button_class="form-control" :options="currencies" searchable required placeholder="Set currency"></vue-select>
				</div>
				<div class="mb-4">
					<label>Booking Types (Optional)</label>
					<multiselect v-model="newInvoiceForm.service_ids" label="name" track-by="name" :options="servicesList" :showLabels="false" placeholder="" multiple>
						<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
						<span slot="noResult" class="text-muted text-sm">No services found.</span>
					</multiselect>
				</div>
				<div class="flex justify-between mt-6">
					<button type="button" class="btn btn-md btn-outline-primary" :disabled="newInvoiceForm.loading" @click="$refs.createInvoiceModal.hide(true)"><span>Cancel</span></button>
					<vue-button type="submit" :loading="newInvoiceForm.loading" class="btn btn-md btn-primary"><span>Create</span></vue-button>
				</div>
			</vue-form-validate>
		</Modal>
	</div>
</template>

<script src="./invoices.js"></script>
<style lang="scss" src="./invoices.scss" scoped></style>
