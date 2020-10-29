<template>
  <div v-if="organization" class="w-100 h-100 overflow-hidden">
    <div class="overflow-auto h-100">
      <div class="p-3">
        <button
          class="btn p-1 btn-white badge-pill shadow-sm"
          type="button"
          @click="$router.push('/dashboard/team/organizations')"
        >
          <arrow-left-icon width="30" height="30"></arrow-left-icon>
        </button>
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
          <div v-for="member in organization.members" :key="member.id" class="col-md-3">
            <div class="bg-white rounded p-3 shadow-sm text-center">
            <h6>{{ member.member.member_user.full_name }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./show.js"></script>

<style lang="scss" scoped src="./show.scss"></style>