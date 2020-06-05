<!doctype html>
<html lang="en">
<head>
<meta property="fb:pages" content="337977626664873" />
<title>Video Call | {{ config('app.name')}}</title>
@include('frontend.partials.meta_tags')
@yield('metas')
<link rel="stylesheet" href="{{ mix('css/call.css') }}">
</head>
<body>
	<div id="app" >
    	<div class="live-recorder overflow-hidden position-relative w-100 h-100" v-cloak>
    		<div v-if="!status" class="caller position-fixed text-center bg-white w-100 h-100">
        		<!-- Outgoing -->
        		<div v-if="action == 'outgoing'">
        			<div class="position-absolute-center">
            			<div class="user-profile bg-light d-inline-block mb-2 shadow-sm position-relative" :style="{backgroundImage: 'url(' + callee.profile_image + ')'}">
			                <span class="position-absolute-center text-gray" v-if="!callee.profile_image">@{{ callee.initials }}</span>
			            </div>
			            <h3 class="font-heading">@{{ callee.full_name }}</h3>
			            <h6 class="font-weight-light mb-5">Calling..</h6>
			            <button type="button" class="btn btn-white btn-lg badge-pill line-height-1 px-2 border ml-1" @click="endCall()">
			                <close-icon></close-icon>
			            </button>
            		</div>
        		</div>
        	</div>


    		<!-- Camera loader -->
	        <div v-if="!localCameraReady || !remoteCameraReady" class="position-absolute-center w-100 h-100 text-center bg-black camera-loader">
	            <div class="position-absolute-center">
	            	<div class="spinner-border text-primary" role="status"></div>
	           		<div class="text-white mt-3">Loading camera..</div>
	            </div>
	        </div>

			<!-- Ongoing -->
    		<div class="bg-black w-100 h-100 position-relative ongoing-body">
				<button v-if="status == 'ongoing'" @click="recordCall" class="btn-record btn p-0 position-absolute text-white d-flex align-items-center">
					<i :class="{'bg-gray': !isRecording}"></i>&nbsp;@{{ isRecording ? 'Stop recording' : 'Record this call' }}</span>
				</button>

				<!-- Local camera -->
				<div class="preview-wrapper" :class="{'preview-thumb': status == 'ongoing'}">
					<video ref="cameraPreview" :class="{'w-100 h-100 position-absolute-center': !status}" muted></video>
				</div>
				
				<!-- Remote camera -->
				<canvas ref="preview" class="position-absolute-center opacity-0 bg-black"></canvas>
				<video ref="remotePreview" id="remote-preview" autoplay playsinline class="h-100 w-100 position-absolute-center"></video>

				<div id="recorderControls" class="position-absolute w-100 text-center" v-if="status == 'ongoing'">
		            <button class="btn btn-danger btn-lg badge-pill line-height-1 px-2" @click="endCall">
		                <video-icon fill="white"></video-icon>
		            </button>
		        </div>

		        <div v-if="status == 'ongoing'" class="btn-share-screen position-absolute">
			        <button v-if="!isScreenSharing" class="btn line-height-1 p-0" @click="shareScreen">
			            <duplicate-alt-icon fill="white" width="20" height="20"></duplicate-alt-icon>
			        </button>
			        <button v-else class="btn line-height-1 p-0" @click="stopShareScreen">
			            <duplicate-alt-icon fill="red" width="20" height="20"></duplicate-alt-icon>
			        </button>
			        <button v-if="!isFullScreen" class="btn line-height-1 p-0 ml-1" @click="fullScreen(true)">
			            <expand-icon fill="white" width="20" height="20"></expand-icon>
			        </button>
			        <button v-else class="btn line-height-1 p-0 ml-1" @click="fullScreen(false)">
			            <collapse-icon fill="white" width="20" height="20"></collapse-icon>
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
	        			<div>@{{ recorded.duration }}</div>
	        			<div class="position-absolute-center w-100 text-center">
	        				<button class="btn btn-sm btn-white d-inline-flex align-items-center" @click="downloadRecorded(recorded)">
		        				<download-icon transform="scale(0.75)"></download-icon> Download
		        			</button>
		        			<button class="btn btn-sm btn-white d-inline-flex align-items-center" :disabled="recorded.sent" @click="sendRecorded(recorded)">
		        				@{{ recorded.sent ? 'Sent' : 'Send' }} <arrow-right-icon></arrow-right-icon>
		        			</button>
	        			</div>
		        	</div>
	        	</div>
	        </div>
		</div>
	</div>

	<script>
		const AUTH = JSON.parse('{!! json_encode(Auth::user()) !!}');
		const WS_URL = '{{ env('WS_URL') }}';
		const ACTION = '{{ $action }}';
		const CALLER = JSON.parse('{!! json_encode($caller) !!}');
		const CALLEE = JSON.parse('{!! json_encode($callee) !!}');
		const CONVERSATION = JSON.parse('{!! json_encode($conversation) !!}');
	</script>
	<script src="{{ mix('js/call.js') }}"></script>
</body>
</html>
