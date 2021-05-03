<template>
	<div>
		<div class="flex" :class="{ 'dropdown-w-full': dropdownWFull }">
			<div class="w-1/2 pr-2">
				<label v-if="!noLabel">From</label>
				<vue-timepicker :minute-interval="5" ref="timeStart" format="hh:mm A" @change="emitChange" :hour-range="[startHourRange]" :minute-range="[startMinuteRange]" class="w-full" v-model="time_start" :hide-clear-button="hideClearButton" :class="{ 'has-controls': !hideClearButton }" close-on-complete auto-scroll></vue-timepicker>
			</div>

			<div class="w-1/2 pl-2">
				<label v-if="!noLabel">To</label>
				<vue-timepicker :minute-interval="5" ref="timeEnd" format="hh:mm A" @change="emitChange" :hour-range="[endHourRange]" :minute-range="[endMinuteRange]" class="w-full" v-model="time_end" :hide-clear-button="hideClearButton" :class="{ 'has-controls': !hideClearButton }" close-on-complete auto-scroll></vue-timepicker>
			</div>
		</div>
	</div>
</template>

<script src="./timerangepicker.js"></script>
<style scoped lang="scss" src="./timerangepicker.scss"></style>
