<template>
	<div class="modal fade" tabindex="-1" role="dialog" ref="fileViewModal">
        <div class="modal-dialog modal-dialog-centered" :class="{'modal-lg': file && file.type == 'video'}" role="document">
            <div class="modal-content overflow-hidden">
                <button type="button" class="close position-absolute" data-dismiss="modal" aria-label="Close" @click="close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body p-0">
                    <div v-if="file" class="h-100">
                        <img v-if="file.type =='image'" :src="file.source" class="w-100">
                        <video controls v-else-if="file.type =='video'" :src="file.source" class="w-100 d-block bg-black"></video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default{
		props: {
			file: {
				type: Object,
				required: true,
			}
		},

		mounted() {
			$(this.$refs['fileViewModal']).modal('show');
		},

		methods: {
			close() {
				setTimeout(() => {
					this.$emit('close');
				}, 150);
			}
		}
	}
</script>