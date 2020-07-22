<template>
	<div>
		dsds
	</div>
</template>

<script>
	export default {
		data: () => ({
			user: null
		}),
		created() {
			console.log(this.$root.auth.widget);
		}
	}
</script>