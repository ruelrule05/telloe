<template>
	<div v-if="contact" class="w-100 h-100 overflow-hidden">
		<div class="overflow-auto h-100">
			<div class="p-4 d-flex align-items-center">
				<button class="btn p-1 btn-white badge-pill shadow-sm" type="button" @click="$router.push('/dashboard/contacts')">
					<arrow-left-icon width="30" height="30"></arrow-left-icon>
				</button>

				<div class="dropdown ml-auto">
					<button class="btn p-2 btn-white badge-pill shadow-sm" data-toggle="dropdown" data-offset="-130, 10">
						<more-icon width="20" height="20" transform="scale(0.75)"></more-icon>
					</button>
					<div class="dropdown-menu">
						<span class="dropdown-item cursor-pointer" @click="$refs['editModal'].show()">
							Edit
						</span>
						<span class="dropdown-item cursor-pointer" @click="$refs['deleteModal'].show()">
							Delete
						</span>
					</div>
				</div>
			</div>

			<div class="px-4">
				<div class="row px-2 align-items-stretch">
					<div class="col-md-5 px-2">
						<div class="px-1">
							<div class="rounded bg-white shadow-sm p-3 mb-4">
								<div class="text-center">
									<div
										class="user-profile-image d-inline-block"
										:style="{
											backgroundImage: 'url(' + contact.contact_user.profile_image + ')'
										}"
									>
										<span v-if="!contact.contact_user.profile_image">
											{{ contact.contact_user.initials }}
										</span>
									</div>
									<h1 class="h3 font-heading mt-2 mb-0">{{ contact.contact_user.full_name }}</h1>
									<div class="text-muted mb-1">{{ contact.contact_user.email }}</div>
								</div>
								<div class="d-flex justify-content-between mt-4">
									<div>
										<div class="text-gray mb-1">Status</div>
										<div>
											<div class="badge badge-icon d-inline-flex align-items-center" :class="[contact.is_pending ? 'bg-warning-light text-warning' : 'bg-primary-light text-primary']">
												<clock-icon v-if="contact.is_pending" height="12" width="12"></clock-icon>
												<checkmark-circle-icon v-else height="12" width="12"></checkmark-circle-icon>
												&nbsp;{{ contact.is_pending ? 'Pending' : 'Accepted' }}
											</div>
										</div>
									</div>
									<div>
										<div class="text-gray mb-1">Bookings</div>
										<div>{{ contact.bookings.total }}</div>
									</div>
									<div>
										<div class="text-gray mb-1">Date Added</div>
										<div>{{ formatDate(contact.created_at) }}</div>
									</div>
								</div>
							</div>

							<div class="rounded bg-white shadow-sm p-3 mb-4">
								<div class="d-flex">
									<h5 class="font-heading mb-0">Fields</h5>
								</div>
								<div v-for="(custom_field, index) in contact.custom_fields" :key="index" class="d-flex align-items-center custom-field position-relative">
									<div class="mt-3 d-flex align-items-center w-100">
										<span class="text-muted">{{ custom_field.name }}</span>
										<div class="ml-auto d-flex align-items-center">
											<span>{{ custom_field.value }}</span>
											<trash-icon width="18" height="18" class="cursor-pointer ml-1 d-none" @click.native="$root.auth.custom_fields.splice(index, 1)"></trash-icon>
										</div>
									</div>
								</div>
							</div>

							<div class="rounded bg-white shadow-sm h-100 d-flex flex-column p-3">
								<h5 class="font-heading">Upcoming Bookings</h5>
								<div class="flex-grow-1">
									<!-- Upcoming Bookings -->
									<template v-if="contact.upcoming_bookings.length > 0">
										<div v-for="booking in contact.upcoming_bookings" :key="booking.id" class="mt-3 pb-3 border-bottom">
											<div class="h6 font-heading mb-0">{{ booking.service.name }}</div>
											<div>
												{{ formatDate(booking.date) }} {{ dayjs(booking.start).format('hh:mmA') }} -
												{{
													dayjs(booking.start)
														.add(booking.service.duration, 'minute')
														.format('hh:mmA')
												}}
											</div>
										</div>
									</template>

									<div v-else class="py-3 text-center text-gray">No upcoming bookings</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-7 px-2">
						<div class="px-1 h-100">
							<div class="rounded bg-white shadow-sm p-3">
								<!-- Bookings -->
								<div class="d-flex mb-2">
									<h5 class="font-heading mb-3">Bookings</h5>
									<div class="ml-auto d-flex align-items-center">
										<div class="d-inline-flex align-items-center">
											<vue-select :options="servicesList" multiple button_class="border-0 bg-light shadow-none" v-model="filterServices" label="Services" placeholder="All" @input="filterByServices"></vue-select>
										</div>
									</div>
								</div>
								<div v-if="contact.bookings.data.length > 0">
									<table class="table table-borderless mb-0">
										<tbody class=" shadow-none">
											<template v-for="booking in contact.bookings.data">
												<tr :key="booking.id">
													<td class="align-middle pl-0">{{ booking.service.name }}</td>
													<td class="align-middle">
														{{ formatDate(booking.date) }}
													</td>
													<td class="align-middle">
														{{ convertTime(booking.start, 'hh:MMA') }}
													</td>
													<td class="align-middle pr-0">
														<div class="flex-grow-1 text-right">
															<div class="dropleft">
																<button class="btn btn-white p-1 line-height-0" data-toggle="dropdown">
																	<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
																</button>
																<div class="dropdown-menu dropdown-menu-right">
																	<span class="dropdown-item cursor-pointer" @click="editBooking(booking)">
																		Edit
																	</span>
																</div>
															</div>
														</div>
													</td>
												</tr>
											</template>
										</tbody>
									</table>
								</div>
								<div v-else class="px-4 mb-4">
									<div class="rounded bg-white shadow-sm text-center py-3 text-muted">
										No bookings found.
									</div>
								</div>
							</div>

							<div class="mt-3 text-right">
								<paginate @change="getData" :data="contact.bookings"></paginate>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<modal ref="editModal" :close-button="false">
			<h5 class="font-heading mb-3">Edit Contact</h5>
			<vue-form-validate v-if="contact" @submit="update(contact)">
				<fieldset :disabled="!contact.is_pending">
					<div class="form-group">
						<label class="form-label">Email</label>
						<input type="email" class="form-control" v-model="contact.email" data-required />
					</div>

					<div class="form-row form-group">
						<div class="col">
							<label class="form-label">First Name</label>
							<input type="text" class="form-control" v-model="contact.first_name" />
						</div>
						<div class="col">
							<label class="form-label">Last Name</label>
							<input type="text" class="form-control" v-model="contact.last_name" />
						</div>
					</div>
				</fieldset>
				<div class="form-group">
					<strong class="d-block mb-2 font-weight-bold">Available services</strong>
					<div v-for="service in services" :key="service.id" class="d-flex align-items-center mb-2 rounded p-3 bg-light">
						<div>
							<h6 class="font-heading mb-0">{{ service.name }}</h6>
						</div>
						<div class="ml-auto">
							<toggle-switch active-class="bg-primary" :value="contact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleContactServiceBlacklist(service, contact)"></toggle-switch>
						</div>
					</div>
				</div>

				<div class="d-flex mt-4">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">Cancel</button>
					<button class="ml-auto btn btn-primary" type="submit">Update</button>
				</div>
			</vue-form-validate>
		</modal>
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
