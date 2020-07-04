<template>
	<div class="p-4 h-100 overflow-hidden">
		<div class="rounded shadow-sm overflow-auto h-100">
			<table class="table table-borderless mb-0 table-fixed-header">
				<thead>
					<tr>
						<th class="text-muted font-weight-light">Name</th>
						<th class="text-muted font-weight-light">Role</th>
						<th class="text-muted font-weight-light">Stripe ID</th>
						<th class="text-muted font-weight-light">Date Joined</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="user in users" class="w-100 bg-white rounded border-bottom">
						<td class="align-middle">{{ user.full_name }}</td>
						<td class="align-middle">{{ user.role.role }}</td>
						<td class="align-middle">{{ user.stripe_customer_id }}</td>
						<td class="align-middle">{{ user.created_at_format }}</td>
						<!-- <td class="text-right align-middle">
							<div class="dropleft">
	                    		<button class="btn btn-white border p-1 line-height-0 bxadge-pill" data-toggle="dropdown">
									<more-h-icon width="20" height="20"></more-h-icon>
	                    		</button>
								<div class="dropdown-menu dropdown-menu-right">
									<span class="dropdown-item cursor-pointer">Send to email</span>
									<span class="dropdown-item cursor-pointer">Download PDF</span>
								</div>
	                    	</div>
						</td> -->
					</tr>
				</tbody>
			</table>		
		</div>
	</div>
</template>
<script src="./users.js"></script>
<style scoped lang="scss" src="./users.scss"></style>