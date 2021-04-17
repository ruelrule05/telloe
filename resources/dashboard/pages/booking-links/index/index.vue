<template>
	<div class="min-h-screen flex flex-col relative" v-if="$root.auth && ready">
		<div class="content-header border-bottom flex items-center justify-between">
			<div>
				CUSTOM LINKS
			</div>
			<div>
				<button v-if="!addLink" type="button" class="btn btn-md btn-primary" @click="addLink = true"><span>Add New</span></button>
			</div>
		</div>

		<Add v-if="addLink"></Add>

		<template v-else>
			<div v-if="booking_links.data.length == 0" class="absolute-center p-6 bg-secondary rounded-xl flex items-start w-4/12">
				<div class="text-primary">
					<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
				</div>
				<div class="pl-4 -mt-1">
					<p class="font-bold text-sm">You haven't created any custom links yet. Use the custom links creation form to set up a new custom link.</p>
					<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="addLink = true"><span>Add New</span></button>
				</div>
			</div>

			<div v-else class="grid grid-cols-12">
				<div class="col-span-4 p-6 border-right">
					<p class="text-muted text-sm">Custom links are a handy way to create a booking calendar with specific dates. Once you set up the link an invitation will be sent to the invited people. They will be able to confirm a meeting time that fits them according to your specified slots.</p>
				</div>

				<div class="col-span-8 p-6">
					<router-link tag="div" :to="`/dashboard/bookings/booking-links/${booking_link.id}`" v-for="booking_link in booking_links.data" :key="booking_link.id" class="cursor-pointer">
						<div class="text-primary font-bold">
							{{ booking_link.name }}
						</div>
						<div class="text-muted text-xs">Created: {{ formatDate(booking_link.created_at) }}</div>
						<div class="flex items-center mt-2">
							<div class="flex items-center">
								<div v-for="contact in booking_link.booking_link_contacts" :key="contact.id">
									<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
										<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
									</div>
								</div>
							</div>
							<span class="text-muted text-sm">Custom link dates:</span>
							<div>
								<div v-for="(date, dateKey) in booking_link.dates" :key="dateKey" class="text-sm">
									<span class="mx-2">{{ formatDate(dateKey) }} </span>
									<span class="text-muted">|</span>
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</template>

		<div class="hidden d-flex h-100">
			<div class="h-100 flex-grow-1">
				<div class="d-flex flex-column h-100">
					<div class="border-bottom bg-white p-3 d-flex align-items-center">
						<h5 class="font-heading mb-0">Custom Booking</h5>
						<div class="ml-auto d-flex align-items-center">
							<button
								type="button"
								class="btn btn-light ml-1 shadow-none"
								@click="
									$refs['addModal'].show();
									getAllTimeslots();
								"
							>
								Add
							</button>
						</div>
					</div>

					<div class="rounded overflow-auto h-100 flex-grow-1 d-flex flex-column">
						<div v-if="booking_links.data.length == 0" class="text-secondary text-center p-4 position-absolute-center">
							<div class="h6 mb-0 font-weight-normal">You don't have any booking links yet.</div>
						</div>

						<div class="overflow-auto flex-grow-1 pb-4 px-4 h-100" v-else>
							<table class="table table-borderless table-hover mb-0 mt-2">
								<thead>
									<tr>
										<th>Name</th>
										<th>Dates</th>
										<th>Contacts</th>
									</tr>
								</thead>
								<tbody>
									<router-link tag="tr" :to="`/dashboard/bookings/booking-links/${booking_link.id}`" v-for="booking_link in booking_links.data" :key="booking_link.id" class="cursor-pointer">
										<td class="align-middle">
											{{ booking_link.name }}
										</td>
										<td class="align-middle">
											<span class="badge badge-secondary mr-1" v-for="(date, dateKey) in booking_link.dates" :key="dateKey">{{ formatDate(dateKey) }}</span>
										</td>
										<td class="align-middle">
											{{ booking_link.booking_link_contacts_count }}
										</td>
										<!-- <td class="align-middle text-right">
											<div class="dropleft">
												<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
													<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
												</button>
												<div class="dropdown-menu dropdown-menu-right">
													<a :href="`/booking_links/${booking_link.uuid}`" target="_blank" class="dropdown-item cursor-pointer d-flex align-items-center"> View <shortcut-icon width="15" height="15" class="ml-auto"></shortcut-icon> </a>
													<span class="dropdown-item cursor-pointer">
														Delete
													</span>
												</div>
											</div>
										</td> -->
									</router-link>
								</tbody>
							</table>
							<div class="d-flex mt-3">
								<paginate :data="booking_links" class="ml-auto"></paginate>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript" src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
