<template>
	<div class="modal fade" tabindex="-1" role="dialog" ref="audioRecorderModal">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<div class="h-100">
						<div class="audio-recorder overflow-hidden">
							<div class="d-flex flex-column h-100">
								<div class="d-flex w-100">
									<button type="button" class="btn ml-auto shadow-none" data-dismiss="modal" @click="close">
										<close-icon height="36" width="36"></close-icon>
									</button>
								</div>

								<div class="flex-grow-1 h-100 d-flex flex-column position-relative text-center">
									<div v-if="!hasRecorded" class="text-center position-absolute-center w-100">
										<div class="h6 mb-0">Click to start recording</div>
									</div>

									<div v-if="duration || recorderStatus">
										<div class="pt-4 d-inline-block text-center font-weight-light">
											<div class="h2 mb-0">{{ secondsToDuration(duration) }}</div>
											<div class="d-flex align-items-center">
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

									<!-- wavesurfer -->
									<div class="position-absolute-center w-100 wavesurfer-container">
										<div id="wavesurfer"></div>
										<div v-if="hasRecorded && recorderStatus == 'paused'" class="player-control position-absolute-center">
											<button class="btn btn-sm btn-white border-0 badge-pill py-2" @click="togglePlayer">
												<play-icon width="15" height="15" v-if="playerStatus == 'paused'"></play-icon>
												<pause-icon width="15" height="15" v-else-if="playerStatus == 'playing'"></pause-icon>
											</button>
										</div>
									</div>
								</div>

								<!-- Controls -->
								<div v-if="micReady" class="flex-fill w-100 text-center px-5 pb-5">
									<div class="d-flex align-items-center text-center">
										<div class="w-25">
											<button v-if="hasRecorded" @click="close" data-dismiss="modal" class="btn font-weight-bold mr-auto">Cancel</button>
										</div>

										<div class="flex-grow-1">
											<button v-if="recorderStatus == 'recording'" class="audio-control audio-pause" @click="pauseRecord"></button>
											<button v-else class="audio-control audio-record" @click="startRecord">
												<microphone-icon fill="white"></microphone-icon>
											</button>
										</div>

										<div class="w-25">
											<button @click="submit" v-if="hasRecorded && recorderStatus == 'paused'" class="btn font-weight-bold ml-auto">Send</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./AudioRecorder.js"></script>

<style scoped lang="scss">
.wavesurfer-container {
	.btn {
		opacity: 0;
	}
	&:hover {
		.btn {
			opacity: 1;
		}
	}
}
.audio-recorder {
	height: 500px;
}
.player-control {
	z-index: 10;
	button {
		line-height: 1 !important;
		padding: 15px !important;
		position: relative;
		svg {
			position: absolute;
			line-height: 1 !important;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
.audio-control {
	border: 0 !important;
	outline: 0 !important;
	width: 50px;
	height: 50px;
	border-radius: 50% !important;
	background-color: #4a4a4a;
	position: relative;
	vertical-align: top;
	&.audio-pause {
		&:before {
			content: '';
			position: absolute;
			top: 50%;
			left: 19px;
			transform: translateY(-50%);
			width: 2px;
			height: 35%;
			background-color: #fff;
			border-radius: 5px;
		}
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			left: 27px;
			transform: translateY(-50%);
			width: 2px;
			height: 35%;
			background-color: #fff;
			border-radius: 5px;
		}
	}
}
</style>
