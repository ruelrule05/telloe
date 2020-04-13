<template>
	<div class="live-recorder overflow-hidden position-relative bg-black">
		<!-- Spinner -->
        <div class="position-absolute-center text-center" v-if="!cameraReady">
            <div class="spinner-border text-primary" role="status"></div>
            <div class="text-white mt-3">Loading camera..</div>
        </div>
        <!-- End Spinner -->
		<video ref="cameraPreview" class="h-100 w-100 position-absolute-center"></video>
		<div id="recorderControls" class="position-absolute w-100 text-center" v-if="cameraReady">
            <button v-tooltip.top="'Start video call'" class="btn btn-white btn-lg badge-pill line-height-1 px-2" @click="startCall" :hidden="isCalling">
                <video-icon></video-icon>
            </button>
            <button v-tooltip.top="'Stop video call'" class="btn btn-danger btn-lg badge-pill line-height-1 px-2" @click="stopCall" :hidden="!isCalling">
                <video-icon fill="white"></video-icon>
            </button>
        </div>
	</div>
</template>

<script>
import RecordRTC from 'recordrtc';
import VideoIcon from '../icons/video';
import Tooltip from './../directives/tooltip.js';
export default {
	components: {VideoIcon},
	directives: {Tooltip},
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
		pc: null,
		videoAnswer: null,
	}),

	created() {

        this.$parent.socket.on('live_calling', (data) => {
            if(data.conversation.id == this.$parent.selectedConversation.id && data.desc && data.desc.type == 'answer') {
				this.isAnswered(data);
            }
        });

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
		isAnswered(data) {
            this.pc.setRemoteDescription(data.desc);
		},

		stopCall() {
			this.isCalling = false;
			this.$parent.socket.emit('live_call_stop', {conversation: this.conversation, streams: this.streams});
		},

		async startCall() {
			if(this.conversation && this.streams) {
				console.log('startCall');
				try {
			        this.pc.createOffer(async (offer) => {
		        		await this.pc.setLocalDescription(offer); // Add local description
		        		this.sendSignalingMessage(this.pc.localDescription, true, this.isCalling) // Send signaling message 
		        		if(!this.isCalling) this.startCall();
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
           	this.pc.addStream(this.streams) 
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
           /* this.remoteMediaStream.addTrack(event.track)
            this.$refs['remotePreview'].srcObject = this.remoteMediaStream;*/
          }
	    },
	    sendSignalingMessage(desc, offer, is_calling) { // Send the offer to the other peer
	      this.$parent.socket.emit("live_call_init", { 
	        desc, 
	        conversation: this.$parent.selectedConversation,
	        is_calling: is_calling
	      });
	    },
	},
};
</script>

<style scoped lang="scss">
.live-recorder{
	height: 450px;
}
</style>
