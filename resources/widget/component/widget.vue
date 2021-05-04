<template>
	<div v-if="ready" id="widget" v-cloak>
		<button id="button" class="fixed bottom-1 right-1 btn btn-primary items-center" :class="[open ? 'hidden' : 'flex']" type="button" @click="open = !open"><calendar-icon class="mr-1" fill="white" width="18" height="18"></calendar-icon><span class="text-white">Book</span></button>

		<transition name="fade">
			<div v-if="open">
				<div class="widget-body">
					<!-- Loading -->
					<div class="text-center absolute-center w-full h-full loader bg-white" v-if="isBooking">
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

					<template v-if="service">
						<!-- Select date/timeslot -->
						<div v-if="!step" class="timeslot-selector">
							<div>
								<div class="button-date-nav">
									<button type="button" @click="previousWeek()"><ArrowLeftIcon></ArrowLeftIcon></button>
									<span>{{ dayjs(startDate).format('MMMM D, YYYY') }}</span>
									<button type="button" @click="nextWeek()"><ArrowRightIcon></ArrowRightIcon></button>
								</div>
							</div>

							<div class="timeslots-container">
								<div>
									<table>
										<thead>
											<tr>
												<template v-for="(tabDate, index) in tabDates">
													<th v-if="service.days[tabDate.dayName].isOpen" :key="index">
														<div>{{ tabDate.name }}</div>
														<span>{{ tabDate.label }}</span>
													</th>
												</template>
											</tr>
										</thead>
										<tbody>
											<tr>
												<template v-for="(date, dateIndex) in tabDates">
													<td :key="dateIndex" v-if="service.days[date.dayName].isOpen">
														<template v-if="(timeslots[date.dayName] || []).length > 0">
															<div v-for="(timeslot, timeslotIndex) in timeslots[date.dayName]" :key="timeslotIndex" class="timeslot-container">
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
								<div v-if="timeslotsLoading" class="timeslot-loader">
									<div>
										<div class="widget-spinner" role="status"></div>
									</div>
								</div>
							</div>

							<button :disabled="selectedTimeslots.length == 0" class="widget-btn" type="button" @click="step = 'summary'">
								<span>Continue</span>
							</button>
						</div>

						<!-- Summary -->
						<div v-else-if="step == 'summary'" class="widget-summary">
							<div class="summary-heading">
								<h2>SET YOUR BOOKING DETAILS</h2>
								<button type="button" class="widget-btn-outline" @click="step = null"><ChevronLeftIcon></ChevronLeftIcon><span>Back</span></button>
							</div>
							<div class="summary-content">
								<vue-form-validate
									@submit="
										() => {
											step = service.require_payment ? 'payment' : 'authenticate';
										}
									"
								>
									<h3>{{ service.name }}</h3>
									<div class="summary-meta">
										<ClockIcon class="fill-current mr-2"></ClockIcon>
										{{ service.duration }} min &nbsp;&nbsp;&nbsp; Booking with {{ service.coach.full_name }}
									</div>

									<div v-for="(selectedTimeslot, selectedTimeslotIndex) in selectedTimeslots" :key="selectedTimeslotIndex" class="selected-time">
										<div class="selectime-time-details">
											<div>
												<h4>{{ dayjs(selectedTimeslot.date.format).format('MMMM D, YYYY') }} ({{ selectedTimeslot.date.dayName }})</h4>
												<div>{{ timezoneTime(selectedTimeslot.timeslot.time) }} - {{ endTime(selectedTimeslot.timeslot.time) }}</div>
												<button
													class="remove-timeslot"
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

											<!-- <div class="flex items-center">
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
											</div> -->
										</div>

										<div v-if="service.types.length > 0">
											<div v-for="(type, typeIndex) in service.types" :key="typeIndex" class="meeting-type" :class="{ selected: selectedTimeslot.type == type }" @click="setTypeSelected(selectedTimeslot, type)">
												<div>
													<div class="type-checkbox"><div class="absolute-center"></div></div>
												</div>
												<div class="px-3 text-sm text-muted -mt-1 flex-grow">
													<div>
														{{ type.type }}
													</div>
													<span class="text-black font-bold" v-if="type.type == 'Face-to-face'">{{ type.data }}</span>
													<div class="mt-1" v-else-if="type.type == 'Phone'">
														<input type="tel" :disabled="selectedTimeslot.type != type" :data-required="selectedTimeslot.type == type" class="w-2/3" v-model="phone" />
													</div>
													<div class="mt-1" v-else-if="type.type == 'Skype'">
														<input type="tel" :disabled="selectedTimeslot.type != type" :data-required="selectedTimeslot.type == type" class="w-2/3" v-model="skype" placeholder="Add your Skype ID" />
													</div>

													<span v-else-if="type.type == 'Telloe Video Call'">
														A conversation will be created for the video call.
													</span>
													<span v-else>{{ type.type }} meeting will be created after the booking is placed.</span>
												</div>
												<div class="meeting-type-icon">
													<ZoomIcon v-if="type.type == 'Zoom'"></ZoomIcon>
													<GoogleMeetIcon v-else-if="type.type == 'Google Meet'"></GoogleMeetIcon>
													<MapMarkerIcon v-else-if="type.type == 'Face-to-face'" class="fill-current text-primary"></MapMarkerIcon>
													<PhoneIcon v-else-if="type.type == 'Phone'" class="fill-primary"></PhoneIcon>
													<SkypeIcon v-else-if="type.type == 'Skype'" class="fill-primary"></SkypeIcon>
												</div>
											</div>
										</div>
									</div>

									<button :disabled="selectedTimeslots.length == 0" class="mt-8 btn btn-primary" type="submit">
										<span>Continue <span v-if="service.require_payment">to payment</span></span>
									</button>
								</vue-form-validate>
							</div>
						</div>
					</template>
				</div>
				<div class="text-center widget-footer d-flex align-items-center justify-content-center">
					<span class="text-gray-500">Powered by</span>&nbsp;<a :href="$root.endpoint" target="_blank" class="font-weight-bold d-inline-flex align-items-center"><img :src="`${$root.endpoint}/logo.svg`" height="13"/></a>
				</div>
			</div>
		</transition>
	</div>
</template>

<script src="./widget.js"></script>
<style scoped lang="scss" src="./widget.scss"></style>
