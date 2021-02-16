<template>
	<div class="auth-container position-fixed w-100 h-100 d-flex justify-content-end overflow-hidden" :class="{ open: open }">
		<div class="h-100 bg-white auth-body position-absolute">
			<div class="d-flex flex-column w-100 h-100">
				<div>
					<button class="btn close pr-2 pt-2 pt-md-0" @click="close"><close-icon transform="scale(2)" fill="#A7ACC4"></close-icon></button>
				</div>
				<div class="flex-grow-1 w-100 px-md-4 px-2">
					<login v-if="$root.action == 'login'"></login>
					<signup v-else-if="$root.action == 'signup'"></signup>
					<recover v-else-if="$root.action == 'recover'"></recover>
					<reset v-else-if="$root.action == 'reset'"></reset>
				</div>
				<div class="text-center text-danger auth-error w-100 p-3">&nbsp;{{ error }}&nbsp;</div>
			</div>
		</div>
	</div>
</template>

<script src="./auth.js"></script>
<style scoped lang="scss" src="./auth.scss"></style>
