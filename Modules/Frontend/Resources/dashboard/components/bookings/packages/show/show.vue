<template>
  <div class="h-100" v-if="packageItem">
    <div class="d-flex h-100 overflow-hidden">
      <div class="p-4 flex-grow-1 overflow-auto">
        <div class="d-flex">
          <div>
            <button
              class="btn p-1 btn-white badge-pill shadow-sm"
              type="button"
              @click="$router.push('/dashboard/bookings/packages')"
            >
              <arrow-left-icon width="30" height="30"></arrow-left-icon>
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

        <div class="mt-4">
          <h1 class="font-heading h3">{{ packageItem.name }}</h1>
          <p class="service-description mb-3">{{ packageItem.description }}</p>
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center ">
              <dollar-sign-icon width="8" height="8" transform="scale(2.4)"></dollar-sign-icon>
              <span class="ml-1">{{ parseFloat(packageItem.price).toFixed(2) }}</span>
            </div>
            <div class="d-flex align-items-center ml-4">
              <calendar-icon width="8" height="8" transform="scale(2)"></calendar-icon>
              <span class="ml-2">{{ formatDate(packageItem.expiration_date) }}</span>
            </div>
          </div>
        </div>

        
        <!-- Services -->
        <div class="mt-4 d-flex">
          <div class="position-relative">
            <div class="position-relative services-container">
              <div class="pl-2 py-2 cursor-pointer position-relative service-container" :class="{'active': selectedService.id == service.id}" v-for="service in packageItem.services" :key="service.id" @click="selectedService = service">
                <div class="d-flex align-items-center py-1 pl-1">
                  <div>
                    <h6 class="mb-1">{{ service.name }}</h6>
                    <div class="d-flex align-items-center">
                      <clock-icon width="11" height="11" transform="scale(1.5)" fill="#6c757d"></clock-icon>
                      <small class="text-muted ml-1">{{ service.duration }} min</small>
                    </div>
                  </div>

                  <div class="dropdown mr-1 pl-1 ml-auto service-dropdown">
                    <button
                      class="btn btn-white line-height-0 p-1 badge-pill shadow-none"
                      data-toggle="dropdown"
                      data-offset="-140, 0"
                    >
                      <more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray"></more-icon>
                    </button>
                    <div class="dropdown-menu">
                      <router-link
                        class="dropdown-item cursor-pointer"
                        tag="span"
                        :to="`/dashboard/bookings/services/${service.id}`"
                      >
                        View Service
                      </router-link>
                      <span
                        class="dropdown-item cursor-pointer"
                        @click="removeAssignedService(service, index)"
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="active-package position-absolute w-100" :style="{'top': `${activeServicePosition}px`}"></div>
          </div>
          <div class="p-3 flex-1 bg-white shadow-sm position-relative rounded">
            <div class="px-1 mb-2 d-inline-block" v-for="(block, index) in (new Array(parseInt(selectedService.bookings)))" :key="index">
              <div class="bg-primary rounded text-white py-3 px-4 cursor-pointer">
                <h6 class="font-heading mb-0">{{ selectedService.duration }} min</h6>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="mt-5">
          <div class="row px-2">
            <div class="col-md-4 px-2" v-for="(service, index) in packageItem.services" :key="service.id">
              <div class="mx-1 mb-4">
                <div class="card rounded service p-3 shadow-sm w-100 position-relative">
                  <div class="dropdown service-more position-absolute">
                    <button
                      class="btn btn-white line-height-0 p-1 badge-pill shadow-none"
                      data-toggle="dropdown"
                      data-offset="-140, 0"
                    >
                      <more-icon width="25" height="25" transform="scale(0.65)" class="fill-gray"></more-icon>
                    </button>
                    <div class="dropdown-menu">
                      <router-link
                        class="dropdown-item cursor-pointer"
                        tag="span"
                        :to="`/dashboard/bookings/services/${service.id}`"
                      >
                        View Service
                      </router-link>
                      <span
                        class="dropdown-item cursor-pointer"
                        @click="packageItem.services.splice(index, 1)"
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                  <h5 class="font-heading mb-1">{{ service.name }}</h5>
                  <p class="multiline-ellipsis mb-0 text-muted">
                    {{ service.description }}
                  </p>

                  <div class="d-flex align-items-center mt-3 user-profile-container">
                    <div
                        v-tooltip.top="'You'"
                        class="user-profile-image user-profile-image-sm"
                        :style="{
                          backgroundImage:
                            'url(' + $root.auth.profile_image + ')',
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
                          backgroundImage:
                            'url(' + assignedService.member.member_user.profile_image + ')',
                        }"
                      >
                        <span v-if="!assignedService.member.member_user.profile_image">{{  assignedService.member.member_user.initials }}</span>
                      </div>
                  </div>

                  <div class="d-flex align-items-center mt-4 line-height-1">
                    <div class="d-flex align-items-center">
                      <clock-icon width="11" height="11" transform="scale(1.5)" fill="#6c757d"></clock-icon>
                      <small class="text-muted ml-1">{{ service.duration }} min</small>
                    </div>
                    <div class="d-flex align-items-center ml-3">
                      <dollar-sign-icon width="8" height="8" transform="scale(2.4)" fill="#6c757d"></dollar-sign-icon>
                      <small class="text-muted ml-1">{{ service.default_rate }}</small>
                    </div>
                    <div class="d-flex align-items-center ml-3" v-if="service.in_widget">
                      <window-plus-icon width="11" height="11" transform="scale(1.5)" fill="#6c757d"></window-plus-icon>
                      <small class="text-muted ml-1">In widget</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4 px-2">
              <div class="position-relative pb-4 h-100">
                <div class="h-100 position-relative">
                  <button
                    :data-intro="$root.intros.add_service.intro"
                    :data-step="$root.intros.add_service.step"
                    class="btn btn-light btn-add btn-lg shadow-none d-flex align-items-center justify-content-center w-100 h-100 text-muted"
                    type="button"
                    @click="
                      newService = {};
                      $refs['addModal'].show();
                    "
                  >
                    <plus-icon class="fill-gray"></plus-icon>
                    Add Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
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
            <label class="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              v-model="clonedPackage.price"
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
            class="btn btn-light shadow-none"
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
