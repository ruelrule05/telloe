<template>
	<div id="notification" class="position-absolute shadow-sm rounded bg-white py-2 px-3 cursor-pointer" :class="{ open: open }" @click="goToNotifLink">
		<div class="d-flex mb-1 align-items-center">
			<strong class="font-heading">New Notification</strong>
			<button type="button" class="ml-auto btn badge-pill line-height-0 p-0 btn-white btn-sm mr-n2" @click.stop="open = false"><close-icon></close-icon></button>
		</div>
		<div v-html="notification.description"></div>
		<small class="text-secondary">{{ notification.created_at }}</small>
	</div>
</template>

<script src="./notification.js"></script>
<style scoped lang="scss" src="./notification.scss"></style>
