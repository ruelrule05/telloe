<template>
	<div class="snapturebox-d-flex snapturebox-align-items-center snapturebox-w-100">
		<button class="snapturebox-audio-control snapturebox-shadow-sm snapturebox-position-relative snapturebox-p-0 snapturebox-mr-2" @click="togglePlayer">
			<play-icon v-if="playerStatus == 'paused'" width="15" height="15" fill="#999"></play-icon>
			<pause-icon v-else-if="playerStatus == 'playing'" width="15" height="15" fill="#999"></pause-icon>
		</button>
		<div ref="waveplayer" class="snapturebox-waveplayer"></div>
		<span class="snapturebox-text-nowrap snapturebox-pl-2">{{ duration }}</span>
	</div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';
import PlayIcon from '../../icons/play';
import PauseIcon from '../../icons/pause';
export default {
	props: {
		source: {File, Blob},
		duration: {String, Number},
		theme: ''
	},

	components: {PlayIcon, PauseIcon},

	data: () => ({
		wavesurfer: null,
		playerStatus: 'paused',
	}),

	async mounted() {
		this.wavesurfer = WaveSurfer.create({
		    container: this.$refs['waveplayer'],
		    height: 25,
		    barWidth: 3,
    		barHeight: 1,
    		barRadius: 3,
  			interact: true,
  			cursorWidth: 1,
  			hideScrollbar: true,
		});

		if(this.theme == 'light') {
			this.wavesurfer.setCursorColor('rgba(255,255,255,0.4)');
			this.wavesurfer.setProgressColor('#fff');
			this.wavesurfer.setWaveColor('rgba(255,255,255,0.4)');
		} else {
			this.wavesurfer.setCursorColor('#b5bce5');
			this.wavesurfer.setProgressColor('#6e82ea');
			this.wavesurfer.setWaveColor('#b5bce5');
		}

		if(typeof this.source == 'string') {
			let sourceURL = new URL(this.source);
			this.wavesurfer.load(`${this.$root.API}/media${sourceURL.pathname}`);
			//this.wavesurfer.load(`${this.$root.API}/media/notifications/new_message.mp3`);
		} else if(typeof this.source == 'object') {
			this.wavesurfer.load(window.URL.createObjectURL(this.source));
		}
		
		this.wavesurfer.on('finish', (progress) => {
			this.playerStatus = 'paused';
			this.wavesurfer.seekTo(0);
		});
	},

	methods: {

		togglePlayer() {
			switch(this.playerStatus) {
				case 'paused':
					this.playerStatus = 'playing';
					this.wavesurfer.play();
					break;

				case 'playing':
					this.playerStatus = 'paused';
					this.wavesurfer.pause();
					break;
			}
		},
	}
}
</script>

<style scoped lang="scss">
	.waveplayer{
		width: 220px;
	}
	.audio-control{
		width: 25px;
		height: 25px;
		outline: 0 !important;
		border: none;
		border-radius: 50% !important;
		svg{
			position: absolute;
			top: 52%;
			left: 51%;
			transform: translate(-50%, -50%);
		}
	}
</style>