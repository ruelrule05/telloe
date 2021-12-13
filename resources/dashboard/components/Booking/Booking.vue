<template>
	<div class="booking" :class="{ open: open }">
		<button type="button" @click="close" class="absolute bg-primary top-3 right-3 rounded-full p-2 text-white ml-1 transition-colors hover:bg-primary-light focus:outline-none"><CloseIcon class="fill-current"></CloseIcon></button>
		<template v-if="booking">
			<!-- New booking -->
			<template v-if="newEvent">
				<vue-form-validate @submit="createBooking" class="flex flex-col h-full">
					<div class="flex-grow">
						<div>
							<input type="text" class="border-bottom bg-transparent rounded-none border-0 shadow-none mb-4 pl-0 pr-5 py-2 focus:ring-0 text-xl font-base" placeholder="Name your booking" data-required v-model="clonedBooking.name" />
						</div>
						<label :required="organization ? true : false">Event Type</label>
						<VueSelect :disabled="disableServiceSelect" :options="servicesOptions" :required="organization ? true : false" placeholder="Select event type" class="mb-4" v-model="clonedBooking.service" dropPosition="w-full"></VueSelect>
						<template v-if="organization">
							<label required>Member</label>
							<VueSelect :options="membersOptions" :disabled="clonedBooking.service ? false : true" required :placeholder="clonedBooking.service ? 'Select member' : 'Choose an event type above'" class="mb-4" v-model="clonedBooking.member" dropPosition="w-full"></VueSelect>
						</template>
						<v-date-picker
							class="relative"
							is-required
							v-model="clonedBooking.date"
							:masks="masks"
							:popover="{ visibility: 'focus' }"
							@input="
								$nextTick(() => {
									emitNewBookingDateChange();
								})
							"
						>
							<template v-slot="{ inputValue, inputEvents }">
								<label required>Date</label>
								<div class="input-prefix">
									<div class="input-icon">
										<CalendarIcon></CalendarIcon>
									</div>
									<input type="text" readonly :value="inputValue" v-on="inputEvents" data-required />
								</div>
							</template>
						</v-date-picker>

						<div class="my-4">
							<label required>Timezone</label>
							<vue-select required :options="availableTimezones" drop-position="top w-full" searchable v-model="clonedBooking.timezone"></vue-select>
						</div>

						<div class="my-4">
							<div class="flex mb-3 text-muted btn-tabs">
								<div class="btn-tab" :class="{ active: !selectFromTimeslots }" @click="selectFromTimeslots = false">
									<span>FROM-TO</span>
								</div>
								<div class="btn-tab" :class="{ active: selectFromTimeslots }" @click="selectFromTimeslots = true">
									<span>TIMESLOTS</span>
								</div>
							</div>

							<div v-if="selectFromTimeslots" class="mt-2 overflow-x-scroll overflow-y-hidden rounded-lg pb-1 timeslots-table">
								<table class="w-full relative z-10" cellspacing="0" cellpadding="0">
									<tr class="relative">
										<template v-for="(timeslot, timeslotIndex) in timeslots">
											<td v-if="timeslot.is_available" :key="timeslotIndex" class="border-right text-center" :class="{ selected: selectedTimeslot.time == timeslot.time }">
												<div class="bg-white pb-2">
													<VueCheckbox :value="clonedBooking.start == timeslot.time" @input="selectTimeslot($event, timeslot)"></VueCheckbox>
												</div>
												<div class="px-1 pt-1 bg-gray-50">
													<div class="items-center column bg-primary-400">
														<div class="timeslot-content">
															<p class="text-center" v-html="timeslotTime(timeslot)"></p>
														</div>
													</div>
												</div>
											</td>
										</template>
									</tr>
								</table>
							</div>
							<timerangepicker dropdownWFull hideClearButton clockIcon v-else @change="emitNewBookingDateChange" :start="clonedBooking.start" :end="clonedBooking.end" class="mb-2"></timerangepicker>
						</div>

						<label required>Guests</label>
						<div v-if="contact">
							{{ contact.contact_user.full_name }}
						</div>
						<multiselect v-else v-model="selectedContacts" ref="selectedContacts" label="name" track-by="id" :options="contactsOptions" :showLabels="false" placeholder="Select contact or add an email" multiple clearOnSelect>
							<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
							<div slot="noResult" slot-scope="data" class="text-muted text-sm text-center">
								<button
									v-if="isEmail.validate(data.search)"
									type="button"
									@click="
										emailToAdd.email = data.search;
										$refs.addEmailModal.show();
									"
									class="btn btn-sm btn-outline-primary"
								>
									<span>Add this email</span>
								</button>
								<span v-else>No contacts found.</span>
							</div>
						</multiselect>

						<label class="mt-4" required>Meeting Type</label>
						<VueSelect required :disabled="!clonedBooking.service" :options="meetingTypes" noValuePlaceholder="No meeting types available" placeholder="Select meeting type" class="mb-4" dropPosition="top w-full" v-model="clonedBooking.meeting_type"></VueSelect>

						<VueCheckbox v-model="clonedBooking.is_recurring" label="Recurring"></VueCheckbox>
						<div v-if="clonedBooking.is_recurring" class="relative mt-2 mb-4" v-click-outside="() => (recurringMenu = false)">
							<div class="bg-gray-50 rounded-xl p-3" :class="{ show: recurringMenu }">
								<div class="flex">
									<button class="flex-grow btn btn-sm mr-1" type="button" :class="[clonedBooking.recurring_frequency == 'week' ? 'btn-primary' : 'btn-outline-primary']" @click="$set(clonedBooking, 'recurring_frequency', 'week')"><span>Weekly</span></button>
									<button class="flex-grow btn btn-sm ml-1" type="button" :class="[clonedBooking.recurring_frequency == 'month' ? 'btn-primary' : 'btn-outline-primary']" @click="$set(clonedBooking, 'recurring_frequency', 'month')"><span>Monthly</span></button>
								</div>
								<div class="text-muted text-xs mt-4">Repeat on these days (one or multiple):</div>
								<div class="flex space-x-2 mt-3">
									<div @click="timeslotToggleDay(dayIndex)" v-for="(day, dayIndex) in days" class="badge-day" :class="{ active: clonedBooking.recurring_days.indexOf(dayIndex) > -1 }" :key="dayIndex">
										<span class="absolute-center bottom-px">{{ day.substring(0, 1) }}</span>
									</div>
								</div>

								<div class="mt-4">
									<v-date-picker class="relative" :min-date="new Date()" mode="date" :popover="{ placement: 'top', visibility: 'click' }" v-model="clonedBooking.recurring_end" :masks="masks">
										<template v-slot="{ inputValue, inputEvents }">
											<button type="button" class="input bg-white text-left" v-on="inputEvents">
												<span class="text-muted text-sm mr-2">Until</span>
												{{ inputValue }}
											</button>
										</template>
									</v-date-picker>
								</div>
							</div>
						</div>

						<div class="my-4">
							<label>Notes</label>
							<textarea class="resize-none" rows="3" v-model="clonedBooking.notes"></textarea>
						</div>
					</div>
					<div class="flex justify-between items-center pb-6">
						<vue-button type="submit" :loading="loading" theme="primary" button_class="btn btn-outline-primary btn-md">
							<span>Add booking</span>
						</vue-button>
						<button type="button" class="btn" @click="close">Cancel</button>
					</div>
				</vue-form-validate>
			</template>

			<!-- Manage booking -->
			<template v-else>
				<!-- Booking -->
				<template v-if="!clonedBooking.type">
					<vue-form-validate @submit="update" class="flex flex-col h-full">
						<div class="flex-grow">
							<h5 class="font-semibold text-xl mb-4">{{ clonedBooking.name }}</h5>

							<div v-if="clonedBooking.service && clonedBooking.service.type == 'custom'" class="my-4">
								<label class="block -mb-px">Event Type</label>
								<div class="font-semibold">{{ clonedBooking.service.name }}</div>
							</div>

							<div v-if="organization" class="mb-4">
								<label required>Member</label>
								<VueSelect :options="manageBookingMembersOptions" :disabled="clonedBooking.service ? false : true" required :placeholder="clonedBooking.service ? 'Select member' : 'Choose an event type above'" class="mb-4" v-model="clonedBooking.service_id" dropPosition="w-full"></VueSelect>
							</div>

							<v-date-picker class="relative" is-required v-model="clonedBooking.date" :masks="masks" :popover="{ visibility: 'focus' }">
								<template v-slot="{ inputValue, inputEvents }">
									<label required>Date</label>
									<div class="input-prefix">
										<div class="input-icon">
											<CalendarIcon></CalendarIcon>
										</div>
										<input type="text" :value="inputValue" v-on="inputEvents" />
									</div>
								</template>
							</v-date-picker>

							<div class="my-4">
								<label>Timezone</label>
								<vue-select :options="availableTimezones" drop-position="top w-full" searchable v-model="clonedBooking.timezone"></vue-select>
							</div>

							<div class="my-4">
								<div class="flex mb-3 text-muted btn-tabs">
									<div class="btn-tab" :class="{ active: !selectFromTimeslots }" @click="selectFromTimeslots = false">
										<span>FROM-TO</span>
									</div>
									<div class="btn-tab" :class="{ active: selectFromTimeslots }" @click="selectFromTimeslots = true">
										<span>TIMESLOTS</span>
									</div>
								</div>

								<div v-if="selectFromTimeslots" class="mt-2 overflow-x-scroll overflow-y-hidden rounded-lg pb-1 timeslots-table">
									<table class="w-full relative z-10" cellspacing="0" cellpadding="0">
										<tr class="relative">
											<template v-for="(timeslot, timeslotIndex) in timeslots">
												<td v-if="timeslot.is_available" :key="timeslotIndex" class="border-right text-center" :class="{ selected: selectedTimeslot.time == timeslot.time }">
													<div class="bg-white pb-2">
														<VueCheckbox :value="clonedBooking.start == timeslot.time" @input="selectTimeslot($event, timeslot)"></VueCheckbox>
													</div>
													<div class="px-1 pt-1 bg-gray-50">
														<div class="items-center column bg-primary-400">
															<div class="timeslot-content">
																<p class="text-center" v-html="timeslotTime(timeslot)"></p>
															</div>
														</div>
													</div>
												</td>
											</template>
										</tr>
									</table>
								</div>
								<timerangepicker dropdownWFull hideClearButton clockIcon v-else @change="emitNewBookingDateChange" :start="clonedBooking.start" :end="clonedBooking.end"></timerangepicker>
								<small v-if="timezone != clonedBooking.timezone" class="text-muted">Your time: {{ convertTime(timezoneTimeGet.get(`${clonedBooking.date} ${clonedBooking.start}`, clonedBooking.timezone, timezone), 'hh:mmA') }} - {{ convertTime(timezoneTimeGet.get(`${clonedBooking.date} ${clonedBooking.end}`, clonedBooking.timezone, timezone), 'hh:mmA') }}</small>
							</div>

							<div class="my-4">
								<label>Notes</label>
								<textarea class="resize-none" rows="3" v-model="clonedBooking.notes"></textarea>
							</div>
							<div class="my-4">
								<VueCheckbox v-model="clonedBooking.is_recurring" label="Recurring"></VueCheckbox>
								<div v-if="clonedBooking.is_recurring" class="relative mt-2 mb-4" v-click-outside="() => (recurringMenu = false)">
									<div class="bg-gray-50 rounded-xl p-3" :class="{ show: recurringMenu }">
										<div class="flex">
											<button class="flex-grow btn btn-sm mr-1" type="button" :class="[clonedBooking.recurring_frequency == 'week' ? 'btn-primary' : 'btn-outline-primary']" @click="$set(clonedBooking, 'recurring_frequency', 'week')"><span>Weekly</span></button>
											<button class="flex-grow btn btn-sm ml-1" type="button" :class="[clonedBooking.recurring_frequency == 'month' ? 'btn-primary' : 'btn-outline-primary']" @click="$set(clonedBooking, 'recurring_frequency', 'month')"><span>Monthly</span></button>
										</div>
										<div class="text-muted text-xs mt-4">Repeat on these days (one or multiple):</div>
										<div class="flex space-x-2 mt-3">
											<div @click="timeslotToggleDay(dayIndex)" v-for="(day, dayIndex) in days" class="badge-day" :class="{ active: clonedBooking.recurring_days.indexOf(dayIndex) > -1 }" :key="dayIndex">
												<span class="absolute-center bottom-px">{{ day.substring(0, 1) }}</span>
											</div>
										</div>

										<div class="mt-4">
											<v-date-picker class="relative" :min-date="dayjs(clonedBooking.date).toDate()" mode="date" :popover="{ placement: 'top', visibility: 'click' }" v-model="clonedBooking.recurring_end" :masks="masks">
												<template v-slot="{ inputValue, inputEvents }">
													<button type="button" class="input bg-white text-left" v-on="inputEvents">
														<span class="text-muted text-sm mr-2">Until</span>
														{{ inputValue }}
													</button>
												</template>
											</v-date-picker>
										</div>
									</div>
								</div>
							</div>

							<template v-if="!contact">
								<label required>Guests</label>
								<multiselect v-model="selectedContacts" ref="selectedContacts" label="name" track-by="email" :options="contactsOptions" :showLabels="false" placeholder="Select contact or add an email" multiple clearOnSelect>
									<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
									<div slot="noResult" slot-scope="data" class="text-muted text-sm text-center">
										<button
											v-if="isEmail.validate(data.search)"
											type="button"
											@click="
												emailToAdd.email = data.search;
												$refs.addEmailModal.show();
											"
											class="btn btn-sm btn-outline-primary"
										>
											<span>Add this email</span>
										</button>
										<span v-else>No contacts found.</span>
									</div>
								</multiselect>
							</template>

							<div class="mt-4">
								<label class="-mb-px">Meeting Type</label>
								<div>{{ clonedBooking.meeting_type }}</div>
							</div>

							<template v-if="booking.metadata">
								<a v-if="booking.metadata.phone" :href="`tel:${booking.metadata.phone}`" class="text-sm mt-2 inline-flex items-center bg-gray-100 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200"><CallMenuIcon class="w-4 h-4 mr-1 fill-current text-primary"></CallMenuIcon> {{ booking.metadata.phone }}</a>
								<a v-if="booking.metadata.skype" :href="`skype:${booking.metadata.skype}?chat`" class="text-sm mt-2 inline-flex items-center bg-gray-100 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200"><SkypeIcon class="w-4 h-4 mr-1"></SkypeIcon> {{ booking.metadata.skype }}</a>
							</template>

							<a v-if="booking.meet_link" :href="booking.meet_link" target="_blank" class="text-sm mt-2 inline-flex items-center bg-gray-100 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200"><GoogleMeetIcon class="w-4 h-4 mr-1 fill-current text-primary"></GoogleMeetIcon> Google Meet</a>

							<a v-if="booking.zoom_link" :href="booking.zoom_link" target="_blank" class="text-sm mt-2 inline-flex items-center bg-gray-100 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200"><ZoomIcon class="w-4 h-4 mr-1 fill-current text-primary"></ZoomIcon> Zoom Meeting</a>

							<div v-if="clonedBooking.form_data && Object.keys(clonedBooking.form_data).length > 0" class="mt-4">
								<label class="-mb-px">Form Data</label>
								<div v-for="(formData, key) in JSON.parse(clonedBooking.form_data)" :key="key" class="mt-3">
									<strong class="-mb-px text-sm">{{ formData.label }} <span v-tooltip.right="key" class="tooltip-info"></span></strong>
									<div class="text-sm" v-html="parsedFormData(formData)"></div>
								</div>
							</div>
						</div>

						<div class="flex justify-between mt-4 items-center">
							<vue-button type="submit" theme="primary" :loading="loading" button_class="btn btn-outline-primary btn-md"><span>Save changes</span></vue-button>
							<button type="button" class="btn" @click="confirmDelete">DELETE</button>
						</div>
					</vue-form-validate>
				</template>

				<!-- Google Event -->
				<template v-else-if="clonedBooking.type == 'google-event'">
					<div class="flex-grow text-sm">
						<div class="text-sm text-muted">Google Event</div>
						<h5 class="font-semibold text-xl mb-4">{{ clonedBooking.summary }}</h5>

						<label class="-mb-px">Guests</label>
						<div v-for="attendee in clonedBooking.attendees" :key="attendee.email">{{ attendee.email }}</div>

						<label class="-mb-px mt-4">Date/time</label>
						<div>{{ dayjs(clonedBooking.date).format('MMMM DD, YYYY') }}</div>
						<div>
							{{ convertTime(clonedBooking.start, 'hh:mmA') }} - {{ convertTime(clonedBooking.end, 'hh:mmA') }}
							<div v-if="clonedBooking.timezone">({{ clonedBooking.timezone }} )</div>
						</div>

						<label class="-mb-px mt-4">Description</label>
						<div>
							<p v-html="decode(clonedBooking.description)"></p>
						</div>

						<label class="-mb-px mt-4">Location</label>
						<div>{{ clonedBooking.location || 'No location' }}</div>

						<label class="mt-4">Block timeslot</label>
						<VueCheckbox @input="toggleIncludeGoogleCalendar" :value="includeGoogleCalendar" label="Block this event's time in service timeslots."></VueCheckbox>
					</div>
				</template>

				<!-- Outlook Event -->
				<template v-else-if="clonedBooking.type == 'outlook-event'">
					<div class="flex-grow text-sm">
						<div class="text-sm text-muted">Outlook Event</div>
						<h5 class="font-semibold text-xl mb-4">{{ clonedBooking.subject }}</h5>

						<label class="-mb-px">Guests</label>
						<div v-for="attendee in clonedBooking.attendees" :key="attendee.email">{{ attendee.email }}</div>

						<label class="-mb-px mt-4">Date/time</label>
						<div>{{ dayjs(clonedBooking.date).format('MMMM DD, YYYY') }}</div>
						<div>
							{{ convertTime(clonedBooking.start, 'hh:mmA') }} - {{ convertTime(clonedBooking.end, 'hh:mmA') }}
							<div v-if="clonedBooking.originalStartTimeZone">({{ clonedBooking.originalStartTimeZone }} )</div>
						</div>

						<label class="-mb-px mt-4">Description</label>
						<div>
							<p v-html="decode(clonedBooking.body.content)"></p>
						</div>

						<label class="-mb-px mt-4">Location</label>
						<div>{{ clonedBooking.location.displayName || 'No location' }}</div>

						<label class="mt-4">Block timeslot</label>
						<VueCheckbox @input="toggleIncludeOutlookCalendar" :value="includeOutlookCalendar" label="Block this event's time in service timeslots."></VueCheckbox>
					</div>
				</template>

				<!-- Contact Booking -->
				<template v-else-if="clonedBooking.type == 'contact-booking'">
					<div class="flex-grow">
						<h5 class="font-semibold text-xl mb-4">{{ (clonedBooking.service || clonedBooking.booking_link).name }}</h5>

						<div class="mb-4">
							<label class="-mb-px">Coach</label>
							<span class="font-semibold">{{ clonedBooking.service.coach.full_name }}</span>
						</div>

						<div class="mb-4">
							<label>Guests</label>
							<div v-for="bookingUser in clonedBooking.booking_users" :key="bookingUser.id" class="flex items-center mb-3">
								<div>
									<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + (bookingUser.user || {}).profile_image + ')' }">
										<span v-if="!(bookingUser.user || {}).profile_image" class="uppercase">{{ bookingUser.user ? bookingUser.user.initials : bookingUser.guest.email[0] }}</span>
									</div>
								</div>
								<div class="pl-1 text-sm font-semibold leading-tight">
									{{ bookingUser.user ? bookingUser.user.full_name : bookingUser.guest.email }}
								</div>
							</div>
						</div>

						<label class="-mb-px">Date</label>
						<div class="mb-4">{{ dayjs(clonedBooking.date).format('MMMM DD, YYYY') }}</div>

						<label class="-mb-px">Time</label>
						<div class="mb-4">{{ timezoneTime(clonedBooking.start, $root.auth.timezone) }} - {{ timezoneTime(clonedBooking.end, $root.auth.timezone) }}</div>

						<div>
							<label>Type</label>
							<div>{{ clonedBooking.meeting_type }}</div>
						</div>
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

			<Modal ref="addEmailModal" size="sm">
				<h6 class="font-serif font-semibold mb-5 uppercase">Add Email</h6>
				<vue-form-validate @submit="addEmail">
					<div class="mb-4">
						<label required>Email</label>
						<input type="text" v-model="emailToAdd.email" data-required />
					</div>

					<div class="mb-4">
						<label>First Name</label>
						<input type="text" v-model="emailToAdd.first_name" />
					</div>

					<label>Last Name</label>
					<input type="text" v-model="emailToAdd.last_name" />

					<div class="mt-8 flex justify-between">
						<button class="btn btn-outline-primary btn-md" type="button" @click="$refs.addEmailModal.hide()">
							<span>Cancel</span>
						</button>
						<button class="btn btn-primary btn-md" type="submit">
							<span>Add</span>
						</button>
					</div>
				</vue-form-validate>
			</Modal>
		</template>
	</div>
</template>

<script src="./Booking.js"></script>
<style lang="scss" scoped src="./Booking.scss"></style>
