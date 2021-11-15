<template>
	<div v-if="(conversation.member.role || {}).role != 'support' && membersLength == 1" class="position-relative h-100 pb-2" ref="addBookingTitle">
		<!-- Bookings -->
		<div v-if="!ready" class="text-center py-4">
			<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
		</div>
		<template v-else>
			<div v-if="!addingBooking" class="position-relative h-100 mb-3">
				<template v-if="userBookings.length > 0">
					<template v-if="!selectedBooking">
						<vue-checkbox
							v-if="userBookings.length > 0"
							:value="showExpiredBookings"
							@input="
								value => {
									showExpiredBookings = value;
								}
							"
							label="Show expired"
							class="mb-2"
						></vue-checkbox>
						<template v-for="booking in userBookings">
							<div :key="booking.id" :id="booking.id" v-if="showExpiredBookings || (!showExpiredBookings && !booking.is_expired)" class="p-3 booking mb-2 dropdown shadow-sm rounded border position-relative" :class="{ expired: booking.is_expired }">
								<strong class="font-heading d-block">{{ booking.service.name }}</strong>
								<small class="d-block text-muted-600">{{ formatDate(booking.date) }} @ {{ formatTime(booking.start) }}-{{ formatTime(booking.end) }}</small>
								<div v-if="!booking.is_expired" class="position-absolute booking-actions" :class="{ 'opacity-0': !selectedBooking || selectedBooking.id != booking.id }">
									<button type="button" class="btn btn-sm btn-white p-1 line-height-0 border badge-pill" @click="edit(booking)">
										<pencil-icon width="15" height="15"></pencil-icon>
									</button>
									<button
										type="button"
										class="btn btn-sm btn-white p-1 line-height-0 border badge-pill"
										@click="
											bookingToDelete = booking;
											$refs['deleteBooking'].show();
										"
									>
										<trash-icon width="15" height="15" fill="red"></trash-icon>
									</button>
								</div>
							</div>
						</template>
					</template>

					<!-- Edit booking -->
					<div v-else class="overflow-hidden">
						<strong class="mb-2 d-block">Edit Booking</strong>
						<div class="d-flex align-items-center mb-2 rounded p-3 service active available">
							<div>
								<h6 class="font-heading mb-0">{{ selectedBooking.service.name }}</h6>
								<small class="d-block">{{ selectedBooking.service.duration }} minutes</small>
							</div>
						</div>
						<div class="flex items-center">
							<strong class="mb-2 block">Choose a date</strong>
							<button
								class="ml-auto btn flex items-center"
								type="button"
								@click="
									calendarView = calendarView == 'month' ? 'week' : 'month';
									calcSliderTranslate();
								"
							>
								<calendar-month-icon width="18" height="18" class="mr-1"></calendar-month-icon>
								<small class="text-capitalize">{{ calendarView }} viewx</small>
							</button>
						</div>

						<div class="align-items-center mt-2" :class="[calendarView == 'month' ? 'd-none' : 'd-flex']">
							<button class="btn p-0 ml-n2" type="button" @click="adjustSlider(-1)"><chevron-left-icon transform="scale(1.6)"></chevron-left-icon></button>
							<div class="flex-grow-1 overflow-hidden">
								<div class="weekday-slider d-flex align-items-center position-relative" :style="{ transform: `translate(${sliderTranslate - sliderNavIndex * 95}px, 0px)` }" ref="weekday-slider">
									<div v-for="(date, index) in weekDayOptions" :key="index" class="px-1 weekday-day" :id="date.id" :class="{ disabled: disabledDate(date) }">
										<div class="py-1 px-2 rounded weekday-container cursor-pointer" :class="{ 'bg-blue text-white': (selectedDate ? selectedDate.getTime() : '') === date.date.getTime() }" @click="selectedDate = date.date">
											{{ date.title }}
											<strong class="text-uppercase d-block">{{ date.description }}</strong>
										</div>
									</div>
								</div>
							</div>
							<button class="btn p-0 mr-n2" type="button" @click="adjustSlider(1)"><chevron-right-icon transform="scale(1.6)"></chevron-right-icon></button>
						</div>

						<v-date-picker :select-attribute="selectAttribute" :disabled-dates="formattedHolidays" is-required :class="{ 'd-none': calendarView == 'week' }" class="v-calendar border relative" v-model="selectedBooking.date_object" is-expanded is-inline :min-date="new Date()" @input="dateSelected"> </v-date-picker>

						<strong class="my-2 d-block" :class="{ 'opacity-0': !selectedDate }">Select a timeslot</strong>
						<div v-if="selectedDate" class="position-relative overflow-auto timeslots-container" :class="{ 'py-4': timeslotsLoading }">
							<div v-if="timeslotsLoading" class="position-absolute-center">
								<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
							</div>
							<div :class="{ 'd-none': timeslotsLoading }">
								<div v-if="timeslots.length == 0" class="text-gray text-center w-100 position-absolute-center">
									<span>There are no timeslots available for the selected date.</span>
								</div>
								<div v-else>
									<div class="d-flex flex-wrap pb-2 pr-2">
										<div v-for="timeslot in timeslots" :key="timeslot.label" class="mb-2 w-100">
											<div
												class="bg-light btn-timeslot p-2 rounded cursor-pointer"
												:class="{ 'bg-primary text-white': timeslot == selectedTimeslot }"
												@click="
													selectedTimeslot = timeslot;
													timeslotDropdown = false;
												"
											>
												<div class="rounded border p-2 mb-1">
													<small class="d-block">Your time: {{ $root.auth.timezone }}</small>
													{{ timeslot.label }}
												</div>
												<div v-if="$root.auth.timezone != conversation.member.timezone" class="rounded border p-2">
													<small class="d-block">Client's time: {{ conversation.member.timezone }}</small>
													{{ timezoneTime($root.auth.timezone, conversation.member.timezone, timeslot.time) }}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="d-flex">
							<button type="button" class="btn btn-white border btn-sm" @click="resetBookingForm()">Cancel</button>
							<button type="button" class="ml-auto btn btn-primary btn-sm" :disabled="!selectedDate || !selectedTimeslot || !selectedService" @click="$refs['confirmBooking'].show()">Update Booking</button>
						</div>
					</div>
				</template>
				<div v-else class="text-center text-secondary pb-2">Select an available service below to create your first booking.</div>
			</div>
		</template>

		<!-- Available services -->
		<div v-if="!selectedBooking">
			<template v-if="!selectedService">
				<strong class="mb-2 d-block">Available Services</strong>
				<div v-for="service in availableServices" :key="service.id" class="d-flex align-items-center mb-2 rounded p-3 service" :class="{ available: !isServiceBlacklisted(service) }" @click="selectService(service)">
					<div>
						<h6 class="font-heading mb-0">{{ service.name }}</h6>
						<small class="d-block">{{ service.duration }} minutes</small>
					</div>
					<div class="ml-auto" v-if="$root.auth.id == conversation.user_id && conversation.members.length == 1 && !(conversation.member.contact || {}).is_pending">
						<toggle-switch active-class="bg-green" :value="!isServiceBlacklisted(service)" @click.native.stop @input="storeUserBlacklistedService({ user_id: conversation.member.id, service_id: service.id, is_blacklisted: !$event })"></toggle-switch>
					</div>
				</div>
			</template>

			<!-- New booking -->
			<div v-else class="overflow-hidden">
				<strong class="mb-2 d-block">New Booking</strong>
				<div class="d-flex align-items-center mb-2 rounded p-3 service active available">
					<div>
						<h6 class="font-heading mb-0">{{ selectedService.name }}</h6>
						<small class="d-block">{{ selectedService.duration }} minutes</small>
					</div>
				</div>

				<div class="d-flex align-items-center">
					<strong class="mb-2 d-block">Choose a date</strong>
					<button
						class="ml-auto btn d-flex align-items-center"
						type="button"
						@click="
							calendarView = calendarView == 'month' ? 'week' : 'month';
							calcSliderTranslate();
						"
					>
						<calendar-month-icon width="18" height="18" class="mr-1"></calendar-month-icon>
						<small class="text-capitalize">{{ calendarView }} view</small>
					</button>
				</div>

				<div class="align-items-center mt-2" :class="[calendarView == 'month' ? 'd-none' : 'd-flex']">
					<button class="btn p-0 ml-n2" type="button" @click="adjustSlider(-1)"><chevron-left-icon transform="scale(1.6)"></chevron-left-icon></button>
					<div class="flex-grow-1 overflow-hidden">
						<div class="weekday-slider d-flex align-items-center position-relative" :style="{ transform: `translate(${sliderTranslate - sliderNavIndex * 95}px, 0px)` }" ref="weekday-slider">
							<div v-for="(date, index) in weekDayOptions" :key="index" class="px-1 weekday-day" :id="date.id" :class="{ disabled: disabledDate(date) }">
								<div class="py-1 px-2 rounded weekday-container cursor-pointer" :class="{ 'bg-blue text-white': (selectedDate ? selectedDate.getTime() : '') === date.date.getTime() }" @click="selectedDate = date.date">
									{{ date.title }}
									<strong class="text-uppercase d-block">{{ date.description }}</strong>
								</div>
							</div>
						</div>
					</div>
					<button class="btn p-0 mr-n2" type="button" @click="adjustSlider(1)"><chevron-right-icon transform="scale(1.6)"></chevron-right-icon></button>
				</div>

				<v-date-picker :select-attribute="selectAttribute" :disabled-dates="formattedHolidays" is-required :class="{ 'd-none': calendarView == 'week' }" class="v-calendar border relative" v-model="selectedDate" is-expanded is-inline :min-date="new Date()" @input="dateSelected"> </v-date-picker>

				<strong class="my-2 d-block" :class="{ 'opacity-0': !selectedDate }">Select a timeslot</strong>
				<div v-if="selectedDate" class="position-relative overflow-auto timeslots-container" :class="{ 'py-4': timeslotsLoading }">
					<div v-if="timeslotsLoading" class="position-absolute-center">
						<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
					</div>
					<div :class="{ 'd-none': timeslotsLoading }">
						<div v-if="timeslots.length == 0" class="text-gray text-center w-100 position-absolute-center">
							<span>There are no timeslots available for the selected date.</span>
						</div>
						<div v-else>
							<div class="d-flex flex-wrap pb-2 pr-2">
								<div v-for="timeslot in timeslots" class="mb-2 w-100" :key="timeslot.label">
									<div
										class="bg-light btn-timeslot p-2 rounded cursor-pointer"
										:class="{ 'bg-primary text-white': timeslot == selectedTimeslot }"
										@click="
											selectedTimeslot = timeslot;
											timeslotDropdown = false;
										"
									>
										<div class="rounded border p-2 mb-1">
											<small class="d-block">Your time: {{ $root.auth.timezone }}</small>
											{{ timeslot.label }}
										</div>
										<div class="rounded border p-2" v-if="$root.auth.timezone != conversation.member.timezone">
											<small class="d-block">Client's time: {{ conversation.member.timezone }}</small>
											{{ timezoneTime($root.auth.timezone, conversation.member.timezone, timeslot.time) }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="d-flex">
					<button type="button" class="btn btn-white border btn-sm" @click="resetBookingForm()">Cancel</button>
					<button
						type="button"
						class="ml-auto btn btn-primary btn-sm"
						:disabled="!selectedDate || !selectedTimeslot || !selectedService"
						@click="
							selectedBooking = null;
							$refs['confirmBooking'].show();
						"
					>
						Book Now
					</button>
				</div>
			</div>
		</div>

		<modal ref="deleteBooking" :close-button="false" @hidden="resetBookingForm">
			<div class="text-center">
				<h5 class="font-heading">Delete Booking</h5>
				<p class="mb-0">Are you sure to delete this booking?</p>
			</div>
			<div class="d-flex mt-4">
				<button type="button" class="btn btn-white border" @click="$refs['deleteBooking'].hide()">Cancel</button>
				<button
					type="button"
					class="ml-auto btn btn-danger"
					@click="
						deleteBooking(bookingToDelete);
						$refs['deleteBooking'].hide();
					"
				>
					Delete Booking
				</button>
			</div>
		</modal>

		<modal ref="confirmBooking" :close-button="false">
			<template v-if="selectedService && selectedDate && selectedTimeslot">
				<div v-if="!bookingCreated">
					<h4 class="font-heading text-center mb-3">Review Booking Details</h4>
					<div class="bg-light rounded py-2 px-3">
						<div class="d-flex">
							<div class="w-25">Service</div>
							<strong>{{ selectedService.name }}</strong>
						</div>
						<div class="d-flex">
							<div class="w-25">Date</div>
							<strong>{{ formatDate(selectedDate) }}</strong>
						</div>
						<div class="d-flex">
							<div class="w-25">Time</div>
							<strong>{{ selectedTimeslot.label }}</strong>
						</div>
					</div>
					<div class="text-danger text-center mt-2">&nbsp; {{ error }} &nbsp;</div>

					<div class="d-flex mt-3">
						<button
							type="button"
							:disabled="loading"
							class="btn btn-white border"
							@click="
								$refs['confirmBooking'].hide();
								error = '';
							"
						>
							Cancel
						</button>
						<vue-button type="button" :loading="loading" button_class="ml-auto btn btn-primary" @click="submit()">{{ selectedBooking ? 'Update' : 'Book Now' }}</vue-button>
					</div>
				</div>

				<div v-else class="py-5 text-center">
					<checkmark-circle-icon class="fill-success" width="50" height="50"></checkmark-circle-icon>
					<h5 class="font-heading text-center mb-4 mt-2">Booking has been successfully {{ selectedBooking ? 'updated' : 'placed' }}</h5>
					<button
						type="button"
						class="btn btn-white border"
						@click="
							$refs['confirmBooking'].hide();
							resetBookingForm();
						"
					>
						Close
					</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./bookings.js"></script>
<style src="./bookings.scss" lang="scss" scoped></style>
