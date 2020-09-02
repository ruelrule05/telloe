	<template>
	<div class="overflow-hidden h-100 flex-grow-1 d-flex flex-column" id="invoices">
		<div class="d-flex flex-column h-100 overflow-hidden">
			<div class="border-bottom bg-white p-3 d-flex align-items-center">
				<h5 class="font-heading mb-0">Invoices</h5>
				<div class="ml-auto d-flex align-items-center">
					<paginate-links :key="invoices.length" :async="true" for="invoices" :show-step-links="true" :classes="{'ul': ['pagination', 'd-inline-flex', 'mb-0'], 'li': ['page-item', !hasInvoices ? 'disabled': 'page-item'], 'li > a': ['page-link', 'cursor-pointer']}"></paginate-links>
					<div class="d-inline-flex align-items-center mx-2">
						<vue-select :options="invoiceStatuses" button_class="border-0 bg-light shadow-none select-flex" v-model="invoiceStatus" label="Status"></vue-select>
					</div>
                    <button class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="openInfo = true">
                        <plus-icon class="btn-icon"></plus-icon>
                        New Invoice
                    </button>
				</div>
			</div>

			<div class="flex-grow-1 d-flex h-100 pb-4 overflow-hidden">
				<div class="d-flex overflow-hidden h-100 w-100">
					<div class="d-flex flex-column flex-grow-1 px-4 mt-2">
						<div class="overflow-auto h-100" v-if="invoices.length > 0" :class="{'d-none': !hasInvoices}">
							<table class="table table-borderless table-fixed-header mb-0">
								<thead>
									<tr>
										<th>Invoice ID</th>
										<th>Amount</th>
										<th>Contact</th>
										<th>Status</th>
										<th>Date Created</th>
										<th></th>
									</tr>
								</thead>
								<paginate tag="tbody" name="invoices" :list="invoices" :per="15" ref="paginate">
									<tr v-for="invoice in paginated('invoices')" v-if="!invoice.placeholder">
										<td class="align-middle text-gray-500">
											{{ invoice.is_pending ? 'Not available' : invoice.number || '-' }}
											<router-link to="/dashboard/account?tab=payout" v-if="invoice.is_pending && !$root.payoutComplete" v-tooltip.right="'Please complete your payout account <br /> to create active subscriptions.'" class="badge badge-pill shadow-none py-0 px-1 badge-dark border-0 badge-sm cursor-pointer"><small>?</small></router-link>
										</td>
										<td class="align-middle">{{ ((invoice.amount_due || invoice.amount) / 100).toFixed(2) }} <span class="text-uppercase text-muted">{{ getCurrency(invoice) }}</span></td>
										<td class="align-middle">{{ invoice.contact.contact_user.full_name }}</td>
										<td class="align-middle">
											<span class="badge bg-primary-light text-primary text-capitalize position-relative">
												<span :class="{'opacity-0': invoice.statusLoading}">{{ invoice.status || 'Pending' }}</span>
												<div v-if="invoice.statusLoading" class="position-absolute-center">
													<div class="spinner-border spinner-border-sm text-primary"></div>
												</div>
											</span>
										</td>
										<td class="align-middle text-muted">{{ formatDate(invoice.created) }}</td>
										<td class="text-right align-middle">
											<div class="dropleft">
					                    		<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown" :disabled="invoice.statusLoading">
													<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
					                    		</button>
												<div class="dropdown-menu dropdown-menu-right">
													<template v-if="invoice.is_pending">
														<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="draftInvoice(invoice)">
															<task-icon transform="scale(0.85)" class="ml-n2 mr-2 fill-secondary"></task-icon>
															Create draft
														</span>
														<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="selectedInvoice = invoice; $refs['deleteModal'].show()">
															<trash-icon transform="scale(0.85)" class="ml-n2 mr-2 fill-secondary"></trash-icon>
															Delete
														</span>
													</template>
													<template v-else>
														<template v-if="invoice.status == 'draft'">
															<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="finalizeInvoice(invoice)">
																<task-icon transform="scale(0.85)" class="ml-n2 mr-2 fill-secondary"></task-icon>
																Finalize Invoice
															</span>
														</template>
														<template v-else>
															<a target="_blank" :href="invoice.hosted_invoice_url" class="dropdown-item d-flex align-items-center">
																<shortcut-icon transform="scale(0.75)" class="ml-n2 mr-2 fill-secondary"></shortcut-icon>
																Payment page
															</a>
															<a :href="invoice.invoice_pdf" download class="dropdown-item d-flex align-items-center">
																<arrow-down-icon class="ml-n2 mr-2 fill-secondary"></arrow-down-icon>
																Download PDF
															</a>
														</template>
													</template>
												</div>
					                    	</div>
										</td>
									</tr>
								</paginate>
							</table>
						</div>
						<div v-if="invoices.length == 0 || !hasInvoices" class="text-muted text-center position-absolute-center">
							<div class="h6 text-secondary font-weight-normal mb-0">No invoices found.</div>
						</div>
					</div>

					<div class="info bg-white h-100 border-left p-3 overflow-auto d-flex flex-column" :class="{'open': openInfo}">
						<h5 class="font-heading mb-3">Create Invoice</h5>
						<vue-form-validate @submit="createInvoice()" class="d-flex flex-column flex-grow-1">
							<div class="flex-grow-1">
								<div class="form-group">
									<label class="form-label">Contact</label>
									<vue-select v-model="newInvoiceForm.contact_id" :options="stripeContacts" searchable required placeholder="Find contact"></vue-select>
								</div>
								<div class="form-group">
									<label class="form-label">Amount</label>
									<input type="number" step="0.01" class="form-control" data-required v-model="newInvoiceForm.amount" placeholder="Amount">
								</div>
								<div class="form-group">
									<label class="form-label">Booking Types (Optional)</label>
									<vue-select v-model="newInvoiceForm.service_ids" :options="servicesList" multiple placeholder="Select booking type"></vue-select>
								</div>
							</div>
							<div class="d-flex align-items-center">
								<button type="button" class="btn btn-white mr-1 border" :disabled="newInvoiceForm.loading" @click="openInfo = false">Cancel</button>
								<vue-button type="submit" :loading="newInvoiceForm.loading" button_class="ml-auto btn btn-primary">Create</vue-button>
							</div>
						</vue-form-validate>
					</div>
				</div>
				
			</div>
		</div>

		<modal :close-button="false" ref="createInvoiceModal" @hidden="resetInvoiceForm()">
			
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="selectedInvoice">
				<h5 class="font-heading text-center">Delete Invoice</h5>
				<p class="text-center mt-3">
					Are you sure to delete this invoice? <br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-white border text-body" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-danger ml-auto" type="button" @click="deleteInvoice(selectedInvoice); $refs['deleteModal'].hide()">Delete</button>
				</div>
			</template>
		</modal>

	</div>
</template>

<script src="./invoices.js"></script>
<style lang="scss" src="./invoices.scss"></style>