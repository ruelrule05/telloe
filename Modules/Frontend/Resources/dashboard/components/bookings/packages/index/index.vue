<template>
  <div class="row h-100">
    <div v-if="ready" class="col-md-12 h-100 d-flex flex-column">
      <div class="border-bottom bg-white px-3 py-4">
        <h5 class="font-heading mb-0">Packages</h5>
      </div>

      <div
        v-if="packages.length == 0"
        class="py-5 text-center p-2 position-absolute-center"
      >
        <h6 class="text-grayer mb-3 font-weight-light h5 text-secondary">
          You don't have any packages added yet
        </h6>
        <button
          class="btn btn-primary"
          @click="
            newPackage = {};
            $refs['addModal'].show();
          "
        >
          Add Package
        </button>
      </div>

      <div v-else class="d-flex flex-grow-1 overflow-hidden">
        <div class="flex-grow-1 py-4 overflow-auto container">
          <div class="row px-2">
            <div class="col-md-4 px-2" v-for="packageItem in packages" :key="packageItem.id">
              <div class="px-1 mb-4">
                <div class="card rounded service p-3 shadow-sm w-100">
                  <router-link
                    :to="`/dashboard/bookings/packages/${packageItem.id}`"
                    tag="div"
                    class="cursor-pointer"
                  >
                    <div class="d-flex mb-1 align-items-center">
                      <h5 class="font-heading mb-0">
                        {{ packageItem.name }}
                      </h5>

                      <toggle-switch
                        class="ml-auto"
                        @click.native.stop
                        @input="updatePackage(packageItem)"
                        active-class="bg-primary"
                        v-model="packageItem.is_available"
                      ></toggle-switch>
                    </div>
                    <p
                      class="text-muted mb-0 multiline-ellipsis xsmall service-description mb-4"
                    >
                      {{ packageItem.description }}
                    </p>
                    <div class="d-flex align-items-center">
                      <package-icon width="17" height="17" fill="#888"></package-icon>
                      <span class="ml-2">{{ packageItem.services.length }} services</span>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                      <coin-icon width="17" height="17" fill="#888"></coin-icon>
                      <span class="ml-2">${{ parseFloat(packageItem.price).toFixed(2) }}</span>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                      <calendar-icon width="17" height="17" fill="#888"></calendar-icon>
                      <span class="ml-2">Expires on {{ formatDate(packageItem.expiration_date) }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

            <div class="col-md-4 px-2">
              <div class="position-relative h-100">
                <div class="h-100 position-relative pb-4">
                  <div class="px-1 h-100">
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
                      Add Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal ref="addModal" :close-button="false" :scrollable="false">
      <h5 class="font-heading mb-3">Add Package</h5>
      <vue-form-validate @submit="submit">
        <div class="form-group">
          <label class="form-label">Package Name</label>
          <input
            type="text"
            class="form-control"
            v-model="newPackage.name"
            data-required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea
            type="text"
            class="form-control resize-none"
            rows="4"
            v-model="newPackage.description"
            data-required
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Services</label>
				  <vue-select v-model="newPackage.services" :options="servicesList" multiple data-required placeholder="Select service"></vue-select>
        </div>

        <div v-for="(service, index) in newPackage.services" :key="service.id" class="rounded bg-light p-3 mb-3 d-flex align-items-center">
            <h6 class="mb-1">{{ service.name }}</h6>
            <input type="number" class="form-control w-25 ml-auto" data-required placeholder="Bookings" min="1" v-model="newPackage.services[index].bookings" value="1">
        </div>

        <div class="form-group">
          <label class="form-label">Expires on</label>
          <v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="newPackage.expiration_date">
            <template v-slot="{ inputValue, inputEvents }">
              <div type="button" class="form-control" v-on="inputEvents">
                <span v-if="inputValue">{{ formatDate(inputValue) }}</span>
                <span v-else class="text-muted font-weight-normal">Set expiration date</span>
              </div>
            </template>
          </v-date-picker>
        </div>

        <div class="form-group">
          <label class="form-label">Package Total</label>
          <input type="number" class="form-control" data-required placeholder="Package Price" min="1" v-model="newPackage.price">
        </div>

        <div class="d-flex align-items-center mt-4">
          <button
            class="btn btn-light shadow-none mr-1"
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
