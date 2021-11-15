<template>
	<div class="container py-6">
		<div class="flex justify-center">
			<div class="lg:w-5/12 p-4" v-if="booking">
				<div class="bg-white rounded-xl p-4 mb-4">
					<h1 class="font-bold text-2xl">{{ booking.service.name }}</h1>
					<h3 class="text-muted text-sm mb-4">
						{{ booking.service.duration }} min event with <strong>{{ booking.service.coach.full_name }}</strong>
					</h3>

					<label>Date</label>
					<v-date-picker class="relative" is-required :value="booking.date" :min-date="new Date()" :popover="{ visibility: 'click' }" :masks="masks" @input="setBookingDate">
						<template v-slot="{ inputValue, inputEvents }">
							<div class="input-prefix inline-block">
								<div class="input-icon">
									<CalendarIcon></CalendarIcon>
								</div>
								<input type="text" readonly :value="inputValue" v-on="inputEvents" data-required class="cursor-pointer" />
							</div>
						</template>
					</v-date-picker>

					<div class="my-4">
						<div class="flex justify-between">
							<div>
								<label>Time</label>
								{{ convertTime(booking.start, 'hh:mmA') }} - {{ convertTime(booking.end, 'hh:mmA') }} ({{ timezone }})
							</div>
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
						<timerangepicker v-else hideClearButton @change="updateTime" :start="booking.start" :end="booking.end" class="mb-2 mt-4"></timerangepicker>
					</div>

					<label>Guests</label>
					<div class="flex mb-4">
						<div v-for="bookingUser in booking.booking_users" :key="bookingUser.id" class="text-sm py-1 px-2 rounded bg-gray-50 mr-1 font-bold">{{ bookingUser.user ? bookingUser.user.full_name : bookingUser.guest['email'] }}</div>
					</div>

					<label class="-mb-px">Meeting Type</label>
					<div class="text-sm mb-4">{{ booking.meeting_type }}</div>

					<label class="-mb-px">Notes</label>
					<div class="text-sm mb-4">{{ booking.notes || '-' }}</div>

					<div class="text-sm">
						<label class="-mb-px">Add to calendar</label>
						<a target="_blank" class="text-primary" :href="booking.google_link">
							<strong><u>Google Calendar</u></strong>
						</a>
						&nbsp;&nbsp;
						<a target="_blank" class="text-primary" :href="booking.outlook_link">
							<strong><u>Outlook</u></strong>
						</a>
						&nbsp;&nbsp;
						<a target="_blank" class="text-primary" :href="booking.yahoo_link">
							<strong><u>Yahoo!</u></strong>
						</a>
						&nbsp;&nbsp;
						<a target="_blank" class="text-primary" :href="booking.ical_link">
							<strong><u>iCal</u></strong>
						</a>
					</div>
				</div>
				<div class="flex justify-between">
					<button type="button" class="btn" @click="confirmDelete">DELETE</button>
					<button v-if="changed" type="button" class="btn btn-outline-primary btn-md" @click="update"><span>Save changes</span></button>
				</div>
			</div>
		</div>

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
	</div>
</template>

<script src="./booking.js"></script>

<style lang="scss" scoped src="./booking.scss"></style>
