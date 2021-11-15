<template>
	<div v-if="booking && selectedService">
		<div v-show="open" id="edit" class="position-fixed w-100 h-100 p-4 overflow-auto" :class="`opacity-${opacity}`">
			<div class="rounded p-4 w-100 h-10x0 bg-light position-relative">
				<button type="button" class="btn btn-light shadow-none p-1 badge-pill btn-close" @click="hide()">
					<close-icon width="30" height="30" transform="scale(1.2)"></close-icon>
				</button>

				<div class="container selected-service-container" key="service">
					<div class="mb-5 text-left">
						<h4 class="mb-1 h3 font-heading">{{ selectedService.name }}</h4>
						<p class="mb-0 service-description">{{ selectedService.description }}</p>
						<p v-if="selectedService.address" class="mb-0 d-flex align-items-center text-muted">
							<map-marker-icon height="18" width="18" class="fill-primary"></map-marker-icon>
							{{ selectedService.address }}
						</p>
					</div>
					<template v-if="isPrevious">
						<div class="text-muted">This past booking cannot be edited anymore.</div>
					</template>
					<template v-else>
						<div class="d-flex align-items-center pt-3">
							<div class="d-flex align-items-center">
								<div class="bg-white rounded shadow-sm d-flex align-items-center">
									<button class="btn btn-sm btn-white p-1" type="button" @click="previousWeek()">
										<chevron-left-icon height="25" width="25" transform="scale(1.4)"></chevron-left-icon>
									</button>
									<v-date-picker class="relative" :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate" :masks="masks" @input="getServiceTimeslots(false)">
										<template v-slot="{ inputValue, inputEvents }">
											<button type="button" class="btn btn-white px-1 shadow-none rounded-0" v-on="inputEvents">{{ inputValue }}</button>
										</template>
									</v-date-picker>
									<button class="btn btn-sm btn-white p-1" type="button" @click="nextWeek()">
										<chevron-right-icon height="25" width="25" transform="scale(1.4)"></chevron-right-icon>
									</button>
								</div>
							</div>

							<template v-if="continueButton">
								<div class="ml-auto" :class="{ 'hide-tooltip': selectedTimeslot }" v-tooltip.left="'Select at least one (1) timeslot'">
									<button class="btn btn-primary shadow-sm" type="button" @click="confirmUpdateBooking()">Update</button>
								</div>
							</template>
						</div>
					</template>

					<div class="text-left">
						<!-- Date/time selection -->
						<div class="pt-3 d-flex">
							<div class="text-center position-relative">
								<!-- Main Coach -->
								<div class="active-user position-absolute w-100" :style="{ top: `${activeUserBgPosition}px` }"></div>
								<div
									class="pl-2 py-2 pr-3 ml-1 cursor-pointer rounded position-relative user-container"
									:class="{ active: selectedCoachId == booking.service.coach.id }"
									@click="
										selectedCoachId = booking.service.coach.id;
										selectedService = booking.service;
									"
								>
									<div class="d-flex align-items-center p-1">
										<div class="profile-image profile-image-xs" :style="{ 'background-image': `url(${this.$root.auth.profile_image})` }">
											<span v-if="!this.$root.auth.profile_image">{{ this.$root.auth.initials }}</span>
										</div>
										<div class="flex-1 text-left pl-2">
											<h6 class="font-heading text-nowrap mb-0">
												{{ this.$root.auth.full_name }}
											</h6>
											<small class="text-secondary">{{ this.$root.auth.timezone }}</small>
										</div>
									</div>
								</div>

								<!-- Assigned Coaches -->
								<div v-for="assignedService in assignedServices" class="pl-2 py-2 pr-3 mc-3 ml-1 rounded position-relative user-container cursor-pointer" :class="{ active: selectedCoachId == assignedService.coach.id }" :key="assignedService.id" @click="setSelectedService(assignedService)">
									<div class="d-flex align-items-center p-1">
										<div class="profile-image profile-image-xs cursor-pointer" :style="{ 'background-image': `url(${assignedService.coach.profile_image})` }">
											<span v-if="!assignedService.coach.profile_image">{{ assignedService.coach.initials }}</span>
										</div>
										<div class="flex-1 text-left pl-2">
											<h6 class="font-heading text-nowrap mb-0">
												{{ assignedService.coach.full_name }}
											</h6>
											<small class="text-secondary">{{ assignedService.coach.timezone }}</small>
										</div>
									</div>
								</div>
							</div>

							<div class="pb-4 d-flex">
								<div class="p-3 flex-grow-1 bg-white timeslots-wrapper shadow-sm position-relative rounded">
									<table class="table table-sm table-borderless mb-0 table-layout-fixed" :class="{ 'opacity-0': timeslotsLoading }">
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
															<div v-tooltip.top="timezoneTooltip(selectedService.coach.timezone, timeslot)" :key="dateIndex" class="py-2 position-relative rounded my-2 timeslot-button" :class="timeslotClass(timeslot, date)" @click="setSelectedDateAndTimeslot(date, timeslot)">
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
				</div>
			</div>
		</div>

		<modal ref="bookingModal" id="bookingModal" :close-button="false">
			<div class="text-center position-relative h-100 py-4">
				<div class="spinner-border text-primary" role="status"></div>
				<h6 class="h3 mt-4 mb-0 font-heading">Updating...</h6>
			</div>
		</modal>
	</div>
</template>

<script src="./edit.js"></script>

<style lang="scss" scoped src="./edit.scss"></style>
