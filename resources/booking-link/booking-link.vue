<template>
	<div class="p-12 h-full">
		<h1 class="font-serif font-bold text-xl uppercase mb-6">{{ bookingLink.name }} ({{ bookingLink.duration }} mins)</h1>

		<div v-if="bookingLink.booking_link_contacts.length > 0">
			<div v-for="(date, dateKey) in bookingLink.dates" :key="dateKey" class="cursor-pointer border border-primary rounded-md text-center py-2 px-3 uppercase text-primary font-semibold font-serif text-xs tems-center inline-block mr-2" :class="{ 'bg-primary text-white': dateKey == selectedDate }" type="button" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
				<span class="-bottom-px relative"> {{ dayjs(dateKey).format('MMMM D YYYY') }} </span>
			</div>

			<div class="flex justify-end relative mt-10">
				<div class="overflow-x-scroll overflow-y-visible  pb-4" style="margin-left: 200px">
					<table class="w-full timeslots-table" cellspacing="0" cellpadding="0">
						<tr v-if="bookingLink.user_id != auth.id">
							<td></td>
							<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right">
								<div class="text-center px-2 pb-2 bg-white">
									<VueCheckbox v-if="!bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time)" v-model="timeslot.is_suggested" @input="toggleTimeslot($event, timeslot)"></VueCheckbox>
									<button v-else class="text-xs bg-primary rounded-xl text-white w-full py-0.5" type="button" @click="requestToBook(timeslot)"><span>Book</span></button>
								</div>
							</td>
						</tr>

						<tr v-for="contact in bookingLink.booking_link_contacts" :key="contact.id" class="relative">
							<td class="headcol contact-td mb-2 rounded-bl-lg rounded-tl-lg" :style="{ backgroundColor: contact.color }">
								<div class="flex items-center py-3 -ml-3">
									<div>
										<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
											<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
										</div>
									</div>
									<div class="pl-2">
										<p class="text-sm whitespace-nowrap">{{ contact.contact.full_name }}</p>
										<p class="flex items-center tracking-wide text-xxs text-muted">{{ contact.contact.contact_user.timezone }}</p>
									</div>
								</div>
							</td>
							<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot relative" :data-index="timeslotIndex" :class="{ disabled: !timeslot.is_available }">
								<span v-if="(contact.suggestedTimeslots || []).find(s => s.time == timeslot.time)" class="suggested" :style="{ borderColor: contact.color.replace('0.1', '1') }">
									<div class="profile-image profile-image-xs inline-block -mt-1" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
										<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
									</div>
								</span>
								<div class="items-center column  mb-4 px-1" :style="{ backgroundColor: contact.color }">
									<div class="timeslot-content" :class="{ selected: bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time) }">
										<p class="text-center" v-html="timeslotTime(timeslot.time, contact)"></p>
									</div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>

		<Modal ref="requestModal" :noBackdropHide="true" size="sm">
			<div class="text-center py-5">
				<div class="spinner"></div>
				<div class="text0sm text-muted mt-4">Waiting for the other guests..</div>
			</div>
		</Modal>

		<Modal ref="requestingModal" :noBackdropHide="true" size="sm">
			<div v-if="requestData" class="text-sm">
				<h6 class="font-serif font-semibold mb-5 uppercase text-center">Booking Request</h6>
				<strong>{{ requestData.contact.contact.full_name }}</strong> is requesting to book a timeslot with the following details:
				<div class="flex items-center mt-4">
					<div class="w-1/6 text-muted">Date:</div>
					<div>{{ formatDate(requestData.date) }}</div>
				</div>
				<div class="flex items-center mt-1">
					<div class="w-1/6 text-muted">Time:</div>
					<div>{{ timezoneTime(requestData.timeslot.time, auth.timezone) }} ({{ auth.timezone }})</div>
				</div>
				<div class="grid grid-cols-2 gap-x-6 mt-6">
					<div>
						<button type="button" class="btn btn-md btn-outline-primary w-full" @click="declineRequest"><span>Decline</span></button>
					</div>
					<div>
						<button type="button" class="btn btn-md btn-primary w-full" @click="acceptRequest"><span>Accept</span></button>
					</div>
				</div>
			</div>
		</Modal>

		<Modal ref="loginModal" size="modal-sm" :close-button="false">
			<h4 class="font-heading mb-3">
				<span class="text-capitalize">{{ authAction }}</span> to continue
			</h4>
			<vue-form-validate @submit="login" v-if="authAction == 'login'">
				<div class="form-group mb-2">
					<input type="email" disabled readonly class="form-control" :value="email" data-required />
				</div>
				<div class="form-group">
					<input type="password" class="form-control" v-model="loginForm.password" placeholder="Password" data-required />
				</div>
				<button class="btn-block btn btn-primary" type="submit">Log In</button>
				<div class="text-center">
					<button class="btn" type="button" @click="authAction = 'register'">Sign Up</button>
				</div>
			</vue-form-validate>

			<vue-form-validate @submit="register" v-else-if="authAction == 'register'">
				<div class="form-group mb-2">
					<input type="email" disabled readonly class="form-control" :value="email" data-required />
				</div>
				<div class="form-group">
					<input type="text" class="form-control" v-model="signupForm.firstName" placeholder="First Name" data-required />
				</div>
				<div class="form-group">
					<input type="text" class="form-control" v-model="signupForm.lastName" placeholder="Last Name" data-required />
				</div>
				<div class="form-group">
					<input type="password" class="form-control" v-model="signupForm.password" placeholder="Password" data-required />
				</div>
				<button class="btn-block btn btn-primary" type="submit">Sign Up</button>
				<div class="text-center">
					<button class="btn" type="button" @click="authAction = 'login'">Log In</button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="bookingModal" :noBackdropHide="true" size="sm">
			<div class="text-center py-5">
				<div class="spinner"></div>
				<div class="text0sm text-muted mt-4">Creating your booking..</div>
			</div>
		</Modal>

		<Modal ref="bookingSuccessModal" :noBackdropHide="true" size="sm">
			<div v-if="booking">
				<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">WELL DONE! BOOKING CONFIRMED.</h6>
				<p class="mb-8">
					A calendar invite is on it’s way to your e-mail address.
				</p>
				<h4 class="mb-2 font-bold text-xl">{{ bookingLink.name }}</h4>
				<div class="text-sm">
					<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ bookingLink.duration }} min</span> &nbsp;&nbsp;&nbsp; Booking with <strong>{{ bookingLink.user.full_name }}</strong>
				</div>

				<div class="bg-gray-50 rounded-2xl p-4 mt-5">
					<h6 class="font-semibold">{{ formatDate(booking.date) }} ({{ dayjs(booking.date).format('dddd') }})</h6>
					<div>{{ timezoneTime(booking.start, auth.timezone) }} - {{ timezoneTime(booking.end, auth.timezone) }}</div>

					<VueDropdown @click="addToCalendar($event, booking)" :options="['Google Calendar', 'MS Outlook', 'Yahoo', 'iCal (.ics file download)']" class="mt-4">
						<template #button>
							<button class="btn btn-primary btn-sm flex items-center" type="button"><span>Add To Calendar</span><ChevronDownIcon class="fill-current"></ChevronDownIcon></button>
						</template>
					</VueDropdown>
				</div>
			</div>
		</Modal>

		<chatroom :booking-link="bookingLink"></chatroom>
	</div>
</template>

<script type="text/javascript" src="./booking-link.js"></script>

<style lang="scss" scoped src="./booking-link.scss"></style>
