<template>
	<div class="dropdown" :class="{ open: open }" v-click-outside="onBlur">
		<button type="button" class="dropdown-button" @click="open = !open">
			<CogIcon class="fill-current text-gray-400"></CogIcon>
		</button>
		<div class="dropdown-menu">
			<span v-for="(option, optionIndex) in options" :key="optionIndex" class="dropdown-item" @click="emitClick(option)">{{ option }}</span>
		</div>
	</div>
</template>

<script src="./vue-dropdown.js"></script>

<style lang="scss" scoped src="./vue-dropdown.scss"></style>
