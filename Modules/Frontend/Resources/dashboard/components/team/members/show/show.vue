<template>
  <div v-if="member" class="w-100 h-100 overflow-hidden">
    <div class="overflow-auto h-100">
      <div class="p-4">
        <button
          class="btn p-2 btn-white badge-pill shadow-sm"
          type="button"
          @click="$router.push('/dashboard/team/members')"
        >
          <arrow-left-icon></arrow-left-icon>
        </button>
      </div>

      <div class="text-center mt-n5 mb-3">
        <div
          class="user-profile-image d-inline-block"
          :style="{
            backgroundImage: 'url(' + member.member_user.profile_image + ')',
          }"
        >
          <span v-if="!member.member_user.profile_image">
            {{ member.member_user.initials }}
          </span>
        </div>
        <h1 class="h3 font-heading mt-2 mb-0">{{ member.full_name }}</h1>
        <div class="text-muted mb-1">{{ member.email }}</div>
        <div class="flex-grow-1">
          <div
            class="badge badge-icon d-inline-flex align-items-center"
            :class="[
              member.is_pending
                ? 'bg-warning-light text-warning'
                : 'bg-primary-light text-primary',
            ]"
          >
            <clock-icon
              v-if="member.is_pending"
              height="12"
              width="12"
            ></clock-icon>
            <checkmark-circle-icon
              v-else
              height="12"
              width="12"
            ></checkmark-circle-icon>
            &nbsp;{{ member.is_pending ? "Pending" : "Accepted" }}
          </div>
        </div>
      </div>

      <!-- Assigned services -->
      <!-- <h5 class="mt-5 font-heading px-4 mb-3">Assigned Services</h5>
      <template v-for="service in services">
        <div
          v-if="service.is_available"
          :key="service.id"
          class="pl-4 d-inline-block w-25"
        >
          <div class="w-100 mb-2 rounded p-3 bg-white">
            <div class="overflow-hidden">
              <h6 class="font-heading mb-0 text-ellipsis">{{ service.name }}</h6>
              <small class="text-gray d-block"
                >{{ service.duration }} minutes</small
              >
            </div>
            <div class="mt-3">
              <div class="d-flex align-items-center">
                <toggle-switch
                  active-class="bg-green"
                  :value="
                    member.services.find((x) => x.parent_service_id == service.id && !x.deleted_at)
                      ? true
                      : false
                  "
                  @input="memberToggleAssignedService($event, service)"
                ></toggle-switch>
                <span class="ml-3">Available</span>
              </div>
            </div>
            <div class="mt-2">
              <div class="d-flex align-items-center">
                <toggle-switch
                  active-class="bg-green"
                  :disabled="member.services.find((x) => x.parent_service_id == service.id && !x.deleted_at)
                      ? false
                      : true"
                  :value="service.manage_bookings"
                  @input="memberToggleManageBookings($event, service);"
                ></toggle-switch>
                <span class="ml-3">Manage Bookings</span>
              </div>
            </div>
          </div>
        </div>
      </template> -->

      <!-- Bookings -->
      <h5 class="mt-4 font-heading px-4 mb-0">Bookings</h5>
      <div class="px-4 mb-4" v-if="bookings.length > 0">
        <table class="table table-borderless table-fixed-header mb-0">
          <thead class="text-secondary">
            <tr>
              <th class="pl-0">User</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="booking in bookings">
              <tr :key="booking.id">
                <td class="align-middle">{{ booking.user.full_name }}</td>
                <td class="align-middle">{{ booking.service.name }}</td>
                <td class="align-middle">
                  {{ formatDate(booking.created_at) }}
                </td>
                <td class="align-middle">
                  {{ convertTime(booking.start, 'hh:MMA') }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-else class="px-4 mb-4">
        <div class="rounded bg-white text-center py-3 text-muted">
          No bookings.
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./show.js"></script>

<style lang="scss" scoped src="./show.scss"></style>