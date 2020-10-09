<template>
  <div class="h-100" v-if="service">
    <div class="d-flex h-100 overflow-hidden">
      <div class="p-3 flex-grow-1">
        <div class="d-flex">
          <div>
            <button
              class="btn p-2 btn-white badge-pill"
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
              class="btn p-2 btn-white badge-pill"
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

        <h1 class="font-heading h3 mt-4">{{ service.name }}</h1>
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
          <h6 class="font-heading d-inline-block mb-4">Available in widget:</h6>
          {{ service.in_widget ? "Yes" : "No" }}
        </div>
        <!-- Bookings -->
        <h5 class="mt-3 font-heading">Bookings</h5>
        <div class="overflow-auto h-100" v-if="service.bookings.length > 0">
          <table class="table table-borderless table-fixed-header mb-0">
            <thead class="text-muted">
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Time</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <paginate
              tag="tbody"
              name="bookings"
              :list="service.bookings"
              :per="15"
              ref="paginate"
            >
              <template v-for="booking in paginated('bookings')">
                <tr :key="booking.id">
                  <td class="align-middle">{{ booking.user.full_name }}</td>
                  <td class="align-middle">
                    {{ formatDate(booking.created_at) }}
                  </td>
                  <td class="align-middle">
                    {{ booking.start }}
                  </td>
                  <td class="align-middle"></td>
                </tr>
              </template>
            </paginate>
          </table>
        </div>
        <div v-else>
          <div class="rounded bg-white text-center py-3 text-muted">
            No bookings.
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
        <fieldset :disabled="clonedService.assigned_service_id">
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
