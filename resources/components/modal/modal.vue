<template>
	<div class="modal" :class="[{ open: open }, size]">
		<div>
			<div class="modal-body">
				<slot></slot>
			</div>
		</div>
		<div class="modal-backdrop" @click="hide()"></div>
	</div>
</template>

<script src="./modal.js"></script>
<style src="./modal.scss" lang="scss" scoped></style>
