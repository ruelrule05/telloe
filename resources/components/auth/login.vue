<template>
	<div>
		<vue-form-validate @submit="login">
			<div class="mb-5">
				<label class="text-muted" required>Enter Your Email Address</label>
				<input type="email" v-model="loginForm.email" :disabled="(contact && contact.email) || (member && member.email)" data-required />
			</div>
			<div class="mb-7">
				<div class="flex align-center">
					<label class="text-muted" required>Enter Your Password</label>
					<label class="small text-primary ml-auto cursor-pointer hover:underline forgot-password" @click="$root.action = 'recover'">Forgot password?</label>
				</div>
				<input type="password" v-model="loginForm.password" data-required />
			</div>
			<vue-button type="submit" :loading="loading" button_class="btn btn-primary w-full"><span>Let me in</span></vue-button>
		</vue-form-validate>

		<div class="flex items-center my-8">
			<span class="text-muted">Or login with:</span>
			<div class="ml-auto flex">
				<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="$parent.FacebookLogin" data-action="login"><FacebookAltIcon height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></FacebookAltIcon></button>
				<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100 ml-3" type="button" @click="$parent.GoogleSignin" data-action="login"><GoogleAltIcon height="10" width="10" transform="scale(1.4)" class="fill-current text-primary"></GoogleAltIcon></button>
			</div>
		</div>

		<div class="auth-footer">
			<hr class="mb-8" />

			<div class="text-center text-muted">Don't have an account? <span class="text-primary cursor-pointer hover:underline" @click="$root.action = 'signup'">Create one</span></div>
		</div>
	</div>
</template>

<script>
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
		this.$parent.heading = 'Welcome back!';
		if (this.$root.email) this.loginForm.email = this.$root.email;
		this.loginForm.invite_token = this.$root.invite_token;
		this.loginForm.member_invite_token = this.$root.member_invite_token;
		this.contact = window.CONTACT;
		this.member = window.MEMBER;
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
		async login() {
			if (!this.loading) {
				this.loading = true;

				if (this.contact && this.contact.email) this.loginForm.email = this.contact.email;
				await window.axios
					.post('/login', this.loginForm, { toast: true })
					.then(() => {
						setTimeout(() => {
							if (this.$root.action == 'conversation') {
								window.location.reload();
							} else {
								window.location.replace('/dashboard/calendar');
							}
						}, 150);
					})
					.catch(() => {
						this.loading = false;
					});
			}
		}
	}
};
</script>
