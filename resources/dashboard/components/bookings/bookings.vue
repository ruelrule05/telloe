<template>
	<div class="h-100">
		<router-view></router-view>
		<add ref="add" :services="services" @hide="getData(1)" :auth="true"></add>
	</div>
</template>

<style lang="scss" src="./bookings.scss"></style>
<script src="./bookings.js"></script>
