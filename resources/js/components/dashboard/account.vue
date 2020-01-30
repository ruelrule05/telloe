<template>
	<div class="p-3 overflow-auto h-100" v-if="user">
		<div class="row">
			<div class="col-md-8">

				<!-- Profile -->
				<div class="card shadow-sm mb-3">
					<div class="card-body">
						<h5>Profile</h5>
						<vue-form-validate action="">
							<div class="form-group">
								<label class="form-label required">First Name</label>
								<input type="text" class="form-control" data-required placeholder="First Name" v-model="user.first_name">
							</div>
							<div class="form-group">
								<label class="form-label required">Last Name</label>
								<input type="text" class="form-control" data-required placeholder="Last Name" v-model="user.last_name">
							</div>
							<div class="form-group">
								<label class="form-label required">Email</label>
								<input type="email" class="form-control" data-required placeholder="Email" v-model="user.email">
							</div>
							<div class="text-right">
								<button type="submit" class="btn btn-primary">Update</button>
							</div>
						</vue-form-validate>
					</div>
				</div>

				<!-- Security -->
				<div class="card shadow-sm">
					<div class="card-body">
						<h5>Security</h5>
						<vue-form-validate action="">
							<div class="form-group">
								<label class="form-label required">Current Password</label>
								<input type="password" class="form-control" data-required placeholder="Current Password">
							</div>
							<div class="form-group">
								<label class="form-label required">New Password</label>
								<input type="password" class="form-control" data-required placeholder="New Password">
							</div>
							<div class="form-group">
								<label class="form-label required">Confirm Password</label>
								<input type="password" class="form-control" data-required placeholder="Confirm Password">
							</div>
							<div class="text-right">
								<button type="submit" class="btn btn-primary">Update</button>
							</div>
						</vue-form-validate>
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
		user: null
	}),

	mounted() {
		this.$root.contentloading = false;
	},

	created() {
		this.user = Object.assign({}, this.$root.auth);
		this.$root.heading = 'Account';
	},


	methods: {
	},
};
</script>