<template>
    <div class="snapturebox-live-video snapturebox-h-100 snapturebox-overflow-hidden snapturebox-position-relative">
        <div v-if="!status" class="snapturebox-position-absolute-center snapturebox-text-center">
            <div class="snapturebox-caller-profile snapturebox-bg-light snapturebox-d-inline-block snapturebox-mb-2 snapturebox-shadow-sm snapturebox-position-relative" :style="{backgroundImage: 'url('+$root.API + videoCallData.user.profile_image+')'}">
                <span class="snapturebox-position-absolute-center snapturebox-text-gray" v-if="!videoCallData.user.profile_image">{{ videoCallData.user.initials }}</span>
            </div>
            <h3>{{ videoCallData.user.full_name }}</h3>
            <h6 class="snapturebox-font-weight-light snapturebox-mb-5">is calling..</h6>
            <button class="snapturebox-btn snapturebox-btn-danger snapturebox-btn-lg snapturebox-badge-pill snapturebox-line-height-1 snapturebox-px-2" @click="answerCall">
                <video-icon fill="white"></video-icon>
            </button>
            <button class="snapturebox-btn snapturebox-btn-white snapturebox-btn-lg snapturebox-badge-pill snapturebox-line-height-1 snapturebox-px-2" @click="rejectCall">
                <close-icon></close-icon>
            </button>
        </div>

        <div class="snapturebox-bg-black snapturebox-position-relative snapturebox-w-100 snapturebox-h-100" :hidden="status != 'answered'">
            <video ref="remotePreview" id="snapturebox-remote-preview" autoplay playsinline muted class="snapturebox-w-100 snapturebox-position-absolute-center"></video>
            <div class="snapturebox-preview-wrapper snapturebox-bg-white">
                <video-icon class="snapturebox-position-absolute-center" fill="#999" width="35" height="35"></video-icon>
                <video ref="cameraPreview" id="snapturebox-camera-preview"></video>
            </div>
            
            <div class="snapturebox-controls snapturebox-position-absolute snapturebox-w-100 snapturebox-text-center">
                <button class="snapturebox-btn snapturebox-btn-danger snapturebox-btn-lg snapturebox-badge-pill snapturebox-line-height-1 snapturebox-px-2" @click="endCall">
                    <video-icon fill="white"></video-icon>
                </button>
            </div>
        </div>
	</div>
</template>

<script>
import VideoIcon from '../../icons/video';
import CloseIcon from '../../icons/close';
export default {
    components: {VideoIcon, CloseIcon},

    props: {
        videoCallData: {
            type: Object,
            required: true,
            default: () => {}
        },

        videoCallDesc: {
            type: Object,
            required: true,
            default: () => {}
        }
    },

    data: () => ({
        streams: null,
        remoteMediaStream: null,
        notification_sound: null,
        status: ''
    }),

    computed: {
    },


    created() {
        this.notification_sound = new Audio(`${this.$root.API}/notifications/call.mp3`);
        this.remoteMediaStream = new MediaStream();

        this.$parent.socket.on('live_call_end', (data) => {
            if(data.conversation.id == this.$root.conversation.id) {
                this.status = 'ended';
            }
        });
    },

    mounted() {
        this.notification_sound.play();
    },

    methods: {
        endCall() {
            this.status = 'ended';
            this.$parent.socket.emit('live_call_end', {conversation: this.$root.conversation});
        },

        rejectCall() {
            this.notification_sound.pause();
            this.$parent.socket.emit("live_call_reject", { 
                conversation: this.$root.conversation
            });
            this.$parent.leftContent = '';
        },

        answerCall() {
            this.status = 'answered';
            this.initCamera();
            this.notification_sound.pause();
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
                   // this.onIceCandidates();
                    this.onAddStream();
                    this.createAnswer();
                };
            }).catch(function(error) {
                alert('Unable to capture your camera.');
                console.error(error);
            });
        },
        addCandidate(candidate) {
            this.pc.addIceCandidate(candidate);
        },

        async createAnswer() {
            await this.pc.setRemoteDescription(this.videoCallDesc);
            try {
                this.pc.createAnswer(async(answer) => {
                    await this.pc.setLocalDescription(answer); // Add local description
                    this.sendSignalingMessage(this.pc.localDescription, false); // Send signaling message
                },
                (e) => {
                    console.log(e);
                }
                );// Create answer
            } catch (error) {
                console.log(`Error creating the answer from. Error: ${error}`);
            }
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
            /*this.pc.oniceconnectionstatechange = () => {
               console.log('ICE state: ',this.pc.iceConnectionState);
            }*/
        },
        addLocalStream() {
            this.pc.addStream(this.streams) 
        },
        onIceCandidates() { // send any ice candidates to the other peer
            this.pc.onicecandidate = ({ candidate }) => {
                /*if(candidate) {
                    this.$parent.socket.emit("live_call_init", { 
                      candidate, 
                      conversation: this.$root.conversation,
                    });
                }*/
            }
        },
        onAddStream() { // Attach remote video track
          this.pc.ontrack = (event) => {
            this.remoteMediaStream.addTrack(event.track);
            this.$refs['remotePreview'].srcObject = this.remoteMediaStream;
          }
        },
        sendSignalingMessage(desc, offer) { // Send the offer to the other peer
          this.$parent.socket.emit("live_call_answer", { 
            desc, 
            conversation: this.$root.conversation
          });
        },
    },
};
</script>
<style scoped lang="scss">
    .controls{
        bottom: 10px;
        left: 0;
    }
    .preview-wrapper{
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        video {
            height: 100%;
            width: auto;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
        }
    }
    #remote-preview{
        height: 380px;
        max-height: 70%;
    }
    .caller-profile{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        span {
            font-size: 30px;
            font-weight: lighter;
        }
    }
    .live-video {
        width: 480px;
    }
    video {
        pointer-events: none;
    }
</style>