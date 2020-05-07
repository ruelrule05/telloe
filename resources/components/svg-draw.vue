<template>
	<svg @click="removePath" @mousedown="svgDraw" @mousemove="svgDraw" @mouseup="svgDraw" xmlns="http://www.w3.org/2000/svg" ref="drawSvg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="svgElement" x="0px" y="0px" class="w-100 h-100 position-absolute" style="z-index: 1; top: 0; left: 0;" enable-background="new 0 0 600 400" xml:space="preserve" />
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'button',
		},

		button_class: {
			type: String,
			default: 'btn-block btn-primary',
		},

		loading: {
			type: Boolean,
			default: false,
		},

		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data: () => ({
		strokeWidth: 3,
		bufferSize: 0,
		strPath: '',
		buffer: [],
	}),

	mounted() {},

	methods: {
		clearSvg() {
			$(this.$refs['drawSvg'])
				.find('path')
				.remove();
		},

		getMousePosition(e) {
			let rect = e.currentTarget.getBoundingClientRect();
			return {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
		},

		appendToBuffer(pt) {
			this.buffer.push(pt);
			while (this.buffer.length > this.bufferSize) {
				this.buffer.shift();
			}
		},

		getAveragePoint(offset) {
			let len = this.buffer.length;
			if (len % 2 === 1 || len >= this.bufferSize) {
				let totalX = 0;
				let totalY = 0;
				let pt, i;
				let count = 0;
				for (i = offset; i < len; i++) {
					count++;
					pt = this.buffer[i];
					totalX += pt.x;
					totalY += pt.y;
				}
				return {
					x: totalX / count,
					y: totalY / count,
				};
			}
			return null;
		},

		updateSvgPath() {
			let pt = this.getAveragePoint(0);

			if (pt) {
				// Get the smoothed part of the path that will not change
				this.strPath += ' L' + pt.x + ' ' + pt.y;

				// Get the last part of the path (close to the current mouse position)
				// This part will change if the mouse moves again
				let tmpPath = '';
				for (let offset = 2; offset < this.buffer.length; offset += 2) {
					pt = this.getAveragePoint(offset);
					tmpPath += ' L' + pt.x + ' ' + pt.y;
				}

				// Set the complete current path coordinates
				this.path.setAttribute('d', this.strPath + tmpPath);
			}
		},

		svgDraw(e) {
			if (!this.disabled) {
				if (e.type == 'mousedown') {
					this.bufferSize = 4;
					this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
					this.path.setAttribute('fill', 'none');
					this.path.setAttribute('stroke', 'red');
					this.path.setAttribute('stroke-width', this.strokeWidth);
					this.buffer = [];
					let pt = this.getMousePosition(e);
					this.appendToBuffer(pt);
					this.strPath = 'M' + pt.x + ' ' + pt.y;
					this.path.setAttribute('d', this.strPath);
					svgElement.appendChild(this.path);
				} else if (e.type == 'mousemove') {
					//if (this.path && this.isRecording && (this.selectedImage.type == 'image' || (this.selectedImage.type == 'video' && this.selectedVideoFrame)) && this.drawTool == 'brush') {
					if (this.path) {
						this.appendToBuffer(this.getMousePosition(e));
						this.updateSvgPath();
					}
				} else if (e.type == 'mouseup') {
					if (this.path) this.path = null;
				}
			}
		},

		removePath(e) {
			if (e.target.nodeName == 'path') e.target.remove();
		}
	},
};
</script>
