<template>
  <div v-if="member" class="w-100">
    <div class="p-3">
      <button
        class="btn p-2 btn-white badge-pill"
        type="button"
        @click="$router.push('/dashboard/members')"
      >
        <arrow-left-icon></arrow-left-icon>
      </button>
    </div>

    <div class="text-center my-3">
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
    <strong class="d-block mb-2 font-weight-bold mt-3 px-3"
      >Assigned Services</strong
    >
    <template v-for="service in services">
      <div
        v-if="service.is_available"
        :key="service.id"
        class="pl-3 d-inline-block w-25"
      >
        <div class="w-100 d-flex align-items-center mb-2 rounded p-3 bg-white">
          <div class="overflow-hidden">
            <h6 class="font-heading mb-0 text-ellipsis">{{ service.name }}</h6>
            <small class="text-gray d-block"
              >{{ service.duration }} minutes</small
            >
          </div>
          <div class="ml-auto">
            <div
              v-if="service.is_loading"
              class="spinner-border spinner-border-sm mr-2"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <toggle-switch
              :class="{ 'd-none': service.is_loading }"
              active-class="bg-green"
              :value="
                member.services.find((x) => x.assigned_service_id == service.id)
                  ? true
                  : false
              "
              @input="memberToggleAssignedService($event, service)"
            ></toggle-switch>
          </div>
        </div>
      </div>
    </template>

    <!-- Bookings -->
    <h5 class="mt-3 font-heading px-3">Bookings</h5>
    <div class="overflow-auto h-100 px-3" v-if="bookings.length > 0">
      <table class="table table-borderless table-fixed-header mb-0">
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Date Created</th>
            <th></th>
          </tr>
        </thead>
        <paginate
          tag="tbody"
          name="bookings"
          :list="bookings"
          :per="15"
          ref="paginate"
        >
          <template v-for="booking in paginated('bookings')">
            <tr :key="booking.id">
              <td class="align-middle"></td>
            </tr>
          </template>
        </paginate>
      </table>
    </div>
    <div v-else class="px-3">
      <div class="rounded bg-white text-center py-3 text-muted">
        No bookings.
      </div>
    </div>
  </div>
</template>

<script src="./show.js"></script>

<style lang="scss" scoped src="./show.scss"></style>