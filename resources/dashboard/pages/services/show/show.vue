<template>
	<div class="h-100" v-if="service">
		<div class="active-service" :class="{ show: service.is_available }"></div>
		<div class="d-flex h-100 overflow-hidden">
			<div class="p-4 flex-grow-1 overflow-auto">
				<div class="d-flex justify-content-between mb-5">
					<div>
						<button class="btn p-1 btn-white badge-pill shadow-sm" type="button" @click="$router.go(-1)">
							<arrow-left-icon width="30" height="30"></arrow-left-icon>
						</button>
					</div>

					<div class="text-center mt-5">
						<h1 class="font-heading h3 mb-1">{{ service.name }}</h1>
						<p class="mb-0 px-5">{{ service.description }}</p>
					</div>

					<div class="dropdown">
						<button :data-intro="$root.intros.services_show.steps[3]" data-step="4" class="btn p-2 btn-white badge-pill shadow-sm" data-toggle="dropdown" data-offset="-125, 5">
							<more-icon width="20" height="20" transform="scale(0.75)"></more-icon>
						</button>
						<div class="dropdown-menu">
							<div class="d-flex align-items-center px-2 py-1">
								<span>Available</span>
								<toggle-switch class="ml-auto" @click.native.stop @input="updateService(service)" active-class="bg-primary" v-model="service.is_available"></toggle-switch>
							</div>
							<span
								class="dropdown-item cursor-pointer"
								@click="
									clonedService = JSON.parse(JSON.stringify(service));
									$refs['editModal'].show();
								"
							>
								Edit
							</span>
							<span class="dropdown-item cursor-pointerr" @click="$refs['deleteModal'].show()">Delete</span>
						</div>
					</div>
				</div>

				<div class="text-right">
					<div :data-intro="$root.intros.services_show.steps[2]" data-step="3" class="bg-white rounded shadow-sm d-inline-flex align-items-center">
						<button class="btn btn-sm btn-white p-1" type="button" @click="previousWeek()">
							<chevron-left-icon height="25" width="25" transform="scale(1.4)"></chevron-left-icon>
						</button>
						<v-date-picker class="relative" :popover="{ placement: 'bottom', visibility: 'click' }" :masks="masks" v-model="startDate">
							<template v-slot="{ inputValue, inputEvents }">
								<button type="button" class="btn btn-white px-1 shadow-none rounded-0" v-on="inputEvents">{{ inputValue }}</button>
							</template>
						</v-date-picker>
						<button class="btn btn-sm btn-white p-1" type="button" @click="nextWeek()">
							<chevron-right-icon height="25" width="25" transform="scale(1.4)"></chevron-right-icon>
						</button>
					</div>
				</div>

				<div class="pt-3 d-flex">
					<div class="text-center position-relative">
						<div class="position-relative coaches-container">
							<div class="active-user position-absolute w-100" :style="{ top: `${activeUserBgPosition}px` }"></div>
							<!-- Main Coach -->
							<div
								class="pl-2 py-2 pr-3 ml-1 cursor-pointer rounded position-relative user-container"
								:class="{ active: selectedCoachId == $root.auth.id }"
								@click="
									selectedCoachId = $root.auth.id;
									selectedService = service;
								"
							>
								<div class="d-flex align-items-center p-1">
									<div class="profile-image profile-image-sm" :style="{ 'background-image': `url(${$root.auth.profile_image})` }">
										<span v-if="!$root.auth.profile_image">{{ $root.auth.initials }}</span>
									</div>
									<div class="flex-1 text-left pl-2">
										<h6 class="font-heading text-nowrap mb-0">
											{{ $root.auth.full_name }}
										</h6>
										<small class="text-secondary">{{ $root.auth.timezone }}</small>
									</div>
								</div>
							</div>

							<!-- Assigned Coaches -->
							<div v-for="(assignedService, index) in service.assigned_services" class="position-relative user-container cursor-pointer" :class="{ active: selectedCoachId == assignedService.coach.id }" :key="assignedService.id">
								<div class="d-flex member-container align-items-center py-1 pl-1" :data-intro="index == 0 ? $root.intros.services_show.steps[0] : null" :data-step="index == 0 ? 1 : null">
									<div
										class="d-flex align-items-center py-2 pl-2"
										@click="
											selectedService = assignedService;
											selectedCoachId = assignedService.coach.id;
										"
									>
										<div class="profile-image profile-image-sm cursor-pointer" :style="{ 'background-image': `url(${assignedService.coach.profile_image})` }">
											<span v-if="!assignedService.coach.profile_image">{{ assignedService.coach.initials }}</span>
										</div>
										<div class="flex-1 text-left pl-2">
											<h6 class="font-heading text-nowrap mb-0">
												{{ assignedService.coach.full_name }}
											</h6>
											<small class="text-secondary">{{ assignedService.coach.timezone }}</small>
										</div>
									</div>

									<div class="dropdown ml-auto mr-1 member-dropdown">
										<button class="btn btn-white line-height-0 p-1 badge-pill shadow-none" data-toggle="dropdown" data-offset="-140, 0">
											<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray"></more-icon>
										</button>
										<div class="dropdown-menu">
											<router-link class="dropdown-item cursor-pointer" tag="span" :to="`/dashboard/team/members/${assignedService.member_id}`"> View Member </router-link>
											<span class="dropdown-item cursor-pointer" @click="removeAssignedService(assignedService, index)"> Remove </span>
										</div>
									</div>
								</div>
							</div>

							<div class="pr-2 mr-1 mt-3" v-if="activeMembers.length > 0">
								<div class="dropdown">
									<div :data-intro="$root.intros.services_show.steps[1]" data-step="2" class="rounded py-2 border bg-white cursor-pointer add-member d-flex align-items-center justify-content-center text-muted" data-toggle="dropdown">
										<plus-icon class="fill-gray" transform="scale(0.9)"></plus-icon>
										Add Member
									</div>
									<div class="dropdown-menu dropdown-menu-right w-100">
										<template v-for="member in activeMembers">
											<div class="dropdown-item d-flex align-items-center cursor-pointer px-1" :key="member.id" :class="{ disabled: service.assigned_services.find(x => x.member_id == member.id) }" @click="addMember(member)">
												<div class="d-flex align-items-center">
													<div class="profile-image profile-image-xs cursor-pointer" :style="{ 'background-image': `url(${member.member_user.profile_image})` }">
														<span v-if="!member.member_user.profile_image">{{ member.member_user.initials }}</span>
													</div>
													<span class="font-heading ml-1">{{ member.member_user.full_name }}</span>
												</div>
											</div>
										</template>
									</div>
								</div>
							</div>
						</div>
					</div>

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
										<template v-if="service && timeslots && (timeslots[date.dayName] || []).length > 0">
											<div v-for="(timeslot, timeslotIndex) in sortedTimeslots(timeslots[date.dayName])" :key="timeslotIndex">
												<div :key="dateIndex" class="py-2 position-relative rounded my-2 timeslot-button justify-content-center" :class="[timeslot.is_available ? 'bg-primary text-white' : 'disabled bg-gray-400', { 'cursor-pointer': (timeslot.bookings || []).length > 0 }]" @click="viewTimeslotBookings(timeslot, date.dayName, timeslotIndex)">
													<span class="text-nowrap">{{ convertTime(timeslot.time, 'hh:mmA') }}</span>
													<div v-if="(timeslot.bookings || []).length > 0">
														<div class="profile-image bg-white profile-image-xxs d-inline-block mt-2" :style="{ 'background-image': `url(${(timeslot.bookings[0].user || timeslot.bookings[0].contact).profile_image})` }">
															<span v-if="!(timeslot.bookings[0].user || timeslot.bookings[0].contact).profile_image">{{ (timeslot.bookings[0].user || timeslot.bookings[0].contact).initials }}</span>
														</div>
													</div>
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

		<edit-booking ref="bookingModal" :booking="selectedBooking" @update="getTimeslots"></edit-booking>

		<modal ref="deleteBookingModal" :close-button="false">
			<template v-if="selectedTimeslot">
				<h5 class="font-heading text-center">Delete Booking</h5>
				<p class="text-center mt-3">Are you sure to delete this booking?</p>
				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" @click="$refs['bookingModal'].show()" data-dismiss="modal">Cancel</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							deleteBooking(selectedTimeslot.bookings[0]).then(() => getTimeslots());
							$refs['deleteBookingModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>

		<modal ref="applyBreaktimeToAllModal" :close-button="false">
			<template v-if="service && selectedDay">
				<h5 class="font-heading text-center">Apply to all days</h5>
				<p class="mt-3">
					This will override the breaktimes of all days for the selected service.
					<br />
					Are you sure to apply the selected breaktimes to all days?
					<br />
				</p>
				<div class="d-flex">
					<button class="btn btn-white border" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-primary ml-auto" type="button" @click="applyBreaktimeToAll()">Apply</button>
				</div>
			</template>
		</modal>

		<modal ref="editModal" :close-button="false" size="modal-xl">
			<vue-form-validate @submit="update" v-if="clonedService">
				<div class="row mx-0 mb-2">
					<div class="col-md-5 px-0">
						<h5 class="font-heading mb-3">Details</h5>
						<fieldset :disabled="clonedService.parent_service_id" class="pr-3">
							<div class="form-group">
								<label class="form-label">Service name</label>
								<input type="text" class="form-control" v-model="clonedService.name" data-required />
							</div>
							<div class="form-group">
								<label class="form-label">Description</label>
								<textarea class="form-control resize-none" v-model="clonedService.description" data-required rows="3"></textarea>
							</div>
							<div class="form-group">
								<label class="form-label">Duration (in minutes)</label>
								<input type="number" class="form-control" v-model="clonedService.duration" data-required />
							</div>
							<div class="form-group">
								<label class="form-label">Interval (in minutes)</label>
								<input type="number" onkeydown="if(event.key==='.'){event.preventDefault();}" class="form-control" v-model="clonedService.interval" placeholder="Defaults to 15 mins" />
							</div>
							<div class="form-group d-flex align-items-center">
								<div class="flex-grow-1 pr-2">
									<label class="form-label">Default Rate</label>
									<input type="number" step="0.01" class="form-control" v-model="clonedService.default_rate" placeholder="$0.00" />
								</div>
								<div class="flex-grow-1 pl-2">
									<label class="form-label">Currency</label>
									<vue-select v-model="clonedService.currency" button_class="form-control" :options="currencies" data-required placeholder="Select currency"></vue-select>
								</div>
							</div>
							<div class="form-group">
								<label class="form-label">Address</label>
								<input type="text" class="form-control" v-model="clonedService.address" placeholder="Address" />
							</div>
						</fieldset>
					</div>

					<div class="col-md-4 border-left border-gray-200">
						<h5 class="font-heading mb-3">Availability</h5>
						<div class="d-flex mb-2 rounded overflow-hidden">
							<button class="btn position-relative w-50 rounded-0 py-3" :class="[serviceDetailsTab == 'availability' ? 'btn-primary' : 'btn-light']" @click="serviceDetailsTab = 'availability'" type="button">Availability</button>
							<button class="btn btn-tab position-relative w-50 rounded-0 py-3" :class="[serviceDetailsTab == 'holidays' ? 'btn-primary' : 'btn-light']" @click="serviceDetailsTab = 'holidays'" type="button">Holidays</button>
						</div>

						<div v-if="serviceDetailsTab == 'availability'" id="service-days">
							<div v-for="(day, index) in days" :key="index" class="service-day py-2">
								<div class="service-day-heading py-2 d-flex align-items-center cursor-pointer" data-toggle="collapse" :data-target="`#day-${day}`">
									<toggle-switch class="mr-2" active-class="bg-primary" @click.native.stop v-model="clonedService.days[day].isOpen"></toggle-switch>
									<div class="h6 mb-0">{{ day.toUpperCase() }}</div>
									<chevron-down-icon class="ml-auto chevron-down"></chevron-down-icon>
								</div>
								<div class="collapse" data-parent="#service-days" :id="`day-${day}`">
									<div class="p-2 bg-light rounded">
										<div v-if="newBreaktime">
											<label class="mb-1 text-gray">Available Time</label>
											<timerangepicker @update="updateAvailableHours($event, day)" :start="clonedService.days[day].start" :end="clonedService.days[day].end"></timerangepicker>

											<label class="mb-1 mt-3 text-gray">Break Times</label>
											<div class="d-flex align-items-center mb-1" v-for="(breaktime, index) in clonedService.days[day].breaktimes" :key="index">
												<timerangepicker @update="updateBreaktime($event, index, day)" :start="breaktime.start" :end="breaktime.end" class="flex-grow-1"></timerangepicker>
												<trash-icon class="ml-auto cursor-pointer" width="20" height="20" fill="red" @click.native="removeBreaktime(index, day)"></trash-icon>
											</div>
											<div class="d-flex align-items-center">
												<timerangepicker :start="newBreaktime.start" :end="newBreaktime.end" @update="updateNewBreaktime($event, day)" class="flex-grow-1"></timerangepicker>
												<trash-icon class="ml-auto cursor-pointer opacity-0" width="20" height="20" fill="red"></trash-icon>
											</div>

											<!-- <div class="mt-2 d-flex align-items-center">
												<button type="button" class="btn btn-primary btn-sm" :disabled="newBreaktime && (!newBreaktime.start || !newBreaktime.end)" @click="newBreaktime = {}">
													+ Add breaktime
												</button>
												<button
													v-if="(clonedService.days[day].breaktimes || []).length > 0"
													type="button"
													class="btn btn-white border btn-sm ml-auto"
													@click="
														selectedDay = day;
														$refs['applyBreaktimeToAllModal'].show();
													"
												>
													Apply to all days
												</button>
											</div> -->
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-else-if="serviceDetailsTab == 'holidays'" class="mt-3 position-relative">
							<div class="dropright">
								<button type="button" class="btn btn-light shadow-none mb-2 d-flex align-items-center" data-toggle="dropdown"><plus-icon class="btn-icon"></plus-icon> Add Holidays</button>
								<div class="dropdown-menu p-0">
									<v-date-picker @click.native.stop :disabled-dates="formattedHolidays" :value="null" :min-date="new Date()" class="border-0">
										<template slot="day-content" slot-scope="{ day }">
											<div class="custom-day-content" :class="{ 'is-disabled': day.isDisabled, active: newHoliday.dates.find(x => dayjs(x).format('YYYY-MM-DD') == day.id) }">
												<div class="vc-highlights vc-day-layer">
													<div class="vc-day-layer vc-day-box-center-center"><div class="vc-highlight bg-primary rounded-circle"></div></div>
												</div>
												<span class="vc-day-content vc-focusable" :class="{ 'is-disabled': day.isDisabled }" @click="addHolidayDate(day.id)">
													{{ day.label }}
												</span>
											</div>
										</template>
									</v-date-picker>
									<div class="d-flex px-2 pb-2">
										<button class="btn btn-light shadow-none" type="button">Cancel</button>
										<button class="ml-auto btn btn-primary shadow-none" type="button" @click="addHolidays">Add</button>
									</div>
								</div>
							</div>

							<div>
								<div v-for="(holiday, index) in clonedService.holidays" :key="index" class="border-bottom py-2 d-flex">
									{{ formatDate(holiday) }}
									<trash-icon class="ml-auto cursor-pointer" width="20" height="20" fill="red" @click.native="removeHoliday(index)"></trash-icon>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-3 border-left border-gray-200 px-0">
						<div class="pl-3">
							<h5 class="font-heading mb-3">Settings</h5>
							<div class="form-group">
								<vue-checkbox v-model="clonedService.in_widget" label="Available in widget"></vue-checkbox>
							</div>
							<div class="form-group">
								<vue-checkbox v-model="clonedService.ask_skype" label="Ask for Skype ID in booking"></vue-checkbox>
								<div class="pl-3 ml-1 mt-2">
									<vue-checkbox :disabled="!clonedService.ask_skype" v-model="clonedService.require_skype" label="Required"></vue-checkbox>
								</div>
							</div>
							<div class="form-group">
								<vue-checkbox v-model="clonedService.ask_phone" label="Ask for phone number in booking"></vue-checkbox>
								<div class="pl-3 ml-1 mt-2">
									<vue-checkbox :disabled="!clonedService.ask_phone" v-model="clonedService.require_phone" label="Required"></vue-checkbox>
								</div>
							</div>
							<div class="form-group d-flex align-items-center">
								<vue-checkbox :disabled="!$root.auth.zoom_token" v-model="clonedService.create_zoom_link" label="Create Zoom link on booking"></vue-checkbox>
								<span v-tooltip.top="'Requires Zoom integration'" class="badge badge-pill badge-dark ml-1 badge-tooltip"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex align-items-center">
					<button class="btn btn-light shadow-none mr-1" type="button" data-dismiss="modal">Cancel</button>
					<button class="ml-auto btn btn-primary" type="submit">Update</button>
				</div>
			</vue-form-validate>
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="service">
				<h5 class="font-heading text-center">Delete Service</h5>
				<p class="text-center mt-3">
					Are you sure to delete the service
					<strong>{{ service.name }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">Cancel</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							deleteService(service).then(() => $router.push('/dashboard/bookings/services'));
							$refs['deleteModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
