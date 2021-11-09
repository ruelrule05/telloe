<template>
	<div class="service-card">
		<span v-if="service.parent_service_id" class="assigned"> ASSIGNED</span>
		<div class="flex justify-between">
			<div>
				<div v-if="service.types.length > 0" class="flex bg-secondary rounded-xl items-center px-1 py-2">
					<MapMarkerIcon v-if="service.types.find(x => x.type == 'Face-to-face')" class="w-4 h-4 fill-current text-primary mx-1"></MapMarkerIcon>
					<PhoneIcon v-if="service.types.find(x => x.type == 'Phone')" class="w-4 h-4 fill-current text-primary mx-1"></PhoneIcon>
					<GoogleMeetIcon v-if="service.types.find(x => x.type == 'Google Meet')" class="w-4 h-4 fill-current text-primary mx-1"></GoogleMeetIcon>
					<SkypeIcon v-if="service.types.find(x => x.type == 'Skype')" class="w-4 h-4 fill-current text-primary mx-1"></SkypeIcon>
					<img src="/logo.svg" v-if="service.types.find(x => x.type == 'Telloe Video Call')" class="w-4 h-4 mx-1" />
					<ZoomIcon v-if="service.types.find(x => x.type == 'Zoom')" class="w-4 h-4 fill-current text-primary mx-1"></ZoomIcon>
				</div>
			</div>
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
		<h6 class="text-primary font-bold mt-6 mb-1 hover:underline cursor-pointer" @click="serviceAction('Edit')">{{ service.name }}</h6>
		<div class="text-sm">
			<strong class="text-gray-400 font-bold">{{ service.duration }} min</strong>
			<span v-if="service.default_rate > 0" class="ml-2 text-muted"> $ {{ service.default_rate }} </span>
		</div>

		<div class="mt-5 members-container">
			<div v-for="assignedService in service.assigned_services" :key="assignedService.id" class="-mr-2 border-2 border-gray-50 rounded-full relative">
				<div
					class="profile-image profile-image-sm"
					:style="{
						backgroundImage: 'url(' + assignedService.user.profile_image + ')'
					}"
				>
					<span v-if="!assignedService.user.profile_image">{{ assignedService.user.initials }}</span>
				</div>
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
