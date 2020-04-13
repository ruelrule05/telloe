<template>
    <div class="snapturebox-live-video snapturebox-h-100 snapturebox-overflow-hidden snapturebox-position-relative snapturebox-bg-black">
        <video ref="cameraPreview" class="snapturebox-h-50 snapturebox-w-100"></video>
        <video ref="remotePreview" autoplay playsinline muted class="snapturebox-h-50 snapturebox-w-100 snapturebox-border"></video>
        <button @click="createAnswer" class="snapturebox-position-absolute" style="top: 0; left: 0; z-index: 10">Answer</button>
	</div>
</template>

<script>
export default {
    components: {},

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
    }),

    computed: {
    },


    created() {
        this.remoteMediaStream = new MediaStream();
        this.initCamera();
    },

    methods: {
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
            this.pc.oniceconnectionstatechange = () => {
               console.log('ICE state: ',this.pc.iceConnectionState);
            }
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
            this.remoteMediaStream.addTrack(event.track)
            this.$refs['remotePreview'].srcObject = this.remoteMediaStream;
          }
        },
        sendSignalingMessage(desc, offer) { // Send the offer to the other peer
          this.$parent.socket.emit("live_call_init", { 
            desc, 
            conversation: this.$root.conversation
          });
        },
    },
};
</script>
<style scoped lang="scss">
    .live-video {
        width: 480px;
        video{
            height: 350px;
            max-height: 70%;
        }
    }
</style>