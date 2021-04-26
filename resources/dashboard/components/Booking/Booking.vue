<template>
	<div class="booking" :class="{ open: open }">
		<template v-if="booking">
			<!-- New booking -->
			<template v-if="newEvent">
				<vue-form-validate @submit="createBooking" class="flex flex-col h-full">
					<div class="flex-grow">
						<h5 class="font-semibold font-serif text-md mb-4">New Booking</h5>
						<label>Event Type</label>
						<vue-select required :options="servicesOptions" placeholder="Select event type" class="mb-4" v-model="clonedBooking.service"></vue-select>
						<v-date-picker
							is-required
							v-model="clonedBooking.date"
							@input="
								$nextTick(() => {
									emitNewBookingDateChange();
								})
							"
						>
							<template v-slot="{ inputValue, inputEvents }">
								<label>Date</label>
								<div class="input-prefix">
									<div class="input-icon">
										<CalendarIcon></CalendarIcon>
									</div>
									<input type="text" readonly :value="inputValue" v-on="inputEvents" data-required />
								</div>
							</template>
						</v-date-picker>
						<div class="my-4">
							<timerangepicker @change="emitNewBookingDateChange" :start="clonedBooking.start" :end="clonedBooking.end" class="mb-2"></timerangepicker>
						</div>

						<label>Guests</label>
						<vue-select v-if="!contact" required :options="contactsOptions" @input="contactSelected" no-set-value placeholder="Add guests"></vue-select>
						<div v-for="(contact, contactIndex) in selectedContacts" :key="contact.id" class="contact-item">
							<div class="flex items-center">
								<div>
									<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact_user.profile_image + ')' }">
										<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
									</div>
								</div>
								<div class="pl-1 text-sm font-semibold leading-tight">
									{{ contact.contact_user.full_name }}
								</div>
							</div>
							<div>
								<div class="contact-remove" @click="selectedContacts.splice(contactIndex, 1)"><CloseIcon class="fill-current"></CloseIcon></div>
							</div>
						</div>
					</div>
					<div class="flex justify-between">
						<button type="submit" class="btn btn-outline-primary btn-md"><span>Add booking</span></button>
						<button type="button" class="btn" @click="close">Cancel</button>
					</div>
				</vue-form-validate>
			</template>

			<!-- Manage booking -->
			<template v-else>
				<div class="flex-grow">
					<h5 class="font-semibold text-xl mb-4">{{ (clonedBooking.service || clonedBooking.booking_link).name }}</h5>

					<div class="mb-4">
						<label>Guests</label>
						<div v-for="bookingUser in clonedBooking.booking_users" :key="bookingUser.id" class="flex items-center mb-3">
							<div>
								<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + bookingUser.user.profile_image + ')' }">
									<span v-if="!bookingUser.user.profile_image">{{ bookingUser.user.initials }}</span>
								</div>
							</div>
							<div class="pl-1 text-sm font-semibold leading-tight">
								{{ bookingUser.user.full_name }}
							</div>
						</div>
					</div>

					<v-date-picker v-model="clonedBooking.date">
						<template v-slot="{ inputValue, inputEvents }">
							<label>Date</label>
							<div class="input-prefix">
								<div class="input-icon">
									<CalendarIcon></CalendarIcon>
								</div>
								<input type="text" :value="inputValue" v-on="inputEvents" />
							</div>
						</template>
					</v-date-picker>
					<div class="my-4">
						<timerangepicker :start="clonedBooking.start" :end="clonedBooking.end" class="mb-2" @change="updateTime"></timerangepicker>
					</div>

					<div>
						<label>Notes</label>
						<textarea class="resize-none" rows="3" v-model="clonedBooking.notes"></textarea>
					</div>
				</div>

				<div class="flex justify-between">
					<button type="button" class="btn btn-outline-primary btn-md" @click="update"><span>Save changes</span></button>
					<button type="button" class="btn" @click="confirmDelete">DELETE</button>
				</div>
			</template>

			<Modal ref="deleteModal">
				<div class="text-center">
					<WarningIcon class="fill-current text-red-600 h-8 w-8 inline-block mb-4"></WarningIcon>
					<p>Are you sure you want to delete this booking?</p>
				</div>
				<div class="flex justify-between mt-6">
					<button class="btn btn-sm btn-outline-primary" type="button" @click="$refs.deleteModal.hide()"><span>Cancel</span></button>
					<button class="btn btn-sm btn-red" type="button" @click="confirmDeleteBooking"><span>Delete</span></button>
				</div>
			</Modal>
		</template>
	</div>
</template>

<script src="./Booking.js"></script>
<style lang="scss" scoped src="./Booking.scss"></style>
