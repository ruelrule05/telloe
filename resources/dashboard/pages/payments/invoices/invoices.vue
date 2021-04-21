<template>
	<div class="min-h-screen flex flex-col">
		<div class="content-header border-bottom flex items-center justify-between">
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
	</div>
</template>

<script src="./invoices.js"></script>
<style lang="scss" src="./invoices.scss"></style>
