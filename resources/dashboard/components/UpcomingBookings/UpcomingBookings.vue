<template>
	<div class="text-sm font-semibold">
		<div v-for="upcomingDay in days" :key="upcomingDay.value" class="flex">
			<div class="upcoming-day-label border-right py-6 text-muted" :class="{ active: upcomingDay.today }">{{ upcomingDay.text }}</div>
			<div class="p-6 flex-grow">
				<div v-if="dayBookings(upcomingDay.value).length > 0">
					<div v-for="(booking, bookingIndex) in dayBookings(upcomingDay.value)" :key="booking.id" class="flex" :class="{ 'mt-4': bookingIndex > 0 }">
						<div class="font-normal text-muted w-3/12">{{ booking.start }} - {{ booking.end }}</div>
						<div class="leading-relaxed w-5/12">
							<div v-for="bookingUser in booking.booking_users" :key="bookingUser.id" class="mxb-1">
								<div class="font-bold">{{ bookingUser.user ? bookingUser.user.full_name : bookingUser.guest.email }}</div>
							</div>
							<div class="font-normal text-muted" v-if="booking.meet_link">Google Meet</div>
							<div class="font-normal text-muted" v-if="booking.zoom_link">Zoom Meeting</div>
						</div>
						<div class="text-right w-4/12">
							<div class="badge truncate max-w-full">{{ (booking.service || booking.booking_link).name }}</div>
						</div>
					</div>
				</div>
				<div v-else class="bg-gray-100 px-6 py-8 rounded-md text-center text-muted">No meetings scheduled for {{ upcomingDay.day }}</div>
			</div>
		</div>
	</div>
</template>

<script src="./UpcomingBookings.js"></script>

<style lang="scss" scoped src="./UpcomingBookings.scss"></style>
