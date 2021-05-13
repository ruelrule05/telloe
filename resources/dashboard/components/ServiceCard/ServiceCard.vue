<template>
	<div class="service-card">
		<div class="flex justify-between">
			<div class="rounded-xl border border-gray-300 bg-secondary w-9 h-5">&nbsp;</div>
			<div>
				<VueDropdown :options="actions" @click="serviceAction" class="-mr-2 -mt-2">
					<template #button>
						<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
							<CogIcon class="fill-current text-gray-400"></CogIcon>
						</div>
					</template>
				</VueDropdown>
			</div>
		</div>
		<h6 class="text-primary font-bold mt-6 mb-1">{{ service.name }}</h6>
		<div class="text-sm">
			<strong class="text-gray-400 font-bold">{{ service.duration }} min</strong>
			<span v-if="service.default_rate > 0" class="ml-2 text-muted"> $ {{ service.default_rate }} </span>
		</div>

		<div class="mt-5 members-container">
			<div
				v-for="assignedService in service.assigned_services"
				:key="assignedService.id"
				class="profile-image profile-image-sm"
				:style="{
					backgroundImage: 'url(' + assignedService.member.member_user.profile_image + ')'
				}"
			>
				<span v-if="!assignedService.member.member_user.profile_image">{{ assignedService.member.member_user.initials }}</span>
			</div>
		</div>

		<div class="mt-3 flex justify-between items-end">
			<button type="button" class="btn btn-sm btn-outline-primary" @click="copyLink"><span>Copy Link</span></button>
			<div class="flex items-center">
				<span v-if="service.is_available" class="text-xs mr-2">Active</span>
				<toggle-switch class="ml-auto" @input="updateServiceStatus($event, service)" v-model="service.is_available"></toggle-switch>
			</div>
		</div>
	</div>
</template>

<script src="./ServiceCard.js"></script>

<style lang="scss" scoped src="./ServiceCard.scss"></style>
