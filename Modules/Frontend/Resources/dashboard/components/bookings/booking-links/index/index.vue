<template>
	<div class="h-100" v-if="$root.auth && ready">
		<div class="d-flex h-100">
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

		<modal ref="addModal" size="modal-xl" :close-button="false" :scrollable="false">
			<h5 class="font-heading mb-3">Add Booking Link</h5>

			<div class="form-group w-25">
				<input type="text" data-required class="form-control" placeholder="Name" v-model="name" />
			</div>
			<vue-form-validate @submit="storeLink" class="overflow-hidden">
				<div class="d-flex align-items-center">
					<v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate" :masks="masks">
						<template v-slot="data">
							<button type="button" class="btn btn-light" v-on="data.inputEvents">Add Date</button>
						</template>
					</v-date-picker>
					<button v-for="(date, dateKey) in dates" :key="dateKey" class="btn mx-1" :class="[dateKey == selectedDate ? 'btn-primary' : 'border']" type="button" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
						{{ dayjs(dateKey).format('MMMM D, YYYY') }} <button class="btn btn-sm btn-light shadow-none rounded-circle p-0" type="button" @click.stop="removeDate(dateKey)"><close-icon></close-icon></button>
					</button>
				</div>

				<div class="d-flex bg-light rounded my-3 overflow-auto h-100">
					<div class="flex-grow-1 timeslots-wrapper position-relative rounded">
						<table class="table table-sm table-borderless mb-0 table-layout-fixed">
							<tbody class="shadow-none bg-transparent text-center">
								<template v-if="selectedContacts.length">
									<tr v-for="contact in selectedContacts" :key="contact.id">
										<td class="contact-container">
											<div class="d-flex align-items-center py-2 pl-2 contact-container">
												<div class="profile-image profile-image-sm cursor-pointer" :style="{ 'background-image': `url(${contact.contact_user.profile_image})` }">
													<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
												</div>
												<div class="text-left pl-2">
													<h6 class="font-heading text-nowrap mb-0">
														{{ contact.contact_user.full_name }}
													</h6>
													<small class="text-secondary">{{ contact.contact_user.timezone }}</small>
												</div>
												<div class="dropdown ml-2 mr-2 contact-dropdown">
													<button class="btn btn-white line-height-0 p-1 badge-pill shadow-none" data-toggle="dropdown" data-offset="-140, 0">
														<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray"></more-icon>
													</button>
													<div class="dropdown-menu">
														<span class="dropdown-item cursor-pointer" @click="removeContact(contact)">
															Remove
														</span>
													</div>
												</div>
											</div>
										</td>

										<td v-for="(timeslot, timeslotIndex) in (dates[selectedDate] || {}).timeslots" :data-index="timeslotIndex" :key="timeslotIndex" class="align-middle timeslot-button position-relative overflow-hidden cursor-pointer" :class="[timeslot.is_available ? 'cursor-pointer bg-primary available' : 'disabled text-secondary pointer-events-none', { selected: (dates[selectedDate].selectedTimeslots || []).find(x => x.time == timeslot.time) }]" @click="addTimeslot(timeslot)">
											<small>{{ timezoneTime(contact.contact_user.timezone, timeslot.time) }}</small>
										</td>
									</tr>
								</template>

								<tr>
									<td class="contact-container">
										<div v-if="!addEmail" class="dropdown">
											<div class="rounded py-2 border bg-white cursor-pointer add-member d-flex align-items-center justify-content-center text-muted" data-toggle="dropdown">
												<plus-icon class="fill-gray" transform="scale(0.9)"></plus-icon>
												Add Contact
											</div>
											<div class="dropdown-menu dropdown-menu-right w-100">
												<template v-for="contact in contacts">
													<div v-if="!contact.is_pending" class="dropdown-item d-flex align-items-center cursor-pointer px-1" :key="contact.id" :class="{ disabled: selectedContacts.find(x => x.id == contact.id) }" @click="addContact(contact)">
														<div class="d-flex align-items-center">
															<div class="profile-image profile-image-xs cursor-pointer" :style="{ 'background-image': `url(${contact.contact_user.profile_image})` }">
																<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
															</div>
															<span class="font-heading ml-1">{{ contact.contact_user.full_name }}</span>
														</div>
													</div>
												</template>
												<div class="dropdown-item d-flex align-items-center cursor-pointer text-center text-muted" @click="addEmail = true; newEmail = newTimezone = ''"><plus-icon class="fill-gray" transform="scale(0.8)"></plus-icon> Invite email</div>
											</div>
										</div>
										<vue-form-validate @submit="addNewEmail" class="pl-2" v-else>
											<div class="form-group mb-1">
												<input type="email" ref="newEmailInput" class="form-control form-control-sm" placeholder="Email" v-model="newEmail">
											</div>
											<div class="form-group mb-2">
												<vue-select placeholder="Timezone" :options="timezonesOptions" searchable button_class="form-control form-control-sm" v-model="newTimezone"></vue-select>
											</div>
											<div class="d-flex align-items-center">
												<button class="btn btn-sm btn-white" type="button" @click="addEmail = false">Cancel</button>
												<button class="ml-auto btn btn-sm btn-primary" type="submit">Add</button>
											</div>
										</vue-form-validate>
									</td>
									<td>
										<div v-if="!selectedContacts.length" class="text-gray py-2">Please add at least one contact.</div>
									</td>
								</tr>
							</tbody>
						</table>

						<transition name="fade">
							<div v-if="timeslotsLoading" class="timeslots-loader rounded position-absolute-center w-100 h-100 bg-white">
								<div class="position-absolute-center">
									<div class="spinner-border text-primary" role="status"></div>
								</div>
							</div>
						</transition>
					</div>
				</div>
				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal" :disabled="timeslotsLoading">Cancel</button>
					<button class="ml-auto btn btn-primary" type="submit" :disabled="!selectedContacts.length || timeslotsLoading || !Object.keys(dates).length || !name.trim().length">Add</button>
				</div>
			</vue-form-validate>
		</modal>
	</div>
</template>

<script type="text/javascript" src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
