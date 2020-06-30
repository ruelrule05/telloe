<template>
	<div class="mt-3 overflow-auto h-100 flex-grow-1 d-flex flex-column">
		<div v-if="invoices.length == 0" class="text-muted text-center p-4 position-absolute-center">
			<div class="h6 font-weight-light mb-3">You don't have any invoices yet.</div>
		</div>

		<template v-else>
			<div class="px-4">
				<h4 class="font-heading mb-0">Invoices</h4>
				<table class="table table-borderless">
					<thead>
						<tr>
							<th class="text-muted font-weight-light pl-0 py-1">Invoice #</th>
							<th class="text-muted font-weight-light py-1">Customer</th>
							<th class="text-muted font-weight-light py-1">Status</th>
							<th class="text-muted font-weight-light py-1">Date Created</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="invoice in invoices" class="bg-white rounded shadow-sm overfxlow-hidden">
							<td class="align-middle rounded-left">{{ invoice.id }}</td>
							<td class="align-middle">{{ invoice.customer.full_name }}</td>
							<td class="align-middle">{{ invoice.status }}</td>
							<td class="align-middle">June 29, 2020</td>
							<td class="text-right align-middle rounded-right">
								<div class="dropleft">
		                    		<button class="btn btn-white border p-1 line-height-0 bxadge-pill" data-toggle="dropdown">
										<more-h-icon width="20" height="20"></more-h-icon>
		                    		</button>
									<div class="dropdown-menu dropdown-menu-right">
										<span class="dropdown-item cursor-pointer">Send to email</span>
										<span class="dropdown-item cursor-pointer">Download PDF</span>
									</div>
		                    	</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
	</div>
</template>

<script src="./invoices.js"></script>
<style scoped lang="scss" src="./invoices.scss"></style>