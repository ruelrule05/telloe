<template>
	<div class="p-3">
		<ul class="nav nav-tabs bg-light position-relative">
		  	<li class="nav-item" v-for="tab in tabs">
		    	<span class="nav-link py-2 cursor-pointer" :class="{'active': tab == selectedTab}" @click="selectedTab = tab">{{ tab }}</span>
		  	</li>
		</ul>

		<div class="bg-white tab-content border-left border-right border-bottom rounded p-3 mt-n1">
		  	<transition name="fade">
		  		<Component :is="tabComponent"></Component>
		  	</transition>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		tabs: [
			'Domain',
			'Integration',
			'Rules',
			'Colors',
			'Notifications',
		],
		selectedTab: '',
		tabComponent: null
	}),

	computed: {},

	watch: {
		selectedTab: function(value) {
			let chunkName = `settings-${value.toLowerCase()}`;
			this.tabComponent = () => import (/* webpackChunkName: "[request]" */ `./settings/${value.toLowerCase()}`);
		}
	},

	mounted() {
		this.$root.contentloading = false;
		this.selectedTab = 'Colors';
	},

	created() {
		this.$root.heading = 'Settings';
	},

	methods: {

		
	},
};
</script>