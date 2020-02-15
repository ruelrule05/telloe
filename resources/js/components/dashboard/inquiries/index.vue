<template>
	<div class="overflow-hidden h-100 position-relative">
		<div class="overflow-y-auto py-4 px-5 h-100">
			<h1 class="h3 mb-2">Client Inquiries</h1>
			<input type="text" class="form-control" placeholder="Search for clients..">

			<div class="row mx-n2 mt-4">
				<div class="col-md-6 col-lg-4 mb-3 px-2">
					<h6 class="mb-3">New Inquiries</h6>
					<div class="shadow-sm cursor-pointer p-3 rounded bg-white mb-3" @click="selectedInquiry = inquiry" v-for="inquiry in inquiries">
						<div class="media">
							<div class="user-profile-image mr-2" :style="[inquiry.user.profile_image ? {backgroundImage: 'url(' + inquiry.user.profile_image + ')'} : '']"></div>
							<div class="media-body">
								<div class="font-weight-bold mb-n1">{{ inquiry.user.full_name }}</div>
								<small class="text-gray">{{ inquiry.created_at }}</small>
								<p class="my-2">{{ inquiry.excerpt }}</p>

								<div><strong>Enquiry Type:</strong> {{ inquiry.inquiry_type.type }}</div>
								<div><strong>Areas of Interestes:</strong> {{ inquiry.inquiry_type.type }}</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-6 col-lg-4 mb-3 px-2">
					<h6 class="mb-3">Existing Patients</h6>
					<div class="shadow-sm cursor-pointer p-3 rounded bg-white mb-3" @click="selectedInquiry = inquiry" v-for="inquiry in inquiries">
						<div class="media">
							<div class="user-profile-image mr-2" :style="[inquiry.user.profile_image ? {backgroundImage: 'url(' + inquiry.user.profile_image + ')'} : '']"></div>
							<div class="media-body">
								<div class="font-weight-bold mb-n1">{{ inquiry.user.full_name }}</div>
								<small class="text-gray">{{ inquiry.created_at }}</small>
								<p class="my-2">{{ inquiry.excerpt }}</p>

								<div><strong>Enquiry Type:</strong> {{ inquiry.inquiry_type.type }}</div>
								<div><strong>Areas of Interestes:</strong> {{ inquiry.inquiry_type.type }}</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-6 col-lg-4 mb-3 px-2">
					<h6 class="mb-3">Follow Up Patients</h6>
					<div class="shadow-sm cursor-pointer p-3 rounded bg-white mb-3" @click="selectedInquiry = inquiry" v-for="inquiry in inquiries">
						<div class="media">
							<div class="user-profile-image mr-2" :style="[inquiry.user.profile_image ? {backgroundImage: 'url(' + inquiry.user.profile_image + ')'} : '']"></div>
							<div class="media-body">
								<div class="font-weight-bold mb-n1">{{ inquiry.user.full_name }}</div>
								<small class="text-gray">{{ inquiry.created_at }}</small>
								<p class="my-2">{{ inquiry.excerpt }}</p>

								<div><strong>Enquiry Type:</strong> {{ inquiry.inquiry_type.type }}</div>
								<div><strong>Areas of Interestes:</strong> {{ inquiry.inquiry_type.type }}</div>
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
	</div>
</template>

<script>
import InquiryDetails from './show';
export default {
	components: {InquiryDetails},

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