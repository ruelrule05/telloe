<template>
	<div class="py-4 d-flex flex-row w-100 align-items-center h-100">
		<div class="w-100">
			<h1 class="font-heading mb-4 text-center">Choose a Plan</h1>
			<div class="overflow-auto d-flex flex-row align-items-center justify-content-center">
				<div class="row pb-4 px-3 h-100 w-100 m-0 justify-content-center">
					<div v-for="plan in plans" class="col-md-4 py-2">
						<div class="border rounded bg-white plan p-3 position-relative" :class="[$root.auth.subscription && $root.auth.subscription.plan_id == plan.id ? 'active' : 'cursor-pointer', {'selected': plan.id == (selectedPlan || {}).id}]" @click="selectPlan(plan)">
							<div class="btn btn-checkmark p-1 badge-pill line-height-0 position-absolute mr-2 mt-2" style="right: 0; top: 0">
								<checkmark-icon width="14" height="14" transform="scale(1.8)" stroke-width="1"></checkmark-icon>
							</div>
							<strong class="text-orange text-uppercase">Lorem ipsum</strong>
							<h5 class="mb-0 font-heading text-primary">{{ plan.name }}</h5>
							<p class="mb-0 text-muted font-weight-light mt-3">{{ plan.description }}</p>

							<h5 class="mb-0 font-weight-normal mt-3 mb-0">${{ plan.price }} per month</h5>
							<h5 class="mb-0 font-weight-normal">{{ plan.seats }} seats</h5>

							<div class="ml-auto text-right align-self-stretch pr-4 d-flex align-items-center plan-price">
								<div class="pl-4">
								</div>
									<!-- <div v-if="$root.auth.subscription && $root.auth.subscription.plan_id == plan.id" class="text-center">
										<strong>Current Plan</strong>
										<button class="btn btn-light border btn-block mt-2" data-toggle="modal" data-target="#cancelSubscriptionModal" @click="unsubscribe">Cancel Subscription</button>
									</div> -->
							</div>

							<div class="mt-5">
								<button v-if="$root.auth.subscription && $root.auth.subscription.plan_id == plan.id" type="button" class="btn btn-primary btn-lg btn-block" @click="unsubscribe">Cancel subscription</button>
								<button v-else type="button" class="btn btn-outline-primary btn-lg btn-block">Subscribe</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<modal :close-button="false" ref="paymentModal" @hidden="selectedPlan = null; paymentLoading = false;">
			<div v-if="selectedPlan">
				<div class="bg-orange-light rounded p-3 selected-plan-summary">
					<h5 class="font-heading mb-0">{{ selectedPlan.name }}</h5>
					<p class="mb-1 font-weight-light">{{ selectedPlan.description }}</p>
					<h6 class="mb-0 font-weight-normal">{{ selectedPlan.seats }} seats, {{ selectedPlan.price }} monthly</h6>
				</div>
				<vue-form-validate @submit="subscribe()" class="mt-3">
					<fieldset :disabled="paymentLoading">
						<div class="form-group">
							<label class="form-label">Card Number</label>
							<div class="input-icon position-relative">
								<input v-model="cardForm.number" type="tel" :class="{'is-invalid': cardForm.errors.number}" class="form-control" placeholder="#### #### #### ####" v-cardformat:formatCardNumber data-required />
								<div class="invalid-tooltip">Invalid card number</div>
							</div>
						</div>
						<div class="row mb-3 form-row form-group">
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
					</fieldset>

					<!-- <div class="text-center text-muted"><small class="font-weight-light">Powered by</small>&nbsp;&nbsp;<img src="/images/stripe.png" height="55" /></div> -->

					<div class="d-flex align-items-center justify-content-end mt-3">
						<button :disabled="paymentLoading" type="button" class="btn btn-white border mr-1" data-dismiss="modal">Cancel</button>
						<vue-button type="submit" :loading="paymentLoading" button_class="btn btn-primary shadow-none">Subscribe</vue-button>
					</div>
				</vue-form-validate>
			</div>
		</modal>
	</div>
</template>

<script src="./billing.js"></script>
<style scoped lang="scss" src="./billing.scss"></style>