import { mapState, mapActions } from 'vuex';
import VueButton from '../../../components/vue-button.vue';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import Stripe from 'stripe-client';
import CheckmarkIcon from '../../../icons/checkmark';
export default {
	components: {
		VueButton,
		Modal,
		VueFormValidate,
		CheckmarkIcon
	},

	data: () => ({
		selectedPlan: null,
		paymentLoading: false,
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
		stripe: null,
		publishableKey: '',
		seats: 0,
		loading: false
	}),

	computed: {
		...mapState({
			plans: state => state.plans.index,
			ready: state => state.plans.ready
		})
	},

	mounted() {},

	created() {
		this.$root.contentloading = !this.ready;
		this.$root.heading = 'Billing';
		this.getData();
		this.getPlans();
	},

	watch: {
		ready: function(value) {
			this.$root.contentloading = !value;
			if (value) this.seats = this.plans[0].seats;
		}
	},

	methods: {
		...mapActions({
			getPlans: 'plans/index'
		}),

		selectPlan(plan) {
			if (plan.id != (this.$root.auth.subscription || {}).plan_id) {
				this.selectedPlan = plan;
				this.$refs['paymentModal'].show();
			}
		},

		unsubscribe() {
			this.loading = true;
			window.axios.delete(`/dashboard/subscriptions/${this.$root.auth.id}`).then(() => {
				this.$root.auth.subscription = null;
				this.$refs['cancelSubscription'].hide();
				this.loading = false;
			});
		},

		async subscribe() {
			Object.keys(this.cardForm.errors).forEach(k => (this.cardForm.errors[k] = ''));
			let error = false;

			// validate card number
			if (!this.$cardFormat.validateCardNumber(this.cardForm.number)) {
				this.cardForm.errors.number = error = true;
			}

			// validate card expiry
			if (!this.$cardFormat.validateCardExpiry(this.cardForm.expiration)) {
				this.cardForm.errors.expiration = error = true;
			}

			// validate card CVC
			if (!this.$cardFormat.validateCardCVC(this.cardForm.cvc)) {
				this.cardForm.errors.cvc = error = true;
			}

			if (!error && this.selectedPlan) {
				this.paymentLoading = true;
				var expiration = this.cardForm.expiration.split('/');
				this.cardForm.exp_month = parseInt(expiration[0].trim());
				this.cardForm.exp_year = expiration[1].trim();
				if (this.cardForm.exp_year.length === 2) {
					if (this.cardForm.exp_year < 70) {
						this.cardForm.exp_year = `20${this.cardForm.exp_year}`;
					} else {
						this.cardForm.exp_year = `19${this.cardForm.exp_year}`;
					}
				}
				this.cardForm.exp_year = parseInt(this.cardForm.exp_year);

				let cardData = {
					card: {
						number: '4242424242424242',
						exp_month: '02',
						exp_year: '21',
						cvc: '999',
						name: 'Billy Joe'
					}
				};
				let card = await this.stripe.createToken(cardData);
				card.json().then(token => {
					window.axios
						.post(`/dashboard/subscriptions`, { card: this.cardForm, card_token: token.id, plan_id: this.selectedPlan.id })
						.then(response => {
							this.$refs['paymentModal'].hide();
							this.$root.auth.subscription = response.data;
						})
						.catch(() => {
							this.paymentLoading = false;
						});
				});
			}
		},

		async getData() {
			let stripe = await window.axios.get('/dashboard/stripe_publishable_key');
			this.publishableKey = stripe.data;
			this.stripe = Stripe(this.publishableKey);
		}
	}
};
