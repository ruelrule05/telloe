<template>
	<div class="p-3 row h-100">
		<div class="col-md-8">
			<div class="bg-white rounded shadow-sm h-100 p-1">
				<div class="h-100 position-relative">
					<div class="calendar-buttons position-absolute">
						<button class="btn btn-white border" @click="goToDate('today')">Today</button>
						<button class="btn btn-white border line-height-1 badge-pill p-1" @click="goToDate('prev')">
							<chevron-left width="28" height="28" transform="scale(1.5)"></chevron-left>
						</button>
						<button class="btn btn-white border line-height-1 badge-pill p-1" @click="goToDate('next')">
							<chevron-right width="28" height="28" transform="scale(1.5)"></chevron-right>
						</button>
					</div>
					<!-- <FullCalendar ref="fullCalendar" themeSystem="bootstrap" :header="header" :buttonText="buttonText" eventColor="#FBBC1B" :displayEventTime="false" @dateClick="dateClick" defaultView="dayGridMonth" :plugins="calendarPlugins" height="parent" :dayRender="dayRender"></FullCalendar> -->

					<v-calendar class="v-calendar h-100 border-0" is-expanded  :attributes="calendarAttributes">
						<div slot="day-content" slot-scope="{day, dayEvents, attributes, attributesMap}">
							<div class="day-content text-center">
								<div class="day-label" :class="{'active': selectedDate.toString() == day.date.toString() , 'is-today': day.isToday}" @click="dayclick(day.date)"><span>{{ day.label }}</span></div>
								<div v-if="attributesMap" class="vc-bookings">{{ Object.keys(attributesMap).length }}</div>
							</div>
						</div>
					</v-calendar>
				</div>
			</div>
		</div>
		
		<div class="col-md-4 overflow-hidden h-100">
			<div class="bg-white rounded shadow-sm h-100 p-3 overflow-y-only position-relative">
				<div v-if="selectedDate">
					<div class="h6 font-heading">{{ dayjs(selectedDate).format('MMMM D, YYYY') }}</div>
					<div v-if="selectedDateBookings.length > 0">
						<div v-for="booking in selectedDateBookings" class="py-2 border-bottom booking">
							<div class="d-flex align-items-center">
								<div class="user-profile-image user-profile-image-sm" :style="{backgroundImage: 'url('+booking.user.profile_image+')'}">
							  		<span v-if="!booking.user.profile_image">{{ booking.user.initials }}</span>
							  	</div>
								<div class="pl-2 line-height-sm">
									<strong class="font-heading d-block">{{ booking.user.full_name }}</strong>
									<small class="d-block text-gray font-weight-light">{{ booking.start }} - {{ booking.end }}</small>
								</div>

								<div class="ml-auto">
									<router-link :to="`/dashboard/messages?booking_id=${booking.id}`" class="btn btn-sm btn-link p-0 text-body opacity-0">Manage</router-link>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="position-absolute-center text-center text-gray font-weight-light w-100">
						There are no bookings for this date
					</div>
				</div>
  				<!-- <business-hours :switchWidth="70" type="select" :days="business_hours" color="#4d65e5" @update="updateBusinessHour"></business-hours> -->
			</div>
		</div>

		
	</div>
</template>

<style lang="scss" src="./bookings.scss"></style>
<script src="./bookings.js"></script>