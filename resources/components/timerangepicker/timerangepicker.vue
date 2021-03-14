<template>
	<div>
		<div class="flex">
			<div class="w-1/2 pr-2">
				<label>From</label>
				<vue-timepicker format="hh:mm A" class="w-full" hide-clear-button close-on-complete></vue-timepicker>
				<!-- <vue-select :options="startHours" @input="emitChange" placeholder="Set time" v-model="time_start" required></vue-select> -->
			</div>

			<div class="w-1/2 pl-2">
				<label>To</label>
				<vue-select :options="endHours" @input="emitChange" placeholder="Set time" v-model="time_end" required></vue-select>
			</div>
		</div>
	</div>
</template>

<script src="./timerangepicker.js"></script>
<style scoped lang="scss" src="./timerangepicker.scss"></style>
