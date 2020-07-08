<template>
	<div class="row h-100 p-4">
		<div v-if="ready" class="col-md-12 h-100">
			<div v-if="services.length == 0" class="py-5 text-center bg-white rounded shadow-sm p-2">
				<h6 class="text-grayer mb-3">You don't have any services added yet</h6>
				<button class="btn btn-primary" @click="selectedService = null; newService = {}; $refs['modal'].show()">Add Service</button>
			</div>

			<div v-else class="row h-100">
				<div class="col-md-8">
					<div class="row">
						<div class="col-md-6">
							<div class="pb-4 h-100">
								<div class="service-add mb-x rounded p-3 cursor-pointer h-100 position-relative" @click="selectedService = null; newService = {}; $refs['modal'].show()">
									<div class="position-absolute-center text-gray text-center">
										<div class="mb-1"><plus-icon transform="scale(1.2)"></plus-icon></div>
										Add Service
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-6 mb-4" v-for="service in services">
							<div class="bg-white service rounded p-3 cursor-pointer" :class="[service == selectedService ? 'active' : 'shadow-sm']" @click="selectedService = service;newService = JSON.parse(JSON.stringify(selectedService));">
								<div class="d-flex">
									<h5 class="font-heading mb-1">{{ service.name }}</h5>
									<span class="ml-auto text-gray">{{ service.is_available ? 'Available' : 'Not Available' }}</span>
								</div>
								<p class="text-muted mb-0 multiline-ellipsis">{{ service.description }}</p>
								<div class="d-flex align-items-center mt-3">
									<clock-icon width="17" height="17" fill="#888"></clock-icon>
									<span class="ml-1">{{ service.duration }} minutes</span>
								</div>
								<div class="d-flex mt-2">
									<div v-for="day in days" class="badge-day mr-1 rounded-circle position-relative overflow-hidden" :class="[service.days[day].isOpen ? 'text-primary bg-gray-400' : 'text-gray-400 bg-gray-200']">
										<span class="position-absolute-center line-height-1">{{ day.charAt(0) }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-4 h-100 overflow-hidden">
					<div class="bg-white rounded shadow-sm p-3 h-100 position-relative overflow-auto">
						<div v-if="selectedService">
							<div class="d-flex align-items-center mb-1">
								<h5 class="font-heading mb-0">{{ selectedService.name }}</h5>
								<div class="ml-auto d-flex align-items-center">
									<toggle-switch @input="updateService(selectedService)" v-model="selectedService.is_available"></toggle-switch>
									<div class="dropdown ml-2">
										<button class="btn p-0 line-height-0" data-toggle="dropdown" data-offset="-130, 0"><cog-icon></cog-icon></button>
										<div class="dropdown-menu shadow-sm">
											<span class="dropdown-item cursor-pointer d-flex align-items-center" @click="newService = JSON.parse(JSON.stringify(selectedService));$refs['modal'].show()">
												<pencil-icon width="16" height="16" class="mr-2"></pencil-icon>Edit
											</span>
											<span class="dropdown-item cursor-pointer d-flex align-items-center" @click="$refs['deleteModal'].show()">
												<trash-icon width="16" height="16" class="mr-2"></trash-icon>Delete
											</span>
										</div>
									</div>
								</div>
							</div>
							<p class="mb-0">{{ selectedService.description }}</p>

							<hr />

							<h6 class="font-heading d-inline-block mb-1">Duration: </h6> {{ selectedService.duration }} minutes
							<div>
								<h6 class="font-heading d-inline-block mb-3">Interval: </h6> {{ selectedService.interval }} minutes
							</div>

							<div class="d-flex mb-2">
								<button class="btn btn-tab px-0 position-relative" :class="{'active': serviceDetailsTab == 'availability'}" @click="serviceDetailsTab = 'availability'">Availability</button>
								<button class="btn btn-tab px-0 position-relative ml-3" :class="{'active': serviceDetailsTab == 'holidays'}" @click="serviceDetailsTab = 'holidays'">Holidays</button>
							</div>

							<div v-if="serviceDetailsTab == 'availability'" id="service-days">
								<div v-for="day in days" class="service-day py-2 border-bottom">
									<div class="service-day-heading d-flex align-items-center cursor-pointer" data-toggle="collapse" :data-target="`#day-${day}`">
										<div class="service-day-title">{{ day.toUpperCase() }}</div>
										<chevron-down-icon class="ml-auto chevron-down"></chevron-down-icon>
									</div>
									<div class="collapse" data-parent="#service-days" :id="`day-${day}`">
										<div class="py-2">
											<div class="p-2 border shadow-sm rounded">
												<div class="d-flex align-items-center mb-3">
													<span class="mr-2">Available</span>
													<toggle-switch @input="updateService(selectedService)" v-model="selectedService.days[day].isOpen"></toggle-switch>
												</div>
												<label class="mb-1 text-gray">Available Time</label>
												<timerangepicker @update="updateAvailableHours($event, day)" :start="selectedService.days[day].start" :end="selectedService.days[day].end"></timerangepicker>

												<label class="mb-1 mt-3 text-gray d-block">Break Times</label>
												<div class="d-flex align-items-center" v-for="(breaktime, index) in selectedService.days[day].breaktimes" :key="index">
													<timerangepicker @update="updateBreaktime($event, index, day)" :start="breaktime.start" :end="breaktime.end" class="mt-1 flex-grow-1">
													</timerangepicker>
													<trash-icon class="ml-auto cursor-pointer" width="20" height="20" fill="red" @click.native="removeBreaktime(index, day)"></trash-icon>
												</div>

												<timerangepicker v-if="newBreaktime" :start="newBreaktime.start" :end="newBreaktime.end" @update="updateNewBreaktime($event, day)" class="mt-1"></timerangepicker>
												<button class="btn btn-link pl-0" :disabled="(newBreaktime && (!newBreaktime.start || !newBreaktime.end)) || (selectedService.days[day].start == '08:00' && selectedService.days[day].end == '17:00')" @click="newBreaktime = {}"><u>+ Add breaktime</u></button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div v-else-if="serviceDetailsTab == 'holidays'" class="mt-3">
								<button class="btn btn-sm btn-outline-primary mb-2" @click="newHoliday = {}">+ Add Holiday</button>
								<div v-if="newHoliday">
									<div class="d-flex border rounded align-items-stretch mb-2 overflow-hidden">
										<div class="text-gray bg-gray-300 p-2">Date</div>
										<div class="flex-grow-1">
											<v-date-picker is-required :disabled-dates="formattedHolidays" :min-date="new Date()" :popover="{visibility: 'click' }" v-model="newHoliday.date" class="d-block h-100">
												<button type="button" class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100" :class="{'text-gray': !newHoliday.date}">{{ newHoliday.date ? formatDate(newHoliday.date) : 'Set date' }}</button>
											</v-date-picker>
										</div>
									</div>
									<div class="d-flex align-items-center mt-1">
		                                <div class="ml-auto">
		                                    <button type="button" class="btn btn-sm btn-link text-body pl-0" @click="newHoliday = null">Cancel</button>
		                                    <button type="button" class="btn btn-sm btn-primary ml-auto" :disabled="!newHoliday.date" @click="addHoliday">Add</button>
		                                </div>
                            		</div>
								</div>
								<div>
									<div v-for="(holiday, index) in selectedService.holidays" :key="index" class="border-bottom py-2 d-flex">
										{{ formatDate(holiday) }}
									<trash-icon class="ml-auto cursor-pointer" width="20" height="20" fill="red" @click.native="removeHoliday(index)"></trash-icon>
									</div>
								</div>
							</div>
						</div>

						<div v-else class="position-absolute-center text-gray text-center w-100">
							Please select a service
						</div>
					</div>
				</div>
			</div>
		</div>

		<modal ref="modal" :close-button="false">
			<h5 class="font-heading mb-3">{{ selectedService ? 'Edit' : 'Add'}} Service</h5>
			<vue-form-validate @submit="submit">
				<div class="form-group">
					<label class="form-label">Service name</label>
					<input type="text" class="form-control" v-model="newService.name" data-required>
				</div>
				<div class="form-group">
					<label class="form-label">Description</label>
					<textarea class="form-control resize-none" v-model="newService.description" data-required rows="5"></textarea>
				</div>
				<div class="form-group">
					<label class="form-label">Duration (in minutes)</label>
					<input type="number" class="form-control" v-model="newService.duration" data-required>
				</div>
				<div class="form-group">
					<label class="form-label">Interval (in minutes)</label>
					<input type="number" onkeydown="if(event.key==='.'){event.preventDefault();}" class="form-control" v-model="newService.interval" placeholder="Defaults to 15 mins">
				</div>
				<div class="d-flex">
					<button class="btn btn-link text-body" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-primary ml-auto" type="submit">{{ selectedService ? 'Update' : 'Add'}}</button>
				</div>
			</vue-form-validate>
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="selectedService">
				<h5 class="font-heading text-center">Delete Service</h5>
				<p class="text-center mt-3">
					Are you sure to delete the service <strong>{{ selectedService.name }}</strong>? <br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex">
					<button class="btn btn-link text-body" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-danger ml-auto" type="button" @click="deleteService(selectedService); $refs['deleteModal'].hide();">Delete</button>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./services.js"></script>
<style lang="scss" scoped src="./services.scss"></style>