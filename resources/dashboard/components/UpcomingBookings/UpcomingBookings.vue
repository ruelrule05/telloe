<template>
	<div class="text-sm font-semibold min-h-full relative">
		<div v-if="loading" class="absolute-center w-full h-full ">
			<div class="absolute-center">
				<div class="spinner spinner-sm"></div>
			</div>
		</div>

		<div v-else v-for="upcomingDay in days" :key="upcomingDay.value" class="lg:flex">
			<div class="border-right ">
				<div class="upcoming-day-label lg:py-8 pt-4 text-muted" style="flex: 0 100px" :class="{ active: upcomingDay.today }">{{ upcomingDay.text }}</div>
			</div>
			<div class="lg:p-5 px-4 py-2 flex-grow">
				<div v-for="booking in dayBookings(upcomingDay.value)" :key="booking.id" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', booking, 'booking')">
					<div class="font-normal text-muted flex-grow">{{ convertTime(booking.start, 'hh:mmA') }} - {{ convertTime(booking.end, 'hh:mmA') }}</div>

					<div class="badge truncate max-w-full">{{ booking.name }}</div>
				</div>

				<div v-for="googleEvent in googleBookings(upcomingDay.value)" :key="googleEvent.id" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', googleEvent, 'google-event')">
					<div class="font-normal text-muted flex-grow">{{ convertTime(googleEvent.start.dateTime, 'hh:mmA') }} - {{ convertTime(googleEvent.end.dateTime, 'hh:mmA') }}</div>
					<div class="badge truncate max-w-full badge-red flex items-center">{{ googleEvent.summary }} <GoogleIcon class="h-3 w-3 inline-block -mt-px"></GoogleIcon></div>
				</div>

				<div v-for="outlookEvent in outlookBookings(upcomingDay.value)" :key="outlookEvent.id" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', outlookEvent, 'google-event')">
					<div class="font-normal text-muted flex-grow">{{ outlookEvent.startTime }} - {{ outlookEvent.endTime }}</div>
					<div class="badge truncate max-w-full badge-blue flex items-center">{{ outlookEvent.subject }} <OutlookIcon class="h-3 w-3 inline-block -mt-px"></OutlookIcon></div>
				</div>

				<div v-if="dayBookings(upcomingDay.value).length == 0 && googleBookings(upcomingDay.value).length == 0 && outlookBookings(upcomingDay.value).length == 0" class="bg-gray-100 px-6 py-8 rounded-md text-center text-muted">No meetings scheduled for {{ upcomingDay.day }}</div>
			</div>
		</div>
	</div>
</template>

<script src="./UpcomingBookings.js"></script>

<style lang="scss" scoped src="./UpcomingBookings.scss"></style>
