<template>
	<div class="h-100 w-100">
		<div class="d-flex align-items-center h-100 w-100 justify-content-center align-items-center mx-0" v-cloak>
			<div class="card auth-card">
				<div class="card-body p-4">
					<div class="p-2">
						<img src="/logo.svg" height="18" />
						<h4 class="text-primary font-heading mt-5 mb-4 font-weight-normal">WELCOME BACK!</h4>
						<vue-form-validate @submit="login">
							<div class="form-group mb-3">
								<label class="small">Enter Your Email Address</label>
								<input type="email" v-model="loginForm.email" :disabled="(contact && contact.email) || (member && member.email)" class="form-control" data-required />
							</div>
							<div class="form-group">
								<div class="d-flex align-items-center">
									<label class="small">Enter Your Password</label>
									<label class="small text-primary ml-auto cursor-pointer hover-underline">Forgot password?</label>
								</div>
								<input type="password" v-model="loginForm.password" class="form-control" data-required />
							</div>

							<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Let me in</vue-button>
						</vue-form-validate>

						<div class="d-flex align-items-center my-4">
							<span>Or login with:</span>
							<div class="ml-auto d-flex">
								<button class="btn btn-white border border-primary btn-icon btn-rounded" type="button" @click="$parent.FacebookLogin" data-action="login"><FacebookAltIcon height="10" width="10" transform="scale(1.6)"></FacebookAltIcon></button>
								<button class="btn btn-white border border-primary btn-rounded ml-2" type="button" @click="$parent.Googlesignin" data-action="login"><GoogleAltIcon height="10" width="10" transform="scale(1.4)"></GoogleAltIcon></button>
							</div>
						</div>

						<hr class="mb-4" />

						<div class="text-center">Don't have an account? <span class="text-primary cursor-pointer hover-underline" @click="$root.action = 'signup'">Create one</span></div>
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
import FacebookAltIcon from '../../icons/facebook-alt.vue';
import GoogleAltIcon from '../../icons/google-alt.vue';
export default {
	components: { VueFormValidate, VueButton, FacebookAltIcon, GoogleAltIcon },
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
