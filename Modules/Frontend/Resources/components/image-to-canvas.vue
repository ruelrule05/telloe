<template>
    <canvas ref="canvas" v-observe-visibility="{callback: visibilityChanged}"></canvas>
</template>

<script>
import VueObserveVisibility from 'vue-observe-visibility';
export default {
    props: {
        src: {
            required: true,
            type: String,
            default: '',
        },
    },

    data: () => ({
        canvasCtx: null,
    }),

    created() {
    },

    watch: {
        src: function() {
            this.visibilityChanged(true);
        }
    },

    mounted() {
        this.canvasCtx = this.$refs['canvas'].getContext('2d');
    },

    methods: {
        visibilityChanged(isVisible) {
            if (isVisible) {
                let image = new Image();
                image.src = this.src;
                image.onload = () => {
                    let canvas = this.$refs['canvas'];
                    let parent = this.$refs['canvas'].parentElement;
                    let canvasWidth = canvas.offsetWidth;
                    canvas.width = parent.offsetWidth;
                    canvas.height = parent.offsetHeight;

                    let imageAspectRatio = image.width / image.height;
                    let canvasAspectRatio = canvas.width / canvas.height;
                    let renderableHeight, renderableWidth, xStart, yStart;

                    // If image's aspect ratio is less than canvas's we fit on height
                    // and place the image centrally along width
                    if(imageAspectRatio < canvasAspectRatio) {
                        renderableHeight = canvas.height;
                        renderableWidth = image.width * (renderableHeight / image.height);
                        xStart = (canvas.width - renderableWidth) / 2;
                        yStart = 0;
                    }

                    // If image's aspect ratio is greater than canvas's we fit on width
                    // and place the image centrally along height
                    else if(imageAspectRatio > canvasAspectRatio) {
                        renderableWidth = canvas.width
                        renderableHeight = image.height * (renderableWidth / image.width);
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
                    //this.$refs['canvas'].height = (canvasWidth / image.width) * image.height;
                    this.canvasCtx.drawImage(image, xStart, yStart, renderableWidth, renderableHeight);
                }
            }
        }
    },
};
</script>