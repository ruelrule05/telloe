<template>
	<div class="row py-3 px-2 m-0">
		<div class="col-md-4 mb-3 px-2">
			<div class="shadow-sm cursor-pointer p-3 rounded bg-white text-center" @click="goTo('/dashboard/inquiries')">
				<h2 class="h6">Inquiries</h2>
				<h6 class="h1 mb-0">{{ reports.inquiries }}</h6>
			</div>
		</div>
		<div class="col-md-4 mb-3 px-2">
			<div class="shadow-sm cursor-pointer p-3 rounded bg-white text-center">
				<h2 class="h6">Bookings</h2>
				<h6 class="h1 mb-0">{{ reports.bookings }}</h6>
			</div>
		</div>
		<div class="col-md-4 mb-3 px-2">
			<div class="shadow-sm cursor-pointer p-3 rounded bg-white text-center">
				<h2 class="h6">Customers</h2>
				<h6 class="h1 mb-0">120</h6>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		reports: [],
	}),

	computed: {},

	mounted() {},

	created() {
		this.$root.heading = 'Dashboard';
		this.getData();
	},

	methods: {
		getData() {
			axios.get('/dashboard').then((response) => {
				this.reports = response.data;
				this.$root.contentloading = false;
			});
		},

		goTo(route) {
			this.$router.push(route);
		},
	},
};
</script>