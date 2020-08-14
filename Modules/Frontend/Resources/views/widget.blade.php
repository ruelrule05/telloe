<!doctype html>
<html lang="en">
<head>
	<link rel="stylesheet" href="{{ mix('css/widget.css') }}">
</head>
<body>
	<div id="app" v-cloak>
		<button v-if="!open" id="button" class="btn btn-primary d-flex align-items-center" type="button" @click="open = !open">
			<calendar-icon class="fill-white mr-1" width="18" height="18"></calendar-icon> Book Now
		</button>

		<div v-else class="widget position-absolute border rounded shadow-sm overflow-hidden d-flex flex-column">
			<div class="top-buttons d-flex align-items-center py-2 pl-3 pr-2 bg-transparent">
				<button :disabled="!selectedService" class="btn btn-white badge-pill p-0 shadow-none" :class="{'opacity-0': !selectedService}" type="button" @click="selectedService = null"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
				<button v-if="!isBooking" class="btn btn-white badge-pill p-0 shadow-none ml-auto" type="button" @click="reset(); open = false"><close-icon transform="scale(1.3)"></close-icon></button>
			</div>

			<div class="flex-grow-1 overflow-auto">
				<!-- Loading -->
				<div class="text-center position-relative h-100" v-if="isBooking">
					<div class="position-absolute-center w-100">
						<template v-if="bookingSuccess">
							<checkmark-circle-icon width="60" height="60" class="fill-success"></checkmark-circle-icon>
							<h6 class="h4 mb-4 mt-2 font-heading">Booking placed!</h6>
							<button class="btn btn-white border" type="button" @click="reset()">Close</button>
						</template>
						<template v-else>
							<div class="spinner-border text-primary" role="status"></div>
							<h6 class="h4 mt-4 mb-0 font-heading">Booking...</h6>
						</template>
					</div>
				</div>

				<template v-else>
					<div v-if="!selectedService" key="services">
						<div class="text-center">
							<div class="profile-image d-inline-block bg-white mb-1" style="background-image: url('{{ $profile->profile_image }}')">
								@if(!$profile->profile_image) <span>{{ $profile->initials }}</span> @endif
							</div>
							<h1 class="font-heading h5 mb-0">{{ $profile->full_name }}</h1>
							<span class="text-secondary">{{ '@'.$profile->username }}</span>

							<template v-cloak>
								<h6 v-if="services.length == 0" class="text-gray font-weight-light">No services available</h6>
								<div v-else class="text-left mt-4">
									<div v-for="service in services" class="service cursor-pointer px-4 pt-4" @click="selectedService = service">
										<div class="border-bottom pb-4">
											<h3 class="font-heading h6 mb-1">@{{ service.name }} (@{{ service.duration }} minutes)</h3>
											<p class="mb-0">@{{ service.description }}</p>

											<div class="d-flex mt-2">
												<div v-for="day in days" class="badge-day mr-1 rounded-circle position-relative overflow-hidden" :class="[service.days[day].isOpen ? 'bg-primary text-white' : 'text-gray-400 bg-gray-200']">
													<span class="position-absolute-center font-weight-light line-height-1">@{{ day.charAt(0) }}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</template>
						</div>
					</div>

					<div v-else key="service" class="px-4 pb-4">
						<div class="selected-service h-1004">
							<div class="position-relative text-left">
								<!-- <div class="profile-image profile-image-sm d-inline-block bg-white mb-2" style="background-image: url('{{ $profile->profile_image }}')">
									@if(!$profile->profile_image) <span>{{ $profile->initials }}</span> @endif
								</div>
								<h3 class="font-heading h5 mb-0">{{ $profile->full_name }}</h3> -->
								<div class="text-left">
									<h3 class="font-heading h5 mb-1">@{{ selectedService.name }}</h3>
									<p class="mb-0">@{{ selectedService.description }}</p>
								</div>
								<div class="d-flex my-3">
									<div v-for="day in days" class="badge-day mr-1 rounded-circle position-relative overflow-hidden" :class="[selectedService.days[day].isOpen ? 'bg-primary text-white' : 'text-gray-400 bg-gray-200']">
										<span class="position-absolute-center font-weight-light line-height-1">@{{ day.charAt(0) }}</span>
									</div>
								</div>
								<div class="d-flex align-items-center">
									<clock-icon width="17" height="17" class="fill-secondary mr-2"></clock-icon>
									<span class="text-secondary">@{{ selectedService.duration }} minutes</span>
								</div>
								<span class="text-secondary d-inline-flex align-items-center mt-1">
									<earth-icon height="17" width="17" class="fill-secondary mr-2"></earth-icon>
									{{ $profile->timezone }}
								</span>
							</div>


							<div class="h-100 text-left d-flex flex-column overflow-hidden position-relative mt-3">
								<template v-if="!authForm">
		            				<div class="d-flex align-items-center">
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
													<div class="weekday-slider d-flex align-items-center position-relative" :style="{'transform': `translate(${sliderTranslate - (sliderNavIndex * sliderItemSize)}px, 0px)`}" ref="weekday-slider">
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
												<button :disabled="!selectedTimeslot" class="ml-auto btn btn-primary" type="button" @click="authForm = true">Next</button>
											</div>
										</div>
									</div>
								</template>

								<!-- Auth form -->
								<template v-else>
									<div class="d-flex flex-column h-100">
										<div class="flex-grow-1 h-100 position-relative">
											<vue-form-validate @submit="login" class="w-100">
												<h5 class="h4 font-heading mb-4">Log In</h5>
												<div class="form-group mb-2">
													<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control shadow-none border" data-required>
												</div>
												<div class="form-group">
													<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control shadow-none border" data-required>
												</div>
												<div class="d-flex align-items-center mt-4">
													<button class="btn btn-white border" type="button" @click="authForm = false">Previous</button>
													<vue-button type="submit" :loading="loginForm.loading" button_class="ml-auto btn btn-primary">Log In & Book</vue-button>
												</div>
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
				</template>
			</div>
		</div>
	</div>

	<script>
		const PROFILE = {!! json_encode($profile) !!};
	</script>
	<script src="{{ mix('js/widget.js') }}" async defer></script>
</body>
</html>
