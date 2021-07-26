<template>
	<div class="text-sm font-semibold min-h-full relative">
		<div v-if="loading" class="absolute-center w-full h-full ">
			<div class="absolute-center">
				<div class="spinner spinner-sm"></div>
			</div>
		</div>

		<div v-else v-for="upcomingDay in days" :key="upcomingDay.value" class="flex">
			<div class="upcoming-day-label border-right py-8 text-muted" :class="{ active: upcomingDay.today }">{{ upcomingDay.text }}</div>
			<div class="p-5 flex-grow">
				<div v-for="booking in dayBookings(upcomingDay.value)" :key="booking.id" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', booking, 'booking')">
					<div class="font-normal text-muted flex-grow">{{ convertTime(booking.start, 'hh:mmA') }} - {{ convertTime(booking.end, 'hh:mmA') }}</div>

					<div class="badge truncate max-w-full">{{ booking.name }}</div>
				</div>

				<div v-for="googleEvent in googleBookings(upcomingDay.value)" :key="googleEvent.id" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', googleEvent, 'google-event')">
					<div class="font-normal text-muted flex-grow">{{ convertTime(googleEvent.start.dateTime, 'hh:mmA') }} - {{ convertTime(googleEvent.end.dateTime, 'hh:mmA') }}</div>
					<div class="badge truncate max-w-full">{{ googleEvent.summary }}</div>
				</div>

				<div v-if="dayBookings(upcomingDay.value).length == 0 && googleBookings(upcomingDay.value).length == 0" class="bg-gray-100 px-6 py-8 rounded-md text-center text-muted">No meetings scheduled for {{ upcomingDay.day }}</div>
			</div>
		</div>
	</div>
</template>

<script src="./UpcomingBookings.js"></script>

<style lang="scss" scoped src="./UpcomingBookings.scss"></style>
