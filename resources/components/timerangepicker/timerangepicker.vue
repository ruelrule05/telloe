<template>
	<div>
		<div :class="{ 'dropdown-w-full': dropdownWFull, flex: !vertical }">
			<div :class="[vertical ? 'w-full' : 'w-1/2 pr-2']">
				<label v-if="!noLabel">From</label>
				<vue-timepicker :minute-interval="5" ref="timeStart" format="hh:mm A" @change="emitChange" :xhour-range="[startHourRange]" :xminute-range="[startMinuteRange]" class="w-full" v-model="time_start" :hide-clear-button="hideClearButton" :class="{ 'has-controls': !hideClearButton }" close-on-complete auto-scroll></vue-timepicker>
			</div>

			<div :class="[vertical ? 'w-full mt-2' : 'w-1/2 pl-2']">
				<label v-if="!noLabel">To</label>
				<vue-timepicker :minute-interval="5" ref="timeEnd" format="hh:mm A" @change="emitChange" :xhour-range="[endHourRange]" :xminute-range="[endMinuteRange]" class="w-full" v-model="time_end" :hide-clear-button="hideClearButton" :class="{ 'has-controls': !hideClearButton }" close-on-complete auto-scroll></vue-timepicker>
			</div>
		</div>
	</div>
</template>

<script src="./timerangepicker.js"></script>
<style scoped lang="scss" src="./timerangepicker.scss"></style>
