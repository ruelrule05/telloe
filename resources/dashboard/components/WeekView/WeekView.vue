<template>
	<div>
		<VCalendar ref="calendar" :value="date" color="primary" type="week" :interval-format="intervalFormat" :events="parsedBookings" :weekdays="[1, 2, 3, 4, 5, 6, 7, 0]" @click:event="eventClick">
			<template #day-header="headerDate">
				<div class="week-header" :class="{ active: headerDate.date == dayjs(date).format('YYYY-MM-DD') }">
					<div class="font-serif text-muted font-semibold uppercase text-xs">{{ dayjs(headerDate.date).format('D MMM') }}</div>
					<div class="font-serif font-semibold uppercase text-xs">{{ dayjs(headerDate.date).format('ddd') }}</div>
				</div>
			</template>
			<template #interval="interval">
				<div v-if="isPrevious(interval)" class="day-interval disabled"></div>
				<VueDropdown v-else :options="['Create booking', 'Block timeslot']" @click="newEventAction($event, interval)" class="w-full h-full" dropPosition="top-5">
					<template #button>
						<div class="day-interval"></div>
					</template>
				</VueDropdown>

				<div v-if="timeslotToBlock.date == interval.date && timeslotToBlock.time == interval.time" class="block-dropdown w-full open" v-click-outside="() => (timeslotToBlock.date = null)">
					<div class="block-dropdown-menu w-11/12 -top-12">
						<button type="button" @click="timeslotToBlock.date = null" class="absolute top-1 right-1 rounded-full p-1 border text-gray-600 ml-1 transition-colors hover:bg-gray-200 focus:outline-none"><CloseIcon class="fill-current h-2 w-2"></CloseIcon></button>
						<timerangepicker @change="timeslotBlockChange($event, interval.date)" :hideClearButton="true" :vertical="true" :start="interval.time"></timerangepicker>
						<div class="-mt-px">
							<v-date-picker class="relative" @input="timeslotBlockEndDateChange" :value="interval.date" :min-date="interval.date" :popover="{ visibility: 'click', placement: 'right' }" :masks="masks">
								<template v-slot="{ inputValue, inputEvents }">
									<span v-on="inputEvents" class="text-blue-400 text-xs cursor-pointer hover:underline">{{ inputValue }}</span>
								</template>
							</v-date-picker>
						</div>
						<button class="btn btn-sm btn-outline-primary mt-2 w-full" type="button" @click="blockTimeslot"><span>Block</span></button>
					</div>
				</div>
			</template>

			<template #event="{ event }">
				<div class="flex justify-between h-full relative" :data-booking-id="(event.booking || {}).id">
					<div class="overflow-hidden">
						<div>{{ event.name }}</div>
						<div v-if="dayjs(event.start).format('YYYY-MM-DD') == dayjs(event.end).format('YYYY-MM-DD')">{{ convertTime(event.start, 'hh:mmA') }}&mdash;{{ convertTime(event.end, 'hh:mmA') }}</div>
						<div v-else>
							<div>{{ dayjs(event.start).format('MMM DD, YYYY hh:mmA') }}</div>
							<div>{{ dayjs(event.end).format('MMM DD, YYYY hh:mmA') }}</div>
						</div>
					</div>
					<GoogleIcon class="h-4 w-4" v-if="event.type == 'google-event'"></GoogleIcon>
					<OutlookIcon class="h-4 w-4" v-else-if="event.type == 'outlook-event'"></OutlookIcon>
					<div v-if="event.booking && event.booking.type == 'blocked'" class="absolute w-full h-full">
						<VueDropdown :options="['Unblock timeslot']" @click="newEventAction($event, event.booking)" class="w-full h-full" dropPosition="right"> </VueDropdown>
					</div>
				</div>
			</template>
		</VCalendar>
	</div>
</template>

<script src="./WeekView.js"></script>

<style lang="scss" scoped src="./WeekView.scss"></style>
