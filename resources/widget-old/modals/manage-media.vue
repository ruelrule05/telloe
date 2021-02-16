<template>
	<div>
		<div class="snapturebox-modal" tabindex="-1" id="manageMediaModal">
			<div class="snapturebox-modal-dialog snapturebox-modal-md snapturebox-modal-dialog-centered">
				<div class="snapturebox-modal-content">
					<div class="snapturebox-modal-body snapturebox-p-3" v-if="selectedMedia">
						<button
                            :disabled="$root.customerForm.loading"
                            type="button"
                            class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
                            @click="
                                $root.toggleModal('#manageMediaModal', 'hide');
                            "
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
						<h6>Photo {{ selectedMedia.index + 1 }} of {{ selectedMedia.total }}</h6>
						<div class="snapturebox-text-center snapturebox-bg-dark snapturebox-media-lightbox" :style="{'backgroundImage': 'url('+selectedMedia.media.src+')'}">
							<div class="snapturebox-media-change snapturebox-text-center snapturebox-pb-3">
								<camera fill="white" stroke="white" stroke-width="1"></camera>
								<div>
									<button class="snapturebox-text-white snapturebox-mt-1 snapturebox-btn snapturebox-btn-link snapturebox-text-shadow-dark" @click="$refs['addMedia'].click()">Reupload photo</button>
									<input type="file" hidden ref="addMedia" @change="setPreview" accept="image/x-png,image/gif,image/jpeg" />
								</div>
							</div>
						</div>
						<vue-form-validate @submit="submit" class="snapturebox-mt-3">
							<div class="snapturebox-form-group">
								<label for="" class="snapturebox-form-label">Description</label>
								<textarea v-model="selectedMedia.media.comment" rows="5" class="snapturebox-form-control snapturebox-border snapturebox-resize-none snapturebox-rounded-lg" placeholder="Add information as required"></textarea>
							</div>
							<div class="snapturebox-text-right">
								<button type="button" class="snapturebox-btn snapturebox-btn-link snapturebox-text-dark" @click="deleteMedia">Delete</button>
								<button type="submit" class="snapturebox-btn snapturebox-btn-dark snapturebox-ml-1 snapturebox-rounded-lg snapturebox-px-4">Save</button>
							</div>
						</vue-form-validate>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Close from '../../icons/close.vue';
import Camera from '../../icons/camera.vue';
export default {
	components: {Close, Camera},
	props: {
		media: {
			type: Object,
		}
	},

	data: () => ({
		selectedMedia: null,
	}),

	watch: {
		media: function(value) {
			this.selectedMedia = Object.assign({}, value);
		}
	},

	created() {
	},

	mounted() {},

	computed: {},

	methods: {
		submit() {
			this.$emit('submit', this.selectedMedia);
			this.$root.toggleModal('#manageMediaModal', 'hide');
		},

        setPreview(e) {
            let input = $(e.currentTarget);
            let file = input[0].files[0];
            if (file) {
                if (file.type.match('image/jpeg') || file.type.match('image/png')) {
                    let photosize = file.size / 1000000;
                    if (photosize > 5) {
                        alert('Error: Image file too big. Please select image file less than 5MB.');
                    } else {
                        let img = new Image();
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (oFREvent) => {
                            let canvas = document.createElement('canvas');
                            img.src = oFREvent.target.result;
                            img.addEventListener('load', () => {
                                let ctx = canvas.getContext('2d');
                                let MAX_WIDTH = 250;
                                let MAX_HEIGHT = 250;
                                let width = img.width;
                                let height = img.height;
                                if (width > height) {
                                    if (width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                    }
                                } else {
                                    if (height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                    }
                                }
                                canvas.width = width;
                                canvas.height = height;
                                ctx.drawImage(img, 0, 0, width, height);
                                let dataurl = canvas.toDataURL('image/jpeg');
                                this.$refs['addMedia'].value = '';
                                this.selectedMedia.media.preview =  dataurl;
                                this.selectedMedia.media.src =  img.src;
                            });
                        };
                    }
                } else {
                    alert('Error: Invalid image file!');
                    input.val('');
                }
            } else {
            }
        },

        deleteMedia() {
			this.$root.toggleModal('#manageMediaModal', 'hide');
        	this.$emit('deleteMedia', this.selectedMedia);
        }
	},
};
</script>
