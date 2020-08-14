<template>
	<div class="snapturebox-modal" tabindex="-1" role="dialog" id="messageMediaModal">
	  	<div class="snapturebox-modal-dialog snapturebox-modal-lg snapturebox-modal-dialog-centered" role="document">
		    <div class="snapturebox-modal-content snapturebox-bg-black">
		      	<div class="snapturebox-modal-body snapturebox-p-0 snapturebox-rounded snapturebox-overflow-hidden">
					<button
						type="button"
						class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
						@click="$root.toggleModal('#messageMediaModal', 'hide');"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
		      		<img v-if="message.type == 'image'" :src="message.source" class="snapturebox-w-100">
		      		<video v-else-if="message.type == 'video'" :src="message.source" controls autoplay class="snapturebox-w-100 snapturebox-outline-0"></video>
		      	</div>
		    </div>
	  	</div>
	</div>
</template>

<script>
export default {
    components: {},
    props: {
        message: {
            type: Object,
            default: {},
            required: true
        },
    },

    data: () => ({
    }),

    computed: {
    },

    created() {
    },

    mounted() {
    },

    methods: {
    },
};
</script>