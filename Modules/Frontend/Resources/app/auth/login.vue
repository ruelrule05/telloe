<template>
	<div class="h-100 w-100">
		<div class="row h-100 w-100 justify-content-center align-items-center mx-0" v-cloak>
			<div class="col-md-10">
				<vue-form-validate @submit="login">
					<h1 class="h2 mb-1 font-heading">Log In</h1>
					<div class="mb-3 text-muted">Continue to your account</div>
					<div class="form-group">
						<input type="email" v-model="loginForm.email" :disabled="(contact && contact.email) || (member && member.email)" class="form-control form-control-lg" data-required placeholder="Email" />
					</div>
					<div class="form-group">
						<input type="password" v-model="loginForm.password" class="form-control form-control-lg" data-required placeholder="Password" />
					</div>

					<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Log In</vue-button>
				</vue-form-validate>

				<div class="d-flex mx-n1 mt-4">
					<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="$parent.FacebookLogin" data-action="login"><facebook-icon height="20" width="20" class="mr-2"></facebook-icon>Facebook</button>
					<button type="button" class="btn btn-light shadow-none flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="$parent.Googlesignin"><google-icon height="16" width="16" class="mr-2"></google-icon>Google</button>
				</div>

				<div class="mt-3 font-size-14">
					<!-- <button class="btn btn-link btn-sm text-body p-0" @click="$root.action = 'recover'">Forgot password?</button> -->
					<div>
						<button type="button" class="btn btn-link btn-sm text-body p-0" @click="$root.action = 'recover'">Forgot password?</button>
						<div class="mt-1">
							<button type="button" class="btn btn-link btn-sm text-body p-0" @click="$root.action = 'signup'">Don't have an account?</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* global CONTACT */
/* global MEMBER */
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
import FacebookIcon from '../../icons/facebook';
import GoogleIcon from '../../icons/google';
export default {
	components: { VueFormValidate, VueButton, FacebookIcon, GoogleIcon },
	data: () => ({
		contact: null,
		member: null,
		loginForm: {
			email: '',
			password: '',
			invite_token: null,
			member_invite_token: null,
			timezone: null
		},
		loading: false
	}),

	created() {
		if (this.$root.email) this.loginForm.email = this.$root.email;
		this.loginForm.invite_token = this.$root.invite_token;
		this.loginForm.member_invite_token = this.$root.member_invite_token;
		this.contact = CONTACT;
		this.member = MEMBER;
		if (this.contact && this.contact.email) this.loginForm.email = this.contact.email;
		else if (this.member && this.member.email) this.loginForm.email = this.member.email;
		this.loginForm.timezone = this.$parent.timezone;
	},

	mounted() {
		if (this.$root.email) {
			setTimeout(() => {
				this.$el.querySelector('[type="password"]').focus();
			}, 500);
		}
	},

	methods: {
		login() {
			if (!this.loading) {
				this.loading = true;
				if (this.contact && this.contact.email) this.loginForm.email = this.contact.email;
				window.axios
					.post('/login', this.loginForm)
					.then(response => {
						this.$parent.socket.emit('invite_token', this.loginForm.invite_token);
						this.$parent.socket.emit('member_invite_token', this.loginForm.member_invite_token);
						setTimeout(() => {
							if (response.data.role_id == 2) {
								window.location.replace('/dashboard/bookings/calendar');
							} else if (response.data.role_id == 3) {
								window.location.replace('/dashboard/bookings');
							}
						}, 150);
					})
					.catch(e => {
						this.loading = false;
						this.$parent.error = e.response.data.message;
					});
			}
		}
	}
};
</script>
