<template>
	<div class="row h-100 w-100 justify-content-center align-items-center mx-0" v-cloak>
		<div class="col-md-8">
			<div class="text-center" v-if="resetForm.success">
				<checkmark-icon class="fill-success" width="50" height="50"></checkmark-icon>
				<div class="text-muted mb-4">Your password has been updated successfully</div>
				<button class="btn btn-primary" type="button" @click="$root.action = 'login'"><span>Log In</span></button>
			</div>

			<vue-form-validate v-else @submit="reset" class="mt-4">
				<fieldset :disabled="loading">
					<div class="form-group mb-2">
						<input type="password" placeholder="New Password" v-model="resetForm.password" class="form-control" required />
					</div>
					<div class="form-group">
						<input type="password" placeholder="Confirm New Password" v-model="resetForm.password_confirmation" class="form-control" required />
					</div>
				</fieldset>
				<div class="flex justify-between mt-6">
					<button type="button" class="font-bold" @click="$root.action = 'login'"><u>Log In</u></button>
					<vue-button :loading="loading" type="submit" button_class="btn-primary ml-auto"><span>Update Password</span></vue-button>
				</div>
			</vue-form-validate>
		</div>
	</div>
</template>

<script>
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
import CheckmarkIcon from '../../icons/checkmark';
export default {
	components: { VueFormValidate, VueButton, CheckmarkIcon },
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
		this.$parent.heading = 'Update Password';
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
				.post('/reset', this.resetForm, { toast: true })
				.then(response => {
					this.$parent.heading = 'Password Updated';
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
