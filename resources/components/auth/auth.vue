<template>
	<div class="auth-container bg-secondary fixed w-screen h-screen flex justify-center overflow-hidden" :class="{ open: open }">
		<div class="h-full w-full">
			<div class="flex items-center h-full w-full justify-center mx-auto" v-cloak>
				<div class="card auth-card">
					<img src="/logo.svg" class="h-6" />
					<h4 class="text-primary font-serif text-3xl my-16 mb-8 uppercase">{{ heading }}</h4>
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
