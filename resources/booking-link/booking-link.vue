<template>
	<div>
		<div class="border-bottom py-6">
			<div class="container mx-auto">
				<a href="/"><img src="/telloe.svg" alt="Telloe" class="h-5" /></a>
			</div>
		</div>
		<div class="container">
			<div class="py-12 h-full">
				<div class="grid grid-cols-2">
					<div>
						<h1 class="font-serif font-bold text-2xl text-primary mb-6">{{ bookingLink.name }}</h1>
					</div>
					<div>
						<p class="text-sm text-muted">{{ bookingLink.user.full_name }} invited you to a meeting. Select your available times by selecting a timeslot. Times picked by other people will appear highlighted on their schedule track.</p>
					</div>
				</div>

				<div class="py-10 flex items-center">
					<ClockIcon class="fill-current text-gray-300 h-4 w-4"></ClockIcon>
					<div class="pl-2">
						<strong class="text-muted text-sm">{{ bookingLink.duration }} min</strong>
					</div>
				</div>

				<div class="text-sm text-muted mb-4" v-if="bookingLink.is_booked">This match up link has been booked already.</div>
				<div>
					<div class="text-sm text-muted mb-3">PICK A DATE</div>
					<div v-for="(date, dateKey) in bookingLink.dates" :key="dateKey" class="cursor-pointer border border-primary rounded-md text-center py-2 px-3 uppercase text-primary font-semibold font-serif text-xs tems-center inline-block mr-2" :class="{ 'bg-primary text-white': dateKey == selectedDate }" type="button" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
						<span class="-bottom-px relative"> {{ dayjs(dateKey).format('MMMM D YYYY') }} </span>
					</div>

					<div class="relative mt-10">
						<div class="overflow-x-scroll overflow-y-visible pb-1" style="margin-left: 200px">
							<table class="timeslots-table" cellspacing="0" cellpadding="0">
								<tr v-if="auth.email && auth.email != bookingLink.user.email">
									<td></td>
									<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right">
										<div v-if="!bookingLink.is_booked && editable" class="text-center px-2 bg-white relative z-10">
											<VueCheckbox :disabled="timeslot.is_available ? false : true" :value="hasSelected(auth, timeslot)" @input="toggleSelectTimeslot($event, timeslot)"></VueCheckbox>
										</div>
									</td>
								</tr>

								<!-- You -->
								<tr v-if="auth.email">
									<td class="headcol contact-td mt-4 rounded-bl-lg rounded-tl-lg bg-primary-ultralight">
										<div class="flex items-center py-3 -ml-3">
											<div>
												<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + auth.profile_image + ')' }">
													<span v-if="!auth.profile_image">{{ auth.initials }}</span>
												</div>
											</div>
											<div class="pl-2">
												<p class="text-sm whitespace-nowrap">You</p>
												<p class="flex items-center tracking-wide text-xxs text-muted">{{ auth.timezone }}</p>
											</div>
										</div>
									</td>

									<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot relative" :data-index="timeslotIndex" :class="{ disabled: !timeslot.is_available || !editable }">
										<div class="items-center column mt-4 bg-primary-ultralight">
											<div class="timeslot-content" :class="{ selected: hasSelected(auth, timeslot) }">
												<p class="text-center px-1" v-html="timeslotTime(timeslot.time, auth.timezone)"></p>
											</div>
										</div>
									</td>
								</tr>

								<!-- Coach -->
								<tr v-if="!auth.email || auth.email != bookingLink.user.email">
									<td class="headcol contact-td mt-4 rounded-bl-lg rounded-tl-lg bg-primary-ultralight">
										<div class="flex items-center py-3 -ml-3">
											<div>
												<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + bookingLink.user.profile_image + ')' }">
													<span v-if="!bookingLink.user.profile_image">{{ bookingLink.user.initials }}</span>
												</div>
											</div>
											<div class="pl-2 overflow-hidden">
												<p class="text-sm whitespace-nowrap truncate">{{ bookingLink.user.full_name }}</p>
												<p class="flex items-center tracking-wide text-xxs text-muted">{{ bookingLink.user.timezone }}</p>
											</div>
										</div>
									</td>

									<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot relative" :data-index="timeslotIndex" :class="{ disabled: !timeslot.is_available || !editable }">
										<div class="items-center column mt-4 bg-primary-ultralight">
											<div class="timeslot-content" :class="{ selected: hasSelected(bookingLink.user, timeslot) }">
												<p class="text-center px-1" v-html="timeslotTime(timeslot.time, bookingLink.user.timezone)"></p>
											</div>
										</div>
									</td>
								</tr>

								<!-- Contacts -->
								<template v-for="contact in bookingLink.booking_link_contacts">
									<tr v-if="contact.contact && contact.contact.contact_user_id != (auth || {}).id && contact.contact.email != auth.email" :key="contact.id">
										<td class="headcol contact-td mt-4 rounded-bl-lg rounded-tl-lg" :style="{ backgroundColor: contact.color }">
											<div class="flex items-center py-3 -ml-3">
												<div>
													<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
														<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
													</div>
												</div>
												<div class="pl-2 overflow-hidden">
													<p class="text-sm whitespace-nowrap truncate">{{ contact.contact.full_name }}</p>
													<p class="flex items-center tracking-wide text-xxs text-muted">{{ contact.contact.contact_user.timezone }}</p>
												</div>
											</div>
										</td>
										<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot relative" :data-index="timeslotIndex" :class="{ disabled: !timeslot.is_available || !editable }">
											<div class="items-center column mt-4" :style="{ backgroundColor: contact.color }">
												<div class="timeslot-content" :class="{ selected: hasSelected(contact.contact.contact_user, timeslot) }">
													<p class="text-center px-1" v-html="timeslotTime(timeslot.time, contact.contact.contact_user.timezone)"></p>
												</div>
											</div>
										</td>
									</tr>
								</template>

								<!-- Emails -->
								<template v-for="email in bookingLink.emails">
									<tr :key="email.email" v-if="email.email != auth.email">
										<td class="headcol contact-td mt-4 rounded-bl-lg rounded-tl-lg" :style="{ backgroundColor: email.color }">
											<div class="flex items-center py-3 -ml-3">
												<div>
													<div class="profile-image profile-image-sm">
														<span class="uppercase">{{ email.email[0] }}</span>
													</div>
												</div>
												<div class="pl-2 overflow-hidden">
													<p class="text-sm whitespace-nowrap truncate">{{ email.email }}</p>
													<p class="flex items-center tracking-wide text-xxs text-muted">{{ email.timezone }}</p>
												</div>
											</div>
										</td>
										<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot relative" :data-index="timeslotIndex" :class="{ disabled: !timeslot.is_available || !editable }">
											<div class="items-center column mt-4" :style="{ backgroundColor: email.color }">
												<div class="timeslot-content" :class="{ selected: hasSelected(email, timeslot) }">
													<p class="text-center px-1" v-html="timeslotTime(timeslot.time, email.timezone)"></p>
												</div>
											</div>
										</td>
									</tr>
								</template>

								<tr>
									<td></td>
									<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex">
										<div v-if="bookingLink.booking_link_contacts.length + bookingLink.emails.length > 1" class="timeslots-matched" :class="{ show: isBookable(timeslot) }">
											<div>
												<span><CheckmarkIcon class="absolute-center w-3 h-3" /></span>
											</div>
											<span class="text-sm">Matched</span>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<button class="btn btn-primary btn-md mt-2" type="button" :disabled="!canBeBooked" @click="book">
							<span>Confirm Meeting</span>
						</button>
					</div>
				</div>

				<Modal ref="requestModal" noBackdropHide size="sm">
					<div class="text-center py-5">
						<div class="spinner"></div>
						<div class="text0sm text-muted mt-4">Waiting for the other guests..</div>
					</div>
				</Modal>

				<Modal ref="requestingModal" noBackdropHide size="sm">
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

				<Modal ref="bookingModal" noBackdropHide size="sm">
					<div class="text-center py-5">
						<div class="spinner"></div>
						<div class="text0sm text-muted mt-4">Creating your booking..</div>
					</div>
				</Modal>

				<Modal ref="bookingSuccessModal" noBackdropHide size="sm">
					<div v-if="booking">
						<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">WELL DONE! BOOKING CONFIRMED.</h6>
						<p class="mb-8">A calendar invite is on it’s way to your e-mail address.</p>
						<h4 class="mb-2 font-bold text-xl">{{ bookingLink.name }}</h4>
						<div class="text-sm">
							<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ bookingLink.duration }} min</span> &nbsp;&nbsp;&nbsp; Booking with <strong>{{ bookingLink.user.full_name }}</strong>
						</div>

						<div class="bg-gray-50 rounded-2xl p-4 mt-5">
							<h6 class="font-semibold">{{ formatDate(booking.date) }} ({{ dayjs(booking.date).format('dddd') }})</h6>
							<div>{{ timezoneTime(booking.start, auth.timezone) }} - {{ timezoneTime(booking.end, auth.timezone) }}</div>

							<VueDropdown dropPosition="top" @click="addToCalendar($event, booking)" :options="['Google Calendar', 'MS Outlook', 'Yahoo', 'iCal (.ics file download)']" class="mt-4">
								<template #button>
									<button class="btn btn-primary btn-sm flex items-center" type="button"><span>Add To Calendar</span><ChevronDownIcon class="fill-current"></ChevronDownIcon></button>
								</template>
							</VueDropdown>
						</div>
					</div>
				</Modal>

				<chatroom v-if="channel" :booking-link="bookingLink" :channel="channel"></chatroom>
			</div>
		</div>
		<Modal ref="authModal" size="sm" noBackdropHide>
			<h4 class="font-serif font-semibold uppercase mb-3">{{ authAction }} to select meeting time with {{ bookingLink.user.full_name }}</h4>
			<vue-form-validate @submit="login" v-if="authAction == 'login'">
				<div class="mb-4">
					<input type="email" v-model="email" placeholder="Email" data-required />
				</div>
				<div class="mb-4">
					<input type="password" v-model="loginForm.password" placeholder="Password" data-required />
				</div>

				<VueButton class="btn btn-primary w-full mt-4" :loading="loading" type="submit"><span>Log In</span></VueButton>
			</vue-form-validate>

			<vue-form-validate @submit="register" v-else-if="authAction == 'signup'">
				<div class="mb-4">
					<label required>Email</label>
					<input type="email" disabled readonly :value="email" data-required />
				</div>
				<div class="mb-4">
					<label required>Fist Name</label>
					<input type="text" v-model="signupForm.first_name" placeholder="First Name" data-required />
				</div>
				<div class="mb-4">
					<label required>Last Name</label>
					<input type="text" v-model="signupForm.last_name" placeholder="Last Name" data-required />
				</div>
				<div class="mb-4">
					<label required>Password</label>
					<input type="password" v-model="signupForm.password" placeholder="Password" data-required />
				</div>

				<VueButton class="btn btn-primary w-full mt-4" :loading="loading" type="submit"><span>Sign Up</span></VueButton>
			</vue-form-validate>
		</Modal>
	</div>
</template>

<script type="text/javascript" src="./booking-link.js"></script>

<style lang="scss" scoped src="./booking-link.scss"></style>
