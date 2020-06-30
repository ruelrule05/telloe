<template>
	<div class="modal fade" tabindex="-1" role="dialog" ref="modal">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content overflow-hidden rounded">
                <div class="modal-body p-0">
                    <div class="h-100">
                    	<div class="caller overflow-hidden position-relative" v-if="caller">
                    		<div class="caller position-absolute-center text-center bg-white w-100 h-100">
                    			<div class="position-absolute-center">
	                    			<div class="user-profile bg-light d-inline-block mb-2 shadow-sm position-relative" :style="{backgroundImage: 'url(' + caller.profile_image + ')'}">
						                <span class="position-absolute-center text-gray" v-if="!caller.profile_image">{{ caller.initials }}</span>
						            </div>
						            <h3 class="font-heading">{{ caller.full_name }}</h3>
						            <h6 class="font-weight-light mb-5">is calling..</h6>
						            <button class="btn btn-danger btn-lg badge-pill line-height-1 px-2" @click="$root.initCall($root.callConversationId, 'incoming')">
						                <video-icon fill="white"></video-icon>
						            </button>
						            <button type="button" class="btn btn-white btn-lg badge-pill line-height-1 px-2 border ml-1" @click="$root.rejectCall">
						                <close-icon></close-icon>
						            </button>
	                    		</div>
                    		</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script src="./incoming-call.js"></script>
<style scoped lang="scss" src="./incoming-call.scss"></style>