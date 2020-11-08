<template>
  <div v-if="organization" class="w-100 h-100 overflow-hidden">
    <div class="overflow-auto h-100">
      <div class="p-3 d-flex align-items-center">
        <button
          class="btn p-1 btn-white badge-pill shadow-sm"
          type="button"
          @click="$router.push('/dashboard/team/organizations')"
        >
          <arrow-left-icon width="30" height="30"></arrow-left-icon>
        </button>

        <div class="ml-auto">
          <button
            class="btn btn-white d-inline-flex align-items-center shadow-sm"
            type="button"
            @click="$refs['addMemberModal'].show()"
          >
          Add Member
          </button>
          <button
            class="btn p-1 btn-white badge-pill shadow-sm"
            type="button"
            @click="$refs['editModal'].show()"
          >
            <pencil-icon width="30" height="30" transform="scale(0.75)"></pencil-icon>
          </button>
        </div>
      </div>

      <div class="text-center">
        <h1 class="font-heading h3 mb-1">{{ organization.name }}</h1>
        <a :href="`/${organization.slug}`" target="_blank" class="d-inline-flex align-items-center text-decoration-dark">
          <span class="text-muted mr-1">{{ organization.slug }}</span>
					<shortcut-icon height="14" width="14" class="fill-gray"></shortcut-icon>
        </a>
      </div>

      <div class="container mt-5">
        <div class="row">
          <template v-if="organization.members.length > 0">
            <div v-for="member in organization.members" :key="member.id" class="col-md-3 member">
              <div class="bg-white rounded p-3 shadow-sm text-center position-relative">
                <div class="dropdown position-top-right mr-2 mt-1">
                  <button class="btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none btn-more" type="button" data-toggle="dropdown">
                    <more-icon width="20" height="20" class="fill-gray-500" transform="scale(1.3)"></more-icon>
                  </button>
                  <div class="dropdown-menu py-1">
                    <router-link :to="`/dashboard/team/members/${member.member.id}`" class="dropdown-item d-flex align-items-center px-2 cursor-pointer">Manage Member</router-link>
                    <span class="dropdown-item d-flex align-items-center px-2 cursor-pointer" @click="selectedMember = member; $refs['deleteModal'].show()">Remove</span>
                  </div>
                </div>
                <div
                  class="user-profile-image user-profile-image-sm d-inline-block mb-2"
                  :style="{
                    backgroundImage:
                      'url(' + member.member.member_user.profile_image + ')',
                  }"
                >
                  <span v-if="!member.member.member_user.profile_image">{{
                    member.member.member_user.initials
                  }}</span>
                </div>
                <h6 class="font-heading mb-0">{{ member.member.member_user.full_name }}</h6>
                <small class="text-secondary">{{ member.member.member_user.email }}</small>
              </div>
            </div>
          </template>

          <div v-else class="position-absolute-center text-center">
            <div class="h6 mb-3 font-weight-normal text-secondary">
              This organization does not have any members yet.
            </div>
            <button class="btn btn-white d-inline-flex align-items-center shadow-sm" type="button" @click="$refs['addMemberModal'].show()">Add Member</button>
          </div>
        </div>
      </div>
    </div>


    <modal ref="editModal" :close-button="false">
        <h5 class="font-heading">Edit Organization</h5>
        <vue-form-validate @submit="updateOrganization(organization)">
          <div class="form-group mb-1">
              <label class="form-label">Organization Name</label>
              <input
                type="text"
                class="form-control"
                v-model="newOrganizationName"
                data-required
              />
              <small class="text-muted">{{ slugify(newOrganizationName, {lower: true, strict: true}) }}</small>
          </div>
          <div class="d-flex mt-3">
            <button
              class="btn btn-light shadow-none"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary ml-auto"
              type="submit"
            >
              Save
            </button>
          </div>
        </vue-form-validate>
    </modal>

    <modal ref="addMemberModal" :close-button="false">
      <vue-form-validate @submit="addMembers">
        <h5 class="font-heading">Add Members</h5>
        <div class="form-group mb-1">
          <vue-select v-model="newMembers" :options="membersList" :required="true" multiple placeholder="Select members"></vue-select>
        </div>

        <div v-for="(member, index) in newMembers" :key="member.id" class="rounded bg-light p-2 d-flex align-items-center mb-1">
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
            @click="newMembers.splice(index, 1)"
          >
            <close-icon height="20" width="20"></close-icon>
          </button>
          </div>
        </div>

        <div class="d-flex mt-3">
          <button
            class="btn btn-light shadow-none"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-primary ml-auto"
            type="submit"
            @click="">
            Add Members
          </button>
        </div>
      </vue-form-validate>
    </modal>

    <modal ref="deleteModal" :close-button="false">
      <template v-if="selectedMember">
        <h5 class="font-heading text-center">Remove Member</h5>
        <p class="text-center mt-3">
          Are you sure to remove  <strong>{{ selectedMember.member.member_user.full_name }}</strong> from this organization?
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
            @click="deleteMember() "
          >
            Remove
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script src="./show.js"></script>

<style lang="scss" scoped src="./show.scss"></style>