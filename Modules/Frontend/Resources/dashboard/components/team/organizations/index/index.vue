<template>
  <div class="h-100" v-if="ready">
    <div class="d-flex h-100">
      <div class="h-100 flex-grow-1">
        <div class="d-flex flex-column h-100">
          <div class="border-bottom bg-white px-3 py-4">
            <h5 class="font-heading mb-0">Organizations</h5>
          </div>

          <div
            class="rounded overflow-auto h-100 flex-grow-1 d-flex flex-column position-relative"
          >
            <div
              v-if="organizations.length == 0"
              class="text-secondary text-center p-4 position-absolute-center"
            >
              <div class="h6 mb-0 font-weight-normal">
                You don't have any organizations yet.
              </div>
            </div>

            <div class="h-100 container py-4" v-else>
              <div class="row">
                <router-link tag="div" :to="`/dashboard/team/organizations/${organization.id}`" v-for="organization in organizations" class="col-md-4 mb-4 px-2" :key="organization.id">
                  <div class="px-1">
                    <div class="card rounded service p-3 shadow-sm w-100 h-100 cursor-pointer">
                        <h5 class="font-heading mb-0 text-ellipsis">{{ organization.name }}</h5>
                        <p class="text-gray">{{ organization.slug }}</p>
                        <div class="user-profile-container d-flex align-items-center">
                          <template v-if="organization.members.length > 0">
                            <div
                              v-for="member in organization.members"
                              :key="member.id"
                              v-tooltip.top="member.member.member_user.full_name"
                              class="user-profile-image user-profile-image-sm"
                              :style="{
                                backgroundImage:
                                  'url(' + member.member.member_user.profile_image + ')',
                              }"
                            >
                              <span v-if="!member.member.member_user.profile_image">{{  member.member.member_user.initials }}</span>
                            </div>
                          </template>
                          <div v-else class="text-gray-500 d-flex align-items-center ml-1">
                            No members
                            <div class="user-profile-image user-profile-image-sm opacity-0"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="col-md-4 mb-4 px-2">
                  <div class="px-1">
                    <div class="position-relative h-100">
                      <div class="h-100 position-relative">
                        <button
                          :data-intro="$root.intros.add_service.intro"
                          :data-step="$root.intros.add_service.step"
                          class="py-5 btn btn-light btn-add btn-lg shadow-none d-flex line-height-0 align-items-center justify-content-center w-100 h-100 text-muted"
                          type="button"
                          @click="resetForm(); $refs['addModal'].show()"
                        >
                          <plus-icon class="fill-gray"></plus-icon>
                          Add Organization
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <modal ref="addModal" :close-button="false">
      <h5 class="font-heading mb-3">Add Organization</h5>
      <vue-form-validate @submit="storeOrganization(newOrganization).then(() => {resetForm();})">
        <div class="form-group">
          <label class="form-label">Organization Name</label>
          <input
            type="text"
            class="form-control"
            v-model="newOrganization.name"
            data-required
          />
        </div>

        <div class="form-group mb-1">
          <label class="form-label">Add Members</label>
          <vue-select v-model="newOrganization.members" :options="membersList" multiple placeholder="Add members"></vue-select>
        </div>
        <div v-for="(member, index) in newOrganization.members" :key="member.id" class="rounded bg-light p-2 d-flex align-items-center mb-1">
          <div
            class="user-profile-image user-profile-image-sm"
            :style="{
              backgroundImage:
                'url(' + member.member_user.profile_image + ')',
            }"
          >
            <span v-if="!member.member_user.profile_image">{{
              member.member_user.initials
            }}</span>
          </div>
          <div class="pl-2 flex-grow-1">
            <h6 class="mb-0 font-heading">{{ member.member_user.full_name }}</h6>
            <small class="text-secondary">{{ member.member_user.email }}</small>
          </div>
          <div class="align-self-start">
          <button
            class="btn btn-sm p-0 line-height-0 mr-n1 mt-n1"
            type="button"
            @click="newOrganization.members.splice(index, 1)"
          >
            <close-icon height="20" width="20"></close-icon>
          </button>
          </div>
        </div>

        <div class="d-flex mt-4">
          <button
            class="btn btn-light shadow-none"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button class="ml-auto btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </vue-form-validate>
    </modal>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
