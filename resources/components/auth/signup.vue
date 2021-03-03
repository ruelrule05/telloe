<template>
	<div v-cloak>
		<!-- Signup form -->
		<template v-if="$root.signupStep == 0">
			<vue-form-validate @submit="signup">
				<div class="flex mb-5">
					<div class="pr-3">
						<label>First Name</label>
						<input type="text" v-model="signupForm.first_name" data-required />
					</div>
					<div class="pl-3">
						<label>Last Name</label>
						<input type="email" v-model="signupForm.last_name" data-required />
					</div>
				</div>
				<div class="mb-5">
					<label class="small">Enter Your Email Address</label>
					<input type="email" v-model="signupForm.email" :disabled="(contact && contact.email) || (member && member.email)" data-required />
				</div>
				<div class="mb-7">
					<label class="small">Set a Password</label>
					<div class="relative">
						<input :type="showPassword ? 'text' : 'password'" v-model="signupForm.password" data-required />
						<button type="button" class="p-1 absolute transform -translate-y-1/2 top-1/2 right-2 rounded-full transition-all hover:bg-gray-200 focus:outline-none" @click="showPassword = !showPassword"><component :is="passwordEye" height="20" width="20"></component></button>
					</div>
				</div>

				<vue-button type="submit" :loading="loading" button_class="btn btn-primary w-full"><span>Let's do this</span></vue-button>
			</vue-form-validate>

			<div class="flex items-center my-8">
				<span>Or signup with:</span>
				<div class="ml-auto flex">
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-all hover:bg-gray-100" type="button" @click="$parent.FacebookLogin" data-action="login"><FacebookAltIcon height="10" width="10" transform="scale(1.6)" class=" fill-primary"></FacebookAltIcon></button>
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-all hover:bg-gray-100 ml-3" type="button" @click="$parent.Googlesignin" data-action="login"><GoogleAltIcon height="10" width="10" transform="scale(1.4)" class=" fill-primary"></GoogleAltIcon></button>
				</div>
			</div>

			<hr class="mb-8" />

			<div class="text-center">Already have an account? <span class="text-primary cursor-pointer hover:underline" @click="$root.action = 'login'">Jump to login</span></div>
		</template>

		<!-- Calendar link username -->
		<template v-else-if="$root.signupStep == 1">
			<vue-form-validate @submit="goToStep(2)">
				<div class="mb-7">
					<div class="form-prefix flex items-center overflow-hidden border">
						<span class="text-gray-400 font-light">{{ rootUrl }}/@</span>
						<input type="text" v-model="$root.auth.username" class="p-0 font-bold ring-opacity-0 w-auto flex-1 border-0 rounded-none" data-required />
					</div>
				</div>

				<vue-button type="submit" :loading="loading" button_class="btn btn-primary w-full">Set and continue</vue-button>
			</vue-form-validate>
		</template>

		<!-- Timezone -->
		<template v-else-if="$root.signupStep == 2">
			<vue-form-validate @submit="goToStep(3)">
				<div class="mb-7">
					<vue-select :options="timezonesOptions" searchable v-model="$root.auth.timezone"></vue-select>
				</div>

				<vue-button type="submit" :loading="loading" button_class="btn btn-primary w-full">Continue</vue-button>
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
</template>

<script>
/* global CONTACT */
/* global MEMBER */
/* global axios */
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
import FacebookAltIcon from '../../icons/facebook-alt.vue';
import GoogleAltIcon from '../../icons/google-alt.vue';
import EyeIcon from '../../icons/eye.vue';
import EyeSlashIcon from '../../icons/eye-slash.vue';
import VueSelect from '../../components/vue-select/vue-select.vue';
import VueCheckbox from '../../components/vue-checkbox/vue-checkbox.vue';
import Timerangepicker from '../../components/timerangepicker/timerangepicker.vue';

const ct = require('countries-and-timezones');
export default {
	components: { VueFormValidate, VueButton, FacebookAltIcon, GoogleAltIcon, VueSelect, Timerangepicker, VueCheckbox, EyeIcon, EyeSlashIcon },
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
		timezonesOptions: [],
		showPassword: false
	}),

	computed: {
		rootUrl() {
			return window.location.hostname;
		},

		heading() {
			let heading = '';
			switch (this.$root.signupStep) {
				case 0:
					heading = 'Welcome aboard!';
					break;
				case 1:
					heading = 'Create a link to your calendar';
					break;
				case 2:
					heading = 'Select your timezone';
					break;
			}
			return heading;
		},

		passwordEye() {
			return this.showPassword ? 'EyeIcon' : 'EyeSlashIcon';
		}
	},

	created() {
		this.$parent.heading = this.heading;
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
			this.loading = true;
			let data = this.$root.auth || this.signupForm;
			let response = await axios.post('/auth', data).catch(e => {
				console.log(e.response.data.message);
			});
			if (response) {
				this.$root.signupStep = step;
			}
			this.loading = false;
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
.form-prefix {
	@apply border border-gray-300 text-base rounded-md font-medium w-full outline-none px-3 py-2 transition-all ring-primary ring-offset-1;
	&:focus,
	&:focus-within {
		@apply border-gray-500 ring-2;
	}
}
</style>
