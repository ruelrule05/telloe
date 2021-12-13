<template>
	<div :class="{ 'is-widget': $root.widget }">
		<div v-if="ready">
			<div v-if="noServiceForWidget" class="absolute-center text-sm text-center text-muted w-full">No event type available for this widget.</div>
			<template v-else>
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
							<div v-else class="grid lg:grid-cols-2 lg:gap-10 gap-8">
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
												class="profile-image profile-image-sm -mr-2"
												:style="{
													backgroundImage: 'url(' + profile.profile_image + ')'
												}"
											>
												<span v-if="!profile.profile_image">{{ profile.initials }}</span>
											</div>
											<div v-for="assignedService in service.assigned_services" :key="assignedService.id" class="-mr-2 border-2 border-gray-50 rounded-full relative">
												<div
													class="profile-image profile-image-sm"
													:style="{
														backgroundImage: 'url(' + assignedService.user.profile_image + ')'
													}"
												>
													<span v-if="!assignedService.user.profile_image">{{ assignedService.user.initials }}</span>
												</div>
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
				<div v-else-if="selectedServiceForTimeline && !step" class="container lg:my-12 my-6 flex justify-center time-selector" key="service">
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
								<div class="mb-6">
									<div class="text-muted text-sm mb-2">Your timezone:</div>
									<vue-select :options="timezonesOptions" drop-position="w-full" searchable button_class="btn btn-white mx-1 shadow-sm" v-model="timezone"></vue-select>
								</div>
								<div class="text-muted text-sm mb-2 widget-hide">Schedule a time with:</div>

								<div class="widget-hide mb-4">
									<!-- Main Coach -->
									<div
										class="coach-card"
										:class="{ active: selectedCoachId == profile.id }"
										@click="
											selectedCoachId = profile.id;
											selectedService = selectedServiceForTimeline;
										"
										v-tooltip.right="profile.timezone"
									>
										<div class="flex">
											<div class="profile-image profile-image-sm" :style="{ 'background-image': `url(${profile.profile_image})` }">
												<span v-if="!profile.profile_image">{{ profile.initials }}</span>
											</div>
											<div class="pl-3">
												<h6 class="text-primary font-bold">
													{{ profile.full_name }}
												</h6>
											</div>
										</div>
									</div>

									<!-- Assigned Coaches -->
									<div
										v-for="assignedService in selectedServiceForTimeline.assigned_services"
										class="coach-card mt-4"
										:class="{ active: selectedCoachId == assignedService.coach.id }"
										:key="assignedService.id"
										@click="
											selectedCoachId = assignedService.coach.id;
											selectedService = assignedService;
										"
										v-tooltip.right="assignedService.coach.timezone"
									>
										<div class="flex">
											<div class="profile-image profile-image-sm" :style="{ 'background-image': `url(${assignedService.coach.profile_image})` }">
												<span v-if="!assignedService.coach.profile_image">{{ assignedService.coach.initials }}</span>
											</div>
											<div class="pl-2">
												<h6 class="text-primary font-bold">
													{{ assignedService.coach.full_name }}
												</h6>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- Date/time selection -->
							<div class="lg:p-12 pt-0 p-8 lg:w-8/12 date-time-selector">
								<div class="lg:flex items-center justify-between">
									<div class="text-muted text-sm">Select one or more timeslots</div>
									<div>
										<div class="button-date-nav lg:mt-0 mt-2">
											<button type="button" @click="previousWeek()"><ArrowLeftIcon class="fill-current"></ArrowLeftIcon></button>

											<div class="px-2">
												<v-date-picker class="relative" :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate" :masks="masks">
													<template v-slot="{ inputValue, inputEvents }">
														<button type="button" class="uppercase font-semibold" v-on="inputEvents">
															<span>{{ inputValue }}</span>
														</button>
													</template>
												</v-date-picker>
											</div>

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
														<td class="align-top" :key="dateIndex" v-if="selectedService.days[date.dayName].isOpen">
															<template v-if="selectedService && timeslots && (timeslots[date.dayName] || []).length > 0">
																<div v-for="(timeslot, timeslotIndex) in timeslots[date.dayName]" :key="timeslotIndex">
																	<button type="button" class="timeslot" :class="{ disabled: !timeslot.is_available, selected: selectedTimeslots.find(x => x.date.dayName == date.dayName && x.timeslot.time == timeslot.time) }" @click="setSelectedDateAndTimeslot(date, timeslot)">
																		{{ convertTime(timezoneTime.get(`${date.format} ${timeslot.time}`, selectedService.timezone, timezone), 'hh:mmA') }}
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
										<div class="text-muted text-sm mt-4 lg:mt-0">Note: You can add recurring timeslots on the next step.</div>
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
				<div v-else-if="step == 'summary'" class="lg:flex summary" key="summary">
					<div class="border w-4/12 lg:p-16 p-8 bg-secondary">
						<h6 class="text-primary font-serif text-4xl font-semibold leading-none lg:mb-10 mb-5">SET YOUR BOOKING DETAILS</h6>
						<button class="btn btn-outline-primary flex items-center" type="button" @click="step = false"><ChevronLeftIcon class="fill-current mr-4"></ChevronLeftIcon><span>Back</span></button>
					</div>
					<div class="lg:w-8/12 min-h-screen bg-white lg:p-16 p-8">
						<vue-form-validate
							@submit="
								() => {
									if (selectedService.form_builder && JSON.parse(selectedService.form_builder).length > 0) {
										step = 'form_builder';
									} else {
										step = selectedService.require_payment ? 'payment' : 'authenticate';
									}
								}
							"
						>
							<h4 class="mb-2 font-serif font-semibold text-2xl text-primary">{{ selectedService.name }}</h4>
							<div class="text-sm">
								<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ selectedService.duration }} min</span> &nbsp;&nbsp;&nbsp; Booking with <strong>{{ selectedService.coach.full_name }}</strong>
							</div>

							<div class="lg:w-8/12">
								<div v-for="(selectedTimeslot, selectedTimeslotIndex) in selectedTimeslots" :key="selectedTimeslotIndex" class="mt-8">
									<div class="flex items-start justify-between">
										<div>
											<div class="font-bold">{{ dayjs(selectedTimeslot.date.format).format('MMMM D, YYYY') }} ({{ selectedTimeslot.date.dayName }})</div>
											<div>{{ convertTime(timezoneTime.get(`${selectedTimeslot.date.format} ${selectedTimeslot.timeslot.time}`, selectedService.timezone, timezone), 'hh:mmA') }} - {{ convertTime(endTime(selectedTimeslot), 'hh:mmA') }}</div>
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
														$set(selectedTimeslot, 'end_date', dayjs(new Date()).add(1, 'week').toDate());
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
														<v-date-picker :min-date="new Date()" class="input relative" mode="date" :popover="{ placement: 'left', visibility: 'click' }" v-model="selectedTimeslot.end_date" :masks="masks">
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
												<div class="mt-1" v-else-if="type.type == 'Phone'">
													<input type="tel" @keydown="numbersOnly" :disabled="selectedTimeslot.type != type" :data-required="selectedTimeslot.type == type" class="w-2/3" v-model="phone" />
												</div>
												<div class="mt-1" v-else-if="type.type == 'Skype'">
													<input type="text" :disabled="selectedTimeslot.type != type" :data-required="selectedTimeslot.type == type" class="w-2/3" v-model="skype" placeholder="Add your Skype ID" />
												</div>

												<span v-else-if="type.type == 'Telloe Video Call'"> A conversation will be created for the video call. </span>
												<span v-else-if="type.type == 'Zoom'">A Zoom meeting link will be sent to your booking confirmation email. </span>
												<span v-else-if="type.type == 'MS Team'">An MS Team meeting link will be sent to your booking confirmation email. </span>
												<span v-else>{{ type.type }} meeting will be created after the booking is placed.</span>
											</div>
											<div>
												<ZoomIcon v-if="type.type == 'Zoom'" class="w-5 h-5"></ZoomIcon>
												<img src="/logo.svg" v-else-if="type.type == 'Telloe Video Call'" class="w-5 h-5" />
												<GoogleMeetIcon v-else-if="type.type == 'Google Meet'" class="w-5 h-5"></GoogleMeetIcon>
												<MapMarkerIcon v-else-if="type.type == 'Face-to-face'" class="w-5 h-5 fill-current text-primary"></MapMarkerIcon>
												<PhoneIcon v-else-if="type.type == 'Phone'" class="w-5 h-5 fill-current text-primary"></PhoneIcon>
												<SkypeIcon v-else-if="type.type == 'Skype'" class="w-5 h-5 fill-current text-primary"></SkypeIcon>
											</div>
										</div>
									</div>
								</div>
							</div>

							<button :disabled="selectedTimeslots.length == 0" class="mt-8 btn btn-primary" type="submit">
								<span>Continue <span v-if="selectedService.require_payment">to payment</span></span>
							</button>
						</vue-form-validate>
					</div>
				</div>

				<!-- Form builder -->
				<div v-else-if="step == 'form_builder'" class="lg:flex summary" key="form_builder">
					<div class="border w-4/12 lg:p-16 p-8 bg-secondary">
						<h6 class="text-primary font-serif text-4xl font-semibold leading-none lg:mb-10 mb-5">COMPLETE FORM</h6>
						<button class="btn btn-outline-primary flex items-center" type="button" @click="step = 'summary'"><ChevronLeftIcon class="fill-current mr-4"></ChevronLeftIcon><span>Back</span></button>
					</div>
					<div class="lg:w-8/12 min-h-screen bg-white lg:p-16 p-8">
						<vue-form-validate
							@submit="
								() => {
									step = selectedService.require_payment ? 'payment' : 'authenticate';
								}
							"
						>
							<div class="lg:w-8/12">
								<div v-for="(field, fieldIndex) in JSON.parse(selectedService.form_builder)" :key="fieldIndex" class="mt-8">
									<FormField v-model="formData[field.name]" :field="field" />
								</div>
							</div>

							<button :disabled="selectedTimeslots.length == 0" class="mt-8 btn btn-primary" type="submit">
								<span>Continue <span v-if="selectedService.require_payment">to payment</span></span>
							</button>
						</vue-form-validate>
					</div>
				</div>

				<!-- Payment -->
				<div v-else-if="step == 'payment'" class="container lg:my-12 my-6 flex items-center justify-center payment" key="payment">
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
								<input v-model="cardForm.number" type="tel" class="input-cc rounded-b-none border-b-0" :class="{ 'is-invalid': cardForm.errors.number }" placeholder="#### #### #### ####" v-cardformat:formatCardNumber data-required />
							</div>
							<div class="flex relative">
								<div class="flex-grow">
									<input type="text" :class="{ 'is-invalid': cardForm.errors.expiration }" v-model="cardForm.expiration" class="input-cc rounded-t-none rounded-r-none border-r-0 border-t-0" placeholder="MM/YY" v-cardformat:formatCardExpiry data-required />
								</div>
								<div class="flex-grow border-left">
									<input type="text" :class="{ 'is-invalid': cardForm.errors.cvc }" v-model="cardForm.cvc" class="input-cc rounded-t-none rounded-l-none border-l-0 border-t-0" placeholder="CVC" v-cardformat:formatCardCVC data-required />
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
				<div v-else-if="step == 'authenticate'" class="lg:flex authenticate" key="authenticate">
					<div class="border w-4/12 lg:p-16 p-8 bg-secondary">
						<h6 class="text-primary font-serif text-4xl font-semibold leading-none lg:mb-10 mb-5">ADD YOUR CONTACT INFO</h6>
						<button :disabled="bookingLoading" class="btn btn-outline-primary flex items-center" type="button" @click="step = selectedService.require_payment ? 'payment' : 'summary'"><ChevronLeftIcon class="fill-current mr-4"></ChevronLeftIcon><span>Back</span></button>
					</div>
					<div class="lg:w-8/12 min-h-screen bg-white">
						<div class="grid lg:grid-cols-2 border-bottom">
							<div class="border-right lg:p-8 p-4">
								<div class="flex items-center justify-between">
									<h6 class="font-semibold font-serif mb-8 cursor-pointer" :class="{ 'text-primary': authFormAction == 'asGuest' }" @click="authFormAction = 'asGuest'">Book as guest</h6>
									<h6 class="font-semibold font-serif mb-8 cursor-pointer" :class="{ 'text-primary': authFormAction == 'logIn' }" @click="authFormAction = 'logIn'">Log In</h6>
								</div>
								<vue-form-validate v-if="authFormAction == 'asGuest'" @submit="bookGuest">
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
									<div class="mb-6">
										<label class="text-muted">Timezone</label>
										<vue-select :options="timezonesOptions" drop-position="w-full" searchable button_class="btn btn-white mx-1 shadow-sm" v-model="timezone"></vue-select>
									</div>
									<button class="btn btn-primary" type="submit"><span>Book as guest</span></button>
								</vue-form-validate>

								<vue-form-validate v-else-if="authFormAction == 'logIn'" @submit="LoginAndBook">
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
							<div class="lg:p-8 p-4">
								<h6 class="font-semibold font-serif">Add guests</h6>
								<p class="mb-8">Include guests in this booking by adding their email address below.</p>

								<multiselect v-model="guests" ref="guestsSelect" :options="[]" :showLabels="false" placeholder="Add an email" multiple clearOnSelect>
									<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
									<div slot="noResult" slot-scope="data" class="text-muted text-sm text-center">
										<button v-if="isEmail.validate(data.search)" type="button" @click="addEmail(data.search)" class="btn btn-sm btn-outline-primary">
											<span>Add this email</span>
										</button>
										<span v-else>Invalid email</span>
									</div>
								</multiselect>
							</div>
						</div>
					</div>
				</div>

				<!-- Booked Signup -->
				<div v-else-if="step == 'booked-signup'" class="container lg:my-12 my-6 flex items-center justify-center booked-signup" key="booked-signup">
					<div class="lg:w-5/12 w-11/12 bg-white rounded-2xl lg:p-12 p-8">
						<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-4">EVENT BOOKED. SIGN UP FOR FREE!</h6>
						<p class="text-muted">Hey there, thank you for scheduling a meeting with Telloe as a guest. If you sign up you can start using Telloe now and enjoy:</p>

						<div class="flex mt-10">
							<div>
								<div class="feature-check"><CheckmarkIcon class="absolute-center"></CheckmarkIcon></div>
							</div>
							<div class="pl-6">
								<div class="pb-6 border-bottom">
									<h6 class="font-serif text-primary font-semibold text-sm mb-2 uppercase">Collaborate, Organize, Week Sorted</h6>
									<p class="text-muted text-sm">Simplified online scheduling that takes the hassle out of bookings.</p>
								</div>
							</div>
						</div>
						<div class="flex mt-6">
							<div>
								<div class="feature-check"><CheckmarkIcon class="absolute-center"></CheckmarkIcon></div>
							</div>
							<div class="pl-6">
								<div class="pb-6 border-bottom">
									<h6 class="font-serif text-primary font-semibold text-sm mb-2 uppercase">Create Team Booking Groups</h6>
									<p class="text-muted text-sm">Share your teams calendar allowing people to book with the person that’s available at the time that best works for them</p>
								</div>
							</div>
						</div>
						<div class="flex mt-6 mb-10">
							<div>
								<div class="feature-check"><CheckmarkIcon class="absolute-center"></CheckmarkIcon></div>
							</div>
							<div class="pl-6">
								<h6 class="font-serif text-primary font-semibold text-sm mb-2 uppercase">Getting paid in a way that works for you.</h6>
								<p class="text-muted text-sm">Take credit or debit card payments ahead of appointments using stripe integration.</p>
							</div>
						</div>

						<vue-button :loading="creatingAccount" class="w-full btn btn-primary mb-3" type="button" @click="createAccount">CREATE ACCOUNT</vue-button>
						<button :disabled="creatingAccount" class="w-full btn btn-outline-primary" type="button" @click="step = 'bookings'">SKIP AND VIEW BOOKING</button>
					</div>
				</div>

				<!-- Account Created -->
				<div v-else-if="step == 'account-created'" class="container lg:my-12 my-6 flex items-center justify-center" key="payment">
					<div class="lg:w-5/12 w-11/12 bg-white rounded-2xl lg:p-12 p-8">
						<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">NICE! YOUR TELLOE ACCOUNT IS NOW CREATED.</h6>
						<p class="text-muted mb-8">
							Thanks for creating a Telloe account. Once you finish this booking you can login to your Telloe account. A temporary passsword is sent to your e-mail address with additional information. <br /><br />
							Continue to your booking confirmation.
						</p>

						<button class="w-full btn btn-primary" type="button" @click="step = 'bookings'">TO BOOKING CONFIRMATION</button>
					</div>
				</div>

				<!-- Bookings -->
				<div v-else-if="step == 'bookings'" class="container lg:my-12 my-6 flex items-center justify-center bookings" key="bookings">
					<div class="lg:w-5/12 w-11/12">
						<div class="bg-white rounded-2xl p-8">
							<h6 class="text-primary font-serif text-3xl font-semibold leading-none mb-8">WELL DONE! BOOKING CONFIRMED.</h6>
							<p class="mb-8">A calendar invite is on it’s way to your e-mail address.</p>
							<h4 class="mb-2 font-bold text-xl">{{ selectedService.name }}</h4>
							<div class="text-sm">
								<span class="text-muted font-bold inline-flex"><ClockIcon class="fill-current mr-2"></ClockIcon>{{ selectedService.duration }} min</span> &nbsp;&nbsp;&nbsp; Booking with <strong>{{ selectedService.coach.full_name }}</strong>
							</div>

							<div class="bg-gray-50 rounded-2xl p-4 mt-5" v-for="booking in bookings" :key="booking.id">
								<h6 class="font-semibold">{{ formatDate(booking.date) }} ({{ dayjs(booking.date).format('dddd') }})</h6>
								<div>{{ convertTime(timezoneTime.get(`${booking.date} ${booking.start}`, booking.timezone, timezone), 'hh:mmA') }} - {{ convertTime(timezoneTime.get(`${booking.date} ${booking.end}`, booking.timezone, timezone), 'hh:mmA') }}</div>
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
						<button type="button" class="btn btn-outline-primary w-full mt-4" @click="reset"><span>CREATE ANOTHER BOOKING</span></button>
					</div>
				</div>
			</template>
		</div>

		<div v-else class="absolute-center h-full w-full">
			<div class="absolute-center">
				<div class="spinner" role="status"></div>
			</div>
		</div>

		<!-- Booking loader -->
		<div v-if="bookingLoading" class="bg-secondary fixed z-50 top-0 left-0 w-full h-full text-center booking-loader">
			<div class="container h-full flex items-center justify-center">
				<div class="w-4/12 bg-white rounded-2xl p-14">
					<div class="spinner" role="status"></div>
					<div class="mt-4 text-2xl">Booking...</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./profile.js"></script>

<style lang="scss" scoped src="./profile.scss"></style>
