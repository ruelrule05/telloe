<template>
	<div class="min-h-screen" v-if="bookingLink">
		<div class="content-header border-bottom flex items-center">
			<router-link to="/dashboard/booking-links" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
			{{ bookingLink.name }} ({{ bookingLink.duration }} mins)
		</div>
		<div class="p-6">
			<div v-if="bookingLink.booking_link_contacts.length > 0">
				<div class="flex justify-between">
					<div>
						<div v-for="(date, dateKey) in bookingLink.dates" :key="dateKey" class="cursor-pointer border border-primary rounded-md text-center py-2 px-3 uppercase text-primary font-semibold font-serif text-xs tems-center inline-block mr-2" :class="{ 'bg-primary text-white': dateKey == selectedDate }" type="button" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
							<span class="-bottom-px relative"> {{ dayjs(dateKey).format('MMMM D YYYY') }} </span>
						</div>
					</div>
					<div>
						<VueDropdown :options="['Send email invitation', 'Copy link', 'Delete']" @click="action">
							<template #button>
								<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
									<MoreIcon class="w-4 h-4"></MoreIcon>
								</div>
							</template>
						</VueDropdown>
					</div>
				</div>
				<div class="flex justify-end relative mt-8">
					<div class="overflow-x-scroll overflow-y-visible pb-4" style="margin-left: 200px">
						<table class="w-full timeslots-table" cellspacing="0" cellpadding="0">
							<tr>
								<td></td>
								<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right">
									<div class="text-center px-2 pb-2 bg-white">
										<VueCheckbox v-model="timeslot.is_available" @input="toggleTimeslot($event, timeslot)"></VueCheckbox>
									</div>
								</td>
							</tr>
							<tr v-for="contact in bookingLink.booking_link_contacts" :key="contact.id" class="relative">
								<td class="headcol contact-td mb-4 rounded-bl-lg rounded-tl-lg" :style="{ backgroundColor: contact.color }">
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
		</div>

		<Modal ref="deleteModal">
			<h6 class="font-serif font-semibold mb-5 uppercase text-center">Delete Booking Link</h6>
			<p class="text-center mt-3">
				Are you sure to delete this booking link?
			</p>
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
			<span class="badge badge-secondary line-height-base mr-1" v-for="contact in bookingLink.booking_link_contacts" :key="contact.id">
				{{ contact.contact.contact_user.email }}
			</span>
			<span class="badge badge-secondary line-height-base mr-1" v-for="email in bookingLink.emails" :key="email.email">
				{{ email.email }}
			</span>
			<div class="flex items-center mt-6 justify-between">
				<button :disabled="sendingEmail" class="btn btn-outline-primary btn-md" type="button" @click="$refs.sendModal.hide(true)"><span>Cancel</span></button>
				<vue-button :loading="sendingEmail" button_class="btn btn-primary btn-md" type="button" @click="sendEmail"><span>Send</span></vue-button>
			</div>
		</Modal>

		<chatroom v-if="channel" :booking-link="bookingLink" :channel="channel"></chatroom>
	</div>
</template>

<script type="text/javascript" src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
