<template>
	<div>
		<transition name="fade">
			<div v-if="open" class="video-call-modal-container position-fixed w-100 h-100">
				<div class="modal video-call-modal show d-block" role="dialog" ref="modal" :class="[isShrinked ? 'is-shrinked shadow-sm rounded show' : 'cursor-auto', {'is-fullscreen show': status == 'ongoing'}]">
			        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
			            <div class="modal-content rounded h-100">
			                <div v-if="$root.callConversation" class="modal-body p-0 h-100 rounded" :class="{'overflow-hidden': isShrinked}">
						    	<div class="video-call w-100 position-relative rounded" v-cloak>
						    		<div v-if="!status" class="caller position-absolute-center text-center bg-white">
						    			<!-- Outgoing -->
						    			<div v-if="action == 'outgoing'">
					            			<div class="user-profile-image bg-light d-inline-block mb-2 shadow-sm position-relative" :style="{backgroundImage: 'url(' + $root.callConversation.member.profile_image + ')'}">
								                <span class="position-absolute-center text-gray" v-if="!$root.callConversation.member.profile_image">{{ $root.callConversation.member.initials }}</span>
								            </div>
								            <h3 class="font-heading">{{ $root.callConversation.member.full_name || $root.callConversation.name }}</h3>
								            <h6 class="font-weight-light mb-5">Calling..</h6>
								            <!-- <button type="button" class="btn btn-white btn-lg badge-pill line-height-1 px-2 border ml-1" @click="endCall()">
								                <close-icon></close-icon>
								            </button> -->
							            </div>

							            <!-- Incoming -->
						    			<div v-if="action == 'incoming'">
						    				<div class="user-profile-image bg-light d-inline-block mb-2 shadow-sm position-relative" :style="{backgroundImage: 'url(' + caller.profile_image + ')'}">
								                <span class="position-absolute-center text-gray" v-if="!caller.profile_image">{{ caller.initials }}</span>
								            </div>
								            <h3 class="font-heading">{{ caller.full_name || $root.callConversation.name }}</h3>
								            <h6 class="font-weight-light mb-5">is calling..</h6>
								            <!-- <button type="button" class="btn btn-success btn-lg badge-pill line-height-1 px-2" @click="answerCall()">
								                <call-menu-icon fill="white"></call-menu-icon>
								            </button> -->
						    			</div>
						        	</div>
						        	<div v-else-if="status == 'limit'" class="caller position-absolute-center text-center bg-white w-100">
					        			<div class="position-absolute-center w-100">
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
						    		<div class="bg-white w-100 h-100 position-relative ongoing-body d-flex flex-column rounded overflow-hidden">
						    			<div class="py-3 px-3 call-topbar position-absolute w-100" v-if="status == 'ongoing' && !isShrinked">
						    				<h5 class="font-heading mb-0 text-white">{{ $root.callConversation.member.full_name || $root.callConversation.name }}</h5>
						    				<!-- <button @click="endCall()" class="btn btn-sm btn-close p-0 position-absolute">
												<close-icon width="36" height="36"></close-icon>
											</button> -->
						    			</div>
										<!-- <button v-if="status == 'ongoing'" @click="recordCall" class="btn btn-sm btn-white border btn-record position-absolute d-flex align-items-center">
											<i :class="{'bg-gray': !isRecording}"></i>&nbsp;{{ isRecording ? 'Stop recording' : 'Record this call' }}</span>
										</button> -->

										<!-- Local camera -->
										<div class="preview-wrapper preview-thumb" :class="{'d-none': isShrinked || status != 'ongoing', 'profile-image': isVideoStopped}">
											<div class="video-container h-100 w-100" :class="{'mirror': isScreenSharing, 'd-none': isVideoStopped}">
												<video ref="cameraPreview" @onplaying="localCameraReady = true" class="w-100 h-auto" autoplay playsinline muted></video>
											</div>
											<span v-if="isVideoStopped" class="position-absolute-center w-100 h-100 rounded-circle bg-light" :style="{backgroundImage: 'url('+$root.auth.profile_image+')'}">
												<span v-if="!$root.auth.profile_image" class="text-secondary position-absolute-center">{{ $root.auth.initials }}</span>
											</span>
										</div>
										
										<!-- Remote camera -->
										<canvas ref="preview" class="position-absolute-center opacity-0 bg-black"></canvas>
										<div class="d-flex flex-grow-1 overflow-hidden" :class="{'has-presenter': presenter}" id="remote-streams-container">
											<div id="presenter-container" class="bg-dark" :class="{'flex-grow-1': presenter && presenter != $root.auth.id}">
											</div>
											<div ref="remoteStreams" id="remote-streams" class="overflow-hidden" :class="{'opacity-0': !status, 'shrink-right': presenter && presenter != $root.auth.id}">
												<div v-if="presenter && presenter != $root.auth.id && presenterUser" class="presenter-thumbnail bg-white mb-3 text-center position-relative">
													<div class="position-absolute-center w-100 p-3">
														<div class="presenter-profile-image d-inline-block rounded-circle bg-light position-relative" :style="{backgroundImage: 'url('+presenterUser.profile_image+')'}">
															<span v-if="!presenterUser.profile_image" class="text-secondary position-absolute-center">{{ presenterUser.initials }}</span>
														</div>
														<h6 class="h5 mb-1 text-ellipsis">{{ presenterUser.full_name }}</h6>
														<span class="text-success">PRESENTING</span>
													</div>
												</div>
											</div>
										</div>
										

										<div id="recorderControls" class="text-center px-3 d-flex align-items-center call-bottombar" :class="{'py-2': !isShrinked}">
							        		<div class="w-25"></div>
							        		<div class="text-center flex-grow-1 mainControls">
							        			<template v-if="!isShrinked">
										            <button type="button" class="btn btn-white border btn-lg badge-pill position-relative" :class="[isShrinked ? 'p-1' : 'px-2']" @click="toogleMic()">
										                <microphone-alt-icon class="position-absolute-center"></microphone-alt-icon>
										                <span v-if="isMuted" class="disabled-line"></span>
										            </button>
										            <button type="button" class="btn btn-white border btn-lg badge-pill position-relative" :class="[isShrinked ? 'p-1' : 'px-2 mx-2']" @click="toggleVideo()">
										                <videocam-icon :class="{'fill-danger': isVideoStopped}" class="position-absolute-center"></videocam-icon>
										                <span v-if="isVideoStopped" class="disabled-line"></span>
										            </button>
													
													<template v-if="isIncoming">
											            <button type="button" class="btn btn-success btn-lg badge-pill px-2 position-relative" @click="answerCall()">
											                <call-menu-icon fill="white" class="position-absolute-center"></call-menu-icon>
											            </button>
											            <button type="button" class="btn btn-danger btn-lg badge-pill px-2 border ml-2 position-relative" @click="rejectCall()">
											                <close-icon class="fill-white position-absolute-center"></close-icon>
											            </button>
													</template>
										            <button v-else type="button" class="btn btn-danger btn-lg badge-pill position-relative" :class="[isShrinked ? 'p-1 mx-1' : 'px-2']" @click="endCall()">
										                <call-menu-icon fill="white" class="position-absolute-center"></call-menu-icon>
										            </button>
										        </template>
								            </div>
								            <div class="text-right w-25">
							        			<template v-if="status == 'ongoing'">
								        			<template v-if="!isShrinked">
												        <button :disabled="presenter && presenter != $root.auth.id" v-tooltip.top="'Share Screen'" type="button" :class="{'d-none': isScreenSharing}" class="btn btn-white border badge-pill p-1 line-height-1" @click="shareScreen">
												            <duplicate-alt-icon width="20" height="20"></duplicate-alt-icon>
												        </button>
												        <button v-tooltip.top="'Exit Share Screen'" type="button" :class="{'d-none': !isScreenSharing}" class="btn btn-white border badge-pill line-height-1 p-1" @click="stopShareScreen">
												            <duplicate-alt-icon fill="red" width="20" height="20"></duplicate-alt-icon>
												        </button>
												        <button v-tooltip.top="'Full Screen'" type="button" :class="{'d-none': isFullScreen}" class="btn btn-white border badge-pill line-height-1 p-1 ml-1" @click="fullScreen(true)">
												            <expand-icon width="20" height="20"></expand-icon>
												        </button>
												        <button v-tooltip.top="'Exit Full Screen'" type="button" :class="{'d-none': !isFullScreen}" class="btn btn-white border badge-pill line-height-1 p-1 ml-1" @click="fullScreen(false)">
												            <collapse-icon width="20" height="20"></collapse-icon>
												        </button>
												        <button v-tooltip.top="'Go to conversation'" type="button" class="btn btn-white border badge-pill line-height-1 p-1 ml-1" @click="goToConversation">
												            <comment-icon width="20" height="20"></comment-icon>
												        </button>
												    </template>
													
													<template v-if="!isFullScreen">
														<span :class="{'d-none': isShrinked}">
													        <button v-tooltip.top="'Shrink'" type="button" class="btn btn-shrink-toggle btn-white border badge-pill line-height-1 p-1 ml-1" @click="isShrinked = !isShrinked; toggleDraggable()">
														        <arrow-bottom-left-icon width="20" height="20"></arrow-bottom-left-icon>
													        </button>
														</span>
														<span :class="{'d-none': !isShrinked}" class="btn-expand-wrapper">
													        <button type="button" class="btn btn-shrink-toggle btn-white border badge-pill line-height-1 p-1 ml-1" @click="isShrinked = !isShrinked; toggleDraggable()">
													            <arrow-top-right-icon width="20" height="20"></arrow-top-right-icon>
													        </button>
														</span>
													</template>
											    </template>
								            </div>
								        </div>
							        </div>

									
									<!-- Recorded videos -->
							        <div v-if="status == 'ended' && recordedData.length > 0" class="recorded-data position-fixed w-100 h-100 bg-light">
							        	<div class="text-right mb-2 pr-1">
							        		<button class="btn close position-static float-none p-0 m-0" @click="close"><close-icon width="30" height="30"></close-icon></button>
							        	</div>
							        	<div class="d-flex px-2 py-3 flex-wrap">
								        	<div class="w-50 px-2 mb-3 recorded position-relative" v-for="recorded in recordedData" :key="recorded.timestamp">
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
			    <div class="modal-backdrop show"></div>
		    </div>
		</transition>
    </div>
</template>

<script src="./video-call.js"></script>
<style lang="scss" src="./video-call.scss"></style>