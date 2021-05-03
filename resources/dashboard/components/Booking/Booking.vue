<template>
	<div class="booking" :class="{ open: open }">
		<template v-if="booking">
			<!-- New booking -->
			<template v-if="newEvent">
				<vue-form-validate @submit="createBooking" class="flex flex-col h-full">
					<div class="flex-grow">
						<h5 class="font-semibold font-serif text-md mb-4">New Booking</h5>
						<label>Event Type</label>
						<VueSelect :disabled="disableServiceSelect" required :options="servicesOptions" placeholder="Select event type" class="mb-4" v-model="clonedBooking.service"></VueSelect>
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
							<div class="flex justify-between">
								<label>Time</label>
								<VueCheckbox v-if="clonedBooking.service" v-model="selectFromTimeslots" label="Select from timeslots"></VueCheckbox>
							</div>
							<div v-if="!clonedBooking.service" class="text-center text-muted py-4 bg-gray-100 rounded-lg text-sm">Please choose an event type.</div>

							<template v-else>
								<div v-if="selectFromTimeslots" class="mt-2 overflow-x-scroll overflow-y-visible border bg-gray-50 rounded-lg">
									<table class="w-full" cellspacing="0" cellpadding="0">
										<tr class="relative">
											<td v-for="(timeslot, timeslotIndex) in timeslots" :key="timeslotIndex" class="border-right contact-td timeslot" :class="{ disabled: !timeslot.is_available, selected: selectedTimeslot.time == timeslot.time }" @click="selectTimeslot(timeslot)">
												<div class="items-center column px-1 bg-primary-400">
													<div class="timeslot-content">
														<p class="text-center" v-html="timeslotTime(timeslot)"></p>
													</div>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<timerangepicker v-else @change="emitNewBookingDateChange" :start="clonedBooking.start" :end="clonedBooking.end" class="mb-2"></timerangepicker>
							</template>
						</div>

						<label>Guests</label>
						<div v-if="contact">
							{{ contact.contact_user.full_name }}
						</div>
						<multiselect v-else v-model="selectedContacts" ref="selectedContacts" label="name" track-by="id" :options="contactsOptions" :showLabels="false" placeholder="" multiple clearOnSelect>
							<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
							<div slot="noResult" slot-scope="data" class="text-muted text-sm text-center">
								<button v-if="isEmail.validate(data.search)" type="button" @click="addEmail(data.search)" class="btn btn-sm btn-outline-primary"><span>Add this email</span></button>
								<span v-else>No contacts found.</span>
							</div>
						</multiselect>

						<!-- <vue-select v-if="!contact" dropPosition="w-full" required :options="contactsOptions" @input="contactSelected" no-set-value placeholder="Add guests"></vue-select> -->
						<!-- <div v-for="(selectedContact, contactIndex) in selectedContacts" :key="selectedContact.id" class="contact-item">
							<div class="flex items-center">
								<div>
									<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + selectedContact.contact_user.profile_image + ')' }">
										<span v-if="!selectedContact.contact_user.profile_image">{{ selectedContact.contact_user.initials }}</span>
									</div>
								</div>
								<div class="pl-1 text-sm font-semibold leading-tight">
									{{ selectedContact.contact_user.full_name }}
								</div>
							</div>
							<div v-if="!contact">
								<div class="contact-remove" @click="selectedContacts.splice(contactIndex, 1)"><CloseIcon class="fill-current"></CloseIcon></div>
							</div>
						</div> -->
					</div>
					<div class="flex justify-between">
						<button type="submit" class="btn btn-outline-primary btn-md"><span>Add booking</span></button>
						<button type="button" class="btn" @click="close">Cancel</button>
					</div>
				</vue-form-validate>
			</template>

			<!-- Manage booking -->
			<template v-else>
				<template v-if="!clonedBooking.type">
					<div class="flex-grow">
						<h5 class="font-semibold text-xl mb-4">{{ (clonedBooking.service || clonedBooking.booking_link).name }}</h5>

						<div class="mb-4">
							<label>Guests</label>
							<div v-for="bookingUser in clonedBooking.booking_users" :key="bookingUser.id" class="flex items-center mb-3">
								<div>
									<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + bookingUser.user.profile_image + ')' }">
										<span v-if="!bookingUser.user.profile_image" class="uppercase">{{ bookingUser.user.initials || bookingUser.guest.email[0] }}</span>
									</div>
								</div>
								<div class="pl-1 text-sm font-semibold leading-tight">
									{{ bookingUser.user.full_name || bookingUser.guest.email }}
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
							<div class="flex justify-between">
								<label>Time</label>
								<VueCheckbox v-model="selectFromTimeslots" label="Select from timeslots"></VueCheckbox>
							</div>
							<div v-if="selectFromTimeslots" class="mt-2 overflow-x-scroll overflow-y-visible border bg-gray-50 rounded-lg">
								<table class="w-full" cellspacing="0" cellpadding="0">
									<tr class="relative">
										<td v-for="(timeslot, timeslotIndex) in timeslots" :key="timeslotIndex" class="border-right contact-td timeslot" :class="{ disabled: !timeslot.is_available, selected: selectedTimeslot.time == timeslot.time }" @click="selectTimeslot(timeslot)">
											<div class="items-center column px-1 bg-primary-400">
												<div class="timeslot-content">
													<p class="text-center" v-html="timeslotTime(timeslot)"></p>
												</div>
											</div>
										</td>
									</tr>
								</table>
							</div>
							<timerangepicker v-else @change="updateTime" :start="clonedBooking.start" :end="clonedBooking.end" class="mb-2"></timerangepicker>
						</div>

						<div>
							<label>Notes</label>
							<textarea class="resize-none" rows="3" v-model="clonedBooking.notes"></textarea>
						</div>

						<a v-if="booking.metadata.phone" :href="`tel:${booking.metadata.phone}`" class="text-sm mt-4 inline-flex items-center bg-gray-100 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200"><CallMenuIcon class="w-4 h-4 mr-1 fill-current text-primary"></CallMenuIcon> {{ booking.metadata.phone }}</a>
						<a v-if="booking.metadata.skype" :href="`skype:${booking.metadata.skype}?chat`" class="text-sm mt-4 inline-flex items-center bg-gray-100 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200"><SkypeIcon class="w-4 h-4 mr-1"></SkypeIcon> {{ booking.metadata.skype }}</a>
					</div>

					<div class="flex justify-between">
						<button type="button" class="btn btn-outline-primary btn-md" @click="update"><span>Save changes</span></button>
						<button type="button" class="btn" @click="confirmDelete">DELETE</button>
					</div>
				</template>
				<template v-else-if="clonedBooking.type == 'google-event'">
					<div class="flex-grow">
						<div class="text-sm text-muted">Google Event</div>
						<h5 class="font-semibold text-xl mb-4">{{ clonedBooking.summary }}</h5>

						<label class="-mb-1">Date</label>
						<div>{{ dayjs(clonedBooking.start.date || clonedBooking.start.dateTime).format('MMMM DD, YYYY') }}</div>
						<div>{{ dayjs(clonedBooking.start.date || clonedBooking.start.dateTime).format('hh:mmA') }} - {{ dayjs(clonedBooking.end.date || clonedBooking.end.dateTime).format('hh:mmA') }}</div>
					</div>
					<div class="flex justify-between">
						<button type="button" class="btn" @click="close">Close</button>
					</div>
				</template>
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
