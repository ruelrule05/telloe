<template>
	<div class="overflow-hidden py-4 h-100 flex-grow-1 d-flex flex-column">
		<div v-if="invoices.length == 0" class="text-muted text-center p-4 position-absolute-center">
			<div class="h6 font-weight-normal mb-3">You don't have any invoices yet.</div>
			<button type="button" @click="$refs['createInvoiceModal'].show()" class="btn btn-white border d-inline-flex align-items-center">
				<plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon>New invoice
			</button>
		</div>

		<template v-else>
			<div class="px-4 d-flex flex-column h-100">
				<div class="d-flex align-items-center">
					<h4 class="font-heading mb-0">Invoices</h4>
					<button type="button" @click="$refs['createInvoiceModal'].show()" class="ml-auto btn btn-white d-flex align-items-center border">
						<plus-icon height="13" width="13" transform="scale(1.6)" class="mr-1"></plus-icon>New invoice
					</button>
				</div>

				<div class="flex-grow-1 overflow-auto">
					<table class="table table-borderless table-fixed-header mb-0">
						<thead>
							<tr>
								<th>Invoice #</th>
								<th>Amount</th>
								<th>Customer</th>
								<th>Status</th>
								<th>Date Created</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="invoice in invoices">
								<td class="align-middle text-muted">{{ invoice.number }}</td>
								<td class="align-middle">{{ (invoice.amount_due / 100).toFixed(2) }} <span class="text-uppercase text-muted">{{ invoice.currency }}</span></td>
								<td class="align-middle">{{ invoice.user_customer.customer.full_name }}</td>
								<td class="align-middle">
									<span class="badge bg-primary-light text-primary text-capitalize position-relative">
										<span :class="{'opacity-0': invoice.statusLoading}">{{ invoice.status }}</span>
										<div v-if="invoice.statusLoading" class="position-absolute-center">
											<div class="spinner-border spinner-border-sm text-primary"></div>
										</div>
									</span>
								</td>
								<td class="align-middle text-muted">{{ formatDate(invoice.created) }}</td>
								<td class="text-right align-middle">
									<div class="dropdown">
			                    		<button class="btn btn-white border p-1 line-height-0" data-toggle="dropdown" :disabled="invoice.statusLoading">
											<more-h-icon width="20" height="20"></more-h-icon>
			                    		</button>
										<div class="dropdown-menu dropdown-menu-right">
											<template v-if="invoice.status == 'draft'">
												<span class="dropdown-item d-flex align-items-center cursor-pointer" @click="finalizeInvoice(invoice)">
													<task-icon transform="scale(0.85)" class="ml-n2 mr-2"></task-icon>
													Finalize invoice
												</span>
											</template>
											<template v-else>
												<a target="_blank" :href="invoice.hosted_invoice_url" class="dropdown-item d-flex align-items-center">
													<shortcut-icon transform="scale(0.75)" class="ml-n2 mr-2"></shortcut-icon>
													Payment page
												</a>
												<a :href="invoice.invoice_pdf" download class="dropdown-item d-flex align-items-center">
													<arrow-down-icon class="ml-n2 mr-2"></arrow-down-icon>
													Download PDF
												</a>
											</template>
										</div>
			                    	</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</template>

		<modal :close-button="false" ref="createInvoiceModal" @hidden="resetInvoiceForm()">
			<h5 class="font-heading mb-3">Create Invoice</h5>
			<vue-form-validate @submit="createInvoice()">
				<div class="form-group">
					<label class="form-label">Customer</label>
					<vue-select v-model="newInvoiceForm.customer_id" :options="stripeCustomers" searchable required placeholder="Find customer"></vue-select>
				</div>
				<div class="form-group">
					<label class="form-label">Services</label>
					<vue-select v-model="newInvoiceForm.service_ids" :options="servicesList" multiple required placeholder="Select services"></vue-select>
				</div>
				<div class="form-group">
					<label class="form-label">Amount</label>
					<input type="number" step="0.01" class="form-control" data-required v-model="newInvoiceForm.amount" placeholder="Amount">
				</div>
				<div class="mt-4 d-flex align-items-center justify-content-end">
					<button type="button" class="btn btn-white mr-1" data-dismiss="modal" :disabled="newInvoiceForm.loading">Cancel</button>
					<vue-button type="submit" :loading="newInvoiceForm.loading" button_class="btn btn-primary">Create</vue-button>
				</div>
			</vue-form-validate>
		</modal>
	</div>
</template>

<script src="./invoices.js"></script>
<style scoped lang="scss" src="./invoices.scss"></style>