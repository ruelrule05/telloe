<template>
	<div class="row h-100 w-100 justify-content-center align-items-center mx-0" v-cloak>
		<div class="col-md-8">
			<div class="text-center" v-if="resetForm.success">
				<checkmark-icon class="fill-success" width="50" height="50"></checkmark-icon>
				<h3 class="mt-2 mb-0 font-heading">Password updated</h3>
				<div class="text-muted mb-4">Your password has been updated successfully</div>
				<button
					type="button"
					@click="
						$root.action = 'login';
						resetForm.success = false;
					"
					class="btn btn-light btn-block-sm shadow-none d-inline-flex align-items-center"
				>
					<arrow-left-icon></arrow-left-icon>Log In
				</button>
			</div>

			<vue-form-validate v-else @submit="reset" class="mt-4">
				<div class="text-center">
					<h1 class="h3 mb-4 font-heading">Update password</h1>
				</div>

				<fieldset :disabled="loading">
					<div class="form-group mb-2">
						<input type="password" placeholder="New Password" v-model="resetForm.password" class="form-control" required />
					</div>
					<div class="form-group">
						<input type="password" placeholder="Confirm New Password" v-model="resetForm.password_confirmation" class="form-control" required />
					</div>
				</fieldset>
				<div class="d-flex align-items-center">
					<button
						type="button"
						@click="
							$root.action = 'login';
							resetForm.success = false;
						"
						class="btn btn-link text-body pl-0 shadow-none d-inline-flex align-items-center"
					>
						<arrow-left-icon></arrow-left-icon>Log In
					</button>
					<vue-button :loading="loading" type="submit" button_class="btn-primary ml-auto">Update Password</vue-button>
				</div>
			</vue-form-validate>
		</div>
	</div>
</template>

<script>
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
import ArrowLeftIcon from '../../icons/arrow-left';
import CheckmarkIcon from '../../icons/checkmark';
export default {
	components: { VueFormValidate, VueButton, ArrowLeftIcon, CheckmarkIcon },
	data: () => ({
		resetForm: {
			password: '',
			password_confirmation: '',
			token: '',
			success: false
		},
		loading: false
	}),

	created() {
		const queryString = window.location.search;
		if (queryString) {
			const urlParams = new URLSearchParams(queryString);
			this.resetForm.token = urlParams.get('token');
		}
	},

	methods: {
		reset() {
			this.loading = true;
			window.axios
				.post('/reset', this.resetForm)
				.then(response => {
					this.loading = false;
					this.resetForm.success = true;
					this.$root.email = response.data.email;
					this.$parent.error = '';
				})
				.catch(e => {
					this.loading = false;
					this.$parent.error = e.response.data.message;
				});
		}
	}
};
</script>
