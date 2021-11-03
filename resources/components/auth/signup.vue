<template>
	<div v-cloak>
		<!-- Signup form -->
		<template v-if="$root.signupStep == 0">
			<vue-form-validate @submit="signup">
				<div class="flex  mb-5">
					<div class="pr-3 w-1/2">
						<label class="text-muted" required>First Name</label>
						<input type="text" v-model="signupForm.first_name" data-required />
					</div>
					<div class="pl-3 w-1/2">
						<label class="text-muted" required>Last Name</label>
						<input type="text" v-model="signupForm.last_name" data-required />
					</div>
				</div>
				<div class="mb-5">
					<label class="text-muted" required>Enter Your Email Address</label>
					<input type="email" v-model="signupForm.email" :disabled="(contact && contact.email) || (member && member.email)" data-required />
				</div>
				<div class="mb-7">
					<label class="text-muted" required>Set a Password</label>
					<div class="relative">
						<input :type="showPassword ? 'text' : 'password'" v-model="signupForm.password" data-required />
						<button type="button" class="p-1 absolute transform -translate-y-1/2 top-1/2 right-2 rounded-full transition-colors hover:bg-gray-200 focus:outline-none" @click="showPassword = !showPassword"><component :is="passwordEye" height="15" width="15"></component></button>
					</div>
				</div>

				<vue-button type="submit" :loading="loading" button_class="btn btn-primary w-full"><span>Let's do this</span></vue-button>
			</vue-form-validate>

			<div class="flex items-center my-8">
				<span class="text-muted">Or signup with:</span>
				<div class="ml-auto flex">
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="$parent.FacebookLogin" data-action="login"><FacebookAltIcon height="10" width="10" transform="scale(1.6)" class="fill-current text-primary"></FacebookAltIcon></button>
					<button class="border border-primary rounded-full p-4 focus:outline-none transition-colors hover:bg-gray-100 ml-3" type="button" @click="$parent.GoogleSignin" data-action="login"><GoogleAltIcon height="10" width="10" transform="scale(1.4)" class="fill-current text-primary"></GoogleAltIcon></button>
				</div>
			</div>

			<hr class="mb-8" />

			<div class="text-center text-muted">Already have an account? <span class="text-primary cursor-pointer hover:underline" @click="$root.action = 'login'">Jump to login</span></div>
		</template>

		<!-- Calendar link username -->
		<template v-else-if="$root.signupStep == 1">
			<vue-form-validate @submit="goToStep(2)">
				<div class="mb-7">
					<div class="form-prefix">
						<span class="text-gray-500">{{ rootUrl }}/@</span>
						<input type="text" v-model="$root.auth.username" class="p-0 font-bold ring-opacity-0 w-auto flex-1 border-0 shadow-none rounded-none" data-required />
					</div>
				</div>

				<vue-button type="submit" :loading="loading" button_class="btn btn-primary w-full"><span>Set and continue</span></vue-button>
			</vue-form-validate>
		</template>

		<!-- Timezone -->
		<template v-else-if="$root.signupStep == 2">
			<vue-form-validate @submit="goToStep(3)">
				<div class="mb-7">
					<vue-select :options="timezonesOptions" placeholder="Set timezone" dropPosition="w-full" searchable v-model="$root.auth.timezone"></vue-select>
				</div>

				<vue-button type="submit" :loading="loading" button_class="btn btn-primary w-full"><span>Continue</span></vue-button>
			</vue-form-validate>
		</template>

		<!-- Availability -->
		<template v-else-if="$root.signupStep == 3">
			<div class="mb-3 text-muted">You can change availability information later.</div>
			<vue-form-validate @submit="goToStep(4)">
				<timerangepicker hide-clear-button dropdown-w-full start="06:00" end="18:00" class="mb-2"></timerangepicker>

				<div v-for="(day, index) in $root.auth.default_availability" :key="day.name" class="py-3" :class="{ 'border-top': index > 0 }">
					<VueCheckbox v-model="day.is_available" :label="day.day"></VueCheckbox>
				</div>

				<vue-button type="submit" :loading="loading" button_class="mt-3 btn btn-primary w-full">Continue</vue-button>
			</vue-form-validate>
		</template>
	</div>
</template>

<script>
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

const ct = require('countries-and-timezones').default;
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
			username: ''
			// default_availability: {
			// 	from: '08:00',
			// 	to: '18:00',
			// 	days: [
			// 		{
			// 			day: 'Monday',
			// 			is_available: true
			// 		},
			// 		{
			// 			day: 'Tuesday',
			// 			is_available: true
			// 		},
			// 		{
			// 			day: 'Wednesday',
			// 			is_available: true
			// 		},
			// 		{
			// 			day: 'Thursday',
			// 			is_available: true
			// 		},
			// 		{
			// 			day: 'Friday',
			// 			is_available: true
			// 		},
			// 		{
			// 			day: 'Saturday',
			// 			is_available: false
			// 		},
			// 		{
			// 			day: 'Sunday',
			// 			is_available: false
			// 		}
			// 	]
			// }
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
				case 3:
					heading = 'Set your availability';
					break;
			}
			return heading;
		},

		passwordEye() {
			return this.showPassword ? 'EyeSlashIcon' : 'EyeIcon';
		}
	},

	watch: {
		heading: function(value) {
			this.$parent.heading = value;
		}
	},

	created() {
		this.$parent.heading = this.heading;
		this.signupForm.invite_token = this.$root.invite_token;
		this.signupForm.member_invite_token = this.$root.member_invite_token;
		this.contact = window.CONTACT;
		this.member = window.MEMBER;
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
			let response = await axios.post('/auth', data, { toast: true }).catch(e => {
				this.$parent.error = e.response.data.message;
			});
			if (response && step < 4) {
				this.$root.signupStep = step;
			}
			this.loading = false;
			if (step == 4) {
				this.loading = true;
				window.location.href = '/dashboard/calendar';
			}
		},

		signup() {
			if (!this.loading) {
				const queryString = window.location.search;
				const urlParams = new URLSearchParams(queryString);

				if (urlParams.get('member_invite_token')) {
					this.signupForm.member_invite_token = urlParams.get('member_invite_token');
				}

				this.loading = true;
				if (this.contact && this.contact.email) this.signupForm.email = this.contact.email;
				else if (this.member && this.member.email) this.signupForm.email = this.member.email;
				window.axios
					.post(`/signup`, this.signupForm, { toast: true })
					.then(response => {
						this.$root.auth = response.data;
						this.$root.signupStep = 1;
						this.loading = false;
						this.trackier();
					})
					.catch(e => {
						this.loading = false;
						this.$parent.error = e.response.data.message;
					});
			}
		},

		trackier() {
			let clickId = this.getCookieVal('click_id') || '';
			if (clickId) {
				var a = document.createElement('iframe');
				a.setAttribute('src', 'https://trk.telloe.com/pixel?av=60c7d6899e6fbd61962cc603&sale_amount=AMOUNT&currency=USD&goal_value=Registration&click_id=' + clickId);
				a.style.width = '1';
				a.style.height = '1';
				document.body.appendChild(a);
			}
		},

		getCookieVal(name) {
			const allCookies = document.cookie.split('; ');
			var result = null;
			allCookies.forEach(function(v) {
				if (v.indexOf(name + '=') !== -1) {
					result = v.split('=')[1];
					return false;
				}
			});
			return result;
		}
	}
};
</script>

<style scoped lang="scss">
.form-prefix {
	@apply border border-gray-300 text-sm rounded-md font-medium w-full outline-none px-3 py-2 transition-all ring-primary ring-offset-1  flex items-center overflow-hidden border shadow-inner;
	&:focus,
	&:focus-within {
		@apply border-gray-500 ring-2;
	}
}
</style>
