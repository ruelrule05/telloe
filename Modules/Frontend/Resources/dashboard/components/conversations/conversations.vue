<template>
	<div class="d-flex h-100">
		<index v-if="$root.auth.role.role == 'client'"></index>
		<show></show>
	</div>
</template>

<script src="./conversations.js"></script>
