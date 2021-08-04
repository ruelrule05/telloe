<template>
	<div>
		<div :class="{ 'dropdown-w-full': dropdownWFull, flex: !vertical }">
			<div :class="[vertical ? 'w-full' : 'w-1/2 pr-2']">
				<label v-if="!noLabel">From</label>
				<VueSelect :options="timeslots()" v-model="time_start" dropPosition="w-full" @input="emitChange"></VueSelect>
				<!-- <vue-timepicker :minute-interval="5" ref="timeStart" lazy format="HH" @input="emitChange" :xhour-range="[startHourRange]" :xminute-range="[startMinuteRange]" class="w-full" v-model="time_start" :hide-clear-button="hideClearButton" :class="{ 'has-controls': !hideClearButton, 'clock-icon': clockIcon }" close-on-complete auto-scroll>
					<template v-if="clockIcon" v-slot:icon>
						<ClockIcon class="fill-current text-gray-300 w-4 h-4" />
					</template>
				</vue-timepicker> -->
			</div>

			<div :class="[vertical ? 'w-full mt-2' : 'w-1/2 pl-2']">
				<label v-if="!noLabel">To</label>
				<VueSelect :options="timeslots(time_start)" v-model="time_end" dropPosition="w-full" @input="emitChange"></VueSelect>
				<!-- <vue-timepicker :minute-interval="5" ref="timeEnd" lazy format="hh:mm A" @input="emitChange" :xhour-range="[endHourRange]" :xminute-range="[endMinuteRange]" class="w-full" v-model="time_end" :hide-clear-button="hideClearButton" :class="{ 'has-controls': !hideClearButton, 'clock-icon': clockIcon }" close-on-complete auto-scroll>
					<template v-if="clockIcon" v-slot:icon>
						<ClockIcon class="fill-current text-gray-300 w-4 h-4" />
					</template>
				</vue-timepicker> -->
			</div>
		</div>
	</div>
</template>

<script src="./timerangepicker.js"></script>
<style scoped lang="scss" src="./timerangepicker.scss"></style>
