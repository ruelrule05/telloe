<template>
  <div class="h-100" v-if="service">
    <div class="d-flex h-100 overflow-hidden">
      <div class="p-4 flex-grow-1 overflow-auto">
        <div class="d-flex">
          <div>
            <button
              class="btn p-2 btn-white badge-pill shadow-sm"
              type="button"
              @click="$router.push('/dashboard/bookings/services')"
            >
              <arrow-left-icon></arrow-left-icon>
            </button>
          </div>
          <div class="dropdown ml-auto">
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

        <div class="rounded bg-white shadow-sm p-3 mt-3">
          <h1 class="font-heading h3">{{ service.name }}</h1>
          <p class="service-description">{{ service.description }}</p>

          <h6 class="font-heading d-inline-block mb-2">Duration:</h6>
          {{ service.duration }} minutes
          <div>
            <h6 class="font-heading d-inline-block mb-2">Interval:</h6>
            {{ service.interval }} minutes
          </div>
          <h6 class="font-heading d-inline-block mb-2">Default Rate:</h6>
          ${{ service.default_rate }}
          <div>
            <h6 class="font-heading d-inline-block">Available in widget:</h6>
            {{ service.in_widget ? "Yes" : "No" }}
          </div>
        </div>
        <!-- Bookings -->
        <h5 class="mt-5 font-heading mb-3">Bookings</h5>

        <div v-if="service.allBookings.data.length > 0">
          <div class="d-flex">
            <pagination :data="service.allBookings" @pagination-change-page="getResults" :show-disabled="true" class="mb-0 shadow-sm"></pagination>
          </div>

          <table class="table table-borderless table-fixed-header mb-0">
            <thead class="text-muted">
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Time</th>
                <th>Assignee</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="booking in service.allBookings.data">
                <tr :key="booking.id">
                  <td class="align-middle">{{ (booking.user || booking.contact.contact_user || {}).full_name }}</td>
                  <td class="align-middle">
                    {{ formatDate(booking.created_at) }}
                  </td>
                  <td class="align-middle">
                    {{ convertTime(booking.start, 'hh:MMA') }}
                  </td>
                  <td class="align-middle">
                    <div class="d-flex align-items-center">
                      <div
                        class="user-profile-image user-profile-image-sm mr-2"
                        :style="{
                          backgroundImage:
                            'url(' + (booking.service.user || booking.service.member.member_user).profile_image + ')',
                        }"
                      >
                        <span v-if="!(booking.service.user || booking.service.member.member_user).profile_image">{{
                          (booking.service.user || booking.service.member.member_user).initials
                        }}</span>
                      </div>
                      {{ (booking.service.user || booking.service.member.member_user).full_name }}
                      <span v-if="$root.auth.id == (booking.service.user || booking.service.member.member_user).id">(You)</span>
                    </div>
                  </td>
                  <td class="align-middle">
                    <div class="flex-grow-1 text-right">
                      <div class="dropleft">
                        <button class="btn btn-white p-1 line-height-0" data-toggle="dropdown" @click="assigningMember = false">
                          <more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray-500"></more-icon>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <span v-if="!assigningMember" class="dropdown-item cursor-pointer" @click.stop="assigningMember = true">Assign</span>
                            <template v-else>
                              <div class="dropdown-item cursor-pointer d-flex align-items-center" :class="{'disabled bg-light': booking.service.user.id == $root.auth.id}" @click="assignMember(booking)">
                                <div
                                  class="user-profile-image user-profile-image-sm mr-2"
                                  :style="{
                                    backgroundImage:
                                      'url(' + $root.auth.profile_image + ')',
                                  }"
                                >
                                  <span v-if="!$root.auth.profile_image">{{
                                    $root.auth.initials
                                  }}</span>
                                </div>
                                {{ $root.auth.full_name }} (You)
                              </div>
                              <template v-for="member in members">
                                  <div v-if="!member.is_pending && member.assigned_services.find(x => (x.parent_service_id == service.id))" :key="member.id" class="dropdown-item cursor-pointer d-flex align-items-center" @click="assignMember(booking, member)" :class="{'disabled bg-light': booking.service.user.id == member.member_user.id}">
                                    <div
                                      class="user-profile-image user-profile-image-sm mr-2"
                                      :style="{
                                        backgroundImage:
                                          'url(' + member.member_user.profile_image + ')',
                                      }"
                                    >
                                      <span v-if="!member.member_user.profile_image">{{
                                        member.member_user.initials
                                      }}</span>
                                    </div>
                                    {{ member.member_user.full_name }}
                                  </div>
                              </template>
                            </template>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="rounded bg-white text-center py-3 text-muted mt-2">
            No bookings.
          </div>
        </div>
      </div>

      <div class="info bg-white h-100 overflow-auto shadow-sm">
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
      <vue-form-validate @submit="submit">
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
