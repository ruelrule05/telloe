<template>
	<div>
		<div v-show="open" id="add" class="position-fixed w-100 h-100 p-4 overflow-auto" :class="`opacity-${opacity}`">
			<div class="rounded p-4 w-100 minh-100 bg-light position-relative">
				<button type="button" class="btn btn-light shadow-none p-1 badge-pill btn-close" @click="hide()">
					<close-icon width="30" height="30" transform="scale(1.2)"></close-icon>
				</button>

				<!-- Select service -->
				<template v-if="!selectedService">
					<h2 class="font-heading text-center">Available Services</h2>
					<div class="container mt-5">
						<div class="row justify-content-center">
							<div v-for="service in services" :key="service.id" class="col-md-5">
								<div class="card rounded service cursor-pointer mb-3 shadow-sm" @click="selectedService = service">
									<div class="card-body">
										<div class="d-flex align-items-center mb-3">
											<div class="user-profile-image d-inline-block bg-white mb-1" :style="{ 'background-image': `url(${service.coach.profile_image})` }">
												<span v-if="!service.coach.profile_image">{{ service.coach.initials }}</span>
											</div>
											<div class="pl-1">
												<h6 class="font-heading mb-0">{{ service.coach.full_name }}</h6>
												<span class="text-muted">@{{ service.coach.username }}</span>
											</div>
										</div>
										<h3 class="font-heading h5 mb-1">{{ service.name }}</h3>
										<p class="mb-0 text-ellipsis text-muted">{{ service.description }}</p>
										<div class="d-flex align-items-center mt-4 line-height-1">
											<div class="d-flex align-items-center">
												<clock-icon width="11" height="11" transform="scale(1.5)" fill="#6c757d"></clock-icon>
												<small class="text-muted ml-1">{{ service.duration }} min</small>
											</div>
											<div class="d-flex align-items-center ml-3" v-if="parseInt(service.default_rate)">
												<small>
													{{ service.currency }}
													<span class="text-muted">{{ service.default_rate }}</span>
												</small>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>

				<!-- Select coach/date/time -->
				<div v-else-if="selectedService && (!startDate || !selectedTimeslot)" class="container selected-service-container" key="service">
					<div class="mb-5 text-left">
						<button class="btn line-height-0 p-0 close float-none mb-3 ml-n1" type="button" @click="reset()">
							<arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon>
						</button>

						<h4 class="mb-1 h3 font-heading">{{ selectedService.name }}</h4>
						<p class="mb-0 service-description">{{ selectedService.description }}</p>
						<p v-if="selectedService.address" class="mb-0 d-flex align-items-center text-muted">
							<map-marker-icon height="18" width="18" class="fill-primary"></map-marker-icon>
							{{ selectedService.address }}
						</p>
					</div>

					<div class="d-flex align-items-center pt-3">
						<div class="d-flex align-items-center">
							<div class="bg-white rounded shadow-sm d-flex align-items-center">
								<button class="btn btn-sm btn-white p-1" type="button" @click="previousWeek()">
									<chevron-left-icon height="25" width="25" transform="scale(1.4)"></chevron-left-icon>
								</button>
								<v-date-picker class="relative" :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate" :masks="masks">
									<template v-slot="{ inputValue, inputEvents }">
										<button type="button" class="btn btn-white px-1 shadow-none rounded-0" v-on="inputEvents">{{ inputValue }}</button>
									</template>
								</v-date-picker>
								<button class="btn btn-sm btn-white p-1" type="button" @click="nextWeek()">
									<chevron-right-icon height="25" width="25" transform="scale(1.4)"></chevron-right-icon>
								</button>
							</div>
							<div v-if="selectedTimeslots.length == 0" class="ml-3 text-muted">Select at least one (1) timeslot</div>
						</div>

						<div class="ml-auto" :class="{ 'hide-tooltip': selectedTimeslots.length > 0 }" v-tooltip.left="'Select at least one (1) timeslot'">
							<button class="btn" :class="[selectedTimeslots.length == 0 ? 'disabled' : 'btn-white shadow-sm']" type="button" @click="summary()">Continue</button>
						</div>
					</div>

					<div class="text-left">
						<!-- Date/time selection -->
						<div class="pt-3 pb-4 d-flex">
							<div class="p-3 flex-grow-1 bg-white timeslots-wrapper shadow-sm position-relative rounded">
								<table class="table table-sm table-borderless mb-0 table-layout-fixed">
									<thead>
										<tr>
											<th class="align-middle pb-2 pt-0 pl-2" v-for="(tabDate, index) in tabDates" :key="index">
												<strong>{{ tabDate.name }}</strong>
												<span class="text-gray">{{ tabDate.label }}</span>
											</th>
										</tr>
									</thead>
									<tbody class="shadow-none bg-transparent text-center">
										<tr>
											<td v-for="(date, dateIndex) in tabDates" :key="dateIndex" class="px-2 py-0 rounded-0 position-relative">
												<template v-if="selectedService && timeslots && (timeslots[date.dayName] || []).length > 0">
													<div v-for="(timeslot, timeslotIndex) in timeslots[date.dayName]" :key="timeslotIndex">
														<div v-tooltip.top="timezoneTooltip(selectedservice.coach.timezone, timeslot)" :key="dateIndex" class="py-2 position-relative rounded my-2 timeslot-button" :class="[timeslot.is_available ? 'cursor-pointer bg-primary text-white' : 'disabled bg-gray-400 pointer-events-none', { selected: selectedTimeslots.find(x => x.date.dayName == date.dayName && x.timeslot.time == timeslot.time) }]" @click="setSelectedDateAndTimeslot(date, timeslot)">
															<span class="selected-checkmark position-absolute">
																<checkmark-icon height="30" width="30" class="fill-green"></checkmark-icon>
															</span>
															<span class="text-nowrap">{{ timezoneTime(timeslot.time) }}</span>
														</div>
													</div>
												</template>
												<div v-else class="position-absolute-center w-100 h-100 bg-light"></div>
											</td>
										</tr>
									</tbody>
								</table>

								<transition name="fade">
									<div v-if="timeslotsLoading" class="timeslots-loader rounded position-absolute-center w-100 h-100 bg-white">
										<div class="position-absolute-center">
											<div class="spinner-border text-primary" role="status"></div>
										</div>
									</div>
								</transition>
							</div>
						</div>
					</div>
				</div>

				<div v-else class="container selected-service-container" key="summary">
					<vue-form-validate @submit="submit" class="row justify-content-center">
						<div class="col-md-5">
							<div class="d-flex align-items-center mb-3">
								<button class="btn line-height-0 p-0 close" type="button" @click="selectedTimeslot = false"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
								<h4 class="mb-0 font-heading ml-3">Confirm and Book</h4>
							</div>
							<div class="bg-white shadow-sm rounded selected-service text-left d-flex">
								<div class="p-4 border-right flex-1">
									<h3 class="h3 mb-3 font-heading">{{ selectedService.name }}</h3>
									<div class="mb-3">
										<div class="font-weight-normal text-secondary">Coach</div>
										<div class="h6 font-heading">{{ selectedService.coach.full_name }}</div>
									</div>
									<div class="mb-3">
										<div class="font-weight-normal text-secondary">Duration</div>
										<div class="h6 font-heading">{{ selectedService.duration }} minutes</div>
									</div>

									<div>
										<div class="font-weight-normal text-secondary">Timeslots</div>
										<div v-for="(timeslot, timeslotIndex) in selectedTimeslots" :key="timeslotIndex" class="bg-light rounded p-3 mt-2">
											<div class="d-flex">
												<div>
													<h6 class="font-heading mb-1">{{ formatDate(timeslot.date.date) }} ({{ dayjs(timeslot.date.date).format('dddd') }})</h6>
													<div class="text-muted">{{ timeslot.timeslot.label }} - {{ endTime(timeslot.timeslot.time) }}</div>
												</div>
												<div class="dropleft ml-auto mr-n2 mt-n2">
													<button class="btn btn-sm btn-light p-1 line-height-0 shadow-none" type="button" data-toggle="dropdown">
														<more-icon width="20" height="20" class="fill-gray-500" transform="scale(1.3)"></more-icon>
													</button>

													<div class="dropdown-menu">
														<div class="d-flex align-items-center px-2 py-1">
															<span>Recurring</span>
															<toggle-switch
																class="ml-auto"
																@input="
																	if (timeslot.is_recurring) {
																		$set(timeslot, 'end_date', dayjs(new Date()).add(1, 'week').toDate());
																		$set(timeslot, 'frequency', recurringFrequencies[0].value);
																		setTimeslotDefaultDay('week', timeslot);
																	}
																"
																active-class="bg-primary"
																v-model="timeslot.is_recurring"
															></toggle-switch>
														</div>

														<span
															class="dropdown-item d-flex align-items-center px-2 cursor-pointer"
															@click="
																selectedTimeslots.splice(timeslotIndex, 1);
																if (selectedTimeslots.length == 0) {
																	selectedTimeslot = false;
																}
															"
														>
															Remove
														</span>
													</div>
												</div>
											</div>
											<div v-if="timeslot.is_recurring">
												<div class="mb-2">
													<vue-select dropdown_class="w-100" button_class="form-control mt-2" :options="recurringFrequencies" v-model="timeslot.frequency" label="Repeat every" @input="setTimeslotDefaultDay($event, timeslot)"></vue-select>
												</div>
												<div v-if="timeslot.frequency == 'week'" class="mb-2">
													<div v-tooltip.top="day" @click="timeslotToggleDay(timeslot, dayIndex)" v-for="(day, dayIndex) in days" class="badge badge-pill badge-day ml-1 cursor-pointer position-relative shadow-sm p-3" :class="[timeslot.days.indexOf(dayIndex) == -1 ? 'badge-white' : 'badge-primary']" :key="dayIndex">
														<span>{{ day.substring(0, 1) }}</span>
													</div>
												</div>
												<div v-else-if="timeslot.frequency == 'month'" class="form-group mb-2">
													<vue-select dropdown_class="w-100" button_class="form-control" :options="daysInMonth(timeslot)" v-model="timeslot.day_in_month" label="On"></vue-select>
												</div>
												<div class="form-group mb-0">
													<v-date-picker :min-date="new Date()" class="flex-grow-1 relative" mode="date" :popover="{ placement: 'right', visibility: 'click' }" v-model="timeslot.end_date" :masks="masks">
														<template v-slot="{ inputValue, inputEvents }">
															<button type="button" class="d-flex align-items-center form-control" v-on="inputEvents">
																<span class="text-secondary mr-2">Until</span>
																{{ inputValue }}
															</button>
														</template>
													</v-date-picker>
												</div>
											</div>
										</div>
									</div>

									<button class="btn btn-primary btn-lg btn-block mt-4" type="submit">Book</button>
								</div>
							</div>
						</div>
					</vue-form-validate>
				</div>
			</div>
		</div>

		<modal ref="bookingModal" id="bookingModal" :close-button="bookingSuccess" @hide="hide">
			<div class="text-center position-relative">
				<div :class="{ disabled: !bookingSuccess }">
					<checkmark-circle-icon width="60" height="60" class="fill-success"></checkmark-circle-icon>
					<h6 class="h3 font-heading">Booking placed!</h6>
					<p class="mb-4 h6 font-weight-normal text-muted">A booking confirmation has been sent to your email</p>

					<div v-for="booking in bookings" :key="booking.id" class="rounded p-3 text-left bg-light d-flex align-items-center mt-3">
						<div>
							<h6 class="font-heading mb-1">{{ formatDate(booking.date) }}</h6>
							<div class="text-muted">{{ formatTime(booking.start) }} - {{ formatTime(booking.end) }}</div>
						</div>
						<div class="ml-auto dropdown">
							<button class="btn btn-white shadow-none" type="button" data-toggle="dropdown">Add to Calendar</button>
							<div class="dropdown-menu">
								<a target="_blank" :href="booking.google_link" class="dropdown-item d-flex align-items-center px-2 cursor-pointer">Google Calendar</a>
								<a target="_blank" :href="booking.outlook_link" class="dropdown-item d-flex align-items-center px-2 cursor-pointer">Outlook</a>
								<a target="_blank" :href="booking.yahoo_link" class="dropdown-item d-flex align-items-center px-2 cursor-pointer">Yahoo!</a>
								<a target="_blank" :href="booking.ical_link" class="dropdown-item d-flex align-items-center px-2 cursor-pointer">iCal</a>
							</div>
						</div>
					</div>
				</div>
				<div v-if="!bookingSuccess" class="position-absolute-center">
					<div class="spinner-border text-primary" role="status"></div>
					<h6 class="h3 mt-4 mb-0 font-heading">Booking...</h6>
				</div>
			</div>
		</modal>
	</div>
</template>

<script src="./add.js"></script>

<style lang="scss" scoped src="./add.scss"></style>
