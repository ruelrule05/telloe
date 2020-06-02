const mime = require('mime');
import dayjs from 'dayjs';
import VideoIcon from '../../icons/video';
import CloseIcon from '../../icons/close';
import DuplicateAltIcon from '../../icons/duplicate-alt';
import DownloadIcon from '../../icons/download';
import ArrowRightIcon from '../../icons/arrow-right';
import MultiStreamsMixer from 'multistreamsmixer';
export default {
	components: {VideoIcon, CloseIcon, DuplicateAltIcon, DownloadIcon, ArrowRightIcon},
    props: {
        data: {
            required: true
        }
    },

	data: () => ({
		streams: null,
		cameraReady: false,
		isCalling: false,
		isAnswered: false,
		videoAnswer: null,
		callRecorder: null,
		recordedData: null,
		blobs: [],
		isRecording: false,
		videoSender: null,
		isScreenSharing: false,
        isCalling: false,
        localStream: null,
	}),

    watch: {},

	created() {
        this.$root.socket.on('live_call_reject', (data) => {
            if(this.$root.conversations.find((x) => x.id == data.conversation_id)) {
                this.endCall(false);
                this.$root.notification_sound.pause();
            }
        });
        this.$root.socket.on('live_call_end', (data) => {
            if(this.$root.conversations.find((x) => x.id == data.conversation_id)) {
                this.endCall(false);
            }
        });
       
	},


	mounted() {
	},


	methods: {
        updateRemoteStream() {
            this.$refs['remotePreview'].srcObject = this.$root.remoteStream;
        },
        
		init() {
			$(this.$refs['videoCallModal']).modal({backdrop: 'static', keyboard: false}).modal('show');
			this.initCamera();
	        this.$root.notification_sound.play();
		},

        close() {
            $(this.$refs['videoCallModal']).modal('hide');
            setTimeout(() => {
                this.$emit('close');
            }, 150);
            if(this.streams) {
                this.streams.getTracks().forEach(function(track) {
                    track.stop();
                });
            }
        },

		sendRecorded() {
			if(this.recordedData) {
				this.$emit('submit', this.recordedData);
				this.close();
			}
		},

		downloadRecorded() {
			if(this.recordedData) {
				let filename = `${this.recordedData.timestamp}.${mime.getExtension(this.recordedData.source.type)}`; 
				let link = document.createElement("a");
                link.href = URL.createObjectURL(this.recordedData.source);
                link.download = filename;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
                this.close();
			}
		},


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

		initCamera() {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((streams) => {
                this.streams = streams;
                this.addLocalStream();
                this.$refs['cameraPreview'].muted = true;
                this.$refs['cameraPreview'].volume = 0;
                this.$refs['cameraPreview'].srcObject = new MediaStream(this.streams.getVideoTracks());
                this.$refs['cameraPreview'].pause();
                this.$refs['cameraPreview'].play();
                this.$refs['cameraPreview'].onplaying = () => {
                    this.cameraReady = true;
                };
            }).catch(function(error) {
                alert('Unable to capture your camera.');
                console.error(error);
            });
        },

		endCall(emit = true) {
        	this.$root.notification_sound.pause();
			setTimeout(() => {
				this.status = '';
			}, 150);
			if(emit) this.$root.socket.emit('live_call_end', {conversation_id: this.data.conversation.id});
			if(this.callRecorder) {
				this.callRecorder.stop();
				this.isRecording = false;
	           	const timestamp = dayjs().valueOf();
				let blob = new Blob(this.blobs, {
			        type: this.blobs[0].type
			    });
			    this.recordedData = {
			    	user: this.$root.auth,
			    	source: blob,
			    	type: 'video',
			    	timestamp: timestamp,
			    	created_at: dayjs(timestamp).format('hh:mm A'),
			    };
			    this.$nextTick(() => {
			    	this.$refs['recordedPreview'].src = URL.createObjectURL(blob);
				    this.$refs['recordedPreview'].play().then(() => {
				    	this.$refs['recordedPreview'].currentTime = 10e99;
				        this.$refs['recordedPreview'].onseeked = () => {
		                    setTimeout(() => {
			          			let duration = this.$refs['recordedPreview'].duration;
								this.recordedData.duration = this.secondsToDuration(duration, 14, 5);
		                        let canvas = document.createElement("canvas");
		                        canvas.width = this.$refs['recordedPreview'].videoWidth / 2;
		                        canvas.height = this.$refs['recordedPreview'].videoHeight / 2;
		                        let context = canvas.getContext('2d');
    							context.fillStyle = "#000000";
    							context.fillRect(0, 0, canvas.width, canvas.height);
		                        context.drawImage(this.$refs['recordedPreview'], 0, 0, canvas.width, canvas.height);
		                        canvas.toBlob((blob) => {
					  				let reader = new FileReader();
								    reader.onload = () => {
								    	this.$set(this.recordedData, 'preview', reader.result);
								    };
								    reader.readAsDataURL(blob);
		                        });
		                   });
				        };
				    });
			    });
			} else {
				this.close();
			}
		},

        rejectCall() {
            this.$root.notification_sound.pause();
            this.$root.socket.emit('live_call_reject', {
                conversation_id: this.data.conversation.id,
            });
            this.close();
        },

        addLocalStream() {
			this.streams.getTracks().forEach((track) => {
           		let sender = this.$root.pc.addTrack(track, this.streams);
           		if(track.kind == 'video') this.videoSender = sender;
            });
        },

		secondsToDuration(seconds, limit = 11, end = 8) {
			let date = new Date(0);
			date.setSeconds(seconds);
			let timeString = date.toISOString().substr(limit, end);
			return timeString;
		},
	},

	beforeDestroy() {
		if (this.streams) {
			this.streams.getTracks().forEach(function(track) {
				track.stop();
			});
		}
	},
};