<template>
	<div class="d-flex align-items-center h-100 w-100 justify-content-center align-items-center mx-0" v-cloak>
		<div class="card auth-card">
			<div class="card-body p-4">
				<div class="p-2">
					<img src="/logo.svg" height="18" />

					<!-- Signup form -->
					<template v-if="$root.signupStep == 0">
						<h4 class="text-primary font-heading mt-5 mb-4 font-weight-normal">WELCOME ABOARD!</h4>
						<vue-form-validate @submit="signup">
							<div class="form-row">
								<div class="col form-group">
									<label class="small">First Name</label>
									<input type="text" v-model="signupForm.first_name" class="form-control" data-required />
								</div>
								<div class="col form-group">
									<label class="small">Last Name</label>
									<input type="email" v-model="signupForm.last_name" class="form-control" data-required />
								</div>
							</div>
							<div class="form-group">
								<label class="small">Enter Your Email Address</label>
								<input type="email" v-model="signupForm.email" class="form-control" :disabled="(contact && contact.email) || (member && member.email)" data-required />
							</div>

							<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Let's do this</vue-button>
						</vue-form-validate>

						<div class="d-flex align-items-center my-4">
							<span>Or signup with:</span>
							<div class="ml-auto d-flex">
								<button class="btn btn-white border border-primary btn-icon btn-rounded" type="button" @click="$parent.FacebookLogin" data-action="login"><FacebookAltIcon height="10" width="10" transform="scale(1.6)"></FacebookAltIcon></button>
								<button class="btn btn-white border border-primary btn-rounded ml-2" type="button" @click="$parent.Googlesignin" data-action="login"><GoogleAltIcon height="10" width="10" transform="scale(1.4)"></GoogleAltIcon></button>
							</div>
						</div>

						<hr class="mb-4" />

						<div class="text-center">Already have an account? <span class="text-primary cursor-pointer hover-underline" @click="$root.action = 'login'">Jump to login</span></div>
					</template>

					<!-- Calendar link username -->
					<template v-else-if="$root.signupStep == 1">
						<h4 class="text-primary font-heading mt-5 mb-4 font-weight-normal">CREATE A LINK TO YOUR CALENDAR</h4>
						<vue-form-validate @submit="goToStep(2)">
							<div class="form-group">
								<div class="form-control form-prefix d-flex align-items-center overflow-hidden">
									<span class="text-muted">{{ rootUrl }}/@</span>
									<input type="text" v-model="signupForm.username" class="form-control border-0 shadow-none pl-0 font-weight-bold" data-required />
								</div>
							</div>

							<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Set and continue</vue-button>
						</vue-form-validate>
					</template>

					<!-- Timezone -->
					<template v-else-if="$root.signupStep == 2">
						<h4 class="text-primary font-heading mt-5 mb-4 font-weight-normal">SELECT YOUR TIMEZONE</h4>
						<vue-form-validate @submit="$root.signupStep = 3">
							<div class="form-group">
								<vue-select :options="timezonesOptions" searchable v-model="signupForm.timezone" button_class="form-control" dropdown_class="w-100"></vue-select>
							</div>

							<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Continue</vue-button>
						</vue-form-validate>
					</template>

					<!-- Availability -->
					<template v-else-if="$root.signupStep == 3">
						<h4 class="text-primary font-heading mt-5 mb-2 font-weight-normal">SET YOUR AVAILABILITY</h4>
						<div class="mb-3">You can change availability information later.</div>
						<vue-form-validate @submit="$root.signupStep = 4">
							<timerangepicker start="08:00" end="18:00" class="mb-2"></timerangepicker>

							<div v-for="(day, key) in signupForm.availability.days" :key="key" class="border-bottom py-2"><VueCheckbox v-model="day.is_available" :label="key"></VueCheckbox></div>

							<vue-button type="submit" :loading="loading" button_class="mt-3 btn btn-primary btn-block btn-lg shadow-none">Continue</vue-button>
						</vue-form-validate>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* global CONTACT */
/* global MEMBER */
/* global axios */
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
import FacebookAltIcon from '../../icons/facebook-alt.vue';
import GoogleAltIcon from '../../icons/google-alt.vue';
import VueSelect from '../../components/vue-select/vue-select.vue';
import VueCheckbox from '../../components/vue-checkbox/vue-checkbox.vue';
import Timerangepicker from '../../components/timerangepicker/timerangepicker.vue';

const ct = require('countries-and-timezones');
export default {
	components: { VueFormValidate, VueButton, FacebookAltIcon, GoogleAltIcon, VueSelect, Timerangepicker, VueCheckbox },
	data: () => ({
		contact: null,
		member: null,
		signupForm: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			invite_token: null,
			member_invite_token: null,
			timezone: null,
			username: '',
			availability: {
				from: '08:00',
				to: '18:00',
				days: {
					Monday: {
						is_available: true
					},
					Tuesday: {
						is_available: true
					},
					Wednesday: {
						is_available: true
					},
					Thursday: {
						is_available: true
					},
					Friday: {
						is_available: true
					},
					Saturday: {
						is_available: false
					},
					Sunday: {
						is_available: false
					}
				}
			}
		},
		loading: false,
		timezonesOptions: []
	}),
	computed: {
		rootUrl() {
			return window.location.hostname;
		}
	},

	created() {
		this.signupForm.invite_token = this.$root.invite_token;
		this.signupForm.member_invite_token = this.$root.member_invite_token;
		this.contact = CONTACT;
		this.member = MEMBER;
		if (this.contact) {
			if (this.contact.email) this.signupForm.email = this.contact.email;
			if (this.contact.first_name) this.signupForm.first_name = this.contact.first_name;
			if (this.contact.last_name) this.signupForm.last_name = this.contact.last_name;
		} else if (this.member) {
			if (this.member.email) this.signupForm.email = this.member.email;
			if (this.member.first_name) this.signupForm.first_name = this.member.first_name;
			if (this.member.last_name) this.signupForm.last_name = this.member.last_name;
		}
		this.signupForm.timezone = this.$parent.timezone;
		Object.keys(ct.getAllTimezones()).forEach(timezone => {
			this.timezonesOptions.push({
				text: timezone,
				value: timezone
			});
		});
	},

	methods: {
		async goToStep(step) {
			let response = await axios.post('/auth', this.signupForm).catch(e => {
				console.log(e.response.data.message);
			});
			if (response) {
				this.$root.signupStep = step;
			}
		},

		signup() {
			return;
			/* eslint-disable */
			if (!this.loading) {
				this.loading = true;
				if (this.contact && this.contact.email) this.signupForm.email = this.contact.email;
				else if (this.member && this.member.email) this.signupForm.email = this.member.email;
				window.axios
					.post(`/signup`, this.signupForm)
					.then(() => {
						// show next screen
						// setTimeout(() => {
						// 	window.location.href = '/dashboard/bookings/calendar';
						// }, 150);
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

<style scoped lang="scss">
@import '../../sass/variables';
.form-control.form-prefix:focus-within {
	box-shadow: $input-focus-box-shadow;
	border: solid 1px $primary;
}
</style>
