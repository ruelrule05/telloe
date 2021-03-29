<template>
	<div class="screen-recorder" :hidden="!cameraReady || !$root.screenRecorder.conversation_id || $root.screenRecorder.status == 'ended'">
		<div class="mb-1 flex items-center">
			<div v-tooltip.top="'Close'">
				<button type="button" class="focus:outline-none rounded-full bg-gray-200 p-2 z-40" @click="close">
					<close-icon height="10" width="10" class="fill-current text-gray-600"></close-icon>
				</button>
			</div>
			<div class="ml-auto" v-show="hasRecorded && !isRecording" v-tooltip.top="'Go to chat'">
				<button type="button" class="focus:outline-none rounded-full bg-gray-200 p-2 z-40" @click="goToConversation()">
					<comment-icon width="12" height="12" transform="scale(1.7)" class="fill-current text-gray-600"></comment-icon>
				</button>
			</div>
		</div>

		<div class="recorder-content p-2 rounded">
			<div class="flex flex-row items-center">
				<div class="video-container relative rounded overflow-hidden">
					<video ref="videoPreview" hidden :hxidden="!cameraReady || isRecording || !hasRecorded" class="w-full h-full absolute video-preview outline-0" playsinline></video>
					<video :hiddenx="!cameraReady" ref="videoFile" class="w-full h-full bg-black block"></video>
				</div>

				<div class="flex-grow-1 relative">
					<div vx-if="fileOutput || cameraReady" class="pl-2">
						<div class="counter">
							<div v-if="duration || isRecording" class="mb-2 text-white text-center">{{ secondsToDuration(duration, 14, 5) }}</div>
						</div>

						<div class="text-center">
							<div class="inline-block">
								<button v-if="isRecording" class="video-control video-pause block" @click="pauseRecord"></button>
								<button v-else class="video-control video-record block" @click="startRecord"></button>
							</div>
						</div>

						<!-- 	<div class="d-flex">
							<div class="w-25">
								<button v-if="hasRecorded" @click="close" class="btn font-weight-bold mr-auto">Cancel</button>
							</div>
							<div class="flex-grow-1">
								<div>
									<button v-if="isRecording" class="video-control video-pause d-block bg-danger" @click="pauseRecord"></button>
									<button v-else class="video-control video-record d-block" @click="startRecord"></button>
								</div>
							</div>
							<div class="w-25">
								<button @click="submit" v-if="hasRecorded && recorderStatus == 'paused'" class="btn font-weight-bold ml-auto">Send</button>
							</div>
						</div> -->
					</div>
				</div>
			</div>

			<div v-if="hasFlash" class="camera-flash"></div>
		</div>
	</div>
</template>

<script src="./ScreenRecorder.js"></script>

<style scoped lang="scss" src="./ScreenRecorder.scss"></style>
