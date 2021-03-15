<template>
	<div>
		<div class="flex">
			<div class="w-1/2 pr-2">
				<label>From</label>
				<vue-timepicker ref="timeStart" format="hh:mm A" @change="emitChange" :hour-range="[startHourRange]" :minute-range="[startMinuteRange]" class="w-full" v-model="time_start" manual-input hide-clear-button close-on-complete auto-scroll></vue-timepicker>
			</div>

			<div class="w-1/2 pl-2">
				<label>To</label>
				<vue-timepicker ref="timeEnd" format="hh:mm A" @change="emitChange" :hour-range="[endHourRange]" :minute-range="[endMinuteRange]" class="w-full" v-model="time_end" manual-input hide-clear-button close-on-complete auto-scroll></vue-timepicker>
			</div>
		</div>
	</div>
</template>

<script src="./timerangepicker.js"></script>
<style scoped lang="scss" src="./timerangepicker.scss"></style>
