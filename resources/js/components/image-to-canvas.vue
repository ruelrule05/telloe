<template>
    <canvas ref="canvas" v-observe-visibility="{callback: visibilityChanged}"></canvas>
</template>

<script>
export default {
    props: {
        src: {
            required: true,
            type: String,
            default: '',
        },
    },

    data: () => ({
        image: null,
        canvasCtx: null,
    }),

    created() {
        this.image = new Image();
        this.image.src = this.src;
    },

    watch: {
        src: function() {
            this.image.src = this.src;
            this.visibilityChanged(true);
        }
    },

    mounted() {
        this.canvasCtx = this.$refs['canvas'].getContext('2d');
    },

    methods: {
        visibilityChanged(isVisible) {
            if (isVisible) {
                let canvas = this.$refs['canvas'];
                let parent = this.$refs['canvas'].parentElement;
                let canvasWidth = canvas.offsetWidth;
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;

                let imageAspectRatio = this.image.width / this.image.height;
                let canvasAspectRatio = canvas.width / canvas.height;
                let renderableHeight, renderableWidth, xStart, yStart;

                // If image's aspect ratio is less than canvas's we fit on height
                // and place the image centrally along width
                if(imageAspectRatio < canvasAspectRatio) {
                    renderableHeight = canvas.height;
                    renderableWidth = this.image.width * (renderableHeight / this.image.height);
                    xStart = (canvas.width - renderableWidth) / 2;
                    yStart = 0;
                }

                // If image's aspect ratio is greater than canvas's we fit on width
                // and place the image centrally along height
                else if(imageAspectRatio > canvasAspectRatio) {
                    renderableWidth = canvas.width
                    renderableHeight = this.image.height * (renderableWidth / this.image.width);
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
                //this.$refs['canvas'].height = (canvasWidth / this.image.width) * this.image.height;
                this.canvasCtx.drawImage(this.image, xStart, yStart, renderableWidth, renderableHeight);
            }
        }
    },
};
</script>