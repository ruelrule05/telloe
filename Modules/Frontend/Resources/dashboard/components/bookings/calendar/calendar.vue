<template>
	<div class="h-100 p-4 row" ref="calendar">
		<div class="col-md-8">
			<div class="h-100 d-flex flex-column">
				<div class="bg-white rounded shadow-sm h-100 p-1 border flex-grow-1">
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

						<v-calendar class="v-calendar h-100 border-0" is-expanded :attributes="calendarAttributes">
							<div slot="day-content" slot-scope="{day, dayEvents, attributes}">
								<div class="day-content text-center">
									<div class="day-label" :class="{active: selectedDate.toString() == day.date.toString(), 'is-today': day.isToday}" @click="dayclick(day.date)">
										<span>{{ day.label }}</span>
									</div>
									<div v-if="attributes" class="d-flex align-items-center vc-badge-container">
										<div class="vc-badge vc-bookings">{{ countBookings(attributes) }}</div>
										<div class="vc-badge vc-events">{{ countGoogleEvents(attributes) }}</div>
									</div>
								</div>
							</div>
						</v-calendar>
					</div>
				</div>
				
				<div class="mt-2">
					<div class="dropup d-inline-block" ref="googleCalendarDropdown">
						<button type="button" class="btn btn-white border d-inline-flex align-items-center" @click="googleCalendarDropdownToggle" data-toggle="dropdown" data-display="static">
							<img src="/images/brands/google-calendar.svg" height="20" class="mr-2">
							Google Calendar
						</button>
						<div class="dropdown-menu" @click.stop>
							<div v-if="!googleCalendarsReady" class="text-center py-3">
								<div class="spinner-border spinner-border-sm text-primary"></div>
								<div class="small text-muted font-weight-light mt-2">Getting calendars...</div>
							</div>
							<div v-else class="px-3">
								<div class="form-group mb-2">
									<label class="form-label">Choose a calendar</label>
									<select :value="$root.auth.google_calendar_id" class="form-control form-control-sm cursor-pointer w-auto" :class="{'text-gray': !($root.auth.google_calendar_id || '').trim().length}" @change.prevent="changeGoogleCalendar($event)">
										<option value="" selected disabled>- Select calendar -</option>
										<option :value="calendar.id" v-for="calendar in googleCalendars">{{ calendar.summary }}</option>
									</select>
								</div>
								<!-- <div v-for="calendar in googleCalendars" class="d-flex align-items-center line-height-0 py-2 px-3">
  									<input type="checkbox" :checked="$root.auth.google_calendars.find((x) => x == calendar.id)" @change="toggleGoogleCalendar($event, calendar)" :id="`calendar-${calendar.etag}`">
									<label :for="`calendar-${calendar.etag}`" class="cursor-pointer mb-0 ml-2">
										<div class="flex-1">{{ calendar.summary }}</div>
									</label>
								</div> -->
							</div>
						</div>
					</div>

					<div class="dropup d-inline-block" ref="outlookCalendarDropdown">
						<button type="button" class="btn btn-white border d-inline-flex align-items-center" @click="outlookCalendarDropdownToggle" data-toggle="dropdown" data-display="static">
							<img src="/images/brands/outlook.svg" height="20" class="mr-2">
							Outlook
						</button>
						<div class="dropdown-menu" @click.stop>
							<div v-if="!outlookCalendarsReady" class="text-center py-3">
								<div class="spinner-border spinner-border-sm text-primary"></div>
								<div class="small text-muted font-weight-light mt-2">Getting calendars...</div>
							</div>
							<div v-else>
								<div v-for="calendar in outlookCalendars" class="d-flex align-items-center line-height-0 py-2 px-3">
  									<input type="checkbox" :checked="$root.auth.outlook_calendars.find((x) => x == calendar.id)" @change="toggleOutlookCalendar($event, calendar)" :id="`calendar-${calendar.id}`">
									<label :for="`calendar-${calendar.id}`" class="cursor-pointer mb-0 ml-2">
										<div class="flex-1">{{ calendar.name }}</div>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-4 overflow-hidden h-100">
			<div class="h-100 overflow-y-oxnly position-relative">
				<div v-if="selectedDate">
					<div v-if="selectedDateBookingsEvents.length > 0">
						<div class="h6 font-heading">{{ dayjs(selectedDate).format('MMMM D, YYYY') }}</div>
						<div v-for="item in selectedDateBookingsEvents" class="p-3 mt-3 rounded bg-white border shadow-sm booking">

							<!-- Booking -->
							<template v-if="item.type == 'booking'">
								<div class="d-flex align-items-center mb-2">
									<div class="user-profile-image user-profile-image-xs" :style="{backgroundImage: 'url(' + item.user.profile_image + ')'}">
										<span v-if="!item.user.profile_image">{{ item.user.initials }}</span>
									</div>
									<div class="pl-1 line-height-sm">
										<strong class="d-block font-heading">{{ item.user.full_name }}</strong>
									</div>

									<div class="ml-auto">
										<router-link :to="`/dashboard/conversations/${getConversationIdByUserId(item.user_id)}?tab=bookings`" class="btn btn-sm border btn-white opacity-0 line-height-0 p-1 badge-pill"><pencil-icon width="18" height="18"></pencil-icon></router-link>
									</div>
								</div>
								<h6 class="font-heading mb-0">{{ item.service.name }}</h6>
								<div class="text-muted font-weight-light small">{{ formatTime(item.start) }}-{{ formatTime(item.end) }}</div>
							</template>

							<!-- Google event -->
							<template v-else-if="item.type == 'google-event'">
								<div class="d-flex">
									<img src="/images/brands/google-calendar.svg" alt="" height="20" class="mt-1">
									<div class="ml-3">
										{{ item.summary }}
										<div class="text-muted font-weight-light small">
											{{ (item.start.dateTime && item.end.dateTime) ? `${dayjs(item.start.dateTime).format('hh:mmA')} - ${dayjs(item.end.dateTime).format('hh:mmA')}` : 'Whole day event' }}
										</div>
									</div>
									<div class="ml-auto">
										<button type="button" v-if="item.start.date && item.end.date" class="btn btn-sm border btn-white opacity-0 line-height-0 p-1 badge-pill">
											<eye-slash-icon width="18" height="18"></eye-slash-icon>
										</button>
										<a target="_blank" :href="item.htmlLink" class="btn btn-sm border btn-white opacity-0 line-height-0 p-1 badge-pill"><shortcut-icon width="18" height="18"></shortcut-icon></a>
									</div>
								</div>
							</template>
						</div>
					</div>
					<div v-else class="position-absolute-center text-center text-gray font-weight-light w-100">
						There are no bookings or events for this date
					</div>
				</div>
				<!-- <business-hours :switchWidth="70" type="select" :days="business_hours" color="#4d65e5" @update="updateBusinessHour"></business-hours> -->
			</div>
		</div>

		<modal ref="changeGoogleCalendar" :close-button="false">
			<div class="text-center" v-if="newGoogleCalendarId">
				<info-circle-icon fill="#ffc107" width="50" height="50" class="d-inline-block"></info-circle-icon>
				<p class="mb-0 mt-2">
					Are you sure to use Google Calendar <strong>{{ googleCalendars.find((x) => x.id == newGoogleCalendarId).summary }}</strong>? 
					<br />
					This action will populate your existing bookings to the selected calendar as events.
				</p>
				
				<div class="d-flex align-items-center mt-5">
					<button class="btn btn-link text-body mr-2" type="button" data-dismiss="modal">Cancel</button>
					<button class="btn btn-primary ml-auto" type="button" @click="setGoogleCalendar">Continue</button>
				</div>
			</div>
		</modal>
	</div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.scss" lang="scss"></style>
