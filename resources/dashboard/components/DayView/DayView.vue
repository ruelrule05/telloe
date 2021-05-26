<template>
	<div>
		<div class="py-6 px-16">
			<div class="font-serif text-muted font-semibold uppercase text-xs">{{ dayjs(date).format('D MMM') }}</div>
			<div class="font-serif font-semibold uppercase text-xs">{{ dayjs(date).format('ddd') }}</div>
		</div>

		<VCalendar ref="calendar" :value="date" color="primary" type="day" hide-header :interval-format="intervalFormat" :categories="['bookings']" category-show-all :events="parsedBookings" @click:event="eventClick">
			<template #interval="interval">
				<div v-if="isPrevious" class="day-interval disabled"></div>
				<VueDropdown v-else :interval="interval" :options="timeslotOptions(interval)" @click="newEventAction($event, interval)" class="w-full h-full" dropPosition="top-5">
					<template #button>
						<div class="day-interval">
							<div v-if="isBlocked(interval)" class="text-sm text-muted w-full h-full  bg-gray-50 pointer-events-none">
								<span class="absolute-center">Blocked</span>
							</div>
						</div>
					</template>
				</VueDropdown>
			</template>
			<template #event="{ event }">
				<div class="flex justify-between">
					<div>
						<div>{{ event.name }}</div>
						<div>{{ dayjs(event.start).format('H:mm') }}&mdash;{{ dayjs(event.end).format('H:mm') }}</div>
					</div>
					<GoogleIcon class="h-4 w-4" v-if="event.type == 'google-event'"></GoogleIcon>
				</div>
			</template>
		</VCalendar>
	</div>
</template>

<script src="./DayView.js"></script>

<style lang="scss" scoped src="./DayView.scss"></style>
