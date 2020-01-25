<template>
	<div v-if="inquiry" class="row h-100 m-0">
		<div class="col-md-8 h-100 overflow-auto p-3">
			<div class="text-center">
				<img :src="inquiry.user.profile_image" width="80" class="rounded-circle" alt="" />
				<h5 class="my-2">{{ inquiry.user.full_name }}</h5>
			</div>
			<p>{{ inquiry.message }}</p>
			<masonry :cols="{default: 3, 991: 2, 768: 1}" :gutter="20">
				<div v-for="(media, index) in inquiry.inquiry_media" class="mb-3 cursor-pointer position-relative inquiry-media" data-toggle="modal" data-target="#mediaViewModal" @click="mediaViewIndex = index">
					<img :src="media.preview" alt="" class="w-100 rounded" />
					<image-icon v-if="media.type == 'image'" class="text-white position-absolute-center"></image-icon>
					<video-icon v-else-if="media.type == 'video'" class="text-white position-absolute-center"></video-icon>
				</div>
			</masonry>
		</div>

		<div class="col-md-4 overflow-hidden h-100 d-flex flex-column p-0">
			<div class="bg-white py-3 px-2 h6 shadow-sm">Messages</div>
			<div class="h-100 d-flex flex-column overflow-hidden">
				<div class="overflow-auto flex-grow-1 px-3 py-2">
					<p>{{ inquiry.message }}</p>
					<p>{{ inquiry.message }}</p>
					<p>{{ inquiry.message }}</p>
				</div>
				<div class="bg-white p-2 shadow-sm">
					<div class="d-flex">
						<input type="text" class="form-control form-control-sm" placeholder="Write your message..">
						<button class="btn btn-primary btn-sm ml-1"><send-icon size="1x"></send-icon></button>
					</div>
					<button class="btn btn-sm">
						<video-icon size="1.2x" class="cursor-pointer"></video-icon>
					</button>
					<gift-icon size="1x" class="mx-1 cursor-pointer"></gift-icon>
				</div>
			</div>
		</div>

		<div class="modal fade" tabindex="-1" role="dialog" id="mediaViewModal">
		  	<div class="modal-dialog modal-dialog-centered" role="document">
			    <div class="modal-content bg-black">
			      	<div class="modal-header p-0">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          	<span aria-hidden="true">&times;</span>
				        </button>
			      	</div>
			      	<div class="modal-body p-0 rounded overflow-hidden">
			      		<button v-if="mediaViewIndex > 0" class="btn bg-transparent outline-0 position-absolute h-50 shadow-none px-4 cursor-pointer media-control" @click="mediaViewIndex--">
			      			<chevron-left-icon class="position-absolute-center text-white" size="2x"></chevron-left-icon>
			      		</button>
			      		<img v-if="inquiry.inquiry_media[mediaViewIndex].type == 'image'" :src="inquiry.inquiry_media[mediaViewIndex].media" class="w-100">
			      		<video v-else-if="inquiry.inquiry_media[mediaViewIndex].type == 'video'" :src="inquiry.inquiry_media[mediaViewIndex].media" controls autoplay class="w-100 outline-0"></video>
			      		<button class="btn bg-transparent outline-0 position-absolute h-50 shadow-none px-4 cursor-pointer media-control" style="right: 0" @click="mediaViewIndex++" v-if="mediaViewIndex < inquiry.inquiry_media.length - 1">
			      			<chevron-right-icon class="position-absolute-center text-white" size="2x"></chevron-right-icon>
			      		</button>
			      	</div>
			    </div>
		  	</div>
		</div>
	</div>
</template>

<script>
import ImageIcon from 'vue-feather-icons/icons/ImageIcon';
import VideoIcon from 'vue-feather-icons/icons/VideoIcon';
import ChevronLeftIcon from 'vue-feather-icons/icons/ChevronLeftIcon';
import ChevronRightIcon from 'vue-feather-icons/icons/ChevronRightIcon';
import SendIcon from 'vue-feather-icons/icons/SendIcon';
import GiftIcon from 'vue-feather-icons/icons/GiftIcon';
import VueMasonry from './../../../components/vue-masonry.js';
Vue.use(VueMasonry);

export default {
	components: {
		ImageIcon,
		VideoIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
		SendIcon,
		GiftIcon,
	},

	data: () => ({
		inquiry: null,
		mediaViewIndex: 0
	}),

	computed: {},

	mounted() {},

	created() {
		this.$root.heading = 'Inquiries';
		this.getData();
	},

	methods: {
		getData() {
			axios.get(`/dashboard/inquiries/${this.$route.params.id}`).then((response) => {
				this.inquiry = response.data;
			});
		},

		goTo(id) {
			this.$router.push(`/dashboard/inquiries/${id}`);
		},
	},
};
</script>
