<template>
	<div class="h-100 w-100">
		<div class="row h-100 justify-content-center align-items-center mx-0" v-cloak>
			<div class="col-md-10">
				<vue-form-validate @submit="login">
					<h1 class="h2 mb-1 font-heading">Log In</h1>
					<div class="mb-3 text-muted">Continue to your account</div>
					<div class="form-group">
						<input type="email" v-model="loginForm.email" class="form-control form-control-lg" data-required placeholder="Email">
					</div>
					<div class="form-group">
						<input type="password" v-model="loginForm.password" class="form-control form-control-lg" data-required placeholder="Password">
					</div>

					<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Log In</vue-button>
				</vue-form-validate>

				<hr data-content="OR LOGIN WITH" class="hr-text mt-5 mb-4">

				<div class="d-flex mx-n1">
					<button class="btn btn-light border flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="$parent.FacebookLogin" data-action="login"><facebook-icon height="20" width="20" class="mr-2"></facebook-icon>Facebook</button>
					<button class="btn btn-light border flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="$parent.Googlesignin"><google-icon height="16" width="16" class="mr-2"></google-icon>Google</button>
				</div>

				<div class="mt-3 font-size-14">
					<button class="btn btn-link btn-sm text-body p-0" @click="$root.action = 'recover'">Forgot password?</button>
					<div>
						<button to="/recover" class="btn btn-link btn-sm text-body p-0" @click="$root.action = 'signup'">Don't have an account?</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import FacebookIcon from '../../icons/facebook';
	import GoogleIcon from '../../icons/google';
	export default {
		components: {FacebookIcon, GoogleIcon},
		data: () => ({
	        loginForm: {
	            email: '',
	            password: '',
	        },
	        loading: false,
		}),

		methods: {
	        login() {
	            if (!this.loading) {
	                this.loading = true;
	                axios
	                    .post('/login', this.loginForm)
	                    .then((response) => {
	                        window.location.href = response.data.redirect_url;
	                    })
	                    .catch((e) => {
	                        this.loading = false;
	                        this.$parent.error = e.response.data.message;
	                    });
	            }
	        },
		}
	}
</script>