<template>
	<div class="dropdown" :class="{ open: open }" v-click-outside="onBlur">
		<div @click="open = !open">
			<slot name="button"></slot>
		</div>
		<div class="dropdown-menu" :class="[dropPosition]">
			<span v-for="(option, optionIndex) in options" :key="optionIndex" class="dropdown-item" @click="emitClick(option)">{{ option }}</span>
		</div>
	</div>
</template>

<script src="./vue-dropdown.js"></script>

<style lang="scss" scoped src="./vue-dropdown.scss"></style>
