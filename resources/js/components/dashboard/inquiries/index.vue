<template>
	<div class="row px-1">
		<div class="col-md-4 mb-3 px-2" v-for="inquiry in inquiries">
			<div class="shadow-sm cursor-pointer p-3 rounded bg-white" @click="goTo(inquiry.id)">
				<div class="media align-items-center">
					<div class="user-profile-image mr-2" :style="{backgroundImage: 'url(' + inquiry.user.profile_image + ')'}"></div>
					<div class="media-body">
						<div class="font-weight-bold">{{ inquiry.user.full_name }}</div>
						<span class="text-gray">{{ inquiry.created_at }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		inquiries: [],
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
			});
		},

		goTo(id) {
			this.$router.push(`/dashboard/inquiries/${id}`);
		},
	},
};
</script>