<template>
  <div class="row h-100">
    <div v-if="ready" class="col-md-12 h-100 d-flex flex-column">
      <div class="border-bottom bg-white p-3 d-flex align-items-center">
        <h5 class="font-heading mb-0">Services</h5>
        <div class="ml-auto d-flex align-items-center">
          <button
            :data-intro="$root.intros.add_service.intro"
            :data-step="$root.intros.add_service.step"
            class="btn btn-light shadow-none d-flex align-items-center"
            type="button"
            @click="
              newService = {};
              $refs['addModal'].show();
            "
          >
            <plus-icon class="btn-icon"></plus-icon>
            Add Service
          </button>
        </div>
      </div>

      <div
        v-if="services.length == 0"
        class="py-5 text-center p-2 position-absolute-center"
      >
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
        <div class="flex-grow-1 p-2 overflow-auto">
          <div class="d-flex flex-wrap">
            <router-link
              :to="`/dashboard/bookings/services/${service.id}`"
              tag="div"
              class="service-container p-3"
              v-for="service in services"
              :key="service.id"
            >
              <div
                class="bg-white service rounded p-3 cursor-pointer"
                :class="[
                  service == selectedService ? 'active' : 'shadow-sm',
                  { unavailable: !service.is_available },
                ]"
                @click="
                  selectedService = service;
                  newService = JSON.parse(JSON.stringify(selectedService));
                "
              >
                <div class="d-flex">
                  <h5 class="font-heading mb-3">
                    {{ service.name }}
                    <span
                      v-if="service.parent_service_id"
                      class="d-block text-secondary font-size-base font-weight-normal"
                      >ASSIGNED</span
                    >
                  </h5>
                  <toggle-switch
                    class="ml-auto"
                    @click.native.stop
                    @input="updateService(service)"
                    active-class="bg-green"
                    v-model="service.is_available"
                  ></toggle-switch>
                </div>
                <p
                  class="text-secondary mb-0 multiline-ellipsis small service-description mb-5"
                >
                  {{ service.description }}
                </p>
                <div class="d-flex align-items-center mt-3">
                  <clock-icon width="17" height="17" fill="#888"></clock-icon>
                  <span class="ml-1">{{ service.duration }} minutes</span>
                </div>
                <div class="d-flex mt-2">
                  <div
                    v-for="(day, index) in days"
                    :key="index"
                    class="badge-day mr-1 rounded-circle position-relative overflow-hidden"
                    :class="[
                      service.days[day].isOpen
                        ? 'text-white bg-primary'
                        : 'text-gray-400 bg-gray-200',
                    ]"
                  >
                    <span class="position-absolute-center line-height-1">{{
                      day.charAt(0)
                    }}</span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div
          class="info bg-white border-left py-4 h-100 position-relative overflow-auto"
          :class="{ open: selectedService }"
        >
          <div v-if="selectedService">
            <div class="px-4 mb-5">
              <div class="d-flex align-items-center mb-1">
                <h5 class="font-heading mb-0">{{ selectedService.name }}</h5>
                <div class="ml-auto d-flex align-items-center">
                  <toggle-switch
                    @input="updateService(selectedService)"
                    active-class="bg-green"
                    v-model="selectedService.is_available"
                  ></toggle-switch>
                </div>
              </div>
              <p class="mb-0 mt-2 small text-secondary">
                {{ selectedService.description }}
              </p>
            </div>

            <div class="px-4">
              <h6 class="font-heading d-inline-block mb-2">Duration:</h6>
              {{ selectedService.duration }} minutes
              <div>
                <h6 class="font-heading d-inline-block mb-2">Interval:</h6>
                {{ selectedService.interval }} minutes
              </div>
              <h6 class="font-heading d-inline-block mb-2">Default Rate:</h6>
              ${{ selectedService.default_rate }}
              <div>
                <h6 class="font-heading d-inline-block mb-4">
                  Available in widget:
                </h6>
                {{ selectedService.in_widget ? "Yes" : "No" }}
              </div>
            </div>

            <div class="d-flex mb-2">
              <button
                :data-intro="$root.intros.service_availability.intro"
                :data-step="$root.intros.service_availability.step"
                class="btn position-relative w-50 rounded-0 py-3"
                :class="[
                  serviceDetailsTab == 'availability'
                    ? 'btn-primary'
                    : 'btn-light',
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
                    @input="updateService(selectedService)"
                    v-model="selectedService.days[day].isOpen"
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
                        :start="selectedService.days[day].start"
                        :end="selectedService.days[day].end"
                      ></timerangepicker>

                      <label class="mb-1 mt-3 text-gray">Break Times</label>
                      <div
                        class="d-flex align-items-center mb-1"
                        v-for="(breaktime, index) in selectedService.days[day]
                          .breaktimes"
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
                          v-if="
                            (selectedService.days[day].breaktimes || [])
                              .length > 0
                          "
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
                          newHoliday.date
                            ? formatDate(newHoliday.date)
                            : "Set date"
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
                  v-for="(holiday, index) in selectedService.holidays"
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

          <div
            v-else
            class="position-absolute-center text-gray text-center w-100"
          >
            Please select a service
          </div>
        </div>
      </div>
    </div>

    <modal ref="addModal" :close-button="false">
      <h5 class="font-heading mb-3">Add Service</h5>
      <vue-form-validate @submit="submit">
        <div class="form-group">
          <label class="form-label">Service name</label>
          <input
            type="text"
            class="form-control"
            v-model="newService.name"
            data-required
          />
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea
            class="form-control resize-none"
            v-model="newService.description"
            data-required
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Duration (in minutes)</label>
          <input
            type="number"
            class="form-control"
            v-model="newService.duration"
            data-required
          />
        </div>
        <div class="form-group">
          <label class="form-label">Interval (in minutes)</label>
          <input
            type="number"
            onkeydown="if(event.key==='.'){event.preventDefault();}"
            class="form-control"
            v-model="newService.interval"
            placeholder="Defaults to 15 mins"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Default Rate</label>
          <input
            type="number"
            step="0.01"
            class="form-control"
            v-model="newService.default_rate"
            placeholder="$0.00"
          />
        </div>
        <div class="form-group">
          <vue-checkbox
            v-model="newService.in_widget"
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
          <button class="ml-auto btn btn-primary" type="submit">Add</button>
        </div>
      </vue-form-validate>
    </modal>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
