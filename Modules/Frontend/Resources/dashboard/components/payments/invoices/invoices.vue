<template>
	<div class="overflow-hidden h-100 flex-grow-1 d-flex flex-column" id="invoices">
		<template v-if="$root.auth.xero_token">
			<div v-if="chooseIntegration" class="position-absolute-center text-center">
				<xero-icon height="100"></xero-icon>
				<div class="mt-3">
					<button class="btn btn-white shadow-sm" type="button" @click="authenticateXero()" v-if="!$root.auth.xero_token">Connect to Xero</button>
				</div>
			</div>

			<template v-else>
				<div class="d-flex flex-column h-100 overflow-hidden">
					<div class="border-bottom bg-white p-3 d-flex align-items-center">
						<h5 class="font-heading mb-0">Invoices</h5>
						<div class="ml-auto">
							<button :data-intro="$root.intros.invoices_index.steps[1]" data-step="2" class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="$refs['createInvoiceModal'].show()">
								<plus-icon class="btn-icon"></plus-icon>
								New Invoice
							</button>
						</div>
					</div>

					<div class="flex-grow-1 d-flex h-100 overflow-hidden">
						<div class="d-flex overflow-hidden h-100 w-100">
							<div class="flex-column flex-grow-1 mt-2">
								<div v-if="chooseXeroTenant" class="position-absolute-center text-center">
									<h4 class="font-heading mb-3">Choose a Xero Organization</h4>
									<div v-if="xeroTenantsLoading" class="mt-4">
										<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
									</div>
									<div v-else-if="$root.auth.xero_token">
										<button type="button" class="btn btn-white mx-1 shadow-sm" @click="saveXeroTenant(tenant.tenantId)" v-for="tenant in xeroTenants" :key="tenant.tenantId">
											{{ tenant.tenantName }}
										</button>
									</div>
								</div>

								<template v-else>
									<div class="overflow-auto h-100 px-4 pb-4 pt-3">
										<div v-if="$root.auth.xero_token" class="d-flex align-items-center mb-3">
											<vue-select v-if="organizations.length > 0" :disabled="tableLoading" :options="organizations" button_class="btn btn-white shadow-sm" v-model="tenantId" label="Organization" @input="changeTenant()"></vue-select>
											<div class="ml-auto d-flex align-items-center">
												<paginate-links :key="invoices.length" :async="true" for="invoices" :show-step-links="true" :classes="{ ul: ['pagination', 'd-inline-flex', 'mb-0', 'shadow-sm'], li: ['page-item'], 'li > a': ['page-link', 'cursor-pointer'] }"></paginate-links>
												<vue-select :data-intro="$root.intros.invoices_index.steps[0]" data-step="1" :options="invoiceStatuses" button_class="ml-2 btn btn-white shadow-sm" v-model="invoiceStatus" label="Status"></vue-select>
											</div>
										</div>

										<template v-if="tableLoading">
											<div class="position-absolute-center">
												<div class="spinner-border text-primary" role="status"></div>
											</div>
										</template>
										<template v-else-if="$root.auth.xero_token">
											<table class="table table-borderless mb-0" v-if="invoices.length > 0">
												<thead>
													<tr>
														<th>Invoice #</th>
														<th>To</th>
														<th>Date</th>
														<th>Due Date</th>
														<th>Paid</th>
														<th>Due</th>
														<th>Status</th>
														<th>Sent</th>
													</tr>
												</thead>
												<paginate tag="tbody" name="invoices" :list="invoices" :per="15" ref="paginate">
													<template v-for="invoice in paginated('invoices')">
														<tr :key="invoice.id" v-if="invoiceStatus == 'all' || invoice.Status.toLowerCase() == invoiceStatus.toLowerCase()">
															<td>{{ invoice.InvoiceNumber }}</td>
															<td>{{ invoice.Contact.Name }}</td>
															<td>{{ invoice.Date }}</td>
															<td>{{ invoice.DueDate }}</td>
															<td>{{ invoice.AmountPaid }}</td>
															<td>{{ invoice.AmountDue }}</td>
															<td>{{ invoice.Status }}</td>
															<td><checkmark-icon v-if="invoice.SentToContact && invoice.SentToContact != 'false'" class="fill-success"></checkmark-icon></td>
														</tr>
													</template>
												</paginate>
											</table>

											<div v-else class="text-muted text-center position-absolute-center w-100">
												<div class="h6 text-secondary font-weight-normal mb-0">No invoices found.</div>
											</div>
										</template>
										<template v-else-if="!$root.auth.xero_token">
											<table class="table table-borderless mb-0" v-if="pending_invoices.length > 0">
												<thead>
													<tr>
														<th>Invoice #</th>
														<th>Contact</th>
														<th>Amount</th>
														<th>Date</th>
													</tr>
												</thead>
												<paginate tag="tbody" name="invoices" :list="pending_invoices" :per="15" ref="paginate">
													<template v-for="invoice in paginated('invoices')">
														<tr :key="invoice.id">
															<td>{{ invoice.id }}</td>
															<td>{{ invoice.contact.contact_user.full_name }}</td>
															<td>{{ invoice.currency }} {{ format()(invoice.amount) }}</td>
															<td>{{ formatDate(invoice.created_at) }}</td>
														</tr>
													</template>
												</paginate>
											</table>

											<div v-else class="text-muted text-center position-absolute-center w-100">
												<div class="h6 text-secondary font-weight-normal mb-0">No invoices found.</div>
											</div>
										</template>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>

				<modal :close-button="false" ref="createInvoiceModal" @hidden="resetInvoiceForm()">
					<h4 class="font-heading mb-3">Create Invoice</h4>
					<vue-form-validate @submit="createInvoice()" class="d-flex flex-column flex-grow-1">
						<div class="flex-grow-1">
							<div class="form-group">
								<label class="form-label">Contact</label>
								<vue-select v-model="newInvoiceForm.contact_id" button_class="form-control" :options="stripeContacts" searchable required placeholder="Find contact"></vue-select>
							</div>
							<div class="form-group">
								<label class="form-label">Amount</label>
								<input type="number" step="0.01" class="form-control" data-required v-model="newInvoiceForm.amount" placeholder="Amount" />
							</div>
							<div class="form-group">
								<label class="form-label">Currency</label>
								<vue-select v-model="newInvoiceForm.currency" button_class="form-control" :options="currencies" searchable required placeholder="Set currency"></vue-select>
							</div>
							<div class="form-group">
								<label class="form-label">Booking Types (Optional)</label>
								<vue-select v-model="newInvoiceForm.service_ids" :options="servicesList" button_class="form-control" multiple placeholder="Select booking type"></vue-select>
							</div>
						</div>
						<div class="d-flex align-items-center mt-2">
							<button type="button" data-dismiss="modal" class="btn btn-light shadow-none" :disabled="newInvoiceForm.loading">Cancel</button>
							<vue-button type="submit" :loading="newInvoiceForm.loading" button_class="ml-auto btn btn-primary">Create</vue-button>
						</div>
					</vue-form-validate>
				</modal>

				<modal ref="deleteModal" :close-button="false">
					<template v-if="selectedInvoice">
						<h5 class="font-heading text-center">Delete Invoice</h5>
						<p class="text-center mt-3">
							Are you sure to delete this invoice?
							<br />
							<span class="text-danger">This action cannot be undone</span>
						</p>
						<div class="d-flex justify-content-end">
							<button class="btn btn-white border text-body" type="button" data-dismiss="modal">Cancel</button>
							<button
								class="btn btn-danger ml-auto"
								type="button"
								@click="
									deleteInvoice(selectedInvoice);
									$refs['deleteModal'].hide();
								"
							>
								Delete
							</button>
						</div>
					</template>
				</modal>
			</template>
		</template>

		<div v-else class="position-absolute-center text-center">
			<xero-icon width="100" height="100"></xero-icon>
			<div class="mt-3 mb-2 text-muted">
				Integrate Xero to sync your invoices
			</div>
			<router-link to="/dashboard/integrations" class="btn btn-white shadow-sm">Integrations</router-link>
		</div>
	</div>
</template>

<script src="./invoices.js"></script>
<style lang="scss" src="./invoices.scss"></style>
