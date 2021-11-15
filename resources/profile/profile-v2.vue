<template>
	<div>
		<div class="text-center h-100 w-100 overflow-auto" v-if="ready">
			<transition-group name="fade" tag="div">
				<!-- Select service -->
				<div class="container" v-if="!selectedServiceForTimeline" key="services">
					<div class="row justify-content-center">
						<div class="col-md-10 col-container">
							<div class="bg-white shadow-sm rounded p-md-4 py-5 h-100 w-100">
								<div class="profile-image d-inline-block bg-white mb-2" :style="{ 'background-image': `url(${$root.profile.profile_image})` }">
									<span v-if="!$root.profile.profile_image">{{ $root.profile.initials }}</span>
								</div>
								<h1 class="font-heading h3">{{ $root.profile.full_name }}</h1>

								<div v-if="packages.length > 0" class="text-left mt-5 mb-n4 px-4">
									<button class="btn px-4 py-3 rounded-0" :class="[tab == 'services' ? 'btn-primary' : 'btn-white border-bottom']" type="button" @click="tab = 'services'">SERVICES</button>
									<button class="btn px-4 py-3 rounded-0 ml-2" type="button" :class="[tab == 'packages' ? 'btn-primary' : 'btn-white border-bottom']" @click="tab = 'packages'">PACKAGES</button>
								</div>

								<template v-cloak>
									<!-- Services -->
									<template v-if="tab == 'services'">
										<h6 v-if="services.length == 0" class="text-gray font-weight-light">No services available</h6>
										<div v-else class="row text-left mt-5 mx-0">
											<div v-for="service in services" :key="service.id" class="col-md-6">
												<div class="card rounded service cursor-pointer mb-3 border" @click="selectedServiceForTimeline = service">
													<div class="card-body">
														<h3 class="font-heading h5 mb-1">{{ service.name }}</h3>
														<p class="mb-0">{{ service.description }}</p>

														<div class="d-flex align-items-center mt-3">
															<clock-icon width="17" height="17" fill="#888"></clock-icon>
															<span class="ml-2">{{ service.duration }} minutes</span>
														</div>
														<div v-if="service.assigned_services.length > 0" class="d-flex align-items-center mt-1">
															<users-icon width="17" height="17" fill="#888"></users-icon>
															<span class="ml-2">{{ service.assigned_services.length }} available coaches</span>
														</div>
														<div class="d-flex mt-3">
															<div v-for="(day, index) in days" :key="index" class="badge-day mr-1 rounded-circle position-relative overflow-hidden" :class="[service.days[day].isOpen ? 'bg-primary text-white' : 'text-gray-400 bg-gray-200']">
																<span class="position-absolute-center font-weight-light line-height-1">{{ day.charAt(0) }}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</template>

									<!-- Packages -->
									<template v-else-if="tab == 'packages'">
										<div class="row text-left mt-5 mx-0">
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
								</template>
							</div>
						</div>
					</div>
				</div>

				<!-- Select coach/date/time -->
				<div v-else-if="selectedServiceForTimeline && (!selectedDate || !selectedTimeslot)" class="position-absolute-center container selected-service-container" key="service">
					<div class="row justify-content-center h-100">
						<div class="col-md-12 col-container h-100">
							<div class="d-flex align-items-center mb-3">
								<button class="btn line-height-0 p-0 close float-none" type="button" @click="selectedServiceForTimeline = selectService = null"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
								<h4 class="mb-0 font-heading ml-3">{{ selectedServiceForTimeline.name }}</h4>
							</div>
							<div class="bg-white shadow-sm rounded selected-service text-left">
								<!-- Date/time selection -->
								<div class="pl-3 py-4">
									<div class="pl-5 mb-4">
										<div class="pl-2 d-flex align-items-center">
											<v-date-picker class="relative" :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="selectedDate">
												<button class="btn btn-white btn-sm p-1 badge-pill border"><calendar-day-alt-icon></calendar-day-alt-icon></button>
											</v-date-picker>
											<ul class="nav nav-pills ml-2">
												<li class="nav-item" v-for="(tabDate, index) in tabDates" :key="index">
													<span class="nav-link p-1 px-3 cursor-pointer" :class="[dayjs(dayjs(selectedDate).format('YYYY-MM-DD')).isSame(dayjs(tabDate.date).format('YYYY-MM-DD')) ? 'active' : 'text-body']" @click="selectedDate = tabDate.date">
														<small class="text-gray-500" style="font-size: 12px">{{ tabDate.name }}</small>
														<div>{{ tabDate.label }}</div>
													</span>
												</li>
											</ul>
										</div>
									</div>

									<!-- Main coach -->
									<div class="d-flex align-items-center">
										<div class="coach-container pt-2">
											<div class="coach text-center">
												<div class="profile-image profile-image-xs bg-white" :style="{ 'background-image': `url(${$root.profile.profile_image})` }">
													<span v-if="!$root.profile.profile_image">{{ $root.profile.initials }}</span>
												</div>
											</div>
										</div>
										<div class="flex-grow-1 ml-3 mr-4">
											<h6 class="font-heading mb-1">{{ $root.profile.full_name }}</h6>
											<div class="bg-light rounded position-relative timeline-container">
												<div v-if="timeslotsLoading" class="position-absolute-center">
													<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
												</div>
												<div v-else-if="(selectedServiceForTimeline.timeslots || []).length > 0" class="timeline d-flex text-center timeslots-container">
													<div v-for="(timeslot, index) in timeslots" :key="index" class="timeslot flex-1 border-right pt-1">
														<div class="position-relative px-1 pb-1">
															<template v-for="(availableTimeslot, index) in availableTimeslots(selectedServiceForTimeline, timeslot)">
																<div
																	v-tooltip.top="timezoneTooltip(selectedServiceForTimeline.user.timezone, availableTimeslot)"
																	:key="index"
																	class="small py-1 bg-primary position-relative text-white cursor-pointer rounded border border-white"
																	@click="
																		selectedService = selectedServiceForTimeline;
																		selectedTimeslot = availableTimeslot;
																	"
																>
																	<span class="text-nowrap">{{ convertTime(availableTimeslot.time, 'hh:mmA') }}</span>
																</div>
															</template>
														</div>
													</div>
												</div>
												<div v-else class="position-absolute-center text-muted">No available timeslots</div>
											</div>
										</div>
									</div>

									<!-- Assigned services -->
									<div v-for="assignedService in selectedServiceForTimeline.assigned_services" class="d-flex align-items-center mt-4" :key="assignedService.id">
										<div class="coach-container pt-2">
											<div class="coach text-center">
												<div class="profile-image profile-image-xs bg-white" :style="{ 'background-image': `url(${assignedService.user.profile_image})` }">
													<span v-if="!assignedService.user.profile_image">{{ assignedService.user.initials }}</span>
												</div>
											</div>
										</div>

										<div class="flex-grow-1 ml-3 mr-4">
											<h6 class="font-heading mb-1">{{ assignedService.user.full_name }}</h6>
											<div class="bg-light rounded position-relative timeline-container">
												<div v-if="timeslotsLoading" class="position-absolute-center">
													<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
												</div>
												<div v-else-if="(assignedService.timeslots || []).length > 0" class="timeline d-flex text-center timeslots-container">
													<div v-for="(timeslot, index) in timeslots" :key="index" class="timeslot flex-1 border-right pt-1">
														<div class="position-relative px-1 pb-1">
															<template v-for="(availableTimeslot, index) in availableTimeslots(assignedService, timeslot)">
																<div
																	v-tooltip.top="timezoneTooltip(assignedService.user.timezone, availableTimeslot)"
																	:key="index"
																	class="small py-1 bg-primary position-relative text-white cursor-pointer rounded border border-white"
																	@click="
																		selectedService = assignedService;
																		selectedTimeslot = availableTimeslot;
																	"
																>
																	<span class="text-nowrap pointer-events-none">{{ convertTime(availableTimeslot.time, 'hh:mmA') }}</span>
																</div>
															</template>
														</div>
													</div>
												</div>
												<div v-else class="position-absolute-center text-muted">No available timeslots</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-else class="position-absolute-center container selected-service-container" key="sdummary">
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
												</template>
												<template v-else-if="authAction == 'signup'">
													<h5 class="h4 font-heading mb-3">Create your account</h5>
													<div class="form-group mb-2">
														<input type="text" v-model="loginForm.first_name" placeholder="First Name" class="form-control" data-required />
													</div>
													<div class="form-group mb-2">
														<input type="text" v-model="loginForm.last_name" placeholder="Last Name" class="form-control" data-required />
													</div>
													<div class="form-group mb-2">
														<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control" data-required />
													</div>
													<div class="form-group">
														<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required />
													</div>
													<vue-button type="submit" :loading="loginForm.loading" button_class="mt-2 btn-block btn btn-primary">Sign Up & Book</vue-button>
												</template>

												<div class="d-flex mx-n1 mt-2">
													<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center line-height-1" @click="FacebookLoginAndBook"><facebook-icon height="20" width="20" class="mr-2"></facebook-icon>Facebook</button>
													<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center line-height-1" @click="GoogleLoginAndBook"><google-icon height="16" width="16" class="mr-2"></google-icon>Google</button>
												</div>

												<div class="mt-3">
													<button type="button" v-if="authAction == 'login'" class="btn btn-link btn-sm text-body p-0" @click="authAction = 'signup'">Don't have an account?</button>
													<button type="button" v-else class="btn btn-link btn-sm text-body p-0" @click="authAction = 'login'"><u>Login</u></button>
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

<script src="./profile.js"></script>

<style lang="scss" scoped src="./profile.scss"></style>
