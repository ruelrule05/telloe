<template>
	<div class="p-4" v-if="bookingLink">
		<div class="page-custom-link">
			<div class="flex items-center justify-between w-100 account-header">
				<h1>Custom Links</h1>

				<div class="flex">
					<button class="mr-3 white-button">Import</button>
					<button class="blue-button">Add contact</button>
				</div>
			</div>
			<div class="px-6 pt-16">
				<h3 class="mb-10 font-serif font-extrabold tracking-tighter uppercase text-body">Create a custom link</h3>
				<div class="form">
					<div class="flex justify-between form-inline">
						<div class="form-field">
							<label for="" class="">Name</label>
							<input type="text" placeholder="Enter a name for your custom link" class="" />
						</div>
						<div class="form-field">
							<label for="" class="">Add People</label>
							<multiselect v-model="people" :options="options" multiple />
						</div>
					</div>
				</div>
				<div class="">
					<div class="tabs">
						<ul>
							<li class="active"><a href="#">Feb 6 2021</a></li>
							<a href="#" class="flex items-center"><img src="/plus-primary.svg" alt="" class="w-8 h-8"/></a>
						</ul>
					</div>
					<div class="custom-table">
						<div class="booking-row">
							<div class="ml-auto columns checkboxes">
								<div class="items-center column ">
									<input type="checkbox" class="w-5 h-5 mx-auto" checked />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center overflow-visible column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" disabled />
								</div>
								<div class="items-center column selected">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
								<div class="items-center column">
									<input type="checkbox" class="w-5 h-5 mx-auto" />
								</div>
							</div>
						</div>
						<div class="flex booking-row">
							<div class="profile"><span>RL</span></div>
							<div class="name">
								<p class="text-sm">Robert Longbase</p>
								<p class="flex items-center tracking-wide text-xxs text-muted">Europe/Zagreb <img src="/cog-muted.svg" alt="" class="h-4 ml-1" /></p>
							</div>
							<div class="columns schedule-column">
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">9:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">10:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">11:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column disabled">
									<p class="text-sm font-bold text-center text-body ">12:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column selected">
									<p class="text-sm font-bold text-center text-body ">1:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">2:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">3:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">4:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:45</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">9:30</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">10:15</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">11:45</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">12:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">1:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
							</div>
						</div>
						<div class="flex filler-row">
							<div class="columns">
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column selected">
									<span></span>
								</div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
							</div>
						</div>
						<div class="flex booking-row">
							<div class="profile"><span>DT</span></div>
							<div class="name">
								<p class="text-sm">Denna Thunderbolt</p>
								<p class="flex items-center tracking-wide text-xxs text-muted">Australia/Brisbane <img src="/cog-muted.svg" alt="" class="h-4 ml-1" /></p>
							</div>
							<div class="columns schedule-column">
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">9:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">10:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column active">
									<p class="text-sm font-bold text-center text-body">11:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column disabled">
									<p class="text-sm font-bold text-center text-body">12:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column selected">
									<p class="text-sm font-bold text-center text-body ">1:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">2:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">3:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">4:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:45</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">9:30</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">10:15</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">11:45</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">12:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">1:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
							</div>
						</div>
						<div class="flex filler-row">
							<div class="columns">
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column selected">
									<span></span>
								</div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
							</div>
						</div>
						<div class="flex booking-row">
							<div class="profile"><span>SV</span></div>
							<div class="name">
								<p class="text-sm">Sofia Ventilate</p>
								<p class="flex items-center tracking-wide text-xxs text-muted">Europe/Zagreb <img src="/cog-muted.svg" alt="" class="h-4 ml-1" /></p>
							</div>
							<div class="columns schedule-column">
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">9:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">10:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">11:00</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column disabled">
									<p class="text-sm font-bold text-center text-body">12:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column selected">
									<p class="text-sm font-bold text-center text-body ">1:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">2:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">3:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">4:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">8:45</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">9:30</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">10:15</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">11:45</p>
									<p class="text-sm text-center text-muted">AM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">12:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
								<div class="items-center column">
									<p class="text-sm font-bold text-center text-body">1:00</p>
									<p class="text-sm text-center text-muted">PM</p>
								</div>
							</div>
						</div>
						<div class="flex bottom filler-row">
							<div class="columns">
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column selected">
									<span></span>
									<div class="profile"><span>SV</span></div>
								</div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
								<div class="items-center column"></div>
							</div>
						</div>

						<button class="mt-2 blue-button">Save</button>
					</div>
				</div>
			</div>

			<div class="messenger">
				<h5 class="flex items-center justify-between mb-10 font-serif text-sm font-extrabold tracking-tighter uppercase">
					Chat
					<button>Hide</button>
				</h5>
				<div class="message-box">
					<div class="flex message recipient">
						<div class="profile">
							<span>GM</span>
						</div>

						<div class="messages">
							<div class="message-row">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</div>
							<div class="message-row">
								Lorem ipsum dolor sit amet consectetur,
							</div>
							<div class="message-row">
								Corporis consequatur pariatur quos voluptatum aspernatur provident delectus voluptate mollitia quia voluptatibus.
							</div>
							<p class="text-xs text-gray-300 time">28 minutes ago</p>
						</div>
					</div>
					<div class="flex message sender">
						<div class="profile">
							<span>RL</span>
						</div>

						<div class="messages">
							<div class="message-row">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</div>
							<div class="message-row">
								Yup it works!
							</div>
							<div class="message-row">
								Corporis consequatur pariatur.
							</div>
							<p class="text-xs text-gray-300 time"><img src="/seen.svg" alt="" class="w-4" />Seen 12:09PM on Mon</p>
						</div>
					</div>
				</div>
				<div class="message-bar">
					<div class="relative">
						<input type="text" class="w-full px-4 text-xs font-normal bg-gray-200 border-none rounded-full shadow-none" placeholder="Type a message" />
						<button class="flex items-center justify-center bg-white rounded-full"><img src="/send.svg" alt="" class="h-4" /></button>
					</div>
				</div>
			</div>
		</div>
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
										<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :data-index="timeslotIndex" :key="timeslotIndex" :data-timeslot="JSON.stringify(timeslot)" class="align-middle timeslot-button position-relative overflow-hidden border border-white" :class="{ 'bg-primary text-white': bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time), 'bg-warning': timeslot.isSuggested }">
											<small>{{ timezoneTime(bookingLinkContact.contact.contact_user.timezone, timeslot.time) }}</small>
										</td>
									</template>
								</tr>
								<tr v-for="email in bookingLink.emails" :key="email.email" @mouseover="showHighlight">
									<td class="contact-container">
										<div class="d-flex align-items-center py-2 pl-2 mr-n2">
											<div class="profile-image profile-image-sm cursor-pointer"></div>
											<div class="flex-1 text-left pl-2">
												<h6 class="font-heading text-nowrap mb-0">
													{{ email.email }}
												</h6>
												<small class="text-secondary">{{ email.timezone }}</small>
											</div>
										</div>
									</td>
									<template v-if="selectedDate">
										<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :data-index="timeslotIndex" :key="timeslotIndex" :data-timeslot="JSON.stringify(timeslot)" class="align-middle timeslot-button position-relative overflow-hidden border border-white" :class="{ 'bg-primary text-white': bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time), 'bg-warning': timeslot.isSuggested }">
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
				<button class="btn btn-danger ml-auto" type="button" @click="destroy">
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

		<chatroom :booking-link="bookingLink"></chatroom>
	</div>
</template>

<script type="text/javascript" src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
