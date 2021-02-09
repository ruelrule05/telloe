<template>
	<div class="p-4" v-if="bookingLink">
		<div class="d-flex align-items-center">
			<button class="btn p-1 btn-white badge-pill shadow-sm mb-3" type="button" @click="$router.go(-1)">
				<arrow-left-icon width="30" height="30"></arrow-left-icon>
			</button>
			<div class="dropdown ml-auto">
				<button class="btn p-2 btn-white badge-pill shadow-sm" data-toggle="dropdown" data-offset="-125, 5">
					<more-icon width="20" height="20" transform="scale(0.75)"></more-icon>
				</button>
				<div class="dropdown-menu">
					<span class="dropdown-item cursor-pointerr" @click="$refs['deleteModal'].show()">Delete</span>
				</div>
			</div>
		</div>
		<div>
			<h1 class="font-heading h3">{{ bookingLink.name }}</h1>
			<div class="d-flex align-items-center">
				<vue-select :options="dateOptions" button_class="btn btn-light shadow-none" v-model="selectedDate"></vue-select>
				<div class="ml-auto">
					<div class="rounded bg-light d-flex align-items-center">
						<button class="btn btn-light disabled pr-0" ref="link">{{ bookingLinkUrl }}</button>
						<div class="dropdown">
							<button class="btn btn-light p-1 line-height-0" data-toggle="dropdown">
								<more-icon width="20" height="20" transform="scale(0.65)"></more-icon>
							</button>
							<div class="dropdown-menu dropdown-menu-right">
								<span class="dropdown-item cursor-pointer" @click="$refs['sendModal'].show()">
									Send email invitation
								</span>
								<span class="dropdown-item cursor-pointer" @click="copyToClipboard">
									Copy link
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="d-flex h-100 my-3">
				<div class="flex-grow-1 d-flex bg-light rounded position-relative">
					<div ref="highlighter" class="highlighter position-absolute border border-primary h-100 rounded" :style="{ width: highlighterWidth }" style="opacity: 0">
						<div class="timeslot-action position-absolute dropdown w-100">
							<button class="btn btn-primary btn-sm py-0 btn-block" data-toggle="dropdown"><more-icon class="fill-white"></more-icon></button>
							<div class="dropdown-menu">
								<span class="dropdown-item cursor-pointer" @click="toggleTimeslot"> {{ timeslotStatusText }} timeslot </span>
							</div>
						</div>
					</div>
					<div v-for="user in users" :key="user.id" class="highlighter position-absolute border border-orange h-100 rounded" :style="{ left: user.left, width: highlighterWidth }">
						<div data-tooltip-wrapper style="top: -2px" class="position-relative">
							<div class="tooltip" x-placement="top">
								<div class="tooltip-arrow"></div>
								<div class="tooltip-inner">{{ user.full_name }}</div>
							</div>
						</div>
					</div>
					<div class="flex-grow-1 timeslots-wrapper position-relative rounded">
						<table class="table table-sm table-borderless mb-0 table-layout-fixed contacts-table">
							<tbody class="shadow-none bg-transparent text-center">
								<tr v-for="bookingLinkContact in bookingLink.booking_link_contacts" :key="bookingLinkContact.id" @mouseover="showHighlight">
									<td class="contact-container">
										<div class="d-flex align-items-center py-2 pl-2 mr-n2">
											<div class="profile-image profile-image-sm cursor-pointer" :style="{ 'background-image': `url(${bookingLinkContact.contact.contact_user.profile_image})` }">
												<span v-if="!bookingLinkContact.contact.contact_user.profile_image">{{ bookingLinkContact.contact.contact_user.initials }}</span>
											</div>
											<div class="flex-1 text-left pl-2">
												<h6 class="font-heading text-nowrap mb-0">
													{{ bookingLinkContact.contact.contact_user.full_name }}
												</h6>
												<small class="text-secondary">{{ bookingLinkContact.contact.contact_user.timezone }}</small>
											</div>
										</div>
									</td>
									<template v-if="selectedDate">
										<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :data-index="timeslotIndex" :key="timeslotIndex" :data-timeslot="JSON.stringify(timeslot)" class="align-middle timeslot-button position-relative overflow-hidden border border-white" :class="{ 'bg-primary text-white': bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time) }">
											<small>{{ timezoneTime(bookingLinkContact.contact.contact_user.timezone, timeslot.time) }}</small>
										</td>
									</template>
								</tr>
								<tr v-for="email in bookingLink.emails" :key="email.email" @mouseover="showHighlight">
									<td class="contact-container">
										<div class="d-flex align-items-center py-2 pl-2 mr-n2">
											<div class="profile-image profile-image-sm cursor-pointer">
											</div>
											<div class="flex-1 text-left pl-2">
												<h6 class="font-heading text-nowrap mb-0">
													{{ email.email }}
												</h6>
												<small class="text-secondary">{{ email.timezone }}</small>
											</div>
										</div>
									</td>
									<template v-if="selectedDate">
										<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :data-index="timeslotIndex" :key="timeslotIndex" :data-timeslot="JSON.stringify(timeslot)" class="align-middle timeslot-button position-relative overflow-hidden border border-white" :class="{ 'bg-primary text-white': bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time) }">
											<small>{{ timezoneTime(email.timezone, timeslot.time) }}</small>
										</td>
									</template>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<modal ref="deleteModal" :close-button="false">
			<h5 class="font-heading text-center">Delete Booking Link</h5>
			<p class="text-center mt-3">
				Are you sure to delete this booking link?
			</p>
			<div class="d-flex">
				<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">
					Cancel
				</button>
				<button
					class="btn btn-danger ml-auto"
					type="button"
					@click="destroy"
				>
					Delete
				</button>
			</div>
		</modal>

		<modal ref="sendModal" :close-button="false">
			<h4 class="font-heading mb-3">Send Invitation Link</h4>
			<p class="mb-2">You are sending invitation link to these emails:</p>
			<span class="badge badge-secondary line-height-base mr-1" v-for="contact in bookingLink.booking_link_contacts" :key="contact.id">
				{{ contact.contact.contact_user.email }}
			</span>
			<span class="badge badge-secondary line-height-base mr-1" v-for="email in bookingLink.emails" :key="email.email">
				{{ email.email }}
			</span>
			<div class="d-flex align-items-center mt-4">
				<button :disabled="sendingEmail" class="btn btn-light shadow-none" type="button" data-dismiss="modal">Cancel</button>
				<vue-button :loading="sendingEmail" button_class="ml-auto btn btn-primary shadow-none" type="button" @click="sendEmail">Send</vue-button>
			</div>
		</modal>

		<!-- <chatroom :booking-link="bookingLink"></chatroom> -->
	</div>
</template>

<script type="text/javascript" src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
