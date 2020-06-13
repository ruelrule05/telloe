<template>
	<div class="px-4 px-md-0 h-100 w-100">
		<div class="row h-100vh justify-content-center align-items-center mx-0" v-cloak>
			<div class="col-md-10">
				<vue-form-validate @submit="signup" class="mt-2">
					<h1 class="h2 mb-4 font-heading">Create your account</h1>
					<div class="form-group">
						<input type="text" v-model="signupForm.first_name" class="form-control form-control-lg" data-required placeholder="First Name" />
					</div>
					<div class="form-group">
						<input type="text" v-model="signupForm.last_name" class="form-control form-control-lg" data-required placeholder="Last Name" />
					</div>
					<div class="form-group">
						<input type="email" v-model="signupForm.email" :disabled="user_customer && user_customer.email" class="form-control form-control-lg" data-required placeholder="Email" />
					</div>
					<div class="form-group">
						<input type="password" v-model="signupForm.password" class="form-control form-control-lg" data-required placeholder="Password" />
					</div>

					<div class="margin-bottom font-weight-light text-muted">By clicking the sign up button, you agree that you've read and accepted Snapturebox's <a href="/terms-of-service" target="_blank" class="underline">Terms of Service</a> and <a href="/privacy-policy" class="underline" target="_blank">Privacy Policy</a>.</div>

					<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none mt-3">Sign Up</vue-button>

					<button class="btn btn-link btn-sm text-body px-0" @click="$root.action = 'login'"><arrow-left-icon size="1x"></arrow-left-icon> Log In</button>

					<div class="d-flex mx-n1 mt-4">
						<button class="btn btn-light border flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="$parent.FacebookLogin" data-action="login"><facebook-icon height="20" width="20" class="mr-2"></facebook-icon>Facebook</button>
						<button class="btn btn-light border flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="$parent.Googlesignin"><google-icon height="16" width="16" class="mr-2"></google-icon>Google</button>
					</div>
				</vue-form-validate>
			</div>
		</div>
	</div>
</template>

<script>
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
import FacebookIcon from '../../icons/facebook';
import GoogleIcon from '../../icons/google';
import ArrowLeftIcon from '../../icons/arrow-left';
export default {
	components: {VueFormValidate, VueButton, FacebookIcon, GoogleIcon, ArrowLeftIcon},
	data: () => ({
		user_customer: null,
		signupForm: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			invite_token: null,
	        timezone: null,
		},
		loading: false,
	}),
	
	created() {
		this.signupForm.invite_token = this.$root.invite_token;
		this.user_customer = USER_CUSTOMER;
		if(this.user_customer && this.user_customer.email) this.signupForm.email = this.user_customer.email;
		this.signupForm.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	},

	methods: {
		signup() {
			if (!this.loading) {
				this.loading = true;
				if(this.user_customer && this.user_customer.email) this.signupForm.email = this.user_customer.email;
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
