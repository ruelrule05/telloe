<template>
	<div class="overflow-auto h-100">
		<div class="row py-4 px-3 m-0">
			<div class="col-md-4 px-2" v-for="plan in plans">
				<div class="card shadow-sm mb-3">
					<div class="card-body">
						<h5 class="text-center">{{ plan.name }}</h5>
						<h6 class="text-center">${{ plan.price }}/month</h6>
						<p>{{ plan.description }}</p>
						<div v-if="$root.auth.subscription && $root.auth.subscription.plan_id == plan.id" class="text-center">
							<strong>Current Plan</strong>
							<button class="btn btn-light border btn-block mt-2" data-toggle="modal" data-target="#cancelSubscriptionModal" @click="unsubscribe">Cancel Subscription</button>
						</div>
						<button v-else-if="!$root.auth.subscription" class="btn btn-primary btn-block" @click="selectedPlan = plan" data-toggle="modal" data-target="#paymentModal" data-backdrop="static" data-keyboard="false">Subscribe</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" tabindex="-1" role="dialog" id="paymentModal">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-body" v-if="selectedPlan">
						<h5 class="h4 mb-0 font-circular text-cxenter">Subscribing to {{ selectedPlan.name }}</h5>
						<small class="text-muted">Note: We do not store your card credentials.</small>
						<vue-form-validate @submit="subscribe()" class="mt-3">
							<fieldset :disabled="paymentLoading">
								<div class="form-group">
									<label class="form-label">Card Number</label>
									<div class="input-icon position-relative">
										<input v-model="cardForm.number" type="tel" :class="{'is-invalid': cardForm.errors.number}" class="form-control" placeholder="#### #### #### ####" v-cardformat:formatCardNumber data-required />
										<div class="invalid-tooltip">Invalid card number</div>
									</div>
								</div>
								<div class="row mb-3 form-group">
									<div class="col">
										<label class="form-label">Expiration</label>
										<input type="text" :class="{'is-invalid': cardForm.errors.expiration}" v-model="cardForm.expiration" class="form-control" placeholder="MM/YY" v-cardformat:formatCardExpiry data-required />
										<div class="invalid-tooltip">Invalid card expiration</div>
									</div>
									<div class="col">
										<label class="form-label">CVC</label>
										<input type="text" :class="{'is-invalid': cardForm.errors.cvc}" v-model="cardForm.cvc" class="form-control" placeholder="***" v-cardformat:formatCardCVC data-required />
										<div class="invalid-tooltip">Invalid card CVC</div>
									</div>
								</div>
								<div class="form-group">
									<label class="form-label">Name on card</label>
									<input v-model="cardForm.name" type="text" class="form-control" data-required />
								</div>
								<div class="mt-4 text-center text-gray"><small>Powered by</small>&nbsp;&nbsp;<img src="/images/stripe.png" height="45" /></div>
							</fieldset>

							<div class="text-right mt-4">
								<vue-button type="submit" :loading="paymentLoading" button_class="btn btn-primary shadow-none">Subscribe</vue-button>
								<button :disabled="paymentLoading" class="btn btn-link text-dark float-left pl-0" data-dismiss="modal">Cancel</button>
							</div>
						</vue-form-validate>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VueCardFormat from '../../../components/vue-credit-card-validation/src/index';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import Stripe from 'stripe-client';
export default {
	components: {VueFormValidate},

	data: () => ({
		plans: [],
		selectedPlan: null,
		paymentLoading: false,
		cardForm: {
			number: '4242424242424242',
			expiration: '11/24',
			exp_month: '11',
			exp_year: '24',
			cvc: '321',
			name: 'Clyde Escobidal',
			errors: {
				number: false,
				expiration: false,
				cvc: false,
			},
		},
		stripe: null,
		publishableKey: '',
	}),

	computed: {},

	mounted() {
		this.$root.contentloading = false;
	},

	created() {
		this.$root.heading = 'Billing';
		this.getData();
	},

	watch: {},

	methods: {
		unsubscribe() {
			axios.delete(`/dashboard/subscriptions/${this.$root.auth.id}`).then((response) => {
				this.$root.auth.subscription = null;
			});
		},

		async subscribe() {
			Object.keys(this.cardForm.errors).forEach((k) => (this.cardForm.errors[k] = ''));
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
						name: 'Billy Joe',
					},
				};
				let card = await this.stripe.createToken(cardData);
				card.json().then((token) => {
					axios
						.post(`/dashboard/subscriptions`, {card: this.cardForm, card_token: token.id, plan_id: this.selectedPlan.id})
						.then((response) => {
							$('#paymentModal').modal('hide');
							this.$root.auth.subscription = response.data;
						})
						.catch(() => {
							this.paymentLoading = false;
						});
				});
			}
		},

		async getData() {
			let plans = await axios.get('/dashboard/plans');
			this.plans = plans.data;
			let stripe = await axios.get('/dashboard/stripe_publishable_key');
			this.publishableKey = stripe.data;
			this.stripe = Stripe(this.publishableKey);
		},
	},
};
</script>
