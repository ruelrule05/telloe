<template>
    <div>
        <div class="text-center h-100 w-100 overflow-auto" v-if="ready">
			<transition-group name="fade" tag="div">
				<div class="container" v-if="!selectedService" key="services">
					<div class="row justify-content-center">
						<div class="col-md-10 col-container">
							<div class="bg-white shadow-sm rounded p-md-4 py-5 h-100 w-100">
								<div class="profile-image d-inline-block bg-white mb-2" :style="{'background-image': `url(${$root.profile.profile_image})`}">
									<span v-if="!$root.profile.profile_image">{{ $root.profile.initials }}</span>
								</div>
								<h1 class="font-heading h3">{{ $root.profile.full_name }}</h1>

								<div v-if="packages.length > 0" class="text-left mt-5 mb-n4 px-4">
									<button class="btn px-4 py-3 rounded-0" :class="[tab == 'services' ? 'btn-primary' : 'btn-white border-bottom']" type="button" @click="tab = 'services'">SERVICES</button>
									<button class="btn px-4 py-3 rounded-0 ml-2" type="button"  :class="[tab == 'packages' ? 'btn-primary' : 'btn-white border-bottom']" @click="tab = 'packages'">PACKAGES</button>
								</div>	
								
								<template v-cloak>
									<!-- Services -->
									<template v-if="tab == 'services'">
										<h6 v-if="services.length == 0" class="text-gray font-weight-light">No services available</h6>
										<div v-else class="row text-left mt-5 mx-0">
											<div v-for="service in services" :key="service.id" class="col-md-6">
												<div class="card rounded service cursor-pointer mb-3 border" @click="selectedService = service">
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

				<div class="position-absolute-center container selected-service-container" v-else key="service">
					<div class="row justify-content-center h-100">
						<div class="col-md-12 col-container h-100">


							<div class="d-flex align-items-center mb-3">
								<div class="d-flex align-items-center">
									<button class="btn line-height-0 p-0 close float-none" type="button" @click="selectedService = assignedService = null"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
									<h4 class="mb-0 font-heading ml-2">{{ selectedService.name }}</h4>
								</div>
								
								<div class="ml-auto">
									<button type="button" class="btn btn-white badge-pill line-height-0 p-1 shadow-sm" @click="decDate()"><chevron-left-icon width="24" height="24" class="fill-secondary" transform="scale(1.5)"></chevron-left-icon></button>
									<v-date-picker :min-date="new Date()" :popover="{placement: 'bottom', visibility: 'click' }" v-model="selectedDate" class="mx-1">
										<button class="btn btn-white shadow-sm" :class="{'text-gray': !selectedDate}">{{ selectedDate ? formatDate(selectedDate) : 'Set date' }}</button>
									</v-date-picker>
									<button type="button" class="btn btn-white badge-pill line-height-0 p-1 shadow-sm" @click="incDate()"><chevron-right-icon width="24" height="24" class="fill-secondary" transform="scale(1.5)"></chevron-right-icon></button>
								</div>
							</div>
							<div class="bg-white shadow-sm rounded selected-service text-left">

                                <!-- Select coach -->
								<!-- <template v-if="(selectedService.assigned_services || []).length == 0 && !assignedService">
									<div class="w-100 pb-4">
                                        <div class="ml-3 mt-3 w-100 text-left">
                                            <button class="btn p-0 close float-none line-height-0 mr-3" type="button" @click="selectedService = null"><arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon></button>
                                        </div>
                                        <div class="mt-n4">
                                            <h1 class="h2 font-heading mb-1">{{ selectedService.name }}</h1>
                                            <div class="h4 font-weight-light text-secondary mb-3">Choose your coach</div>
                                            <div class="p-3 row justify-content-center">
                                                <div v-for="assignedServiceSelect in selectedService.assigned_services" :key="assignedServiceSelect.id" class="col-md-4">
                                                    <div class="shadow-sm rounded bg-light py-4">
                                                        <div class="profile-image profile-image-md d-inline-block bg-white mb-2" :style="{'background-image': `url(${assignedServiceSelect.member.member_user.profile_image})`}">
                                                            <span v-if="!assignedServiceSelect.member.member_user.profile_image">{{ assignedServiceSelect.member.member_user.initials }}</span>
                                                        </div>
                                                        <h2 class="font-heading h5 mb-3">{{ assignedServiceSelect.member.member_user.full_name }}</h2>
                                                        <button class="btn btn-white shadow-sm" type="button" @click="assignedService = assignedServiceSelect">Choose</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
									</div>
								</template> -->
                                

								<!-- Date/time selection -->
								<div xv-else class="pl-3 py-4">
									<div class="d-flex align-items-center">
										<div class="coach-container pt-4">
											<div class="coach text-center">
												<div class="profile-image profile-image-xs bg-white" :style="{'background-image': `url(${$root.profile.profile_image})`}">
													<span v-if="!$root.profile.profile_image">{{ $root.profile.initials }}</span>
												</div>
											</div>
										</div>
										
										<div class="flex-grow-1 ml-3 mr-4">
											<h6 class="font-heading">{{ $root.profile.full_name }}</h6>
											<div class="bg-light rounded position-relative timeline-container">
												<div class="timeline d-flex text-center overflow-auto timeslots-container">
													<div v-for="(timeslot, index) in timeslots" :key="index" class="timeslot flex-1 border-right pt-2">
														<div class="small mb-1 text-secondary">{{ convertTime(timeslot, 'h:mmA') }}</div>
														<div class="position-relative px-1 pb-1" v-html="availableTimeslot(selectedService, timeslot)"></div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div v-for="assignedService in selectedService.assigned_services" class="d-flex align-items-center mt-4" :key="assignedService.id">
										<div class="coach-container pt-4">
											<div class="coach text-center">
												<div class="profile-image profile-image-xs bg-white" :style="{'background-image': `url(${assignedService.user.profile_image})`}">
													<span v-if="!assignedService.user.profile_image">{{ assignedService.user.initials }}</span>
												</div>
											</div>
										</div>

										<div class="flex-grow-1 ml-3 mr-4">
											<h6 class="font-heading">{{ assignedService.user.full_name }}</h6>
											<div class="bg-light rounded position-relative timeline-container">
												<div class="timeline d-flex text-center overflow-auto timeslots-container">
													<div v-for="(timeslot, index) in timeslots" :key="index" class="timeslot flex-1 border-right pt-2">
														<div class="small mb-1 text-secondary">{{ convertTime(timeslot, 'h:mmA') }}</div>
														<div class="position-relative px-1 pb-1" v-html="availableTimeslot(assignedService, timeslot)"></div>
													</div>
												</div>
											</div>
										</div>
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