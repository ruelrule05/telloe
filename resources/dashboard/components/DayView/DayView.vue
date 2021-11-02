<template>
	<div>
		<div class="py-6 px-16">
			<div class="font-serif text-muted font-semibold uppercase text-xs">{{ dayjs(date).format('D MMM') }}</div>
			<div class="font-serif font-semibold uppercase text-xs">{{ dayjs(date).format('ddd') }}</div>
		</div>

		<VCalendar ref="calendar" :value="date" color="primary" type="day" hide-header :interval-format="intervalFormat" :categories="['bookings']" category-show-all :events="parsedBookings" @click:event="eventClick">
			<template #interval="interval">
				<div v-if="isPrevious" class="day-interval disabled"></div>
				<VueDropdown v-else :options="['Create booking', 'Block timeslot']" @click="newEventAction($event, interval)" class="w-full h-full" dropPosition="left-2 top-6 w-2/12">
					<template #button>
						<div class="day-interval"></div>
					</template>
				</VueDropdown>
				<div v-if="timeslotToBlock.date == interval.date && timeslotToBlock.time == interval.time" class="block-dropdown w-2/12 open" v-click-outside="() => (timeslotToBlock.date = null)">
					<div class="block-dropdown-menu w-11/12 -top-12">
						<button type="button" @click="timeslotToBlock.date = null" class="absolute top-1 right-1 rounded-full p-1 border text-gray-600 ml-1 transition-colors hover:bg-gray-200 focus:outline-none"><CloseIcon class="fill-current h-2 w-2"></CloseIcon></button>
						<timerangepicker @change="timeslotBlockChange($event, interval.date)" :hideClearButton="true" :vertical="true" :start="interval.time"></timerangepicker>
						<button class="btn btn-sm btn-outline-primary mt-2 w-full" type="button" @click="blockTimeslot"><span>Block</span></button>
					</div>
				</div>
			</template>
			<template #event="{ event }">
				<div class="flex justify-between h-full relative" :data-booking-id="(event.booking || {}).id">
					<div>
						<div>{{ event.name }}</div>
						<div>{{ dayjs(event.start).format('hh:mmA') }}&mdash;{{ dayjs(event.end).format('hh:mmA') }}</div>
					</div>
					<GoogleIcon class="h-4 w-4" v-if="event.type == 'google-event'"></GoogleIcon>
					<OutlookIcon class="h-4 w-4" v-else-if="event.type == 'outlook-event'"></OutlookIcon>
					<div v-if="event.booking && event.booking.type == 'blocked'" class="absolute w-full h-full">
						<VueDropdown :options="['Unblock timeslot']" @click="newEventAction($event, event.booking)" class="w-full h-full"> </VueDropdown>
					</div>
				</div>
			</template>
		</VCalendar>
	</div>
</template>

<script src="./DayView.js"></script>

<style lang="scss" scoped src="./DayView.scss"></style>
