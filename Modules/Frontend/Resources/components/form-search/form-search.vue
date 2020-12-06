<template>
	<div>
		<div class="form-search d-flex align-items-center position-relative" role="form">
			<input type="text" spellcheck="false" class="form-control border shadow-none" :placeholder="placeholder" v-model="query" ref="queryInput" v-debounce:400ms="search" :class="inputClass" />
			<button v-if="trimmedQuery.length > 0" class="btn btn-clear btn-sm line-height-0 p-0 badge-pill btn-gray-200 mr-1" type="button" @click="reset()"><close-icon width="20" height="20"></close-icon></button>
		</div>
		<slot :results="results" :searching="searching" :trimmedQuery="trimmedQuery"></slot>
	</div>
</template>
<script src="./form-search.js"></script>
<style lang="scss" scoped src="./form-search.scss"></style>
