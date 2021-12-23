<template>
	<div class="min-h-screen" v-if="bookingLink">
		<div class="content-header border-bottom flex items-center lg:static fixed w-full bg-white z-10">
			<router-link to="/dashboard/booking-links" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
			{{ bookingLink.name }} ({{ bookingLink.duration }} mins)
		</div>
		<div class="h-20 lg:hidden block" />
		<div class="p-6 md:p-8">
			<div class="text-sm text-muted mb-4" v-if="bookingLink.is_booked">This match up link has been booked already.</div>
			<div>
				<div class="flex flex-col lg:flex-row justify-between items-end lg:items-center">
					<div class="order-2 mt-5 lg:order-none lg:mt-0 w-full lg:w-8/12">
						<div v-for="(date, dateKey) in bookingLink.dates" :key="dateKey" class="cursor-pointer border border-primary rounded-md text-center py-2 px-3 uppercase text-primary font-semibold font-serif text-xs tems-center inline-block mr-2 mb-2" :class="{ 'bg-primary text-white': dateKey == selectedDate }" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
							<span class="-bottom-px relative"> {{ dayjs(dateKey).format('MMMM D YYYY') }} </span>
						</div>
					</div>
					<div v-if="!bookingLink.is_booked" class="flex items-center order-1 lg:order-none service__show-menus">
						<button type="button" class="btn btn-sm btn-outline-primary" @click="$refs.sendModal.show()"><span>Send email invitation</span></button>
						<button type="button" class="btn btn-sm btn-outline-primary mx-2 mt-1 md:mt-0" @click="copyToClipboard()"><span>Copy link</span></button>
						<VueDropdown :options="['Send email invitation', 'Copy link', 'Delete']" @click="action">
							<template #button>
								<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100 service__show-menus_extra">
									<MoreIcon class="w-4 h-4"></MoreIcon>
								</div>
							</template>
						</VueDropdown>
					</div>
				</div>
				<div class="relative mt-8">
					<div class="overflow-x-scroll overflow-y-visible pb-4 booking-links__timeslots">
						<table class="timeslots-table" cellspacing="0" cellpadding="0">
							<tr>
								<td></td>
								<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right timeslot-heading">
									<div class="text-center px-2 bg-white relative z-10 -mb-2">
										<toggle-switch :value="timeslot.is_available" @input="toggleTimeslot(timeslot)"></toggle-switch>
									</div>
								</td>
							</tr>

							<!-- You -->
							<tr>
								<td class="headcol contact-td mt-4 rounded-bl-lg rounded-tl-lg bg-primary-ultralight">
									<div class="flex items-center py-3 -ml-3">
										<div>
											<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + $root.auth.profile_image + ')' }">
												<span v-if="!$root.auth.profile_image">{{ $root.auth.initials }}</span>
											</div>
										</div>
										<div class="pl-2">
											<p class="text-sm whitespace-nowrap">You</p>
											<p class="flex items-center tracking-wide text-xxs text-muted">{{ $root.auth.timezone }}</p>
										</div>
									</div>
								</td>

								<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot relative" :data-index="timeslotIndex" :class="{ disabled: !timeslot.is_available || !editable }">
									<div class="items-center column mt-4 bg-primary-ultralight">
										<div class="timeslot-content" :class="{ selected: hasSelected($root.auth, timeslot) }">
											<p class="text-center" v-html="timeslotTime(timeslot.time, $root.auth.timezone)"></p>
										</div>
									</div>
								</td>
							</tr>

							<!-- Contacts -->
							<template v-for="contact in bookingLink.booking_link_contacts">
								<tr v-if="contact.contact" :key="contact.id">
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
										<span v-if="(contact.suggestedTimeslots || []).find(s => s.time == timeslot.time)" class="suggested" :style="{ borderColor: contact.color.replace('0.1', '1') }">
											<div class="profile-image profile-image-xs inline-block -mt-1" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
												<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
											</div>
										</span>
										<div class="items-center column mt-4 px-1" :style="{ backgroundColor: contact.color }">
											<div class="timeslot-content" :class="{ selected: hasSelected(contact.contact.contact_user, timeslot) }">
												<p class="text-center" v-html="timeslotTime(timeslot.time, contact.contact.contact_user.timezone)"></p>
											</div>
										</div>
									</td>
								</tr>
							</template>

							<!-- Emails -->
							<tr v-for="email in bookingLink.emails" :key="email.email">
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
									<span v-if="(email.suggestedTimeslots || []).find(s => s.time == timeslot.time)" class="suggested" :style="{ borderColor: email.color.replace('0.1', '1') }">
										<div class="profile-image profile-image-xs inline-block -mt-1">
											<span>{{ email.email[0] }}</span>
										</div>
									</span>
									<div class="items-center column mt-4 px-1" :style="{ backgroundColor: email.color }">
										<div class="timeslot-content" :class="{ selected: hasSelected(email, timeslot) }">
											<p class="text-center" v-html="timeslotTime(timeslot.time, email.timezone)"></p>
										</div>
									</div>
								</td>
							</tr>

							<tr>
								<td></td>
								<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex">
									<button v-if="isBookable(timeslot)" class="text-xs bg-primary rounded-xl text-white w-full py-0.5" type="button" @click="book(timeslot)"><span>Book</span></button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>

		<Modal ref="deleteModal">
			<h6 class="font-serif font-semibold mb-5 uppercase text-center">Delete Match Up Link</h6>
			<p class="text-center mt-3">Are you sure to delete this match up link?</p>
			<div class="flex items-center justify-between mt-6">
				<button class="btn btn-outline-primary btn-md" type="button" @click="$refs.deleteModal.hide()">
					<span>Cancel</span>
				</button>
				<button class="btn btn-red btn-md" type="button" @click="destroy">
					<span>Delete</span>
				</button>
			</div>
		</Modal>

		<Modal ref="sendModal" :noBackdropHide="true">
			<h6 class="font-serif font-semibold mb-5 uppercase">Send Invitation Link</h6>
			<p class="mb-2">You are sending invitation link to these emails:</p>
			<template v-for="contact in bookingLink.booking_link_contacts">
				<span v-if="contact.contact" class="badge badge-secondary line-height-base mr-1" :key="contact.id">
					{{ contact.contact.contact_user.email }}
				</span>
			</template>
			<span class="badge badge-secondary line-height-base mr-1" v-for="email in bookingLink.emails" :key="email.email">
				{{ email.email }}
			</span>
			<div class="flex items-center mt-6 justify-between">
				<button :disabled="sendingEmail" class="btn btn-outline-primary btn-md" type="button" @click="$refs.sendModal.hide(true)"><span>Cancel</span></button>
				<vue-button :loading="sendingEmail" button_class="btn btn-primary btn-md" type="button" @click="sendEmail"><span>Send</span></vue-button>
			</div>
		</Modal>

		<Modal ref="bookingSuccessModal" noBackdropHide size="sm">
			<div v-if="booking">
				<button type="button" @click="$refs.bookingSuccessModal.hide(true)" class="absolute top-3 right-3 rounded-full p-2 border text-gray-600 ml-1 transition-colors hover:bg-gray-200 focus:outline-none"><CloseIcon class="fill-current"></CloseIcon></button>

				<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">WELL DONE! BOOKING CONFIRMED.</h6>
				<div class="text-sm">
					<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ bookingLink.duration }} min</span>
				</div>

				<div class="bg-gray-50 rounded-2xl p-4 mt-5">
					<h6 class="font-semibold">{{ formatDate(booking.date) }} ({{ dayjs(booking.date).format('dddd') }})</h6>
					<div>{{ timezoneTime(booking.start, $root.auth.timezone) }} - {{ timezoneTime(booking.end, $root.auth.timezone) }}</div>
				</div>
			</div>
		</Modal>

		<chatroom v-if="channel" :booking-link="bookingLink" :channel="channel"></chatroom>
	</div>
</template>

<script type="text/javascript" src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
