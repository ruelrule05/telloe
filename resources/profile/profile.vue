<template>
	<div>
		<div v-if="ready">
			<!-- Select service -->
			<div class="container my-12 flex items-center justify-center" v-if="!selectedServiceForTimeline" key="services">
				<div class="w-8/12 bg-white rounded-2xl p-14">
					<div class="flex justify-between">
						<div class="w-1/2 pr-4">
							<h3 class="font-serif font-semibold text-3xl text-primary leading-none">BOOK AN EVENT</h3>
						</div>
						<div class="w-1/2">
							<div class="flex items-center">
								<div class="profile-image profile-image-md mr-3" :style="{ 'background-image': `url(${profile.profile_image})` }">
									<span v-if="!profile.profile_image">{{ profile.initials }}</span>
								</div>
								<h1 class="font-bold">{{ profile.full_name }}</h1>
							</div>
						</div>
					</div>

					<!-- Services -->
					<div class="mt-20">
						<h6 v-if="services.length == 0" class="text-gray-400 text-center font-weight-light">No services available</h6>
						<div v-else class="grid grid-cols-2 gap-10">
							<div v-for="service in services" :key="service.id">
								<div
									class="bg-gray-50 rounded-2xl p-4 cursor-pointer transition-colors hover:bg-gray-100 border-2 border-primary border-opacity-0 hover:border-opacity-100"
									@click="
										selectedServiceForTimeline = service;
										selectedService = service;
									"
								>
									<h3 class="font-bold text-primary">{{ service.name }}</h3>

									<div class="flex items-center mt-5">
										<div
											class="profile-image profile-image-sm"
											:style="{
												backgroundImage: 'url(' + profile.profile_image + ')'
											}"
										>
											<span v-if="!profile.profile_image">{{ profile.initials }}</span>
										</div>
										<div
											v-for="assignedService in service.assigned_services"
											:key="assignedService.id"
											class="profile-image profile-image-xxs"
											:style="{
												backgroundImage: 'url(' + assignedService.member.member_user.profile_image + ')'
											}"
										>
											<span v-if="!assignedService.member.member_user.profile_image">{{ assignedService.member.member_user.initials }}</span>
										</div>
									</div>

									<div class="flex items-center mt-3 text-sm text-muted">
										<span class="font-bold">{{ service.duration }} min</span>
										<span class="ml-2" v-if="parseInt(service.default_rate)">
											{{ service.currency }}
											{{ service.default_rate }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Select coach/date/time -->
			<div v-else-if="selectedServiceForTimeline && !summary" class="container my-12 flex justify-center" key="service">
				<div class="bg-white rounded-2xl w-11/12">
					<div class="flex">
						<div class="w-5/12 p-10">
							<h4 class="mb-1 font-serif font-semibold text-2xl text-primary">{{ selectedServiceForTimeline.name }}</h4>
							<div class="text-muted font-bold text-sm">{{ selectedServiceForTimeline.duration }} min</div>
						</div>
						<div class="w-7/12 p-10">
							<p class="mb-0 service-description text-sm text-muted">{{ selectedServiceForTimeline.description }}</p>
						</div>
					</div>

					<div class="flex border-top">
						<div class="border-right p-12 flex flex-col w-4/12">
							<div class="text-muted text-sm mb-8">Schedule a time with:</div>

							<div>
								<!-- Main Coach -->
								<div
									class="coach-card"
									:class="{ active: selectedCoachId == profile.id }"
									@click="
										selectedCoachId = profile.id;
										selectedService = selectedServiceForTimeline;
									"
								>
									<div class="flex">
										<div class="profile-image profile-image-sm" :style="{ 'background-image': `url(${profile.profile_image})` }">
											<span v-if="!profile.profile_image">{{ profile.initials }}</span>
										</div>
										<div class="pl-3">
											<h6 class="text-primary font-bold">
												{{ profile.full_name }}
											</h6>
											<div class="text-muted text-sm">{{ profile.timezone }}</div>
										</div>
									</div>
								</div>

								<!-- Assigned Coaches -->
								<div
									v-for="assignedService in selectedServiceForTimeline.assigned_services"
									class="coach-card"
									:class="{ active: selectedCoachId == assignedService.coach.id }"
									:key="assignedService.id"
									@click="
										selectedCoachId = assignedService.coach.id;
										selectedService = assignedService;
									"
								>
									<div class="flex items-center">
										<div class="profile-image profile-image-sm" :style="{ 'background-image': `url(${assignedService.coach.profile_image})` }">
											<span v-if="!assignedService.coach.profile_image">{{ assignedService.coach.initials }}</span>
										</div>
										<div class="pl-2">
											<h6 class="text-primary font-bold">
												{{ assignedService.coach.full_name }}
											</h6>
											<small class="text-muted text-sm">{{ assignedService.coach.timezone }}</small>
										</div>
									</div>
								</div>
							</div>

							<div class="mt-auto">
								<div class="text-muted text-sm mb-4">Your timezone:</div>
								<vue-select :options="timezonesOptions" drop-position="top" searchable button_class="btn btn-white mx-1 shadow-sm" v-model="timezone"></vue-select>
							</div>
						</div>

						<!-- Date/time selection -->
						<div class="p-12 w-8/12">
							<div class="flex items-center justify-between">
								<div class="text-muted text-sm">Select one or more timeslots</div>
								<div>
									<div class="button-date-nav">
										<button type="button" @click="previousWeek()"><ArrowLeftIcon class="fill-current"></ArrowLeftIcon></button>
										<span>{{ dayjs(startDate).format('MMMM D, YYYY') }}</span>
										<button type="button" @click="nextWeek()"><ArrowRightIcon class="fill-current"></ArrowRightIcon></button>
									</div>
								</div>
							</div>

							<div class="mt-10 relative">
								<table class="table-fixed w-full">
									<thead>
										<tr>
											<template v-for="(tabDate, index) in tabDates">
												<th v-if="selectedService.days[tabDate.dayName].isOpen" class="text-left text-xs font-semibold uppercase font-serif pb-2" :key="index">
													<div class="uppercase text-gray-500 font-semibold text-xs">{{ tabDate.name }}</div>
													<span class="text-gray-300">{{ tabDate.label }}</span>
												</th>
											</template>
										</tr>
									</thead>
									<tbody>
										<tr>
											<template v-for="(date, dateIndex) in tabDates">
												<td :key="dateIndex" v-if="selectedService.days[date.dayName].isOpen">
													<template v-if="selectedService && timeslots && (timeslots[date.dayName] || []).length > 0">
														<div v-for="(timeslot, timeslotIndex) in timeslots[date.dayName]" :key="timeslotIndex">
															<button type="button" class="timeslot" :class="{ disabled: !timeslot.is_available, selected: selectedTimeslots.find(x => x.date.dayName == date.dayName && x.timeslot.time == timeslot.time) }" @click="setSelectedDateAndTimeslot(date, timeslot)">
																{{ timezoneTime(timeslot.time) }}
															</button>
														</div>
													</template>
												</td>
											</template>
										</tr>
									</tbody>
								</table>

								<div class="mt-12 flex items-center justify-between">
									<button :disabled="selectedTimeslots.length == 0" class="btn btn-primary" type="button" @click="summary = true">
										<span>Continue</span>
									</button>
									<div class="text-muted text-sm">
										Note: You can add recurring timeslots on the next step.
									</div>
								</div>
								<div v-if="timeslotsLoading" class="absolute-center w-full h-full bg-white pt-24">
									<div class="text-center">
										<div class="spinner spinner-sm" role="status"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-else-if="summary" class="flex" key="summary">
				<div class="border w-4/12 p-16">
					<h6 class="text-primary font-serif text-4xl font-semibold leading-none mb-10">SET YOUR BOOKING DETAILS</h6>
					<button class="btn btn-outline-primary flex items-center" type="button" @click="summary = false"><ChevronLeftIcon class="fill-current mr-4"></ChevronLeftIcon><span>Back</span></button>
				</div>
				<div class="w-8/12 min-h-screen bg-white p-16">
					<h4 class="mb-2 font-serif font-semibold text-2xl text-primary">{{ selectedService.name }}</h4>
					<div class="text-sm">
						<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ selectedService.duration }} min</span> &nbsp;&nbsp;&nbsp; Booking with <strong>{{ selectedService.coach.full_name }}</strong>
					</div>

					<div v-for="(selectedTimeslot, selectedTimeslotIndex) in selectedTimeslots" :key="selectedTimeslotIndex" class="mt-8">
						<div class="flex items-start justify-between">
							<div>
								<div class="font-bold">{{ dayjs(selectedTimeslot.date.format).format('MMMM D, YYYY') }} ({{ selectedTimeslot.date.dayName }})</div>
								<div>{{ selectedTimeslot.timeslot.label }} - {{ endTime(selectedTimeslot.timeslot.time) }}</div>
								<button
									class="font-serif text-primary text-xxs font-semibold"
									type="button"
									@click="
										selectedTimeslots.splice(selectedTimeslotIndex, 1);
										if (selectedTimeslots.length == 0) {
											summary = false;
										}
									"
								>
									REMOVE BOOKING
								</button>
							</div>
							<div class="flex items-center">
								<span class="text-sm mr-3">Recurring</span>
								<ToggleSwitch
									class="ml-auto"
									@input="
										if (selectedTimeslot.is_recurring) {
											$set(
												selectedTimeslot,
												'end_date',
												dayjs(new Date())
													.add(1, 'week')
													.toDate()
											);
											$set(selectedTimeslot, 'frequency', recurringFrequencies[0].value);
											setTimeslotDefaultDay('week', selectedTimeslot);
										}
									"
									active-class="bg-primary"
									v-model="selectedTimeslot.is_recurring"
								></ToggleSwitch>
							</div>
						</div>
					</div>
				</div>

				<vue-form-validate hidden @submit="submit" class="row justify-content-center">
					<div class="col-md-9">
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

								<div class="mb-3">
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
																	$set(
																		timeslot,
																		'end_date',
																		dayjs(new Date())
																			.add(1, 'week')
																			.toDate()
																	);
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
												<v-date-picker :min-date="new Date()" class="flex-grow-1" mode="date" :popover="{ placement: 'right', visibility: 'click' }" v-model="timeslot.end_date" :masks="masks">
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
							</div>
							<div class="p-4 flex-1">
								<div class="d-flex flex-column h-100">
									<div class="flex-grow-1 h-100 position-relative">
										<template v-if="authAction == 'login'">
											<h5 class="h4 font-heading mb-4">Log In</h5>
											<div class="form-group mb-2">
												<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control" data-required />
											</div>
											<div class="form-group mb-2">
												<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required />
											</div>

											<div v-if="selectedService.ask_skype" class="form-group mb-2">
												<input type="text" class="form-control" placeholder="Skype ID" :data-required="selectedService.require_skype" />
											</div>

											<div v-if="selectedService.ask_phone" class="form-group">
												<input type="text" class="form-control" placeholder="Phone" :data-required="selectedService.require_phone" />
											</div>

											<vue-button type="submit" :loading="loginForm.loading" button_class="mt-4 btn-block btn btn-primary">Log In & Book</vue-button>
											<button type="button" class="btn btn-block btn-white shadow-sm border" @click="authAction = 'signup'">Sign Up</button>
										</template>
										<template v-else-if="authAction == 'signup'">
											<h5 class="h4 font-heading mb-3">Create your account</h5>
											<div class="d-flex align-items-center mb-2">
												<div class="form-group mb-0 pr-1">
													<input type="text" v-model="loginForm.first_name" placeholder="First Name" class="form-control" data-required />
												</div>
												<div class="form-group mb-0 pl-1">
													<input type="text" v-model="loginForm.last_name" placeholder="Last Name" class="form-control" data-required />
												</div>
											</div>
											<div class="form-group mb-2">
												<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control" data-required />
											</div>
											<div class="form-group mb-2">
												<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required />
											</div>

											<div v-if="selectedService.ask_skype" class="form-group mb-2">
												<input type="text" class="form-control" placeholder="Skype ID" :data-required="selectedService.require_skype" />
											</div>

											<div v-if="selectedService.ask_phone" class="form-group">
												<input type="text" class="form-control" placeholder="Phone" :data-required="selectedService.require_phone" />
											</div>

											<vue-button type="submit" :loading="loginForm.loading" button_class="mt-2 btn-block btn btn-primary">Sign Up & Book</vue-button>
											<button type="button" class="btn btn-block btn-white shadow-sm border" @click="authAction = 'login'">Login</button>
										</template>

										<div class="d-flex mx-n1 mt-3">
											<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center line-height-1" @click="FacebookLoginAndBook">
												<facebook-icon height="20" width="20" class="mr-2"></facebook-icon>
												Facebook
											</button>
											<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center line-height-1" @click="GoogleLoginAndBook">
												<google-icon height="16" width="16" class="mr-2"></google-icon>
												Google
											</button>
										</div>

										<div class="text-center text-danger position-absolute w-100">&nbsp;{{ authError }}&nbsp;</div>
									</div>
									<div></div>
								</div>
							</div>
						</div>
					</div>
				</vue-form-validate>
			</div>
		</div>

		<div v-else class="absolute-center">
			<div class="spinner" role="status"></div>
		</div>

		<modal ref="bookingModal" id="bookingModal" :close-button="bookingSuccess" @hide="reset">
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
							<button class="btn btn-white shadow-none" type="button" data-toggle="dropdown">
								Add to Calendar
							</button>
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

<script src="./profile.js"></script>

<style lang="scss" scoped src="./profile.scss"></style>
