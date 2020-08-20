<!doctype html>
<html lang="en">
<head>
	<title>{{ $profile->full_name }} | {{ config('app.name')}}</title>
	@include('frontend::partials.meta_tags')
	<link rel="stylesheet" href="{{ mix('css/profile.css') }}">
</head>
<body>
	<div id="app" class="py-5" v-cloak>

		<div class="text-center" v-if="ready">
			<transition-group name="fade" tag="div">
				<div class="container" v-if="!selectedService" key="services">
					<div class="row justify-content-center">
						<div class="col-md-10">
							<div class="bg-white shadow-sm rounded p-4">
								<div class="profile-image d-inline-block bg-white mb-2" style="background-image: url('{{ $profile->profile_image }}')">
									@if(!$profile->profile_image) <span>{{ $profile->initials }}</span> @endif
								</div>
								<h1 class="font-heading h4">{{ $profile->full_name }}</h1>
								
								<template v-cloak>
									<h6 v-if="services.length == 0" class="text-gray font-weight-light">No services available</h6>
									<div v-else class="row text-left mt-5 mx-0">
										<div v-for="service in services" class="col-md-6">
											<div class="card rounded service cursor-pointer mb-3" @click="selectedService = service">
												<div class="card-body">
													<h3 class="font-heading h5 mb-1">@{{ service.name }}</h3>
													<p class="mb-0 text-secondary">@{{ service.description }}</p>

													<div class="d-flex align-items-center mt-3">
														<clock-icon width="17" height="17" fill="#888"></clock-icon>
														<span class="ml-1">@{{ service.duration }} minutes</span>
													</div>
													<div class="d-flex mt-2">
														<div v-for="day in days" class="badge-day mr-1 rounded-circle position-relative overflow-hidden" :class="[service.days[day].isOpen ? 'bg-primary text-white' : 'text-gray-400 bg-gray-200']">
															<span class="position-absolute-center font-weight-light line-height-1">@{{ day.charAt(0) }}</span>
														</div>
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

				<div class="position-absolute-center w-100 container" v-else key="service">
					<div class="row justify-content-center">
						<div class="col-md-9">
							<div class="bg-white shadow-sm rounded d-flex selected-service h-100">
								<div class="border-right p-4 w-50 position-relative text-left">
									<button class="btn p-0 close posidtion-absolute ml-n2 mt-n3 back-to-sedrvices float-none" type="button" @click="selectedService = null"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
									<!-- <div class="profile-image profile-image-sm d-inline-block bg-white mb-2" style="background-image: url('{{ $profile->profile_image }}')">
										@if(!$profile->profile_image) <span>{{ $profile->initials }}</span> @endif
									</div>
									<h3 class="font-heading h5 mb-0">{{ $profile->full_name }}</h3> -->
									<div class="text-left mt-2">
										<h3 class="font-heading h5 mb-1">@{{ selectedService.name }}</h3>
										<p class="mb-0">@{{ selectedService.description }}</p>
									</div>
									<div class="d-flex mt-3">
										<div v-for="day in days" class="badge-day mr-1 rounded-circle position-relative overflow-hidden" :class="[selectedService.days[day].isOpen ? 'bg-primary text-white' : 'text-gray-400 bg-gray-200']">
											<span class="position-absolute-center font-weight-light line-height-1">@{{ day.charAt(0) }}</span>
										</div>
									</div>
									<div class="d-flex align-items-center mt-3">
										<clock-icon width="17" height="17" class="fill-secondary mr-2"></clock-icon>
										<span class="text-secondary">@{{ selectedService.duration }} minutes</span>
									</div>
									<span class="text-secondary d-inline-flex align-items-center mt-1">
										<earth-icon height="17" width="17" class="fill-secondary mr-2"></earth-icon>
										{{ $profile->timezone }}
									</span>

									<div class="bg-light p-3 rounded mt-3" v-if="selectedDate && selectedTimeslot">
										<h6 class="font-heading h5">Selected date & time</h6>
										<p class="mb-0">
											@{{ formatDate(selectedDate) }} <br />
											@{{ selectedTimeslot.label }} - @{{ endTime }}
										</p>
									</div>
								</div>
		




								<div class="w-50 h-100 p-4 text-left d-flex flex-column overflow-hidden position-relative">
									<template v-if="!authForm">
			            				<div class="d-flex align-items-center mb-3">
											<h6 class="h5 font-heading">Select a date & time</h6>
						            		<button v-if="selectedDate" class="ml-auto btn d-flex align-items-center pr-0 pt-0" type="button" @click="calendarView = (calendarView == 'month') ? 'week' : 'month'; calcSliderTranslate()">
						            			<calendar-month-icon width="18" height="18" class="mr-1"></calendar-month-icon>
						            			<small class="text-capitalize">@{{ calendarView }} view</small>
						            		</button>
						            	</div>
										<div class="flex-grow-1 d-flex flex-column h-100">
											<div>
												<div class="align-items-center mt-2" :class="[calendarView == 'month' ? 'd-none' : 'd-flex']">
													<button class="btn p-0 ml-n2" type="button" @click="adjustSlider(-1)"><chevron-left-icon transform="scale(1.6)"></chevron-left-icon></button>
													<div class="flex-grow-1 overflow-hidden">
														<div class="weekday-slider d-flex align-items-center position-relative" :style="{'transform': `translate(${sliderTranslate - (sliderNavIndex * 86)}px, 0px)`}" ref="weekday-slider">
															<div v-for="(date, index) in weekDayOptions" class="px-1 weekday-day" :class="{'disabled': disabledDate(date)}" :id="date.id">
																<div class="py-1 px-2 rounded weekday-container cursor-pointer" :class="{'bg-primary text-white': sliderActiveDate(date)}" @click="selectedDate = date.date">
																	@{{ date.title }}
																	<strong class="text-uppercase d-block">@{{ date.description }}</strong>
																</div>
															</div>
														</div>
													</div>
													<button class="btn p-0 mr-n2" type="button" @click="adjustSlider(1)"><chevron-right-icon transform="scale(1.6)"></chevron-right-icon></button>
												</div>

												<div :class="{'d-none': calendarView == 'week'}">
													<v-date-picker :first-day-of-week="2" :select-attribute="selectAttribute" :disabled-dates="formattedHolidays" is-required class="v-calendar h-100 border-0 bg-light" v-model="selectedDate" @input="dateSelected" is-expanded is-inline :min-date="new Date()" title-position="left">
													</v-date-picker>
												</div>
											</div>

											<div class="flex-grow-1 overflow-hidden h-100 mt-3 d-flex flex-column" v-if="selectedDate && calendarView == 'week'">
												<div class="flex-grow-1 position-relative overflow-auto timeslots-container" :class="{'py-4': timeslotsLoading}">
													<div v-if="timeslotsLoading" class="position-absolute-center">
														<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
													</div>
													<div :class="{'d-none': timeslotsLoading}">
														<div v-if="timeslots.length == 0" class="text-gray text-center w-100 position-absolute-center">
															<span>There are no timeslots available for the selected date.</span>
														</div>
														<div v-else>
															<div class="d-flex flex-wrap">
																<div v-for="timeslot in timeslots" class="mt-2 w-100">
																	<div class="rounded cursor-pointer py-3 px-3" :class="[timeslot == selectedTimeslot ? 'bg-blue text-white' : 'bg-light']" @click="selectedTimeslot = timeslot;">
																		<small class="d-block">@{{ profile.timezone }}</small>
																		@{{ timeslot.label }}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="d-flex align-items-center mt-2" :class="{'opacity-0': !selectedDate}">
													<button v-if="auth" :disabled="!selectedTimeslot" class="ml-auto btn btn-primary" type="button" @click="submit()">Book Now</button>
													<button v-else :disabled="!selectedTimeslot" class="ml-auto btn btn-primary" type="button" @click="authForm = true">Next</button>
												</div>
											</div>
										</div>
									</template>

									<!-- Auth form -->
									<template v-else>
										<div class="d-flex flex-column h-100">
											<div class="flex-grow-1 h-100 position-relative">
												<vue-form-validate @submit="submit">
													<template v-if="authAction == 'login'">
														<h5 class="h4 font-heading mb-4">Log In</h5>
														<div class="form-group mb-2">
															<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control" data-required>
														</div>
														<div class="form-group">
															<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required>
														</div>
														<vue-button type="submit" :loading="loginForm.loading" button_class="mt-4 btn-block btn btn-primary">Log In & Book</vue-button>
													</template>
													<template v-else-if="authAction == 'signup'">
														<h5 class="h4 font-heading mb-4">Create your account</h5>
														<div class="form-group mb-2">
															<input type="text" v-model="loginForm.first_name" placeholder="First Name" class="form-control" data-required>
														</div>
														<div class="form-group mb-2">
															<input type="text" v-model="loginForm.last_name" placeholder="Last Name" class="form-control" data-required>
														</div>
														<div class="form-group mb-2">
															<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control" data-required>
														</div>
														<div class="form-group">
															<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required>
														</div>
														<vue-button type="submit" :loading="loginForm.loading" button_class="mt-4 btn-block btn btn-primary">Sign Up & Book</vue-button>
													</template>

													<div class="d-flex mx-n1 mt-3">
														<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center line-height-1" @click="FacebookLoginAndBook"><facebook-icon height="20" width="20" class="mr-2"></facebook-icon>Facebook</button>
														<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center line-height-1" @click="GoogleLoginAndBook"><google-icon height="16" width="16" class="mr-2"></google-icon>Google</button>
													</div>

													<div class="mt-3">
														<button type="button" v-if="authAction == 'login'" class="btn btn-link btn-sm text-body p-0" @click="authAction = 'signup'">Don't have an account?</button>
														<button type="button" v-else class="btn btn-link btn-sm text-body p-0 d-flex align-items-center" @click="authAction = 'login'"><arrow-left-icon></arrow-left-icon>Login</button>
													</div>
													<button class="btn btn-white border mt-4" type="button" @click="authForm = false">Previous</button>
												</vue-form-validate>

												<div class="text-center text-danger position-absolute w-100">&nbsp;@{{ authError }}&nbsp;</div>
											</div>
											<div>
												
											</div>
										</div>
									</template>
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
	@include('frontend::partials.social_scripts')
	<script>
		const PROFILE = {!! json_encode($profile) !!};
		const AUTH = {!! json_encode(Auth::user()) !!};
	</script>
	<script src="{{ mix('js/profile.js') }}" async defer></script>
</body>
</html>
