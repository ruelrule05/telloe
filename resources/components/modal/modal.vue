<template>
	 <div class="modal fade" tabindex="-1" role="dialog" ref="modal">
        <div v-if="modal.loading" class="modal-loader position-absolute w-100 h-100">
            <div class="position-absolute-center">
                <div class="spinner-border text-white" role="status"></div>
            </div>
        </div>
        <div class="modal-dialog modal-dialog-centered" role="document" :class="{'opacity-0': modal.loading}">
            <div class="modal-content overflow-hidden">
                <button v-if="closeButton" type="button" class="close position-absolute" aria-label="Close" data-dismiss="modal">
                    <close-icon width="30" height="30"></close-icon>
                </button>

                <div class="modal-body position-relative">
    				<slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./modal.js"></script>
<style src="./modal.scss" lang="scss" scoped></style>