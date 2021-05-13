<template>
	<div class="row justify-content-center position-absolute-center w-100">
		<div class="col-md-6">
			Click to copy and paste this code as the first item into the <strong>&lt;HEAD&gt;</strong> of every webpage you want to show the booking widget.
			<div class="border border-dashed rounded p-3 mt-2 bg-white cursor-pointer text-wrap" ref="script" @click="copyToClipboard">
				<code>{{ script }}</code>
			</div>
		</div>
	</div>
</template>

<script src="./widget.js"></script>
<style lang="scss" scoped src="./widget.scss"></style>
