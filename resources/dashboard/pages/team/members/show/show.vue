<template>
	<div v-if="member" class="min-h-screen flex flex-col">
		<div class="border-bottom flex items-center justify-between lg:static fixed w-full bg-white md:z-0 z-10">
			<div class="content-header flex items-center">
				<router-link to="/dashboard/team/members" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
				MEMBER DETAILS
			</div>
			<div class="pr-6">
				<VueDropdown :options="actions" @click="memberAction($event, member)" class="-mr-2 ml-1">
					<template #button>
						<button class="bg-primary rounded-full p-3 text-white">
							<span><MoreIcon width="20" height="20" class="fill-current"/></span>
						</button>
					</template>
				</VueDropdown>
			</div>
		</div>

		<div class="overflow-auto flex-grow">
			<div class="text-center pt-12">
				<div
					class="profile-image profile-image-xl inline-block relative"
					:style="{
						backgroundImage: 'url(' + member.member_user.profile_image + ')'
					}"
				>
					<span v-if="!member.member_user.profile_image">
						{{ member.member_user.initials }}
					</span>

					<i v-if="$root.isOnline(member.member_user_id)" class="online-status">&nbsp;</i>
				</div>
				<h1 class="font-semibold text-xl">{{ member.full_name }}</h1>
				<div class="text-muted mb-1">{{ member.email }}</div>
				<span class="px-3 py-1 text-xs font-bold rounded text-muted" :class="[member.is_pending ? 'bg-yellow-200' : 'bg-gray-200']">{{ member.is_pending ? 'Pending' : 'Accepted' }}</span>
			</div>

			<!-- Bookings -->
			<div class="flex items-center px-4">
				<h5 class="mt-4 mb-3">Bookings</h5>
				<div class="ml-auto d-flex align-items-center">
					<div class="inline-flex items-center mx-2">
						<vue-select :options="servicesList" multiple button_class="border-0 bg-white shadow-sm" dropPosition="w-full" v-model="filterServices" label="Services" placeholder="All" @input="filterByServices"></vue-select>
					</div>
				</div>
			</div>

			<div class="px-4 mb-4" v-if="member.bookings.data.length > 0">
				<table class="table">
					<thead>
						<tr>
							<th class="pl-0">Guests</th>
							<th>Service</th>
							<th>Date</th>
							<th>Time</th>
							<th>Timezone</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="booking in member.bookings.data">
							<tr :key="booking.id">
								<td class="align-middle">
									<span class="badge mr-1" v-for="bookingUser in booking.booking_users" :key="bookingUser.id">{{ bookingUser.user ? bookingUser.user.full_name : bookingUser.guest.email }}</span>
								</td>
								<td class="align-middle">{{ booking.name }}</td>
								<td class="align-middle">
									{{ formatDate(booking.date) }}
								</td>
								<td class="align-middle">
									{{ convertTime(booking.start, 'hh:MMA') }} -
									{{ convertTime(booking.end, 'hh:MMA') }}
								</td>
								<td class="align-middle">
									{{ booking.timezone }}
								</td>
								<!-- <td class="align-middle">
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
								</td> -->
							</tr>
						</template>
					</tbody>
				</table>
				<paginate @change="getData" :data="member.bookings" class="mt-3"></paginate>
			</div>
			<div v-else class="px-4 mb-4">
				<div class="text-center pt-16 text-muted">
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

		<Modal ref="editModal" size="sm">
			<h4 class="font-serif uppercase font-semibold mb-4">EDIT MEMBER</h4>
			<vue-form-validate v-if="clonedMember" @submit="update">
				<div class="mb-4">
					<label class="form-label">Email</label>
					<input :disabled="!clonedMember.is_pending" type="email" class="form-control" v-model="clonedMember.email" data-required />
				</div>
				<div class="grid grid-cols-2 gap-x-4 mb-4">
					<div>
						<label class="form-label">First Name (Optional)</label>
						<input :disabled="!clonedMember.is_pending" type="text" class="form-control" v-model="clonedMember.first_name" />
					</div>
					<div>
						<label class="form-label">Last Name (Optional)</label>
						<input :disabled="!clonedMember.is_pending" type="text" class="form-control" v-model="clonedMember.last_name" />
					</div>
				</div>
				<div class="mb-4">
					<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Assign Services</h2>
					<template v-for="service in services">
						<div v-if="service.is_available" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
							<h6 class="font-semibold text-primary">{{ service.name }}</h6>
							<div class="mt-2 flex items-center">
								<span class="text-xs mr-2">{{ clonedMember.assigned_services.find(x => x == service.id) ? 'Active' : 'Inactive' }}</span>
								<toggle-switch :value="clonedMember.assigned_services.find(x => x == service.id) ? true : false" @input="toggleMemberAssignedService(service)"></toggle-switch>
							</div>
						</div>
					</template>
				</div>

				<div class="flex mt-6 justify-between">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.editModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-md btn-primary" type="submit">
						<span>Save</span>
					</button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="deleteModal">
			<template v-if="member">
				<h4 class="font-serif uppercase font-semibold mb-4 text-center">DELETE MEMBER</h4>
				<p class="text-center mt-3">
					Are you sure to delete member
					<strong>{{ member.full_name.trim() || member.email }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="flex justify-between mt-4">
					<button class="btn btn-outline-primary btn-md" @click="$refs.deleteModal.hide()">
						<span>Cancel</span>
					</button>
					<button
						class="btn btn-red btn-md"
						type="button"
						@click="
							deleteMember(member).then(() => $router.push('/dashboard/team/members'));
							$refs.deleteModal.hide();
							member = null;
						"
					>
						<span>Delete</span>
					</button>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script src="./show.js"></script>

<style lang="scss" scoped src="./show.scss"></style>
