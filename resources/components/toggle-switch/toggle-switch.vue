<template>
	<div class="toggle" :class="state_class" @click.self="onClick">
		<div class="draggable" @mousedown.prevent="dragStart" :style="style"></div>
	</div>
</template>

<script src="./toggle-switch.js"></script>
<style scoped lang="scss" src="./toggle-switch.scss"></style>
