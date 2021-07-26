<template>
	<div>
		<div class="video-call-modal-container" ref="videoCallModal" :class="{ open: open, shrinked: isShrinked }">
			<button
				v-if="isShrinked"
				class="btn-call-expand top-3 right-3 border border-white rounded-full p-2 focus:outline-none text-white"
				type="button"
				@click="
					isShrinked = false;
					toggleDraggable();
				"
			>
				<ExpandIcon height="10" width="10" transform="scale(1.6)" class="fill-current"></ExpandIcon>
			</button>
			<microphone-mute-icon class="hidden fill-current text-red-600" ref="microphoneMute"></microphone-mute-icon>
			<!-- Outgoing -->
			<div class="modal-body col-start-5 col-span-3 text-center bg-white" v-if="action == 'outgoing'">
				<template v-if="!gettingDevices">
					<template v-if="hasDevices">
						<div class="p-8">
							<h6 class="text-primary font-serif font-semibold mb-10">CALLING...</h6>
							<div class="profile-image profile-image-xl mb-1 inline-block" :style="{ backgroundImage: 'url(' + $root.callConversation.member.profile_image + ')' }">
								<span v-if="!$root.callConversation.member.profile_image">{{ $root.callConversation.member.initials }}</span>
							</div>
							<h3 class="mb-8">{{ $root.callConversation.member.full_name || $root.callConversation.name }}</h3>
						</div>
						<div class="bg-secondary-light p-8 flex items-center justify-center">
							<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="toggleVideo">
								<video-muted-icon v-if="isVideoStopped" height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></video-muted-icon>
								<videocam-icon v-else height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></videocam-icon>
							</button>
							<button class="mx-2 bg-red-600 border border-red-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="endCall(true, true)"><call-menu-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></call-menu-icon></button>
							<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="toggleMic">
								<microphone-mute-icon v-if="isMuted" height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></microphone-mute-icon>
								<microphone-icon v-else height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></microphone-icon>
							</button>
						</div>
					</template>
					<div v-else class="pt-10 pb-6 px-4 text-center">
						<video-muted-icon height="30" width="30" class="fill-current text-gray-400 inline-block"></video-muted-icon>
						<p class="text-sm mt-6 mb-6">There are no input devices found. Please connect your webcam and microphone to start a call. <br /><br />Click <a href="https://docs.telloe.com/communication" target="_blank" class="text-blue-500 underline">here</a> for more information.</p>

						<button class="btn btn-md btn-outline-primary" type="button" @click="endCall(false)"><span>Close</span></button>
					</div>
				</template>
			</div>

			<!-- Incoming -->
			<div class="modal-body col-start-5 col-span-3 text-center bg-white" v-else-if="action == 'incoming'">
				<div class="p-8">
					<h6 class="text-primary font-serif font-semibold mb-10 uppercase">{{ caller.first_name }} IS CALLING...</h6>
					<div class="profile-image profile-image-xl mb-1 inline-block" :style="{ backgroundImage: 'url(' + caller.profile_image + ')' }">
						<span v-if="!caller.profile_image">{{ caller.initials }}</span>
					</div>
					<h3 class="mb-8">{{ caller.full_name || caller.name }}</h3>
				</div>

				<template v-if="!gettingDevices">
					<template v-if="hasDevices">
						<div class="bg-secondary-light p-8 flex items-center justify-center">
							<button class="bg-red-600 border border-red-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="rejectCall()"><close-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></close-icon></button>
							<button class="ml-2 bg-green-600 border border-green-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="answerCall()"><call-menu-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></call-menu-icon></button>
						</div>
					</template>

					<div v-else class="pb-6 px-4 text-center">
						<p class="text-sm mb-6">There are no input devices found. Please connect your webcam and microphone to start a call. <br /><br />Click <a href="https://docs.telloe.com/communication" target="_blank" class="text-blue-500 underline">here</a> for more information.</p>

						<button class="btn btn-md btn-outline-primary" type="button" @click="rejectCall()"><span>Close</span></button>
					</div>
				</template>
			</div>

			<!-- Ongoing -->
			<div v-show="status == 'ongoing'" ref="ongoingModal" class="modal-ongoing h-screen w-screen flex flex-col overflow-hidden" :class="{ shrinked: isShrinked }">
				<div class="cameras-container" :class="{ 'has-presenter': presenter && presenter != $root.auth.id }">
					<!-- Local camera -->
					<div class="p-3 camera-thumbnails">
						<div class="preview" :class="{ hidden: isShrinked || status != 'ongoing', mirror: isScreenSharing }">
							<div v-if="isVideoStopped" class="profile-image profile-image-preview" :style="{ backgroundImage: 'url(' + $root.auth.profile_image + ')' }">
								<span v-if="isVideoStopped && !$root.auth.profile_image" class="text-secondary position-absolute-center">{{ $root.auth.initials }}</span>
							</div>
							<video ref="cameraPreview" @onplaying="localCameraReady = true" class="w-auto h-full rounded-xl pointer-events-none" autoplay playsinline muted :class="{ hidden: isVideoStopped }"></video>
						</div>
					</div>

					<!-- Remote cameras -->
					<div class="flex flex-grow overflow-hidden w-full relative" id="remote-streams-container">
						<div v-show="presenter && presenter != $root.auth.id" id="presenter-container" class="flex-grow"></div>
						<div ref="remoteStreams" id="remote-streams" class="overflow-hidden flex-grow flex justify-center" :class="{ 'opacity-0': !status, 'shrink-right': presenter && presenter != $root.auth.id }">
							<div v-if="presenter && presenter != $root.auth.id && presenterUser" class="presenter-label">{{ presenterUser.full_name }} Presenting</div>
						</div>
					</div>
				</div>

				<!-- Buttons -->
				<div class="flex items-center justify-between p-4 call-buttons">
					<div class="w-3/12">
						<button
							class="mx-2 border border-primary rounded-full p-4 focus:outline-none text-primary"
							type="button"
							@click="
								isShrinked = true;
								toggleDraggable();
							"
						>
							<CollapseIcon height="10" width="10" transform="scale(2.5)" class="fill-current"></CollapseIcon>
						</button>
					</div>
					<div class="w-6/12 text-center">
						<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="toggleVideo">
							<video-muted-icon v-if="isVideoStopped" height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></video-muted-icon>
							<videocam-icon v-else height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></videocam-icon>
						</button>
						<button class="mx-2 bg-red-600 border border-red-600 rounded-full p-4 focus:outline-none text-white" type="button" data-action="login" @click="endCall(true, true)"><call-menu-icon height="10" width="10" transform="scale(1.6)" class="fill-current"></call-menu-icon></button>
						<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="toggleMic">
							<microphone-mute-icon v-if="isMuted" height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></microphone-mute-icon>
							<microphone-icon v-else height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></microphone-icon>
						</button>
					</div>
					<div class="w-3/12 flex items-center justify-end">
						<button v-if="presenter && presenter == $root.auth.id" type="button" class="btn btn-sm btn-outline-red inline-flex items-center mr-2" @click="stopShareScreen" :class="{ disabled: presenter && presenter != $root.auth.id }"><screenshare-icon class="fill-current mr-2"></screenshare-icon><span>Stop Presenting</span></button>
						<button v-else type="button" class="btn btn-sm btn-outline-primary inline-flex items-center mr-2" @click="shareScreen" :class="{ disabled: presenter && presenter != $root.auth.id }"><screenshare-icon class="fill-current mr-2"></screenshare-icon><span>Present</span></button>
						<button
							type="button"
							class="btn btn-sm btn-outline-primary inline-flex items-center relative"
							@click="
								showMessages = true;
								hasNewMessage = false;
							"
						>
							<send-icon class="fill-current mr-2"></send-icon><span>Message</span>
							<div v-if="hasNewMessage" class="rounded-full w-2 h-2 absolute top-0 right-0 bg-red-600"></div>
						</button>
					</div>
				</div>
			</div>

			<div v-if="conversation" class="messages-container" :class="{ open: showMessages }">
				<div class="border-bottom flex items-center justify-between p-8">
					<div class="font-serif text-muted font-semibold">MESSAGES</div>
					<button type="button" @click="showMessages = false" class="rounded-full p-2 border text-gray-600 ml-1 transition-colors hover:bg-gray-200 focus:outline-none"><CloseIcon class="fill-current"></CloseIcon></button>
				</div>
				<div class="flex-grow overflow-hidden h-full">
					<Messages ready :conversation="conversation"></Messages>
				</div>
			</div>

			<div class="modal-backdrop"></div>
		</div>
	</div>
</template>

<script src="./video-call.js"></script>
<style lang="scss" src="./video-call.scss"></style>
