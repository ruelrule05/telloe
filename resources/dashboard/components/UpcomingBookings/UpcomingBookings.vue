<template>
	<div class="text-sm font-semibold min-h-full relative">
		<div v-if="loading" class="absolute-center w-full h-full">
			<div class="absolute-center">
				<div class="spinner spinner-sm"></div>
			</div>
		</div>

		<div v-else v-for="upcomingDay in days" :key="upcomingDay.value" class="lg:flex">
			<div class="border-right">
				<div class="upcoming-day-label lg:py-8 pt-4 text-muted" style="flex: 0 100px" :class="{ active: upcomingDay.today }">{{ upcomingDay.text }}</div>
			</div>
			<div class="lg:p-5 px-4 py-2 flex-grow">
				<div v-for="booking in dayBookings(upcomingDay.value)" :key="booking.id">
					<div v-if="booking.integration == 'telloe'" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', booking, 'booking')">
						<div class="font-normal text-muted flex-grow">{{ convertTime(booking.startTime, 'hh:mmA') }} - {{ convertTime(booking.endTime, 'hh:mmA') }}</div>
						<div class="badge truncate max-w-full badge-grey flex items-center">
							{{ booking.title }}
						</div>
					</div>

					<div v-if="booking.integration == 'google'" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', googleEvent, 'google-event')">
						<div class="font-normal text-muted flex-grow">{{ convertTime(booking.startTime, 'hh:mmA') }} - {{ convertTime(booking.endTime, 'hh:mmA') }}</div>
						<div class="badge truncate max-w-full badge-red flex items-center">{{ booking.title }} <GoogleIcon class="h-3 w-3 inline-block -mt-px"></GoogleIcon></div>
					</div>

					<div v-if="booking.integration == 'outlook'" class="flex items-center mb-1 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg" @click="$emit('eventClick', outlookEvent, 'google-event')">
						<div class="font-normal text-muted flex-grow">{{ convertTime(booking.startTime, 'hh:mmA') }} - {{ convertTime(booking.endTime, 'hh:mmA') }}</div>
						<div class="badge truncate max-w-full badge-red flex items-center">{{ booking.title }} <OutlookIcon class="h-3 w-3 inline-block -mt-px"></OutlookIcon></div>
					</div>
				</div>

				<div v-if="dayBookings(upcomingDay.value).length == 0 && googleBookings(upcomingDay.value).length == 0 && outlookBookings(upcomingDay.value).length == 0" class="bg-gray-100 px-6 py-8 rounded-md text-center text-muted">No meetings scheduled for {{ upcomingDay.day }}</div>
			</div>
		</div>
	</div>
</template>

<script src="./UpcomingBookings.js"></script>

<style lang="scss" scoped src="./UpcomingBookings.scss"></style>
