<template>
	<div class="auth-container" :class="{ open: open }">
		<button v-if="!$root.mobileApp" type="button" class="fixed z-50 hover:bg-gray-200 rounded-full p-2 top-2 right-2 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none" @click="close()"><CloseIcon class="fill-current h-4 w-4"></CloseIcon></button>

		<div class="flex justify-center items-center min-h-full">
			<div class="relative py-5">
				<div class="auth-card">
					<img src="/logo.svg" class="h-5" />
					<h4 class="auth-heading">{{ heading }}</h4>
					<login v-if="$root.action == 'login'"></login>
					<signup v-else-if="$root.action == 'signup'"></signup>
					<recover v-else-if="$root.action == 'recover'"></recover>
					<reset v-else-if="$root.action == 'reset'"></reset>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./auth.js"></script>
<style scoped lang="scss" src="./auth.scss"></style>
