<template>
	 <div class="modal fade" tabindex="-1" role="dialog" ref="modal">
        <div v-if="loading" class="modal-loader position-absolute w-100 h-100">
            <div class="position-absolute-center">
                <div class="spinner-border text-white" role="status"></div>
            </div>
        </div>
        <div class="modal-dialog modal-dialog-centered" role="document" :class="[{'opacity-0': loading}, size, {'modal-dialog-scrollable': scrollable}]">
            <component :is="contentComponent" class="modal-content" @submit="submit">
                <button v-if="closeButton" type="button" class="btn p-0 btn-white badge-pill close position-absolute line-height-0" aria-label="Close" data-dismiss="modal">
                    <close-icon width="28" height="28"></close-icon>
                </button>
                <div v-if="title" class="modal-header pb-0">
                    <h5 class="modal-title font-heading">{{ title }}</h5>
                </div>

                <div class="modal-body position-relative">
    				<slot></slot>
                </div>

                <div v-if="hasFooterSlot" class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </component>
        </div>
    </div>
</template>

<script src="./modal.js"></script>
<style src="./modal.scss" lang="scss" scoped></style>