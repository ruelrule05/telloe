<template>
	<div class="pageloader position-fixed">
		<div class="position-absolute-center">
			<div class="spinner-border text-primary" role="status"></div>
		</div>
	</div>
</template>

<script>
	export default{

	}
</script>

<style scoped lang="scss">
.pageloader{
	z-index: 1000;
	width: 100vw;
	height: 100vh;
	background: rgba(255,255,255,0.75);
}
</style>