<template>
	<div class="p-5 h-100">
		<div class="overflow-hidden">
			<h1 class="font-heading h3 mb-0">{{ bookingLink.name }}</h1>
			<span class="text-muted">{{ formatDate(bookingLink.date) }}</span>
			<div class="d-flex h-100 my-3">
				<div class="flex-grow-1 d-flex bg-light rounded position-relative">
					<div ref="highlighter" class="highlighter position-absolute border border-primary h-100 rounded" :style="{ width: highlighterWidth }"></div>
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

									<td v-for="(timeslot, timeslotIndex) in bookingLink.timeslots" :data-index="timeslotIndex" :key="timeslotIndex" class="align-middle timeslot-button position-relative overflow-hidden" :class="{ 'bg-primary text-white border': bookingLink.selected_timeslots.find(x => x == timeslot.time) }">
										<small>{{ timezoneTime(bookingLinkContact.contact.contact_user.timezone, timeslot.time) }}</small>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript" src="./booking-link.js"></script>

<style lang="scss" scoped src="./booking-link.scss"></style>
