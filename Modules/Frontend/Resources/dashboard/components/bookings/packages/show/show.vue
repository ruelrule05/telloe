<template>
  <div class="h-100" v-if="packageItem">
    <div class="d-flex h-100 overflow-hidden">
      <div class="p-4 flex-grow-1 overflow-auto">
        <div class="d-flex">
          <div>
            <button
              class="btn p-2 btn-white badge-pill shadow-sm"
              type="button"
              @click="$router.push('/dashboard/bookings/packages')"
            >
              <arrow-left-icon></arrow-left-icon>
            </button>
          </div>
          <div class="dropdown ml-auto">
            <button
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
                  clonedPackage = Object.assign({}, packageItem);
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
          <h1 class="font-heading h3">{{ packageItem.name }}</h1>
          <p class="service-description">{{ packageItem.description }}</p>

          <h6 class="font-heading d-inline-block mb-2">Services:</h6>
          {{ packageItem.services.map(service => {
            return `${service.name} (${service.bookings} bookings)`;
          }).join(', ') }}
          <div>
            <h6 class="font-heading d-inline-block mb-2">Price:</h6>
            ${{ parseFloat(packageItem.price).toFixed(2) }}
          </div>
          <h6 class="font-heading d-inline-block mb-2">Expires on:</h6>
          {{ formatDate(packageItem.expiration_date) }}
          <div>
            <h6 class="font-heading d-inline-block">Available in widget:</h6>
            {{ packageItem.in_widget ? "Yes" : "No" }}
          </div>
        </div>
        <!-- Orders -->
        <h5 class="mt-5 font-heading mb-0">Orders</h5>
        <div v-if="packageItem.orders.length > 0">
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
              <template v-for="booking in packageItem.orders">
                <tr :key="booking.id">
                  <td class="align-middle">{{ booking.user.full_name }}</td>
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
                            'url(' + packageItem.user.profile_image + ')',
                        }"
                      >
                        <span v-if="!packageItem.user.profile_image">{{
                          packageItem.user.initials
                        }}</span>
                      </div>
                      {{ packageItem.user.full_name }}
                      <span v-if="$root.auth.id == packageItem.user.id">(You)</span>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="rounded bg-white text-center py-3 text-muted mt-2">
            No orders.
          </div>
        </div>
      </div>
    </div>

    <modal ref="editModal" :close-button="false">
      <h5 class="font-heading mb-3">Edit Package</h5>
      <vue-form-validate @submit="submit">
        <fieldset>
          <div class="form-group">
            <label class="form-label">Package name</label>
            <input
              type="text"
              class="form-control"
              v-model="clonedPackage.name"
              data-required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              class="form-control resize-none"
              v-model="clonedPackage.description"
              data-required
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Duration (in minutes)</label>
            <input
              type="number"
              class="form-control"
              v-model="clonedPackage.duration"
              data-required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Interval (in minutes)</label>
            <input
              type="number"
              onkeydown="if(event.key==='.'){event.preventDefault();}"
              class="form-control"
              v-model="clonedPackage.interval"
              placeholder="Defaults to 15 mins"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Default Rate</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              v-model="clonedPackage.default_rate"
              placeholder="$0.00"
            />
          </div>
        </fieldset>
        <div class="form-group">
          <vue-checkbox
            v-model="clonedPackage.in_widget"
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
      <template v-if="packageItem">
        <h5 class="font-heading text-center">Delete Service</h5>
        <p class="text-center mt-3">
          Are you sure to delete the package
          <strong>{{ packageItem.name }}</strong>
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
              deletePackage(packageItem).then(() =>
                $router.push('/dashboard/bookings/packages')
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
