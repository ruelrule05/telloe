<template>
	<div class="toggle" :class="state_class" :disabled="disabled" @click.self="onClick">
		<div class="draggable" :style="style"><div></div></div>
	</div>
</template>

<script src="./toggle-switch.js"></script>
<style scoped lang="scss" src="./toggle-switch.scss"></style>
