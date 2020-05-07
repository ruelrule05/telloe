<template>
	<div class="auth-container position-fixed w-100 h-100 d-flex justify-content-end overflow-hidden" :class="{'open': open}">
		<div class="w-50 h-100 bg-white auth-body p-4 position-absolute">
			<button class="btn close" @click="close"><close-icon width="50" height="50" fill="#A7ACC4"></close-icon></button>
			<login v-if="$root.action == 'login'"></login>
			<signup v-else-if="$root.action == 'signup'"></signup>

			<div class="text-center text-danger auth-error position-absolute w-100 p-3">{{ error }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss" src="./auth.scss"></style>
<script src="./auth.js"></script>