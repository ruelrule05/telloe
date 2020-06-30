<template>
	<div class="screen-recorder" :hidden="!cameraReady || !$root.screenRecorder.conversation_id || $root.screenRecorder.status == 'ended'">
		<div class="mb-1 d-flex">
			<div v-tooltip.top="'Close'">
				<button type="button" class="btn sm p-1 line-height-0 badge-pill btn-light border" @click="close">
					<close-icon width="12" height="12" transform="scale(2)"></close-icon>
				</button>
			</div>
			<div class="ml-auto" v-if="hasRecorded && !isRecording" v-tooltip.top="'Go to chat'">
				<button type="button" class="btn btn sm p-1 line-height-0 badge-pill btn-light border" @click="goToConversation()">
					<comment-icon width="12" height="12" transform="scale(1.7)"></comment-icon>
				</button>
			</div>
		</div>

	    <div class="recorder-content p-2 rounded">
			<div class="d-flex flex-row align-items-center">
				<div class="video-container position-relative rounded overflow-hidden">
					<video ref="videoPreview" hidden :hxidden="!cameraReady || isRecording || !hasRecorded" class="w-100 h-100 bg-black position-absolute video-preview outline-0" playsinline controls></video>
					<video :hiddenx="!cameraReady" ref="videoFile" class="w-100 h-100 bg-black d-block"></video>
				</div>

				<div class="flex-grow-1 position-relative">
					<div vx-if="fileOutput || cameraReady" class="pl-2">
						<div class="counter">
							<div v-if="duration || isRecording" class="mb-2 font-weight-light h6 text-white text-center">{{ secondsToDuration(duration, 14, 5) }}</div>
						</div>

						<div class="text-center">
							<div class="d-inline-block">
								<button v-if="isRecording" class="video-control video-pause bg-danger d-block" @click="pauseRecord"></button>
								<button v-else class="video-control video-record d-block" @click="startRecord"></button>
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

<script src="./screen-recorder.js"></script>

<style scoped lang="scss" src="./screen-recorder.scss"></style>
