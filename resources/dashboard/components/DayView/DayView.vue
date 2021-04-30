<template>
	<div>
		<div class="py-6 px-16">
			<div class="font-serif text-muted font-semibold uppercase text-xs">{{ dayjs(date).format('D MMM') }}</div>
			<div class="font-serif font-semibold uppercase text-xs">{{ dayjs(date).format('ddd') }}</div>
		</div>

		<VCalendar ref="calendar" :value="date" color="primary" type="day" hide-header :interval-format="intervalFormat" :categories="['bookings']" category-show-all :events="parsedBookings" @click:event="eventClick">
			<template #interval="interval">
				<div class="day-interval" :class="{ disabled: isPrevious }" @click="setNewEvent(interval)"></div>
			</template>
			<template #event="{ event }">
				<div>{{ event.name }}</div>
				<div>{{ dayjs(event.start).format('H:mm') }}&mdash;{{ dayjs(event.end).format('H:mm') }}</div>
			</template>
		</VCalendar>
	</div>
</template>

<script src="./DayView.js"></script>

<style lang="scss" scoped src="./DayView.scss"></style>
