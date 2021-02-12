<template>
	<div class="p-5 h-100">
		<div class="overflow-hidden">
			<h1 class="font-heading h3">{{ bookingLink.name }}</h1>
			<vue-select :options="dateOptions" button_class="btn btn-light shadow-none" v-model="selectedDate"></vue-select>
			<div class="d-flex h-100 my-3">
				<div class="flex-grow-1 d-flex bg-light rounded position-relative">
					<div ref="highlighter" class="highlighter position-absolute border border-primary h-100 rounded" :style="{ width: highlighterWidth }">
						<div class="timeslot-action position-absolute dropdown w-100">
							<button class="btn btn-primary btn-sm py-0 btn-block" data-toggle="dropdown"><more-icon class="fill-white"></more-icon></button>
							<div class="dropdown-menu">
								<span class="dropdown-item cursor-pointer" @click="toggleTimeslot"> {{ timeslotStatusText }} timeslot </span>
							</div>
						</div>
					</div>
					<div v-for="user in users" :key="user.id" :data-id="user.id" class="highlighter position-absolute border border-orange h-100 rounded" :style="{ left: user.left, width: highlighterWidth }">
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
										<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :data-index="timeslotIndex" :data-timeslot="JSON.stringify(timeslot)" :key="timeslotIndex" class="align-middle timeslot-button position-relative overflow-hidden border border-white" :class="{ 'bg-primary text-white': bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time), 'bg-warning': timeslot.isSuggested }">
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

		<modal ref="loginModal" size="modal-sm" :close-button="false">
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
		</modal>
	</div>
</template>

<script type="text/javascript" src="./booking-link.js"></script>

<style lang="scss" scoped src="./booking-link.scss"></style>
