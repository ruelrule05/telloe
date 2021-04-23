<template>
	<div class="min-h-screen flex flex-col">
		<div v-if="$root.auth.stripe_account" class="content-header border-bottom flex items-center justify-between">
			<div>INVOICES</div>

			<button
				class="btn btn-primary btn-md"
				type="button"
				@click="
					resetInvoiceForm();
					$refs['createInvoiceModal'].show();
				"
			>
				<span>New Invoice</span>
			</button>
		</div>
		<div v-else class="absolute-center p-6 bg-secondary rounded-xl flex items-start" style="width: 450px">
			<div class="text-primary">
				<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
			</div>
			<div class="pl-4 -mt-1">
				<p>You haven't completed your payout account details yet.</p>
				<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="$router.push('/dashboard/account')"><span>Go To Account</span></button>
			</div>
		</div>
	</div>
</template>

<script src="./invoices.js"></script>
<style lang="scss" src="./invoices.scss"></style>
