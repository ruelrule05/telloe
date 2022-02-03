import VueFormValidate from '../../../components/vue-form-validate.vue';
import VueButton from '../../../components/vue-button.vue';
import VueCheckbox from '../../../components/vue-checkbox/vue-checkbox.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';
import dayjs from 'dayjs';
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);
import ExclamationCircleIcon from '../../../icons/exclamation-circle';
import CheckmarkCircleIcon from '../../../icons/checkmark-circle';
const { getNameList } = require('country-list');
const toBlob = require('data-uri-to-blob');
const countryCodes = require('country-codes-list');
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
const ct = require('countries-and-timezones').default;
import numbersOnly from 'numbers-only';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Modal from '../../../components/modal/modal.vue';
import VueCardFormat from '../../../components/vue-credit-card-validation/src';
const phone = require('phone');
import VisaIcon from '../../../icons/cc/visa.vue';
import MastercardIcon from '../../../icons/cc/mastercard.vue';
import AmexIcon from '../../../icons/cc/amex.vue';
import DiscoverIcon from '../../../icons/cc/discover.vue';
import DinersclubIcon from '../../../icons/cc/dinersclub.vue';
import JcbIcon from '../../../icons/cc/jcb.vue';
import UnionpayIcon from '../../../icons/cc/unionpay.vue';
import Stripe from 'stripe-client';
import CcPreviewIcon from '../../../icons/cc/preview.vue';
import CloseIcon from '../../../icons/close.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';

export default {
	components: {
		ToggleSwitch,
		CloseIcon,
		CcPreviewIcon,
		VueFormValidate,
		VueButton,
		VueCheckbox,
		VueSelect,
		VDatePicker,
		ExclamationCircleIcon,
		CheckmarkCircleIcon,
		Modal,
		MastercardIcon,
		AmexIcon,
		DiscoverIcon,
		DinersclubIcon,
		JcbIcon,
		UnionpayIcon
	},

	directives: { cardformat: VueCardFormat },

	data: () => ({
		banner: true,
		invoiceSearch: '',
		selectedMember: null,
		app_name: window.APP_NAME,
		dayjs: dayjs,
		cardBrand: null,
		loading: false,
		user: null,
		tab: 'notifications', // profile
		securityForm: {
			current_password: '',
			password: '',
			password_confirmation: ''
		},
		stripeAccountForm: {
			country: '',
			countryDisabled: false,
			loading: false
		},
		allowed_countries: ['AU', 'CA', 'NZ', 'GB', 'US'],
		selectedAreaCode: { text: 'AU', value: '+61' },
		getUnicodeFlagIcon: null,
		masks: {
			input: 'MMMM D, YYYY'
		},
		numbersOnly: numbersOnly,
		phone: phone,
		menus: ['Profile', 'Security', 'Plan', 'Billing', 'Payout', 'Notifications', 'My Menu'],
		menusMobile: [
			{ text: 'Profile', value: 'Profile' },
			{ text: 'Security', value: 'Security' },
			{ text: 'Plan', value: 'Plan' },
			{ text: 'Billing', value: 'Billing' },
			{ text: 'Payout', value: 'Payout' },
			{ text: 'Notifications', value: 'Notifications' },
			{ text: 'My Menu', value: 'My Menu' },
			{ text: 'Log Out', value: 'Log Out' }
		],
		activeMenu: 'Profile',
		selectedPlan: null,
		cardForm: {
			number: '',
			expiration: '',
			exp_month: '',
			exp_year: '',
			cvc: '',
			name: '',
			errors: {
				number: false,
				expiration: false,
				cvc: false
			}
		},
		paymentLoading: false,
		stripeInvoices: [],
		newMember: {
			custom_fields: {},
			assigned_services: [],
			sendToEmail: 1
		},
		csrf_token: '',
		countrySpecs: []
	}),

	watch: {
		'$route.query.tab': function (value) {
			this.tab = value;
		},

		'user.timezone': function () {
			this.user.dial_code = countryCodes.customArray(
				{ text: '{countryCode}', value: '+{countryCallingCode}' },
				{
					filter: data => {
						return this.timezoneAreaCode.country == data.countryCode;
					}
				}
			)[0].value;
		},
		activeMenu: function (value) {
			this.user = Object.assign({}, this.$root.auth);
			if (value == 'Log Out') {
				this.$refs.logoutForm.submit();
			}
		}
	},

	computed: {
		...mapState({
			plans: state => state.plans.index,
			members: state => state.members.index,
			services: state => state.services.index
		}),

		isTrial() {
			return dayjs().isSameOrBefore(dayjs(this.$root.auth.trial_expires_at));
		},

		filteredInvoices() {
			return this.stripeInvoices.filter(i => {
				return i.number.toLowerCase().includes(this.invoiceSearch.trim().toLowerCase());
			});
		},

		defaultEmailMessage() {
			return `${this.$root.auth.full_name} has invited you as a member in ${this.app_name}`;
		},

		cardBrandComponent() {
			switch (this.cardBrand) {
				case 'visa':
					return VisaIcon;
				case 'mastercard':
					return MastercardIcon;
				case 'amex':
					return AmexIcon;
				case 'discover':
					return DiscoverIcon;
				case 'dinersclub':
					return DinersclubIcon;
				case 'jcb':
					return JcbIcon;
				case 'unionpay':
					return UnionpayIcon;
				default:
					return false;
			}
		},

		timezoneAreaCode() {
			let userTimezone = ct.getTimezone(this.user.timezone);
			return userTimezone;
			/* const countryCode = countryCodes.customArray({ text: '{countryCode}', value: '+{countryCallingCode}'}, {filter: (data) => {
				return this.$root.auth..find(x => x == data.countryCode);
			}}); */
		},

		availableTimezones() {
			let timezones = [];
			Object.keys(ct.getAllTimezones()).forEach(timezone => {
				timezones.push({
					text: timezone,
					value: timezone
				});
			});
			return timezones.sort((a, b) => {
				return a.text > b.text ? 1 : -1;
			});
		},

		tabs() {
			let tabs = ['profile', 'security', 'payout', 'notifications'];
			return tabs;
		},

		countryAreaCodes() {
			return countryCodes.customArray(
				{ text: '{countryCode}', value: '+{countryCallingCode}' },
				{
					filter: data => {
						return this.allowed_countries.find(x => x == data.countryCode);
					}
				}
			);
		},

		countries() {
			let countries = [];
			Object.entries(getNameList()).forEach(([name, code]) => {
				if (this.countrySpecs.find(x => x.id == code)) {
					countries.push({
						text: name.replace(/\b\w/g, l => l.toUpperCase()),
						value: code,
						name: name
					});
				}
			});
			countries = countries.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
			return countries;
		},

		routingNumber() {
			let routingNumber = null;
			switch (this.stripeAccountForm.country) {
				case 'AU':
					routingNumber = 'BSB';
					break;

				case 'US':
					routingNumber = 'ACH Routing Number';
					break;

				case 'UK':
					routingNumber = 'Sort Code';
					break;

				case 'GB':
					routingNumber = 'Sort Code';
					break;

				case 'CA':
					routingNumber = 'Institution Number';
					break;
			}
			return routingNumber;
		}
	},

	created() {
		this.getUnicodeFlagIcon = getUnicodeFlagIcon;
		this.user = Object.assign({}, this.$root.auth);
		this.$root.heading = 'Account';
		if (Object.keys(this.user.stripe_account || {}).length > 0) {
			let stripe_account = this.user.stripe_account;
			let dob = null;
			this.stripeAccountForm.country = stripe_account.country;
			if (stripe_account.individual) {
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
		if (this.$route.query.tab) this.tab = this.$route.query.tab;

		this.getPlans();
		this.getMembers();
		this.getStripeInvoices();
		this.getServices();
		this.getCountrySpecs();
		if (this.$route.query.tab) {
			this.activeMenu = this.$route.query.tab.charAt(0).toUpperCase() + this.$route.query.tab.slice(1);
		}
	},

	mounted() {
		this.$root.contentloading = false;
		this.csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	},

	methods: {
		...mapActions({
			getPlans: 'plans/index',
			getMembers: 'members/index',
			getServices: 'services/index',
			storeMember: 'members/store',
			deleteMember: 'members/delete'
		}),

		validateUsername(e) {
			let str = String.fromCharCode(e.keyCode);
			let isValid = !/[~`!@#$%^&*()+=\-[\]\\';,/{}|\\":<>?]/g.test(str);
			if (!isValid || e.which === 32) {
				e.preventDefault();
			}
		},

		async getCountrySpecs() {
			let response = await window.axios.get('/stripe/country_specs');
			this.countrySpecs = response.data;
		},

		toggleAssignedService(service) {
			let index = this.newMember.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.newMember.assigned_services.splice(index, 1);
			} else {
				this.newMember.assigned_services.push(service.id);
			}
		},

		submitStoreMember() {
			if (this.newMember.email) {
				this.storeMember(this.newMember).then(() => {
					this.newMember = {
						custom_fields: {},
						assigned_services: [],
						sendToEmail: 1
					};
				});
				this.$refs.addMember.hide();
			}
		},

		async getStripeInvoices() {
			let response = await window.axios.get('/dashboard/stripe_invoices');
			if (response) {
				this.stripeInvoices = response.data.data;
			}
		},

		async getCardToken() {
			const publishableKey = process.env.MIX_STRIPE_PUBLISHABLE_KEY;
			const stripe = Stripe(publishableKey);
			let expParts = this.cardForm.expiration.split('/');
			let exp_month = expParts[0].trim();
			let exp_year = expParts[1].trim();
			if (exp_year.length === 2) {
				if (exp_year < 70) {
					exp_year = `20${exp_year}`;
				} else {
					exp_year = `19${exp_year}`;
				}
			}
			let cardData = {
				number: this.cardForm.number,
				exp_month: exp_month,
				exp_year: exp_year,
				cvc: this.cardForm.cvc,
				name: this.cardForm.name
			};
			let cardToken = await stripe.createToken({ card: cardData });
			const tokenData = await cardToken.json();
			if (!tokenData.error) {
				return tokenData.id;
			} else {
				Vue.$toast.clear();
				Vue.$toast.error(tokenData.error.message);
				return false;
			}
		},

		unsubscribe() {
			this.loading = true;
			window.axios.delete(`/dashboard/subscriptions/${this.$root.auth.id}`).then(() => {
				this.$root.auth.subscription = null;
				this.$refs.cancelSubscription.hide();
				this.loading = false;
			});
		},

		async subscribe() {
			Object.keys(this.cardForm.errors).forEach(k => (this.cardForm.errors[k] = ''));
			let error = false;

			// validate card number
			if (!VueCardFormat.format().validateCardNumber(this.cardForm.number)) {
				this.cardForm.errors.number = error = true;
			}

			// validate card expiry
			if (!VueCardFormat.format().validateCardExpiry(this.cardForm.expiration)) {
				this.cardForm.errors.expiration = error = true;
			}

			// validate card CVC
			if (!VueCardFormat.format().validateCardCVC(this.cardForm.cvc)) {
				this.cardForm.errors.cvc = error = true;
			}

			this.paymentLoading = true;
			let cardToken = await this.getCardToken();

			if (!error && this.selectedPlan && cardToken) {
				let response = await window.axios.post(`/dashboard/subscriptions`, { card_token: cardToken, plan_id: this.selectedPlan.id }).catch(() => {
					this.paymentLoading = false;
				});
				if (response) {
					this.$refs.paymentModal.hide(true);
					this.$root.auth.subscription = response.data;
					this.trackier();
				}
			}
			this.paymentLoading = false;
		},

		selectPlan(plan) {
			if (plan.id != (this.$root.auth.subscription || {}).plan_id) {
				this.selectedPlan = plan;
				this.$refs.paymentModal.show();
			}
		},

		async save() {
			this.loading = true;
			let user = Object.assign({}, this.user);
			if (user.phone) {
				let userTimezone = ct.getTimezone(user.timezone);
				let validatePhone = phone(user.phone, userTimezone.country);

				if (validatePhone.length == 0) {
					this.loading = false;
					this.$refs['phone'].focus();
					Vue.$toast.clear();
					return Vue.$toast.error('Phone number is invalid for the selected country.');
				}
				user.phone = validatePhone[0].replace(user.dial_code, '');
			}
			if (user.profile_image_file) {
				user.profile_image_file = await this.fileToBase64(this.user.profile_image_file);
			}
			let response = await window.axios.post('/auth', user, { toast: true }).catch(() => {
				this.loading = false;
			});
			if (response) {
				this.$root.auth = response.data;
				this.user = Object.assign({}, this.$root.auth);
				this.loading = false;
				Vue.$toast.open('Account has been updated successfully.');
			}
		},

		async fileToBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
			});
		},

		password() {
			window.axios.put('/auth/password', this.securityForm, { toast: true }).then(() => {
				Vue.$toast.open('Password has been updated successfully.');
			});
			this.securityForm = {
				current_password: '',
				password: '',
				password_confirmation: ''
			};
		},

		nospace(e) {
			if (e.which === 32) e.preventDefault();
		},

		async updateStripeAccount() {
			this.stripeAccountForm.loading = true;
			let data = JSON.parse(JSON.stringify(this.stripeAccountForm));
			if (!data.website.includes('http')) {
				data.website = `https://${data.website}`;
			}

			let response = await window.axios.put('/auth/update_stripe_account', data, { toast: true }).catch(() => {
				this.stripeAccountForm.loading = false;
			});
			if (response) {
				this.$root.auth.stripe_account = response.data.stripe_account;
				this.stripeAccountForm.countryDisabled = true;
				this.stripeAccountForm.website = response.data.stripe_account.business_profile.url;
			}
			this.stripeAccountForm.loading = false;
		},

		formatDate(date) {
			if (!date) return '';
			return dayjs(date).format('MMMM D, YYYY');
		},

		updateImage(e) {
			let input = e.currentTarget;
			let file = input.files[0];
			if (file) {
				if (file.type.match('image/jpeg') || file.type.match('image/png')) {
					let photosize = file.size / 1000;
					if (photosize > 5000) {
						alert('Error: Image file too big. Please choose image file not bigger than 5MB.');
					} else {
						this.user.profile_image = file;

						let img = document.createElement('img');
						let reader = new FileReader();
						reader.readAsDataURL(file);

						reader.onload = oFREvent => {
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

		async saveMenuSettings() {
			this.loading = true;
			let user = Object.assign({}, this.user);

			user.packages = this.$root.auth.packages = this.user.packages ?? false;
			user.team = this.$root.auth.team = this.user.team ?? false;
			user.payments = this.$root.auth.payments = this.user.payments ?? false;
			user.match_up = this.$root.auth.match_up = this.user.match_up ?? false;
			user.messages = this.$root.auth.messages = this.user.messages ?? false;
			user.contacts = this.$root.auth.contacts = this.user.contacts ?? false;

			let response = await window.axios.put('/auth', user, { toast: true });
			this.loading = false;

			return response;
		},

		trackier() {
			let clickId = this.getCookieVal('click_id') || '';
			if (clickId) {
				let amount = this.selectedPlan.price;
				let goal_value = '';
				if (this.selectedPlan.name == 'Annually') {
					goal_value = '&goal_value=Yearly';
				}
				var a = document.createElement('iframe');
				a.setAttribute('src', `https://trk.telloe.com/pixel?av=60c7d6899e6fbd61962cc603&sale_amount=${amount}&currency=USD${goal_value}&click_id=${clickId}`);
				a.style.width = '1';
				a.style.height = '1';
				document.body.appendChild(a);
			}
		},

		getCookieVal(name) {
			const allCookies = document.cookie.split('; ');
			var result = null;
			allCookies.forEach(function (v) {
				if (v.indexOf(name + '=') !== -1) {
					result = v.split('=')[1];
					return false;
				}
			});
			return result;
		}
	}
};
