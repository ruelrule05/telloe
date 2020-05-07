<template>
	<div class="px-4 px-md-0 h-100 w-100">
		<div class="row h-100vh justify-content-center align-items-center mx-0" v-cloak>
			<div class="col-md-10">
				<vue-form-validate @submit="signup" class="mt-5">
					<h1 class="h2 mb-4 font-heading">Create your account</h1>
					<div class="form-group">
						<input type="text" v-model="signupForm.first_name" class="form-control form-control-lg" data-required placeholder="First Name" />
					</div>
					<div class="form-group">
						<input type="text" v-model="signupForm.last_name" class="form-control form-control-lg" data-required placeholder="Last Name" />
					</div>
					<div class="form-group">
						<input type="email" v-model="signupForm.email" class="form-control form-control-lg" data-required placeholder="Email" />
					</div>
					<div class="form-group">
						<input type="password" v-model="signupForm.password" class="form-control form-control-lg" data-required placeholder="Password" />
					</div>

					<div class="margin-bottom font-weight-light text-muted">By clicking the sign up button, you agree that you've read and accepted Snapturebox's <a href="/terms-of-service" target="_blank" class="underline">Terms of Service</a> and <a href="/privacy-policy" class="underline" target="_blank">Privacy Policy</a>.</div>

					<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none mt-3">Sign Up</vue-button>


					<button class="btn btn-link btn-sm text-body px-0" @click="$root.action = 'login'"><arrow-left-icon size="1x"></arrow-left-icon> Log In</button>
				</vue-form-validate>
			</div>
		</div>
	</div>
</template>

<script>
import ArrowLeftIcon from '../../icons/arrow-left';
export default {
	components: {ArrowLeftIcon},
	data: () => ({
		signupForm: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
		},
		loading: false,
	}),

	methods: {
		signup() {
			if (!this.loading) {
				this.loading = true;
				axios
					.post(`/signup`, this.signupForm)
					.then((response) => {
	                    window.location.href = response.data.redirect_url;
					})
					.catch((e) => {
						this.loading = false;
	                    this.$parent.error = e.response.data.message;
					});
			}
		},
	},
};
</script>
