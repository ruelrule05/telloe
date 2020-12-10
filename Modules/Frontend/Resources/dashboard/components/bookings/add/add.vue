<template>
	<div v-show="open" id="add" class="position-fixed w-100 h-100 bg-light px-3 py-5" :class="`opacity-${opacity}`">
		<button type="button" class="btn btn-light shadow-none p-1 badge-pill btn-close" @click="hide()">
			<close-icon width="30" height="30" transform="scale(1.2)"></close-icon>
		</button>

		<!-- Select service -->
		<template v-if="!selectedService">
			<h2 class="font-heading text-center">Available Services</h2>
			<div class="container mt-5">
				<div class="row justify-content-center">
					<div v-for="service in services" :key="service.id" class="col-md-5">
						<div class="card rounded service cursor-pointer mb-3 shadow-sm" @click="selectedService = service">
							<div class="card-body">
								<div class="d-flex align-items-center mb-3">
									<div class="user-profile-image d-inline-block bg-white mb-1" :style="{ 'background-image': `url(${service.user.profile_image})` }">
										<span v-if="!service.user.profile_image">{{ service.user.initials }}</span>
									</div>
									<div class="pl-1">
										<h6 class="font-heading mb-0">{{ service.user.full_name }}</h6>
										<span class="text-muted">@{{ service.user.username }}</span>
									</div>
								</div>
								<h3 class="font-heading h5 mb-1">{{ service.name }}</h3>
								<p class="mb-0 text-ellipsis text-muted">{{ service.description }}</p>
								<div class="d-flex align-items-center mt-4 line-height-1">
									<div class="d-flex align-items-center">
										<clock-icon width="11" height="11" transform="scale(1.5)" fill="#6c757d"></clock-icon>
										<small class="text-muted ml-1">{{ service.duration }} min</small>
									</div>
									<div class="d-flex align-items-center ml-3" v-if="parseInt(service.default_rate)">
										<small>
											{{ service.currency }}
											<span class="text-muted">{{ service.default_rate }}</span>
										</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- Select coach/date/time -->
		<div v-else-if="selectedService && (!startDate || !selectedTimeslot)" class="container selected-service-container" key="service">
			<div class="mb-5 text-left">
				<button class="btn line-height-0 p-0 close float-none mb-3 ml-n1" type="button" @click="reset()">
					<arrow-left-icon width="30" height="30" transform="scale(1.2)"></arrow-left-icon>
				</button>

				<h4 class="mb-1 h3 font-heading">{{ selectedService.name }}</h4>
				<p class="mb-0 service-description">{{ selectedService.description }}</p>
				<p v-if="selectedService.address" class="mb-0 d-flex align-items-center text-muted">
					<map-marker-icon height="18" width="18" class="fill-primary"></map-marker-icon>
					{{ selectedService.address }}
				</p>
			</div>

			<div class="d-flex align-items-center pt-3">
				<div class="d-flex align-items-center">
					<div class="bg-white rounded shadow-sm d-flex align-items-center">
						<button class="btn btn-sm btn-white p-1" type="button" @click="previousWeek()">
							<chevron-left-icon height="25" width="25" transform="scale(1.4)"></chevron-left-icon>
						</button>
						<v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate" :masks="masks">
							<template v-slot="{ inputValue, inputEvents }">
								<button type="button" class="btn btn-white px-1 shadow-none rounded-0" v-on="inputEvents">{{ inputValue }}</button>
							</template>
						</v-date-picker>
						<button class="btn btn-sm btn-white p-1" type="button" @click="nextWeek()">
							<chevron-right-icon height="25" width="25" transform="scale(1.4)"></chevron-right-icon>
						</button>
					</div>
					<div v-if="selectedTimeslots.length == 0" class="ml-3 text-muted">Select at least one (1) timeslot</div>
				</div>

				<div class="ml-auto" :class="{ 'hide-tooltip': selectedTimeslots.length > 0 }" v-tooltip.left="'Select at least one (1) timeslot'">
					<button class="btn" :class="[selectedTimeslots.length == 0 ? 'disabled' : 'btn-white shadow-sm']" type="button" @click="summary()">
						Continue
					</button>
				</div>
			</div>

			<div class="text-left">
				<!-- Date/time selection -->
				<div class="pt-3 pb-4 d-flex">
					<div class="p-3 flex-grow-1 bg-white timeslots-wrapper shadow-sm position-relative rounded">
						<table class="table table-sm table-borderless mb-0 table-layout-fixed">
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
												<div v-tooltip.top="timezoneTooltip(selectedService.user.timezone, timeslot)" :key="dateIndex" class="py-2 position-relative rounded my-2 timeslot-button" :class="[timeslot.is_available ? 'cursor-pointer bg-primary text-white' : 'disabled bg-gray-400 pointer-events-none']" @click="setSelectedDateAndTimeslot(date, timeslot)">
													<span class="selected-checkmark position-absolute">
														<checkmark-icon v-if="selectedTimeslots.find(x => x.date.dayName == date.dayName && x.timeslot.time == timeslot.time)" height="30" width="30" class="fill-green"></checkmark-icon>
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
</template>

<script src="./add.js"></script>

<style lang="scss" src="./add.scss"></style>
