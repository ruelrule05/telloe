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
				<div class="day-interval" @click="setNewEvent(interval)"></div>
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

<script src="./WeekView.js"></script>

<style lang="scss" scoped src="./WeekView.scss"></style>
