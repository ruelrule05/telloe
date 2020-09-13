<template>
	<div class="d-flex h-100">
		<index v-if="$root.auth.role.role == 'client'"></index>
		<show @ready="showReady()"></show>
	</div>
</template>

<script src="./conversations.js"></script>
