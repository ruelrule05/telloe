<template>
	<div class="auth-container bg-secondary position-fixed w-100 h-100 d-flex justify-content-end overflow-hidden" :class="{ open: open }">
		<login v-if="$root.action == 'login'"></login>
		<signup v-else-if="$root.action == 'signup'"></signup>
		<recover v-else-if="$root.action == 'recover'"></recover>
		<reset v-else-if="$root.action == 'reset'"></reset>
	</div>
</template>

<script src="./auth.js"></script>
<style scoped lang="scss" src="./auth.scss"></style>
