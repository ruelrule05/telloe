import VueFormValidate from '../../../components/vue-form-validate.vue';
import VueButton from '../../../components/vue-button.vue';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
import ExclamationCircleIcon from '../../../icons/exclamation-circle';
import CheckmarkCircleIcon from '../../../icons/checkmark-circle';
const {getNameList} = require('country-list');
export default {
	components: {
		VueFormValidate,
		VueButton,
		VCalendar,

		ExclamationCircleIcon,
		CheckmarkCircleIcon,
	},

	data: () => ({
		user: null,
		tabs: ['Profile', 'Security', 'Payout'],
		tab: 'Payout',
		securityForm: {
			current_password: '',
			password: '',
			password_confirmation: '',
		},
		stripeAccountForm: {
			country: '',
			countryDisabled: false,
			loading: false,
		},
	}),

	computed: {
		countries() {
			let countries = [];
			Object.entries(getNameList()).forEach(([name, code]) => {
				countries.push({
					name: name,
					code: code,
				});
			});
			countries = countries.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
			return countries;
		},
	},

	created() {
		this.user = Object.assign({}, this.$root.auth);
		this.$root.heading = 'Account';
		if (Object.keys(this.user.stripe_account).length > 0) {
			let stripe_account = this.user.stripe_account;
			this.stripeAccountForm.country = stripe_account.country;
			this.stripeAccountForm.address = stripe_account.individual.address.line1;
			this.stripeAccountForm.city = stripe_account.individual.address.city;
			this.stripeAccountForm.state = stripe_account.individual.address.state;
			this.stripeAccountForm.postal = stripe_account.individual.address.postal_code;
			this.stripeAccountForm.website = stripe_account.business_profile.url;
			this.stripeAccountForm.phone = stripe_account.individual.phone;
			let dob = stripe_account.individual.dob;
			if (dob) this.stripeAccountForm.dob = new Date(dob.year, dob.month, dob.day);
			if (stripe_account.country) this.stripeAccountForm.countryDisabled = true;

			if ((stripe_account.external_accounts || {}).data && stripe_account.external_accounts.data.length > 0) {
				let external_account = stripe_account.external_accounts.data[0];
				this.stripeAccountForm.account_number = `****${external_account.last4}`;
				this.stripeAccountForm.account_holder_name = external_account.account_holder_name;
				this.stripeAccountForm.routing_number = external_account.routing_number.replace(' ', '');
			}
		}
	},

	mounted() {
		this.$root.contentloading = false;
	},

	methods: {
		save() {
			axios.put('/auth', this.user, {toasted: true}).then(response => {
				this.$root.auth = response.data;
			});
		},

		password() {
			axios.put('/auth/password', this.securityForm, {toasted: true});
		},

		nospace(e) {
			if (e.which === 32) e.preventDefault();
		},

		async updateStripeAccount() {
			this.stripeAccountForm.loading = true;

			let response = await axios.put('/auth/update_stripe_account', this.stripeAccountForm, {toasted: true}).catch(e => {
				console.log(e.message.errors);
			});
			if (response) {
				this.$root.auth.stripe_account = response.data.stripe_account;
			}
			this.stripeAccountForm.loading = false;
		},

		formatDate(date) {
			if (!date) return '';
			return dayjs(date).format('MMMM D, YYYY');
		},
	},
};
