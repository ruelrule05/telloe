<template>
	<div class="py-4 d-flex flex-row w-100 align-items-center h-100 overflow-auto ">
		<div class="w-100 h-100">
			<h1 class="font-heading mb-4 text-center">Choose a Plan</h1>
			<div class="d-flex flex-row align-items-center justify-content-center">
				<div class="row pb-4 px-3 h-100 w-100 m-0 justify-content-center">
					<div v-for="plan in plans" class="col-md-4 py-2">
						<div class="border rounded bg-white plan p-3 position-relative" :class="{'active': $root.auth.subscription && $root.auth.subscription.plan_id == plan.id, 'selected': plan.id == (selectedPlan || {}).id}">
							<div class="btn btn-checkmark p-1 badge-pill line-height-0 position-absolute mr-2 mt-2">
								<checkmark-icon width="20" height="20" transform="scale(1.8)" stroke-width="1"></checkmark-icon>
							</div>
							<h5 class="mb-4 font-heading text-primary text-uppercase">{{ plan.name }}</h5>
							<h4 class="mb-0 font-weight-normal d-inline @if($plan->interval == 'year') text-warning @endif"><strong>${{ parseInt(plan.price) }}</strong></h4><span class="@if($plan->interval == 'year') text-warning @endif">.{{ plan.price.split('.')[1] }}</span> / month

							<div class="text-secondary">
								<template v-if="plan.every_months > 1">
									Billed as one payment of ${{ $root.number_format(plan.price * plan.every_months, 2) }}
								</template>
								&nbsp;
							</div>

							<div class="mt-3">
								<button v-if="$root.auth.subscription && $root.auth.subscription.plan_id == plan.id" type="button" class="btn btn-primary btn-lg btn-block" @click="unsubscribe">Cancel subscription</button>
								<button v-else :disabled="$root.auth.subscription" type="button" class="btn btn-outline-primary btn-lg btn-block" @click="selectPlan(plan)">Subscribe</button>
							</div>

							<div class="my-3">
								<strong>Bookings</strong>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Booking System
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Booking URL
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Time Zone Manager
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Email Reminders
								</div>

								<strong class="mt-3 d-block">Payments</strong>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Take Payments
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Subscription Manager
								</div>

								<strong class="mt-3 d-block">Communication</strong>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Unlimited Contacts
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Delayed Chat
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Live Chat
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Send Files
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Send Voice Memos
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Live Video Calls
								</div>
							</div>

							<small class="text-secondary">+ Stripe processing fees of 2.9% + 30¢ per successful card charge.</small>
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