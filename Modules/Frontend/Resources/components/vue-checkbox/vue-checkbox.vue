<template>
	<div class="checkbox">
	  	<label class="d-flex align-items-center mb-0">
		   <input type="checkbox" v-model="state">
		   <span class="cr"><checkmark-icon fill="white"></checkmark-icon></span>
		   <span class="font-size-base text-body">{{ label }}</span>
	   	</label>
	</div>
</template>

<script src="./vue-checkbox.js"></script>
<style scoped lang="scss" src="./vue-checkbox.scss"></style>