<template>
	<div v-if="member" class="w-100 h-100 overflow-hidden">
		<div class="overflow-auto h-100">
			<div class="p-4 d-flex align-items-center">
				<button class="btn p-1 btn-white badge-pill shadow-sm" type="button" @click="$router.push('/dashboard/team/members')">
					<arrow-left-icon width="30" height="30"></arrow-left-icon>
				</button>

				<div class="dropdown ml-auto">
					<button :data-intro="$root.intros.members_show.steps[0]" data-step="1" class="btn p-2 btn-white badge-pill shadow-sm" data-toggle="dropdown" data-offset="-130, 10">
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

			<div class="text-center mt-n5 mb-3">
				<div
					class="user-profile-image d-inline-block"
					:style="{
						backgroundImage: 'url(' + member.member_user.profile_image + ')'
					}"
				>
					<span v-if="!member.member_user.profile_image">
						{{ member.member_user.initials }}
					</span>

					<i v-if="$root.isOnline(member.member_user_id)" class="online-status bg-success">&nbsp;</i>
				</div>
				<h1 class="h3 font-heading mt-2 mb-0">{{ member.full_name }}</h1>
				<div class="text-muted mb-1">{{ member.email }}</div>
				<div class="flex-grow-1">
					<div class="badge badge-icon d-inline-flex align-items-center" :class="[member.is_pending ? 'bg-warning-light text-warning' : 'bg-primary-light text-primary']">
						<clock-icon v-if="member.is_pending" height="12" width="12"></clock-icon>
						<checkmark-circle-icon v-else height="12" width="12"></checkmark-circle-icon>
						&nbsp;{{ member.is_pending ? 'Pending' : 'Accepted' }}
					</div>
				</div>
			</div>

			<!-- Bookings -->
			<div class="d-flex align-items-center px-4">
				<h5 class="mt-4 font-heading mb-3">Bookings</h5>
				<div class="ml-auto d-flex align-items-center">
					<div class="d-inline-flex align-items-center mx-2">
						<vue-select :options="servicesList" multiple button_class="border-0 bg-white shadow-sm" v-model="filterServices" label="Services" placeholder="All" @input="filterByServices"></vue-select>
					</div>
					<paginate @change="getData" :data="member.bookings"></paginate>
				</div>
			</div>

			<div class="px-4 mb-4" v-if="member.bookings.data.length > 0">
				<table class="table table-borderless mb-0">
					<thead>
						<tr>
							<th class="pl-0">User</th>
							<th>Service</th>
							<th>Date</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="booking in member.bookings.data">
							<tr :key="booking.id">
								<td class="align-middle">{{ (booking.user || booking.contact.contact_user).full_name }}</td>
								<td class="align-middle">{{ booking.service.name }}</td>
								<td class="align-middle">
									{{ formatDate(booking.date) }}
								</td>
								<td class="align-middle">
									{{ convertTime(booking.start, 'hh:MMA') }}
								</td>
								<td class="align-middle">
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

		<modal ref="bookingModal" :close-button="(selectedBooking || {}).isPrevious" :scrollable="false">
			<div v-if="selectedBooking" class="text-center">
				<div class="profile-image profile-image-md d-inline-block mb-2" :style="{ 'background-image': `url(${selectedBooking.customer.profile_image})` }">
					<span v-if="!selectedBooking.customer.profile_image">{{ selectedBooking.customer.initials }}</span>
				</div>
				<h4 class="font-heading mb-4">
					{{ selectedBooking.customer.full_name }}
				</h4>

				<div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Service</div>
						<div class="h6 font-heading mb-0">{{ selectedBooking.service.name }}</div>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Coach</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ selectedBooking.service.coach.full_name }}</div>
						<vue-select button_class="border-0 shadow-none btn btn-light bg-light" v-else v-model="selectedBooking.service_id" :options="serviceMembers"></vue-select>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Date</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ formatDate(selectedBooking.date) }}</div>
						<v-date-picker v-else :min-date="new Date()" :popover="{ placement: 'right', visibility: 'click' }" v-model="selectedBooking.date" @input="getSelectedBookingNewTimeslots">
							<template v-slot="slot">
								<button type="button" class="btn btn-light shadow-none" v-on="slot.inputEvents">{{ formatDate(selectedBooking.date) }}</button>
							</template>
						</v-date-picker>
					</div>
					<div class="d-flex align-items-center text-left mb-3">
						<div class="font-weight-normal text-secondary w-25">Time</div>
						<div v-if="selectedBooking.isPrevious" class="h6 font-heading mb-0">{{ dayjs(selectedBooking.start).format('hh:mmA') }}</div>
						<div v-else class="d-flex align-items-center">
							<div class="dropright">
								<button class="btn btn-light shadow-none" data-toggle="dropdown">
									{{ dayjs(selectedBooking.start).format('hh:mmA') }}
								</button>
								<div class="dropdown-menu timeslots-dropdown-menu overflow-y-auto">
									<div class="text-center text-gray small px-2 py-1 text-nowrap" v-if="timeslots.length == 0">No available timeslots</div>
									<template v-else v-for="(timeslot, index) in timeslots">
										<button type="button" class="btn btn-primary btn-block mb-1" :key="index" @click="selectedBooking.start = dayjs(`${dayjs(selectedBooking.date).format('Y-m-d')} ${timeslot.time}`).toDate()">
											{{ timeslot.label }}
										</button>
									</template>
								</div>
							</div>
							&nbsp;&nbsp;to&nbsp;&nbsp;

							<div class="btn btn-light shadow-none disabled">
								{{
									dayjs(selectedBooking.start)
										.add(selectedBooking.service.duration, 'minute')
										.format('hh:mmA')
								}}
							</div>
						</div>
					</div>
					<div class="d-flex align-items-center text-left">
						<div class="font-weight-normal text-secondary w-25">Duration</div>
						<div class="h6 font-heading mb-0">{{ selectedBooking.service.duration }} minutes</div>
					</div>
					<div class="text-left mt-3 d-flex align-items-start">
						<div class="font-weight-normal text-secondary w-25 mb-2">Notes</div>
						<input v-if="!selectedBooking.isPrevious" type="text" class="form-control resize-none flex-1" v-model="selectedBooking.booking_note.note" placeholder="Write notes.." />
						<div v-else class="flex-1">{{ selectedBooking.booking_note.note }}</div>
					</div>
					<div v-if="!selectedBooking.isPrevious" class="text-left">
						<div class="mt-3" v-if="Object.keys(selectedBooking.zoom_link).length > 0">
							<div class="d-flex align-items-center text-left">
								<div class="font-weight-normal text-secondary w-25">Zoom Link</div>
								<a target="_blank" :href="selectedBooking.zoom_link.join_url" class="d-flex align-items-center">
									Go to Zoom meeting
									<shortcut-icon width="16" height="16" class="ml-1 fill-blue"></shortcut-icon>
								</a>
							</div>
						</div>
						<vue-button v-else-if="$root.auth.zoom_token" type="button" :loading="createZoomLoading" button_class="btn btn-light shadow-none mt-3" @click="createZoomLink(selectedBooking)">
							<div class="d-flex align-items-center">
								<zoom-icon width="20" height="20" class="mr-2"></zoom-icon>
								Create Zoom link
							</div>
						</vue-button>
					</div>
				</div>

				<div v-if="!selectedBooking.isPrevious" class="d-flex justify-content-between mt-4">
					<div class="d-flex align-items-center">
						<button type="button" class="btn btn-light shadow-none" data-dismiss="modal" :disabled="bookingModalLoading">Cancel</button>
						<button type="button" class="btn btn-link text-danger" data-dismiss="modal" @click="$refs['deleteBookingModal'].show()" :disabled="bookingModalLoading">Delete</button>
					</div>
					<vue-button type="button" button_class="btn btn-primary shadow-sm border" :loading="bookingModalLoading" @click.native="updateSelectedBooking(selectedBooking)">Update</vue-button>
				</div>
			</div>
		</modal>

		<modal ref="deleteBookingModal" :close-button="false">
			<template v-if="selectedBooking">
				<h5 class="font-heading text-center">Delete Booking</h5>
				<p class="text-center mt-3">
					Are you sure to delete this booking?
				</p>
				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" @click="$refs['bookingModal'].show()" data-dismiss="modal">
						Cancel
					</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							confirmDeleteBooking(selectedBooking);
							$refs['deleteBookingModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>

		<modal ref="editModal" :close-button="false">
			<h5 class="font-heading mb-3">Edit Member</h5>
			<vue-form-validate v-if="clonedMember" @submit="update">
				<div class="form-group">
					<label class="form-label">Email</label>
					<input :disabled="!clonedMember.is_pending" type="email" class="form-control" v-model="clonedMember.email" data-required />
				</div>
				<div class="form-row form-group">
					<div class="col">
						<label class="form-label">First Name (Optional)</label>
						<input :disabled="!clonedMember.is_pending" type="text" class="form-control" v-model="clonedMember.first_name" />
					</div>
					<div class="col">
						<label class="form-label">Last Name (Optional)</label>
						<input :disabled="!clonedMember.is_pending" type="text" class="form-control" v-model="clonedMember.last_name" />
					</div>
				</div>
				<div class="form-group">
					<strong class="d-block mb-2 font-weight-bold">Assign Services</strong>
					<template v-for="service in services">
						<div :key="service.id" class="d-flex align-items-center mb-2 rounded p-3 bg-light">
							<div>
								<h6 class="font-heading mb-0">{{ service.name }}</h6>
								<small class="text-gray d-block">{{ service.duration }} minutes</small>
							</div>
							<div class="ml-auto">
								<toggle-switch active-class="bg-primary" :value="clonedMember.assigned_services.find(x => x == service.id) ? true : false" @input="toggleMemberAssignedService(service)"></toggle-switch>
							</div>
						</div>
					</template>
				</div>

				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button class="ml-auto btn btn-primary" type="submit">
						Save
					</button>
				</div>
			</vue-form-validate>
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="member">
				<h5 class="font-heading text-center">Delete Member</h5>
				<p class="text-center mt-3">
					Are you sure to delete member
					<strong>{{ member.full_name.trim() || member.email }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-light shadow-none text-body" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							deleteMember(member).then(() => $router.push('/dashboard/team/members'));
							$refs['deleteModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./show.js"></script>

<style lang="scss" scoped src="./show.scss"></style>
