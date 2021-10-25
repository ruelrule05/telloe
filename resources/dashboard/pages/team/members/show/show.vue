<template>
	<div v-if="member" class="min-h-screen flex flex-col">
		<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white md:z-0 z-10">
			<div class="flex items-center">
				<router-link to="/dashboard/team/members" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
				MEMBER DETAILS
			</div>
			<div>
				<button type="button" class="btn btn-md btn-primary flex items-center" @click="createNewEvent">
					<span class="hidden md:block">Add</span>
					<span class="block md:hidden">+</span>
					<span class="ml-2">Booking</span>
				</button>
			</div>
		</div>
		<div class="h-20 lg:hidden block" />

		<div class="flex flex-col lg:flex-row items-stretch h-full contact-content flex-grow">
			<div class="w-full lg:w-5/12 min-h-full border-r-0 lg:border-r border-b lg:border-b-0 relative">
				<div class="absolute top-2 right-2">
					<VueDropdown :options="actions()" @click="memberAction">
						<template #button>
							<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
								<CogIcon class="fill-current text-gray-400"></CogIcon>
							</div>
						</template>
					</VueDropdown>
				</div>
				<div class="p-8 contact-detail bg-secondary-light">
					<div class="flex items-start contact-profile">
						<div class="mr-4">
							<div class="profile-image profile-image-xl" :style="{ backgroundImage: 'url(' + member.member_user.profile_image + ')' }">
								<span v-if="!member.member_user.profile_image">{{ member.member_user.initials }}</span>
								<i v-if="$root.isOnline(member.member_user_id)" class="online-status">&nbsp;</i>
							</div>
						</div>

						<div class="flex-1 pt-2">
							<h2 class="mb-1 text-xl font-bold">{{ member.full_name }}</h2>
							<p class="text-xs text-muted">{{ member.member_user.email }}</p>
						</div>
					</div>
					<div class="flex justify-end">
						<div class="w-full lg:w-4/5 flex items-end justify-between mt-9">
							<div>
								<span class="px-3 py-1 text-xs font-bold rounded text-muted" :class="[member.is_pending ? 'bg-yellow-200' : 'bg-gray-200']">{{ member.is_pending ? 'Pending' : 'Accepted' }}</span>
								<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Status</p>
							</div>
							<div>
								<span class="flex mb-1 font-bold">{{ member.bookings.total }}</span>
								<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Bookings</p>
							</div>
							<div>
								<span class="flex mb-1">{{ formatDate(member.created_at) }}</span>
								<p class="font-normal tracking-wider uppercase text-xxs text-muted mt-2">Added</p>
							</div>
						</div>
					</div>
				</div>
				<div class="px-6 pb-6 contact-files mt-4">
					<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Assigned Services</h2>
					<template v-for="service in services">
						<div v-if="member.assigned_services.find(x => x.parent_service_id == service.id)" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
							<h6 class="font-semibold text-primary">{{ service.name }}</h6>
						</div>
					</template>
				</div>
			</div>
			<div class="w-full lg:w-7/12 p-8">
				<div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 filters">
					<h5 class="font-serif text-sm font-bold tracking-tighter uppercase">Bookings</h5>
					<div class="flex-grow flex items-center justify-end">
						<vue-select :options="servicesList" button_class="mr-2 border-0 bg-light shadow-none" v-model="selectedService" label="Service" placeholder="All" @input="filterBookings"></vue-select>
						<div class="ml-2">
							<vue-select :options="orders" button_class="mr-2 border-0 bg-light shadow-none" v-model="order" label="Date" @input="filterBookings"></vue-select>
						</div>
					</div>
				</div>

				<div class="py-4 flex items-center justify-between border-bottom" v-for="booking in member.bookings.data" :key="booking.id">
					<div class="w-4/12">
						<span class="font-bold text-primary">{{ booking.name }}</span>
					</div>
					<div class="w-3/12 flex items-center justify-end text-sm"><ClockIcon class="fill-current text-gray-200 mr-2"></ClockIcon>{{ formatDate(booking.date) }}</div>
					<div class="w-3/12 text-sm text-right">{{ booking.start }} &mdash; {{ booking.end }}</div>
					<div class="w-2/12 text-right">
						<VueDropdown :options="['Edit']" @click="bookingAction($event, booking)" class="-mb-2">
							<template #button>
								<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
									<CogIcon class="fill-current text-gray-400"></CogIcon>
								</div>
							</template>
						</VueDropdown>
					</div>
				</div>

				<Paginate v-if="member.bookings.data.length > 0" :data="member.bookings" @change="p => (page = p)" class="mt-6"></Paginate>
			</div>
		</div>

		<Booking class="contact-booking" :member="member" :service="packageService" @store="newBookingStored" :newEvent="newEvent" :booking="selectedBooking" @update="bookingUpdated" @close="selectedBooking = null" @delete="bookingDeleted"></Booking>

		<Modal ref="editModal">
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

		<Modal ref="resendModal">
			<template v-if="member">
				<h4 class="font-serif uppercase font-semibold mb-4 text-center">RESEND INVITATION</h4>
				<p class="text-center mt-3">
					Are you sure to resend the invitation email to member
					<strong>{{ member.full_name.trim() || member.email }}</strong>
					?
					<br />
				</p>
				<div class="flex justify-between mt-7">
					<button class="btn btn-outline-primary btn-md" type="button" @click="$refs.resendModal.hide()">
						<span>Cancel</span>
					</button>
					<vue-button button_class="btn btn-primary btn-md" :loading="resendLoading" type="button" @click="resendEmail(member)">Resend Invitation</vue-button>
				</div>
			</template>
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
							confirmDeleteMember(member);
							$router.push('/dashboard/team/members');
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
