<template>
	<div>
		<div v-if="ready">
			<!-- Select service -->
			<div class="container lg:my-12 my-6 flex items-center justify-center" v-if="!selectedServiceForTimeline" key="services">
				<div class="lg:w-8/12 w-11/12 bg-white rounded-2xl lg:p-14 p-8">
					<div class="lg:flex justify-between">
						<div class="lg:w-1/2 pr-4">
							<h3 class="font-serif font-semibold text-3xl text-primary leading-none">BOOK AN EVENT</h3>
						</div>
						<div class="lg:w-1/2 lg:mt-0 mt-4">
							<div class="flex items-center">
								<div>
									<div class="profile-image profile-image-md mr-3" :style="{ 'background-image': `url(${profile.profile_image})` }">
										<span v-if="!profile.profile_image">{{ profile.initials }}</span>
									</div>
								</div>
								<h1 class="font-bold">{{ profile.full_name }}</h1>
							</div>
						</div>
					</div>

					<!-- Services -->
					<div class="mt-10 lg:mt-20">
						<h6 v-if="services.length == 0" class="text-gray-400 text-center font-weight-light">No services available</h6>
						<div v-else class="grid lg:grid-cols-2 lg:gap-10 gap-6">
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
			<div v-else-if="selectedServiceForTimeline && !step" class="container lg:my-12 my-6 flex justify-center" key="service">
				<div class="bg-white rounded-2xl w-11/12">
					<div class="lg:flex">
						<div class="lg:w-5/12 lg:p-10 p-8 pb-4">
							<h4 class="mb-1 font-serif font-semibold text-2xl text-primary">{{ selectedServiceForTimeline.name }}</h4>
							<div class="text-muted font-bold text-sm">{{ selectedServiceForTimeline.duration }} min</div>
						</div>
						<div class="lg:w-7/12 lg:p-10 pt-0 p-8">
							<p class="mb-0 service-description text-sm text-muted">{{ selectedServiceForTimeline.description }}</p>
						</div>
					</div>

					<div class="lg:flex border-top">
						<div class="border-right lg:p-12 p-8 flex flex-col lg:w-4/12">
							<div class="text-muted text-sm lg:mb-8 mb-2">Schedule a time with:</div>

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

							<div class="lg:mt-auto mt-4">
								<div class="text-muted text-sm lg:mb-4 mb-2">Your timezone:</div>
								<vue-select :options="timezonesOptions" drop-position="top" searchable button_class="btn btn-white mx-1 shadow-sm" v-model="timezone"></vue-select>
							</div>
						</div>

						<!-- Date/time selection -->
						<div class="lg:p-12 pt-0 p-8 lg:w-8/12">
							<div class="lg:flex items-center justify-between">
								<div class="text-muted text-sm">Select one or more timeslots</div>
								<div>
									<div class="button-date-nav lg:mt-0 mt-2">
										<button type="button" @click="previousWeek()"><ArrowLeftIcon class="fill-current"></ArrowLeftIcon></button>
										<span class="flex-grow text-center">{{ dayjs(startDate).format('MMMM D, YYYY') }}</span>
										<button type="button" @click="nextWeek()"><ArrowRightIcon class="fill-current"></ArrowRightIcon></button>
									</div>
								</div>
							</div>

							<div class="lg:mt-10 mt-4 relative overflow-hidden">
								<div class="min-w-full overflow-y-auto">
									<table class="table-fixed min-w-full">
										<thead>
											<tr>
												<template v-for="(tabDate, index) in tabDates">
													<th v-if="selectedService.days[tabDate.dayName].isOpen" class="text-left text-xxs lg:text-xs font-semibold uppercase font-serif pb-2" :key="index">
														<div class="uppercase text-gray-500 font-semibold">{{ tabDate.name }}</div>
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
								</div>

								<div class="mt-12 lg:flex items-center justify-between">
									<button :disabled="selectedTimeslots.length == 0" class="btn btn-primary" type="button" @click="step = 'summary'">
										<span>Continue</span>
									</button>
									<div class="text-muted text-sm mt-4 lg:mt-0">
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

			<!-- Summary -->
			<div v-else-if="step == 'summary'" class="lg:flex" key="summary">
				<div class="border w-4/12 lg:p-16 p-8">
					<h6 class="text-primary font-serif text-4xl font-semibold leading-none lg:mb-10 mb-5">SET YOUR BOOKING DETAILS</h6>
					<button class="btn btn-outline-primary flex items-center" type="button" @click="step = false"><ChevronLeftIcon class="fill-current mr-4"></ChevronLeftIcon><span>Back</span></button>
				</div>
				<div class="lg:w-8/12 min-h-screen bg-white lg:p-16 p-8">
					<h4 class="mb-2 font-serif font-semibold text-2xl text-primary">{{ selectedService.name }}</h4>
					<div class="text-sm">
						<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ selectedService.duration }} min</span> &nbsp;&nbsp;&nbsp; Booking with <strong>{{ selectedService.coach.full_name }}</strong>
					</div>

					<div class="lg:w-8/12">
						<div v-for="(selectedTimeslot, selectedTimeslotIndex) in selectedTimeslots" :key="selectedTimeslotIndex" class="mt-8">
							<div class="flex items-start justify-between">
								<div>
									<div class="font-bold">{{ dayjs(selectedTimeslot.date.format).format('MMMM D, YYYY') }} ({{ selectedTimeslot.date.dayName }})</div>
									<div>{{ timezoneTime(selectedTimeslot.timeslot.time) }} - {{ endTime(selectedTimeslot.timeslot.time) }}</div>
									<button
										class="font-serif text-primary text-xxs font-semibold"
										type="button"
										@click="
											selectedTimeslots.splice(selectedTimeslotIndex, 1);
											if (selectedTimeslots.length == 0) {
												step = false;
											}
										"
									>
										REMOVE BOOKING
									</button>
								</div>

								<div class="flex items-center">
									<span class="text-xs mr-2">Recurring</span>
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
									<div v-if="selectedTimeslot.is_recurring" class="relative" v-click-outside="() => (selectedTimeslot.menu = false)">
										<button class="ml-1 focus:outline-none rounded-full p-1 border text-gray-400 transition-colors hover:bg-gray-400 hover:text-white btn-timeslot" type="button" @click="$set(selectedTimeslot, 'menu', true)"><CogIcon class="fill-current h-4 w-4"></CogIcon></button>

										<div class="timeslot-menu" :class="{ show: selectedTimeslot.menu }">
											<div class="flex">
												<button class="flex-grow btn btn-sm mr-1" type="button" :class="[selectedTimeslot.frequency == 'week' ? 'btn-primary' : 'btn-outline-primary']" @click="$set(selectedTimeslot, 'frequency', 'week')"><span>Weekly</span></button>
												<button class="flex-grow btn btn-sm ml-1" type="button" :class="[selectedTimeslot.frequency == 'month' ? 'btn-primary' : 'btn-outline-primary']" @click="$set(selectedTimeslot, 'frequency', 'month')"><span>Monthly</span></button>
											</div>
											<div class="text-muted text-xs mt-4">Repeat on these days (one or multiple):</div>
											<div class="flex space-x-2 mt-3">
												<div @click="timeslotToggleDay(selectedTimeslot, dayIndex)" v-for="(day, dayIndex) in days" class="badge-day" :class="{ active: selectedTimeslot.days.indexOf(dayIndex) > -1 }" :key="dayIndex">
													<span class="absolute-center bottom-px">{{ day.substring(0, 1) }}</span>
												</div>
											</div>

											<div class="mt-4">
												<v-date-picker :min-date="new Date()" class="input" mode="date" :popover="{ placement: 'left', visibility: 'click' }" v-model="selectedTimeslot.end_date" :masks="masks">
													<template v-slot="{ inputValue, inputEvents }">
														<button type="button" class="d-flex align-items-center form-control" v-on="inputEvents">
															<span class="text-muted text-sm mr-2">Until</span>
															{{ inputValue }}
														</button>
													</template>
												</v-date-picker>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div v-if="selectedService.types.length > 0" class="mt-6">
								<div v-for="(type, typeIndex) in selectedService.types" :key="typeIndex" class="booking-type" :class="{ selected: selectedTimeslot.type == type }" @click="setTypeSelected(selectedTimeslot, type)">
									<div>
										<div class="type-checkbox"><div class="absolute-center"></div></div>
									</div>
									<div class="px-3 text-sm text-muted -mt-1 flex-grow">
										<div>
											{{ type.type }}
										</div>
										<span class="text-black font-bold" v-if="type.type == 'Face-to-face'">{{ type.data }}</span>
										<span v-else>{{ type.type }} meeting will be created after the booking is placed.</span>
									</div>
									<div>
										<ZoomIcon v-if="type.type == 'Zoom'" class="w-5 h-5"></ZoomIcon>
										<GoogleMeetIcon v-else-if="type.type == 'Google Meet'" class="w-5 h-5"></GoogleMeetIcon>
										<MapMarkerIcon v-else-if="type.type == 'Face-to-face'" class="w-5 h-5 fill-current text-primary"></MapMarkerIcon>
									</div>
								</div>
							</div>
						</div>
					</div>

					<button :disabled="selectedTimeslots.length == 0" class="mt-8 btn btn-primary" type="button" @click="step = selectedService.require_payment ? 'payment' : 'authenticate'">
						<span>Continue <span v-if="selectedService.require_payment">to payment</span></span>
					</button>
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

			<!-- Payment -->
			<div v-else-if="step == 'payment'" class="container lg:my-12 my-6 flex items-center justify-center" key="payment">
				<div class="lg:w-5/12 bg-white rounded-2xl lg:p-14 p-8">
					<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">PAYMENT</h6>
					<div class="text-xl text-muted mb-8">
						Pay <strong class="text-black">{{ selectedService.currency }} {{ format({ padRight: 2 })(selectedService.default_rate * selectedTimeslots.length) }}</strong> with card
					</div>

					<vue-form-validate @submit="cardDetails">
						<label>Card information</label>
						<div class="input-cc-card border-bottom border-gray-300 relative z-10">
							<div class="cc-icon">
								<component :is="cardBrandComponent"></component>
							</div>
							<input v-model="cardForm.number" type="tel" class="ring-0 ring-offset-0 rounded-b-none border-b-0" :class="{ 'is-invalid': cardForm.errors.number }" placeholder="#### #### #### ####" v-cardformat:formatCardNumber data-required />
						</div>
						<div class="flex relative">
							<div class="flex-grow">
								<input type="text" :class="{ 'is-invalid': cardForm.errors.expiration }" v-model="cardForm.expiration" class="ring-0 ring-offset-0 rounded-t-none rounded-r-none border-r-0 border-t-0" placeholder="MM/YY" v-cardformat:formatCardExpiry data-required />
							</div>
							<div class="flex-grow border-left">
								<input type="text" :class="{ 'is-invalid': cardForm.errors.cvc }" v-model="cardForm.cvc" class="ring-0 ring-offset-0 rounded-t-none rounded-l-none border-l-0 border-t-0" placeholder="CVC" v-cardformat:formatCardCVC data-required />
							</div>
						</div>

						<div class="mt-6 mb-8">
							<label>Name on card</label>
							<input v-model="cardForm.name" type="text" data-required />
						</div>

						<div class="flex justify-between">
							<button type="button" class="btn btn-lg btn-outline-primary" @click="step = 'summary'"><span>Back</span></button>
							<button type="submit" class="btn btn-lg btn-primary"><span>Continue</span></button>
						</div>
					</vue-form-validate>
				</div>
			</div>

			<!-- Authenticate -->
			<div v-else-if="step == 'authenticate'" class="lg:flex" key="authenticate">
				<div class="border w-4/12 lg:p-16 p-8">
					<h6 class="text-primary font-serif text-4xl font-semibold leading-none lg:mb-10 mb-5">ADD YOUR CONTACT INFO</h6>
					<button :disabled="bookingLoading" class="btn btn-outline-primary flex items-center" type="button" @click="step = selectedService.require_payment ? 'payment' : 'summary'"><ChevronLeftIcon class="fill-current mr-4"></ChevronLeftIcon><span>Back</span></button>
				</div>
				<div class="lg:w-8/12 min-h-screen bg-white">
					<div class="grid lg:grid-cols-2 border-bottom">
						<div class="border-right lg:p-16 p-8">
							<vue-form-validate @submit="bookGuest">
								<h6 class="text-primary font-semibold font-serif text-3xl mb-8">Book as guest</h6>
								<div class="mb-4">
									<label class="text-muted">First Name</label>
									<input v-model="guest.first_name" type="text" data-required />
								</div>
								<div class="mb-4">
									<label class="text-muted">Last Name</label>
									<input v-model="guest.last_name" type="text" data-required />
								</div>
								<div class="mb-6">
									<label class="text-muted">E-mail address</label>
									<input v-model="guest.email" type="email" data-required />
								</div>
								<button class="btn btn-primary" type="submit"><span>Book as guest</span></button>
							</vue-form-validate>
						</div>
						<div class="lg:p-16 p-8">
							<vue-form-validate @submit="LoginAndBook">
								<h6 class="text-primary font-semibold font-serif text-3xl mb-4">Log In</h6>
								<div class="text-muted mb-6">Book using an existing account</div>
								<div class="mb-4">
									<label class="text-muted">E-mail address</label>
									<input type="email" v-model="user.email" data-required />
								</div>
								<div class="mb-6">
									<label class="text-muted">Password</label>
									<input type="password" v-model="user.password" data-required />
								</div>
								<button class="btn btn-primary" type="submit"><span>Login and book</span></button>

								<div class="flex items-center my-8">
									<span class="text-muted">Or login with:</span>
									<div class="ml-auto flex">
										<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="FacebookLoginAndBook" data-action="login"><FacebookAltIcon height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></FacebookAltIcon></button>
										<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100 ml-3" type="button" @click="GoogleLoginAndBook" data-action="login"><GoogleAltIcon height="10" width="10" transform="scale(1.4)" class="fill-current text-primary"></GoogleAltIcon></button>
									</div>
								</div>
							</vue-form-validate>
						</div>
					</div>
				</div>
			</div>

			<!-- Booked Signup -->
			<div v-else-if="step == 'booked-signup'" class="container lg:my-12 my-6 flex items-center justify-center" key="payment">
				<div class="lg:w-5/12 w-11/12 bg-white rounded-2xl lg:p-12 p-6">
					<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">EVENT BOOKED. SIGN UP FOR FREE!</h6>
					<p class="text-muted text-xl">
						Hey there, thank you for scheduling a meeting with Telloe as a guest. If you sign up you can start using Telloe now and enjoy:
					</p>

					<div class="flex mt-10">
						<div>
							<div class="feature-check"><CheckmarkIcon class="absolute-center"></CheckmarkIcon></div>
						</div>
						<div class="pl-6">
							<div class="pb-6 border-bottom">
								<h6 class="font-serif text-primary font-semibold text-sm mb-2">FEATURE TITLE ONE</h6>
								<p class="text-muted">Feature title one description that helps the user decide to register.</p>
							</div>
						</div>
					</div>
					<div class="flex mt-6">
						<div>
							<div class="feature-check"><CheckmarkIcon class="absolute-center"></CheckmarkIcon></div>
						</div>
						<div class="pl-6">
							<div class="pb-6 border-bottom">
								<h6 class="font-serif text-primary font-semibold text-sm mb-2">FEATURE TITLE ONE</h6>
								<p class="text-muted">Feature title one description that helps the user decide to register.</p>
							</div>
						</div>
					</div>
					<div class="flex mt-6 mb-10">
						<div>
							<div class="feature-check"><CheckmarkIcon class="absolute-center"></CheckmarkIcon></div>
						</div>
						<div class="pl-6">
							<h6 class="font-serif text-primary font-semibold text-sm mb-2">FEATURE TITLE ONE</h6>
							<p class="text-muted">Feature title one description that helps the user decide to register.</p>
						</div>
					</div>

					<vue-button :loading="creatingAccount" class="w-full btn btn-primary mb-3" type="button" @click="createAccount">CREATE ACCOUNT</vue-button>
					<button :disabled="creatingAccount" class="w-full btn btn-outline-primary" type="button" @click="step = 'bookings'">SKIP AND VIEW BOOKING</button>
				</div>
			</div>

			<!-- Account Created -->
			<div v-else-if="step == 'account-created'" class="container lg:my-12 my-6 flex items-center justify-center" key="payment">
				<div class="lg:w-5/12 w-11/12 bg-white rounded-2xl lg:p-12 p-6">
					<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">NICE! YOUR TELLOE ACCOUNT IS NOW CREATED.</h6>
					<p class="text-muted mb-8">
						Thanks for creating a Telloe account. Once you finish this booking you can login to your Telloe account. A temporary passsword is sent to your e-mail address with additional information. <br /><br />
						Continue to your booking confirmation.
					</p>

					<button class="w-full btn btn-primary" type="button" @click="step = 'bookings'">TO BOOKING CONFIRMATION</button>
				</div>
			</div>

			<!-- Bookings -->
			<div v-else-if="step == 'bookings'" class="container lg:my-12 my-6 flex items-center justify-center" key="payment">
				<div class="lg:w-5/12 w-11/12 bg-white rounded-2xl lg:p-12 p-6">
					<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">WELL DONE! BOOKING CONFIRMED.</h6>
					<p class="mb-8">
						A calendar invite is on it’s way to your e-mail address.
					</p>
					<h4 class="mb-2 font-bold text-xl">{{ selectedService.name }}</h4>
					<div class="text-sm">
						<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ selectedService.duration }} min</span> &nbsp;&nbsp;&nbsp; Booking with <strong>{{ selectedService.coach.full_name }}</strong>
					</div>

					<div class="bg-gray-50 rounded-2xl p-4 mt-5" v-for="booking in bookings" :key="booking.id">
						<h6 class="font-semibold">{{ formatDate(booking.date) }} ({{ dayjs(booking.date).format('dddd') }})</h6>
						<div>{{ timezoneTime(booking.start) }} - {{ endTime(booking.end) }}</div>
						<div v-if="booking.recurring" class="text-muted text-xs flex xitems-center mt-4">
							<RefreshIcon class="fill-current mr-2 mt-1"></RefreshIcon>
							<div>
								Repeating booking every&nbsp;
								<span class="font-bold">{{ booking.recurring_days.join(',') }}</span>
								&nbsp;until&nbsp;
								<span class="font-bold">{{ booking.until }}</span>
							</div>
						</div>

						<VueDropdown @click="addToCalendar($event, booking)" :options="['Google Calendar', 'MS Outlook', 'Yahoo', 'iCal (.ics file download)']" class="mt-4">
							<template #button>
								<button class="btn btn-primary btn-sm flex items-center" type="button"><span>Add To Calendar</span><ChevronDownIcon class="fill-current"></ChevronDownIcon></button>
							</template>
						</VueDropdown>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="absolute-center">
			<div class="spinner" role="status"></div>
		</div>

		<!-- Booking loader -->
		<div v-if="bookingLoading" class="bg-secondary fixed z-50 top-0 left-0 w-full h-full text-center">
			<div class="container h-full flex items-center justify-center">
				<div class="w-4/12 bg-white rounded-2xl p-14">
					<div class="spinner" role="status"></div>
					<div class="mt-4 text-2xl">
						Booking...
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./profile.js"></script>

<style lang="scss" scoped src="./profile.scss"></style>
