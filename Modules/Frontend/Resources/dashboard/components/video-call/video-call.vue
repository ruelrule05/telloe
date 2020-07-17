<template>
	<div class="modal fade" tabindex="-1" role="dialog" ref="modal" :class="[isShrinked ? 'is-shrinked shadow-sm rounded' : 'cursor-auto']">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content overflow-hidden rounded h-100">
                <div v-if="$root.callConversation" class="modal-body p-0 h-100">
			    	<div class="video-call w-100 overflow-hidden position-relative" v-cloak>
			    		<div v-if="!status" class="caller position-absolute-center text-center bg-white">
			    			<!-- Outgoing -->
			    			<div v-if="action == 'outgoing'">
		            			<div class="user-profile-image bg-light d-inline-block mb-2 shadow-sm position-relative" :style="{backgroundImage: 'url(' + $root.callConversation.member.profile_image + ')'}">
					                <span class="position-absolute-center text-gray" v-if="!$root.callConversation.member.profile_image">{{ $root.callConversation.member.initials }}</span>
					            </div>
					            <h3 class="font-heading">{{ $root.callConversation.member.full_name }}</h3>
					            <h6 class="font-weight-light mb-5">Calling..</h6>
					            <button type="button" class="btn btn-white btn-lg badge-pill line-height-1 px-2 border ml-1" @click="endCall()">
					                <close-icon></close-icon>
					            </button>
				            </div>

				            <!-- Incoming -->
			    			<div v-if="action == 'incoming'">
			    				<div class="user-profile-image bg-light d-inline-block mb-2 shadow-sm position-relative" :style="{backgroundImage: 'url(' + caller.profile_image + ')'}">
					                <span class="position-absolute-center text-gray" v-if="!caller.profile_image">{{ caller.initials }}</span>
					            </div>
					            <h3 class="font-heading">{{ caller.full_name }}</h3>
					            <h6 class="font-weight-light mb-5">is calling..</h6>
					            <button type="button" class="btn btn-danger btn-lg badge-pill line-height-1 px-2" @click="answerCall()">
					                <phone-icon fill="white"></phone-icon>
					            </button>
					            <button type="button" class="btn btn-white btn-lg badge-pill line-height-1 px-2 border ml-1" @click="endCall()">
					                <close-icon></close-icon>
					            </button>
			    			</div>
			        	</div>
			        	<div v-else-if="status == 'limit'" class="caller position-absolute-center text-center bg-white">
		        			<div class="position-absolute-center">
		        				<interview-icon width="70" height="70"></interview-icon>
		        				<div class="text-muted font-weight-light mt-2">This room is full. Please try again later.</div>
		        			</div>
			        	</div>


			    		<!-- Camera loader -->
				        <div v-if="!localCameraReady" class="position-absolute-center w-100 h-100 text-center bg-black camera-loader">
				            <div class="position-absolute-center">
				            	<div class="spinner-border text-primary" role="status"></div>
				           		<div class="text-white mt-3">Loading camera..</div>
				            </div>
				        </div>

						<!-- Ongoing -->
			    		<div class="bg-white w-100 h-100 position-relative ongoing-body">
							<!-- <button v-if="status == 'ongoing'" @click="recordCall" class="btn btn-sm btn-white border btn-record position-absolute d-flex align-items-center">
								<i :class="{'bg-gray': !isRecording}"></i>&nbsp;{{ isRecording ? 'Stop recording' : 'Record this call' }}</span>
							</button> -->

							<!-- Local camera -->
							<div class="preview-wrapper" :class="{'preview-thumb': status == 'ongoing', 'd-none': isShrinked}">
								<div class="video-container h-100 w-100" :class="{'mirror': isScreenSharing}">
									<video ref="cameraPreview" @onplaying="localCameraReady = true" :class="{'w-100 h-100 position-absolute-center': !status}" autoplay playsinline muted></video>
								</div>
							</div>
							
							<!-- Remote camera -->
							<canvas ref="preview" class="position-absolute-center opacity-0 bg-black"></canvas>
							<div ref="remoteStreams" id="remote-streams" class="position-absolute-center w-100 h-100 d-flex">
							</div>
							

							<div id="recorderControls" class="position-absolute w-100 text-center" v-if="status == 'ongoing'">
					        	<template v-if="!isShrinked">
						            <button type="button" class="btn btn-white border btn-lg badge-pill line-height-1 position-relative" :class="[isShrinked ? 'p-1' : 'px-2']" @click="toogleMic()">
						                <microphone-icon :class="{'fill-danger': isMuted}"></microphone-icon>
						                <span v-if="isMuted" class="disabled-line"></span>
						            </button>
						            <button type="button" class="btn btn-danger btn-lg badge-pill line-height-1" :class="[isShrinked ? 'p-1 mx-1' : 'px-2 mx-2']" @click="endCall()">
						                <phone-icon fill="white"></phone-icon>
						            </button>
						            <button type="button" class="btn btn-white border btn-lg badge-pill line-height-1 position-relative" :class="[isShrinked ? 'p-1' : 'px-2']" @click="toggleVideo()">
						                <video-icon :class="{'fill-danger': isVideoStopped}"></video-icon>
						                <span v-if="isVideoStopped" class="disabled-line"></span>
						            </button>
						        </template>
					        </div>

					        <div v-if="status == 'ongoing'" class="btn-share-screen position-absolute">
					        	<template v-if="!isShrinked">
							        <button type="button" v-if="!isScreenSharing" class="btn btn-white border badge-pill p-1 line-height-1" @click="shareScreen">
							            <duplicate-alt-icon width="20" height="20"></duplicate-alt-icon>
							        </button>
							        <button type="button" v-else class="btn btn-white border badge-pill line-height-1 p-1" @click="stopShareScreen">
							            <duplicate-alt-icon fill="red" width="20" height="20"></duplicate-alt-icon>
							        </button>
							        <button type="button" v-if="!isFullScreen" class="btn btn-white border badge-pill line-height-1 p-1 ml-1" @click="fullScreen(true)">
							            <expand-icon width="20" height="20"></expand-icon>
							        </button>
							        <button type="button" v-else class="btn btn-white border badge-pill line-height-1 p-1 ml-1" @click="fullScreen(false)">
							            <collapse-icon width="20" height="20"></collapse-icon>
							        </button>
					        	</template>
						        <button type="button" class="btn btn-white border badge-pill line-height-1 p-1 ml-1" @click="isShrinked = !isShrinked; toggleDraggable()">
						            <arrow-top-right-icon v-if="isShrinked" width="20" height="20"></arrow-top-right-icon>
							        <arrow-bottom-left-icon v-else width="20" height="20"></arrow-bottom-left-icon>
						        </button>
					        </div>
				        </div>

						
						<!-- Recorded videos -->
				        <div v-if="status == 'ended' && recordedData.length > 0" class="recorded-data position-fixed w-100 h-100 bg-light">
				        	<div class="text-right mb-2 pr-1">
				        		<button class="btn close position-static float-none p-0 m-0" @click="close"><close-icon width="30" height="30"></close-icon></button>
				        	</div>
				        	<div class="d-flex px-2 py-3 flex-wrap">
					        	<div class="w-50 px-2 mb-3 recorded position-relative" v-for="recorded in recordedData">
				        			<div class="rounded recorded-preview" :style="{backgroundImage: 'url('+recorded.preview+')'}"></div>
				        			<div>{{ recorded.duration }}</div>
				        			<div class="position-absolute-center w-100 text-center">
				        				<button class="btn btn-sm btn-white d-inline-flex align-items-center" @click="downloadRecorded(recorded)">
					        				<download-icon transform="scale(0.75)"></download-icon> Download
					        			</button>
					        			<button class="btn btn-sm btn-white d-inline-flex align-items-center" :disabled="recorded.sent" @click="sendRecorded(recorded)">
					        				{{ recorded.sent ? 'Sent' : 'Send' }} <arrow-right-icon></arrow-right-icon>
					        			</button>
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

<script src="./video-call.js"></script>
<style scoped lang="scss" src="./video-call.scss"></style>