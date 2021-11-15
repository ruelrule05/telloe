<template>
	<div class="flex items-center justify-between waveplayer-container">
		<button class="audio-control shadow-sm relative p-0 mr-2 border" :class="[theme == 'light' ? 'bg-transparent' : 'bg-primary']" @click="togglePlayer">
			<play-icon v-if="playerStatus == 'paused'" width="15" height="15" fill="white"></play-icon>
			<pause-icon v-else-if="playerStatus == 'playing'" width="15" height="15" fill="white"></pause-icon>
		</button>
		<div ref="waveplayer" class="waveplayer flex-grow"></div>
		<span class="text-nowrap pl-2">{{ duration }}</span>
	</div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';
import PlayIcon from '../icons/play';
import PauseIcon from '../icons/pause';
export default {
	props: {
		source: { File, Blob },
		duration: { String, Number },
		theme: {}
	},

	components: { PlayIcon, PauseIcon },

	data: () => ({
		wavesurfer: null,
		playerStatus: 'paused'
	}),

	beforeDestroy() {
		this.wavesurfer.stop();
	},

	async mounted() {
		this.wavesurfer = WaveSurfer.create({
			container: this.$refs['waveplayer'],
			height: 25,
			barWidth: 3,
			barHeight: 1,
			barRadius: 3,
			interact: true,
			cursorWidth: 1,
			hideScrollbar: true
		});

		if (this.theme == 'light') {
			this.wavesurfer.setCursorColor('rgba(255,255,255,1)');
			this.wavesurfer.setProgressColor('#fff');
			this.wavesurfer.setWaveColor('rgba(255,255,255,1)');
		} else {
			this.wavesurfer.setCursorColor('#b5bce5');
			this.wavesurfer.setProgressColor('#6e82ea');
			this.wavesurfer.setWaveColor('#b5bce5');
		}

		if (typeof this.source == 'string') {
			this.wavesurfer.load(this.source);
		} else if (typeof this.source == 'object') {
			this.wavesurfer.load(window.URL.createObjectURL(this.source));
		}

		this.wavesurfer.on('finish', () => {
			this.playerStatus = 'paused';
			this.wavesurfer.seekTo(0);
		});
	},

	methods: {
		togglePlayer() {
			switch (this.playerStatus) {
				case 'paused':
					this.playerStatus = 'playing';
					this.wavesurfer.play();
					break;

				case 'playing':
					this.playerStatus = 'paused';
					this.wavesurfer.pause();
					break;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.waveplayer-container {
	width: 220px;
	max-width: 100%;
}
.audio-control {
	width: 25px;
	height: 25px;
	outline: 0 !important;
	border: none;
	border-radius: 50% !important;
	svg {
		position: absolute;
		top: 52%;
		left: 51%;
		transform: translate(-50%, -50%);
	}
}
</style>
