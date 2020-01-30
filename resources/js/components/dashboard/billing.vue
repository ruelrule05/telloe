<template>
	<div class="overflow-auto h-100">
		<div class="row py-3 px-2 m-0">
			<div class="col-md-4 px-2" v-for="plan in plans">
				<div class="card shadow-sm mb-3">
					<div class="card-body">
						<h5 class="text-center">{{ plan.name }}</h5>
						<h6 class="text-center">${{ plan.price }}/month</h6>
						<p>{{ plan.description }}</p>
						<button class="btn btn-primary btn-block" :disabled="$root.auth.user_plan && $root.auth.user_plan.plan_id == plan.id">Subscribe</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VueFormValidate from './../../components/vue-form-validate.vue';
export default {
	components: {VueFormValidate},

	data: () => ({
		plans: []
	}),


	mounted() {
		this.$root.contentloading = false;
	},

	created() {
		this.$root.heading = 'Billing';
		this.getData();
	},

	watch: {},

	methods: {
		getData() {
			axios.get('/dashboard/plans').then((response) => {
				this.plans = response.data;
			});
		}
	},
};
</script>