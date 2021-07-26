<template>
	<div class="min-h-screen flex flex-col">
		<div class="content-header border-bottom flex items-center justify-between">
			<div>XERO INVOICING</div>

			<button
				class="btn btn-primary btn-md"
				type="button"
				@click="
					resetInvoiceForm();
					$refs['createInvoiceModal'].show();
				"
			>
				<span>New Invoice</span>
			</button>
		</div>

		<div v-if="$root.auth.xero_token" class="flex-grow relative">
			<div v-if="chooseXeroTenant" class="absolute-center">
				<div class="flex w-full p-8 mb-4 rounded-xl pb-9 bg-secondary-light">
					<div class="w-16 image">
						<img src="/logos/xero.png" alt="Zoom" height="80" />
					</div>
					<div class="flex-1 ml-6">
						<p class="mb-1 font-bold">Xero</p>
						<h4 class="font-heading mb-3 text-muted">Choose your Xero Organization you wish to integrate. Don’t worry, you can change this later.</h4>
						<div v-if="xeroTenantsLoading" class="mt-4">
							<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
						</div>
						<div v-else-if="$root.auth.xero_token">
							<div class="border-bottom py-3 cursor-pointer transition-colors hover:bg-gray-100" @click="saveXeroTenant(tenant.tenantId)" v-for="tenant in xeroTenants" :key="tenant.tenantId">
								{{ tenant.tenantName }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-else class="p-8">
				<div class="flex items-center mb-3">
					<vue-select v-if="organizations.length > 0" :disabled="tableLoading" :options="organizations" v-model="tenantId" label="Organization" @input="changeTenant()"></vue-select>
					<vue-select :options="invoiceStatuses" class="ml-6" v-model="invoiceStatus" label="Status"></vue-select>
				</div>

				<template v-if="tableLoading">
					<div class="position-absolute-center">
						<div class="spinner-border text-primary" role="status"></div>
					</div>
				</template>
				<template v-else-if="$root.auth.xero_token">
					<table class="table my-6" v-if="invoices.length > 0">
						<thead>
							<tr>
								<th>Invoice No.</th>
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
								<tr :key="invoice.InvoiceID" v-if="invoiceStatus == 'all' || invoice.Status.toLowerCase() == invoiceStatus.toLowerCase()">
									<td class="align-middle text-primary font-bold">{{ invoice.InvoiceNumber }}</td>
									<td class="align-middle text-gray-600">{{ invoice.Contact.Name }}</td>
									<td class="align-middle">{{ formatDate(invoice.Date) }}</td>
									<td class="align-middle">{{ formatDate(invoice.DueDate) }}</td>
									<td class="align-middle">{{ getSymbolFromCurrency(invoice.CurrencyCode) }}{{ format({ padRight: 2 })(invoice.AmountPaid) }}</td>
									<td class="align-middle">{{ getSymbolFromCurrency(invoice.CurrencyCode) }}{{ format({ padRight: 2 })(invoice.AmountDue) }}</td>
									<td class="align-middle">
										<div v-if="invoice.statusLoading" class="spinner spinner-sm"></div>
										<span v-else class="badge">{{ invoice.Status }}</span>
									</td>
									<td class="align-middle"><CheckmarkIcon v-if="invoice.SentToContact && invoice.SentToContact != 'false'" class="stroke-current text-green-500"></CheckmarkIcon></td>

									<td class="text-right align-middle">
										<div class="text-left inline-block">
											<VueDropdown :options="xeroInvoiceStatuses[invoice.Status]" @click="invoiceAction($event, invoice)" class="ml-1" v-show="!invoice.statusLoading">
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

					<div v-else class="text-center absolute-center w-full">
						<div class="text-muted ">No invoices found.</div>
					</div>
				</template>

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

			<Modal ref="editModal">
				<vue-form-validate v-if="invoiceToEdit" @submit="updateInvoice(invoiceToEdit)">
					<h5 class="font-heading">Edit Invoice {{ invoiceToEdit.InvoiceNumber }}</h5>
					<div class="mb-4">
						<label>Description</label>
						<textarea rows="3" placeholder="Line description..." class="form-control resize-none" data-required v-model="invoiceToEdit.description"></textarea>
					</div>
					<div class="d-flex justify-content-end">
						<button class="btn btn-light shadow-none text-body" type="button" data-dismiss="modal">Cancel</button>
						<button class="btn btn-primary ml-auto" type="submit">
							Submit
						</button>
					</div>
				</vue-form-validate>
			</Modal>

			<Modal ref="voidModal">
				<template v-if="invoiceToVoid">
					<h4 class="font-serif uppercase font-semibold mb-4 text-center">VOID INVOICE</h4>
					<p class="text-center mt-3">
						Are you sure to void this invoice?
						<br />
						<span class="text-red-600">This action cannot be undone</span>
					</p>
					<div class="flex justify-between mt-4">
						<button class="btn btn-outline-primary btn-md" type="button" @click="$refs.voidModal.hide()"><span>Cancel</span></button>
						<button
							class="btn btn-primary btn-md"
							type="button"
							@click="
								updateInvoice(invoiceToVoid);
								$refs.voidModal.hide();
							"
						>
							<span>Void</span>
						</button>
					</div>
				</template>
			</Modal>

			<Modal ref="deleteModal">
				<template v-if="invoiceToDelete">
					<h4 class="font-serif uppercase font-semibold mb-4 text-center">DELETE INVOICE</h4>
					<p class="text-center mt-3">
						Are you sure to delete this invoice?
						<br />
						<span class="text-red-600">This action cannot be undone</span>
					</p>
					<div class="flex justify-between mt-4">
						<button class="btn btn-outline-primary btn-md" type="button" @click="$refs.deleteModal.hide()"><span>Cancel</span></button>
						<button
							class="btn btn-red btn-md"
							type="button"
							@click="
								updateInvoice(invoiceToDelete);
								$refs.deleteModal.hide();
							"
						>
							<span>Delete</span>
						</button>
					</div>
				</template>
			</Modal>
		</div>

		<div v-else class="position-absolute-center text-center">
			<xero-icon width="100" height="100"></xero-icon>
			<div class="mt-3 mb-2 text-muted">
				Integrate Xero to sync your invoices
			</div>
			<router-link to="/dashboard/integrations" class="btn btn-white shadow-sm">Integrations</router-link>
		</div>
	</div>
</template>

<script src="./xero.js"></script>

<style lang="scss" scoped src="./xero.scss"></style>
