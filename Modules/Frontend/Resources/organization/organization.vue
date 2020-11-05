<template>
	<div>
		<div class="text-center h-100 w-100" v-if="ready">
			<transition-group name="fade" tag="div">
				<!-- Select service -->
				<div class="container" v-if="!selectedServiceForTimeline" key="services">
					<div class="row justify-content-center">
						<div class="col-md-10 col-container">
							<div class="p-md-4 py-5 h-100 w-100">
								<h1 class="font-heading h3">{{ organization.name }}</h1>

								<template v-cloak>
									<!-- Services -->
									<h6 v-if="services.length == 0" class="text-gray font-weight-light">No services available</h6>
									<div v-else class="text-left mt-4 d-flex flex-wrap">
										<div v-for="service in services" :key="service.id" class="w-50 p-3">
											<div
												class="card rounded service cursor-pointer shadow-sm"
												@click="
													selectedServiceForTimeline = service;
													selectedService = service.member_services[0];
													selectedCoachId = service.member_services[0].member_id
												"
											>
												<div class="card-body">
													<h3 class="font-heading h5 mb-1">{{ service.name }}</h3>
													<p class="mb-0 text-ellipsis">{{ service.description }}</p>

													<div class="d-flex align-items-center mt-3">
														<clock-icon width="17" height="17" fill="#888"></clock-icon>
														<span class="ml-2">{{ service.duration }} minutes</span>
													</div>
													<div v-if="service.member_services.length > 0" class="d-flex align-items-center mt-1">
														<users-icon width="17" height="17" fill="#888"></users-icon>
														<span class="ml-2">{{ service.member_services.length }} available coaches</span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<!-- Packages -->
									<div class="row text-left mt-4 mx-0">
										<div v-for="packageItem in packages" :key="packageItem.id" class="col-md-6">
											<div class="card rounded service cursor-pointer mb-3 border" @click="selectedService = service">
												<div class="card-body">
													<h3 class="font-heading h5 mb-1">{{ packageItem.name }}</h3>
													<p class="mb-4 mt-2">{{ packageItem.description }}</p>

													<div class="d-flex align-items-center">
														<package-icon width="17" height="17" fill="#888"></package-icon>
														<span class="ml-2">{{ packageItem.services.length }} services</span>
													</div>
													<div class="d-flex align-items-center mt-2">
														<coin-icon width="17" height="17" fill="#888"></coin-icon>
														<span class="ml-2">${{ parseFloat(packageItem.price).toFixed(2) }}</span>
													</div>
													<div class="d-flex align-items-center mt-2">
														<calendar-icon width="17" height="17" fill="#888"></calendar-icon>
														<span class="ml-2">Expires on {{ formatDate(packageItem.expiration_date) }}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>

				<!-- Select coach/date/time -->
				<div v-else-if="selectedServiceForTimeline && (!startDate || !selectedTimeslot)" class="container selected-service-container" key="service">
					<div class="mb-4 text-left">
						<button class="btn line-height-0 p-0 close float-none ml-n1" type="button" @click="selectedServiceForTimeline = selectService = null"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
						<h3 class="mb-0 font-heading">{{ selectedServiceForTimeline.name }}</h3>
					</div>


					<div class="text-left">
						<!-- Date/time selection -->
						<div class="pt-3 pb-4 d-flex">

							<div class="flex-grow-1 timeslots-wrapper position-relative">
								<!-- Assigned Coaches -->
								<div class="d-flex align-items-center coaches-container">
									<div
										v-for="memberService in selectedServiceForTimeline.member_services"
										class="px-3 pb-3 pt-2 rounded position-relative user-container cursor-pointer"
										:class="{ active: selectedCoachId == memberService.member_id }"
										:key="memberService.id"
										@click="
											selectedCoachId = memberService.member_id;
											selectedService = memberService;
										"
									>
										<div class="d-flex align-items-center px-1 pt-1">
											<div class="profile-image profile-image-xs cursor-pointer" :style="{ 'background-image': `url(${memberService.member.member_user.profile_image})` }">
												<span v-if="!memberService.member.member_user.profile_image">{{ memberService.member.member_user.initials }}</span>
											</div>
											<div class="flex-1 text-left pl-2">
												<h6 class="font-heading text-nowrap mb-0">
													{{ memberService.member.member_user.full_name }}
												</h6>
												<small class="text-secondary">{{ memberService.member.member_user.timezone }}</small>
											</div>
										</div>
									</div>
									<div class="ml-auto bg-white rounded shadow-sm d-flex align-items-center">
										<button class="btn btn-sm btn-white p-1" type="button" @click="previousWeek()">
											<chevron-left-icon height="25" width="25" transform="scale(1.4)"></chevron-left-icon>
										</button>
										<v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate">
											<button type="button" class="btn btn-white px-1 shadow-none rounded-0">{{ formatDate(startDate) }}</button>
										</v-date-picker>
										<button class="btn btn-sm btn-white p-1" type="button" @click="nextWeek()">
											<chevron-right-icon height="25" width="25" transform="scale(1.4)"></chevron-right-icon>
										</button>
									</div>
								</div>

								<div class="p-3 bg-white rounded timeslots-body shadow-sm position-relative">
									<table class="table table-sm table-borderless mb-0 table-layout-fixed">
										<thead>
											<tr>
												<th class="align-middle pb-2 pt-2 pl-2" v-for="(tabDate, index) in tabDates" :key="index">
													<strong>{{ tabDate.name }}</strong>
													<span class="text-gray">{{ tabDate.label }}</span>
												</th>
											</tr>
										</thead>
										<tbody class="shadow-none bg-transparent">
											<tr>
												<td v-for="(date, dateIndex) in tabDates" :key="dateIndex" class="px-2 rounded-0 position-relative">
													<div class="text-center" v-if="selectedService && timeslots && (timeslots[date.dayName] || []).length > 0">
														<div v-for="(timeslot, timeslotIndex) in timeslots[date.dayName]" :key="timeslotIndex">
															<div v-tooltip.top="timezoneTooltip(selectedService.member.member_user.timezone, timeslot)" :key="dateIndex" class="py-2 position-relative rounded my-2 timeslot-button" :class="[timeslot.is_available ? 'cursor-pointer bg-primary text-white' : 'disabled bg-gray-400 pointer-events-none']" @click="setSelectedDateAndTimeslot(date, timeslot)">
																<span class="text-nowrap">{{ convertTime(timeslot.time, 'hh:mmA') }}</span>
															</div>
														</div>
													</div>
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
				</div>

				<div v-else class="position-absolute-center container selected-service-container" key="summary">
					<div class="row justify-content-center">
						<div class="col-md-9">
							<div class="d-flex align-items-center mb-3">
								<button class="btn line-height-0 p-0 close" type="button" @click="selectedTimeslot = null"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
								<h4 class="mb-0 font-heading ml-3">Confirm and Book</h4>
							</div>
							<div class="bg-white shadow-sm rounded selected-service text-left d-flex">
								<div class="p-4 border-right flex-1">
									<h3 class="h3 mb-3 font-heading">{{ selectedService.name }}</h3>
									<div class="mb-3">
										<div class="font-weight-normal text-secondary">Coach</div>
										<div class="h6 font-heading">{{ selectedService.user.full_name }}</div>
									</div>
									<div class="mb-3">
										<div class="font-weight-normal text-secondary">Date</div>
										<div class="h6 font-heading">{{ formatDate(selectedDate) }}</div>
									</div>
									<div class="mb-3">
										<div class="font-weight-normal text-secondary">Starts at</div>
										<div class="h6 font-heading">{{ convertTime(selectedTimeslot.time, 'hh:mmA') }}</div>
									</div>
									<div class="mb-3">
										<div class="font-weight-normal text-secondary">Ends at</div>
										<div class="h6 font-heading">{{ endTime }}</div>
									</div>
									<div>
										<div class="font-weight-normal text-secondary">Duration</div>
										<div class="h6 font-heading">{{ selectedService.duration }} minutes</div>
									</div>
								</div>
								<div class="p-4 flex-1">
									<div class="d-flex flex-column h-100">
										<div class="flex-grow-1 h-100 position-relative">
											<vue-form-validate @submit="submit">
												<template v-if="authAction == 'login'">
													<h5 class="h4 font-heading mb-4">Log In</h5>
													<div class="form-group mb-2">
														<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control" data-required />
													</div>
													<div class="form-group">
														<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required />
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
													<div class="form-group">
														<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required />
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
											</vue-form-validate>

											<div class="text-center text-danger position-absolute w-100">&nbsp;{{ authError }}&nbsp;</div>
										</div>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition-group>
		</div>

		<div v-else>
			<div class="position-absolute-center">
				<div class="spinner-border text-primary" role="status"></div>
			</div>
		</div>

		<modal ref="bookingModal" :close-button="false">
			<div class="text-center booking-modal-progress position-relative">
				<div class="position-absolute-center w-100">
					<template v-if="bookingSuccess">
						<checkmark-circle-icon width="60" height="60" class="fill-success"></checkmark-circle-icon>
						<h6 class="h3 mb-4 mt-2 font-heading">Booking placed!</h6>
						<button class="btn btn-white border" type="button" @click="reset">Close</button>
					</template>
					<template v-else>
						<div class="spinner-border text-primary" role="status"></div>
						<h6 class="h3 mt-4 mb-0 font-heading">Booking...</h6>
					</template>
				</div>
			</div>
		</modal>
	</div>
</template>

<script src="./organization.js"></script>

<style lang="scss" scoped src="./organization.scss"></style>
