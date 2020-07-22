<template>
	<div class="overflow-y-auto h-100">
		<div class="row justify-content-center py-3 h-100">
			<div class="col-md-10 h-100 position-relative">
				<div class="py-4 px-5 h-100">
					<h1 class="h3 mb-4">Client Inquiries</h1>
					<div class="d-flex align-items-center border-bottom">
						<search-icon></search-icon>
						<input type="text" class="form-control form-control-lg border-0 bg-light shadow-none pl-1" placeholder="Search for clients or database" />
					</div>

					<div class="row mx-n2 mt-4">
						<div class="col-md-6 col-lg-4 mb-3 px-2">
							<div class="d-flex align-items-center mb-3">
								<h6 class="mb-0">New Inquiries</h6>
								<div class="dropdown ml-auto">
									<button class="btn p-0 shadow-none dropdown-toggle" type="button" data-toggle="dropdown">
										<more-h-icon class="mr-n2"></more-h-icon>
									</button>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</div>
							<div class="shadow-sm cursor-pointer p-3 rounded bg-white mb-3" @click="selectedInquiry = inquiry" v-for="inquiry in inquiries">
								<div class="d-flex mb-3 align-items-center">
									<span class="badge badge-pill badge-warning text-white">New Enquiry</span>
									<small class="ml-auto text-gray">{{ inquiry.created_at }}</small>
								</div>
								<div class="media">
									<div class="user-profile-image mr-2" :style="[inquiry.user.profile_image ? {backgroundImage: 'url(' + inquiry.user.profile_image + ')'} : '']"></div>
									<div class="media-body">
										<div class="font-weight-bold mb-n1">{{ inquiry.user.full_name }}</div>
										<p class="my-3">{{ inquiry.excerpt }}</p>

										<div><strong>Enquiry Type:</strong> {{ inquiry.inquiry_type.type }}</div>
										<div><strong>Areas of Interestes:</strong> {{ inquiry.inquiry_type.type }}</div>

										<div v-if="inquiry.inquiry_media.length > 0" class="d-flex mt-3">
											<paperclip-icon height="30" width="30" class="ml-n2"></paperclip-icon>
											<img v-for="media in inquiry.inquiry_media" :src="media.preview" width="30" class="rounded mr-1">
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-6 col-lg-4 mb-3 px-2">
							<div class="d-flex align-items-center mb-3">
								<h6 class="mb-0">Existing Patients</h6>
								<div class="dropdown ml-auto">
									<button class="btn p-0 shadow-none dropdown-toggle" type="button" data-toggle="dropdown">
										<more-h-icon class="mr-n2"></more-h-icon>
									</button>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</div>
							<div class="shadow-sm cursor-pointer p-3 rounded bg-white mb-3" @click="selectedInquiry = inquiry" v-for="inquiry in inquiries">
								<div class="d-flex mb-3 align-items-center">
									<span class="badge badge-pill badge-warning text-white">New Enquiry</span>
									<small class="ml-auto text-gray">{{ inquiry.created_at }}</small>
								</div>
								<div class="media">
									<div class="user-profile-image mr-2" :style="[inquiry.user.profile_image ? {backgroundImage: 'url(' + inquiry.user.profile_image + ')'} : '']"></div>
									<div class="media-body">
										<div class="font-weight-bold mb-n1">{{ inquiry.user.full_name }}</div>
										<p class="my-3">{{ inquiry.excerpt }}</p>

										<div><strong>Enquiry Type:</strong> {{ inquiry.inquiry_type.type }}</div>
										<div><strong>Areas of Interestes:</strong> {{ inquiry.inquiry_type.type }}</div>

										<div v-if="inquiry.inquiry_media.length > 0" class="d-flex mt-3">
											<paperclip-icon height="30" width="30" class="ml-n2"></paperclip-icon>
											<img v-for="media in inquiry.inquiry_media" :src="media.preview" width="30" class="rounded mr-1">
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-6 col-lg-4 mb-3 px-2">
							<div class="d-flex align-items-center mb-3">
								<h6 class="mb-0">Follow Up Patients</h6>
								<div class="dropdown ml-auto">
									<button class="btn p-0 shadow-none dropdown-toggle" type="button" data-toggle="dropdown">
										<more-h-icon class="mr-n2"></more-h-icon>
									</button>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</div>
							<div class="shadow-sm cursor-pointer p-3 rounded bg-white mb-3" @click="selectedInquiry = inquiry" v-for="inquiry in inquiries">
								<div class="d-flex mb-3 align-items-center">
									<span class="badge badge-pill badge-warning text-white">New Enquiry</span>
									<small class="ml-auto text-gray">{{ inquiry.created_at }}</small>
								</div>
								<div class="media">
									<div class="user-profile-image mr-2" :style="[inquiry.user.profile_image ? {backgroundImage: 'url(' + inquiry.user.profile_image + ')'} : '']"></div>
									<div class="media-body">
										<div class="font-weight-bold mb-n1">{{ inquiry.user.full_name }}</div>
										<p class="my-3">{{ inquiry.excerpt }}</p>

										<div><strong>Enquiry Type:</strong> {{ inquiry.inquiry_type.type }}</div>
										<div><strong>Areas of Interestes:</strong> {{ inquiry.inquiry_type.type }}</div>

										<div v-if="inquiry.inquiry_media.length > 0" class="d-flex mt-3">
											<paperclip-icon height="30" width="30" class="ml-n2"></paperclip-icon>
											<img v-for="media in inquiry.inquiry_media" :src="media.preview" width="30" class="rounded mr-1">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		

					<div class="inquiry-details" :class="{'inquiry-details-open': selectedInquiry}">
						<inquiry-details v-if="selectedInquiry" :id="selectedInquiry.id" @hide="selectedInquiry = null"></inquiry-details>
					</div>

					<transition name="fade">
						<div class="backdrop" v-if="selectedInquiry"></div>
					</transition>
	</div>
</template>

<script>
import MoreHIcon from '../../../icons/more-h';
import SearchIcon from '../../../icons/search';
import PaperclipIcon from '../../../icons/paperclip';
import InquiryDetails from './show';
export default {
	components: {InquiryDetails, MoreHIcon, SearchIcon, PaperclipIcon},

	data: () => ({
		inquiries: [],
		selectedInquiry: null,
	}),

	computed: {},

	mounted() {},

	created() {
		this.$root.heading = 'Inquiries';
		this.getData();
	},

	methods: {
		getData() {
			axios.get('/dashboard/inquiries').then((response) => {
				this.inquiries = response.data;
				//this.selectedInquiry = this.inquiries[0];
				this.$root.contentloading = false;
			});
		},

		goTo(id) {
			this.$router.push(`/dashboard/inquiries/${id}`);
		},
	},
};
</script>
