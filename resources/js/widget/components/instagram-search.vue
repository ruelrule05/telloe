<template>
	<div id="snapturebox-instagram-search" class="snapturebox-px-3 snapturebox-pb-3" :class="{'snapturebox-instagram-open': open}">
		<div class="snapturebox-p-3 snapturebox-rounded-lg snapturebox-overflow-hidden">
			<div class="snapturebox-d-flex snapturebox-mb-2 snapturebox-align-items-center">
				<div>
					<h6 class="snapturebox-mb-0">
						Search Instagram Gallery <small><i class="snapturebox-font-weight-lighter snapturebox-text-secondary">(eg #weddinghair, #formalhair)</i></small>
					</h6>
				</div>
				<div class="snapturebox-ml-auto">
					<button class="snapturebox-btn snapturebox-btn-xs snapturebox-btn-gray snapturebox-text-white snapturebox-shadow-none snapturebox-badge-pill snapturebox-py-0" @click="open = open ? false : true">{{ open ? 'Done' : 'Minimise' }} <chevron-down fill="white" height="12" width="12" transform="scale(2)"></chevron-down></button>
				</div>
			</div>
			<form @submit.prevent="getIGImages()" class="snapturebox-form-group-icon">
				<search></search>
				<input type="text" v-model="igTag" class="snapturebox-form-control snapturebox-form-control snapturebox-py-0" placeholder="Search by tag.." @keydown="disableSpace" @change="removeSpaces" />
			</form>
			<div :class="{'snapturebox-opacity-0': !open}" id="snapturebox-instagram-results" class="snapturebox-overflow-auto snapturebox-mt-3 snapturebox-position-relative">
				<div v-if="igSearchLoading" class="snapturebox-position-absolute-center">
					<div class="snapturebox-spinner-border snapturebox-text-primary"></div>
				</div>
				<div v-lazy-container="{selector: 'img'}" class="snapturebox-d-flex snapturebox-flex-wrap">
					<div v-for="igImage in igImages" class="snapturebox-ig-image">
						<button class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-light snapturebox-badge-pill snapturebox-shadow-none snapturebox-position-absolute-center" @click="selectIGImage(igImage)">
							Choose
						</button>
						<img :data-src="$root.API + '/images/watermark.png'" class="snapturebox-ig-watermark" />
						<img :data-src="igImage" class="snapturebox-w-100" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ChevronDown from '../../icons/chevron-down';
import Search from '../../icons/search';
export default {
	components: {ChevronDown, Search},

	data: () => ({
		open: false,
        igImages: [],
        igTag: '',
        igSearchLoading: false,
	}),

	created() {},

	mounted() {},

	computed: {},

	methods: {
		selectIGImage(url) {
            this.instagramSearchOpen = false;
            let image = new Image();
            image.setAttribute('crossorigin', 'anonymous');
            image.src = url;
            image.onload = () => {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                //context.drawImage(this.watermark, canvas.width - 50, 0, 50, 50);
                let srcUrl = canvas.toDataURL('image/jpeg');

                let igImage = {
                    src: srcUrl,
                    preview: srcUrl,
                    url: url,
                    type: 'sample'
                };
                this.$emit('select', igImage);
            };
        },

        getIGImages() {
            this.igTag = this.igTag.trim();
            if (this.igTag.charAt(0) != '#') this.igTag = `#${this.igTag}`;
            let igTag = this.igTag.substr(1);
            if (igTag) {
                this.open = true;
                this.igImages = [];
                this.igSearchLoading = true;
                SBAxios.get(`/get_ig_images?tag=${igTag}`)
                    .then((response) => {
                        this.igImages = response.data;
                        this.igSearchLoading = false;
                    })
                    .catch(() => (this.igSearchLoading = false));
            }
        },

        removeSpaces(e) {
            this.igTag = this.igTag.replace(/\s/g, '');
        },

        disableSpace(e) {
            if (e.which === 32) {
                e.preventDefault();
                return false;
            }
        },
	},
};
</script>
