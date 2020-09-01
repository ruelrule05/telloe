import VueFormValidate from '../../../components/vue-form-validate.vue';
import VueButton from '../../../components/vue-button.vue';
import VueCheckbox from '../../../components/vue-checkbox/vue-checkbox.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
import ExclamationCircleIcon from '../../../icons/exclamation-circle';
import CheckmarkCircleIcon from '../../../icons/checkmark-circle';
const {getNameList} = require('country-list');
const toBlob = require('data-uri-to-blob');
const countryCodes = require('country-codes-list');
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
const ct = require('countries-and-timezones');

export default {
	components: {
		VueFormValidate,
		VueButton,
		VueCheckbox,
		VueSelect,
		VCalendar,

		ExclamationCircleIcon,
		CheckmarkCircleIcon,
	},

	data: () => ({
		loading: false,
		user: null,
		tab: 'notifications', // profile
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
		allowed_countries: ['AU', 'CA', 'NZ', 'GB', 'US'],
		selectedAreaCode: {text: 'AU', value: '+61'},
		getUnicodeFlagIcon: null,
	}),

	watch: {
		'$route.query.tab': function(value) {
			this.tab = value;
		},

		'user.timezone': function(value) {
			this.user.dial_code = countryCodes.customArray({ text: '{countryCode}', value: '+{countryCallingCode}'}, {filter: (data) => {
				return this.timezoneAreaCode.country == data.countryCode;
			}})[0].value;
		}
	},

	computed: {
		timezoneAreaCode() {
			let userTimezone = ct.getTimezone(this.user.timezone);
			return userTimezone;
			/* const countryCode = countryCodes.customArray({ text: '{countryCode}', value: '+{countryCallingCode}'}, {filter: (data) => {
				return this.$root.auth..find(x => x == data.countryCode);
			}}); */
		},

		availableTimezones() {
			let timezones = [];
			this.allowed_countries.forEach(code => {
				let countryTimezones = ct.getTimezonesForCountry(code);
				if(countryTimezones) {
					countryTimezones.forEach(timezone => {
						timezones.push({
							text: timezone.name,
							value: timezone.name
						});
					});
				}
			});
			return timezones.sort((a, b) => {
				return a.text > b.text ? 1 : -1;
			});
		},

		tabs() {
			let tabs = ['profile', 'security'];
			if(this.$root.auth.role.role == 'client') tabs.push('payout');
			tabs.push('notifications')
			return tabs;
		},

		countryAreaCodes() {
			return countryCodes.customArray({ text: '{countryCode}', value: '+{countryCallingCode}'}, {filter: (data) => {
				return this.allowed_countries.find(x => x == data.countryCode);
			}});
		},

		countries() {
			let countries = [];
			Object.entries(getNameList()).forEach(([name, code]) => {
				if(this.allowed_countries.find(x => x == code)) {
					countries.push({
						name: name,
						code: code,
					});
				}
			});
			countries = countries.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
			return countries;
		},

		routingNumber() {
			switch(this.stripeAccountForm.country) {
				case 'AU':
					return 'BSB';
					break;

				case 'US':
					return 'Routing Number';
					break;

				case 'UK':
					return 'Sort Code';
					break;

				case 'CA':
					return 'Institution Number';
					break;
			}
		}
	},

	created() {
		this.getUnicodeFlagIcon = getUnicodeFlagIcon;
		this.user = Object.assign({}, this.$root.auth);
		this.$root.heading = 'Account';
		if (this.$root.auth.role.role == 'client' && Object.keys(this.user.stripe_account).length > 0) {
			let stripe_account = this.user.stripe_account;
			let dob = null;
			this.stripeAccountForm.country = stripe_account.country;
			if(stripe_account.individual) {
				this.stripeAccountForm.address = stripe_account.individual.address.line1;
				this.stripeAccountForm.city = stripe_account.individual.address.city;
				this.stripeAccountForm.state = stripe_account.individual.address.state;
				this.stripeAccountForm.postal = stripe_account.individual.address.postal_code;
				this.stripeAccountForm.phone = stripe_account.individual.phone;
				dob = stripe_account.individual.dob;
			}
			this.stripeAccountForm.website = (stripe_account.business_profile || {}).url;
			if (dob) this.stripeAccountForm.dob = new Date(dob.year, dob.month, dob.day);
			if (stripe_account.country) this.stripeAccountForm.countryDisabled = true;

			if ((stripe_account.external_accounts || {}).data && stripe_account.external_accounts.data.length > 0) {
				let external_account = stripe_account.external_accounts.data[0];
				this.stripeAccountForm.account_number = `****${external_account.last4}`;
				this.stripeAccountForm.account_holder_name = external_account.account_holder_name;
				this.stripeAccountForm.routing_number = external_account.routing_number.replace(' ', '');
			}
		}
		if(this.$route.query.tab) this.tab = this.$route.query.tab;
	},

	mounted() {
		this.$root.contentloading = false;
		//if(this.$root.auth.role.role == 'client' && !this.$root.payoutComplete && this.tab != 'payout') this.$router.replace('/dashboard/account?tab=payout');
	},

	methods: {

		async save() {
			this.loading = true;
			let bodyFormData = new FormData();
            Object.keys(this.user).map((k) => {
				bodyFormData.append(k, this.user[k]);
            });
			let response = await axios.post('/auth', bodyFormData, {toasted: true, headers: {'Content-Type': 'multipart/form-data'}});
			this.$root.auth = response.data;
			this.loading = false;
			this.$toasted.show('Account has been updated successfully.');
		},

		password() {
			axios.put('/auth/password', this.securityForm, {toasted: true}).then(() => {
				this.$toasted.show('Password has been updated successfully.');
			});
			this.securityForm = {
				current_password: '',
				password: '',
				password_confirmation: '',
			};
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

        updateImage(e) {
            let input = $(e.currentTarget);
            let file = input[0].files[0];
            if (file) {
                if (file.type.match('image/jpeg') || file.type.match('image/png')) {
                    let photosize = file.size / 1000;
                    if (photosize > 200) {
                        alert('Error: Image file too big. Please choose image file not bigger than 200KB.');
                    } else {
                        this.user.profile_image = file;

                        let img = document.createElement('img');
                        let reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = (oFREvent) => {
                            let canvas = document.createElement('canvas');
                            img.src = oFREvent.target.result;
                            img.addEventListener('load', () => {
                                let ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0);

                                let MAX_WIDTH = 350;
                                let MAX_HEIGHT = 350;
                                let width = img.width;
                                let height = img.height;

                                if (width > height) {
                                    if (width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                    }
                                } else {
                                    if (height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                    }
                                }
                                canvas.width = width;
                                canvas.height = height;
                                ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0, width, height);

                                let dataurl = canvas.toDataURL(file.type);
                                let imageFile = toBlob(dataurl);
                                this.user.profile_image = dataurl;
                                this.user.profile_image_file = imageFile;
                            });
                        };
                    }
                } else {
                    alert('Error: Invalid image file!');
                    input.val('');
                    this.user.profile_image = this.$root.auth.profile_image;
                }
            }
        },
	},
};
