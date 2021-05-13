<template>
	<div class="modal fade" tabindex="-1" role="dialog" ref="fileViewModal">
            <button type="button" class="btn btn-transparent position-absolute p-0" data-dismiss="modal" aria-label="Close" @click="close" style="top: 0; right: 0;">
            	<close-icon width="48" height="48" fill="white"></close-icon>
            </button>
        <div class="modal-dialog modal-dialog-centered modal-lg" :class="{'modal-lg': file && file.type == 'video'}" role="document">
            <div class="modal-content position-absolute-center border border-danger w-100">
                <div v-if="file" class="modal-body p-0 ">
                    <img v-if="file.type =='image'" :src="file.source">
                    <video controls v-else-if="file.type =='video'" :poster="file.preview" :src="file.source" class="w-100 d-block bg-black outline-0 shadow-none"></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import CloseIcon from '../icons/close';
	export default{
		components: {
			CloseIcon
		},

		props: {
			conversation: {
				type: Object,
				required: true,
			},

			file: {
				type: Object,
			}
		},


		mounted() {
		},

		methods: {
			close() {

			}
		}
	}
</script>

<style scoped>
img{
    max-width: 100vw;
    max-height: 90vh;
}
</style>
<style>
	
.modal-backdrop{
	backdrop-filter: blur(20px);
	background-color: rgba(0,0,0,0.5) !important;
	opacity: 1 !important;
}
</style>