<template>
	<div class="p-3 row h-100">
		<div class="col-md-9">
			<div class="bg-white rounded shadow-sm h-100 p-4">
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
					<FullCalendar ref="fullCalendar" themeSystem="bootstrap" :header="header" :buttonText="buttonText" :events="events" eventColor="#FBBC1B" :displayEventTime="false" @eventRender="eventRender" defaultView="dayGridMonth" :plugins="calendarPlugins" height="parent"></FullCalendar>
				</div>
			</div>
		</div>
		
		<div class="col-md-3 overflow-hidden h-100">
			<div class="bg-white rounded shadow-sm h-100 p-3 overflow-y-only">
  				<business-hours :switchWidth="70" type="select" :days="business_hours" color="#4d65e5" @update="updateBusinessHour"></business-hours>
			</div>
		</div>

		
	</div>
</template>

<style lang="scss" src="./bookings.scss"></style>
<script src="./bookings.js"></script>