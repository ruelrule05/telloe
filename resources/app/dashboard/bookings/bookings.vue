<template>
	<div class="p-4" v-if="ready">
		<h6 v-if="bookings.length == 0" class="text-center text-gray position-absolute-center font-weight-lighter">
			You don't have any bookings yet.
		</h6>
		<div v-else>
			<h1 class="font-heading h3 mb-3">Bookings</h1>
			<div class="table-responsive bg-white rounded shadow-sm">
				<table class="table mb-0">
					<thead>
						<tr>
							<th class="border-0">Service</th>
							<th class="border-0">Date</th>
							<th class="border-0">Start</th>
							<th class="border-0">End</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="booking in bookings">
							<td>{{ booking.service.name }}</td>
							<td>{{ formatDate(booking.date) }}</td>
							<td>{{ formatTime(booking.start) }}</td>
							<td>{{ formatTime(booking.end) }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style lang="scss" src="./bookings.scss"></style>
<script src="./bookings.js"></script>