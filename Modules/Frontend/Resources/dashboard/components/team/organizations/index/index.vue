<template>
  <div class="h-100" v-if="ready">
    <div class="d-flex h-100">
      <div class="h-100 flex-grow-1">
        <div class="d-flex flex-column h-100">
          <div class="border-bottom bg-white p-3 d-flex align-items-center">
            <h5 class="font-heading mb-0">Organizations</h5>
            <div class="ml-auto d-flex align-items-center">
              <button
                class="btn btn-light shadow-none d-flex align-items-center"
                type="button"
                @click="resetForm();infoTab = 'add_organization'"
              >
                <plus-icon class="btn-icon"></plus-icon>
                Add Organization
              </button>
            </div>
          </div>

          <div
            class="rounded mt-2 overflow-auto h-100 flex-grow-1 d-flex flex-column position-relative"
          >
            <div
              v-if="organizations.length == 0"
              class="text-secondary text-center p-4 position-absolute-center"
            >
              <div class="h6 mb-0 font-weight-normal">
                You don't have any organizations yet.
              </div>
            </div>

            <div class="overflow-auto flex-grow-1 pb-4 px-4 h-100" v-else>
              <table
                class="table table-borderless table-hover mb-0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Members</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="organization in organizations"
                    :key="organization.id"
                    class="cursor-pointer"
                  >
                    <td class="align-middle" @click="goToOrganization(organization.id);">
                      <h6 class="font-heading mb-0">{{ organization.name }}</h6>
                      <small class="text-secondary">{{ organization.slug }}</small>
                    </td>
                    <td class="align-middle" @click="goToOrganization(organization.id);">
                      {{ organization.members_count }}
                    </td>
                    <td class="align-middle" @click="goToOrganization(organization.id);">
                      {{ organization.created_at }}
                    </td>
                    <td class="align-middle" width="1%">
                      <a :href="`/${organization.slug}`" target="_blank" class="btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none btn-more">
                        <shortcut-icon width="20" height="20" class="fill-gray-500"></shortcut-icon>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        class="info bg-white h-100 border-left d-flex flex-column position-relative"
        :class="{ open: infoTab }"
      >
        <button
          class="btn btn-white p-0 btn-close position-absolute"
          type="button"
          @click="infoTab = ''"
        >
          <close-icon height="30" width="30"></close-icon>
        </button>

        <template v-if="infoTab == 'manage_organization'">
          <div class="border-bottom py-3 px-3">
            <strong class="d-block my-2">Manage Member</strong>
          </div>
          <div v-if="selectedOrganization" class="p-3">
            <div class="text-center info-profile">
              <div
                class="user-profile-image d-inline-block"
                ref="profileImage"
                :style="{
                  backgroundImage: 'url(' + selectedOrganization.profile_image + ')',
                }"
              >
                <span v-if="!selectedOrganization.profile_image">{{
                  selectedOrganization.initials
                }}</span>
              </div>
              <h4 class="h5 font-heading conversation-title mb-0 rounded">
                {{ selectedOrganization.full_name }}
              </h4>
              <div class="text-muted">{{ selectedOrganization.email }}</div>
              <div
                v-if="(selectedOrganization.contact || {}).is_pending"
                class="mt-1 badge badge-icon d-inline-flex align-items-center bg-warning-light text-warning"
              >
                <clock-icon
                  class="fill-warning"
                  height="12"
                  width="12"
                ></clock-icon>
                &nbsp;Pending
              </div>
            </div>

            <div class="form-group">
              <strong class="d-block mb-2 font-weight-bold mt-3"
                >Assigned Services</strong
              >
              <template v-for="service in services">
                <div
                  v-if="service.is_available"
                  :key="service.id"
                  class="d-flex align-items-center mb-2 rounded p-3 bg-light"
                >
                  <div>
                    <h6 class="font-heading mb-0">{{ service.name }}</h6>
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
                        selectedOrganization.services.find(
                          (x) => x.parent_service_id == service.id
                        )
                          ? true
                          : false
                      "
                      @input="memberToggleAssignedService($event, service)"
                    ></toggle-switch>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>

        <div
          v-else-if="infoTab == 'add_organization'"
          class="d-flex flex-column overflow-hidden"
        >
          <div class="border-bottom py-3 px-3">
            <strong class="d-block my-2">Add Organization</strong>
          </div>
          <div class="p-4 overflow-auto flex-grow-1">
            <vue-form-validate @submit="storeOrganization(newOrganization).then(() => {infoTab = ''; resetForm();})">
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
                  class="btn btn-white border"
                  type="button"
                  @click="infoTab = ''"
                >
                  Cancel
                </button>
                <button class="ml-auto btn btn-primary" type="submit">
                  Add
                </button>
              </div>
            </vue-form-validate>
          </div>
        </div>
      </div>
    </div>

    <modal ref="resendModal" :close-button="false">
      <template v-if="selectedOrganization">
        <h5 class="font-heading text-center">Resend Invitation</h5>
        <p class="text-center mt-3">
          Are you sure to resend the invitation email to member
          <strong>{{
            selectedOrganization.member_user.full_name.trim() ||
            selectedOrganization.member_user.email
          }}</strong>
          ?
          <br />
        </p>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-white border text-body"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <vue-button
            button_class="btn btn-primary ml-auto"
            :loading="resendLoading"
            type="button"
            @click="resendEmail(selectedOrganization)"
            >Resend Invitation</vue-button
          >
        </div>
      </template>
    </modal>

    <modal ref="deleteModal" :close-button="false">
      <template v-if="selectedOrganization">
        <h5 class="font-heading text-center">Delete Member</h5>
        <p class="text-center mt-3">
          Are you sure to delete member
          <strong>{{
            selectedOrganization.member_user.full_name.trim() ||
            selectedOrganization.member_user.email
          }}</strong>
          ?
          <br />
          <span class="text-danger">This action cannot be undone</span>
        </p>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-white border text-body"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger ml-auto"
            type="button"
            @click="
              deleteMember(selectedOrganization);
              $refs['deleteModal'].hide();
              selectedOrganization = null;
              infoTab = '';
            "
          >
            Delete
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
