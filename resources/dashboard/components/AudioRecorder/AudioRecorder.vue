<template>
	<div class="absolute top-0 peft-0 w-full h-full z-50 bg-white" v-show="ready">
		<button type="button" class="absolute top-1 right-1 focus:outline-none rounded-full transition-colors hover:bg-gray-200 p-2 z-40" @click="close">
			<close-icon height="16" width="16" class="fill-current text-gray-600"></close-icon>
		</button>
		<div class="audio-recorder overflow-hidden absolute-center w-full">
			<div v-if="!hasRecorded" class="text-center absolute-center w-full">
				<div class="mb-4">Click to start recording</div>
				<button type="button" class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-primary hover:text-white text-primary" @click="startRecord">
					<microphone-icon class="fill-current"></microphone-icon>
				</button>
			</div>
			<div v-show="hasRecorded" class="flex flex-col h-full">
				<div class="flex-grow h-full flex flex-col relative text-center">
					<!-- wavesurfer -->
					<div class="wavesurfer-container">
						<div id="wavesurfer"></div>
					</div>

					<div v-if="duration || recorderStatus">
						<div class="pt-4 inline-block text-center font-light">
							<div class="text-4xl font-semibold">{{ secondsToDuration(duration) }}</div>
							<div class="flex items-center">
								<template v-if="recorderStatus == 'recording'">
									<span class="chat-status bg-danger">&nbsp;</span>&nbsp;
									<small class="text-gray">Rec</small>
								</template>
								<template v-else-if="recorderStatus == 'paused'">
									<span class="chat-status bg-gray">&nbsp;</span>&nbsp;
									<small class="text-gray">Paused</small>
								</template>
							</div>
						</div>
					</div>
				</div>

				<!-- Controls -->
				<div v-if="micReady" class="flex-fill w-full text-center px-5 pb-5">
					<div class="flex items-center text-center">
						<div v-if="recorderStatus != 'recording'" class="player-control text-center flex-grow flex items-center justify-center">
							<button type="button" v-if="recorderStatus == 'paused'" class="border rounded-full p-4 focus:outline-none transition-colors bg-primary text-white" @click="togglePlayer">
								<play-icon v-if="playerStatus == 'paused'" class="fill-current"></play-icon>
								<pause-icon v-else-if="playerStatus == 'playing'" class="fill-current"></pause-icon>
							</button>
							<button type="button" @click="submit" v-if="hasRecorded && recorderStatus == 'paused'" class="btn">Send</button>
						</div>

						<div v-else class="flex-grow">
							<button type="button" v-if="recorderStatus == 'recording'" class="audio-control audio-pause" @click="pauseRecord"></button>
							<button type="button" v-else class="audio-control audio-record" @click="startRecord">
								<microphone-icon fill="white"></microphone-icon>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./AudioRecorder.js"></script>

<style scoped lang="scss" src="./AudioRecorder.scss"></style>
