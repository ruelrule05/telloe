<!doctype html>
<html lang="en">
<head>
	<title>{{ $user->full_name }} | {{ config('app.name')}}</title>
	@include('frontend::partials.meta_tags')
	<link rel="stylesheet" href="{{ mix('css/profile.css') }}">
</head>
<body>
	<div id="app" class="py-5">
		<div class="container py-4 text-center">
			<div class="profile-image d-inline-block bg-white mb-2" style="background-image: url('{{ $user->profile_image }}')">
				@if(!$user->profile_image) <span>{{ $user->initials }}</span> @endif
			</div>
			<h1 class="font-heading h2">{{ $user->full_name }}</h1>
			
			<template v-cloak v-if="ready">
				<h6 v-if="services.length == 0" class="text-gray font-weight-light">No services available</h6>
				<div v-else class="row text-left mt-5">
					<div v-for="service in services" class="col-md-4">
						<div class="card border service shadow-sm cursor-pointer" @click="setService(service)">
							<div class="card-body">
								<h3 class="font-heading h5 mb-1">@{{ service.name }}</h3>
								<p class="mb-0">@{{ service.description }}</p>

								<div class="d-flex align-items-center mt-3">
									<clock-icon width="17" height="17" fill="#888"></clock-icon>
									<span class="ml-1 font-weight-light">@{{ service.duration }} minutes</span>
								</div>
								<div class="d-flex mt-2">
									<div v-for="day in days" class="badge-day mr-1 rounded-circle position-relative overflow-hidden" :class="[service.days[day].isOpen ? 'text-primary bg-gray-400' : 'text-gray-400 bg-gray-200']">
										<span class="position-absolute-center font-weight-light line-height-1">@{{ day.charAt(0) }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>

		<modal ref="serviceModal" @hidden="resetStep" v-cloak>
			<template v-if="selectedService">
				<h4 class="font-heading text-center mb-1">@{{ selectedService.name }}</h4>
				<h6 class="text-center text-gray mb-3 font-weight-light">@{{ selectedService.duration }} minutes</h6>

				<!-- Progress -->
				<div class="rounded py-1 mb-2 d-flex align-items-stretch justify-content-between position-relative" id="book-progress">
					<div class="book-step position-relative" :class="stepClass(1)">
						<div class="position-absolute-center w-100 h-100">
							<calendar-day-icon  width="16" height="16" class="position-absolute-center"></calendar-day-icon>
						</div>
					</div>
					<div class="book-step position-relative" :class="stepClass(2)">
						<div class="position-absolute-center w-100 h-100">
							<clock-icon  :fill="[step >= 2 ? 'white' : '#aaa']" width="18" height="18" class="position-absolute-center"></clock-icon>
						</div>
					</div>
					<div class="book-step position-relative" :class="stepClass(3)">
						<div class="position-absolute-center w-100 h-100">
							<info-circle-icon  :fill="[step >= 3 ? 'white' : '#aaa']" width="24" height="26" transform="scale(0.75)"></info-circle-icon>
						</div>
					</div>
					<!-- <div class="book-step position-relative" :class="stepClass(5)">
						<div class="position-absolute-center w-100 h-100">
							<checkmark-icon  :fill="[step == 4 ? 'white' : '#aaa']" width="25" height="26"></checkmark-icon>
						</div>
					</div> -->
				</div>

				<div class="mb-2">
					<div v-if="error" class="text-danger">@{{ error }}</div>
					<template v-else>
						<strong v-if="!selectedDate">Select Date</strong>
						<template v-else>
							<strong>@{{ formatDate(selectedDate) }}</strong>
							<span v-if="selectedTimeslot">@@{{ selectedTimeslot.label }}</span>
						</template>
					</template>
				</div>
				
				<!-- Steps -->
				<div id="steps-container" class="overflow-auto border rounded">
					<!-- Step 1 -->
					<div v-if="step == 1">
						<v-date-picker :select-attribute="selectAttribute" :disabled-dates="formattedHolidays" is-required class="v-calendar h-100 border-0" v-model="selectedDate" is-expanded is-inline :min-date="new Date()" title-position="left">
						</v-date-picker>
					</div>

					<!-- Step 2 -->
					<div v-else-if="step == 2" class="bg-light h-100 position-relative">
						<div v-if="(selectedService.timeslots || []).length == 0" class="position-absolute-center text-gray text-center">
							There are no timeslots available for the selected date
						</div>
						<div v-else class="d-flex flex-wrap pb-2 pr-2">
							<div v-for="timeslot in selectedService.timeslots" class="pt-2 pl-2 w-20">
								<div class="btn btn-white border btn-block btn-timeslot" :class="{'bg-primary text-white': timeslot == selectedTimeslot}" @click="selectedTimeslot = timeslot">@{{ timeslot.label }}</div>
							</div>
						</div>
					</div>

					<!-- Step 3 -->
					<div v-else-if="step == 3" class="p-3 position-relative h-100">
						<template v-if="reviewForm == 'details'">
							<h5 class="font-heading">Review your booking details</h5>
							<p class="mb-0">
								<span class="text-gray">Service:</span> <strong>@{{ selectedService.name }}</strong> <br/ >
								<span class="text-gray">Date:</span> <strong>@{{ formatDate(selectedDate) }}</strong> <br/ >
								<span class="text-gray">Time:</span> <strong>@{{ selectedTimeslot.label }}</strong> <br/ >
								<span class="text-gray">Duration:</span> <strong>@{{ selectedService.duration }} minutes</strong>
							</p>
							<div v-if="!auth" class="d-flex justify-content-between mt-5">
								<button class="btn btn-light btn-block btn-sm border mr-1" @click="reviewForm = 'login'">Log In</button>
								<button class="btn btn-light btn-block btn-sm border mt-0 ml-1" @click="reviewForm = 'register'">Register</button>
							</div>
						</template>

						<div v-else class="position-absolute-center w-100">
							<!-- Login -->
							<vue-form-validate v-if="reviewForm == 'login'" class="px-5 mx-4" @submit="login">
								<h5 class="font-heading">Log In</h5>
								<div class="form-group">
									<input type="email" v-model="loginForm.email" placeholder="Email" class="form-control" data-required>
								</div>
								<div class="form-group">
									<input type="password" v-model="loginForm.password" placeholder="Password" class="form-control" data-required>
								</div>
								<vue-button type="submit" :loading="loginForm.loading" button_class="btn btn-primary btn-block">Log In</vue-button>
								<div class="d-flex mt-1">
									<button type="button" class="btn btn-link btn-sm text-body" @click="reviewForm = 'details'">Cancel</button>
									<button type="button" class="btn btn-link btn-sm text-primary ml-auto" @click="reviewForm = 'register'"><u>Register</u></button>
								</div>
							</vue-form-validate>

							<div class="text-center text-danger position-absolute w-100">&nbsp;@{{ authError }}&nbsp;</div>
						</div>
					</div>

					<!-- Step 4 -->
					<div v-else-if="step == 4" class="p-3 position-absolute-center w-100 h-100 bg-white booking-loader">
						<div class="position-absolute-center text-center">
							<div class="spinner-border text-primary" role="status"></div>
							<div class="mt-3 h5">
								Please wait...
							</div>
						</div>
					</div>

					<!-- Step 5 -->
					<div v-else-if="step == 5" class="p-3 position-absolute-center w-100 h-100 bg-white booking-loader">
						<div class="position-absolute-center text-center w-100">
							<div class="mt-3">
								<div class="rounded-circle bg-primary checkmark-container position-relative d-inline-block">
									<checkmark-icon fill="white" class="position-absolute-center"></checkmark-icon>
								</div>
								<h3 class="mb-0 font-heading mt-3">Booked!</h3>
								<span class="text-gray font-weight-light d-block">Your booking has been processed succesfully.</span>
								<button class="btn btn-light border mt-5" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>

				<div class="d-flex p-2 mx-n3 mb-n3 mt-3 border-top bg-light">
					<button v-if="step > 1 && step < 4" class="btn btn-link text-body" @click="step--">Previous</button>
					<button class="btn btn-primary ml-auto" :disabled="nextDisabled" @click="nextStep">@{{ buttonText }}</button>
				</div>
			</template>
		</modal>
	</div>
	<script>
		const AUTH = {!! json_encode(Auth::user()) !!};
	</script>
	<script src="{{ mix('js/profile.js') }}" async defer></script>
</body>
</html>
