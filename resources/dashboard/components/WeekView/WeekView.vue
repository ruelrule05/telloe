<template>
	<div>
		<VCalendar ref="calendar" :value="date" color="primary" type="week" :interval-format="intervalFormat" :events="parsedBookings" :weekdays="[1, 2, 3, 4, 5, 6, 7, 0]" @click:event="eventClick">
			<template v-slot:day-header="headerDate">
				<div class="week-header" :class="{ active: headerDate.date == dayjs(date).format('YYYY-MM-DD') }" @click="date = headerDate.date">
					<div class="font-serif text-muted font-semibold uppercase text-xs">{{ dayjs(headerDate.date).format('D MMM') }}</div>
					<div class="font-serif font-semibold uppercase text-xs">{{ dayjs(headerDate.date).format('ddd') }}</div>
				</div>
			</template>
			<template v-slot:interval="interval">
				<div class="day-interval" @click="setNewEvent(interval)"></div>
			</template>

			<template v-slot:event="{ event }">
				<div>{{ event.name }}</div>
				<div>{{ dayjs(event.start).format('H:mm') }}&mdash;{{ dayjs(event.end).format('H:mm') }}</div>
			</template>
		</VCalendar>
	</div>
</template>

<script src="./WeekView.js"></script>

<style lang="scss" scoped src="./WeekView.scss"></style>
