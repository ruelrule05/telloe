<template>
  <div class="h-100" v-if="service">
    <div class="d-flex h-100 overflow-hidden">
      <div class="p-4 flex-grow-1 overflow-auto">
        <div class="d-flex justify-content-between mb-5">
          <div>
            <button
              class="btn p-1 btn-white badge-pill shadow-sm"
              type="button"
              @click="$router.push('/dashboard/bookings/services')"
            >
              <arrow-left-icon width="30" height="30"></arrow-left-icon>
            </button>
          </div>
          
          <div class="text-center">
            <h1 class="font-heading h3 mb-1">{{ service.name }}</h1>
					  <p class="mb-0">{{ service.description }}</p>
          </div>

          <div class="dropdown">
            <button
              :data-intro="$root.intros.edit_service.intro"
              :data-step="$root.intros.edit_service.step"
              class="btn p-2 btn-white badge-pill shadow-sm"
              data-toggle="dropdown"
              data-offset="-130, 10"
            >
              <cog-icon></cog-icon>
            </button>
            <div class="dropdown-menu">
              <span
                class="dropdown-item cursor-pointer d-flex align-items-center"
                @click="
                  clonedService = Object.assign({}, service);
                  $refs['editModal'].show();
                "
              >
                <pencil-icon width="16" height="16" class="mr-2"></pencil-icon>
                Edit
              </span>
              <span
                class="dropdown-item cursor-pointer d-flex align-items-center"
                @click="$refs['deleteModal'].show()"
              >
                <trash-icon width="16" height="16" class="mr-2"></trash-icon>
                Delete
              </span>
            </div>
          </div>
        </div>


        <div class="text-right">
          <div class="bg-white rounded shadow-sm d-inline-flex align-items-center">
            <button class="btn btn-sm btn-white p-1" type="button" @click="previousWeek()">
              <chevron-left-icon height="25" width="25" transform="scale(1.4)"></chevron-left-icon>
            </button>
            <v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate">
              <button type="button" class="btn btn-white px-1 shadow-none rounded-0">{{ formatDate(startDate) }}</button>
            </v-date-picker>
            <button class="btn btn-sm btn-white p-1" type="button" @click="nextWeek()">
              <chevron-right-icon height="25" width="25" transform="scale(1.4)"></chevron-right-icon>
            </button>
          </div>
        </div>



        <div class="pt-3 d-flex">
							<div class="text-center position-relative">
								<div class="position-relative coaches-container">
                  <!-- Main Coach -->
                  <div class="pl-2 py-2 pr-3 ml-1 cursor-pointer rounded position-relative user-container" :class="{'active': selectedCoachId == $root.auth.id}" @click="selectedCoachId = $root.auth.id; selectedService = service">
                    <div class="d-flex align-items-center p-1">
                      <div class="profile-image profile-image-xs" :style="{'background-image': `url(${$root.auth.profile_image})`}">
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
                  <div v-for="assignedService in service.assigned_services" class="xborder pl-2 py-2 pr-3 mc-3 ml-1 rounded position-relative user-container cursor-pointer" :class="{'active': selectedCoachId == assignedService.user.id}" :key="assignedService.id" @click="selectedService = assignedService; selectedCoachId = assignedService.user.id">
                    <div class="d-flex align-items-center p-1">
                      <div class="profile-image profile-image-xs cursor-pointer" :style="{'background-image': `url(${assignedService.user.profile_image})`}">
                        <span v-if="!assignedService.user.profile_image">{{ assignedService.user.initials }}</span>
                      </div>
                      <div class="flex-1 text-left pl-2">
                        <h6 class="font-heading text-nowrap mb-0">
                          {{ assignedService.user.full_name }}
                        </h6>
                        <small class="text-secondary">{{ assignedService.user.timezone }}</small>
                      </div>
                    </div>
                  </div>
                </div>

								<div class="active-user position-absolute w-100" :style="{'top': `${activeUserBgPosition}px`}"></div>
							</div>

							<div class="p-3 flex-grow-1 bg-white timeslots-wrapper shadow-sm position-relative rounded">
								<table class="table table-sm table-borderless mb-0 table-layout-fixed">
									<thead>
										<tr>
											<th class="align-middle pb-2 pt-0 pl-2 " v-for="(tabDate, index) in tabDates" :key="index">
												<strong>{{ tabDate.name }}</strong> <span class="text-gray">{{ tabDate.label }}</span>
											</th>
										</tr>
									</thead>
									<tbody class="shadow-none bg-transparent text-center">
										<tr>
											<td v-for="(date, dateIndex) in tabDates" :key="dateIndex" class="px-2 py-0 rounded-0 position-relative">
												<template v-if="service && timeslots && (timeslots[date.dayName] || []).length > 0">
													<div v-for="(timeslot, timeslotIndex) in timeslots[date.dayName]" :key="timeslotIndex">
														<div :key="dateIndex" class="py-2 position-relative rounded my-2 timeslot-button" :class="[timeslot.is_available ? 'cursor-pointer bg-primary text-white' : 'disabled bg-gray-400 pointer-events-none']" @click="setSelectedDateAndTimeslot(date, timeslot)"><span class="text-nowrap">{{ convertTime(timeslot.time, 'hh:mmA') }}</span></div>
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

      <div class="info bg-white h-100 overflow-auto shadow-sm d-none">
        <div class="d-flex mb-2">
          <button
            :data-intro="$root.intros.service_availability.intro"
            :data-step="$root.intros.service_availability.step"
            class="btn position-relative w-50 rounded-0 py-3"
            :class="[
              serviceDetailsTab == 'availability' ? 'btn-primary' : 'btn-light',
            ]"
            @click="serviceDetailsTab = 'availability'"
          >
            Availability
          </button>
          <button
            :data-intro="$root.intros.service_holidays.intro"
            :data-step="$root.intros.service_holidays.step"
            class="btn btn-tab position-relative w-50 rounded-0 py-3"
            :class="[
              serviceDetailsTab == 'holidays' ? 'btn-primary' : 'btn-light',
            ]"
            @click="serviceDetailsTab = 'holidays'"
          >
            Holidays
          </button>
        </div>

        <div v-if="serviceDetailsTab == 'availability'" id="service-days">
          <div
            v-for="(day, index) in days"
            :key="index"
            class="service-day p-2 border-bottom"
          >
            <div
              class="service-day-heading py-2 px-3 d-flex align-items-center cursor-pointer"
              data-toggle="collapse"
              :data-target="`#day-${day}`"
            >
              <toggle-switch
                class="mr-2"
                active-class="bg-green"
                @click.native.stop
                @input="updateService(service)"
                v-model="service.days[day].isOpen"
              ></toggle-switch>
              <div class="h6 mb-0">{{ day.toUpperCase() }}</div>
              <chevron-down-icon
                class="ml-auto chevron-down"
              ></chevron-down-icon>
            </div>
            <div
              class="collapse"
              data-parent="#service-days"
              :id="`day-${day}`"
            >
              <div class="py-2 px-3">
                <div class="">
                  <label class="mb-1 text-gray">Available Time</label>
                  <timerangepicker
                    @update="updateAvailableHours($event, day)"
                    :start="service.days[day].start"
                    :end="service.days[day].end"
                  ></timerangepicker>

                  <label class="mb-1 mt-3 text-gray">Break Times</label>
                  <div
                    class="d-flex align-items-center mb-1"
                    v-for="(breaktime, index) in service.days[day].breaktimes"
                    :key="index"
                  >
                    <timerangepicker
                      @update="updateBreaktime($event, index, day)"
                      :start="breaktime.start"
                      :end="breaktime.end"
                      class="flex-grow-1"
                    ></timerangepicker>
                    <trash-icon
                      class="ml-auto cursor-pointer"
                      width="20"
                      height="20"
                      fill="red"
                      @click.native="removeBreaktime(index, day)"
                    ></trash-icon>
                  </div>

                  <timerangepicker
                    v-if="newBreaktime"
                    :start="newBreaktime.start"
                    :end="newBreaktime.end"
                    @update="updateNewBreaktime($event, day)"
                    class="mt-1"
                  ></timerangepicker>
                  <div class="mt-2 d-flex align-items-center">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      :disabled="
                        newBreaktime &&
                        (!newBreaktime.start || !newBreaktime.end)
                      "
                      @click="newBreaktime = {}"
                    >
                      + Add breaktime
                    </button>
                    <button
                      v-if="(service.days[day].breaktimes || []).length > 0"
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
        <div v-else-if="serviceDetailsTab == 'holidays'" class="mt-3 px-3">
          <button
            class="btn btn-sm btn-outline-primary mb-2"
            @click="newHoliday = {}"
          >
            + Add Holiday
          </button>
          <div v-if="newHoliday">
            <div
              class="d-flex border rounded align-items-stretch mb-2 overflow-hidden"
            >
              <div class="text-gray bg-gray-300 p-2">Date</div>
              <div class="flex-grow-1">
                <v-date-picker
                  is-required
                  :disabled-dates="formattedHolidays"
                  :min-date="new Date()"
                  :popover="{ visibility: 'click' }"
                  v-model="newHoliday.date"
                  class="d-block h-100"
                >
                  <button
                    type="button"
                    class="btn btn-white rounded-0 btn-block shadow-none border-0 h-100"
                    :class="{ 'text-gray': !newHoliday.date }"
                  >
                    {{
                      newHoliday.date ? formatDate(newHoliday.date) : "Set date"
                    }}
                  </button>
                </v-date-picker>
              </div>
            </div>
            <div class="d-flex align-items-center mt-1">
              <div class="ml-auto">
                <button
                  type="button"
                  class="btn btn-sm btn-link text-body pl-0"
                  @click="newHoliday = null"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-primary ml-auto"
                  :disabled="!newHoliday.date"
                  @click="addHoliday"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              v-for="(holiday, index) in service.holidays"
              :key="index"
              class="border-bottom py-2 d-flex"
            >
              {{ formatDate(holiday) }}
              <trash-icon
                class="ml-auto cursor-pointer"
                width="20"
                height="20"
                fill="red"
                @click.native="removeHoliday(index)"
              ></trash-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal ref="applyBreaktimeToAllModal" :close-button="false">
      <template v-if="service && selectedDay">
        <h5 class="font-heading text-center">Apply to all days</h5>
        <p class="mt-3">
          This will override the breaktimes of all days for the selected
          service.
          <br />
          Are you sure to apply the selected breaktimes to all days?
          <br />
        </p>
        <div class="d-flex">
          <button
            class="btn btn-white border"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-primary ml-auto"
            type="button"
            @click="applyBreaktimeToAll()"
          >
            Apply
          </button>
        </div>
      </template>
    </modal>

    <modal ref="editModal" :close-button="false">
      <h5 class="font-heading mb-3">Edit Service</h5>
      <vue-form-validate @submit="submit" v-if="clonedService">
        <fieldset :disabled="clonedService.parent_service_id">
          <div class="form-group">
            <label class="form-label">Service name</label>
            <input
              type="text"
              class="form-control"
              v-model="clonedService.name"
              data-required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              class="form-control resize-none"
              v-model="clonedService.description"
              data-required
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Duration (in minutes)</label>
            <input
              type="number"
              class="form-control"
              v-model="clonedService.duration"
              data-required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Interval (in minutes)</label>
            <input
              type="number"
              onkeydown="if(event.key==='.'){event.preventDefault();}"
              class="form-control"
              v-model="clonedService.interval"
              placeholder="Defaults to 15 mins"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Default Rate</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              v-model="clonedService.default_rate"
              placeholder="$0.00"
            />
          </div>
        </fieldset>
        <div class="form-group">
          <vue-checkbox
            v-model="clonedService.in_widget"
            label="Available in widget"
          ></vue-checkbox>
        </div>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-white border mr-1"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
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
          <button
            class="btn btn-white border"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger ml-auto"
            type="button"
            @click="
              deleteService(service).then(() =>
                $router.push('/dashboard/bookings/services')
              );
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
