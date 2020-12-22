<template>
	<div class="row h-100">
		<div v-if="ready" class="col-md-12 h-100 d-flex flex-column">
			<div class="border-bottom bg-white px-3 py-4">
				<h5 class="font-heading mb-0">Booking Types</h5>
			</div>

			<div v-if="services.length == 0" class="py-5 text-center p-2 position-absolute-center">
				<h6 class="text-grayer mb-3 font-weight-light h5 text-secondary">
					You don't have any services added yet
				</h6>
				<button
					class="btn btn-primary"
					@click="
						newService = {};
						$refs['addModal'].show();
					"
				>
					Add Service
				</button>
			</div>

			<div v-else class="d-flex flex-grow-1 overflow-hidden">
				<div class="flex-grow-1 py-4 overflow-auto container">
					<div class="row px-2">
						<div class="col-md-4 px-2" v-for="(service, index) in orderedServices" :key="service.id">
							<div class="px-1 mb-4">
								<router-link :data-intro="index == 0 ? $root.intros.services_index.steps[0] : null" :data-step="index == 0 ? 1 : null" class="card rounded service p-3 shadow-sm w-100 cursor-pointer" :to="`/dashboard/bookings/services/${service.id}`" :class="{ active: service.is_available }" tag="div">
									<div class="service-buttons position-absolute">
										<div class="dropdown ml-2" @click.prevent>
											<button class="btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none" type="button" data-toggle="dropdown" data-offset="-132, 0" :data-intro="index == 0 ? $root.intros.services_index.steps[1] : null" :data-step="index == 0 ? 2 : null">
												<more-icon width="20" height="20" class="fill-gray-500" transform="scale(1.3)"></more-icon>
											</button>

											<div class="dropdown-menu">
												<div class="d-flex align-items-center px-2 py-1">
													<span>Available</span>
													<toggle-switch class="ml-auto" @click.native.stop @input="updateServiceStatus($event, service)" active-class="bg-primary" v-model="service.is_available"></toggle-switch>
												</div>

												<span class="dropdown-item d-flex align-items-center px-2 cursor-pointer" @click="goToBookingPage(service)">
													Booking Page
												</span>
												<span
													class="dropdown-item d-flex align-items-center px-2 cursor-pointer"
													@click="
														clonedService = Object.assign({}, service);
														clonedService.index = index;
														$refs['editModal'].show();
													"
												>
													Edit
												</span>
												<span
													class="dropdown-item d-flex align-items-center px-2 cursor-pointer"
													@click="
														clonedService = service;
														$refs['deleteModal'].show();
													"
												>
													Delete
												</span>
											</div>
										</div>
									</div>
									<div class="mb-1">
										<h5 class="font-heading mb-0">
											{{ service.name }}
											<span v-if="service.parent_service_id" class="d-block text-secondary font-size-base font-weight-normal">ASSIGNED</span>
										</h5>
									</div>
									<p class="multiline-ellipsis mb-0 text-muted">
										{{ service.description }}
									</p>

									<div class="d-flex align-items-center mt-3 user-profile-container">
										<div
											v-tooltip.top="'You'"
											class="user-profile-image user-profile-image-sm"
											:style="{
												backgroundImage: 'url(' + $root.auth.profile_image + ')'
											}"
										>
											<span v-if="!$root.auth.profile_image">{{ $root.auth.initials }}</span>
										</div>
										<div
											v-for="assignedService in service.assigned_services"
											:key="assignedService.id"
											v-tooltip.top="assignedService.member.member_user.full_name"
											class="user-profile-image user-profile-image-sm"
											:style="{
												backgroundImage: 'url(' + assignedService.member.member_user.profile_image + ')'
											}"
										>
											<span v-if="!assignedService.member.member_user.profile_image">{{ assignedService.member.member_user.initials }}</span>
										</div>
									</div>

									<div class="d-flex align-items-center mt-4 line-height-1">
										<div class="d-flex align-items-center">
											<clock-icon width="11" height="11" transform="scale(1.5)" fill="#6c757d"></clock-icon>
											<small class="text-muted ml-1">{{ service.duration }} min</small>
										</div>
										<div class="d-flex align-items-center ml-2">
											<dollar-sign-icon width="8" height="8" transform="scale(2.4)" fill="#6c757d"></dollar-sign-icon>
											<small class="text-muted ml-1">{{ service.default_rate }}</small>
										</div>
										<div class="d-flex align-items-center ml-2" v-if="service.in_widget">
											<window-plus-icon width="11" height="11" transform="scale(1.5)" fill="#6c757d"></window-plus-icon>
											<small class="text-muted ml-1">In widget</small>
										</div>
										<div class="d-flex align-items-center ml-2" v-if="service.ask_skype">
											<skype-icon width="11" height="11" transform="scale(1.3)" fill="#6c757d"></skype-icon>
											<small class="text-muted ml-1">Skype</small>
										</div>
										<div class="d-flex align-items-center ml-2" v-if="service.ask_phone">
											<phone-icon width="11" height="11" transform="scale(1.3)" fill="#6c757d"></phone-icon>
											<small class="text-muted ml-1">Phone</small>
										</div>
									</div>
								</router-link>
							</div>
						</div>

						<div class="col-md-4 px-2">
							<div class="position-relative pb-4 h-100">
								<div class="h-100 position-relative">
									<div class="px-1 h-100">
										<button
											:data-intro="$root.intros.services_index.steps[2]"
											data-step="3"
											class="btn btn-light py-5 btn-add btn-lg shadow-none w-100 h-100 text-muted"
											type="button"
											@click="
												newService = {};
												$refs['addModal'].show();
											"
										>
											<div class="d-flex align-items-center justify-content-center py-3">
												<plus-icon class="fill-gray"></plus-icon>
												Add Service
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<modal ref="availabilityModal">
			<div v-if="clonedService">
				<h5 class="font-heading mb-3">Manage Availability</h5>
				<div class="d-flex mb-2 rounded overflow-hidden">
					<button class="btn position-relative w-50 rounded-0 py-3" :class="[serviceDetailsTab == 'availability' ? 'btn-primary' : 'btn-light']" @click="serviceDetailsTab = 'availability'">
						Availability
					</button>
					<button class="btn btn-tab position-relative w-50 rounded-0 py-3" :class="[serviceDetailsTab == 'holidays' ? 'btn-primary' : 'btn-light']" @click="serviceDetailsTab = 'holidays'">
						Holidays
					</button>
				</div>

				<div v-if="serviceDetailsTab == 'availability'" id="service-days">
					<div v-for="(day, index) in days" :key="index" class="service-day py-2 border-bottom">
						<div class="service-day-heading py-2 d-flex align-items-center cursor-pointer" data-toggle="collapse" :data-target="`#day-${day}`">
							<toggle-switch class="mr-2" active-class="bg-primary" @click.native.stop @input="updateService(clonedService)" v-model="clonedService.days[day].isOpen"></toggle-switch>
							<div class="h6 mb-0">{{ day.toUpperCase() }}</div>
							<chevron-down-icon class="ml-auto chevron-down"></chevron-down-icon>
						</div>
						<div class="collapse" data-parent="#service-days" :id="`day-${day}`">
							<div class="py-2 px-3">
								<div class="">
									<label class="mb-1 text-gray">Available Time</label>
									<timerangepicker @update="updateAvailableHours($event, day)" :start="clonedService.days[day].start" :end="clonedService.days[day].end"></timerangepicker>

									<label class="mb-1 mt-3 text-gray">Break Times</label>
									<div class="d-flex align-items-center mb-1" v-for="(breaktime, index) in clonedService.days[day].breaktimes" :key="index">
										<timerangepicker @update="updateBreaktime($event, index, day)" :start="breaktime.start" :end="breaktime.end" class="flex-grow-1"></timerangepicker>
										<trash-icon class="ml-auto cursor-pointer" width="20" height="20" fill="red" @click.native="removeBreaktime(index, day)"></trash-icon>
									</div>

									<timerangepicker v-if="newBreaktime" :start="newBreaktime.start" :end="newBreaktime.end" @update="updateNewBreaktime($event, day)" class="mt-1"></timerangepicker>
									<div class="mt-2 d-flex align-items-center">
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
									</div>
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
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="clonedService">
				<h5 class="font-heading text-center">Delete Service</h5>
				<p class="text-center mt-3">
					Are you sure to delete the service
					<strong>{{ clonedService.name }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							deleteService(clonedService);
							$refs['deleteModal'].hide();
						"
					>
						Delete
					</button>
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
							<button class="btn position-relative w-50 rounded-0 py-3" :class="[serviceDetailsTab == 'availability' ? 'btn-primary' : 'btn-light']" @click="serviceDetailsTab = 'availability'" type="button">
								Availability
							</button>
							<button class="btn btn-tab position-relative w-50 rounded-0 py-3" :class="[serviceDetailsTab == 'holidays' ? 'btn-primary' : 'btn-light']" @click="serviceDetailsTab = 'holidays'" type="button">
								Holidays
							</button>
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
										<div class="">
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
					<button class="btn btn-light shadow-none mr-1" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button class="ml-auto btn btn-primary" type="submit">Update</button>
				</div>
			</vue-form-validate>
		</modal>

		<modal ref="addModal" :close-button="false" size="modal-lg">
			<h5 class="font-heading mb-3">Add Service</h5>
			<vue-form-validate @submit="submit">
				<div class="row mx-0 mb-2">
					<div class="col-md-7 px-0">
						<div class="pr-3">
							<div class="form-group">
								<label class="form-label">Service name</label>
								<input type="text" class="form-control" v-model="newService.name" data-required />
							</div>
							<div class="form-group">
								<label class="form-label">Description</label>
								<textarea class="form-control resize-none" v-model="newService.description" data-required rows="3"></textarea>
							</div>
							<div class="form-group">
								<label class="form-label">Duration (in minutes)</label>
								<input type="number" class="form-control" v-model="newService.duration" data-required />
							</div>
							<div class="form-group">
								<label class="form-label">Interval (in minutes)</label>
								<input type="number" onkeydown="if(event.key==='.'){event.preventDefault();}" class="form-control" v-model="newService.interval" placeholder="Defaults to 15 mins" />
							</div>
							<div class="form-group d-flex align-items-center">
								<div class="flex-grow-1 pr-2">
									<label class="form-label">Default Rate</label>
									<input type="number" step="0.01" class="form-control" v-model="newService.default_rate" placeholder="$0.00" />
								</div>
								<div class="flex-grow-1 pl-2">
									<label class="form-label">Currency</label>
									<vue-select v-model="newService.currency" :options="currencies" data-required placeholder="Select currency"></vue-select>
								</div>
							</div>
							<div class="form-group">
								<label class="form-label">Address</label>
								<input type="text" class="form-control" v-model="newService.address" placeholder="Address" />
							</div>
						</div>
					</div>

					<div class="col-md-5 border-left border-gray-200 px-0">
						<div class="pl-3">
							<h6 class="font-heading mb-3">Service Settings</h6>
							<div class="form-group">
								<vue-checkbox v-model="newService.in_widget" label="Available in widget"></vue-checkbox>
							</div>
							<div class="form-group">
								<vue-checkbox v-model="newService.ask_skype" label="Ask for Skype ID in booking"></vue-checkbox>
								<div class="pl-3 ml-1 mt-2">
									<vue-checkbox :disabled="!newService.ask_skype" v-model="newService.require_skype" label="Required"></vue-checkbox>
								</div>
							</div>
							<div class="form-group">
								<vue-checkbox v-model="newService.ask_phone" label="Ask for phone number in booking"></vue-checkbox>
								<div class="pl-3 ml-1 mt-2">
									<vue-checkbox :disabled="!newService.ask_phone" v-model="newService.require_phone" label="Required"></vue-checkbox>
								</div>
							</div>
							<div class="form-group d-flex align-items-center">
								<vue-checkbox :disabled="!$root.auth.zoom_token" v-model="newService.create_zoom_link" label="Create Zoom link on booking"></vue-checkbox>
								<span v-tooltip.top="'Requires Zoom integration'" class="badge badge-pill badge-dark ml-1 badge-tooltip"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex align-items-center">
					<button class="btn btn-light shadow-none mr-1" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button class="ml-auto btn btn-primary" type="submit">Add</button>
				</div>
			</vue-form-validate>
		</modal>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
