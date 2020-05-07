<template>
	<div class="live-recorder overflow-hidden position-relative bg-black">
		<button v-if="isAnswered" @click="recordCall" class="btn-record btn p-0 position-absolute text-white d-flex align-items-center" :disabled="isRecording">
			<i></i>&nbsp;{{ isRecording ? 'Recording' : 'Record this call' }}</span>
		</button>
        <close-icon v-if="!isCalling && !isAnswered" class="position-absolute cursor-pointer close" fill="white" @click.native="close"></close-icon>
		<!-- Spinner -->
        <div class="position-absolute-center text-center" v-if="!cameraReady">
            <div class="spinner-border text-primary" role="status"></div>
            <div class="text-white mt-3">Loading camera..</div>
        </div>
        <!-- End Spinner -->
		
		
		<canvas ref="preview" class="position-absolute-center opacity-0 bg-black"></canvas>
		<div class="preview-wrapper" :class="{'preview-thumb': isAnswered}">
			<video ref="cameraPreview" :class="{'w-100 h-100 position-absolute-center': !isAnswered}"></video>
		</div>
		<video ref="remotePreview" :hidden="!isAnswered" id="remote-preview" autoplay playsinline class="h-100 w-100 position-absolute-center"></video>
		<div id="recorderControls" class="position-absolute w-100 text-center" v-if="cameraReady">
            <button v-if="!isCalling" class="btn btn-white btn-lg badge-pill line-height-1 px-2" @click="startCall">
                <video-icon></video-icon>
            </button>
            <button v-else class="btn btn-danger btn-lg badge-pill line-height-1 px-2" @click="endCall">
                <video-icon fill="white"></video-icon>
            </button>
        </div>

        <div v-if="isAnswered" class="btn-share-screen position-absolute">
	        <button v-if="!isScreenSharing" class="btn line-height-1 p-0" @click="shareScreen">
	            <duplicate-alt-icon fill="white" width="20" height="20"></duplicate-alt-icon>
	        </button>
	        <button v-else class="btn line-height-1 p-0" @click="stopShareScreen">
	            <duplicate-alt-icon fill="red" width="20" height="20"></duplicate-alt-icon>
	        </button>
        </div>
	</div>
</template>

<script>
import VideoIcon from '../icons/video';
import CloseIcon from '../icons/close';
import DuplicateAltIcon from '../icons/duplicate-alt';
import MultiStreamsMixer from 'multistreamsmixer';
export default {
	components: {VideoIcon, CloseIcon, DuplicateAltIcon},
	props: {
        conversation: {
            type: Object,
            default: [],
        }
    },

	data: () => ({
		streams: null,
		cameraReady: false,
		isCalling: false,
		isAnswered: false,
		pc: null,
		videoAnswer: null,
		notification_sound: null,
		remoteMediaStream: null,
		callRecorder: null,
		blobs: [],
		isRecording: false,
		videoSender: null,
		isScreenSharing: false,
	}),

	created() {
        this.notification_sound = new Audio(`/notifications/call.mp3`);
        this.$parent.socket.on('live_call_answer', (data) => {
            if(data.conversation.id == this.$parent.selectedConversation.id && data.desc && data.desc.type == 'answer') {
				this.callAnswered(data);
				this.notification_sound.pause();
            }
        });

        this.$parent.socket.on('live_call_reject', (data) => {
            if(data.conversation.id == this.$parent.selectedConversation.id) {
				this.notification_sound.pause();
				this.notification_sound.currentTime = 0;
				this.$emit('close');
            }
        });

        this.$parent.socket.on('live_call_end', (data) => {
            if(data.conversation.id == this.$parent.selectedConversation.id) {
                this.close();
            }
        });
        this.remoteMediaStream = new MediaStream();
	},

	beforeDestroy() {
		if (this.streams) {
			this.streams.getTracks().forEach(function(track) {
				track.stop();
			});
		}
	},

	mounted() {
		this.initCamera();
	},

	computed: {},

	methods: {
		async stopShareScreen() {
			this.streams.getVideoTracks().forEach(function(track) {
				track.stop();
			});
			this.streams = await navigator.mediaDevices.getUserMedia({video: true}).catch((e) => {  });
			if(this.streams) {
			    let cameraTrack = this.streams.getVideoTracks()[0];
			    this.videoSender.replaceTrack(cameraTrack);
	            this.$refs['cameraPreview'].srcObject = null;
	            this.$refs['cameraPreview'].srcObject = new MediaStream(this.streams.getVideoTracks());
	            this.$refs['cameraPreview'].play();
	            this.isScreenSharing = false;
            }
		},

		async shareScreen() {
			let screenStreams = await navigator.mediaDevices.getDisplayMedia({video: true}).catch((e) => {  });
			if(screenStreams) {
				this.streams.getVideoTracks().forEach(function(track) {
					track.stop();
				});
				this.streams = screenStreams;
			    let screenTrack = this.streams.getVideoTracks()[0];
			    this.videoSender.replaceTrack(screenTrack);
	            this.$refs['cameraPreview'].srcObject = null;
	            this.$refs['cameraPreview'].srcObject = new MediaStream(this.streams.getVideoTracks());
	            this.$refs['cameraPreview'].play();
            	this.isScreenSharing = true;
				this.streams.getTracks()[0].addEventListener('ended', () => {
					this.stopShareScreen();
				});
            }
		},

		recordCall() {
			if(!this.isRecording) {
				this.isRecording = true;
				let streams = [this.remoteStream, this.streams];
				if(this.streams) streams.push(this.streams);
	            const mixer = new MultiStreamsMixer(streams);
	            mixer.frameInterval = 1;
	            mixer.startDrawingFrames();
	           	let stream = mixer.getMixedStream();

				let localVideo = this.$refs['cameraPreview'];
				let remoteVideo = this.$refs['remotePreview'];
	            let canvas = this.$refs['preview'];
				canvas.width = $('.live-recorder').width();
				canvas.height = $('.live-recorder').height();
				let canvasContext = canvas.getContext('2d');
				this.streams.onRender = (context, x, y, width, height, idx) => {
					canvasContext.save();
	                canvasContext.beginPath();
	                canvasContext.arc(60, canvas.height - 60, 50, 0, 6.28, false); //draw the circle
	                canvasContext.clip(); //call the clip method so the next render is clipped in last path
	                canvasContext.closePath();
	                canvasContext.stroke();
	                canvasContext.drawImage(localVideo, -7, canvas.height - 110, localVideo.offsetWidth, localVideo.offsetHeight);
					canvasContext.restore();
				};

				let position = this.setCenterPosition(remoteVideo, canvas);
				this.remoteStream.onRender = (context, x, y, width, height, idx) => {
	                canvasContext.drawImage(remoteVideo, position.x, position.y, position.width, position.height);
				};

				let finalStream = new MediaStream();
				let audioStream = new MediaStream(this.streams.getAudioTracks());
	            audioStream.getTracks('audio').forEach((track) => {
	                finalStream.addTrack(track);
	            });
	            let remoteAudioStream = new MediaStream(this.remoteStream.getAudioTracks());
	            remoteAudioStream.getTracks('audio').forEach((track) => {
	                finalStream.addTrack(track);
	            });
	            canvas.captureStream().getTracks('video').forEach((track) => {
	               finalStream.addTrack(track);
	            });
	            this.callRecorder = new MediaRecorder(finalStream);
	            this.callRecorder.start(30);
	            this.callRecorder.ondataavailable = e => this.blobs.push(e.data);
            }
		},

		setCenterPosition(video, canvas) {
			let imageAspectRatio = video.videoWidth / video.videoHeight;
            let canvasAspectRatio = canvas.width / canvas.height;
            let renderableHeight, renderableWidth, xStart, yStart;

            // If image's aspect ratio is less than canvas's we fit on height
            // and place the image centrally along width
            if(imageAspectRatio < canvasAspectRatio) {
                renderableHeight = canvas.height;
                renderableWidth = video.videoWidth * (renderableHeight / video.videoHeight);
                xStart = (canvas.width - renderableWidth) / 2;
                yStart = 0;
            }

            // If image's aspect ratio is greater than canvas's we fit on width
            // and place the image centrally along height
            else if(imageAspectRatio > canvasAspectRatio) {
                renderableWidth = canvas.width
                renderableHeight = video.videoHeight * (renderableWidth / video.videoWidth);
                xStart = 0;
                yStart = (canvas.height - renderableHeight) / 2;
            }

            // Happy path - keep aspect ratio
            else {
                renderableHeight = canvas.height;
                renderableWidth = canvas.width;
                xStart = 0;
                yStart = 0;
            }
            return {x: xStart, y: yStart, height: renderableHeight, width: renderableWidth};
		},

		close() {
            this.$emit('close');
        },

		callAnswered(data) {
			this.isAnswered = true;
            this.pc.setRemoteDescription(data.desc);
		},

		endCall() {
			this.isCalling = this.isAnswered = false;
			this.notification_sound.pause();
			this.notification_sound.currentTime = 0;
			this.$parent.socket.emit('live_call_end', {conversation: this.conversation});
			if(this.callRecorder) {
				this.callRecorder.stop();
				let blob = new Blob(this.blobs, {
			        type: this.blobs[0].type
			    });
			    console.log(URL.createObjectURL(blob));
			}
			this.close();
		},

		async startCall() {
			if(this.conversation && this.streams) {
				try {
			        this.pc.createOffer(async (offer) => {
		        		await this.pc.setLocalDescription(offer); // Add local description
		        		this.sendSignalingMessage(this.pc.localDescription, true, this.isCalling) // Send signaling message 
		        		if(!this.isCalling) this.startCall();
		        		else this.notification_sound.play();
			        	this.isCalling = true;
			        }, (e) => {
			        	console.log(e);
			        }); // Create offer
			    } catch (error) {
			    	console.log(error);
			    }
			}
		},

		initCamera() {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                this.streams = streams;
                this.$refs['cameraPreview'].muted = true;
                this.$refs['cameraPreview'].volume = 0;
                this.$refs['cameraPreview'].srcObject = new MediaStream(this.streams.getVideoTracks());
                this.$refs['cameraPreview'].play();
                this.$refs['cameraPreview'].onplaying = () => {
                    this.cameraReady = true;
	                this.createPeerConnection();
	                this.addLocalStream();
	                //this.onIceCandidates();
	                this.onAddStream();
                };


            }).catch(function(error) {
                alert('Unable to capture your camera.');
                console.error(error);
            });
        },


	    createPeerConnection() {
            let configuration = {
                iceServers: [
                    { urls: "stun:stun.1.google.com:19302" },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        credential: 'moonfang',
                        username: 'cleidoscope@gmail.com'
                    }
                ]
            };
	      	this.pc = new RTCPeerConnection(configuration) // RTCPeerConnection object
	    },
	    addLocalStream() {
			this.streams.getTracks().forEach((track) => {
           		let sender = this.pc.addTrack(track, this.streams);
           		if(track.kind == 'video') {
           			this.videoSender = sender;
           		}
            });
	    },
	    onIceCandidates() { // send any ice candidates to the other peer
	      	this.pc.onicecandidate = ({ candidate }) => {
	      		/*if(candidate) {
			        this.$parent.socket.emit("live_call_init", { 
			          candidate: candidate, 
			          conversation: this.$parent.selectedConversation,
			        });
		        }*/
	      	}
	    },
	    onAddStream() { // Attach remote video track
	      this.pc.ontrack = (event) => {
	      	this.remoteStream = event.streams[0];
            this.remoteMediaStream.addTrack(event.track);
            this.$refs['remotePreview'].srcObject = this.remoteMediaStream;
          }
	    },
	    sendSignalingMessage(desc, offer, is_calling) { // Send the offer to the other peer
	      this.$parent.socket.emit("live_call_offer", { 
	        desc, 
	        conversation: this.$parent.selectedConversation,
	        user: this.$root.auth,
	        is_calling: is_calling
	      });
	    },
	},
};
</script>

<style scoped lang="scss">
.btn-share-screen{
	right: 15px;
	bottom: 15px;
	z-index: 5;
}
.btn-record{
	line-height: 1;
	font-size: 12px;
	top: 10px;
	left: 10px;
	z-index: 10;
	i{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: red;
		display: inline-block;
	}
}
.close {
	right: 0;
}
.preview-wrapper.preview-thumb{
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 10;
    video {
        height: 100%;
        width: auto;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }
}
.live-recorder{
	height: 450px;
}
video, canvas {
	pointer-events: none;
}
</style>
