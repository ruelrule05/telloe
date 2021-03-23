<template>
	<div>
		<div class="video-call-modal-container" :class="{ open: open }">
			<microphone-mute class="hidden fill-current text-red-600" ref="microphoneMute"></microphone-mute>
			<!-- Outgoing -->
			<div class="modal-body col-start-5 col-span-3 text-center" v-if="action == 'outgoing'">
				<div class="p-6">
					<h6 class="text-primary font-serif font-semibold mb-10">CALLING...</h6>
					<div class="profile-image mb-1 inline-block" :style="{ backgroundImage: 'url(' + $root.callConversation.member.profile_image + ')' }">
						<span v-if="!$root.callConversation.member.profile_image">{{ $root.callConversation.member.initials }}</span>
					</div>
					<h3 class="mb-8">{{ $root.callConversation.member.full_name || $root.callConversation.name }}</h3>
				</div>
				<div class="bg-secondary-light p-6 flex items-center justify-center">
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" data-action="login"><videocam-icon height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></videocam-icon></button>
					<button class="mx-2 bg-red-600 border border-red-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="endCall(true, true)"><call-menu-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></call-menu-icon></button>
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" data-action="login"><microphone-icon height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></microphone-icon></button>
				</div>
			</div>

			<!-- Incoming -->
			<div class="modal-body col-start-5 col-span-3 text-center" v-else-if="action == 'incoming'">
				<div class="p-6">
					<h6 class="text-primary font-serif font-semibold mb-10 uppercase">{{ caller.first_name }} IS CALLING...</h6>
					<div class="profile-image mb-1 inline-block" :style="{ backgroundImage: 'url(' + caller.profile_image + ')' }">
						<span v-if="!caller.profile_image">{{ caller.initials }}</span>
					</div>
					<h3 class="mb-8">{{ caller.full_name || caller.name }}</h3>
				</div>
				<div class="bg-secondary-light p-6 flex items-center justify-center">
					<button class="bg-red-600 border border-red-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="rejectCall()"><close-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></close-icon></button>
					<button class="ml-2 bg-green-600 border border-green-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="answerCall()"><call-menu-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></call-menu-icon></button>
				</div>
			</div>

			<!-- Ongoing -->
			<div v-show="status == 'ongoing'" class="h-screen w-screen flex flex-col">
				<!-- Local camera -->
				<div class="p-3">
					<div class="preview" :class="{ hidden: isShrinked || status != 'ongoing', 'profile-image': isVideoStopped, mirror: isScreenSharing }">
						<video ref="cameraPreview" @onplaying="localCameraReady = true" class="w-auto h-full rounded-xl" autoplay playsinline muted></video>
						<span v-if="isVideoStopped" class="absolute-center w-full h-full rounded-full bg-light" :style="{ backgroundImage: 'url(' + $root.auth.profile_image + ')' }">
							<span v-if="!$root.auth.profile_image" class="text-secondary position-absolute-center">{{ $root.auth.initials }}</span>
						</span>
					</div>
				</div>

				<!-- Remote camersa -->
				<div class="flex flex-grow overflow-hidden w-full" :class="{ 'has-presenter': presenter }" id="remote-streams-container">
					<div id="presenter-container" class="bg-dark" :class="{ 'flex-grow-1': presenter && presenter != $root.auth.id }"></div>
					<div ref="remoteStreams" id="remote-streams" class="overflow-hidden flex-grow" :class="{ 'opacity-0': !status, 'shrink-right': presenter && presenter != $root.auth.id }">
						<div v-if="presenter && presenter != $root.auth.id && presenterUser" class="presenter-thumbnail bg-white mb-3 text-center position-relative">
							<div class="position-absolute-center w-100 p-3">
								<div class="presenter-profile-image d-inline-block rounded-circle bg-light position-relative" :style="{ backgroundImage: 'url(' + presenterUser.profile_image + ')' }">
									<span v-if="!presenterUser.profile_image" class="text-secondary position-absolute-center">{{ presenterUser.initials }}</span>
								</div>
								<h6 class="h5 mb-1 text-ellipsis">{{ presenterUser.full_name }}</h6>
								<span class="text-success">PRESENTING</span>
							</div>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-center p-4">
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" data-action="login"><videocam-icon height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></videocam-icon></button>
					<button class="mx-2 bg-red-600 border border-red-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="endCall(true, true)"><call-menu-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></call-menu-icon></button>
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" data-action="login"><microphone-icon height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></microphone-icon></button>
				</div>
			</div>

			<div class="modal-backdrop"></div>
		</div>
	</div>
</template>

<script src="./video-call.js"></script>
<style lang="scss" src="./video-call.scss"></style>
